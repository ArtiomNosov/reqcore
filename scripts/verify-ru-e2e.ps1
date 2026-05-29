# Requires: Docker Desktop running, .env in repo root
param(
  [switch]$CheckOnly,
  [switch]$SkipScreenshots
)

$ErrorActionPreference = 'Stop'
Set-Location (Resolve-Path (Join-Path $PSScriptRoot '..'))

function Load-DotEnv {
  if (-not (Test-Path '.env')) { throw '.env not found. Copy from .env.example or run setup.' }
  Get-Content '.env' | ForEach-Object {
    if ($_ -match '^\s*#' -or $_ -notmatch '=') { return }
    $i = $_.IndexOf('=')
    $n = $_.Substring(0, $i).Trim()
    $v = $_.Substring($i + 1).Trim()
    Set-Item -Path "env:$n" -Value $v
  }
}

Write-Host '==> Docker'
docker info *> $null
if ($LASTEXITCODE -ne 0) {
  throw 'Docker daemon is not running. Start Docker Desktop, then retry.'
}

Load-DotEnv

if ($env:BETTER_AUTH_URL -and $env:BETTER_AUTH_URL -notmatch 'localhost') {
  Write-Warning "BETTER_AUTH_URL=$($env:BETTER_AUTH_URL) — for screenshots use http://localhost:3000"
}

Write-Host '==> docker compose up db minio'
docker compose up -d db minio
if ($LASTEXITCODE -ne 0) { throw 'docker compose failed' }

if ($CheckOnly) {
  Write-Host 'CheckOnly: Docker OK, .env loaded.'
  exit 0
}

Write-Host '==> db:migrate'
npm run db:migrate
if ($LASTEXITCODE -ne 0) { throw 'db:migrate failed' }

Write-Host '==> db:reseed'
npm run db:reseed
if ($LASTEXITCODE -ne 0) { throw 'db:reseed failed' }

Write-Host '==> build'
npm run build
if ($LASTEXITCODE -ne 0) { throw 'build failed' }

Write-Host '==> vitest'
npx vitest run
if ($LASTEXITCODE -ne 0) { throw 'vitest failed' }

if ($SkipScreenshots) {
  Write-Host 'SkipScreenshots: done.'
  exit 0
}

$portInUse = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if (-not $portInUse) {
  Write-Host '==> Starting dev server in background (load .env first)...'
  $reqcoreRoot = (Get-Location).Path
  Start-Process powershell -ArgumentList @(
    '-NoProfile', '-Command',
    "Set-Location '$reqcoreRoot'; Get-Content .env | ForEach-Object { if (`$_ -match '^\s*#' -or `$_ -notmatch '=') { return }; `$i = `$_.IndexOf('='); Set-Item env:`$(`$_.Substring(0,`$i).Trim()) `$_.Substring(`$i+1).Trim() }; npm run dev"
  ) -WindowStyle Minimized
  Write-Host 'Waiting 45s for Nuxt...'
  Start-Sleep -Seconds 45
}

Write-Host '==> i18n:screenshots'
npm run i18n:screenshots
if ($LASTEXITCODE -ne 0) { throw 'i18n:screenshots failed (see dom-language-report.json)' }

$report = Get-Content 'artifacts/i18n-ru-screenshots/dom-language-report.json' -Raw | ConvertFrom-Json
if ($report.pagesWithUnexpectedLatin.Count -gt 0) {
  $report.pagesWithUnexpectedLatin | ForEach-Object { Write-Host "  LATIN: $($_.name) $($_.unexpectedLatin)" }
  throw "pagesWithUnexpectedLatin: $($report.pagesWithUnexpectedLatin.Count)"
}

Write-Host 'E2E OK: pagesWithUnexpectedLatin is empty.'

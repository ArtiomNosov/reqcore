# Runbook: русская локализация Reqcore (thesis/ru-localization)

## E2E без «ограничений» (что нужно от вас)

Агент не может прогнать скриншоты и логин, если **Docker Desktop не запущен** или порт 3000 занят другим приложением. Чтобы закрыть задачу полностью:

1. **Запустите Docker Desktop** и дождитесь статуса *Running* (в терминале: `docker compose ps` показывает `db` и `minio` healthy).
2. **Один сервер на :3000** — не поднимайте `docker compose up app` вместе с `npm run dev`.
3. **`.env`** — `BETTER_AUTH_URL=http://localhost:3000` (скриншоты и API ходят на `localhost`, не `127.0.0.1`).
4. **Миграции** — после обновления кода: `npm run db:migrate` (создаёт в т.ч. `rate_limit`), затем `npm run db:reseed`.
5. **Сообщение агенту:** «Docker запущен, выполни E2E: migrate → reseed → dev → i18n:screenshots».

Проверка окружения одной командой:

```powershell
cd reqcore
.\scripts\verify-ru-e2e.ps1 -CheckOnly
```

Полный прогон (migrate + reseed + build + vitest; dev и скриншоты — если не указан `-CheckOnly`):

```powershell
.\scripts\verify-ru-e2e.ps1
```

### Блог

В ветке `thesis/ru-localization` **нет** `content/blog/` и страниц `/blog` — их нет в форке. Для плана «блог» либо merge фрагментов из upstream Reqcore, либо считать scope: `/`, `/jobs`, onboarding (уже в `i18n:screenshots`).

### Полный `$t()` и ИИ-тексты в seed

- **$t() по всем `.vue`** — делается в коде без Docker; объём большой, overlay (`russian-ui.client.ts`) — временный мост до полного покрытия.
- **ИИ summary/strengths/gaps** — отдельный блок в `seed.ts` (~20 анализов); русификация в `seed-data-ru.ts` или отдельным PR; на скриншоты влияет только страница ИИ-анализа.

## Требования

- Node.js 20+
- Docker Desktop (только `db` и `minio`, **не** контейнер `app` при локальной разработке)
- Файл `.env` с `DATABASE_URL`, `BETTER_AUTH_SECRET`, S3/MinIO и прочими переменными (см. `.env.example`)

## Запуск (один процесс на :3000)

```powershell
cd reqcore
docker compose up -d db minio
npm run db:migrate
npm run db:reseed
Remove-Item -Recurse -Force .nuxt -ErrorAction SilentlyContinue
npm run dev
```

Открыть: http://localhost:3000 (должен совпадать с `BETTER_AUTH_URL` в `.env`)

**Не запускать** одновременно `docker compose up app` и `npm run dev` — конфликт порта 3000.

Если :3000 занят (например Langfuse), поднять на свободном порту и совпасть с `BETTER_AUTH_URL`:

```powershell
$env:BETTER_AUTH_URL='http://localhost:3001'
$env:NUXT_PUBLIC_SITE_URL='http://localhost:3001'
npx nuxt dev --host localhost --port 3001
npm run i18n:screenshots -- http://localhost:3001
# или: node scripts/capture-i18n-screenshots.mjs http://localhost:3001
```

## Демо-аккаунт

| Поле | Значение |
|------|----------|
| Email | `demo@reqcore.com` |
| Пароль | `demo1234` |
| Организация (slug) | `reqcore-demo` |
| Название org | «Демо Reqcore» |

После API-логина для dashboard обязательно: `POST /api/auth/organization/set-active` с `{ "organizationSlug": "reqcore-demo" }`.

## Проверка локализации

```powershell
npm run build
npx vitest run
npm run i18n:screenshots
```

Критерий: `artifacts/i18n-ru-screenshots/dom-language-report.json` → `pagesWithUnexpectedLatin: []`.

## Сброс БД при ошибке auth Postgres

```powershell
docker compose down
docker volume rm reqcore_postgres_data
docker compose up -d db minio
npm run db:migrate
npm run db:reseed
```

## Скриншоты вручную

Сервер должен быть запущен (`npm run dev`). Затем:

```powershell
npm run i18n:screenshots
# или другой URL:
node scripts/capture-i18n-screenshots.mjs http://localhost:3000
```

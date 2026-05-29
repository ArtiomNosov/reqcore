# Runbook: русская локализация Reqcore (thesis/ru-localization)

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

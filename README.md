# KOR Taipei — Announcement Page

A one-page email subscription site for KOR Taipei, with a password-protected
admin dashboard to view subscribers.

- `/` — public page with an email input and subscribe button
- `/kortaipei-admin` — admin dashboard listing all subscribers (login required)

Built with Next.js (App Router), deployed on Vercel, data stored in Turso
(libSQL).

## 1. Create the Turso database

Install the Turso CLI if needed, then:

```bash
turso auth login
turso db create kor-taipei
turso db show kor-taipei --url
turso db tokens create kor-taipei
```

Copy the URL and token into your `.env.local` (see step 2). The subscribers
table is created automatically on first use — no manual migration needed.

## 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in:

| Variable | Description |
|---|---|
| `TURSO_DATABASE_URL` | From `turso db show kor-taipei --url` |
| `TURSO_AUTH_TOKEN` | From `turso db tokens create kor-taipei` |
| `ADMIN_USERNAME` | Username for `/kortaipei-admin` login |
| `ADMIN_PASSWORD` | Password for `/kortaipei-admin` login |
| `SESSION_SECRET` | Random string signing the admin session cookie — generate with `openssl rand -base64 32` |

## 3. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public page and
`http://localhost:3000/kortaipei-admin` for the admin dashboard.

## 4. Deploy to Vercel

```bash
npx vercel
```

In the Vercel project settings, add the same environment variables from
`.env.example` (Production and Preview). Then deploy:

```bash
npx vercel --prod
```

## Notes

- The admin dashboard and its API routes (`/kortaipei-admin/*`,
  `/api/admin/*`) are protected by `src/middleware.ts`, which checks a signed
  session cookie set on login.
- Subscriber emails are deduplicated at the database level (`UNIQUE`
  constraint on `email`).
- Export the subscriber list as CSV from the admin dashboard, or directly at
  `/api/admin/export` (requires login).

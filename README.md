This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## bw-tracker - Setup

This app stores and lists job applications in a Supabase table. The app uses a very small, simple password login.

1. Create a Supabase project and add a table using `supabase.sql` (or the SQL editor in Supabase):

```sql
-- run the contents of supabase.sql
```

2. Add environment variables in Vercel or locally in `.env.local`:

- NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url
- NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
- WEB_PASSWORD=your-site-password

3. Install dependencies and run locally:

```bash
npm install
npm run dev

### Database setup (Supabase local/remote)

Use either the Supabase SQL editor (recommended), the Supabase CLI, or the included script to setup the `applications` table:

1) Using Supabase SQL editor: copy the contents of `supabase.sql` and run it in the SQL editor of your Supabase project.

2) Using the included script (Node + pg): set your Postgres connection string in the `DATABASE_URL` env var and run:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres" npm run db:setup
```

3) Using the Supabase CLI with migrations: put the SQL in a migration file under `supabase/migrations` and `supabase db push`.

After running the SQL, the `applications` table will be created and seeded with two rows.

```

4. Deploy to Vercel via GitHub import. In Vercel, set the same env variables.

Notes:
- This simple app uses a minimal cookie-based login (no user accounts). Treat the key in `WEB_PASSWORD` as the web-access password and avoid exposing it publicly.
- For production, consider using Supabase Auth or a more secure server-side session management.


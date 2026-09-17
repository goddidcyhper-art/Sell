# AutoMarket

AutoMarket is a Next.js car marketplace with authenticated listings, Cloudinary image uploads, favorites, admin moderation, PostgreSQL persistence, and a Stripe Checkout deposit flow.

## Stack

- Next.js 14 App Router
- TypeScript and Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth credentials authentication
- Cloudinary image storage
- Stripe Checkout
- Vercel deployment

## Features

- Browse approved vehicle listings
- Register and sign in
- Submit vehicle listings for admin approval
- Upload vehicle images to Cloudinary
- Save and browse favorite vehicles
- Admin listing moderation
- Create Stripe deposit checkout sessions

## Local development

Requirements:

- Node.js 18.17+
- PostgreSQL (local or hosted)
- Cloudinary account for uploads
- Stripe account for deposits

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run prisma:seed
npm run dev
```

Open http://localhost:3000.

Demo account after seeding:

- Email: `demo@example.com`
- Password: `password123`

## Environment variables

Set these in `.env` locally and in Vercel Project Settings for Production, Preview, and Development as appropriate.

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
NEXTAUTH_URL="https://your-project.vercel.app"
NEXTAUTH_SECRET="generate-a-long-random-secret"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
STRIPE_SECRET_KEY="sk_test_replace_me"
NEXT_PUBLIC_APP_URL="https://your-project.vercel.app"
```

Never commit `.env`, production secrets, database passwords, or Stripe secret keys. Only `NEXT_PUBLIC_APP_URL` is intended to be public.

Generate a secret locally with:

```bash
openssl rand -base64 32
```

## PostgreSQL setup on Vercel

1. Open the Vercel project dashboard.
2. Open **Storage** and create or connect a PostgreSQL provider, such as Neon or Supabase.
3. Copy the provider's pooled connection string into `DATABASE_URL`.
4. Confirm the connection string includes SSL where required, commonly `?sslmode=require`.
5. Run the schema against the production database from a trusted machine:

```bash
DATABASE_URL="your-production-url" npx prisma db push
```

6. Seed only if you want the demo account and sample listings:

```bash
DATABASE_URL="your-production-url" npm run prisma:seed
```

For a larger production system, replace `db push` with reviewed Prisma migrations.

## Cloudinary setup

1. Create a Cloudinary account.
2. From the Cloudinary console, copy the cloud name, API key, and API secret.
3. Add them to Vercel as `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
4. Redeploy after saving the variables.

The upload endpoint stores images in the `sell-marketplace/cars` folder. Uploads are limited to images of 8MB or less.

## Stripe setup

1. Create or sign in to a Stripe account.
2. Start in **Test mode**.
3. Copy the Secret key beginning with `sk_test_` into `STRIPE_SECRET_KEY`.
4. Set `NEXT_PUBLIC_APP_URL` to the exact deployed URL, without a trailing slash.
5. Redeploy.
6. Call `POST /api/checkout` with JSON like:

```json
{
  "carId": 1,
  "amount": 500,
  "title": "Deposit — 2023 BMW M340i"
}
```

The response contains a Stripe Checkout URL. The current flow returns users to `/payment/success` or `/payment/cancel`.

Before accepting live payments, add a verified Stripe webhook for `checkout.session.completed`, persist the session in the `Payment` table, and switch `STRIPE_SECRET_KEY` to the live `sk_live_` key. Do not trust a client-provided amount in a production payment flow; calculate the deposit server-side from the selected car and your business rules.

## Vercel deployment

1. Push or merge `feature/marketplace-mvp` into the branch you want to deploy.
2. In Vercel, select **Add New → Project** and import `goddidcyhper-art/Sell`.
3. Select **Next.js**. Keep the project root at the repository root.
4. Use:
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: default
5. Add all environment variables above to the required Vercel environments.
6. Deploy.
7. After deployment, run the PostgreSQL schema setup and optional seed commands.
8. Test the health checklist below.

The repository includes `vercel.json` with the Next.js framework and build settings.

## Post-deployment checklist

- `/` loads and shows approved listings
- `/cars` lists approved cars
- `/cars/[id]` opens a detail page
- Register and login work
- `/sell` requires authentication
- Cloudinary image upload returns a permanent HTTPS URL
- Favorites work for the signed-in user
- Admin account can open `/admin` and moderate listings
- Stripe Checkout opens with a test key
- Success and cancel payment pages load
- No secret appears in browser code or Git history

## Important production notes

- Use PostgreSQL, not SQLite, on Vercel.
- Use Cloudinary or object storage, not local filesystem writes, for uploads.
- Keep `NEXTAUTH_SECRET`, database credentials, Cloudinary API secret, and Stripe secret server-only.
- Use Stripe test mode until webhook handling and payment persistence are verified.
- Rotate any secret that has ever been pasted into a public issue, chat, commit, or log.

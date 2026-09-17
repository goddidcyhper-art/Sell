# AutoMarket

A modern car marketplace app built with Next.js, Prisma, PostgreSQL, Stripe, Cloudinary, and NextAuth.

## Features
- Browse approved vehicle listings
- Sell a vehicle with image upload
- Save favorites
- Admin approval dashboard
- Credentials login/register
- Stripe-ready deposit flow for vehicle purchases

## Production setup

1. Create a Postgres database and set `DATABASE_URL`.
2. Add Cloudinary credentials for image uploads.
3. Add Stripe credentials for deposits.
4. Set `NEXTAUTH_SECRET` and `NEXT_PUBLIC_APP_URL`.
5. Run Prisma migrations and seed data.

## Quick start

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run prisma:seed
npm run dev
```

Then open http://localhost:3000

Demo login:
- Email: demo@example.com
- Password: password123

## Vercel deployment notes
- Use a Postgres add-on in Vercel or your preferred managed PostgreSQL provider.
- Use Cloudinary or another object storage service for uploaded images.
- Set all environment variables in Vercel Project Settings.
- Use `vercel.json` for the deployment config included in this repo.

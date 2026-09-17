# AutoMarket

A modern car marketplace app built with Next.js, Prisma, SQLite, and NextAuth.

## Features
- Browse approved vehicle listings
- Sell a vehicle with image upload
- Save favorites
- Admin approval dashboard
- Credentials login/register

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

## Notes
- This project uses SQLite for local development.
- For production deployment to Vercel, replace SQLite with PostgreSQL and configure image hosting.

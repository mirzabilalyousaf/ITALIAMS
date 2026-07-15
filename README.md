# ITALIAMS Luxury Storefront

High-end, mobile-first luxury e-commerce storefront for ITALIAMS using Next.js (App Router).

## Run locally

```bash
npm install
npm run dev
```

## Configuration points

- **Brand/contact/WhatsApp/offer deadline:** `lib/site-config.ts`
- **Products/collections/blog/FAQ seed data:** `lib/data.ts`
- **Checkout API alignment:** `app/api/checkout/route.ts`
- **Contact API alignment:** `app/api/contact/route.ts`

## Asset replacement

Replace image files inside `public/assets/**` while keeping file names stable, or update paths in `lib/data.ts`.
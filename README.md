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
- **Backend quote/checkout logic:** `lib/backend/quote.ts`, `app/api/cart/quote/route.ts`, `app/api/checkout/route.ts`
- **Backend contact handling:** `app/api/contact/route.ts`
- **Product feed API:** `app/api/products/route.ts`
- **Simple order/contact persistence:** `lib/backend/store.ts` (writes to `data/*.json`)

## Asset replacement

Replace image files inside `public/assets/**` while keeping file names stable, or update paths in `lib/data.ts`.
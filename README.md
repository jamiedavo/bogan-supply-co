# Bogan Supply Co.

A Next.js App Router storefront for New Zealand, preserving the original bitumen, bone, red, Anton/Archivo typography, oversized BOGAN hero, ticker, and product grid. Original fonts are now self-hosted through Fontsource so the design does not depend on an external Google Fonts request.

## Run

```sh
npm ci
npm run dev
# http://localhost:3000
npm run build
npm start
node --test tests/store.test.mjs
```

Requires Node 20.9+. Updated from Next.js 14 / React 18 to Next.js 16 / React 19 after the original dependencies reported security advisories.

## Shopping experience

- 45 proposed products: **10 T-shirts + 5 hoodies each for Men’s, Women’s, and Kids’**.
- Range navigation, search, clothing filter, sort, live result counts and empty states.
- Individual product pages with concept garment artwork, colour switching, size selection, quantity, and related products.
- Men’s S–3XL, Women’s XS–2XL, Kids’ 2–14 age labels. Measurements await supplier confirmation.
- Variant-aware cart with quantities capped at 10 per option, remove controls, and browser persistence. Invalid persisted data is discarded; names/prices are reconstructed from the catalogue. Old un-sized carts are intentionally not migrated.
- Order review in NZD with illustrative standard/rural delivery estimates. No customer details, payments, or orders collected in preview.
- Keyboard-accessible cart dialog with Escape, focus trapping/restoration, reduced-motion support, visible focus styles, and functioning help links.

## Draft commercial assumptions

Adult tees $45, adult hoodies $89; kids’ tees $29, kids’ hoodies $59. Bitumen, Bone, and Washed red colour options. These are proposed retail prices, not supplier quotes or margin calculations. Garments are SVG concept mockups, not photographs or final print files. No claims of NZ manufacture, stock availability, fabric weight, or dispatch speed are made.

Illustrative delivery: $8 standard; free standard delivery on merchandise subtotals of $150+; $5 rural surcharge regardless of threshold. `lib/cart.mjs` holds these estimates. Replace them with approved courier economics before launch. No GST treatment is asserted; configure the store’s actual tax settings and price presentation before opening.

## Shopify checkout connection

Recommended architecture: keep this custom storefront and use Shopify’s hosted checkout for payments, stock checks, delivery and orders. The integration is implemented but **disabled by default**. It has not been exercised against a real Shopify store.

1. Set up a Shopify store and Headless/Storefront access. Set NZD, New Zealand delivery zones, payment provider, taxes, approved products and variants, inventory, delivery rates, customer policies, and transactional emails in Shopify.
2. Approve physical samples, artwork, sizing, and retail prices. Update `data/catalogue.mjs` to match Shopify. The current catalogue is local; Shopify catalogue/inventory synchronisation is a future step, so keep catalogue changes coordinated. Shopify is authoritative at checkout.
3. Populate `data/shopify-variants.json` with each local variant’s real Shopify ProductVariant GID. Keys are `slug:size:colour` (exact spelling/case). Example shape, with the ID replaced by a real variant:

   ```json
   {
     "mens-shed-department-t-shirt:M:Bitumen": "gid://shopify/ProductVariant/123456789"
   }
   ```

   Every published size/colour option needs a unique mapping. There are 855 proposed size/colour variants across the 45 products. Do not map multiple sizes/colours to the same Shopify variant.

4. Copy `.env.example` to `.env.local`, then set `SHOPIFY_STORE_DOMAIN` to the original `your-store.myshopify.com` domain and `SHOPIFY_STOREFRONT_ACCESS_TOKEN` to a public Storefront token. No Admin API token is needed. The connection uses Storefront API `2026-07`. Secrets/configuration stay on the server.
5. Test on a staging store using test payments. Only after approval set `SHOPIFY_CHECKOUT_ENABLED=true`. The endpoint validates cart options and quantities, creates a Shopify cart for NZ, and rejects checkout errors, warnings, missing/changed lines, and unexpected redirect hosts. Client-submitted prices are never used for charging. Shopify controls final totals, shipping, tax, and payment. The example rural checkbox only demonstrates costs; the buyer confirms the actual address in Shopify checkout.
6. For a custom checkout domain, explicitly update and test the redirect allowlist (`safeCheckoutUrl`) before enabling it. The default only allows the configured myshopify.com host.
7. Replace the concept notices and help placeholders with approved customer copy before launch. Add real contact details, garment measurements, photography, dispatch/returns information, and privacy terms. Run an end-to-end test including receipt, inventory reduction, fulfilment, and refund. Add provider/WAF rate limiting for the checkout endpoint and review dependencies before public traffic.

Reference: https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage

## Main files

`data/catalogue.mjs` — catalogue, taxonomy and currency formatting. `components/Catalogue.js` — browsing. `components/ProductDetails.js` — variants. `lib/cart.mjs` / `context/CartContext.js` — cart. `components/CheckoutReview.js` — review. `app/api/checkout/route.js` — guarded Shopify handoff. `data/shopify-variants.json` — server-side variant mapping. `/help` — clearly marked prelaunch information.

The previous `/collections/petrolheads`, `/collections/rock-dogs`, and `/collections/sheilas` routes redirect to the new ranges.

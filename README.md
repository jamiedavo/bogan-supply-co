# Bogan Supply Co. — Next.js + Tailwind

Refactor of the static `bogan-supply-co-mockup.html` into a modular Next.js
14 (App Router) + Tailwind CSS app, expanded to a 30-item catalog across
three categories.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

`npm run build` produces a production build (verified locally — builds
clean, all routes pre-render).

## Structure

```
app/
  layout.js                  Root layout — fonts, CartProvider, Nav, CartDrawer
  globals.css                Tailwind directives + raw CSS var mirror
  page.js                    Homepage — Hero, 6 featured items, manifesto
  collections/
    page.js                  "View All Gear" destination — all 30 items, grouped
    [category]/page.js       Dynamic per-category page (petrolheads / rock-dogs / sheilas)
components/
  Nav.js                     Scroll-aware nav, Shop dropdown, mobile menu
  Hero.js                    Giant "BOGAN" headline
  Marquee.js                 Scrolling ticker
  ProductGrid.js / ProductCard.js   Catalog grid + individual card
  CartDrawer.js              Slide-out cart panel
  Footer.js
context/
  CartContext.js             Cart state, localStorage persistence, qty logic
data/
  products.js                30 mock products + category taxonomy
```

## Notes & assumptions

- **Design tokens**: `--bitumen`, `--bone`, `--bone-deep`, `--singlet`,
  `--red`/`--red-dark`, `--steel`, `--ink` are mapped in `tailwind.config.js`
  as the source of truth for utility classes (`bg-bitumen`, `text-bone`,
  etc.), and mirrored as raw CSS variables in `globals.css` in case a future
  component needs `var(--x)` directly.
- **Hero**: the `<h1>` is now just `BOGAN`, styled with
  `font-display uppercase leading-[0.85] tracking-[-0.02em]
  text-[clamp(70px,18vw,240px)]` — matches the spec exactly.
- **"View All Gear →"**: the brief didn't specify a destination for this
  link, so it routes to a new `/collections` overview page that lists all
  30 products grouped by category (each group also links through to its
  dedicated `/collections/[category]` page). This was the most natural way
  to give the link real estate to go to.
- **Fonts**: kept as direct Google Fonts `<link>` tags (matching the
  original mockup) rather than switching to `next/font`. `next/font` would
  self-host and avoid a render-blocking request — worth doing if this goes
  to production.
- **Cart persistence**: cart state lives in `CartContext`, synced to
  `localStorage` under the key `bogan-cart`. Adding a product already in
  the cart increments its `qty` rather than creating a duplicate line; the
  drawer has +/− steppers and a remove action.
- **Scroll reveal**: each `ProductCard` re-implements the original's
  `IntersectionObserver` fade/slide-in, respecting `prefers-reduced-motion`.
- **Featured items**: 6 products (2 per category) are flagged
  `featured: true` in `data/products.js` and power the homepage grid.

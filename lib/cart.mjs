import { getProduct } from "../data/catalogue.mjs";
export const MAX_QUANTITY = 10;
export function makeLine(slug, size, colour, qty = 1) {
  const p = getProduct(slug);
  if (
    !p ||
    !p.sizes.includes(size) ||
    !p.colours.includes(colour) ||
    !Number.isInteger(qty) ||
    qty < 1 ||
    qty > MAX_QUANTITY
  )
    return null;
  return {
    key: `${slug}:${size}:${colour}`,
    slug,
    size,
    colour,
    qty,
    name: p.name,
    price: p.price,
  };
}
export function restoreCart(raw) {
  if (!Array.isArray(raw)) return [];
  const lines = new Map();
  for (const item of raw.slice(0, 250)) {
    if (!item || typeof item !== "object") continue;
    const line = makeLine(item.slug, item.size, item.colour, item.qty);
    if (!line) continue;
    const existing = lines.get(line.key);
    lines.set(line.key, {
      ...line,
      qty: Math.min(MAX_QUANTITY, line.qty + (existing?.qty || 0)),
    });
  }
  return [...lines.values()];
}
// Illustrative only. Shopify supplies approved delivery rates in live checkout.
export function shippingEstimate(subtotal, rural = false) {
  return (subtotal >= 150 ? 0 : 8) + (rural ? 5 : 0);
}

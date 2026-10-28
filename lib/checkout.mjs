import { makeLine } from "./cart.mjs";
export function checkoutLines(input, mapping) {
  if (!Array.isArray(input) || input.length === 0 || input.length > 100)
    throw new Error("Choose between 1 and 100 cart lines.");
  const seen = new Set();
  return input.map((item) => {
    const line = item && makeLine(item.slug, item.size, item.colour, item.qty);
    if (!line || seen.has(line.key))
      throw new Error(
        "Your cart has an invalid or duplicate option. Please review it.",
      );
    seen.add(line.key);
    const merchandiseId = mapping[line.key];
    if (!/^gid:\/\/shopify\/ProductVariant\/\d+$/.test(merchandiseId || ""))
      throw new Error(
        "An item is not available for checkout yet. Please review your cart.",
      );
    return { merchandiseId, quantity: line.qty };
  });
}
export function safeCheckoutUrl(value, domain) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.hostname === domain &&
      !url.username &&
      !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export function isStorefrontOrigin(originValue, host) {
  try {
    const origin = new URL(originValue);
    return (
      ["http:", "https:"].includes(origin.protocol) &&
      origin.host === host &&
      !origin.username &&
      !origin.password
    );
  } catch {
    return false;
  }
}

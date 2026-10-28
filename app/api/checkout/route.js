import { NextResponse } from "next/server";
import mapping from "@/data/shopify-variants.json";
import {
  checkoutLines,
  safeCheckoutUrl,
  isStorefrontOrigin,
} from "@/lib/checkout.mjs";
export async function POST(request) {
  const headers = { "Cache-Control": "no-store" };
  const fail = (error, status) =>
    NextResponse.json({ error }, { status, headers });
  // Next may normalise request.url to localhost behind a proxy; use the incoming Host.
  if (
    !isStorefrontOrigin(
      request.headers.get("origin"),
      request.headers.get("host"),
    )
  )
    return fail("Checkout must start from this storefront.", 403);
  if (process.env.SHOPIFY_CHECKOUT_ENABLED !== "true")
    return fail("This store is in preview. Orders are not open yet.", 503);
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(domain || "") || !token)
    return fail("Checkout is not configured yet.", 503);
  let lines;
  try {
    const text = await request.text();
    if (text.length > 30000) return fail("Cart is too large.", 413);
    lines = checkoutLines(JSON.parse(text).lines, mapping);
  } catch (error) {
    return fail(
      error instanceof SyntaxError ? "Invalid cart request." : error.message,
      400,
    );
  }
  try {
    const response = await fetch(`https://${domain}/api/2026-07/graphql.json`, {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({
        query: `mutation CreateCart($input: CartInput!) { cartCreate(input: $input) { cart { checkoutUrl lines(first: 100) { nodes { quantity merchandise { ... on ProductVariant { id } } } } } userErrors { message } warnings { message } } }`,
        variables: { input: { lines, buyerIdentity: { countryCode: "NZ" } } },
      }),
    });
    const result = await response.json();
    const created = result.data?.cartCreate;
    if (
      !response.ok ||
      result.errors?.length ||
      created?.userErrors?.length ||
      created?.warnings?.length
    )
      return fail(
        "Some gear may have changed or sold out. Please review your cart and try again.",
        409,
      );
    const actual = created?.cart?.lines?.nodes || [];
    if (
      actual.length !== lines.length ||
      lines.some(
        (line) =>
          !actual.some(
            (item) =>
              item.merchandise?.id === line.merchandiseId &&
              item.quantity === line.quantity,
          ),
      )
    )
      return fail(
        "Checkout quantities have changed. Please review your cart.",
        409,
      );
    const checkoutUrl = safeCheckoutUrl(created?.cart?.checkoutUrl, domain);
    if (!checkoutUrl)
      return fail(
        "Secure checkout is unavailable. Please try again later.",
        502,
      );
    return NextResponse.json({ checkoutUrl }, { headers });
  } catch {
    return fail(
      "Checkout could not be reached. Your cart is still here; try again shortly.",
      502,
    );
  }
}

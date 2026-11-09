import test from "node:test";
import assert from "node:assert/strict";
import { products, categories } from "../data/catalogue.mjs";
import { makeLine, restoreCart, shippingEstimate } from "../lib/cart.mjs";
import {
  checkoutLines,
  safeCheckoutUrl,
  isStorefrontOrigin,
} from "../lib/checkout.mjs";
test("the Blokes range has exactly the six approved tees and no old placeholders", () => {
  assert.equal(products.length, 6);
  assert.equal(new Set(products.map((p) => p.slug)).size, 6);
  assert.equal(new Set(products.map((p) => p.sku)).size, 6);
  assert.ok(products.every((p) => p.category === "petrolheads" && p.type === "t-shirt" && p.price === 69));
  assert.ok(products.every((p) => p.description && p.detailParagraphs.length && p.image));
  assert.equal(products.filter((p) => p.category !== "petrolheads").length, 0);
});
test("cart separates variants, consolidates duplicates, caps quantity and ignores stored prices", () => {
  const p = products[0];
  const a = makeLine(p.slug, "M", "Bitumen", 7);
  const b = makeLine(p.slug, "L", "Bitumen", 2);
  const cart = restoreCart([{ ...a, price: 0.01 }, a, b]);
  assert.equal(cart.length, 2);
  assert.equal(cart[0].qty, 10);
  assert.equal(cart[0].price, p.price);
  assert.equal(cart[1].qty, 2);
});
test("corrupt and old cart entries cannot break rendering or buy nonexistent options", () => {
  for (const value of [
    null,
    {},
    "bad",
    [null, {}, { slug: products[0].slug, qty: -1 }],
  ])
    assert.deepEqual(restoreCart(value), []);
  assert.equal(makeLine(products[0].slug, "not-a-size", "Bitumen"), null);
  assert.equal(makeLine(products[0].slug, "M", "no-colour"), null);
  assert.equal(makeLine(products[0].slug, "M", "Bitumen", 1.5), null);
});
test("delivery estimate handles threshold and rural surcharge", () => {
  assert.equal(shippingEstimate(149), 8);
  assert.equal(shippingEstimate(150), 0);
  assert.equal(shippingEstimate(150, true), 5);
  assert.equal(shippingEstimate(100, true), 13);
});
test("checkout accepts only known mapped variants and valid quantities", () => {
  const line = makeLine(products[0].slug, "M", "Bitumen");
  const mapping = { [line.key]: "gid://shopify/ProductVariant/123" };
  assert.deepEqual(checkoutLines([line], mapping), [
    { merchandiseId: mapping[line.key], quantity: 1 },
  ]);
  for (const lines of [
    [],
    [null],
    [{ ...line, qty: 11 }],
    [{ ...line, size: "oops" }],
    [line, line],
  ])
    assert.throws(() => checkoutLines(lines, mapping));
  assert.throws(() => checkoutLines([line], {}));
  assert.deepEqual(checkoutLines([{ ...line, price: 0 }], mapping), [
    { merchandiseId: mapping[line.key], quantity: 1 },
  ]);
});
test("checkout redirect is restricted to the configured HTTPS store", () => {
  const host = "bogan-test.myshopify.com";
  assert.equal(
    safeCheckoutUrl(`https://${host}/cart/c/123`, host),
    `https://${host}/cart/c/123`,
  );
  for (const url of [
    "javascript:alert(1)",
    "https://evil.test",
    `http://${host}/`,
    `https://${host}.evil.test/`,
    `https://user@${host}/`,
  ])
    assert.equal(safeCheckoutUrl(url, host), null);
});

test("same-origin checkout works with local hostnames and rejects cross-site requests", () => {
  assert.equal(
    isStorefrontOrigin("http://127.0.0.1:3002", "127.0.0.1:3002"),
    true,
  );
  assert.equal(
    isStorefrontOrigin("https://shop.example.nz", "shop.example.nz"),
    true,
  );
  assert.equal(
    isStorefrontOrigin("https://evil.example", "shop.example.nz"),
    false,
  );
  assert.equal(isStorefrontOrigin(null, "shop.example.nz"), false);
  assert.equal(
    isStorefrontOrigin(
      "https://shop.example.nz.evil.example",
      "shop.example.nz",
    ),
    false,
  );
});

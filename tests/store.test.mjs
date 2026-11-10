import test from "node:test";
import nextConfig from "../next.config.js";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { products, categories } from "../data/catalogue.mjs";
import { makeLine, restoreCart, shippingEstimate } from "../lib/cart.mjs";
import {
  checkoutLines,
  safeCheckoutUrl,
  isStorefrontOrigin,
} from "../lib/checkout.mjs";
test("Blokes and Chicks have six complete tees each with available mockups", () => {
  assert.equal(products.length, 12);
  assert.equal(new Set(products.map(p => p.slug)).size, 12);
  assert.equal(new Set(products.map(p => p.sku)).size, 12);
  for (const category of ["petrolheads", "rock-dogs"]) {
    assert.equal(products.filter(p => p.category === category).length, 6);
  }
  assert.equal(products.filter(p => p.category === "sheilas").length, 0);
  for (const p of products) {
    assert.equal(p.price, 69);
    assert.equal(p.type, "t-shirt");
    assert.ok(p.description && p.detailHeading && p.detailParagraphs.length);
    for (const image of p.images || [{src: p.image}]) {
      assert.ok(existsSync(new URL(`../public${image.src}`, import.meta.url)), image.src);
    }
    assert.ok(makeLine(p.slug, "M", "Bitumen"));
  }
  const earlyNight = products.find(p => p.id === 1306);
  assert.equal(earlyNight.images.length, 2);
  assert.ok(earlyNight.images.some(image => image.src.endsWith("-front.webp")));
  assert.ok(earlyNight.images.some(image => image.src.endsWith("-back.webp")));
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

 test("current collection URLs are never redirected away from their ranges", async () => {
  const redirects = await nextConfig.redirects();
  for (const category of categories) {
    assert.ok(!redirects.some(rule => rule.source === `/collections/${category.slug}`));
  }
});

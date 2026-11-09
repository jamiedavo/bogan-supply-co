"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/data/products";
import { shippingEstimate } from "@/lib/cart.mjs";
export default function CheckoutReview({ enabled }) {
  const { cart, hydrated, totalPrice, updateQty, removeFromCart } = useCart();
  const [rural, setRural] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const delivery = shippingEstimate(totalPrice, rural);
  async function checkout() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: cart.map(({ slug, size, colour, qty }) => ({
            slug,
            size,
            colour,
            qty,
          })),
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error || "Checkout is unavailable. Please try again.",
        );
      window.location.assign(data.checkoutUrl);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }
  if (!hydrated) return <p role="status">Loading your gear…</p>;
  if (!cart.length)
    return (
      <div className="border border-ink/20 p-8">
        <p className="mb-5">Your cart is empty. Let’s fix that.</p>
        <Link href="/collections" className="button-primary inline-block">
          Find your gear →
        </Link>
      </div>
    );
  return (
    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">
      <section aria-label="Order items">
        {cart.map((item) => (
          <div key={item.key} className="border-t border-ink/15 py-6">
            <div className="flex justify-between gap-4">
              <div>
                <Link
                  className="font-semibold hover:text-red"
                  href={`/products/${item.slug}`}
                >
                  {item.name}
                </Link>
                <p className="text-sm text-ink/65 mt-2">
                  {item.colour} / Size {item.size}
                </p>
              </div>
              <span className="font-mono text-sm">
                {formatMoney(item.price * item.qty)}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <label className="field-label flex items-center gap-3">
                Qty
                <select
                  className="field mt-0 w-20"
                  value={item.qty}
                  onChange={(e) => updateQty(item.key, Number(e.target.value))}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </label>
              <button
                onClick={() => removeFromCart(item.key)}
                className="text-xs underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <Link href="/collections" className="inline-block underline mt-6">
          ← Keep shopping
        </Link>
      </section>
      <aside className="bg-bone p-6 sm:p-8 self-start">
        <h2 className="font-display text-2xl mb-6 uppercase">The damage</h2>
        <div className="flex justify-between mb-4">
          <span>Gear subtotal</span>
          <span>{formatMoney(totalPrice)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Delivery estimate</span>
          <span>{formatMoney(delivery)}</span>
        </div>
        <label className="flex items-center gap-3 text-sm py-3">
          <input
            type="checkbox"
            checked={rural}
            onChange={(e) => setRural(e.target.checked)}
            className="accent-red w-5 h-5"
          />
          Rural delivery (+$5 estimate)
        </label>
        <p className="text-xs text-ink/65 mb-6">
          Illustrative NZ rates: $8 standard, free standard delivery from $150.
          Rural surcharge still applies. Final delivery and tax are confirmed in
          live checkout.
        </p>
        <div className="border-t border-ink/20 pt-5 flex justify-between text-lg font-semibold">
          <span>Estimated total</span>
          <span>{formatMoney(totalPrice + delivery)} NZD</span>
        </div>
        {enabled ? (
          <>
            <button
              disabled={busy}
              onClick={checkout}
              className="button-primary w-full mt-6"
            >
              {busy ? "Opening checkout…" : "Continue to secure checkout →"}
            </button>
            <p className="text-xs mt-4">
              Confirm address, availability, final price, and payment at Shopify
              checkout.
            </p>
          </>
        ) : (
          <div className="border border-red/40 p-4 mt-6">
            <p className="font-semibold text-sm mb-2">
              Store preview — orders aren’t open yet.
            </p>
            <p className="text-xs leading-relaxed">
              You can try the full cart. These are proposed designs and prices;
              payment and orders will open after the range is approved.
            </p>
          </div>
        )}
        {error && (
          <p role="alert" className="text-red text-sm mt-4">
            {error}
          </p>
        )}
      </aside>
    </div>
  );
}

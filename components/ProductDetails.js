"use client";
import { useState } from "react";
import Link from "next/link";
import GarmentArt from "./GarmentArt";
import { colours, formatMoney } from "@/data/products";
import { useCart } from "@/context/CartContext";
export default function ProductDetails({ product }) {
  const [size, setSize] = useState("");
  const [colour, setColour] = useState("Bitumen");
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const { addToCart, hydrated } = useCart();
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
      <div className="bg-bone aspect-[4/5]">
        <GarmentArt product={product} colour={colour} />
      </div>
      <div className="py-4">
        <p className="eyebrow">
          {product.category} / {product.type} / {product.sku}
        </p>
        <h1 className="font-display text-4xl lg:text-5xl uppercase leading-tight mb-4">
          {product.name}
        </h1>
        <p className="font-mono text-xl mb-6">
          {formatMoney(product.price)} NZD{" "}
          <span className="text-xs text-ink/60">/ draft price</span>
        </p>
        <p className="mb-6 leading-relaxed">{product.description}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!size) {
              setMessage("Choose a size first, legend.");
              return;
            }
            if (addToCart(product, size, colour, qty))
              setMessage("Added to your cart.");
          }}
        >
          <fieldset className="mb-6">
            <legend className="field-label mb-3">Colour — {colour}</legend>
            <div className="flex gap-3">
              {product.colours.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={c}
                  aria-pressed={colour === c}
                  onClick={() => setColour(c)}
                  className={`w-11 h-11 rounded-full border-2 ${colour === c ? "border-red ring-2 ring-red/20" : "border-ink/20"}`}
                  style={{ background: colours[c] }}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="mb-6">
            <legend className="field-label mb-3">
              {product.category === "kids" ? "Size — age label" : "Size"}
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => {
                    setSize(s);
                    setMessage("");
                  }}
                  className={`filter-pill min-w-12 ${size === s ? "active" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
          <p className="text-xs text-ink/65 mb-6">
            Fits and measurements are awaiting supplier confirmation.{" "}
            <Link href="/help#sizing" className="underline">
              Sizing notes ↗
            </Link>
          </p>
          <div className="flex gap-3">
            <label className="field-label">
              Qty
              <select
                aria-label="Quantity"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="field mt-0"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1}>{i + 1}</option>
                ))}
              </select>
            </label>
            <button
              disabled={!hydrated}
              className="button-primary flex-1 self-end"
            >
              Add to cart — {formatMoney(product.price * qty)}
            </button>
          </div>
          <p role="status" className="min-h-8 text-sm text-red pt-3">
            {message}
          </p>
        </form>
        <details open className="border-t border-ink/15 py-5">
          <summary className="cursor-pointer font-semibold">
            The proposed garment
          </summary>
          <p className="text-sm text-ink/65 mt-3 leading-relaxed">
            {product.details} Artwork, fabric, fit, and final price are concepts
            for review, pending production samples.
          </p>
        </details>
        <details className="border-t border-ink/15 py-5">
          <summary className="cursor-pointer font-semibold">
            Delivery & returns
          </summary>
          <p className="text-sm text-ink/65 mt-3">
            New Zealand delivery is planned. Rates in the cart are illustrative.
            Dispatch timing and return instructions will be published before
            launch.{" "}
            <Link href="/help#delivery" className="underline">
              More details
            </Link>
          </p>
        </details>
      </div>
    </div>
  );
}

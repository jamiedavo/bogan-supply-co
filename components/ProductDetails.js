"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, formatMoney } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { MAX_QUANTITY } from "@/lib/cart.mjs";
import ProductGallery from "./ProductGallery";

export default function ProductDetails({ product }) {
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const { addToCart, hydrated } = useCart();
  const category = categories.find((c) => c.slug === product.category);

  return (
    <div className="grid gap-5 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-x-8 lg:gap-x-16">
      <header className="min-w-0 md:col-start-2 md:row-start-1">
        <p className="eyebrow mb-3">
          {category?.name} / T-shirt / {product.sku}
        </p>
        <h1 className="font-display text-4xl lg:text-5xl uppercase leading-tight mb-3">
          {product.name}
        </h1>
        <p className="font-mono text-xl">
          {formatMoney(product.price)}{" "}
          <span className="text-xs text-ink/60">NZD</span>
        </p>
      </header>

      <div className="min-w-0 self-start md:col-start-1 md:row-start-1 md:row-span-2">
        <ProductGallery key={product.slug} product={product} />
      </div>

      <div className="min-w-0 md:col-start-2 md:row-start-2">
        <p className="text-sm leading-relaxed text-ink/75 mb-5">
          {product.shortDescription || product.description}
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!size) {
              setMessage("Choose a size first, legend.");
              return;
            }
            if (addToCart(product, size, product.colours[0], qty)) {
              setMessage("Added to your cart.");
            }
          }}
        >
          <fieldset className="mb-4">
            <legend className="field-label mb-2">Colour: Washed black</legend>
            <span className="inline-flex items-center gap-3 text-sm">
              <span className="w-6 h-6 rounded-full border-2 border-red bg-[#242422]" />
              Black
            </span>
          </fieldset>
          <fieldset className="mb-4">
            <legend className="field-label mb-3">Size</legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  type="button"
                  key={option}
                  aria-pressed={size === option}
                  onClick={() => {
                    setSize(option);
                    setMessage("");
                  }}
                  className={`filter-pill min-w-12 ${size === option ? "active" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <p className="text-xs text-ink/65 mb-5">
            Fit and size measurements awaiting supplier confirmation.{" "}
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
                onChange={(event) => setQty(Number(event.target.value))}
                className="field mt-0"
              >
                {Array.from({ length: MAX_QUANTITY }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
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

        <details className="border-t border-ink/15 py-5">
          <summary className="cursor-pointer font-semibold">About this design</summary>
          <div className="space-y-3 mt-4 text-sm leading-relaxed text-ink/75">
            <p className="font-semibold uppercase">{product.detailHeading}</p>
            {product.detailParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </details>
        <details className="border-t border-ink/15 py-5">
          <summary className="cursor-pointer font-semibold">Garment information</summary>
          <p className="text-sm text-ink/65 mt-3 leading-relaxed">{product.details}</p>
        </details>
        <details className="border-t border-ink/15 py-5">
          <summary className="cursor-pointer font-semibold">Delivery & returns</summary>
          <p className="text-sm text-ink/65 mt-3">
            Shipping and returns information will be confirmed before checkout goes live.{" "}
            <Link href="/help#delivery" className="underline">
              Learn more ↗
            </Link>
          </p>
        </details>
      </div>
    </div>
  );
}

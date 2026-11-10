"use client";
import { useState } from "react";
import Link from "next/link";
import { categories, formatMoney } from "@/data/products";
import { useCart } from "@/context/CartContext";
export default function ProductDetails({ product }) {
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const { addToCart, hydrated } = useCart();
  const [imageIndex, setImageIndex] = useState(0);
  const images = product.images || [{src: product.image, alt: `${product.name} BOGAN T-shirt mockup`}];
  const category = categories.find(c => c.slug === product.category);
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
      <div className="bg-bone overflow-hidden">
        <img className="w-full h-auto object-cover" src={images[imageIndex].src}
          alt={images[imageIndex].alt} />
        {images.length > 1 && <div className="flex gap-3 p-4">{images.map((image, i) => <button key={image.src} type="button" aria-pressed={i === imageIndex} onClick={() => setImageIndex(i)} className={`filter-pill ${i === imageIndex ? "active" : ""}`}>{image.src.includes("-back.webp") ? "Back" : "Front"}</button>)}</div>}
      </div>
      <div className="py-4">
        <p className="eyebrow">{category?.name} / T-shirt / {product.sku}</p>
        <h1 className="font-display text-4xl lg:text-5xl uppercase leading-tight mb-4">{product.name}</h1>
        <p className="font-mono text-xl mb-6">{formatMoney(product.price)} <span className="text-xs text-ink/60">NZD</span></p>
        <p className="text-lg font-semibold uppercase leading-snug mb-5">{product.detailHeading}</p>
        <div className="space-y-4 mb-8 text-ink/75 leading-relaxed">
          {product.detailParagraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
          <p className="font-semibold tracking-wide text-sm">BOGAN SUPPLY CO.</p>
        </div>
        <form onSubmit={(e)=>{
          e.preventDefault();
          if(!size){setMessage("Choose a size first, legend.");return;}
          if(addToCart(product,size,"Bitumen",qty)) setMessage("Added to your cart.");
        }}>
          <fieldset className="mb-6">
            <legend className="field-label mb-3">Colour: Washed black</legend>
            <span className="inline-flex items-center gap-3 text-sm"><span className="w-8 h-8 rounded-full border-2 border-red bg-[#242422]" /> Black</span>
          </fieldset>
          <fieldset className="mb-6">
            <legend className="field-label mb-3">Size</legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(s=><button type="button" key={s} aria-pressed={size===s}
                onClick={()=>{setSize(s);setMessage("");}}
                className={`filter-pill min-w-12 ${size===s?"active":""}`}>{s}</button>)}
            </div>
          </fieldset>
          <p className="text-xs text-ink/65 mb-6">Fit and size measurements awaiting supplier confirmation. <Link href="/help#sizing" className="underline">Sizing notes ↗</Link></p>
          <div className="flex gap-3">
            <label className="field-label">Qty
              <select aria-label="Quantity" value={qty} onChange={e=>setQty(Number(e.target.value))} className="field mt-0">
                {Array.from({length:10},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
              </select>
            </label>
            <button disabled={!hydrated} className="button-primary flex-1 self-end">Add to cart — {formatMoney(product.price*qty)}</button>
          </div>
          <p role="status" className="min-h-8 text-sm text-red pt-3">{message}</p>
        </form>
        <details className="border-t border-ink/15 py-5">
          <summary className="cursor-pointer font-semibold">Garment information</summary>
          <p className="text-sm text-ink/65 mt-3 leading-relaxed">{product.details}</p>
        </details>
        <details className="border-t border-ink/15 py-5">
          <summary className="cursor-pointer font-semibold">Delivery & returns</summary>
          <p className="text-sm text-ink/65 mt-3">Shipping and returns information will be confirmed before checkout goes live. <Link href="/help#delivery" className="underline">Learn more ↗</Link></p>
        </details>
      </div>
    </div>
  );
}

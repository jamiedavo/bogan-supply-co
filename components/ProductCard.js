import Link from "next/link";
import GarmentArt from "./GarmentArt";
import { categories, formatMoney } from "@/data/products";
export default function ProductCard({ product, index = 0 }) {
  return (
    <article className="bg-singlet flex flex-col group">
      <Link
        href={`/products/${product.slug}`}
        className={`relative aspect-[4/5] block overflow-hidden ${index % 2 ? "bg-bone-deep" : "bg-bone"}`}
        aria-label={`View ${product.name}`}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-display text-[15vw] md:text-[4.2vw] text-ink/[0.07] select-none">
            {product.placeholderWord}
          </span>
        )}
        <span className="absolute top-3.5 right-3.5 flex flex-col items-end gap-0.5 bg-red text-singlet px-2.5 py-[7px] rotate-3 shadow-[0_1px_0_rgba(0,0,0,0.15)]">
          <span className="font-mono text-[10px] tracking-[0.06em] opacity-85">
            {product.sku}
          </span>
          <span className="font-mono text-[13px] font-medium">${product.price}</span>
        </span>
        <span className="absolute left-3.5 bottom-3 font-mono text-[10px] tracking-[0.1em] uppercase text-steel">
          {product.photoNote}
        <GarmentArt product={product} />
        <span className="absolute top-3 right-3 bg-red text-singlet px-3 py-2 rotate-3 font-mono text-xs">
          {formatMoney(product.price)}
        </span>
        <span className="absolute left-4 bottom-3 font-mono text-[9px] tracking-widest uppercase text-ink/60">
          Design concept / {product.type}
        </span>
      </Link>
      <div className="p-[22px] flex flex-col flex-1">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink/60 mb-2">
          {categories.find((c) => c.slug === product.category)?.name} /{" "}
          {product.type === "t-shirt" ? "T-shirt" : "Hoodie"}
        </p>
        <h3 className="text-[17px] font-semibold mb-2">
          <Link href={`/products/${product.slug}`} className="hover:text-red">
            {product.name}
          </Link>
        </h3>
        <p className="text-[13px] text-ink/65 leading-relaxed mb-5">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="font-mono text-sm">
            {formatMoney(product.price)}{" "}
            <span className="text-[10px]">NZD</span>
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="text-[11px] tracking-wider uppercase border border-ink px-3 py-3 hover:bg-ink hover:text-singlet"
          >
            Choose options ↗
          </Link>
        </div>
      </div>
    </article>
  );
}

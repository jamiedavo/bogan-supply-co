import Link from "next/link";
import { formatMoney } from "@/data/products";
export default function ProductCard({ product, index = 0 }) {
  return (
    <article className="bg-singlet flex flex-col">
      <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}
        className={`relative aspect-[4/5] block overflow-hidden ${index % 2 ? "bg-bone-deep" : "bg-bone"}`}>
        <img src={product.image} alt={`${product.name} BOGAN tee on model`} loading="lazy"
          className="h-full w-full object-cover hover:scale-[1.025] transition-transform duration-300" />
        <span className="absolute top-3 right-3 bg-red text-singlet px-3 py-2 rotate-3 font-mono text-xs">
          {formatMoney(product.price)}
        </span>
      </Link>
      <div className="p-[22px] flex flex-col flex-1">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink/60 mb-2">BOGAN / Blokes / T-shirt</p>
        <h3 className="text-[17px] font-semibold mb-2">
          <Link href={`/products/${product.slug}`} className="hover:text-red">{product.name}</Link>
        </h3>
        <p className="text-[13px] text-ink/65 leading-relaxed mb-5">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="font-mono text-sm">{formatMoney(product.price)} <span className="text-[10px]">NZD</span></span>
          <Link href={`/products/${product.slug}`} className="text-[11px] tracking-wider uppercase border border-ink px-3 py-3 hover:bg-ink hover:text-singlet">Take a closer look ↗</Link>
        </div>
      </div>
    </article>
  );
}

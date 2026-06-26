"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, index }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // Reveal-on-scroll, same behavior as the original mockup's IntersectionObserver.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  // Alternate tile background, matching the original .card:nth-child(even) rule.
  const altBg = index % 2 === 1;

  return (
    <article
      ref={ref}
      className={`bg-singlet flex flex-col transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[18px]"
      }`}
    >
      <div
        className={`relative aspect-[4/5] flex items-center justify-center overflow-hidden ${
          altBg ? "bg-bone-deep" : "bg-bone"
        }`}
      >
        <span className="font-display text-[15vw] md:text-[4.2vw] text-ink/[0.07] select-none">
          {product.placeholderWord}
        </span>
        <span className="absolute top-3.5 right-3.5 flex flex-col items-end gap-0.5 bg-red text-singlet px-2.5 py-[7px] rotate-3 shadow-[0_1px_0_rgba(0,0,0,0.15)]">
          <span className="font-mono text-[10px] tracking-[0.06em] opacity-85">
            {product.sku}
          </span>
          <span className="font-mono text-[13px] font-medium">${product.price}</span>
        </span>
        <span className="absolute left-3.5 bottom-3 font-mono text-[10px] tracking-[0.1em] uppercase text-steel">
          {product.photoNote}
        </span>
      </div>

      <div className="px-[22px] pt-5 pb-[22px] flex-1 flex flex-col">
        <h3 className="text-[17px] font-semibold mb-1.5">{product.name}</h3>
        <p className="text-[13px] text-steel leading-[1.5] mb-[18px]">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2.5">
          <span className="font-mono text-sm">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className={`text-[11px] tracking-[0.08em] uppercase border px-3.5 py-2.5 transition-colors duration-150 ${
              added
                ? "bg-red border-red text-singlet"
                : "border-ink hover:bg-ink hover:text-singlet"
            }`}
          >
            {added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

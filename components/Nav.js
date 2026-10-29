"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { totalCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = scrolled ? "text-ink" : "text-bone";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 border-b transition-[background-color,padding,border-color] duration-300 ease-out ${
        scrolled
          ? "bg-singlet/95 border-ink/[0.08] py-3"
          : "bg-transparent border-transparent py-[18px]"
      }`}
    >
      <Link href="/" className={`font-display text-lg leading-none tracking-[0.03em] transition-colors duration-300 ${linkColor}`}>
        BOGAN
        <span className="block font-mono text-[9px] leading-none tracking-[0.2em] font-normal uppercase">
          Supply Co.
        </span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-7">
        <div
          className="relative"
          onMouseEnter={() => setShopOpen(true)}
          onMouseLeave={() => setShopOpen(false)}
        >
          <button
            className={`text-[13px] tracking-[0.05em] uppercase transition-colors duration-300 hover:text-red ${linkColor}`}
          >
            Shop
          </button>
          {shopOpen && (
            <div className="absolute left-0 top-full pt-3 w-48">
              <div className="bg-singlet border border-ink/[0.08] shadow-lg">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/collections/${cat.slug}`}
                    className="block px-4 py-3 text-[13px] uppercase tracking-[0.05em] text-ink hover:bg-bone hover:text-red transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <a
          href="#manifesto"
          className={`text-[13px] tracking-[0.05em] uppercase transition-colors duration-300 hover:text-red ${linkColor}`}
        >
          Manifesto
        </a>

        <button
          onClick={openCart}
          aria-label="Open cart"
          className={`flex items-center gap-1.5 text-[13px] tracking-[0.05em] uppercase transition-colors duration-300 ${linkColor}`}
        >
          Cart
          <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-red text-singlet font-mono text-[11px]">
            {totalCount}
          </span>
        </button>
      </div>

      {/* Mobile toggle */}
      <div className="md:hidden flex items-center gap-4">
        <button
          className={`transition-colors duration-300 ${linkColor}`}
          onClick={openCart}
          aria-label="Open cart"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-[21px] w-[21px]"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          >
            <path d="M4 5h2l2.2 10.2a2 2 0 0 0 2 1.6h7.3a2 2 0 0 0 1.9-1.4L21 8H7" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          <span className="sr-only">Cart ({totalCount})</span>
        </button>
        <button
          className={`text-[22px] transition-colors duration-300 ${linkColor}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          &#9776;
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-singlet border-b border-ink/[0.08] md:hidden">
          <div className="flex flex-col p-6 gap-1">
            <button
              className="flex items-center justify-between text-left text-[13px] tracking-[0.05em] uppercase py-2 text-ink"
              onClick={() => setShopOpen((v) => !v)}
            >
              Shop <span>{shopOpen ? "\u2212" : "+"}</span>
            </button>
            {shopOpen &&
              categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/collections/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="pl-4 py-2 text-[13px] tracking-[0.05em] uppercase text-steel"
                >
                  {cat.name}
                </Link>
              ))}
            <a
              href="#manifesto"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-[13px] tracking-[0.05em] uppercase text-ink"
            >
              Manifesto
            </a>
            <button
              onClick={() => {
                openCart();
                setMobileOpen(false);
              }}
              className="py-2 text-[13px] tracking-[0.05em] uppercase text-ink text-left"
            >
              Cart ({totalCount})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

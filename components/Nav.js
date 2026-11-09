"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const pathname = usePathname();
  const solid = scrolled || pathname !== "/";
  const linkColor = solid ? "text-ink" : "text-bone";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 border-b transition-[background-color,padding,border-color] duration-300 ease-out ${
        scrolled
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 border-b transition-[background-color,padding,border-color] duration-300 ease-out ${
        solid
          ? "bg-singlet/95 border-ink/[0.08] py-3"
          : "bg-transparent border-transparent py-6 md:py-[18px]"
      }`}
    >
      <Link href="/" className={`font-display text-[30px] md:text-lg leading-[0.85] tracking-[0.03em] transition-colors duration-300 ${linkColor}`}>
      <Link
        href="/"
        className={`font-display text-lg tracking-[0.03em] transition-colors duration-300 ${linkColor}`}
      >
        BOGAN
        <span className="block font-mono text-[10px] md:text-[9px] leading-none tracking-[0.2em] font-normal uppercase text-red md:text-current mt-1 md:mt-0">
          Supply Co.
        </span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-7">
        <div
          className="relative"
          onKeyDown={(e) => {
            if (e.key === "Escape") setShopOpen(false);
          }}
        >
          <button
            onClick={() => setShopOpen((v) => !v)}
            aria-expanded={shopOpen}
            className={`text-[13px] tracking-[0.05em] uppercase transition-colors duration-300 hover:text-red ${linkColor}`}
          >
            Shop
          </button>
          {shopOpen && (
            <div className="absolute left-0 top-full pt-3 w-48">
              <div className="bg-singlet border border-ink/[0.08] shadow-lg">
                <Link
                  href="/collections"
                  onClick={() => setShopOpen(false)}
                  className="block px-4 py-3 text-sm text-ink hover:bg-bone"
                >
                  All gear →
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/collections/${cat.slug}`}
                    onClick={() => setShopOpen(false)}
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
          href="/#manifesto"
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
      <div className="md:hidden flex items-center gap-6">
        <button
          className={`flex items-center justify-center transition-colors duration-300 ${linkColor}`}
          onClick={openCart}
          aria-label="Open cart"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          >
            <path d="M9 12V9a7 7 0 0 1 14 0v3" />
            <path d="M6 11h20l-1 16H7L6 11Z" />
          </svg>
          <span className="sr-only">Cart ({totalCount})</span>
        </button>
        <button
          className={`flex items-center justify-center transition-colors duration-300 ${linkColor}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 7h26M3 16h26M3 25h26" />
          </svg>
        </button>
      </div>
      <button
        className={`md:hidden text-[22px] transition-colors duration-300 ${linkColor}`}
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
        aria-label="Toggle menu"
      >
        &#9776;
      </button>

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
            <Link
              href="/collections"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm text-ink"
            >
              All gear →
            </Link>
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
              href="/#manifesto"
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

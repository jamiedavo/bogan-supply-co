"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/data/products";
export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQty, removeFromCart, totalPrice } =
    useCart();
  const dialog = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") closeCart();
      if (e.key !== "Tab") return;
      const focusable = dialog.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex="0"]',
      );
      const first = focusable[0],
        last = focusable[focusable.length - 1];
      if (
        e.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === dialog.current)
      ) {
        e.preventDefault();
        last?.focus();
      } else if (
        !e.shiftKey &&
        (document.activeElement === last ||
          document.activeElement === dialog.current)
      ) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [isOpen, closeCart]);
  if (!isOpen) return null;
  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden="true"
        className="fixed inset-0 bg-ink/50 z-[60]"
      />
      <div
        ref={dialog}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
        className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-singlet z-[70] flex flex-col shadow-xl"
      >
        <div className="flex justify-between items-center p-6 border-b border-ink/15">
          <h2 id="cart-heading" className="font-display text-2xl uppercase">
            Your gear
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-11 h-11 text-3xl"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div>
              <p className="mb-6">
                Nothing in here yet. The shed won’t stock itself.
              </p>
              <Link
                href="/collections"
                onClick={closeCart}
                className="underline"
              >
                Shop all gear →
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.key} className="py-5 border-b border-ink/15">
                <div className="flex justify-between gap-4">
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeCart}
                    className="font-semibold text-sm hover:text-red"
                  >
                    {item.name}
                  </Link>
                  <span className="font-mono text-sm">
                    {formatMoney(item.price * item.qty)}
                  </span>
                </div>
                <p className="text-xs text-ink/65 my-2">
                  {item.colour} / Size {item.size}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.key, item.qty - 1)}
                      aria-label={`Decrease ${item.name}, size ${item.size}, ${item.colour}`}
                      className="quantity-button"
                    >
                      −
                    </button>
                    <span className="font-mono text-sm" aria-live="polite">
                      {item.qty}
                    </span>
                    <button
                      disabled={item.qty >= 10}
                      onClick={() => updateQty(item.key, item.qty + 1)}
                      aria-label={`Increase ${item.name}, size ${item.size}, ${item.colour}`}
                      className="quantity-button"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.key)}
                    className="underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-6 border-t border-ink/15">
          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span className="font-mono">{formatMoney(totalPrice)} NZD</span>
          </div>
          <p className="text-xs text-ink/65 mb-5">
            Draft range. Delivery estimate on the next step. No payment is taken
            in preview.
          </p>
          {cart.length > 0 && (
            <Link
              href="/checkout"
              onClick={closeCart}
              className="button-primary block text-center"
            >
              Review your order →
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

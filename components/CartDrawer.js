"use client";

import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQty, removeFromCart, totalPrice } = useCart();

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 bg-ink/40 z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-singlet z-[70] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Cart"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/[0.08]">
          <h3 className="font-display text-lg uppercase">Your cart</h3>
          <button onClick={closeCart} aria-label="Close cart" className="text-2xl leading-none">
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <p className="text-sm text-steel">Nothing in here yet. Go add something heavyweight.</p>
          ) : (
            <div className="flex flex-col gap-5">
              {cart.map((item) => (
                <div key={item.slug} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.slug, item.qty - 1)}
                        aria-label={`Decrease ${item.name} quantity`}
                        className="w-6 h-6 border border-ink/20 text-xs leading-none"
                      >
                        &minus;
                      </button>
                      <span className="font-mono text-xs w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.slug, item.qty + 1)}
                        aria-label={`Increase ${item.name} quantity`}
                        className="w-6 h-6 border border-ink/20 text-xs leading-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-mono text-sm">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.slug)}
                      className="text-steel text-xs underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-5 border-t border-ink/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm uppercase tracking-[0.05em]">Total</span>
            <span className="font-mono text-base">${totalPrice.toFixed(2)}</span>
          </div>
          <a
            href="#"
            className="block text-center bg-red text-singlet py-3.5 text-[13px] uppercase tracking-[0.08em] font-semibold transition-colors hover:bg-red-dark"
          >
            Checkout
          </a>
        </div>
      </div>
    </>
  );
}

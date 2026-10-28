"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { makeLine, restoreCart, MAX_QUANTITY } from "@/lib/cart.mjs";
const CartContext = createContext(undefined);
const STORAGE_KEY = "bogan-cart-v2";
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      setCart(
        restoreCart(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")),
      );
    } catch {
      /* Empty cart if storage is unavailable. */
    }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      } catch {
        /* In-memory cart still works. */
      }
    }
  }, [cart, hydrated]);
  const addToCart = useCallback((product, size, colour, qty = 1) => {
    const line = makeLine(product.slug, size, colour, qty);
    if (!line) return false;
    setCart((prev) => restoreCart([...prev, line]));
    setIsOpen(true);
    return true;
  }, []);
  const updateQty = useCallback((key, qty) => {
    if (!Number.isInteger(qty)) return;
    setCart((prev) =>
      qty <= 0
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) =>
            item.key === key
              ? { ...item, qty: Math.min(qty, MAX_QUANTITY) }
              : item,
          ),
    );
  }, []);
  const removeFromCart = useCallback(
    (key) => setCart((prev) => prev.filter((item) => item.key !== key)),
    [],
  );
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  return (
    <CartContext.Provider
      value={{
        cart,
        hydrated,
        isOpen,
        addToCart,
        updateQty,
        removeFromCart,
        openCart,
        closeCart,
        totalCount: cart.reduce((s, i) => s + i.qty, 0),
        totalPrice: cart.reduce((s, i) => s + i.qty * i.price, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartProvider is required");
  return ctx;
}

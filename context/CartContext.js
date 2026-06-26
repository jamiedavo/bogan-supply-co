"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const CartContext = createContext(undefined);
const STORAGE_KEY = "bogan-cart";

export function CartProvider({ children }) {
  // cart is an array of { slug, name, price, qty }
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load any persisted cart on first mount (client-only — localStorage
  // doesn't exist during server rendering).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {
      // Corrupt or inaccessible storage — start with an empty cart.
    }
    setHydrated(true);
  }, []);

  // Persist on every change, once the initial load has happened (so we
  // don't immediately overwrite saved data with the empty initial state).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Storage full or unavailable — fail silently, cart still works in-memory.
    }
  }, [cart, hydrated]);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.slug === product.slug);
      if (existing) {
        // Already in the cart — bump quantity instead of adding a duplicate line.
        return prev.map((item) =>
          item.slug === product.slug ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        { slug: product.slug, name: product.name, price: product.price, qty: 1 },
      ];
    });
  }, []);

  const updateQty = useCallback((slug, qty) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((item) => item.slug !== slug);
      return prev.map((item) => (item.slug === slug ? { ...item, qty } : item));
    });
  }, []);

  const removeFromCart = useCallback((slug) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug));
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const value = {
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    isOpen,
    openCart,
    closeCart,
    totalCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

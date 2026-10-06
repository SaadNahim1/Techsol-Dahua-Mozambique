/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Product, QuoteItem } from '../types';
import { 
  loadCartFromStorage, 
  saveCartToStorage, 
  rehydrateCartItems, 
  serializeCartItems, 
  clearCartStorage 
} from '../utils/cartStorage';

export function useCart() {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    const stored = loadCartFromStorage();
    return rehydrateCartItems(stored);
  });

  // Keep storage in sync with items
  useEffect(() => {
    const compact = serializeCartItems(items);
    saveCartToStorage(compact);
  }, [items]);

  // Listen to cross-tab or external storage changes (e.g. after returning from another window)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'techsol_cart_normalized_v3') {
        const stored = loadCartFromStorage();
        const rehydrated = rehydrateCartItems(stored);
        setItems(rehydrated);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getItemQuantity = useCallback((productId: string): number => {
    const found = items.find((i) => i.product.id === productId);
    return found ? found.quantity : 0;
  }, [items]);

  const addToCart = useCallback((product: Product, quantityToAdd: number = 1) => {
    if (!product || !product.id) return;
    const addQty = Math.max(1, Math.floor(quantityToAdd));

    setItems((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx >= 0) {
        return prev.map((item, i) =>
          i === idx
            ? { ...item, quantity: Math.min(999, item.quantity + addQty) }
            : item
        );
      }
      return [...prev, { product, quantity: addQty }];
    });
  }, []);

  const addMultipleToCart = useCallback((products: Product[]) => {
    if (!products || products.length === 0) return;

    setItems((prev) => {
      const copy = [...prev];
      for (const prod of products) {
        if (!prod || !prod.id) continue;
        const idx = copy.findIndex((item) => item.product.id === prod.id);
        if (idx >= 0) {
          copy[idx] = {
            ...copy[idx],
            quantity: Math.min(999, copy[idx].quantity + 1),
          };
        } else {
          copy.push({ product: prod, quantity: 1 });
        }
      }
      return copy;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    if (!productId) return;

    if (newQuantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }

    const clamped = Math.min(999, Math.floor(newQuantity));
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: clamped } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    if (!productId) return;
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    clearCartStorage();
  }, []);

  const totalCount = useMemo(() => {
    return items.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [items]);

  const totalAmountMZN = useMemo(() => {
    return items.reduce((acc, curr) => acc + (curr.product.priceMZN || 0) * curr.quantity, 0);
  }, [items]);

  return {
    items,
    totalCount,
    totalAmountMZN,
    getItemQuantity,
    addToCart,
    addMultipleToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
}

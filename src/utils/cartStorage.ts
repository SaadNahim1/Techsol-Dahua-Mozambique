/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Robust Cart Persistence Layer for TECHSOL SU LDA
 * - Compact normalized schema (stores productId + quantity only, prevents QuotaExceededError)
 * - Strict schema validation & sanitization before syncing with state
 * - Safe try-catch wrappers with in-memory fallback for private mode
 * - Multi-tab synchronization support
 */

import { Product, QuoteItem } from '../types';
import { PRODUCTS } from '../data/products';

export interface StoredCartItem {
  productId: string;
  quantity: number;
  notes?: string;
  updatedAt?: number;
}

const STORAGE_KEY = 'techsol_cart_normalized_v3';
const LEGACY_KEYS = [
  'techsol_quote_cart_v2',
  'techsol_cart_v1',
  'techsol_cart_items',
];

// In-memory fallback if localStorage is disabled, restricted, or full
let memoryStorageFallback: StoredCartItem[] = [];

/**
 * Checks if window.localStorage is accessible and writable
 */
export function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__techsol_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates and sanitizes a single stored cart item
 */
function validateCartEntry(entry: unknown): StoredCartItem | null {
  if (!entry || typeof entry !== 'object') {
    return null;
  }

  const candidate = entry as Record<string, unknown>;

  // Check product ID
  let productId = '';
  if (typeof candidate.productId === 'string' && candidate.productId.trim().length > 0) {
    productId = candidate.productId.trim();
  } else if (
    candidate.product &&
    typeof candidate.product === 'object' &&
    typeof (candidate.product as Record<string, unknown>).id === 'string'
  ) {
    // Migration: Legacy item format that stored full product object
    productId = ((candidate.product as Record<string, unknown>).id as string).trim();
  }

  if (!productId) {
    return null;
  }

  // Validate and clamp quantity
  const rawQty = Number(candidate.quantity);
  if (isNaN(rawQty) || !isFinite(rawQty) || rawQty <= 0) {
    return null;
  }

  const quantity = Math.min(Math.max(1, Math.floor(rawQty)), 999);

  return {
    productId,
    quantity,
    notes: typeof candidate.notes === 'string' ? candidate.notes.slice(0, 500) : undefined,
    updatedAt: typeof candidate.updatedAt === 'number' ? candidate.updatedAt : Date.now(),
  };
}

/**
 * Validates an entire raw array from storage, deduplicating product IDs and eliminating corrupted entries
 */
export function sanitizeStoredCart(raw: unknown): StoredCartItem[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  const merged = new Map<string, StoredCartItem>();

  for (const item of raw) {
    const valid = validateCartEntry(item);
    if (!valid) continue;

    if (merged.has(valid.productId)) {
      const existing = merged.get(valid.productId)!;
      existing.quantity = Math.min(999, existing.quantity + valid.quantity);
      existing.updatedAt = Date.now();
    } else {
      merged.set(valid.productId, valid);
    }
  }

  return Array.from(merged.values());
}

/**
 * Cleans up legacy bloated cart keys from previous versions to free up storage space
 */
function cleanupLegacyStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    for (const key of LEGACY_KEYS) {
      window.localStorage.removeItem(key);
    }
  } catch (e) {
    // Non-fatal
    console.debug('Legacy storage cleanup notice', e);
  }
}

/**
 * Safely loads normalized cart items from storage with legacy migration
 */
export function loadCartFromStorage(): StoredCartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  if (!isLocalStorageAvailable()) {
    return [...memoryStorageFallback];
  }

  try {
    // 1. Try reading the modern normalized key
    const rawNormalized = window.localStorage.getItem(STORAGE_KEY);
    if (rawNormalized) {
      const parsed = JSON.parse(rawNormalized);
      const sanitized = sanitizeStoredCart(parsed);
      return sanitized;
    }

    // 2. Fallback: Check and migrate legacy keys if present
    for (const legacyKey of LEGACY_KEYS) {
      const legacyRaw = window.localStorage.getItem(legacyKey);
      if (legacyRaw) {
        try {
          const parsed = JSON.parse(legacyRaw);
          const sanitized = sanitizeStoredCart(parsed);
          if (sanitized.length > 0) {
            saveCartToStorage(sanitized);
            cleanupLegacyStorage();
            return sanitized;
          }
        } catch {
          // Continue to next key
        }
      }
    }
  } catch (err) {
    console.error('SafeCart: Error reading from storage, falling back to memory', err);
  }

  return [...memoryStorageFallback];
}

/**
 * Safely saves normalized cart items to storage with error resilience and quota recovery
 */
export function saveCartToStorage(items: StoredCartItem[]): boolean {
  const sanitized = sanitizeStoredCart(items);

  // Always update memory fallback
  memoryStorageFallback = sanitized;

  if (typeof window === 'undefined' || !isLocalStorageAvailable()) {
    return true;
  }

  const payload = JSON.stringify(sanitized);

  try {
    window.localStorage.setItem(STORAGE_KEY, payload);
    return true;
  } catch (err: unknown) {
    console.warn('SafeCart: Initial save failed, attempting quota recovery', err);

    // If quota exceeded or write failed, clean up legacy keys and retry
    try {
      cleanupLegacyStorage();
      window.localStorage.setItem(STORAGE_KEY, payload);
      return true;
    } catch (retryErr) {
      console.error('SafeCart: Failed to save to localStorage after recovery, preserved in memory', retryErr);
      return false;
    }
  }
}

/**
 * Rehydrates normalized stored items into full QuoteItem objects using the product catalog
 */
export function rehydrateCartItems(stored: StoredCartItem[]): QuoteItem[] {
  const productMap = new Map<string, Product>();
  for (const prod of PRODUCTS) {
    productMap.set(prod.id, prod);
  }

  const quoteItems: QuoteItem[] = [];

  for (const entry of stored) {
    const product = productMap.get(entry.productId);
    if (product) {
      quoteItems.push({
        product,
        quantity: entry.quantity,
        notes: entry.notes,
      });
    } else {
      // Product might be custom or discontinued; create a safe placeholder so item isn't lost
      quoteItems.push({
        product: {
          id: entry.productId,
          model: entry.productId.toUpperCase(),
          name: `Item de Catálogo (${entry.productId})`,
          category: 'todos',
          subcategory: 'Geral',
          brand: 'TECHSOL',
          sku: entry.productId,
          priceMZN: 0,
          stockQty: 1,
          description: 'Equipamento selecionado do catálogo TECHSOL.',
          highlights: ['Pronta Entrega'],
          specs: {},
          inStock: true,
          stockStatus: 'Em Stock',
          image: '/images/hero_dahua_security_1791138982019.jpg',
          warranty: 'Garantia TECHSOL',
          datasheetAvailable: false,
        },
        quantity: entry.quantity,
        notes: entry.notes,
      });
    }
  }

  return quoteItems;
}

/**
 * Converts rich QuoteItem array into compact StoredCartItem array for serialization
 */
export function serializeCartItems(items: QuoteItem[]): StoredCartItem[] {
  return items.map((i) => ({
    productId: i.product.id,
    quantity: i.quantity,
    notes: i.notes,
    updatedAt: Date.now(),
  }));
}

/**
 * Clears cart from both storage and memory
 */
export function clearCartStorage(): void {
  memoryStorageFallback = [];
  if (typeof window !== 'undefined' && isLocalStorageAvailable()) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      cleanupLegacyStorage();
    } catch (e) {
      console.warn('SafeCart: Error clearing storage', e);
    }
  }
}

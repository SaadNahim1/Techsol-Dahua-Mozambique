/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Allows store admins and users to customize / upload real photos for any SKU
 */

const STORAGE_KEY = 'techsol_custom_product_images_v1';

export function getCustomProductImages(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Error reading custom product images', e);
  }
  return {};
}

export function saveCustomProductImage(productId: string, imageUrl: string): void {
  if (typeof window === 'undefined' || !productId) return;
  try {
    const current = getCustomProductImages();
    current[productId] = imageUrl;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    // Trigger custom event so all components refresh
    window.dispatchEvent(new Event('techsol_images_updated'));
  } catch (e) {
    console.error('Error saving custom product image', e);
  }
}

export function removeCustomProductImage(productId: string): void {
  if (typeof window === 'undefined' || !productId) return;
  try {
    const current = getCustomProductImages();
    delete current[productId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event('techsol_images_updated'));
  } catch (e) {
    console.error('Error removing custom product image', e);
  }
}

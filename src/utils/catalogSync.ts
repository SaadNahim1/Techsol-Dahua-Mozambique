import { Product, ProductCategory } from '../types';
import { PRODUCTS, getProductReferenceImage } from '../data/products';

const CATALOG_STORAGE_KEY = 'techsol_custom_catalog_v1';
const ADMIN_PIN_STORAGE_KEY = 'techsol_admin_pin_v1';
export const DEFAULT_ADMIN_PIN = '2580';

export function getAdminPin(): string {
  try {
    const saved = localStorage.getItem(ADMIN_PIN_STORAGE_KEY);
    if (saved && saved.trim().length >= 4) {
      return saved.trim();
    }
  } catch {
    // ignore
  }
  return DEFAULT_ADMIN_PIN;
}

export function setAdminPin(newPin: string): void {
  try {
    localStorage.setItem(ADMIN_PIN_STORAGE_KEY, newPin.trim());
  } catch (err) {
    console.error('Failed to save admin PIN', err);
  }
}

export function verifyAdminPin(inputPin: string): boolean {
  return inputPin.trim() === getAdminPin();
}

export function cleanCategory(catStr: string, name: string): ProductCategory {
  const c = (catStr || '').toLowerCase();
  const n = (name || '').toLowerCase();
  if (
    [
      'nvr',
      'xvr',
      'dvr',
      'camera',
      'cctv',
      'ptz',
      'ipc',
      'hdcvi',
      'thermal',
      'speed dome',
      'dashcam',
      'video wall',
      'monitor',
    ].some((k) => c.includes(k) || n.includes(k))
  ) {
    return 'cctv';
  }
  if (
    [
      'fence',
      'cerca',
      'energizer',
      'nemtek',
      'arame',
      'siren',
      'ferrules',
      'isolador',
      'espinhas',
      'mola',
    ].some((k) => c.includes(k) || n.includes(k))
  ) {
    return 'cerca_eletrica';
  }
  if (
    ['alarm', 'detector', 'sirene', 'pir', 'smoke', 'fire alarm', 'panic button'].some(
      (k) => c.includes(k) || n.includes(k)
    )
  ) {
    return 'alarmes';
  }
  if (
    [
      'access control',
      'turnstile',
      'fechadura',
      'lock',
      'motor de portao',
      'centurion',
      'gemini',
      'barrier',
      'facial',
      'fingerprint',
      'attendance',
      'door closer',
      'intercom',
      'catraca',
    ].some((k) => c.includes(k) || n.includes(k))
  ) {
    return 'controle_acesso';
  }
  return 'redes_acessorios';
}

function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function parseCSVRows(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField);
        currentField = '';
      } else if (char === '\r' && nextChar === '\n') {
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = '';
        i++;
      } else if (char === '\n' || char === '\r') {
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows;
}

export function parseTechsolCSV(csvText: string): Product[] {
  const rows = parseCSVRows(csvText);
  if (rows.length <= 1) return [];

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const isSixCol =
    header.includes('product') &&
    (header.includes('selling price') || header.includes('sku') || rows[0].length <= 8);

  const products: Product[] = [];
  const seenIds = new Set<string>();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;

    let rawName = '';
    let rawPrice = '';
    let rawStock = '';
    let rawCategory = '';
    let rawBrand = '';
    let rawSku = '';

    if (isSixCol && row.length >= 2) {
      rawName = (row[0] || '').trim();
      rawPrice = (row[1] || '').trim();
      rawStock = (row[2] || '').trim();
      rawCategory = (row[3] || '').trim();
      rawBrand = (row[4] || '').trim();
      rawSku = (row[5] || '').trim();
    } else if (row.length >= 13) {
      rawName = (row[3] || '').trim();
      rawPrice = (row[6] || '').trim();
      rawStock = (row[7] || '').trim();
      rawCategory = (row[9] || '').trim();
      rawBrand = (row[10] || '').trim();
      rawSku = (row[12] || '').trim();
    } else {
      continue;
    }

    if (!rawName) continue;
    const lowerName = rawName.toLowerCase();
    if (
      lowerName.includes('woocommerce sync') ||
      lowerName.startsWith('total:') ||
      lowerName === 'product'
    ) {
      continue;
    }

    const name = decodeHtmlEntities(rawName);
    const catOrig = decodeHtmlEntities(rawCategory) || 'Equipamentos';
    const brand = decodeHtmlEntities(rawBrand) || 'Dahua';
    const sku = decodeHtmlEntities(rawSku) || name;

    const cleanedPriceStr = rawPrice.replace(/[^0-9.-]+/g, '');
    const price = parseFloat(cleanedPriceStr) || 0;

    const cleanedStockStr = rawStock.replace(/[^0-9.-]+/g, '');
    const stockNum = parseFloat(cleanedStockStr);
    const inStock = isNaN(stockNum) ? true : stockNum > 0;

    const category = cleanCategory(catOrig, name);
    const model = sku;

    const baseSlug = (sku || name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    let slug = baseSlug || `prod-${i}`;
    let counter = 1;
    while (seenIds.has(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    seenIds.add(slug);

    const bLower = brand.toLowerCase();
    let warranty = 'Garantia do Fabricante';
    if (bLower.includes('dahua')) warranty = 'Garantia Oficial Dahua';
    else if (bLower.includes('nemtek')) warranty = 'Garantia Oficial Nemtek';
    else if (bLower.includes('centurion')) warranty = 'Garantia Oficial Centurion';
    else if (bLower.includes('western')) warranty = 'Garantia Western Digital';

    const img = getProductReferenceImage({
      id: slug,
      model,
      name,
      category,
      subcategory: catOrig,
    });

    products.push({
      id: slug,
      sku,
      model,
      name,
      category,
      subcategory: catOrig,
      brand,
      priceMZN: price,
      stockQty: isNaN(stockNum) ? 10 : Math.max(0, Math.round(stockNum)),
      inStock,
      stockStatus: inStock ? 'Em Stock' : 'Sob Encomenda',
      description: `Equipamento profissional de alta performance ${name}. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.`,
      highlights: ['Pronta Entrega em Maputo', '100% Original Homologado', 'Faturação com NUIT'],
      specs: {
        Marca: brand,
        Modelo: model,
        Categoria: catOrig,
        Origem: 'Distribuição Oficial Moçambique',
      },
      popular: false,
      warranty,
      datasheetAvailable: true,
      image: img,
    });
  }

  return products;
}

export function getActiveCatalogProducts(): Product[] {
  try {
    const raw = localStorage.getItem(CATALOG_STORAGE_KEY);
    if (!raw) return PRODUCTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fallback to static PRODUCTS
  }
  return PRODUCTS;
}

export function saveCustomCatalogProducts(products: Product[]): void {
  try {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event('techsol_catalog_updated'));
  } catch (err) {
    console.error('Failed to save custom catalog to localStorage', err);
  }
}

export function updateCatalogProduct(updatedProduct: Product): Product[] {
  const current = getActiveCatalogProducts();
  const next = current.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
  saveCustomCatalogProducts(next);
  return next;
}

export function addCatalogProduct(newProduct: Product): Product[] {
  const current = getActiveCatalogProducts();
  const next = [newProduct, ...current];
  saveCustomCatalogProducts(next);
  return next;
}

export function deleteCatalogProduct(productId: string): Product[] {
  const current = getActiveCatalogProducts();
  const next = current.filter((p) => p.id !== productId);
  saveCustomCatalogProducts(next);
  return next;
}

export function mergeOrReplaceCatalogFromCSV(
  imported: Product[],
  mode: 'replace' | 'merge'
): Product[] {
  if (mode === 'replace') {
    saveCustomCatalogProducts(imported);
    return imported;
  }

  // Merge by SKU or ID: update existing products and append new ones
  const current = getActiveCatalogProducts();
  const mapByKey = new Map<string, Product>();
  current.forEach((p) => {
    const key = (p.sku || p.model || p.id).toLowerCase().trim();
    mapByKey.set(key, p);
  });

  imported.forEach((imp) => {
    const key = (imp.sku || imp.model || imp.id).toLowerCase().trim();
    const existing = mapByKey.get(key);
    if (existing) {
      mapByKey.set(key, {
        ...existing,
        name: imp.name || existing.name,
        priceMZN: imp.priceMZN > 0 ? imp.priceMZN : existing.priceMZN,
        stockQty: imp.stockQty,
        inStock: imp.inStock,
        stockStatus: imp.stockStatus,
        brand: imp.brand || existing.brand,
        subcategory: imp.subcategory || existing.subcategory,
      });
    } else {
      mapByKey.set(key, imp);
    }
  });

  const merged = Array.from(mapByKey.values());
  saveCustomCatalogProducts(merged);
  return merged;
}

export function clearCustomCatalogProducts(): Product[] {
  try {
    localStorage.removeItem(CATALOG_STORAGE_KEY);
    window.dispatchEvent(new Event('techsol_catalog_updated'));
  } catch (err) {
    console.error('Failed to clear custom catalog', err);
  }
  return PRODUCTS;
}

export function exportCatalogToCSV(products: Product[]): void {
  const header = ['Product', 'Selling Price', 'Current stock', 'Category', 'Brand', 'SKU'];
  const escapeCSV = (val: string | number) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const lines = [
    header.join(','),
    ...products.map((p) =>
      [
        escapeCSV(p.name),
        escapeCSV(p.priceMZN),
        escapeCSV(p.stockQty ?? (p.inStock ? 10 : 0)),
        escapeCSV(p.subcategory || p.category),
        escapeCSV(p.brand),
        escapeCSV(p.sku || p.model),
      ].join(',')
    ),
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Products - TECHSOL SU LDA (${new Date().toISOString().slice(0, 10)}).csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

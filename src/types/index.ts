export type ProductCategory = 
  | 'todos'
  | 'cctv'
  | 'cerca_eletrica'
  | 'alarmes'
  | 'controle_acesso'
  | 'redes_acessorios';

export interface Product {
  id: string;
  model: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  brand: string;
  sku: string;
  priceMZN: number; // Preço de venda em Meticais (MT)
  stockQty: number; // Quantidade física em stock
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  inStock: boolean;
  stockStatus: 'Em Stock' | 'Sob Encomenda' | 'Últimas Unidades';
  image: string;
  priceRef?: string;
  popular?: boolean;
  warranty: string;
  datasheetAvailable: boolean;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface KitConfiguration {
  scenario: 'residencia' | 'comercio' | 'industria' | 'condominio';
  cctvExternal: number;
  cctvInternal: number;
  cctvResolution: '4mp_wizsense' | '8mp_4k';
  nvrStorage: '1tb' | '2tb' | '4tb' | '8tb';
  electricFenceMeters: number; // 0, 50, 100, 200, 500
  alarmSensors: number;
  hasVideoIntercom: boolean;
  hasBiometrics: boolean;
}

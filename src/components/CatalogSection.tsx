import React, { useState, useMemo, useEffect } from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS, CATEGORIES_META } from '../data/products';
import { COMPANY_CONFIG } from '../config/company';
import { 
  Search, 
  Plus, 
  Minus, 
  MessageCircle, 
  Info,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface CatalogSectionProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddToQuote: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  getItemQuantity: (productId: string) => number;
  onOpenProductModal: (product: Product) => void;
  onOpenQuoteForm: () => void;
}

const normalizeText = (text: string) => {
  return (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onAddToQuote,
  onUpdateQuantity,
  getItemQuantity,
  onOpenProductModal,
}) => {
  const [stockOnly, setStockOnly] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('todas');

  // Compute brands dynamically available in the currently selected category
  const availableBrands = useMemo(() => {
    const list = selectedCategory === 'todos'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);
    const unique = Array.from(new Set(list.map((p) => p.brand).filter(Boolean)));
    return ['todas', ...unique];
  }, [selectedCategory]);

  // If the currently selected brand doesn't exist in the new category, auto-reset to 'todas'
  useEffect(() => {
    if (selectedBrand !== 'todas' && !availableBrands.includes(selectedBrand)) {
      setSelectedBrand('todas');
    }
  }, [availableBrands, selectedBrand]);

  const categoryIcons: Record<string, string> = {
    todos: '🏷️',
    cctv: '📹',
    cerca_eletrica: '⚡',
    alarmes: '🚨',
    controle_acesso: '🚪',
    redes_acessorios: '🔌',
  };

  const handleSelectCategory = (catId: ProductCategory) => {
    setSelectedBrand('todas');
    onSelectCategory(catId);
  };

  const handleResetAllFilters = () => {
    setSelectedBrand('todas');
    setStockOnly(false);
    onSearchChange('');
    onSelectCategory('todos');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // 1. Category check
      if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
        return false;
      }
      // 2. Brand check
      if (selectedBrand !== 'todas' && item.brand !== selectedBrand) {
        return false;
      }
      // 3. Stock check
      if (stockOnly && !item.inStock) {
        return false;
      }
      // 4. Accent-insensitive Search
      const query = normalizeText(searchQuery);
      if (query) {
        const matchesName = normalizeText(item.name).includes(query);
        const matchesModel = normalizeText(item.model).includes(query);
        const matchesSubcat = normalizeText(item.subcategory).includes(query);
        const matchesBrand = normalizeText(item.brand || '').includes(query);
        const matchesDesc = normalizeText(item.description).includes(query);
        const matchesHighlights = item.highlights.some((h) => normalizeText(h).includes(query));
        return matchesName || matchesModel || matchesSubcat || matchesBrand || matchesDesc || matchesHighlights;
      }
      return true;
    });
  }, [selectedCategory, selectedBrand, stockOnly, searchQuery]);

  return (
    <section id="catalogo" className="py-8 sm:py-12 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Category Navigation Pills (Sticky / Horizontal Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES_META.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id as ProductCategory)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white border-red-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <span>{categoryIcons[cat.id] || '📦'}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Filter bar: Brands + Search + Stock toggle */}
        <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Brand Pills (Only brands with items in this category) */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
            <span className="text-slate-500 font-semibold shrink-0 mr-1">Marca:</span>
            {availableBrands.map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap capitalize text-xs ${
                  selectedBrand === b
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {b === 'todas' ? 'Todas' : b}
              </button>
            ))}
          </div>

          {/* Search + Stock filter */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar modelo ou produto..."
                className="w-full pl-9 pr-7 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setStockOnly(!stockOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                stockOnly
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${stockOnly ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <span className="hidden sm:inline">Apenas em</span> Estoque
            </button>
          </div>
        </div>

        {/* Product Count Header & Active Filter Indicators */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>
              Mostrando <strong>{filteredProducts.length}</strong> de {PRODUCTS.length} produtos
            </span>
            {(selectedCategory !== 'todos' || selectedBrand !== 'todas' || searchQuery || stockOnly) && (
              <button
                type="button"
                onClick={handleResetAllFilters}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] font-medium transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpar filtros</span>
              </button>
            )}
          </div>
          <span className="text-slate-400 hidden sm:inline">Preços em Meticais (MT) · Pronta Entrega</span>
        </div>

        {/* Product Grid */}
        <div className="mt-4">
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-slate-50 border border-slate-200">
              <Info className="mx-auto w-8 h-8 text-slate-400 mb-2" />
              <p className="font-bold text-slate-800 text-sm">Nenhum produto encontrado com os filtros atuais</p>
              <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
                Tente limpar a pesquisa ou selecionar "Todo o Estoque" para visualizar todos os 44 equipamentos disponíveis.
              </p>
              <button
                type="button"
                onClick={handleResetAllFilters}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ver Todo o Catálogo (44 Itens)</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {filteredProducts.map((product) => {
                const qty = getItemQuantity(product.id);

                return (
                  <div
                    key={product.id}
                    className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-3 sm:p-4 group"
                  >
                    <div>
                      {/* Product Image */}
                      <div 
                        onClick={() => onOpenProductModal(product)}
                        className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 p-2 border border-slate-100 mb-3 cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center rounded-lg transition-transform duration-200 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                          }}
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/95 border border-slate-200 text-[10px] font-mono font-bold text-slate-800 shadow-xs">
                          {product.brand}
                        </div>
                        {product.stockQty > 0 && (
                          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-white/95 border border-slate-200 text-[9px] font-semibold text-emerald-700 shadow-xs">
                            {product.stockQty} em stock
                          </div>
                        )}
                      </div>

                      {/* Model & Name */}
                      <div className="font-mono text-[10px] text-red-600 font-bold uppercase tracking-wider mb-0.5 truncate">
                        {product.model}
                      </div>

                      <h3 
                        onClick={() => onOpenProductModal(product)}
                        className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      {/* Short Description */}
                      <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-relaxed hidden sm:block">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Stepper */}
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="mb-2">
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Preço de Venda</div>
                        <div className="text-base sm:text-lg font-extrabold text-slate-900 font-mono leading-none">
                          {new Intl.NumberFormat('pt-MZ').format(product.priceMZN)} <span className="text-xs text-red-600">MT</span>
                        </div>
                      </div>

                      {/* Stepper with explicit type="button" */}
                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => onAddToQuote(product)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-xs transition-all active:scale-95 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Adicionar</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-slate-100 rounded-xl p-1 border border-slate-200">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, qty - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-red-50 hover:text-red-600 font-bold shadow-xs transition-colors"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <span className="font-mono text-xs font-bold text-slate-900 px-2">
                            {qty} na sacola
                          </span>

                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, qty + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600 text-white hover:bg-red-700 font-bold shadow-xs transition-colors"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* WhatsApp Assistance Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Precisa de um modelo específico fora da lista ou cotação para grandes obras?
            </span>
          </div>
          <a
            href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Olá TECHSOL! Gostaria de consultar cotação especial ou modelo específico.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Atendimento WhatsApp Direto</span>
          </a>
        </div>
      </div>
    </section>
  );
};

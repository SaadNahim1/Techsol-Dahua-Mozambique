import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS, CATEGORIES_META } from '../data/products';
import { COMPANY_CONFIG } from '../config/company';
import { 
  Search, 
  Plus, 
  Check, 
  MessageCircle, 
  Info,
  Sparkles
} from 'lucide-react';

interface CatalogSectionProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddToQuote: (product: Product) => void;
  quoteItemIds: Set<string>;
  onOpenProductModal: (product: Product) => void;
  onOpenQuoteForm: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onAddToQuote,
  quoteItemIds,
  onOpenProductModal,
}) => {
  const [stockOnly, setStockOnly] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('todas');

  const brands = useMemo(() => {
    const list = Array.from(new Set(PRODUCTS.map((p) => p.brand).filter(Boolean)));
    return ['todas', ...list];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedBrand !== 'todas' && item.brand !== selectedBrand) {
        return false;
      }
      if (stockOnly && !item.inStock) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesModel = item.model.toLowerCase().includes(query);
        const matchesSubcat = item.subcategory.toLowerCase().includes(query);
        const matchesBrand = (item.brand || '').toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesHighlights = item.highlights.some((h) => h.toLowerCase().includes(query));
        return matchesName || matchesModel || matchesSubcat || matchesBrand || matchesDesc || matchesHighlights;
      }
      return true;
    });
  }, [selectedCategory, selectedBrand, stockOnly, searchQuery]);

  return (
    <section id="catalogo" className="py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Estoque Pronta Entrega · Maputo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Catálogo de Equipamentos e Preços
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Preços reais de tabela em Meticais (MT). Selecione os itens para cotar diretamente no WhatsApp.
            </p>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filtrar por nome ou código..."
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => setStockOnly(!stockOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                stockOnly
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${stockOnly ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <span>Apenas em Estoque</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          {CATEGORIES_META.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as ProductCategory)}
              className={`px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Brand Selector */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-medium shrink-0">Marca:</span>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-2.5 py-1 rounded-md transition-colors capitalize whitespace-nowrap ${
                selectedBrand === b
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {b === 'todas' ? 'Todas as Marcas' : b}
            </button>
          ))}
        </div>

        {/* Quick Helper Banner */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-700">
            <Sparkles className="w-4 h-4 text-red-600 shrink-0" />
            <span>
              Procura outro modelo Dahua ou quer enviar sua própria lista de materiais?
            </span>
          </div>
          <a
            href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Olá TECHSOL! Tenho uma lista de materiais / modelo específico e gostaria de consultar preço e prazo de entrega.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enviar Lista no WhatsApp</span>
          </a>
        </div>

        {/* Products Grid */}
        <div className="mt-8">
          <div className="text-xs text-slate-500 mb-4">
            Mostrando <strong>{filteredProducts.length}</strong> produtos disponíveis
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center rounded-xl bg-slate-50 border border-slate-200">
              <Info className="mx-auto w-8 h-8 text-slate-400 mb-2" />
              <p className="font-semibold text-slate-700">Nenhum produto encontrado</p>
              <button
                onClick={() => {
                  onSelectCategory('todos');
                  setSelectedBrand('todas');
                  onSearchChange('');
                  setStockOnly(false);
                }}
                className="mt-3 px-3 py-1.5 text-xs font-bold text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isInQuote = quoteItemIds.has(product.id);

                return (
                  <div
                    key={product.id}
                    className="flex flex-col justify-between rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-4 group"
                  >
                    <div>
                      {/* Product Image Area */}
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-50 p-2 border border-slate-100 mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center rounded transition-transform duration-200 group-hover:scale-102"
                        />
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/95 border border-slate-200 text-[10px] font-mono font-bold text-red-600 shadow-xs">
                          {product.model}
                        </div>
                        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white/90 border border-slate-200 text-[10px] font-semibold text-emerald-700">
                          {product.stockQty > 0 ? `${product.stockQty} em estoque` : 'Sob Encomenda'}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-medium text-slate-500">
                          {product.subcategory}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {product.brand}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="mt-1.5 text-xs text-slate-600 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Price Box */}
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-semibold text-slate-400">Preço de Tabela</div>
                          <div className="text-lg font-extrabold text-red-600 font-mono">
                            {new Intl.NumberFormat('pt-MZ').format(product.priceMZN)} <span className="text-xs">MT</span>
                          </div>
                        </div>
                        <button
                          onClick={() => onOpenProductModal(product)}
                          className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2"
                        >
                          Ver detalhes
                        </button>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <a
                        href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                          `Olá TECHSOL! Gostaria de consultar pronta entrega do modelo ${product.model} (${product.name}) por ${product.priceMZN} MT.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-slate-200 transition-colors"
                        title="Cotar no WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => onAddToQuote(product)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg transition-colors ${
                          isInQuote
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        {isInQuote ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>No Orçamento</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Adicionar à Cotação</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

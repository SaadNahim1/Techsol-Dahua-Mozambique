import React from 'react';
import { Product } from '../types';
import { X, ShieldCheck, Check, MessageCircle, Plus } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product) => void;
  isInQuote: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  isInQuote,
}) => {
  if (!product) return null;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Olá TECHSOL! Gostaria de consultar o preço e disponibilidade:\n` +
      `📌 *Produto:* ${product.name}\n` +
      `🏷️ *Modelo:* ${product.model}\n` +
      `💰 *Preço:* ${product.priceMZN} MT\n` +
      `Por favor, informem-me se têm em estoque na Av. Josina Machel 923.`
    );
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Product Image */}
          <div className="md:col-span-5">
            <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-200 p-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover object-center rounded-lg"
              />
            </div>

            <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>{product.warranty}</span>
              </div>
              <div className="font-mono text-emerald-700 font-bold">
                {product.stockQty > 0 ? `${product.stockQty} un. em armazém` : 'Disponível sob encomenda'}
              </div>
            </div>
          </div>

          {/* Right Column: Info & Action */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono text-red-600 font-bold tracking-wider">
                {product.model}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {product.brand}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {product.name}
            </h3>

            {/* Price Box */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">Preço de Tabela B2B</span>
                <span className="text-xl font-extrabold text-red-600 font-mono">
                  {new Intl.NumberFormat('pt-MZ').format(product.priceMZN)} <span className="text-xs">MT</span>
                </span>
              </div>
              <span className="text-xs text-slate-500">Impostos inclusos</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Technical specs table */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                {Object.entries(product.specs).slice(0, 4).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-0.5 text-slate-600">
                    <span className="font-medium text-slate-500">{k}:</span>
                    <span className="text-slate-900 text-right font-medium">{v}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => onAddToQuote(product)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold rounded-xl transition-colors ${
                  isInQuote
                    ? 'bg-emerald-600 text-white'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {isInQuote ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>No Orçamento</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Adicionar à Cotação</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="flex items-center gap-1.5 py-2.5 px-3.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Pedir no WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

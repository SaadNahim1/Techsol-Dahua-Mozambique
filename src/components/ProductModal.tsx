import React from 'react';
import { Product } from '../types';
import { X, ShieldCheck, Check, MessageCircle, ShoppingBag, Download, ArrowRight } from 'lucide-react';
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
      `Olá TechSol! Gostaria de consultar o preço e disponibilidade do modelo Dahua:\n` +
      `📌 *Produto:* ${product.name}\n` +
      `🏷️ *Modelo:* ${product.model}\n` +
      `📂 *Categoria:* ${product.subcategory}\n` +
      `Por favor, enviem-me a cotação e ficha técnica comercial.`
    );
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Product Image & Badges */}
          <div className="md:col-span-5">
            <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover object-center rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                <span className="font-semibold">{product.warranty}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>{product.stockStatus} em Centro de Distribuição</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono text-red-500 font-bold tracking-wider">
                {product.model}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {product.brand}
              </span>
            </div>
            <h3 className="mt-1 text-xl sm:text-2xl font-bold text-white">
              {product.name}
            </h3>
            <div className="mt-1 text-xs text-slate-400">
              Categoria: <span className="text-slate-300">{product.subcategory}</span>
            </div>

            {/* Price Box */}
            <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Preço de Tabela B2B</span>
                <span className="text-xl font-extrabold text-white font-mono tabular-nums">
                  {new Intl.NumberFormat('pt-MZ', { maximumFractionDigits: 2 }).format(product.priceMZN)}{' '}
                  <span className="text-sm font-bold text-red-500">MT</span>
                </span>
              </div>
              <div className="text-right">
                <span className={`text-xs font-mono font-bold block ${product.stockQty > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {product.stockQty > 0 ? `${product.stockQty} em armazém` : 'Sob Encomenda'}
                </span>
                <span className="text-[10px] text-slate-500">Pronta entrega em Maputo</span>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Highlights */}
            <div className="mt-4 flex flex-wrap gap-2">
              {product.highlights.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs bg-slate-800/80 border border-slate-700 text-slate-200 rounded-md font-medium"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap gap-3">
              <button
                onClick={() => onAddToQuote(product)}
                className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  isInQuote
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-red-600 hover:bg-red-500 text-white'
                }`}
              >
                {isInQuote ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Item no Orçamento</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adicionar à Cotação</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 hover:bg-emerald-900 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Cotação WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Specs Table */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <h4 className="text-base font-bold text-white mb-3">
            Especificações Técnicas Completas
          </h4>
          <div className="rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs sm:text-sm">
              <tbody className="divide-y divide-slate-800">
                {Object.entries(product.specs).map(([specKey, specVal], idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-950/40' : 'bg-slate-900/40'}>
                    <td className="py-2.5 px-4 font-semibold text-slate-400 w-1/3 border-r border-slate-800/60">
                      {specKey}
                    </td>
                    <td className="py-2.5 px-4 text-slate-200 font-mono text-xs">
                      {specVal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

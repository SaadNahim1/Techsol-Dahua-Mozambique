import React from 'react';
import { QuoteItem } from '../types';
import { COMPANY_CONFIG } from '../config/company';
import { X, Trash2, Plus, Minus, MessageCircle, FileText, ArrowRight, ShoppingBag } from 'lucide-react';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearQuote: () => void;
  onGoToQuoteForm: () => void;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearQuote,
  onGoToQuoteForm,
}) => {
  if (!isOpen) return null;

  const totalItemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalAmountMZN = items.reduce((acc, curr) => acc + (curr.product.priceMZN || 0) * curr.quantity, 0);

  const handleWhatsAppCheckout = () => {
    let text = `*SOLICITAÇÃO DE COTAÇÃO - TECHSOL SU LDA*\n`;
    text += `Olá TechSol! Gostaria de receber uma cotação para os seguintes equipamentos Dahua / Segurança:\n\n`;

    items.forEach((item, index) => {
      const lineTotal = (item.product.priceMZN || 0) * item.quantity;
      text += `${index + 1}. *[${item.product.model}]* ${item.product.name}\n`;
      text += `   • Quantidade: ${item.quantity} un. x ${item.product.priceMZN.toLocaleString('pt-MZ')} MT = ${lineTotal.toLocaleString('pt-MZ')} MT\n`;
      text += `   • Marca/Cat: ${item.product.brand} · ${item.product.subcategory}\n\n`;
    });

    text += `💰 *Subtotal Estimado:* ${totalAmountMZN.toLocaleString('pt-MZ')} MT\n\n`;
    text += `Por favor, confirmem disponibilidade de pronta entrega no Showroom da Av. Josina Machel e prazo de despacho. Obrigado!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h3 className="text-base font-bold text-white">Lista de Cotação</h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs font-mono text-slate-300">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'itens'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center text-slate-400 text-sm">
                <ShoppingBag className="mx-auto w-12 h-12 text-slate-600 mb-3" />
                <p className="font-semibold text-white">Sua lista está vazia</p>
                <p className="mt-1 text-xs text-slate-500 max-w-xs mx-auto">
                  Adicione produtos através do catálogo para montar sua solicitação de orçamento personalizada.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-xs font-bold text-red-400">
                        {item.product.model}
                      </div>
                      <h4 className="text-sm font-semibold text-white leading-snug">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono font-bold text-white">
                          {item.product.priceMZN.toLocaleString('pt-MZ')} MT
                        </span>
                        <span className="text-[10px] text-slate-500">· {item.product.brand}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs">
                    <span className="text-slate-400">Quantidade:</span>
                    <div className="flex items-center gap-2 bg-slate-900 rounded-lg border border-slate-800 p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/80 space-y-3">
              {/* Subtotal block */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium">Subtotal Estimado (MT):</span>
                <span className="text-lg font-extrabold text-white font-mono tabular-nums">
                  {totalAmountMZN.toLocaleString('pt-MZ', { maximumFractionDigits: 2 })} <span className="text-xs text-red-500">MT</span>
                </span>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir Cotação da Lista no WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onGoToQuoteForm();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Preencher Formulário de Orçamento</span>
              </button>

              <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
                <button
                  onClick={onClearQuote}
                  className="hover:text-red-400 transition-colors"
                >
                  Limpar lista
                </button>
                <span>Distribuição Oficial Dahua</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

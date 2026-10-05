import React from 'react';
import { QuoteItem } from '../types';
import { COMPANY_CONFIG } from '../config/company';
import { X, Trash2, Plus, Minus, MessageCircle, FileText, ShoppingBag } from 'lucide-react';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
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
    text += `Olá TECHSOL! Gostaria de receber uma cotação para os seguintes equipamentos:\n\n`;

    items.forEach((item, index) => {
      const lineTotal = (item.product.priceMZN || 0) * item.quantity;
      text += `${index + 1}. *[${item.product.model}]* ${item.product.name}\n`;
      text += `   • Quantidade: ${item.quantity} un. x ${item.product.priceMZN.toLocaleString('pt-MZ')} MT = ${lineTotal.toLocaleString('pt-MZ')} MT\n`;
      text += `   • Marca: ${item.product.brand}\n\n`;
    });

    text += `💰 *Subtotal Estimado:* ${totalAmountMZN.toLocaleString('pt-MZ')} MT\n\n`;
    text += `Por favor, confirmem disponibilidade de pronta entrega na Av. Josina Machel 923. Obrigado!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-150">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-600" />
              <h3 className="text-sm font-bold text-slate-900">Lista de Cotação</h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs font-mono font-bold text-slate-700">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'itens'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="py-20 text-center text-slate-400 text-xs">
                <ShoppingBag className="mx-auto w-10 h-10 text-slate-300 mb-2" />
                <p className="font-semibold text-slate-700">Sua lista está vazia</p>
                <p className="mt-1 text-slate-500">
                  Adicione produtos no catálogo para montar seu pedido.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-mono text-[11px] font-bold text-red-600">
                        {item.product.model}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono font-bold text-slate-900">
                          {item.product.priceMZN.toLocaleString('pt-MZ')} MT
                        </span>
                        <span className="text-[10px] text-slate-500">· {item.product.brand}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-400 hover:text-red-600 p-1"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                    <span className="text-slate-500 font-medium">Quantidade:</span>
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-300 px-2 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="p-0.5 text-slate-500 hover:text-slate-900"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-mono font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-0.5 text-slate-500 hover:text-slate-900"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-white space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Subtotal Estimado:</span>
                <span className="text-base font-extrabold text-red-600 font-mono">
                  {totalAmountMZN.toLocaleString('pt-MZ')} MT
                </span>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir Cotação no WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onGoToQuoteForm();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Formulário Formal</span>
              </button>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <button
                  onClick={onClearQuote}
                  className="hover:text-red-600"
                >
                  Limpar lista
                </button>
                <span>Av. Josina Machel 923</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

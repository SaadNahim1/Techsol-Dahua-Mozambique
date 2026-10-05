import React, { useState } from 'react';
import { QuoteItem } from '../types';
import { COMPANY_CONFIG } from '../config/company';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, Truck, MapPin } from 'lucide-react';

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
}) => {
  const [deliveryType, setDeliveryType] = useState<'levantamento' | 'entrega'>('levantamento');
  const [customerName, setCustomerName] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');

  if (!isOpen) return null;

  const totalItemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalAmountMZN = items.reduce((acc, curr) => acc + (curr.product.priceMZN || 0) * curr.quantity, 0);

  const handleWhatsAppCheckout = () => {
    let text = `*NOVO PEDIDO / COTAÇÃO - TECHSOL SU LDA*\n`;
    if (customerName.trim()) {
      text += `👤 *Cliente:* ${customerName.trim()}\n`;
    }
    text += `🚚 *Método:* ${
      deliveryType === 'levantamento'
        ? 'Levantamento no Showroom (Av. Josina Machel 923, Maputo)'
        : `Entrega / Envio (${customerLocation.trim() || 'A definir'})`
    }\n\n`;

    text += `📦 *Itens do Pedido:*\n`;
    items.forEach((item, index) => {
      const lineTotal = (item.product.priceMZN || 0) * item.quantity;
      text += `${index + 1}. *${item.product.name}* [${item.product.model}]\n`;
      text += `   • ${item.quantity} un. x ${item.product.priceMZN.toLocaleString('pt-MZ')} MT = *${lineTotal.toLocaleString('pt-MZ')} MT*\n`;
    });

    text += `\n💰 *VALOR TOTAL: ${totalAmountMZN.toLocaleString('pt-MZ')} MT*\n\n`;
    text += `Por favor, confirmem a disponibilidade para separação imediata dos produtos. Obrigado!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-150">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-none">Sua Sacola</h3>
                <span className="text-[11px] text-slate-500 font-medium">
                  {totalItemCount} {totalItemCount === 1 ? 'item selecionado' : 'itens selecionados'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="py-24 text-center text-slate-400 text-xs">
                <ShoppingBag className="mx-auto w-12 h-12 text-slate-300 mb-3" />
                <p className="font-bold text-slate-700 text-sm">Sua sacola está vazia</p>
                <p className="mt-1 text-slate-500">
                  Navegue pelo catálogo e clique em "+ Adicionar" nos produtos desejados.
                </p>
              </div>
            ) : (
              items.map((item) => {
                const lineTotal = (item.product.priceMZN || 0) * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                      }}
                      className="w-14 h-14 object-cover rounded-xl bg-white border border-slate-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono font-bold text-red-600 truncate">
                        {item.product.model} · {item.product.brand}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 truncate leading-snug">
                        {item.product.name}
                      </h4>
                      <div className="text-xs font-extrabold text-slate-900 font-mono mt-0.5">
                        {lineTotal.toLocaleString('pt-MZ')} <span className="text-[10px] text-slate-500">MT</span>
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-red-600 p-1"
                        title="Remover"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-white rounded-lg border border-slate-200 p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center rounded text-slate-700 hover:bg-slate-100 font-bold text-xs"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-mono text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded text-slate-700 hover:bg-slate-100 font-bold text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Actions */}
          {items.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-white space-y-3">
              {/* Delivery / Pickup Choice */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Como prefere receber?
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('levantamento')}
                    className={`py-2 px-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition-all ${
                      deliveryType === 'levantamento'
                        ? 'bg-red-50 border-red-600 text-red-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Na Loja (Maputo)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('entrega')}
                    className={`py-2 px-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition-all ${
                      deliveryType === 'entrega'
                        ? 'bg-red-50 border-red-600 text-red-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Entrega / Província</span>
                  </button>
                </div>
              </div>

              {/* Optional Name & Location input */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Seu Nome (opcional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                />
                <input
                  type="text"
                  placeholder="Cidade / Bairro"
                  value={customerLocation}
                  onChange={(e) => setCustomerLocation(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                />
              </div>

              {/* Subtotal */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">Total do Pedido</span>
                  <span className="text-lg font-extrabold text-slate-900 font-mono">
                    {totalAmountMZN.toLocaleString('pt-MZ')} <span className="text-xs text-red-600">MT</span>
                  </span>
                </div>
                <button
                  onClick={onClearQuote}
                  className="text-[11px] text-slate-400 hover:text-red-600 underline"
                >
                  Limpar sacola
                </button>
              </div>

              {/* Big WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Finalizar Pedido no WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

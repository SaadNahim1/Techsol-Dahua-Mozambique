import React from 'react';
import { ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { QuoteItem } from '../types';

interface StickyCartBarProps {
  items: QuoteItem[];
  onOpenDrawer: () => void;
  onQuickWhatsApp: () => void;
}

export const StickyCartBar: React.FC<StickyCartBarProps> = ({
  items,
  onOpenDrawer,
  onQuickWhatsApp,
}) => {
  const totalCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalMZN = items.reduce((acc, curr) => acc + (curr.product.priceMZN || 0) * curr.quantity, 0);

  if (totalCount === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl animate-in slide-in-from-bottom duration-200">
      <div className="mx-auto max-w-5xl flex items-center justify-between gap-3">
        {/* Total Summary */}
        <button
          onClick={onOpenDrawer}
          className="flex items-center gap-3 text-left group"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-xs">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white text-[11px] font-bold">
              {totalCount}
            </span>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Sua Sacola ({totalCount} {totalCount === 1 ? 'item' : 'itens'})
            </div>
            <div className="text-base sm:text-lg font-extrabold text-slate-900 font-mono leading-none mt-0.5">
              {totalMZN.toLocaleString('pt-MZ')} <span className="text-xs text-red-600">MT</span>
            </div>
          </div>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDrawer}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            <span>Ver Detalhes</span>
          </button>

          <button
            onClick={onQuickWhatsApp}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Pedir no WhatsApp</span>
            <ArrowRight className="w-4 h-4 hidden sm:inline" />
          </button>
        </div>
      </div>
    </div>
  );
};

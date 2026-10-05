import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const defaultMessage = encodeURIComponent(
    'Olá TECHSOL! Gostaria de falar com um especialista em equipamentos Dahua e solicitar um orçamento.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Menu on user click only - no annoying auto-popups */}
      {showMenu && (
        <div className="mb-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xl w-64 text-xs space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-900">Falar com a TECHSOL</span>
            <button
              onClick={() => setShowMenu(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
          </div>

          <a
            href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="font-bold">Linha 1 (WhatsApp)</div>
              <div className="font-mono text-[11px] text-emerald-800">{COMPANY_CONFIG.phoneDisplay}</div>
            </div>
          </a>

          <a
            href={`https://wa.me/${COMPANY_CONFIG.whatsappNumberSecondary}?text=${defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 transition-colors"
          >
            <Phone className="w-4 h-4 text-slate-700" />
            <div>
              <div className="font-bold">Linha 2 (WhatsApp)</div>
              <div className="font-mono text-[11px] text-slate-700">{COMPANY_CONFIG.phoneDisplaySecondary}</div>
            </div>
          </a>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center justify-center h-13 w-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Abrir WhatsApp da TechSol"
      >
        {showMenu ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </button>
    </div>
  );
};

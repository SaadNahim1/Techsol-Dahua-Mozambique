import React, { useState } from 'react';
import { MessageCircle, Phone, X, MapPin } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const defaultMessage = encodeURIComponent(
    'Olá TechSol Segurança! Gostaria de falar com um especialista em equipamentos Dahua e solicitar um orçamento.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip on entry */}
      {showTooltip && !showMenu && (
        <div className="mb-2 relative flex items-center gap-2 p-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-xs text-xs text-slate-200 animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-[10px]"
            title="Fechar aviso"
          >
            ✕
          </button>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <div>
            <span className="font-bold text-white block">Atendimento WhatsApp Maputo</span>
            <span className="text-[11px] text-slate-300">
              {COMPANY_CONFIG.phoneDisplay} · {COMPANY_CONFIG.phoneDisplaySecondary}
            </span>
          </div>
        </div>
      )}

      {/* Expanded Multi-phone Menu */}
      {showMenu && (
        <div className="mb-3 p-4 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl w-72 text-xs space-y-3 animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-white">Falar com a TechSol</span>
            <button
              onClick={() => setShowMenu(false)}
              className="text-slate-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            <a
              href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${defaultMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 hover:bg-emerald-900 text-slate-100 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-emerald-300">Linha 1 (WhatsApp)</div>
                <div className="font-mono text-white text-[11px]">{COMPANY_CONFIG.phoneDisplay}</div>
              </div>
            </a>

            <a
              href={`https://wa.me/${COMPANY_CONFIG.whatsappNumberSecondary}?text=${defaultMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 hover:bg-slate-800 text-slate-100 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-red-300">Linha 2 (WhatsApp / Ligação)</div>
                <div className="font-mono text-white text-[11px]">{COMPANY_CONFIG.phoneDisplaySecondary}</div>
              </div>
            </a>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{COMPANY_CONFIG.address}, {COMPANY_CONFIG.city}</span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => {
          setShowMenu(!showMenu);
          setShowTooltip(false);
        }}
        className="group flex items-center justify-center h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/80 transition-transform duration-200 hover:scale-110 active:scale-95"
        aria-label="Opções de atendimento WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
};

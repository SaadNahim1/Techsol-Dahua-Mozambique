import React, { useState } from 'react';
import { MessageCircle, ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface NavbarProps {
  quoteCount: number;
  onOpenQuoteDrawer: () => void;
  onOpenQuoteForm: () => void;
  onSelectCategory: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  quoteCount,
  onOpenQuoteDrawer,
  onOpenQuoteForm,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Catálogo', href: '#catalogo', onClick: () => onSelectCategory('todos') },
    { label: 'Simulador de Kits', href: '#kit-builder' },
    { label: 'Cercas Elétricas', href: '#catalogo', onClick: () => onSelectCategory('cerca_eletrica') },
    { label: 'Alarmes', href: '#catalogo', onClick: () => onSelectCategory('alarmes') },
    { label: 'Acesso & Motores', href: '#catalogo', onClick: () => onSelectCategory('controle_acesso') },
    { label: 'Showroom Maputo', href: '#localizacao' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand wordmark */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white font-black text-xl shadow-xs">
              T
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                TECHSOL <span className="text-red-600 font-extrabold">SU LDA</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-500 font-semibold mt-1">
                Distribuidor Dahua Moçambique
              </span>
            </div>
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                if (link.onClick) link.onClick();
              }}
              className="hover:text-red-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Fast Action Zone: Phone & Quote Button */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>{COMPANY_CONFIG.phoneDisplay}</span>
          </a>

          <button
            onClick={onOpenQuoteDrawer}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
            aria-label="Abrir lista de cotação"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cotação</span>
            {quoteCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-red-600 text-[11px] font-bold">
                {quoteCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3 text-sm font-semibold shadow-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                if (link.onClick) link.onClick();
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-slate-700 hover:text-red-600"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {COMPANY_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

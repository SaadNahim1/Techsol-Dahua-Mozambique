import React from 'react';
import { ShieldCheck, MessageCircle, FileText, ShoppingBag, Menu, X, PhoneCall } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'Catálogo', href: '#catalogo', onClick: () => onSelectCategory('todos') },
    { label: 'Kits IP & HDCVI', href: '#kit-builder' },
    { label: 'Cercas Elétricas', href: '#catalogo', onClick: () => onSelectCategory('cerca_eletrica') },
    { label: 'Alarmes', href: '#catalogo', onClick: () => onSelectCategory('alarmes') },
    { label: 'Controlo de Acesso', href: '#catalogo', onClick: () => onSelectCategory('controle_acesso') },
    { label: 'Showroom Maputo', href: '#localizacao' },
    { label: 'Orçamentos', href: '#orcamento' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand title wordmark */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white font-black text-xl shadow-md shadow-red-950 group-hover:bg-red-500 transition-colors">
              T
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                TechSol <span className="text-red-500 font-extrabold">Dahua</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium">
                Distribuidor Oficial
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.onClick) {
                  link.onClick();
                }
              }}
              className="hover:text-red-400 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          {/* Quick WhatsApp Link */}
          <a
            href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Olá TechSol, gostaria de informações e cotação de equipamentos Dahua.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded-md hover:bg-emerald-900/80 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Direto</span>
          </a>

          {/* Quote Basket Button */}
          <button
            onClick={onOpenQuoteDrawer}
            className="relative flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700/80 rounded-md hover:bg-slate-800 transition-colors"
            title="Ver itens da cotação"
          >
            <ShoppingBag className="w-4 h-4 text-red-400" />
            <span className="hidden md:inline">Itens Cotação</span>
            {quoteCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white tabular-nums">
                {quoteCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenQuoteForm}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-500 shadow-sm transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Pedir Orçamento</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-md focus:outline-none"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                if (link.onClick) link.onClick();
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenQuoteForm();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-500"
            >
              <FileText className="w-4 h-4" />
              Solicitar Orçamento Rápido
            </button>
            <a
              href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Olá TechSol, gostaria de informações e cotação de equipamentos Dahua.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 rounded-md"
            >
              <MessageCircle className="w-4 h-4" />
              Atendimento WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

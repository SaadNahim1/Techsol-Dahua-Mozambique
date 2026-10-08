import React, { useState, useRef } from 'react';
import { MessageCircle, ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { TechsolLogo } from './TechsolLogo';

interface NavbarProps {
  quoteCount: number;
  onOpenQuoteDrawer: () => void;
  onOpenQuoteForm: () => void;
  onSelectCategory: (category: string) => void;
  onOpenAdminPanel?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  quoteCount,
  onOpenQuoteDrawer,
  onOpenQuoteForm,
  onSelectCategory,
  onOpenAdminPanel,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoClickCountRef = useRef(0);
  const logoClickTimerRef = useRef<number | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    logoClickCountRef.current += 1;

    if (logoClickTimerRef.current) {
      window.clearTimeout(logoClickTimerRef.current);
    }

    if (logoClickCountRef.current >= 3) {
      logoClickCountRef.current = 0;
      if (onOpenAdminPanel) {
        onOpenAdminPanel();
      }
      return;
    }

    logoClickTimerRef.current = window.setTimeout(() => {
      if (logoClickCountRef.current === 1) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      logoClickCountRef.current = 0;
    }, 650);
  };

  const navLinks = [
    { label: 'Início', href: '#', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Loja & Catálogo', href: '#catalogo', onClick: () => onSelectCategory('todos') },
    { label: 'Simulador de Kits', href: '#kit-builder' },
    { label: 'Parceiros & Depoimentos', href: '#parceiros-depoimentos' },
    { label: 'Showroom Maputo', href: '#localizacao' },
    { label: 'Cotação Formal', href: '#orcamento' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo (Triple-click opens PIN-protected Admin Panel) */}
        <div className="flex items-center">
          <a
            href="#"
            onClick={handleLogoClick}
            className="flex items-center py-1 select-none"
            aria-label="TECHSOL SU LDA - Início"
          >
            <TechsolLogo className="h-11 sm:h-12" />
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
            type="button"
            onClick={onOpenQuoteDrawer}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
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
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
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

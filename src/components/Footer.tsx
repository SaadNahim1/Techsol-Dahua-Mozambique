import React, { useRef } from 'react';
import { ShieldCheck, Mail, Phone, MapPin, MessageCircle, ArrowUp } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { TechsolLogo } from './TechsolLogo';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenAdminPanel?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAdminPanel }) => {
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
      if (onOpenAdminPanel) onOpenAdminPanel();
      return;
    }
    logoClickTimerRef.current = window.setTimeout(() => {
      if (logoClickCountRef.current === 1) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      logoClickCountRef.current = 0;
    }, 650);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-100 text-slate-600 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <a href="#" onClick={handleLogoClick} className="inline-block select-none">
              <TechsolLogo className="h-12" />
            </a>
            <p className="text-xs leading-relaxed text-slate-600">
              Distribuidor oficial autorizado Dahua Technology em Moçambique. Fornecimento de CFTV, cercas elétricas Nemtek, alarmes sem fios e controlo de acesso.
            </p>
            <div className="flex items-center gap-1.5 text-slate-800 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
              <span>Garantia Oficial de 3 Anos</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Produtos em Estoque
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onSelectCategory('cctv')}
                  className="hover:text-red-600 transition-colors text-left"
                >
                  CFTV & Câmeras IP/HDCVI Dahua
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('cerca_eletrica')}
                  className="hover:text-red-600 transition-colors text-left"
                >
                  Cercas Elétricas Nemtek & Arames
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('alarmes')}
                  className="hover:text-red-600 transition-colors text-left"
                >
                  Alarmes Sem Fios AirShield 4G
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('controle_acesso')}
                  className="hover:text-red-600 transition-colors text-left"
                >
                  Motores Centurion & Facial Dahua
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('redes_acessorios')}
                  className="hover:text-red-600 transition-colors text-left"
                >
                  Cabos Cat6 Cobre & Discos WD Purple
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a href="#catalogo" className="hover:text-slate-900 transition-colors">
                  Catálogo com Preços em Meticais
                </a>
              </li>
              <li>
                <a href="#kit-builder" className="hover:text-slate-900 transition-colors">
                  Simulador de Kits IP e HDCVI
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-slate-900 transition-colors">
                  Showroom na Av. Josina Machel 923
                </a>
              </li>
              <li>
                <a href="#orcamento" className="hover:text-slate-900 transition-colors">
                  Solicitação de Orçamento
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Contacto Direto
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="font-mono text-slate-700">{COMPANY_CONFIG.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <a
                  href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 font-mono font-semibold"
                >
                  {COMPANY_CONFIG.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="font-mono">{COMPANY_CONFIG.phoneDisplaySecondary}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.address}, {COMPANY_CONFIG.city}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_CONFIG.name}. Todos os direitos reservados.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

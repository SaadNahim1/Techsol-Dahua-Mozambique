import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, MessageCircle, ArrowUp } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface FooterProps {
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Brand Wordmark & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white font-black text-lg">
                T
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                TechSol <span className="text-red-500">Dahua</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Distribuidor oficial credenciado em soluções de segurança eletrônica profissional. 
              Fornecimento grossista e retalhista de CFTV, cercas elétricas industriais, sistemas de alarme sem fio e controlo de acesso inteligente.
            </p>
            <div className="pt-2 flex items-center gap-2 text-white text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>Garantia de {COMPANY_CONFIG.officialWarrantyYears} Anos & Suporte Técnico Homologado</span>
            </div>
          </div>

          {/* Column 2: Categorias */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Linhas de Produtos
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('cctv')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  CFTV & Câmeras IP Dahua
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('cerca_eletrica')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Cercas Elétricas & Eletrificadores
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('alarmes')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Sistemas de Alarme AirShield
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('controle_acesso')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Controlo de Acesso Facial & IP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('redes_acessorios')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Switches PoE & Cabeamento Cat6
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Navegação Rápida */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Institucional & Serviços
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#sobre-nos" className="hover:text-white transition-colors">
                  Sobre a TechSol
                </a>
              </li>
              <li>
                <a href="#sobre-nos" className="hover:text-white transition-colors">
                  Por Que Escolher Dahua
                </a>
              </li>
              <li>
                <a href="#kit-builder" className="hover:text-white transition-colors">
                  Simulador de Kit de Segurança
                </a>
              </li>
              <li>
                <a href="#orcamento" className="hover:text-white transition-colors">
                  Solicitação de Orçamento
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Canal B2B de Instaladores
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contactos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Atendimento Comercial
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="font-mono text-slate-300">{COMPANY_CONFIG.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {COMPANY_CONFIG.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.address}, {COMPANY_CONFIG.city}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} {COMPANY_CONFIG.name}. {COMPANY_CONFIG.distributorTitle}. Todos os direitos reservados.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

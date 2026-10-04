import React from 'react';
import { ShieldCheck, CheckCircle2, MessageCircle, ArrowRight, Zap, Award, Search, Sparkles } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExploreCatalog: () => void;
  onOpenQuoteForm: () => void;
  onSelectCategory: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onExploreCatalog,
  onOpenQuoteForm,
  onSelectCategory,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 pt-8 pb-16 lg:pt-14 lg:pb-20">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-600/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Distributor Badge Tag */}
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold text-red-400">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="tracking-wide uppercase">Distribuidor Autorizado Dahua Technology</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Segurança Eletrônica Profissional</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              Equipamentos de Segurança Profissional com <span className="text-red-500">Garantia Oficial Dahua</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Fornecemos para instaladores, empresas e projetos governamentais a linha completa de 
              <strong className="text-white font-semibold"> CCTV 4K com Inteligência Artificial</strong>, 
              <strong className="text-white font-semibold"> Cercas Elétricas</strong> de alta voltagem, 
              <strong className="text-white font-semibold"> Sistemas de Alarme sem fio</strong> e 
              <strong className="text-white font-semibold"> Controlo de Acesso Biométrico</strong>.
            </p>

            {/* Live Search Bar for quick equipment lookup */}
            <div className="mt-6 max-w-xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onExploreCatalog();
                }}
                className="relative flex items-center"
              >
                <Search className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Pesquisar por modelo, câmera IP, cerca elétrica, alarme ou facial..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-11 pr-28 py-3 bg-slate-900/90 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors"
                >
                  Buscar
                </button>
              </form>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                <span>Mais buscados:</span>
                <button
                  onClick={() => onSearchChange('WizSense')}
                  className="text-slate-300 hover:text-red-400 underline decoration-slate-600 underline-offset-2"
                >
                  WizSense
                </button>
                <span>·</span>
                <button
                  onClick={() => onSearchChange('18K PRO')}
                  className="text-slate-300 hover:text-red-400 underline decoration-slate-600 underline-offset-2"
                >
                  Cerca 18.000V
                </button>
                <span>·</span>
                <button
                  onClick={() => onSearchChange('AirShield')}
                  className="text-slate-300 hover:text-red-400 underline decoration-slate-600 underline-offset-2"
                >
                  Alarme AirShield
                </button>
                <span>·</span>
                <button
                  onClick={() => onSearchChange('Facial')}
                  className="text-slate-300 hover:text-red-400 underline decoration-slate-600 underline-offset-2"
                >
                  Facial
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenQuoteForm}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-lg shadow-red-950/60 transition-all"
              >
                <span>Solicitar Orçamento Rápido</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Olá TechSol! Sou instalador/cliente e gostaria de um orçamento rápido de equipamentos Dahua.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Pedir no WhatsApp</span>
              </a>

              <a
                href="#kit-builder"
                className="flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Simulador de Kit</span>
              </a>
            </div>

            {/* 4 Trust Metrics */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xl font-bold text-white tabular-nums">{COMPANY_CONFIG.officialWarrantyYears} Anos</div>
                <div className="text-xs text-slate-400 mt-0.5">Garantia Oficial Dahua</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white tabular-nums">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Genuíno com N° Série</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white tabular-nums">B2B & B2C</div>
                <div className="text-xs text-slate-400 mt-0.5">Desconto a Instaladores</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white tabular-nums">Pronta Entrega</div>
                <div className="text-xs text-slate-400 mt-0.5">Stock Físico em Armazém</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              <img
                src="/images/hero_dahua_security_1791138982019.jpg"
                alt="Central de Monitoramento e Câmeras Dahua de Alta Performance"
                className="w-full h-80 sm:h-96 object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Overlay card for official distributor credential */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-red-600/20 text-red-500 border border-red-500/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Canal Oficial Autorizado</h2>
                    <p className="text-xs text-slate-300 mt-0.5">
                      RMA local, reposição direta de peças e suporte técnico de engenharia certificado.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Category Anchors */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onSelectCategory('cctv')}
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-left hover:border-red-500/50 hover:bg-slate-850 transition-colors"
              >
                <div className="font-semibold text-white">CFTV Dahua</div>
                <div className="text-slate-400 text-[11px]">IP WizSense, 4K, PTZ</div>
              </button>
              <button
                onClick={() => onSelectCategory('cerca_eletrica')}
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-left hover:border-red-500/50 hover:bg-slate-850 transition-colors"
              >
                <div className="font-semibold text-white">Cercas Elétricas</div>
                <div className="text-slate-400 text-[11px]">Eletrificadores 18kV</div>
              </button>
              <button
                onClick={() => onSelectCategory('alarmes')}
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-left hover:border-red-500/50 hover:bg-slate-850 transition-colors"
              >
                <div className="font-semibold text-white">Alarmes AirShield</div>
                <div className="text-slate-400 text-[11px]">Sem Fios com 4G + App</div>
              </button>
              <button
                onClick={() => onSelectCategory('controle_acesso')}
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-left hover:border-red-500/50 hover:bg-slate-850 transition-colors"
              >
                <div className="font-semibold text-white">Controlo de Acesso</div>
                <div className="text-slate-400 text-[11px]">Reconhecimento Facial</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ShieldCheck, MessageCircle, ArrowRight, Search, Zap } from 'lucide-react';
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
    <section className="border-b border-slate-200 bg-slate-50 py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Clean Headline and Search */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wide">
              <span>Distribuidor Autorizado Dahua Moçambique</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Equipamentos de Segurança Profissional a <span className="text-red-600">Pronta Entrega</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Fornecemos para instaladores, empresas e residências em Maputo e todas as províncias. 
              Linha completa de <strong>CFTV IP e Analógico HDCVI Dahua</strong>, <strong>Cercas Nemtek</strong>, <strong>Alarmes AirShield</strong> e <strong>Motores Centurion/Gemini</strong> com garantia oficial de 3 anos.
            </p>

            {/* Clean, Simple Search Bar */}
            <div className="max-w-xl pt-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onExploreCatalog();
                }}
                className="relative flex items-center shadow-xs"
              >
                <Search className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Pesquisar por modelo (ex: NVR, HDCVI, WizSense, Nemtek, Centurion)..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-11 pr-28 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Buscar
                </button>
              </form>
            </div>

            {/* Direct CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#catalogo"
                onClick={onExploreCatalog}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-colors"
              >
                <span>Ver Catálogo com Preços</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Olá TECHSOL! Gostaria de consultar cotação de equipamentos Dahua.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Pedir no WhatsApp</span>
              </a>

              <a
                href="#kit-builder"
                className="flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Simulador de Kits</span>
              </a>
            </div>

            {/* Simple Trust Metrics */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-800">
              <div>
                <div className="text-xl font-extrabold text-slate-900">3 Anos</div>
                <div className="text-xs text-slate-500">Garantia Dahua</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900">Maputo</div>
                <div className="text-xs text-slate-500">Av. Josina Machel 923</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900">100% Genuíno</div>
                <div className="text-xs text-slate-500">Com N° de Série</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900">M-Pesa / BIM</div>
                <div className="text-xs text-slate-500">Faturação com NUIT</div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Visual Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md p-3">
              <img
                src="/images/hero_dahua_security_1791138982019.jpg"
                alt="Equipamentos Dahua e Segurança Profissional Techsol"
                className="w-full h-72 sm:h-80 object-cover object-center rounded-xl"
              />
              <div className="p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-red-50 text-red-600 border border-red-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Canal Autorizado em Moçambique</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    RMA local rápido, peças de reposição e suporte técnico especializado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

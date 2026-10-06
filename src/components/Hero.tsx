import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Truck, 
  Zap, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  Building2, 
  Wrench, 
  FileText,
  Camera,
  Cpu,
  Lock,
  HardDrive
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExploreCatalog: () => void;
  onOpenQuoteForm: () => void;
  onSelectCategory: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onOpenQuoteForm,
  onSelectCategory,
}) => {
  const handleSolutionClick = (category: string) => {
    onSelectCategory(category);
    const elem = document.getElementById('catalogo');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Subtle Background Ambience */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-red-950/30 via-slate-900/60 to-slate-950 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Main Authority Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Core Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Credibility Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span>100% · 100% Feliz · 100% Moçambicana</span>
            </div>

            {/* Dominant Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Segurança Eletrônica: 100%, <span className="text-red-500">100% Feliz</span>, 100% Moçambicana.
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Abastecemos instaladores credenciados, empresas de segurança e condomínios com sistemas originais 
              <strong> Dahua, Nemtek e Centurion</strong>. Sede e armazém próprio na <em>Av. Josina Machel 923, Maputo</em>, 
              com suporte técnico especializado e faturação formal com NUIT.
            </p>

            {/* Value Indicators (Unboxed Clean Typography) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Moçambicana</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Feliz</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Original</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Showroom em Maputo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Faturação com NUIT</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Suporte & Parceria Técnica</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-xl shadow-lg shadow-red-900/30 transition-all cursor-pointer"
              >
                <span>Explorar Catálogo & Loja</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Olá TECHSOL! Gostaria de consultar cotação especial ou falar com o departamento comercial.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 rounded-xl transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Falar no WhatsApp</span>
              </a>

              <a
                href="#kit-builder"
                className="flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Simular Kit</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Trust Card & Showroom Highlight */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-slate-800/70 border border-slate-700/80 p-5 sm:p-6 backdrop-blur-md shadow-2xl space-y-4">
              
              {/* Showroom Photo Card */}
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700">
                <img
                  src="/images/hero_dahua_security_1791138982019.jpg"
                  alt="Showroom e Distribuição Oficial TECHSOL SU LDA Dahua"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-3 inset-x-3 text-left">
                  <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                    Sede & Showroom
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    Av. Josina Machel, 923 · Baixa de Maputo
                  </div>
                </div>
              </div>

              {/* Quick Trust Statistics */}
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60">
                  <div className="text-lg font-black text-white font-mono leading-none">44+</div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Modelos Físicos</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60">
                  <div className="text-lg font-black text-red-400 font-mono leading-none">B2B & B2C</div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Tabela Revenda</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60">
                  <div className="text-lg font-black text-emerald-400 font-mono leading-none">100%</div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Originais c/ NUIT</div>
                </div>
              </div>

              {/* Quick Quote Trigger Box */}
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/40 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">É Instalador ou Empresa?</div>
                  <div className="text-[11px] text-slate-300">Solicite tabela de preços com fatura proforma.</div>
                </div>
                <button
                  type="button"
                  onClick={onOpenQuoteForm}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shrink-0 cursor-pointer transition-colors"
                >
                  Cotação
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Four Core Solutions Showcase (Direct Pathways into the Store) */}
        <div className="mt-14 sm:mt-18 pt-10 border-t border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
            <div>
              <div className="text-xs font-bold text-red-500 uppercase tracking-wider">
                Nossas Divisões de Equipamentos
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Soluções Completas de Segurança em Moçambique
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Clique em qualquer divisão abaixo para filtrar os equipamentos correspondentes com fotos, especificações e preços em Meticais.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Division 1: CFTV Dahua */}
            <div 
              onClick={() => handleSolutionClick('cctv')}
              className="group p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-red-500/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/20 border border-red-500/30 text-red-400">
                    <Camera className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">Dahua</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                  CFTV & Videovigilância IA
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Câmeras IP PoE Full-Color 24/7, NVRs 4K Plug & Play e Gravadores XVR WizSense com IA.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-red-400 group-hover:translate-x-0.5 transition-transform">
                <span>Ver Câmeras & NVRs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Division 2: Nemtek Fences */}
            <div 
              onClick={() => handleSolutionClick('cerca_eletrica')}
              className="group p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">Nemtek</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  Cercas Elétricas Perimetrais
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Eletrificadores Wizord 4i, Merlin e Druid LCD, arames de alumínio e sirenes de alta potência.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform">
                <span>Ver Eletrificadores</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Division 3: Gate Automation */}
            <div 
              onClick={() => handleSolutionClick('controle_acesso')}
              className="group p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">Centurion</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  Motores de Portão & Acesso
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Motores Centurion D5 Smart rápidos, automação Gemini, reconhecimento facial e fechaduras.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:translate-x-0.5 transition-transform">
                <span>Ver Motores & Acesso</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Division 4: Storage & Network */}
            <div 
              onClick={() => handleSolutionClick('redes_acessorios')}
              className="group p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">WD Purple</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                  Cabos Cat6 & Discos Rígidos
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Discos Western Digital Purple 24/7 (1TB a 6TB), cabos de rede 100% cobre e fontes industriais.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-purple-400 group-hover:translate-x-0.5 transition-transform">
                <span>Ver Discos & Cabos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

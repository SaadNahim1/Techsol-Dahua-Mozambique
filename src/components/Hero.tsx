import React from 'react';
import { 
  Zap, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  Camera,
  Lock,
  HardDrive,
  MapPin
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { TechsolLogo } from './TechsolLogo';

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
    <section
      aria-label="TECHSOL"
      className="relative isolate overflow-hidden bg-[#0b0c10] text-white border-b border-slate-800/80 bg-[radial-gradient(60%_55%_at_50%_42%,rgba(211,18,26,0.28),transparent_70%),linear-gradient(180deg,#12131a_0%,#0b0c10_100%)]"
    >
      {/* Subtle Technical Grid Background (exact match to hero.html) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Centered Brand Hero Block (hero__inner from hero.html) */}
        <div className="mx-auto max-w-[1000px] flex flex-col items-center text-center gap-6 sm:gap-8">
          {/* Top Credibility Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-bold uppercase tracking-wider text-red-300 shadow-inner">
            <span className="h-2 w-2 rounded-full bg-[#d3121a] animate-pulse" />
            <span>100% Nossa · 100% Local · 100% Moçambicana</span>
          </div>

          {/* H1 with Full Dark-Mode TECHSOL + Official Dahua Partner Logo */}
          <h1 className="w-full flex flex-col items-center">
            <span className="sr-only">
              TECHSOL SU LDA – Distribuidor Oficial Dahua em Moçambique | Segurança Inteligente. Futuro Garantido. (100% Nossa, 100% Local, 100% Moçambicana)
            </span>
            <div
              id="hero-logo-container"
              className="w-full max-w-[920px] px-2 sm:px-4 py-2 animate-hero-logo-enter flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 group transition-all duration-300 ease-out"
            >
              {/* Primary TECHSOL Brand Emblem */}
              <div className="flex-1 flex justify-center md:justify-end">
                <TechsolLogo
                  variant="dark"
                  className="w-full max-w-[320px] sm:max-w-[400px] h-auto drop-shadow-[0_12px_45px_rgba(0,0,0,0.7)]"
                />
              </div>

              {/* Vertical Divider Bar */}
              <div className="hidden md:block h-20 w-px bg-white/20" aria-hidden="true" />

              {/* Official Dahua Technology Logo Asset */}
              <div className="flex flex-col items-center md:items-start gap-1.5">
                <div className="bg-transparent flex items-center justify-center py-1">
                  <img
                    src="/images/dahua-seeklogo-white.png"
                    alt="Dahua Technology"
                    className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Distribuidor Oficial Moçambique</span>
                </div>
              </div>
            </div>
          </h1>

          {/* Hero Sub-headline (from hero.html + local authority) */}
          <p className="max-w-[58ch] text-base sm:text-lg lg:text-xl leading-relaxed text-[#c9cbd3] font-medium">
            Câmaras IP, gravação NVR/DVR, cercas eléctricas <strong className="text-white">Nemtek</strong>, motores de portão <strong className="text-white">Centurion</strong> e redes WiFi profissionais — fornecimento oficial <strong className="text-white">Dahua Technology</strong> com suporte técnico certificado em Maputo.
          </p>

          {/* Primary & Secondary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1 w-full max-w-2xl">
            <a
              href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Olá TECHSOL! Gostaria de pedir um orçamento de equipamentos de segurança.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[10px] font-bold text-base bg-[#d3121a] hover:bg-[#a80d14] text-white shadow-lg shadow-red-950/60 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>Pedir orçamento</span>
            </a>

            <button
              type="button"
              onClick={onExploreCatalog}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] font-bold text-base border-2 border-white/35 hover:border-white text-white hover:bg-white/5 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Ver soluções &amp; catálogo</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={onOpenQuoteForm}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[10px] font-semibold text-sm bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Cotação Formal (NUIT)</span>
            </button>
          </div>

          {/* Hero Tags List */}
          <ul className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 pt-2 text-xs sm:text-[13px] tracking-[0.08em] uppercase text-[#9a9dab] font-semibold list-none">
            <li className="flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d3121a] mr-2.5" />
              Videovigilância CFTV
            </li>
            <li className="flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d3121a] mr-2.5" />
              Redes &amp; WiFi
            </li>
            <li className="flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d3121a] mr-2.5" />
              Controlo de acessos
            </li>
            <li className="flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d3121a] mr-2.5" />
              Suporte técnico certificado
            </li>
          </ul>

          {/* Unboxed Trust & Location Strip */}
          <div className="pt-4 border-t border-white/10 w-full max-w-3xl flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#d3121a] shrink-0" />
              Av. Josina Machel, 923 · Baixa de Maputo
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-slate-700">·</span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Garantia Oficial 3 Anos
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-slate-700">·</span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Envio para todas as Províncias
            </span>
          </div>

          {/* Official Authorized Brands Strip */}
          <div className="pt-4 border-t border-white/10 w-full max-w-4xl flex flex-col items-center gap-2.5">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Marcas Oficiais Homologadas com Garantia de Fábrica
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
              {/* Dahua */}
              <div className="flex items-center px-1 opacity-90 hover:opacity-100 transition-opacity">
                <img
                  src="/images/dahua-seeklogo-white.png"
                  alt="Dahua Technology"
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              </div>
              <span className="text-slate-700 hidden sm:inline" aria-hidden="true">|</span>
              {/* Nemtek */}
              <div className="flex items-center bg-white rounded-lg px-2.5 py-1 shadow-xs hover:bg-white transition-colors">
                <img
                  src="/images/nemtek-logo.svg"
                  alt="Nemtek Electric Fencing"
                  className="h-5 sm:h-6 w-auto object-contain"
                />
              </div>
              <span className="text-slate-700 hidden sm:inline" aria-hidden="true">|</span>
              {/* ZKTeco */}
              <div className="flex items-center bg-white rounded-lg px-2.5 py-1 shadow-xs hover:bg-white transition-colors">
                <img
                  src="/images/zkteco-seeklogo.png"
                  alt="ZKTeco"
                  className="h-5 sm:h-6 w-auto object-contain"
                />
              </div>
              <span className="text-slate-700 hidden sm:inline" aria-hidden="true">|</span>
              {/* Cudy */}
              <div className="flex items-center bg-white rounded-lg px-2.5 py-1 shadow-xs hover:bg-white transition-colors">
                <img
                  src="/images/cudy-seeklogo.png"
                  alt="Cudy Networks"
                  className="h-5 sm:h-6 w-auto object-contain"
                />
              </div>
              <span className="text-slate-700 hidden sm:inline" aria-hidden="true">|</span>
              {/* Tenda */}
              <div className="flex items-center bg-white rounded-lg px-2.5 py-1 shadow-xs hover:bg-white transition-colors">
                <img
                  src="/images/tenda-seeklogo.png"
                  alt="Tenda"
                  className="h-5 sm:h-6 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Four Core Solutions Showcase (Direct Pathways into the Store) */}
        <div id="solucoes" className="mt-14 sm:mt-16 pt-10 border-t border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
            <div>
              <div className="text-xs font-bold text-[#d3121a] uppercase tracking-wider">
                Nossas Divisões de Equipamentos
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Soluções Completas de Segurança Eletrónica em Moçambique
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
              className="group p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-red-500/50 transition-all cursor-pointer flex flex-col justify-between"
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
                  Câmaras IP PoE Full-Color 24/7, NVRs 4K Plug & Play e Gravadores XVR WizSense com IA.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-red-400 group-hover:translate-x-0.5 transition-transform">
                <span>Ver Câmaras & NVRs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Division 2: Nemtek Fences */}
            <div 
              onClick={() => handleSolutionClick('cerca_eletrica')}
              className="group p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">Nemtek</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  Cercas Eléctricas Perimetrais
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Electrificadores Wizord 4i, Merlin e Druid com ecrã LCD, arames de alumínio e sirenes.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform">
                <span>Ver Electrificadores</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Division 3: Gate Automation */}
            <div 
              onClick={() => handleSolutionClick('controle_acesso')}
              className="group p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">Centurion</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  Motores de Portão & Controlo de Acesso
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Motores Centurion D5 Smart rápidos, automação Gemini, reconhecimento facial e fechaduras.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:translate-x-0.5 transition-transform">
                <span>Ver Motores & Controlo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Division 4: Storage & Network */}
            <div 
              onClick={() => handleSolutionClick('redes_acessorios')}
              className="group p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer flex flex-col justify-between"
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
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-purple-400 group-hover:translate-x-0.5 transition-transform">
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

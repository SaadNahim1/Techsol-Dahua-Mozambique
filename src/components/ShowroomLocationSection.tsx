import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Truck, 
  CreditCard, 
  ExternalLink, 
  ShieldCheck, 
  Building,
  Navigation
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export const ShowroomLocationSection: React.FC = () => {
  return (
    <section id="localizacao" className="py-16 lg:py-20 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 tracking-wider uppercase mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Showroom & Centro de Distribuição</span>
            <span className="text-slate-600">·</span>
            <span>Maputo & Províncias</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Visite Nosso Showroom Técnico em Maputo
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Venha conhecer os equipamentos Dahua em funcionamento, testar câmeras Full-Color e centrais de alarme na nossa bancada técnica, ou retirar seus pedidos de pronta entrega.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Physical details and Map card */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Endereço Principal</h3>
                  <p className="mt-1 text-base text-slate-200 font-medium">
                    {COMPANY_CONFIG.address}
                  </p>
                  <p className="text-xs text-slate-400">
                    {COMPANY_CONFIG.city}, {COMPANY_CONFIG.country} · Ponto de referência acessível no centro comercial
                  </p>
                </div>
              </div>

              {/* Visual simulated map badge */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Navigation className="w-8 h-8 text-red-500 shrink-0 animate-pulse" />
                  <div>
                    <div className="font-bold text-white text-sm">Traçar Rota até a TechSol</div>
                    <div className="text-xs text-slate-400">Aberto no Google Maps para navegação GPS</div>
                  </div>
                </div>
                <a
                  href={COMPANY_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <span>Abrir no Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Working Hours & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white mb-1">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Horário de Atendimento</span>
                  </div>
                  <div className="text-slate-300 text-[11px] leading-relaxed">
                    {COMPANY_CONFIG.openingHours}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white mb-1">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Telefones / WhatsApp</span>
                  </div>
                  <div className="text-slate-300 text-[11px] font-mono">
                    {COMPANY_CONFIG.phoneDisplay} <br />
                    {COMPANY_CONFIG.phoneDisplaySecondary}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Estacionamento no local e atendimento priorizado para instaladores</span>
              <span className="font-mono text-emerald-400 font-semibold">Stock Pronta Entrega</span>
            </div>
          </div>

          {/* Right Column: Local Payment & Provinces Shipping (Essential for Mozambique) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-6">
            <div>
              <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-3">
                <Truck className="w-5 h-5 text-red-500" />
                <span>Despacho para Todas as Províncias</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Além do atendimento no balcão em Maputo, enviamos encomendas diárias via transportadoras locais e correios para instaladores de todas as regiões:
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {COMPANY_CONFIG.provincesCoverage.map((prov, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-950 text-[10px] font-medium text-slate-300 border border-slate-800"
                  >
                    {prov}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-3">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <span>Facilidades de Pagamento & Faturação</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {COMPANY_CONFIG.paymentMethods.map((method, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{method}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-300">
                ✓ Emissão imediata de Fatura Proforma e Fatura Definitiva com NUIT para dedução fiscal de empresas.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

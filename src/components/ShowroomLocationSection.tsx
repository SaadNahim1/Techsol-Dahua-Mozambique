import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Truck, 
  CreditCard, 
  ExternalLink, 
  Navigation
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export const ShowroomLocationSection: React.FC = () => {
  return (
    <section id="localizacao" className="py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Visite Nossa Loja
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Showroom & Armazém em Maputo
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Retirada imediata de mercadorias no balcão e bancada de testes para instaladores.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Address and Route */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Localização</h3>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {COMPANY_CONFIG.address}
                  </p>
                  <p className="text-xs text-slate-500">
                    {COMPANY_CONFIG.city}, {COMPANY_CONFIG.country}
                  </p>
                </div>
              </div>

              {/* Google Maps Action */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-5 h-5 text-red-600 shrink-0" />
                  <div>
                    <div className="font-bold text-xs text-slate-900">Como Chegar</div>
                    <div className="text-[11px] text-slate-500">Traçar rota GPS no Google Maps</div>
                  </div>
                </div>
                <a
                  href={COMPANY_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>Abrir no Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Hours & Phones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Horário</span>
                  </div>
                  <div className="text-slate-600 text-[11px]">
                    {COMPANY_CONFIG.openingHours}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Telefones</span>
                  </div>
                  <div className="text-slate-700 font-mono text-[11px]">
                    {COMPANY_CONFIG.phoneDisplay} <br />
                    {COMPANY_CONFIG.phoneDisplaySecondary}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs text-slate-500">
              Estacionamento no local e atendimento técnico para instaladores.
            </div>
          </div>

          {/* Provinces Shipping & Payments */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
                <Truck className="w-4 h-4 text-red-600" />
                <span>Despacho para Todas as Províncias</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enviamos diariamente via transportadora para todo Moçambique (Beira, Nampula, Tete, Inhambane, Gaza, Zambézia, Cabo Delgado, Niassa e Manica).
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>Pagamento e Faturação</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Transferências Bancárias (BIM, BCI, Standard Bank, Moza)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>M-Pesa e E-Mola aceitos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Cartões POS no balcão</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Emissão formal de fatura com NUIT</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

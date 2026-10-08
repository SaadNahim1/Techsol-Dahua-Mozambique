import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Truck, 
  CreditCard, 
  ExternalLink, 
  Navigation,
  Compass,
  MessageCircle
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export const ShowroomLocationSection: React.FC = () => {
  // Google Maps embed URL for Av. Josina Machel 923, Maputo
  const mapEmbedUrl = "https://maps.google.com/maps?q=Avenida+Josina+Machel+923+Maputo+Mozambique&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="localizacao" className="py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Sede & Showroom Físico</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Visite a TECHSOL em Maputo
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Retirada imediata de mercadorias no balcão da baixa de Maputo, bancada de testes para instaladores e assistência técnica.
            </p>
          </div>

          <a
            href={COMPANY_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-all self-start md:self-auto cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Traçar Rota no Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Interactive Map & Showroom Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Google Maps Component */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs flex flex-col">
            {/* Map Header Bar */}
            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold font-mono">
                  Av. Josina Machel, 923 · Baixa de Maputo
                </span>
              </div>
              <a
                href={COMPANY_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-red-400 hover:text-white flex items-center gap-1 font-semibold"
              >
                <span>Ver Mapa Completo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Interactive Google Map */}
            <div className="relative w-full h-72 sm:h-96 min-h-[280px] bg-slate-200">
              <iframe
                title="Localização da TECHSOL SU LDA na Avenida Josina Machel 923, Maputo"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating Quick Navigation Chip */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                <span>Perto do Porto e Baixa de Maputo</span>
              </div>
            </div>

            {/* Map Footer Strip */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900">Coordenadas:</span>
                <span>Avenida Josina Machel 923, Maputo, Moçambique</span>
              </div>
              <a
                href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Olá TECHSOL! Estou a caminho do vosso armazém na Av. Josina Machel 923.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Avisar chegada no WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: Store Details, Provinces & Payment */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Address & Hours Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Endereço da Loja</h3>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {COMPANY_CONFIG.address}
                  </p>
                  <p className="text-xs text-slate-500">
                    {COMPANY_CONFIG.city}, {COMPANY_CONFIG.country}
                  </p>
                </div>
              </div>

              {/* Hours & Telephones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Horário</span>
                  </div>
                  <div className="text-slate-600 text-[11px] leading-snug">
                    {COMPANY_CONFIG.openingHours}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Contactos</span>
                  </div>
                  <div className="text-slate-700 font-mono text-[11px] leading-snug">
                    {COMPANY_CONFIG.phoneDisplay} <br />
                    {COMPANY_CONFIG.phoneDisplaySecondary}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600">
                🅿️ Estacionamento disponível no local e bancada de diagnóstico para instaladores.
              </div>
            </div>

            {/* Provinces Shipping & Payments */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1.5">
                  <Truck className="w-4 h-4 text-red-600" />
                  <span>Despacho Provincial Diário</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Despachamos mercadorias no mesmo dia via transportadora para todas as províncias (Beira, Nampula, Tete, Pemba, Nacala, Quelimane, Inhambane e Gaza).
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pagamentos Aceites & Faturação</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>BIM, BCI, Moza Banco</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>M-Pesa e E-Mola</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>POS / Cartão no balcão</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>Faturação Fiscal NUIT</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

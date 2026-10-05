import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, MapPin, Truck, Zap } from 'lucide-react';
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
}) => {
  return (
    <section className="bg-slate-50 border-b border-slate-200 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider border border-red-100">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span>Loja & Armazém em Maputo · Pronta Entrega</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Catálogo de Segurança Eletrônica <span className="text-red-600">TECHSOL</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Equipamentos originais Dahua, cercas elétricas Nemtek e motores Centurion com preços de tabela em Meticais (MT). 
              Adicione à sacola e finalize o seu pedido diretamente no WhatsApp para entrega rápida ou levantamento em loja.
            </p>

            {/* Quick Action Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#catalogo"
                onClick={onExploreCatalog}
                className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-colors"
              >
                <span>Explorar Produtos</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Olá TECHSOL! Gostaria de fazer um pedido pelo WhatsApp.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Pedir no WhatsApp</span>
              </a>

              <a
                href="#kit-builder"
                className="flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Montar Kit Pronto</span>
              </a>
            </div>

            {/* Storefront Trust Badges */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                <span>Av. Josina Machel 923</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
                <span>3 Anos de Garantia</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-red-600 shrink-0" />
                <span>Envio p/ Todo Moçambique</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-700">M-Pesa / BIM / BCI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

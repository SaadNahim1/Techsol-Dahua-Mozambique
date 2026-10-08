import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Cpu, 
  CheckCircle2, 
  Wrench
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre-nos" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Sobre a TECHSOL SU LDA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Distribuidor Autorizado Dahua Technology em Moçambique
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            A <strong>TECHSOL SU LDA</strong> é o parceiro de confiança de grandes instituições como o <strong>Moza Banco</strong> e complexos esportivos de prestígio como o <strong>Maputo Padel Club</strong>. Atuamos com fornecimento grossista e retalhista na <strong>Avenida Josina Machel, 923 em Maputo</strong>, abastecendo técnicos e empresas de todas as províncias de Moçambique.
          </p>
        </div>

        {/* 4 Clean Pillars */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <ShieldCheck className="w-6 h-6 text-red-600 mb-2" />
            <h3 className="text-sm font-bold text-slate-900">3 Anos de Garantia Oficial</h3>
            <p className="text-xs text-slate-600 mt-1">
              Todos os gravadores e câmeras Dahua possuem garantia genuína com reposição e suporte oficial.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <Wrench className="w-6 h-6 text-red-600 mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Bancada Técnica & RMA</h3>
            <p className="text-xs text-slate-600 mt-1">
              Testamos os equipamentos na loja e auxiliamos instaladores na configuração e diagnóstico.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <Cpu className="w-6 h-6 text-red-600 mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Tecnologia Inteligente</h3>
            <p className="text-xs text-slate-600 mt-1">
              Câmeras com Inteligência Artificial WizSense, visão noturna Full-Color e deteção de viaturas.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Estoque Pronta Entrega</h3>
            <p className="text-xs text-slate-600 mt-1">
              Mais de 2.000 câmeras e eletrificadores Nemtek em armazém para retirada imediata em Maputo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

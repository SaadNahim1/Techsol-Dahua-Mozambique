import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Cpu, 
  Eye, 
  Lock, 
  CheckCircle2, 
  Users, 
  Wrench, 
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre-nos" className="py-16 lg:py-24 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 tracking-wider uppercase mb-2">
            <span>Sobre Nós</span>
            <span className="text-slate-600">·</span>
            <span>TechSol Segurança Eletrônica</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Distribuidor Oficial Dahua Technology: Excelência e Compromisso com a Segurança Profissional
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            A <strong>TechSol</strong> é a sua distribuidora autorizada de referência em soluções de segurança eletrônica de alto desempenho. 
            Nascemos com o propósito de suprir as necessidades de integradores, instaladores técnicos, empresas e grandes empreendimentos 
            com equipamentos de ponta, garantia genuína e suporte de engenharia especializado.
          </p>
        </div>

        {/* Presentation Narrative */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              Como <strong className="text-white">distribuidores oficiais da marca Dahua</strong>, nossa atuação vai muito além do fornecimento de caixas e equipamentos. 
              Garantimos uma cadeia de suprimentos direta do fabricante, assegurando que cada projeto — desde uma residência de alto padrão até armazéns alfandegados 
              e complexos industriais — conte com equipamentos originais, homologados e certificados internacionalmente.
            </p>
            <p>
              Nossa equipe técnica é capacitada diretamente pelos laboratórios e centros de treinamento da Dahua. Dessa forma, oferecemos aos nossos 
              parceiros instaladores o respaldo técnico necessário para dimensionamento de redes PoE, cálculo de consumo de largura de banda e armazenamento, 
              além de assessoria completa na implantação de perímetros eletrificados, sistemas de intrusão sem fio e biometria facial.
            </p>
            
            {/* Direct Distributor Highlights */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                  <span>Procedência 100% Genuína</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Produtos originais com número de série validável no portal oficial Dahua, evitando cópias e mercado cinzento.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                  <Wrench className="w-5 h-5 text-red-500" />
                  <span>Suporte & RMA Local</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Laboratório técnico próprio para diagnóstico, atualização de firmwares de segurança e substituição ágil em garantia.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                  <Users className="w-5 h-5 text-red-500" />
                  <span>Clube do Instalador B2B</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Tabela de preços exclusiva com margem atrativa, catálogo de apoio à venda e treinamento contínuo.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                  <FileCheck className="w-5 h-5 text-red-500" />
                  <span>Garantia de até 3 Anos</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Segurança jurídica e cobertura integral contra defeitos de fabricação respaldada pelo fabricante.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Corporate Credential Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Credenciamento Oficial</span>
                <div className="text-lg font-bold text-white mt-0.5">Dahua Authorized Distributor</div>
              </div>
              <div className="h-10 w-10 rounded-lg bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500">
                <Award className="w-6 h-6" />
              </div>
            </div>

            <ul className="mt-5 space-y-3.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Distribuição Autorizada:</strong> Linhas completas de CCTV, CFTV térmico, NVRs, Alarmes e Acesso.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Segurança Perimetral:</strong> Eletrificadores homologados para cerca elétrica industrial e residencial.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Pronta Entrega:</strong> Centro de distribuição com inventário atualizado em tempo real.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Atendimento Ágil:</strong> Orçamentos respondidos em até 30 minutos via WhatsApp e e-mail.</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Contato Direto da Distribuição:</span>
              <span className="font-mono text-white">vendatechsol@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Subsection: 'Por que escolher Dahua' */}
        <div className="mt-20 pt-12 border-t border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-xs font-semibold text-red-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Padrão Global em Segurança</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Por Que Escolher a Marca Dahua?
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              A Dahua Technology é uma das maiores líderes mundiais em soluções de vigilância por vídeo e segurança inteligente. 
              Conheça os pilares que tornam os equipamentos Dahua a escolha mais confiável do mercado internacional.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Qualidade */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Qualidade e Robustez Industrial</h4>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Os equipamentos Dahua são construídos com corpos metálicos de alta durabilidade e proteções certificadas 
                  <strong> IP67 contra água e poeira</strong>, <strong>IK10 contra impactos e vandalismo</strong> e proteção de surto elétrico de até 6KV.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
                Testes climáticos extremos de -40°C a +60°C para funcionamento ininterrupto 24/7.
              </div>
            </div>

            {/* Pillar 2: Inovação & Inteligência Artificial */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Inovação Tecnológica com IA WizSense</h4>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Pioneirismo em algoritmos de <em>Deep Learning</em> que diferenciam seres humanos e viaturas de animais ou folhas, 
                  reduzindo em até <strong>98% os disparos em falso</strong>. Além da tecnologia <strong>Full-Color 24/7</strong> para imagens coloridas 
                  mesmo na escuridão absoluta.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
                Mais de 1.800 patentes ativas e mais de 50% de colaboradores dedicados à Pesquisa e Desenvolvimento (P&D).
              </div>
            </div>

            {/* Pillar 3: Confiabilidade & Ecossistema Unificado */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Confiabilidade e Ecossistema Integrado</h4>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Gerencie todo o seu sistema — CFTV, alarmes sem fios AirShield, videoporteiros e controle de acessos — a partir de um único aplicativo 
                  <strong> DMSS</strong> no celular e software central <strong>SmartPSS</strong> no computador, sem mensalidades obrigatórias.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
                Criptografia avançada AES-128 e conformidade rigorosa com normas internacionais de cibersegurança e privacidade.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

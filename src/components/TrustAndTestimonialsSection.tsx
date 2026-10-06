import React from 'react';
import { 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Building2, 
  Wrench, 
  MapPin, 
  Award,
  ArrowRight,
  Landmark,
  Trophy,
  BellRing
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface TrustAndTestimonialsSectionProps {
  onOpenQuoteForm?: () => void;
}

export const TrustAndTestimonialsSection: React.FC<TrustAndTestimonialsSectionProps> = ({
  onOpenQuoteForm,
}) => {
  // Real Corporate Clients in Mozambique
  const corporateClients = [
    {
      name: 'Moza Banco',
      category: 'Setor Bancário & Financeiro',
      desc: 'Segurança bancária, CFTV Dahua com IA e controle de acessos para agências e caixas automáticos.',
      tag: 'Cliente Institucional',
      icon: Landmark,
      color: 'from-amber-600/20 to-amber-900/10 border-amber-500/30 text-amber-400',
    },
    {
      name: 'Burglar Alert Moçambique',
      category: 'Segurança Privada & Monitoramento 24/7',
      desc: 'Centrais de alarme, proteção perimetral com eletrificadores Nemtek e videovigilância de alta resolução.',
      tag: 'Empresa de Monitoramento',
      icon: BellRing,
      color: 'from-red-600/20 to-red-900/10 border-red-500/30 text-red-400',
    },
    {
      name: 'Maputo Padel Club',
      category: 'Complexo Esportivo & Lazer',
      desc: 'Câmeras IP Full-Color 24h, segurança perimetral e automação de portões para atletas e membros.',
      tag: 'Clube & Eventos',
      icon: Trophy,
      color: 'from-emerald-600/20 to-emerald-900/10 border-emerald-500/30 text-emerald-400',
    },
  ];

  // Official Manufacturing Partners
  const partners = [
    {
      name: 'Dahua Technology',
      role: 'Distribuidor Oficial Moçambique',
      desc: 'CFTV, Inteligência Artificial, Terminais Faciais e Alarmes',
      badge: 'Garantia Oficial 3 Anos',
    },
    {
      name: 'Nemtek South Africa',
      role: 'Parceiro Perimetral Oficial',
      desc: 'Eletrificadores Wizord e Druid, arames de alta segurança e sirenes',
      badge: 'Qualidade Sul-Africana',
    },
    {
      name: 'Centurion Systems',
      role: 'Distribuição Autorizada',
      desc: 'Motores de portão deslizantes D5 Smart, comandos Nova e automação',
      badge: 'Líder em Automação',
    },
    {
      name: 'Western Digital Purple',
      role: 'Armazenamento de Vigilância 24/7',
      desc: 'Discos rígidos HDD dedicados para NVRs e XVRs sem perda de frames',
      badge: 'Garantia Direta WD',
    },
    {
      name: 'ZKTeco',
      role: 'Infraestrutura & Bastidores',
      desc: 'Racks 6U e 9U de parede com fechadura e biometrias industriais',
      badge: 'Padrão 19 Polegadas',
    },
    {
      name: 'Gemini Automation',
      role: 'Automação de Portões',
      desc: 'Sistemas deslizantes e motores para condomínios residenciais',
      badge: 'Alta Durabilidade',
    },
  ];

  // Verified Customer Testimonials with real clients
  const testimonials = [
    {
      name: 'Moza Banco',
      role: 'Departamento de Segurança Patrimonial & Infraestruturas',
      company: 'Moza Banco S.A.',
      city: 'Maputo (Rede Nacional de Agências)',
      avatar: 'MB',
      rating: 5,
      text: 'A TECHSOL é fornecedora chave de equipamentos Dahua para os nossos projetos de videovigilância e controle de acessos em Moçambique. Câmeras com inteligência artificial, gravação contínua sem falhas em discos WD Purple e pronta entrega de equipamentos homologados com faturação fiscal e 3 anos de garantia oficial.',
      verified: 'Instituição Bancária Verificada',
      highlight: 'Segurança Bancária de Alta Confiança',
    },
    {
      name: 'Burglar Alert Moçambique',
      role: 'Direção de Operações & Resposta Rápida',
      company: 'Burglar Alert Segurança Eletrônica',
      city: 'Maputo & Matola',
      avatar: 'BA',
      rating: 5,
      text: 'Como uma das maiores empresas de monitoramento 24h e resposta armada em Moçambique, a confiabilidade dos equipamentos perimetrais é inegociável. Os eletrificadores Nemtek, centrais de alarme e câmeras Dahua fornecidos pela TECHSOL garantem que a nossa central receba disparos precisos sem falsos alarmes, com assistência técnica imediata no armazém da Av. Josina Machel.',
      verified: 'Empresa de Segurança 24/7',
      highlight: 'Operações Críticas & Resposta Armada',
    },
    {
      name: 'Maputo Padel Club',
      role: 'Direção de Instalações & Experiência de Membros',
      company: 'Maputo Padel Club',
      city: 'Maputo · Polana / Costa do Sol',
      avatar: 'MP',
      rating: 5,
      text: 'Equipamos o Maputo Padel Club com câmeras Dahua Full-Color 4K e automação de acessos com motores fornecidos pela TECHSOL para proteger os nossos atletas, membros e eventos noturnos. A qualidade de imagem colorida à noite e a rapidez dos motores de portão superaram as nossas expectativas.',
      verified: 'Complexo Esportivo & Lazer',
      highlight: 'Monitoramento 4K & Automação de Acessos',
    },
    {
      name: 'Alberto Cossa',
      role: 'Técnico Instalador Credenciado',
      company: 'Cossa Soluções Eletrônicas',
      city: 'Matola · Fomento',
      avatar: 'AC',
      rating: 5,
      text: 'Trabalho como instalador autônomo há 8 anos. O desconto que a TECHSOL pratica no balcão da Av. Josina Machel 923 para técnicos credenciados é imbatível. Sempre que preciso de assistência ou troca imediata com a garantia oficial de 3 anos, o atendimento é direto e sem burocracia.',
      verified: 'Instalador Certificado',
      highlight: 'Margem Real para Técnicos Parceiros',
    },
  ];

  const stats = [
    { value: '450+', label: 'Instaladores e Empresas Atendidas', sub: 'Em Maputo, Matola e províncias' },
    { value: '3 ANOS', label: 'Garantia Oficial Dahua', sub: 'Com substituição no showroom' },
    { value: '10 Províncias', label: 'Despacho Rápido Diário', sub: 'Beira, Tete, Nampula, Pemba, etc.' },
    { value: '100% NUIT', label: 'Conformidade Fiscal', sub: 'Faturas formais e cotações proforma' },
  ];

  return (
    <section id="parceiros-depoimentos" className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-radial-[at_bottom_left] from-red-950/20 via-transparent to-slate-950 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-2 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Grandes Clientes & Marcas Oficiais</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            A Escolha de <span className="text-red-500">Líderes de Mercado</span> em Moçambique
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Desde grandes instituições financeiras como o <strong>Moza Banco</strong>, empresas de resposta armada como a <strong>Burglar Alert</strong>, até complexos de prestígio como o <strong>Maputo Padel Club</strong> — a TECHSOL é a referência em tecnologia e equipamentos de segurança.
          </p>
        </div>

        {/* 1. Real Corporate Clients Showcase Strip */}
        <div className="mb-14 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-red-400" />
            <span>Empresas & Instituições que Confiam no Fornecimento da TECHSOL</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {corporateClients.map((client) => {
              const IconComponent = client.icon;

              return (
                <div
                  key={client.name}
                  className={`p-6 rounded-3xl bg-gradient-to-br ${client.color} border backdrop-blur-md transition-all hover:scale-[1.01]`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white">
                      {client.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white">
                    {client.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5 mb-2">
                    {client.category}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {client.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Official Brands & Partner Grid */}
        <div className="mb-14 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Marcas Oficiais com Garantia Direta de Fábrica</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-red-400 truncate">
                    {partner.role}
                  </div>
                  <h4 className="text-sm font-extrabold text-white mt-1 group-hover:text-red-400 transition-colors">
                    {partner.name}
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {partner.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-700/60">
                  <span className="text-[10px] font-semibold text-emerald-400 block truncate">
                    ✓ {partner.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Key Trust Statistics Grid */}
        <div className="mb-14 sm:mb-16 p-6 sm:p-8 rounded-3xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-700/60">
            {stats.map((stat, idx) => (
              <div key={stat.label} className={`${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
                <div className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight text-red-500">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Customer Testimonials Grid */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-red-400">
                Casos Reais & Depoimentos
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                A Experiência de Quem Opera e Instala com a TECHSOL
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Mais de 450 parceiros, instituições bancárias e empresas de segurança confiam no nosso armazém na Av. Josina Machel 923.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="p-6 rounded-3xl bg-slate-800/70 border border-slate-700/90 hover:border-slate-600 transition-all flex flex-col justify-between relative group"
              >
                <div>
                  {/* Top Rating & Highlight */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider font-mono">
                      {item.highlight}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                    "{item.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white font-black text-xs shadow-xs">
                      {item.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-none">
                        {item.name}
                      </h4>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {item.role} · <strong className="text-slate-300">{item.company}</strong>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-red-400" />
                        <span>{item.city}</span>
                      </div>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{item.verified}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Installer & Corporate Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-radial-[at_top_right] from-red-900/40 via-slate-800 to-slate-800/90 border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider">
              Parceria para Empresas & Técnicos em Moçambique
            </div>
            <h4 className="text-lg sm:text-xl font-black text-white">
              Sua Empresa Precisa de Fornecimento Contínuo e Faturação NUIT?
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              Atendemos bancos, condomínios, empresas de segurança e instaladores com condições de pagamento diferenciadas, suporte de engenharia e estoque físico garantido em Maputo.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {onOpenQuoteForm && (
              <button
                type="button"
                onClick={onOpenQuoteForm}
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Solicitar Proforma Corporativa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <a
              href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Olá TECHSOL! Gostaria de consultar cotação para fornecimento corporativo / técnico instalador.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Falar no WhatsApp Comercial</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

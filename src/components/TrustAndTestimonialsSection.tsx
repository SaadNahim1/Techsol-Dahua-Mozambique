import React from 'react';
import { 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  Award,
  ArrowRight,
  Handshake,
  Check
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { 
  MozaBancoLogo, 
  MaputoPadelClubLogo,
  DahuaLogo,
  NemtekLogo,
  CenturionLogo,
  WDPurpleLogo,
  ZKTecoLogo
} from './ClientBrandLogos';

interface TrustAndTestimonialsSectionProps {
  onOpenQuoteForm?: () => void;
}

export const TrustAndTestimonialsSection: React.FC<TrustAndTestimonialsSectionProps> = ({
  onOpenQuoteForm,
}) => {
  // Real Mozambique Corporate Partners & Clients (Moza Banco & Maputo Padel Club)
  const trustedPartners = [
    {
      id: 'moza-banco',
      name: 'Moza Banco',
      segment: 'Setor Bancário & Instituições Financeiras',
      tag: 'Cliente Institucional',
      logo: MozaBancoLogo,
      technology: 'CFTV Dahua Inteligente, NVRs 4K e Acesso Biométrico',
      highlight: 'Homologação bancária rigorosa para rede de agências e caixas automáticos (ATMs) em Moçambique.',
      accent: 'border-amber-500/40 from-amber-950/40 to-slate-900 text-amber-400',
    },
    {
      id: 'maputo-padel-club',
      name: 'Maputo Padel Club',
      segment: 'Complexo Esportivo & Lazer de Alto Nível',
      tag: 'Complexo & Eventos',
      logo: MaputoPadelClubLogo,
      technology: 'Câmeras IP Full-Color 4K 24h e Motores Centurion D5',
      highlight: 'Monitoramento em tempo real com visão noturna colorida e automação ultra-rápida de portões para membros.',
      accent: 'border-emerald-500/40 from-emerald-950/40 to-slate-900 text-emerald-400',
    },
  ];

  // Official Technology Manufacturing Partners
  const technologyPartners = [
    {
      name: 'Dahua Technology',
      role: 'Distribuidor Oficial Moçambique',
      desc: 'CFTV IP, Inteligência Artificial WizSense, Terminais Faciais e Alarmes',
      badge: 'Garantia Oficial 3 Anos',
      logo: DahuaLogo,
    },
    {
      name: 'Nemtek South Africa',
      role: 'Parceiro Perimetral Oficial',
      desc: 'Eletrificadores Wizord e Druid, arames de alta segurança e sirenes 30W',
      badge: 'Qualidade Sul-Africana',
      logo: NemtekLogo,
    },
    {
      name: 'Centurion Systems',
      role: 'Distribuição Autorizada',
      desc: 'Motores deslizantes D5 Smart rápidos, cremalheiras e comandos Nova',
      badge: 'Líder em Automação',
      logo: CenturionLogo,
    },
    {
      name: 'Western Digital Purple',
      role: 'Armazenamento de Vigilância 24/7',
      desc: 'Discos rígidos HDD dedicados para gravação contínua sem perda de frames',
      badge: 'Garantia Direta WD',
      logo: WDPurpleLogo,
    },
    {
      name: 'ZKTeco',
      role: 'Infraestrutura & Bastidores',
      desc: 'Racks 6U e 9U de parede com chave e terminais biométricos',
      badge: 'Padrão 19 Polegadas',
      logo: ZKTecoLogo,
    },
  ];

  // Verified Customer Testimonials
  const testimonials = [
    {
      name: 'Moza Banco S.A.',
      role: 'Departamento de Segurança Patrimonial & Infraestruturas',
      company: 'Moza Banco',
      city: 'Maputo (Rede Nacional de Agências)',
      avatar: 'MB',
      rating: 5,
      text: 'A TECHSOL é fornecedora chave de equipamentos Dahua para os nossos projetos de videovigilância e controle de acessos em Moçambique. Câmeras com inteligência artificial, gravação contínua sem falhas em discos WD Purple e pronta entrega de equipamentos homologados com faturação fiscal e 3 anos de garantia oficial.',
      verified: 'Instituição Bancária Verificada',
      highlight: 'Segurança Bancária de Alta Confiança',
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
      name: 'Eng. Mário Macuácua',
      role: 'Diretor Técnico de Projetos & Obras',
      company: 'Engenharia & Segurança Predial',
      city: 'Maputo · Polana Caniço',
      avatar: 'MM',
      rating: 5,
      text: 'A TECHSOL é o nosso principal distribuidor de câmeras Dahua e eletrificadores Nemtek em Maputo. A pronta entrega de gravadores NVR e bobinas de arame inox permitiu-nos entregar a segurança perimetral com total rigor de prazos. Faturação transparente com NUIT e equipamentos 100% originais.',
      verified: 'Projetos de Engenharia',
      highlight: 'Grandes Obras & Infraestrutura',
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
            <Handshake className="w-3.5 h-3.5" />
            <span>Nossos Parceiros de Confiança · Our Trusted Partners</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Grandes Marcas e Instituições que <span className="text-red-500">Confiam na TECHSOL</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Fornecemos infraestrutura tecnológica e sistemas de segurança eletrônica de alto desempenho para as organizações mais exigentes de Moçambique.
          </p>
        </div>

        {/* 1. VISUAL 'OUR TRUSTED PARTNERS' GRID (Moza Banco & Maputo Padel Club) */}
        <div className="mb-14 sm:mb-16">
          <div className="flex items-center justify-between mb-5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-red-400" />
              <span>Clientes & Parceiros Corporativos em Destaque</span>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-mono text-emerald-400 font-semibold">
              ✓ Fornecimento Ativo Homologado
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trustedPartners.map((partner) => {
              const LogoComp = partner.logo;

              return (
                <div
                  key={partner.id}
                  className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${partner.accent} border backdrop-blur-md shadow-lg transition-all hover:scale-[1.01] hover:border-white/30 flex flex-col justify-between`}
                >
                  <div>
                    {/* Visual Logo Container with Dark Shield */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between gap-3 mb-5 shadow-inner">
                      <div className="flex items-center justify-start flex-1">
                        <LogoComp className="h-9 sm:h-10 w-auto max-w-[200px]" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-white shrink-0">
                        {partner.tag}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {partner.name}
                    </h3>
                    <div className="text-xs font-semibold text-slate-300 mt-0.5 mb-2.5">
                      {partner.segment}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {partner.highlight}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <div className="text-[11px] font-mono text-slate-400">
                      <strong className="text-slate-200">Equipamentos:</strong> {partner.technology}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>Parceria Ativa em Moçambique</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Official Technology Manufacturing Partners Grid */}
        <div className="mb-14 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Fabricantes Oficiais com Distribuição e Garantia de Fábrica</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {technologyPartners.map((item) => {
              const PartnerLogo = item.logo;

              return (
                <div
                  key={item.name}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Partner Logo */}
                    <div className="h-10 flex items-center mb-2">
                      <PartnerLogo className="h-6 w-auto max-w-full" />
                    </div>

                    <div className="text-[11px] font-mono font-bold text-red-400 truncate">
                      {item.role}
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 leading-snug line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-700/60">
                    <span className="text-[10px] font-semibold text-emerald-400 block truncate">
                      ✓ {item.badge}
                    </span>
                  </div>
                </div>
              );
            })}
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
                    <CheckCircle2 className="w-3.5 h-3.5" />
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

import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS, CATEGORIES_META } from '../data/products';
import { COMPANY_CONFIG } from '../config/company';
import { 
  Camera, 
  Zap, 
  Bell, 
  KeyRound, 
  Server, 
  Search, 
  SlidersHorizontal, 
  Check, 
  Plus, 
  MessageCircle, 
  Info, 
  ShieldCheck, 
  Award,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface CatalogSectionProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddToQuote: (product: Product) => void;
  quoteItemIds: Set<string>;
  onOpenProductModal: (product: Product) => void;
  onOpenQuoteForm: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onAddToQuote,
  quoteItemIds,
  onOpenProductModal,
  onOpenQuoteForm,
}) => {
  const [stockOnly, setStockOnly] = useState(false);

  // Category Benefits Map to fulfill explicit user requirement:
  // "Para cada categoria, liste exemplos de produtos específicos com descrições breves e destaque os benefícios de serem distribuidores oficiais da Dahua."
  const categoryBenefits: Record<string, { title: string; points: string[]; note: string }> = {
    cctv: {
      title: 'Benefícios de Adquirir Material de CFTV com Distribuidor Oficial Dahua',
      points: [
        'Acesso a chips originais WizSense e sensores Starlight genuínos com garantia de fábrica de 3 anos.',
        'Firmwares oficiais com homologação de cibersegurança e suporte contínuo contra vulnerabilidades de rede.',
        'Compatibilidade 100% nativa com o ecossistema DMSS, SmartPSS e Smart NVRs sem taxas de licença abusivas.',
        'Apoio de engenharia no dimensionamento de largura de banda, portas PoE e capacidade de armazenamento em disco.',
      ],
      note: 'Equipamentos Dahua de canais não-oficiais (mercado paralelo) perdem a garantia do fabricante e não recebem updates de segurança.',
    },
    cerca_eletrica: {
      title: 'Benefícios de Fornecimento de Cercas Elétricas Profissionais',
      points: [
        'Eletrificadores industriais com supervisão de corte e aterramento homologados conforme normas de segurança IEC.',
        'Integração direta com o ecossistema Dahua: conecte a saída de alarme da cerca aos canais de entrada do seu NVR para gravação imediata.',
        'Acessórios perimetrais de alta durabilidade (hastes de alumínio maciço, fios de aço inox 304 e isoladores UV) dimensionados para longa vida útil.',
        'Suporte técnico no cálculo de perímetro, aterramento ideal e dimensionamento de baterias de backup ininterrupto.',
      ],
      note: 'Proteção perimetral robusta que impede invasões antes que o agressor atinja as edificações principais.',
    },
    alarmes: {
      title: 'Benefícios de Adquirir Alarmes de Intrusão Dahua AirShield',
      points: [
        'Centrais sem fios Dahua AirShield com tecnologia RF bidirecional de alcance de até 2.000 metros.',
        'Comunicação híbrida redundante (Wi-Fi + LAN + 4G LTE) com criptografia militar AES-128 anti-bloqueio (anti-jamming).',
        'Controle centralizado no aplicativo oficial DMSS: arme, desarme e visualize câmeras vinculadas ao disparo no mesmo app.',
        'Sensores PIR com algoritmo patenteado Dahua imunes a falsos disparos causados por animais domésticos até 18kg.',
      ],
      note: 'Instalação rápida e limpa sem quebra-quebra, ideal para residências, escritórios e condomínios.',
    },
    controle_acesso: {
      title: 'Benefícios do Controlo de Acesso e Videoporteiros IP Dahua',
      points: [
        'Terminais de reconhecimento facial com dupla câmera óptica e algoritmo de vivacidade (anti-spoofing) com precisão >99.5%.',
        'Videoporteiros IP Villa antivandálicos em alumínio com chamadas diretas no smartphone via DMSS para abertura de portão remota.',
        'Compatibilidade com cartões Mifare, biometria digital e relatórios integrados para controle de fluxo corporativo.',
        'Garantia oficial e suporte de software para os sistemas Dahua DSS Express e DSS Pro.',
      ],
      note: 'Segurança e conveniência moderna para portarias autônomas, edifícios comerciais e condomínios fechados.',
    },
    redes_acessorios: {
      title: 'Benefícios de Infraestrutura e Redes Homologadas Dahua',
      points: [
        'Switches industriais PoE Dahua com tecnologia Long-Range (transmissão de dados e energia até 250 metros).',
        'Função inteligente PoE Watchdog que reinicia automaticamente câmeras travadas sem necessidade de intervenção técnica.',
        'Cabos de rede Cat6 100% Cobre Puro com certificação em testes de canal Fluke Networks.',
        'Baterias estacionárias seladas de alta confiabilidade para alimentação ininterrupta.',
      ],
      note: '90% dos problemas de CFTV ocorrem por cabos ou switches inadequados. Use infraestrutura certificada.',
    },
  };

  const getCategoryIcon = (catId: ProductCategory) => {
    switch (catId) {
      case 'cctv':
        return <Camera className="w-4 h-4" />;
      case 'cerca_eletrica':
        return <Zap className="w-4 h-4" />;
      case 'alarmes':
        return <Bell className="w-4 h-4" />;
      case 'controle_acesso':
        return <KeyRound className="w-4 h-4" />;
      case 'redes_acessorios':
        return <Server className="w-4 h-4" />;
      default:
        return <SlidersHorizontal className="w-4 h-4" />;
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
        return false;
      }
      // Stock filter
      if (stockOnly && !item.inStock) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesModel = item.model.toLowerCase().includes(query);
        const matchesSubcat = item.subcategory.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesHighlights = item.highlights.some((h) => h.toLowerCase().includes(query));
        return matchesName || matchesModel || matchesSubcat || matchesDesc || matchesHighlights;
      }
      return true;
    });
  }, [selectedCategory, stockOnly, searchQuery]);

  const activeBenefits = selectedCategory !== 'todos' ? categoryBenefits[selectedCategory] : null;

  return (
    <section id="catalogo" className="py-16 lg:py-24 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 tracking-wider uppercase mb-2">
              <span>Catálogo Oficial B2B & B2C</span>
              <span className="text-slate-600">·</span>
              <span>Dahua Technology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Equipamentos de Segurança Profissional
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              Consulte modelos específicos, fichas técnicas e adicione à sua lista para receber orçamento formal com condições de distribuidor.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenQuoteForm}
              className="px-4 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              Pedir Orçamento dos Equipamentos
            </button>
          </div>
        </div>

        {/* Interactive Filter Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES_META.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id as ProductCategory)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-850 border border-slate-800'
                  }`}
                >
                  {getCategoryIcon(cat.id as ProductCategory)}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search and Stock toggle */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filtrar por modelo ou função..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Limpar
                </button>
              )}
            </div>

            <button
              onClick={() => setStockOnly(!stockOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                stockOnly
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${stockOnly ? 'bg-emerald-400' : 'bg-slate-600'}`} />
              <span>Apenas em Stock</span>
            </button>
          </div>
        </div>

        {/* Friendly Banner for Custom Catalog / Specific Models */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Procura um modelo específico ou tem a sua própria lista de materiais (BOM)?
              </div>
              <div className="text-xs text-slate-300">
                Como distribuidores oficiais, fornecemos qualquer modelo do catálogo global Dahua ou montamos a cotação da sua lista.
              </div>
            </div>
          </div>
          <a
            href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Olá TechSol! Tenho uma lista de materiais / modelo específico Dahua e gostaria de consultar preço e prazo de entrega.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 rounded-lg hover:bg-emerald-900 transition-colors whitespace-nowrap flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enviar Minha Lista no WhatsApp</span>
          </a>
        </div>

        {/* Dynamic Category Highlight Banner - Emphasizes Benefits of Official Distributor for the selected family */}
        {activeBenefits && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-900/40 shadow-xl">
            <div className="flex items-center gap-2.5 text-red-400 font-bold text-sm mb-3">
              <Award className="w-5 h-5 text-red-500" />
              <span>{activeBenefits.title}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
              {activeBenefits.points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 italic">
              * {activeBenefits.note}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="mt-10">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
            <span>
              Mostrando <strong className="text-white tabular-nums">{filteredProducts.length}</strong> produtos
              {selectedCategory !== 'todos' && ` na categoria selecionada`}
            </span>
            <span>Preços e tabelas especiais sob consulta para instaladores e integradores</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
              <Info className="mx-auto w-10 h-10 text-slate-500 mb-3" />
              <h3 className="text-base font-semibold text-white">Nenhum equipamento encontrado</h3>
              <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
                Não localizamos produtos com os filtros ou termo de busca fornecido. Tente outra pesquisa ou fale diretamente com nossa equipe.
              </p>
              <button
                onClick={() => {
                  onSelectCategory('todos');
                  onSearchChange('');
                  setStockOnly(false);
                }}
                className="mt-4 px-4 py-2 text-xs font-bold text-white bg-red-600 rounded-md hover:bg-red-500 transition-colors"
              >
                Resetar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isInQuote = quoteItemIds.has(product.id);

                return (
                  <div
                    key={product.id}
                    className="flex flex-col justify-between rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all hover:shadow-xl group"
                  >
                    <div>
                      {/* Product Image Area */}
                      <div className="relative aspect-[4/3] rounded-t-xl overflow-hidden bg-slate-950 p-2 border-b border-slate-800/80">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center rounded-lg transition-transform duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        {/* Monospace Model Badge in Corner */}
                        <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-slate-950/90 border border-slate-700 text-[11px] font-mono font-bold text-red-400 backdrop-blur-sm">
                          {product.model}
                        </div>

                        {/* Stock status indicator */}
                        <div className="absolute bottom-4 right-4 px-2 py-0.5 rounded bg-slate-950/80 border border-emerald-900/60 text-[10px] font-semibold text-emerald-400 flex items-center gap-1 backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{product.stockStatus}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="text-[11px] font-medium text-slate-400">
                          {product.subcategory}
                        </div>
                        <h3 className="mt-1 text-base font-bold text-white leading-snug group-hover:text-red-400 transition-colors">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        {/* Quick Spec Highlights */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {product.highlights.slice(0, 3).map((hl, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-medium text-slate-300 border border-slate-700/60"
                            >
                              {hl}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-5 pt-0">
                      <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                        {/* View Specs */}
                        <button
                          onClick={() => onOpenProductModal(product)}
                          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                          title="Ver Ficha Técnica"
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        {/* Quick WhatsApp Inquiry */}
                        <a
                          href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                            `Olá TechSol! Gostaria de consultar cotação e pronta entrega para o modelo Dahua ${product.model} (${product.name}).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-emerald-400 hover:text-emerald-300 rounded-lg hover:bg-emerald-950/60 transition-colors"
                          title="Consultar pelo WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        {/* Add to Quote Basket */}
                        <button
                          onClick={() => onAddToQuote(product)}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                            isInQuote
                              ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                              : 'bg-red-600 text-white hover:bg-red-500 shadow-sm'
                          }`}
                        >
                          {isInQuote ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>No Orçamento</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Adicionar à Cotação</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

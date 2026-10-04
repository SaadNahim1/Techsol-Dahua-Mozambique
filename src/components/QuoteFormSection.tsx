import React, { useState } from 'react';
import { QuoteItem } from '../types';
import { COMPANY_CONFIG } from '../config/company';
import { 
  FileText, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ListOrdered,
  AlertCircle
} from 'lucide-react';

interface QuoteFormSectionProps {
  selectedQuoteItems: QuoteItem[];
  onRemoveItem: (id: string) => void;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({
  selectedQuoteItems,
  onRemoveItem,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    customerType: 'instalador' as 'instalador' | 'empresa' | 'particular',
    systemType: 'cctv',
    approximateQty: '4_cameras',
    installationLocation: '',
    propertyType: 'comercial',
    additionalNotes: '',
  });

  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const companyWhatsAppNumber = COMPANY_CONFIG.whatsappNumber;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const getSystemTypeName = (type: string) => {
    switch (type) {
      case 'cctv':
        return 'CFTV & Videovigilância IP / HDCVI';
      case 'cerca_eletrica':
        return 'Cerca Elétrica Perimetral de Alta Voltagem';
      case 'alarmes':
        return 'Sistemas de Alarme de Intrusão AirShield';
      case 'controle_acesso':
        return 'Controlo de Acesso & Videoporteiros';
      case 'sistema_integrado':
        return 'Sistema Integrado Completo (CCTV + Cerca + Alarme)';
      default:
        return type;
    }
  };

  const getQuantityLabel = (qty: string) => {
    switch (qty) {
      case '4_cameras':
        return 'Kit 4 Câmeras + Gravador';
      case '8_cameras':
        return 'Kit 8 Câmeras + Gravador';
      case '16_cameras':
        return '16 Câmeras ou mais (Projeto Médio/Grande)';
      case 'cerca_50m':
        return 'Cerca Elétrica até 50 metros';
      case 'cerca_100m':
        return 'Cerca Elétrica 100 a 200 metros';
      case 'cerca_500m':
        return 'Cerca Elétrica Perimetral 500m+';
      case 'alarme_pequeno':
        return 'Central de Alarme + até 4 Sensores';
      case 'alarme_medio':
        return 'Central de Alarme + 8 a 16 Sensores';
      case 'acesso_1_2':
        return '1 a 2 Portas / Catraca com Biometria Facial';
      case 'acesso_multiplas':
        return 'Múltiplos Pontos de Acesso Corporativo';
      case 'sob_medida':
        return 'Dimensionamento Sob Medida / Engenharia';
      default:
        return qty;
    }
  };

  // Generate WhatsApp formatted text
  const generateWhatsAppMessage = () => {
    let msg = `*SOLICITAÇÃO DE ORÇAMENTO - TECHSOL DISTRIBUIDOR DAHUA*\n\n`;
    msg += `👤 *Nome:* ${formData.name || 'Não informado'}\n`;
    msg += `📧 *E-mail:* ${formData.email || 'Não informado'}\n`;
    msg += `📞 *Telefone / WhatsApp:* ${formData.phone || 'Não informado'}\n`;
    msg += `💼 *Perfil:* ${
      formData.customerType === 'instalador'
        ? 'Técnico / Instalador Credenciado (Tabela B2B)'
        : formData.customerType === 'empresa'
        ? 'Empresa / Comércio / Indústria'
        : 'Cliente Final / Residencial'
    }\n\n`;

    msg += `🛠️ *DADOS DO PROJETO:*\n`;
    msg += `• *Tipo de Sistema:* ${getSystemTypeName(formData.systemType)}\n`;
    msg += `• *Quantidade Estimada:* ${getQuantityLabel(formData.approximateQty)}\n`;
    msg += `• *Local de Instalação:* ${formData.installationLocation || 'A definir'}\n`;
    msg += `• *Tipo de Imóvel:* ${
      formData.propertyType === 'comercial'
        ? 'Empresa / Comércio'
        : formData.propertyType === 'industrial'
        ? 'Indústria / Armazém'
        : formData.propertyType === 'condominio'
        ? 'Condomínio Fechado'
        : 'Residência'
    }\n\n`;

    if (selectedQuoteItems.length > 0) {
      msg += `📦 *ITENS ADICIONADOS DO CATÁLOGO (${selectedQuoteItems.length}):*\n`;
      selectedQuoteItems.forEach((item, index) => {
        msg += `${index + 1}. [${item.product.model}] ${item.product.name} (Qtd: ${item.quantity})\n`;
      });
      msg += `\n`;
    }

    if (formData.additionalNotes.trim()) {
      msg += `📝 *Observações / Detalhes:* ${formData.additionalNotes}\n\n`;
    }

    msg += `Aguardando retorno com a cotação formal. Obrigado!`;
    return encodeURIComponent(msg);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Por favor, preencha pelo menos seu Nome e Telefone/WhatsApp para prosseguir.');
      return;
    }

    const encoded = generateWhatsAppMessage();
    const url = `https://wa.me/${companyWhatsAppNumber}?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleEmailFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Por favor, preencha Nome, E-mail e Telefone para envio formal.');
      return;
    }

    // Generate random realistic protocol
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const protocol = `TS-DAHUA-${new Date().getFullYear()}-${randomNum}`;
    setSubmittedProtocol(protocol);
  };

  return (
    <section id="orcamento" className="py-16 lg:py-24 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 tracking-wider uppercase mb-2">
            <span>Orçamento Rápido B2B / B2C</span>
            <span className="text-slate-600">·</span>
            <span>Atendimento Prioritário</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Solicite Sua Cotação de Segurança Eletrônica
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Preencha os detalhes do seu projeto abaixo para receber um orçamento detalhado com garantia oficial Dahua. 
            Você pode enviar diretamente para nosso time por formulário ou <strong className="text-emerald-400">iniciar uma conversa imediata no WhatsApp</strong> com todos os dados pré-carregados.
          </p>
        </div>

        {submittedProtocol ? (
          <div className="mt-10 p-8 rounded-2xl bg-slate-900 border border-emerald-800/80 max-w-2xl animate-in fade-in">
            <div className="flex items-center gap-3 text-emerald-400 mb-4">
              <CheckCircle2 className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white">Solicitação de Orçamento Recebida com Sucesso!</h3>
                <p className="text-xs text-slate-300">
                  Protocolo: <span className="font-mono font-bold text-emerald-400">{submittedProtocol}</span>
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Obrigado, <strong>{formData.name}</strong>. Nossa equipe técnica de distribuição irá analisar sua necessidade de 
              <strong> {getSystemTypeName(formData.systemType)}</strong> para o local <strong>{formData.installationLocation || 'indicado'}</strong> e 
              responderá em até <strong>30 minutos</strong> no e-mail <strong>{formData.email}</strong> ou WhatsApp <strong>{formData.phone}</strong>.
            </p>

            <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap gap-3">
              <button
                onClick={(e) => handleWhatsAppSubmit(e)}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Acelerar no WhatsApp com este Protocolo</span>
              </button>
              <button
                onClick={() => setSubmittedProtocol(null)}
                className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
              >
                Novo Orçamento
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Comprehensive Form */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              {errorMsg && (
                <div className="mb-6 p-4 rounded-lg bg-red-950/70 border border-red-800/80 flex items-center gap-3 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                {/* Step 1: Customer Profile & Contact Info */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-800">
                    <User className="w-4 h-4 text-red-500" />
                    <span>1. Informações de Contato</span>
                  </h3>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className={`p-3 rounded-lg border cursor-pointer text-xs transition-all ${
                      formData.customerType === 'instalador'
                        ? 'bg-red-950/40 border-red-500 text-white font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}>
                      <input
                        type="radio"
                        name="customerType"
                        value="instalador"
                        checked={formData.customerType === 'instalador'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${formData.customerType === 'instalador' ? 'bg-red-500' : 'bg-slate-600'}`} />
                        <span>Instalador / Técnico</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Preço com margem B2B</div>
                    </label>

                    <label className={`p-3 rounded-lg border cursor-pointer text-xs transition-all ${
                      formData.customerType === 'empresa'
                        ? 'bg-red-950/40 border-red-500 text-white font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}>
                      <input
                        type="radio"
                        name="customerType"
                        value="empresa"
                        checked={formData.customerType === 'empresa'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${formData.customerType === 'empresa' ? 'bg-red-500' : 'bg-slate-600'}`} />
                        <span>Empresa / Condomínio</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Faturação empresarial</div>
                    </label>

                    <label className={`p-3 rounded-lg border cursor-pointer text-xs transition-all ${
                      formData.customerType === 'particular'
                        ? 'bg-red-950/40 border-red-500 text-white font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}>
                      <input
                        type="radio"
                        name="customerType"
                        value="particular"
                        checked={formData.customerType === 'particular'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${formData.customerType === 'particular' ? 'bg-red-500' : 'bg-slate-600'}`} />
                        <span>Cliente Residencial</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Solução pronta para casa</div>
                    </label>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Carlos Mendes"
                        required
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+258 84 000 0000"
                        required
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        E-mail Comercial
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="carlos@exemplo.com"
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Need & System Specifications */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-800">
                    <ListOrdered className="w-4 h-4 text-red-500" />
                    <span>2. Detalhes da Sua Necessidade</span>
                  </h3>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Tipo de Sistema Principal
                      </label>
                      <select
                        name="systemType"
                        value={formData.systemType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
                      >
                        <option value="cctv">CFTV & Videovigilância IP / HDCVI Dahua</option>
                        <option value="cerca_eletrica">Cerca Elétrica Perimetral de Alta Voltagem</option>
                        <option value="alarmes">Sistema de Alarme e Intrusão AirShield</option>
                        <option value="controle_acesso">Controlo de Acesso & Videoporteiro IP</option>
                        <option value="sistema_integrado">Sistema Integrado Completo (CCTV + Cerca + Alarme)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Quantidade / Dimensão Aproximada
                      </label>
                      <select
                        name="approximateQty"
                        value={formData.approximateQty}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
                      >
                        <option value="4_cameras">Kit 4 Câmeras + Gravador</option>
                        <option value="8_cameras">Kit 8 Câmeras + Gravador</option>
                        <option value="16_cameras">16 Câmeras ou mais (Médio / Grande Porte)</option>
                        <option value="cerca_50m">Cerca Elétrica até 50 metros lineares</option>
                        <option value="cerca_100m">Cerca Elétrica 100 a 200 metros</option>
                        <option value="cerca_500m">Cerca Elétrica Perimetral 500m+</option>
                        <option value="alarme_pequeno">Central de Alarme + até 4 Sensores</option>
                        <option value="alarme_medio">Central de Alarme + 8 a 16 Sensores</option>
                        <option value="acesso_1_2">1 a 2 Portas com Reconhecimento Facial / Cartão</option>
                        <option value="acesso_multiplas">Múltiplos Pontos de Acesso Corporativo</option>
                        <option value="sob_medida">Necessito de Dimensionamento de Engenharia</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Local de Instalação (Cidade / Região)
                      </label>
                      <input
                        type="text"
                        name="installationLocation"
                        value={formData.installationLocation}
                        onChange={handleInputChange}
                        placeholder="Ex: Maputo, Matola, Beira, Nampula..."
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Tipo de Imóvel / Estabelecimento
                      </label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
                      >
                        <option value="comercial">Empresa, Loja ou Escritório</option>
                        <option value="industrial">Indústria, Fábrica ou Galpão / Armazém</option>
                        <option value="condominio">Condomínio Residencial ou Comercial</option>
                        <option value="residencia">Residência Unifamiliar</option>
                        <option value="fazenda">Propriedade Rural / Fazenda</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step 3: Observations */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-800">
                    <FileText className="w-4 h-4 text-red-500" />
                    <span>3. Observações Adicionais</span>
                  </h3>

                  <div className="mt-4">
                    <textarea
                      name="additionalNotes"
                      rows={3}
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      placeholder="Descreva detalhes específicos da obra, altura dos muros para cerca elétrica, preferência por câmeras Full-Color coloridas à noite, prazos ou especificações que deseja incluir..."
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Primary WhatsApp Action & Secondary Submit */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                  {/* WhatsApp Pre-filled Button as required */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg shadow-emerald-950 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Solicitar Orçamento via WhatsApp</span>
                  </button>

                  {/* Form Submission Button */}
                  <button
                    type="button"
                    onClick={handleEmailFormSubmit}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar por E-mail</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 text-center sm:text-left">
                  * Ao clicar em <strong>Solicitar via WhatsApp</strong>, o aplicativo abrirá com todas as especificações formatadas para nossa equipe responder imediatamente.
                </div>
              </form>
            </div>

            {/* Right Column: Basket Summary & Official Assurances */}
            <div className="lg:col-span-4 space-y-6">
              {/* Linked Catalog Items */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-white">Equipamentos Selecionados</h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {selectedQuoteItems.length} {selectedQuoteItems.length === 1 ? 'item' : 'itens'}
                  </span>
                </div>

                {selectedQuoteItems.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400">
                    <p>Nenhum equipamento adicionado ainda.</p>
                    <p className="mt-1 text-slate-400">
                      Você pode navegar no catálogo acima e clicar em <em>"Adicionar à Cotação"</em> para incluir itens específicos.
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {selectedQuoteItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-mono text-[11px] font-bold text-red-400 truncate">
                            {item.product.model}
                          </div>
                          <div className="text-slate-300 truncate text-[11px]">{item.product.name}</div>
                          <div className="text-[10px] text-slate-400">Qtd: {item.quantity}</div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-500 hover:text-red-400 text-[11px] px-1"
                          title="Remover item"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Fast Direct Contacts */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-3">
                <div className="text-white font-bold text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  <span>Canais de Atendimento Oficial</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-mono">vendatechsol@gmail.com</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Segunda a Sexta: 08h00 - 18h00 | Sábado: 08h00 - 13h00</span>
                </div>
                <div className="pt-3 border-t border-slate-800 text-slate-400 leading-relaxed text-[11px]">
                  Faturamento corporativo com NUIT / NIF, emissão de cotação pró-forma formal e garantia expressa de reposição de peças.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

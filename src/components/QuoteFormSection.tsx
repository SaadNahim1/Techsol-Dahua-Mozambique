import React, { useState } from 'react';
import { QuoteItem } from '../types';
import { COMPANY_CONFIG } from '../config/company';
import { 
  FileText, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
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
    installationLocation: '',
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

  const generateWhatsAppMessage = () => {
    let msg = `*SOLICITAÇÃO DE ORÇAMENTO - TECHSOL SU LDA*\n\n`;
    msg += `👤 *Nome:* ${formData.name || 'Cliente'}\n`;
    msg += `📱 *Telefone:* ${formData.phone || 'Não informado'}\n`;
    msg += `📧 *E-mail:* ${formData.email || 'Não informado'}\n`;
    msg += `🏢 *Perfil:* ${
      formData.customerType === 'instalador'
        ? 'Técnico / Instalador Credenciado'
        : formData.customerType === 'empresa'
        ? 'Empresa / Comércio'
        : 'Cliente Particular / Residência'
    }\n`;
    msg += `📍 *Localização / Cidade:* ${formData.installationLocation || 'Maputo'}\n\n`;

    if (selectedQuoteItems.length > 0) {
      msg += `📦 *Equipamentos Selecionados do Catálogo:*\n`;
      let total = 0;
      selectedQuoteItems.forEach((item, idx) => {
        const lineTotal = (item.product.priceMZN || 0) * item.quantity;
        total += lineTotal;
        msg += `${idx + 1}. [${item.product.model}] ${item.product.name} (Qtd: ${item.quantity}) - ${lineTotal.toLocaleString('pt-MZ')} MT\n`;
      });
      msg += `\n💰 *Total Estimado:* ${total.toLocaleString('pt-MZ')} MT\n\n`;
    }

    if (formData.additionalNotes.trim()) {
      msg += `📝 *Observações do Projeto:*\n${formData.additionalNotes}\n\n`;
    }

    msg += `Por favor, confirmem disponibilidade para retirada no showroom da Av. Josina Machel ou prazo de entrega.`;

    return encodeURIComponent(msg);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Por favor, informe seu nome para prosseguir.');
      return;
    }

    const encoded = generateWhatsAppMessage();
    const url = `https://wa.me/${companyWhatsAppNumber}?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleEmailFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Por favor, preencha Nome, E-mail e Telefone.');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const protocol = `TS-${new Date().getFullYear()}-${randomNum}`;
    setSubmittedProtocol(protocol);
  };

  return (
    <section id="orcamento" className="py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Cotação Rápida
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Solicite um Orçamento Formal
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Envie sua lista de equipamentos diretamente para o nosso WhatsApp ou receba a proposta por e-mail com fatura proforma.
          </p>
        </div>

        {submittedProtocol ? (
          <div className="mt-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 max-w-xl">
            <div className="flex items-center gap-3 text-emerald-800 mb-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Solicitação Enviada!</h3>
                <p className="text-xs text-slate-600">
                  Protocolo: <span className="font-mono font-bold text-emerald-700">{submittedProtocol}</span>
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              Obrigado, <strong>{formData.name}</strong>. A nossa equipa técnica da TECHSOL SU LDA responderá em breve pelo WhatsApp <strong>{formData.phone}</strong> ou e-mail.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={(e) => handleWhatsAppSubmit(e)}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Acelerar no WhatsApp</span>
              </button>
              <button
                onClick={() => setSubmittedProtocol(null)}
                className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Novo Orçamento
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
              {errorMsg && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                {/* Customer Profile */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Tipo de Cliente
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'instalador', label: 'Técnico / Instalador' },
                      { id: 'empresa', label: 'Empresa / Comércio' },
                      { id: 'particular', label: 'Cliente Particular' },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setFormData((prev) => ({ ...prev, customerType: item.id as any }))}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                          formData.customerType === item.id
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name, Phone, Email */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Seu Nome *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: Carlos Manjate"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Telefone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ex: +258 84 000 0000"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seuemail@exemplo.com"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                {/* City / Province */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Cidade / Província</label>
                  <input
                    type="text"
                    name="installationLocation"
                    value={formData.installationLocation}
                    onChange={handleInputChange}
                    placeholder="Ex: Maputo, Matola, Beira, Nampula..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Observações ou Modelos Específicos</label>
                  <textarea
                    name="additionalNotes"
                    rows={2}
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    placeholder="Descreva detalhes do projeto, metragem ou tire dúvidas..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  />
                </div>

                {/* Submit Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar Orçamento pelo WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailFormSubmit}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-300 transition-colors"
                  >
                    <Send className="w-4 h-4 text-slate-600" />
                    <span>Gerar Protocolo / E-mail</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Selected items aside */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Itens na Cotação ({selectedQuoteItems.length})
              </h3>
              {selectedQuoteItems.length === 0 ? (
                <p className="text-xs text-slate-500">
                  Nenhum item adicionado ainda. Navegue no catálogo acima para adicionar produtos ao carrinho.
                </p>
              ) : (
                <div className="space-y-2 text-xs">
                  {selectedQuoteItems.map((item) => (
                    <div key={item.product.id} className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                      <div className="truncate pr-2">
                        <div className="font-bold text-slate-900 truncate">{item.product.name}</div>
                        <div className="text-[11px] text-red-600 font-mono">
                          {item.quantity} un. x {item.product.priceMZN.toLocaleString('pt-MZ')} MT
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-red-600 text-xs px-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, ShieldCheck, Check, MessageCircle, Plus, Bell, BellRing, Mail } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { getCustomProductImages } from '../utils/customImages';
import {
  getProductPriceAlert,
  subscribeToPriceAlert,
  unsubscribeFromPriceAlert,
  PriceAlertSubscription,
} from '../utils/priceAlerts';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product) => void;
  isInQuote: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  isInQuote,
}) => {
  // Price Alert state
  const [alertEmail, setAlertEmail] = useState('');
  const [existingAlert, setExistingAlert] = useState<PriceAlertSubscription | undefined>(undefined);
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [alertSuccessMessage, setAlertSuccessMessage] = useState(false);
  const [alertError, setAlertError] = useState('');

  useEffect(() => {
    if (product) {
      const saved = getProductPriceAlert(product.id);
      setExistingAlert(saved);
      setAlertEmail(saved?.email || '');
      setShowAlertForm(false);
      setAlertSuccessMessage(false);
      setAlertError('');
    }
  }, [product]);

  if (!product) return null;

  const customImages = getCustomProductImages();
  const displayImage = customImages[product.id] || product.image;

  const handlePriceAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = alertEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setAlertError('Por favor, insira um endereço de e-mail válido.');
      return;
    }

    setAlertError('');
    const sub = subscribeToPriceAlert({
      productId: product.id,
      productModel: product.model,
      productName: product.name,
      email: trimmed,
      subscribedPriceMZN: product.priceMZN,
    });
    setExistingAlert(sub);
    setShowAlertForm(false);
    setAlertSuccessMessage(true);
    setTimeout(() => setAlertSuccessMessage(false), 4000);
  };

  const handleRemovePriceAlert = () => {
    unsubscribeFromPriceAlert(product.id);
    setExistingAlert(undefined);
    setAlertEmail('');
    setAlertSuccessMessage(false);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Olá TECHSOL! Gostaria de consultar o preço e disponibilidade:\n` +
      `📌 *Produto:* ${product.name}\n` +
      `🏷️ *Modelo:* ${product.model}\n` +
      `💰 *Preço:* ${product.priceMZN} MT\n` +
      `Por favor, informem-me se têm em estoque na Av. Josina Machel 923.`
    );
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Product Image */}
          <div className="md:col-span-5">
            <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square flex items-center justify-center">
              <img
                src={displayImage}
                alt={`${product.name} - ${product.brand} (${product.model})`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/images/cam_hfw1439.jpg') {
                    target.src = '/images/cam_hfw1439.jpg';
                  }
                }}
                className="w-full h-full object-cover object-center"
              />
              {product.isPromo && (
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                  {product.promoLabel || 'PROMOÇÃO'}
                </div>
              )}
            </div>

            <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>{product.warranty}</span>
              </div>
              <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Disponível para Levantamento & Despacho</span>
              </div>
            </div>
          </div>

          {/* Right Column: Info & Action */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase font-mono text-red-600 font-bold tracking-wider">
                {product.model}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {product.brand}
              </span>
              {product.isPromo && (
                <span className="text-[10px] uppercase font-extrabold text-white bg-red-600 px-2 py-0.5 rounded">
                  {product.promoLabel || 'PROMOÇÃO'}
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {product.name}
            </h3>

            {/* Price Box */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">
                  {product.isPromo ? 'Preço Promocional B2B' : 'Preço de Tabela B2B'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-red-600 font-mono">
                    {new Intl.NumberFormat('pt-MZ').format(product.priceMZN)} <span className="text-xs">MT</span>
                  </span>
                  {product.isPromo && product.originalPriceMZN && (
                    <span className="text-xs font-mono text-slate-400 line-through">
                      {new Intl.NumberFormat('pt-MZ').format(product.originalPriceMZN)} MT
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] text-slate-500">Impostos inclusos</span>
                {!existingAlert && !showAlertForm && (
                  <button
                    type="button"
                    onClick={() => setShowAlertForm(true)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Avise-me se o preço mudar</span>
                  </button>
                )}
              </div>
            </div>

            {/* Price Notification Widget */}
            {(showAlertForm || existingAlert) && (
              <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200 space-y-2 animate-in fade-in duration-150">
                {existingAlert && !showAlertForm ? (
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                        <BellRing className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>Alerta de Preço Ativo</span>
                          {alertSuccessMessage && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                              Registado!
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          Enviaremos notificações de baixa de preço ou promoção para{' '}
                          <span className="font-semibold text-slate-800">{existingAlert.email}</span>.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setShowAlertForm(true)}
                        className="text-slate-600 hover:text-slate-900 font-semibold underline cursor-pointer"
                      >
                        Alterar
                      </button>
                      <button
                        type="button"
                        onClick={handleRemovePriceAlert}
                        className="text-slate-400 hover:text-red-600 underline cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handlePriceAlertSubmit} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5 text-red-600" />
                        <span>Receber Alerta de Alteração de Preço</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAlertForm(false);
                          setAlertError('');
                        }}
                        className="text-[11px] text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        Fechar
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Insira o seu e-mail para ser avisado sempre que o modelo{' '}
                      <strong className="text-slate-700">{product.model}</strong> tiver redução de preço ou campanha especial.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="seu.email@empresa.co.mz"
                          value={alertEmail}
                          onChange={(e) => {
                            setAlertEmail(e.target.value);
                            if (alertError) setAlertError('');
                          }}
                          className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                        />
                      </div>
                      <button
                        type="submit"
                        className="py-1.5 px-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors cursor-pointer shrink-0"
                      >
                        Ativar Alerta
                      </button>
                    </div>
                    {alertError && <p className="text-[11px] text-red-600 font-medium">{alertError}</p>}
                  </form>
                )}
              </div>
            )}

            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Specs Table */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Especificações Técnicas
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-500 text-[10px] block font-medium">{key}</span>
                      <span className="text-slate-900 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-3 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => onAddToQuote(product)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isInQuote
                    ? 'bg-emerald-600 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isInQuote ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Adicionar Mais uma Unidade</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Adicionar à Sacola</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Pedir no WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

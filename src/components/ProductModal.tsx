import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShieldCheck, Check, MessageCircle, Plus, Camera, Upload, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { saveCustomProductImage, removeCustomProductImage } from '../utils/customImages';

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
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [currentDisplayImage, setCurrentDisplayImage] = useState<string | null>(null);

  if (!product) return null;

  const displayImage = currentDisplayImage || product.image;

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

  const handleSavePhotoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrlInput.trim()) return;
    saveCustomProductImage(product.id, photoUrlInput.trim());
    setCurrentDisplayImage(photoUrlInput.trim());
    setIsEditingPhoto(false);
    setPhotoUrlInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        saveCustomProductImage(product.id, reader.result);
        setCurrentDisplayImage(reader.result);
        setIsEditingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = () => {
    removeCustomProductImage(product.id);
    setCurrentDisplayImage(null);
    setIsEditingPhoto(false);
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
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.classList.add('bg-slate-200');
                  }
                }}
                className="w-full h-full object-cover object-center"
              />

              {/* Photo Edit Trigger Button */}
              <button
                type="button"
                onClick={() => setIsEditingPhoto(!isEditingPhoto)}
                className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white text-[11px] font-medium flex items-center gap-1 shadow-md transition-all cursor-pointer"
                title="Trocar ou enviar foto real deste produto"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Foto Real</span>
              </button>
            </div>

            {/* Photo Editor Inline Panel */}
            {isEditingPhoto && (
              <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 animate-in fade-in">
                <div className="font-bold text-slate-800 flex items-center justify-between">
                  <span>Atualizar Foto do Produto</span>
                  <button
                    type="button"
                    onClick={() => setIsEditingPhoto(false)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSavePhotoUrl} className="space-y-2">
                  <input
                    type="url"
                    placeholder="Cole o link da foto (URL)..."
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-600"
                  />
                  <div className="flex gap-1.5">
                    <button
                      type="submit"
                      className="flex-1 py-1 px-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs"
                    >
                      Salvar Link
                    </button>
                    <label className="py-1 px-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg text-xs flex items-center gap-1 cursor-pointer">
                      <Upload className="w-3 h-3" />
                      <span>Ficheiro</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </form>

                {currentDisplayImage && (
                  <button
                    type="button"
                    onClick={handleResetPhoto}
                    className="w-full text-center text-[10px] text-slate-500 hover:text-red-600 underline pt-1 block"
                  >
                    Restaurar foto padrão de fábrica
                  </button>
                )}
              </div>
            )}

            <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>{product.warranty}</span>
              </div>
              <div className="font-mono text-emerald-700 font-bold">
                {product.stockQty > 0 ? `${product.stockQty} un. em armazém` : 'Disponível sob encomenda'}
              </div>
            </div>
          </div>

          {/* Right Column: Info & Action */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono text-red-600 font-bold tracking-wider">
                {product.model}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {product.brand}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {product.name}
            </h3>

            {/* Price Box */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">Preço de Tabela B2B</span>
                <span className="text-xl font-extrabold text-red-600 font-mono">
                  {new Intl.NumberFormat('pt-MZ').format(product.priceMZN)} <span className="text-xs">MT</span>
                </span>
              </div>
              <span className="text-xs text-slate-500">Impostos inclusos</span>
            </div>

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

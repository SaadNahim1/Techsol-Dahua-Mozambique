import React, { useState } from 'react';
import { 
  Zap, 
  Camera, 
  MessageCircle, 
  PlusCircle, 
  Check, 
  Wifi,
  Tv
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { COMPANY_CONFIG } from '../config/company';

interface SecurityKitBuilderProps {
  onAddProductsToQuote: (products: Product[]) => void;
  onOpenQuoteForm: () => void;
}

export const SecurityKitBuilder: React.FC<SecurityKitBuilderProps> = ({
  onAddProductsToQuote,
}) => {
  const [cctvTech, setCctvTech] = useState<'ip_poe' | 'analog_hdcvi'>('ip_poe');
  const [cctvCameras, setCctvCameras] = useState<number>(4);
  const [hasElectricFence, setHasElectricFence] = useState<boolean>(true);
  const [hasAlarm, setHasAlarm] = useState<boolean>(false);
  const [kitAddedFeedback, setKitAddedFeedback] = useState(false);

  // Selected products based on current choice
  const getSelectedKitProducts = (): Product[] => {
    const list: Product[] = [];

    if (cctvTech === 'ip_poe') {
      const cam = PRODUCTS.find((p) => p.id === 'dh-ipc-hfw1439tl1-a-il');
      const nvr = PRODUCTS.find((p) => cctvCameras > 8 ? p.id === 'dhi-nvr2216-16p-4ks3' : p.id === 'dhi-nvr2108hs-8p-4ks3');
      const hdd = PRODUCTS.find((p) => p.id === 'wd-purple-2tb');
      const cabo = PRODUCTS.find((p) => p.id === 'dh-pfm922i-6un-c');
      if (cam) list.push(cam);
      if (nvr) list.push(nvr);
      if (hdd) list.push(hdd);
      if (cabo) list.push(cabo);
    } else {
      const cam = PRODUCTS.find((p) => p.id === 'dh-hac-hfw1209cp-a-led');
      const xvr = PRODUCTS.find((p) => cctvCameras > 8 ? p.id === 'dh-xvr1b16-i-t' : p.id === 'dh-xvr5108hs-4kl-i3-t');
      const hdd = PRODUCTS.find((p) => p.id === 'wd-purple-1tb');
      const fonte = PRODUCTS.find((p) => p.id === 'dh-pfm344d-8ch-en');
      const cabo = PRODUCTS.find((p) => p.id === 'dh-pfm941i-rg59n-100');
      if (cam) list.push(cam);
      if (xvr) list.push(xvr);
      if (hdd) list.push(hdd);
      if (fonte) list.push(fonte);
      if (cabo) list.push(cabo);
    }

    if (hasElectricFence) {
      const energizer = PRODUCTS.find((p) => p.id === 'nemtek-e-wiz4i');
      const arame = PRODUCTS.find((p) => p.id === 'nemtek-ew-al16');
      const sirene = PRODUCTS.find((p) => p.id === 'nemtek-sr-30');
      if (energizer) list.push(energizer);
      if (arame) list.push(arame);
      if (sirene) list.push(sirene);
    }

    if (hasAlarm) {
      const alarmKit = PRODUCTS.find((p) => p.id === 'dhi-art-arc3800h-03-fw2');
      if (alarmKit) list.push(alarmKit);
    }

    return list;
  };

  const handleAddAllToQuote = () => {
    const prods = getSelectedKitProducts();
    onAddProductsToQuote(prods);
    setKitAddedFeedback(true);
    setTimeout(() => setKitAddedFeedback(false), 2500);
  };

  const handleWhatsAppKit = () => {
    const techName = cctvTech === 'ip_poe' ? 'Kit IP PoE Digital Dahua' : 'Kit Analógico HDCVI Dahua';
    let msg = `*COTAÇÃO DE KIT DE SEGURANÇA - TECHSOL SU LDA*\n\n`;
    msg += `📹 *Sistema:* ${techName}\n`;
    msg += `• Quantidade de Câmeras: ${cctvCameras} Câmeras\n`;
    msg += `• Tecnologia: ${cctvTech === 'ip_poe' ? 'Câmeras IP 4MP Full-Color PoE + NVR 4K' : 'Câmeras HDCVI 2MP Full-Color (1.700 MT) + XVR WizSense'}\n`;
    msg += `• Armazenamento: Disco WD Purple Surveillance Inclusivo\n`;

    if (hasElectricFence) {
      msg += `⚡ *Cerca Elétrica:* Eletrificador Nemtek Wizord 4i (4 Joules) + Arame Alumínio + Sirene 30W\n`;
    }
    if (hasAlarm) {
      msg += `🚨 *Alarme Sem Fio:* Central Dahua AirShield 4G + Sensores PIR\n`;
    }

    msg += `\nPor favor, enviem o orçamento final deste kit com entrega/levantamento no showroom da Av. Josina Machel 923, Maputo.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section id="kit-builder" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Simulador Rápido</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Monte Seu Kit de Segurança
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Escolha entre tecnologia <strong>IP PoE de alta resolução</strong> ou <strong>Analógica HDCVI econômica</strong> e solicite orçamento consolidado no WhatsApp.
          </p>
        </div>

        {/* Simple Light Tech Selector */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setCctvTech('ip_poe')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              cctvTech === 'ip_poe'
                ? 'bg-red-600 text-white border-red-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Wifi className="w-4 h-4" />
            <span>Kits IP PoE Digital (4MP Full-Color + NVR)</span>
          </button>

          <button
            onClick={() => setCctvTech('analog_hdcvi')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              cctvTech === 'analog_hdcvi'
                ? 'bg-red-600 text-white border-red-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>Kits Analógicos HDCVI (Econômico 1.700 MT/câm + XVR)</span>
          </button>
        </div>

        {/* Simple 2-column layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Options */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            {/* Number of cameras */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-red-600" />
                <span>Quantidade de Câmeras</span>
              </label>
              <div className="flex gap-2">
                {[2, 4, 8, 16].map((num) => (
                  <button
                    key={num}
                    onClick={() => setCctvCameras(num)}
                    className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold border transition-colors ${
                      cctvCameras === num
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num} Câmeras
                  </button>
                ))}
              </div>
            </div>

            {/* Electric fence checkbox */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Adicionar Cerca Elétrica Nemtek
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Eletrificador Nemtek Wizord 4i + Bobina Arame 1.000m + Sirene 30W
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={hasElectricFence}
                  onChange={(e) => setHasElectricFence(e.target.checked)}
                  className="h-4 w-4 accent-red-600 rounded"
                />
              </label>
            </div>

            {/* Wireless alarm checkbox */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Adicionar Alarme Sem Fio Dahua AirShield 4G
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Central Hub 4G + Sensores PIR + Alerta no Telemóvel
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={hasAlarm}
                  onChange={(e) => setHasAlarm(e.target.checked)}
                  className="h-4 w-4 accent-red-600 rounded"
                />
              </label>
            </div>
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Resumo da Configuração</span>
              <h3 className="text-lg font-bold text-slate-900">
                {cctvTech === 'ip_poe' ? 'Kit IP PoE Dahua' : 'Kit Analógico HDCVI Dahua'}
              </h3>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span>Câmeras {cctvTech === 'ip_poe' ? 'IP 4MP PoE' : 'HDCVI 2MP Full-Color'}:</span>
                <span className="font-bold text-slate-900">{cctvCameras} un.</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span>Gravador:</span>
                <span className="font-bold text-slate-900">{cctvTech === 'ip_poe' ? 'NVR 4K PoE' : 'XVR WizSense'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span>Armazenamento:</span>
                <span className="font-bold text-slate-900">Disco WD Purple Surveillance</span>
              </div>
              {hasElectricFence && (
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span>Cerca Elétrica:</span>
                  <span className="font-bold text-amber-700">Nemtek Wizord 4i Inclusa</span>
                </div>
              )}
              {hasAlarm && (
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span>Alarme AirShield:</span>
                  <span className="font-bold text-red-700">Kit 4G Incluso</span>
                </div>
              )}
            </div>

            <div className="pt-3 space-y-2">
              <button
                type="button"
                onClick={handleWhatsAppKit}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir Cotação deste Kit no WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleAddAllToQuote}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                {kitAddedFeedback ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Adicionado à Lista de Cotação!</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-3.5 h-3.5 text-red-600" />
                    <span>Adicionar Peças ao Carrinho</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

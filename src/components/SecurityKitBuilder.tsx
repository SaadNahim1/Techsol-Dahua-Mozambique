import React, { useState } from 'react';
import { 
  Zap, 
  Camera, 
  ShieldAlert, 
  KeyRound, 
  HardDrive, 
  Layers, 
  MessageCircle, 
  PlusCircle, 
  Check, 
  Sparkles,
  ArrowRight,
  Tv,
  Wifi,
  Radio
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
  onOpenQuoteForm,
}) => {
  // CCTV Architecture: 'ip_poe' or 'analog_hdcvi'
  const [cctvTech, setCctvTech] = useState<'ip_poe' | 'analog_hdcvi'>('ip_poe');
  const [propertyType, setPropertyType] = useState<'residencia' | 'comercio' | 'industria' | 'condominio'>('residencia');
  const [cctvCameras, setCctvCameras] = useState<number>(4);
  const [analogResolution, setAnalogResolution] = useState<'2mp_1080p' | '5mp_audio'>('5mp_audio');
  const [ipResolution, setIpResolution] = useState<'4mp_wizsense' | '8mp_4k'>('4mp_wizsense');
  const [storageDays, setStorageDays] = useState<'1tb' | '2tb' | '4tb'>('2tb');
  const [hasElectricFence, setHasElectricFence] = useState<boolean>(true);
  const [fenceMeters, setFenceMeters] = useState<number>(100);
  const [hasAlarm, setHasAlarm] = useState<boolean>(true);
  const [alarmSensors, setAlarmSensors] = useState<number>(4);
  const [hasAccessControl, setHasAccessControl] = useState<boolean>(false);
  const [kitAddedFeedback, setKitAddedFeedback] = useState(false);

  // Generate recommendation list
  const getSelectedKitProducts = (): Product[] => {
    const list: Product[] = [];

    if (cctvTech === 'ip_poe') {
      // IP Camera
      const cam = PRODUCTS.find((p) => 
        ipResolution === '8mp_4k' ? p.id === 'dh-ipc-hdw2849t-s-il' : p.id === 'dh-ipc-hfw2431s-s-s2'
      );
      if (cam) list.push(cam);

      // NVR PoE
      const nvr = PRODUCTS.find((p) => p.id === 'dhi-nvr4216-16p-4ks2l');
      if (nvr) list.push(nvr);

      // Cat6 pure copper cable
      const cabo = PRODUCTS.find((p) => p.id === 'dh-pfm920i-6un-c');
      if (cabo) list.push(cabo);
    } else {
      // Analog HDCVI Camera
      const cam = PRODUCTS.find((p) => 
        analogResolution === '5mp_audio' ? p.id === 'dh-hac-hfw1500tl-a' : p.id === 'dh-hac-hdw1200t'
      );
      if (cam) list.push(cam);

      // XVR DVR Pentabrid
      const xvr = PRODUCTS.find((p) => p.id === 'dhi-xvr5108hs-4kl-i3');
      if (xvr) list.push(xvr);
    }

    // Electric fence
    if (hasElectricFence) {
      const energizer = PRODUCTS.find((p) => p.id === 'fence-dpower-18k-pro');
      const hastes = PRODUCTS.find((p) => p.id === 'fence-haste-estrela-6iso');
      const fio = PRODUCTS.find((p) => p.id === 'fence-fio-inox-1000m');
      if (energizer) list.push(energizer);
      if (hastes) list.push(hastes);
      if (fio) list.push(fio);
    }

    // Alarm
    if (hasAlarm) {
      const alarmHub = PRODUCTS.find((p) => p.id === 'dh-arc3000h-fw2');
      const pir = PRODUCTS.find((p) => p.id === 'dh-ard1233-w2');
      if (alarmHub) list.push(alarmHub);
      if (pir) list.push(pir);
    }

    // Access control
    if (hasAccessControl) {
      const facial = PRODUCTS.find((p) => p.id === 'dh-asi7213x-t1');
      if (facial) list.push(facial);
    }

    return list;
  };

  const handleAddAllToQuote = () => {
    const prods = getSelectedKitProducts();
    onAddProductsToQuote(prods);
    setKitAddedFeedback(true);
    setTimeout(() => setKitAddedFeedback(false), 3000);
  };

  const handleWhatsAppKit = () => {
    const techLabel = cctvTech === 'ip_poe' 
      ? 'SISTEMA IP POE DE ALTA DEFINIÇÃO' 
      : 'SISTEMA ANALÓGICO HDCVI ECONÔMICO';

    let msg = `*SIMULAÇÃO DE KIT DAHUA - ${techLabel}*\n\n`;
    msg += `🏢 *Aplicação:* ${
      propertyType === 'residencia'
        ? 'Residência'
        : propertyType === 'comercio'
        ? 'Empresa / Comércio'
        : propertyType === 'industria'
        ? 'Indústria / Armazém'
        : 'Condomínio Fechado'
    }\n\n`;

    msg += `📹 *CFTV ${cctvTech === 'ip_poe' ? 'IP PoE Dahua' : 'Analógico HDCVI Dahua'}:*\n`;
    msg += `• Quantidade: ${cctvCameras} Câmeras\n`;
    
    if (cctvTech === 'ip_poe') {
      msg += `• Modelo: ${ipResolution === '8mp_4k' ? 'IP 8MP 4K Full-Color com Áudio' : 'IP 4MP WizSense Starlight com IA'}\n`;
      msg += `• Gravador: NVR 4K com Portas PoE Integradas (Plug & Play direto)\n`;
      msg += `• Cabeamento: Cabo de Rede UTP Cat6 100% Cobre Puro Dahua\n`;
    } else {
      msg += `• Modelo: ${analogResolution === '5mp_audio' ? 'HDCVI 5MP com Microfone Embutido (HFW1500TL-A)' : 'HDCVI 1080p Full HD (HDW1200T)'}\n`;
      msg += `• Gravador: XVR Dahua 4K Pentabrídeo com Inteligência Artificial WizSense\n`;
      msg += `• Acessórios: Fonte Chaveada Colmeia + Conectores BNC + Cabo Coaxial\n`;
    }
    
    msg += `• Armazenamento: Disco Rígido ${storageDays.toUpperCase()} Surveillance (15 a 30 dias de gravação contínua)\n\n`;

    if (hasElectricFence) {
      msg += `⚡ *Cerca Elétrica Perimetral:*\n`;
      msg += `• Extensão: ~${fenceMeters} metros lineares\n`;
      msg += `• Eletrificador D-Power 18.000V com supervisão de retorno e disparo de sirene\n`;
      msg += `• Hastes de Alumínio Estrela 6 Isoladores + Arame Inox 304\n\n`;
    }

    if (hasAlarm) {
      msg += `🚨 *Alarme Sem Fios AirShield:*\n`;
      msg += `• Central Hub Dahua com Wi-Fi + 4G LTE e aplicativo DMSS\n`;
      msg += `• ${alarmSensors} Sensores PIR imunes a animais de estimação\n\n`;
    }

    if (hasAccessControl) {
      msg += `🚪 *Controlo de Acesso:*\n`;
      msg += `• Terminal de Reconhecimento Facial Dahua ASI7213X + Fechadura Magnética 280kg\n\n`;
    }

    msg += `Por favor, enviem o orçamento detalhado deste kit com preços de distribuidor para entrega em Maputo/Moçambique. Obrigado!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section id="kit-builder" className="py-16 lg:py-24 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 tracking-wider uppercase mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Configurador Rápido de Projetos</span>
            <span className="text-slate-600">·</span>
            <span>Opções IP & Analógico HDCVI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Simulador de Kits de Segurança
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Escolha entre a tecnologia <strong>IP PoE de alta resolução</strong> ou o <strong>Analógico HDCVI de excelente custo-benefício</strong>, 
            adicione cerca elétrica ou alarme e gere a cotação pronta no WhatsApp.
          </p>
        </div>

        {/* Technology Selector: Analog vs IP */}
        <div className="mt-8 p-1.5 rounded-xl bg-slate-900 border border-slate-800 inline-flex flex-col sm:flex-row gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setCctvTech('ip_poe')}
            className={`flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg text-xs font-bold transition-all ${
              cctvTech === 'ip_poe'
                ? 'bg-red-600 text-white shadow-md shadow-red-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wifi className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <div>Kits IP PoE Dahua (Recomendado)</div>
              <div className="text-[10px] font-normal text-slate-200">Alta resolução 4MP/4K · IA Inteligente · Cabo de Rede</div>
            </div>
          </button>

          <button
            onClick={() => setCctvTech('analog_hdcvi')}
            className={`flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg text-xs font-bold transition-all ${
              cctvTech === 'analog_hdcvi'
                ? 'bg-red-600 text-white shadow-md shadow-red-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Tv className="w-4 h-4 text-amber-400" />
            <div className="text-left">
              <div>Kits Analógicos HDCVI Dahua</div>
              <div className="text-[10px] font-normal text-slate-200">Melhor Custo-Benefício · DVR XVR · Cabo Coaxial</div>
            </div>
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Configurator */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            {/* Property Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Local da Instalação
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'residencia', label: 'Residência' },
                  { id: 'comercio', label: 'Comércio / Loja' },
                  { id: 'industria', label: 'Armazém / Fábrica' },
                  { id: 'condominio', label: 'Condomínio' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPropertyType(item.id as any)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      propertyType === item.id
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CCTV Settings */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Camera className="w-4 h-4 text-red-500" />
                  <span>2. Quantidade de Câmeras {cctvTech === 'ip_poe' ? 'IP' : 'HDCVI'}</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-red-400 font-bold bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    {cctvCameras} Câmeras
                  </span>
                </div>
              </div>

              {/* Quick Stepper Buttons for user-friendliness */}
              <div className="flex items-center gap-2 my-3">
                {[2, 4, 8, 16, 32].map((num) => (
                  <button
                    key={num}
                    onClick={() => setCctvCameras(num)}
                    className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-lg border transition-colors ${
                      cctvCameras === num
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {num} Câms
                  </button>
                ))}
              </div>

              {/* Resolution options tailored to tech */}
              {cctvTech === 'ip_poe' ? (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <button
                    onClick={() => setIpResolution('4mp_wizsense')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      ipResolution === '4mp_wizsense'
                        ? 'bg-red-950/40 border-red-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-white">4MP WizSense Starlight</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Visão noturna avançada + IA para pessoas e viaturas</div>
                  </button>

                  <button
                    onClick={() => setIpResolution('8mp_4k')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      ipResolution === '8mp_4k'
                        ? 'bg-red-950/40 border-red-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-white">8MP 4K Full-Color Smart</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Cores vivas 24 horas + microfone integrado</div>
                  </button>
                </div>
              ) : (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <button
                    onClick={() => setAnalogResolution('5mp_audio')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      analogResolution === '5mp_audio'
                        ? 'bg-red-950/40 border-red-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-white">HDCVI 5MP com Áudio Embutido</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Microfone integrado + alcance IR de 80m</div>
                  </button>

                  <button
                    onClick={() => setAnalogResolution('2mp_1080p')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      analogResolution === '2mp_1080p'
                        ? 'bg-red-950/40 border-red-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-white">HDCVI 1080p Full HD (Econômico)</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Ideal para lojas e escritórios de baixo custo</div>
                  </button>
                </div>
              )}

              {/* Storage */}
              <div className="mt-4 flex items-center justify-between text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-300 font-medium">Capacidade do Disco Rígido (HDD):</span>
                <div className="flex gap-2">
                  {(['1tb', '2tb', '4tb'] as const).map((cap) => (
                    <button
                      key={cap}
                      onClick={() => setStorageDays(cap)}
                      className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${
                        storageDays === cap
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cap.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Electric Fence Settings */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>3. Adicionar Cerca Elétrica Perimetral</span>
                </label>
                <input
                  type="checkbox"
                  checked={hasElectricFence}
                  onChange={(e) => setHasElectricFence(e.target.checked)}
                  className="h-4 w-4 accent-red-600 rounded cursor-pointer"
                />
              </div>

              {hasElectricFence && (
                <div className="space-y-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Metragem perimetral estimada:</span>
                    <span className="font-mono font-bold text-amber-400">{fenceMeters} Metros</span>
                  </div>
                  <div className="flex gap-2">
                    {[50, 100, 200, 300, 500].map((m) => (
                      <button
                        key={m}
                        onClick={() => setFenceMeters(m)}
                        className={`flex-1 py-1 rounded text-[11px] font-mono border transition-colors ${
                          fenceMeters === m
                            ? 'bg-amber-600/30 text-amber-300 border-amber-500'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        {m}m
                      </button>
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Inclui eletrificador 18.000V D-Power com alarme de corte, hastes estrela alumínio 6 isoladores e fio inox 304.
                  </div>
                </div>
              )}
            </div>

            {/* Alarms and Access Control Switches */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <span>Alarme Dahua AirShield</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={hasAlarm}
                    onChange={(e) => setHasAlarm(e.target.checked)}
                    className="h-4 w-4 accent-red-600 rounded cursor-pointer"
                  />
                </div>
                {hasAlarm ? (
                  <div className="text-[11px] text-slate-300">
                    Central sem fios com 4G + Wi-Fi e {alarmSensors} sensores PIR imunes a pets.
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-500">Desativado no kit</div>
                )}
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-emerald-400" />
                    <span>Controlo de Acesso Facial</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={hasAccessControl}
                    onChange={(e) => setHasAccessControl(e.target.checked)}
                    className="h-4 w-4 accent-red-600 rounded cursor-pointer"
                  />
                </div>
                {hasAccessControl ? (
                  <div className="text-[11px] text-slate-300">
                    Terminal Facial 7" Dahua + Fechadura Eletroíman 280kg com sensor.
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-500">Não incluso no kit</div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Bill of Materials Breakdown & Action */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Resumo do Dimensionamento</span>
                <div className="text-lg font-bold text-white">
                  {cctvTech === 'ip_poe' ? 'Kit IP PoE Profissional' : 'Kit Analógico HDCVI'}
                </div>
              </div>
              <div className="px-2.5 py-1 rounded bg-red-950/80 border border-red-800/80 text-[11px] font-bold text-red-400">
                Garantia 3 Anos
              </div>
            </div>

            <div className="mt-5 space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                <div className="font-semibold text-white flex items-center justify-between">
                  <span>
                    {cctvTech === 'ip_poe'
                      ? `Câmeras IP ${ipResolution === '8mp_4k' ? '8MP 4K Full-Color' : '4MP WizSense'}`
                      : `Câmeras HDCVI ${analogResolution === '5mp_audio' ? '5MP com Áudio' : '1080p Full HD'}`}
                  </span>
                  <span className="font-mono text-red-400">{cctvCameras} un.</span>
                </div>
                <div className="text-slate-400 text-[11px] mt-1">
                  {cctvTech === 'ip_poe'
                    ? `+ Gravador NVR Dahua 4K com ${storageDays.toUpperCase()} HDD e portas PoE Plug & Play`
                    : `+ Gravador XVR Dahua Pentabrídeo com ${storageDays.toUpperCase()} HDD e Fonte Colmeia`}
                </div>
              </div>

              {hasElectricFence && (
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>Cerca Elétrica Perimetral</span>
                    <span className="font-mono text-amber-400">~{fenceMeters}m</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-1">
                    Eletrificador D-Power 18kV + Hastes Estrela + Fio Inox 304 + Bateria Backup
                  </div>
                </div>
              )}

              {hasAlarm && (
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>Alarme Dahua AirShield</span>
                    <span className="font-mono text-emerald-400">Hub + {alarmSensors} Sensores</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-1">
                    Central Wi-Fi/4G com app DMSS no celular
                  </div>
                </div>
              )}

              {hasAccessControl && (
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>Controlo de Acesso Facial</span>
                    <span className="font-mono text-blue-400">1 Ponto</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-1">
                    Terminal Facial 7" Dahua + Fechadura Eletroíman 280kg
                  </div>
                </div>
              )}
            </div>

            {/* Fast WhatsApp and Quote Actions */}
            <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
              <button
                onClick={handleWhatsAppKit}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir Cotação deste Kit no WhatsApp</span>
              </button>

              <button
                onClick={handleAddAllToQuote}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
              >
                {kitAddedFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Equipamentos Adicionados ao Orçamento!</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 text-red-400" />
                    <span>Adicionar Equipamentos deste Kit à Lista</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-400 text-center">
                Atendimento por WhatsApp em Maputo: <strong>{COMPANY_CONFIG.phoneDisplay}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TECHSOL SU LDA - Complete Real Inventory Catalog
 * Avenida Josina Machel, 923 - Maputo, Mocambique
 */

import { Product } from '../types';

export const PRODUCT_IMAGE_MAP = {
  nvr_16p: '/images/nvr_16p.jpg',
  nvr_xvr: '/images/nvr.jpg',
  xvr_wizsense: '/images/xvr_wizsense.jpg',
  cam_hfw1439: '/images/cam_hfw1439.jpg',
  cam_hdbw1439: '/images/cam_hdbw1439.jpg',
  cam_ptz: '/images/cam_ptz.jpg',
  wifi_smart_cam: '/images/wifi_smart_cam.jpg',
  solar_cam: '/images/solar_cam.jpg',
  eyeball_dome: '/images/dome.jpg',
  bullet: '/images/bullet.jpg',
  intercom: '/images/intercom_ktw02.jpg',
  facial_terminal: '/images/facial_asi6214s.jpg',
  biometric_keypad: '/images/biometric_keypad.jpg',
  access_control: '/images/access.jpg',
  turnstile_dahua: '/images/turnstile_dahua.jpg',
  magnetic_lock: '/images/magnetic_lock.jpg',
  rfid_card: '/images/rfid_card.jpg',
  airshield_alarm: '/images/alarm_airshield.jpg',
  smoke_detector: '/images/smoke_detector.jpg',
  pir_detector: '/images/pir_detector.jpg',
  nemtek_energizer: '/images/energizer.jpg',
  electric_fence: '/images/fence.jpg',
  wire_spool: '/images/wire_spool.jpg',
  siren: '/images/siren.jpg',
  gate_motor: '/images/centurion_d5.jpg',
  gate_motor_d10: '/images/gate_motor.jpg',
  remote_control: '/images/remote.jpg',
  battery_12v: '/images/battery_12v.jpg',
  power_supply: '/images/power_supply.jpg',
  cat6_cable: '/images/cable_cat6.jpg',
  cable_coaxial: '/images/cable_coaxial.jpg',
  bnc_dc_connectors: '/images/bnc_dc_connectors.jpg',
  junction_box: '/images/junction_box.jpg',
  cable_hdmi: '/images/cable_hdmi.jpg',
  monitor_dahua: '/images/monitor_dahua.jpg',
  switch_poe: '/images/switch_poe.jpg',
  ceiling_ap: '/images/ceiling_ap.jpg',
  router_wifi: '/images/router_wifi.jpg',
  wd_purple: '/images/hdd.jpg',
  ups: '/images/ups_dahua.png',
  rack_6u: '/images/rack_zkteco.jpg',
  rack_9u: '/images/rack_9u.jpg',
};

export function getProductReferenceImage(p: { id: string; model: string; name: string; category: string; subcategory: string }): string {
  const m = p.model.toLowerCase();
  const n = p.name.toLowerCase();
  const s = p.subcategory.toLowerCase();

  // 1. Monitors (must come before HDMI cables & cameras!)
  if (s.includes('monitor') || n.includes('monitor') || m.includes('lm19') || m.includes('lm22') || m.includes('lm32')) {
    return PRODUCT_IMAGE_MAP.monitor_dahua;
  }

  // 2. Video Intercom Doorbell Kits & Touch Screens (must come before batteries!)
  if (['ktw02', 'kta02', 'ktp03', 'sd7', 'videoporteiro', 'intercom'].some(k => n.includes(k) || m.includes(k) || s.includes(k))) {
    return PRODUCT_IMAGE_MAP.intercom;
  }

  // 3. Solar PTZ & Battery Solar Cameras
  if (n.includes('solar') || s.includes('solar') || m.includes('hb8c') || n.includes('hb8c') || m.includes('eb3') || m.includes('eb8')) {
    return PRODUCT_IMAGE_MAP.solar_cam;
  }

  // 4. NVRs (PoE and Non-PoE) - MUST COME BEFORE WIFI CAMERAS & HDMI!
  if (n.includes('nvr') || m.includes('nvr') || s.includes('nvr')) {
    if (['-16p', '-8p', '-4p', 'poe'].some(k => m.includes(k) || n.includes(k))) {
      return PRODUCT_IMAGE_MAP.nvr_16p;
    }
    return PRODUCT_IMAGE_MAP.nvr_xvr;
  }

  // 5. XVRs / DVRs
  if (n.includes('xvr') || m.includes('xvr') || s.includes('xvr') || s.includes('dvr')) {
    return PRODUCT_IMAGE_MAP.xvr_wizsense;
  }

  // 6. Smart Wi-Fi / Consumer Cameras - MUST COME BEFORE BATTERY & ROUTER!
  if ([
    'ch3', 'ct3', 'rh3', 'rt3', 'rp3', 'cp3', 'cb1', 'cb2', 'c6n', 'h6c',
    'h3a', 'h3d', 'c3a', 'f3d', 'h3c', 'h4 3mp', 'poe h4', 'h3 5mp', 'h5',
    'lc1c', 'lc3', 'h8c', 'h9c', 'spy camera'
  ].some(k => n.includes(k) || m.includes(k)) || (n.includes('camera') && (n.includes('wi-fi') || n.includes('wifi'))) || s.includes('camera wi-fi')) {
    return PRODUCT_IMAGE_MAP.wifi_smart_cam;
  }

  // 7. UPS / No-break (must come before Power Supplies!)
  if (s.includes('ups') || m.includes('pfm3350') || n.includes('uninterruptible') || ((m.includes('ups') || n.includes('ups')) && !n.includes('power supply') && !m.includes('ps412v'))) {
    return PRODUCT_IMAGE_MAP.ups;
  }

  // 8. Power Supplies (12V PSU boxes and adapters)
  if (n.includes('power supply') || n.includes('fonte') || s.includes('fonte') || m.includes('ps412v') || m.includes('pfm344') || m.includes('pfm302')) {
    return PRODUCT_IMAGE_MAP.power_supply;
  }

  // 9. Batteries (12V SLA Backup Batteries)
  if (n.includes('battery') || n.includes('bateria') || n.includes('7.2a') || n.includes('7ah')) {
    return PRODUCT_IMAGE_MAP.battery_12v;
  }

  // 10. HDMI Cables
  if (n.includes('hdmi') || m.includes('hdmi') || s.includes('hdmi')) {
    return PRODUCT_IMAGE_MAP.cable_hdmi;
  }

  // 11. Tripod Turnstiles (Catracas)
  if (n.includes('turnstile') || s.includes('turnstile') || m.includes('asgg')) {
    return PRODUCT_IMAGE_MAP.turnstile_dahua;
  }

  // 12. Facial Recognition Terminals
  if (['asi6214', 'asi3204', 'facial', 'face recognition'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.facial_terminal;
  }

  // 13. Biometric Keypad & Access / Time Attendance Terminals (MUST COME BEFORE RFID CARD!)
  if (['asi1212', 'asa2212', 'asa1222', 'standalone', 'attendance', 'fingerprint'].some(k => n.includes(k) || m.includes(k) || s.includes(k))) {
    if (m.includes('asa2212') || m.includes('asi1212')) {
      return PRODUCT_IMAGE_MAP.access_control;
    }
    return PRODUCT_IMAGE_MAP.biometric_keypad;
  }

  // 14. RFID IC Cards & Keyfobs
  if (['ic card', 'cartao', 'cartão', 'keyfob', 's50', 'abs003'].some(k => n.includes(k) || m.includes(k) || s.includes(k))) {
    return PRODUCT_IMAGE_MAP.rfid_card;
  }

  // 15. Door Closers & Magnetic Locks
  if (['lock', 'fechadura', 'magnetic', 'eletroiman', 'asf280', 'door closer', 'dc80120'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.magnetic_lock;
  }

  // 16. Smoke & Fire Detectors
  if (['smoke', 'heat detector', 'fumo', 'incendio', 'incêndio', 'fire alarm', 'hy-1320', 'hy-1500'].some(k => n.includes(k) || m.includes(k) || s.includes(k))) {
    return PRODUCT_IMAGE_MAP.smoke_detector;
  }

  // 17. PIR Motion & Door Reed Detectors
  if (['pir detector', 'ard2231', 'ard333', 'door detector', 'contacto magnetico'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.pir_detector;
  }

  // 18. Sirens (Dahua Wireless Sirens & Nemtek Sirens)
  if (['sirene', 'siren', 'sr-30', 'ara12', 'ara13'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.siren;
  }

  // 19. AirShield Alarm Hub & Kits
  if (['arc3800', 'airshield', 'alarm hub', 'alarm kit', 'central de alarme'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.airshield_alarm;
  }

  // 20. PTZ Speed Dome & Positioning Cameras
  if (['ptz', 'speed dome', 'sd3d', 'sd49', 'sdt', 'epc245', 'eca7b', 'esd41'].some(k => n.includes(k) || m.includes(k) || s.includes(k))) {
    return PRODUCT_IMAGE_MAP.cam_ptz;
  }

  // 21. Dome / Eyeball / Turret Cameras
  if (['dome', 'eyeball', 'turret', 'hdbw', 'hdw'].some(k => n.includes(k) || m.includes(k) || s.includes(k))) {
    if (m.includes('hdw') && !m.includes('hdbw')) {
      return PRODUCT_IMAGE_MAP.eyeball_dome;
    }
    return PRODUCT_IMAGE_MAP.cam_hdbw1439;
  }

  // 22. Bullet & Splicing Cameras
  if (['bullet', 'hfw', 'pdw5849', 'tpc-aebf', 'me1239'].some(k => n.includes(k) || m.includes(k) || s.includes(k))) {
    if (m.includes('hac-hfw') || m.includes('me1239') || m.includes('tpc-aebf')) {
      return PRODUCT_IMAGE_MAP.bullet;
    }
    return PRODUCT_IMAGE_MAP.cam_hfw1439;
  }

  // 23. Bastidor Rack 9U
  if (m.includes('r9u') || n.includes('9u') || m.includes('9u4d')) {
    return PRODUCT_IMAGE_MAP.rack_9u;
  }

  // 24. Bastidor Rack 6U, 12U, 18U, 42U
  if ((n.includes('rack') || m.includes('rack') || s.includes('bastidor') || n.includes('bastidor')) && !s.includes('fence')) {
    return PRODUCT_IMAGE_MAP.rack_6u;
  }

  // 25. Ceiling Mount Access Points & Wireless Bridges / CPE
  if (['u7-lr', 'u7-outdoor', 'ap3000', 'ap de teto', 'celing mount', 'i29', 'o4-kit', 'o8 tenda', 'wbc5', 'cpe'].some(k => n.includes(k) || m.includes(k) || s.includes(k))) {
    return PRODUCT_IMAGE_MAP.ceiling_ap;
  }

  // 26. Routers Wi-Fi, Mesh & 4G/5G
  if (['router', 'wi-fi', 'wifi', 'mesh', 'tx12', 'rx12', 'tx2', 'a23', 'a9', 'n301', '4g03', '4g08', '5g01', 'mr403', 'dh-n3', 'ax15', 'ax30', 'mx3', 'mw3', 'mw6', 'ac650', '3wr4g'].some(k => n.includes(k) || m.includes(k) || s.includes(k))) {
    return PRODUCT_IMAGE_MAP.router_wifi;
  }

  // 27. Switches PoE e Rede
  if (n.includes('switch') || s.includes('switch') || ['teg', 'tef', 'pfs', 's3220', 's3228', 'cs4228', 'sg10'].some(k => m.includes(k))) {
    return PRODUCT_IMAGE_MAP.switch_poe;
  }

  // 28. Discos WD Purple
  if (n.includes('purple') || n.includes('disco') || s.includes('hdd') || m.includes('wd10') || m.includes('wd20') || m.includes('wd40')) {
    return PRODUCT_IMAGE_MAP.wd_purple;
  }

  // 29. Remote Controls & Receivers
  if (n.includes('comando') || n.includes('remoto') || n.includes('centurion nova') || m.includes('centurion nova')) {
    return PRODUCT_IMAGE_MAP.remote_control;
  }

  // 30. Gate Motors
  if (['motor de portao', 'd5 evo', 'd10 smart', 'sliding gate', 'gemini'].some(k => n.includes(k) || m.includes(k) || s.includes(k))) {
    if (m.includes('d10') || n.includes('d10')) {
      return PRODUCT_IMAGE_MAP.gate_motor_d10;
    }
    return PRODUCT_IMAGE_MAP.gate_motor;
  }

  // 31. Wire Spools (Arame)
  if (n.includes('arame') || (n.includes('wire') && (m.includes('ew-al') || m.includes('ew-ss')))) {
    return PRODUCT_IMAGE_MAP.wire_spool;
  }

  // 32. Nemtek Energizers
  if (['eletrificador', 'energizer', 'wizord', 'druid', 'merlin', 'e-m18', 'e-wiz'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.nemtek_energizer;
  }

  // 33. Electric Fence general (Tubes, Brackets, Warning Signs)
  if (s.includes('cerca') || s.includes('fence') || m.includes('esqj') || m.includes('ea-wrs')) {
    return PRODUCT_IMAGE_MAP.electric_fence;
  }

  // 34. Coaxial Cable
  if (n.includes('coaxial') || s.includes('coxial') || m.includes('rg59')) {
    return PRODUCT_IMAGE_MAP.cable_coaxial;
  }

  // 35. BNC & DC Connectors
  if (n.includes('bnc') || m.includes('bnc') || m.includes('pfm979-dcp') || (n.includes('connector') && !n.includes('rj45') && !n.includes('cat6'))) {
    return PRODUCT_IMAGE_MAP.bnc_dc_connectors;
  }

  // 36. Junction Box
  if (n.includes('junction box') || s.includes('junction box') || m.includes('pfa12a')) {
    return PRODUCT_IMAGE_MAP.junction_box;
  }

  // 37. Network Cables Cat6 & RJ45 Connectors
  if (n.includes('cabo') || n.includes('cat6') || m.includes('pfm92') || m.includes('pfm972') || m.includes('pfm976-631')) {
    return PRODUCT_IMAGE_MAP.cat6_cable;
  }

  return PRODUCT_IMAGE_MAP.cam_hfw1439;
}

export const PRODUCTS: Product[] = [
  {
    "id": "ds-ups10k-r-tjl-o-std-iec",
    "sku": "DS-UPS10K-R/TJL(O-STD)/IEC",
    "model": "DS-UPS10K-R/TJL(O-STD)/IEC",
    "name": "10kVA Line-interactive UPS DS-UPS10K-R/TJL(O-STD)/IEC",
    "category": "redes_acessorios",
    "subcategory": "UPS",
    "brand": "Techsol",
    "priceMZN": 100000.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 10kVA Line-interactive UPS DS-UPS10K-R/TJL(O-STD)/IEC. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Techsol",
      "Modelo": "DS-UPS10K-R/TJL(O-STD)/IEC",
      "Categoria": "UPS",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/ups_dahua.png"
  },
  {
    "id": "dhi-nvr608h-128xl",
    "sku": "DHI-NVR608H-128XL",
    "model": "DHI-NVR608H-128XL",
    "name": "128CH 2U 8HDDs WizMind Network Video Recorder",
    "category": "redes_acessorios",
    "subcategory": "Equipamentos",
    "brand": "Dahua",
    "priceMZN": 276060.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 128CH 2U 8HDDs WizMind Network Video Recorder. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-NVR608H-128XL",
      "Categoria": "Equipamentos",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/nvr.jpg"
  },
  {
    "id": "dhi-nvr2216-16p-4ks3",
    "sku": "DHI-NVR2216-16P-4KS3",
    "model": "DHI-NVR2216-16P-4KS3",
    "name": "16CH 1U 16PoE 2HDDs Lite Network Video Recorder",
    "category": "cctv",
    "subcategory": "NVR IP",
    "brand": "Dahua",
    "priceMZN": 20640.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 16CH 1U 16PoE 2HDDs Lite Network Video Recorder. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-NVR2216-16P-4KS3",
      "Categoria": "NVR IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/nvr_16p.jpg"
  },
  {
    "id": "nvr5216-16p-ei2",
    "sku": "NVR5216-16P-EI2",
    "model": "NVR5216-16P-EI2",
    "name": "16CH 1U 16PoE 2HDDs WizSense Network Video Recorder NVR5216-16P-EI2",
    "category": "cctv",
    "subcategory": "NVR IP",
    "brand": "Dahua",
    "priceMZN": 45071.25,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 16CH 1U 16PoE 2HDDs WizSense Network Video Recorder NVR5216-16P-EI2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "NVR5216-16P-EI2",
      "Categoria": "NVR IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/nvr_16p.jpg"
  },
  {
    "id": "xvr5116h-4kl-i3-t",
    "sku": "XVR5116H-4KL-I3/T",
    "model": "XVR5116H-4KL-I3/T",
    "name": "16CH Penta-brid 4K Value/5MP Mini 1U 1HDD WizSense Digital Video Recorder",
    "category": "cctv",
    "subcategory": "XVR/DVR",
    "brand": "Dahua",
    "priceMZN": 21980.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 16CH Penta-brid 4K Value/5MP Mini 1U 1HDD WizSense Digital Video Recorder. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "XVR5116H-4KL-I3/T",
      "Categoria": "XVR/DVR",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/xvr_wizsense.jpg"
  },
  {
    "id": "teg1120p-16-250w",
    "sku": "TEG1120P-16-250W",
    "model": "TEG1120P-16-250W",
    "name": "16Port PoE + 2Port Sfp + 2Port Ethernet Gigabit Switch TEG1120P-16-250W",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit POE",
    "brand": "Tenda",
    "priceMZN": 10884.25,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 16Port PoE + 2Port Sfp + 2Port Ethernet Gigabit Switch TEG1120P-16-250W. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "TEG1120P-16-250W",
      "Categoria": "Switch Gigabit POE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "teg2220p-16-250w",
    "sku": "TEG2220P-16-250W",
    "model": "TEG2220P-16-250W",
    "name": "16Ports POE 18GE+2SFP Cloud Managed Switch TEG2220P-16-250W",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit POE",
    "brand": "Tenda",
    "priceMZN": 11820.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 16Ports POE 18GE+2SFP Cloud Managed Switch TEG2220P-16-250W. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "TEG2220P-16-250W",
      "Categoria": "Switch Gigabit POE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "ps412v15a18",
    "sku": "PS412V15A18",
    "model": "PS412V15A18",
    "name": "18CH 12V15A Power supply 180W, UPS (PS412V15A18)",
    "category": "redes_acessorios",
    "subcategory": "Fonte de Energia",
    "brand": "Pro-Hunter",
    "priceMZN": 4030.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 18CH 12V15A Power supply 180W, UPS (PS412V15A18). Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Pro-Hunter",
      "Modelo": "PS412V15A18",
      "Categoria": "Fonte de Energia",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/power_supply.jpg"
  },
  {
    "id": "dh-pfc200d-18u6d-b",
    "sku": "DH-PFC200D-18U6D-B",
    "model": "DH-PFC200D-18U6D-B",
    "name": "18U Rack Cabinet 600mmx600mmx990mm",
    "category": "redes_acessorios",
    "subcategory": "Bastidor",
    "brand": "Dahua",
    "priceMZN": 8385.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 18U Rack Cabinet 600mmx600mmx990mm. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFC200D-18U6D-B",
      "Categoria": "Bastidor",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/rack_zkteco.jpg"
  },
  {
    "id": "dh-pfc200d-18u6d-c",
    "sku": "DH-PFC200D-18U6D-C",
    "model": "DH-PFC200D-18U6D-C",
    "name": "19” 18Uc Rack Cabinet 600mmx600mmx990mm",
    "category": "redes_acessorios",
    "subcategory": "Bastidor",
    "brand": "Dahua",
    "priceMZN": 2345.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 19” 18Uc Rack Cabinet 600mmx600mmx990mm. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFC200D-18U6D-C",
      "Categoria": "Bastidor",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/rack_zkteco.jpg"
  },
  {
    "id": "dh-pfc200d-42u8d-b",
    "sku": "DH-PFC200D-42U8D-B",
    "model": "DH-PFC200D-42U8D-B",
    "name": "19” 42U Rack Cabinet 600mmx800mmx2055mm",
    "category": "redes_acessorios",
    "subcategory": "Bastidor",
    "brand": "Dahua",
    "priceMZN": 16300.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 19” 42U Rack Cabinet 600mmx800mmx2055mm. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFC200D-42U8D-B",
      "Categoria": "Bastidor",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/rack_zkteco.jpg"
  },
  {
    "id": "dh-pfc200d-42u8d-a",
    "sku": "DH-PFC200D-42U8D-A",
    "model": "DH-PFC200D-42U8D-A",
    "name": "19” 42UA Rack Cabinet 600mmx800mmx2055mm",
    "category": "redes_acessorios",
    "subcategory": "Bastidor",
    "brand": "Dahua",
    "priceMZN": 8385.3,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 19” 42UA Rack Cabinet 600mmx800mmx2055mm. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFC200D-42U8D-A",
      "Categoria": "Bastidor",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/rack_zkteco.jpg"
  },
  {
    "id": "dh-pfc200d-42u8d-c",
    "sku": "DH-PFC200D-42U8D-C",
    "model": "DH-PFC200D-42U8D-C",
    "name": "19” 42Uc Rack Cabine 600mmx800mmx2055mm",
    "category": "redes_acessorios",
    "subcategory": "Bastidor",
    "brand": "Dahua",
    "priceMZN": 3700.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 19” 42Uc Rack Cabine 600mmx800mmx2055mm. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFC200D-42U8D-C",
      "Categoria": "Bastidor",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/rack_zkteco.jpg"
  },
  {
    "id": "dh-pfc200d-6u4d",
    "sku": "DH-PFC200D-6U4D",
    "model": "DH-PFC200D-6U4D",
    "name": "19” 6U Rack Cabinet 600mmx450mmx372mm",
    "category": "redes_acessorios",
    "subcategory": "Bastidor",
    "brand": "Dahua",
    "priceMZN": 5550.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 19” 6U Rack Cabinet 600mmx450mmx372mm. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFC200D-6U4D",
      "Categoria": "Bastidor",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/rack_zkteco.jpg"
  },
  {
    "id": "dh-pfc200d-9u4d",
    "sku": "DH-PFC200D-9U4D",
    "model": "DH-PFC200D-9U4D",
    "name": "19” 9U Rack Cabinet 600mmx450mmx505mm",
    "category": "redes_acessorios",
    "subcategory": "Bastidor",
    "brand": "Dahua",
    "priceMZN": 6290.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 19” 9U Rack Cabinet 600mmx450mmx505mm. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFC200D-9U4D",
      "Categoria": "Bastidor",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/rack_9u.jpg"
  },
  {
    "id": "1kbyte-s50-ic-card-zkteco",
    "sku": "1KByte S50 IC Card , ZKTECO",
    "model": "1KByte S50 IC Card , ZKTECO",
    "name": "1KByte S50 IC Card",
    "category": "controle_acesso",
    "subcategory": "Access Control Accessories",
    "brand": "Zkteco",
    "priceMZN": 69.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 1KByte S50 IC Card. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Zkteco",
      "Modelo": "1KByte S50 IC Card , ZKTECO",
      "Categoria": "Access Control Accessories",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/rfid_card.jpg"
  },
  {
    "id": "pfm972-6u-1",
    "sku": "PFM972-6U-1",
    "model": "PFM972-6U-1",
    "name": "1m UTP CAT6 RJ45 Patch Cord",
    "category": "redes_acessorios",
    "subcategory": "Cabo UTP Cat6",
    "brand": "Dahua",
    "priceMZN": 120.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 1m UTP CAT6 RJ45 Patch Cord. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "PFM972-6U-1",
      "Categoria": "Cabo UTP Cat6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cable_cat6.jpg"
  },
  {
    "id": "ipc-hdbw5441f-as-e2",
    "sku": "IPC-HDBW5441F-AS-E2",
    "model": "IPC-HDBW5441F-AS-E2",
    "name": "2 × 4 MP Dual-Directional WizMind Network Camera IPC-HDBW5441F-AS-E2",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 22015.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2 × 4 MP Dual-Directional WizMind Network Camera IPC-HDBW5441F-AS-E2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "IPC-HDBW5441F-AS-E2",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_hdbw1439.jpg"
  },
  {
    "id": "dc80120l",
    "sku": "DC80120L",
    "model": "DC80120L",
    "name": "2 Speed Hydraulic Door Closer 120kg Zkteco",
    "category": "controle_acesso",
    "subcategory": "Access Control",
    "brand": "Zkteco",
    "priceMZN": 2070.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2 Speed Hydraulic Door Closer 120kg Zkteco. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Zkteco",
      "Modelo": "DC80120L",
      "Categoria": "Access Control",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/magnetic_lock.jpg"
  },
  {
    "id": "dhi-hy-1320-ctxf",
    "sku": "DHI-HY-1320-CTXF",
    "model": "DHI-HY-1320-CTXF",
    "name": "2 wires Addressable Multi-sensor Smoke and Heat Detector (without base)",
    "category": "alarmes",
    "subcategory": "Addressable Fire Alarm Products",
    "brand": "Dahua",
    "priceMZN": 1348.9,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2 wires Addressable Multi-sensor Smoke and Heat Detector (without base). Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-HY-1320-CTXF",
      "Categoria": "Addressable Fire Alarm Products",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/smoke_detector.jpg"
  },
  {
    "id": "ipc-pdw5849-a180-e2-aste",
    "sku": "IPC-PDW5849-A180-E2-ASTE",
    "model": "IPC-PDW5849-A180-E2-ASTE",
    "name": "2×4MP Full-color Duo Splicing WizMind Network Camera IPC-PDW5849-A180-E2-AST",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 32427.5,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2×4MP Full-color Duo Splicing WizMind Network Camera IPC-PDW5849-A180-E2-AST. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "IPC-PDW5849-A180-E2-ASTE",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_hfw1439.jpg"
  },
  {
    "id": "teg1128p-24-410w",
    "sku": "TEG1128P-24-410W",
    "model": "TEG1128P-24-410W",
    "name": "24Port PoE + 2Port Sfp + 2Port Ethernet Gigabit Switch TEG1128P-24-410W",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit POE",
    "brand": "Tenda",
    "priceMZN": 14078.13,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 24Port PoE + 2Port Sfp + 2Port Ethernet Gigabit Switch TEG1128P-24-410W. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "TEG1128P-24-410W",
      "Categoria": "Switch Gigabit POE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "teg5328p-24-410w",
    "sku": "TEG5328P-24-410W",
    "model": "TEG5328P-24-410W",
    "name": "24Ports L3 Cloud Managed PoE Switch TEG5328P-24-410W",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit POE",
    "brand": "Tenda",
    "priceMZN": 22500.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 24Ports L3 Cloud Managed PoE Switch TEG5328P-24-410W. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "TEG5328P-24-410W",
      "Categoria": "Switch Gigabit POE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "teg5328f",
    "sku": "TEG5328F",
    "model": "TEG5328F",
    "name": "24Ports Network L3 Managed Switch TEG5328F",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit Ethernet",
    "brand": "Tenda",
    "priceMZN": 12240.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 24Ports Network L3 Managed Switch TEG5328F. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "TEG5328F",
      "Categoria": "Switch Gigabit Ethernet",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "tef1126p-24-250w",
    "sku": "TEF1126P-24-250W",
    "model": "TEF1126P-24-250W",
    "name": "24Ports POE 24FE+2GE/1SFP Switch TEF1126P-24-250W",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit POE",
    "brand": "Tenda",
    "priceMZN": 12850.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 24Ports POE 24FE+2GE/1SFP Switch TEF1126P-24-250W. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "TEF1126P-24-250W",
      "Categoria": "Switch Gigabit POE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "ezviz-c6n-h6c",
    "sku": "EZVIZ C6N(H6C)",
    "model": "EZVIZ C6N(H6C)",
    "name": "2MP 2.4GHZ WIFI INDOOR CAMERA AUTO TRACKING EZVIZ C6N(H6C",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 2200.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2MP 2.4GHZ WIFI INDOOR CAMERA AUTO TRACKING EZVIZ C6N(H6C. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ C6N(H6C)",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "ezviz-lc1c",
    "sku": "ezviz LC1C",
    "model": "ezviz LC1C",
    "name": "2mp 2.4ghz wifi pir motion 2000-lumen britghness",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 6850.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2mp 2.4ghz wifi pir motion 2000-lumen britghness. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "ezviz LC1C",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "dh-eca7b1231-hnr-xa-f",
    "sku": "DH-ECA7B1231-HNR-XA-F",
    "model": "DH-ECA7B1231-HNR-XA-F",
    "name": "2MP 31x Starlight IR EXPLOSION-PROOF CAMERA",
    "category": "cctv",
    "subcategory": "PTZ Explosion Proof",
    "brand": "Dahua",
    "priceMZN": 168682.5,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2MP 31x Starlight IR EXPLOSION-PROOF CAMERA. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-ECA7B1231-HNR-XA-F",
      "Categoria": "PTZ Explosion Proof",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_ptz.jpg"
  },
  {
    "id": "dh-epc245u-ptz-ir",
    "sku": "DH-EPC245U-PTZ-IR",
    "model": "DH-EPC245U-PTZ-IR",
    "name": "2MP 45x Explosion-proof IR Network Positioning System",
    "category": "cctv",
    "subcategory": "PTZ Explosion Proof",
    "brand": "Dahua",
    "priceMZN": 66833.75,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2MP 45x Explosion-proof IR Network Positioning System. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-EPC245U-PTZ-IR",
      "Categoria": "PTZ Explosion Proof",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_ptz.jpg"
  },
  {
    "id": "ct3-wca-tenda",
    "sku": "CT3-WCA Tenda",
    "model": "CT3-WCA Tenda",
    "name": "2MP Outdoor Full-Color App CH3-Wca CT3-WCA Tenda",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "Tenda",
    "priceMZN": 2583.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2MP Outdoor Full-Color App CH3-Wca CT3-WCA Tenda. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "CT3-WCA Tenda",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "ch3-wca-ct3-wca",
    "sku": "CH3-WCA CT3-WCA",
    "model": "CH3-WCA CT3-WCA",
    "name": "2MP Outdoor Full-Color Night Vision Wi-Fi Camera, AI Human Detection, Customized Voice Alerts, Sound and Light Alarm, Alarm Notification in APP CH3-WCA CT3-WCA Tenda",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "Tenda",
    "priceMZN": 2460.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2MP Outdoor Full-Color Night Vision Wi-Fi Camera, AI Human Detection, Customized Voice Alerts, Sound and Light Alarm, Alarm Notification in APP CH3-WCA CT3-WCA Tenda. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "CH3-WCA CT3-WCA",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "rh3-wca-tenda",
    "sku": "RH3-WCA Tenda",
    "model": "RH3-WCA Tenda",
    "name": "2MP Outdoor Full-Color Night Vision Wi-Fi Camera, AI Human Detection, Customized Voice Alerts, Sound and Light Alarm, Alarm Notification in APP RH3-WCA Tenda",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "Tenda",
    "priceMZN": 2940.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2MP Outdoor Full-Color Night Vision Wi-Fi Camera, AI Human Detection, Customized Voice Alerts, Sound and Light Alarm, Alarm Notification in APP RH3-WCA Tenda. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "RH3-WCA Tenda",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "rt3-wca-tenda",
    "sku": "RT3-WCA Tenda",
    "model": "RT3-WCA Tenda",
    "name": "2MP Outdoor Full-Color Night Vision Wi-Fi Camera, AI Human Detection, Two-way Audio, Sound and Light Alarm",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "Tenda",
    "priceMZN": 2460.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2MP Outdoor Full-Color Night Vision Wi-Fi Camera, AI Human Detection, Two-way Audio, Sound and Light Alarm. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "RT3-WCA Tenda",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "2mp-spy-camera-w10",
    "sku": "2MP SPY Camera W10",
    "model": "2MP SPY Camera W10",
    "name": "2MP SPY Batery WIFI Camera W10",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "HI TECH",
    "priceMZN": 2000.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2MP SPY Batery WIFI Camera W10. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "HI TECH",
      "Modelo": "2MP SPY Camera W10",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "2mp-spy-camera-w8",
    "sku": "2MP SPY Camera W8",
    "model": "2MP SPY Camera W8",
    "name": "2MP SPY Batery WIFI Camera W8",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "HI TECH",
    "priceMZN": 2000.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2MP SPY Batery WIFI Camera W8. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "HI TECH",
      "Modelo": "2MP SPY Camera W8",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "spy-camera",
    "sku": "SPY CAMERA",
    "model": "SPY CAMERA",
    "name": "2mp SPY CAMERA",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "HI TECH",
    "priceMZN": 2000.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2mp SPY CAMERA. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "HI TECH",
      "Modelo": "SPY CAMERA",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "cb2",
    "sku": "CB2",
    "model": "CB2",
    "name": "2MP Wi-fi Infoor Battery Camera, Smart Human Motion Detection (1600mAh Rechargeable Battery) CB2",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 4950.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2MP Wi-fi Infoor Battery Camera, Smart Human Motion Detection (1600mAh Rechargeable Battery) CB2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "CB2",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "ezviz-smart-integration-cb1",
    "sku": "EZVIZ SMART INTEGRATION CB1",
    "model": "EZVIZ SMART INTEGRATION CB1",
    "name": "2MP WIFI INDOOR BATTERY CAMERA(1600 MAH RECHARGEABLE) CB1",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 3600.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2MP WIFI INDOOR BATTERY CAMERA(1600 MAH RECHARGEABLE) CB1. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ SMART INTEGRATION CB1",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "ezviz-cs-h3c",
    "sku": "EZVIZ CS-H3C",
    "model": "EZVIZ CS-H3C",
    "name": "2MP WIFI OUTDOOR CAMERA EZVIZ 1080P EZVIZ CS-H3C",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 2750.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 2MP WIFI OUTDOOR CAMERA EZVIZ 1080P EZVIZ CS-H3C. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ CS-H3C",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "h9c-eziz-3-3mp-wifi-camer",
    "sku": "H9C EZIZ 3+3MP  WIFI CAMER",
    "model": "H9C EZIZ 3+3MP  WIFI CAMER",
    "name": "3+3MP WIFI,OUTDOOE CAMERA TWO-WAY TALK SMART MOTION DETECTION.",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 5150.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 3+3MP WIFI,OUTDOOE CAMERA TWO-WAY TALK SMART MOTION DETECTION.. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "H9C EZIZ 3+3MP  WIFI CAMER",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "ups3000-smv-3kva",
    "sku": "UPS3000 SMV 3KVA",
    "model": "UPS3000 SMV 3KVA",
    "name": "3000VA/900W Line-interactive UPS 3Kva",
    "category": "redes_acessorios",
    "subcategory": "UPS",
    "brand": "Techsol",
    "priceMZN": 14250.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 3000VA/900W Line-interactive UPS 3Kva. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Techsol",
      "Modelo": "UPS3000 SMV 3KVA",
      "Categoria": "UPS",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/ups_dahua.png"
  },
  {
    "id": "dh-pfm922-6un",
    "sku": "DH-PFM922-6UN",
    "model": "DH-PFM922-6UN",
    "name": "305m Outdoor U/UTP CAT6 Network Cable (Black,CCA) DH-PFM922-6UN",
    "category": "redes_acessorios",
    "subcategory": "Cabo UTP Cat6",
    "brand": "Dahua",
    "priceMZN": 6500.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 305m Outdoor U/UTP CAT6 Network Cable (Black,CCA) DH-PFM922-6UN. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFM922-6UN",
      "Categoria": "Cabo UTP Cat6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cable_cat6.jpg"
  },
  {
    "id": "nvr608h-32-xi",
    "sku": "NVR608H-32-XI",
    "model": "NVR608H-32-XI",
    "name": "32CH 2U 8HDDs WizMind Network Video Recorder",
    "category": "cctv",
    "subcategory": "NVR IP",
    "brand": "Dahua",
    "priceMZN": 170065.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 32CH 2U 8HDDs WizMind Network Video Recorder. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "NVR608H-32-XI",
      "Categoria": "NVR IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/nvr.jpg"
  },
  {
    "id": "dh-wbc5-45ac-03s",
    "sku": "DH-WBC5-45AC-03S",
    "model": "DH-WBC5-45AC-03S",
    "name": "3km Wireless Bridge",
    "category": "redes_acessorios",
    "subcategory": "CPE",
    "brand": "Dahua",
    "priceMZN": 5580.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 3km Wireless Bridge. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-WBC5-45AC-03S",
      "Categoria": "CPE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/ceiling_ap.jpg"
  },
  {
    "id": "ezviz-cs-h5",
    "sku": "EZVIZ CS-H5",
    "model": "EZVIZ CS-H5",
    "name": "3MP 4G AI POWERD COLOR NIGHT VISION EZVIZ CS-H5",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 4235.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 3MP 4G AI POWERD COLOR NIGHT VISION EZVIZ CS-H5. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ CS-H5",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "h8c-3mp-4g",
    "sku": "h8c 3mp 4g",
    "model": "h8c 3mp 4g",
    "name": "3MP 4G Outdoor camera, Motion detetcion PTZ",
    "category": "cctv",
    "subcategory": "Camera PTZ IPC",
    "brand": "EZVIZ",
    "priceMZN": 4450.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 3MP 4G Outdoor camera, Motion detetcion PTZ. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "h8c 3mp 4g",
      "Categoria": "Camera PTZ IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "rp3-pro-cp3-pro-tenda",
    "sku": "RP3 Pro CP3 Pro Tenda",
    "model": "RP3 Pro CP3 Pro Tenda",
    "name": "3MP indoor PT Wi-Fi 6 Camera, One-touch Call, Human/Pet Detection, Cry Detection, Smart Tracking, Sound and Light Alarm, Two-way Audio",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "Tenda",
    "priceMZN": 2220.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 3MP indoor PT Wi-Fi 6 Camera, One-touch Call, Human/Pet Detection, Cry Detection, Smart Tracking, Sound and Light Alarm, Two-way Audio. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "RP3 Pro CP3 Pro Tenda",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "ezviz-3mp-poe-h4",
    "sku": "EZVIZ 3MP POE H4",
    "model": "EZVIZ 3MP POE H4",
    "name": "3MP POE NETWORK OUTDOOR DOME CAMERA AI POWERD H4 3MP",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "EZVIZ",
    "priceMZN": 3375.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 3MP POE NETWORK OUTDOOR DOME CAMERA AI POWERD H4 3MP. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ 3MP POE H4",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "ezviz-cs-eb3-sp",
    "sku": "EZVIZ CS-EB3/SP",
    "model": "EZVIZ CS-EB3/SP",
    "name": "3MP SOLAR POWERED WIFI CAMERA",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 6950.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 3MP SOLAR POWERED WIFI CAMERA. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ CS-EB3/SP",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/solar_cam.jpg"
  },
  {
    "id": "ezviz-3mp-solar-cs-eb3",
    "sku": "EZVIZ 3MP SOLAR CS-EB3",
    "model": "EZVIZ 3MP SOLAR CS-EB3",
    "name": "3MP SOLAR POWERED WIFI CAMERA (SEM PAINEL)",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 5200.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 3MP SOLAR POWERED WIFI CAMERA (SEM PAINEL). Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ 3MP SOLAR CS-EB3",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/solar_cam.jpg"
  },
  {
    "id": "ezviz-3mp-eb8-sp",
    "sku": "EZVIZ 3MP EB8/SP",
    "model": "EZVIZ 3MP EB8/SP",
    "name": "3MP SOLAR POWERED WITH SOLAR PAINEL 4G CAMERA EB8/SP",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 12650.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 3MP SOLAR POWERED WITH SOLAR PAINEL 4G CAMERA EB8/SP. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ 3MP EB8/SP",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/solar_cam.jpg"
  },
  {
    "id": "ezviz-h4-3mp",
    "sku": "EZVIZ H4 3MP",
    "model": "EZVIZ H4 3MP",
    "name": "3MP WIFI DOME CAMERA AI POOWERD SIREN",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 3250.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 3MP WIFI DOME CAMERA AI POOWERD SIREN. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ H4 3MP",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "dhi-tpc-aebf5441-t",
    "sku": "DHI-TPC-AEBF5441-T",
    "model": "DHI-TPC-AEBF5441-T",
    "name": "4 MP Thermal Network Explosion-proof Hybrid Bullet Camera Thermal: 400*300 09mm",
    "category": "cctv",
    "subcategory": "Thermal Bullet",
    "brand": "Dahua",
    "priceMZN": 394187.5,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4 MP Thermal Network Explosion-proof Hybrid Bullet Camera Thermal: 400*300 09mm. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-TPC-AEBF5441-T",
      "Categoria": "Thermal Bullet",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/bullet.jpg"
  },
  {
    "id": "pfs4206-4p-96",
    "sku": "PFS4206-4P-96",
    "model": "PFS4206-4P-96",
    "name": "4-Port PoE Managed Switch DH-PFS4206-4P-96",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit POE",
    "brand": "Dahua",
    "priceMZN": 7140.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4-Port PoE Managed Switch DH-PFS4206-4P-96. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "PFS4206-4P-96",
      "Categoria": "Switch Gigabit POE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "dhi-nvr2104hs-p-4ks3",
    "sku": "DHI-NVR2104HS-P-4KS3",
    "model": "DHI-NVR2104HS-P-4KS3",
    "name": "4CH Compact 1U 4PoE 1HDD Lite Network Video Recorder",
    "category": "cctv",
    "subcategory": "NVR IP",
    "brand": "Dahua",
    "priceMZN": 8250.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4CH Compact 1U 4PoE 1HDD Lite Network Video Recorder. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-NVR2104HS-P-4KS3",
      "Categoria": "NVR IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/nvr_16p.jpg"
  },
  {
    "id": "dh-xvr5104hs4kl-13-t",
    "sku": "DH-XVR5104HS4KL-13/T",
    "model": "DH-XVR5104HS4KL-13/T",
    "name": "4CH Penta-brid 4K Value/5MP Compact 1U 1SSD 1TB WizSense Digital Video Recorder",
    "category": "cctv",
    "subcategory": "XVR/DVR",
    "brand": "Dahua",
    "priceMZN": 7840.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4CH Penta-brid 4K Value/5MP Compact 1U 1SSD 1TB WizSense Digital Video Recorder. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-XVR5104HS4KL-13/T",
      "Categoria": "XVR/DVR",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/xvr_wizsense.jpg"
  },
  {
    "id": "ezviz-kit-cs-bw3834-1tb",
    "sku": "EZVIZ KIT CS-BW3834/1TB",
    "model": "EZVIZ KIT CS-BW3834/1TB",
    "name": "4CH WIFI NVR +4H3C 3MP KIT",
    "category": "cctv",
    "subcategory": "NVR IP",
    "brand": "EZVIZ",
    "priceMZN": 21500.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4CH WIFI NVR +4H3C 3MP KIT. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ KIT CS-BW3834/1TB",
      "Categoria": "NVR IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/nvr.jpg"
  },
  {
    "id": "ds-3wr4g3n",
    "sku": "DS-3WR4G3N",
    "model": "DS-3WR4G3N",
    "name": "4G Sim Modem Wifi Router 300Mbps DS-3WR4G3N",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi4 / 4G",
    "brand": "Hikvision",
    "priceMZN": 3100.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4G Sim Modem Wifi Router 300Mbps DS-3WR4G3N. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Hikvision",
      "Modelo": "DS-3WR4G3N",
      "Categoria": "Router Wi-Fi4 / 4G",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "4g03-pro-tenda-4g-sim",
    "sku": "4G03 PRO Tenda 4G SIM",
    "model": "4G03 PRO Tenda 4G SIM",
    "name": "4G03 Pro Tenda 4g SIM Modem Wifi Router N300",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi4 / 4G",
    "brand": "Tenda",
    "priceMZN": 3300.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4G03 Pro Tenda 4g SIM Modem Wifi Router N300. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "4G03 PRO Tenda 4G SIM",
      "Categoria": "Router Wi-Fi4 / 4G",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "4g08-4g-wifi-ac1200",
    "sku": "4G08-4g Wifi AC1200",
    "model": "4G08-4g Wifi AC1200",
    "name": "4G08- Tenda 4g Sim AC1200 Dual Band Wifi",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi4 / 4G",
    "brand": "Tenda",
    "priceMZN": 5500.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4G08- Tenda 4g Sim AC1200 Dual Band Wifi. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "4G08-4g Wifi AC1200",
      "Categoria": "Router Wi-Fi4 / 4G",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "dh-esd41a415-hnr",
    "sku": "DH-ESD41A415-HNR",
    "model": "DH-ESD41A415-HNR",
    "name": "4MP 15X Starlight Non Compensation Light Explosion-proof Camera 15X",
    "category": "cctv",
    "subcategory": "PTZ Explosion Proof",
    "brand": "Dahua",
    "priceMZN": 168862.5,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4MP 15X Starlight Non Compensation Light Explosion-proof Camera 15X. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-ESD41A415-HNR",
      "Categoria": "PTZ Explosion Proof",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_ptz.jpg"
  },
  {
    "id": "ezviz-lc3-ai-powerd",
    "sku": "EZVIZ LC3 AI POWERD",
    "model": "EZVIZ LC3 AI POWERD",
    "name": "4MP 2.4GHZ WIFI OUTOOR WALL LIGHT CAMERA AI POWERED LC3",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 5090.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4MP 2.4GHZ WIFI OUTOOR WALL LIGHT CAMERA AI POWERED LC3. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ LC3 AI POWERD",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "dh-ipc-hdbw2449e-s-il",
    "sku": "DH-IPC HDBW2449E-S-IL",
    "model": "DH-IPC HDBW2449E-S-IL",
    "name": "4MP FIXED FOCAL DOME WIZESENSE",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 5535.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4MP FIXED FOCAL DOME WIZESENSE. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-IPC HDBW2449E-S-IL",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_hdbw1439.jpg"
  },
  {
    "id": "ipc-hfw2441t-zs",
    "sku": "IPC-HFW2441T-ZS",
    "model": "IPC-HFW2441T-ZS",
    "name": "4MP IR Vari-focal Bullet WizSense Network Camera IPC-HFW2441T-ZS",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 15420.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4MP IR Vari-focal Bullet WizSense Network Camera IPC-HFW2441T-ZS. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "IPC-HFW2441T-ZS",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_hfw1439.jpg"
  },
  {
    "id": "ipc-hfw3449t1-zas-pv",
    "sku": "IPC-HFW3449T1-ZAS-PV",
    "model": "IPC-HFW3449T1-ZAS-PV",
    "name": "4MP Smart Dual Light Active Deterrence Vari-focal Bullet WizSense Network Camera IPC-HFW3449T1-ZAS-PV",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 23651.25,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4MP Smart Dual Light Active Deterrence Vari-focal Bullet WizSense Network Camera IPC-HFW3449T1-ZAS-PV. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "IPC-HFW3449T1-ZAS-PV",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_hfw1439.jpg"
  },
  {
    "id": "ezviz-cs-hb8c-sp",
    "sku": "EZVIZ CS-HB8C/SP",
    "model": "EZVIZ CS-HB8C/SP",
    "name": "4MP SOLAR POWERD WIFI CAMERA",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 7850.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4MP SOLAR POWERD WIFI CAMERA. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ CS-HB8C/SP",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/solar_cam.jpg"
  },
  {
    "id": "cs-hb8c-sp-4mp-w4ga",
    "sku": "CS-HB8c/SP (4MP,W4GA)",
    "model": "CS-HB8c/SP (4MP,W4GA)",
    "name": "4MP Solar-powered Wi-Fi + 4G Camera CS-HB8c/SP (4MP,W4GA) ( with Solar )",
    "category": "cctv",
    "subcategory": "Camera 4G Solar",
    "brand": "EZVIZ",
    "priceMZN": 10450.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4MP Solar-powered Wi-Fi + 4G Camera CS-HB8c/SP (4MP,W4GA) ( with Solar ). Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "CS-HB8c/SP (4MP,W4GA)",
      "Categoria": "Camera 4G Solar",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/solar_cam.jpg"
  },
  {
    "id": "ezviz-cs-h3c-4mp",
    "sku": "ezviz cs-h3c 4mp",
    "model": "ezviz cs-h3c 4mp",
    "name": "4mp wifi outdoor camera ezviz cs-h3c 4mp",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 3150.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4mp wifi outdoor camera ezviz cs-h3c 4mp. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "ezviz cs-h3c 4mp",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "eziz-ptz-h8c-4mp",
    "sku": "EZIZ PTZ H8C 4MP",
    "model": "EZIZ PTZ H8C 4MP",
    "name": "4MP WIFI OUTDOOR PTZ",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 3600.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4MP WIFI OUTDOOR PTZ. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZIZ PTZ H8C 4MP",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "teg1105p-4-63w",
    "sku": "TEG1105P-4-63W",
    "model": "TEG1105P-4-63W",
    "name": "4Ports PoE Switch Gigabit 1 × Uplink Gigabit RJ45 port",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit POE",
    "brand": "Tenda",
    "priceMZN": 2200.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 4Ports PoE Switch Gigabit 1 × Uplink Gigabit RJ45 port. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "TEG1105P-4-63W",
      "Categoria": "Switch Gigabit POE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "ax1500-5g01",
    "sku": "AX1500 5G01",
    "model": "AX1500 5G01",
    "name": "5G Sim Modem Wi-Fi6 Router AX1500 5G01",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi6",
    "brand": "Tenda",
    "priceMZN": 13680.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 5G Sim Modem Wi-Fi6 Router AX1500 5G01. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "AX1500 5G01",
      "Categoria": "Router Wi-Fi6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "cpe-o4-kit",
    "sku": "CPE O4-Kit",
    "model": "CPE O4-Kit",
    "name": "5GHz 12dBi 11AC 867Mbps Gigabit 5KM Outdoor CPE O4-Kit",
    "category": "redes_acessorios",
    "subcategory": "CPE",
    "brand": "Tenda",
    "priceMZN": 5940.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 5GHz 12dBi 11AC 867Mbps Gigabit 5KM Outdoor CPE O4-Kit. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "CPE O4-Kit",
      "Categoria": "CPE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/ceiling_ap.jpg"
  },
  {
    "id": "ezviz-h3-5mp",
    "sku": "EZVIZ H3 5MP",
    "model": "EZVIZ H3 5MP",
    "name": "5MP 2.4GHZ WIFI OUTDOOR CAMERA SIREN AND STROBE LITGH",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "EZVIZ",
    "priceMZN": 4350.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 5MP 2.4GHZ WIFI OUTDOOR CAMERA SIREN AND STROBE LITGH. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ H3 5MP",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "ipc-hdbw2549e-s-il",
    "sku": "IPC-HDBW2549E-S-IL",
    "model": "IPC-HDBW2549E-S-IL",
    "name": "5MP DOME VANDALPROOF",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 4920.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 5MP DOME VANDALPROOF. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "IPC-HDBW2549E-S-IL",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_hdbw1439.jpg"
  },
  {
    "id": "ipc-hfw2541s-s",
    "sku": "IPC-HFW2541S-S",
    "model": "IPC-HFW2541S-S",
    "name": "5MP IR Fixed-focal Bullet WizSense Network Camera IPC-HFW2541S-S",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 17500.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 5MP IR Fixed-focal Bullet WizSense Network Camera IPC-HFW2541S-S. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "IPC-HFW2541S-S",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_hfw1439.jpg"
  },
  {
    "id": "tef1106-4-63w",
    "sku": "TEF1106-4-63W",
    "model": "TEF1106-4-63W",
    "name": "6PORT 10/100M DESKTOP SWITCH WITH 4-PORT POE",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit POE",
    "brand": "Tenda",
    "priceMZN": 2200.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 6PORT 10/100M DESKTOP SWITCH WITH 4-PORT POE. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "TEF1106-4-63W",
      "Categoria": "Switch Gigabit POE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "cs-sd7-r100-1wtc",
    "sku": "CS-SD7-R100-1WTC",
    "model": "CS-SD7-R100-1WTC",
    "name": "7-Inch IPS Touch Screen 4.600 mAh Rechargeable Lithium Battery (Type-c) CS-SD7-R100-1WTC",
    "category": "controle_acesso",
    "subcategory": "Video Intercom IP",
    "brand": "EZVIZ",
    "priceMZN": 7200.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 7-Inch IPS Touch Screen 4.600 mAh Rechargeable Lithium Battery (Type-c) CS-SD7-R100-1WTC. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "CS-SD7-R100-1WTC",
      "Categoria": "Video Intercom IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/intercom_ktw02.jpg"
  },
  {
    "id": "dhi-nvr2108hs-4ks3",
    "sku": "DHI-NVR2108HS-4KS3",
    "model": "DHI-NVR2108HS-4KS3",
    "name": "8CH Compact 1U 1HDD Lite Network Video Recorder",
    "category": "cctv",
    "subcategory": "NVR IP",
    "brand": "Dahua",
    "priceMZN": 6550.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 8CH Compact 1U 1HDD Lite Network Video Recorder. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-NVR2108HS-4KS3",
      "Categoria": "NVR IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/nvr.jpg"
  },
  {
    "id": "dhi-nvr2108hs-8p-4ks3",
    "sku": "DHI-NVR2108HS-8P-4KS3",
    "model": "DHI-NVR2108HS-8P-4KS3",
    "name": "8CH Compact 1U 8PoE 1HDD Lite Network Video Recorder",
    "category": "cctv",
    "subcategory": "NVR IP",
    "brand": "Dahua",
    "priceMZN": 11500.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 8CH Compact 1U 8PoE 1HDD Lite Network Video Recorder. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-NVR2108HS-8P-4KS3",
      "Categoria": "NVR IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/nvr_16p.jpg"
  },
  {
    "id": "ezviz-nvr-cs-x5s-r100-8w",
    "sku": "EZVIZ NVR CS-X5S-R100-8W",
    "model": "EZVIZ NVR CS-X5S-R100-8W",
    "name": "8CH WIRELESS NVR WITH HDMI &amp; VGA OUTPUT",
    "category": "cctv",
    "subcategory": "NVR IP",
    "brand": "EZVIZ",
    "priceMZN": 3850.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 8CH WIRELESS NVR WITH HDMI &amp; VGA OUTPUT. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "EZVIZ",
      "Modelo": "EZVIZ NVR CS-X5S-R100-8W",
      "Categoria": "NVR IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/nvr.jpg"
  },
  {
    "id": "pc-hdbw3849f-as-il",
    "sku": "PC-HDBW3849F-AS-IL",
    "model": "PC-HDBW3849F-AS-IL",
    "name": "8MP Smart Dual Light Fixed-focal Dome WizSense Network Camera",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 19797.75,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 8MP Smart Dual Light Fixed-focal Dome WizSense Network Camera. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "PC-HDBW3849F-AS-IL",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_hdbw1439.jpg"
  },
  {
    "id": "teg1110pf-8-120w",
    "sku": "TEG1110PF-8-120W",
    "model": "TEG1110PF-8-120W",
    "name": "8Port PoE + 1Port Sfp + 1Port Ethernet Gigabit Switch",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit POE",
    "brand": "Tenda",
    "priceMZN": 4380.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 8Port PoE + 1Port Sfp + 1Port Ethernet Gigabit Switch. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "TEG1110PF-8-120W",
      "Categoria": "Switch Gigabit POE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "teg2210p-8-120w",
    "sku": "TEG2210P-8-120W",
    "model": "TEG2210P-8-120W",
    "name": "8Ports Poe Cloud Managed Switch TEG2210P-8-120W",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit POE",
    "brand": "Tenda",
    "priceMZN": 4980.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance 8Ports Poe Cloud Managed Switch TEG2210P-8-120W. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "TEG2210P-8-120W",
      "Categoria": "Switch Gigabit POE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "ac650",
    "sku": "AC650",
    "model": "AC650",
    "name": "AC650 Wi-fi Wireless Dual Band Auto-Install USB Adapter",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi5",
    "brand": "Tenda",
    "priceMZN": 1020.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance AC650 Wi-fi Wireless Dual Band Auto-Install USB Adapter. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "AC650",
      "Categoria": "Router Wi-Fi5",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "n300-a9-tenda",
    "sku": "N300 A9 Tenda",
    "model": "N300 A9 Tenda",
    "name": "Access Point indoor Mount Wi-Fi Router Extender A9 N300",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi5",
    "brand": "Tenda",
    "priceMZN": 1450.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Access Point indoor Mount Wi-Fi Router Extender A9 N300. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "N300 A9 Tenda",
      "Categoria": "Router Wi-Fi5",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "n301",
    "sku": "N301",
    "model": "N301",
    "name": "Access Point indoor Wi-Fi Router Extender 300Mbps N301",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi5",
    "brand": "Tenda",
    "priceMZN": 930.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Access Point indoor Wi-Fi Router Extender 300Mbps N301. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "N301",
      "Categoria": "Router Wi-Fi5",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "ax1500-a23-tenda",
    "sku": "AX1500 A23 Tenda",
    "model": "AX1500 A23 Tenda",
    "name": "Access Point indoor Wi-Fi Router Extender Gigabit AX1500 A23 Tenda",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi4",
    "brand": "Tenda",
    "priceMZN": 3009.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Access Point indoor Wi-Fi Router Extender Gigabit AX1500 A23 Tenda. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "AX1500 A23 Tenda",
      "Categoria": "Router Wi-Fi4",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "ax1500-tx2l-pro-tenda",
    "sku": "AX1500 TX2L Pro Tenda",
    "model": "AX1500 TX2L Pro Tenda",
    "name": "Access Point indoor Wi-Fi Router Extender Gigabit AX1500 TX2L Pro Tenda",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi6",
    "brand": "Tenda",
    "priceMZN": 2397.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Access Point indoor Wi-Fi Router Extender Gigabit AX1500 TX2L Pro Tenda. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "AX1500 TX2L Pro Tenda",
      "Categoria": "Router Wi-Fi6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "mw3-2-pack-ac1200-tenda",
    "sku": "MW3(2-pack) AC1200 Tenda",
    "model": "MW3(2-pack) AC1200 Tenda",
    "name": "Access Point indoor Wi-Fi5 Router Extender Gigabit Whole-Home Mesh System NOVA MW3(2-pack)",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi5",
    "brand": "Tenda",
    "priceMZN": 3780.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Access Point indoor Wi-Fi5 Router Extender Gigabit Whole-Home Mesh System NOVA MW3(2-pack). Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "MW3(2-pack) AC1200 Tenda",
      "Categoria": "Router Wi-Fi5",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "mw6-2-pack-ac1200-tenda",
    "sku": "MW6(2-pack) AC1200 Tenda",
    "model": "MW6(2-pack) AC1200 Tenda",
    "name": "Access Point indoor Wi-Fi5 Router Extender Gigabit Whole-Home Mesh System NOVA MW6(2-pack) AC1200 Tenda",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi5",
    "brand": "Tenda",
    "priceMZN": 5610.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Access Point indoor Wi-Fi5 Router Extender Gigabit Whole-Home Mesh System NOVA MW6(2-pack) AC1200 Tenda. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "MW6(2-pack) AC1200 Tenda",
      "Categoria": "Router Wi-Fi5",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "ax3000-tx12-pro-tenda",
    "sku": "AX3000 TX12 Pro Tenda",
    "model": "AX3000 TX12 Pro Tenda",
    "name": "Access Point indoor Wi-Fi6 Router Extender Dual-Band Gigabit AX3000 TX12 Pro Tenda",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi4",
    "brand": "Tenda",
    "priceMZN": 3900.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Access Point indoor Wi-Fi6 Router Extender Dual-Band Gigabit AX3000 TX12 Pro Tenda. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "AX3000 TX12 Pro Tenda",
      "Categoria": "Router Wi-Fi4",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "rx12l-pro-tenda",
    "sku": "RX12L Pro Tenda",
    "model": "RX12L Pro Tenda",
    "name": "Access Point indoor Wi-Fi6 Router Extender Gigabit AX3000 RX12L Pro Tenda",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi6",
    "brand": "Tenda",
    "priceMZN": 3780.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Access Point indoor Wi-Fi6 Router Extender Gigabit AX3000 RX12L Pro Tenda. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "RX12L Pro Tenda",
      "Categoria": "Router Wi-Fi6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "u7-lr",
    "sku": "U7-LR",
    "model": "U7-LR",
    "name": "Access Point UNIFI U7 Long Range | U7-LR",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi6",
    "brand": "Ubiquiti",
    "priceMZN": 29375.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Access Point UNIFI U7 Long Range | U7-LR. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Ubiquiti",
      "Modelo": "U7-LR",
      "Categoria": "Router Wi-Fi6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/ceiling_ap.jpg"
  },
  {
    "id": "u7-outdoor",
    "sku": "U7-Outdoor",
    "model": "U7-Outdoor",
    "name": "Access Point UNIFI U7 Outdoor | U7-Outdoor",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi6",
    "brand": "Ubiquiti",
    "priceMZN": 54375.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Access Point UNIFI U7 Outdoor | U7-Outdoor. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Ubiquiti",
      "Modelo": "U7-Outdoor",
      "Categoria": "Router Wi-Fi6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/ceiling_ap.jpg"
  },
  {
    "id": "ax3000-i29-tenda",
    "sku": "AX3000 I29 TENDA",
    "model": "AX3000 I29 TENDA",
    "name": "Access Point Wi-Fi6  Router indoor Celing Mount Gigabit AX3000 I29",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi6",
    "brand": "Tenda",
    "priceMZN": 7920.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Access Point Wi-Fi6  Router indoor Celing Mount Gigabit AX3000 I29. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "AX3000 I29 TENDA",
      "Categoria": "Router Wi-Fi6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/ceiling_ap.jpg"
  },
  {
    "id": "acm-abs003-125khz",
    "sku": "ACM-ABS003 125Khz",
    "model": "ACM-ABS003 125Khz",
    "name": "ACM-ABS003-EM 125Khz keyfobs key chains",
    "category": "redes_acessorios",
    "subcategory": "keyfob",
    "brand": "HI TECH",
    "priceMZN": 65.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance ACM-ABS003-EM 125Khz keyfobs key chains. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "HI TECH",
      "Modelo": "ACM-ABS003 125Khz",
      "Categoria": "keyfob",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/rfid_card.jpg"
  },
  {
    "id": "dhi-hy-1500-ctxf",
    "sku": "DHI-HY-1500-CTXF",
    "model": "DHI-HY-1500-CTXF",
    "name": "Addressable Sounder Strobe (without base)",
    "category": "alarmes",
    "subcategory": "Addressable Fire Alarm Products",
    "brand": "Dahua",
    "priceMZN": 1980.3,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Addressable Sounder Strobe (without base). Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-HY-1500-CTXF",
      "Categoria": "Addressable Fire Alarm Products",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/smoke_detector.jpg"
  },
  {
    "id": "ap3000-outdoor",
    "sku": "AP3000-Outdoor",
    "model": "AP3000-Outdoor",
    "name": "AP3000-Outdoor-Cudy Router Wifi6 Gigabit Mesh AP3000-Outdoor",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi6",
    "brand": "CUDY",
    "priceMZN": 6878.2,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance AP3000-Outdoor-Cudy Router Wifi6 Gigabit Mesh AP3000-Outdoor. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "CUDY",
      "Modelo": "AP3000-Outdoor",
      "Categoria": "Router Wi-Fi6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/ceiling_ap.jpg"
  },
  {
    "id": "dhi-ara12-w2",
    "sku": "DHI-ARA12-W2",
    "model": "DHI-ARA12-W2",
    "name": "ARA12-W2(915)  Dahua Wireless Siren",
    "category": "cerca_eletrica",
    "subcategory": "Alarm Sem Fio",
    "brand": "Dahua",
    "priceMZN": 2095.5,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance ARA12-W2(915)  Dahua Wireless Siren. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ARA12-W2",
      "Categoria": "Alarm Sem Fio",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/siren.jpg"
  },
  {
    "id": "dhi-asa2212gl-mew",
    "sku": "DHI-ASA2212GL-MEW",
    "model": "DHI-ASA2212GL-MEW",
    "name": "ASA2212GL-MEW Dahua Card Swiping,Password,Fingerprint Attendance Standalone",
    "category": "controle_acesso",
    "subcategory": "Access Control",
    "brand": "Dahua",
    "priceMZN": 4690.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance ASA2212GL-MEW Dahua Card Swiping,Password,Fingerprint Attendance Standalone. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ASA2212GL-MEW",
      "Categoria": "Access Control",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/access.jpg"
  },
  {
    "id": "dhi-asgg121f",
    "sku": "DHI-ASGG121F",
    "model": "DHI-ASGG121F",
    "name": "ASGG1XXF  Dahua Tripod Turnstile",
    "category": "controle_acesso",
    "subcategory": "turnstiletripod",
    "brand": "Dahua",
    "priceMZN": 35500.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance ASGG1XXF  Dahua Tripod Turnstile. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ASGG121F",
      "Categoria": "turnstiletripod",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/turnstile_dahua.jpg"
  },
  {
    "id": "mx3-2-pack-tenda",
    "sku": "MX3 2 PACK TENDA",
    "model": "MX3 2 PACK TENDA",
    "name": "AX1500 WHOLE MESH WIFI6 SYSTEM MX3(2 PACK)",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi6",
    "brand": "Tenda",
    "priceMZN": 7440.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance AX1500 WHOLE MESH WIFI6 SYSTEM MX3(2 PACK). Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "MX3 2 PACK TENDA",
      "Categoria": "Router Wi-Fi6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "dh-ax15m",
    "sku": "DH-AX15M",
    "model": "DH-AX15M",
    "name": "AX1500 Wireless Router",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi6",
    "brand": "Dahua",
    "priceMZN": 2500.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance AX1500 Wireless Router. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-AX15M",
      "Categoria": "Router Wi-Fi6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "dh-ax30",
    "sku": "DH-AX30",
    "model": "DH-AX30",
    "name": "AX3000 WIFI EXTENDER DAHUA",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi6",
    "brand": "Dahua",
    "priceMZN": 3500.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance AX3000 WIFI EXTENDER DAHUA. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-AX30",
      "Categoria": "Router Wi-Fi6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "12u",
    "sku": "12U",
    "model": "12U",
    "name": "BASTIDOR 12U 600 X 600 X 635 Network Rack",
    "category": "redes_acessorios",
    "subcategory": "Bastidor",
    "brand": "Zkteco",
    "priceMZN": 7500.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance BASTIDOR 12U 600 X 600 X 635 Network Rack. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Zkteco",
      "Modelo": "12U",
      "Categoria": "Bastidor",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/rack_zkteco.jpg"
  },
  {
    "id": "zk-r6u-5406a",
    "sku": "ZK R6U 5406A",
    "model": "ZK R6U 5406A",
    "name": "Bastidor 6u 530*400*300 Zk",
    "category": "redes_acessorios",
    "subcategory": "Bastidor",
    "brand": "Zkteco",
    "priceMZN": 5347.5,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Bastidor 6u 530*400*300 Zk. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Zkteco",
      "Modelo": "ZK R6U 5406A",
      "Categoria": "Bastidor",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/rack_zkteco.jpg"
  },
  {
    "id": "zkr9u-5409a",
    "sku": "ZKR9U 5409A",
    "model": "ZKR9U 5409A",
    "name": "Bastidor 9u Size 530*400*540 zk",
    "category": "redes_acessorios",
    "subcategory": "Bastidor",
    "brand": "Zkteco",
    "priceMZN": 5722.5,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Bastidor 9u Size 530*400*540 zk. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Zkteco",
      "Modelo": "ZKR9U 5409A",
      "Categoria": "Bastidor",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/rack_9u.jpg"
  },
  {
    "id": "battery-centurion-12v-7-2a",
    "sku": "BATTERY CENTURION 12V 7.2A",
    "model": "BATTERY CENTURION 12V 7.2A",
    "name": "BATTERY CENTURION 12V 7.2A",
    "category": "controle_acesso",
    "subcategory": "Motor de portao",
    "brand": "Centurion",
    "priceMZN": 2079.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance BATTERY CENTURION 12V 7.2A. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Centurion",
      "Modelo": "BATTERY CENTURION 12V 7.2A",
      "Categoria": "Motor de portao",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Centurion",
    "datasheetAvailable": true,
    "image": "/images/battery_12v.jpg"
  },
  {
    "id": "dh-w-hdmi15m-4k",
    "sku": "DH-W-HDMI15M-4K",
    "model": "DH-W-HDMI15M-4K",
    "name": "CABO HDMI 15M 4K",
    "category": "redes_acessorios",
    "subcategory": "Hdmi Cable",
    "brand": "Dahua",
    "priceMZN": 2400.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance CABO HDMI 15M 4K. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-W-HDMI15M-4K",
      "Categoria": "Hdmi Cable",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cable_hdmi.jpg"
  },
  {
    "id": "centurion-nova-1-channel-receiver-433mhz",
    "sku": "Centurion Nova 1 Channel Receiver 433MHz",
    "model": "Centurion Nova 1 Channel Receiver 433MHz",
    "name": "Centurion Nova 1 Channel Receiver",
    "category": "controle_acesso",
    "subcategory": "Motor de portao",
    "brand": "Centurion",
    "priceMZN": 2268.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Centurion Nova 1 Channel Receiver. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Centurion",
      "Modelo": "Centurion Nova 1 Channel Receiver 433MHz",
      "Categoria": "Motor de portao",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Centurion",
    "datasheetAvailable": true,
    "image": "/images/remote.jpg"
  },
  {
    "id": "o8-tenda",
    "sku": "O8 Tenda",
    "model": "O8 Tenda",
    "name": "CPE Outdoor Wireless 5Ghz 867Mbps 20km P2MP Point-to-Multipoint O8 Tenda",
    "category": "redes_acessorios",
    "subcategory": "CPE",
    "brand": "Tenda",
    "priceMZN": 4500.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance CPE Outdoor Wireless 5Ghz 867Mbps 20km P2MP Point-to-Multipoint O8 Tenda. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Tenda",
      "Modelo": "O8 Tenda",
      "Categoria": "CPE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/ceiling_ap.jpg"
  },
  {
    "id": "ax3000-ap3000-p-cudy",
    "sku": "AX3000 AP3000-P CUDY",
    "model": "AX3000 AP3000-P CUDY",
    "name": "CUDY PONTO DE ACESSO AP DE TETO AX3000",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi6",
    "brand": "CUDY",
    "priceMZN": 7772.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance CUDY PONTO DE ACESSO AP DE TETO AX3000. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "CUDY",
      "Modelo": "AX3000 AP3000-P CUDY",
      "Categoria": "Router Wi-Fi6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia do Fabricante",
    "datasheetAvailable": true,
    "image": "/images/ceiling_ap.jpg"
  },
  {
    "id": "dh-pfm302",
    "sku": "DH-PFM302",
    "model": "DH-PFM302",
    "name": "Dahua 1 channels 12V 2Amp Power Supply ( Outdoor ) DH-PFM302-V2",
    "category": "redes_acessorios",
    "subcategory": "Fonte de Energia",
    "brand": "Dahua",
    "priceMZN": 265.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 1 channels 12V 2Amp Power Supply ( Outdoor ) DH-PFM302-V2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFM302",
      "Categoria": "Fonte de Energia",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/power_supply.jpg"
  },
  {
    "id": "dhi-nvr2216-16-4ks3",
    "sku": "DHI-NVR2216-16-4KS3",
    "model": "DHI-NVR2216-16-4KS3",
    "name": "Dahua 16 Channels  Smart NVR DHI-NVR2216-16-4KS3",
    "category": "cctv",
    "subcategory": "NVR IP",
    "brand": "Dahua",
    "priceMZN": 17888.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 16 Channels  Smart NVR DHI-NVR2216-16-4KS3. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-NVR2216-16-4KS3",
      "Categoria": "NVR IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/nvr.jpg"
  },
  {
    "id": "dhi-nvr2116hs-4ks3",
    "sku": "DHI-NVR2116HS-4KS3",
    "model": "DHI-NVR2116HS-4KS3",
    "name": "Dahua 16 Channels 1080p NVR DHI-NVR2116HS-4KS3",
    "category": "cctv",
    "subcategory": "NVR IP",
    "brand": "Dahua",
    "priceMZN": 7705.6,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 16 Channels 1080p NVR DHI-NVR2116HS-4KS3. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-NVR2116HS-4KS3",
      "Categoria": "NVR IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/nvr.jpg"
  },
  {
    "id": "dh-xvr1b16-i-t",
    "sku": "DH-XVR1B16-I/T",
    "model": "DH-XVR1B16-I/T",
    "name": "Dahua 16 Channels Penta-brid 1080N/720p WizSense DVR/XVR DH-XVR1B16-I/T",
    "category": "cctv",
    "subcategory": "XVR/DVR",
    "brand": "Dahua",
    "priceMZN": 6550.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 16 Channels Penta-brid 1080N/720p WizSense DVR/XVR DH-XVR1B16-I/T. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-XVR1B16-I/T",
      "Categoria": "XVR/DVR",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/xvr_wizsense.jpg"
  },
  {
    "id": "dh-xvr5116h-4kl-i3",
    "sku": "DH-XVR5116H-4KL-I3",
    "model": "DH-XVR5116H-4KL-I3",
    "name": "Dahua 16 Channels Penta-brid 5MP WizSense DVR/XVR DH-XVR5116H-4KL-I3",
    "category": "cctv",
    "subcategory": "XVR/DVR",
    "brand": "Dahua",
    "priceMZN": 20850.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 16 Channels Penta-brid 5MP WizSense DVR/XVR DH-XVR5116H-4KL-I3. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-XVR5116H-4KL-I3",
      "Categoria": "XVR/DVR",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/xvr_wizsense.jpg"
  },
  {
    "id": "dhi-lm22-l200n",
    "sku": "DHI-LM22-L200N",
    "model": "DHI-LM22-L200N",
    "name": "DAHUA 22&quot; MONITOR",
    "category": "cctv",
    "subcategory": "Monitor",
    "brand": "Dahua",
    "priceMZN": 7250.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance DAHUA 22&quot; MONITOR. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-LM22-L200N",
      "Categoria": "Monitor",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/monitor_dahua.jpg"
  },
  {
    "id": "dh-ipc-hfw1239tl1-a-il",
    "sku": "DH-IPC-HFW1239TL1-A-IL",
    "model": "DH-IPC-HFW1239TL1-A-IL",
    "name": "Dahua 2MP Full-color Built-in MIC Audio Bullet Network Camera DH-IPC-HFW1239TL1P-A-IL-0280B",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 3855.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 2MP Full-color Built-in MIC Audio Bullet Network Camera DH-IPC-HFW1239TL1P-A-IL-0280B. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-IPC-HFW1239TL1-A-IL",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_hfw1439.jpg"
  },
  {
    "id": "dh-ipc-hdbw1239e1-a-il",
    "sku": "DH-IPC-HDBW1239E1-A-IL",
    "model": "DH-IPC-HDBW1239E1-A-IL",
    "name": "Dahua 2MP Full-color Built-in MIC Audio Dome Network Camera DH-IPC-HDBW1239E1P-A-IL-0280B-S6",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 3875.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 2MP Full-color Built-in MIC Audio Dome Network Camera DH-IPC-HDBW1239E1P-A-IL-0280B-S6. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-IPC-HDBW1239E1-A-IL",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_hdbw1439.jpg"
  },
  {
    "id": "dh-hac-hfw1209cp-a-led",
    "sku": "DH-HAC-HFW1209CP-A-LED",
    "model": "DH-HAC-HFW1209CP-A-LED",
    "name": "Dahua 2MP Full-color Built-in mic Audio HDCVI Bullet Camera DH-HAC-HFW1209CP-A-LED-0280B-S3",
    "category": "cctv",
    "subcategory": "Camera HDCVI",
    "brand": "Dahua",
    "priceMZN": 1700.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 2MP Full-color Built-in mic Audio HDCVI Bullet Camera DH-HAC-HFW1209CP-A-LED-0280B-S3. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-HAC-HFW1209CP-A-LED",
      "Categoria": "Camera HDCVI",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/bullet.jpg"
  },
  {
    "id": "dh-hac-hdw1209tlqp-a-led",
    "sku": "DH-HAC-HDW1209TLQP-A-LED",
    "model": "DH-HAC-HDW1209TLQP-A-LED",
    "name": "Dahua 2MP Full-color Built-in mic Audio HDCVI Dome Camera DH-HAC-HDW1209TLQP-A-LED",
    "category": "cctv",
    "subcategory": "Camera HDCVI",
    "brand": "Dahua",
    "priceMZN": 1700.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 2MP Full-color Built-in mic Audio HDCVI Dome Camera DH-HAC-HDW1209TLQP-A-LED. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-HAC-HDW1209TLQP-A-LED",
      "Categoria": "Camera HDCVI",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/dome.jpg"
  },
  {
    "id": "dh-hac-me1239thp-a-pv",
    "sku": "DH-HAC-ME1239THP-A-PV",
    "model": "DH-HAC-ME1239THP-A-PV",
    "name": "Dahua 2MP Smart Dual Light Active Deterrence TiOC HDCVI Bullet Camera DH-HAC-ME1239THP-A-PV-0360B-S2",
    "category": "cctv",
    "subcategory": "Camera HDCVI",
    "brand": "Dahua",
    "priceMZN": 3900.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 2MP Smart Dual Light Active Deterrence TiOC HDCVI Bullet Camera DH-HAC-ME1239THP-A-PV-0360B-S2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-HAC-ME1239THP-A-PV",
      "Categoria": "Camera HDCVI",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/bullet.jpg"
  },
  {
    "id": "dh-h3d-3f",
    "sku": "DH-H3D-3F",
    "model": "DH-H3D-3F",
    "name": "Dahua 3+3MP indoor Wi-Fi Dual-Lens Pan &amp; Tilt Camera DH-IPC-H3DP-3F-0360B",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "Dahua",
    "priceMZN": 4335.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 3+3MP indoor Wi-Fi Dual-Lens Pan &amp; Tilt Camera DH-IPC-H3DP-3F-0360B. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-H3D-3F",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "dhi-nvr4232-4ks3",
    "sku": "DHI-NVR4232-4KS3",
    "model": "DHI-NVR4232-4KS3",
    "name": "Dahua 32 Channels 4MP Smart NVR DHI-NVR4232-4KS3",
    "category": "cctv",
    "subcategory": "NVR IP",
    "brand": "Dahua",
    "priceMZN": 14585.6,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 32 Channels 4MP Smart NVR DHI-NVR4232-4KS3. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-NVR4232-4KS3",
      "Categoria": "NVR IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/nvr.jpg"
  },
  {
    "id": "dh-h3a",
    "sku": "DH-H3A",
    "model": "DH-H3A",
    "name": "Dahua 3MP indoor Wi-Fi Pan &amp; Tilt Camera DH-IPC-H3AP-0360B",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "Dahua",
    "priceMZN": 2350.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 3MP indoor Wi-Fi Pan &amp; Tilt Camera DH-IPC-H3AP-0360B. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-H3A",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "dh-f3d-il",
    "sku": "DH-F3D-IL",
    "model": "DH-F3D-IL",
    "name": "Dahua 3MP Outdoor Wi-Fi Bullet",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "Dahua",
    "priceMZN": 3550.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 3MP Outdoor Wi-Fi Bullet. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-F3D-IL",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "dh-c3a",
    "sku": "DH-C3A",
    "model": "DH-C3A",
    "name": "Dahua 3MP Wi-Fi indoor Cube Camera DH-IPC-C3AP-0280B",
    "category": "cctv",
    "subcategory": "Camera Wi-Fi",
    "brand": "Dahua",
    "priceMZN": 1550.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 3MP Wi-Fi indoor Cube Camera DH-IPC-C3AP-0280B. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-C3A",
      "Categoria": "Camera Wi-Fi",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/wifi_smart_cam.jpg"
  },
  {
    "id": "dhi-nvr2104hs-4ks3",
    "sku": "DHI-NVR2104HS-4KS3",
    "model": "DHI-NVR2104HS-4KS3",
    "name": "Dahua 4 Channels  Smart NVR DHI-NVR2104HS-4KS3",
    "category": "cctv",
    "subcategory": "NVR IP",
    "brand": "Dahua",
    "priceMZN": 4280.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 4 Channels  Smart NVR DHI-NVR2104HS-4KS3. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-NVR2104HS-4KS3",
      "Categoria": "NVR IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/nvr.jpg"
  },
  {
    "id": "dh-pfm344d-4ch-en",
    "sku": "DH-PFM344D-4CH-EN",
    "model": "DH-PFM344D-4CH-EN",
    "name": "Dahua 4 channels 12V 4Amp Power Supply DH-PFM344D-4CH-EN-V2",
    "category": "redes_acessorios",
    "subcategory": "Fonte de Energia",
    "brand": "Dahua",
    "priceMZN": 650.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 4 channels 12V 4Amp Power Supply DH-PFM344D-4CH-EN-V2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFM344D-4CH-EN",
      "Categoria": "Fonte de Energia",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/power_supply.jpg"
  },
  {
    "id": "dh-xvr1b04-i-t",
    "sku": "DH-XVR1B04-I/T",
    "model": "DH-XVR1B04-I/T",
    "name": "Dahua 4 Channels Penta-brid 1080N/720p WizSense DVR/XVR DH-XVR1B04-I/T",
    "category": "cctv",
    "subcategory": "XVR/DVR",
    "brand": "Dahua",
    "priceMZN": 3100.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 4 Channels Penta-brid 1080N/720p WizSense DVR/XVR DH-XVR1B04-I/T. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-XVR1B04-I/T",
      "Categoria": "XVR/DVR",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/xvr_wizsense.jpg"
  },
  {
    "id": "dh-mr403",
    "sku": "DH-MR403",
    "model": "DH-MR403",
    "name": "Dahua 4G Wi-Fi4 N300 Router DH-MR403(EU)",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi4 / 4G",
    "brand": "Dahua",
    "priceMZN": 3000.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 4G Wi-Fi4 N300 Router DH-MR403(EU). Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-MR403",
      "Categoria": "Router Wi-Fi4 / 4G",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "dh-sd3d416nb-gny",
    "sku": "DH-SD3D416NB-GNY",
    "model": "DH-SD3D416NB-GNY",
    "name": "Dahua 4MP 16x IR WizSense Network PTZ Camera DH-SD3D416NB-GNY",
    "category": "cctv",
    "subcategory": "Camera PTZ IPC",
    "brand": "Dahua",
    "priceMZN": 22165.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 4MP 16x IR WizSense Network PTZ Camera DH-SD3D416NB-GNY. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-SD3D416NB-GNY",
      "Categoria": "Camera PTZ IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_ptz.jpg"
  },
  {
    "id": "dh-ipc-hfw1439tl1-a-il",
    "sku": "DH-IPC-HFW1439TL1-A-IL",
    "model": "DH-IPC-HFW1439TL1-A-IL",
    "name": "Dahua 4MP Full-color Built-in MIC Audio Bullet Network Camera DH-IPC-HFW1439TL1P-A-IL-0280B",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 4820.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 4MP Full-color Built-in MIC Audio Bullet Network Camera DH-IPC-HFW1439TL1P-A-IL-0280B. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-IPC-HFW1439TL1-A-IL",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_hfw1439.jpg"
  },
  {
    "id": "dh-ipc-hdbw1439e1-a-il",
    "sku": "DH-IPC-HDBW1439E1-A-IL",
    "model": "DH-IPC-HDBW1439E1-A-IL",
    "name": "Dahua 4MP Full-color Built-in MIC Audio Dome Network Camera DH-IPC-HDBW1439E1P-A-IL-0280B-S6",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 4820.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 4MP Full-color Built-in MIC Audio Dome Network Camera DH-IPC-HDBW1439E1P-A-IL-0280B-S6. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-IPC-HDBW1439E1-A-IL",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_hdbw1439.jpg"
  },
  {
    "id": "dh-ipc-hfw2449t-zas-il",
    "sku": "DH-IPC-HFW2449T-ZAS-IL",
    "model": "DH-IPC-HFW2449T-ZAS-IL",
    "name": "Dahua 4MP Smart Dual Light Vari-focal Bullet WizSense Network Camera DH-IPC-HFW2449TP-ZAS-IL-27135",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 15150.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 4MP Smart Dual Light Vari-focal Bullet WizSense Network Camera DH-IPC-HFW2449TP-ZAS-IL-27135. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-IPC-HFW2449T-ZAS-IL",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cam_hfw1439.jpg"
  },
  {
    "id": "dh-ipc-hdw2449t-zs-il",
    "sku": "DH-IPC-HDW2449T-ZS-IL",
    "model": "DH-IPC-HDW2449T-ZS-IL",
    "name": "Dahua 4MP Smart Dual Light Vari-focal Dome WizSense Network Camera DH-IPC-HDW2449TP-ZS-IL-27135",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 14175.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 4MP Smart Dual Light Vari-focal Dome WizSense Network Camera DH-IPC-HDW2449TP-ZS-IL-27135. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-IPC-HDW2449T-ZS-IL",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/dome.jpg"
  },
  {
    "id": "dh-ipc-hdw2449t-s-pro",
    "sku": "DH-IPC-HDW2449T-S-PRO",
    "model": "DH-IPC-HDW2449T-S-PRO",
    "name": "Dahua 4MP WizColor Built-in MIC Audio Dome WizSense Network Camera DH-IPC-HDW2449T-S-LED-0360B-PRO",
    "category": "cctv",
    "subcategory": "Camera IPC",
    "brand": "Dahua",
    "priceMZN": 6604.8,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 4MP WizColor Built-in MIC Audio Dome WizSense Network Camera DH-IPC-HDW2449T-S-LED-0360B-PRO. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-IPC-HDW2449T-S-PRO",
      "Categoria": "Camera IPC",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/dome.jpg"
  },
  {
    "id": "dh-hac-hfw1509cp-a-led",
    "sku": "DH-HAC-HFW1509CP-A-LED",
    "model": "DH-HAC-HFW1509CP-A-LED",
    "name": "Dahua 5MP Full-color Built-in mic Audio HDCVI Bullet Camera DH-HAC-HFW1509CP-A-LED-0280B-S3",
    "category": "cctv",
    "subcategory": "Camera HDCVI",
    "brand": "Dahua",
    "priceMZN": 3650.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 5MP Full-color Built-in mic Audio HDCVI Bullet Camera DH-HAC-HFW1509CP-A-LED-0280B-S3. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-HAC-HFW1509CP-A-LED",
      "Categoria": "Camera HDCVI",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/bullet.jpg"
  },
  {
    "id": "dh-hac-hdw1509tlqp-a-led",
    "sku": "DH-HAC-HDW1509TLQP-A-LED",
    "model": "DH-HAC-HDW1509TLQP-A-LED",
    "name": "Dahua 5MP Full-color Built-in mic Audio HDCVI Dome Camera DH-HAC-HDW1509TLQP-A-LED-0280B-S3",
    "category": "cctv",
    "subcategory": "Camera HDCVI",
    "brand": "Dahua",
    "priceMZN": 3750.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 5MP Full-color Built-in mic Audio HDCVI Dome Camera DH-HAC-HDW1509TLQP-A-LED-0280B-S3. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-HAC-HDW1509TLQP-A-LED",
      "Categoria": "Camera HDCVI",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/dome.jpg"
  },
  {
    "id": "dh-pfs3005-5gt",
    "sku": "DH-PFS3005-5GT",
    "model": "DH-PFS3005-5GT",
    "name": "Dahua 5Ports Desktop Gigabit Ethernet Switch DH-PFS3005-5GT-V2",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit Ethernet",
    "brand": "Dahua",
    "priceMZN": 770.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 5Ports Desktop Gigabit Ethernet Switch DH-PFS3005-5GT-V2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFS3005-5GT",
      "Categoria": "Switch Gigabit Ethernet",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "dh-pfm344d-8ch-en",
    "sku": "DH-PFM344D-8CH-EN",
    "model": "DH-PFM344D-8CH-EN",
    "name": "Dahua 8 channels 12V 8Amp Power Supply DH-PFM344D-8CH-EN-V2",
    "category": "redes_acessorios",
    "subcategory": "Fonte de Energia",
    "brand": "Dahua",
    "priceMZN": 850.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 8 channels 12V 8Amp Power Supply DH-PFM344D-8CH-EN-V2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFM344D-8CH-EN",
      "Categoria": "Fonte de Energia",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/power_supply.jpg"
  },
  {
    "id": "dh-xvr1b08-i-t",
    "sku": "DH-XVR1B08-I/T",
    "model": "DH-XVR1B08-I/T",
    "name": "Dahua 8 Channels Penta-brid 1080N/720p WizSense DVR/XVR DH-XVR1B08-I/T",
    "category": "cctv",
    "subcategory": "XVR/DVR",
    "brand": "Dahua",
    "priceMZN": 3800.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 8 Channels Penta-brid 1080N/720p WizSense DVR/XVR DH-XVR1B08-I/T. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-XVR1B08-I/T",
      "Categoria": "XVR/DVR",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/xvr_wizsense.jpg"
  },
  {
    "id": "dh-xvr5108hs-4kl-i3",
    "sku": "DH-XVR5108HS-4KL-I3",
    "model": "DH-XVR5108HS-4KL-I3",
    "name": "Dahua 8 Channels Penta-brid 5MP WizSense DVR/XVR DH-XVR5108HS-4KL-I3",
    "category": "cctv",
    "subcategory": "XVR/DVR",
    "brand": "Dahua",
    "priceMZN": 11295.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 8 Channels Penta-brid 5MP WizSense DVR/XVR DH-XVR5108HS-4KL-I3. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-XVR5108HS-4KL-I3",
      "Categoria": "XVR/DVR",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/xvr_wizsense.jpg"
  },
  {
    "id": "dh-pfs3008-8gt",
    "sku": "DH-PFS3008-8GT",
    "model": "DH-PFS3008-8GT",
    "name": "Dahua 8Ports Desktop Gigabit Ethernet Switch DH-PFS3008-8GT-V2",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit Ethernet",
    "brand": "Dahua",
    "priceMZN": 1090.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua 8Ports Desktop Gigabit Ethernet Switch DH-PFS3008-8GT-V2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFS3008-8GT",
      "Categoria": "Switch Gigabit Ethernet",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "dh-pfm976-bncq9p",
    "sku": "DH-PFM976-BNCQ9P",
    "model": "DH-PFM976-BNCQ9P",
    "name": "Dahua BNC Connector DH-PFM976-BNCQ9P",
    "category": "redes_acessorios",
    "subcategory": "Connectros",
    "brand": "Dahua",
    "priceMZN": 20.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua BNC Connector DH-PFM976-BNCQ9P. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFM976-BNCQ9P",
      "Categoria": "Connectros",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/bnc_dc_connectors.jpg"
  },
  {
    "id": "dhi-asi1212m-p",
    "sku": "DHI-ASI1212M-P",
    "model": "DHI-ASI1212M-P",
    "name": "Dahua Card Swiping,Password,Fingerprint Access Controller Standalone DHI-ASI1212M-P",
    "category": "controle_acesso",
    "subcategory": "Access Control",
    "brand": "Dahua",
    "priceMZN": 8275.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Card Swiping,Password,Fingerprint Access Controller Standalone DHI-ASI1212M-P. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ASI1212M-P",
      "Categoria": "Access Control",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/access.jpg"
  },
  {
    "id": "dh-pfm976-631",
    "sku": "DH-PFM976-631",
    "model": "DH-PFM976-631",
    "name": "Dahua CAT6 RJ45 Connector DH-PFM976-631-V2",
    "category": "redes_acessorios",
    "subcategory": "Connectros",
    "brand": "Dahua",
    "priceMZN": 7.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua CAT6 RJ45 Connector DH-PFM976-631-V2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFM976-631",
      "Categoria": "Connectros",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cable_cat6.jpg"
  },
  {
    "id": "dh-pfm941i-rg59n-21-100",
    "sku": "DH-PFM941I-RG59N/21-100",
    "model": "DH-PFM941I-RG59N/21-100",
    "name": "Dahua Coaxial Cable with Power cable (2c) 100 Meters DH-PFM941I-RG59N/21-100",
    "category": "redes_acessorios",
    "subcategory": "Cabo Coxial",
    "brand": "Dahua",
    "priceMZN": 1600.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Coaxial Cable with Power cable (2c) 100 Meters DH-PFM941I-RG59N/21-100. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFM941I-RG59N/21-100",
      "Categoria": "Cabo Coxial",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cable_coaxial.jpg"
  },
  {
    "id": "dh-pfm979-dcp",
    "sku": "DH-PFM979-DCP",
    "model": "DH-PFM979-DCP",
    "name": "Dahua DC 12V ( PSU ) Connector DH-PFM979-DCP",
    "category": "redes_acessorios",
    "subcategory": "Connectros",
    "brand": "Dahua",
    "priceMZN": 20.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua DC 12V ( PSU ) Connector DH-PFM979-DCP. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFM979-DCP",
      "Categoria": "Connectros",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/bnc_dc_connectors.jpg"
  },
  {
    "id": "dhi-asf280b-v1",
    "sku": "DHI-ASF280B-V1",
    "model": "DHI-ASF280B-V1",
    "name": "Dahua Double Door Magnetic Lock 280Kg DHI-ASF280B-V2",
    "category": "controle_acesso",
    "subcategory": "Access Control Accessories",
    "brand": "Dahua",
    "priceMZN": 3852.8,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Double Door Magnetic Lock 280Kg DHI-ASF280B-V2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ASF280B-V1",
      "Categoria": "Access Control Accessories",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/magnetic_lock.jpg"
  },
  {
    "id": "dhi-asi6214s",
    "sku": "DHI-ASI6214S",
    "model": "DHI-ASI6214S",
    "name": "Dahua Face Recognition Access Controller DHI-ASI6214S",
    "category": "controle_acesso",
    "subcategory": "Access Control",
    "brand": "Dahua",
    "priceMZN": 15550.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Face Recognition Access Controller DHI-ASI6214S. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ASI6214S",
      "Categoria": "Access Control",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/facial_asi6214s.jpg"
  },
  {
    "id": "dhi-lm19-l200n",
    "sku": "DHI-LM19-L200N",
    "model": "DHI-LM19-L200N",
    "name": "Dahua Monitor 19.5&quot; VGA×1, HDMI×1 DHI-LM19-L200-V1",
    "category": "cctv",
    "subcategory": "Monitor",
    "brand": "Dahua",
    "priceMZN": 6000.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Monitor 19.5&quot; VGA×1, HDMI×1 DHI-LM19-L200-V1. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-LM19-L200N",
      "Categoria": "Monitor",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/monitor_dahua.jpg"
  },
  {
    "id": "dhi-lm32-f200",
    "sku": "DHI-LM32-F200",
    "model": "DHI-LM32-F200",
    "name": "Dahua Monitor 32&quot; VGA×1, HDMI×1 DHI-LM32-L200-V2",
    "category": "cctv",
    "subcategory": "Monitor",
    "brand": "Dahua",
    "priceMZN": 14950.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Monitor 32&quot; VGA×1, HDMI×1 DHI-LM32-L200-V2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-LM32-F200",
      "Categoria": "Monitor",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/monitor_dahua.jpg"
  },
  {
    "id": "dhi-asa1222e-s",
    "sku": "DHI-ASA1222E-S",
    "model": "DHI-ASA1222E-S",
    "name": "Dahua Password,Fingerprint Time Attendance standalone DHI-ASA1222E-S",
    "category": "controle_acesso",
    "subcategory": "Time Attendance",
    "brand": "Dahua",
    "priceMZN": 3600.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Password,Fingerprint Time Attendance standalone DHI-ASA1222E-S. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ASA1222E-S",
      "Categoria": "Time Attendance",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/biometric_keypad.jpg"
  },
  {
    "id": "dh-pfa12a",
    "sku": "DH-PFA12A",
    "model": "DH-PFA12A",
    "name": "Dahua Plastic Junction Box ( Wall ) DH-PFA12A",
    "category": "redes_acessorios",
    "subcategory": "Junction Box",
    "brand": "Dahua",
    "priceMZN": 150.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Plastic Junction Box ( Wall ) DH-PFA12A. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFA12A",
      "Categoria": "Junction Box",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/junction_box.jpg"
  },
  {
    "id": "dh-s3220-16gt-190",
    "sku": "DH-S3220-16GT-190",
    "model": "DH-S3220-16GT-190",
    "name": "Dahua POE Switch 16 × RJ-45 Gigabit (PoE) ports, 2 × RJ-45 Gigabit (uplink) ports and 2 ×  SFP Gigabit (uplink) ports DH-S3220-16GT-190",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit POE",
    "brand": "Dahua",
    "priceMZN": 10400.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua POE Switch 16 × RJ-45 Gigabit (PoE) ports, 2 × RJ-45 Gigabit (uplink) ports and 2 ×  SFP Gigabit (uplink) ports DH-S3220-16GT-190. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-S3220-16GT-190",
      "Categoria": "Switch Gigabit POE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "dh-s3228-24gt-240",
    "sku": "DH-S3228-24GT-240",
    "model": "DH-S3228-24GT-240",
    "name": "Dahua POE Switch 24 × RJ-45 Gigabit (PoE) ports, 2 × RJ-45 Gigabit (uplink) ports and 2 ×  SFP Gigabit (uplink) ports DH-S3228-24GT-240",
    "category": "redes_acessorios",
    "subcategory": "Switch Gigabit POE",
    "brand": "Dahua",
    "priceMZN": 12510.4,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua POE Switch 24 × RJ-45 Gigabit (PoE) ports, 2 × RJ-45 Gigabit (uplink) ports and 2 ×  SFP Gigabit (uplink) ports DH-S3228-24GT-240. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-S3228-24GT-240",
      "Categoria": "Switch Gigabit POE",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/switch_poe.jpg"
  },
  {
    "id": "dhi-asf280a-v1",
    "sku": "DHI-ASF280A-V1",
    "model": "DHI-ASF280A-V1",
    "name": "Dahua Single Door Magnetic Lock 280Kg DHI-ASF280A-V1",
    "category": "controle_acesso",
    "subcategory": "Access Control Accessories",
    "brand": "Dahua",
    "priceMZN": 2450.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Single Door Magnetic Lock 280Kg DHI-ASF280A-V1. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ASF280A-V1",
      "Categoria": "Access Control Accessories",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/magnetic_lock.jpg"
  },
  {
    "id": "dh-pfm922i-6un-c",
    "sku": "DH-PFM922I-6UN-C",
    "model": "DH-PFM922I-6UN-C",
    "name": "Dahua UTP Cat6 305 Meters 23AWG 0.57 mm ± 0.01 mm CCA(Copper content 22%–31%) DH-PFM922I-6UN-C-blue",
    "category": "redes_acessorios",
    "subcategory": "Cabo UTP Cat6",
    "brand": "Dahua",
    "priceMZN": 4950.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua UTP Cat6 305 Meters 23AWG 0.57 mm ± 0.01 mm CCA(Copper content 22%–31%) DH-PFM922I-6UN-C-blue. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFM922I-6UN-C",
      "Categoria": "Cabo UTP Cat6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cable_cat6.jpg"
  },
  {
    "id": "dh-pfm920i-6un-c",
    "sku": "DH-PFM920I-6UN-C",
    "model": "DH-PFM920I-6UN-C",
    "name": "Dahua UTP Cat6 305 Meters 23AWG 0.57 mm ± 0.01 mm High-purity oxygen-free 99.99% copper conductor DH-PFM920I-6UN-C-orange",
    "category": "redes_acessorios",
    "subcategory": "Cabo UTP Cat6",
    "brand": "Dahua",
    "priceMZN": 11835.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua UTP Cat6 305 Meters 23AWG 0.57 mm ± 0.01 mm High-purity oxygen-free 99.99% copper conductor DH-PFM920I-6UN-C-orange. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFM920I-6UN-C",
      "Categoria": "Cabo UTP Cat6",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/cable_cat6.jpg"
  },
  {
    "id": "dhi-ktw02",
    "sku": "DHI-KTW02",
    "model": "DHI-KTW02",
    "name": "Dahua Video Intercom Kit Wi-Fi IP DHI-KTW02",
    "category": "controle_acesso",
    "subcategory": "Video Intercom IP",
    "brand": "Dahua",
    "priceMZN": 16550.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Video Intercom Kit Wi-Fi IP DHI-KTW02. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-KTW02",
      "Categoria": "Video Intercom IP",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/intercom_ktw02.jpg"
  },
  {
    "id": "dh-n3",
    "sku": "DH-N3",
    "model": "DH-N3",
    "name": "Dahua Wi-Fi4 Router N300 DH-N3(DE)",
    "category": "redes_acessorios",
    "subcategory": "Router Wi-Fi4",
    "brand": "Dahua",
    "priceMZN": 895.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Wi-Fi4 Router N300 DH-N3(DE). Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-N3",
      "Categoria": "Router Wi-Fi4",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/router_wifi.jpg"
  },
  {
    "id": "dhi-art-arc3800h-03-fw2",
    "sku": "DHI-ART-ARC3800H-03-FW2",
    "model": "DHI-ART-ARC3800H-03-FW2",
    "name": "Dahua Wireless 4G Alarm KIT DHI-ART-ARC3800H-03-FW2",
    "category": "alarmes",
    "subcategory": "Alarm Sem Fio",
    "brand": "Dahua",
    "priceMZN": 19745.6,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Wireless 4G Alarm KIT DHI-ART-ARC3800H-03-FW2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ART-ARC3800H-03-FW2",
      "Categoria": "Alarm Sem Fio",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/alarm_airshield.jpg"
  },
  {
    "id": "dhi-arc3800h-fw2",
    "sku": "DHI-ARC3800H-FW2",
    "model": "DHI-ARC3800H-FW2",
    "name": "Dahua Wireless Alarm Hub 2 4G Model）",
    "category": "alarmes",
    "subcategory": "Alarm Sem Fio",
    "brand": "Dahua",
    "priceMZN": 10480.8,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Wireless Alarm Hub 2 4G Model）. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ARC3800H-FW2",
      "Categoria": "Alarm Sem Fio",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/alarm_airshield.jpg"
  },
  {
    "id": "dhi-ard333-w2",
    "sku": "DHI-ARD333-W2",
    "model": "DHI-ARD333-W2",
    "name": "Dahua Wireless door detector ARD333",
    "category": "alarmes",
    "subcategory": "Equipamentos",
    "brand": "Dahua",
    "priceMZN": 1500.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Wireless door detector ARD333. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ARD333-W2",
      "Categoria": "Equipamentos",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/pir_detector.jpg"
  },
  {
    "id": "dhi-ard2231-w2",
    "sku": "DHI-ARD2231-W2",
    "model": "DHI-ARD2231-W2",
    "name": "Dahua Wireless Dual-Tech PIR Detector DHI-ARD2231-W2",
    "category": "alarmes",
    "subcategory": "Alarm Sem Fio",
    "brand": "Dahua",
    "priceMZN": 3575.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Wireless Dual-Tech PIR Detector DHI-ARD2231-W2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ARD2231-W2",
      "Categoria": "Alarm Sem Fio",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/pir_detector.jpg"
  },
  {
    "id": "dhi-ara13-w2",
    "sku": "DHI-ARA13-W2",
    "model": "DHI-ARA13-W2",
    "name": "Dahua Wireless outdoor siren DHI-ARA13-W2",
    "category": "cerca_eletrica",
    "subcategory": "Alarm Sem Fio",
    "brand": "Dahua",
    "priceMZN": 4850.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua Wireless outdoor siren DHI-ARA13-W2. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ARA13-W2",
      "Categoria": "Alarm Sem Fio",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/siren.jpg"
  },
  {
    "id": "dhi-asf280zl-v1",
    "sku": "DHI-ASF280ZL-V1",
    "model": "DHI-ASF280ZL-V1",
    "name": "Dahua ZL Magnetic Lock Supprt Baracket 280Kg DHI-ASF280ZL-V1",
    "category": "controle_acesso",
    "subcategory": "Access Control Accessories",
    "brand": "Dahua",
    "priceMZN": 688.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Dahua ZL Magnetic Lock Supprt Baracket 280Kg DHI-ASF280ZL-V1. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DHI-ASF280ZL-V1",
      "Categoria": "Access Control Accessories",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/magnetic_lock.jpg"
  },
  {
    "id": "e-m18s-v1",
    "sku": "E-M18S/V1",
    "model": "E-M18S/V1",
    "name": "E-M18S/V1 Merlin Stealth M18S Energizer",
    "category": "cerca_eletrica",
    "subcategory": "fence",
    "brand": "Nemtek",
    "priceMZN": 23976.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance E-M18S/V1 Merlin Stealth M18S Energizer. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Nemtek",
      "Modelo": "E-M18S/V1",
      "Categoria": "fence",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Nemtek",
    "datasheetAvailable": true,
    "image": "/images/energizer.jpg"
  },
  {
    "id": "38689039940",
    "sku": "38689039940",
    "model": "38689039940",
    "name": "E-WIZ4I Wizord 4i",
    "category": "cerca_eletrica",
    "subcategory": "fence",
    "brand": "Nemtek",
    "priceMZN": 13737.6,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance E-WIZ4I Wizord 4i. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Nemtek",
      "Modelo": "38689039940",
      "Categoria": "fence",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Nemtek",
    "datasheetAvailable": true,
    "image": "/images/energizer.jpg"
  },
  {
    "id": "esqj-6hdba-s",
    "sku": "ESQJ-6HDBA/S",
    "model": "ESQJ-6HDBA/S",
    "name": "ESQJ-6HDBA/S 6 Wire Square Tube Jurassic Bracket HDG with Black Slotted Bobbin Angled",
    "category": "cerca_eletrica",
    "subcategory": "fence",
    "brand": "Nemtek",
    "priceMZN": 410.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance ESQJ-6HDBA/S 6 Wire Square Tube Jurassic Bracket HDG with Black Slotted Bobbin Angled. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Nemtek",
      "Modelo": "ESQJ-6HDBA/S",
      "Categoria": "fence",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Nemtek",
    "datasheetAvailable": true,
    "image": "/images/fence.jpg"
  },
  {
    "id": "ew-ss12-316-7",
    "sku": "EW-SS12/316/7",
    "model": "EW-SS12/316/7",
    "name": "EW-SS12/316/7 1.2mm 316 Solid Stainless Steel Wire 770m (Arame)",
    "category": "cerca_eletrica",
    "subcategory": "fence",
    "brand": "Nemtek",
    "priceMZN": 6300.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance EW-SS12/316/7 1.2mm 316 Solid Stainless Steel Wire 770m (Arame). Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Nemtek",
      "Modelo": "EW-SS12/316/7",
      "Categoria": "fence",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Nemtek",
    "datasheetAvailable": true,
    "image": "/images/wire_spool.jpg"
  },
  {
    "id": "d10-smart-24v-dc-sliding-doors",
    "sku": "D10 smart 24v Dc sliding doors",
    "model": "D10 smart 24v Dc sliding doors",
    "name": "Motor de portao D10 Smart 24v dc sliding gate operator kit",
    "category": "controle_acesso",
    "subcategory": "Motor de portao",
    "brand": "Centurion",
    "priceMZN": 58486.56,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Motor de portao D10 Smart 24v dc sliding gate operator kit. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Centurion",
      "Modelo": "D10 smart 24v Dc sliding doors",
      "Categoria": "Motor de portao",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Centurion",
    "datasheetAvailable": true,
    "image": "/images/gate_motor.jpg"
  },
  {
    "id": "d5-evo-smart-12v-dc-sliding-doors",
    "sku": "D5 EVO SMART 12V DC SLIDING DOORS",
    "model": "D5 EVO SMART 12V DC SLIDING DOORS",
    "name": "Motor de portao D5 EVO SMART 12V DC SLIDING DOORS",
    "category": "controle_acesso",
    "subcategory": "Motor de portao",
    "brand": "Centurion",
    "priceMZN": 29862.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Motor de portao D5 EVO SMART 12V DC SLIDING DOORS. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Centurion",
      "Modelo": "D5 EVO SMART 12V DC SLIDING DOORS",
      "Categoria": "Motor de portao",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Centurion",
    "datasheetAvailable": true,
    "image": "/images/centurion_d5.jpg"
  },
  {
    "id": "ew-al16",
    "sku": "EW-AL16",
    "model": "EW-AL16",
    "name": "NEEK Aluminum Wire 1.6mm 1000m 6.25 Kg",
    "category": "cerca_eletrica",
    "subcategory": "fence",
    "brand": "Nemtek",
    "priceMZN": 4147.2,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance NEEK Aluminum Wire 1.6mm 1000m 6.25 Kg. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Nemtek",
      "Modelo": "EW-AL16",
      "Categoria": "fence",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Nemtek",
    "datasheetAvailable": true,
    "image": "/images/wire_spool.jpg"
  },
  {
    "id": "sr-30",
    "sku": "SR-30",
    "model": "SR-30",
    "name": "NEEK Siren - 30W -12V DV",
    "category": "cerca_eletrica",
    "subcategory": "fence",
    "brand": "Nemtek",
    "priceMZN": 1750.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance NEEK Siren - 30W -12V DV. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Nemtek",
      "Modelo": "SR-30",
      "Categoria": "fence",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Nemtek",
    "datasheetAvailable": true,
    "image": "/images/siren.jpg"
  },
  {
    "id": "esqj-6hdbs-s",
    "sku": "ESQJ-6HDBS/S",
    "model": "ESQJ-6HDBS/S",
    "name": "NEEK SQ Tube - Jur 6 Line Galvanised Straight",
    "category": "cerca_eletrica",
    "subcategory": "fence",
    "brand": "Nemtek",
    "priceMZN": 422.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance NEEK SQ Tube - Jur 6 Line Galvanised Straight. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Nemtek",
      "Modelo": "ESQJ-6HDBS/S",
      "Categoria": "fence",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Nemtek",
    "datasheetAvailable": true,
    "image": "/images/fence.jpg"
  },
  {
    "id": "ea-wrs2-n",
    "sku": "EA-WRS2/N",
    "model": "EA-WRS2/N",
    "name": "NEEK Warning Sign - Yellow",
    "category": "cerca_eletrica",
    "subcategory": "fence",
    "brand": "Nemtek",
    "priceMZN": 80.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance NEEK Warning Sign - Yellow. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Nemtek",
      "Modelo": "EA-WRS2/N",
      "Categoria": "fence",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Nemtek",
    "datasheetAvailable": true,
    "image": "/images/fence.jpg"
  },
  {
    "id": "dh-pfm3350-1000",
    "sku": "DH-PFM3350-1000",
    "model": "DH-PFM3350-1000",
    "name": "PFM3350-1000  European Standard 230V - Line-interactive 1000VA/600W Uninterruptible Power Supply",
    "category": "redes_acessorios",
    "subcategory": "UPS",
    "brand": "Dahua",
    "priceMZN": 2715.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance PFM3350-1000  European Standard 230V - Line-interactive 1000VA/600W Uninterruptible Power Supply. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Dahua",
      "Modelo": "DH-PFM3350-1000",
      "Categoria": "UPS",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Oficial Dahua",
    "datasheetAvailable": true,
    "image": "/images/ups_dahua.png"
  },
  {
    "id": "wd10purx-78",
    "sku": "WD10PURX-78",
    "model": "WD10PURX-78",
    "name": "Surveillance HDD Disco Rigido 1TB WD PURPLE WD10PURX-78",
    "category": "redes_acessorios",
    "subcategory": "Disco HDD",
    "brand": "Western Digital",
    "priceMZN": 7700.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Surveillance HDD Disco Rigido 1TB WD PURPLE WD10PURX-78. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Western Digital",
      "Modelo": "WD10PURX-78",
      "Categoria": "Disco HDD",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Western Digital",
    "datasheetAvailable": true,
    "image": "/images/hdd.jpg"
  },
  {
    "id": "wd20purx-78",
    "sku": "WD20PURX-78",
    "model": "WD20PURX-78",
    "name": "Surveillance HDD Disco Rigido 2TB WD PURPLE WD20PURX-78",
    "category": "redes_acessorios",
    "subcategory": "Disco HDD",
    "brand": "Western Digital",
    "priceMZN": 10440.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Surveillance HDD Disco Rigido 2TB WD PURPLE WD20PURX-78. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Western Digital",
      "Modelo": "WD20PURX-78",
      "Categoria": "Disco HDD",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Western Digital",
    "datasheetAvailable": true,
    "image": "/images/hdd.jpg"
  },
  {
    "id": "wd40purx-78",
    "sku": "WD40PURX-78",
    "model": "WD40PURX-78",
    "name": "Surveillance HDD Disco Rigido 4TB WD PURPLE WD40PURX-78",
    "category": "redes_acessorios",
    "subcategory": "Disco HDD",
    "brand": "Western Digital",
    "priceMZN": 22000.0,
    "stockQty": 10,
    "inStock": true,
    "stockStatus": "Em Stock",
    "description": "Equipamento profissional de alta performance Surveillance HDD Disco Rigido 4TB WD PURPLE WD40PURX-78. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
    "highlights": [
      "Pronta Entrega em Maputo",
      "100% Original Homologado",
      "Faturação com NUIT"
    ],
    "specs": {
      "Marca": "Western Digital",
      "Modelo": "WD40PURX-78",
      "Categoria": "Disco HDD",
      "Origem": "Distribuição Oficial Moçambique"
    },
    "popular": false,
    "warranty": "Garantia Western Digital",
    "datasheetAvailable": true,
    "image": "/images/hdd.jpg"
  }
];

export const CATEGORIES_META = [
  {
    id: 'todos',
    name: 'Todo o Catálogo',
    description: 'Catálogo completo de equipamentos e segurança em estoque na TECHSOL',
  },
  {
    id: 'cctv',
    name: 'CFTV & Câmeras',
    description: 'Câmeras IP PoE, Full-Color, gravadores NVR e XVR Dahua',
  },
  {
    id: 'cerca_eletrica',
    name: 'Cercas Nemtek',
    description: 'Eletrificadores Wizord e Druid, arames de alumínio e sirenes 30W',
  },
  {
    id: 'alarmes',
    name: 'Alarmes AirShield',
    description: 'Centrais sem fios 4G, sensores PIR e sirenes de alarme',
  },
  {
    id: 'controle_acesso',
    name: 'Acesso & Motores',
    description: 'Reconhecimento facial Dahua, motores Centurion e Gemini, videoporteiros',
  },
  {
    id: 'redes_acessorios',
    name: 'Switches, Cabos & Racks',
    description: 'Switches PoE, Routers Wi-Fi, Racks 6U/9U, Cabos Cat6 e Discos WD Purple',
  },
];

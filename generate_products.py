import csv, json, re, html

def clean_category(cat_str, name):
    c = cat_str.lower()
    n = name.lower()
    if any(k in c or k in n for k in ['nvr', 'xvr', 'dvr', 'camera', 'cctv', 'ptz', 'ipc', 'hdcvi', 'thermal', 'speed dome', 'dashcam', 'video wall', 'monitor']):
        return 'cctv'
    if any(k in c or k in n for k in ['fence', 'cerca', 'energizer', 'nemtek', 'arame', 'siren', 'ferrules', 'isolador', 'espinhas', 'mola']):
        return 'cerca_eletrica'
    if any(k in c or k in n for k in ['alarm', 'detector', 'sirene', 'pir', 'smoke', 'fire alarm', 'panic button']):
        return 'alarmes'
    if any(k in c or k in n for k in ['access control', 'turnstile', 'fechadura', 'lock', 'motor de portao', 'centurion', 'gemini', 'barrier', 'facial', 'fingerprint', 'attendance', 'door closer', 'intercom', 'catraca']):
        return 'controle_acesso'
    return 'redes_acessorios'

def get_product_image(name, model, subcategory):
    n = name.lower()
    m = model.lower()
    s = subcategory.lower()

    # 1. Monitors (must come before HDMI cables & cameras!)
    if 'monitor' in s or 'monitor' in n or 'lm19' in m or 'lm22' in m or 'lm32' in m:
        return '/images/monitor_dahua.jpg'

    # 2. Video Intercom Doorbell Kits & Indoor Touch Screens (must come before batteries!)
    if any(k in n or k in m or k in s for k in ['ktw02', 'kta02', 'ktp03', 'sd7', 'videoporteiro', 'intercom']):
        return '/images/intercom_ktw02.jpg'

    # 3. Solar PTZ & Battery Solar Cameras
    if 'solar' in n or 'solar' in s or 'hb8c' in m or 'hb8c' in n or 'eb3' in m or 'eb8' in m:
        return '/images/solar_cam.jpg'

    # 4. NVRs (PoE and Non-PoE) - MUST COME BEFORE WIFI CAMERAS & HDMI!
    if 'nvr' in n or 'nvr' in m or 'nvr' in s:
        if any(k in m or k in n for k in ['-16p', '-8p', '-4p', 'poe']):
            return '/images/nvr_16p.jpg'
        return '/images/nvr.jpg'

    # 5. XVRs / DVRs
    if 'xvr' in n or 'xvr' in m or 'xvr' in s or 'dvr' in s:
        return '/images/xvr_wizsense.jpg'

    # 6. Smart Wi-Fi / Consumer Cameras (Tenda, EZVIZ, Dahua Hero/Cube, Spy Cameras) - MUST COME BEFORE BATTERY & ROUTER!
    if any(k in n or k in m for k in [
        'ch3', 'ct3', 'rh3', 'rt3', 'rp3', 'cp3', 'cb1', 'cb2', 'c6n', 'h6c',
        'h3a', 'h3d', 'c3a', 'f3d', 'h3c', 'h4 3mp', 'poe h4', 'h3 5mp', 'h5',
        'lc1c', 'lc3', 'h8c', 'h9c', 'spy camera'
    ]) or ('camera' in n and ('wi-fi' in n or 'wifi' in n)) or 'camera wi-fi' in s:
        return '/images/wifi_smart_cam.jpg'

    # 7. UPS / No-break (must come before Power Supplies so PFM3350-1000 UPS gets UPS image!)
    if 'ups' in s or 'pfm3350' in m or 'uninterruptible' in n or (('ups' in m or 'ups' in n) and 'power supply' not in n and 'ps412v' not in m):
        return '/images/ups_dahua.png'

    # 8. Power Supplies (12V PSU boxes and adapters)
    if 'power supply' in n or 'fonte' in n or 'fonte' in s or 'ps412v' in m or 'pfm344' in m or 'pfm302' in m:
        return '/images/power_supply.jpg'

    # 9. Batteries (12V SLA Backup Batteries)
    if 'battery' in n or 'bateria' in n or '7.2a' in n or '7ah' in n:
        return '/images/battery_12v.jpg'

    # 10. HDMI Cables
    if 'hdmi' in n or 'hdmi' in m or 'hdmi' in s:
        return '/images/cable_hdmi.jpg'

    # 11. Tripod Turnstiles (Catracas)
    if 'turnstile' in n or 'turnstile' in s or 'asgg' in m:
        return '/images/turnstile_dahua.jpg'

    # 12. Facial Recognition Terminals
    if any(k in n or k in m for k in ['asi6214', 'asi3204', 'facial', 'face recognition']):
        return '/images/facial_asi6214s.jpg'

    # 13. Biometric Keypad & Access / Time Attendance Terminals (MUST COME BEFORE RFID CARD!)
    if any(k in n or k in m or k in s for k in ['asi1212', 'asa2212', 'asa1222', 'standalone', 'attendance', 'fingerprint']):
        if 'asa2212' in m or 'asi1212' in m:
            return '/images/access.jpg'
        return '/images/biometric_keypad.jpg'

    # 14. RFID IC Cards & Keyfobs
    if any(k in n or k in m or k in s for k in ['ic card', 'cartao', 'cartão', 'keyfob', 's50', 'abs003']):
        return '/images/rfid_card.jpg'

    # 15. Door Closers & Magnetic Locks
    if any(k in n or k in m for k in ['lock', 'fechadura', 'magnetic', 'eletroiman', 'asf280', 'door closer', 'dc80120']):
        return '/images/magnetic_lock.jpg'

    # 16. Smoke & Fire Detectors
    if any(k in n or k in m or k in s for k in ['smoke', 'heat detector', 'fumo', 'incendio', 'incêndio', 'fire alarm', 'hy-1320', 'hy-1500']):
        return '/images/smoke_detector.jpg'

    # 17. PIR Motion & Door Reed Detectors
    if any(k in n or k in m for k in ['pir detector', 'ard2231', 'ard333', 'door detector', 'contacto magnetico']):
        return '/images/pir_detector.jpg'

    # 18. Sirens (Dahua Wireless Sirens & Nemtek Sirens)
    if any(k in n or k in m for k in ['sirene', 'siren', 'sr-30', 'ara12', 'ara13']):
        return '/images/siren.jpg'

    # 19. AirShield Alarm Hub & Kits
    if any(k in n or k in m for k in ['arc3800', 'airshield', 'alarm hub', 'alarm kit', 'central de alarme']):
        return '/images/alarm_airshield.jpg'

    # 20. PTZ Speed Dome & Positioning Cameras
    if any(k in n or k in m or k in s for k in ['ptz', 'speed dome', 'sd3d', 'sd49', 'sdt', 'epc245', 'eca7b', 'esd41']):
        return '/images/cam_ptz.jpg'

    # 21. Dome / Eyeball / Turret Cameras
    if any(k in n or k in m or k in s for k in ['dome', 'eyeball', 'turret', 'hdbw', 'hdw']):
        if 'hdw' in m and 'hdbw' not in m:
            return '/images/dome.jpg'
        return '/images/cam_hdbw1439.jpg'

    # 22. Bullet & Splicing Cameras
    if any(k in n or k in m or k in s for k in ['bullet', 'hfw', 'pdw5849', 'tpc-aebf', 'me1239']):
        if 'hac-hfw' in m or 'me1239' in m or 'tpc-aebf' in m:
            return '/images/bullet.jpg'
        return '/images/cam_hfw1439.jpg'

    # 23. Bastidor Rack 9U
    if 'r9u' in m or '9u' in n or '9u4d' in m:
        return '/images/rack_9u.jpg'

    # 24. Bastidor Rack 6U, 12U, 18U, 42U
    if ('rack' in n or 'rack' in m or 'bastidor' in s or 'bastidor' in n) and 'fence' not in s:
        return '/images/rack_zkteco.jpg'

    # 25. Ceiling Mount Access Points & Wireless Bridges / CPE
    if any(k in n or k in m or k in s for k in ['u7-lr', 'u7-outdoor', 'ap3000', 'ap de teto', 'celing mount', 'i29', 'o4-kit', 'o8 tenda', 'wbc5', 'cpe']):
        return '/images/ceiling_ap.jpg'

    # 26. Routers Wi-Fi, Mesh & 4G/5G
    if any(k in n or k in m or k in s for k in ['router', 'wi-fi', 'wifi', 'mesh', 'tx12', 'rx12', 'tx2', 'a23', 'a9', 'n301', '4g03', '4g08', '5g01', 'mr403', 'dh-n3', 'ax15', 'ax30', 'mx3', 'mw3', 'mw6', 'ac650', '3wr4g']):
        return '/images/router_wifi.jpg'

    # 27. Switches PoE e Rede
    if 'switch' in n or 'switch' in s or any(k in m for k in ['teg', 'tef', 'pfs', 's3220', 's3228', 'cs4228', 'sg10']):
        return '/images/switch_poe.jpg'

    # 28. Discos WD Purple
    if 'purple' in n or 'disco' in n or 'hdd' in s or 'wd10' in m or 'wd20' in m or 'wd40' in m:
        return '/images/hdd.jpg'

    # 29. Remote Controls & Receivers (without Nova Mesh false positive)
    if 'comando' in n or 'remoto' in n or 'centurion nova' in n or 'centurion nova' in m:
        return '/images/remote.jpg'

    # 30. Gate Motors
    if any(k in n or k in m or k in s for k in ['motor de portao', 'd5 evo', 'd10 smart', 'sliding gate', 'gemini']):
        if 'd10' in m or 'd10' in n:
            return '/images/gate_motor.jpg'
        return '/images/centurion_d5.jpg'

    # 31. Wire Spools (Arame)
    if 'arame' in n or 'wire' in n and ('ew-al' in m or 'ew-ss' in m):
        return '/images/wire_spool.jpg'

    # 32. Nemtek Energizers
    if any(k in n or k in m for k in ['eletrificador', 'energizer', 'wizord', 'druid', 'merlin', 'e-m18', 'e-wiz']):
        return '/images/energizer.jpg'

    # 33. Electric Fence general (Tubes, Brackets, Warning Signs)
    if 'cerca' in s or 'fence' in s or 'esqj' in m or 'ea-wrs' in m:
        return '/images/fence.jpg'

    # 34. Coaxial Cable
    if 'coaxial' in n or 'coxial' in s or 'rg59' in m:
        return '/images/cable_coaxial.jpg'

    # 35. BNC & DC Connectors
    if 'bnc' in n or 'bnc' in m or 'pfm979-dcp' in m or ('connector' in n and 'rj45' not in n and 'cat6' not in n):
        return '/images/bnc_dc_connectors.jpg'

    # 36. Junction Box
    if 'junction box' in n or 'junction box' in s or 'pfa12a' in m:
        return '/images/junction_box.jpg'

    # 37. Network Cables Cat6 & RJ45 Connectors
    if 'cabo' in n or 'cat6' in n or 'pfm92' in m or 'pfm972' in m or 'pfm976-631' in m:
        return '/images/cable_cat6.jpg'

    return '/images/cam_hfw1439.jpg'

products = []
with open('techsol_inventory.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = [h.strip().lower() for h in next(reader, [])]
    is_six_col = 'product' in header and ('selling price' in header or 'sku' in header or len(header) <= 8)
    seen_ids = set()
    for row in reader:
        if not row:
            continue
        if is_six_col and len(row) >= 2:
            raw_name = row[0].strip()
            raw_price = row[1].strip()
            raw_cat = row[3].strip() if len(row) > 3 else ''
            raw_brand = row[4].strip() if len(row) > 4 else ''
            raw_sku = row[5].strip() if len(row) > 5 else ''
        elif len(row) >= 13 and row[3].strip():
            raw_name = row[3].strip()
            raw_price = row[6].strip()
            raw_cat = row[9].strip()
            raw_brand = row[10].strip()
            raw_sku = row[12].strip()
        else:
            continue

        if not raw_name:
            continue
        if 'woocommerce sync' in raw_name.lower() or raw_name.lower().startswith('total:'):
            continue

        name = html.unescape(raw_name)
        selling_price = re.sub(r'[^0-9.-]+', '', raw_price)
        cat_orig = html.unescape(raw_cat) or 'Equipamentos'
        brand = html.unescape(raw_brand) or 'Dahua'
        sku = html.unescape(raw_sku) or name
        try:
            price = float(selling_price)
        except:
            price = 0.0
        
        category = clean_category(cat_orig, name)
        model = sku
        
        # unique slug
        base_slug = re.sub(r'[^a-z0-9]+', '-', (sku or name).lower()).strip('-')
        slug = base_slug
        counter = 1
        while slug in seen_ids or not slug:
            slug = f"{base_slug}-{counter}"
            counter += 1
        seen_ids.add(slug)
        
        # Warranty logic
        if 'dahua' in brand.lower():
            warranty = 'Garantia Oficial Dahua'
        elif 'nemtek' in brand.lower():
            warranty = 'Garantia Oficial Nemtek'
        elif 'centurion' in brand.lower():
            warranty = 'Garantia Oficial Centurion'
        elif 'western' in brand.lower():
            warranty = 'Garantia Western Digital'
        else:
            warranty = 'Garantia do Fabricante'

        img = get_product_image(name, model, cat_orig)

        products.append({
            'id': slug,
            'sku': sku,
            'model': model,
            'name': name,
            'category': category,
            'subcategory': cat_orig,
            'brand': brand,
            'priceMZN': price,
            'stockQty': 10, # Internal placeholder only, never shown to clients
            'inStock': True,
            'stockStatus': 'Em Stock',
            'description': f"Equipamento profissional de alta performance {name}. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.",
            'highlights': ['Pronta Entrega em Maputo', '100% Original Homologado', 'Faturação com NUIT'],
            'specs': {
                'Marca': brand,
                'Modelo': model,
                'Categoria': cat_orig,
                'Origem': 'Distribuição Oficial Moçambique'
            },
            'popular': False,
            'warranty': warranty,
            'datasheetAvailable': True,
            'image': img
        })

print(f"Total processed: {len(products)}")

code = '''/**
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

export const PRODUCTS: Product[] = ''' + json.dumps(products, indent=2, ensure_ascii=False) + ''';

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
'''

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully written src/data/products.ts with all real products!")

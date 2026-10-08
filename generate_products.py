import csv, json, re

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

    # 1. Batteries (must come before gate motors!)
    if 'battery' in n or 'bateria' in n or '7.2a' in n or '7ah' in n:
        return '/images/battery_12v.jpg'

    # 2. Power Supplies (must come before UPS and camera!)
    if 'power supply' in n or 'fonte' in n or 'ps412v' in m or 'pfm344' in m or 'pfm302' in m:
        return '/images/power_supply.jpg'

    # 3. UPS / No-break
    if 'ups' in m or 'ups' in s or ('ups' in n and 'power supply' not in n):
        return '/images/ups_dahua.png'

    # 4. HDMI Cable
    if 'hdmi' in n or 'hdmi' in m:
        return '/images/cable_hdmi.jpg'

    # 5. RFID IC Cards & Keyfobs
    if any(k in n or k in m for k in ['card', 'cartao', 'cartão', 'tag', 'keyfob', 's50']):
        return '/images/rfid_card.jpg'

    # 6. Door Closers & Magnetic Locks
    if any(k in n or k in m for k in ['lock', 'fechadura', 'magnetic', 'eletroiman', 'asf280', 'door closer', 'dc80120']):
        return '/images/magnetic_lock.jpg'

    # 7. Smoke & Fire Detectors
    if any(k in n or k in m for k in ['smoke', 'heat detector', 'fumo', 'incendio', 'incêndio', '1320', '1500']):
        return '/images/smoke_detector.jpg'

    # 8. PIR Motion & Door Reed Detectors
    if any(k in n or k in m for k in ['pir detector', 'ard2231', 'ard333', 'door detector', 'contacto magnetico']):
        return '/images/pir_detector.jpg'

    # 9. AirShield Alarm Hub
    if any(k in n or k in m for k in ['arc3800', 'ara13', 'airshield', 'central de alarme']):
        return '/images/alarm_airshield.jpg'

    # 10. Video Intercom Doorbell Kits
    if any(k in n or k in m or k in s for k in ['ktw02', 'kta02', 'ktp03', 'videoporteiro', 'intercom']):
        return '/images/intercom_ktw02.jpg'

    # 11. Solar PTZ Cameras
    if 'solar' in n or 'hb8c' in m or 'hb8c' in n:
        return '/images/solar_cam.jpg'

    # 12. Smart Wi-Fi / Consumer Cameras (Tenda, EZVIZ, Dahua Hero/Cube) - MUST COME BEFORE ROUTER!
    if any(k in n or k in m for k in ['ch3', 'ct3', 'rh3', 'rt3', 'cb2', 'h3a', 'h3d', 'c3a', 'h4 3mp', 'h3 5mp', 'lc1c', 'h8c']) or ('camera' in n and ('wi-fi' in n or 'wifi' in n)):
        return '/images/wifi_smart_cam.jpg'

    # 13. PTZ Speed Dome Cameras
    if any(k in n or k in m for k in ['ptz', 'speed dome', 'sd3d', 'sd49', 'sdt']):
        return '/images/cam_ptz.jpg'

    # 14. Dome / Turret Cameras
    if any(k in n or k in m or k in s for k in ['dome', 'eyeball', 'turret', 'hdbw', 'hdw']):
        return '/images/cam_hdbw1439.jpg'

    # 15. Bullet Cameras
    if any(k in n or k in m or k in s for k in ['bullet', 'hfw']) or 'camera' in n or 'camera' in s:
        return '/images/cam_hfw1439.jpg'

    # 16. XVR Dahua
    if 'xvr' in n or 'xvr' in m or 'xvr' in s:
        return '/images/xvr_wizsense.jpg'

    # 17. NVR Dahua
    if 'nvr' in n or 'nvr' in m or 'nvr' in s:
        return '/images/nvr_16p.jpg'

    # 18. Bastidor Rack 9U
    if 'r9u' in m or '9u' in n:
        return '/images/rack_9u.jpg'

    # 19. Bastidor Rack 6U, 18U, 42U
    if 'rack' in n or 'rack' in m or 'bastidor' in s or 'bastidor' in n:
        return '/images/rack_zkteco.jpg'

    # 20. Ceiling Mount Access Points & Bridges
    if any(k in n or k in m for k in ['u7-lr', 'u7-outdoor', 'ap3000', 'ap de teto', 'celing mount', 'i29', 'o4-kit', 'o8 tenda', 'wbc5']):
        return '/images/ceiling_ap.jpg'

    # 21. Routers Wi-Fi & 4G
    if any(k in n or k in m for k in ['router', 'wi-fi', 'wifi', 'mesh', 'tx12', 'rx12', 'tx2', 'a23', 'a9', 'n301', '4g03', '4g08', '5g01', 'mr403', 'dh-n3', 'ax15', 'ax30']):
        return '/images/router_wifi.jpg'

    # 22. Switches PoE e Rede
    if 'switch' in n or 'switch' in s or any(k in m for k in ['teg', 'tef', 'pfs', 'cs4228', 'sg10']):
        return '/images/switch_poe.jpg'

    # 23. Discos WD Purple
    if 'purple' in n or 'disco' in n or 'hdd' in s:
        return '/images/hdd.jpg'

    # 24. Biometric Keypad & Access Terminals
    if any(k in n or k in m for k in ['asi1212', 'asa2212', 'standalone', 'attendance', 'fingerprint']):
        return '/images/biometric_keypad.jpg'

    # 25. Facial Terminals
    if any(k in n or k in m for k in ['asi6214', 'asi3204', 'facial']):
        return '/images/facial_asi6214s.jpg'

    # 26. Remote Controls
    if 'comando' in n or 'remoto' in n or 'nova' in m:
        return '/images/remote.jpg'

    # 27. Gate Motors
    if any(k in n or k in m for k in ['motor de portao', 'd5', 'd10', 'gemini']):
        return '/images/centurion_d5.jpg'

    # 28. Sirens
    if 'sirene' in n or 'siren' in n or 'sr-30' in m:
        return '/images/siren.jpg'

    # 29. Wire Spools
    if 'arame' in n or 'wire' in n or 'ew-al' in m or 'ew-ss' in m:
        return '/images/wire_spool.jpg'

    # 30. Nemtek Energizers
    if any(k in n or k in m for k in ['eletrificador', 'wizord', 'druid', 'merlin']):
        return '/images/energizer.jpg'

    # 31. Electric Fence general
    if 'cerca' in s or 'fence' in s:
        return '/images/fence.jpg'

    # 32. Network Cables Cat6
    if 'cabo' in n or 'cat6' in n or 'pfm92' in m:
        return '/images/cable_cat6.jpg'

    return '/images/cam_hfw1439.jpg'

products = []
with open('techsol_inventory.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    next(reader)
    seen_ids = set()
    for row in reader:
        if len(row) >= 13 and row[3].strip():
            name = row[3].strip()
            selling_price = row[6].strip().replace(',', '')
            cat_orig = row[9].strip() or 'Equipamentos'
            brand = row[10].strip() or 'Dahua'
            sku = row[12].strip() or name
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
  remote_control: '/images/remote.jpg',
  battery_12v: '/images/battery_12v.jpg',
  power_supply: '/images/power_supply.jpg',
  cat6_cable: '/images/cable_cat6.jpg',
  cable_hdmi: '/images/cable_hdmi.jpg',
  switch_poe: '/images/switch_poe.jpg',
  ceiling_ap: '/images/ceiling_ap.jpg',
  router_wifi: '/images/router_wifi.jpg',
  access_control: '/images/access.jpg',
  wd_purple: '/images/hdd.jpg',
  ups: '/images/ups_dahua.png',
  rack_6u: '/images/rack_zkteco.jpg',
  rack_9u: '/images/rack_9u.jpg',
};

export function getProductReferenceImage(p: { id: string; model: string; name: string; category: string; subcategory: string }): string {
  const m = p.model.toLowerCase();
  const n = p.name.toLowerCase();
  const s = p.subcategory.toLowerCase();

  if (n.includes('battery') || n.includes('bateria') || n.includes('7.2a') || n.includes('7ah')) {
    return PRODUCT_IMAGE_MAP.battery_12v;
  }
  if (n.includes('power supply') || n.includes('fonte') || m.includes('ps412v') || m.includes('pfm344') || m.includes('pfm302')) {
    return PRODUCT_IMAGE_MAP.power_supply;
  }
  if (m.includes('ups') || s.includes('ups') || (n.includes('ups') && !n.includes('power supply'))) {
    return PRODUCT_IMAGE_MAP.ups;
  }
  if (n.includes('hdmi') || m.includes('hdmi')) {
    return PRODUCT_IMAGE_MAP.cable_hdmi;
  }
  if (['card', 'cartao', 'cartão', 'tag', 'keyfob', 's50'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.rfid_card;
  }
  if (['lock', 'fechadura', 'magnetic', 'eletroiman', 'asf280', 'door closer', 'dc80120'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.magnetic_lock;
  }
  if (['smoke', 'heat detector', 'fumo', 'incendio', 'incêndio', '1320', '1500'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.smoke_detector;
  }
  if (['pir detector', 'ard2231', 'ard333', 'door detector', 'contacto magnetico'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.pir_detector;
  }
  if (['arc3800', 'ara13', 'airshield', 'central de alarme'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.airshield_alarm;
  }
  if (['ktw02', 'kta02', 'ktp03', 'videoporteiro', 'intercom'].some(k => n.includes(k) || m.includes(k) || s.includes(k))) {
    return PRODUCT_IMAGE_MAP.intercom;
  }
  if (n.includes('solar') || m.includes('hb8c') || n.includes('hb8c')) {
    return PRODUCT_IMAGE_MAP.solar_cam;
  }
  if (['ch3', 'ct3', 'rh3', 'rt3', 'cb2', 'h3a', 'h3d', 'c3a', 'h4 3mp', 'h3 5mp', 'lc1c', 'h8c'].some(k => n.includes(k) || m.includes(k)) || 
      (n.includes('camera') && (n.includes('wi-fi') || n.includes('wifi')))) {
    return PRODUCT_IMAGE_MAP.wifi_smart_cam;
  }
  if (['ptz', 'speed dome', 'sd3d', 'sd49', 'sdt'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.cam_ptz;
  }
  if (['dome', 'eyeball', 'turret', 'hdbw', 'hdw'].some(k => n.includes(k) || m.includes(k) || s.includes(k))) {
    return PRODUCT_IMAGE_MAP.cam_hdbw1439;
  }
  if (['bullet', 'hfw'].some(k => n.includes(k) || m.includes(k) || s.includes(k)) || n.includes('camera') || s.includes('camera')) {
    return PRODUCT_IMAGE_MAP.cam_hfw1439;
  }
  if (n.includes('xvr') || m.includes('xvr') || s.includes('xvr')) {
    return PRODUCT_IMAGE_MAP.xvr_wizsense;
  }
  if (n.includes('nvr') || m.includes('nvr') || s.includes('nvr')) {
    return PRODUCT_IMAGE_MAP.nvr_16p;
  }
  if (m.includes('r9u') || n.includes('9u')) {
    return PRODUCT_IMAGE_MAP.rack_9u;
  }
  if (n.includes('rack') || m.includes('rack') || s.includes('bastidor') || n.includes('bastidor')) {
    return PRODUCT_IMAGE_MAP.rack_6u;
  }
  if (['u7-lr', 'u7-outdoor', 'ap3000', 'ap de teto', 'celing mount', 'i29', 'o4-kit', 'o8 tenda', 'wbc5'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.ceiling_ap;
  }
  if (['router', 'wi-fi', 'wifi', 'mesh', 'tx12', 'rx12', 'tx2', 'a23', 'a9', 'n301', '4g03', '4g08', '5g01', 'mr403', 'dh-n3', 'ax15', 'ax30'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.router_wifi;
  }
  if (n.includes('switch') || s.includes('switch') || ['teg', 'tef', 'pfs', 'cs4228', 'sg10'].some(k => m.includes(k))) {
    return PRODUCT_IMAGE_MAP.switch_poe;
  }
  if (n.includes('purple') || n.includes('disco') || s.includes('hdd')) {
    return PRODUCT_IMAGE_MAP.wd_purple;
  }
  if (['asi1212', 'asa2212', 'standalone', 'attendance', 'fingerprint'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.biometric_keypad;
  }
  if (['asi6214', 'asi3204', 'facial'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.facial_terminal;
  }
  if (n.includes('comando') || n.includes('remoto') || m.includes('nova')) {
    return PRODUCT_IMAGE_MAP.remote_control;
  }
  if (['motor de portao', 'd5', 'd10', 'gemini'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.gate_motor;
  }
  if (n.includes('sirene') || n.includes('siren') || m.includes('sr-30')) {
    return PRODUCT_IMAGE_MAP.siren;
  }
  if (n.includes('arame') || n.includes('wire') || m.includes('ew-al') || m.includes('ew-ss')) {
    return PRODUCT_IMAGE_MAP.wire_spool;
  }
  if (['eletrificador', 'wizord', 'druid', 'merlin'].some(k => n.includes(k) || m.includes(k))) {
    return PRODUCT_IMAGE_MAP.nemtek_energizer;
  }
  if (s.includes('cerca') || s.includes('fence')) {
    return PRODUCT_IMAGE_MAP.electric_fence;
  }
  if (n.includes('cabo') || n.includes('cat6') || m.includes('pfm92')) {
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

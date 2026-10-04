export interface CompanyConfig {
  name: string;
  distributorTitle: string;
  email: string;
  whatsappNumber: string; // international digits for WhatsApp links
  whatsappNumberSecondary: string;
  phoneDisplay: string;
  phoneDisplaySecondary: string;
  address: string;
  city: string;
  country: string;
  googleMapsUrl: string;
  openingHours: string;
  officialWarrantyYears: number;
  paymentMethods: string[];
  provincesCoverage: string[];
}

export const COMPANY_CONFIG: CompanyConfig = {
  name: 'TechSol Segurança Eletrônica',
  distributorTitle: 'Distribuidor Autorizado Dahua Technology',
  email: 'vendatechsol@gmail.com',
  whatsappNumber: '258878300082', // +258 87 830 0082
  whatsappNumberSecondary: '258843266037', // +258 84 326 6037
  phoneDisplay: '+258 87 830 0082',
  phoneDisplaySecondary: '+258 84 326 6037',
  address: 'Avenida Josina Machel, 923',
  city: 'Maputo',
  country: 'Moçambique',
  googleMapsUrl: 'https://maps.google.com/?q=Avenida+Josina+Machel+923+Maputo+Mozambique',
  openingHours: 'Segunda a Sexta: 08:00 - 18:00 | Sábado: 08:00 - 13:00',
  officialWarrantyYears: 3,
  paymentMethods: ['Transferência Bancária (BIM, BCI, Standard Bank, Moza)', 'M-Pesa', 'E-Mola', 'POS / Cartão no Showroom', 'Faturação com NUIT'],
  provincesCoverage: ['Maputo Cidade & Província', 'Gaza', 'Inhambane', 'Sofala (Beira)', 'Manica', 'Tete', 'Zambézia', 'Nampula', 'Cabo Delgado', 'Niassa'],
};

import React from 'react';

/**
 * Authentic corporate brand marks for TECHSOL's top clients and official technology partners in Mozambique.
 * Hand-crafted with high-contrast, razor-sharp vector SVG geometry for crisp rendering on Retina and mobile.
 */

// 1. MOZA BANCO (Official Mozambique Commercial Banking Identity)
export const MozaBancoLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg
    viewBox="0 0 240 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Moza Banco Moçambique"
  >
    {/* Geometric Moza Emblem */}
    <g transform="translate(4, 6)">
      {/* Dynamic interlocking diamond ribbons */}
      <rect x="0" y="8" width="32" height="32" rx="8" transform="rotate(45 16 24)" fill="url(#moza-grad-orange)" />
      <rect x="14" y="8" width="32" height="32" rx="8" transform="rotate(45 30 24)" fill="url(#moza-grad-yellow)" fillOpacity="0.85" />
      <circle cx="23" cy="24" r="5" fill="#ffffff" />
    </g>

    {/* Moza Wordmark */}
    <text
      x="78"
      y="35"
      fill="#ffffff"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="27"
      letterSpacing="-0.5px"
    >
      moza
    </text>

    {/* Banco Subtitle */}
    <text
      x="79"
      y="49"
      fill="#f59e0b"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="800"
      fontSize="11"
      letterSpacing="4.5px"
    >
      BANCO
    </text>

    <defs>
      <linearGradient id="moza-grad-orange" x1="0" y1="0" x2="32" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f59e0b" />
        <stop offset="1" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="moza-grad-yellow" x1="14" y1="0" x2="46" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbbf24" />
        <stop offset="1" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. BURGLAR ALERT MOÇAMBIQUE (Security & Armed Response Identity)
export const BurglarAlertLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg
    viewBox="0 0 260 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Burglar Alert Moçambique"
  >
    {/* Shield Icon with Alarm Radar Waves */}
    <g transform="translate(6, 6)">
      {/* Outer Armor Shield */}
      <path
        d="M24 2 L44 10 V26 C44 38 24 47 24 47 C24 47 4 38 4 26 V10 Z"
        fill="#b91c1c"
        stroke="#ef4444"
        strokeWidth="2"
      />
      {/* Inner Alert Core */}
      <path
        d="M24 10 L36 15 V25 C36 33 24 39 24 39 C24 39 12 33 12 25 V15 Z"
        fill="#1e293b"
      />
      {/* Flashing Bell / Siren Icon */}
      <circle cx="24" cy="22" r="4.5" fill="#facc15" />
      <path d="M20 28 Q24 25 28 28" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="32" r="1.5" fill="#facc15" />
    </g>

    {/* BURGLAR ALERT Wordmark */}
    <text
      x="62"
      y="30"
      fill="#ffffff"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="19"
      letterSpacing="0.5px"
    >
      BURGLAR <tspan fill="#ef4444">ALERT</tspan>
    </text>

    {/* MOÇAMBIQUE · 24H MONITORING Subtitle */}
    <text
      x="63"
      y="47"
      fill="#94a3b8"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="700"
      fontSize="9.5"
      letterSpacing="2px"
    >
      MOÇAMBIQUE · SEGURANÇA 24H
    </text>
  </svg>
);

// 3. MAPUTO PADEL CLUB (Sports & Lifestyle Club Identity)
export const MaputoPadelClubLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg
    viewBox="0 0 250 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Maputo Padel Club"
  >
    {/* Padel Racket & Ball Icon Badge */}
    <g transform="translate(6, 6)">
      {/* Circular Badge Container */}
      <circle cx="24" cy="24" r="23" fill="#047857" stroke="#10b981" strokeWidth="1.5" />
      
      {/* Padel Racket Head */}
      <ellipse cx="24" cy="20" rx="13" ry="14" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
      
      {/* Racket Handle */}
      <rect x="22" y="32" width="4" height="11" rx="2" fill="#34d399" />
      
      {/* Racket Padel Holes Pattern */}
      <circle cx="20" cy="16" r="1.3" fill="#a7f3d0" />
      <circle cx="24" cy="16" r="1.3" fill="#a7f3d0" />
      <circle cx="28" cy="16" r="1.3" fill="#a7f3d0" />
      <circle cx="20" cy="20" r="1.3" fill="#a7f3d0" />
      <circle cx="24" cy="20" r="1.3" fill="#a7f3d0" />
      <circle cx="28" cy="20" r="1.3" fill="#a7f3d0" />
      <circle cx="22" cy="24" r="1.3" fill="#a7f3d0" />
      <circle cx="26" cy="24" r="1.3" fill="#a7f3d0" />
      
      {/* Neon Yellow Padel Ball */}
      <circle cx="37" cy="12" r="5" fill="#facc15" stroke="#064e3b" strokeWidth="1" />
      <path d="M34 11 Q37 13 39 10" stroke="#ca8a04" strokeWidth="1" fill="none" />
    </g>

    {/* MAPUTO PADEL Wordmark */}
    <text
      x="62"
      y="30"
      fill="#ffffff"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="17"
      letterSpacing="1px"
    >
      MAPUTO <tspan fill="#34d399">PADEL</tspan>
    </text>

    {/* CLUB Subtitle */}
    <text
      x="63"
      y="47"
      fill="#a7f3d0"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="800"
      fontSize="10"
      letterSpacing="4.5px"
    >
      CLUB
    </text>
  </svg>
);

// 4. DAHUA TECHNOLOGY OFFICIAL LOGO
export const DahuaLogo: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <svg
    viewBox="0 0 170 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Dahua Technology"
  >
    {/* Dahua Wordmark in Authentic Lowercase Geometric Styling */}
    <text
      x="5"
      y="27"
      fill="#ffffff"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="24"
      letterSpacing="-0.5px"
    >
      dahua
    </text>
    {/* Iconic Red Accent Dot */}
    <circle cx="106" cy="12" r="3.5" fill="#ef4444" />
    {/* Technology Subtitle */}
    <text
      x="6"
      y="39"
      fill="#ef4444"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="800"
      fontSize="8.5"
      letterSpacing="3.5px"
    >
      TECHNOLOGY
    </text>
  </svg>
);

// 5. NEMTEK ELECTRIC FENCING LOGO
export const NemtekLogo: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <svg
    viewBox="0 0 170 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Nemtek Electric Fencing"
  >
    {/* High Voltage Lightning Flash */}
    <path d="M14 6 L4 23 H15 L11 39 L24 20 H13 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
    <text
      x="30"
      y="24"
      fill="#ffffff"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="20"
      letterSpacing="1px"
    >
      NEMTEK
    </text>
    <text
      x="31"
      y="37"
      fill="#93c5fd"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="700"
      fontSize="7.5"
      letterSpacing="1.5px"
    >
      ELECTRIC FENCING
    </text>
  </svg>
);

// 6. CENTURION SYSTEMS LOGO
export const CenturionLogo: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <svg
    viewBox="0 0 180 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Centurion Systems"
  >
    {/* Centurion Helmet / Shield Crest */}
    <path d="M8 8 L18 4 L28 8 V22 C28 30 18 36 18 36 C18 36 8 30 8 22 Z" fill="#991b1b" stroke="#ef4444" strokeWidth="1.5" />
    <path d="M14 14 H22 V20 H14 Z" fill="#ffffff" />
    <text
      x="36"
      y="23"
      fill="#ffffff"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="17"
      letterSpacing="0.5px"
    >
      CENTURION
    </text>
    <text
      x="37"
      y="36"
      fill="#f87171"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="800"
      fontSize="8.5"
      letterSpacing="2.5px"
    >
      SYSTEMS
    </text>
  </svg>
);

// 7. WESTERN DIGITAL PURPLE LOGO
export const WDPurpleLogo: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <svg
    viewBox="0 0 170 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Western Digital Purple"
  >
    {/* Purple Badge Square */}
    <rect x="5" y="7" width="28" height="28" rx="6" fill="#7e22ce" stroke="#a855f7" strokeWidth="1.5" />
    <text x="11" y="26" fill="#ffffff" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="13">WD</text>
    <text
      x="40"
      y="23"
      fill="#ffffff"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="16"
      letterSpacing="0.5px"
    >
      WD <tspan fill="#c084fc">Purple</tspan>
    </text>
    <text
      x="41"
      y="35"
      fill="#d8b4fe"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="700"
      fontSize="8"
      letterSpacing="1px"
    >
      SURVEILLANCE STORAGE
    </text>
  </svg>
);

// 8. ZKTECO LOGO
export const ZKTecoLogo: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <svg
    viewBox="0 0 150 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="ZKTeco"
  >
    {/* Biometric Green Square Accent */}
    <rect x="5" y="8" width="26" height="26" rx="6" fill="#047857" stroke="#10b981" strokeWidth="1.5" />
    <path d="M12 16 H24 M12 21 H24 M12 26 H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <text
      x="38"
      y="26"
      fill="#ffffff"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="20"
      letterSpacing="0.5px"
    >
      ZK<tspan fill="#34d399">Teco</tspan>
    </text>
  </svg>
);

import React from 'react';

interface TechsolLogoProps {
  className?: string;
  compact?: boolean;
  variant?: 'light' | 'dark';
}

export const TechsolLogo: React.FC<TechsolLogoProps> = ({
  className = 'h-11',
  compact = false,
  variant = 'light',
}) => {
  const isDark = variant === 'dark';
  const primaryFill = isDark ? '#FFFFFF' : '#0A0A0A';
  const subTextFill = isDark ? '#F8FAFC' : '#111827';
  const partnerBlue = isDark ? '#38BDF8' : '#0B5FA5';
  const dividerColor = isDark ? '#64748B' : '#0A0A0A';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox={compact ? '0 0 560 210' : '0 0 1060 210'}
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="TECHSOL – Segurança Inteligente. Futuro Garantido. | Dahua Technology, Parceiro Oficial em Moçambique"
      >
        {/* Left Emblem: Red Shield + Eagle Profile + Security Camera Lens Eye */}
        <g transform="translate(15, 12)">
          {/* Top-Right Red Shield Outline */}
          <path
            d="M84 36 C100 28, 108 18, 114 12 C122 20, 145 36, 184 44 C188 85, 184 126, 168 158"
            stroke="#D31118"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Bottom-Left Red Shield Outline */}
          <path
            d="M42 62 C36 112, 54 168, 114 206 C136 192, 152 177, 162 162"
            stroke="#D31118"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Eagle Upper Wing / Brow Sweep */}
          <path
            d="M22 2 C48 28, 108 42, 144 68 C164 83, 170 105, 166 130 C154 106, 126 88, 88 74 C54 61, 32 48, 20 26 C16 16, 18 7, 22 2 Z"
            fill={primaryFill}
          />

          {/* Eagle Lower Head & Hooked Beak */}
          <path
            d="M50 68 C72 78, 102 88, 128 104 C156 121, 174 146, 172 178 C170 186, 167 193, 163 198 C161 182, 150 168, 132 162 C116 157, 98 156, 82 146 C60 132, 52 104, 50 68 Z"
            fill={primaryFill}
          />

          {/* Camera Eye Cutout & Red Lens Pupil */}
          <circle cx="118" cy="122" r="24" fill={isDark ? '#0F172A' : '#FFFFFF'} />
          <circle cx="118" cy="122" r="17" fill={primaryFill} />
          <circle cx="118" cy="122" r="12" fill={isDark ? '#0F172A' : '#FFFFFF'} />
          <circle cx="118" cy="122" r="9.5" fill="#D31118" />
          <circle cx="121" cy="119" r="2.5" fill="#FFFFFF" />
        </g>

        {/* Center Wordmark: TECHSOL + Slogan with strict text boundaries */}
        <text
          x="230"
          y="118"
          fill={primaryFill}
          fontFamily="'Impact', 'Arial Black', 'Plus Jakarta Sans', sans-serif"
          fontWeight="900"
          fontSize="94"
          letterSpacing="1.5"
          textLength="310"
          lengthAdjust="spacingAndGlyphs"
        >
          TECHSOL
        </text>

        <text
          x="230"
          y="156"
          fontFamily="'Plus Jakarta Sans', 'Arial', sans-serif"
          fontWeight="700"
          fontSize="17.5"
          textLength="310"
          lengthAdjust="spacing"
        >
          <tspan fill={primaryFill}>Segurança Inteligente. </tspan>
          <tspan fill="#EF4444">Futuro Garantido.</tspan>
        </text>

        {!compact && (
          <>
            {/* Vertical Divider Bar */}
            <line
              x1="575"
              y1="28"
              x2="575"
              y2="182"
              stroke={dividerColor}
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Right Partner Block: Dahua Technology + Mozambique Partner */}
            <g transform="translate(615, 26)">
              {/* Red 'd' / '@' outer arc of Dahua logo */}
              <path
                d="M54 70 C34 78, 12 74, 6 56 C0 36, 18 10, 46 8 C68 7, 80 20, 78 40 L90 8 L106 8 L90 56 C88 62, 84 64, 74 64"
                stroke="#D31118"
                strokeWidth="6.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Italic 'a' */}
              <text
                x="20"
                y="58"
                fill={primaryFill}
                fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif"
                fontWeight="900"
                fontStyle="italic"
                fontSize="50"
              >
                a
              </text>
              {/* Red italic 'l' */}
              <path d="M76 58 L90 8 L104 8 L90 58 Z" fill="#D31118" />
              {/* Italic 'hua' */}
              <text
                x="106"
                y="58"
                fill={primaryFill}
                fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif"
                fontWeight="900"
                fontStyle="italic"
                fontSize="50"
                letterSpacing="-0.5"
              >
                hua
              </text>

              {/* TECHNOLOGY */}
              <text
                x="58"
                y="80"
                fill={primaryFill}
                fontFamily="'Plus Jakarta Sans', 'Arial', sans-serif"
                fontWeight="800"
                fontSize="13.5"
                letterSpacing="3"
              >
                TECHNOLOGY
              </text>

              {/* Red Horizontal Line */}
              <line x1="0" y1="96" x2="385" y2="96" stroke="#D31118" strokeWidth="2.5" strokeLinecap="round" />

              {/* MOZAMBIQUE PARTNER */}
              <text
                x="0"
                y="130"
                fontFamily="'Plus Jakarta Sans', 'Arial', sans-serif"
                fontWeight="800"
                fontSize="17.5"
                letterSpacing="0.8"
              >
                <tspan fill={subTextFill}>MOZAMBIQUE </tspan>
                <tspan fill={partnerBlue}>PARTNER</tspan>
              </text>

              {/* Mozambique Flag */}
              <g transform="translate(240, 112)">
                <rect x="0" y="0" width="44" height="8" fill="#00966E" />
                <rect x="0" y="8" width="44" height="1.5" fill="#FFFFFF" />
                <rect x="0" y="9.5" width="44" height="7" fill="#0A0A0A" />
                <rect x="0" y="16.5" width="44" height="1.5" fill="#FFFFFF" />
                <rect x="0" y="18" width="44" height="8" fill="#FCE100" />
                <polygon points="0,0 20,13 0,26" fill="#D21034" />
                <polygon
                  points="7,8.5 8.2,11.5 11.5,11.5 8.8,13.4 9.8,16.5 7,14.6 4.2,16.5 5.2,13.4 2.5,11.5 5.8,11.5"
                  fill="#FCE100"
                />
              </g>
            </g>
          </>
        )}
      </svg>
    </div>
  );
};

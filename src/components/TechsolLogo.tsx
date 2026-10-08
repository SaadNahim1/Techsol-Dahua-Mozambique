import React from 'react';

interface TechsolLogoProps {
  className?: string;
  compact?: boolean;
}

export const TechsolLogo: React.FC<TechsolLogoProps> = ({ className = 'h-11', compact = false }) => {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox={compact ? '0 0 580 245' : '0 0 920 245'}
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="TECHSOL - Segurança Inteligente. Futuro Garantido. | Dahua Technology Mozambique Partner"
      >
        {/* Left Emblem: Red Shield + Black Eagle Profile + Security Camera Lens Eye */}
        <g transform="translate(10, 12)">
          {/* Top-Right Red Shield Outline */}
          <path
            d="M84 36 C100 28, 108 18, 114 12 C122 20, 145 36, 184 44 C188 85, 184 126, 168 158"
            stroke="#D31118"
            strokeWidth="9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Bottom-Left Red Shield Outline */}
          <path
            d="M42 62 C36 112, 54 168, 114 206 C136 192, 152 177, 162 162"
            stroke="#D31118"
            strokeWidth="9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Black Eagle Upper Wing / Brow Sweep */}
          <path
            d="M22 2 C48 28, 108 42, 144 68 C164 83, 170 105, 166 130 C154 106, 126 88, 88 74 C54 61, 32 48, 20 26 C16 16, 18 7, 22 2 Z"
            fill="#0A0A0A"
          />

          {/* Black Eagle Lower Head & Hooked Beak */}
          <path
            d="M50 68 C72 78, 102 88, 128 104 C156 121, 174 146, 172 178 C170 186, 167 193, 163 198 C161 182, 150 168, 132 162 C116 157, 98 156, 82 146 C60 132, 52 104, 50 68 Z"
            fill="#0A0A0A"
          />

          {/* Camera Eye Cutout & Red Lens Pupil */}
          <circle cx="118" cy="122" r="24" fill="#FFFFFF" />
          <circle cx="118" cy="122" r="17" fill="#0A0A0A" />
          <circle cx="118" cy="122" r="12" fill="#FFFFFF" />
          <circle cx="118" cy="122" r="9.5" fill="#D31118" />
          <circle cx="121" cy="119" r="2.5" fill="#FFFFFF" />
        </g>

        {/* Center Wordmark: TECHSOL + Slogan */}
        <text
          x="222"
          y="146"
          fill="#0A0A0A"
          fontFamily="'Impact', 'Arial Black', 'Plus Jakarta Sans', sans-serif"
          fontWeight="900"
          fontSize="110"
          letterSpacing="1.5"
          transform="scale(0.92, 1.08)"
        >
          TECHSOL
        </text>

        <text
          x="208"
          y="196"
          fontFamily="'Plus Jakarta Sans', 'Arial', sans-serif"
          fontWeight="700"
          fontSize="21.5"
        >
          <tspan fill="#0A0A0A">Segurança Inteligente. </tspan>
          <tspan fill="#D31118">Futuro Garantido.</tspan>
        </text>

        {!compact && (
          <>
            {/* Vertical Divider Bar */}
            <line
              x1="584"
              y1="28"
              x2="584"
              y2="212"
              stroke="#0A0A0A"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Right Partner Block: Dahua Technology + Mozambique Partner */}
            <g transform="translate(608, 38)">
              {/* Red 'd' / '@' outer arc of Dahua logo */}
              <path
                d="M70 96 C46 105, 16 102, 8 80 C0 56, 22 24, 58 22 C86 20, 102 36, 98 62 L114 22 L134 22 L114 82 C111 90, 104 92, 95 92"
                stroke="#D31118"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
              {/* Black italic 'a' */}
              <text
                x="26"
                y="82"
                fill="#0A0A0A"
                fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif"
                fontWeight="900"
                fontStyle="italic"
                fontSize="68"
              >
                a
              </text>
              {/* Red italic 'l' */}
              <path d="M96 82 L114 20 L132 20 L114 82 Z" fill="#D31118" />
              {/* Black italic 'hua' */}
              <text
                x="132"
                y="82"
                fill="#0A0A0A"
                fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif"
                fontWeight="900"
                fontStyle="italic"
                fontSize="68"
                letterSpacing="-1"
              >
                hua
              </text>

              {/* TECHNOLOGY */}
              <text
                x="78"
                y="104"
                fill="#0A0A0A"
                fontFamily="'Plus Jakarta Sans', 'Arial', sans-serif"
                fontWeight="800"
                fontSize="16.5"
                letterSpacing="1.5"
              >
                TECHNOLOGY
              </text>

              {/* Red Horizontal Line */}
              <line x1="6" y1="122" x2="288" y2="122" stroke="#D31118" strokeWidth="3.2" />

              {/* MOZAMBIQUE PARTNER */}
              <text
                x="6"
                y="153"
                fontFamily="'Plus Jakarta Sans', 'Arial', sans-serif"
                fontWeight="800"
                fontSize="20"
                letterSpacing="0.6"
              >
                <tspan fill="#111827">MOZAMBIQUE </tspan>
                <tspan fill="#0B5FA5">PARTNER</tspan>
              </text>

              {/* Mozambique Flag */}
              <g transform="translate(244, 134)">
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

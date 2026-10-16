import React from 'react';

interface TechsolLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const TechsolLogo: React.FC<TechsolLogoProps> = ({
  className = 'h-11',
  variant = 'light',
}) => {
  const isDark = variant === 'dark';
  const primaryFill = isDark ? '#FFFFFF' : '#0A0A0A';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 560 210"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="TECHSOL – Segurança Inteligente. Futuro Garantido."
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
      </svg>
    </div>
  );
};

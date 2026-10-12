import React from 'react';

interface QrixoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const QrixoLogo: React.FC<QrixoLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  const iconSizes = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 min-w-0 ${className}`}>
      {/* Geometric Qrixo Icon (QR Finder Square + 'X' Intersecting Data Matrix) */}
      <div
        className={`flex ${iconSizes[size]} shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] text-white shadow-sm ring-1 ring-[#1D4ED8]/20 transition-transform hover:scale-105`}
        title="Qrixo — Custom QR. Your Style."
      >
        <svg
          className="h-3/5 w-3/5"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer QR Corner Square */}
          <rect
            x="4"
            y="4"
            width="17"
            height="17"
            rx="4.5"
            stroke="white"
            strokeWidth="2.75"
          />
          {/* Inner QR Core Module */}
          <rect
            x="8.5"
            y="8.5"
            width="8"
            height="8"
            rx="2"
            fill="white"
          />
          {/* Distinctive 'X' Matrix & 'Q' Descender */}
          {/* Diagonal 1: connects QR corner to bottom-right (Q tail) */}
          <path
            d="M17.5 17.5 L26.5 26.5"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Diagonal 2: crossing stroke forming the iconic 'X' in Qrixo */}
          <path
            d="M26.5 18.5 L19 26"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* Terminal precision dot */}
          <circle cx="26.5" cy="26.5" r="1.5" fill="white" />
        </svg>
      </div>

      {/* Brand Name & Tagline */}
      <div className="min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-sans ${titleSizes[size]} font-extrabold tracking-tight text-[#111111] dark:text-zinc-50`}
          >
            Qrixo
          </span>
          <span className="rounded-full bg-blue-100 dark:bg-blue-950 dark:border dark:border-blue-800 px-1.5 py-0.5 text-[9px] font-mono font-bold text-blue-700 dark:text-blue-300">
            PRO
          </span>
        </div>
        {showTagline && (
          <span className="mt-0.5 font-mono text-[10px] sm:text-[11px] font-medium tracking-tight text-[#666660] dark:text-zinc-400 truncate">
            Custom QR. Your Style.
          </span>
        )}
      </div>
    </div>
  );
};

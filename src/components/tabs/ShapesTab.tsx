import React from 'react';
import type { DotType, CornerSquareType, CornerDotType } from 'qr-code-styling';
import type { QRState } from '../../types/qr';

interface ShapesTabProps {
  state: QRState;
  onChange: (patch: Partial<QRState>) => void;
}

export const ShapesTab: React.FC<ShapesTabProps> = ({ state, onChange }) => {
  const dotTypes: { id: DotType; label: string; preview: React.ReactNode }[] = [
    {
      id: 'square',
      label: 'Square',
      preview: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="8" height="8" />
          <rect x="14" y="2" width="8" height="8" />
          <rect x="2" y="14" width="8" height="8" />
          <rect x="14" y="14" width="8" height="8" />
        </svg>
      ),
    },
    {
      id: 'dots',
      label: 'Dots',
      preview: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="6" cy="6" r="4" />
          <circle cx="18" cy="6" r="4" />
          <circle cx="6" cy="18" r="4" />
          <circle cx="18" cy="18" r="4" />
        </svg>
      ),
    },
    {
      id: 'rounded',
      label: 'Rounded',
      preview: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="8" height="8" rx="2.5" />
          <rect x="14" y="2" width="8" height="8" rx="2.5" />
          <rect x="2" y="14" width="8" height="8" rx="2.5" />
          <rect x="14" y="14" width="8" height="8" rx="2.5" />
        </svg>
      ),
    },
    {
      id: 'extra-rounded',
      label: 'Extra Rounded',
      preview: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="8" height="8" rx="4" />
          <rect x="14" y="2" width="8" height="8" rx="4" />
          <rect x="2" y="14" width="8" height="8" rx="4" />
          <rect x="14" y="14" width="8" height="8" rx="4" />
        </svg>
      ),
    },
    {
      id: 'classy',
      label: 'Classy',
      preview: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2,2 L10,2 A0,0 0 0,1 10,2 L10,6 A4,4 0 0,1 6,10 L2,10 A0,0 0 0,1 2,10 Z" />
          <path d="M14,2 L22,2 A0,0 0 0,1 22,2 L22,6 A4,4 0 0,1 18,10 L14,10 A0,0 0 0,1 14,10 Z" />
          <path d="M2,14 L10,14 A0,0 0 0,1 10,14 L10,18 A4,4 0 0,1 6,22 L2,22 A0,0 0 0,1 2,22 Z" />
          <path d="M14,14 L22,14 A0,0 0 0,1 22,14 L22,18 A4,4 0 0,1 18,22 L14,22 A0,0 0 0,1 14,22 Z" />
        </svg>
      ),
    },
    {
      id: 'classy-rounded',
      label: 'Classy Rounded',
      preview: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2,6 C2,3.8 3.8,2 6,2 L10,2 L10,6 C10,8.2 8.2,10 6,10 L2,10 Z" />
          <path d="M14,6 C14,3.8 15.8,2 18,2 L22,2 L22,6 C22,8.2 20.2,10 18,10 L14,10 Z" />
          <path d="M2,18 C2,15.8 3.8,14 6,14 L10,14 L10,18 C10,20.2 8.2,22 6,22 L2,22 Z" />
          <path d="M14,18 C14,15.8 15.8,14 18,14 L22,14 L22,18 C22,20.2 20.2,22 18,22 L14,22 Z" />
        </svg>
      ),
    },
  ];

  const cornerSquareTypes: {
    id: CornerSquareType;
    label: string;
    preview: React.ReactNode;
  }[] = [
    {
      id: 'square',
      label: 'Square',
      preview: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="18" height="18" />
        </svg>
      ),
    },
    {
      id: 'extra-rounded',
      label: 'Extra Rounded',
      preview: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="18" height="18" rx="6" />
        </svg>
      ),
    },
    {
      id: 'dot',
      label: 'Dot / Circle',
      preview: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
    },
  ];

  const cornerDotTypes: {
    id: CornerDotType;
    label: string;
    preview: React.ReactNode;
  }[] = [
    {
      id: 'square',
      label: 'Square Dot',
      preview: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="6" width="12" height="12" />
        </svg>
      ),
    },
    {
      id: 'dot',
      label: 'Circular Dot',
      preview: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Dot Shapes */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-[#18181B] dark:text-zinc-200">
            Bentuk Pola Titik (Dot Shape)
          </label>
          <span className="font-mono text-[11px] text-[#71717A] dark:text-zinc-400 uppercase">
            {state.dotType}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {dotTypes.map((dot) => (
            <button
              key={dot.id}
              onClick={() => onChange({ dotType: dot.id })}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center ${
                state.dotType === dot.id
                  ? 'border-[#1D4ED8] bg-blue-50/70 text-[#1D4ED8] dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 shadow-2xs font-semibold ring-1 ring-[#1D4ED8]'
                  : 'border-[#E4E2DC] bg-white text-[#52525B] hover:bg-[#F4F4F0] dark:border-[#27272A] dark:bg-[#141417] dark:text-zinc-300 dark:hover:bg-[#202025]'
              }`}
            >
              <div className="mb-2 text-[#18181B] dark:text-zinc-100">{dot.preview}</div>
              <span className="text-xs">{dot.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Corner Square Shapes */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-[#18181B] dark:text-zinc-200">
            Bentuk Bingkai Sudut (Corner Square)
          </label>
          <span className="font-mono text-[11px] text-[#71717A] dark:text-zinc-400 uppercase">
            {state.cornerSquareType}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {cornerSquareTypes.map((cs) => (
            <button
              key={cs.id}
              onClick={() => onChange({ cornerSquareType: cs.id })}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center ${
                state.cornerSquareType === cs.id
                  ? 'border-[#1D4ED8] bg-blue-50/70 text-[#1D4ED8] dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 shadow-2xs font-semibold ring-1 ring-[#1D4ED8]'
                  : 'border-[#E4E2DC] bg-white text-[#52525B] hover:bg-[#F4F4F0] dark:border-[#27272A] dark:bg-[#141417] dark:text-zinc-300 dark:hover:bg-[#202025]'
              }`}
            >
              <div className="mb-2 text-[#18181B] dark:text-zinc-100">{cs.preview}</div>
              <span className="text-xs">{cs.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Corner Dot Shapes */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-[#18181B] dark:text-zinc-200">
            Bentuk Titik Sudut (Corner Dot)
          </label>
          <span className="font-mono text-[11px] text-[#71717A] dark:text-zinc-400 uppercase">
            {state.cornerDotType}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {cornerDotTypes.map((cd) => (
            <button
              key={cd.id}
              onClick={() => onChange({ cornerDotType: cd.id })}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center ${
                state.cornerDotType === cd.id
                  ? 'border-[#1D4ED8] bg-blue-50/70 text-[#1D4ED8] dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 shadow-2xs font-semibold ring-1 ring-[#1D4ED8]'
                  : 'border-[#E4E2DC] bg-white text-[#52525B] hover:bg-[#F4F4F0] dark:border-[#27272A] dark:bg-[#141417] dark:text-zinc-300 dark:hover:bg-[#202025]'
              }`}
            >
              <div className="mb-2 text-[#18181B] dark:text-zinc-100">{cd.preview}</div>
              <span className="text-xs">{cd.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

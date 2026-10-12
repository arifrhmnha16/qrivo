import React from 'react';
import type { QRState } from '../../types/qr';

interface ColorsTabProps {
  state: QRState;
  onChange: (patch: Partial<QRState>) => void;
}

const PALETTE_SWATCHES = [
  { name: 'Pure Ink', hex: '#111827' },
  { name: 'Cobalt Blue', hex: '#1D4ED8' },
  { name: 'Deep Violet', hex: '#6D28D9' },
  { name: 'Emerald', hex: '#064E3B' },
  { name: 'Ruby Crimson', hex: '#9F1239' },
  { name: 'Amber Gold', hex: '#B45309' },
  { name: 'Midnight', hex: '#09090B' },
  { name: 'Electric Cyan', hex: '#0284C7' },
];

const BG_SWATCHES = [
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Warm Paper', hex: '#FBFBF9' },
  { name: 'Lavender Mist', hex: '#FAF5FF' },
  { name: 'Mint Ice', hex: '#F0FDF4' },
  { name: 'Rose Cream', hex: '#FFF1F2' },
];

export const ColorsTab: React.FC<ColorsTabProps> = ({ state, onChange }) => {
  return (
    <div className="space-y-6">
      {/* 1. Foreground / Dots Color */}
      <div className="rounded-xl border border-[#E4E2DC] bg-[#FAF9F5] dark:border-[#27272A] dark:bg-[#141417] p-4 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#18181B] dark:text-zinc-200">
            Warna Titik QR (Foreground)
          </label>
          {/* Solid vs Gradient Toggle */}
          <div className="flex rounded-lg border border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#1A1A1E] p-0.5 text-xs">
            <button
              onClick={() => onChange({ dotUseGradient: false })}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                !state.dotUseGradient
                  ? 'bg-[#1D4ED8] text-white shadow-xs font-semibold'
                  : 'text-[#71717A] dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-200'
              }`}
            >
              Solid
            </button>
            <button
              onClick={() => onChange({ dotUseGradient: true })}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                state.dotUseGradient
                  ? 'bg-[#1D4ED8] text-white shadow-xs font-semibold'
                  : 'text-[#71717A] dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-200'
              }`}
            >
              Gradien
            </button>
          </div>
        </div>

        {/* Solid Color Mode */}
        {!state.dotUseGradient ? (
          <div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={state.dotColor}
                onChange={(e) => onChange({ dotColor: e.target.value })}
                className="h-10 w-12 cursor-pointer rounded-lg border border-[#D4D4D8] dark:border-[#333338] bg-white dark:bg-[#1A1A1E] p-1"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={state.dotColor.toUpperCase()}
                  onChange={(e) => onChange({ dotColor: e.target.value })}
                  className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-1.5 font-mono text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none uppercase"
                />
              </div>
            </div>

            {/* Quick Swatches */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {PALETTE_SWATCHES.map((swatch) => (
                <button
                  key={swatch.hex}
                  onClick={() => onChange({ dotColor: swatch.hex })}
                  title={swatch.name}
                  className={`h-7 w-7 rounded-lg border transition-transform hover:scale-110 ${
                    state.dotColor.toLowerCase() === swatch.hex.toLowerCase()
                      ? 'ring-2 ring-[#1D4ED8] ring-offset-1 border-white dark:border-black'
                      : 'border-black/10 dark:border-white/10'
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Gradient Mode */
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#52525B] dark:text-zinc-300 mb-1">
                  Warna Awal
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={state.dotGradientColor1}
                    onChange={(e) => onChange({ dotGradientColor1: e.target.value })}
                    className="h-9 w-10 cursor-pointer rounded-lg border border-[#D4D4D8] dark:border-[#333338] bg-white dark:bg-[#1A1A1E] p-1"
                  />
                  <input
                    type="text"
                    value={state.dotGradientColor1.toUpperCase()}
                    onChange={(e) => onChange({ dotGradientColor1: e.target.value })}
                    className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-2 py-1 font-mono text-xs uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#52525B] dark:text-zinc-300 mb-1">
                  Warna Akhir
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={state.dotGradientColor2}
                    onChange={(e) => onChange({ dotGradientColor2: e.target.value })}
                    className="h-9 w-10 cursor-pointer rounded-lg border border-[#D4D4D8] dark:border-[#333338] bg-white dark:bg-[#1A1A1E] p-1"
                  />
                  <input
                    type="text"
                    value={state.dotGradientColor2.toUpperCase()}
                    onChange={(e) => onChange({ dotGradientColor2: e.target.value })}
                    className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-2 py-1 font-mono text-xs uppercase"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-[#52525B] dark:text-zinc-300 mb-1">
                  Tipe Gradien
                </label>
                <select
                  value={state.dotGradientType}
                  onChange={(e) =>
                    onChange({
                      dotGradientType: e.target.value as 'linear' | 'radial',
                    })
                  }
                  className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-2.5 py-1.5 text-xs focus:border-[#1D4ED8] focus:outline-none"
                >
                  <option value="linear">Linear (Garis lurus)</option>
                  <option value="radial">Radial (Pusat ke luar)</option>
                </select>
              </div>

              {state.dotGradientType === 'linear' && (
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-[#52525B] dark:text-zinc-300 mb-1">
                    <span>Sudut Rotasi</span>
                    <span className="font-mono">{state.dotGradientRotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="15"
                    value={state.dotGradientRotation}
                    onChange={(e) =>
                      onChange({ dotGradientRotation: Number(e.target.value) })
                    }
                    className="w-full cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Background Color & Transparency */}
      <div className="rounded-xl border border-[#E4E2DC] bg-[#FAF9F5] dark:border-[#27272A] dark:bg-[#141417] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs font-semibold text-[#18181B] dark:text-zinc-200 block">
              Latar Belakang (Background)
            </label>
            <p className="text-[11px] text-[#71717A] dark:text-zinc-400">
              Transparan memudahkan penempatan QR di atas poster atau kemasan.
            </p>
          </div>
          {/* Transparency Switch */}
          <label className="flex items-center gap-2 cursor-pointer bg-white dark:bg-[#1A1A1E] border border-[#E4E2DC] dark:border-[#27272A] px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#18181B] dark:text-zinc-200 shadow-2xs hover:bg-[#F4F4F0] dark:hover:bg-[#202025]">
            <input
              type="checkbox"
              checked={state.backgroundTransparent}
              onChange={(e) => onChange({ backgroundTransparent: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 dark:border-zinc-700 text-[#1D4ED8]"
            />
            <span>Transparan (Alpha)</span>
          </label>
        </div>

        {!state.backgroundTransparent && (
          <div className="pt-2 border-t border-[#E4E2DC]/60 dark:border-[#27272A]">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={state.backgroundColor}
                  onChange={(e) => onChange({ backgroundColor: e.target.value })}
                  className="h-9 w-11 cursor-pointer rounded-lg border border-[#D4D4D8] dark:border-[#333338] bg-white dark:bg-[#1A1A1E] p-1 shrink-0"
                />
                <input
                  type="text"
                  value={state.backgroundColor.toUpperCase()}
                  onChange={(e) => onChange({ backgroundColor: e.target.value })}
                  className="w-24 sm:w-28 rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-2.5 py-1.5 font-mono text-xs uppercase"
                />
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {BG_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.hex}
                    onClick={() => onChange({ backgroundColor: swatch.hex })}
                    title={swatch.name}
                    className={`h-7 w-7 rounded-lg border transition-transform hover:scale-110 ${
                      state.backgroundColor.toLowerCase() === swatch.hex.toLowerCase()
                        ? 'ring-2 ring-[#1D4ED8] ring-offset-1 border-black/20 dark:border-white/20'
                        : 'border-black/10 dark:border-white/10'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Independent Corner Colors */}
      <div className="rounded-xl border border-[#E4E2DC] bg-[#FAF9F5] dark:border-[#27272A] dark:bg-[#141417] p-4 space-y-3">
        <label className="text-xs font-semibold text-[#18181B] dark:text-zinc-200 block">
          Kustomisasi Warna Sudut (Corner Accents)
        </label>
        <p className="text-[11px] text-[#71717A] dark:text-zinc-400">
          Atur warna bingkai sudut atau titik sudut secara terpisah dari badan QR.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Corner Square Color */}
          <div className="rounded-lg border border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#1A1A1E] p-3">
            <label className="flex items-center justify-between text-xs font-medium text-[#18181B] dark:text-zinc-200 mb-2 cursor-pointer">
              <span>Warna Bingkai Sudut</span>
              <input
                type="checkbox"
                checked={state.cornerSquareCustomColor}
                onChange={(e) =>
                  onChange({ cornerSquareCustomColor: e.target.checked })
                }
                className="h-4 w-4 rounded text-[#1D4ED8]"
              />
            </label>
            {state.cornerSquareCustomColor ? (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={state.cornerSquareColor}
                  onChange={(e) => onChange({ cornerSquareColor: e.target.value })}
                  className="h-8 w-10 cursor-pointer rounded border border-[#D4D4D8] dark:border-[#333338] p-1"
                />
                <input
                  type="text"
                  value={state.cornerSquareColor.toUpperCase()}
                  onChange={(e) => onChange({ cornerSquareColor: e.target.value })}
                  className="w-full rounded border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#141417] dark:text-zinc-100 px-2 py-1 font-mono text-xs uppercase"
                />
              </div>
            ) : (
              <span className="text-[11px] text-[#A1A1AA] dark:text-zinc-500 italic">
                Mengikuti warna badan QR
              </span>
            )}
          </div>

          {/* Corner Dot Color */}
          <div className="rounded-lg border border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#1A1A1E] p-3">
            <label className="flex items-center justify-between text-xs font-medium text-[#18181B] dark:text-zinc-200 mb-2 cursor-pointer">
              <span>Warna Titik Tengah Sudut</span>
              <input
                type="checkbox"
                checked={state.cornerDotCustomColor}
                onChange={(e) =>
                  onChange({ cornerDotCustomColor: e.target.checked })
                }
                className="h-4 w-4 rounded text-[#1D4ED8]"
              />
            </label>
            {state.cornerDotCustomColor ? (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={state.cornerDotColor}
                  onChange={(e) => onChange({ cornerDotColor: e.target.value })}
                  className="h-8 w-10 cursor-pointer rounded border border-[#D4D4D8] dark:border-[#333338] p-1"
                />
                <input
                  type="text"
                  value={state.cornerDotColor.toUpperCase()}
                  onChange={(e) => onChange({ cornerDotColor: e.target.value })}
                  className="w-full rounded border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#141417] dark:text-zinc-100 px-2 py-1 font-mono text-xs uppercase"
                />
              </div>
            ) : (
              <span className="text-[11px] text-[#A1A1AA] dark:text-zinc-500 italic">
                Mengikuti warna badan QR
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

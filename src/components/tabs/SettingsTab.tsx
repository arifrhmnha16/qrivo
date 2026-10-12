import React from 'react';
import { RotateCcw } from 'lucide-react';
import type { QRState } from '../../types/qr';

interface SettingsTabProps {
  state: QRState;
  onChange: (patch: Partial<QRState>) => void;
  onReset: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  state,
  onChange,
  onReset,
}) => {
  const errorLevels: {
    level: 'L' | 'M' | 'Q' | 'H';
    label: string;
    recovery: string;
    desc: string;
  }[] = [
    {
      level: 'L',
      label: 'Low (L)',
      recovery: '~7%',
      desc: 'Ukuran modul paling ringkas, cocok untuk QR tanpa logo.',
    },
    {
      level: 'M',
      label: 'Medium (M)',
      recovery: '~15%',
      desc: 'Keseimbangan standar untuk penggunaan umum.',
    },
    {
      level: 'Q',
      label: 'Quartile (Q)',
      recovery: '~25%',
      desc: 'Toleransi kerusakan cukup tinggi.',
    },
    {
      level: 'H',
      label: 'High (H)',
      recovery: '~30%',
      desc: 'Rekomendasi Utama saat memakai logo di tengah!',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Error Correction Level */}
      <div className="rounded-xl border border-[#E4E2DC] bg-[#FAF9F5] dark:border-[#27272A] dark:bg-[#141417] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#18181B] dark:text-zinc-200">
            Tingkat Koreksi Error (Reed-Solomon ECL)
          </label>
          <span className="rounded bg-blue-100 dark:bg-blue-950 dark:border dark:border-blue-800 px-2 py-0.5 font-mono text-[11px] font-bold text-[#1D4ED8] dark:text-blue-300">
            Level {state.errorCorrectionLevel}
          </span>
        </div>
        <p className="text-[11px] text-[#71717A] dark:text-zinc-400">
          Semakin tinggi koreksi error, semakin tahan QR terhadap goresan, bayangan, atau logo di tengahnya.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {errorLevels.map((lvl) => (
            <button
              key={lvl.level}
              onClick={() => onChange({ errorCorrectionLevel: lvl.level })}
              className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all ${
                state.errorCorrectionLevel === lvl.level
                  ? 'border-[#1D4ED8] bg-blue-50/70 text-[#1D4ED8] dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 shadow-2xs ring-1 ring-[#1D4ED8]'
                  : 'border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#18181B] hover:bg-[#F4F4F0] dark:hover:bg-[#202025]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xs font-bold text-[#18181B] dark:text-zinc-100">{lvl.label}</span>
                <span className="font-mono text-[10px] text-blue-700 dark:text-blue-300 font-semibold bg-white dark:bg-[#141417] px-1 rounded border border-blue-200 dark:border-blue-800">
                  {lvl.recovery}
                </span>
              </div>
              <span className="text-[10px] text-[#71717A] dark:text-zinc-400 leading-tight">
                {lvl.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. QR Margin / Padding */}
      <div className="rounded-xl border border-[#E4E2DC] bg-[#FAF9F5] dark:border-[#27272A] dark:bg-[#141417] p-4 space-y-3">
        <div className="flex justify-between text-xs font-semibold text-[#18181B] dark:text-zinc-200">
          <span>Margin Luar QR (Quiet Zone)</span>
          <span className="font-mono text-[#1D4ED8] dark:text-blue-400">{state.margin} px</span>
        </div>
        <p className="text-[11px] text-[#71717A] dark:text-zinc-400">
          Quiet zone adalah batas putih/kosong di sekeliling QR yang diperlukan scanner kamera.
        </p>
        <input
          type="range"
          min="0"
          max="36"
          step="2"
          value={state.margin}
          onChange={(e) => onChange({ margin: Number(e.target.value) })}
          className="w-full cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#A1A1AA] dark:text-zinc-500">
          <span>0 px (Tanpa border)</span>
          <span>12 px (Standar)</span>
          <span>36 px (Lebar)</span>
        </div>
      </div>

      {/* 3. Export File Name */}
      <div className="rounded-xl border border-[#E4E2DC] bg-[#FAF9F5] dark:border-[#27272A] dark:bg-[#141417] p-4 space-y-2">
        <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200">
          Nama File Unduhan
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={state.exportFileName}
            onChange={(e) => onChange({ exportFileName: e.target.value })}
            placeholder="nama-qr-code"
            className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 font-mono text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none"
          />
          <span className="font-mono text-xs text-[#71717A] dark:text-zinc-400 uppercase font-bold">
            .{state.exportFormat}
          </span>
        </div>
      </div>

      {/* 4. Reset All Settings */}
      <div className="pt-2">
        <button
          onClick={() => {
            if (window.confirm('Yakin ingin mereset seluruh kustomisasi ke default pabrik?')) {
              onReset();
            }
          }}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/60 dark:bg-red-950/30 p-3 text-xs font-semibold text-red-700 dark:text-red-400 hover:bg-red-100/70 dark:hover:bg-red-900/50 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Kembalikan Semua Pengaturan ke Default</span>
        </button>
      </div>
    </div>
  );
};

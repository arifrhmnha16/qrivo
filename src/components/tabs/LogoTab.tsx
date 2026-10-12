import React, { useRef, useState } from 'react';
import { Upload, Trash2, ShieldAlert, CheckCircle2, Crop, Maximize2, Sparkles } from 'lucide-react';
import type { QRState } from '../../types/qr';
import { PRESET_LOGOS } from '../../utils/presetLogos';
import { fitImage1x1 } from '../../utils/imageProcess';

interface LogoTabProps {
  state: QRState;
  onChange: (patch: Partial<QRState>) => void;
}

export const LogoTab: React.FC<LogoTabProps> = ({ state, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [padShape, setPadShape] = useState<'none' | 'circle' | 'rounded' | 'square'>('none');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const applyFit1x1 = async (
    rawSrc: string,
    mode: 'contain' | 'crop',
    shape: 'none' | 'circle' | 'rounded' | 'square'
  ) => {
    setIsProcessing(true);
    const bgColor = shape === 'none' ? 'transparent' : '#FFFFFF';
    const fittedDataUrl = await fitImage1x1(rawSrc, mode, bgColor, shape, 1024);
    setIsProcessing(false);
    return fittedDataUrl;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate mime type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Format tidak didukung. Harap unggah file PNG, SVG, JPG, atau WebP.');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Ukuran file terlalu besar (maksimal 5 MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const rawDataUrl = event.target?.result as string;
      if (rawDataUrl) {
        // Auto-upgrade error correction to H if it's currently L or M
        const newErrorCorrection =
          state.errorCorrectionLevel === 'L' || state.errorCorrectionLevel === 'M'
            ? 'H'
            : state.errorCorrectionLevel;

        // Auto Fit 1:1 Immediately!
        const fitted1x1 = await applyFit1x1(rawDataUrl, state.logoFitMode || 'contain', padShape);

        onChange({
          rawLogoUrl: rawDataUrl,
          logoUrl: fitted1x1,
          logoName: file.name,
          errorCorrectionLevel: newErrorCorrection,
        });
      }
    };
    reader.onerror = () => {
      setUploadError('Gagal membaca file gambar.');
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = async (dataUrl: string, name: string) => {
    setUploadError(null);
    const newErrorCorrection =
      state.errorCorrectionLevel === 'L' || state.errorCorrectionLevel === 'M'
        ? 'H'
        : state.errorCorrectionLevel;

    // Auto fit 1:1
    const fitted1x1 = await applyFit1x1(dataUrl, state.logoFitMode || 'contain', padShape);

    onChange({
      rawLogoUrl: dataUrl,
      logoUrl: fitted1x1,
      logoName: `Preset: ${name}`,
      errorCorrectionLevel: newErrorCorrection,
    });
  };

  const handleModeChange = async (newMode: 'contain' | 'crop') => {
    if (!state.rawLogoUrl && !state.logoUrl) {
      onChange({ logoFitMode: newMode });
      return;
    }
    const source = state.rawLogoUrl || state.logoUrl;
    if (source) {
      const fitted = await applyFit1x1(source, newMode, padShape);
      onChange({
        logoFitMode: newMode,
        logoUrl: fitted,
      });
    }
  };

  const handlePadShapeChange = async (newShape: 'none' | 'circle' | 'rounded' | 'square') => {
    setPadShape(newShape);
    const source = state.rawLogoUrl || state.logoUrl;
    if (source) {
      const fitted = await applyFit1x1(source, state.logoFitMode || 'contain', newShape);
      onChange({
        logoUrl: fitted,
      });
    }
  };

  const handleRemoveLogo = () => {
    onChange({
      rawLogoUrl: null,
      logoUrl: null,
      logoName: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Dropzone */}
      <div className="rounded-xl border border-[#E4E2DC] bg-[#FAF9F5] dark:border-[#27272A] dark:bg-[#141417] p-4">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-[#18181B] dark:text-zinc-200">
            Logo Custom di Tengah QR
          </label>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-950 dark:border dark:border-blue-800 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300">
            <Sparkles className="h-2.5 w-2.5" />
            Auto-Fit 1:1 Aktif
          </span>
        </div>
        <p className="text-[11px] text-[#71717A] dark:text-zinc-400 mb-3">
          Gambar logo otomatis disesuaikan ke rasio 1:1 persegi sempurna agar proporsional di tengah QR code.
        </p>

        {state.logoUrl ? (
          <div className="flex items-center justify-between rounded-xl border border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#1A1A1E] p-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-[#E4E2DC] dark:border-[#27272A] bg-[repeating-conic-gradient(#E4E4E7_0%_25%,#FFFFFF_0%_50%)] dark:bg-[repeating-conic-gradient(#27272A_0%_25%,#18181B_0%_50%)] bg-[length:12px_12px] overflow-hidden p-1 shadow-inner">
                <img
                  src={state.logoUrl}
                  alt="Preview Logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#18181B] dark:text-zinc-100 truncate max-w-[200px]">
                  {state.logoName || 'Logo Aktif'}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Rasio 1:1 Presisi</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-[#E4E2DC] dark:border-[#27272A] dark:bg-[#202025] px-2.5 py-1.5 text-xs font-medium text-[#52525B] dark:text-zinc-300 hover:bg-[#F4F4F0] dark:hover:bg-[#27272A]"
              >
                Ganti
              </button>
              <button
                onClick={handleRemoveLogo}
                title="Hapus Logo"
                className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D4D4D8] dark:border-[#333338] bg-white dark:bg-[#1A1A1E] p-6 cursor-pointer hover:border-[#1D4ED8] hover:bg-blue-50/20 dark:hover:border-blue-500 dark:hover:bg-blue-950/20 transition-all text-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 mb-2">
              <Upload className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-[#18181B] dark:text-zinc-200">
              Klik untuk unggah logo (PNG, SVG, JPG, WebP)
            </span>
            <span className="mt-1 text-[11px] text-[#71717A] dark:text-zinc-400">
              Maksimal 5 MB · Otomatis diproses menjadi rasio 1:1 persegi sempurna
            </span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          onChange={handleFileUpload}
          className="hidden"
        />

        {uploadError && (
          <div className="mt-2.5 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 p-2 text-xs text-red-700 dark:text-red-300">
            {uploadError}
          </div>
        )}
      </div>

      {/* Preset Icons Library */}
      <div>
        <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-2">
          Atau Pilih Ikon Preset Cepat (Auto 1:1)
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {PRESET_LOGOS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.dataUrl, preset.name)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                state.logoName?.includes(preset.name)
                  ? 'border-[#1D4ED8] bg-blue-50/60 dark:border-blue-500 dark:bg-blue-950/60 ring-1 ring-[#1D4ED8]'
                  : 'border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#1A1A1E] hover:bg-[#F4F4F0] dark:hover:bg-[#202025]'
              }`}
            >
              <img
                src={preset.dataUrl}
                alt={preset.name}
                className="h-7 w-7 object-contain mb-1"
              />
              <span className="text-[10px] text-[#52525B] dark:text-zinc-300 font-medium truncate w-full text-center">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Auto-Fit 1:1 Configuration Section */}
      {state.logoUrl && (
        <div className="rounded-xl border border-[#1D4ED8]/30 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/20 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-semibold text-xs text-[#1D4ED8] dark:text-blue-400">
              <Sparkles className="h-4 w-4" />
              <span>Opsi Auto-Fit 1:1 Persegi</span>
            </div>
            {isProcessing && (
              <span className="text-[10px] text-blue-600 dark:text-blue-300 animate-pulse font-mono">
                Menyesuaikan 1:1...
              </span>
            )}
          </div>

          {/* Mode Fit: Contain vs Crop */}
          <div>
            <label className="block text-[11px] font-semibold text-[#52525B] dark:text-zinc-300 mb-1.5">
              Metode Penyesuaian 1:1
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleModeChange('contain')}
                className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                  (state.logoFitMode || 'contain') === 'contain'
                    ? 'border-[#1D4ED8] bg-white text-[#1D4ED8] dark:border-blue-500 dark:bg-[#1A1A1E] dark:text-blue-300 font-semibold shadow-xs ring-1 ring-[#1D4ED8]'
                    : 'border-[#E4E2DC] bg-white/70 text-[#52525B] dark:border-[#27272A] dark:bg-[#141417] dark:text-zinc-300 hover:bg-white dark:hover:bg-[#1A1A1E]'
                }`}
              >
                <Maximize2 className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold">Fit Contain (Utuh 1:1)</div>
                  <div className="text-[10px] text-[#71717A] dark:text-zinc-400 leading-tight mt-0.5">
                    Logo tampil utuh tanpa terpotong di dalam bingkai 1:1
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('crop')}
                className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                  state.logoFitMode === 'crop'
                    ? 'border-[#1D4ED8] bg-white text-[#1D4ED8] dark:border-blue-500 dark:bg-[#1A1A1E] dark:text-blue-300 font-semibold shadow-xs ring-1 ring-[#1D4ED8]'
                    : 'border-[#E4E2DC] bg-white/70 text-[#52525B] dark:border-[#27272A] dark:bg-[#141417] dark:text-zinc-300 hover:bg-white dark:hover:bg-[#1A1A1E]'
                }`}
              >
                <Crop className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold">Fit Cover (Penuh 1:1)</div>
                  <div className="text-[10px] text-[#71717A] dark:text-zinc-400 leading-tight mt-0.5">
                    Memotong ke tengah agar memenuhi seluruh bidang 1:1
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Pad / Badge Background Shape */}
          <div>
            <label className="block text-[11px] font-semibold text-[#52525B] dark:text-zinc-300 mb-1.5">
              Bantalan Latar Logo (Badge Pad 1:1)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { id: 'none', label: 'Transparan', desc: 'Tanpa alas' },
                { id: 'circle', label: 'Bulat Putih', desc: 'Badge lingkaran' },
                { id: 'rounded', label: 'Rounded', desc: 'Sudut tumpul' },
                { id: 'square', label: 'Kotak Putih', desc: 'Persegi rata' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handlePadShapeChange(item.id as any)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all ${
                    padShape === item.id
                      ? 'border-[#1D4ED8] bg-white text-[#1D4ED8] dark:border-blue-500 dark:bg-[#1A1A1E] dark:text-blue-300 font-semibold shadow-2xs ring-1 ring-[#1D4ED8]'
                      : 'border-[#E4E2DC] bg-white/70 text-[#52525B] dark:border-[#27272A] dark:bg-[#141417] dark:text-zinc-300 hover:bg-white dark:hover:bg-[#1A1A1E]'
                  }`}
                >
                  <span className="text-xs font-bold">{item.label}</span>
                  <span className="text-[9px] text-[#71717A] dark:text-zinc-400">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logo Tuning Sliders (Only if logo is active) */}
      {state.logoUrl && (
        <div className="rounded-xl border border-[#E4E2DC] bg-[#FAF9F5] dark:border-[#27272A] dark:bg-[#141417] p-4 space-y-4">
          <div className="text-xs font-semibold text-[#18181B] dark:text-zinc-200">
            Pengaturan Proporsi Logo di Dalam QR Code
          </div>

          {/* Size slider */}
          <div>
            <div className="flex justify-between text-xs font-medium text-[#52525B] dark:text-zinc-300 mb-1">
              <span>Ukuran Logo (Skala QR)</span>
              <span className="font-mono text-[#18181B] dark:text-zinc-100">
                {Math.round(state.logoSize * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.15"
              max="0.38"
              step="0.01"
              value={state.logoSize}
              onChange={(e) => onChange({ logoSize: Number(e.target.value) })}
              className="w-full cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#A1A1AA] dark:text-zinc-500 mt-0.5">
              <span>15% (Kecil)</span>
              <span>28% (Standar Ideal)</span>
              <span>38% (Maksimal)</span>
            </div>
          </div>

          {/* Margin slider */}
          <div>
            <div className="flex justify-between text-xs font-medium text-[#52525B] dark:text-zinc-300 mb-1">
              <span>Jarak Bersih (Margin Logo)</span>
              <span className="font-mono text-[#18181B] dark:text-zinc-100">{state.logoMargin} px</span>
            </div>
            <input
              type="range"
              min="0"
              max="16"
              step="1"
              value={state.logoMargin}
              onChange={(e) => onChange({ logoMargin: Number(e.target.value) })}
              className="w-full cursor-pointer"
            />
          </div>

          {/* Hide dots behind logo */}
          <div className="pt-2 border-t border-[#E4E2DC] dark:border-[#27272A]">
            <label className="flex items-center justify-between cursor-pointer text-xs font-medium text-[#18181B] dark:text-zinc-200">
              <div>
                <span>Sembunyikan Titik di Belakang Logo</span>
                <p className="text-[11px] text-[#71717A] dark:text-zinc-400 font-normal">
                  Menjaga area logo bersih tanpa tertabrak titik QR code.
                </p>
              </div>
              <input
                type="checkbox"
                checked={state.hideBackgroundDots}
                onChange={(e) =>
                  onChange({ hideBackgroundDots: e.target.checked })
                }
                className="h-4 w-4 rounded text-[#1D4ED8]"
              />
            </label>
          </div>

          {/* Security / Error Correction Notice */}
          <div className="flex items-start gap-2 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-2.5 text-xs text-blue-900 dark:text-blue-300">
            <ShieldAlert className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
            <span className="text-[11px] leading-relaxed">
              Tingkat koreksi error QR otomatis disetel ke <strong>Level H (30%)</strong> agar QR code tetap mudah dibaca oleh kamera smartphone meskipun bagian tengah tertutup logo.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

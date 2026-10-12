import React, { useEffect, useRef, useState, useMemo } from 'react';
import QRCodeStyling from 'qr-code-styling';
import {
  Download,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
} from 'lucide-react';
import type { QRState, ExportFormat } from '../types/qr';
import { buildQROptions, exportQRCode, copyQRToClipboard } from '../utils/qrBuilder';
import { checkScannability } from '../utils/contrast';

interface QRPreviewCardProps {
  state: QRState;
  onChange: (patch: Partial<QRState>) => void;
  id?: string;
}

export const QRPreviewCard: React.FC<QRPreviewCardProps> = ({ state, onChange, id }) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);

  const [previewBg, setPreviewBg] = useState<'paper' | 'checker' | 'dark'>('checker');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Scannability diagnostic
  const scannability = useMemo(() => {
    return checkScannability(
      state.dotColor,
      state.backgroundColor,
      state.backgroundTransparent,
      !!state.logoUrl,
      state.errorCorrectionLevel,
      state.logoSize
    );
  }, [
    state.dotColor,
    state.backgroundColor,
    state.backgroundTransparent,
    state.logoUrl,
    state.errorCorrectionLevel,
    state.logoSize,
  ]);

  // Initialize and update QRCodeStyling
  useEffect(() => {
    if (!qrRef.current) return;

    const previewSize = 340;
    const opts = buildQROptions(state, previewSize, 'canvas');

    if (!qrInstanceRef.current) {
      const instance = new QRCodeStyling(opts);
      qrInstanceRef.current = instance;
      qrRef.current.innerHTML = '';
      instance.append(qrRef.current);
    } else {
      qrInstanceRef.current.update(opts);
    }
  }, [state]);

  const handleDownload = async (formatOverride?: ExportFormat) => {
    const format = formatOverride || state.exportFormat;
    setIsExporting(true);
    setExportNotice(`Sedang merender ${format.toUpperCase()} (${state.exportSize}px)...`);

    try {
      await exportQRCode(
        { ...state, exportFormat: format },
        (msg) => setExportNotice(msg)
      );
      setExportNotice(`Berhasil diunduh! File murni QR Code.`);
      setTimeout(() => setExportNotice(null), 3500);
    } catch (err) {
      console.error('Export error:', err);
      setExportNotice('Gagal mengunduh QR Code. Periksa izin browser.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyClipboard = async () => {
    setCopied(false);
    const success = await copyQRToClipboard(state);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      alert('Tidak dapat menyalin gambar secara otomatis. Gunakan tombol Download PNG.');
    }
  };

  return (
    <div
      id={id}
      className="flex flex-col rounded-xl sm:rounded-2xl border border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#18181B] p-3.5 sm:p-5 md:p-6 shadow-sm lg:sticky lg:top-6 w-full overflow-hidden transition-colors duration-200"
    >
      {/* Artboard Header */}
      <div className="flex items-center justify-between border-b border-[#EBE8E1] dark:border-[#27272A] pb-3 mb-3.5 gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0 rounded-full bg-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-950" />
          <span className="font-mono text-[11px] sm:text-xs font-semibold text-[#18181B] dark:text-zinc-100 tracking-wide truncate">
            ARTBOARD PREVIEW
          </span>
          <span className="hidden xs:inline rounded bg-[#F4F4F0] dark:bg-[#27272A] px-1.5 py-0.5 font-mono text-[10px] text-[#71717A] dark:text-zinc-400">
            Auto-Scale
          </span>
        </div>

        {/* Canvas Background switchers */}
        <div className="flex items-center gap-0.5 bg-[#F4F4F0] dark:bg-[#141417] p-0.5 rounded-lg border border-[#E4E2DC] dark:border-[#27272A] shrink-0">
          <button
            onClick={() => setPreviewBg('checker')}
            title="Pola catur (lihat transparansi)"
            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-[11px] rounded font-medium transition-colors ${
              previewBg === 'checker'
                ? 'bg-white dark:bg-[#27272A] shadow-2xs text-[#18181B] dark:text-zinc-100'
                : 'text-[#71717A] dark:text-zinc-400'
            }`}
          >
            Alpha
          </button>
          <button
            onClick={() => setPreviewBg('paper')}
            title="Latar Kertas"
            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-[11px] rounded font-medium transition-colors ${
              previewBg === 'paper'
                ? 'bg-white dark:bg-[#27272A] shadow-2xs text-[#18181B] dark:text-zinc-100'
                : 'text-[#71717A] dark:text-zinc-400'
            }`}
          >
            Kertas
          </button>
          <button
            onClick={() => setPreviewBg('dark')}
            title="Latar Gelap"
            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-[11px] rounded font-medium transition-colors ${
              previewBg === 'dark'
                ? 'bg-white dark:bg-[#27272A] shadow-2xs text-[#18181B] dark:text-zinc-100'
                : 'text-[#71717A] dark:text-zinc-400'
            }`}
          >
            Gelap
          </button>
        </div>
      </div>

      {/* Scannability Assessment Bar */}
      <div
        className={`mb-3 flex items-start gap-2 rounded-xl border p-2.5 sm:p-3 text-xs transition-colors ${
          scannability.status === 'optimal'
            ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900 dark:border-emerald-800/80 dark:bg-emerald-950/40 dark:text-emerald-300'
            : scannability.status === 'good'
            ? 'border-blue-200 bg-blue-50/70 text-blue-900 dark:border-blue-800/80 dark:bg-blue-950/40 dark:text-blue-300'
            : scannability.status === 'warning'
            ? 'border-amber-200 bg-amber-50/70 text-amber-900 dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-300'
            : 'border-red-200 bg-red-50/70 text-red-900 dark:border-red-800/80 dark:bg-red-950/40 dark:text-red-300'
        }`}
      >
        {scannability.status === 'optimal' || scannability.status === 'good' ? (
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
        ) : (
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-1 font-semibold text-[11px] sm:text-xs">
            <span>{scannability.title}</span>
            <span className="font-mono text-[10px] sm:text-[11px]">
              {scannability.contrastRatio}:1 · {scannability.score}%
            </span>
          </div>
          <p className="mt-0.5 text-[10px] sm:text-[11px] opacity-90 leading-relaxed">
            {scannability.message}
          </p>
        </div>
      </div>

      {/* Main Artboard Canvas Frame */}
      <div className="relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-xl border border-[#E4E2DC] bg-zinc-50 dark:border-[#27272A] dark:bg-[#121215] p-3 sm:p-6 min-h-[280px] sm:min-h-[360px]">
        {/* Crop Marks */}
        <div className="absolute top-2 left-2 font-mono text-[10px] text-zinc-400 dark:text-zinc-600 select-none">
          +
        </div>
        <div className="absolute top-2 right-2 font-mono text-[10px] text-zinc-400 dark:text-zinc-600 select-none">
          +
        </div>
        <div className="absolute bottom-2 left-2 font-mono text-[10px] text-zinc-400 dark:text-zinc-600 select-none">
          +
        </div>
        <div className="absolute bottom-2 right-2 font-mono text-[10px] text-zinc-400 dark:text-zinc-600 select-none">
          +
        </div>

        {/* Checkerboard container */}
        <div
          className={`relative flex items-center justify-center p-2.5 sm:p-3 rounded-xl transition-all shadow-sm max-w-full ${
            previewBg === 'checker'
              ? 'bg-[repeating-conic-gradient(#E4E4E7_0%_25%,#FFFFFF_0%_50%)] dark:bg-[repeating-conic-gradient(#27272A_0%_25%,#18181B_0%_50%)] bg-[length:14px_14px]'
              : previewBg === 'paper'
              ? 'bg-[#FBFBF9] dark:bg-[#1E1E24] border border-[#EBE8E1] dark:border-[#2E2E36]'
              : 'bg-zinc-900 border border-zinc-800'
          }`}
          style={{
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* Responsive QR Render Target */}
          <div
            ref={qrRef}
            className="flex items-center justify-center w-[250px] xs:w-[280px] sm:w-[320px] max-w-full aspect-square [&>canvas]:w-full [&>canvas]:h-auto [&>canvas]:max-h-full [&>canvas]:object-contain [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-h-full"
          />
        </div>
      </div>

      {/* Zoom and Preview Controls */}
      <div className="mt-2.5 flex items-center justify-between text-xs text-[#71717A] dark:text-zinc-400">
        <div className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px]">
          <span>Zoom:</span>
          <button
            onClick={() => setZoomLevel(0.85)}
            className={`px-1.5 py-0.5 rounded transition-colors ${
              zoomLevel === 0.85
                ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            85%
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className={`px-1.5 py-0.5 rounded transition-colors ${
              zoomLevel === 1
                ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            100%
          </button>
          <button
            onClick={() => setZoomLevel(1.15)}
            className={`px-1.5 py-0.5 rounded transition-colors ${
              zoomLevel === 1.15
                ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            115%
          </button>
        </div>

        <span className="font-mono text-[10px] sm:text-[11px] text-[#A1A1AA] dark:text-zinc-400 truncate max-w-[130px]">
          {state.backgroundTransparent ? 'Transparan' : state.backgroundColor}
        </span>
      </div>

      {/* Export Feedback notification */}
      {exportNotice && (
        <div className="mt-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 p-2 text-center text-xs text-blue-800 dark:text-blue-300 animate-in fade-in">
          {exportNotice}
        </div>
      )}

      {/* Primary Download & Export Bar */}
      <div className="mt-3.5 space-y-2 border-t border-[#EBE8E1] dark:border-[#27272A] pt-3">
        {/* Output resolution & format bar */}
        <div className="grid grid-cols-2 gap-2">
          {/* Format selector */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-semibold text-[#52525B] dark:text-zinc-300 mb-1">
              Format
            </label>
            <div className="flex rounded-lg border border-[#E4E2DC] bg-[#FAF9F5] dark:border-[#27272A] dark:bg-[#141417] p-0.5">
              {(['png', 'svg', 'webp'] as ExportFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => onChange({ exportFormat: fmt })}
                  className={`flex-1 py-1 text-[11px] sm:text-xs font-semibold uppercase rounded-md transition-all ${
                    state.exportFormat === fmt
                      ? 'bg-[#1D4ED8] text-white shadow-xs'
                      : 'text-[#52525B] dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-200'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Resolution selector */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-semibold text-[#52525B] dark:text-zinc-300 mb-1">
              Resolusi
            </label>
            <select
              value={state.exportSize}
              onChange={(e) => onChange({ exportSize: Number(e.target.value) })}
              className="w-full rounded-lg border border-[#E4E2DC] bg-white dark:border-[#3F3F46] dark:bg-[#1F1F23] dark:text-zinc-100 px-2 py-1 sm:py-1.5 text-xs font-medium text-[#18181B] focus:border-[#1D4ED8] focus:outline-none"
            >
              <option value={512}>512px (Standar)</option>
              <option value={1024}>1024px (HD Rekomendasi)</option>
              <option value={2048}>2048px (2K Ultra Print)</option>
              <option value={3000}>3000px (3K High-Res)</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => handleDownload()}
            disabled={isExporting}
            className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1E40AF] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            <Download className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {isExporting
                ? 'Memproses...'
                : `Unduh ${state.exportFormat.toUpperCase()} (${state.exportSize}px)`}
            </span>
          </button>

          <button
            onClick={handleCopyClipboard}
            title="Salin PNG ke clipboard"
            className="min-h-[44px] flex items-center justify-center gap-1.5 rounded-xl border border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#1F1F23] px-3 sm:px-3.5 py-2.5 text-xs font-semibold text-[#18181B] dark:text-zinc-200 hover:bg-[#F4F4F0] dark:hover:bg-[#27272A] active:scale-[0.98] transition-all shadow-2xs shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400 text-xs">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-[#52525B] dark:text-zinc-400" />
                <span className="text-xs">Salin</span>
              </>
            )}
          </button>
        </div>

        {/* Output Guarantee notice */}
        <div className="flex items-start gap-1.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 px-2.5 py-1.5 text-[10px] text-emerald-900 dark:text-emerald-300">
          <FileCheck2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
          <span className="leading-snug">
            <strong>Output Murni:</strong> Hanya file QR Code saja tanpa watermark, mockup, atau border.
          </span>
        </div>
      </div>
    </div>
  );
};

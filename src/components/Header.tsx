import React, { useState } from 'react';
import { RotateCcw, Palette, Sun, Moon } from 'lucide-react';
import { PRESET_THEMES } from '../utils/presetThemes';
import type { PresetTheme } from '../types/qr';
import { QrivoLogo } from './QrivoLogo';

interface HeaderProps {
  onApplyTheme: (theme: PresetTheme) => void;
  onReset: () => void;
  onToggleGridGuide: () => void;
  showGridGuide: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onApplyTheme,
  onReset,
  onToggleGridGuide,
  showGridGuide,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  return (
    <header className="relative w-full border-b border-[#E4E2DC] bg-[#FAF9F5] dark:bg-[#121215] dark:border-[#27272A] px-3.5 py-4 sm:px-6 sm:py-6 md:px-8 overflow-x-clip transition-colors duration-200">
      {/* Top action & branding bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
        {/* Qrivo Geometric Brand Logo & Tagline */}
        <QrivoLogo size="md" showTagline={true} />

        {/* Action bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Dark / Light Theme Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Beralih ke Mode Terang (Light Mode)' : 'Beralih ke Mode Gelap (Dark Mode)'}
            className="flex items-center gap-1.5 rounded-lg border border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#18181B] px-2.5 py-1.5 text-xs font-semibold text-[#18181B] dark:text-zinc-200 shadow-2xs hover:bg-[#F4F4F0] dark:hover:bg-[#27272A] active:scale-95 transition-all"
          >
            {isDarkMode ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400 animate-in spin-in-90 duration-200" />
                <span className="hidden xs:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-[#1D4ED8] animate-in spin-in-90 duration-200" />
                <span className="hidden xs:inline">Dark</span>
              </>
            )}
          </button>

          {/* Grid Blueprint Toggle */}
          <button
            onClick={onToggleGridGuide}
            title="Toggle Blueprint Grid Mode"
            className={`hidden md:flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
              showGridGuide
                ? 'border-purple-400 bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:border-purple-600 dark:text-purple-300 shadow-xs'
                : 'border-[#E4E2DC] bg-white text-[#52525B] hover:bg-[#F4F4F0] dark:border-[#27272A] dark:bg-[#18181B] dark:text-zinc-300 dark:hover:bg-[#27272A]'
            }`}
          >
            <span className="text-xs">📐</span>
            <span>Blueprint</span>
          </button>

          {/* Theme Presets Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-1 sm:gap-1.5 rounded-lg border border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#18181B] px-2.5 py-1.5 text-xs font-semibold text-[#18181B] dark:text-zinc-200 shadow-2xs hover:bg-[#F4F4F0] dark:hover:bg-[#27272A] transition-colors"
            >
              <Palette className="h-3.5 w-3.5 text-[#1D4ED8] dark:text-blue-400" />
              <span className="hidden xs:inline sm:inline">Tema</span>
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-28px)] rounded-xl border border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#18181B] p-2 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-2 py-1.5 text-[10px] font-mono text-[#71717A] dark:text-zinc-400 uppercase tracking-wider">
                  Pilih Gaya Desain
                </div>
                <div className="space-y-1">
                  {PRESET_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        onApplyTheme(theme);
                        setShowThemeMenu(false);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors hover:bg-[#F4F4F0] dark:hover:bg-[#27272A]"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-4 w-4 rounded-full border border-black/10 dark:border-white/10 shrink-0"
                          style={{
                            background: theme.dotUseGradient
                              ? `linear-gradient(135deg, ${theme.dotGradientColor1}, ${theme.dotGradientColor2})`
                              : theme.dotColor,
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-[#18181B] dark:text-zinc-100 truncate">{theme.name}</div>
                          <div className="text-[10px] text-[#71717A] dark:text-zinc-400 leading-tight truncate">
                            {theme.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              if (window.confirm('Kembalikan semua pengaturan ke default?')) {
                onReset();
              }
            }}
            title="Reset ke pengaturan awal"
            className="flex items-center gap-1 rounded-lg border border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#18181B] px-2.5 py-1.5 text-xs font-medium text-[#71717A] dark:text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900 transition-colors shadow-2xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Editorial Hero Statement with Qrivo & Tagline */}
      <div className="mx-auto mt-4 sm:mt-6 max-w-4xl text-center px-2">
        <p className="font-mono text-[10px] sm:text-xs text-[#71717A] dark:text-zinc-400 tracking-wider mb-1.5 uppercase">
          Qrivo · Custom QR. Your Style.
        </p>
        
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] dark:text-zinc-50 leading-tight sm:leading-[1.15]">
          Custom QR.{' '}
          <span className="selection-badge-blue rounded-xs shadow-xs px-2.5 py-0.5 mx-0.5 font-serif italic text-white inline-block transform -rotate-1">
            Your Style.
          </span>
        </h1>

        <div className="mt-2.5 sm:mt-3.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#52525B] dark:text-zinc-400">
          <span className="text-[#71717A] dark:text-zinc-400">Bukan sekadar hitam-putih biasa...</span>
          <span className="relative inline-flex items-center rounded-sm border border-purple-300 dark:border-purple-600 bg-purple-50/90 dark:bg-purple-950/60 px-1.5 py-0.5 font-sans font-bold text-purple-900 dark:text-purple-200 text-[10px] sm:text-xs shadow-2xs">
            <span className="anchor-node -top-1 -left-1"></span>
            <span className="anchor-node -bottom-1 -right-1"></span>
            <span>QR CODE DENGAN IDENTITAS BRAND ANDA</span>
          </span>
          <span className="text-[#71717A] dark:text-zinc-400 hidden xs:inline">· High-DPI Vector Export</span>
        </div>
      </div>
    </header>
  );
};

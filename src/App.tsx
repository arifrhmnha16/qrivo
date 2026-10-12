import React, { useState, useEffect } from 'react';
import {
  Link,
  Shapes,
  Palette,
  Image as ImageIcon,
  Sliders,
  Sparkles,
  Eye,
  SlidersHorizontal,
  Download,
} from 'lucide-react';
import type { QRState, PresetTheme } from './types/qr';
import { DEFAULT_QR_STATE } from './utils/defaultState';
import { Header } from './components/Header';
import { QRPreviewCard } from './components/QRPreviewCard';
import { ContentTab } from './components/tabs/ContentTab';
import { ShapesTab } from './components/tabs/ShapesTab';
import { ColorsTab } from './components/tabs/ColorsTab';
import { LogoTab } from './components/tabs/LogoTab';
import { SettingsTab } from './components/tabs/SettingsTab';
import { exportQRCode } from './utils/qrBuilder';

type ActiveTab = 'content' | 'shapes' | 'colors' | 'logo' | 'settings';
type MobileViewMode = 'editor' | 'preview';

export const App: React.FC = () => {
  const [state, setState] = useState<QRState>(DEFAULT_QR_STATE);
  const [activeTab, setActiveTab] = useState<ActiveTab>('content');
  const [mobileViewMode, setMobileViewMode] = useState<MobileViewMode>('editor');
  const [showBlueprintGrid, setShowBlueprintGrid] = useState<boolean>(false);
  const [mobileExporting, setMobileExporting] = useState<boolean>(false);

  // Dark Theme State with persistence and system preference detection
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('qrivo_theme') || localStorage.getItem('qr_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('qrivo_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('qrivo_theme', 'light');
    }
  }, [isDarkMode]);

  const handleStateChange = (patch: Partial<QRState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  const handleApplyTheme = (theme: PresetTheme) => {
    setState((prev) => ({
      ...prev,
      dotType: theme.dotType,
      dotColor: theme.dotColor,
      dotUseGradient: theme.dotUseGradient,
      dotGradientType: theme.dotGradientType || 'linear',
      dotGradientColor1: theme.dotGradientColor1 || theme.dotColor,
      dotGradientColor2: theme.dotGradientColor2 || theme.dotColor,
      cornerSquareType: theme.cornerSquareType,
      cornerSquareCustomColor: theme.cornerSquareCustomColor,
      cornerSquareColor: theme.cornerSquareColor || theme.dotColor,
      cornerDotType: theme.cornerDotType,
      cornerDotCustomColor: theme.cornerDotCustomColor,
      cornerDotColor: theme.cornerDotColor || theme.dotColor,
      backgroundColor: theme.backgroundColor,
      backgroundTransparent: theme.backgroundTransparent,
    }));
  };

  const handleReset = () => {
    setState(DEFAULT_QR_STATE);
  };

  const handleQuickDownload = async () => {
    setMobileExporting(true);
    try {
      await exportQRCode(state);
    } catch (e) {
      console.error(e);
    } finally {
      setMobileExporting(false);
    }
  };

  const navTabs: { id: ActiveTab; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { id: 'content', label: '1. Konten', shortLabel: 'Konten', icon: <Link className="h-4 w-4" /> },
    { id: 'shapes', label: '2. Bentuk', shortLabel: 'Bentuk', icon: <Shapes className="h-4 w-4" /> },
    { id: 'colors', label: '3. Warna', shortLabel: 'Warna', icon: <Palette className="h-4 w-4" /> },
    { id: 'logo', label: '4. Logo', shortLabel: 'Logo', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'settings', label: '5. Pengaturan', shortLabel: 'Opsi', icon: <Sliders className="h-4 w-4" /> },
  ];

  return (
    <div
      className={`min-h-screen text-[#111111] dark:text-zinc-100 transition-colors duration-200 overflow-x-hidden ${
        showBlueprintGrid ? 'blueprint-grid blueprint-dots' : 'paper-texture'
      }`}
    >
      {/* Top Editorial Header */}
      <Header
        onApplyTheme={handleApplyTheme}
        onReset={handleReset}
        onToggleGridGuide={() => setShowBlueprintGrid(!showBlueprintGrid)}
        showGridGuide={showBlueprintGrid}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Workspace Canvas */}
      <main className="mx-auto max-w-7xl px-3.5 py-4 sm:px-6 sm:py-8 md:px-8 pb-24 lg:pb-12">
        {/* Mobile View Switcher (Visible only on mobile screens < lg) */}
        <div className="mb-4 flex lg:hidden items-center justify-center">
          <div className="inline-flex rounded-xl border border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#18181B] p-1 shadow-2xs w-full max-w-md">
            <button
              onClick={() => setMobileViewMode('editor')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all ${
                mobileViewMode === 'editor'
                  ? 'bg-[#1D4ED8] text-white shadow-xs'
                  : 'text-[#52525B] dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-100'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Kustomisasi QR</span>
            </button>
            <button
              onClick={() => setMobileViewMode('preview')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all ${
                mobileViewMode === 'preview'
                  ? 'bg-[#1D4ED8] text-white shadow-xs'
                  : 'text-[#52525B] dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-100'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Lihat Preview</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          {/* Left Column: Editor Controls & Customization */}
          <div
            className={`lg:col-span-7 flex flex-col space-y-3.5 sm:space-y-4 ${
              mobileViewMode === 'preview' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Nav Tabs Bar */}
            <div className="rounded-xl sm:rounded-2xl border border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#18181B] p-1 sm:p-1.5 shadow-2xs w-full">
              <div className="grid grid-cols-5 gap-1 sm:flex sm:overflow-x-auto sm:no-scrollbar">
                {navTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 flex-1 justify-center rounded-lg sm:rounded-xl py-2 sm:py-2.5 px-1 sm:px-3 text-center transition-all ${
                        isActive
                          ? 'bg-[#1D4ED8] text-white shadow-xs font-bold'
                          : 'text-[#52525B] dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-100 hover:bg-[#F4F4F0] dark:hover:bg-[#27272A] font-medium'
                      }`}
                    >
                      <span className="shrink-0">{tab.icon}</span>
                      <span className="text-[10px] sm:text-xs truncate">
                        <span className="sm:hidden">{tab.shortLabel}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                      </span>
                      {tab.id === 'logo' && state.logoUrl && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Body Card */}
            <div className="rounded-xl sm:rounded-2xl border border-[#E4E2DC] bg-white dark:border-[#27272A] dark:bg-[#18181B] p-4 sm:p-5 md:p-6 shadow-sm overflow-hidden">
              {activeTab === 'content' && (
                <ContentTab state={state} onChange={handleStateChange} />
              )}
              {activeTab === 'shapes' && (
                <ShapesTab state={state} onChange={handleStateChange} />
              )}
              {activeTab === 'colors' && (
                <ColorsTab state={state} onChange={handleStateChange} />
              )}
              {activeTab === 'logo' && (
                <LogoTab state={state} onChange={handleStateChange} />
              )}
              {activeTab === 'settings' && (
                <SettingsTab
                  state={state}
                  onChange={handleStateChange}
                  onReset={handleReset}
                />
              )}
            </div>

            {/* Quick Tips */}
            <div className="rounded-xl border border-[#E4E2DC] bg-[#FAF9F5] dark:border-[#27272A] dark:bg-[#141417] p-3.5 sm:p-4 text-xs text-[#52525B] dark:text-zinc-400 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#18181B] dark:text-zinc-200">
                <Sparkles className="h-3.5 w-3.5 text-[#1D4ED8] dark:text-blue-400" />
                <span>Tips Kualitas Cetak & Branding</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#71717A] dark:text-zinc-400">
                Untuk keperluan cetak packaging, brosur, atau kartu nama, gunakan resolusi <strong>1024px (HD)</strong> atau <strong>2048px</strong> agar QR code tajam dan mudah dipindai di berbagai kondisi.
              </p>
            </div>
          </div>

          {/* Right Column: Live Artboard Preview & Direct Export */}
          <div
            className={`lg:col-span-5 ${
              mobileViewMode === 'editor' ? 'hidden lg:block' : 'block'
            }`}
          >
            <QRPreviewCard state={state} onChange={handleStateChange} id="preview-section" />
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Floating Action Bar (Only on mobile < lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#E4E2DC] bg-white/95 dark:border-[#27272A] dark:bg-[#121215]/95 backdrop-blur-md px-3.5 py-2.5 shadow-lg">
        <div className="mx-auto flex max-w-md items-center justify-between gap-2.5">
          {/* Quick Preview Toggle button */}
          <button
            onClick={() => setMobileViewMode(mobileViewMode === 'editor' ? 'preview' : 'editor')}
            className="flex items-center gap-1.5 rounded-xl border border-[#E4E2DC] bg-[#FAF9F5] dark:border-[#27272A] dark:bg-[#18181B] px-3 py-2 text-xs font-semibold text-[#18181B] dark:text-zinc-200 active:scale-95 transition-transform"
          >
            {mobileViewMode === 'editor' ? (
              <>
                <Eye className="h-4 w-4 text-[#1D4ED8] dark:text-blue-400" />
                <span>Preview</span>
              </>
            ) : (
              <>
                <SlidersHorizontal className="h-4 w-4 text-[#1D4ED8] dark:text-blue-400" />
                <span>Edit</span>
              </>
            )}
          </button>

          {/* Direct Download Button */}
          <button
            onClick={handleQuickDownload}
            disabled={mobileExporting}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#1D4ED8] px-3.5 py-2 text-xs font-bold text-white shadow-xs active:scale-[0.98] transition-all disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>
              {mobileExporting ? 'Mengekspor...' : `Unduh ${state.exportFormat.toUpperCase()}`}
            </span>
          </button>
        </div>
      </div>

      {/* Minimalist Editorial Footer */}
      <footer className="mt-8 sm:mt-16 border-t border-[#E4E2DC] bg-[#FAF9F5] dark:border-[#27272A] dark:bg-[#121215] py-6 sm:py-8 text-center text-xs text-[#71717A] dark:text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] dark:text-zinc-400">
            <span className="font-bold text-[#111111] dark:text-zinc-200">QRIVO</span>
            <span>·</span>
            <span>CUSTOM QR. YOUR STYLE.</span>
            <span>·</span>
            <span>CLIENT-SIDE ENGINE</span>
          </div>

          <div className="text-[10px] sm:text-[11px] text-[#A1A1AA] dark:text-zinc-500">
            Dibuat untuk performa ringan & rendering cepat dengan qr-code-styling & React.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

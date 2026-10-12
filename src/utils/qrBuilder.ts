import QRCodeStyling, { type Options } from 'qr-code-styling';
import type { QRState } from '../types/qr';
import { getQRPayload } from './qrPayload';

export function buildQROptions(
  state: QRState,
  size: number,
  drawType: 'canvas' | 'svg' = 'canvas'
): Partial<Options> {
  const data = getQRPayload(state);

  // Background options
  const backgroundOptions: Options['backgroundOptions'] = {
    color: state.backgroundTransparent ? 'rgba(0,0,0,0)' : state.backgroundColor,
  };

  // Dots options
  const dotsOptions: Options['dotsOptions'] = {
    type: state.dotType,
    color: state.dotColor,
  };

  if (state.dotUseGradient) {
    dotsOptions.gradient = {
      type: state.dotGradientType,
      rotation: (state.dotGradientRotation * Math.PI) / 180,
      colorStops: [
        { offset: 0, color: state.dotGradientColor1 },
        { offset: 1, color: state.dotGradientColor2 },
      ],
    };
  }

  // Corner Square options
  const cornersSquareOptions: Options['cornersSquareOptions'] = {
    type: state.cornerSquareType,
    color: state.cornerSquareCustomColor ? state.cornerSquareColor : state.dotColor,
  };

  // Corner Dot options
  const cornersDotOptions: Options['cornersDotOptions'] = {
    type: state.cornerDotType,
    color: state.cornerDotCustomColor ? state.cornerDotColor : state.dotColor,
  };

  // Image options
  const imageOptions: Options['imageOptions'] = {
    hideBackgroundDots: state.hideBackgroundDots,
    imageSize: state.logoSize,
    margin: state.logoMargin,
    crossOrigin: 'anonymous',
  };

  return {
    width: size,
    height: size,
    type: drawType,
    data,
    image: state.logoUrl || undefined,
    margin: state.margin,
    qrOptions: {
      errorCorrectionLevel: state.errorCorrectionLevel,
    },
    imageOptions,
    dotsOptions,
    cornersSquareOptions,
    cornersDotOptions,
    backgroundOptions,
  };
}

export async function exportQRCode(
  state: QRState,
  onProgress?: (msg: string) => void
): Promise<void> {
  onProgress?.('Menyiapkan render beresolusi tinggi...');
  const size = state.exportSize || 1024;
  const isSvg = state.exportFormat === 'svg';

  const exportOpts = buildQROptions(state, size, isSvg ? 'svg' : 'canvas');
  const exportInstance = new QRCodeStyling(exportOpts);

  onProgress?.('Mengunduh file...');
  const fileName = (state.exportFileName.trim() || 'qrivo-qr-code')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-');

  await exportInstance.download({
    name: fileName,
    extension: state.exportFormat,
  });
}

export async function copyQRToClipboard(state: QRState): Promise<boolean> {
  try {
    const opts = buildQROptions(state, 1024, 'canvas');
    const qrInstance = new QRCodeStyling(opts);
    const rawBlob = await qrInstance.getRawData('png');
    if (!rawBlob) return false;

    // Ensure it is a Blob
    const blob = rawBlob instanceof Blob ? rawBlob : new Blob([rawBlob], { type: 'image/png' });

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}

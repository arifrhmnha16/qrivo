/**
 * Calculate relative luminance and WCAG contrast ratio for colors.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return { r, g, b };
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 21; // fallback safe

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (brighter + 0.05) / (darker + 0.05);
}

export interface ScannabilityResult {
  score: number; // 0 - 100
  status: 'optimal' | 'good' | 'warning' | 'danger';
  title: string;
  message: string;
  contrastRatio: number;
}

export function checkScannability(
  fgColor: string,
  bgColor: string,
  isTransparentBg: boolean,
  hasLogo: boolean,
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H',
  logoSize: number
): ScannabilityResult {
  // If background is transparent, assume black on light background unless fg is very light
  const effectiveBg = isTransparentBg ? '#FFFFFF' : bgColor;
  const ratio = getContrastRatio(fgColor, effectiveBg);

  let score = 100;
  const issues: string[] = [];

  // 1. Contrast Check
  if (ratio < 2.5) {
    score -= 60;
    issues.push('Kontras warna sangat rendah (< 2.5:1), kamera akan kesulitan membaca QR.');
  } else if (ratio < 4.0) {
    score -= 25;
    issues.push('Kontras warna agak rendah. Disarankan foreground lebih gelap dibanding background.');
  }

  // 2. Logo with Error Correction Check
  if (hasLogo) {
    if (errorCorrectionLevel === 'L') {
      score -= 40;
      issues.push('Logo aktif dengan koreksi error "L" (hanya 7%). QR berisiko tinggi gagal dipindai! Gunakan "H" (30%).');
    } else if (errorCorrectionLevel === 'M') {
      score -= 20;
      issues.push('Logo aktif dengan koreksi "M" (15%). Disarankan gunakan "H" untuk kehandalan optimal.');
    }

    if (logoSize > 0.35 && errorCorrectionLevel !== 'H') {
      score -= 25;
      issues.push('Ukuran logo besar (> 35%). Sangat disarankan Error Correction "H".');
    }
  }

  score = Math.max(0, Math.min(100, score));

  if (score >= 90) {
    return {
      score,
      status: 'optimal',
      title: 'Scannability Optimal (100%)',
      message: 'Kontras tajam dan parameter sempurna. Sangat mudah dipindai oleh semua smartphone.',
      contrastRatio: Math.round(ratio * 10) / 10,
    };
  } else if (score >= 70) {
    return {
      score,
      status: 'good',
      title: 'Scannability Baik',
      message: issues[0] || 'Dapat dipindai dengan baik di sebagian besar kondisi pencahayaan.',
      contrastRatio: Math.round(ratio * 10) / 10,
    };
  } else if (score >= 45) {
    return {
      score,
      status: 'warning',
      title: 'Peringatan Scannability',
      message: issues.join(' '),
      contrastRatio: Math.round(ratio * 10) / 10,
    };
  } else {
    return {
      score,
      status: 'danger',
      title: 'Risiko Tidak Terbaca!',
      message: issues.join(' '),
      contrastRatio: Math.round(ratio * 10) / 10,
    };
  }
}

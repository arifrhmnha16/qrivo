import type { QRState } from '../types/qr';

export const DEFAULT_QR_STATE: QRState = {
  // Content
  dataType: 'url',
  url: 'https://github.com',
  text: 'Qrixo — Custom QR. Your Style.',
  wifi: {
    ssid: 'Qrixo_HighSpeed',
    password: 'QrixoStyle2026',
    encryption: 'WPA',
    hidden: false,
  },
  email: {
    address: 'halo@qrixo.id',
    subject: 'Qrixo Custom QR Inquiry',
    body: 'Halo, saya ingin membuat custom QR Code dengan Qrixo.',
  },
  phone: '+6281234567890',
  vcard: {
    firstName: 'Alex',
    lastName: 'Qrixo',
    phone: '+6281234567890',
    email: 'alex@qrixo.id',
    organization: 'Qrixo Studio',
    url: 'https://qrixo.id',
  },

  // Dots
  dotType: 'rounded',
  dotColor: '#121212',
  dotUseGradient: false,
  dotGradientType: 'linear',
  dotGradientColor1: '#1D4ED8',
  dotGradientColor2: '#2563EB',
  dotGradientRotation: 45,

  // Corners
  cornerSquareType: 'extra-rounded',
  cornerSquareCustomColor: false,
  cornerSquareColor: '#121212',

  cornerDotType: 'dot',
  cornerDotCustomColor: false,
  cornerDotColor: '#121212',

  // Background
  backgroundColor: '#FFFFFF',
  backgroundTransparent: false,

  // Logo
  logoUrl: null,
  rawLogoUrl: null,
  logoName: null,
  logoFitMode: 'contain',
  logoBgColor: 'transparent',
  logoSize: 0.28,
  logoMargin: 6,
  hideBackgroundDots: true,

  // QR Parameters
  errorCorrectionLevel: 'Q',
  margin: 12,

  // Export Settings
  exportSize: 1024,
  exportFormat: 'png',
  exportFileName: 'qrixo-code',
};

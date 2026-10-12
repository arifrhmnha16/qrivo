import type { DotType, CornerSquareType, CornerDotType } from 'qr-code-styling';

export type DataType = 'url' | 'text' | 'wifi' | 'email' | 'phone' | 'vcard';

export type ExportFormat = 'png' | 'svg' | 'webp';

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface EmailData {
  address: string;
  subject: string;
  body: string;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  url: string;
}

export interface QRState {
  // Content
  dataType: DataType;
  url: string;
  text: string;
  wifi: WifiData;
  email: EmailData;
  phone: string;
  vcard: VCardData;

  // Dots
  dotType: DotType;
  dotColor: string;
  dotUseGradient: boolean;
  dotGradientType: 'linear' | 'radial';
  dotGradientColor1: string;
  dotGradientColor2: string;
  dotGradientRotation: number;

  // Corners
  cornerSquareType: CornerSquareType;
  cornerSquareCustomColor: boolean;
  cornerSquareColor: string;

  cornerDotType: CornerDotType;
  cornerDotCustomColor: boolean;
  cornerDotColor: string;

  // Background
  backgroundColor: string;
  backgroundTransparent: boolean;

  // Logo
  logoUrl: string | null;
  rawLogoUrl: string | null;
  logoName: string | null;
  logoFitMode: 'contain' | 'crop';
  logoBgColor: string; // 'transparent' or hex
  logoSize: number; // 0.15 to 0.40
  logoMargin: number; // 0 to 20
  hideBackgroundDots: boolean;

  // QR Parameters
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number; // 0 to 40

  // Export Settings
  exportSize: number; // 300 to 3000
  exportFormat: ExportFormat;
  exportFileName: string;
}

export interface PresetTheme {
  id: string;
  name: string;
  description: string;
  dotType: DotType;
  dotColor: string;
  dotUseGradient: boolean;
  dotGradientType?: 'linear' | 'radial';
  dotGradientColor1?: string;
  dotGradientColor2?: string;
  cornerSquareType: CornerSquareType;
  cornerSquareCustomColor: boolean;
  cornerSquareColor?: string;
  cornerDotType: CornerDotType;
  cornerDotCustomColor: boolean;
  cornerDotColor?: string;
  backgroundColor: string;
  backgroundTransparent: boolean;
}

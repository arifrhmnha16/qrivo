export interface PresetLogo {
  id: string;
  name: string;
  dataUrl: string;
}

// Crisp, clean SVGs encoded as data URLs
export const PRESET_LOGOS: PresetLogo[] = [
  {
    id: 'qrixo',
    name: 'Qrixo',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="%231D4ED8"/><rect x="18" y="18" width="46" height="46" rx="12" fill="none" stroke="%23FFFFFF" stroke-width="7"/><rect x="30" y="30" width="22" height="22" rx="5" fill="%23FFFFFF"/><path d="M52 52 L78 78" stroke="%23FFFFFF" stroke-width="8" stroke-linecap="round"/><path d="M78 54 L56 76" stroke="%23FFFFFF" stroke-width="6.5" stroke-linecap="round"/><circle cx="78" cy="78" r="4" fill="%23FFFFFF"/></svg>`,
  },
  {
    id: 'link',
    name: 'Link',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23111827"><rect width="100" height="100" rx="24" fill="%23FFFFFF"/><path d="M42 58a12 12 0 0 0 17 0l12-12a12 12 0 0 0-17-17l-5 5" fill="none" stroke="%23111827" stroke-width="8" stroke-linecap="round"/><path d="M58 42a12 12 0 0 0-17 0l-12 12a12 12 0 0 0 17 17l5-5" fill="none" stroke="%23111827" stroke-width="8" stroke-linecap="round"/></svg>`,
  },
  {
    id: 'wifi',
    name: 'WiFi',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="%23FFFFFF"/><path d="M22 36c16-15 40-15 56 0M32 48c10-9 26-9 36 0M42 60c5-4 11-4 16 0M50 72h.01" fill="none" stroke="%23111827" stroke-width="8" stroke-linecap="round"/></svg>`,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="%23FFFFFF"/><rect x="24" y="24" width="52" height="52" rx="16" fill="none" stroke="%23E1306C" stroke-width="7"/><circle cx="50" cy="50" r="14" fill="none" stroke="%23E1306C" stroke-width="7"/><circle cx="64" cy="36" r="3" fill="%23E1306C"/></svg>`,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="%2325D366"/><path d="M50 22a28 28 0 0 0-24 42l-4 16 16-4a28 28 0 1 0 12-54zm14 38c-.6 1.7-3 3.3-5 3.5-1.4.1-3.2.3-10.4-2.7-9.3-3.8-15.3-13.3-15.8-13.9-.5-.7-3.8-5-3.8-9.6s2.4-6.8 3.3-7.7c.9-.9 2-.9 2.7-.9h2c.6 0 1.4-.2 2.2 1.6.8 2 2.7 6.5 2.9 7 .2.5.3 1 .1 1.7s-.4 1.1-.8 1.6l-1.2 1.4c-.4.4-.8.9-.3 1.8 1 1.8 4.4 7.2 9.6 10 1.2.7 2.2.8 3 .3.8-.5 3.4-4 4.3-5.4.9-1.4 1.8-1.2 3-.8 1.2.5 7.6 3.6 8.9 4.3 1.3.6 2.2 1 2.5 1.5.3.7.3 3.8-.3 5.5z" fill="%23FFFFFF"/></svg>`,
  },
  {
    id: 'github',
    name: 'GitHub',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="%23111827"/><path fill-rule="evenodd" clip-rule="evenodd" d="M50 20C33.4 20 20 33.4 20 50c0 13.3 8.6 24.5 20.6 28.5 1.5.3 2-.6 2-1.4v-5.5c-8.3 1.8-10.1-4-10.1-4-1.4-3.5-3.3-4.4-3.3-4.4-2.7-1.9.2-1.8.2-1.8 3 .2 4.6 3.1 4.6 3.1 2.7 4.6 7 3.3 8.7 2.5.3-2 1.1-3.3 2-4.1-6.7-.8-13.7-3.3-13.7-14.8 0-3.3 1.2-6 3.1-8.1-.3-.8-1.4-3.8.3-8 0 0 2.5-.8 8.3 3.1a28.8 28.8 0 0 1 15.1 0c5.7-3.9 8.3-3.1 8.3-3.1 1.7 4.2.6 7.2.3 8 1.9 2.1 3.1 4.8 3.1 8.1 0 11.6-7 14-13.7 14.8 1.1 1 2.1 2.9 2.1 5.8v8.6c0 .8.6 1.8 2.1 1.4A30 30 0 0 0 80 50c0-16.6-13.4-30-30-30z" fill="%23FFFFFF"/></svg>`,
  },
  {
    id: 'scan-me',
    name: 'Scan Me',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="%231D4ED8"/><rect x="18" y="18" width="64" height="64" rx="14" fill="%23FFFFFF"/><text x="50" y="44" font-family="sans-serif" font-weight="900" font-size="16" text-anchor="middle" fill="%231D4ED8">SCAN</text><text x="50" y="66" font-family="sans-serif" font-weight="900" font-size="16" text-anchor="middle" fill="%231D4ED8">ME</text></svg>`,
  },
  {
    id: 'star',
    name: 'Star',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="%23FFFFFF"/><path d="M50 20l9 19 21 3-15 15 4 21-19-10-19 10 4-21-15-15 21-3z" fill="%23F59E0B" stroke="%23D97706" stroke-width="4" stroke-linejoin="round"/></svg>`,
  },
];

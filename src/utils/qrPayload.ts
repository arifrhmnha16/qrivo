import type { QRState } from '../types/qr';

export function getQRPayload(state: QRState): string {
  switch (state.dataType) {
    case 'url': {
      const trimmed = state.url.trim();
      if (!trimmed) return 'https://example.com';
      if (/^[a-zA-Z]+:\/\//i.test(trimmed)) {
        return trimmed;
      }
      return `https://${trimmed}`;
    }

    case 'text': {
      return state.text.trim() || 'Custom QR Code Styling';
    }

    case 'wifi': {
      const { ssid, password, encryption, hidden } = state.wifi;
      const s = ssid.trim() || 'MyNetwork';
      // Format: WIFI:T:WPA;S:MySSID;P:password;H:false;;
      return `WIFI:T:${encryption};S:${s};P:${password};H:${hidden ? 'true' : 'false'};;`;
    }

    case 'email': {
      const { address, subject, body } = state.email;
      const addr = address.trim() || 'hello@example.com';
      const params = new URLSearchParams();
      if (subject) params.append('subject', subject);
      if (body) params.append('body', body);
      const queryString = params.toString();
      return `mailto:${addr}${queryString ? `?${queryString}` : ''}`;
    }

    case 'phone': {
      const p = state.phone.trim() || '+6281234567890';
      return `tel:${p}`;
    }

    case 'vcard': {
      const { firstName, lastName, phone, email, organization, url } = state.vcard;
      const fn = `${firstName} ${lastName}`.trim() || 'John Doe';
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName || 'Doe'};${firstName || 'John'};;;`,
        `FN:${fn}`,
      ];
      if (organization.trim()) lines.push(`ORG:${organization.trim()}`);
      if (phone.trim()) lines.push(`TEL;TYPE=CELL:${phone.trim()}`);
      if (email.trim()) lines.push(`EMAIL:${email.trim()}`);
      if (url.trim()) lines.push(`URL:${url.trim()}`);
      lines.push('END:VCARD');
      return lines.join('\n');
    }

    default:
      return 'https://example.com';
  }
}

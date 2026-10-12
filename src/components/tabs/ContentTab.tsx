import React, { useState } from 'react';
import {
  Link as LinkIcon,
  FileText,
  Wifi,
  Mail,
  Phone,
  UserCheck,
  Eye,
  EyeOff,
} from 'lucide-react';
import type { QRState, DataType } from '../../types/qr';
import { getQRPayload } from '../../utils/qrPayload';

interface ContentTabProps {
  state: QRState;
  onChange: (patch: Partial<QRState>) => void;
}

export const ContentTab: React.FC<ContentTabProps> = ({ state, onChange }) => {
  const [showWifiPassword, setShowWifiPassword] = useState(false);

  const payload = getQRPayload(state);

  const types: { id: DataType; label: string; icon: React.ReactNode }[] = [
    { id: 'url', label: 'Tautan / URL', icon: <LinkIcon className="h-3.5 w-3.5" /> },
    { id: 'text', label: 'Teks Bebas', icon: <FileText className="h-3.5 w-3.5" /> },
    { id: 'wifi', label: 'Jaringan WiFi', icon: <Wifi className="h-3.5 w-3.5" /> },
    { id: 'vcard', label: 'Kontak (vCard)', icon: <UserCheck className="h-3.5 w-3.5" /> },
    { id: 'email', label: 'Email', icon: <Mail className="h-3.5 w-3.5" /> },
    { id: 'phone', label: 'Nomor Telepon', icon: <Phone className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="space-y-5">
      {/* Type Selector Pills */}
      <div>
        <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-2">
          Pilih Tipe Konten QR
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange({ dataType: t.id })}
              className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs font-medium transition-all ${
                state.dataType === t.id
                  ? 'border-[#1D4ED8] bg-blue-50/70 text-[#1D4ED8] dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 font-semibold shadow-2xs'
                  : 'border-[#E4E2DC] bg-white text-[#52525B] hover:bg-[#F4F4F0] dark:border-[#27272A] dark:bg-[#141417] dark:text-zinc-300 dark:hover:bg-[#202025]'
              }`}
            >
              <span className={state.dataType === t.id ? 'text-[#1D4ED8] dark:text-blue-400' : 'text-[#71717A] dark:text-zinc-400'}>
                {t.icon}
              </span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Form based on DataType */}
      <div className="rounded-xl border border-[#E4E2DC] bg-[#FAF9F5] dark:border-[#27272A] dark:bg-[#141417] p-4 space-y-4">
        {state.dataType === 'url' && (
          <div>
            <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1.5">
              URL Situs / Link Web
            </label>
            <div className="relative">
              <input
                type="text"
                value={state.url}
                onChange={(e) => onChange({ url: e.target.value })}
                placeholder="https://domain-anda.com/promo"
                className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] placeholder:text-[#A1A1AA] dark:placeholder:text-zinc-500 focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] focus:outline-none"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-[#71717A] dark:text-zinc-400">
              Dukungan lengkap untuk HTTP, HTTPS, deep link aplikasi, maupun link Google Maps.
            </p>
          </div>
        )}

        {state.dataType === 'text' && (
          <div>
            <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1.5">
              Teks Bebas / Pesan
            </label>
            <textarea
              rows={4}
              value={state.text}
              onChange={(e) => onChange({ text: e.target.value })}
              placeholder="Tulis pesan teks, catatan, atau informasi..."
              className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] placeholder:text-[#A1A1AA] dark:placeholder:text-zinc-500 focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] focus:outline-none resize-none"
            />
          </div>
        )}

        {state.dataType === 'wifi' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1">
                Nama Jaringan (SSID)
              </label>
              <input
                type="text"
                value={state.wifi.ssid}
                onChange={(e) =>
                  onChange({ wifi: { ...state.wifi, ssid: e.target.value } })
                }
                placeholder="WiFi_Kantor"
                className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <input
                  type={showWifiPassword ? 'text' : 'password'}
                  value={state.wifi.password}
                  onChange={(e) =>
                    onChange({ wifi: { ...state.wifi, password: e.target.value } })
                  }
                  placeholder="Ketik password WiFi"
                  className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowWifiPassword(!showWifiPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-200"
                >
                  {showWifiPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1">
                  Enkripsi
                </label>
                <select
                  value={state.wifi.encryption}
                  onChange={(e) =>
                    onChange({
                      wifi: {
                        ...state.wifi,
                        encryption: e.target.value as 'WPA' | 'WEP' | 'nopass',
                      },
                    })
                  }
                  className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none"
                >
                  <option value="WPA">WPA / WPA2 / WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Tanpa Sandi (Terbuka)</option>
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#52525B] dark:text-zinc-300">
                  <input
                    type="checkbox"
                    checked={state.wifi.hidden}
                    onChange={(e) =>
                      onChange({
                        wifi: { ...state.wifi, hidden: e.target.checked },
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 dark:border-zinc-700 text-[#1D4ED8] focus:ring-[#1D4ED8]"
                  />
                  <span>SSID Tersembunyi (Hidden)</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {state.dataType === 'vcard' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1">
                  Nama Depan
                </label>
                <input
                  type="text"
                  value={state.vcard.firstName}
                  onChange={(e) =>
                    onChange({
                      vcard: { ...state.vcard, firstName: e.target.value },
                    })
                  }
                  placeholder="Budi"
                  className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1">
                  Nama Belakang
                </label>
                <input
                  type="text"
                  value={state.vcard.lastName}
                  onChange={(e) =>
                    onChange({
                      vcard: { ...state.vcard, lastName: e.target.value },
                    })
                  }
                  placeholder="Santoso"
                  className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1">
                  No. Telepon
                </label>
                <input
                  type="text"
                  value={state.vcard.phone}
                  onChange={(e) =>
                    onChange({
                      vcard: { ...state.vcard, phone: e.target.value },
                    })
                  }
                  placeholder="+62812345678"
                  className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={state.vcard.email}
                  onChange={(e) =>
                    onChange({
                      vcard: { ...state.vcard, email: e.target.value },
                    })
                  }
                  placeholder="budi@perusahaan.com"
                  className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1">
                  Perusahaan / Organisasi
                </label>
                <input
                  type="text"
                  value={state.vcard.organization}
                  onChange={(e) =>
                    onChange({
                      vcard: { ...state.vcard, organization: e.target.value },
                    })
                  }
                  placeholder="PT Qrixo Kreasi Digital"
                  className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1">
                  Website URL
                </label>
                <input
                  type="text"
                  value={state.vcard.url}
                  onChange={(e) =>
                    onChange({
                      vcard: { ...state.vcard, url: e.target.value },
                    })
                  }
                  placeholder="https://qrixo.id"
                  className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {state.dataType === 'email' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1">
                Alamat Email Penerima
              </label>
              <input
                type="email"
                value={state.email.address}
                onChange={(e) =>
                  onChange({
                    email: { ...state.email, address: e.target.value },
                  })
                }
                placeholder="halo@domain.com"
                className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1">
                Subjek Email
              </label>
              <input
                type="text"
                value={state.email.subject}
                onChange={(e) =>
                  onChange({
                    email: { ...state.email, subject: e.target.value },
                  })
                }
                placeholder="Pertanyaan Kerjasama"
                className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1">
                Isi Pesan (Draft)
              </label>
              <textarea
                rows={3}
                value={state.email.body}
                onChange={(e) =>
                  onChange({
                    email: { ...state.email, body: e.target.value },
                  })
                }
                placeholder="Tulis pesan..."
                className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none resize-none"
              />
            </div>
          </div>
        )}

        {state.dataType === 'phone' && (
          <div>
            <label className="block text-xs font-semibold text-[#18181B] dark:text-zinc-200 mb-1.5">
              Nomor Telepon
            </label>
            <input
              type="tel"
              value={state.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+6281234567890"
              className="w-full rounded-lg border border-[#D4D4D8] bg-white dark:border-[#333338] dark:bg-[#1A1A1E] dark:text-zinc-100 px-3 py-2 text-sm sm:text-xs text-[#18181B] focus:border-[#1D4ED8] focus:outline-none"
            />
            <p className="mt-1.5 text-[11px] text-[#71717A] dark:text-zinc-400">
              Kamera smartphone akan langsung membuka panggilan ke nomor ini saat dipindai.
            </p>
          </div>
        )}

        {/* Live Payload Preview */}
        <div className="pt-2 border-t border-[#E4E2DC] dark:border-[#27272A]">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#71717A] dark:text-zinc-400 mb-1">
            <span>Payload Terenkripsi:</span>
            <span>{payload.length} karakter</span>
          </div>
          <div className="rounded-md bg-white dark:bg-[#1A1A1E] border border-[#E4E2DC] dark:border-[#27272A] p-2 font-mono text-[11px] text-[#52525B] dark:text-zinc-300 truncate select-all">
            {payload}
          </div>
        </div>
      </div>
    </div>
  );
};

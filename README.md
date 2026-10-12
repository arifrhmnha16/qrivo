# Qrixo — Custom QR. Your Style.

<div align="center">

![Qrixo Banner](https://raw.githubusercontent.com/arifrhmnha16/qrivo/main/public/favicon.svg)

**Generator QR Code kustom modern, beresolusi tinggi, dan berkinerja cepat.**  
*Dibuat dengan React 19, Vite, TypeScript, Tailwind CSS, dan qr-code-styling.*

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## 🌐 Live Deployment
- **Produksi Resmi:** [https://qrixo.vercel.app](https://qrixo.vercel.app)

---

## ✨ Fitur Utama

- ⚡ **Real-time Rendering**: QR Code diperbarui seketika seiring Anda mengetik atau mengubah konfigurasi.
- 🎨 **Kustomisasi Bentuk Dot**: Square, dots, rounded, classy, classy-rounded, dan extra-rounded.
- 📐 **Kustomisasi Sudut (Finder Patterns)**: Berbagai pilihan bentuk untuk *Corner Square* dan *Corner Dot*.
- 🌈 **Warna & Gradien Fleksibel**:
  - Warna solid atau gradien linear/radial dengan rotasi bebas (0–360°).
  - Pilihan latar belakang transparan (*alpha channel*) atau kustom warna HEX.
  - Warna independen untuk corner square dan corner dot.
- 🖼️ **Auto-Fit 1:1 Custom Logo**:
  - Unggah logo brand sendiri (PNG, SVG, JPG, WebP hingga 5 MB).
  - Pemrosesan canvas presisi 1:1 rasio aspek (*contain* / *crop*) dengan pilihan badge bentuk (lingkaran, rounded, square).
  - Pustaka preset logo bawaan (Qrixo, Link, WiFi, Instagram, WhatsApp, GitHub, dll).
  - Opsi *Hide dots behind logo* dan pengaturan margin logo.
- 🛡️ **Koreksi Error Reed-Solomon**: Pilihan level koreksi L (~7%), M (~15%), Q (~25%), dan H (~30%) untuk memastikan QR tetap mudah dipindai meskipun menggunakan logo.
- 📊 **Diagnostik Scannability Real-time**: Indikator kontras rasio WCAG dan kalkulasi keterbacaan otomatis sebelum diunduh.
- 💾 **Export Multi-Format & Resolusi Tinggi**:
  - Pilihan format **PNG**, **SVG** (vektor), dan **WebP**.
  - Pilihan resolusi dari 512px hingga 3000px (Ultra Print High-Res).
  - Salin PNG langsung ke clipboard dalam satu klik.
  - **Output Murni**: Hasil download 100% murni file QR Code tanpa watermark, frame, atau logo aplikasi paksaan.
- 🌙 **Dark & Light Mode**: Desain modern editorial dengan dukungan mode gelap penuh, tersimpan otomatis di localStorage.
- 📱 **Ultra-Stable Mobile Responsive**: Antarmuka responsif yang mulus di berbagai perangkat seluler (360px–390px+).

---

## 🚀 Memulai Proyek

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18+ disarankan)
- Package manager: `npm`, `pnpm`, atau `yarn`

### Instalasi & Menjalankan Dev Server

```bash
# Clone repositori
git clone https://github.com/arifrhmnha16/qrivo.git

# Masuk ke direktori
cd qrivo

# Install dependencies
npm install

# Jalankan server pengembangan
npm run dev
```

Buka peramban Anda di `http://localhost:5173`.

### Build untuk Produksi

```bash
npm run build
```

Hasil build siap-pakai akan berada di dalam folder `dist/`.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4 + Lucide React Icons
- **QR Engine**: [qr-code-styling](https://github.com/kozakdenys/qr-code-styling)
- **Typography**: Plus Jakarta Sans, Newsreader Serif, JetBrains Mono

---

## 📄 Lisensi

Didistribusikan di bawah lisensi MIT.

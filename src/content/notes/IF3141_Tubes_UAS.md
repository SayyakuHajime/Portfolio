---
title: IF3141 — Pertanyaan Tugas Besar (PT Berkah Melano Indonesia)
course: IF3141
subject: Sistem Informasi
exam: UAS / Tubes
topics: [Problem Analysis, Solution Design, Input Output Process Design, Legal & Ethical, Professional Responsibility, Peer Assessment]
references: Dokumen Tugas Besar K01 G03 — PT Berkah Melano Indonesia, UU PDP No. 27 Tahun 2022, ISO/IEC 27001
order: 3
date: "2026-03-12"
---

## 1. Masalah Bisnis Utama & Alternatif Solusi (20 poin)

### 1.a Konteks Perusahaan

> [!note] Latar Belakang
> **PT Berkah Melano Indonesia (AGF Cargo)** adalah perusahaan ekspor tanaman hias yang masih menjalankan seluruh operasional bisnisnya secara semi-manual. Root cause dari seluruh masalah: **tidak adanya sistem pencatatan, pengelolaan, dan pemesanan yang terintegrasi**, sehingga cost naik, ekspansi bisnis terhambat, dan persepsi pelanggan memburuk.

### 1.b Masalah Bisnis Utama

Tiga masalah berstatus **Urgent & Important:**

**PR-01 — Pengelolaan pesanan masih semi-manual** *(Urgency: 5, Importance: 5)*

Seluruh pencatatan pesanan tanaman dan kargo masih menggunakan Excel/Spreadsheet, membutuhkan banyak keterlibatan manual dari admin dan rawan human error.

**PR-02 — Pelanggan tidak bisa melacak barangnya sendiri** *(Urgency: 3, Importance: 4)*

Pelanggan harus menghubungi Customer Service (via WhatsApp/Instagram) secara manual setiap kali ingin mengetahui status pesanan, membebani tim CS.

**PR-06 — Alur pemrosesan gudang kurang efektif** *(Urgency: 3, Importance: 3)*

Karyawan masih harus mencatat setiap informasi barang dan proses via Spreadsheet. Dokumentasi foto kondisi tanaman menggunakan perangkat pribadi tanpa arsip terpusat.

### 1.c Alternatif Solusi yang Diusulkan

| # | Solusi | Skor Prioritas (/75) | Status |
|---|--------|----------------------|--------|
| 1 | **Customer Self-Service Portal** — platform web untuk pemesanan mandiri, upload dokumen, dan pelacakan real-time | 57 | ✓ Dipilih |
| 2 | **Digitalisasi Gudang via QR Code** — aplikasi web mobile untuk cek kelengkapan tanaman dengan scan QR | 53 | ✓ Dipilih |
| 3 | **Pengintegrasian Database Tunggal** — migrasi dari spreadsheet ke satu database terpusat di Odoo | 47 | ✓ Dipilih |
| 4 | **Admin Dashboard Monitoring** — dashboard analitik operasional untuk manajemen | 45 | ✓ Dipilih |
| 5 | **WhatsApp AI Agent** — chatbot otomatis untuk customer service | 35 | ✗ Tidak dipilih |

> [!insight] Solusi Terpilih
> Solusi 1, 2, 3, dan 4 diintegrasikan menjadi **satu sistem tunggal berbasis Odoo** dengan database terpusat. Solusi 5 (WhatsApp AI Agent) tidak dipilih karena **tidak feasible dan tidak urgent**.

---

## 2. Desain Umum Solusi yang Direkomendasikan (20 poin)

### 2.a Input Design

Sistem menerima input dari empat entitas eksternal:

| Entitas | Input yang Diberikan |
|---------|---------------------|
| **Pelanggan (B2B & B2C)** | Data pesanan, bukti pembayaran, bukti konfirmasi pengiriman |
| **Petugas Gudang** | Hasil scan QR Code, foto kondisi tanaman, konfirmasi status |
| **Layanan Logistik (pihak ketiga)** | Data dan status pengiriman (tracking) |
| **Manajemen & Keuangan** | Data finansial untuk pelaporan |

### 2.b Output Design

| Penerima | Output yang Dihasilkan |
|----------|------------------------|
| **Pelanggan** | Konfirmasi pesanan, informasi tracking pengiriman real-time |
| **Petugas Gudang** | Instruksi operasional, data batch tanaman per QR |
| **Logistik** | Permintaan tautan tracking |
| **Manajemen** | Laporan operasional, dashboard analitik (grafik tren pesanan, pengiriman, kesehatan bisnis) |

### 2.c Process Design

Sistem dibagi menjadi **4 proses utama (DFD Level 1):**

1. **Pengelolaan Pesanan** — validasi data → generate QR ID → assign batch → simpan ke DB → konfirmasi ke pelanggan
2. **Operasional Gudang** — scan QR → ambil data tanaman → update status (cuci, kemas, dll.) → dokumentasi foto ke cloud storage → simpan histori tracking
3. **Integrasi Logistik** — kirim data pengiriman ke ekspedisi → terima tracking → update status pengiriman → teruskan ke pelanggan
4. **Pelaporan** — agregasi data pesanan + tanaman + tracking → generate laporan operasional dan dashboard visual untuk manajemen

> [!insight] Arsitektur Inti
> **Database tunggal terpusat (Odoo)** sebagai *single source of truth* yang menghubungkan Customer Portal, Admin Dashboard, dan Warehouse Mobile App secara real-time.

### 2.d Data Design

ERD terdiri dari **8 entitas utama** yang saling berelasi:

| Entitas | Keterangan |
|---------|-----------|
| Pesanan | Data order dari pelanggan |
| Tanaman | Data individual tanaman |
| Batch | Kelompok tanaman per pesanan |
| QR Tag | *Reusable* — ID fisik tetap, data di-assign ulang per batch |
| Tracking | Histori status perjalanan |
| Pengiriman | Data logistik & ekspedisi |
| Pelanggan | Profil B2B & B2C |
| Laporan | Agregasi data untuk manajemen |

> [!note] Desain QR Tag Reusable
> QR Tag didesain *reusable* — ID fisik tetap sama tapi data yang ter-link di-assign ulang per batch baru, sehingga **tidak perlu cetak ulang tag fisik** setiap pengiriman.

### 2.e Security / Control Design

| Aspek | Implementasi |
|-------|-------------|
| **Safety** | 0% akses modifikasi data tanaman tanpa autentikasi valid (RBAC — Role-Based Access Control) |
| **Security** | Enkripsi HTTPS/TLS 1.3 untuk semua transmisi; tidak ada data sensitif plaintext di DB; lockout 15 menit setelah 5 gagal login |
| **Compliance** | Patuh UU PDP No. 27 Tahun 2022; audit log setiap akses data pelanggan; mekanisme akses/koreksi/hapus data dalam 14 hari kerja |
| **Standar** | ISO/IEC 27001 — backup harian, disaster recovery RTO ≤ 4 jam |
| **Reliability** | Availability minimal 99,5%/bulan; respons ≤ 3 detik; scan QR diproses ≤ 2 detik |

---

## 3. Konsiderasi Legal dan Etikal (10 poin)

### 3.a Tiga Lapisan Konsiderasi

**CR-1 — Etikal: Kepatuhan Prinsip Privasi Data Pelanggan**

Data pribadi pelanggan (nama, alamat, kontak, riwayat transaksi) hanya boleh digunakan untuk keperluan operasional bisnis yang sah. Data tidak boleh dibagikan ke pihak ketiga tanpa persetujuan eksplisit pelanggan. Setiap akses tercatat dalam **audit log** untuk memastikan akuntabilitas.

**CR-2 — Legal: UU Perlindungan Data Pribadi No. 27 Tahun 2022**

Sistem dirancang mematuhi UU PDP Indonesia, termasuk menyediakan mekanisme bagi pelanggan untuk mengajukan permintaan **akses, koreksi, atau penghapusan** data pribadi dalam waktu maksimal **14 hari kerja**. Ini merupakan kewajiban hukum yang mengikat sebagai controller data.

**CR-3 — Standar Internasional: ISO/IEC 27001**

Pengembangan mengikuti prinsip manajemen keamanan informasi internasional: RBAC, enkripsi data sensitif, backup berkala (minimal harian), dan prosedur disaster recovery (RTO ≤ 4 jam). Relevan karena bisnis bersifat **ekspor internasional**.

> [!warn] Poin Penting untuk UAS
> Tiga konsiderasi ini saling berlapis: etika → legal lokal (UU PDP) → standar global (ISO 27001). Jawaban yang baik menyebutkan ketiganya dengan contoh implementasi konkret di sistem.

---

## 4. Tanggung Jawab Profesional terhadap Informasi Organisasi (10 poin)

### 4.a Instrumen: NDA (Non-Disclosure Agreement)

Tanggung jawab profesional kelompok dituangkan secara formal melalui **Perjanjian Kerahasiaan (NDA)** yang ditandatangani antara Tim Mahasiswa K01-G03 (PIHAK PERTAMA) dan PT Berkah Melano Indonesia yang diwakili Direktur **Riki Subagja** (PIHAK KEDUA) pada **12 Maret 2026**.

### 4.b Kewajiban Profesional Konkret

| Kewajiban | Deskripsi |
|-----------|-----------|
| **Menjaga kerahasiaan** | Seluruh informasi dianggap INFORMASI RAHASIA, dilindungi setara atau lebih tinggi dari standar internal perusahaan |
| **Pembatasan penggunaan** | Informasi hanya untuk keperluan **penelitian akademis dan tugas besar**, bukan keuntungan komersial |
| **Larangan penyebaran** | Tidak mengungkapkan informasi kepada pihak ketiga tanpa izin tertulis PIHAK KEDUA |
| **Langkah preventif** | Mengambil tindakan aktif mencegah akses tidak sah terhadap informasi rahasia |
| **Akurasi pelaporan** | Menyampaikan laporan lengkap dan akurat kepada perusahaan sebagai hak PIHAK KEDUA |

### 4.c Wujud Tanggung Jawab Teknis

Selain NDA, secara profesional kelompok juga:
- Tidak menampilkan data sensitif perusahaan (keuangan, data mitra petani, dll.) secara publik
- Merancang sistem dengan prinsip ***privacy by design*** — audit log, enkripsi, dan RBAC — sehingga data perusahaan yang masuk ke sistem terlindungi secara teknis
- Memastikan informasi yang digunakan sebagai dasar analisis bersumber dari data yang **diizinkan perusahaan**

> [!insight] Key Insight
> NDA bukan sekadar formalitas — ia mengikat secara hukum dan mencerminkan *professional ethics* seorang praktisi SI: mengutamakan kepentingan dan kerahasiaan klien di atas segalanya.

---

## 5. Penilaian Kontribusi Anggota Kelompok (10 poin)

### 5.a Daftar Anggota

| NIM | Nama | Skor Kontribusi (1–5) |
|-----|------|----------------------|
| 13523009 | M Hazim R Prajoda | *(isi sendiri)* |
| 13523016 | Clarissa Nethania Tambunan | *(isi sendiri)* |
| 13523041 | Hanif Kalyana Aditya | *(isi sendiri)* |
| 13523053 | Sakti Bimasena | *(isi sendiri)* |
| 13523058 | Noumisyifa Nabila Nareswari | *(isi sendiri)* |

> [!warn] Catatan
> Soal ini bersifat **subjektif dan personal** — hanya kamu yang bisa mengisi nilainya berdasarkan pengalaman kerja sama selama pengerjaan tubes. Isi secara jujur dan adil berdasarkan kontribusi nyata masing-masing anggota.

---

## 6. Quick Reference — Ringkasan untuk Belajar

> [!insight] Inti Tubes dalam Satu Paragraf
> PT Berkah Melano Indonesia punya masalah utama: **semua masih manual** (Excel, WhatsApp, foto HP). Solusinya: sistem **Odoo terintegrasi** (Customer Portal + Database Terpusat + Admin Dashboard + Gudang QR Code). Desain mengikuti **UU PDP No. 27/2022** dan **ISO/IEC 27001**. Semua informasi perusahaan dijaga lewat **NDA** yang ditandatangani 12 Maret 2026.

**Angka-angka penting yang harus hafal:**

| Item | Nilai |
|------|-------|
| Jumlah masalah Urgent & Important | 3 (PR-01, PR-02, PR-06) |
| Jumlah solusi yang dipilih | 4 dari 5 |
| Solusi tidak dipilih | WhatsApp AI Agent (skor 35) |
| Jumlah entitas ERD | 8 |
| Jumlah proses DFD Level 1 | 4 |
| Batas waktu respons permintaan data pelanggan | 14 hari kerja (UU PDP) |
| Target availability sistem | ≥ 99,5%/bulan |
| Target respons sistem | ≤ 3 detik |
| Target proses scan QR | ≤ 2 detik |
| RTO disaster recovery | ≤ 4 jam |
| Tanggal NDA ditandatangani | 12 Maret 2026 |
| Direktur perusahaan | Riki Subagja |

---

## References

- Dokumen Tugas Besar IF3141 — K01 G03, PT Berkah Melano Indonesia (2026)
- UU Perlindungan Data Pribadi No. 27 Tahun 2022
- ISO/IEC 27001 — Information Security Management Systems

**Class**: IF3141 Sistem Informasi  
**Date**: 2026-03-12  
**Topics**: Problem Analysis, Solution Design, Legal & Ethical, Professional Responsibility, Peer Assessment

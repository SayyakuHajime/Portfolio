---
title: IF3141 Sistem Informasi — Rangkuman Ujian
course: IF3141
subject: Sistem Informasi
exam: UTS & UAS
topics: [Konsep SI, Strategi & Kompetisi, BPMN, SDLC, Requirement Engineering, Desain SI, Arsitektur & Modeling, Testing & Quality, Implementasi, Enterprise IS, Etika & Legal]
references: Developing Information Systems (James Cadle ed.), Lecture Slides IF3141, Soal UTS/UAS 2021
order: 1
date: "2025-01-01"
---

## 1. Konsep Dasar Sistem Informasi

*Cakupan: UTS — Definisi SI, komponen, level manajemen, data vs informasi*

### 1.a Ringkasan Cepat

> [!note] Definisi
> **Sistem Informasi (SI)** adalah kumpulan komponen yang mengelola aliran informasi sejak pemasukan, distribusi, hingga pelaporan di suatu organisasi.

Komponen SI (**BIOT**):
- **B**rainware — pemakai akhir, pengembang
- **I**nfoware — data, informasi
- **O**rganoware — kebijakan, prosedur
- **T**echnoware — hardware, software, jaringan

> [!warn] Common Mistake
> "Aplikasi" bukan komponen SI tersendiri — ia bagian dari **Technoware**.

Tujuan SI: efektif, efisien, availability, reliability, compliance, **confidentiality**, integrity.

**Hirarki data:**

| Level | Contoh |
|-------|--------|
| Data | Jumlah mahasiswa lulus per prodi |
| Informasi | Prodi mana yang terbanyak meluluskan |
| Pengetahuan | Mengapa prodi XYZ menghasilkan paling sedikit |
| Kebijaksanaan | Kebijakan agar lebih banyak mahasiswa lulus tepat waktu |

**3 Level Manajemen dan SI-nya:**

| Level | Peran | Sistem |
|-------|-------|--------|
| Operasional | Mendukung bisnis proses & operasi | TPS |
| Taktikal (Middle) | Membantu pembuatan keputusan bisnis | MIS |
| Strategis (Top) | Mendukung strategi & keunggulan kompetitif | DSS/ESS |

> [!warn] Common Mistake
> Ketiga level di atas sering terbalik di soal. Ingat: Operational → proses; Tactical → keputusan; Strategic → kompetitif.

**Proses Manajemen:** Planning → Organising → Leading/Directing → Controlling

### 1.b Soal-Soal Kunci

**Q4 · UTS 2021** — Pernyataan yang benar mengenai manajemen taktikal:
- Menerjemahkan rencana strategik ke aktivitas yang lebih spesifik ✓
- Bertanggung jawab implementasi kebijakan manajemen tertinggi ✓
- Kepala Unit Bisnis termasuk level ini ✓
- "Tekanan pada perkembangan perusahaan" → salah, ini level strategis ✗

**Q8 · UTS 2021** — SI selaras dengan bisnis jika: **dikembangkan berdasar arah bisnis**, bukan berorientasi pada teknologi.

---

## 2. Strategi Bisnis & Persaingan

*Cakupan: UTS — Porter 5 Forces, Value Chain, Generic Strategy, Tipe Organisasi*

### 2.a Ringkasan Cepat

**Porter 5 Forces:** Rivalry (kompetitor), Ancaman Pendatang Baru, Produk Pengganti, Buyer Power, Supplier Power

**4 Generic Strategy Porter:**
1. Cost Leadership
2. Differentiation
3. Cost Focus
4. Differentiation Focus

> [!note] Definisi
> **Competitive Advantage** adalah *tujuan*, bukan strategi generik itu sendiri.

**Value Chain:**
- Aktivitas **Primer**: logistik masuk/keluar, operasi, marketing & sales, service
- Aktivitas **Sekunder/Pendukung**: HR, teknologi, infrastruktur, procurement

**Tipe Organisasi (Mullins):** Entrepreneurial, Machine Bureaucracy, Professional Bureaucracy, Divisional, Adhocracy, Missionary

### 2.b Soal-Soal Kunci

**Q2 · UTS 2021** — PT Bintang Revolusi membuat 5 produk untuk penyandang disabilitas → **Differentiation Focus** (segmen sempit + produk unik).

**Q5 · UTS 2021** — UU HAKI (paten, hak cipta) terutama mengurangi **ancaman pendatang baru** (menciptakan barrier to entry).

**Q9 · UTS 2021** — Professional Bureaucracy: termasuk universitas/RS/kementerian, didominasi technical core (profesional), target = kualitas & efektivitas.

> [!insight] Key Insight
> Machine Bureaucracy → tujuan **efisiensi**. Professional Bureaucracy → tujuan **kualitas**. Startup → Entrepreneurial structure.

---

## 3. BPMN & Pemodelan Proses Bisnis

*Cakupan: UTS — Notasi BPMN 2.0, jenis gateway, task types, alur pemodelan*

### 3.a Ringkasan Cepat

**Elemen BPMN 2.0:**
- **Pool** — menggambarkan participant
- **Lane** — role dalam pool
- **Task** — aktivitas
- **Gateway** — titik keputusan/percabangan
- **Event** — start / intermediate / end

**Jenis Gateway:**

| Gateway | Simbol | Perilaku |
|---------|--------|---------|
| XOR (Exclusive) | X | Satu jalur aktif |
| AND (Parallel) | + | Semua jalur aktif |
| OR (Inclusive) | O | Satu atau lebih jalur aktif |

**Jenis Task:** Abstract, Service (web service), Send, Receive, User (interaksi dengan sistem), Manual (fisik tanpa sistem), Business Rule, Script

> [!note] Intermediate Event
> Berada di antara start & end. **Mempengaruhi** proses tapi **tidak** memulai atau menghentikan secara langsung.

**Urutan BPM lifecycle:**
Process Identification → Discovery → Analysis → Redesign → Implementation → Monitoring & Controlling

### 3.b Soal-Soal Kunci

**Q3 · UTS 2021** — Kopi/makanan ATAU keduanya, dan **selalu** dapat kupon → **Parallel Gateway (+)** karena kupon selalu aktif terlepas pilihan pesanan.

**Q4 · UTS 2021** — "Perbaikan kabel internet di rumah pelanggan" → **Manual task** (pekerjaan fisik manusia tanpa sistem).

**Q5 · Kuis** — Standar pemodelan proses bisnis yang valid: UML, Flowchart, BPMN, IDEF0. (Algoritma & kode program **bukan** standar pemodelan proses bisnis.)

---

## 4. SDLC & Development Approaches

*Cakupan: UTS & UAS — Siklus hidup pengembangan, metodologi, pendekatan pengadaan*

### 4.a Ringkasan Cepat

**Fase SDLC:**
$$\text{Feasibility Study} \to \text{RE} \to \text{Design} \to \text{Development} \to \text{Testing} \to \text{Implementation}$$

**Build vs Buy** diputuskan setelah **Requirement Engineering** selesai.

**Dua Model Proses:**

| Model | Karakteristik | Contoh |
|-------|--------------|--------|
| Defined Process | Predictable, repeatable | Waterfall, SSADM, Unified Process |
| Empirical Process | Tidak fully predictable, agile | Scrum, XP, Kanban |

> [!insight] Key Insight
> Empirical Process menjadi tren karena tuntutan perubahan kebutuhan yang semakin sering, sehingga tidak tersedia waktu memadai untuk memahami sepenuhnya proses sebelum diimplementasikan.

**Pendekatan Pengadaan:**

| Pendekatan | Deskripsi | Competitive Advantage |
|------------|-----------|----------------------|
| Bespoke | Custom dari awal | Tertinggi (tailor-made, sulit ditiru) |
| COTS | Commercial off-the-shelf | Rendah (tersedia semua) |
| Open Source | Bisa dikustomisasi | Sedang |
| Subscription/Leased | Bayar pakai | Rendah |

### 4.b Soal-Soal Kunci

**Q1 · UTS 2021** — SDLC dengan risiko **scope creep terendah**: **Waterfall** (requirements dikunci di awal, tidak ada fase mundur).

**Q2 · UTS 2021** — Implementation dalam SDLC = **memastikan sistem mampu berfungsi di lingkungan perusahaan** (bukan coding, bukan testing).

---

## 5. Requirement Engineering

*Cakupan: UTS — Elicitation, analisis, dokumentasi, validasi, prioritisasi*

### 5.a Ringkasan Cepat

**4 Aktivitas RE:** Elicitation → Analysis → Documentation → Validation

> [!warn] Common Mistake
> **Requirement Design bukan bagian RE.** Design adalah fase SDLC terpisah setelah RE.

**RE fokus pada WHAT & WHY**, hindari mendefinisikan HOW di fase ini.

**Karakteristik requirement yang baik (UTCAUUCA):**
Unambiguous, Testable, Concise, Consistent, Achievable, Unique, Atomic, Conformant

**Prioritisasi MoSCoW:**

| Kategori | Makna |
|----------|-------|
| Must have | Wajib ada dan segera |
| Should have | Penting tapi bisa ditunda |
| Could have | Nice-to-have, tidak kritikal |
| Won't have | Tidak untuk sekarang |

**Dokumentasi:** Requirements Catalogue (bukan data models atau functional models — itu output Design).

### 5.b Soal-Soal Kunci

**Q4 · UTS 2021** — "Sistem harus memiliki antarmuka yang mudah digunakan" tidak memenuhi: **Unambiguous and testable** ("mudah" ambigu, tidak bisa diverifikasi objektif).

**Q6 · UTS 2021** — Lingkup **Requirements Management** (bukan RE): Change controls, Configuration management, Requirements traceability. **Prioritization** adalah bagian dari Requirements Analysis, bukan RM.

---

## 6. Desain Sistem Informasi

*Cakupan: UTS — Input/output design, process design, data design, control design*

### 6.a Ringkasan Cepat

**Lingkup Desain IS:** Input/Output, Process, Data, Security/Control

> [!warn] Common Mistake
> "Environment design" bukan lingkup standar IS design. BPMN adalah untuk desain **proses**, bukan untuk desain **data**.

**Model yang tepat untuk desain data:** Relational Model, ERD, UML Class Diagram.

**Input Control Techniques:**

| Teknik | Cara Kerja | Contoh |
|--------|------------|--------|
| Existing checks | Memastikan field terisi (not null) | Required (*) di Google Form |
| Range checks | Cek nilai/panjang dalam batasan | NIM harus tepat 8 angka |
| Self-checking | Digit verifikasi internal | Digit terakhir ISBN |
| Double-keying | Input dimasukkan dua kali | Konfirmasi password/email |

**Output technology:** monitor, printer, speaker, plotters, MMS, SMS, email, XML
**Bukan output (input):** Scanner, RFID reader

> [!insight] Key Insight
> Design patterns paling tepat digunakan ketika **masalahnya mirip dengan yang sudah pernah terjadi** sebelumnya — bukan karena kompleksitas atau skala.

---

## 7. Arsitektur & System Modeling

*Cakupan: UAS — Enterprise/Solution/Software architecture, model types, CBD, Cloud*

### 7.a Ringkasan Cepat

**3 Level Arsitektur (abstrak → detail):**
$$\text{Enterprise Architecture} \to \text{Solution Architecture} \to \text{Software Architecture}$$

**3 Dimensi Solution Architecture:** Breadth (lebar cakupan), Focus (aspek yang difokuskan), Depth (kedalaman deskripsi)

**Three-View Model (Tahir Ahmed):**

| View | Model | Contoh |
|------|-------|--------|
| Functional | Apa yang dilakukan sistem | Use Case, DFD |
| Static (Data) | Struktur data | ERD, Class Diagram |
| Behavioral (Event) | Perubahan state berdasarkan event | State-transition diagram |

> [!note] Definisi
> **Non-functional model** adalah jenis **requirement**, bukan jenis model/view sistem.

**Component Based Development (CBD):**
- Black box (tidak perlu tahu internal)
- Interface-based
- Komponen dari vendor berbeda dapat digunakan
- Tidak dikategorikan kaku menjadi "provider" vs "consumer" — itu konsep **SOA**

**Cloud Service Models:**

| Model | Deskripsi |
|-------|-----------|
| SaaS | Langsung pakai aplikasi, tidak perlu build |
| PaaS | Platform untuk build aplikasi |
| IaaS | Hanya infrastruktur |

### 7.b Soal-Soal Kunci

**Q3 · UAS 2021** — State-transition diagram (pemesanan kamar hotel) = **Behavioral model**.

**Q6 · UAS 2021** — Organisasi tidak punya kapabilitas bangun sistem sendiri → **SaaS**.

---

## 8. Testing & Quality Assurance

*Cakupan: UAS — Jenis testing, static vs dynamic, regression, defect/error/failure*

### 8.a Ringkasan Cepat

**Rantai kesalahan:**
$$\text{Error (manusia)} \to \text{Defect (kode)} \to \text{Failure (sistem gagal)}$$

**Static vs Dynamic Testing:**

| | Static Testing | Dynamic Testing |
|-|----------------|-----------------|
| Jalankan program? | Tidak | Ya |
| Menemukan | Errors | Defects |
| Teknik | Walkthrough, Technical Review, Inspection, Informal Review | Black-box, White-box |

> [!warn] Common Mistake
> **Black-box testing** adalah dynamic (program dijalankan), **bukan** static testing.

**Jenis testing beban:**
- **Load testing** — uji dengan beban terbesar yang masih mampu ditangani (ribuan user simultan)
- **Stress testing** — uji sampai sistem gagal (beyond limits)
- **Performance testing** — mencari bottleneck, menentukan baseline umum

> [!insight] Key Insight
> **Regression testing** = menguji bagian yang **TIDAK** berubah setelah ada perubahan, untuk memastikan perubahan di satu bagian tidak merusak bagian lain.

### 8.b Soal-Soal Kunci

**Q2 · UAS 2021** — Pengujian sistem akademik agar bisa diakses ribuan mahasiswa bersamaan → **Load testing**.

**Q5 · UAS 2021** — Regression testing = menguji bagian yang **tidak mengalami perubahan** (bukan re-testing bagian yang diubah).

---

## 9. Implementasi & Changeover

*Cakupan: UAS — Pendekatan changeover, migrasi data, pelatihan, konfigurasi*

### 9.a Ringkasan Cepat

**Pendekatan Changeover:**

| Pendekatan | Deskripsi | Risiko |
|------------|-----------|--------|
| Big Bang | Langsung ganti total, tanpa transisi | Sangat tinggi |
| Parallel Running | Dua sistem berjalan bersamaan | Rendah (mahal) |
| Phased | Fitur dideploy bertahap | Sedang |
| Pilot | Ditest ke satu area dulu | Sedang |

**Migration Management:**
- **Configuration management** — memastikan versi modul yang **benar** yang dimigrasi
- **Release management** — memastikan hanya implementasi yang **kompatibel** dikemas bersama
- **Timing management** — kapan migrasi dilakukan
- **Validation management** — memvalidasi hasil konversi data

**Data Mapping Issues:** Field Type, Field Length, Field Structures, Required Fields, Semantics, Validation

**Tahapan Pelatihan:** Identify competencies → Define training strategy → Deliver training

> [!warn] Common Mistake
> "Berapa lama waktu implementasi" adalah pertimbangan **perencanaan implementasi**, bukan pertimbangan **pelatihan**.

---

## 10. Enterprise Information Systems

*Cakupan: UAS — TPS, MIS, DSS, ESS, ERP, SCM, CRM*

### 10.a Ringkasan Cepat

**Hierarki dan alur data:**
$$\text{TPS} \to \text{MIS} \to \text{DSS} \leftrightarrow \text{ESS}$$

> [!warn] Common Mistake
> TPS **tidak** mendapat input dari MIS, DSS, atau ESS. Alur data hanya satu arah ke atas.

**Karakteristik tiap sistem:**

| Sistem | Input | Processing | Target Pengguna |
|--------|-------|-----------|----------------|
| TPS | Transaksi harian | Sorting, listing, merging, updating | Operational staff |
| MIS | Summary dari TPS | Reports, summaries | Middle management |
| DSS | Summary + analytical data | Interactive, simulation, AI/analytics | Professional/staff |
| ESS | Aggregate dari semua | Graphics, queries, drill-down | Senior executives |

**ERP Implementation Approaches:** Vanilla (as-is), Customisation, Best Practices, BPR (Business Process Reengineering)

> [!insight] Key Insight
> Faktor sukses ERP: top management support, pelatihan pengguna, bantuan pakar luar. Popularitas ERP **tidak** menjamin kecocokan dengan kebutuhan perusahaan.

**Enterprise IS memiliki shared/integrated database** — bukan tidak memilikinya.

---

## 11. Etika, Legal & Isu Sosial SI

*Cakupan: UAS — Five moral dimensions, IP rights, dampak SI, privacy*

### 11.a Ringkasan Cepat

**5 Moral Dimensions (Laudon & Laudon):**
1. Information rights & obligations
2. Property rights & obligations
3. Accountability & control
4. System quality
5. Quality of life

**Intellectual Property Rights:**

| Jenis | Melindungi | Contoh |
|-------|-----------|--------|
| Copyright | Karya cipta (bukan ide) | Buku, musik, kode |
| Patent | Monopoli penemuan | Teknologi, proses |
| Trade Secret | Rahasia bisnis (formula/proses) | Resep Coca-Cola |
| Trademark | Simbol/merek | Logo, nama brand |

> [!note] Definisi
> **Trade Secret** = produk intelektual yang digunakan untuk kebutuhan bisnis dan harus dijaga kerahasiaannya. Larangan kerja di perusahaan sejenis (non-compete clause) melindungi trade secret.

**Dampak negatif SI:** kemudahan akses informasi pribadi orang lain, PHK massal akibat otomasi, dll.

### 11.b Soal-Soal Kunci

**Q2 · UAS 2021** — Kejahatan "baru" karena TI, KECUALI: **Pembajakan lagu** (sudah ada sebelum era TI modern — kaset bajakan).

**Q6 · UAS 2021** — Kebocoran data bertolak belakang dengan tujuan SI: **Confidentiality**.

**Q5 · UAS 2021** — Dimensi moral **tidak** dilibatkan saat: menggunakan perangkat lunak tanpa melihat lisensi (justru melanggar Property rights — dimensi moral diabaikan).

---

## 12. Exam Tips & Quick Reference

> [!insight] Yang Sering Keluar di Soal
> - Komponen SI = BIOT (bukan "Aplikasi")
> - Level manajemen dan SI-nya sering ditukar di soal — hafal arah yang benar
> - RE = Elicitation, Analysis, Documentation, Validation (Design BUKAN bagian RE)
> - Static testing → errors; Dynamic testing → defects
> - Regression testing = bagian yang TIDAK berubah
> - Big Bang = ganti total tanpa transisi
> - Trade secret = alasan non-compete clause

**Ringkasan singkatan penting:**

| Singkatan | Kepanjangan |
|-----------|-------------|
| TPS | Transaction Processing System |
| MIS | Management Information System |
| DSS | Decision Support System |
| ESS | Executive Support System |
| ERP | Enterprise Resource Planning |
| SCM | Supply Chain Management |
| CRM | Customer Relationship Management |
| BPMN | Business Process Model and Notation |
| SDLC | System Development Life Cycle |
| RE | Requirements Engineering |
| CBD | Component-Based Development |
| SOA | Service-Oriented Architecture |
| COTS | Commercial Off-The-Shelf |
| BPR | Business Process Reengineering |

---

## References

- Cadle, J. et al. — *Developing Information Systems* (BCS)
- Laudon & Laudon — *Management Information Systems*
- Soal UTS & UAS IF3141 2021
- Slide Kuliah IF3141

**Class**: IF3141 Sistem Informasi  
**Date**: 2025  
**Topics**: Konsep SI, Strategi, BPMN, SDLC, RE, Desain, Arsitektur, Testing, Implementasi, Enterprise IS, Etika

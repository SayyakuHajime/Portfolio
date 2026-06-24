---
title: IF3141 Sistem Informasi - Rangkuman Ujian
course: IF3141
subject: Sistem Informasi
exam: UTS & UAS
topics: [Konsep SI, Strategi & Kompetisi, BPMN, SDLC, Requirement Engineering, Desain SI, Arsitektur & Modeling, Testing & Quality, Implementasi, Enterprise IS, Etika & Legal]
references: Developing Information Systems (James Cadle ed.), Laudon & Laudon, Soal UTS/UAS IF3141 2021, Slide Kuliah IF3141
order: 1
date: "2025-01-01"
---

## 1. Konsep Dasar Sistem Informasi

*Cakupan: UTS - Definisi SI, komponen, level manajemen, data vs informasi*

### 1.a Ringkasan Cepat

> [!note] Definisi
> **Sistem Informasi (SI)** adalah kumpulan komponen yang mengelola aliran informasi sejak pemasukan, distribusi, hingga pelaporan di suatu organisasi.

**Komponen SI (BIOT) - bukan "Aplikasi" atau "Organisasi" sendiri:**
- **B**rainware - pemakai akhir, pengembang
- **I**nfoware - data, informasi
- **O**rganoware - kebijakan, prosedur
- **T**echnoware - hardware, software, jaringan

**Tujuan SI:** efektif, efisien, availability, reliability, compliance, confidentiality, integrity

**Piramida data:**

$$\text{Data} \to \text{Informasi} \to \text{Pengetahuan} \to \text{Kebijaksanaan}$$

**3 Level Manajemen:**

| Level | Peran SI | Sistem |
|-------|----------|--------|
| Operational | Mendukung bisnis proses & operasi | TPS |
| Tactical/Middle | Membantu pembuatan keputusan bisnis | MIS |
| Strategic/Top | Mendukung strategi & keunggulan kompetitif | DSS/ESS |

**Proses manajemen:** Planning, Organising, Leading/Directing, Controlling

### 1.b Soal & Jawaban

---

**Q1 · Kuis** - Apa yang disebut Sistem Informasi?

| Opsi | Status |
|------|--------|
| Teknologi informasi untuk mengelola informasi di organisasi | ✓ |
| Aplikasi yang mengelola data dan mengolahnya | ✓ |
| Kumpulan komponen yang mengelola aliran informasi sejak pemasukan, distribusi, hingga pelaporan di suatu organisasi | ✓ |
| Semua benar | ✓ |

> **Jawaban: Semua benar.** SI bisa didefinisikan dari sudut teknologi, aplikasi, maupun sebagai sistem komponen terintegrasi. Semua definisi tersebut saling melengkapi.

---

**Q2 · Kuis** - Yang bukan merupakan komponen suatu sistem informasi adalah...

| Opsi | Status |
|------|--------|
| Brainware (pemakai akhir, pengembang) | komponen SI |
| Infoware (data, informasi) | komponen SI |
| Organoware (kebijakan, prosedur) | komponen SI |
| Technoware (hardware, software, jaringan) | komponen SI |
| **Aplikasi** | ✓ bukan komponen tersendiri |

> **Jawaban: Aplikasi.** Komponen SI = Brainware, Infoware, Organoware, Technoware. "Aplikasi" adalah bagian dari Technoware, bukan komponen mandiri.

---

**Q3 · Kuis** - Pernyataan yang paling tepat mengenai data dan informasi...

| Opsi | Status |
|------|--------|
| Informasi merupakan data yang sudah diproses menjadi berarti bagi penerimanya | ✓ |
| Data mewakili suatu kenyataan/fakta yang memiliki konteks tertentu | ✓ |
| Data berformat dalam bentuk teks | ✗ |
| Informasi bersifat pasti bagi semua pemakai | ✗ |

> **Benar: A & B.** Data tidak harus berformat teks (bisa angka, gambar, suara). Informasi bersifat relatif - maknanya bergantung pada konteks dan penerimanya, tidak pasti bagi semua orang.

---

**Q4 · UTS 2021** - Pernyataan yang benar mengenai manajemen taktikal adalah...

| Opsi | Status |
|------|--------|
| Bertugas menerjemahkan rencana strategik ke dalam aktivitas yang lebih spesifik | ✓ |
| Bertanggung jawab dalam implementasi kebijakan manajemen tertinggi | ✓ |
| Kepala Unit Bisnis menjadi salah satu dari manajemen level ini | ✓ |
| Tekanan pada perkembangan perusahaan | ✗ |

> **Benar: A, B, C.** Manajer taktikal (middle management) menjembatani strategi dan operasional. "Tekanan pada perkembangan perusahaan" lebih tepat untuk level strategis. Kepala Unit Bisnis memang termasuk middle management.

---

**Q5 · Kuis** - Proses manajemen meliputi...

| Opsi | Status |
|------|--------|
| Planning, Organising, Directing/Leading, dan Controlling | ✓ |
| Kepemimpinan menentukan bagaimana organisasi disusun | ✗ |
| Pengorganisasian meliputi proses memotivasi anggota | ✗ |
| Perencanaan menentukan cara pencapaian terbaik tapi bukan tujuan | ✗ |

> **Jawaban: A.** Kepemimpinan (Leading) = memotivasi dan mengarahkan. Pengorganisasian (Organising) = menyusun struktur. Perencanaan (Planning) = menentukan tujuan DAN cara pencapaian.

---

**Q6 · UTS 2021** - Peran dasar Sistem Informasi pada setiap level...

| Opsi | Status |
|------|--------|
| Di level tactical untuk membantu berkompetisi | ✗ |
| Di level strategi untuk mendukung bisnis proses | ✗ |
| Di level operational untuk mendukung pengambilan keputusan | ✗ |
| **Tidak ada pernyataan yang benar** | ✓ |

> **Jawaban: Tidak ada yang benar.** Peran yang benar: Operational → mendukung bisnis proses; Tactical → membantu keputusan bisnis; Strategic → mendukung strategi kompetitif. Semua opsi A/B/C terbalik level-levelnya.

---

**Q7 · UTS 2021** - Pernyataan yang tidak tepat mengenai data/informasi/pengetahuan/kebijaksanaan...

| Opsi | Status |
|------|--------|
| Data: Jumlah mahasiswa lulus tepat waktu pada setiap program studi | benar |
| **Kebijaksanaan: Bagaimana proses kelulusan tepat waktu terjadi** | ✗ ini Pengetahuan |
| Informasi: Program studi mana yang terbanyak meluluskan | benar |
| Pengetahuan: Mengapa program studi XYZ menghasilkan paling sedikit | benar |

> **Yang salah: B.** "Bagaimana proses terjadi" adalah Pengetahuan (knowledge). Kebijaksanaan (wisdom) = kemampuan menggunakan pengetahuan untuk membuat keputusan tepat, misal kebijakan agar lebih banyak mahasiswa lulus tepat waktu.

---

**Q8 · UTS 2021** - Sistem informasi akan selaras dengan bisnis jika...

| Opsi | Status |
|------|--------|
| **Dikembangkan berdasar arah bisnis** | ✓ |
| Dikembangkan menggunakan teknologi informasi | ✗ |
| Berorientasi pada teknologi | ✗ |

> **Jawaban: A.** SI harus driven by business needs, bukan driven by technology. Orientasi pada teknologi justru risiko - bisa jadi teknologi canggih tapi tidak relevan dengan kebutuhan bisnis.

---

## 2. Strategi Bisnis & Persaingan

*Cakupan: UTS - Porter 5 Forces, Value Chain, Generic Strategy, Tipe Organisasi*

### 2.a Ringkasan Cepat

**Porter 5 Forces:** Rivalry (kompetitor), Ancaman Pendatang Baru, Produk Pengganti, Buyer Power, Supplier Power

**4 Generic Strategy Porter:** Cost Leadership, Differentiation, Cost Focus, Differentiation Focus

> [!warn] Common Mistake
> **Competitive Advantage** adalah *tujuan/hasil*, bukan strategi generik itu sendiri.

**Value Chain:**
- Aktivitas **Primer** (langsung menciptakan value): logistik masuk/keluar, operasi, marketing & sales, service
- Aktivitas **Sekunder/Pendukung**: HR, teknologi, infrastruktur, procurement

**Tipe Organisasi (Mullins):** Entrepreneurial, Machine Bureaucracy, Professional Bureaucracy, Divisional, Adhocracy, Missionary

### 2.b Soal & Jawaban

---

**Q1 · Kuis** - Strategi Generik perusahaan adalah...

| Opsi | Status |
|------|--------|
| Kepemimpinan Biaya Rendah (Cost Leadership) | ✓ |
| Diferensiasi Produk | ✓ |
| Biaya Berfokus (Cost Focus) | ✓ |
| Diferensiasi Berfokus | ✓ |
| Competitive Advantage | ✗ ini tujuan/hasil, bukan strategi |

> **Benar: 4 strategi generik Porter.** Competitive Advantage adalah tujuan yang ingin dicapai melalui strategi-strategi tersebut, bukan strategi itu sendiri.

---

**Q2 · UTS 2021** - PT Bintang Revolusi memfokuskan 5 produknya untuk penyandang disabilitas. Strateginya adalah...

| Opsi | Status |
|------|--------|
| Surviving | ✗ |
| Expansion | ✗ |
| **Differentiation Focus** | ✓ |
| Cost Leadership | ✗ |
| Focused Niche | ✗ bukan istilah Porter |

> **Jawaban: Differentiation Focus.** Fokus pada segmen tertentu (penyandang disabilitas) dengan produk yang berbeda/khusus. Focus = segmen sempit. Differentiation = keunikan produk. Bukan Cost Leadership karena tidak ada info harga murah.

---

**Q3 · UTS 2021** - Dampak dari buyer power, KECUALI...

| Opsi | Status |
|------|--------|
| Konsumen menuntut layanan lebih | dampak buyer power |
| Kualitas produk/layanan harus meningkat | dampak buyer power |
| Perusahaan harus menurunkan harga | dampak buyer power |
| Penurunan pangsa pasar | dampak buyer power |
| **Perusahaan harus meningkatkan kapasitas produksi** | ✓ BUKAN dampak langsung |

> **Yang bukan dampak buyer power: meningkatkan kapasitas produksi.** Buyer power tinggi memaksa perusahaan menurunkan harga dan meningkatkan kualitas. Kapasitas produksi lebih dipengaruhi demand volume, bukan kekuatan tawar konsumen.

---

**Q4 · UTS 2021** - Kehadiran online marketplace sebagai peluang sekaligus ancaman dari 5 Forces...

| Opsi | Status |
|------|--------|
| **Menurunkan ancaman pendatang baru DAN meningkatkan kompetisi antar penguasa pasar** | ✓ |
| Melemahkan buyer power dan meningkatkan ancaman produk pengganti | ✗ |
| Menurunkan ancaman produk pengganti dan meningkatkan supplier power | ✗ |
| Melemahkan supplier power dan meningkatkan buyer power | ✗ |

> **Jawaban: A.** Online marketplace menurunkan barrier to entry (semua bisa masuk platform) - tapi meningkatkan persaingan antar pemain yang sudah ada. Peluang = akses pasar lebih luas. Ancaman = kompetitor makin banyak terlihat.

---

**Q5 · UTS 2021** - UU HAKI (paten, hak cipta) terutama berperan mengurangi dampak dari...

| Opsi | Status |
|------|--------|
| Persaingan antar kompetitor yang sudah ada | ✗ |
| Kekuatan konsumen/buyer | ✗ |
| **Ancaman pendatang baru** | ✓ |
| Ancaman produk pengganti | ✗ |
| Kekuatan supplier | ✗ |

> **Jawaban: Ancaman pendatang baru.** HAKI menciptakan barrier to entry - pesaing baru tidak bisa langsung meniru teknologi/produk yang sudah dipatenkan.

---

**Q6 · UTS 2021** - Supply Chain Management termasuk lingkup... sistem informasi

| Opsi | Status |
|------|--------|
| Intra organisasi | ✗ |
| **Extra organisasi** | ✓ |

> **Jawaban: Extra organisasi.** SCM melibatkan hubungan dengan supplier dan distribusi ke luar organisasi. Extra organisasi = melibatkan pihak luar (antarorganisasi). CRM juga extra. ERP dan Financial IS = intra.

---

**Q7 · Kuis** - Value Chain - pernyataan yang benar...

| Opsi | Status |
|------|--------|
| Kegiatan primer meliputi urusan logistik, operasi, pemasaran dan pelayanan | ✓ |
| Kegiatan Primer merupakan kegiatan penunjang | ✗ |
| Kegiatan sekunder meliputi urusan administrasi, teknologi, keuangan, HR | ✓ |
| Rantai nilai menggambarkan struktur organisasi | ✗ |
| Rantai Nilai hanya untuk perusahaan manufaktur | ✗ |

> **Benar: A & C.** Aktivitas Primer = kegiatan inti yang langsung menciptakan value. Aktivitas Sekunder/Pendukung = mendukung primer. Value Chain bukan gambaran struktur org, dan bisa diterapkan di semua industri.

---

**Q8 · Kuis** - Tipe organisasi - pernyataan yang benar...

| Opsi | Status |
|------|--------|
| Birokrasi profesional memiliki staf teknis yang sangat banyak | ✗ |
| Struktur entrepreneur memiliki mayoritas pegawai administratif | ✗ |
| **Mesin birokrat memiliki objektif efisiensi** | ✓ |
| Startup mirip struktur birokrasi profesional | ✗ |

> **Benar: C.** Machine Bureaucracy = berfokus pada efisiensi dan standarisasi (contoh: pabrik, bank). Professional Bureaucracy memiliki technical core (profesional) yang banyak. Startup = entrepreneurial structure.

---

**Q9 · UTS 2021** - Tipe Organisasi birokrasi profesional...

| Opsi | Status |
|------|--------|
| Termasuk universitas, rumah sakit, kementerian | ✓ |
| Sebagian besar karyawan adalah pekerja teknis (technical core) | ✓ |
| Target struktur adalah kualitas dan efektivitas | ✓ |

> **Semua benar.** Professional Bureaucracy = organisasi yang didominasi profesional (dokter, dosen, pengacara). Tujuan = kualitas layanan profesional, bukan efisiensi biaya semata.

---

## 3. BPMN & Pemodelan Proses Bisnis

*Cakupan: UTS - Notasi BPMN 2.0, jenis gateway, task types, alur pemodelan*

### 3.a Ringkasan Cepat

**Elemen BPMN 2.0:**
- **Pool** - menggambarkan participant
- **Lane** - role dalam pool
- **Task** - aktivitas
- **Gateway** - titik keputusan/percabangan
- **Event** - start / intermediate / end

> [!note] Intermediate Event
> Berada di antara start & end. **Mempengaruhi** proses tapi **tidak** memulai atau menghentikan secara langsung.

**Jenis Gateway:**

| Gateway | Simbol | Perilaku |
|---------|--------|---------|
| XOR (Exclusive) | X | Tepat satu jalur aktif |
| AND (Parallel) | + | Semua jalur aktif |
| OR (Inclusive) | O | Satu atau lebih jalur aktif |

**Jenis Task:** Abstract, Service (web service/automated), Send, Receive, User (interaksi dengan sistem/aplikasi), Manual (fisik tanpa sistem), Business Rule, Script

**Standar pemodelan proses bisnis:** UML, Flowchart/Flowmap, BPMN, IDEF0 - *bukan* Algoritma atau Kode Program

**Urutan BPM lifecycle:**
Process Identification → Discovery → Analysis → Redesign → Implementation → Monitoring & Controlling

### 3.b Soal & Jawaban

---

**Q1 · UTS 2021** - Pernyataan yang tidak benar mengenai BPMN 2.0...

| Opsi | Status |
|------|--------|
| Intermediate event berada di antara start & end. Ia **tidak** akan mempengaruhi proses tapi tidak akan memulai atau menghentikan secara langsung | ✗ SALAH |
| Intermediate event berada di antara start & end. Ia **akan** mempengaruhi proses tapi tidak akan memulai atau menghentikan secara langsung | benar |
| BPMN dapat menggambarkan data yang digunakan atau dihasilkan | benar |
| Pool digunakan untuk menggambarkan participant | benar |

> **Yang tidak benar: A.** Intermediate event MEMANG mempengaruhi proses (misal mengirim sinyal, menangkap event). Pernyataan A salah karena bilang "tidak mempengaruhi proses".

---

**Q2 · UTS 2021** - Ciri dari proses bisnis...

| Opsi | Status |
|------|--------|
| Task dapat dilakukan secara berulang | ✓ |
| Hanya bisa dilakukan secara sekuensial | ✗ |
| Urutan task tidak begitu penting | ✗ |
| Bisa melibatkan beberapa fungsi sekaligus | ✓ |
| Kumpulan dari task atau aktivitas untuk mencapai goal | ✓ |

> **Benar: A, D, E.** Proses bisnis BISA paralel (tidak hanya sekuensial). Urutan task PENTING karena menentukan alur pencapaian goal.

---

**Q3 · UTS 2021** - Gateway untuk proses pemesanan (kopi ATAU makanan, dan selalu dapat kupon) - yang tepat adalah...

| Opsi | Status |
|------|--------|
| **Parallel Gateway (+)** | ✓ |
| XOR Gateway (X) | ✗ hanya satu jalur |
| Inclusive Gateway (O) | ✗ satu atau lebih kondisi terpenuhi |

> **Jawaban: Parallel (+).** Setelah "Pemesanan", ada 3 jalur - Membuat dalgona kopi (jika pesan kopi), Memanaskan croffle (jika pesan makanan), dan Memberi kupon (selalu). Karena kupon selalu diberikan terlepas apapun pesanannya, setidaknya ada satu jalur yang selalu aktif paralel.

---

**Q4 · UTS 2021** - Simbol task untuk "Perbaikan kabel internet pada rumah pelanggan"...

| Opsi | Status |
|------|--------|
| Business Rule task | ✗ untuk task berdasarkan aturan bisnis/decision table |
| Service task | ✗ untuk web service/automated service |
| **Manual task** | ✓ pekerjaan fisik dilakukan manusia tanpa bantuan sistem |
| User task | ✗ untuk interaksi user dengan sistem/aplikasi |

> **Jawaban: Manual task.** Perbaikan kabel = pekerjaan manual fisik yang dilakukan manusia tanpa interaksi sistem.

---

**Q5 · Kuis** - Standar pemodelan proses bisnis (pilih yang benar)...

| Opsi | Status |
|------|--------|
| UML | ✓ |
| Flowchart/Flowmap | ✓ |
| BPMN | ✓ |
| Algoritma | ✗ bukan standar pemodelan proses bisnis |
| IDEF0 | ✓ |
| Kode Program | ✗ bukan standar pemodelan proses bisnis |

> **Benar: UML, Flowchart, BPMN, IDEF0.** Algoritma adalah langkah-langkah logika komputasional. Kode program adalah implementasi teknis. Keduanya bukan standar pemodelan proses bisnis.

---

**Q6 · UTS 2021** - Urutan process modeling yang benar...

| Opsi | Status |
|------|--------|
| Process discovery → identification → ... | ✗ |
| Process identification → analysis → discovery → ... | ✗ |
| **Process identification → discovery → analysis → redesign → implementation → monitoring & controlling** | ✓ |

> **Jawaban: C.** Tidak bisa discovery dulu sebelum tahu proses mana yang mau dianalisis. Identifikasi dulu → baru temukan/dokumentasikan kondisi sekarang → analisis → redesain → implementasi → monitor.

---

## 4. SDLC & Development Approaches

*Cakupan: UTS & UAS - Siklus hidup pengembangan, metodologi, pendekatan pengadaan*

### 4.a Ringkasan Cepat

**Fase SDLC:**

$$\text{Feasibility Study} \to \text{RE} \to \text{Design} \to \text{Development} \to \text{Testing} \to \text{Implementation}$$

**Build vs Buy** diputuskan setelah **Requirement Engineering** selesai.

**Dua Model Proses:**

| Model | Karakteristik | Contoh |
|-------|--------------|--------|
| Defined Process | Predictable, repeatable | Waterfall, SSADM, Unified Process |
| Empirical Process | Tidak fully predictable, agile terhadap perubahan | Scrum, XP, Kanban |

**Pendekatan Pengadaan:**

| Pendekatan | Deskripsi | Competitive Advantage |
|------------|-----------|----------------------|
| Bespoke | Custom dari awal, tailor-made | Tertinggi |
| COTS | Commercial off-the-shelf | Rendah |
| Open Source | Dapat dikustomisasi | Sedang |
| Subscription/Leased | Bayar pakai | Rendah |

### 4.b Soal & Jawaban

---

**Q1 · UTS 2021** - Manakah tipe SDLC yang memiliki risiko terendah mengalami Scope Creeping?

| Opsi | Status |
|------|--------|
| **Waterfall** | ✓ |
| V Model | terstruktur tapi tidak serendah Waterfall |
| Incremental | ada iterasi, scope bisa berubah |
| Iterative | lebih rentan scope creep |
| Spiral | iteratif dengan risk analysis |

> **Jawaban: Waterfall.** Requirements dikunci di awal sebelum ke fase berikutnya. Karena tidak ada ruang balik, scope creep sangat sulit terjadi.

---

**Q2 · UTS 2021** - Implementation dalam SDLC adalah aktivitas...

| Opsi | Status |
|------|--------|
| Mengidentifikasi solusi yang mungkin | ✗ ini Feasibility Study/Design |
| Menguji fungsionalitas dan kebenaran sistem | ✗ ini Testing |
| **Memastikan sistem mampu berfungsi di lingkungan perusahaan** | ✓ |
| Membangun sistem menggunakan kakas yang tersedia | ✗ ini Development/Programming |

> **Jawaban: C.** Implementation = deploy sistem ke lingkungan production, migrasi data, changeover, pelatihan pengguna.

---

**Q3 · UTS 2021** - Keputusan build vs buy bergantung pada hasil fase SDLC...

| Opsi | Status |
|------|--------|
| Development | ✗ |
| Design | ✗ |
| **Requirement Engineering** | ✓ |
| Feasibility Study | ✗ |
| Implementation | ✗ |

> **Jawaban: Requirement Engineering.** Keputusan bespoke vs COTS baru bisa dibuat setelah requirements terdefinisi dan disetujui - baru bisa dicek apakah ada solusi siap pakai yang cocok atau perlu dibuat sendiri.

---

**Q4 · UAS 2021** - Mengapa Empirical Process Model menjadi tren?

| Opsi | Status |
|------|--------|
| Saat ini sudah tidak ada proses yang predictable dan repeatable | ✗ |
| **Tuntutan perubahan kebutuhan semakin sering, tidak tersedia waktu memadai untuk memahami sepenuhnya proses sebelum diimplementasikan** | ✓ |
| Empirical Process Model sudah sepenuhnya menggantikan Defined Process Model | ✗ |
| Defined Process Model sudah ketinggalan zaman | ✗ |

> **Jawaban: B.** Pengembangan SI lebih mirip R&D daripada proses produksi yang predictable. A salah - proses repeatable masih ada. C & D salah - Defined Process Model masih relevan untuk konteks yang tepat.

---

**Q5 · UAS 2021** - Pendekatan yang lebih menawarkan keunggulan kompetitif bagi perusahaan...

| Opsi | Status |
|------|--------|
| Commercial off the shelf | ✗ |
| Subscription/Leased | ✗ |
| **Bespoke** | ✓ |
| Open Source | ✗ |

> **Jawaban: Bespoke.** Bespoke = sistem dibuat dari awal sesuai persis kebutuhan unik perusahaan - sulit ditiru kompetitor. COTS dan Open Source tersedia untuk semua, tidak memberikan keunggulan kompetitif eksklusif.

---

## 5. Requirement Engineering

*Cakupan: UTS - Elicitation, analisis, dokumentasi, validasi, prioritisasi*

### 5.a Ringkasan Cepat

**4 Aktivitas RE:** Elicitation → Analysis → Documentation → Validation

> [!warn] Common Mistake
> **Requirement Design bukan bagian RE.** Design adalah fase SDLC terpisah setelah RE.

**RE fokus pada WHAT & WHY** - hindari mendefinisikan HOW di fase ini.

**Karakteristik requirement yang baik:** Unambiguous, Testable, Concise, Consistent, Achievable, Unique, Atomic, Conformant

**Prioritisasi MoSCoW:**

| Kategori | Makna |
|----------|-------|
| Must have | Wajib ada dan segera |
| Should have | Penting (fundamental) tapi bisa ditunda |
| Could have | Nice-to-have, tidak kritikal |
| Won't have | Tidak untuk sekarang |

**Dokumentasi:** Requirements Catalogue *(bukan data models atau functional models - itu output fase Design)*

**Requirements Management** (beda dari RE): Change controls, Configuration management, Requirements traceability

### 5.b Soal & Jawaban

---

**Q1 · UTS 2021** - Yang bukan merupakan bagian dari aktivitas Requirements Engineering...

| Opsi | Status |
|------|--------|
| Requirement Elicitation | bagian RE |
| Requirement Documentation | bagian RE |
| Requirement Analysis | bagian RE |
| **Requirement Design** | ✓ BUKAN bagian RE |
| Requirement Validation | bagian RE |

> **Yang bukan: Requirement Design.** RE = Elicitation, Analysis, Documentation, Validation. Design adalah fase SDLC terpisah setelah RE.

---

**Q2 · UTS 2021** - Yang sebaiknya dihindari dalam RE dari SDLC adalah mendefinisikan...

| Opsi | Status |
|------|--------|
| When the system needs to do it | masih bisa di RE (constraint waktu) |
| Where the system needs to do it | bisa (constraint lokasi) |
| **How does the system do it** | ✓ HINDARI di RE |
| What the system needs to do | JUSTRU harus ada di RE |
| Why the system needs to do it | JUSTRU harus ada di RE |

> **Hindari: How.** HOW adalah domain Design dan Development. Mendefinisikan HOW di RE berarti mengunci solusi teknis sebelum requirements dipahami sepenuhnya.

---

**Q3 · UTS 2021** - Requirements yang fundamental tapi tidak harus dipenuhi dalam waktu cepat dikategorikan...

| Opsi | Status |
|------|--------|
| Must have | ✗ harus ada dan segera |
| Could have | ✗ nice to have, tidak kritikal |
| Want to have | ✗ bukan kategori MoSCoW standar |
| **Should have** | ✓ penting tapi bisa ditunda |

> **Jawaban: Should have.** MoSCoW: Must = wajib ada; Should = penting tapi bisa ditunda sedikit; Could = bagus kalau ada; Won't = tidak untuk sekarang.

---

**Q4 · UTS 2021** - "Sistem harus memiliki antarmuka yang mudah digunakan" - tidak memenuhi karakteristik...

| Opsi | Status |
|------|--------|
| **Unambiguous and testable** | ✓ tidak jelas dan tidak bisa diuji |
| Concise and conformant | ✗ |
| Consistent and achievable | ✗ |
| Unique and atomic | ✗ |

> **Jawaban: Unambiguous and testable.** "Mudah digunakan" sangat ambigu - mudah bagi siapa? Tidak bisa diuji secara objektif. Requirement yang baik harus spesifik dan dapat diverifikasi, misal "95% pengguna dapat menyelesaikan task X dalam 2 menit".

---

**Q5 · UTS 2021** - List requirement didokumentasikan pada...

| Opsi | Status |
|------|--------|
| Data models | ✗ |
| **Requirements catalogue** | ✓ |
| Functional models | ✗ |
| Glossary of terms | ✗ |

> **Jawaban: Requirements catalogue.** Requirements catalogue = dokumen resmi yang berisi semua requirement yang telah diidentifikasi, dianalisis, dan disepakati. Data models dan functional models adalah output dari fase Design.

---

**Q6 · UTS 2021** - Yang bukan merupakan lingkup dari requirements management...

| Opsi | Status |
|------|--------|
| Change controls | bagian RM |
| Configuration management | bagian RM |
| Requirements traceability | bagian RM |
| **Requirement prioritization** | ✓ bagian dari Requirements Analysis, bukan RM |

> **Yang bukan RM: Requirement prioritization.** Requirements Management = mengelola requirements setelah didefinisikan (perubahan, versi, traceability). Prioritization dilakukan saat Requirements Analysis.

---

## 6. Desain Sistem Informasi

*Cakupan: UTS - Input/output design, process design, data design, control design*

### 6.a Ringkasan Cepat

**Lingkup Desain IS:** Input/Output, Process, Data, Security/Control

> [!warn] Common Mistake
> "Environment design" bukan lingkup standar IS design. **BPMN** adalah untuk desain **proses**, bukan untuk desain **data**.

**Model yang tepat untuk desain data:** Relational Model, ERD, UML Class Diagram

**Input Control Techniques:**

| Teknik | Cara Kerja | Contoh |
|--------|------------|--------|
| Existing checks | Memastikan field terisi (not null) | Required (*) di Google Form |
| Range checks | Cek nilai/format/panjang dalam batasan | NIM harus tepat 8 angka |
| Self-checking | Digit verifikasi internal | Digit terakhir ISBN |
| Double-keying | Input dimasukkan dua kali lalu dicocokkan | Konfirmasi password/email |

**Output technology:** monitor, printer, speaker, plotters, MMS, SMS, email, XML  
**Bukan output (= input):** Scanner, RFID reader

> [!insight] Key Insight
> Design patterns paling tepat digunakan ketika **masalahnya mirip dengan yang sudah pernah terjadi** - bukan karena kompleksitas atau skala masalah.

### 6.b Soal & Jawaban

---

**Q1 · UTS 2021** - Yang bukan merupakan lingkup desain menurut "Developing Information Systems"...

| Opsi | Status |
|------|--------|
| **Environment design** | ✓ BUKAN lingkup desain IS standar |
| Data design | lingkup desain |
| Input/output design | lingkup desain |
| Process design | lingkup desain |

> **Jawaban: Environment design.** Lingkup desain IS: Input/Output, Process, Data, Security/Control. "Environment design" bukan lingkup standar IS design.

---

**Q2 · UTS 2021** - Yang bukan merupakan model yang tepat untuk mendesain data adalah...

| Opsi | Status |
|------|--------|
| Relational Model | tepat untuk desain data |
| UML (class diagram) | tepat untuk desain data |
| **BPMN** | ✓ untuk desain PROSES, bukan data |
| ERD | tepat untuk desain data |

> **Jawaban: BPMN.** BPMN = Business Process Modeling Notation → untuk memodelkan ALUR PROSES. Untuk desain data digunakan ERD, Relational Model, atau UML Class Diagram.

---

**Q3 · Kuis** - Fitur "required" (*) di Google Form mengontrol input dengan metode...

| Opsi | Status |
|------|--------|
| **Existing checks** | ✓ memastikan field tidak kosong |
| Range checks | ✗ memeriksa nilai dalam rentang tertentu |
| Self-checking checks | ✗ menggunakan digit verifikasi internal |
| Double-keying | ✗ input harus dimasukkan dua kali dan dicocokkan |

> **Jawaban: Existing checks.** Existing check = memverifikasi bahwa data sudah ada/terisi (not null). Range check = misal usia 0–120. Self-checking = misal digit terakhir ISBN. Double-keying = konfirmasi email diisi dua kali.

---

**Q4 · UTS 2021** - NIM ITB harus terdiri dari 8 angka. Bentuk pengontrolan ini disebut...

| Opsi | Status |
|------|--------|
| Existing checks | ✗ |
| Double-keying | ✗ |
| Self-checking checks | ✗ |
| **Range checks** | ✓ mengecek format/panjang dalam batasan tertentu |

> **Jawaban: Range checks.** Memeriksa bahwa NIM terdiri dari tepat 8 angka = format check/range (panjang karakter dalam range yang ditentukan).

---

**Q5 · UTS 2021** - Yang bukan merupakan teknologi untuk output adalah...

| Opsi | Status |
|------|--------|
| Monitor, speaker, touch screen | output ✓ |
| Plotters, monitor, MMS | output ✓ |
| **Scanners, SMS, RFID** | ✓ Scanners & RFID adalah INPUT |
| XML, printer, email | output ✓ |

> **Yang bukan output: Scanners & RFID (di opsi C).** Scanner = input (membaca data). RFID reader = input. SMS dan monitor = output.

---

**Q6 · UTS 2021** - Design patterns paling tepat digunakan ketika...

| Opsi | Status |
|------|--------|
| Persoalannya cukup kompleks | ✗ |
| Persoalannya memiliki skala besar | ✗ |
| **Persoalannya mirip dengan yang sudah pernah terjadi** | ✓ |
| Persoalannya terkait dengan pencarian pola seperti machine learning | ✗ |

> **Jawaban: C.** Design patterns = solusi yang sudah terbukti untuk masalah yang berulang. Bukan tentang kompleksitas atau skala, melainkan tentang kesamaan pola masalah.

---

## 7. Arsitektur & System Modeling

*Cakupan: UAS - Enterprise/Solution/Software architecture, model types, CBD, Cloud*

### 7.a Ringkasan Cepat

**3 Level Arsitektur (abstrak → detail):**

$$\text{Enterprise Architecture} \to \text{Solution Architecture} \to \text{Software Architecture}$$

**3 Dimensi Solution Architecture:** Breadth (lebar cakupan domain), Focus (aspek yang difokuskan), Depth (kedalaman deskripsi sebelum diserahkan ke detailed design)

**Three-View Model (Tahir Ahmed):**

| View | Memodelkan | Contoh |
|------|-----------|--------|
| Functional | Apa yang dilakukan sistem | Use Case, DFD |
| Static (Data) | Struktur data | ERD, Class Diagram |
| Behavioral (Event) | Perubahan state berdasarkan event | State-transition diagram |

> [!note] Definisi
> **Non-functional** adalah jenis *requirement*, bukan jenis model/view sistem.

**Component Based Development (CBD):**
- Black box - tidak perlu tahu mekanisme internal
- Setiap komponen harus menyediakan interface
- Komponen dapat bersumber dari vendor berbeda
- Komponen dapat bersifat independent maupun assembled

> [!warn] Common Mistake
> "Provider dan consumer" adalah konsep **SOA (Service Oriented Architecture)**, bukan CBD.

**Cloud Service Models:**

| Model | Deskripsi |
|-------|-----------|
| SaaS | Langsung pakai aplikasi, tidak perlu build apapun |
| PaaS | Platform untuk build aplikasi di atasnya |
| IaaS | Hanya infrastruktur komputasi |

### 7.b Soal & Jawaban

---

**Q1 · UAS 2021** - Urutan tingkat arsitektur (granularitas paling tinggi ke rendah)...

| Opsi | Status |
|------|--------|
| **Enterprise architecture, solution architecture, software architecture** | ✓ |
| Solution architecture, enterprise architecture, software architecture | ✗ |
| Solution architecture, software architecture, enterprise architecture | ✗ |
| Software architecture, solution architecture, enterprise architecture | ✗ |

> **Jawaban: A.** Enterprise Architecture = paling abstrak/luas. Software Architecture = paling detail/granular. Dari paling tinggi (abstrak): Enterprise → Solution → Software.

---

**Q2 · UAS 2021** - Lingkup solusi pada solution architecture terdiri atas 3 dimensi yaitu...

| Opsi | Status |
|------|--------|
| Breadth, focus, resources | ✗ |
| Time, cost, resources | ✗ |
| **Breadth, focus, depth** | ✓ |
| Time, focus, cost | ✗ |

> **Jawaban: C.** Breadth = lebar cakupan domain arsitektur. Focus = aspek mana yang difokuskan. Depth = seberapa dalam tingkat deskripsi sebelum diserahkan ke detailed design.

---

**Q3 · UAS 2021** - Model state-transition (seperti diagram pemesanan kamar hotel) tergolong sebagai...

| Opsi | Status |
|------|--------|
| Non-functional model | ✗ |
| Functional model | ✗ |
| Static model | ✗ |
| **Behavioral model** | ✓ |

> **Jawaban: Behavioral model.** State-transition diagram = menggambarkan perubahan state suatu entitas berdasarkan event/trigger. Ini adalah behavioral/event model.

---

**Q4 · UAS 2021** - Component Based Development - pernyataan yang TIDAK tepat...

| Opsi | Status |
|------|--------|
| Pengembang tidak wajib mengetahui mekanisme internal | benar (black box) |
| Komponen dapat bersumber dari vendor berbeda | benar |
| **Komponen dibedakan menjadi dua tipe: penyedia layanan dan pengguna layanan** | ✓ ini SOA, bukan CBD |
| Setiap komponen harus menyediakan interface | benar |

> **Yang tidak tepat: C.** "Provider dan consumer" adalah konsep dari Service Oriented Architecture (SOA). Pada CBD, komponen menyediakan services kepada komponen lain DAN menggunakan services dari komponen lain - tidak dikategorikan secara kaku menjadi dua tipe.

---

**Q5 · UAS 2021** - Menurut Tahir Ahmed, yang bukan merupakan jenis/sudut pandang dari model adalah...

| Opsi | Status |
|------|--------|
| Functional model | ada (Functionality view) |
| **Non-functional model** | ✓ BUKAN salah satu dari three-view |
| Behavioral model | ada (Events view) |
| Static model | ada (Static data view) |

> **Jawaban: Non-functional model.** Three-view model: Functional, Static, Behavioral. Non-functional adalah jenis requirement, bukan jenis model/view sistem.

---

**Q6 · UAS 2021** - Organisasi tidak punya kapabilitas membangun sendiri - model cloud yang tepat...

| Opsi | Status |
|------|--------|
| DaaS | ✗ |
| **SaaS** | ✓ |
| PaaS | ✗ masih perlu develop aplikasi |
| IaaS | ✗ hanya infrastruktur, perlu bangun sendiri |

> **Jawaban: SaaS.** SaaS = tinggal pakai aplikasinya langsung dari cloud, tidak perlu build apapun.

---

## 8. Testing & Quality Assurance

*Cakupan: UAS - Jenis testing, static vs dynamic, regression, defect/error/failure*

### 8.a Ringkasan Cepat

**Rantai kesalahan:**

$$\text{Error (keteledoran manusia)} \to \text{Defect (bug di kode)} \to \text{Failure (sistem gagal berfungsi)}$$

**Static vs Dynamic Testing:**

| | Static Testing | Dynamic Testing |
|-|----------------|-----------------|
| Jalankan program? | Tidak | Ya |
| Menemukan | Errors | Defects |
| Teknik | Walkthrough, Technical Review, Inspection, Informal Review | Black-box, White-box |

> [!warn] Common Mistake
> **Black-box testing** adalah dynamic testing (program dijalankan) - **bukan** static testing.

**Jenis testing performa:**

| Testing | Tujuan |
|---------|--------|
| Load testing | Uji dengan beban terbesar yang masih mampu ditangani (ribuan user simultan) |
| Stress testing | Uji sampai sistem gagal (beyond limits) |
| Performance testing | Mencari bottleneck, menentukan baseline umum |
| Security testing | Menguji keamanan sistem |

> [!insight] Key Insight
> **Regression testing** = menguji bagian yang **TIDAK** berubah setelah ada perubahan, memastikan perubahan di satu bagian tidak merusak bagian lain. **Re-testing** = menguji ulang bagian yang memang diubah.

### 8.b Soal & Jawaban

---

**Q1 · UAS 2021** - Kesalahan yang disebabkan oleh keteledoran manusia disebut...

| Opsi | Status |
|------|--------|
| **Error** | ✓ |
| Defects | ✗ kesalahan di kode program |
| Failure | ✗ kegagalan sistem menjalankan fungsinya |

> **Jawaban: Error.** Rantai: Error (kesalahan manusia) → menyebabkan Defect (bug di kode) → menyebabkan Failure (sistem gagal berfungsi seperti yang diharapkan).

---

**Q2 · UAS 2021** - Pengujian sistem akademik ITB agar bisa diakses ribuan mahasiswa bersamaan disebut...

| Opsi | Status |
|------|--------|
| Performance testing | ✗ mencari bottleneck, menentukan baseline |
| Security testing | ✗ menguji keamanan sistem |
| **Load testing** | ✓ |
| Stress testing | ✗ dikasih beban sampai sistem mati |

> **Jawaban: Load testing.** Load testing = sistem diuji dengan beban terbesar yang masih mampu ditangani (ribuan pengguna simultan = beban spesifik). Stress testing = push beyond limits sampai gagal.

---

**Q3 · UAS 2021** - Pengujian defects dilakukan dengan pendekatan...

| Opsi | Status |
|------|--------|
| Static testing | ✗ untuk errors |
| **Dynamic testing** | ✓ |
| Kedua jawaban benar | ✗ |
| Kedua jawaban salah | ✗ |

> **Jawaban: Dynamic testing.** Static testing = mendeteksi errors tanpa menjalankan program. Dynamic testing = menjalankan program dengan test data untuk mendeteksi defects.

---

**Q4 · UAS 2021** - Teknik yang tidak tepat digunakan dalam static testing adalah...

| Opsi | Status |
|------|--------|
| **Black-box** | ✓ ini dynamic testing |
| Inspection | static testing |
| Technical review | static testing |
| Walkthrough | static testing |

> **Yang tidak tepat untuk static testing: Black-box.** Black-box testing = menguji sistem dari perspektif input/output tanpa melihat internal kode → harus menjalankan program → dynamic testing.

---

**Q5 · UAS 2021** - Tujuan dari regression testing adalah...

| Opsi | Status |
|------|--------|
| Menguji kemungkinan defects pada sistem | ✗ |
| Menguji kemungkinan eror pada sistem | ✗ |
| Menguji bagian sistem yang mengalami perubahan | ✗ ini re-testing |
| **Menguji bagian sistem yang tidak mengalami perubahan** | ✓ |

> **Jawaban: D.** Regression testing = memastikan bagian yang TIDAK diubah tidak terdampak oleh perubahan di bagian lain. Re-testing = menguji ulang bagian yang memang diubah.

---

## 9. Implementasi & Changeover

*Cakupan: UAS - Pendekatan changeover, migrasi data, pelatihan, konfigurasi*

### 9.a Ringkasan Cepat

**Pendekatan Changeover:**

| Pendekatan | Deskripsi | Risiko |
|------------|-----------|--------|
| Big Bang | Langsung ganti total tanpa proses transisi | Sangat tinggi |
| Parallel Running | Dua sistem berjalan bersamaan | Rendah (mahal) |
| Phased Implementation | Fitur dideploy bertahap/inkremental | Sedang |
| Pilot Implementation | Ditest ke satu area/unit dulu | Sedang |

**Migration Management:**
- **Configuration management** - memastikan versi modul yang **benar** yang dimigrasi
- **Release management** - memastikan hanya implementasi yang **kompatibel** dikemas bersama
- **Timing management** - kapan migrasi dilakukan
- **Validation management** - memvalidasi hasil konversi data

**Data Mapping Issues:** Field Type, Field Length, Field Structures, Required Fields, Semantics, Validation

**Tahapan Pelatihan:** Identify competencies → Define training strategy → Deliver training

> [!warn] Common Mistake
> "Berapa lama waktu implementasi" adalah pertimbangan **perencanaan implementasi**, bukan pertimbangan **pelatihan**.

### 9.b Soal & Jawaban

---

**Q1 · UAS 2021** - Mengganti total keseluruhan sistem tanpa proses transisi disebut...

| Opsi | Status |
|------|--------|
| **Big Bang** | ✓ |
| Parallel Running | ✗ dua sistem berjalan bersamaan |
| Phased Implementation | ✗ fitur dideploy bertahap |
| Pilot Implementation | ✗ ditest ke satu area dulu |

> **Jawaban: Big Bang.** Big Bang = direct changeover, sistem lama langsung dimatikan dan sistem baru langsung diaktifkan. Keuntungan: murah, bersih. Risiko: sangat tinggi jika gagal tidak ada fallback.

---

**Q2 · UAS 2021** - Hal-hal yang perlu dipertimbangkan saat perencanaan implementasi...

| Opsi | Status |
|------|--------|
| Berapa lama proses implementasi berlangsung | ✓ |
| Dokumentasi apa yang diperlukan | ✓ |
| Bagaimana memastikan migrasi berhasil | ✓ |
| Pelatihan apa yang perlu dilakukan | ✓ |

> **Semua benar (A, B, C, D).** Perencanaan implementasi mencakup semua aspek: timing, dokumentasi, verifikasi keberhasilan, dan pelatihan pengguna. Tidak ada yang bisa diabaikan.

---

**Q3 · UAS 2021** - Memastikan hanya versi modul software yang benar yang dimigrasi dilakukan dengan...

| Opsi | Status |
|------|--------|
| Timing management | ✗ |
| Release management | ✗ memastikan hanya implementasi yang kompatibel dikemas bersama |
| Validation management | ✗ memvalidasi hasil konversi data |
| **Configuration management** | ✓ |

> **Jawaban: Configuration management.** Configuration management = memastikan hanya versi modul yang benar dan relevan yang dipilih untuk migrasi ke lingkungan production.

---

**Q4 · UAS 2021** - Hal yang perlu dipertimbangkan saat pelatihan sistem baru, KECUALI...

| Opsi | Status |
|------|--------|
| **Berapa lama waktu implementasi yang dibutuhkan** | ✓ ini bukan pertimbangan PELATIHAN |
| Pemilihan metode pelatihan | pertimbangan pelatihan |
| Menentukan strategi pelatihan | pertimbangan pelatihan |
| Identifikasi kompetensi yang dibutuhkan | pertimbangan pelatihan |

> **Jawaban: A.** "Berapa lama waktu implementasi" adalah pertimbangan perencanaan implementasi, bukan pertimbangan pelatihan. Pertimbangan pelatihan: identify competencies, define training strategy, choose delivery method.

---

**Q5 · UAS 2021** - Isu yang mungkin terjadi pada proses data mapping sistem lama ke baru...

| Opsi | Status |
|------|--------|
| Required Fields - perbedaan atribut mandatory | ✓ |
| Field Type - perbedaan tipe data | ✓ |
| Semantics - perbedaan makna nilai | ✓ |
| Field Structures - deskripsi di soal salah | ✗ "panjang maksimal" = Field Length, bukan Field Structures |

> **Benar: A, B, C. D salah deskripsinya.** "Perbedaan panjang maksimal value" = **Field Length**, bukan Field Structures. Field Structures = perbedaan struktur kolom (misal address jadi 1 field vs 3 field).

---

## 10. Enterprise Information Systems

*Cakupan: UAS - TPS, MIS, DSS, ESS, ERP, SCM, CRM*

### 10.a Ringkasan Cepat

**Hierarki dan alur data:**

$$\text{TPS} \to \text{MIS} \to \text{DSS} \leftrightarrow \text{ESS}$$

> [!warn] Common Mistake
> TPS **tidak** mendapat input dari MIS, DSS, atau ESS. Alur data hanya satu arah ke atas dari TPS.

**Karakteristik tiap sistem:**

| Sistem | Input | Processing | Target Pengguna |
|--------|-------|-----------|----------------|
| TPS | Transaksi harian | Sorting, listing, merging, updating | Operational staff |
| MIS | Summary dari TPS | Reports, summaries | Middle management |
| DSS | Summary + analytical data | Interactive, simulation, **AI/analytics** | Professional/staff |
| ESS | Aggregate dari semua sumber (internal + eksternal) | Graphics, queries, drill-down | Senior executives |

**ERP:** sistem enterprise terintegrasi dengan **shared/integrated database** (bukan tanpa basis data terintegrasi).

**ERP Implementation Approaches:** Vanilla (as-is), Customisation, Best Practices, BPR (Business Process Reengineering)

> [!insight] Key Insight
> Faktor sukses ERP: top management support, pelatihan pengguna, bantuan pakar luar. **Popularitas ERP tidak menjamin kecocokan** - bukan kriteria keberhasilan.

### 10.b Soal & Jawaban

---

**Q1 · UAS 2021** - Hubungan antar sistem informasi yang benar adalah...

| Opsi | Status |
|------|--------|
| **TPS memberi masukan bagi MIS** | ✓ |
| TPS mendapatkan data dari DSS | ✗ |
| ESS memberi masukan bagi MIS | ✗ |
| MIS mendapat masukan dari DSS | ✗ |

> **Jawaban: A.** Alur data: TPS (transaksi harian) → MIS → DSS ↔ ESS. TPS adalah sumber data mentah untuk MIS. TPS tidak mendapat input dari sistem lain.

---

**Q2 · UAS 2021** - Karakteristik sistem informasi beragam yang ada di perusahaan - yang benar...

| Opsi | Status |
|------|--------|
| **DSS banyak menggunakan model analitik menggunakan AI** | ✓ |
| ESS menggunakan masukan ringkasan transaksi | ✗ ESS menggunakan aggregate data dari berbagai sumber |
| MIS mendapat masukan spesifikasi desain | ✗ MIS mendapat summary transaction data dari TPS |
| TPS terkait dengan simulasi keadaan | ✗ TPS = sorting, listing, merging, updating transaksi |

> **Jawaban: A.** DSS processing = interactive, simulations, analysis - bisa menggunakan AI/analytical models. ESS = aggregate data (internal & external), graphics, simulations. MIS = summary dari TPS. TPS = basic transaction processing.

---

**Q3 · UAS 2021** - Pernyataan kurang tepat mengenai SI di level enterprise...

| Opsi | Status |
|------|--------|
| Dapat menggunakan aplikasi terintegrasi lengkap seperti ERP | benar |
| Dapat menggabungkan berbagai sistem informasi parsial | benar |
| **Tidak memiliki basis data terintegrasi** | ✓ SALAH, enterprise IS justru punya shared database |
| Biasanya dibuat dari satu aplikasi yang dikustomisasi | bisa benar |

> **Yang tidak tepat: C.** SI enterprise (seperti ERP) justru dicirikan oleh shared/integrated database yang menghubungkan seluruh modul. Basis data terintegrasi adalah fitur utama enterprise IS.

---

**Q4 · UAS 2021** - Pernyataan yang tepat dalam implementasi ERP...

| Opsi | Status |
|------|--------|
| Vanilla, menggunakan aplikasi seperti apa adanya | ✓ |
| Customisation, melakukan penyesuaian | ✓ |
| Business Process Reengineering, melihat proses bisnis yang ada dan memperbaikinya | ✓ |
| **Benar semua** | ✓ |

> **Jawaban: Benar semua.** ERP implementation approaches: Vanilla = pakai ERP as-is tanpa modifikasi. Customisation = sesuaikan ERP dengan proses bisnis perusahaan. BPR = sesuaikan proses bisnis dengan ERP.

---

**Q5 · UAS 2021** - Yang paling tidak berpengaruh dalam kesuksesan SI enterprise adalah...

| Opsi | Status |
|------|--------|
| Pelatihan pengguna yang intensif | berpengaruh |
| Dukungan eksekutif puncak | berpengaruh |
| **Penggunaan software ERP yang paling banyak dipakai** | ✓ TIDAK berpengaruh signifikan |
| Bantuan pakar luar organisasi | berpengaruh |

> **Jawaban: C.** Popularitas ERP tidak menjamin kecocokan dengan kebutuhan perusahaan. Yang berpengaruh: leadership commitment, user adoption (pelatihan), change management, dan expertise.

---

## 11. Etika, Legal & Isu Sosial SI

*Cakupan: UAS - Five moral dimensions, IP rights, dampak SI, privacy*

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
| Copyright | Karya cipta (ide tidak dilindungi) | Buku, musik, kode |
| Patent | Monopoli penemuan | Teknologi, proses |
| Trade Secret | Rahasia proses/formula bisnis | Resep rahasia, strategi |
| Trademark | Simbol/merek | Logo, nama brand |

> [!note] Definisi
> **Privacy** = hak untuk tidak dipantau. **Trade Secret** = produk intelektual yang digunakan untuk kebutuhan bisnis dan harus dijaga kerahasiaannya. Larangan kerja di perusahaan sejenis (non-compete clause) adalah mekanisme untuk melindungi trade secret.

**Dampak negatif SI:** kemudahan akses informasi pribadi orang lain (pelanggaran privasi), PHK massal akibat otomasi, dll.

**Kejahatan baru karena TI:** manipulasi data rekening bank, penyebaran virus komputer, manipulasi laporan keuangan digital.

### 11.b Soal & Jawaban

---

**Q1 · UAS 2021** - Pindah perusahaan tidak boleh bekerja di perusahaan sejenis - untuk menghindari masalah...

| Opsi | Status |
|------|--------|
| Trademarks | ✗ tanda/simbol merek |
| Privacy | ✗ hak untuk tidak dipantau |
| **Trade secrets** | ✓ |
| Copyrights | ✗ perlindungan karya cipta |

> **Jawaban: Trade secrets.** Karyawan yang pindah bisa membawa rahasia bisnis (formula, proses, strategi) ke kompetitor. Larangan kerja di tempat kompetitor = non-compete clause untuk melindungi trade secret.

---

**Q2 · UAS 2021** - Kejahatan baru yang bisa terjadi karena teknologi informasi, KECUALI...

| Opsi | Status |
|------|--------|
| **Pembajakan lagu** | ✓ sudah ada SEBELUM era TI modern |
| Manipulasi informasi pada proses pelaporan keuangan | ✗ butuh TI |
| Penipuan dengan memanipulasi data pada rekening bank | ✗ butuh TI |
| Penyebaran beragam virus komputer | ✗ produk langsung TI |

> **Jawaban: A (Pembajakan lagu).** Pembajakan lagu sudah ada sebelum TI (kaset bajakan, dll). TI memudahkan tapi bukan penyebab "baru". Virus komputer dan manipulasi data rekening = membutuhkan TI secara langsung.

---

**Q3 · UAS 2021** - Dampak positif sistem informasi, KECUALI...

| Opsi | Status |
|------|--------|
| Kemudahan bertukar informasi | positif |
| **Kemudahan mendapatkan informasi pribadi** | ✓ bisa NEGATIF (pelanggaran privasi) |
| Kemudahan bertransaksi dan berbisnis | positif |
| Memperbaiki layanan perusahaan bagi konsumen | positif |

> **Yang bukan dampak positif: Kemudahan mendapatkan informasi pribadi.** Kemudahan akses informasi pribadi orang lain (NIK, KTP, riwayat kesehatan) merupakan ancaman terhadap privasi dan bisa disalahgunakan. Ini adalah dampak negatif SI.

---

**Q4 · UAS 2021** - Masalah etika dalam implementasi sistem informasi misalnya...

| Opsi | Status |
|------|--------|
| Pemilihan cara deployment sistem | lebih ke keputusan teknis |
| Pemilihan perangkat lunak | lebih ke keputusan teknis |
| Pemilihan cara pelatihan | lebih ke manajemen |
| **Pengurangan karyawan akibat desain sistem yang baru** | ✓ |

> **Jawaban: D.** PHK massal karena otomasi/redesain sistem adalah masalah etika nyata yang menyangkut Quality of Life dan accountability. Pemilihan teknis adalah keputusan profesional, bukan masalah etika utama kecuali ada dimensi moral yang jelas.

---

**Q5 · UAS 2021** - Dimensi moral pada pengembangan SI TIDAK melibatkan pada saat...

| Opsi | Status |
|------|--------|
| Dampak sistem pada kehidupan pribadi | melibatkan (Quality of Life) |
| Penentuan penanggung jawab atas dampak buruk | melibatkan (Accountability) |
| **Pemanfaatan perangkat lunak tanpa melihat lisensi** | ✓ justru melanggar dimensi moral (Property rights) |
| Penentuan kepemilikan atas sistem informasi | melibatkan (Property rights) |

> **Jawaban: C (sedikit tricky).** Soal menanyakan kapan dimensi moral TIDAK dilibatkan. Menggunakan software tanpa lisensi justru MELANGGAR dimensi moral (Property rights) - artinya dimensi moral tidak dipertimbangkan saat itu. Opsi lain adalah contoh ketika dimensi moral DIPERTIMBANGKAN.

---

**Q6 · UAS 2021** - Kebocoran data bertolak belakang dengan tujuan SI yaitu...

| Opsi | Status |
|------|--------|
| **Confidentiality** | ✓ |
| Reliability | ✗ |
| Compliance | ✗ |
| Availability | ✗ |

> **Jawaban: Confidentiality.** Kebocoran data = data yang seharusnya rahasia menjadi dapat diakses pihak tidak berwenang. Ini langsung bertentangan dengan Confidentiality (kerahasiaan data).

---

## 12. Exam Tips & Quick Reference

> [!insight] Yang Paling Sering Jadi Jebakan
> - Komponen SI = BIOT - "Aplikasi" bukan komponen tersendiri
> - Level manajemen dan peran SI-nya sering ditukar di soal - Operational → proses; Tactical → keputusan; Strategic → kompetitif
> - Intermediate event BPMN **mempengaruhi** proses (opsi "tidak mempengaruhi" = salah)
> - RE = Elicitation, Analysis, Documentation, Validation - **Design BUKAN bagian RE**
> - HOW dihindari di RE; RE fokus pada WHAT & WHY
> - Static testing → errors; Dynamic testing → defects; Black-box = dynamic
> - Regression testing = bagian yang **TIDAK** berubah (bukan bagian yang diubah)
> - Big Bang = ganti total tanpa transisi; Configuration management ≠ Release management
> - Trade secret = alasan non-compete clause saat pindah perusahaan
> - Enterprise IS **punya** shared database - bukan tidak punya

**Akronim & Singkatan Penting:**

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
| RM | Requirements Management |
| CBD | Component-Based Development |
| SOA | Service-Oriented Architecture |
| COTS | Commercial Off-The-Shelf |
| BPR | Business Process Reengineering |
| HAKI | Hak Kekayaan Intelektual |

---

## References

- Cadle, J. et al. - *Developing Information Systems* (BCS)
- Laudon & Laudon - *Management Information Systems*
- Soal UTS & UAS IF3141 2021
- Slide Kuliah IF3141

**Class**: IF3141 Sistem Informasi  
**Date**: 2025  
**Topics**: Konsep SI, Strategi & Kompetisi, BPMN, SDLC, Requirement Engineering, Desain SI, Arsitektur & Modeling, Testing & Quality, Implementasi, Enterprise IS, Etika & Legal

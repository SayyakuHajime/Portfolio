---
title: IF3211 Komputasi Domain-Spesifik — Catatan UAS (Benar/Salah)
course: IF3211
subject: Komputasi Domain-Spesifik (Biologi)
exam: UAS — Benar/Salah, 60 soal, 50 detik/soal
topics: [Respirasi Seluler, Siklus Sel, Evolusi, Filogeni, Komunitas Ekologi, Ekosistem]
references: Campbell Biology in Focus 3rd Ed. (Ch. 7, 9, 19, 20, 41, 42)
order: 1
date: "2026-06-13"
---

## Format Cepat-Baca

Setiap fakta adalah **pernyataan BENAR** dari slide. Jika soal ujian bertentangan dengan fakta ini → SALAH.

---

## Bab 7 — Respirasi Seluler & Fermentasi

### Persamaan Inti
- Keseluruhan: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energi (ATP + panas)
- Respirasi aerob memerlukan **oksigen**; fermentasi TIDAK menggunakan oksigen

### 3 Tahap (secara berurutan)
| Tahap | Lokasi | Produk Utama |
|-------|--------|--------------|
| Glikolisis | Sitosol | 2 ATP (neto) + 2 NADH + 2 piruvat |
| Oksidasi Piruvat | Matriks mitokondria | 2 NADH + **2 CO₂** + 2 Asetil-CoA |
| Siklus Asam Sitrat (Krebs) | Matriks mitokondria | 2 ATP + 6 NADH + 2 FADH₂ + **4 CO₂** |
| Fosforilasi oksidatif (RTE + kemiosmosis) | Membran dalam mitokondria | ~26–28 ATP + H₂O |
| **Total** | | **~30 atau 32 ATP + 6 CO₂** |

### Fakta Kunci — Respirasi
- Glikolisis = **2 ATP** neto (fosforilasi tingkat substrat); berlangsung di **sitosol**
- Sintesis DNA TIDAK terjadi dalam glikolisis; glukosa → 2 piruvat
- Oksidasi = pelepasan elektron; Reduksi = penerimaan elektron (OIL RIG)
- Akseptor elektron terakhir dalam respirasi aerob = **O₂**
- Hasil ATP yang pasti tidak dapat ditentukan karena fosforilasi tidak terikat langsung pada reaksi redoks
- Hasil ATP juga bervariasi tergantung apakah elektron dibawa oleh NAD⁺ atau FAD
- Efisiensi keseluruhan respirasi seluler ≈ **34%** (sisanya hilang sebagai panas)
- Glikolisis kemungkinan berevolusi lebih awal; berlangsung di sitosol (sebelum mitokondria ada)

### Fermentasi
- Fermentasi = glikolisis + reaksi yang **meregenerasi NAD⁺** (agar glikolisis dapat berlanjut)
- NAD⁺ diregenerasi melalui transfer elektron dari NADH ke piruvat atau turunannya
- Fermentasi **TIDAK** menggunakan rantai transpor elektron (RTE)
- Respirasi anaerob **MENGGUNAKAN** RTE (tetapi dengan akseptor elektron akhir yang berbeda, mis. SO₄²⁻)
- **Fermentasi alkohol**: piruvat → asetaldehid (melepas CO₂) → etanol; meregenerasi NAD⁺; digunakan dalam pembuatan bir, anggur, roti (khamir/ragi)
- **Fermentasi asam laktat**: piruvat → laktat secara langsung; **TIDAK** melepas CO₂; digunakan untuk keju, yogurt
- Serat otot putih manusia dapat menghasilkan laktat bahkan dalam kondisi aerob (cepat tetapi tidak efisien)
- Fermentasi asam laktat oleh jamur/bakteri digunakan untuk membuat keju dan yogurt

### Hands-On M7 — Komputasi Respirasi Seluler

<details>
<summary>Buka penjelasan komputasional</summary>

**Neraca ATP — Metode Perhitungan Modern (P/O ratio):**
- NADH → 2.5 ATP; FADH₂ → 1.5 ATP
- Dari 1 glukosa: 10 NADH × 2.5 = 25; 2 FADH₂ × 1.5 = 3; 4 ATP substrat level → **total ≈ 32 ATP**
- Hasilnya *perkiraan*, bukan tepat — fosforilasi tidak terikat satu-satu dengan reaksi redoks

**β-Oksidasi Asam Lemak vs Glukosa:**
- Asam lemak lebih padat energi per gram karena rantai C–H lebih tereduksi
- Setiap siklus β-oksidasi: 1 FADH₂ + 1 NADH + 1 asetil-CoA
- Untuk asam lemak $n$ karbon: $\frac{n}{2}-1$ siklus β-oksidasi + $\frac{n}{2}$ asetil-CoA masuk siklus Krebs
- ATP per karbon asam lemak **lebih tinggi** dari glukosa

**Tipe-tipe Inhibitor Respirasi:**

| Inhibitor | Target | Mekanisme |
|-----------|--------|-----------|
| Sianida (CN⁻), CO | Kompleks IV | Blokir transfer elektron ke O₂ |
| Rotenon | Kompleks I | Blokir NADH → koenzim Q |
| Oligomisin | ATP sintase (F₀) | Blokir saluran proton rotor |
| DNP, CCCP | Membran mitokondria | *Uncoupler* — bocorkan H⁺, energi jadi panas |

Uncoupler berbeda dari inhibitor: RTE tetap berjalan dan O₂ tetap dikonsumsi, tetapi ATP tidak terbentuk karena gradien proton tidak dapat dipertahankan.

**Fermentasi — Mengapa Penting Meski Tidak Efisien:**
Semua jenis fermentasi hanya menghasilkan 2 ATP neto (dari glikolisis saja). Namun fungsinya adalah **meregenerasi NAD⁺** agar glikolisis dapat terus berlanjut saat O₂ tidak tersedia. Tanpa regenerasi NAD⁺, glikolisis berhenti total dan sel tidak dapat menghasilkan ATP sama sekali.

**Kode — Neraca ATP per glukosa:**
```python
ATP_PER_NADH, ATP_PER_FADH2 = 2.5, 1.5          # modern P/O ratio

total_nadh  = 2 + 2 + 6   # glikolisis + oks-piruvat + krebs (×2 putaran)
total_fadh2 = 2            # krebs saja
atp_substrate = 4          # glikolisis (2) + krebs substrate-level (2)
total_atp = atp_substrate + total_nadh * ATP_PER_NADH + total_fadh2 * ATP_PER_FADH2
# = 4 + 25.0 + 3.0 = 32.0 ATP per glukosa
```

**Kode — β-Oksidasi Asam Lemak:**
```python
def hitung_atp_fatty_acid(chain_len, n_betaox, n_acetylCoA):
    atp_bo    = n_betaox * (ATP_PER_NADH + ATP_PER_FADH2)        # per siklus
    atp_krebs = n_acetylCoA * (1 + 3*ATP_PER_NADH + ATP_PER_FADH2)  # 10 per asetil-CoA
    return atp_bo + atp_krebs - 2    # −2 biaya aktivasi (ATP ekuivalen)
# Contoh C16: n_betaox=7, n_acetylCoA=8 → 106.0 ATP total (6.625 ATP/karbon vs 5.33 glukosa)
```

**Kode — Simulasi Inhibitor:**
```python
inhibitors = {
    'Oligomisin':      {'target': 'ATP Synthase',         'blocks': 'FosOks'},
    'Rotenon':         {'target': 'Kompleks I (NADH-DH)', 'blocks': 'FosOks'},
    'DNP (uncoupler)': {'target': 'Membran gradien H⁺',  'blocks': 'FosOks'},
}
blocked_atp = atp_ox_total * (red_pct / 100)
atp_with_inhibitor = total_atp - blocked_atp
```

![Alur respirasi seluler: Glikolisis → Krebs → FosOks](/img/notes/if3211/respirasi_alur.png)
![Distribusi produksi ATP per komponen (P/O modern)](/img/notes/if3211/neraca_atp.png)
![ATP per karbon: asam lemak vs glukosa](/img/notes/if3211/atp_per_karbon_fa_vs_glukosa.png)
![Dampak inhibitor terhadap total ATP](/img/notes/if3211/simulasi_inhibitor_atp.png)
![Perbandingan total ATP: aerobik vs fermentasi](/img/notes/if3211/komparasi_aerob_vs_fermentasi.png)

</details>

---

## Bab 9 — Siklus Sel

### Fase Siklus Sel
- Siklus sel = kehidupan sel sejak terbentuk hingga pembelahannya sendiri
- Dua fase utama: **Interfase** (~90%) dan **Fase Mitotik (Fase M)**
- Interfase = G₁ ("celah pertama") → **S** ("sintesis") → G₂ ("celah kedua")
- Kromosom diduplikasi **hanya pada fase S**
- G₁ = sel tumbuh; G₂ = sel mempersiapkan pembelahan; S = replikasi DNA

### Fase Mitosis (secara berurutan)
1. **Profase** — kromosom memadat; gelendong mulai terbentuk
2. **Prometafase** — selubung nukleus hancur; mikrotubulus kinetokor melekat
3. **Metafase** — sentromer berbaris di lempeng metafase (titik tengah antara dua kutub)
4. **Anafase** — kromatid saudara terpisah; bergerak ke kutub berlawanan
5. **Telofase** — selubung nukleus terbentuk kembali; kromosom mengendur

### Gelendong Mitotik
- Gelendong mitotik = mikrotubulus + protein terkait; mengendalikan pergerakan kromosom
- Pada sel hewan, mikrotubulus gelendong dirakit dari **sentrosom** (pusat pengorganisasian mikrotubulus)
- Sentrosom diduplikasi saat **interfase**; dua sentrosom bermigrasi ke kutub berlawanan saat profase/prometafase
- Aster = susunan radial mikrotubulus pendek yang memanjang dari setiap sentrosom
- **Kinetokor** = kompleks protein di sentromer; melekat pada mikrotubulus kinetokor saat prometafase
- Lempeng metafase = struktur imajiner di titik tengah antara dua kutub gelendong
- Pada anafase: kromatid saudara terpisah; mikrotubulus memendek dengan depolimerisasi di ujung kinetokor
- Mikrotubulus nonkinetokor dari kutub berlawanan saling tumpang tindih dan mendorong satu sama lain, memanjangkan sel

### Sitokinesis
- **Sel hewan**: sitokinesis melalui **pembelahan (cleavage)** → membentuk lekukan pembelahan (cincin kontraktil mikrofilamen)
- **Sel tumbuhan**: **lempeng sel** terbentuk saat sitokinesis (BUKAN lekukan pembelahan)
- Sitokinesis dimulai saat anafase atau telofase

### Prokariota vs Eukariota
- Prokariota bereproduksi melalui **pembelahan biner** (bukan mitosis)
- Pembelahan biner: kromosom bereplikasi dari **titik asal replikasi**; membran plasma mencubit ke dalam
- Mitosis kemungkinan berevolusi dari pembelahan biner
- Sel somatik manusia (sel tubuh, bukan reproduktif) = **46 kromosom** (2 set masing-masing 23)
- Gamet manusia (sperma, sel telur) = **23 kromosom** (setengah dari sel somatik)
- Kromosom eukariotik = **kromatin** (DNA + protein)

### Kontrol Siklus Sel & Kanker
- Siklus sel dikendalikan oleh **pos pemeriksaan (checkpoint)**: pos G₁, G₂, dan M
- **Pos G₁** = paling penting; disebut titik restriksi pada sel mamalia
- Jika tidak ada sinyal lanjut di G₁ → sel keluar ke **G₀** (keadaan tidak membelah)
- Jika ada sinyal lanjut di G₁ → sel biasanya menyelesaikan S, G₂, M, dan membelah
- Sel kanker TIDAK merespons sinyal yang biasanya mengatur siklus sel
- Sel kanker TIDAK memerlukan faktor pertumbuhan untuk tumbuh dan membelah
- Sel yang membelah tanpa batas dalam kultur telah mengalami **transformasi**
- **Tumor jinak**: tetap di tempat asal
- **Tumor ganas**: menyerang jaringan sekitar; mengalami **metastasis** (menyebar ke bagian tubuh lain)
- Tumor terlokalisasi: diobati dengan radiasi; tumor metastatik: diobati dengan **kemoterapi**
- Efek samping kemoterapi karena obat juga memengaruhi sel normal yang sering membelah

### Hands-On M8 — Komputasi Siklus Sel

<details>
<summary>Buka penjelasan komputasional</summary>

**Model Komputasional 1 — Proporsi Sel per Fase:**

Dalam populasi sel yang tumbuh steady-state, proporsi sel yang teramati pada suatu fase **sebanding dengan durasi** fase tersebut:
$$P_{\text{fase}} = \frac{t_{\text{fase}}}{T_{\text{total}}}$$

Intuisi: seperti mengamati kendaraan di jalan — kendaraan lebih lambat akan lebih sering terlihat di titik observasi mana pun. Karena itu dalam preparat histologis, lebih banyak sel di G₁ (terlama) daripada di M (terpendek).

**Model Komputasional 2 — Pertumbuhan Populasi Diskrit:**
$$N_{t+1} = N_t \times g \quad \text{(setiap satu siklus penuh selesai)}$$

$g$ = growth factor (jumlah sel anak per sel induk). Ketika siklus memanjang (mis. karena checkpoint delay), interval antar pembelahan bertambah → laju pertumbuhan efektif menurun.

**Analisis Checkpoint:**

| Checkpoint | Lokasi | Yang Diperiksa | Akibat jika Gagal |
|------------|--------|---------------|-------------------|
| G₁ (Titik Restriksi) | Akhir G₁ | Ukuran sel, faktor pertumbuhan, kerusakan DNA | Sel masuk S dengan sinyal tidak cukup → replikasi DNA tidak terkendali |
| G₂ | Akhir G₂ | Kelengkapan replikasi DNA, kerusakan DNA | Sel masuk mitosis dengan DNA rusak/tidak lengkap → instabilitas kromosom |
| M (Spindle Assembly) | Metafase | Semua kromosom terikat gelendong | Anafase prematur → aneuploidi (jumlah kromosom salah) |

**Implikasi Kanker:** Sel kanker tidak merespons checkpoint → proliferasi tanpa batas. Kemoterapi menyerang sel yang membelah cepat (termasuk sel normal yang sering membelah = efek samping).

**Kode — Proporsi Fase & Pertumbuhan Populasi:**
```python
def proporsi_fase(durations):
    total = sum(durations.values())
    return {fase: dur / total for fase, dur in durations.items()}
# Misal {G1:11, S:8, G2:4, M:2} → G1=44%, S=32%, G2=16%, M=8%

def simulasi_populasi(initial_cells, cycle_hours, growth_factor, observation_hours):
    waktu, sel = [0], [initial_cells]
    t, n = 0, initial_cells
    while t + cycle_hours <= observation_hours:
        t += cycle_hours
        n *= growth_factor
        waktu.append(t)
        sel.append(n)
    return waktu, sel
# g=1.9 per siklus, cycle=25h, obs=72h → 2 siklus selesai

def checkpoint_delay(durations, checkpoint_type):
    perturbed = durations.copy()
    delays = {'g1_delay': ('G1', 2), 's_delay': ('S', 2),
              'g2_delay': ('G2', 2), 'm_delay': ('M', 1)}
    if checkpoint_type in delays:
        fase, dt = delays[checkpoint_type]
        perturbed[fase] += dt
    return perturbed
# Delay memperpanjang siklus → laju pertumbuhan populasi menurun
```

</details>

---

## Bab 19 — Evolusi: Penurunan dengan Modifikasi

### Darwin & Sejarah
- Darwin menerbitkan *On the Origin of Species* pada **1859**
- Pelayaran Darwin: HMS Beagle, **Desember 1831 – Oktober 1836**
- Alfred Russel Wallace secara independen mengembangkan teori serupa; dipresentasikan bersama **Juli 1858**
- Variasi paruh burung finch di Kepulauan Galápagos = bukti yang diamati Darwin
- Evolusi = "**penurunan dengan modifikasi**" (*descent with modification*)
- "Penurunan" = leluhur bersama; "Modifikasi" = akumulasi perbedaan antarGenerasi
- **Georges Cuvier** mengembangkan paleontologi; fosil ditemukan di lapisan batuan sedimen (lebih muda = atas)
- **Lamarck** mengusulkan penggunaan/tidak-penggunaan + pewarisan sifat yang diperoleh — **TIDAK didukung**

### Seleksi Alam
- Seleksi alam: individu dengan sifat **herediter** yang menguntungkan bertahan hidup dan bereproduksi lebih banyak
- **Populasi** (BUKAN individu) yang berevolusi
- Seleksi alam hanya bekerja pada sifat **herediter** yang berbeda antar individu
- Seleksi alam **TIDAK menciptakan** sifat baru — memilih dari variasi herediter yang sudah ada
- Sifat yang adaptif bervariasi menurut tempat dan waktu
- Evolusi terjadi lebih cepat pada spesies dengan waktu generasi singkat
- **Seleksi buatan**: pemuliaan selektif untuk sifat yang diinginkan (mis. sawi liar → brokoli, kol, kale)

### 4 Jenis Bukti Evolusi
1. **Pengamatan langsung** (mis. resistensi antibiotik MRSA)
2. **Homologi** (kemiripan dari leluhur bersama)
3. **Catatan fosil**
4. **Biogeografi**

### Kasus Kunci
- MRSA: *S. aureus* menjadi resisten terhadap penisilin dalam **2 tahun** penggunaan luas (pada 1945); lalu resistensi metisillin juga berevolusi dalam 2 tahun
- Transisi fosil (evolusi paus): Pakicetus → Rodhocetus → Dorudon → Cetacea modern
- Homologi ≠ Analogi: **Homologi** = berasal dari leluhur bersama; **Analogi** = evolusi konvergen
- Evolusi konvergen (fitur analogis): sugar glider vs. tupai terbang — BUKAN bukti leluhur bersama
- **Biogeografi** = ilmu tentang distribusi geografis spesies

### Hands-On M11 — Komputasi Evolusi Populasi

<details>
<summary>Buka penjelasan komputasional</summary>

**Hardy–Weinberg sebagai Null Model:**

5 kondisi HWE: populasi besar, perkawinan acak, tidak ada mutasi, tidak ada migrasi, tidak ada seleksi.
$$f_{AA}=p^2, \quad f_{Aa}=2pq, \quad f_{aa}=q^2$$

Tanpa evolusi, $p$ invariant lintas generasi. Deviasi dari HWE = bukti salah satu kondisi dilanggar = evolusi sedang terjadi.

**Seleksi Deterministik — Persamaan Rekursif:**
$$\bar{w} = p^2 w_{11} + 2pq\, w_{12} + q^2 w_{22}, \qquad p' = \frac{p^2 w_{11} + pq\, w_{12}}{\bar{w}}$$

| Mode | Fitness AA / Aa / aa | Ekuilibrium $p^*$ | Stabil? | Interpretasi |
|------|---------------------|-------------------|---------|-------------|
| Directional | $1 / 1{-}hs / 1{-}s$ | 1 (fiksasi A) | Ya | Alel A selalu lebih baik |
| Heterozygote advantage | $1{-}s_1 / 1 / 1{-}s_2$ | $s_2/(s_1+s_2)$ | Ya | Polimorfisme stabil |
| Underdominance | $1 / 1{-}s / 1$ | 0.5 | Tidak | Sistem bistable, tergantung kondisi awal |

**Genetic Drift — Wright-Fisher:**
$$k \sim \text{Binomial}(2N,\, p') \quad \Rightarrow \quad p_{\text{baru}} = k/(2N)$$

Pola: $Ns \ll 1$ → drift mendominasi; $Ns \gg 1$ → seleksi mendominasi. Pada populasi kecil, alel menguntungkan pun bisa hilang secara kebetulan.

**Heterozygote Advantage — Mengapa Mempertahankan Polimorfisme:**
Saat frekuensi A terlalu tinggi, frekuensi AA naik dan rata-rata fitness turun (karena $w_{AA} < w_{Aa}$). Saat A terlalu rendah, frekuensi aa naik dan fitness juga turun. Sistem memiliki satu titik ekuilibrium stabil yang memaksimalkan $\bar{w}$.

Contoh sickle-cell: Ss (heterozigot) → resistansi malaria + tidak anemia berat. Di daerah endemik malaria, alel $s$ dipertahankan ~20% karena manfaat Ss melebihi kerugian ss.

**Kode — Seleksi Deterministik & Genetic Drift:**
```python
def next_p(p, w11, w12, w22):
    q    = 1 - p
    wbar = p**2*w11 + 2*p*q*w12 + q**2*w22
    return (p**2*w11 + p*q*w12) / wbar   # rekursif satu generasi

def wf_step(p, N, w11, w12, w22, rng):
    p_sel = next_p(p, w11, w12, w22)     # koreksi seleksi dulu
    k     = rng.binomial(2*N, p_sel)     # sampling stokastik (2N alel)
    return k / (2*N)

# R=50 ulangan, iterasi G generasi
trajs = np.empty((R, G+1))
for r in range(R):
    trajs[r, 0] = p0
    for t in range(G):
        trajs[r, t+1] = wf_step(trajs[r, t], N, w11, w12, w22, rng)

fixation_pr   = np.mean(trajs[:, -1] == 1.0)   # Pr(alel A terfiksasi)
extinction_pr = np.mean(trajs[:, -1] == 0.0)   # Pr(alel A punah)
```

</details>

---

## Bab 20 — Filogeni dan Pohon Kehidupan

### Klasifikasi
- **Filogeni** = sejarah evolusi suatu spesies atau kelompok
- **Sistematika** = mengklasifikasikan organisme DAN menentukan hubungan evolusioner
- **Taksonomi** = pembagian dan penamaan organisme secara teratur
- **Nomenklatur binomial**: diperkenalkan oleh Carolus Linnaeus (abad ke-18)
- Format: Genus (huruf kapital) + epitet spesifik (huruf kecil); seluruh nama **dicetak miring**
- Kedua bagian bersama-sama menamai spesies (BUKAN hanya epitet spesifik saja)

### Hierarki Taksonomi (PALING TIDAK inklusif → PALING inklusif)
**S**pesies → **G**enus → **F**amili → **O**rdo → **K**elas → **F**ilum → **K**ingdom → **D**omain

Mnemonik: "**S**aya **G**uru **F**avorit **O**rang **K**elas **F**ilum **K**ingdom **D**unia"

- Contoh: Macan tutul = *Panthera pardus*; Famili Felidae; Ordo Carnivora; Kelas Mammalia; Filum Chordata; Kingdom Animalia; Domain Eukarya
- **Takson** (jamak: **taksa**) = unit taksonomi yang diberi nama pada tingkatan mana pun
- 3 Domain: **Bacteria, Archaea, Eukarya**

### Pohon Filogenetik
- Pohon filogenetik = diagram percabangan yang merepresentasikan hipotesis evolusioner
- **Titik percabangan** = divergensi dua silsilah dari leluhur bersama
- **Taksa saudara** = kelompok yang berbagi leluhur bersama secara langsung
- Cabang DAPAT dirotasi tanpa mengubah hubungan yang digambarkan
- Pohon dapat digambar secara horizontal, vertikal, atau diagonal — hubungan tidak berubah
- Simpul/cabang internal tanpa label dapat merepresentasikan kelompok yang telah punah
- Hanya **homologi** (BUKAN analogi) yang dapat digunakan untuk menyimpulkan hubungan filogenetik
- Analogi = kemiripan dari evolusi konvergen → TIDAK menunjukkan leluhur bersama

### Hands-On M12 — Komputasi Filogeni

<details>
<summary>Buka penjelasan komputasional</summary>

**Membaca Pohon Filogenetik:**
- **Clade** = leluhur bersama + semua keturunannya
- **Sister taxa** = dua kelompok yang berbagi titik percabangan langsung
- **Outgroup** = takson di luar ingroup; digunakan untuk menentukan akar dan mengidentifikasi kondisi ancestral vs derived
- Rotasi cabang di titik simpul **tidak mengubah** hubungan yang digambarkan

**Karakter Ancestral vs Derived:**

| Tipe | Nama Teknis | Kegunaannya |
|------|-------------|-------------|
| Shared derived | Synapomorfi | Mendefinisikan clade — **informatif** untuk filogeni |
| Shared ancestral | Plesiomorfi | Dimiliki semua ingroup — **tidak informatif** untuk memisahkan subclade |
| Karakter ambigu | Homoplasi | Muncul lebih dari sekali secara independen (evolusi konvergen) |

**Jarak Hamming (dari data karakter biner):**
$$d_{ij} = \text{jumlah posisi yang berbeda antara takson } i \text{ dan } j$$

Takson dengan jarak terkecil = kandidat sister taxa. Matriks jarak simetris.

**Algoritma UPGMA:**
1. Gabungkan dua takson dengan jarak terkecil → cluster baru
2. Hitung jarak cluster baru ke semua takson lain (rata-rata)
3. Ulangi hingga satu pohon terbentuk

Keterbatasan UPGMA: mengasumsikan laju evolusi konstan (*molecular clock*) di semua silsilah. Jika laju berbeda, topologi bisa salah.

**Mengapa Homologi > Analogi untuk Filogeni:**
Homologi mencerminkan pewarisan dari leluhur bersama → mengikuti sejarah evolusioner nyata. Analogi (evolusi konvergen) menghasilkan kemiripan tanpa leluhur bersama → mengelompokkan takson tidak berkerabat secara keliru. Contoh: sayap kelelawar dan serangga (analogi) vs. forelimb tetrapoda (homologi).

**Outgroup wajib untuk rooting:** Tanpa outgroup, kita tidak dapat membedakan kondisi ancestral dari derived → arah evolusi karakter tidak dapat ditentukan.

**Kapan data morfologi masih berguna:** Untuk organisme fosil yang tidak memiliki DNA yang dapat disequencing, dan sebagai verifikasi independen terhadap hasil molekuler.

**Kode — Hamming Distance & UPGMA:**
```python
def hamming_from_character_table(df):
    taxa = list(df.index)
    dist = {a: {b: int((df.loc[a] != df.loc[b]).sum()) for b in taxa} for a in taxa}
    return dist
# Takson dengan jarak terkecil = kandidat sister taxa

def pairwise_seq_distance(seqs):
    taxa = list(seqs.keys())
    dist = {a: {b: sum(x != y for x, y in zip(seqs[a], seqs[b])) for b in taxa} for a in taxa}
    return dist

def upgma(distance_df):
    # Greedy: gabungkan dua kluster titerdekat, perbarui jarak (rata-rata)
    # Tinggi cabang = jarak_minimum / 2
    # Output: Newick string, misal "(Lancelet:0.50,(Lamprey:0.25,Bass:0.25):0.25);"
    clusters = {name: [name] for name in distance_df.index}
    while len(clusters) > 1:
        a, b = min(((i,j) for i in clusters for j in clusters if i<j),
                   key=lambda p: distance_df.loc[p[0], p[1]])
        new_h = distance_df.loc[a, b] / 2
        # update jarak ke kluster baru = rata-rata tertimbang
        clusters[a+'+'+b] = clusters.pop(a) + clusters.pop(b)
    # return Newick string
```

</details>

---

## Bab 41 — Komunitas Ekologi

### Interaksi Antarspesies
| Interaksi | Pengaruh | Contoh |
|-----------|----------|--------|
| Kompetisi | −/− | Dua spesies bersaing untuk makanan yang sama |
| Predasi | +/− | Singa memakan zebra |
| Herbivori | +/− | Ulat memakan daun |
| Parasitisme | +/− | Cacing pita dalam inang |
| Mutualisme | +/+ | Pohon akasia + semut |
| Komensalisme | +/0 | Kuntul sapi pada kerbau |

### Kompetisi
- Prinsip eksklusi kompetitif: dua spesies yang bersaing untuk **sumber daya pembatas yang sama** tidak dapat hidup berdampingan secara permanen
- Contoh klasik: *Paramecium aurelia* menyebabkan kepunahan *P. caudatum* saat dibiakkan bersama
- **Relung ekologi** = kumpulan spesifik sumber daya biotik dan abiotik yang digunakan organisme
- **Pemisahan sumber daya** = diferensiasi relung yang memungkinkan hidup berdampingan
- **Pergeseran karakter** = perbedaan karakter lebih besar ketika spesies bersifat **simpatrik** (wilayah sama) daripada **alopatrik** (wilayah berbeda)

### Pertahanan terhadap Predasi
- Pewarnaan kriptik = kamuflase (menyatu dengan latar belakang)
- **Pewarnaan aposematik** = warna peringatan mencolok (menandakan ketoksikan)
- **Mimikri Batesian** = spesies tidak berbahaya meniru penampilan spesies berbahaya

### Parasitisme
- **Endoparasit**: hidup di dalam inang
- **Ektoparasit**: hidup di luar inang

### Keanekaragaman Spesies & Struktur Komunitas
- **Keanekaragaman spesies** = kekayaan spesies + kelimpahan relatif
- **Kekayaan spesies** = jumlah spesies berbeda dalam komunitas
- **Kelimpahan relatif** = proporsi yang diwakili setiap spesies dari seluruh individu
- Indeks keanekaragaman Shannon: H = −(p_A ln p_A + p_B ln p_B + ...)
- **Struktur tropik**: hubungan makan; rantai makanan menghubungkan dari produsen hingga karnivora puncak
- **Jaring-jaring makanan** = rantai makanan yang saling terhubung dengan interaksi tropik kompleks
- **Spesies fondasi**: pengaruh kuat pada komunitas karena **ukuran besar atau kelimpahan tinggi**
- **Spesies kunci**: pengendalian komunitas yang kuat melalui **peran ekologi yang kritis** (TIDAK harus berlimpah)
- **Insinyur ekosistem**: menyebabkan perubahan fisik pada lingkungan (mis. berang-berang membangun bendungan)
- **Model bawah-atas (bottom-up)**: pasokan nutrien/tingkat tropik bawah membatasi kelimpahan di tingkat atas
- **Model atas-bawah (top-down)**: predasi mengendalikan organisasi komunitas (predator membatasi herbivora yang membatasi produsen)
- **Biomanipulasi** = penerapan model atas-bawah untuk meningkatkan kualitas air danau yang tercemar

### Gangguan & Suksesi
- **Gangguan** = peristiwa yang mengubah komunitas dengan menyingkirkan organisme atau mengubah ketersediaan sumber daya
- **Hipotesis gangguan menengah**: gangguan sedang mendorong keanekaragaman spesies yang **terbesar**
- Gangguan tinggi → menyingkirkan spesies tumbuh lambat; Gangguan rendah → dominan kompetitif menyingkirkan yang lain
- **Suksesi ekologi** = perubahan bertahap komposisi komunitas setelah gangguan besar
- **Suksesi primer**: dimulai di daerah yang hampir **tidak bernyawa** (pulau vulkanik, mundurnya gletser)
- **Suksesi sekunder**: dimulai di mana gangguan menyingkirkan sebagian besar tetapi TIDAK semua organisme (mis. setelah kebakaran)
- Aktivitas manusia = gangguan **terkuat** pada ekosistem; umumnya **mengurangi** keanekaragaman spesies

### Hands-On M13 — Komputasi Ekologi Komunitas

<details>
<summary>Buka penjelasan komputasional</summary>

**Model Lotka-Volterra dengan Daya Dukung (K):**
$$\frac{dx}{dt} = r_x x\!\left(1-\frac{x}{K}\right) - \alpha xy \quad \text{(prey)}, \qquad \frac{dy}{dt} = \beta xy - \gamma y \quad \text{(predator)}$$

Ekuilibrium stabil: $x^* = \gamma/\beta$, $y^* = r(1-x^*/K)/\alpha$.

Perbedaan dengan LV klasik (tanpa K): LV klasik menghasilkan osilasi *netral* (amplitudo bergantung kondisi awal). LV + K: osilasi *meredam* dan konvergen ke ekuilibrium (lebih realistis). Predator selalu memuncak dengan *time lag* setelah prey — karena butuh waktu untuk merespons kelimpahan mangsa via reproduksi.

**Indeks Diversitas Shannon:**
$$H' = -\sum_{i=1}^{S} p_i \ln p_i, \qquad J = \frac{H'}{\ln S} \quad \text{(evenness, 0–1)}$$

Richness tinggi tidak otomatis berarti H' tinggi — komunitas dengan satu spesies dominan memiliki J rendah meski richness besar. Komunitas lebih rentan jika J rendah (tergantung pada satu spesies dominan).

**Struktur Food Web — Connectance:**
$$C = \frac{E}{N^2} \quad (E = \text{jumlah link}, N = \text{jumlah spesies})$$

Keystone species ≠ dominant species: Keystone species memiliki *pengaruh yang tidak proporsional* terhadap strukturnya (out-degree tinggi atau peran ekologi kritis), tetapi biomasa/kelimpahannya bisa rendah. Hilang 1 keystone species → *trophic cascade* ke seluruh jaring makanan.

**Island Biogeography (Species-Area Curve):**
$$S = c \cdot A^z \quad \Rightarrow \quad \log S = \log c + z \log A$$

Nilai $z$ tipikal: 0.20–0.35. Fragmentasi habitat memotong konektivitas dan meningkatkan edge effect sehingga penurunan nyata bisa jauh melebihi prediksi teoritis.

**Hipotesis Gangguan Menengah (IDH):**
- Gangguan sangat rendah → exclusion kompetitif → hanya spesies terkuat bertahan → H' rendah
- Gangguan sangat tinggi → hanya spesies toleran gangguan bertahan → H' rendah
- Gangguan sedang → mencegah monopoli, membuka ceruk → H' **maksimal**

**Suksesi Ekologi & Shannon:** H' cenderung naik selama suksesi awal (pioneer membuka ceruk bagi spesies baru). Pada suksesi akhir, spesies klimaks kompetitif bisa mendominasi dan menekan H'.

**Kode — Lotka-Volterra, Shannon, Food Web:**
```python
def lotka_volterra(state, t, r, K, alpha, beta, gamma):
    x, y = state              # x=prey, y=predator
    dxdt = r*x*(1 - x/K) - alpha*x*y
    dydt = beta*x*y - gamma*y
    return [dxdt, dydt]
# Ekuilibrium: x*=γ/β, y*=r(1−x*/K)/α
# sol = odeint(lotka_volterra, [200, 20], t, args=(0.4, 1000, 0.04, 0.005, 0.3))

def shannon_diversity(counts):
    p = np.array(counts, dtype=float); p = p[p > 0] / p.sum()
    return -np.sum(p * np.log(p))

def species_evenness(H, S):
    return H / np.log(S) if S > 1 else 0.0   # J ∈ [0,1]

# Food web — connectance
G = nx.DiGraph(); G.add_edges_from(food_web_edges)
C = G.number_of_edges() / G.number_of_nodes()**2   # C = E/N²

# Species-Area Curve (log-log regresi)
slope, intercept, r2, p = linregress(np.log10(A), np.log10(S))
# log(S) = intercept + slope × log(A);  slope = z (tipikal 0.20–0.35)
```

</details>

---

## Bab 42 — Ekosistem dan Energi

### Dasar-dasar Ekosistem
- Ekosistem = semua organisme dalam suatu komunitas + **faktor abiotik** yang berinteraksi dengannya
- Dua sifat emergent utama: **aliran energi** + **daur kimia**
- Energi **MENGALIR** melalui ekosistem (tidak didaur ulang); bahan kimia **BERDAUR** dalam ekosistem
- Hukum termodinamika ke-1: energi tidak dapat diciptakan atau dimusnahkan — hanya dipindahkan/ditransformasi
- Hukum termodinamika ke-2: setiap pertukaran energi meningkatkan entropi; sebagian energi selalu hilang sebagai **panas**
- Hukum kekekalan massa: materi tidak dapat diciptakan/dimusnahkan; unsur kimia **DAPAT** didaur ulang

### Produksi Primer
- ~**1%** cahaya tampak yang mengenai organisme fotosintetik diubah menjadi energi kimia
- **PPK** / GPP (*Gross Primary Production* = Produksi Primer Kasar) = total produksi primer
- **PPB** / NPP (*Net Primary Production* = Produksi Primer Bersih) = PPK − respirasi autotrof = biomasa baru yang ditambahkan
- **PEB** / NEP (*Net Ecosystem Production* = Produksi Ekosistem Bersih) = laju akumulasi biomasa total
- PEB > 0 → **rosot karbon** (memperoleh lebih banyak karbon daripada yang dilepaskan)
- PEB < 0 → **sumber karbon** (melepaskan lebih banyak karbon daripada yang diperoleh)
- Perubahan iklim dapat menyebabkan ekosistem beralih dari rosot karbon menjadi sumber karbon

### Tingkatan Tropik & Transfer Energi
| Tingkatan | Jenis | Contoh |
|-----------|-------|--------|
| Produsen primer | Autotrof (membuat makanan sendiri) | Tumbuhan, fitoplankton |
| Konsumen primer | Herbivora | Zooplankton, serangga |
| Konsumen sekunder | Karnivora | Ikan kecil, tikus |
| Konsumen tersier | Karnivora | Elang, ikan besar |
| Detritivora / Pengurai | Memakan detritus | Prokariota, jamur |

- **Efisiensi tropik** ≈ **10%** produksi dipindahkan dari satu tingkat tropik ke tingkat berikutnya
- Contoh piramida: 1.000.000 J sinar matahari → 10.000 J produsen → 1.000 J konsumen primer → 100 J sekunder → 10 J tersier
- **Produksi sekunder** = energi kimia dalam makanan yang diubah menjadi biomasa baru
- **Efisiensi produksi** = produksi sekunder bersih / asimilasi produksi primer × 100%
- Asimilasi = total energi yang dikonsumsi dan digunakan untuk pertumbuhan, reproduksi, DAN respirasi

### Nutrien Pembatas
- **Nutrien pembatas** = unsur yang, jika ditambahkan, meningkatkan produksi
- **Laut**: nitrogen (N) dan fosfor (P) paling sering membatasi produksi; **besi (Fe)** juga membatasi di beberapa wilayah (mis. Laut Sargasso — penambahan N + P + Fe meningkatkan produksi 12×)
- **Daratan**: nitrogen membatasi pertumbuhan tanaman paling besar secara **global**; fosfor juga dapat membatasi (terutama tanah tua)
- Penambahan nutrien pembatas hanya meningkatkan produksi sampai nutrien lain menjadi pembatas
- Penetrasi cahaya di akuatik: setengah radiasi matahari diserap dalam **15 m pertama**; hanya 5–10% yang mencapai **75 m**
- **Eutrofikasi** = peningkatan dramatis produksi primer akibat kelebihan nutrien dalam ekosistem akuatik

### Daur Nutrien & Dekomposisi
- Daur nutrien = **siklus biogeokimia** (melibatkan komponen biotik dan abiotik)
- Siklus biogeokimia dapat bersifat global atau lokal
- Pertumbuhan pengurai dikendalikan oleh suhu, kelembapan, dan ketersediaan nutrien
- Laju dekomposisi **lebih cepat di ekosistem yang lebih hangat**
- Hutan Eksperimental Hubbard Brook: kehilangan nutrien jauh lebih besar di lahan **yang ditebang** dibanding hutan utuh
- Tumbuhan mengendalikan jumlah nutrien yang meninggalkan ekosistem hutan utuh
- **Bioremediasi** = penggunaan organisme (prokariota, jamur, tumbuhan) untuk mendetoksifikasi ekosistem tercemar
- **Augmentasi biologis** = penggunaan organisme untuk **menambahkan** bahan esensial ke ekosistem yang terdegradasi (mis. lupin pengikat nitrogen untuk menambah N; simbiont mikoriza untuk meningkatkan akses nutrien)

### Hands-On M14 — Komputasi Ekosistem

<details>
<summary>Buka penjelasan komputasional</summary>

**Menghitung Piramida Energi:**
1. Konversi NPP: $\text{NPP}_{kJ} = \text{NPP}_{g} \times 20\, \text{kJ/g}$ (1 g dry mass biomassa ≈ 20 kJ)
2. Setiap level berikutnya: $E_{n+1} = E_n \times \text{eff}$ (efisiensi trofik, biasanya 10%, bisa bervariasi 5–20%)
3. Proporsi yang sampai ke konsumen terakhir = $\text{eff}^{n-1}$ (sangat kecil untuk rantai panjang)

**NPP Berbagai Ekosistem (Campbell Bab 55, Fig 55.6):**

| Ekosistem | NPP (g/m²/yr) |
|-----------|--------------|
| Tropical rain forest | ~2 200 |
| Temperate rain forest | ~1 300 |
| Tropical dry forest | ~1 000 |
| Savanna | ~900 |
| Boreal forest | ~800 |
| Temperate grassland | ~600 |
| Desert | ~90 |

Faktor pembatas NPP: **cahaya, air, suhu, nutrien**. Di darat: nitrogen paling sering membatasi. Di laut: N, P, dan Fe.

**Salt Marsh Teal (1962) — Analisis Energi:**
- GPP rumput / energi matahari = 34 580 / 600 000 = **5.76%** (efisiensi fotosintesis)
- NPP / energi matahari = 6 585 / 600 000 = **1.10%**
- Respirasi rumput = GPP − NPP = **27 995 kcal/m²/yr** (energi yang dipakai produsen sendiri)
- NPP yang keluar sebagai detritus = 3 671/6 585 = **55.7%** (sebagian besar NPP masuk jalur detritivor, bukan herbivori)

**Energi Mengalir, Nutrien Bersiklus — Mengapa?**
- Energi: setiap transfer kehilangan sebagian besar (~90%) sebagai panas (hukum termodinamika II) → tidak dapat digunakan ulang → harus selalu ada input baru dari matahari
- Nutrien (N, C, P): atom tidak rusak saat digunakan, dilepas kembali saat dekomposisi → dapat digunakan ulang oleh organisme baru → bersiklus

**Bioremediation vs Augmentasi Biologis:**

| Strategi | Cara Kerja | Contoh |
|----------|------------|--------|
| Bioremediation | Organisme mengurai/menetralkan polutan | *Shewanella* mereduksi uranium terlarut |
| Augmentasi biologis | Organisme memulihkan *fungsi* ekosistem yang hilang | Legum pengikat N₂, mikoriza untuk akses nutrien |

**Kode — Piramida Energi & Analisis Salt Marsh:**
```python
# Piramida energi: transfer antar level trofik
npp_kJ   = npp_g * 20             # 1 g dry mass ≈ 20 kJ
eff      = eff_pct / 100          # misal 0.10 (10%)
energies = [npp_kJ * eff**i for i in range(n_levels)]
# Contoh Temperate Grassland (NPP=600 g): 12000 → 1200 → 120 kJ

# Perbandingan NPP (data Campbell Bab 55)
df_npp = pd.DataFrame(EKOSISTEM_LIST, columns=["Ekosistem", "NPP (g/m²/yr)"])
df_npp = df_npp.sort_values("NPP (g/m²/yr)", ascending=True)

# Analisis Salt Marsh Teal (1962)
solar, GPP_grass, NPP_grass = 600000, 34580, 6585
GPP_ins, detritus           = 305, 3671
pct_GPP      = GPP_grass / solar * 100          # 5.76% — efisiensi fotosintesis
pct_NPP      = NPP_grass / solar * 100          # 1.10%
resp_grass   = GPP_grass - NPP_grass            # 27995 kcal — respirasi produsen
pct_detritus = detritus / NPP_grass * 100       # 55.7% NPP masuk jalur detritivor
eff_trophic  = GPP_ins / GPP_grass * 100        # 0.88% transfer rumput → serangga
```

![Piramida energi per level trofik](/img/notes/if3211/piramida_energi.png)
![Perbandingan NPP antar ekosistem](/img/notes/if3211/perbandingan_npp.png)
![Diagram siklus nutrisi](/img/notes/if3211/siklus_nutrisi.png)

</details>

---

## Jebakan Benar/Salah Berisiko Tinggi

| Jebakan Umum | Fakta yang Benar |
|--------------|-----------------|
| "Individu berevolusi" | Yang berevolusi adalah POPULASI, bukan individu |
| "Seleksi alam menciptakan sifat baru" | Seleksi alam MEMILIH dari variasi herediter yang sudah ada |
| "Fermentasi menggunakan RTE" | Hanya respirasi ANAEROB yang menggunakan RTE; fermentasi TIDAK |
| "Fermentasi asam laktat melepas CO₂" | Fermentasi ALKOHOL yang melepas CO₂; asam laktat TIDAK |
| "Hasil ATP dari respirasi tepat 32" | Hasilnya KIRA-KIRA 30 atau 32 (tidak pasti) |
| "Kromosom diduplikasi di G₁" | Kromosom diduplikasi HANYA pada fase S |
| "Lekukan pembelahan terbentuk di sel tumbuhan" | Lekukan pembelahan = sel HEWAN; lempeng sel = sel TUMBUHAN |
| "Fitur analogis menunjukkan leluhur bersama" | Hanya fitur HOMOLOGIS yang menunjukkan leluhur bersama |
| "Epitet spesifik saja sudah menamai spesies" | KEDUA bagian (genus + epitet spesifik) bersama-sama menamai spesies |
| "Energi berdaur dalam ekosistem" | Energi MENGALIR; bahan kimia yang BERDAUR |
| "Efisiensi 10% berarti 90% terbuang" | BENAR — hanya ~10% yang dipindahkan ke tingkat tropik berikutnya |
| "Spesies kunci sangat berlimpah" | Spesies kunci mengendalikan melalui PERAN, bukan kelimpahan |
| "Suksesi primer terjadi setelah kebakaran" | Kebakaran = suksesi sekunder; primer = daerah tidak bernyawa |
| "Pos G₂ paling penting" | Pos G₁ yang paling penting (titik restriksi) |
| "Tumor jinak mengalami metastasis" | Hanya tumor GANAS yang bermetastasis |
| "Teori Lamarck diterima" | Pewarisan sifat yang diperoleh menurut Lamarck TIDAK didukung |
| "Domain KURANG inklusif daripada Kingdom" | Domain LEBIH inklusif daripada Kingdom |

---

## Glosarium

| Istilah Indonesia | Istilah Inggris | Definisi Singkat |
|-------------------|-----------------|-----------------|
| Analogi | Analogy | Kemiripan akibat evolusi konvergen, BUKAN leluhur bersama |
| Augmentasi Biologis | Biological Augmentation | Penggunaan organisme untuk menambahkan bahan esensial ke ekosistem yang terdegradasi |
| Biogeografi | Biogeography | Ilmu tentang distribusi geografis spesies |
| Bioremediasi | Bioremediation | Penggunaan organisme untuk mendetoksifikasi ekosistem tercemar |
| Daur Biogeokimia | Biogeochemical Cycle | Daur unsur kimia antara komponen biotik dan abiotik ekosistem |
| Detritivora | Detritivore | Organisme yang memakan detritus (bahan organik mati); termasuk prokariota dan jamur |
| Domain | Domain | Tingkatan taksonomi tertinggi: Bacteria, Archaea, Eukarya |
| Efisiensi Tropik | Trophic Efficiency | Persentase produksi yang dipindahkan dari satu tingkat tropik ke tingkat berikutnya (~10%) |
| Ekosistem | Ecosystem | Semua organisme dalam suatu komunitas beserta faktor abiotik yang berinteraksi dengannya |
| Ektoparasit | Ectoparasite | Parasit yang hidup di luar tubuh inang |
| Endoparasit | Endoparasite | Parasit yang hidup di dalam tubuh inang |
| Epitet Spesifik | Specific Epithet | Bagian kedua dari nama binomial; harus dikombinasikan dengan nama genus untuk menamai spesies |
| Eutrofikasi | Eutrophication | Peningkatan dramatis produksi primer akibat kelebihan nutrien dalam ekosistem akuatik |
| Evolusi Konvergen | Convergent Evolution | Kemunculan ciri serupa secara independen pada silsilah yang tidak berkerabat dekat |
| Fermentasi | Fermentation | Glikolisis + reaksi yang meregenerasi NAD⁺; TIDAK menggunakan RTE |
| Fermentasi Alkohol | Alcoholic Fermentation | Piruvat → asetaldehid (CO₂ dilepas) → etanol; meregenerasi NAD⁺ |
| Fermentasi Asam Laktat | Lactic Acid Fermentation | Piruvat → laktat; TIDAK melepas CO₂; terjadi pada otot dan beberapa bakteri |
| Filogeni | Phylogeny | Sejarah evolusi suatu spesies atau kelompok organisme |
| Fosforilasi Oksidatif | Oxidative Phosphorylation | Sintesis ATP menggunakan energi dari transfer elektron melalui RTE; mencakup kemiosmosis |
| Gelendong Mitotik | Mitotic Spindle | Susunan mikrotubulus yang mengendalikan pemisahan kromosom selama mitosis |
| Glikolisis | Glycolysis | Pemecahan glukosa menjadi 2 piruvat di sitosol; menghasilkan 2 ATP neto + 2 NADH |
| Hipotesis Gangguan Menengah | Intermediate Disturbance Hypothesis | Gangguan dengan intensitas sedang mendorong keanekaragaman spesies terbesar |
| Homologi | Homology | Kemiripan yang diwariskan dari leluhur bersama; dasar inferensi filogenetik |
| Insinyur Ekosistem | Ecosystem Engineer | Organisme yang menyebabkan perubahan fisik pada lingkungan (mis. berang-berang membangun bendungan) |
| Interfase | Interphase | Fase siklus sel di luar fase mitotik; terdiri dari G₁, S, dan G₂ (~90% durasi siklus) |
| Jaring-jaring Makanan | Food Web | Kumpulan rantai makanan yang saling terhubung dalam suatu komunitas |
| Keanekaragaman Spesies | Species Diversity | Gabungan kekayaan spesies dan kelimpahan relatif dalam suatu komunitas |
| Kemiosmosis | Chemiosmosis | Sintesis ATP menggunakan energi dari aliran H⁺ melalui ATP sintase melewati membran |
| Kinetokor | Kinetochore | Kompleks protein di sentromer yang melekat pada mikrotubulus gelendong |
| Komensalisme | Commensalism | Interaksi di mana satu spesies diuntungkan (+) dan spesies lain tidak terpengaruh (0) |
| Kompetisi | Competition | Interaksi antarspesies yang merugikan kedua pihak (−/−) dalam memperebutkan sumber daya |
| Kromatin | Chromatin | Material penyusun kromosom eukariotik: DNA + protein |
| Lempeng Metafase | Metaphase Plate | Bidang imajiner di tengah sel tempat sentromer kromosom berbaris saat metafase |
| Lempeng Sel | Cell Plate | Struktur yang terbentuk selama sitokinesis sel tumbuhan (menggantikan lekukan pembelahan) |
| Metastasis | Metastasis | Penyebaran sel kanker dari tumor ganas ke bagian tubuh lain |
| Mimikri Batesian | Batesian Mimicry | Spesies tidak berbahaya meniru penampilan spesies berbahaya untuk menghindari predasi |
| Mitosis | Mitosis | Pembelahan inti sel eukariotik menjadi dua inti anakan identik; fase: Profase → Prometafase → Metafase → Anafase → Telofase |
| Mutualisme | Mutualism | Interaksi yang menguntungkan kedua spesies (+/+) |
| Nomenklatur Binomial | Binomial Nomenclature | Sistem penamaan dua kata (Genus + epitet spesifik) yang dikembangkan Linnaeus; nama dicetak miring |
| Nutrien Pembatas | Limiting Nutrient | Unsur yang, jika ditambahkan, paling meningkatkan produksi primer |
| Parasitisme | Parasitism | Interaksi yang menguntungkan parasit (+) dan merugikan inang (−) |
| PEB / NEP | Net Ecosystem Production | Laju akumulasi biomasa total ekosistem; positif = rosot karbon |
| Pembelahan Biner | Binary Fission | Reproduksi prokariota dengan duplikasi kromosom dan pembelahan sel menjadi dua |
| Pergeseran Karakter | Character Displacement | Perbedaan karakter yang lebih besar pada spesies simpatrik dibanding alopatrik |
| Pewarnaan Aposematik | Aposematic Coloration | Warna peringatan mencolok yang menandakan sifat beracun atau berbahaya |
| Pewarnaan Kriptik | Cryptic Coloration | Kamuflase yang membantu organisme menyatu dengan latar belakangnya |
| Pos Pemeriksaan | Checkpoint | Titik kontrol dalam siklus sel; pos G₁, G₂, dan M |
| PPB / NPP | Net Primary Production | Produksi primer kasar dikurangi respirasi autotrof; = biomasa baru yang tersedia bagi konsumen |
| PPK / GPP | Gross Primary Production | Total energi kimia yang dihasilkan oleh produsen melalui fotosintesis |
| Predasi | Predation | Interaksi di mana predator (+) membunuh dan memakan mangsanya (−) |
| Produksi Sekunder | Secondary Production | Energi kimia dalam makanan yang diubah oleh konsumen menjadi biomasa baru |
| Relung Ekologi | Ecological Niche | Kumpulan spesifik sumber daya biotik dan abiotik yang digunakan oleh suatu organisme |
| Respirasi Anaerob | Anaerobic Respiration | Respirasi yang menggunakan akseptor elektron akhir selain O₂ (mis. SO₄²⁻); TETAP menggunakan RTE |
| Respirasi Seluler | Cellular Respiration | Proses oksidasi glukosa menjadi CO₂ dan H₂O untuk menghasilkan ATP; terdiri dari glikolisis, siklus krebs, dan fosforilasi oksidatif |
| Rosot Karbon | Carbon Sink | Ekosistem dengan PEB > 0 yang memperoleh lebih banyak karbon dari atmosfer daripada yang dilepaskan |
| RTE | ETC (Electron Transport Chain) | Rantai Transpor Elektron — rangkaian protein di membran dalam mitokondria yang memindahkan elektron dan memompa H⁺ |
| Seleksi Alam | Natural Selection | Mekanisme evolusi di mana individu dengan sifat herediter menguntungkan bereproduksi lebih banyak |
| Sentromer | Centromere | Daerah penyempitan kromosom tempat dua kromatid saudara menyatu dan kinetokor melekat |
| Sentrosom | Centrosome | Pusat pengorganisasian mikrotubulus pada sel hewan; menduplikasi diri saat interfase |
| Siklus Asam Sitrat | Citric Acid Cycle (Krebs Cycle) | Serangkaian reaksi di matriks mitokondria yang mengoksidasi asetil-CoA; juga disebut Siklus Krebs |
| Siklus Sel | Cell Cycle | Urutan pertumbuhan dan pembelahan sel dari saat sel terbentuk hingga membelah sendiri |
| Sistematika | Systematics | Ilmu yang mengklasifikasikan organisme dan menentukan hubungan evolusioner |
| Sitokinesis | Cytokinesis | Pembelahan sitoplasma setelah mitosis; pada sel hewan via lekukan pembelahan, pada sel tumbuhan via lempeng sel |
| Spesies Fondasi | Foundation Species | Spesies yang berpengaruh kuat pada komunitas karena ukuran atau kelimpahan tinggi |
| Spesies Kunci | Keystone Species | Spesies yang mengendalikan komunitas melalui peran ekologi kritis, TIDAK harus berlimpah |
| Suksesi Ekologi | Ecological Succession | Perubahan bertahap komposisi komunitas setelah gangguan besar |
| Suksesi Primer | Primary Succession | Suksesi yang dimulai di daerah yang hampir tidak bernyawa (mis. setelah letusan gunung berapi) |
| Suksesi Sekunder | Secondary Succession | Suksesi setelah gangguan yang menyingkirkan sebagian organisme (mis. setelah kebakaran hutan) |
| Taksa Saudara | Sister Taxa | Kelompok yang paling dekat hubungannya karena berbagi leluhur bersama secara langsung |
| Taksonomi | Taxonomy | Ilmu pemberian nama dan pengelompokan organisme secara teratur |
| Transformasi (kanker) | Transformation (cancer) | Perubahan sel sehingga membelah tanpa batas dalam kultur |
| Tumor Ganas | Malignant Tumor | Tumor yang menyerang jaringan sekitar dan dapat bermetastasis |
| Tumor Jinak | Benign Tumor | Tumor yang tetap di tempat asal dan tidak menyerang jaringan lain |

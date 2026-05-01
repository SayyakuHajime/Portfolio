Berikut adalah rangkuman super detail materi berdasarkan file "6 - RNN (1).pdf", "7 - RNN dan LSTM.pdf", dan "5 CNN.pdf", disusun dengan struktur teknis mendalam menyerupai catatan akademik profesional.

---

# I. Backpropagation pada CNN

Materi ini fokus pada penurunan gradien untuk memperbarui bobot **Kernel/Filter** ($K$) dan matriks bobot **Fully Connected** ($W$)[cite: 3].

## 1. Alur Forward di CNN
*   **Convolution Layer:** $net\_c = X * K$ (Operasi konvolusi antara input dan kernel)[cite: 3].
*   **Detector Layer:** $H = ReLU(net\_c)$ (Menghilangkan nilai negatif)[cite: 3].
*   **Pooling Layer:** Reduksi dimensi (Max/Average) untuk efisiensi komputasi dan mencegah *overfitting*[cite: 3].
*   **Fully Connected (FC):** $O = Softmax(H \cdot W + b)$[cite: 3].

## 2. Mekanisme Backward CNN
Menggunakan aturan rantai (*Chain Rule*) untuk menghitung $\frac{\partial E}{\partial K}$ dan $\frac{\partial E}{\partial W}$[cite: 3]:

1.  **Update Bobot FC ($W$):**
    $$\frac{\partial E}{\partial w_{ji}} = \frac{\partial E}{\partial o_j} \cdot \frac{\partial o_j}{\partial net_j} \cdot \frac{\partial net_j}{\partial w_{ji}}$$
    Hasil akhirnya: $\Delta W = -(target - output) \cdot Output(1-Output) \cdot H$[cite: 3].

2.  **Update Kernel Konvolusi ($K$):**
    Gradien harus dirambatkan mundur dari lapisan FC, melewati lapisan Pooling, dan lapisan Aktivasi (ReLU).
    $$\frac{\partial E}{\partial K} = \frac{\partial E}{\partial net\_j} \cdot \frac{\partial net\_j}{\partial H} \cdot \frac{\partial H}{\partial net\_c} \cdot \frac{\partial net\_c}{\partial K}$$
    *   **Catatan pada Pooling:** Gradien hanya diteruskan ke unit yang memiliki nilai maksimum (pada Max Pooling) saat *forward pass*[cite: 3].
    *   **Efisiensi:** Konvolusi jauh lebih efisien (~60.000 kali lebih cepat pada contoh kasus tertentu) dibanding FFNN karena *Parameter Sharing* dan *Local Connectivity*[cite: 3].

3.  **Parameter Perhitungan:**
    Jumlah parameter pada lapisan konvolusi dengan *weight sharing*:
    $$\text{Params} = (\text{FilterWidth} \times \text{FilterHeight} \times \text{Channels} + 1) \times \text{NbFilters}$$[cite: 3].

---
# II. Recurrent Neural Network (RNN)

## 1. Konsep Dasar & Motivasi (What & Why)
RNN adalah kelas ANN yang dirancang untuk menangani data sekuensial ($x^{(1)}, x^{(2)}, \dots, x^{(n)}$) di mana urutan waktu sangat menentukan makna[cite: 1].
*   **Keterbatasan FFNN:** FFNN mengasumsikan input antar data bersifat independen. Untuk data gambar, FFNN kehilangan fitur spasial karena proses *flattening*[cite: 3].
*   **Keunggulan RNN:** Memiliki koneksi rekuren (loop) yang memungkinkan informasi dari masa lalu dipertahankan. Konsep ini disebut **Context/Memory**[cite: 1].
*   **Unfolding:** Secara matematis, loop RNN dapat "dibuka" menjadi urutan rantai n-timestep. Unit yang sama digunakan berulang kali dengan parameter yang sama (**Parameter Sharing**)[cite: 1].

## 2. Mekanisme Forward Propagation
Proses penghitungan pada setiap *timestep* $t$:
1.  **Hidden State ($h_t$):** Menggabungkan input saat ini ($x_t$) dengan informasi dari langkah sebelumnya ($h_{t-1}$).
    $$h_t = f(Ux_t + Wh_{t-1} + b_{xh})$$
    *   $U$: Matriks bobot input ke hidden[cite: 1].
    *   $W$: Matriks bobot hidden ke hidden (koneksi rekuren)[cite: 1].
    *   $f$: Biasanya fungsi aktivasi $tanh$[cite: 1].
2.  **Output ($y_t$):** Dihitung berdasarkan *hidden state* saat ini.
    $$y_t = f(Vh_t + b_{hy})$$
    *   $V$: Matriks bobot hidden ke output[cite: 1].
    *   $f$: Biasanya *Softmax* untuk klasifikasi atau *Linear* untuk regresi[cite: 1, 2].

## 3. Arsitektur Variasi RNN
Berdasarkan jumlah input dan output[cite: 1, 2]:
*   **One-to-Many:** Satu input ke banyak output. Contoh: *Image Captioning*.
*   **Many-to-One:** Banyak urutan input ke satu output. Contoh: Analisis sentimen teks.
*   **Many-to-Many (Synchronous):** Panjang input = panjang output. Contoh: *POS Tagging*.
*   **Many-to-Many (Asynchronous/Seq2Seq):** Input dibaca habis dulu oleh **Encoder**, baru **Decoder** mengeluarkan output. Contoh: *Machine Translation*.
*   **Bidirectional RNN (BRNN):** Memiliki dua lapisan *hidden* independen (satu maju, satu mundur). Output $y_t$ bergantung pada informasi masa lalu dan masa depan[cite: 1].

---

# III. Long Short-Term Memory (LSTM)

## 1. Masalah Vanishing Gradient
Pada RNN standar, saat melakukan *backpropagation* melalui banyak *timestep*, gradien dikalikan berulang kali dengan angka kecil (turunan $tanh$ < 1). Hal ini menyebabkan gradien mengecil secara eksponensial (**Vanishing Gradient**) sehingga model tidak bisa mempelajari ketergantungan jangka panjang[cite: 2].

## 2. Struktur Cell State & Gates
LSTM mengatasi ini dengan **Cell State ($C_t$)** yang berfungsi seperti jalan tol informasi tanpa banyak interaksi non-linear[cite: 2].
*   **Forget Gate ($f_t$):** Menentukan informasi apa yang dibuang dari memori.
    $$f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)$$
*   **Input Gate ($i_t$):** Menentukan informasi baru yang akan disimpan.
    $$i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)$$
*   **Candidate State ($\tilde{C}_t$):** Nilai kandidat baru yang dihitung dengan $tanh$.
*   **Update Cell State:** $C_t = f_t * C_{t-1} + i_t * \tilde{C}_t$[cite: 2].
*   **Output Gate ($o_t$):** Menentukan bagian *cell state* mana yang menjadi output *hidden state* ($h_t$).
    $$h_t = o_t * tanh(C_t)$$

---

# IV. Backpropagation Through Time (BPTT)

BPTT adalah algoritma untuk melatih RNN/LSTM dengan melakukan *unrolling* jaringan[cite: 2].
1.  **Forward Pass:** Menghitung semua $h_t$ dan $y_t$ untuk satu urutan penuh.
2.  **Error Calculation:** Menghitung total *loss* (biasanya *Cross-Entropy*).
    $$E = \sum E_t$$
3.  **Backward Pass:** Gradien dikalkulasi pada setiap *timestep* dan diakumulasikan karena bobot $U, V, W$ adalah sama di setiap langkah[cite: 2].
4.  **Truncated BPTT:** Untuk urutan yang sangat panjang, proses *backward* dibatasi hanya beberapa langkah ke belakang guna menghemat memori dan komputasi[cite: 2].

---

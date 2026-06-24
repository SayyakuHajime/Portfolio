---
title: ML Last Term Notes
course: IF3270
subject: Pembelajaran Mesin
exam: Final Term
topics: [CNN Backprop, RNN, LSTM, Word2Vec, Attention, Encoder-Decoder, Transformer, Self-Attention, Decoder-Only Transformer, Encoder-Only Transformer, BPTT, Reinforcement Learning, RLHF]
references: Goodfellow et al. (2016), Hochreiter & Schmidhuber (1997), Mikolov et al. (2013), Bahdanau et al. (2015), Vaswani et al. (2017), Ouyang et al. (2022), Sutton & Barto (2018), Lecture Decks 5–9, NNTikZ - Fraser Love (2024), StatQuest - Josh Starmer
order: 2
date: "2025-01-01"
---

> [!tip] Pendahuluan - Referensi Video
> Sebagian besar materi di bawah ini (RNN, LSTM, Word2Vec, Seq2Seq, Attention, Transformer, RL, RLHF) dijelaskan dengan sangat jelas oleh StatQuest (Josh Starmer) di playlist berikut - video ke-**15 sampai 25**:
> [youtube.com/watch?v=CqOfi41LfDw&list=PLblh5JKOoLUIxGDQs4LFFD--41Vzf-ME1](https://www.youtube.com/watch?v=CqOfi41LfDw&list=PLblh5JKOoLUIxGDQs4LFFD--41Vzf-ME1)
> Tonton dulu sebelum belajar dari catatan ini kalau butuh intuisi/contoh numerik yang lebih konkret.

> [!important] Materi Ujian (Resmi)
> Cakupan ujian akhir yang dikonfirmasi hanya:
> 1. **Konsep RNN, LSTM, Transformer**
> 2. **RNN sync many-to-many**
> 3. **Encoder-Decoder & Attention**
> 4. **Reinforcement Learning**
>
> Bagian lain di catatan ini (CNN Backprop, Word2Vec, Decoder/Encoder-Only Transformer, RLHF, BPTT) adalah **referensi tambahan** dari video - boleh dibaca untuk konteks/intuisi, tapi **tidak wajib** untuk ujian.

## 1. CNN Backpropagation

> [!danger] Tidak Keluar di Ujian
> Menurut info terbaru, CNN Backpropagation **tidak akan keluar** di ujian - bagian ini boleh dilewati/tidak perlu dipelajari lagi.

Extending gradient descent to update kernels and weights in a convolutional architecture. Gradients propagate through pooling and convolutional layers via the chain rule.

### 1.a Forward Pass Recap

| Layer | Equation / Description |
|-------|------------------------|
| Convolution | $net_c = X * K$ - linear operation between input $X$ and kernel $K$ |
| Detector | $H = \text{ReLU}(net_c)$ - non-linearity zeroing negative activations |
| Pooling | Max/Average pooling for dimensionality reduction and regularization |
| Fully Connected | $O = \text{Softmax}(H \cdot W + b)$ - final classification layer |

### 1.b Backward Mechanism

**Update FC Weights (W)**

$$\frac{\partial E}{\partial w_{ji}} = \frac{\partial E}{\partial o_j} \cdot \frac{\partial o_j}{\partial net_j} \cdot \frac{\partial net_j}{\partial w_{ji}}$$

$$\Delta W = -(\text{target} - \text{output}) \cdot \text{Output}(1-\text{Output}) \cdot H$$

**Update Kernel (K)**

$$\frac{\partial E}{\partial K} = \frac{\partial E}{\partial net_j} \cdot \frac{\partial net_j}{\partial H} \cdot \frac{\partial H}{\partial net_c} \cdot \frac{\partial net_c}{\partial K}$$

Gradient propagates backward through Pooling → Activation (ReLU) → Kernel.

> [!note] Max Pooling Backprop
> Gradient passes only to the max-value unit from the forward pass; all others receive zero gradient.

**Parameter Count (Weight Sharing)**

$$\text{Params} = (\text{FilterW} \times \text{FilterH} \times \text{Channels} + 1) \times \text{NbFilters}$$

Weight sharing makes CNNs far more parameter-efficient than FFNNs on the same input size.

![CNN Architecture - Conv2D Blocks → GlobalAvgPool → Dense](/assets/images/diagrams/cnn_arch.png)
*CNN Architecture - Conv2D Blocks → GlobalAvgPool → Dense*

---

## 2. Recurrent Neural Networks (RNN)

A class of neural networks for sequential data where the *order* of inputs is crucial. RNNs maintain a hidden state that carries information across timesteps.

### 2.a Motivation: IID Breakdown & Sequential Data

Standard supervised learning assumes data samples are **Independent and Identically Distributed (i.i.d.)**. Sequential data violates this - in language, time-series, or sensor readings each observation depends on previous ones. A vanilla FFNN has no mechanism to share context across positions, and requires fixed-size input.

> [!insight] RNN Solution
> A recurrent connection feeds the hidden state $h^{(t-1)}$ back into the computation at step $t$, encoding the sequence history into a running "memory" vector.

> [!example] Why Not Just Use a FFNN? (StatQuest "StatLand" Walkthrough)
> A feedforward net needs a *fixed* number of inputs - "no more, no less." But stock-price histories differ in length per company (9 prior days vs. 5 prior days). A toy example scales prices to low=0, medium=0.5, high=1, then feeds yesterday's value in first and today's second: the feedback loop carries yesterday's activation output ($y_1 \times w_2$) into the same summation that receives today's input ($\times w_1$), so **both timesteps jointly shape tomorrow's prediction**. The same small recurrent unit handles sequences of any length - that's the whole point of the loop.

### 2.b Sequence Modeling Types

| Type | Description | Example |
|------|-------------|---------|
| One-to-One | Standard FFNN - single input → single output, no sequence | - |
| Many-to-One | Sequence input → single output | Sentiment analysis, time-series forecasting |
| One-to-Many | Single input → sequence output | Image captioning |
| Many-to-Many (Sync) | Input & output same length | POS tagging, NER, frame labeling |
| Many-to-Many (Delayed) | Encoder-Decoder: output starts after full input consumed | Machine translation |

### 2.c Architecture & Forward Equations

$$h^{(t)} = f_h\!\left(W_{xh}\, x^{(t)} + W_{hh}\, h^{(t-1)} + b_h\right)$$

$$o^{(t)} = f_y\!\left(W_{ho}\, h^{(t)} + b_{ho}\right)$$

Where:
- $W_{xh}$: input→hidden, $W_{hh}$: hidden→hidden (recurrent), $W_{ho}$: hidden→output
- $f_h$: typically $\tanh$ - $f_y$: softmax (classification) or linear (regression)

![RNN Cell - Internal Structure](/assets/images/diagrams/rnn_cell.png)
*RNN Cell - Internal Structure*

### 2.d Multi-Layer RNN & Parameter Sharing

RNN cells can be stacked: the hidden state of layer $\ell$ becomes the input of layer $\ell+1$. In Keras, intermediate layers require `return_sequences=True`. The defining property is **parameter sharing** - the same $W_{xh}, W_{hh}, W_{ho}$ are used at every timestep, enabling variable-length inputs and efficient parameter use.

### 2.e Unrolling & the Exploding/Vanishing Gradient (Concrete Mechanic)

**Unrolling** = make a copy of the network for each timestep and redirect the recurrent connection from copy $t$'s output into copy $t{+}1$'s summation, "plugging values in from oldest to newest." No matter how many copies exist, the *trained* weights ($W_{xh}, W_{hh}, W_{ho}$) stay identical across all of them - unrolling never increases parameter count, it only reuses them.

> [!danger] The $w_{hh}^{T}$ Mechanic
> Because of unrolling, the same recurrent weight gets multiplied into the gradient once per timestep - i.e., raised to the power of the sequence length $T$:
> - $w_{hh} = 2,\; T=50 \Rightarrow 2^{50}$ (huge) → gradient **explodes**, optimization steps overshoot and the loss "bounces around" instead of converging.
> - $w_{hh} = 0.5,\; T=50 \Rightarrow 0.5^{50} \approx 0$ → gradient **vanishes**, steps shrink to nothing and training stalls before convergence.
>
> Constraining $|w_{hh}| < 1$ to avoid exploding *guarantees* vanishing over long sequences - a single shared recurrent weight cannot avoid both. This exact tension is what motivates the LSTM's separate cell-state highway (§3).

---

## 3. LSTM & Vanishing Gradient

LSTM was designed to solve the **vanishing gradient** problem in standard RNNs by maintaining a separate **cell state** - a gradient highway regulated by learnable gates.

### 3.a Vanishing Gradient Problem

During BPTT, gradients are multiplied repeatedly by $W_{hh}$ and $\tanh'(\cdot) < 1$. For long sequences this product approaches zero exponentially - the network cannot learn long-range dependencies. The cell state in LSTM keeps this product near 1 when the forget gate is open.

> [!insight] Two-Path Memory (the headline analogy)
> LSTM splits memory into a **cell state** (long-term memory highway) and a **hidden state** (short-term memory). The crucial structural trick: the cell state path has **no weight matrices multiplying it directly** - only elementwise multiplication (forget gate) and addition (input gate's contribution). No repeated weight-multiplication ⇒ no exponential shrink/blowup, so long-range information survives across many unrolled steps. The hidden state, by contrast, *is* wired directly to trainable weights - hence "short-term."

### 3.b Gate Equations

All gates receive concatenated input $[h^{(t-1)}, x^{(t)}]$:

$$f_t = \sigma\!\left(W_f\,[h^{(t-1)}, x^{(t)}] + b_f\right) \quad\text{(Forget)}$$

$$i_t = \sigma\!\left(W_i\,[h^{(t-1)}, x^{(t)}] + b_i\right) \quad\text{(Input)}$$

$$\tilde{C}_t = \tanh\!\left(W_c\,[h^{(t-1)}, x^{(t)}] + b_c\right) \quad\text{(Candidate)}$$

$$o_t = \sigma\!\left(W_o\,[h^{(t-1)}, x^{(t)}] + b_o\right) \quad\text{(Output)}$$

**State Updates:**

$$C^{(t)} = \underbrace{C^{(t-1)} \odot f_t}_{\text{keep from past}} \;+\; \underbrace{i_t \odot \tilde{C}_t}_{\text{add new info}}$$

$$h^{(t)} = o_t \odot \tanh\!\left(C^{(t)}\right)$$

$\odot$ = element-wise multiplication. $f_t \approx 1$ keeps old cell state; $f_t \approx 0$ forgets it.

| Gate | Role |
|------|------|
| Forget $f_t$ | $\sigma$ output 0 = forget old memory; 1 = keep entirely |
| Input $i_t$ | Controls how much of the candidate $\tilde{C}_t$ is written to cell state |
| Candidate $\tilde{C}_t$ | Proposed new values for cell state via $\tanh$ of concatenated input |
| Output $o_t$ | Filters what fraction of $C^{(t)}$ is exposed as hidden state $h^{(t)}$ |

> [!example] Worked Numeric Walkthrough (StatQuest gate-by-gate)
> Sigmoid → "percentage to keep": $\sigma(10) \approx 0.999995$ (keep ~everything), $\sigma(-5) \approx 0.01$ (forget ~everything). Tanh squashes to $(-1,1)$: $\tanh(2) = 0.96$.
> 1. **Forget gate**: weighted sum $= 5.95 \Rightarrow \sigma(5.95) = 0.997$ → new long-term memory $= 2 \times 0.997 = 1.99$ (kept 99.7%).
> 2. **Input gate**: candidate $\tilde C_t = \tanh(2.03) = 0.97$; "how much to add" $= \sigma(4.27) = 1.0$ → long-term memory updates to $1.99 + (1.0 \times 0.97) = 2.96$.
> 3. **Output gate**: $\tanh(2.96) = 0.99$ (potential short-term memory) $\times\, \sigma(\cdot) = 0.99$ → new hidden state $= 0.99 \times 0.99 = 0.98$, which **is** the LSTM unit's output.
>
> All three gating decisions reuse the *identical* sigmoid "percentage-to-keep" mechanism - only the weights, biases, and inputs differ.

![LSTM Cell - Gate Structure & Cell State Highway](/assets/images/diagrams/lstm_cell.png)
*LSTM Cell - Gate Structure & Cell State Highway*

### 3.c Parameter Counting

Each gate has weight matrix shape $(m+n) \times n$ plus bias $n$, where $m$ = input dim, $n$ = LSTM units:

$$\text{LSTM params} = (m + n + 1) \times 4n$$

$$\text{Total (+ output layer)} = (m + n + 1) \times 4n \;+\; (n + 1) \times k$$

$m$ = input dim, $n$ = LSTM units, $k$ = output classes. Factor 4 = four gates (f, i, c̃, o).

---

## 4. Word Embedding & Word2Vec

A **word embedding** represents each vocabulary token as a vector of numbers, positioned so that semantically/contextually similar words end up close together in vector space.

### 4.a Why Not One-Hot or Random Numbers?

Assigning each word an arbitrary scalar (e.g., "great!" → 4.2, "awesome!" → −32.1) means the network can't transfer what it learns about one word to a similar one - *"learning how to use 'great!' won't help it learn 'awesome!'"* A single number per word also can't capture context-dependent meaning (sincere vs. sarcastic "great"). This motivates **multi-dimensional** embeddings: more than one learned number per word.

### 4.b Training a Word2Vec Embedding

> [!insight] The Central Definitional Insight
> Build a tiny network: one one-hot input node per vocabulary word → $N$ **identity-activation** nodes (the activation "does nothing except give us a place to do addition") → softmax output (one node per vocabulary word), trained with cross-entropy to **predict a nearby word**. The **trained weights connecting the one-hot inputs to the identity layer ARE the word embedding** - $N$ = embedding dimensionality.

Backpropagation pulls the embeddings of words that share contexts (e.g., "Troll 2" and "Gymkata," both followed by "is... great!") closer together in embedding space, even though they start from unrelated random weights.

| Strategy | Predicts | Example |
|----------|----------|---------|
| **CBOW** (Continuous Bag of Words) | middle word from surrounding words | "Troll 2" + "great!" → "is" |
| **Skip-gram** | surrounding words from the middle word | "is" → "Troll 2", "great!", "Gymkata" |

### 4.c Scale & Negative Sampling

Real Word2Vec: ~100+ dimensions × ~3 million-word vocabulary → roughly $3{,}000{,}000 \times 100 \times 2 = 600$ **million** weights to optimize per step - intractable directly.

> [!note] Negative Sampling Trick
> 1. A one-hot input has a single active "1," so all weights from "off" input words contribute zero gradient and can be skipped (~halves the cost).
> 2. Instead of softmax/cross-entropy over all 3M outputs, randomly sample a handful of "negative" words (2–20 in practice) plus the true target, and update weights only for those outputs.
>
> Net effect: roughly **300 weights** updated per step instead of 600 million - the same "approximate the expensive computation cheaply" spirit seen later in attention (dot product ≈ cosine similarity) and RLHF (learned reward scale).

---

## 5. Attention Mechanism

Attention was introduced to overcome the information bottleneck of a fixed-length context vector in vanilla Encoder-Decoder networks. The decoder now *dynamically focuses* on different encoder positions at each decoding step.

### 5.a Encoder-Decoder Without Attention

The vanilla seq2seq model compresses the entire input sequence into a **single fixed vector** $c = h^{(T_x)}$. The decoder generates output from only this vector. For long sequences, this bottleneck causes severe information loss.

> [!warn] Bottleneck Problem
> For a 50-word sentence, all information must fit into one fixed-size vector. Empirically, translation quality degrades sharply as input length grows. StatQuest's vivid illustration: forgetting just the first word turns *"**Don't** eat the delicious looking and smelling pizza"* into *"Eat the delicious looking and smelling pizza"* - **two sentences with completely opposite meanings**. Even LSTMs with separate long/short-term paths can lose early tokens once "a lot of data" has to travel through both paths.

> [!note] Precise Definition: Context Vector & Teacher Forcing (StatQuest "Let's go" → "Vamos" example)
> - **Context vector** = the *last* cell **and** hidden states from *both layers* of the encoder's stacked LSTM - this full bundle *initializes* (not just feeds) the decoder's separate LSTMs (own weights, own target-language embedding/vocabulary).
> - Decoding runs token-by-token until **`<EOS>`** ("end of sentence") is produced or a max length is hit. Note: Sutskever et al.'s original manuscript actually *starts* decoding by feeding in `<EOS>` itself, rather than a separate `<SOS>` token - a common point of confusion.
> - **Teacher forcing**: during training, feed the decoder the *known correct* token at each step (not its own possibly-wrong prediction), and force the output length to match the *known* target length. This stabilizes training by preventing early mistakes from cascading.

### 5.b Bahdanau (Additive) Attention

At each decoder step $t$, a *different* context vector $c_t$ is computed as a weighted sum over all encoder hidden states $\{h_j\}$:

$$e_{tj} = v_a^\top \tanh\!\left(W_a\, s_{t-1} + U_a\, h_j\right) \quad\text{(alignment score)}$$

$$\alpha_{tj} = \frac{\exp(e_{tj})}{\displaystyle\sum_{k=1}^{T_x} \exp(e_{tk})} \quad\text{(attention weights via softmax)}$$

$$c_t = \sum_{j=1}^{T_x} \alpha_{tj}\, h_j \quad\text{(context vector)}$$

$s_{t-1}$: previous decoder hidden state - $h_j$: encoder state at position $j$ - $W_a, U_a, v_a$: learned alignment params. Score computed *before* decoder step $t$ (uses $s_{t-1}$).

> [!insight] Alignment Matrix $\alpha_{tj}$
> Visualizing all $\alpha_{tj}$ values reveals which source positions each output token attends to - giving interpretable word alignments in translation tasks.

### 5.c Luong (Multiplicative) Attention

Luong et al. compute the alignment score *after* the decoder step, using the *current* hidden state $h_t$:

$$\text{score}(h_t, \bar{h}_s) = \begin{cases} h_t^\top \bar{h}_s & \text{dot} \\ h_t^\top W_a\, \bar{h}_s & \text{general} \\ v_a^\top \tanh\!\left(W_a\,[h_t;\, \bar{h}_s]\right) & \text{concat} \end{cases}$$

| | Bahdanau | Luong |
|-|----------|-------|
| Hidden state used | $s_{t-1}$ (pre-step) | $h_t$ (post-step) |
| Formula type | Additive | Multiplicative |
| Context scope | Many-to-one or many-to-many | Same |

**Formula lengkap update hidden state & output (Luong):**

$$h_t = \text{RNN}(h_{t-1},\, y_{t-1}) \quad\text{(1 -- decoder maju \emph{lebih dulu}, \emph{tanpa} context vector)}$$

$$e_{ts} = \text{score}(h_t, \bar{h}_s), \qquad \alpha_{ts} = \frac{\exp(e_{ts})}{\sum_{k=1}^{T_x}\exp(e_{tk})}, \qquad c_t = \sum_{s=1}^{T_x} \alpha_{ts}\, \bar{h}_s \quad\text{(2 -- attention dihitung dari $h_t$ saat ini)}$$

$$\boxed{s_t \;=\; \tilde{h}_t \;=\; \tanh\!\big(W_c\,[\,c_t \,;\, h_t\,]\big)} \quad\text{(3 -- "attentional hidden state": gabungan } c_t \text{ dan } h_t\text{)}$$

$$\boxed{y_t \;=\; g(\tilde{h}_t) \;=\; \text{softmax}(W_s\, \tilde{h}_t)}\quad\text{(4 -- output diproyeksikan dari } \tilde h_t\text{, bukan langsung dari } h_t\text{)}$$

> [!important] Beda Krusial dari Bahdanau - Bukan Cuma Soal Kapan Skor Dihitung
> - **Bahdanau**: $c_t$ ikut **masuk ke dalam** komputasi hidden state berikutnya - $s_t = f(s_{t-1}, y_{t-1}, c_t)$ - sehingga $s_t$ *sekaligus* menjadi hidden state untuk langkah berikutnya **dan** dasar prediksi $y_t$.
> - **Luong**: $h_t$ dihitung **dulu** lewat RNN biasa (tanpa $c_t$); $c_t$ baru dipakai **setelahnya** untuk membentuk *representasi terpisah* $\tilde h_t = s_t$ (= "attentional hidden state") yang **hanya** dipakai untuk memprediksi $y_t$ - bukan untuk hidden state RNN langkah berikutnya (yang tetap $h_t$ polos, tanpa attention). Konsekuensinya: $W_c$ dan $W_s$ adalah **bobot baru** yang tidak ada pada decoder vanilla / Bahdanau.
> - Variasi populer "**input feeding**": $\tilde h_{t-1}$ (bukan cuma $y_{t-1}$) ikut diumpankan sebagai input langkah berikutnya, supaya model "ingat" keputusan attention sebelumnya.

> [!example] Worked Numeric Walkthrough (StatQuest "Let's go" → "Vamos")
> Decoder feeds `<EOS>` into its embedding/LSTMs, then computes a **similarity score** between each encoder step's hidden states and the decoder's current output:
> 1. **Cosine similarity → dot product**: StatQuest first shows cosine similarity, then notes attention typically keeps just its *numerator* - the **dot product** - because it's cheap, preserves the sign/ranking ("large positive ⇒ similar, large negative ⇒ opposite"), and the denominator's normalization is moot when always comparing the same number of cells. Concretely: encoder("let's") $=(-0.76, 0.75)$, decoder(`<EOS>`) $=(0.91, 0.38)$ → cosine sim $=-0.39$, dot product $=-0.41$ (same conclusion); dot("go", `<EOS>`) $= 0.01$.
> 2. **Softmax → attention weights**: turns similarity scores into percentages summing to 1 - *"what percentage of each encoded input word we should use when decoding."* Result: 40% on "let's," 60% on "go" (since "go" was more similar to `<EOS>`).
> 3. **Scale-and-sum → context vector**: $0.4 \times \text{enc(``let's'')} + 0.6 \times \text{enc(``go'')}$ = the attention values for this decoding step. Feed these (plus the `<EOS>` encoding) into a FC layer → softmax → "vamos"; repeat until `<EOS>` is produced.
>
> StatQuest's caveat: *"there are conventions, but no rules for how attention should be added"* - Bahdanau and Luong are two illustrative conventions among many possible wirings. Once attention gives the decoder direct access to every encoder position, *"it turns out we don't need [the LSTMs]"* - the seed of the Transformer (§6).

![Bahdanau Attention - Bidirectional Encoder + Attention Weights](/assets/images/diagrams/nntikz_attention.png)
*Bahdanau Attention - Bidirectional Encoder + Attention Weights*

![Luong Attention - alur komputasi: h_t dihitung lebih dulu (tanpa context vector), baru menentukan skor/alpha/c_t, lalu digabung jadi attentional hidden state h-tilde_t = s_t yang dipakai utk memprediksi y_t](/assets/images/diagrams/luong_attention.png)
*Luong Attention - perhatikan urutan alur (① → ④): $h_t$ dihitung lebih dulu tanpa $c_t$, baru dipakai untuk menentukan attention weights, lalu digabung ($\tilde h_t = s_t$) untuk memprediksi $y_t$. Bandingkan dengan diagram Bahdanau di atas, di mana $c_t$ langsung mengalir ke dalam komputasi hidden state berikutnya.*

---

## 6. Self-Attention & Transformer

The Transformer (Vaswani et al. 2017) replaces recurrent cells with **self-attention** layers entirely, enabling fully parallel computation and direct long-range dependency modeling.

### 6.a Q / K / V Self-Attention

For input sequence $X = [x_1,\ldots,x_N]$, three linear projections create Query, Key, and Value vectors per position:

$$q_n = \beta_q + \Omega_q\, x_n \quad\text{("what am I looking for?")}$$

$$k_m = \beta_k + \Omega_k\, x_m \quad\text{("what do I have?")}$$

$$v_m = \beta_v + \Omega_v\, x_m \quad\text{("what I contribute")}$$

**Scaled Dot-Product Self-Attention:**

$$a[x_m, x_n] = \text{softmax}_m\!\left[\frac{k_m^\top q_n}{\sqrt{D_q}}\right]$$

$$\text{Sa}[X] = V \cdot \text{Softmax}\!\left[\frac{K^\top Q}{\sqrt{D_q}}\right]$$

Division by $\sqrt{D_q}$ prevents dot-products from growing large and saturating softmax - StatQuest: *"scaling the dot product helped encode and decode long and complicated phrases."* Each position receives a weighted sum of *all* value vectors.

> [!note] The Full Transformer Pipeline (StatQuest summary line)
> word embedding (→ numbers) → positional encoding (→ word order, via alternating sine/cosine "squiggles" added to embeddings, since self-attention itself is order-agnostic) → **self-attention** (→ in-phrase relationships via Q/K/V dot products + softmax) → **multi-head attention** (multiple independent self-attention "cells" - 8 in the original paper - each learning different relationships, concatenated) → **residual connections** (bypass paths adding earlier-stage values, e.g. positional encoding output, back onto later outputs, e.g. self-attention output - *"allowing the self-attention layer to establish relationships among input words without having to also preserve the word embedding and positional coding information"*) → **layer normalization** (stabilizes training for larger vocabularies/longer sequences) → **encoder-decoder attention** (decoder's Queries attend to encoder's Keys/Values, so the decoder *"keeps track of the significant words in the input"* - same "don't eat the pizza" stakes as §5.a) → FC + softmax output.
>
> **Masked self-attention**: in the original encoder-decoder Transformer, masking (restricting attention to the current + preceding tokens) is applied only to the *decoder's* self-attention during training, so it can't "cheat" by looking ahead at future tokens.

### 6.b Transformer vs RNN Encoder-Decoder

| | RNN | Transformer |
|-|-----|-------------|
| Processing | Sequential: $h^{(t)}$ depends on $h^{(t-1)}$ | All positions **in parallel** |
| Dependency path | $T$ steps between distant positions | $O(1)$ via self-attention |
| Positional info | Implicit in recurrent order | Explicit positional encoding (sinusoidal or learned) |
| Multi-head | - | $H$ independent heads; concatenate outputs |

> [!insight] Why This Matters
> In an RNN, information from step 1 must survive $T{-}1$ transformations to reach step $T$. In a Transformer, every pair of positions attends to each other directly in a single layer - drastically reducing the path length for long-range information.

<div style="display:flex; gap:1.25rem; flex-wrap:wrap; align-items:flex-start;">
<figure style="flex:1; min-width:240px; margin:0;">

![Scaled Dot-Product Attention](/assets/images/diagrams/nntikz_dot_product_attention.png)

<figcaption><em>Scaled Dot-Product Attention</em></figcaption>
</figure>
<figure style="flex:1; min-width:240px; margin:0;">

![Transformer Architecture - Encoder & Decoder](/assets/images/diagrams/nntikz_transformer.png)

<figcaption><em>Transformer Architecture - Encoder & Decoder</em></figcaption>
</figure>
</div>

### 6.c Decoder-Only Transformers (GPT-style)

A decoder-only Transformer (e.g., GPT/ChatGPT's architecture) collapses the encoder-decoder split into a **single autoregressive unit**.

> [!insight] Three Structural Differences vs. a Full Encoder-Decoder Transformer
> 1. **One unit, not two** - a single block does both "encoding" the prompt and generating the output, instead of separate encoder + decoder units.
> 2. **One attention type, not two** - only **masked self-attention** is used; there is no separate encoder-decoder attention.
> 3. **Masking applies everywhere, always** - the full Transformer masks only the *decoder's* self-attention during training; decoder-only models apply masked self-attention to *both* input and output, at all times, *"allowing the Transformer to learn how to generate the correct output without cheating and looking ahead."*

**Masked self-attention** = each token compares itself only to itself and *preceding* tokens - hence **autoregressive**. Training objective: next-token prediction over known documents (e.g., predict "awesome `<EOS>`" from context - both tokens' math computed simultaneously since the target is known in advance, unlike step-by-step generation). At inference, each generated token is fed back through the embedding layer and the loop repeats until `<EOS>`.

### 6.d Encoder-Only Transformers (BERT-style)

> [!note] Historical Framing
> The original 2017 Transformer was a full encoder-decoder translation ("seq2seq") model. Researchers later found each *half* works alone: decoder-only → generative LLMs (ChatGPT); **encoder-only → BERT-style models** for embeddings, classification, and retrieval.

An encoder-only Transformer keeps just the three foundational building blocks - **word embedding** (→ numbers), **positional encoding** (→ word order), **self-attention** (→ in-phrase relationships) - with *no* masking and *no* encoder-decoder attention.

> [!insight] Context-Aware (Contextualized) Embeddings
> Stacking these three layers produces, for each token, *"a new kind of embedding that takes position and relationships among words into account"* - a **context-aware / contextualized embedding**. This is the term that distinguishes BERT-style output from a plain Word2Vec embedding (§4), and is the foundation of three downstream uses:
> 1. **Clustering** similar sentences/documents.
> 2. **RAG (Retrieval-Augmented Generation)**: chunk a document → embed each chunk with the encoder → embed the user's prompt → retrieve the most-similar chunks by vector similarity.
> 3. **Classification**: feed context-aware embeddings into a classifier network or as predictors in logistic regression (e.g., sentiment analysis).

Even though decoder-only models "get all the hype," encoder-only context-aware embeddings remain the workhorse behind clustering, classification, and RAG retrieval.

---

## 7. Backpropagation Through Time (BPTT)

> [!danger] Tidak Keluar di Ujian - Dikonfirmasi
> BPTT **dipastikan tidak keluar di ujian sama sekali** ("gak ada backtracking sama sekali") - bagian ini boleh dilewati sepenuhnya, tidak perlu dipelajari lagi.

BPTT trains recurrent networks by unrolling them into a deep feed-forward network (with shared weights), then applying standard backpropagation.

### 7.a BPTT Procedure

1. **Forward** - Compute all $h^{(t)}$ and $o^{(t)}$ for the full sequence.
2. **Loss** - Compute total loss $E = \sum_t E_t$ (e.g., cross-entropy at each output step).
3. **Backward** - Compute $\partial E / \partial W_{xh},\; \partial E / \partial W_{hh},\; \partial E / \partial W_{ho}$ by accumulating gradients across all timesteps (shared weights).
4. **Update** - Apply accumulated gradients via SGD / Adam to the shared weight matrices.

> [!warn] Truncated BPTT
> Backpropagation is limited to $k$ steps back for very long sequences. Reduces memory and computation at the cost of not learning ultra-long-range dependencies.

---

## 8. Reinforcement Learning

RL is a paradigm where an **agent** learns a **policy** through interaction with an **environment**, using **reward signals** as the only feedback. No labeled examples - the agent discovers good behavior via trial and error.

### 8.a RL vs Supervised Learning

| | Supervised Learning | Reinforcement Learning |
|-|---------------------|------------------------|
| Input | Labeled pairs $(x, y)$ | No labels; reward $R_t$ |
| Feedback timing | Immediate, correct answer given | Delayed; reward may come much later |
| Actions affect future? | No | Yes - actions influence future states |
| Goal | Minimize prediction error | Maximize cumulative reward |

> [!note] Reward Hypothesis
> All goals can be described as maximizing the expected cumulative reward. Central hypothesis of RL.

### 8.b Agent-Environment Loop

At each timestep $t$: agent observes $S_t$, selects action $A_t$, environment returns reward $R_{t+1}$ and next state $S_{t+1}$.

$$H_t = O_1, R_1, A_1,\; O_2, R_2, A_2,\; \ldots,\; A_{t-1}, O_t, R_t$$

$$S_t^a = f(H_t)$$

Agent state is any function of the history. In fully observable environments $S_t^a = S_t^e$.

### 8.c Return & Discounted Return

**Undiscounted:**

$$G_t = R_{t+1} + R_{t+2} + \cdots = \sum_{k=0}^{\infty} R_{t+k+1}$$

**Discounted:**

$$G_t = \sum_{k=0}^{\infty} \gamma^k\, R_{t+k+1}, \quad 0 \leq \gamma \leq 1$$

$\gamma = 0$: only immediate reward. $\gamma \to 1$: all future rewards equally valued. Ensures sum converges; reflects that near-term rewards are more certain.

### 8.d Value Functions & Policy

$$v(s) = \mathbb{E}\!\left[G_t \;\middle|\; S_t = s\right] \quad\text{(state-value)}$$

$$q(s,a) = \mathbb{E}\!\left[G_t \;\middle|\; S_t = s,\; A_t = a\right] \quad\text{(action-value)}$$

$$A = \pi(S) \quad\text{(deterministic)} \qquad \pi(A \mid S) = P(A_t = a \mid S_t = s) \quad\text{(stochastic)}$$

| Component | Description |
|-----------|-------------|
| Policy | Agent's behavior function - maps states to actions or distributions |
| Value Function $v(s)$ | Expected future reward from state $s$ |
| Action-Value $q(s,a)$ | Expected future reward from taking action $a$ in state $s$ |
| Model (optional) | Predicts $S_{t+1}$ and $R_{t+1}$ given $S_t, A_t$ - not always learned |
| Model-Free | Learns from raw experience (Q-learning, SARSA) |
| Model-Based | Builds environment model to plan ahead |

### 8.e Q-Learning & SARSA

Both learn an **action-value function** $Q(s,a)$. The only difference is *which next-step value is used as the bootstrap target*:

**Q-Learning (Off-Policy):**

$$Q(s_t, a_t) \leftarrow Q(s_t, a_t) + \alpha\,\delta_t$$

$$\delta_t = r_{t+1} + \gamma \cdot \max_{a}\, Q(s_{t+1}, a) - Q(s_t, a_t)$$

Bootstraps from the *greedy best action* in $s_{t+1}$, regardless of what was actually taken. Learns optimal policy even while exploring.

**SARSA (On-Policy):**

$$Q(s_t, a_t) \leftarrow Q(s_t, a_t) + \alpha\,\delta_t$$

$$\delta_t = r_{t+1} + \gamma \cdot Q(s_{t+1}, a_{t+1}) - Q(s_t, a_t)$$

Bootstraps from the value of the *next action actually chosen* by the current policy.

> [!insight] SARSA Name Origin
> The update uses the tuple $(S_t,\, A_t,\, R_{t+1},\, S_{t+1},\, A_{t+1})$ - five elements, hence "SARSA".

| | Q-Learning | SARSA |
|-|------------|-------|
| Type | Off-policy | On-policy |
| Bootstrap target | $\max_a Q(s',a)$ | $Q(s', a')$ where $a'$ is actually taken |
| Behavior | Optimistic - assumes best future action | Conservative - penalizes risky explorations |
| Convergence | To $Q^*$ regardless of exploration policy | To optimal for current exploration strategy |
| Differ when | $a_{t+1} \neq \arg\max_a Q(s_{t+1},a)$ | Same condition |

![Q-Learning vs SARSA - Bootstrap Target Comparison](/assets/images/diagrams/qlearning_sarsa.png)
*Q-Learning vs SARSA - Bootstrap Target Comparison*

### 8.f Optimal Policy & Grid World

After training, $\pi^*$ selects $\arg\max_a Q(s,a)$ in each state. A single episode updates only visited states - the rest remain unchanged.

> [!note] Episode Example
> Path $(2,1) \to (2,2) \to (3,2) \to (3,3)$ with $\alpha=0.5,\, \gamma=0.7$, $R=0$ except $R((1,3),D)=10$, $R((2,2),D)=-5$, $R((3,2),R)=-10$. Only $Q((2,1),R)$, $Q((2,2),D)$, $Q((3,2),R)$ are updated. Policy at $(3,2)$ changes from "↑ or →" to "↑ only" because $Q((3,2), R)$ falls sharply from reward $-10$.

> [!example] Hand-worked Updates (TD Q-Learning vs SARSA)
> **TD Q-Learning** - $Q(s,a) \leftarrow Q(s,a) + \alpha[R + \gamma\max_{a'}Q(s',a') - Q(s,a)]$:
> - $Q((2,1),R) = 2 + 0.5[0 + 0.7\max(2,2,1,-1) - 2] = 2 + 0.5(0.7{\cdot}2 - 2) = \mathbf{1.7}$
> - $Q((2,2),D) = -1 + 0.5[-5 + 0.7\max(2,1,2,-) - (-1)] = -1 + 0.5(-5 + 1.4 + 1) = \mathbf{-2.3}$
> - $Q((3,2),R) = 2 + 0.5[-10 + 0.7{\cdot}0 - 2] = 2 + 0.5(-12) = \mathbf{-4}$ (next state $(3,3)$ is terminal $\Rightarrow \max_{a'}Q=0$)
>
> **SARSA** - $Q(s,a) \leftarrow Q(s,a) + \alpha[R + \gamma Q(s',a') - Q(s,a)]$, bootstrapping off the action *actually taken* next ($a'_{(2,2)}=D$, $a'_{(3,2)}=R$):
> - $Q((2,1),R) = 2 + 0.5[0 + 0.7{\cdot}Q((2,2),D){=}{-1} - 2] = 2 + 0.5(-0.7 - 2) = \mathbf{0.65}$ - *differs from Q-Learning* because the episode's actual next action ($D$, value $-1$) isn't the greedy max ($R$ or $L$, value $2$)
> - $Q((2,2),D) = -1 + 0.5[-5 + 0.7{\cdot}Q((3,2),R){=}2 - (-1)] = \mathbf{-2.3}$ - coincides with Q-Learning since the actual next action $R$ *is* the greedy max at $(3,2)$
> - $Q((3,2),R) = \mathbf{-4}$ - identical to Q-Learning (terminal next state, both bootstrap off $0$)
>
> Net result: **the resulting optimal policy is identical** for both methods (only the magnitude of $Q((2,1),\to)$ differs, $1.7$ vs $0.65$ - the arrow direction doesn't flip).

![Grid World - Q-values and optimal policy after the episode (2,1)→(2,2)→(3,2)→(3,3), TD Q-Learning numbers shown; SARSA yields an identical policy](/assets/images/diagrams/rl_gridworld_qvalues_policy.png)
*Grid World - Q-values & Optimal Policy after the Episode (border-point dual-arrow view; values updated by the episode highlighted in red)*

### 8.g Policy Gradients: RL with Neural Networks

Q-tables only work for discrete, enumerable state spaces. To handle **continuous** states, replace the table with a **policy network**: it takes the state directly as input (e.g., a continuous "hunger level" $\in [0,1]$) and outputs **action probabilities** (via sigmoid/softmax) - no Q-values needed.

> [!insight] The "Guess-Then-Correct" Trick
> Standard backprop needs a target/error to compute a derivative - but in RL we don't *know* the ideal action in advance (was going to Norm's or Squatch's the better call?). The fix: **make a guess** that the action just taken *was* the ideal one (set its target probability to 1.0), compute the ordinary cross-entropy derivative from that guess, then **multiply the derivative by the reward** ($+1$ if the guess paid off, $-1$ if not). A wrong guess gets its derivative *flipped* by the negative reward - turning an unsupervised problem into something gradient descent can consume. Reward magnitude scales the step size too (e.g., $\pm 2.0$ doubles it), so rewards need not be literally $\pm 1$, just correctly signed and scaled.

**Worked mechanic** (StatQuest): sample an action from $P(\text{action})$ → assume it was correct (target $=1.0$) → cross-entropy $C = -\log(P)$ → chain-rule derivative $\dfrac{\partial C}{\partial b} = \dfrac{\partial C}{\partial P}\cdot\dfrac{\partial P}{\partial x}\cdot\dfrac{\partial x}{\partial b}$ (where $x = \text{input}\times w + b$ feeds a sigmoid) → `updated_derivative = derivative × reward` → `step = lr × updated_derivative` → `new_bias = old_bias − step`. Identical chain-rule machinery to ordinary backprop - the *only* new ingredient is the reward multiplication. After convergence, the network outputs a smooth probability curve over the entire continuous state range (something a finite Q-table structurally cannot do).

---

## 9. Reinforcement Learning with Human Feedback (RLHF)

RLHF is the pipeline that turns a raw next-token-prediction model into an **aligned**, helpful assistant (e.g., ChatGPT, DeepSeek) - *"alignment"* meaning the model's behavior matches how humans actually want to use it.

> [!note] The Four-Stage Pipeline
> 1. **Pre-training**: train an untrained decoder-only Transformer (§6.c) to predict the next token over a massive corpus (e.g., all of Wikipedia). Result: fluent but **unaligned** - asked "What is StatQuest?" it might just continue with "blah blah blah" instead of answering.
> 2. **Supervised Fine-Tuning (SFT)**: fine-tune on a small, *expensive* set of (prompt, ideal human-written response) pairs via ordinary backprop. Aligns the model somewhat, but the dataset is too small to generalize - the model **overfits**, answering trained prompts well and novel ones poorly.
> 3. **Reward Model Training**: writing full ideal responses by hand doesn't scale ("would cost a super huge amount of money"), but **ranking pairs of responses** ("which do you prefer?") is cheap. Copy the SFT model, swap its unembedding layer for a single scalar output, and train it on these human preference comparisons to output high reward for preferred responses and low/negative reward for rejected ones.
> 4. **RL Fine-Tuning (PPO)**: use the trained reward model as the reward signal to further train the SFT model via reinforcement learning (typically PPO) on *fresh* prompts - generating responses, scoring them with the reward model, and updating the policy. This sidesteps the need for a second giant hand-labeled dataset.

> [!insight] Reward-Model Loss - Learning the Reward Scale
> From Ouyang et al. (2022, InstructGPT): loss $\propto -\log\,\sigma(r_{\text{better}} - r_{\text{worse}})$. If $r_{\text{better}}$ is positive and $r_{\text{worse}}$ is negative, their difference is large positive → $\sigma(\cdot) \approx 1$ → $\log(\cdot) \approx 0$ (high) → negate for gradient *descent* (which minimizes, but we want to *maximize* the gap). The elegant payoff: **the model learns the actual numeric reward scale on its own** from relative comparisons - no need to hand-define "good response = 8.3 points." This mirrors the same "let the model learn the scale, don't hand-specify it" spirit as the guess-then-correct trick in §8.g.

**Exam soundbite**: *RLHF lets a model learn what "good" looks like from comparative human judgments (cheap to collect at scale) rather than needing exhaustive human-authored gold-standard answers (expensive to collect).*

---

## 10. Glossary

| Term | Definition |
|------|------------|
| IID | Independent & Identically Distributed - standard ML assumption violated by sequential data |
| Parameter Sharing | Same weight matrices $W_{xh}, W_{hh}, W_{ho}$ used at every RNN timestep |
| Vanishing Gradient | Gradients shrink exponentially during BPTT; solved by LSTM cell state highway |
| Cell State | LSTM long-term memory highway - regulated by forget / input gates |
| Context Vector | $c_t = \sum_j \alpha_{tj} h_j$ - weighted sum of encoder states used by decoder |
| Alignment Score | $e_{tj}$ measures relevance of encoder position $j$ to decoder step $t$ |
| Self-Attention | Computes pairwise relationships between all token pairs in parallel |
| Q / K / V | Query, Key, Value - three learned linear projections in Transformer self-attention |
| Scaled Dot-Product | $\text{Sa}[X] = V \cdot \text{Softmax}[K^\top Q / \sqrt{D_q}]$ |
| Return $G_t$ | $\sum_{k=0}^\infty \gamma^k R_{t+k+1}$ - cumulative discounted reward from step $t$ |
| Value $v(s)$ | $\mathbb{E}[G_t \mid S_t = s]$ - expected return from state $s$ |
| Policy $\pi$ | Agent's behavior; deterministic $A=\pi(S)$ or stochastic $\pi(A\|S)$ |
| Q-Learning | Off-policy TD: bootstraps from $\max_a Q(s',a)$ - converges to $Q^*$ |
| SARSA | On-policy TD: bootstraps from $Q(s',a')$ where $a'$ is actually taken |
| TD Error $\delta_t$ | $r_{t+1} + \gamma\,Q(s_{t+1},\cdot) - Q(s_t,a_t)$ - correction signal for both algorithms |
| Word Embedding | Multi-dimensional vector representation of a word; trained weights from one-hot input → identity-activation layer |
| Word2Vec / CBOW / Skip-gram | Embedding training schemes - CBOW predicts the middle word from context, skip-gram predicts context from the middle word |
| Negative Sampling | Approximation trick: update weights only for a true target + a few random "negative" words instead of the full vocabulary softmax |
| Teacher Forcing | Training trick: feed the decoder the *known correct* token (not its own prediction) at each step, to stabilize learning |
| Masked Self-Attention | Restricts attention to the current + preceding tokens - enables autoregressive (left-to-right) generation |
| Context-Aware (Contextualized) Embedding | BERT-style per-token embedding produced by stacking word embedding + positional encoding + self-attention; foundation of RAG, clustering, classification |
| Policy Gradient | RL method where a neural net outputs action probabilities directly; trained via the "guess the action was ideal, then multiply the derivative by the reward" trick |
| RLHF | Pipeline (pretrain → SFT → reward model from human preference comparisons → PPO fine-tuning) that aligns an LLM's behavior to human preferences |
| Alignment | How well a model's behavior matches how humans actually want to use it - the goal of SFT + RLHF |

---

*Goodfellow et al. (2016) · Hochreiter & Schmidhuber (1997) · Mikolov et al. (2013) · Bahdanau et al. (2015) · Vaswani et al. (2017) · Ouyang et al. (2022) · Sutton & Barto (2018) · IF3270 Lecture Decks 5–9 · Attention & Transformer diagrams: Fraser Love, NNTikZ (2024) · StatQuest (Josh Starmer) video explainers - RNN, LSTM, Word2Vec, Seq2Seq, Attention, Transformer, RL & RLHF*

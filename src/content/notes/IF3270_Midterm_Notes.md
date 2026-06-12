---
title: IF3270 ML — Neural Networks from Scratch (Midterm Notes)
course: IF3270
subject: Pembelajaran Mesin
exam: Midterm
topics: [Perceptron, Delta Rule & Adaline, Gradient Descent, FFNN & MLP, Backpropagation, Activation Functions, CNN, Convolution, Pooling, LeNet-5]
references: Goodfellow et al. (2016) Deep Learning, LeCun et al. (1989 1998), Mitchell (1997), Raschka et al. (2022), IF3270 Lecture Slides
order: 1
date: "2026-06-12"
---

## 1. The Perceptron

### 1.a Biological Motivation

McCulloch and Pitts (1943) described a neuron as a simple logic gate with binary outputs.

- **Dendrites → x** — receive input signals; analogous to input features $x_1, x_2, \ldots, x_m$
- **Synapse strength → w** — connection strength; analogous to weights $w_i$
- **Cell body → Σ** — integrates all incoming signals; analogous to weighted sum $\mathbf{w}^T\mathbf{x}$
- **Axon firing → f(net)** — fires only when threshold is exceeded; analogous to activation function

### 1.b Formal Definition

Given real-valued input $\mathbf{x}=(x_1,\ldots,x_m)$, weight vector $\mathbf{w}=(w_1,\ldots,w_m)$, and bias $w_0$ (also written $b$ or $\theta$). Hypothesis space: $H = \{\mathbf{w} \mid \mathbf{w} \in \mathbb{R}^{d+1}\}$.

$$z = w_0 + w_1 x_1 + w_2 x_2 + \cdots + w_m x_m = \mathbf{w}^T\mathbf{x}$$

**Sign Function (output ±1) — Perceptron Training Rule:**

$$\hat{y} = \sigma(z) = \begin{cases} +1 & z > 0 \\ -1 & \text{otherwise} \end{cases}$$

**Step Function (output 0/1) — Alternative Notation:**

$$\hat{y} = \sigma(z) = \begin{cases} 1 & z \geq 0 \\ 0 & \text{otherwise} \end{cases}$$

Both produce a *discrete-valued* output. The perceptron represents a **hyperplane decision surface** in $\mathbb{R}^n$.

### 1.c m-of-n Functions

A perceptron easily represents **m-of-n functions**: functions where at least $m$ of the $n$ inputs must be true. Set all input weights to the same value, then set threshold $w_0$.

$$\text{AND } (m=n): \quad \hat{y} = \text{sign}(x_1 + x_2 - 1)$$
$$\text{OR } (m=1): \quad \hat{y} = \text{sign}(2x_1 + 2x_2 - 1)$$

Example: AND with $w_0=-0.8,\; w_1=w_2=0.5$. Only when $x_1=x_2=1$ gives $\Sigma = 0.2 > 0 \Rightarrow +1$.

> [!warn] The XOR Problem (Minsky & Papert, 1969)
> A single perceptron can only solve *linearly separable* problems. XOR cannot be separated by any hyperplane — no single perceptron can learn it. This drove the development of multi-layer networks.

### 1.d Perceptron Training Rule

Uses the **thresholded** output for the update signal. Proven to converge if training data is linearly separable and learning rate $\eta$ is sufficiently small.

**Algorithm (Mitchell 1997):**
1. **Input:** Training data $D = \{\langle\mathbf{x}_i, y_i\rangle\}$, learning rate $\eta$, activation: sign or step
2. **Init:** Set each $w_k \leftarrow 0$ or small random value. Set $E \leftarrow 0$.
3. **Repeat** for each example $\langle\mathbf{x}_i, y_i\rangle$:
   - Compute prediction: $o_i \leftarrow \text{sign}(\mathbf{w}^T\mathbf{x}_i)$
   - If $o_i \neq y_i$: update $w_j \leftarrow w_j + \Delta w_j$ where $\Delta w_j = \eta(y_i - o_i)x_{ij}$
   - Update error: $E \leftarrow E + (y_i - o_i)$
4. **Until:** All examples correctly classified ($E=0$), or max epochs reached.

$$w_j \leftarrow w_j + \Delta w_j, \qquad \Delta w_j = \eta\,(y_i - o_i)\,x_{ij}$$

Where: $\eta$ = learning rate · $y_i$ = true label (±1) · $o_i$ = predicted label (thresholded) · $x_{ij}$ = $j$-th feature of example $i$. If correct: $y_i = o_i \Rightarrow \Delta w_j = 0$ (no update).

> [!insight] Convergence Theorem
> The Perceptron Training Rule is guaranteed to converge in a finite number of steps if the training data is linearly separable and $\eta$ is sufficiently small. It does **not** converge if data is not linearly separable.

### 1.e The Delta Rule (Batch Gradient Descent)

When data is NOT linearly separable, the Perceptron rule fails. The **Delta Rule** (= Widrow-Hoff rule = LMS rule = Adaline rule) uses the *unthresholded linear output* and minimizes SSE — always converges to best-fit approximation.

**Error Function — Sum of Squared Errors (SSE):**

$$E(\mathbf{w}) = \frac{1}{2}\sum_{d \in D}(y_d - o_d)^2$$

Where $o_d = \mathbf{w}^T\mathbf{x}_d$ is the *linear (unthresholded)* output. The $\frac{1}{2}$ factor simplifies the derivative.

**Gradient Vector:**

$$\nabla E(\mathbf{w}) = \left[\frac{\partial E}{\partial w_0},\;\frac{\partial E}{\partial w_1},\;\ldots,\;\frac{\partial E}{\partial w_d}\right]$$

$$\frac{\partial E}{\partial w_k} = \sum_{d\in D}(y_d - o_d)(-x_{dk})$$

**Training Rule:**

$$\mathbf{w} \leftarrow \mathbf{w} + \Delta\mathbf{w}, \qquad \Delta\mathbf{w} = -\eta\,\nabla E(\mathbf{w})$$

$$\Delta w_k = \eta\sum_{d \in D}(y_d - o_d)(x_{dk})$$

Weights updated *once per epoch* after accumulating $\Delta w_k$ over all $D$.

### 1.f Stochastic & Mini-Batch Gradient Descent

| Variant | Update Rule | Notes |
|---------|-------------|-------|
| **Batch GD** | $\Delta w_k = \eta\sum_{d \in D}(y_d - o_d)(x_{dk})$ | One update per epoch. Stable, but slow for large datasets. Can get stuck in local minima. |
| **Stochastic (Incremental) GD** | $\Delta w_k = \eta\,(y_d - o_d)(x_{dk})$ | One update per example. Faster, noisier gradient — can escape local minima. |

- **Epoch** — one full pass through all training data
- **Batch Size** — number of samples per mini-batch; if = 1 → true SGD; if = |D| → Batch GD; if 1 < b < |D| → Mini-batch SGD
- **Step** — processing one mini-batch, ending with one weight update. Steps per epoch = |D| / batch_size

> [!note] Key Distinction
> Perceptron Training Rule uses *thresholded* output (sign/step) — only converges if linearly separable. Delta Rule / Batch GD uses *unthresholded linear* output — converges to best-fit regardless of separability.

---

## 2. Feedforward Neural Network (FFNN)

### 2.a From Adaline to FFNN

**Adaline** (ADAptive LInear NEuron) is a single-layer neural network and the direct bridge from the Perceptron to FFNN. It uses the *identity* activation for weight updates, and applies a threshold only at inference time.

$$w = w + \Delta w, \quad b = b + \Delta b \qquad (b = w_0)$$
$$\Delta w_j = -\eta\,\frac{\partial E}{\partial w_j}, \quad \Delta b = -\eta\,\frac{\partial E}{\partial b}$$
$$E = \frac{1}{2}(y_i - o_i)^2, \qquad \hat{y} = o = f\!\left(\sum_j w_j x_j + b\right)$$

The activation function $f$ here is the identity (linear). Threshold applied only at inference to produce class label 0 or 1. Multiple names: Delta Rule = LMS = Widrow-Hoff = Adaline.

### 2.b FFNN Architecture

- **Input Layer (l=0)** — receives feature vector $\mathbf{x}$; no computation; width = number of features; convention: $x_0 = +1$ (bias)
- **Hidden Layers** — learn internal representations; one or more layers; non-linear activation required
- **Output Layer** — produces $\hat{\mathbf{y}}$; width = number of classes (classification) or 1 (regression)
- **Depth** — number of layers (hidden + output); deeper → learns more abstract, hierarchical features
- **Width** — neurons per layer; wider → more capacity but more parameters; notated as $n_{h_1}, n_{h_2}, \ldots$
- **Fully Connected** — every neuron in layer $l$ connects to every neuron in layer $l+1$ with a unique weight $w_{ji}$

### 2.c Forward Propagation

**Goodfellow Notation — General Forward Pass:**

$$\mathbf{h}^{(0)} = \mathbf{x}$$

$$\text{for } k = 1, \ldots, l:\quad \mathbf{a}^{(k)} = \mathbf{b}^{(k)} + W^{(k)}\mathbf{h}^{(k-1)},\quad \mathbf{h}^{(k)} = f\!\left(\mathbf{a}^{(k)}\right)$$

$$\hat{\mathbf{y}} = \mathbf{h}^{(l)}, \qquad J = L(\hat{\mathbf{y}},\,\mathbf{y}) + \lambda\,\Omega(\theta)$$

Where: $\mathbf{a}^{(k)}$ = pre-activation at layer $k$ · $\mathbf{h}^{(k)}$ = post-activation · $W^{(k)}$ = weight matrix · $\mathbf{b}^{(k)}$ = bias vector · $J$ = total cost · $L$ = loss function · $\lambda\Omega(\theta)$ = regularization

**Compact Notation ($W_{xh}$ / $W_{hy}$ style):**

$$f(\mathbf{x};\,W_{xh},\mathbf{c},\,W_{hy},\mathbf{b}) = f_2\!\left(W_{hy}^T\cdot f_1\!\left(W_{xh}^T\cdot\mathbf{x}+\mathbf{c}\right)+\mathbf{b}\right)$$

**Mini-Batch X Notation:**

$$f(\mathbf{X};\,W_{xh},\mathbf{c},\,W_{hy},\mathbf{b}) = f_2\!\left(f_1\!\left(\mathbf{X}W_{xh}+\mathbf{c}\right)\cdot W_{hy}+\mathbf{b}\right)$$

$\mathbf{X}$ is the mini-batch matrix of shape $[n_\text{samples} \times n_\text{features}]$. When using batches: $\mathbf{X}W_{xh}$ vs single input: $W_{xh}^T\mathbf{x}$.

### 2.d Number of Parameters

$$\text{Params for layer } k = (n_{k-1}+1)\times n_k$$

$$\text{Total} = \sum_{k=1}^{L}(n_{k-1}+1)\times n_k$$

Where $+1$ accounts for the bias weight per neuron. Example (Raschka): input=8, h1=12, h2=8, output=1 → $(8+1)\times12 + (12+1)\times8 + (8+1)\times1 = 108+104+9 = \mathbf{221}$ total params.

### 2.e Worked Example: XOR with Sigmoid

$$h_1 = \sigma(-10 + 20x_1 + 20x_2), \quad h_2 = \sigma(30 - 20x_1 - 20x_2)$$

$$y = \sigma(-30 + 20h_1 + 20h_2), \qquad \text{where}\quad \sigma(z) = \frac{1}{1+e^{-z}}$$

- Input $(0,0)$: $h_1\approx 0, h_2\approx 1 \Rightarrow y\approx 0$ ✓
- Input $(0,1)$: $h_1\approx 1, h_2\approx 1 \Rightarrow y\approx 1$ ✓
- Input $(1,1)$: $h_1\approx 1, h_2\approx 0 \Rightarrow y\approx 0$ ✓

---

## 3. Activation Functions & Loss Functions

### 3.a Why Non-linearity?

> [!note] Universal Approximation Theorem
> A single hidden layer with sufficient neurons can approximate any continuous function to arbitrary accuracy. However, *deep* networks require exponentially fewer neurons than shallow networks for the same approximation quality, generalize better, and empirically outperform shallow networks. Test accuracy improves as depth increases; CNNs consistently outperform fully-connected nets with the same parameter count.

Without non-linearity, stacking any number of layers collapses to a single linear transformation.

### 3.b Common Activation Functions

| Function | Formula | Range | Notes |
|----------|---------|-------|-------|
| **Step / Sign** | $f(z)=\begin{cases}1 & z\ge0\\0 & \text{else}\end{cases}$ | {0,1} or {±1} | Perceptron. Non-differentiable → cannot use in backprop. |
| **Sigmoid (σ)** | $\sigma(z)=\frac{1}{1+e^{-z}}$ | (0, 1) | Output as probability. Vanishing gradient for large \|z\|. |
| **Tanh** | $\tanh(z)=\frac{e^z-e^{-z}}{e^z+e^{-z}}$ | (−1, 1) | Zero-centered. Stronger gradients than sigmoid. Used in LeNet-5. |
| **ReLU** | $f(z)=\max(0,z)$ | [0, ∞) | Most popular for hidden layers. No vanishing gradient for $z>0$. Suffers from dying ReLU. |
| **Leaky ReLU** | $f(z)=\max(\alpha z,\,z),\;\alpha\ll1$ | (−∞, ∞) | Fixes dying ReLU. Small slope $\alpha\approx0.01$ for negative inputs. |
| **Softmax** | $\sigma(\mathbf{z})_k=\frac{e^{z_k}}{\sum_j e^{z_j}}$ | (0,1), sum=1 | Output layer for multi-class. Converts logits to probability distribution. |

**Key Derivatives (required for Backprop):**

$$\sigma'(z) = \sigma(z)\bigl(1-\sigma(z)\bigr)$$

$$\tanh'(z) = 1 - \tanh^2(z)$$

$$\text{ReLU}'(z) = \begin{cases}1 & z>0\\0 & z\le0\end{cases}$$

Sigmoid and tanh derivatives become very small near saturation → vanishing gradient. ReLU derivative is either 0 or 1 — no vanishing gradient for positive inputs.

### 3.c Loss Functions

**Mean Squared Error (MSE) — Regression:**

$$L(y,\hat{y}) = \frac{1}{n}\sum_{i=1}^n(y_i - \hat{y}_i)^2$$

Use with linear output activation. Penalizes larger errors quadratically.

**Binary Cross-Entropy — Binary Classification:**

$$L(y,\hat{y}) = -\frac{1}{n}\sum_i\Bigl[y_i\log\hat{y}_i + (1-y_i)\log(1-\hat{y}_i)\Bigr]$$

Use with sigmoid output.

**Categorical Cross-Entropy — Multi-Class Classification:**

$$L(y,\hat{y}) = -\sum_{c=1}^C y_c\log\hat{y}_c$$

Use with softmax output for $C$ classes. $y_c=1$ for the true class, 0 otherwise (one-hot encoding).

---

## 4. Backpropagation

### 4.a Three-Step Learning Procedure

1. **Forward Propagation:** Compute output $\hat{y}$ for input $\mathbf{x}$. Cache all pre-activations $\mathbf{a}^{(k)}$ and post-activations $\mathbf{h}^{(k)}$.
2. **Backward Propagation:** Compute error term $\delta$ for each unit. The target for hidden units is NOT directly available — it must be inferred from output deltas via the chain rule.
3. **Weight Update:** Update every weight using the computed gradients and learning rate $\eta$.

### 4.b Output Unit Gradient (with Sigmoid)

Using the chain rule for weight connecting unit $i$ to output unit $j$:

$$\frac{\partial E_d}{\partial w_{ji}} = \frac{\partial E_d}{\partial o_j}\cdot\frac{\partial o_j}{\partial\,\text{net}_j}\cdot\frac{\partial\,\text{net}_j}{\partial w_{ji}} = -(t_j-o_j)\,o_j(1-o_j)\,x_{ji}$$

**Output unit error signal δ:**

$$\delta_j = o_j(1-o_j)(t_j - o_j)$$

$$\therefore\quad \frac{\partial E_d}{\partial w_{ji}} = -\delta_j\,x_{ji}$$

$\delta_j$ captures how wrong the output is, scaled by how sensitive the activation is at that operating point.

### 4.c Hidden Unit Gradient

For hidden unit $h$, no direct target is available. Back-propagate error from all output units $k$ that receive from $h$:

$$\delta_h = o_h(1-o_h)\sum_{k\,\in\,\text{outputs}(h)} w_{kh}\,\delta_k$$

$$\therefore\quad \frac{\partial E_d}{\partial w_{ji}} = -\delta_h\,x_{ji}$$

$\delta_h$ is a weighted sum of output deltas — this is the "propagating error backward" step.

### 4.d Weight Update (same for all layers)

$$w_{ji} \leftarrow w_{ji} + \Delta w_{ji}, \qquad \Delta w_{ji} = \eta\,\delta_j\,x_{ji}$$

### 4.e Full Backpropagation Algorithm (Mitchell, 1997)

**BACKPROPAGATION(training_examples, η, n_in, n_out, n_hidden):**

1. **Init:** Create feed-forward network. Initialize all weights to small random values (e.g., between −0.05 and 0.05).
2. **Repeat** until termination (fixed iterations / training error < threshold / validation criterion met). For each $\langle\mathbf{x}, \mathbf{t}\rangle$ in training_examples:
   1. **Forward pass:** Compute output $o_u$ of every unit $u$.
   2. **Output deltas:** For each output unit $k$: $\delta_k \leftarrow o_k(1-o_k)(t_k - o_k)$
   3. **Hidden deltas:** For each hidden unit $h$: $\delta_h \leftarrow o_h(1-o_h)\sum_{k\,\in\,\text{outputs}}w_{kh}\,\delta_k$
   4. **Update weights:** $w_{ji} \leftarrow w_{ji} + \eta\,\delta_j\,x_{ji}$

> [!insight] Computational Efficiency
> One backward pass computes gradients for ALL parameters simultaneously, reusing cached forward-pass values. This makes deep network training feasible.

### 4.f Common Training Problems

| Problem | Cause | Fix |
|---------|-------|-----|
| **Vanishing Gradient** | Gradients shrink exponentially through deep layers | ReLU, residual connections, batch normalization |
| **Exploding Gradient** | Gradients grow exponentially → unstable (NaN) | Gradient clipping, careful initialization |
| **Local Minima** | Batch GD can get stuck | SGD noise helps escape |
| **Bad Learning Rate η** | Too small → slow; too large → diverges | LR schedules, adaptive optimizers (Adam) |
| **Overfitting** | Network memorizes training data | Dropout, L1/L2 regularization $\lambda\Omega(\theta)$, early stopping |
| **Dying ReLU** | Neurons always output 0 → zero gradient → never recover | Leaky ReLU ($\alpha=0.01$), He initialization |

---

## 5. Convolutional Neural Network (CNN)

An ANN that replaces general matrix multiplication with the *convolution operation* in at least one layer. Explicitly assumes inputs have grid-like (spatial) topology. (LeCun et al. 1989, 1998; Goodfellow et al. 2016)

### 5.a Why CNN? — The Problem with FFNN on Images

> [!warn] Dimensionality Explosion
> A $320\times280$ RGB image has $320\times280\times3 = 268{,}800$ pixels. A single FFNN input→output layer requires $>8$ billion multiplications. A CNN with a $1\times2$ kernel needs only $319\times280\times3 = 267{,}960$ operations — roughly **60,000× more efficient**.

Three core problems with FFNN on images:
1. **Dimensionality explosion** — flattening a 2D/3D image to 1D and connecting every pixel to every neuron creates an impractical number of parameters
2. **Spatial information destroyed** — flattening kills neighborhood relationships; pixels and their neighbors carry joint meaning (edges, textures)
3. **Parameter explosion → overfitting** — more weights = more memorization, not better generalization

### 5.b Core CNN Concepts

- **Input** — a multidimensional array (e.g., RGB image $H\times W$ stored as $H\times W\times 3$ array)
- **Kernel / Filter** — small learnable weight matrix (e.g., 3×3 or 5×5) that slides over the input
- **Feature Map** — output produced when a kernel is convolved with the input; high values = pattern detected at that location
- **Convolution** — sliding a kernel over the input, computing dot products at each position

### 5.c Two Core Innovations

**Local (Sparse) Connectivity:** Each output neuron connects only to a **local region** of the input — the **receptive field**. A 3×3 kernel: each output connects to only 9 inputs, not thousands. Biologically inspired by Hubel & Wiesel (1959).

**Parameter Sharing:** The **same kernel weights** are used at every spatial position. One kernel is learned and applied everywhere — gives **translation equivariance**: the same feature anywhere uses the same detector.

| Configuration | Weights |
|---------------|---------|
| Fully connected (FFNN) | >3,200 |
| Locally connected (no weight sharing) | 1,226 |
| Locally connected + weight sharing (CNN) | **206** |

*(LeCun 1989 Net-3 comparison)*

### 5.d The Convolution Operation

- **1D:** Slide a kernel across a 1D input array, element-wise products, sum at each position.
- **2D (Grayscale):** Kernel slides across both rows and columns, element-wise multiply + sum → one output value per position.
- **3D (RGB / Multi-channel):** Kernel has depth = number of input channels ($C_\text{in}$). A $F\times F\times C_\text{in}$ kernel → one feature map. Using $K$ different kernels → $K$ feature maps.

**Output Dimension Formula:**

$$V = \frac{W - F + 2P}{S} + 1$$

Where: $W$ = input width/height · $F$ = filter size · $P$ = padding · $S$ = stride · Output volume = $V \times V \times K$ (for $K$ filters)

**Padding Types:**
- **Valid (P=0):** No padding → output shrinks each conv layer
- **Same ($P=(F-1)/2$ with $S=1$):** Zero-pad to keep output same size as input

**Worked Examples:**

| Input Shape | Filters | P | S | V Calculation | Output Volume |
|-------------|---------|---|---|---------------|---------------|
| 3×3×3 | 1, size 2×2×3 | 0 | 1 | $(3-2+0)/1+1=2$ | 2×2×1 |
| 3×3×2 | 3, size 2×2×2 | 0 | 1 | $(3-2+0)/1+1=2$ | 2×2×3 |
| 32×32×3 | 10, size 5×5×3 | 0 | 1 | $(32-5+0)/1+1=28$ | 28×28×10 |

### 5.e The Three Stages of a CNN Layer

**Stage 1 — Convolution (Affine Transform):**

$$\text{net}_c = \mathbf{X}\star K$$

Kernel slides across input computing linear combinations. Produces raw feature map — still linear.

**Stage 2 — Detector (Non-linearity / Activation):**

$$H = f_c(\text{net}_c) = \max(0,\,\text{net}_c)$$

Non-linear activation applied element-wise. Without this, stacking conv layers collapses to one linear transform. Example: $[-9, 32, 14, -6] \xrightarrow{\text{ReLU}} [0, 32, 14, 0]$

**Stage 3 — Pooling (Downsampling):**

Reduces spatial dimensions. Benefits: fewer parameters downstream, translation invariance, controls overfitting.

| Type | Operation | Notes |
|------|-----------|-------|
| **Max Pooling** | Maximum value in each window | Most common. 2×2 pool with S=2 halves spatial dimensions. Preserves dominant features. |
| **Average Pooling** | Mean value in each window | Smoother downsampling. Used in LeNet-5. |
| **L2-norm Pooling** | $\sqrt{\sum x_i^2}$ in each window | Less common. Emphasizes larger activations. |

### 5.f Parameter Counting in CNN Layers

**Number of Neurons in a Conv Layer:**

$$N_\text{neurons} = V_H \times V_W \times K$$

**Parameters WITHOUT Weight Sharing (locally connected):**

$$N_\text{params} = N_\text{neurons} \times (F\times F\times C_\text{in} + 1)$$

**Parameters WITH Weight Sharing (standard CNN):**

$$N_\text{params} = K \times (F\times F\times C_\text{in} + 1)$$

Example (LeNet C1): $K=6,\, F=5,\, C_\text{in}=1 \Rightarrow 6\times(25\times1+1) = 6\times26 = \mathbf{156}$ params

### 5.g Full CNN Architecture Pattern

```
INPUT (H×W×C)
  → CONV + ReLU → POOL
  → CONV + ReLU → POOL
  → FLATTEN (1D vector)
  → FC (Dense)
  → OUTPUT (Softmax)
```

> [!note] Feature Hierarchy
> Conv layer 1 → edges/colors. Conv layer 2 → corners/textures. Deeper layers → shapes, object parts, objects. Pooling reduces spatial size. FC layers do the final classification.

### 5.h LeNet-5 (LeCun et al., 1998)

First practical CNN for handwritten digit recognition (MNIST). Input: 32×32 grayscale. End-to-end training with backpropagation.

| Layer | Type | Output Shape | Details | Parameters |
|-------|------|-------------|---------|------------|
| Input | Image | 32×32×1 | Grayscale, padded from 28×28 | — |
| C1 | Conv | 28×28×6 | 6 filters, 5×5, S=1, P=0, tanh · $V=(32-5)/1+1=28$ | $6\times(5\times5\times1+1)=\mathbf{156}$ |
| S2 | Avg Pool | 14×14×6 | 2×2 window, S=2 | 0 |
| C3 | Conv | 10×10×16 | 16 filters, 5×5, S=1, P=0, tanh · $V=(14-5)/1+1=10$ | $16\times(5\times5\times6+1)=\mathbf{2{,}416}$ |
| S4 | Avg Pool | 5×5×16 | 2×2 window, S=2 | 0 |
| Flatten | — | 400 | $5\times5\times16=400$ | — |
| FC C5 | FC | 120 | Fully connected, tanh | $(400+1)\times120=\mathbf{48{,}120}$ |
| FC F6 | FC | 84 | Fully connected, tanh | $(120+1)\times84=\mathbf{10{,}164}$ |
| Output | FC | 10 | 10 classes (digits 0–9), Softmax | $(84+1)\times10=\mathbf{850}$ |
| **Total** | | | | **61,706** |

$$156 + 0 + 2{,}416 + 0 + 48{,}120 + 10{,}164 + 850 = \mathbf{61{,}706}$$

C3: $16\times(5\times5\times6+1)=16\times151=2{,}416$. Tiny by modern standards (ResNet-50 ≈25M params), but proved CNN viability for image tasks for the first time.

### 5.i Notable CNN Architectures

| Architecture | Year | Key Innovation |
|-------------|------|----------------|
| **LeNet-5** | 1998 | First practical CNN. Local connectivity + weight sharing. |
| **AlexNet** | 2012 | 8 layers, ReLU (novel), dropout, GPU training on ImageNet. Marked the "Rise of CNN." |
| **VGG16** | 2015 | 16 layers, only 3×3 filters. Full model: ~138M params. Input: 224×224×3. |
| **GoogLeNet** | 2014 | Inception modules: parallel filter paths of different sizes in one layer. |
| **ResNet** | 2015 | Skip (residual) connections: gradients flow directly through layers, enabling 50/101/152-layer nets. |
| **Vision Transformer** | 2020 | Transformer self-attention applied to image patches — no convolution needed. |

### 5.j CNN vs FFNN Comparison

| Aspect | FFNN (MLP) | CNN |
|--------|-----------|-----|
| Input handling | Flattened 1D vector — spatial structure lost | Grid-structured — spatial info preserved |
| Connectivity | Every neuron → every input (fully connected) | Each neuron → local receptive field only |
| Weight sharing | No — unique weight per connection | Yes — same kernel at every position |
| Spatial feature detection | No | Yes — kernels learn edges, textures, shapes |
| Parameter count | Very high for image inputs | Much lower due to weight sharing |
| Overfitting tendency | Higher for image tasks | Lower for image tasks |
| Feature engineering | Manual | Automatic (learned filters) |
| Translation invariance | No | Yes (shared filters + pooling) |
| Best for | Tabular data, fixed-size vectors | Images, audio spectrograms, grid-structured data |

> [!insight] Two Key Properties of CNN
> **(1) Translation equivariance**: if the input shifts, the feature map shifts by the same amount — a feature is detected regardless of where it appears. **(2) Hierarchical feature learning**: layer 1 learns edges → layer 2 learns textures → deeper layers learn shapes → object parts → full objects.

---

## 6. Glossary

### 6.a Math & Notation

| Symbol | Meaning |
|--------|---------|
| $x, X$ | input vector / mini-batch |
| $w, W$ | weights |
| $b, w_0, c$ | bias |
| $z$ / net / $a$ | pre-activation |
| $o$ / $h$ | post-activation |
| $\hat{y}$ | predicted output |
| $y$ / $t$ | true label / target |
| $E$ / $J$ | error / total cost |
| $\eta$ | learning rate |
| $\delta$ | error signal (delta) |
| $\lambda$ | regularization rate |
| $\Omega(\theta)$ | regularizer |
| $\sigma$ | sigmoid |
| $f(\cdot)$ | activation function |
| $K$ | kernel/filter |
| $V$ | output dimension |
| $F$ | filter size |
| $P$ | padding |
| $S$ | stride |

### 6.b Key Terms

**Perceptron:** artificial neuron for linear classification · **McCulloch-Pitts:** early neuron model · **threshold θ:** cutoff for firing · **sign function:** outputs ±1 · **step function:** outputs 0/1 · **hyperplane decision surface:** linear separator · **linear separability:** classes separable by a hyperplane · **XOR problem:** not linearly separable · **m-of-n function:** true if at least m inputs are true · **epoch:** one full pass over the data · **delta rule:** LMS / Widrow-Hoff update · **SSE:** sum of squared errors

**feedforward:** information flows only forward · **MLP:** multi-layer perceptron · **depth:** number of layers · **width:** number of neurons per layer · **forward propagation:** compute outputs from inputs · **backpropagation:** reverse-mode gradient computation · **chain rule:** derivative composition rule · **vanishing gradient:** gradients shrink through layers · **exploding gradient:** gradients grow too large · **overfitting:** memorizes training data · **underfitting:** model too simple · **dying ReLU:** neurons stuck at zero · **one-hot encoding:** vector with one active class entry · **universal approximation theorem:** single hidden layer can approximate any continuous function

**convolution / cross-correlation:** sliding local dot product · **kernel / filter:** learnable weight window · **feature map:** convolution output · **receptive field:** local input region a filter sees · **parameter sharing:** same kernel reused everywhere · **sparse connectivity:** each output connects to local inputs · **max pooling:** take maximum value per window · **average pooling:** take mean value per window · **flatten:** reshape volume into 1D vector · **translation equivariance:** shifted input shifts feature map · **translation invariance:** small shifts do not change output much · **feature hierarchy:** edges to objects across layers · **$V = (W-F+2P)/S + 1$:** output dimension formula · **$N_\text{params} = K\times(F^2\times C_\text{in}+1)$:** CNN parameter formula

---

## References

- Goodfellow, Bengio & Courville (2016) — *Deep Learning*
- LeCun et al. (1989) — *Backpropagation Applied to Handwritten Zip Code Recognition*
- LeCun et al. (1998) — *Gradient-Based Learning Applied to Document Recognition* (LeNet-5)
- Mitchell (1997) — *Machine Learning*, Ch. 4
- Raschka, Liu & Mirjalili (2022) — *Machine Learning with PyTorch and Scikit-Learn*, Ch. 11
- IF3270 Pembelajaran Mesin — Lecture Slides, Sem 2-2025/2026, Tim Pengajar IF3270

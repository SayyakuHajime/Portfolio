---
title: Note Title
course: COURSE_CODE
subject: Subject Name
exam: Midterm
topics: [Topic A, Topic B, Topic C]
references: Author (Year) — Book Title, Lecture Slides Week N
order: 1
date: "2025-01-01"
---

## 1. Overview

Write your introduction here. Supports **bold**, *italic*, `inline code`, and $inline math$.

Use the section numbering style that fits your course. This template uses numbered H2 sections and lettered H3 subsections.

### 1.a Background

Provide context, motivation, or history for the topic. Keep it short — a few sentences at most.

> [!note] Definition
> Formal definition of a term or concept.  
> Example: A **perceptron** is a linear binary classifier $f(x) = \text{sign}(w^T x + b)$.


---

## 2. Core Concepts


### 2.a First Concept

Explain the concept with enough detail to reconstruct it from scratch.

$$
\mathbf{h}_t = \tanh\!\left( W_x \mathbf{x}_t + W_h \mathbf{h}_{t-1} + \mathbf{b} \right)
$$

Where:
- $\mathbf{x}_t \in \mathbb{R}^d$ — input vector at time $t$
- $\mathbf{h}_t \in \mathbb{R}^h$ — hidden state
- $W_x, W_h$ — learned weight matrices
- $\mathbf{b}$ — bias vector

> [!insight] Key Insight
> The hidden state $\mathbf{h}_t$ carries information from all previous timesteps — this is the "memory" of the network.


### 2.b Second Concept

Another major idea in this section.

> [!warn] Common Mistake
> Don't confuse $h_t$ (hidden state) with $c_t$ (cell state) in LSTM. They serve different roles.

### 2.c Comparison

| Method | Strengths | Weaknesses | Use When |
|--------|-----------|------------|----------|
| RNN    | Simple, fast | Vanishing gradient | Short sequences |
| LSTM   | Long-term memory | More parameters | Long sequences |
| GRU    | Fewer params than LSTM | Slightly less expressive | Medium sequences |
| Transformer | Parallelizable | Quadratic attention cost | Large datasets |

---

## 3. Algorithms

### 3.a Forward Pass

Step-by-step algorithm:

1. Initialize $h_0 = \mathbf{0}$
2. For each timestep $t = 1, \ldots, T$:
   - Compute input gate: $i_t = \sigma(W_i x_t + U_i h_{t-1} + b_i)$
   - Compute forget gate: $f_t = \sigma(W_f x_t + U_f h_{t-1} + b_f)$
   - Compute candidate: $\tilde{c}_t = \tanh(W_c x_t + U_c h_{t-1} + b_c)$
   - Update cell state: $c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t$
   - Compute output: $h_t = o_t \odot \tanh(c_t)$
3. Return final hidden state $h_T$ (or all states)

### 3.b Backward Pass (BPTT)

$$
\frac{\partial \mathcal{L}}{\partial W} = \sum_{t=1}^{T} \frac{\partial \mathcal{L}_t}{\partial W}
$$

> [!warn] Vanishing Gradient
> Gradients decay exponentially over time: $\|\partial h_t / \partial h_0\| \approx \lambda^t$ where $|\lambda| < 1$.  
> LSTM mitigates this via the cell-state highway $c_t$.


---


## 4. Derivations


### 4.a Gradient of Loss

Starting from the output loss $\mathcal{L} = \sum_t \mathcal{L}_t$:

$$
\delta^{(t)} = \frac{\partial \mathcal{L}}{\partial h_t} = \frac{\partial \mathcal{L}_t}{\partial h_t} + W_h^T \delta^{(t+1)} \odot (1 - h_t^2)
$$

The $(1 - h_t^2)$ term is the derivative of $\tanh$.

> [!success] Shortcut
> For exam derivations, start from the chain rule and work backwards. Always write the computation graph first.


### 4.b Parameter Update

$$
W \leftarrow W - \eta \sum_t \delta^{(t)} h_{t-1}^T
$$

---

## 5. Implementation Notes

```python
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def lstm_step(x, h_prev, c_prev, params):
    Wf, Wi, Wc, Wo = params['Wf'], params['Wi'], params['Wc'], params['Wo']
    bf, bi, bc, bo = params['bf'], params['bi'], params['bc'], params['bo']

    # Gate computations
    f = sigmoid(Wf @ np.concatenate([h_prev, x]) + bf)  # forget
    i = sigmoid(Wi @ np.concatenate([h_prev, x]) + bi)  # input
    g = np.tanh(Wc @ np.concatenate([h_prev, x]) + bc)  # candidate
    o = sigmoid(Wo @ np.concatenate([h_prev, x]) + bo)  # output

    c = f * c_prev + i * g   # cell state
    h = o * np.tanh(c)       # hidden state
    return h, c
```

> [!note] PyTorch Equivalent
> `nn.LSTMCell(input_size, hidden_size)` handles all of the above in one line.


---


## 6. Exam Tips & Quick Reference

> [!insight] What to Memorize
> - Gate equations for LSTM (4 gates, 4 weight matrices each)
> - Why LSTMs solve vanishing gradient (cell state additive update)
> - BPTT: gradients flow back through time, causing vanishing/exploding gradient

Key formulas at a glance:

| Symbol | Meaning |
|--------|---------|
| $\sigma$ | Sigmoid function |
| $\odot$ | Element-wise product (Hadamard) |
| $h_t$ | Hidden state at time $t$ |
| $c_t$ | Cell state (LSTM only) |
| $T$ | Sequence length |
| $d$ | Input dimension |
| $h$ | Hidden dimension |

---

## References

- Hochreiter & Schmidhuber (1997) — *Long Short-Term Memory*
- Olah (2015) — *Understanding LSTMs* (blog post)
- Goodfellow et al. (2016) — *Deep Learning*, Ch. 10

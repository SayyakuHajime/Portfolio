---
title: Note Title
course: COURSE_CODE
subject: Subject Name
exam: Midterm
topics: [Topic 1, Topic 2, Topic 3]
references: Author (Year), Textbook Chapter N
---

## Overview

Write your intro here. Supports **bold**, *italic*, `inline code`, and $inline math x_t$.

### Key Formula

$$
h_t = \tanh(W_x x_t + W_h h_{t-1} + b)
$$

> [!note] Definition
> A short definition or observation. Rendered as a styled callout block.

> [!insight] Key Insight
> The most important concept in this section goes here.

> [!warn] Watch Out
> A common mistake or edge case to be aware of.

> [!success] Tip
> A practical tip or shortcut.

## Section 2 — Tables

| Concept | Formula | Notes |
|---------|---------|-------|
| RNN | $h_t = \tanh(W x_t + U h_{t-1})$ | Vanishing gradient problem |
| LSTM | 4 gate equations | Solves long-term dependencies |
| GRU | 2 gates (reset, update) | Lighter than LSTM |

## Section 3 — Lists

1. First numbered item
2. Second numbered item
   - Nested bullet A
   - Nested bullet B
3. Third item

## Section 4 — Code

```python
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def rnn_step(x, h_prev, Wx, Wh, b):
    return np.tanh(Wx @ x + Wh @ h_prev + b)
```

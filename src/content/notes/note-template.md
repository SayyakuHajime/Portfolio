---
title: Note Template
course: IF0000
subject: How to Write Notes
exam: Reference
topics: [markdown, latex, callouts, code]
order: 1
---

## Writing Notes in Markdown

This is what a note looks like. Write in standard Markdown — headings, bold, italics, lists, tables all work out of the box.

One blank line before a heading is enough. Single newlines inside a paragraph create a line break. Blank line = new paragraph.

---

## Math

Inline math uses single dollar signs: $f(x) = \sigma(Wx + b)$

Display math uses double dollar signs:

$$
\frac{\partial \mathcal{L}}{\partial W} = \frac{1}{m} X^T (A - Y)
$$

The LSTM forget gate: $f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)$

---

## Code

Python with syntax highlighting:

```python
import numpy as np

def softmax(x: np.ndarray) -> np.ndarray:
    e = np.exp(x - x.max(axis=-1, keepdims=True))
    return e / e.sum(axis=-1, keepdims=True)
```

Inline code: use `np.dot(W, x)` for matrix multiply.

---

## Callouts

HTML callouts work inside markdown files. Copy one of these blocks and fill in the content:

<div class="callout note">
  <div class="callout-body">
    <div class="callout-title">Note</div>
    <div class="callout-text"><p>Use this for general information or reminders.</p></div>
  </div>
</div>

<div class="callout warn">
  <div class="callout-body">
    <div class="callout-title">Warning</div>
    <div class="callout-text"><p>Use this for common mistakes or pitfalls.</p></div>
  </div>
</div>

<div class="callout success">
  <div class="callout-body">
    <div class="callout-title">Tip</div>
    <div class="callout-text"><p>Use this for helpful tricks or shortcuts.</p></div>
  </div>
</div>

<div class="callout insight">
  <div class="callout-body">
    <div class="callout-title">Key Insight</div>
    <div class="callout-text"><p>Use this for the most important takeaways.</p></div>
  </div>
</div>

---

## Tables

| Concept | Formula | Notes |
|:--------|:--------|:------|
| Sigmoid | $\sigma(x) = \frac{1}{1+e^{-x}}$ | output in $(0, 1)$ |
| Tanh | $\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$ | output in $(-1, 1)$ |
| ReLU | $\max(0, x)$ | avoids vanishing gradient |

---

## How to Add a New Note

1. Copy this file: `cp src/content/notes/note-template.md src/content/notes/my_note.md`
2. Edit the frontmatter (title, course, subject, exam, topics, order)
3. Write content below the second `---`
4. Run `npm run dev` — the note appears automatically in the sidebar and notes page

# Portfolio Project Audit
> Reviewed 2026-05-16 · Static HTML/CSS/Vanilla JS · 3-agent council review

---

## Table of Contents

1. [Project Snapshot](#1-project-snapshot)
2. [Security](#2-security)
3. [Code Quality](#3-code-quality)
4. [Architecture & Scalability](#4-architecture--scalability)
5. [Should It Go to React?](#5-should-it-go-to-react)
6. [What to Implement Next](#6-what-to-implement-next)
7. [Technical Debt Register](#7-technical-debt-register)
8. [Testing Strategy](#8-testing-strategy)
9. [Decision: Recommended Migration Path](#9-decision-recommended-migration-path)

---

## 1. Project Snapshot

| Property | Value |
|---|---|
| Type | Static multi-page site (MPA) |
| Pages | `index.html`, `pages/*.html` (4), `notes/*.html` (3+), `projects/*.html` (1) |
| CSS | `css/style.css` (~1040 lines), `css/notes/notes.css` (~836 lines) |
| JS | `js/app.js`, `js/theme-init.js`, `js/notes-common.js` |
| Build system | None |
| Backend | None |
| Hosting | Static (GitHub Pages likely) |
| Third-party runtime | Google Fonts, MathJax 3 (jsdelivr), marked.js 12 (jsdelivr) |

---

## 2. Security

### 2.1 XSS — HIGH ⚠️

`notes/md-viewer.html` writes parsed markdown directly to the DOM:

```js
bodyEl.innerHTML = rawHtml  // line ~274
```

No sanitizer is used at any point in the pipeline. A malicious `.md` file containing:

```html
<img src=x onerror="alert(document.cookie)">
```

will execute in the page's origin. The callout pre-processor (`callouts()`) and the cover block (which interpolates raw frontmatter fields) are additional injection paths.

**Fix — add DOMPurify before every `innerHTML` assignment:**

```html
<script src="https://cdn.jsdelivr.net/npm/dompurify@3/dist/purify.min.js"
        integrity="sha384-..." crossorigin="anonymous"></script>
```

```js
bodyEl.innerHTML = DOMPurify.sanitize(rawHtml);
```

Also text-escape frontmatter fields before interpolating into the cover HTML template.

---

### 2.2 CDN Supply-Chain Risk — HIGH ⚠️

MathJax and marked.js are loaded without `integrity` (SRI) hashes:

```html
<!-- Current — no integrity hash -->
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
<script src="https://cdn.jsdelivr.net/npm/marked@12/marked.min.js"></script>
```

A CDN compromise silently executes attacker code. The download-as-HTML feature propagates the same unhashed tags into exported files.

**Fix:**

```html
<script src="https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-chtml.js"
        integrity="sha384-<hash>" crossorigin="anonymous"></script>
```

Generate hashes at [srihash.org](https://www.srihash.org) or `openssl dgst -sha384 -binary file.js | base64`.

Also: `marked@12` is a floating minor version — pin to an exact patch (`marked@12.0.0`).

---

### 2.3 Content Security Policy — MEDIUM

No CSP meta tag exists in any page. Without it, the browser has no enforced containment on the XSS described above.

**Minimum viable CSP to add to every `<head>`:**

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'nonce-...' cdn.jsdelivr.net; style-src 'self' fonts.googleapis.com; font-src fonts.gstatic.com; object-src 'none'; base-uri 'self';">
```

Note: MathJax uses `eval()` internally — you may need `'unsafe-eval'` in `script-src` or host it yourself.

---

### 2.4 Other Findings

| Area | Severity | Finding |
|---|---|---|
| localStorage | Low | Stores only `"dark"/"light"` and `"true"/"false"`. Both read paths validate before use. No risk. |
| Blob download | Low-Medium | Downloaded HTML inherits the XSS-vulnerable rendered content. Mitigated once DOMPurify is added. Blob URL is revoked immediately after click — correct. |
| Hardcoded contacts | Info | Email and social handles are intentional public contact info. No tokens or credentials anywhere in the repo. |
| Sensitive files | None | No `.env`, `.key`, `.pem`, or credential files found. |

---

## 3. Code Quality

### 3.1 Browser Compatibility Gaps

| Feature | Minimum support | Risk |
|---|---|---|
| `color-mix()` | Chrome 111, Firefox 113, Safari 16.2 | Borders silently disappear in older browsers — no layout break |
| `:is()` | Chrome 88, Firefox 78, Safari 14 | Safe |
| CSS custom properties | Universal | Safe |
| `backdrop-filter` | Chrome 76, Firefox 103, Safari 9 | Page header blur may not apply |

**Action**: Add `@supports (color-mix(in srgb, red, blue))` fallbacks for the most visible `color-mix()` uses.

---

### 3.2 JavaScript Architecture

- **Global state**: The calculator uses a single mutable `state` object at global scope. Fine for one page; brittle if scripts share a namespace.
- **Manual `render()` calls**: Every event handler in the calculator calls `render()` directly. A minimal pub/sub wrapper (`state.set(key, val)` triggers `render()` automatically) would reduce the call sites.
- **ES modules not used**: All scripts use the classic global pattern. Switching to `<script type="module">` would give automatic strict mode, isolated scope, and `import`/`export` without a bundler.
- **`fetch()` error handling**: The download handler swallows CSS fetch failures silently (`.catch(() => '')`). The download should warn the user when styles are missing.

---

### 3.3 CSS Maintainability

- Token system in `:root` is solid and well-structured.
- `html.theme-dark/light` anti-flicker pattern is correct.
- `notes.css` is 836 lines — consider splitting into `notes-layout.css`, `notes-components.css`, `notes-callouts.css` when adding new note types.
- Several note HTML files still have inline `style=""` attributes that bypass the token system (residual from before `.nav-sub` class was added). These will drift.

---

## 4. Architecture & Scalability

### 4.1 Current Pain Points

| Problem | Impact as site grows |
|---|---|
| Nav HTML duplicated in every page | Adding a nav item = editing 7+ files manually |
| Notes as raw HTML | No metadata, no cross-links, no search, no consistent structure |
| No build step | No dead-link detection, no asset optimization, no automated deployment |
| Two separate Google Fonts requests per page | Extra DNS lookup; can be merged into one URL |
| `app.js` not deferred | Blocks HTML parsing on every page load |
| No 404 page | Broken links show the browser's default error screen |

### 4.2 What Breaks First

1. **Navigation** — the first time you rename a page or add a section, you touch every file.
2. **Search** — impossible to implement without a content index, which you can't generate without a build step.
3. **Notes consistency** — hand-coded HTML notes will diverge from the design system over time as CSS evolves.

---

## 5. Should It Go to React?

### Verdict: **No — use Astro instead.**

| Framework | Verdict | Reason |
|---|---|---|
| React / Next.js | ❌ Not now | Build complexity, `node_modules`, hydration overhead, JSX — all overhead for a content site. The only interactive page is the calculator. |
| Astro | ✅ Recommended | Ships zero JS by default, file-based routing eliminates nav duplication, native Markdown/MDX for notes, GitHub Pages adapter exists, ~1 day learning curve if you know HTML/CSS/JS |
| Eleventy (11ty) | ✅ Simpler alternative | Smaller API surface, excellent Markdown support, minimal config. Use this if Astro feels like too much. |
| SvelteKit | ⚠️ Maybe later | Better DX than Next.js for a student, but still SSR-first which adds deployment complexity. |
| Vue / Nuxt | ⚠️ Skip | No compelling advantage over Astro or Svelte for this use case. |

### Why Astro specifically

- Notes become `.md` files with frontmatter — the `md-viewer.html` drop zone becomes unnecessary
- One `Layout.astro` file replaces the copy-pasted nav in every page
- The RNN/LSTM calculator can stay as a plain HTML island component or be rewritten as a Svelte component inside Astro when you're ready
- Builds to pure static HTML — same GitHub Pages deployment, no server needed
- Migration is incremental — you can port one page at a time

---

## 6. What to Implement Next

Ordered by impact-to-effort ratio:

| Priority | Feature | Effort | Impact |
|---|---|---|---|
| 1 | **DOMPurify sanitizer** in md-viewer | 15 min | Closes the only real security hole |
| 2 | **`defer` on `app.js`** | 1 min | Faster perceived load on every page |
| 3 | **SRI hashes** on MathJax and marked.js | 30 min | Supply-chain hardening |
| 4 | **Syntax highlighting** in md-viewer | 1 hr | Notes with code blocks are unreadable without it |
| 5 | **Print stylesheet** (`@media print`) | 2 hr | Notes → PDF for actual studying |
| 6 | **Static search index** | 2–3 hr | JSON file listing title/tags/excerpt; search input in sidebar |
| 7 | **Service worker** for offline reading | 3–4 hr | Cache CSS, fonts, visited notes — high value for a student |
| 8 | **Scroll position persistence** | 1 hr | Resume long notes where you left off |
| 9 | **404 page** | 30 min | Professionalism |
| 10 | **Merge Google Fonts requests** | 10 min | One fewer DNS roundtrip |

---

## 7. Technical Debt Register

| Debt | Severity | Fix |
|---|---|---|
| Nav HTML copied in every page | High | Migrate to Astro/11ty layouts, or write a small Node script to regenerate navs |
| `ml_lastterm_notes.html` and `ml_midterm_notes.html` have many inline styles | Medium | Replace with CSS classes; already partially done (`nav-sub`) |
| `marked@12` floating version on CDN | Medium | Pin to exact patch version, add SRI |
| No CI/CD | Medium | GitHub Actions workflow: link checker + stylelint on push |
| `cursor-trail-canvas` hardcoded in multiple files without graceful fallback | Low | Add `if (typeof initCursorTrail === 'function')` guard |
| Download blob re-emits relative CSS paths | Low | Resolved once DOMPurify is added; paths already work for same-directory use |

---

## 8. Testing Strategy

No build system required for any of these:

```bash
# Link checker — run before every push
npx html-proofer ./_site --check-links

# CSS lint
npx stylelint "css/**/*.css"

# Accessibility audit (needs local server)
npx @axe-core/cli http://localhost:8080

# Basic visual diff (screenshot baseline)
npx playwright screenshot http://localhost:8080 baseline.png
```

Add a pre-commit hook (`.git/hooks/pre-commit`) that runs the link checker. No CI needed for a solo project — just the hook.

---

## 9. Decision: Recommended Migration Path

```
Now (static HTML)
  │
  ├─ Fix XSS (DOMPurify) ──────────────────────── 15 min  ← do this first
  ├─ Add defer to app.js ─────────────────────────  1 min
  ├─ SRI hashes on CDN scripts ───────────────────  30 min
  ├─ Syntax highlighting in md-viewer ────────────  1 hr
  ├─ Print stylesheet ────────────────────────────  2 hr
  │
  ▼ (when adding a 3rd or 4th note, or when nav becomes painful)
  
Phase 2 — Migrate to Astro
  ├─ `npm create astro@latest` → choose "empty" template
  ├─ Port Layout.astro (nav, sidebar, theme toggle)
  ├─ Port index.html → index.astro
  ├─ Port pages/*.html → pages/*.astro
  ├─ Convert notes to .md files with frontmatter
  ├─ Keep calculator as a static HTML island (or Svelte component)
  └─ Deploy via GitHub Actions → GitHub Pages
  
Phase 3 — Enhancements (inside Astro)
  ├─ Search (Pagefind — zero-config static search for Astro)
  ├─ Service worker (Workbox via @astrojs/service-worker)
  ├─ RSS feed (@astrojs/rss — one config line)
  └─ React/Svelte components only for truly interactive pages
```

### Bottom Line

The current architecture is clean for its size. The XSS bug and CDN risk are the only things that need fixing today. Migrate to Astro when the pain of duplicating nav HTML across files outweighs the effort of the migration — that threshold is roughly "when you add a new top-level section or feel friction adding a 4th note."

Do not migrate to React. The site does not need React. Astro handles 95% of what React would give you with none of the runtime overhead.

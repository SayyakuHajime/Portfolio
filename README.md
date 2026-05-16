<a id="readme-top"></a>

<div align="center">
  <img src="public/assets/images/miyamura3.jpg" width="14%" style="border-radius:50%" />
</div>

<br/>

<div align="center">
  <h3 align="center">Sayyaku — Personal Portfolio</h3>
  <p align="center">
    Static portfolio site built with Astro — notes, projects, and writings.<br/>
    Deployed automatically to GitHub Pages on every push.
  </p>
</div>

<div align="center">

<br/>

<img src="https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white" />
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" />

</div>

---

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about">About</a></li>
    <li><a href="#structure">Project Structure</a></li>
    <li><a href="#dev">Local Development</a></li>
    <li><a href="#add-note">Adding a Note</a></li>
    <li><a href="#add-page">Adding a Page</a></li>
    <li><a href="#nav">Editing the Nav</a></li>
    <li><a href="#css">Editing CSS</a></li>
    <li><a href="#deploy">Deployment</a></li>
  </ol>
</details>

---

## About

<a id="about"></a>

A personal portfolio — minimal, fast, no JS framework overhead. Built with Astro (static output), served from GitHub Pages. The whole site builds in under 1 second.

| Property | Value |
|:---|:---|
| Framework | Astro 5 — static output, zero client JS by default |
| Styling | Vanilla CSS with custom properties (design tokens) |
| Notes | Markdown files in `src/content/notes/` — Astro renders them automatically |
| Math | KaTeX (build-time, no JS needed) |
| Code highlighting | Shiki (build-time, github-dark theme) |
| Deployment | GitHub Actions → GitHub Pages (auto on push to `master`) |
| Live URL | https://sayyakuhajime.github.io/Portfolio/ |

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

## Project Structure

<a id="structure"></a>

```
Portfolio/
│
├── src/                           ← Astro processes everything here
│   ├── layouts/
│   │   ├── BaseLayout.astro       ← main nav (all 5 pages share this — edit once)
│   │   └── NotesLayout.astro      ← notes sidebar, TOC, progress bar
│   ├── pages/
│   │   ├── index.astro            ← Home
│   │   ├── about.astro            ← About
│   │   ├── notes.astro            ← Notes archive list
│   │   ├── projects.astro         ← Projects
│   │   ├── writings.astro         ← Writings
│   │   ├── 404.astro              ← 404 page
│   │   └── notes/
│   │       ├── [slug].astro       ← renders every note in content/notes/
│   │       └── md-viewer.astro    ← interactive .md drag-and-drop renderer
│   └── content/
│       ├── config.ts              ← notes collection schema
│       └── notes/                 ← DROP YOUR .md FILES HERE
│
├── public/                        ← copied as-is to dist/, no processing
│   ├── css/
│   │   ├── style.css              ← aggregator (@import only — don't edit)
│   │   ├── tokens.css             ← design tokens & theme (colors, spacing, fonts)
│   │   ├── layout.css             ← site structure, sidebar, nav, mobile
│   │   ├── components.css         ← cards, feed, buttons, page-specific styles
│   │   ├── animations.css         ← keyframes, .animate-in
│   │   └── notes/
│   │       ├── notes.css          ← aggregator (@import only — don't edit)
│   │       ├── cursor.css         ← cursor trail & pointer
│   │       ├── notes-layout.css   ← cover, TOC, progress, mobile drawer, print
│   │       └── notes-content.css  ← typography, callouts, article components
│   ├── js/
│   │   ├── app.js                 ← theme toggle, tabs, scroll animations, SW
│   │   ├── theme-init.js          ← anti-FOUC theme bootstrap (blocking)
│   │   └── notes-common.js        ← TOC, reading progress, cursor trail
│   ├── notes/
│   │   ├── ml_lastterm_notes.html ← legacy HTML note (edit directly here)
│   │   ├── ml_midterm_notes.html  ← legacy HTML note (edit directly here)
│   │   └── templates/
│   │       └── note-template.md   ← downloaded by MD Viewer "Template" button
│   ├── projects/                  ← static project HTML files
│   ├── assets/images/             ← images and media
│   ├── favicon.ico / favicon-*.png / apple-touch-icon.png
│   ├── sw.js                      ← service worker (offline cache)
│   └── search-index.json          ← static search index
│
├── .github/workflows/deploy.yml   ← CI/CD: build + deploy to GitHub Pages
├── astro.config.mjs               ← Astro config (site URL, base path, markdown)
├── package.json
└── .nojekyll                      ← tells GitHub Pages to skip Jekyll
```

**The rule:** edit `src/` for structure and content. Edit `public/` for CSS, JS, and legacy HTML notes.

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

## Local Development

<a id="dev"></a>

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
npm install
npm run dev
```

Open **http://localhost:4321/Portfolio/**

| Command | What it does |
|:---|:---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build to `dist/` |
| `npm run preview` | Serve `dist/` locally |

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

## Adding a Note

<a id="add-note"></a>

This is the main workflow. Everything is automatic once you drop a `.md` file.

### Step 1 — Create the file

```
src/content/notes/my-note-name.md
```

The filename becomes the URL: `my-note-name` → `/Portfolio/notes/my-note-name.html`

### Step 2 — Write frontmatter + content

```md
---
title: My Note Title
course: IF3270
subject: Machine Learning
exam: Final Exam
topics: [CNN, RNN, LSTM]
order: 1
---

## Section One

Write content here in normal Markdown.
One blank line before a heading is enough. Single newlines = line breaks.

## Math

Inline: $\sigma(x) = \frac{1}{1 + e^{-x}}$

Display:
$$
\frac{\partial L}{\partial W} = \frac{1}{m} X^T (A - Y)
$$

## Code

```python
def relu(x):
    return max(0, x)
```

## Callout

<div class="callout note">
  <div class="callout-body">
    <div class="callout-title">Note</div>
    <div class="callout-text"><p>Content here.</p></div>
  </div>
</div>
```

### Step 3 — Push

```bash
git add src/content/notes/my-note-name.md
git commit -m "add: my note"
git push
```

That's it. The note automatically appears in the sidebar and notes list.

### Frontmatter fields

| Field | Required | Description |
|:---|:---|:---|
| `title` | ✅ | Displayed in sidebar, cover, and page title |
| `course` | no | Course code shown in sidebar and cover |
| `subject` | no | Subject shown in cover label |
| `exam` | no | Exam type shown in cover label |
| `topics` | no | Array of topic chips shown in cover |
| `order` | no | Sidebar sort order (default: 99, lower = higher) |
| `references` | no | Reference text shown in cover |

### What renders automatically

- Math → KaTeX (build-time, no client JS)
- Code blocks → Shiki syntax highlighting (github-dark)
- `##` / `###` headings → TOC in right rail
- Frontmatter → cover block (title, course, topics)
- Dark/light theme

### Callout types

Replace `note` with any of: `note`, `warn`, `success`, `insight`

```html
<div class="callout warn">
  <div class="callout-body">
    <div class="callout-title">Warning</div>
    <div class="callout-text"><p>Common mistake or pitfall.</p></div>
  </div>
</div>
```

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

## Adding a Page

<a id="add-page"></a>

Create a new `.astro` file in `src/pages/`. The filename becomes the URL.

```astro
---
// src/pages/my-page.astro
import BaseLayout from '../layouts/BaseLayout.astro';
const base = import.meta.env.BASE_URL;
---

<BaseLayout title="My Page — Sayyaku" activePage="my-page">
  <div class="page-header">
    <span class="page-title">My Page</span>
  </div>

  <!-- main content goes here (default slot) -->

  <div slot="right-rail">
    <!-- right sidebar content -->
  </div>
</BaseLayout>
```

### BaseLayout props

| Prop | Description |
|:---|:---|
| `title` | `<title>` tag |
| `description` | meta description |
| `activePage` | which nav item to highlight (`'home'`, `'notes'`, `'projects'`, `'writings'`, `'about'`) |
| `ogTitle` / `ogDescription` | Open Graph tags |

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

## Editing the Nav

<a id="nav"></a>

The main sidebar nav lives in **one place only**: `src/layouts/BaseLayout.astro`.

The notes sidebar (Back to All Notes + note list) is in `src/layouts/NotesLayout.astro`. The collection notes appear automatically — only the legacy HTML notes are hardcoded there.

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

## Editing CSS

<a id="css"></a>

`public/css/style.css` and `public/css/notes/notes.css` are aggregators — don't edit them. Edit the split files:

| File | What's in it |
|:---|:---|
| `public/css/tokens.css` | All CSS custom properties — colors, spacing, fonts, theme overrides |
| `public/css/layout.css` | Site shell, sidebar, nav, mobile responsive, collapsible sidebar |
| `public/css/components.css` | Cards, feed items, buttons, page-specific styles (about, notes list, WIP) |
| `public/css/animations.css` | `@keyframes fadeUp` and `.animate-in` |
| `public/css/notes/cursor.css` | Cursor trail canvas + pointer dot |
| `public/css/notes/notes-layout.css` | Notes cover, TOC, progress bar, mobile drawer, print styles |
| `public/css/notes/notes-content.css` | Typography, callouts, formulas, tables inside `.notes-scope` |

To change a color or spacing value, edit `tokens.css`. Everything else inherits from there.

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

## Deployment

<a id="deploy"></a>

Automatic on every push to `master`:

```
git push master
      │
      ▼
.github/workflows/deploy.yml
      ├─ npm ci
      ├─ astro build  →  dist/
      └─ deploy-pages  →  GitHub Pages
```

### First-time setup

In your GitHub repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**

### Changing the base URL

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/your-repo-name',   // or '/' for a custom domain
});
```

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=120&color=0:1a1a2e,100:C8A96E&section=footer" />
</div>

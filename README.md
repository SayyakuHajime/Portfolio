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
    <li><a href="#add-page">Adding a Page</a></li>
    <li><a href="#add-note">Adding a Note</a></li>
    <li><a href="#nav">Editing the Nav</a></li>
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
| Notes | Large HTML notes served as static files from `public/notes/` |
| Deployment | GitHub Actions → GitHub Pages (auto on push to `master`) |
| Live URL | https://sayyakuhajime.github.io/Portfolio/ |

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

## Project Structure

<a id="structure"></a>

```
Portfolio/
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro       ← main site layout (all 5 nav pages share this)
│   │   └── NotesLayout.astro      ← notes-specific layout (sidebar, TOC, cursor)
│   └── pages/
│       ├── index.astro            ← Home
│       ├── about.astro            ← About
│       ├── notes.astro            ← Notes archive (list of all notes)
│       ├── projects.astro         ← Projects
│       ├── writings.astro         ← Writings
│       ├── 404.astro              ← 404 page
│       └── notes/
│           └── md-viewer.astro    ← interactive .md file renderer
│
├── public/                        ← static files, copied as-is to dist/
│   ├── css/
│   │   ├── style.css              ← main design system (edit here)
│   │   └── notes/notes.css        ← notes-specific styles
│   ├── js/
│   │   ├── app.js                 ← theme toggle, tabs, scroll animations
│   │   ├── theme-init.js          ← anti-FOUC theme bootstrap (blocking)
│   │   └── notes-common.js        ← notes TOC, reading progress, cursor trail
│   ├── notes/
│   │   ├── ml_lastterm_notes.html ← note (edit directly here)
│   │   ├── ml_midterm_notes.html  ← note (edit directly here)
│   │   └── templates/             ← .md and .html note templates
│   ├── projects/
│   │   ├── RNN_LSTM_Calculator.html
│   │   ├── oeni-brand-guide-green.html
│   │   └── penyucon-brand-guide.html
│   ├── assets/images/             ← images and media
│   ├── favicon.ico
│   ├── sw.js                      ← service worker (offline cache)
│   └── search-index.json          ← static search index
│
├── .github/workflows/deploy.yml   ← CI/CD: build + deploy to GitHub Pages
├── astro.config.mjs               ← Astro config (site URL, base path)
├── package.json
└── .nojekyll                      ← tells GitHub Pages to skip Jekyll
```

**Rule:** only edit files in `src/` and `public/`. Never touch `dist/` — it's auto-generated and gitignored.

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

## Local Development

<a id="dev"></a>

### Prerequisites

- Node.js 18+ (project uses Node 20 in CI)
- npm

### Install & run

```bash
npm install
npm run dev
```

Open **http://localhost:4321/Portfolio/** (the `/Portfolio` base path is required locally too).

### Build & preview

```bash
npm run build     # outputs to dist/
npm run preview   # serve dist/ locally at localhost:4321/Portfolio/
```

| Command | What it does |
|:---|:---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build to `dist/` |
| `npm run preview` | Preview the production build locally |

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

## Adding a Page

<a id="add-page"></a>

Create a new file in `src/pages/`. It automatically gets a URL based on its filename.

```astro
---
// src/pages/my-new-page.astro
import BaseLayout from '../layouts/BaseLayout.astro';
const base = import.meta.env.BASE_URL;
---

<BaseLayout title="My Page — Sayyaku" activePage="my-new-page">
  <div class="page-header">
    <span class="page-title">My Page</span>
  </div>

  <!-- main content here -->

  <div slot="right-rail">
    <!-- right sidebar content here -->
  </div>
</BaseLayout>
```

This outputs to `dist/my-new-page.html` → URL: `/Portfolio/my-new-page.html`

### BaseLayout props

| Prop | Type | Description |
|:---|:---|:---|
| `title` | `string` | `<title>` tag content |
| `description` | `string` | meta description |
| `activePage` | `string` | highlights the matching nav item (`'home'`, `'notes'`, `'projects'`, `'writings'`, `'about'`) |
| `ogTitle` | `string` | Open Graph title |
| `ogDescription` | `string` | Open Graph description |

### Named slots

| Slot | Where it renders |
|:---|:---|
| *(default)* | Inside `<main class="main-content">` |
| `right-rail` | Inside the right `<aside>` |

Then add a link to it in the nav — see [Editing the Nav](#nav).

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

## Adding a Note

<a id="add-note"></a>

Notes are large HTML files served statically from `public/notes/`. They don't go through Astro's build — they're copied as-is into `dist/notes/`.

### Step 1 — Create the HTML file

Copy the template as a starting point:

```bash
cp public/notes/templates/note-template.html public/notes/my_new_note.html
```

Edit the new file directly. The template already has the correct sidebar nav, MathJax, CSS links, and script tags — just fill in the content inside `<main class="main-content">`.

### Step 2 — Add it to the notes list page

Open `src/pages/notes.astro` and add an article entry:

```astro
<article class="note-item animate-in">
  <div>
    <h2 class="note-title">
      <a href={`${base}/notes/my_new_note.html`} class="note-title-link">
        My New Note
      </a>
    </h2>
    <p class="note-desc">Brief description of what this note covers.</p>
    <div class="note-meta">
      <span class="tag">Subject Code</span>
      <span class="tag">Topic</span>
      <span class="tag">v1.0</span>
    </div>
  </div>
</article>
```

### Step 3 — Add it to the notes sidebar nav

Open both layouts that contain the notes sidebar nav:
- `src/layouts/NotesLayout.astro` — used by md-viewer
- `public/notes/ml_lastterm_notes.html` — and any other existing note files

Add a nav item:

```html
<a href="/Portfolio/notes/my_new_note.html" class="nav-item" data-abbr="NEW">
  <div>
    <div class="nav-label">My New Note</div>
    <div class="nav-sub">Subject Code</div>
  </div>
</a>
```

> **Tip:** Use the MD Viewer (`/Portfolio/notes/md-viewer.html`) to draft notes in Markdown first — it renders frontmatter, callouts, LaTeX math, and GFM tables live. Download the result as HTML, then clean it up for the final file.

### Note file structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <!-- ... fonts, MathJax, CSS links (see template) ... -->
</head>
<body class="notes-layout-article">

  <div class="site-wrapper">
    <!-- LEFT SIDEBAR (notes nav) — copy from another note -->
    <aside class="sidebar-left"> ... </aside>

    <!-- MAIN CONTENT -->
    <main class="main-content">
      <div class="page-header">
        <span class="page-title">Note Title</span>
        <span class="header-meta">Subject · Exam Type</span>
      </div>
      <div class="notes-cover"> ... </div>
      <div class="notes-scope">
        <!-- your note content: h2, h3, p, pre, .callout, etc. -->
      </div>
    </main>

    <!-- RIGHT RAIL (TOC) — copy from another note -->
    <aside class="sidebar-right"> ... </aside>
  </div>

  <script src="../js/app.js" defer></script>
  <script src="../js/notes-common.js"></script>
</body>
</html>
```

### Callout syntax (inside notes-scope)

```html
<div class="callout note">
  <div class="callout-icon"><!-- SVG --></div>
  <div class="callout-body">
    <div class="callout-title">Note</div>
    <div class="callout-text"><p>Content here.</p></div>
  </div>
</div>
```

Available types: `note`, `warn`, `success`, `insight`

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

## Editing the Nav

<a id="nav"></a>

The main sidebar nav lives in **one place only**: `src/layouts/BaseLayout.astro`. Edit it there and every page updates.

```astro
<!-- src/layouts/BaseLayout.astro -->
<nav class="sidebar-nav">
  <a href={`${base}/`} class:list={['nav-item', { active: activePage === 'home' }]} data-page="index.html">
    <!-- SVG icon -->
    <span class="nav-label">Home</span>
  </a>
  <!-- add new items here -->
</nav>
```

To add a nav item:
1. Add the `<a>` tag in `BaseLayout.astro`
2. Pass the matching `activePage` string from your new page's frontmatter
3. The JS in `app.js` also auto-highlights based on the current URL — both work together

The **notes sidebar** (Back to All Notes + note list) lives in `src/layouts/NotesLayout.astro`. Update it when adding new notes.

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

## Deployment

<a id="deploy"></a>

Deployment is fully automatic via GitHub Actions.

### How it works

```
git push master
      │
      ▼
.github/workflows/deploy.yml
      │
      ├─ actions/checkout
      ├─ actions/setup-node (Node 20)
      ├─ npm ci
      ├─ astro build  →  dist/
      └─ actions/deploy-pages  →  GitHub Pages (gh-pages source)
```

Every push to `master` triggers a build and deploys `dist/` directly to GitHub Pages. No manual steps needed.

### First-time GitHub Pages setup

In your repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**

This only needs to be done once.

### Changing the base URL

If the repo is renamed or moved to a custom domain, update two places:

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://your-username.github.io',  // ← your GitHub Pages domain
  base: '/your-repo-name',                  // ← your repo name (or '/' for custom domain)
});
```

<div align="right"><a href="#readme-top">↑ Back to top</a></div>

---

<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=120&color=0:1a1a2e,100:C8A96E&section=footer" />
</div>

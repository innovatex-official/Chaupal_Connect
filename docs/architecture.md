# Architecture

## Stack

- **HTML5** — single page (`sample.html`)
- **CSS3** — one stylesheet (`style.css`), design tokens in `:root`
- **Vanilla JS** — one IIFE (`script.js`), no build step, no npm

Anything that needs a compiler is out of scope for this contest host.

## File map

```
chaupal-connect/
├── sample.html          ← Contest home page (must be in the live URL)
├── index.html           ← Redirects root → sample.html (GitHub Pages)
├── style.css            ← All styles + design tokens
├── script.js            ← All interactions
├── .nojekyll            ← Stops GitHub Pages Jekyll from breaking assets
├── assets/
│   ├── svg/             ← Icons (logo, mic, nav, etc.)
│   └── images/          ← Section illustrations (SVG)
├── docs/                ← Team documentation (you are here)
├── document/            ← Contest PDF (local reference; often gitignored)
└── landing/             ← Experimental / not part of submission — ignore
```

## How a page load works

1. Browser opens `…/sample.html`
2. Fonts load from Google Fonts (fallback stacks exist if blocked)
3. `style.css` paints layout + tokens
4. `script.js` wires nav, FAQ, ticker pause, reveals, Voice, Feed, join form

## Paths

All asset URLs are **relative** (`assets/svg/logo.svg`, `style.css`).  
Do not hardcode `/Chaupal_Connect/` — relative paths work on localhost and GitHub Pages.

## Deploy

- Repo: `innovatex-official/Chaupal_Connect`
- GitHub Pages: `main` branch, site root `/`
- **Submit this URL:**  
  `https://innovatex-official.github.io/Chaupal_Connect/sample.html`

Push to `main` → Pages rebuilds (usually under a minute). Hard-refresh after deploy.

## Ignore / do not submit

- `landing/` — scratch folder, not the contest site  
- Personal social / portfolio links (contest privacy rule)  
- Animation software exports (CSS/JS motion only is fine)

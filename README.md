# Chaupal Connect

A landing page for a modern village social network — a digital chaupal where villagers meet, discuss local issues, and share news under the banyan tree.

**Palette:** Terracotta · Olive Green · Mustard  
**Home page:** `sample.html` (competition requirement)

## Team docs

See **[docs/](docs/README.md)** for architecture, design system (including section backgrounds), JavaScript modules, QA checklist, and contest notes.

## Features

- **Village Buzz** — gossip / news ticker  
- **Village Feed** — client-side community preview  
- **Community Fair Calendar** — upcoming melas and haats  
- **Voice-to-Text** — multilingual browser speech demo  
- **Join form** — validated registration flow  
- **Responsive navigation** — desktop bar + mobile drawer  
- **Gallery, FAQ, and village voices**

## Live site

**Repository:** https://github.com/innovatex-official/Chaupal_Connect

**Competition URL (submit this):**  
https://innovatex-official.github.io/Chaupal_Connect/sample.html

Root redirects to `sample.html`:  
https://innovatex-official.github.io/Chaupal_Connect/

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080/sample.html
```

## Structure

```
sample.html    Home page (required filename for contest URL)
index.html     Redirects to sample.html (GitHub Pages root)
.nojekyll      Disables Jekyll processing on GitHub Pages
style.css      Styles + design tokens
script.js      Nav, FAQ, voice, feed, join form
assets/        Icons and illustrations (SVG)
docs/          Teammate documentation
```

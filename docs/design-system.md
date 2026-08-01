# Design system

## Palette (contest brief)

| Token | Hex | Role |
| --- | --- | --- |
| `--color-primary` | `#C4704A` | Terracotta — CTAs, accents |
| `--color-secondary` | `#5F7336` | Olive — ticker, secondary chrome |
| `--color-accent` | `#C9A227` | Mustard — focus / highlights |
| `--color-background` | `#F3EBE0` | Page cream |
| `--color-surface` | `#FFFFFF` | **Cards and panels only** |
| `--color-surface-2` | `#E9E0D1` | Warm beige section bands |
| `--color-text` | `#2A2118` | Body text |
| `--color-muted` | `#5A5044` | Secondary text |

## Typography

- **Display:** Fraunces (serif) — headings, brand  
- **Body:** Source Sans 3 — UI and paragraphs  
- Fallbacks are set so the site still reads if Google Fonts is blocked

## Section backgrounds — keep them

**Decision (senior design review): keep alternating cream ↔ warm beige.**

### Why

A long single-page landing needs visual pacing. Alternating soft bands:

- Separates sections without heavy borders  
- Stays inside the earthy brief (no cold grey, no purple)  
- Avoids the “white hole” problem — pure white full-bleed sections on cream feel unfinished  

### Rule

| Use | Background |
| --- | --- |
| Full section bands | `--color-background` **or** `--color-surface-2` (alternate) |
| Cards, demos, composers | `--color-surface` (white) |
| Never | White as a full section background |

### Current rhythm

```
Hero        cream
About       beige   (--color-surface-2)
Features    cream
Feed        beige
Voice       cream
Calendar    beige
Gallery     cream
Voices      beige
FAQ         cream
Join        olive gradient shell (exception — conversion block)
```

**Do not remove these bands** unless you replace them with another clear pacing system. Flattening everything to one cream makes the page feel longer and flatter under judging.

## Motion

- Strong ease-out: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`  
- Scroll reveals are decorative; they never block input  
- `prefers-reduced-motion` disables ticker motion and voice shimmer  

## Components to reuse

- `.btn` / `.btn-primary` / `.btn-secondary` / `.btn-accent`  
- `.section` + `.section-eyebrow` + `.section-lead`  
- `.container` (max-width `1120px`)  
- Cards: border + `--radius-lg` or `--radius-xl` + optional `--shadow-md`

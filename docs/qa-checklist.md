# QA checklist

Run these before every deploy / before mailing the contest link.  
Mark each row when verified.

## Contest compliance

| # | Check | Pass? |
| --- | --- | --- |
| C1 | Live URL ends with `/sample.html` | |
| C2 | Palette uses terracotta, olive, mustard | |
| C3 | Village Buzz ticker visible and scrolling | |
| C4 | Fair calendar shows local events | |
| C5 | Voice-to-Text works (or graceful unsupported message) | |
| C6 | Every `<img>` has `alt` **and** `title` | |
| C7 | No personal social / portfolio links in footer | |
| C8 | No third-party template footprint | |
| C9 | Spelling / grammar read-aloud clean | |

## Functionality

| # | Check | Pass? |
| --- | --- | --- |
| F1 | Desktop nav jumps to each section | |
| F2 | Mobile hamburger opens / closes; Escape closes | |
| F3 | FAQ opens one item; opens another closes the first | |
| F4 | Feed filters: All / News / Issues / Celebrations | |
| F5 | Feed Support increments; Save toggles label | |
| F6 | Feed composer posts a card at the top | |
| F7 | Voice: Hindi tap → transcript; English tap → transcript | |
| F8 | Voice Copy works when text exists | |
| F9 | Voice Clear resets transcript | |
| F10 | Join form rejects empty fields and short phone | |
| F11 | Join form success message with name + village | |
| F12 | All images load (no broken icons) | |

## Visual / design

| # | Check | Pass? |
| --- | --- | --- |
| V1 | Sections alternate cream ↔ warm beige (no pure-white full bands) | |
| V2 | About is beige, not stark white | |
| V3 | Cards sit on white surfaces with readable contrast | |
| V4 | 375px width: hero, feed, voice, form usable | |
| V5 | 1440px width: grids aligned, no overflow | |
| V6 | Sticky ticker + header do not cover focused headings | |

## Browsers

| # | Check | Pass? |
| --- | --- | --- |
| B1 | Chrome — full pass including Voice | |
| B2 | Edge — Voice + layout | |
| B3 | Safari — layout OK; Voice may be limited (note for judges) | |
| B4 | Phone Chrome — nav drawer + tap-to-speak | |

## Reduced motion

| # | Check | Pass? |
| --- | --- | --- |
| A1 | OS “reduce motion” — ticker does not fly; page still usable | |

## Regression after CSS edits

If you change section backgrounds, re-check **V1–V3** and scroll the whole page once.  
White full-bleed sections on cream are a known reject.

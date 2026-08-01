# JavaScript (`script.js`)

One IIFE, `"use strict"`, no dependencies.

## Modules (in file order)

| Module | What it does |
| --- | --- |
| Mobile nav | Open/close drawer, Escape, backdrop, close on link, reset on desktop |
| Header shadow | Adds `.is-scrolled` after a few pixels |
| Smooth anchors | Scroll + focus target sections |
| Active nav | Highlights the section currently in view |
| FAQ | Accordion — one answer open at a time |
| Ticker | Pauses marquee on hover/focus |
| Reveals | IntersectionObserver adds `.is-visible` once |
| Voice-to-Text | Web Speech API: language, tap-to-start/stop, live + final transcript, copy/clear |
| Join form | Client validation + success message |
| Village Feed | Filters, Support/Save, prepend post from composer |

## Voice notes for teammates

- Default language in the select is **English (India)** (`en-IN`)  
- Set `recognition.lang` from `#voice-language` before `start()` (fallback `en-IN`)  
- The mic button is a **toggle** on `click` — first tap starts (and shows the permission prompt), second tap stops. It is not hold-to-speak: the permission prompt steals the pointer, so a hold gesture would stop the instant the user clicks "Allow"  
- `voiceStarting` guards the gap between the first tap and `onstart`, so a double tap cannot start twice  
- Interim words are promoted into the final transcript before `stop()` so ending does not lose the last phrase  
- Best browsers: **Chrome** and **Edge** with mic permission  
- Not a translator — accessibility transcription only  

## Feed notes

- Posts created in the composer exist only in the DOM for that visit  
- Filters hide cards with `[hidden]` based on `data-type`  

## Editing safely

- Prefer adding a new block at the bottom of the IIFE over rewriting unrelated modules  
- Keep IDs in HTML and `getElementById` names in sync  
- Do not introduce a bundler unless the whole team agrees — contest deploy is static

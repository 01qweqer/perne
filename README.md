# Perne Music Academy

A static website for a local music academy. It uses Kazakh ornaments (qoshqar müiz) throughout and has a dombyra you can play in the browser.

Open `index.html` in a browser, or serve the folder:

```sh
npx serve .
```

## What's inside

- `index.html`: the page, plus an inline SVG sprite with the ornaments and the dombyra illustration
- `css/styles.css`: layout for laptop, iPad (≤1024px, menu collapses at ≤900px) and phone (≤640px)
- `js/main.js`: all interactions
- `assets/`: ornament border, background tile, favicon

## Interactions

- **Hero dombyra**: tap a string, or swipe across both strings, to play. The sound is synthesised in the browser (Karplus–Strong, tuned D–G). Tapping higher up the neck plays fretted notes.
- **Programs**: filter by age with the tabs. Tap or swipe a card to flip it. "Choose" fills in the enrollment form.
- **Teachers / testimonials**: swipeable carousels with arrows, dots and keyboard support.
- **Gallery**: tap to open the lightbox. Swipe sideways to browse, swipe down or press Esc to close.
- Click ripples, scroll reveals, counters, a full-screen mobile menu (swipe right to close) and form validation.

## Contacts (real)

- WhatsApp: +7 747 903 30 89 (floating button, hero, contact section, footer, and the enrollment form)
- Instagram: [@perne_dombyra](https://www.instagram.com/perne_dombyra/)
- Branch 1: Алексей Петров көшесі, 25, 3 қабат, 9 кабинет, Алматы ауданы, Астана, Z00T5Y1
- Branch 2: Сығанақ көшесі, 54а, 7 қабат, 708/2 кеңсе, Есіл ауданы, Астана, 010017 / Z05K6Y0

The enrollment form has no backend. It opens WhatsApp with the student's name, phone, program, age and branch already written, and the visitor presses Send.

## Still placeholders

- Teacher names and bios, programs, prices, stats and concert dates.
- The gallery uses illustrations. Real photos of your students and instruments will look better: replace the `<svg>` inside any `.tile` with an `<img>`.

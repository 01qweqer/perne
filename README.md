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

## Languages

Russian and Kazakh, switched with the ҚАЗ / РУС button in the header. The choice is remembered; on first visit Kazakh is shown if the browser prefers Kazakh, otherwise Russian.

- Russian text is written directly in `index.html`.
- Kazakh text is in `js/i18n.js`, matched by the `data-i18n` key on each element.
- To change a phrase, edit it in both places.

## Interactions

- **Hero dombyra**: tap a string, or swipe across both strings, to play. Tapping higher up the neck plays fretted notes.
- **Programs** (children, teens, adults): tap or swipe a card to flip it. "Записаться" preselects the age group in the form.
- **How it works**: swipeable 4-step carousel with arrows, dots and keyboard support.
- **Gallery**: tap to open; swipe sideways to browse, swipe down or Esc to close.
- Floating WhatsApp button, click ripples, scroll reveals, full-screen mobile menu.

## Contacts

- WhatsApp: +7 747 903 30 89. The enrollment form opens WhatsApp with name, phone, age group and branch prefilled in the current language; nothing is stored on the site.
- Instagram: [@perne_dombyra](https://www.instagram.com/perne_dombyra/)
- Hours: 10:00–19:00
- Branch 1: Алексей Петров көшесі, 25, 3 қабат, 9 кабинет, Алматы ауданы, Астана, Z00T5Y1
- Branch 2: Сығанақ көшесі, 54а, 7 қабат, 708/2 кеңсе, Есіл ауданы, Астана, 010017 / Z05K6Y0

## Not on the site yet

Prices, schedule, minimum age, teachers and real photos. The gallery uses illustrations; replace the `<svg>` inside any `.tile` with an `<img>` to use photos.

# Cuak — screen slots

Ten slots are live in `pages/cuak.html`. Each one is a `<figure class="shot">` with a
`data-shot` id. They are invisible to visitors until they hold a real screen.

## How a slot gets filled

1. On the slot's `.shot-img`, replace the empty-SVG `src` with the path already
   written beside it in `data-src`.
2. Remove `is-empty` from the `<figure>`.

Nothing else changes — the frame, the caption and the layout are already set.

## Showing the empty slots while you work

`<html data-shots="draft">` in `pages/cuak.html` reveals the dashed placeholders.
Remove that attribute and every still-empty slot disappears from the page, so the
case study can ship half-filled without advertising the gaps.

## The ten slots

| `data-shot` | Expected file | What it shows |
|---|---|---|
| `screen-home` | `assets/img/cuak/screen-home.webp` | Home — mascot state above the billing cycle summary |
| `screen-progress` | `assets/img/cuak/screen-progress.webp` | Progress — behaviour history as trends |
| `screen-more` | `assets/img/cuak/screen-more.webp` | More — connection, alerts, notification settings |
| `screen-installments` | `assets/img/cuak/screen-installments.webp` | Installment calculator — term selector and amortization table |
| `screen-card-deck` | `assets/img/cuak/screen-card-deck.webp` | Card deck mid-gesture, a card coming to the front |
| `screen-zoning-annotated` | `assets/img/cuak/screen-zoning-annotated.webp` | Home with the 60/40 split drawn over it (**wide, 16:10**) |
| `screen-simulator-input` | `assets/img/cuak/screen-simulator-input.webp` | Purchase simulator — entering the amount |
| `screen-simulator-result` | `assets/img/cuak/screen-simulator-result.webp` | Purchase simulator — the recommended window |
| `screen-xp` | `assets/img/cuak/screen-xp.webp` | XP earned and progress to the next tier |
| `screen-tier-up` | `assets/img/cuak/screen-tier-up.webp` | The tier promotion moment |

## Export settings

- Phone slots: **1170 × 2532** (iPhone 14 Pro @2×, 19.5:9). Any 19.5:9 size works —
  the frame keeps the ratio — but never export below 2× render size.
- The wide slot: **1600 × 1000** (16:10).
- Format `.webp`, quality ~85. Keep the `.png` original next to it if you want a
  lossless master; only the `.webp` is referenced.
- The frame is `object-fit: contain`, so a screenshot with its own device bezel and
  a screenshot without one both sit correctly. Add `shot--bleed` to the figure if a
  particular screen should fill the frame edge to edge instead.

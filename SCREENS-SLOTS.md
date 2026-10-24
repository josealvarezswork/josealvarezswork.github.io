# Cuak — screen slots

Eight slots are live in `pages/cuak.html`. Each one is a `<figure class="shot">`
with a `data-shot` id, invisible to visitors until it holds a real screen.

**Seven are filled. One is empty** — and an empty slot renders nothing at all,
so the case study already reads as finished.

## The eight slots

| `data-shot` | Section | Source frame | Status |
|---|---|---|---|
| `screen-home` | 02 — mascot | `screen-home` | filled |
| `screen-progress` | 02 — mascot | `your progress` | filled |
| `screen-card-deck` | 02 — mascot | `My cards` | filled |
| `screen-simulator-input` | 04 — advice | `screen-simulator-input` | filled |
| `screen-simulator-result` | 04 — advice | `Purchase Simulator` | filled |
| `screen-get-started` | 11 — visual system | `Get started` | filled |
| `screen-onboarding` | 11 — visual system | `On boarding` | filled |
| `screen-more` | 02 — mascot | — | not designed in the current style |

## How a slot gets filled

1. On the slot's `.shot-img`, replace the empty-SVG `src` with the path already
   written beside it in `data-src`.
2. Remove `is-empty` from the `<figure>`.
3. If the export carries its own device bezel, swap `shot--phone` for
   `shot--device`.

## Two frame styles

`shot--phone` is the bare-screenshot frame: a tinted panel with a border and a
radius, at 19.5:9. Use it when the export is just the screen.

`shot--device` is for an export that already includes a phone mockup and its
shadow, on transparency — which is what Figma produced for all seven. It strips
the panel, the border and the radius, because a frame drawn around a frame is
the nested-corner problem `tokens.css` warns about. Ratio 650:1148.

## Layout helpers

A phone set alone leaves two thirds of the row empty, so prose goes beside the
artwork instead of under it. All three blocks align their columns to the **top**,
so the text starts level with the top of the phone rather than floating against
its middle.

- `.shot-beside` — one phone on the left, text on the right. Used by the card
  deck.
- `.shot-beside--pair` + `.shot-pair` — two phones on the left, text on the
  right. Used by the simulator's before/after.
- `.zoning-figure` — the Home screen on the left, the `.rule-card` on the right.

They collapse to a single column on narrow screens: 760px, and 900px for the
pair, which needs more room.

## The 60/40 figure is not a slot

Section 03 sets `screen-home.webp` beside the `.rule-card` that states the split.
The screenshot is used as-is — no annotation drawn over it.

An earlier version laid measured translucent bands on the screenshot and gave it
its own two-card legend. Both were removed on request: the annotated version will
be drawn in Figma and dropped in as its own image, and the legend only repeated
what the rule card already said.

One thing worth keeping in mind when it comes back: the full screen splits the
ratio **vertically** — state above data — while the home-widget diagrams in the
design system split it horizontally. The ratio is the rule; the axis follows the
surface. Two places used to say "data left, emotion right", which only described
the widgets; both were corrected.

## Export settings

- From Figma, **PNG at 2× or 3×** on a transparent background, then converted to
  `.webp` at quality 85.
- The current exports are 650 × 1148 and display at 265–300 CSS px — about 2.2×.
  Fine on a 2× display, slightly soft on a 3× one. Re-exporting at 2× from Figma
  (1300 × 2370) would fix it without any markup change.
- Figma leaves ~37 transparent rows above the device and a real shadow below
  it. The conversion trims that top margin so the image's top edge **is** the
  phone's top edge — otherwise a column aligned to the top of the figure starts
  level with empty space and looks higher than the phone. The shadow below is
  kept. All seven land at exactly 650 × 1148.
- Keep the `.png` original beside the `.webp`, the way `process-ref-*` does.
- Originals live in `D:\Desktop\Design\Case_Studies\cuack`.

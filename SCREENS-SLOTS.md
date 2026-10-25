# Cuak — screens

The rule these follow — when a block is paper and when it is a dark card —
is in [PATTERNS.md](PATTERNS.md). This file is only about Cuak's own screens.

Seven figures are live in `pages/cuak.html`, each a `<figure class="shot">`
with a `data-shot` id. **All seven hold a real export**, so the page carries no
placeholder and no draft switch any more.

## The seven

| `data-shot` | Section | Source frame |
|---|---|---|
| `screen-home` | 02 — mascot | `screen-home` |
| `screen-progress` | 02 — mascot | `your progress` |
| `screen-card-deck` | 02 — mascot | `My cards` |
| `screen-simulator-input` | 04 — advice | `screen-simulator-input` |
| `screen-simulator-result` | 04 — advice | `Purchase Simulator` |
| `screen-get-started` | 11 — visual system | `Get started` |
| `screen-onboarding` | 11 — visual system | `On boarding` |

An eighth, `screen-more` (account connection, alerts, notification settings),
was specced but never designed in the current style — the old Spanish "Mas"
screen belongs to the previous visual language. The figure was removed rather
than left empty: a slot that renders nothing still costs a reader nothing, but
it costs the next person who opens the file a question. Add it back as a normal
`shot--device` figure if the screen ever gets drawn.

## What the draft state used to do

Every figure carried a dashed placeholder and an `is-empty` class, hidden from
visitors unless `<html>` carried an attribute that revealed them. With nothing
left to reveal, the placeholder markup, its CSS and the attribute were all
deleted.

## The frame

Every figure is `shot--device`: the Figma exports all include a phone mockup
and its shadow on transparency, so the figure strips the panel, the border and
the radius it would otherwise draw. A frame around a frame is the nested-corner
problem `tokens.css` warns about. Ratio 650:1148, capped at 300px.

The page used to carry three more modifiers — `shot--phone` for a bare
screenshot at 19.5:9, `shot--wide`, `shot--bleed` — and a `shot-row--wide`.
`screen-more` was the last figure that could have used any of them, so all four
were deleted with it. Write them again if an export ever needs them.

## Layout helpers

Every figure now sits beside its prose: there is no row of bare phones left, so
`.shot-row` went the way of the placeholder. A phone set alone leaves two thirds
of the row empty, so prose goes beside the artwork instead of under it. All three blocks align their columns to the **top**,
so the text starts level with the top of the phone rather than floating against
its middle.

- `.shot-beside` — one phone on the left, text on the right. Used by the card
  deck.
- `.shot-beside--pair` + `.shot-pair` — two phones on the left, text on the
  right. Used by the simulator's before/after and by Home + Progress.
- `.note-stack` — the column of `.note-lg` paper cards that fills the right
  side of those figures.
Section 03's 60/40 figure uses `.shot-beside` too — it had its own
`.zoning-figure` and a bespoke `.rule-card`, and both were deleted once it moved
onto the shared pair.

They collapse to a single column on narrow screens: 760px, and 900px for the
pair, which needs more room.

## The 60/40 figure is not a slot

Section 03 sets `screen-home.webp` beside three `.note-lg` cards: the 60% and the
40% as figure-headed sheets, then the note about the axis. The screenshot is used
as-is — no annotation drawn over it.

It went through two earlier shapes. The first laid measured translucent bands on
the screenshot and gave it a two-card legend; both were removed on request, since
the annotated version will be drawn in Figma and dropped in as its own image. The
second was a `.rule-card` — one wide paper panel split 60fr/40fr — which drew the
ratio but matched nothing else on the page and left half the column empty beside
a 530px phone. Three stacked sheets state the same split, reuse the component the
rest of the page is built from, and run the height of the phone.

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

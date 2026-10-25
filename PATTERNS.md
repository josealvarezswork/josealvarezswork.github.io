# The portfolio's one rule

Everything else in this file follows from it.

> **Paper is Jose's voice. The dark card is everything else.**

A sheet of paper means a person wrote this down about the work: a caption, a
verdict, a principle, a reading of a number. A dark card means the thing being
shown speaks for itself: the product's own states, its tiers, its specs, and
other people's words.

That is why the home page is a desk covered in paper and the case studies are
dark pages with paper stuck to them. Same material, same hand, two surfaces.

When you cannot tell which a block is, ask who is talking.

## The second rule

> **One sheet per figure. A sheet holds a whole idea, not a fragment.**

Paper only works as an accent. Three sheets stacked beside one phone stop
reading as annotation and start reading as a pile of stationery — the page
cloys. If one phone needs three things said about it, those three things are
one note, and the sheet grows sub-structure to hold them: a bolded lead per
paragraph, or a `.note-lg-figs` row for the numbers.

This replaced a stack of three beside the 60/40 screen. The merge also brought
the ratio back: `.note-lg-figs--ratio` sets the columns to `60fr 40fr`, so the
split is drawn by the layout instead of only stated by the figures.

## The third rule

> **A sentence is not a sheet.**

A sheet is a thing somebody stuck to the page, so it has to be worth the act.
One line stating a principle is prose: it belongs in the section's own
`.section-text`, in the flow, where the reader is already reading.

A row of free-standing sheets between two figures is the worst case — they
annotate nothing, and they turn a section with three screens in it into a wall
of paper. Section 02 had one; *More* folded up into the sheet beside the
screens it belongs to, and *Design principle* became the section's closing
line. The section went from four sheets to two, and the three screens moved
into one row so the whole section fits a single screen.

## The fifth rule

> **Raw data gets a shape, not a sentence.**

A list of proper nouns set as prose is unreadable: nobody reads ninety
characters of technology names, they scan for one they recognise. Give each
name its own chip and the eye can land. Section 08's stack was six rows of
dot-separated strings; it is now `.stack-chips`, and the one row that was the
point of the section — the Belvo integration — was lifted above the grid
instead of hiding in row five.

A list that is really a sequence gets numbered: `.steps`, three across. And an
item five times longer than its neighbours is not an item — it is a different
kind of thing wearing the same bullet. Section 09's rewards marketplace left
the list and became the section's closing paragraph.

## Where the CSS lives

| File | Lines | What it is |
|---|---|---|
| `tokens.css` | 165 | colour, radius, type and the spacing scale — values, no rules |
| `system.css` | 173 | the shell: html, body, header, nav, container |
| `pages.css` | 214 | the chrome every inner page draws: section, hero, cta, footer |
| `paper.css` | 928 | the components: paper, notes, tape, figures, brand mark |
| `about.css` | 218 | the about page, both languages |
| `resume.css` | 442 | the resume, both languages |
| `design-system.css` | 136 | what the two design-system pages draw the same way |
| `styles.css` | 895 | the home only |
| `home.css` | 1170 | the home only |


Load order on an inner page: `tokens` → `system` → `pages` → `paper` → the
page's own. Paper components come after the page chrome so a sheet wins over a
page default; the page's own sheet comes last so it can override anything.

Six pages now have no `<style>` block at all. What is still embedded is
genuinely page-specific: the two case studies and the pages whose layout
nothing else shares. It went from 4338 lines to 2119.

A page's own file is justified when the same CSS was written out twice —
`resume.css` and `about.css` each existed in two copies, one per language, so
a change had to be made twice and one of the two would eventually be
forgotten. The two case studies share almost nothing (2 identical rules out
of 63 and 124), so there is no `case-study.css`: forcing one would be a file
that exists for the name rather than for the code.

## The components

Everything here lives in `assets/css/paper.css`, which every page loads.

### Paper

| Class | What it is |
|---|---|
| `.paper-surface` | the stock itself: cream, grained, never white |
| `.taped` | a sheet held down by two corner strips |
| `.note` | a caption under artwork — text and one strip of tape, nothing else |
| `.note-lg` | a sheet that carries its own heading and a paragraph |
| `.note-stack` | the column beside a figure — normally holding one sheet |
| `.note-lg-figs` | a row of figures inside a sheet, `--ratio` or `--even` |

A `.note-lg` has one of three heads, chosen by what the card is about:

- **a number** → `.note-lg-head--figure`: a mono kicker over a serif figure.
  `60%`, `21 interest-free days`, `5 / 5`, `$9.99 / month`. No icon: the figure
  is already the loudest mark on the sheet, which is also why these drop the
  emphasis strokes in the corner.
- **a named thing** → `.note-lg-head` with a `.note-lg-ico` chip. A screen, a
  feature, a rule. The icon comes from `assets/img/icons.svg`.
- **a statement** → `.note-lg-head` with the title alone. *The problem*,
  *Design principle*, *B2B — the real business*.

**Never force an icon.** The sprite holds twelve symbols; none of them means
"a date inside the billing cycle". A wrong icon reads worse than none, so a
card with no honest icon takes a statement head. This rule exists because the
first pass gave the mascot card `i-character`, which turned out to be a node
diagram.

### Figures

| Class | What it is |
|---|---|
| `.shot` + `.shot--device` | one app screen |
| `.shot-beside` | one phone on the left, a `.note-stack` on the right |
| `.shot-beside--pair` + `.shot-pair` | two phones on the left, prose on the right |
| `.shot-trio` | three phones in one row, their sheets underneath |

**The phone never gets a frame.** Exports carry their own bezel and shadow on
transparency; a frame around a frame is the nested-corner problem `tokens.css`
warns about.

**Prose goes beside the artwork while there is room beside it.** A phone is
tall and narrow; set alone it leaves two thirds of a row empty, so one or two
screens take their prose in the next column, both aligned to the top.

**Three screens leave no column to take.** A trio fills the row, and its sheets
go underneath — which is where notes end up under photographs anyway. Section
02 reads that way now: three phones, then two sheets, then the closing line.

## The fourth rule

> **Only a caption gets tape.**

Every sheet carried a strip until the page held twenty of them, and at twenty
the tape stops reading as tape — it is just a grey rectangle that shows up
again and again. What marks a sheet is the sheet: cream stock on a dark page
is already the signal.

A caption keeps its strip for two reasons. It is small enough that the strip
is most of what you see, and it really is stuck to something — the artwork
directly above it. Cuak went from twenty strips to eight, one per screen.

## The numbers

- **Radius.** Paper is `--r-md`, the product's own cards are `--r-lg`. A sheet's
  corners are tighter than a UI card's. Everything else comes from the token
  scale; `.note` at 3px is the exception, because a taped slip has almost none.
- **Spacing.** A four-point grid in `tokens.css`: `--s-4` through `--s-128`,
  stepping by four to 32 and by sixteen after. It was measured, not guessed.
  The site held 48 different spacing values across 1182 declarations; a pure
  doubling scale (2-4-6-8-16-32-64-128) would have covered 37% of them, since
  12px, 20px and 24px are each used more often than most of its steps. The
  four-point grid covers 69%, and going finer than that buys two points for
  eighteen more steps.

  Values under 8 stay literal in the component that needs them — they are
  optical corrections to a border or a cap height, not layout, and a token
  would invite using them as layout.

- **Section rhythm.** `var(--s-64)` top and bottom, on all seven pages that
  have sections. Three of them used 72px for no reason anyone recorded.
- **Contrast.** AA, measured with the alpha composited through the whole
  ancestor chain. A naive reading of `color` against the nearest background
  gives the wrong ratio on both the paper and the dark surfaces.

## What is not done yet

The law holds on `index.html`, `pages/cuak.html` and the parts of
`pages/duogit.html` it reaches. It does not hold anywhere else:

- `pages/duogit.html` now shares the vocabulary where it matters: its seven
  `proc-cap` captions are `.note`, the problem and the opportunity are
  `.note-lg`, and its four target figures became one sheet with a
  `.note-lg-figs--quad` row. What stayed dark is the product's own content:
  the widget feature rows, the screen carousel, the colour swatches (renamed
  `.spec-card`, since the class they shared no longer described them). It
  Below "Defining Success" the four commentary panels beside the mockups are
  `.note-lg--sm`, a sheet sized to sit inside a frame, and the closing
  "What's next" is a sheet. What stayed dark there is the product's own
  content: the widget feature rows and the screen carousel. It still carries
  231 inline styles.

- `.site-footer`, `.footer-inner`, `.footer-copy` and `.footer-nav` live in
  `paper.css` now. Ten pages declared them and had drifted — 32px of padding
  against 34, a background of .2 against .25 against .28 — and the two case
  studies had no real footer at all. They have one, with a link to the other
  case study, the framework, the resume and contact.

- A sheet sets its own ink with a repeated class. `paper.css` loads before a
  page's `<style>`, so a page rule like `.screen-card p { color: faint }` tied
  on specificity and won on source order; dark ink on cream paper measures
  1.03:1.
- The nine other pages use dark cards only, and each declares its own `.hero`,
  `.section-title`, `.section-text` and `.site-footer`. `section-title` is
  written out on eight pages.
- `pages/cuak.html` and `pages/duogit.html` are the only two pages with a
  hand-rolled footer and no links in it. They are also the two pages a
  recruiter opens first.
- `assets/css/styles.css` still carries 39 classes no page uses, including a
  rival `.note`, `.tape` and `.pin` from the previous home design. On the home
  that `.note` loads after `paper.css` and would win.

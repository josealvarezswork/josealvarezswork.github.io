# Pipeline — slots

The law this page follows — when a block is paper and when it is a dark card —
is in [PATTERNS.md](PATTERNS.md). This file is only about what is still missing
from `pages/pipeline.html` and what each missing piece has to be.

The page opens as a **hub**: the chain is the method, and a *trace* is one run
of it on real work. One trace exists — Cuak leaving the safe zone — and it is
three layers deep out of six.

Rather than wait for all six, or ship three empty sections, every unbuilt piece
is a **slot** that names what to produce and its specs. A slot can be a missing
file inside a trace, or a whole missing trace.

**Why a hub and not just the Cuak trace.** Depth and range are two different
claims. One artifact taken six layers down proves you own the chain; it says
nothing about range. A hub lists the traces, so range lives on the cards while
depth lives in the trace below them — and the page can hold a trace that is
pure craft with no product under it, which is the only place on this site where
the After Effects and Premiere Pro claims on the resume would be backed.

**One trace is an anecdote.** The same chain run twice is a method. That is why
`trace-duogit` is the highest-value slot on the list after `home-flagged`.

## Seeing the slots

| URL | What you get |
|---|---|
| `pages/pipeline.html` | the live page — three layers, no holes |
| `pages/pipeline.html?draft=1` | every slot, with specs, plus layers 04–06 |
| `pages/pipeline.html?draft=0` | back to live |

`?draft=1` sets `localStorage.jaDraft` and this machine remembers it, so you
only pass it once. The flag is read by an inline script in `<head>`, which
sets `data-slots="draft"` on `<html>` before the page paints — a draft session
never flashes the live page first. Every branch is wrapped in a `try`, so a
private window or blocked storage simply gets the live page.

**A visitor cannot reach the draft view by accident**, and nothing in an empty
slot is in the live page's way.

## The eight slots

| Slot | Where | Blocked by |
|---|---|---|
| `home-flagged` | trace 01, layer 02 · UI | nothing — do this one first |
| `trace-duogit` | a whole trace | nothing for layers 01–03 |
| `blender-model` | trace 01, layer 03 · 3D | nothing |
| `transition-clip` | trace 01, layer 04 · Motion | `blender-model` |
| `turntable` | trace 01, layer 04 · Motion | `blender-model` |
| `state-cue` | trace 01, layer 05 · Sound | `transition-clip` (timing) |
| `context-clip` | trace 01, layer 06 · Video | everything above |
| `trace-motion` | a whole trace | the piece has to exist |

The order is not a preference.

`home-flagged` is one screen export and it is the half of the transition the
whole page is about — right now the page can show where the change starts but
not where it lands on a real screen.

`trace-duogit` is next because its first three layers are mostly assembly from
`pages/duogit.html`: the cat already has four states, the widget already has
three variants, the ESA spec is already written. It is the cheapest way to stop
the chain from being a one-off.

The video slots cannot be done honestly before the model exists, because there
is no geometry under the current renders to interpolate between.

`trace-motion` is last here but it is the one that closes the gap between what
the resume claims and what the site shows. It runs layers 01, 04, 05 and 06 and
skips UI entirely — the chain does not demand all six every time, it demands
that none of them be the reason a piece stopped.

Each slot in the page carries its own spec list. The specs are not suggestions:
the sizes match the exports already in `assets/img/cuak/` (650 × 1148 for a
screen), and the weight limits are what keeps a file small enough to live in
git.

## Filling one

Three edits, no CSS:

1. Drop the real figure in **above** the `.slot` block.
2. Delete the `.slot` block.
3. On that trace's card, flip the layer's `data-state` in `.trace-layers`
   from `wip` (or `part`) to `live`, and update the sentence under it.

When a section's last slot goes, drop `section--wip` from its `<section>` and
the section goes live with it.

The trace cards are what keep the live page honest while this is half-done.
The chain map above them describes the method and never changes; each card
says how far that particular trace actually got, so a visitor sees three
layers finished and three pending rather than a page that forgot three steps.
A layer is `live` only when there is an artifact on the page for it.

## Where video goes

**Not in git, above about 2 MB.** `.git` is already 192 MB against a 10 MB
working tree, because ~100 MB of PNGs from a previous portfolio design are
still in the history. Deleting a file does not shrink a repository.

- `transition-clip` and `turntable` are muted, short and capped under 800 KB —
  those can live in `assets/video/`.
- `context-clip` is 1080p with audio and will run to several megabytes. Host it
  off the repo and embed it.

## One thing the page says about itself

Layer 03 states plainly that the current character renders were **generated
with AI and then corrected against the turnaround**, and that there is no mesh
under them. That is not a placeholder sentence to remove later — it is the
honest description of the concept stage, and it is what makes the Blender model
in the slot above read as the next step rather than as a correction.

When `blender-model` is filled, that paragraph changes from "here is the limit"
to "here is how the limit was removed". It does not disappear.

## The exports it already uses

| File | Natural | Shown at | Scale |
|---|---|---|---|
| `screen-home.webp` | 650 × 1148 | 300 × 530 | 0.46× |
| `screen-simulator-input.webp` | 650 × 1148 | 300 × 530 | 0.46× |
| `screen-simulator-result.webp` | 650 × 1148 | 300 × 530 | 0.46× |
| `cuak-feliz.png` | 320 × 320 | 240 × 240 | 0.75× |
| `cuak-atento.png` | 320 × 320 | 240 × 240 | 0.75× |
| `process-ref-*.webp` | 480 × 480 | 167 × 167 | 0.35× |

Everything is drawn below its natural size, so nothing on this page is being
upscaled. The 320 px character renders are the tightest margin: at 240 they are
fine on a 2× display, and they are the reason `.state-fig img` caps at 240
instead of filling its column.

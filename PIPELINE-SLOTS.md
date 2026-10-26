# Pipeline — slots

The law this page follows — when a block is paper and when it is a dark card —
is in [PATTERNS.md](PATTERNS.md). This file is only about what is still missing
from `pages/pipeline.html` and what each missing piece has to be.

The page traces **one state change in Cuak** through six layers. Three of the
six are published. Three are not, and rather than wait for all six or ship
three empty sections, every unbuilt piece is a **slot** that names the file to
produce and its specs.

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

## The six slots

| Slot | Layer | Blocked by |
|---|---|---|
| `home-flagged` | 02 · UI | nothing — do this one first |
| `blender-model` | 03 · 3D | nothing |
| `transition-clip` | 04 · Motion | `blender-model` |
| `turntable` | 04 · Motion | `blender-model` |
| `state-cue` | 05 · Sound | `transition-clip` (timing) |
| `context-clip` | 06 · Video | everything above |

The order is not a preference. `home-flagged` is one screen export and it is
the half of the transition the whole page is about — right now the page can
show where the change starts but not where it lands on a real screen. The
three video slots cannot be done honestly before the model exists, because
there is no geometry under the current renders to interpolate between.

Each slot in the page carries its own spec list. The specs are not suggestions:
the sizes match the exports already in `assets/img/cuak/` (650 × 1148 for a
screen), and the weight limits are what keeps a file small enough to live in
git.

## Filling one

Three edits, no CSS:

1. Drop the real figure in **above** the `.slot` block.
2. Delete the `.slot` block.
3. In the chain map near the top of the page, flip that step's
   `data-state="wip"` to `data-state="live"`.

When a section's last slot goes, drop `section--wip` from its `<section>` and
the section goes live with it.

The map is what keeps the live page honest while this is half-done: it lists
all six layers and marks which ones are still in production, so a visitor sees
a chain with three steps pending rather than a page that forgot three steps.

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

# This week — what to have ready

Revised after a decision that changes the plan: **Serudda stays a CV line.**
Four years of content design for a channel is real experience and it backs the
After Effects claim when someone asks, but featuring it invites more of the
work Jose does not want to keep doing. A portfolio is a job application, not an
archive — what it shows is what it gets asked for.

Flare stays unpublished. UX Lab OS is undecided and is not this week's
bottleneck.

So the week is production after all, and the whole point is that the three
pieces must not come out generic.

---

## The trap

Three quick motion pieces made to fill a reel — a logo resolving, some kinetic
type, a UI card sliding — prove After Effects is installed. They say nothing
about the person, and they compete against every motion reel on Behance, where
Jose is a newcomer with three pieces.

The same three hours spent on pieces **the site already asks for** complete an
argument that is already built, and that nobody else can copy because it rests
on his own framework.

Every piece below fills a slot that exists in `pages/pipeline.html` today.

---

## 1 — Blender · the duck

The one modelling job, and it unlocks two of the three motions.

**Why it is quick.** Cuak is sphere-based: body, head, beak, feet. No fur, no
cloth, no simulation. Subdivision modelling, a handful of objects.

**Do not build a rig.** An armature is the expensive part and this does not
need one. Shape keys for the face, object transforms for the pose. That is how
the five states should come out of one mesh anyway.

**The reference planes already exist** — this is exactly what they are for:

| File | View |
|---|---|
| `assets/img/cuak/process-ref-frontal.webp` | front · 480 × 480 |
| `assets/img/cuak/process-ref-back.webp` | back · 480 × 480 |
| `assets/img/cuak/process-ref-arms-up.webp` | arms up · 480 × 480 |

**Match the lighting and material** of the existing renders, or the page ends
up with two different-looking ducks. Soft key, warm bounce, matte off-white
body, orange beak and feet. Check a test render against `cuak-feliz.png`
before animating anything.

### Fills `blender-model`

- `assets/img/cuak/model-viewport.webp` — 1600 × 1000, solid shading
- `assets/img/cuak/model-wireframe.webp` — 1600 × 1000, topology visible
- `assets/img/cuak/model-shapekeys.webp` — 1600 × 600, the state sliders

The wireframe is the one that matters. It is the artifact that turns layer 03
from "concept, corrected" into "modelled", and it is what a 3D lead asks for.

---

## 2 — Motion · the state transition

**Looking good → Flagging.** The confetti falls, the arms come down, the
megaphone comes up. About 1.2 seconds.

The design decision is the timing, and it is worth stating on the page: the
body settles **before** the expression changes, so the character reads as
catching your arm rather than raising an alarm. Fast arrival reads as a
warning system; slow arrival reads as someone on your side.

### Fills `transition-clip`

- `assets/video/cuak-transition.webm` — 1080 × 1080, ~1.2 s, VP9, **muted,
  under 800 KB**
- `assets/video/cuak-transition.mp4` — same, H.264, for Safari
- `assets/img/cuak/cuak-transition-poster.webp` — 1080 × 1080, first frame

Under 800 KB it lives in git. Above it, it does not.

---

## 3 — Motion · the turntable

Four seconds, seamless loop, the modelled duck rotating. Cheapest piece on the
list once the model exists, and the only thing that proves the body is real in
three dimensions rather than five flat images.

### Fills `turntable`

- `assets/video/cuak-turntable.webm` — 900 × 900, 4 s seamless, **under 600 KB**
- `assets/img/cuak/cuak-turntable-poster.webp` — 900 × 900

---

## 4 — Motion · the widget changing state

The third piece should **not** be 3D. Two character motions and one more
character motion is a one-note reel.

This one is **interface motion**, which is a different skill and the one that
matters most for a product role: how a UI communicates a change without the
user watching it happen. DuoGit's home-screen widget going from streak intact
to streak at risk.

Pure After Effects. No modelling, no dependency on piece 1. The assets exist:

| File | Size |
|---|---|
| `assets/img/duogit/widget-racha.webp` | 400 × 400 |
| `assets/img/duogit/widget-critico.webp` | 852 × 492 |
| `assets/img/duogit/widget-ranking.webp` | 400 × 400 |
| `assets/img/duogit/cat-happy.webp` … `cat-worried.webp` | 300 × 401 |

The point to make with it: a widget is glanced at, not watched. The motion has
to survive being missed — it has to leave the screen in a state that reads
correctly to someone who looked away during the transition. That is a real
constraint, it is specific to widgets, and almost nobody's reel addresses it.

### Deliverable

- `assets/video/duogit-widget.webm` — 1080 × 1080, ~1.5 s, VP9, **muted, under
  800 KB**, plus the `.mp4` and a poster
- This one needs a new slot on the page; the markup is a copy of
  `transition-clip`.

---

## Order

```
Blender duck  →  transition  →  turntable
                                             (these three are one chain)
Widget motion                                (independent, do it any time)
```

Start the widget piece first if the Blender model stalls. It depends on
nothing and it is the one most relevant to a product interview.

---

## On UX Lab OS

Different case from Serudda, and worth separating.

Serudda is work Jose does not want more of. UX Lab OS is a **product tool that
shipped to production** and cut documentation time by 60%. "Shipped" is a
credential, not a job description — it does not commit him to building more
internal tools, and it is the hardest thing for an early-career candidate to
prove.

Recommendation: not a full case study. A card in `data/projects.json`, four
screenshots of the live tool, and the 60% with its method stated in two
sentences. Half a day, and it is the only proof on the site that something he
designed reached real users.

It is not this week's bottleneck. It can wait until the motion pieces land.

---

## Still not on the list

**The title change.** One hour, and it goes after the pieces exist — not
before. That ordering is the whole lesson of this file.

**`home-flagged`.** One export, 650 × 1148, Cuak's home out of the safe zone.
Still the cheapest item anywhere in this project and still the missing half of
the pipeline page's own argument. Do it while a render is cooking.

# odejbyjose.com — Jose Alvarez

Static portfolio. Plain HTML + CSS + vanilla JS, no framework, no build step.
Served by GitHub Pages at **https://odejbyjose.com** (custom domain via `CNAME`).

**Positioning:** UI Artist — progression systems, character states, and the
interfaces that make a system readable at a glance. Every page should support
that one claim; anything that doesn't gets cut or archived.

---

## Run it locally

The project grid is fetched at runtime from `data/projects.json`, so opening
`index.html` with `file://` breaks it (CORS). Always use a local server:

```powershell
cd "D:\Desktop\Code\Projects\Portfolio\portfolio"
npx serve -l 3000 .
```

→ http://localhost:3000

---

## Structure

```text
.
├── index.html                  # home — must stay at root for GitHub Pages
├── CNAME                       # custom domain
├── robots.txt / sitemap.xml
│
├── data/
│   └── projects.json           # the case-study cards on the home grid
│
├── pages/
│   ├── methodology.html        # Framework — ESA, the portfolio thesis
│   ├── craft.html              # Craft — how the work gets made
│   ├── resume.html             # Resume
│   ├── about.html              # About
│   ├── duogit.html             # case study 1
│   ├── duogit-design-system.html
│   ├── cuak.html               # case study 2
│   ├── cuak-design-system.html
│   └── how-i-work.html         # linked from inside the two case studies
│
├── assets/
│   ├── css/styles.css          # home
│   ├── css/system.css          # shared: header, nav, cards, footer
│   └── img/                    # per-project subfolders
│
├── cv/                         # printable CV (HTML) + exported PDF
├── scripts/app.js              # renders the project grid + ESA tabs
├── exports/                    # generated export files
├── tools/                      # PowerShell helpers (image optimize, exports)
└── linkedin-posts/             # drafted posts, not part of the site
```

---

## Editing rules

| To change | Edit |
|---|---|
| A card on the home grid | `data/projects.json` — not `index.html` |
| Header, nav, footer, cards | `assets/css/system.css` (shared by all pages) |
| The home page only | `assets/css/styles.css` |
| Add a case study | new file in `pages/` + an entry in `data/projects.json` |
| Images | `assets/img/<project>/`, run `tools/optimize-images.ps1` first |

Nav is duplicated in the `<head>`/`<header>` of every page — there's no
templating. Changing a nav item means changing it in all of them.

---

## Deploying

⚠️ **GitHub Pages publishes from `main`.** Work has been happening on
`concept/odej-4-section-structure`, so pushing that branch does **not** update
the live site. Merge before expecting changes to appear:

```powershell
git checkout main
git merge concept/odej-4-section-structure
git push
```

Give it a minute or two, then hard-refresh `odejbyjose.com`.

---

## Not part of the live site

These live in the repo but aren't linked from anywhere. Kept for reference —
delete or move them out when the reframe is finished:

- `pages/mindset.html`, `pages/project-1.html`, `pages/project-2.html` — orphans from the previous version
- `concept.html` — an exploration, never linked
- `CONCEPT-CONTENT-PLAN.md` — a 16-deliverable plan that stalled; superseded by the studio's `PLAN_MAESTRO.md`
- `job-search-kit.md`, `job-search-empleo.md`, `case-study-template.md` — working notes
- `linkedin-posts/` — six drafted posts, not yet published

---

## Pending

- [ ] Regenerate `cv/Jose_Alvarez_CV.pdf` — the PDF is still the old "Product Designer" version; the HTML is current. Print to PDF from `cv/Jose_Alvarez_CV.html`.
- [ ] Merge into `main` so the reframe actually goes live.
- [ ] Update the LinkedIn headline and About to match "UI Artist".
- [ ] Publish the six drafted posts.
- [ ] Decide whether the UNIT-01 cursor-tracking character goes on the home page.
- [ ] Third case study: hard-surface object with its own diegetic interface (in progress — see the studio folder).

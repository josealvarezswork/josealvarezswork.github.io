# odejbyjose.com — Jose Alvarez

Static portfolio. Plain HTML + CSS + vanilla JS, no framework, no build step.
Served by GitHub Pages at **https://odejbyjose.com** (custom domain via `CNAME`).
English at the root, Spanish under `/es/`.

**Focus:** UI/UX design for products — progression systems, character states and
the interfaces that make a system readable at a glance. Two case studies
(Cuak, DuoGit) plus the framework behind them.

---

## Run it locally

The project grid is fetched at runtime from `data/projects.json`, so opening
`index.html` with `file://` breaks it (CORS). Use a local server:

```powershell
cd "D:\Desktop\Code\Projects\Portfolio\portfolio"
python tools/dev-server.py
```

or `npx serve -l 3000 .`

---

## Structure

```text
.
├── index.html                  # home (EN) — must stay at root for GitHub Pages
├── es/                         # Spanish: index, about, resume
├── CNAME / robots.txt / sitemap.xml
├── data/projects.json          # case-study cards on the home grid (+ .es.json)
├── pages/                      # case studies, design systems, framework, about, resume
├── assets/css/                 # tokens.css, system.css, per-page stylesheets
├── assets/img/                 # per-project subfolders
├── scripts/                    # grid, slots, brand, marquee
└── tools/                      # dev server, image optimizer
```

---

## Editing rules

| To change | Edit |
|---|---|
| A card on the home grid | `data/projects.json` (and `.es.json`) — not `index.html` |
| Design tokens | `assets/css/tokens.css` |
| Header, nav, footer, cards | `assets/css/system.css` (shared) |
| Home page only | `assets/css/home.css` |
| Images | `assets/img/<project>/`; run `tools/optimize-images.ps1` first |

Nav is duplicated in every page — there is no templating. Changing a nav item
means changing it everywhere. After a CSS change, bump its `?v=N` query string.

---

## Deploying

GitHub Pages publishes from `main`. Push, wait a minute or two, then hard-refresh
`odejbyjose.com` (the CDN caches HTML for about ten minutes).

---

## Honesty rule

Every claim on the site must be something a reviewer can check in one click.
Projects are described as built, tested or targeted — never as launched or
measured unless that is true. When a number is a target or a self-report, the
page says so.

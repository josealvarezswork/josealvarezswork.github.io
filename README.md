# Jose Alvarez Portfolio

Static portfolio deployed with GitHub Pages.

## Project Structure

```text
.
├── index.html              # Home page required at root for GitHub Pages
├── CNAME                   # Custom domain
├── assets/
│   ├── css/                # Global styles
│   └── img/                # Images and visual assets
├── cv/                     # Downloadable and printable CV files
├── data/                   # JSON data used by the site
├── pages/                  # Portfolio pages, case studies, resume, about
├── scripts/                # Client-side JavaScript
├── exports/                # Generated presentation/export files
└── tools/                  # Local helper scripts
```

## Notes

- Keep `index.html` at the repository root so GitHub Pages can serve the site.
- Add new case studies inside `pages/`.
- Add new project cards in `data/projects.json`.
- Store reusable images in `assets/img/`.
- Store JavaScript in `scripts/` and shared CSS in `assets/css/`.

# Portfolio — Navdeep Mor

A VS Code / IDE-themed developer portfolio built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step.

## Features

- 🖥️ **IDE theme** — explorer sidebar, tabs, breadcrumbs, status bar (One Dark palette)
- ⌨️ **Interactive terminal** — press <kbd>`</kbd> or click the terminal icon; type `help`
- 🐍 **Snake game** — type `snake` in the terminal (arrows/WASD, `q` to quit)
- ✦ **Industry Updates** section — your running notes on tech trends
- 📚 **Learning & Articles** section — what you're studying + what you've written
- 📱 Responsive, scroll-spy navigation, reveal animations

## Editing content

**All content lives in one file: [`data.js`](data.js).** You never need to touch HTML/CSS/JS for content updates.

| To update…            | Edit…                                  |
| --------------------- | -------------------------------------- |
| Name, role, about, links | `DATA.profile`                      |
| Skills                | `DATA.skills`                          |
| Work history          | `DATA.experience`                      |
| Projects              | `DATA.projects`                        |
| Industry updates      | `DATA.updates` (add new entries at the top) |
| Learning & articles   | `DATA.learning` (`type: "learning"` or `"article"`) |

## Run locally

Any static file server works:

```bash
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

Or just open `index.html` directly in a browser.

## Deploy

It's a static site — deploy anywhere:

- **GitHub Pages**: push to a repo, enable Pages on the `main` branch
- **Netlify / Vercel**: drag-and-drop the folder or connect the repo
- **Cloudflare Pages**: connect the repo, no build command needed

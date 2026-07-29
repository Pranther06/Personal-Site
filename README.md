# Personal Site — Futuristic Portfolio + Local AI Chatbot

A single-page personal website with a dark/neon "future-tech" vibe, animated
hero, project showcase, photo gallery, and a **fully in-browser AI chatbot**
(WebLLM + RAG) that answers questions about you — **no API, no server, $0 cost.**

## ✨ Features
- Sticky header with jump-links + social icons
- Animated hero (mouse-reactive particles, neon name, typewriter tagline)
- About section with a **local LLM chatbot** beside your bio
- Projects grouped by Software / ML / Quantum + GitHub CTA
- "Life Outside of Work" photo gallery with lightbox
- Scroll reveal, scroll-progress bar, responsive/mobile layout
- Chatbot **only shows on capable devices** (WebGPU + enough RAM); older/weak
  devices see a friendly note instead of a broken feature.

## 🗂 Project structure (framework-swappable by design)
```
personal-site/
├── index.html              # thin entry shell
├── content/                # YOUR DATA (plain, framework-agnostic)
│   ├── profile.js          #   name, taglines, photo, links
│   ├── bio.js              #   journey text + chatbot knowledge base
│   ├── projects.js         #   grouped project list + GitHub url
│   └── photos.js           #   gallery items + captions
├── src/
│   ├── core/               # LOGIC (no framework, no DOM in chatbot core)
│   │   ├── dom.js          #   tiny DOM helpers
│   │   ├── animations.js   #   particles, typewriter, scroll effects
│   │   ├── capability.js   #   WebGPU/RAM detection
│   │   └── chatbot.js      #   WebLLM engine + RAG
│   ├── ui/                 # PRESENTATION (swap this to change frameworks)
│   │   ├── icons.js  header.js  hero.js  about.js  projects.js  gallery.js  footer.js
│   └── main.js             # wires content + core + ui
├── styles/
│   ├── tokens.css          # design tokens (colors/spacing/fonts) — re-skin here
│   └── main.css            # layout + component styles
└── assets/                 # images (your photo, gallery pics)
```

**Why this is easy to migrate later:** your `content/` (data) and `src/core/`
(logic) never depend on any framework. To move to React/Vue/Svelte, you only
rewrite `src/ui/` and the wiring in `main.js`.

## 🖊 Customize
1. **Your info:** edit `content/profile.js` (name, initials, taglines, links, photo path).
2. **Your story + chatbot brain:** edit `content/bio.js`. The `knowledge` array is
   what the AI uses to answer — add as many short facts as you like.
3. **Projects:** edit `content/projects.js`.
4. **Photos:** drop images into `assets/`, then set `src` in `content/photos.js`
   (e.g. `"./assets/trip.jpg"`). Also set your hero photo in `profile.js`.
5. **Colors/vibe:** change `--accent` and friends in `styles/tokens.css`.

## ▶️ Run locally
The site uses ES modules, so open it via a local server (not file://):

```bash
cd personal-site
python3 -m http.server 8000
# then visit http://localhost:8000
```
(Or use any static server, e.g. `npx serve`.)

> **AI chatbot note:** the first time you use the chat, it downloads a small
> model (~0.5–1GB) into your browser cache, then runs locally. Requires a modern
> browser with WebGPU (recent Chrome/Edge). On unsupported devices the chat is
> replaced with a note; the rest of the site still works.

## 🚀 Deploy free on GitHub Pages
1. Create a free GitHub account and a new repository (e.g. `personal-site`).
2. From this folder:
   ```bash
   cd personal-site
   git init
   git add .
   git commit -m "Initial personal site"
   git branch -M main
   git remote add origin https://github.com/YOURUSERNAME/personal-site.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**,
   pick `main` branch and `/ (root)`, then Save.
4. Your site goes live at `https://YOURUSERNAME.github.io/personal-site/` in a minute or two.

That's it — free hosting, free URL. You can add a custom domain later in the
same Pages settings if you ever buy one.

## 🔧 Swapping the AI model (optional)
In `src/core/chatbot.js`, change `MODEL_ID` to another
[WebLLM model id](https://github.com/mlc-ai/web-llm) (larger = smarter but bigger
download / needs more device power). The default is a small, fast model.

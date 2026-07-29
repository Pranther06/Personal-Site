/* ============================================================
   ENTRY POINT
   Wires content + core + ui together. This is the only place
   that knows about all three layers. To migrate to a framework
   later, you'd rewrite the /ui modules and this wiring; the
   /content and /core layers stay unchanged.
   ============================================================ */

// Content (plain data)
import { profile } from "../content/profile.js";
import { bio } from "../content/bio.js";
import { projects } from "../content/projects.js";
import { photos } from "../content/photos.js";

// UI (presentation — swap this layer to change frameworks)
import { renderHeader } from "./ui/header.js";
import { renderHero } from "./ui/hero.js";
import { renderAbout } from "./ui/about.js";
import { renderProjects } from "./ui/projects.js";
import { renderGallery } from "./ui/gallery.js";
import { renderFooter } from "./ui/footer.js";

// Core (framework-independent behavior)
import { initScrollReveal, initScrollUI } from "./core/animations.js";

function boot() {
  document.title = `${profile.name} — Engineer · ML · Quantum`;

  renderHeader("#site-header", profile);
  renderHero("#hero", profile);
  renderAbout("#about", profile, bio); // async (capability check) — fine to not await
  renderProjects("#projects", projects);
  renderGallery("#life", photos);
  renderFooter("#site-footer", profile);

  // Global behaviors (run after DOM is populated)
  initScrollReveal();
  initScrollUI();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

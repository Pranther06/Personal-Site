/* ============================================================
   UI: HERO
   Particle canvas + neon name + typewriter tagline + CTAs + photo.
   ============================================================ */

import { el, mount } from "../core/dom.js";
import { icons } from "./icons.js";
import { initParticles, initTypewriter } from "../core/animations.js";

export function renderHero(target, profile) {
  const canvas = el("canvas", { id: "hero-canvas" });

  const photo = profile.photo
    ? el("img", { src: profile.photo, alt: profile.name })
    : el("div", { class: "placeholder", html: "[ add your photo in<br/>content/profile.js ]" });

  const tagline = el("div", { class: "hero-tagline" });

  const content = el("div", { class: "hero-grid container reveal" }, [
    el("div", {}, [
      el("h1", { class: "hero-name" }, [
        el("span", { text: "Hi, I'm " }),
        el("span", { class: "glow-text", text: profile.name }),
      ]),
      tagline,
      el("div", { class: "hero-cta" }, [
        el("a", { class: "btn", href: "#about", html: `Ask my AI about me ${icons.spark}` }),
        el("a", { class: "btn btn--ghost", href: "#projects", html: `See projects ${icons.arrow}` }),
      ]),
    ]),
    el("div", { class: "hero-photo" }, [photo]),
  ]);

  const frag = el("div", {}, [canvas, content]);
  mount(target, frag);

  // Animations
  initParticles(canvas);
  initTypewriter(tagline, profile.taglines);
}

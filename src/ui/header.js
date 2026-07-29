/* ============================================================
   UI: HEADER
   Sticky header — brand (left), nav jump-links (center),
   social icons (right). Includes a mobile menu toggle.
   Receives data; renders DOM. Swap this file to change frameworks.
   ============================================================ */

import { el, mount } from "../core/dom.js";
import { icons } from "./icons.js";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Life", href: "#life" },
];

function socialLinks(links) {
  const items = [];
  if (links.github) items.push(["github", links.github]);
  if (links.linkedin) items.push(["linkedin", links.linkedin]);
  if (links.email) items.push(["email", `mailto:${links.email}`]);

  return el(
    "div",
    { class: "socials" },
    items.map(([key, href]) =>
      el("a", {
        class: "social-btn",
        href,
        target: key === "email" ? null : "_blank",
        rel: "noopener",
        "aria-label": key,
        title: key,
        html: icons[key],
      })
    )
  );
}

export function renderHeader(target, profile) {
  const nav = el(
    "nav",
    { class: "nav" },
    NAV.map((n) => el("a", { href: n.href, text: n.label }))
  );

  const socials = socialLinks(profile.links);

  const toggle = el("button", {
    class: "nav-toggle",
    "aria-label": "Toggle menu",
    text: "≡",
  });

  const inner = el("div", { class: "header-inner container" }, [
    el("a", { class: "brand", href: "#hero" }, [
      el("span", { class: "brand-mark", text: profile.initials + "." }),
      el("span", { text: " " + profile.name }),
    ]),
    nav,
    socials,
    toggle,
  ]);

  // Mobile menu toggle
  toggle.addEventListener("click", () => {
    inner.classList.toggle("menu-open");
    document.getElementById("site-header").classList.toggle("menu-open");
  });
  // Close menu after clicking a nav link (mobile)
  nav.addEventListener("click", () => {
    inner.classList.remove("menu-open");
    document.getElementById("site-header").classList.remove("menu-open");
  });

  mount(target, inner);
}

/* ============================================================
   UI: FOOTER
   Social links repeated + closing note.
   ============================================================ */

import { el, mount } from "../core/dom.js";
import { icons } from "./icons.js";

export function renderFooter(target, profile) {
  const links = profile.links;
  const items = [];
  if (links.github) items.push(["github", links.github]);
  if (links.linkedin) items.push(["linkedin", links.linkedin]);
  if (links.email) items.push(["email", `mailto:${links.email}`]);

  const socials = el(
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

  const inner = el("div", { class: "footer-inner container" }, [
    socials,
    el("p", { class: "footer-note", text: `© ${new Date().getFullYear()} ${profile.name} · Built with a local AI, no APIs.` }),
  ]);
  mount(target, inner);
}

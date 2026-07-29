/* ============================================================
   UI: PROJECTS
   Grouped project cards (Software / ML / Quantum) + GitHub CTA.
   ============================================================ */

import { el, mount } from "../core/dom.js";
import { icons } from "./icons.js";

function projectCard(item) {
  const tags = el(
    "div",
    { class: "project-tags" },
    (item.tags || []).map((t) => el("span", { class: "tag", text: t }))
  );
  const links = el(
    "div",
    { class: "project-links" },
    (item.links || []).map((l) =>
      el("a", { href: l.href, target: "_blank", rel: "noopener", text: l.label })
    )
  );
  // Title + optional badge sit on one flex row so they never overlap
  // and the badge wraps below the title on narrow cards if needed.
  const titleRow = el("div", { class: "project-title-row" }, [
    el("h3", { text: item.title }),
    item.featured ? el("span", { class: "project-badge", text: "★ Featured" }) : null,
  ]);

  return el("div", { class: "project-card" }, [
    titleRow,
    el("p", { text: item.description }),
    tags,
    links,
  ]);
}

function group(g) {
  return el("div", {}, [
    el("h3", { class: "project-group-title", text: g.label }),
    el("div", { class: "project-grid" }, g.items.map(projectCard)),
  ]);
}

export function renderProjects(target, projects) {
  const inner = el("div", { class: "container reveal" }, [
    el("p", { class: "section-kicker", text: projects.kicker }),
    el("h2", { class: "section-title", text: projects.heading }),
    ...projects.groups.map(group),
    el("div", { style: "margin-top: 2.5rem;" }, [
      el("a", {
        class: "btn",
        href: projects.githubUrl,
        target: "_blank",
        rel: "noopener",
        html: `See all my code on GitHub ${icons.arrow}`,
      }),
    ]),
  ]);
  mount(target, inner);
}

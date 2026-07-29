/* ============================================================
   UI: GALLERY ("Life Outside of Work")
   Photo grid with hover captions + click-to-enlarge lightbox.
   Empty src => labeled placeholder tile.
   ============================================================ */

import { el, mount } from "../core/dom.js";

let lightbox, lightboxImg, lightboxCaption;

function ensureLightbox() {
  if (lightbox) return;
  lightboxImg = el("img", { alt: "" });
  lightboxCaption = el("div", { class: "lb-caption" });
  const close = el("button", { class: "lb-close", "aria-label": "Close", text: "×" });
  lightbox = el("div", { class: "lightbox" }, [close, lightboxImg, lightboxCaption]);
  document.body.append(lightbox);

  const hide = () => lightbox.classList.remove("open");
  close.addEventListener("click", hide);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) hide(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
}

function openLightbox(src, caption) {
  ensureLightbox();
  lightboxImg.src = src;
  lightboxCaption.textContent = caption || "";
  lightbox.classList.add("open");
}

function galleryItem(item) {
  const hasImg = !!item.src;
  const media = hasImg
    ? el("img", { src: item.src, alt: item.alt || "" })
    : el("div", { class: "placeholder", text: "[ photo ]" });

  const node = el("div", { class: "gallery-item" }, [
    media,
    el("div", { class: "caption", text: item.caption || "" }),
  ]);

  if (hasImg) node.addEventListener("click", () => openLightbox(item.src, item.caption));
  return node;
}

export function renderGallery(target, photos) {
  const inner = el("div", { class: "container reveal" }, [
    el("p", { class: "section-kicker", text: photos.kicker }),
    el("h2", { class: "section-title", text: photos.heading }),
    el("p", { style: "color: var(--text-dim); max-width: 640px; margin-bottom: 2rem;", text: photos.intro }),
    el("div", { class: "gallery" }, photos.items.map(galleryItem)),
  ]);
  mount(target, inner);
}

/* ============================================================
   DOM HELPERS
   Tiny framework-free utilities so UI modules stay clean.
   When migrating to React/Vue later, you replace the /ui layer
   and these helpers simply go unused — no other code depends on
   a framework.
   ============================================================ */

/**
 * Create an element with attributes and children.
 * @param {string} tag
 * @param {object} [attrs] - attributes; `class`, `html`, `text`, on* handlers, dataset
 * @param {(Node|string)[]} [children]
 */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (key === "class") node.className = value;
    else if (key === "html") node.innerHTML = value;
    else if (key === "text") node.textContent = value;
    else if (key === "dataset") Object.assign(node.dataset, value);
    else if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else node.setAttribute(key, value);
  }
  for (const child of [].concat(children)) {
    if (child == null) continue;
    node.append(child.nodeType ? child : document.createTextNode(child));
  }
  return node;
}

/** Replace the contents of a mount point with a node. */
export function mount(target, node) {
  const host = typeof target === "string" ? document.querySelector(target) : target;
  if (!host) return;
  host.replaceChildren(node);
}

/** Escape text for safe insertion into HTML strings. */
export function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

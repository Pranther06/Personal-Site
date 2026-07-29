/* ============================================================
   UI: ABOUT + CHATBOT
   Two-column: bio (left) + AI chatbot panel (right).
   The chatbot only renders its interactive form on capable
   devices; otherwise it shows a friendly "not supported" note.
   Model loads lazily on first user interaction.
   ============================================================ */

import { el, mount } from "../core/dom.js";
import { icons } from "./icons.js";
import { checkLLMCapability } from "../core/capability.js";
import { Chatbot } from "../core/chatbot.js";

const SUGGESTIONS = [
  "What do you do?",
  "Tell me about your ML work",
  "What's your quantum research?",
  "What are you interested in?",
];

function bioColumn(bio) {
  const paras = bio.paragraphs.map((p) =>
    el("p", { class: p.lead ? "lead" : null, text: p.text })
  );
  const tags = el(
    "div",
    { class: "tag-row" },
    bio.tags.map((t) => el("span", { class: "tag", text: t }))
  );
  return el("div", { class: "bio" }, [
    el("p", { class: "section-kicker", text: bio.kicker }),
    el("h2", { class: "section-title", text: bio.heading }),
    ...paras,
    tags,
  ]);
}

/* ---- Chatbot panel (capable devices) ---- */
function chatPanel(profile, bio) {
  const body = el("div", { class: "chat-body" });
  const status = el("div", { class: "chat-status", text: "AI runs locally in your browser — no data leaves your device." });

  // Progress bar (hidden until a model download starts)
  const progressFill = el("div", { class: "chat-progress-fill" });
  const progress = el("div", { class: "chat-progress", "aria-hidden": "true" }, [progressFill]);

  const input = el("input", { class: "chat-input", type: "text", placeholder: "Ask me anything about myself…", disabled: true });
  const sendBtn = el("button", { class: "chat-send", "aria-label": "Send", html: icons.send, disabled: true });

  const suggestions = el(
    "div",
    { class: "chat-suggestions" },
    SUGGESTIONS.map((s) => el("button", { class: "chat-chip", text: s }))
  );

  const bot = new Chatbot({ knowledge: bio.knowledge, name: profile.name });
  let loading = false;

  function addMsg(role, text) {
    const msg = el("div", { class: `chat-msg ${role}`, text });
    body.append(msg);
    body.scrollTop = body.scrollHeight;
    return msg;
  }

  function addTyping() {
    const msg = el("div", { class: "chat-msg bot" }, [
      el("span", { class: "typing", html: "<span></span><span></span><span></span>" }),
    ]);
    body.append(msg);
    body.scrollTop = body.scrollHeight;
    return msg;
  }

  async function ensureLoaded() {
    if (bot.ready || loading) return;
    loading = true;

    // Show progress bar; keep the status line clean (no verbose logs).
    progress.classList.add("active");
    progressFill.style.width = "0%";
    status.textContent = "Loading AI model (first visit only)…";

    try {
      await bot.load((report) => {
        // WebLLM reports progress 0..1. Drive the bar; hide the raw text logs.
        const pct = Math.max(0, Math.min(1, report.progress || 0)) * 100;
        progressFill.style.width = `${pct}%`;
      });
      progressFill.style.width = "100%";
      status.textContent = "Ready — ask me anything!";
      // Fade the bar out shortly after completing.
      setTimeout(() => progress.classList.remove("active"), 500);
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    } catch (e) {
      progress.classList.remove("active");
      status.textContent = "Couldn't load the AI model. Try refreshing or a different browser.";
      console.error(e);
    } finally {
      loading = false;
    }
  }

  async function handleSend(text) {
    const q = (text ?? input.value).trim();
    if (!q) return;
    input.value = "";
    addMsg("user", q);
    input.disabled = true;
    sendBtn.disabled = true;

    if (!bot.ready) {
      const t = addTyping();
      await ensureLoaded();
      t.remove();
      if (!bot.ready) { input.disabled = false; sendBtn.disabled = false; return; }
    }

    const typing = addTyping();
    let answerMsg = null;
    try {
      await bot.ask(q, (partial) => {
        if (!answerMsg) { typing.remove(); answerMsg = addMsg("bot", ""); }
        answerMsg.textContent = partial;
        body.scrollTop = body.scrollHeight;
      });
    } catch (e) {
      typing.remove();
      addMsg("bot", "Sorry, something went wrong generating a response.");
      console.error(e);
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  // Wire events
  sendBtn.addEventListener("click", () => handleSend());
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") handleSend(); });
  suggestions.addEventListener("click", (e) => {
    const chip = e.target.closest(".chat-chip");
    if (chip) handleSend(chip.textContent);
  });

  // Start model load as soon as user focuses the input (feels responsive).
  input.addEventListener("focus", ensureLoaded, { once: true });

  // Greeting + enable input (input becomes usable; model loads on focus/first send)
  addMsg("bot", `Hey! I'm ${profile.name}'s AI, running locally in your browser. Ask me about my work, interests, or journey.`);
  input.disabled = false;
  sendBtn.disabled = false;

  return el("div", { class: "chat-panel" }, [
    el("div", { class: "chat-header" }, [
      el("span", { class: "chat-dot" }),
      el("div", { class: "chat-title" }, [
        el("span", { text: "Local AI Assistant" }),
        el("small", { text: "Powered by an in-browser LLM · no API" }),
      ]),
    ]),
    body,
    suggestions,
    progress,
    status,
    el("div", { class: "chat-input-row" }, [input, sendBtn]),
  ]);
}

/* ---- Unsupported note (incapable devices) ---- */
function unsupportedNote(reason) {
  return el("div", { class: "chat-unsupported" }, [
    el("div", { html: icons.spark }),
    el("p", { text: "AI chat isn't available on this device." }),
    el("p", { text: reason }),
    el("p", { text: "The rest of the site works great here — explore my projects and photos below!" }),
  ]);
}

export async function renderAbout(target, profile, bio) {
  const rightSlot = el("div", {});
  const grid = el("div", { class: "about-grid container reveal" }, [
    bioColumn(bio),
    rightSlot,
  ]);
  mount(target, grid);

  // Decide chatbot vs. note AFTER capability check (runs instantly).
  const { capable, reason } = await checkLLMCapability();
  mount(rightSlot, capable ? chatPanel(profile, bio) : unsupportedNote(reason));
}

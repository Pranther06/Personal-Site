/* ============================================================
   CHATBOT CORE (framework-independent)
   In-browser LLM via WebLLM + lightweight RAG over your bio's
   `knowledge` array. Nothing here touches the DOM — the UI
   layer drives it through callbacks, so it's portable to any
   framework later.

   How it works:
   1. RAG: pick the most relevant knowledge snippets for a
      question using simple keyword overlap scoring.
   2. Build a system prompt grounded in those snippets.
   3. Stream the answer from a small model running fully in the
      visitor's browser (no API, no cost).
   ============================================================ */

// WebLLM is loaded lazily from a CDN only when the user starts a chat,
// so the page stays fast for everyone.
const WEBLLM_CDN = "https://esm.run/@mlc-ai/web-llm";

// A small, capable model that runs well in-browser.
// You can swap this for other WebLLM model ids later.
const MODEL_ID = "Llama-3.2-1B-Instruct-q4f16_1-MLC";

export class Chatbot {
  /**
   * @param {object} opts
   * @param {string[]} opts.knowledge - facts about you (from bio.js)
   * @param {string} [opts.name] - your name, for the system prompt
   */
  constructor({ knowledge = [], name = "the site owner" } = {}) {
    this.knowledge = knowledge;
    this.name = name;
    this.engine = null;
    this.ready = false;
    this.history = [];
  }

  /** Simple keyword-overlap retrieval — returns top-k relevant facts. */
  retrieve(query, k = 4) {
    const q = new Set(
      query.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((w) => w.length > 2)
    );
    const scored = this.knowledge.map((fact) => {
      const words = fact.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/);
      let score = 0;
      for (const w of words) if (q.has(w)) score++;
      return { fact, score };
    });
    scored.sort((a, b) => b.score - a.score);
    const top = scored.filter((s) => s.score > 0).slice(0, k).map((s) => s.fact);
    // Fall back to all knowledge if nothing matched (broad question).
    return top.length ? top : this.knowledge.slice(0, k);
  }

  buildSystemPrompt(context) {
    return [
      `You are a friendly AI assistant embedded on ${this.name}'s personal website.`,
      `Answer questions about ${this.name} in the first person as if you are their representative, using ONLY the facts below.`,
      `If something isn't covered by the facts, say you don't have that detail rather than inventing it. Keep answers concise (1-3 sentences).`,
      ``,
      `FACTS ABOUT ${this.name.toUpperCase()}:`,
      ...context.map((c, i) => `- ${c}`),
    ].join("\n");
  }

  /**
   * Load the model. Reports progress via onProgress(textOrPercent).
   * @param {(report:{progress:number,text:string})=>void} onProgress
   */
  async load(onProgress = () => {}) {
    if (this.ready) return;
    const webllm = await import(/* @vite-ignore */ WEBLLM_CDN);
    this.engine = await webllm.CreateMLCEngine(MODEL_ID, {
      initProgressCallback: (report) => onProgress(report),
    });
    this.ready = true;
  }

  /**
   * Ask a question. Streams tokens via onToken(partialText).
   * Returns the full answer string.
   */
  async ask(question, onToken = () => {}) {
    if (!this.ready) throw new Error("Model not loaded yet.");
    const context = this.retrieve(question);
    const messages = [
      { role: "system", content: this.buildSystemPrompt(context) },
      ...this.history,
      { role: "user", content: question },
    ];

    let full = "";
    const chunks = await this.engine.chat.completions.create({
      messages,
      temperature: 0.6,
      stream: true,
    });
    for await (const chunk of chunks) {
      const delta = chunk.choices?.[0]?.delta?.content || "";
      if (delta) { full += delta; onToken(full); }
    }

    this.history.push({ role: "user", content: question });
    this.history.push({ role: "assistant", content: full });
    // Keep history short to save memory/context.
    if (this.history.length > 8) this.history = this.history.slice(-8);
    return full;
  }
}

export const CHATBOT_MODEL_ID = MODEL_ID;

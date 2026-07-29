/* ============================================================
   BIO CONTENT
   Your story/journey. This ALSO powers the AI chatbot — the
   `knowledge` array below is what the bot uses to answer
   questions about you (via retrieval). Add as many short,
   focused facts/paragraphs as you like.
   ============================================================ */

export const bio = {
  // Section heading + kicker
  kicker: "About Me",
  heading: "My Journey",

  // Paragraphs displayed in the About section (visual bio).
  paragraphs: [
    {
      lead: true,
      text: "I'm a college student and current tech intern at the start of my engineering journey — focused on software engineering, with a deep curiosity for machine learning and quantum computing.",
    },
    {
      text: "Right now I'm building real-world software as an intern while pursuing my degree. Alongside that, I've done hands-on projects and research in ML and quantum computing — the kinds of hard, forward-looking problems that pull me in.",
    },
    {
      text: "My goal is simple: keep building, keep learning, and work on technology that pushes what's possible. This site (and the AI you can chat with) is one of those experiments.",
    },
  ],

  // Skill/interest tags shown under the bio.
  tags: [
    "Software Engineering",
    "Machine Learning",
    "Quantum Computing",
    "Research",
    "Python",
    "JavaScript",
  ],

  /* ----- CHATBOT KNOWLEDGE BASE -----
     Each entry is a short, self-contained fact the AI can retrieve
     to answer questions. Keep them focused (1–3 sentences).
     The more you add, the smarter/more accurate the bot. */
  knowledge: [
    "I am a college student and currently working as a tech intern, at the early stage of my career in software engineering.",
    "My primary focus is software engineering (SWE), which is what my internships and career path center on.",
    "I have a strong interest in machine learning (ML) and have completed projects and research in the field.",
    "I'm also interested in quantum computing and have done both projects and research related to it.",
    "My goal is to grow as an engineer while working on cutting-edge technology like ML and quantum computing.",
    "This personal website features a locally-running AI chatbot (no external API) that I built, which demonstrates my interest in ML in a hands-on way.",
    "I enjoy taking on hard, forward-looking technical problems and turning curiosity into real projects.",
  ],
};

/* ============================================================
   PROJECTS CONTENT
   Grouped by category to show range: Software / ML / Quantum.
   Edit freely. `featured: true` adds a glowing badge.
   ============================================================ */

export const projects = {
  kicker: "Things I've Built",
  heading: "Projects",
  // Shown as a CTA button linking to your GitHub.
  githubUrl: "https://github.com/yourusername",

  // Groups render in order. Add/remove items as you like.
  groups: [
    {
      label: "Software Engineering",
      items: [
        {
          title: "This Website + Local AI",
          featured: true,
          description:
            "A personal site with a fully in-browser AI chatbot (no external API) that answers questions about me. Built with a framework-agnostic architecture.",
          tags: ["JavaScript", "WebLLM", "WebGPU"],
          links: [{ label: "Source", href: "https://github.com/yourusername" }],
        },
        {
          title: "Project Placeholder",
          description:
            "Swap this with one of your software/internship projects. Describe what it does and the impact in a sentence or two.",
          tags: ["Add", "Your", "Stack"],
          links: [{ label: "GitHub", href: "https://github.com/yourusername" }],
        },
      ],
    },
    {
      label: "Machine Learning",
      items: [
        {
          title: "ML Project / Research Placeholder",
          description:
            "Describe your ML project or research here — the problem, approach, and any results or findings.",
          tags: ["Python", "ML"],
          links: [{ label: "GitHub", href: "https://github.com/yourusername" }],
        },
      ],
    },
    {
      label: "Quantum Computing",
      items: [
        {
          title: "Quantum Research Placeholder",
          featured: true,
          description:
            "Summarize your quantum computing research/project — what you explored and why it's interesting. (This is a standout — make it shine!)",
          tags: ["Quantum", "Research"],
          links: [{ label: "Details", href: "#" }],
        },
      ],
    },
  ],
};

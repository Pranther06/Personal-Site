/* ============================================================
   PROJECTS CONTENT
   Grouped by category: Software / ML / Quantum.
   ============================================================ */

export const projects = {
  kicker: "Things I've Built",
  heading: "Projects",
  // Shown as a CTA button linking to your GitHub.
  githubUrl: "https://github.com/Pranther06",

  // Groups render in order.
  groups: [
    {
      label: "Software Engineering",
      items: [
        {
          title: "Connect3",
          featured: true,
          description:
            "A web app that visualizes UNC's social connections as an interactive graph. Reached 350+ users and 2,000+ visits within 5 days of soft launch, mapping 550+ connections.",
          tags: ["React", "Next.js", "Node.js", "Neo4j", "FastAPI", "Twilio"],
          links: [{ label: "Live Site", href: "https://www.connect3.live" }],
        },
        {
          title: "Centible",
          description:
            "A finance iOS app with 3,000+ downloads and 5 star App Store reviews. Boosted engagement 30% with new onboarding and transaction categorization, and cut launch time 60% by refactoring data flow.",
          tags: ["Swift", "SwiftUI", "Firebase", "Core ML", "Plaid API"],
          links: [{ label: "App Store", href: "https://apps.apple.com/us/app/centible/id6443507950" }],
        },
        {
          title: "This Website + Local AI",
          description:
            "A personal site with an AI chatbot that runs fully in the browser and answers questions about me, with no external API. Built with a portable architecture that works with any framework.",
          tags: ["JavaScript", "WebLLM", "WebGPU"],
          links: [{ label: "Source", href: "https://github.com/Pranther06/Personal-Site" }],
        },
      ],
    },
    {
      label: "Machine Learning",
      items: [
        {
          title: "Predicting NMR Chemical Shifts with GNNs",
          featured: true,
          description:
            "Published research training graph neural networks on the NMRShiftDB2 database to predict carbon 13 NMR chemical shifts from molecular structure. The Graph Transformer Network predicted shifts within about 2.599 ppm, letting chemists validate newly synthesized compounds.",
          tags: ["PyTorch Geometric", "Graph Neural Networks", "RDKit", "Published"],
          links: [
            { label: "Read the Paper", href: "https://morgantonscientific.ncssm.edu/articles/VRHV7044" },
          ],
        },
      ],
    },
    {
      label: "Quantum Computing",
      items: [
        {
          title: "Quantum Walk Simulations (UNC Research)",
          featured: true,
          description:
            "Modularized quantum walk simulation code in Qiskit for reflection and boundary based walks, architecting 5+ Hamiltonian and measurement modules that cut setup time by 40%. An open source release for 50+ researchers is in progress.",
          tags: ["Qiskit", "Python", "Quantum Computing", "Research"],
          links: [],
        },
      ],
    },
  ],
};

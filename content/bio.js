/* ============================================================
   BIO CONTENT
   The `knowledge` array powers the AI chatbot - it retrieves
   from these facts to answer questions about Pranav.
   ============================================================ */

export const bio = {
  // Section heading + kicker
  kicker: "About Me",
  heading: "My Journey",

  // Paragraphs displayed in the About section (visual bio).
  paragraphs: [
    {
      lead: true,
      text: "I'm Pranav, a computer science and physics student at UNC Chapel Hill who likes building at the intersection of software, machine learning, and quantum computing.",
    },
    {
      text: "I've spent my summers as a software engineer, most recently at AWS in Seattle where I designed a supply chain simulation platform on Lambda, Step Functions, and DynamoDB. Before that I was at Ally Bank building a risk dashboard covering 500+ apps and 11,000+ projects. During the school year I teach data structures to 600+ students as a TA for COMP 210 and work on quantum computing research.",
    },
    {
      text: "I got into research early. My paper on using graph neural networks to predict carbon 13 NMR chemical shifts was published in the Morganton Scientific journal. Lately I've been modularizing quantum walk simulations in Qiskit for an open source release, and I spent a year as a quant research intern publishing market structure analysis to institutional investors.",
    },
    {
      text: "Outside of class and work I build things people actually use. Connect3, a graph visualization of UNC's social connections, reached 350+ users in its first week, and Centible, a finance app with 3,000+ downloads, is live on the App Store.",
    },
  ],

  // Skill/interest tags shown under the bio.
  tags: [
    "Software Engineering",
    "Machine Learning",
    "Quantum Computing",
    "Quantitative Finance",
    "Python",
    "TypeScript",
    "Swift",
    "AWS",
  ],

  /* ----- CHATBOT KNOWLEDGE BASE -----
     Each entry is a short, self-contained fact the AI can retrieve
     to answer questions. */
  knowledge: [
    "I am Pranav Agrawala, a student at the University of North Carolina at Chapel Hill, graduating in May 2028.",
    "I am pursuing a B.S. in Computer Science and a B.A. in Physics, with a minor in Business Administration. My GPA is 4.0.",
    "My career focus is software engineering, with deep interests in machine learning, quantum computing, and quantitative finance.",
    "In summer 2026 I was a Software Developer Engineer Intern at Amazon Web Services in Seattle, where I designed a supply chain simulation comparison platform and architected cloud infrastructure using AWS Lambda, Step Functions, DynamoDB, and Batch Jobs.",
    "In summer 2025 I was a Software Engineer Intern at Ally Bank in Charlotte, where I built a risk data dashboard with Flask, AWS Lambda, and Vue.js covering 500+ apps and 11,000+ projects, optimized GraphQL queries and DynamoDB schema to load 50,000+ risk metrics in under 2 minutes, and helped reduce application risk by 21%.",
    "From August 2025 to May 2026 I was a Quantitative Research Intern at Ingenuity Trading, authoring 10+ reports on how structural market events impact U.S. equity liquidity and trading volume, published to 50+ institutional investors.",
    "From September 2024 to August 2025 I was a Quantitative Analyst Intern at Prof of Wall Street, researching portfolio weighting strategies, implementing a 1/N equal weight portfolio in Python, and backtesting 10+ client portfolios.",
    "I am an Undergraduate Research Assistant at UNC, where I modularized quantum walk simulation code in Qiskit for reflection and boundary based walks and architected 5+ Hamiltonian and measurement modules, reducing setup time by 40%. An open source release for 50+ researchers is in progress.",
    "I am an Undergraduate Teaching Assistant for COMP 210 (Data Structures) at UNC, supporting 600+ students through discussions, concept reviews, and office hours.",
    "I published a machine learning research paper on analyzing carbon 13 NMR spectra to predict chemical shifts of carbon compounds using machine learning algorithms in the Morganton Scientific journal in June 2024.",
    "My NMR research trained graph neural networks on the NMRShiftDB2 database to predict carbon 13 NMR chemical shifts from molecular structure. The Graph Transformer Network was the most accurate model, predicting shifts within about 2.599 ppm, letting chemists validate newly synthesized compounds.",
    "I built Connect3, a web app at www.connect3.live that visualizes UNC's social connections as a graph. It reached 350+ users and 2,000+ site visits within 5 days of its soft launch. It is built with React, Next.js, Node.js, Neo4j AuraDB, Twilio, and FastAPI.",
    "I maintain Centible, a finance iOS app with 3,000+ downloads and 5 star App Store reviews, built with Swift, SwiftUI, Firebase, Core ML, and the Plaid API. I boosted user engagement 30% with new onboarding and transaction categorization features.",
    "This personal website runs an AI chatbot fully in the browser using WebLLM, with no server and no external API, which I built to demonstrate machine learning running locally on WebGPU.",
    "My programming languages include Python, Java, C++, Swift, JavaScript, TypeScript, HTML, CSS, and SQL.",
    "Frameworks and libraries I work with include React, Vue, PyTorch, Flask, Node.js, TensorFlow, Django, SciPy, and Statsmodels.",
    "My honors and certifications include AQR Discovery Day, winning the AI For Change hackathon, and the AWS Cloud Practitioner certification.",
    "At UNC I am involved in Velocity Labs, UNC Quantum Computing, AI@UNC, App Team Carolina, Girls Who Code, and Poker Club.",
    "You can reach me at pranava@unc.edu, on LinkedIn at linkedin.com/in/pranav-agrw, or on GitHub at github.com/Pranther06.",
    "I am based in Chapel Hill, North Carolina, and have interned in Seattle and Charlotte.",
  ],
};

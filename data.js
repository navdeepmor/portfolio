/* ============================================================
   PORTFOLIO DATA — edit this file to update your site.
   No other file needs to change for content updates.
   ============================================================ */

const DATA = {
  profile: {
    name: "Navdeep Mor",
    handle: "navdeepmor",
    role: "Software Developer",
    tagline: "I build reliable software and ship it with care.",
    location: "India",
    email: "navdeepmor.me@gmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/navdeepmor/",
      github: "https://github.com/navdeepmor", // update if different
    },
    // Shown in about.md — write in first person.
    about: [
      "Hi, I'm Navdeep — a software developer who enjoys turning fuzzy problems into clean, working systems.",
      "I care about readable code, fast feedback loops, and building things that hold up in production. When I'm not shipping, I'm usually reading about how other teams build software, or tinkering with side projects.",
    ],
  },

  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java", "SQL"],
    frameworks: ["React", "Node.js", "Express", "Next.js"],
    tools: ["Git", "Docker", "AWS", "PostgreSQL", "MongoDB", "Redis"],
    practices: ["REST APIs", "CI/CD", "Testing", "System Design", "Agile"],
  },

  experience: [
    {
      role: "Software Developer",
      company: "Your Current Company",
      period: "2023 — Present",
      points: [
        "Designed and shipped backend services handling production traffic.",
        "Improved API response times through query optimization and caching.",
        "Collaborated across teams to deliver features end-to-end.",
      ],
    },
    {
      role: "Software Developer Intern",
      company: "Previous Company",
      period: "2022 — 2023",
      points: [
        "Built internal tooling that reduced manual work for the team.",
        "Wrote tests and documentation for core modules.",
      ],
    },
  ],

  projects: [
    {
      name: "project-one",
      description:
        "A full-stack web application — describe what it does, the problem it solves, and what's interesting about how you built it.",
      stack: ["React", "Node.js", "PostgreSQL"],
      github: "https://github.com/navdeepmor/project-one",
      demo: "",
      status: "active",
    },
    {
      name: "project-two",
      description:
        "A CLI tool / API / library — swap in your real projects here. Two or three strong projects beat ten weak ones.",
      stack: ["Python", "Docker"],
      github: "https://github.com/navdeepmor/project-two",
      demo: "",
      status: "stable",
    },
    {
      name: "this-portfolio",
      description:
        "This site — a VS Code-themed portfolio in vanilla JS with an interactive terminal and a playable snake game. Type `snake` in the terminal below.",
      stack: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/navdeepmor/portfolio",
      demo: "",
      status: "active",
    },
  ],

  /* ------------------------------------------------------------
     INDUSTRY UPDATES — your take on what's happening in tech.
     Newest first. Add an entry, refresh, done.
     ------------------------------------------------------------ */
  updates: [
    {
      date: "2026-07-01",
      tag: "AI",
      title: "Agentic coding tools are changing how teams ship",
      note: "AI coding agents have moved from autocomplete to end-to-end task execution. The interesting shift: code review and verification are becoming the core engineering skills.",
      link: "",
    },
    {
      date: "2026-06-15",
      tag: "Web",
      title: "The return of server-side rendering",
      note: "Frameworks keep converging on the same idea — render on the server, hydrate selectively. Worth understanding the tradeoffs rather than following the hype cycle.",
      link: "",
    },
    {
      date: "2026-06-01",
      tag: "Infra",
      title: "Postgres keeps eating the database world",
      note: "Vector search, queues, full-text search — teams keep replacing specialized databases with Postgres extensions. Boring technology wins again.",
      link: "",
    },
  ],

  /* ------------------------------------------------------------
     LEARNING & ARTICLES — things you're learning and writing.
     type: "learning" (currently studying) or "article" (something you wrote)
     ------------------------------------------------------------ */
  learning: [
    {
      type: "learning",
      title: "System Design Deep Dive",
      note: "Working through distributed systems fundamentals — consensus, replication, and why everything is eventually a queue.",
      progress: 65,
      link: "",
    },
    {
      type: "learning",
      title: "Rust for Backend Services",
      note: "Learning Rust to understand what memory safety without garbage collection actually feels like in practice.",
      progress: 30,
      link: "",
    },
    {
      type: "article",
      title: "What I learned building my first production API",
      note: "Notes on error handling, versioning, and the mistakes I'd avoid next time.",
      date: "2026-05-20",
      link: "", // link to your blog post / LinkedIn article
    },
    {
      type: "article",
      title: "A practical guide to debugging in production",
      note: "Logs, metrics, traces — and the order in which to actually look at them.",
      date: "2026-04-10",
      link: "",
    },
  ],
};

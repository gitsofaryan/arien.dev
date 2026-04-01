export const resumeData = {
  personalInfo: {
    name: "Aryan Jain",
    location: "Jabalpur, MP, India",
    email: "mail.aryan.jain07@gmail.com",
    phone: "+919301525185",
    github: "gitsofaryan",
    linkedin: "aryan-jain07",
    devpost: "gitsofaryan",
    leetcode: "arien7",
    website: "https://arien.vercel.app",
    twitter: "aryanjain1506",
    instagram: "arien_jain",
    discord: "thecosmicnerd",
    telegram: "arienjain",
    tagline: "Software Engineer | Dev Tools and AI Infra Builder",
    bio: "I build developer tools, AI infrastructure, and backend systems that are practical, reliable, and production-ready. I am especially interested in agent memory architectures, delegated authority models, and model evaluation workflows that make AI systems safer and more useful.",
  },

  technicalSkills: {
    coreSkills: [
      "Data Structures and Algorithms",
      "Object-Oriented Programming",
      "Operating Systems",
      "DBMS",
      "Distributed Systems",
      "Event-Driven Architecture",
      "Developer Tooling",
    ],
    languages: ["TypeScript", "Python", "C++", "SQL"],
    frameworks: [
      "Node.js",
      "Express.js",
      "Flask",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "REST APIs",
      "WebSockets",
    ],
    blockchain_ai: [
      "LangChain",
      "LangGraph",
      "LLM Agents",
      "RAG Pipelines",
      "Multi-Agent Workflows",
      "Vector Databases",
      "Context Management",
      "PyTorch",
      "OpenCV",
      "Scikit-learn",
      "Model Evaluation",
      "Solidity",
      "Smart Contracts",
      "IPFS",
      "UCAN",
      "Ethereum",
      "Decentralized Storage",
    ],
    tools: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Supabase",
      "Firebase",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "AWS",
      "GCP",
      "Git",
    ],
  },

  experience: [
    {
      company: "Protocol Labs (PLDG)",
      location: "Remote",
      role: "Open Source Mentee and Protocol Engineer",
      duration: "Jan 2026 - Mar 2026",
      achievements: [
        "Architected and built AgentDB, a peer-to-peer decentralized memory protocol for AI agents with encrypted cross-agent state transfer, delegated authority via UCANs, and device-agnostic recovery using IPFS and IPNS.",
        "Built a UCAN delegation visualizer to improve token traceability and debugging for decentralized authorization flows, and integrated Akave O3 with PyTorch for decentralized model training pipelines.",
      ],
    },
    {
      company: "GoQuant",
      location: "Remote",
      role: "Backend Trainee Engineer",
      duration: "Jul 2025 - Aug 2025",
      achievements: [
        "Integrated BitGet REST and WebSocket APIs for real-time L1 and L2 market data, improving order book synchronization accuracy by 35% for algorithmic strategies.",
        "Built and optimized low-latency trading modules for BitGet using C# within an OEMS v4 architecture, achieving sub-millisecond order execution.",
      ],
    },
    {
      company: "Summer of Bitcoin",
      location: "Remote",
      role: "Mentee and Open Source Contributor",
      duration: "May 2025 - Aug 2025",
      achievements: [
        "Selected among the top 2% of global applicants to contribute to Bitcoin and Lightning Network core tooling.",
        "Built a React and Flask visualization platform for Lightning Network message flows and extended LNPrototest with BOLT #1 message support, reducing debugging time by 25%.",
      ],
    },
    {
      company: "Google Summer of Code 2025",
      location: "Remote",
      role: "Open Source Contributor",
      duration: "Nov 2024 - Mar 2025",
      achievements: [
        "Migrated CircuitVerse modules to TypeScript, upgraded Node.js to v22, and helped achieve 100% unit test coverage with 24 merged PRs.",
        "Contributed CI/CD, testing, and refactoring improvements across CircuitVerse, PalisaDoes Foundation, and GeNN.",
      ],
    },
  ],

  leadership: [
    {
      organization: "Google Developer Student Clubs",
      location: "Global and Campus Communities",
      role: "Founder and Lead Organizer",
      year: "2024 - 2026",
      achievements: [
        "Built and led a community ecosystem spanning GDSC initiatives, mentoring 1000+ students across hands-on sessions, project cohorts, and hackathons.",
        "Scaled community participation to 5000+ members through consistent programming, partnerships, and student-led leadership pipelines.",
      ],
    },
    {
      organization: "Microsoft Learn Student Ambassadors",
      location: "Global Student Network",
      role: "Community Leader and Mentor",
      year: "2025",
      achievements: [
        "Organized technical sessions and mentorship tracks focused on practical software engineering, AI, and cloud fundamentals.",
      ],
    },
    {
      organization: "UiPath Student Developer Community",
      location: "India",
      role: "Lead Organizer",
      year: "2025",
      achievements: [
        "Led community events and mentoring focused on automation, product thinking, and practical implementation.",
      ],
    },
  ],

  projects: [
    {
      title: "CodeSpace - Real-Time Collaborative Code Editor",
      description:
        "Built a scalable collaborative code editor where multiple users can write, compile, and execute code in real time over WebSockets. Implemented secure authentication, room-based session management, and a remote execution engine for multi-language support.",
      tech: ["React.js", "Node.js", "WebSockets", "MongoDB"],
      link: "https://github.com/gitsofaryan/codespace",
    },
    {
      title: "Naomi - AI Fashion Stylist",
      description:
        "Developed an AI-powered virtual stylist with real-time AR try-on using MediaPipe pose detection and Three.js rendering. Integrated OpenAI-powered recommendations and built a digital wardrobe for personalized outfit planning.",
      tech: ["Next.js", "TypeScript", "Three.js", "OpenAI", "MediaPipe"],
      link: "https://github.com/gitsofaryan/naomi",
    },
    {
      title: "ATS100 - AI Resume Analyzer",
      description:
        "Built an AI resume analysis platform that computes ATS scores, identifies keyword gaps, and generates practical improvement suggestions. Designed a type-safe React and TypeScript frontend with PDF.js parsing and real-time analysis workflows.",
      tech: ["React.js", "TypeScript", "Tailwind CSS", "PDF.js", "Vite"],
      link: "https://github.com/gitsofaryan/ats100",
    },
  ],

  openSource: [
    {
      title: "Protocol Labs",
      role: "Protocol Engineer",
      duration: "Jan 2026 - Mar 2026",
      link: "https://github.com/protocol",
      desc: [
        "Built AgentDB, a decentralized memory layer for AI agents using UCAN, IPFS, and IPNS.",
        "Created developer tooling to inspect delegation flows and improve authorization debugging in distributed environments.",
      ],
    },
    {
      title: "CircuitVerse",
      role: "Maintainer",
      duration: "2024 - 2025",
      link: "https://github.com/CircuitVerse/CircuitVerse",
      desc: [
        "Migrated core simulator modules to TypeScript and modernized Node.js infrastructure to v22.",
        "Contributed test coverage, CI/CD reliability improvements, and refactoring work across active modules.",
      ],
    },
  ],

  focus: [
    {
      title: "Developer Tools and AI Infra",
      desc: "I am focused on building tools and infrastructure that help teams ship AI products faster, with better observability, reliability, and developer experience.",
    },
    {
      title: "Agent Memory and Delegation Systems",
      desc: "I am actively exploring decentralized memory layers for AI agents, including UCAN-based delegation authority, secure state transfer, and recovery across devices.",
    },
    {
      title: "Model Evaluation and Applied Research",
      desc: "I care deeply about AI model evaluation, testing frameworks, and practical benchmarks that keep model behavior measurable and trustworthy in production.",
    },
  ],

  achievements: [
    "Co-inventor on 3 AI and software patents.",
    "Top 5 contributor in 3 consecutive GitLab open-source hackathons.",
    "Global Rank 1528 in Meta Hacker Cup 2025.",
    "Solved 500+ DSA problems across C++, Python, and SQL.",
    "Selected for Solana Dev Fellowship.",
    "Top 10 Startup at Cisco ThingQbator.",
    "Top 50 at Eureka 2025.",
    "Selected for Amazon ML Summer School 2025.",
    "Founder and lead organizer across GDSC, MLSA, and UiPath student communities.",
    "Mentored 1000+ students and helped build a 5000+ member global community.",
    "Participated in 80+ hackathons globally with multiple finalist and podium finishes.",
    "Maintained 1000+ GitHub contributions across open-source projects.",
  ],

  education: [
    {
      institution: "Gyan Ganga Institute of Technology and Sciences, Jabalpur",
      degree:
        "Bachelor of Technology in Computer Science and Business System (CSBS)",
      duration: "2022 - 2026",
      grade: "CGPA: 8.4",
    },
  ],
};

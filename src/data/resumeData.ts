export const resumeData = {
  personalInfo: {
    name: "Aryan Jain",
    location: "Jabalpur, India",
    email: "mail.aryan.jain07@gmail.com",
    phone: "+919301525185",
    github: "gitsofaryan",
    linkedin: "aryan-jain07",
    devpost: "gitsofaryan",
    leetcode: "arien7",
    website: "https://www.arienjain.tech/",
    tagline: "Software Engineer | AI-Native Builder | 77x Hackathon Shipper",
    bio: "I am a 0 → 1 builder who thrives in the chaos of early-stage development. I don't just write syntax; I ship products. Armed with an AI-native workflow, I compress months of development into weeks. My background isn't just theory—it's battle-tested in 77+ hackathons, Google Summer of Code, and high-frequency trading environments where microseconds matter.",
  },

  technicalSkills: {
    coreSkills: [
      "MERN Stack Development",
      "Data Structures & Algorithms",
      "System Design",
      "Object-Oriented Programming",
      "Smart Contract Development",
      "Microservices Architecture",
    ],
    languages: [
      "TypeScript",
      "JavaScript",
      "Rust",
      "Solidity",
      "C++",
      "Python",
      "Go",
      "SQL",
    ],
    frameworks: [
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Flask",
      "Rocket (Rust)",
    ],
    blockchain_ai: [
      "Solidity",
      "Smart Contracts",
      "Web3.js",
      "Machine Learning",
      "Deep Learning",
      "Data Science",
      "TensorFlow/PyTorch",
    ],
    tools: [
      "Git/GitHub",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "AWS/GCP/Azure",
      "Supabase",
      "PostgreSQL",
      "MongoDB",
      "Redis",
    ],
  },


 
  experience: [
    {
      company: "Protocol Labs Dev Guild",
      location: "Remote",
      role: "Fellow (Cohort 5) - Team Linka",
      duration: "Present",
      achievements: [
        "Selected for the Protocol Labs Dev Guild Cohort 5 to contribute to the Filecoin and IPFS ecosystem.",
        "Collaborating with Team Linka to build decentralized social graph infrastructure and OSS tooling.",
      ],
    },
    {
      company: "GoQuant",
      location: "Remote",
      role: "Backend Engineer Trainee",
      duration: "July 2025 – August 2025",
      achievements: [
        "Engineered low-latency backend modules for the BitGet exchange using C# within an OEMS v4 architecture.",
        "Enabled sub-millisecond order execution and improved order book efficiency by 35% by integrating real-time market data APIs.",
      ],
    },
    {
      company: "Summer of Bitcoin",
      location: "Remote",
      role: "Mentee & Contributor",
      duration: "May 2025 – August 2025",
      achievements: [
        "Selected for a prestigious program focused on the Bitcoin protocol and Lightning Network.",
        "Developed a full-stack React + Flask visualization tool for Lightning Network message flows and enhanced LNPrototest, improving debugging speed by 25%.",
      ],
    },
    {
      company: "Google Summer of Code '25",
      location: "Remote",
      role: "Contributor",
      duration: "May 2025 – August 2025",
      achievements: [
        "CircuitVerse: Migrated simulator modules to TypeScript, achieving 100% unit test coverage and upgrading the Node.js infrastructure.",
        "Palisa Does Foundation: Transitioned CI/CD pipelines from Jenkins to GitHub Actions, containerizing builds for parallel execution.",
      ],
    },
    {
      company: "GitLab",
      location: "Remote",
      role: "Open Source Contributor",
      duration: "March 2025 – August 2025",
      achievements: [
        "Ranked Top 5 in three consecutive GitLab OSS hackathons.",
        "Structured QA automation and maintained unit tests across multiple product teams to ensure release stability.",
      ],
    },
  ],

  leadership: [
    {
      organization: "Google Developer Student Clubs",
      location: "Jabalpur, India",
      role: "Organizer & Lead",
      year: "2024",
      achievements: [
        "Led a core team of 12, mentoring 1000+ students and scaling the community to 5000+ members across multiple initiatives.",
        "Organized workshops, hackathons, and study jams on Google Cloud, Generative AI, Flutter, and Web Development; recognized as a Top 5 GDSC campus club in India.",
      ],
    },
    {
      organization: "Google Cloud Arcade Facilitator",
      location: "Jabalpur, India",
      role: "Facilitator (2x Certified)",
      year: "2025",
      achievements: [
        "Facilitated Google Cloud Arcade campaigns twice, helping over 500+ learners gain Google Cloud skills and achieve the Ultimate Milestone badge.",
      ],
    },
    {
      organization: "NASA International Space Apps Challenge",
      location: "Remote",
      role: "Global Organizing Team & Judge",
      year: "2025",
      achievements: [
        "Led the global organizing team, designing hackathon workflows, coordinating mentors and participants across time zones, and judging 70+ projects while mentoring teams to refine submissions and achieve awards.",
      ],
    },
  ],

  projects: [
    {
      title: "FinLitera - AI Financial Assistant",
      description:
        "Built an AI platform providing financial guidance, investment tips, budgeting advice, and interactive learning. Implemented real-time portfolio analysis and AI recommendations using Next.js, Supabase, and OpenAI; handled data integration and multi-feature synchronization challenges.",
      tech: [
        "Next.js",
        "Tailwind CSS",
        "Shadcn-ui",
        "Magic-ui",
        "Supabase",
        "NextAuth",
        "Prisma",
        "OpenAI API",
        "Vercel",
      ],
      link: "https://github.com/gitsofaryan/finlitera",
    },
    {
      title: "ATS100 - AI Resume Analyzer",
      description:
        "Built a web app that analyzes resumes, gives ATS scores, and provides feedback on strengths, weaknesses, and improvements. Developed PDF upload and processing with PDF.js, AI-powered content analysis, and visual previews using React, Tailwind, and TypeScript.",
      tech: [
        "React.js",
        "React Router v7",
        "Tailwind CSS",
        "TypeScript",
        "PDF.js",
        "Puter.js",
        "Vite",
      ],
      link: "https://github.com/gitsofaryan/ats100",
    },
    {
      title: "CodeSpace - Realtime Code Editor",
      description:
        "Built a collaborative code editor that allows multiple users to code together in real-time. Engineered real-time synchronization with Socket.io, advanced file management, and integrated chat/notifications while addressing concurrency and scalability challenges.",
      tech: [
        "React.js",
        "TypeScript",
        "React Router",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "Socket.io",
      ],
      link: "https://github.com/gitsofaryan/codespace",
    },
    {
      title: "InSignia - Indian Sign Language Translator",
      description:
        "Made a platform that can turn Indian Sign Language (ISL) gestures into text and speech in real-time so people can understand each other easily. Used CNNs to recognize gestures, connected special gloves to read hand movements, added Flask backend and speech output.",
      tech: [
        "Python",
        "CNN",
        "Flask",
        "OpenCV",
        "Mediapipe",
        "pyttsx3",
        "Google TTS",
      ],
      link: "https://github.com/gitsofaryan/insignia",
    },
  ],

  achievements: [
    "Veteren Competitor: 77+ Hackathons wins across Devpost, MLH (Smart India Hackathon, MS Imagine Cup)",
    "Mentorship: GDSC Lead (1000+ students), Google Cloud Arcade Facilitator",
    "Space Research: NASA Citizen Scientist (50+ projects)",
    "Algorithmic Solving: 500+ DSA Problems (LeetCode, CodeChef), Active AtCoder",
    "Open Source: GSoC '25, Summer of Bitcoin '25, GitLab Top 5 Contributor"
  ],

  education: {
    institution: "Gyan Ganga Institute of Technology and Sciences, Jabalpur",
    degree:
      "Bachelor of Technology in Computer Science and Business System (CSBS)",
    duration: "2022 - 2026",
    cgpa: "8.25",
  },
};

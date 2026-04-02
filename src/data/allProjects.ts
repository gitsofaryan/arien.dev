export interface UnifiedProject {
  id: string;
  title: string;
  description: string;
  owner?: string;
  repo?: string;
  link: string;
  tech: string[];
  tags: (
    | "opensource"
    | "github"
    | "hackathon"
    | "devpost"
    | "featured"
    | "ai"
    | "blockchain"
  )[];
  stats?: {
    stars?: number;
    forks?: number;
    likes?: number;
  };
  size?: "small" | "medium" | "large"; // For masonry layout
}

export const allProjects: UnifiedProject[] = [
  // Open Source Projects
  {
    id: "agentdb",
    title: "AgentDB",
    description:
      "Decentralized memory protocol for AI agents with encrypted cross-agent state transfer and UCAN delegation",
    owner: "gitsofaryan",
    repo: "agentdb",
    link: "https://github.com/gitsofaryan/agentdb",
    tech: ["TypeScript", "IPFS", "UCAN", "Decentralized"],
    tags: ["opensource", "github", "blockchain", "ai"],
    stats: { stars: 89, forks: 18 },
    size: "large",
  },
  {
    id: "lightning-event-viewer",
    title: "Lightning Event Viewer",
    description:
      "Real-time protocol monitor for Lightning Network visualization during Summer of Bitcoin 2025",
    owner: "gitsofaryan",
    repo: "lightning-event-viewer",
    link: "https://github.com/gitsofaryan/lightning-event-viewer",
    tech: ["TypeScript", "React", "Visualization"],
    tags: ["opensource", "github"],
    stats: { stars: 24, forks: 5 },
    size: "medium",
  },
  {
    id: "codespace",
    title: "CodeSpace",
    description:
      "Real-time collaborative code editor with WebSocket support, room-based sessions, and multi-user synchronization",
    owner: "gitsofaryan",
    repo: "codespace",
    link: "https://github.com/gitsofaryan/codespace",
    tech: ["React", "Node.js", "WebSockets", "MongoDB"],
    tags: ["opensource", "github", "featured"],
    stats: { stars: 56, forks: 15 },
    size: "large",
  },
  {
    id: "ats100",
    title: "ATS100",
    description:
      "AI-powered resume analyzer providing ATS scores, keyword gap analysis, and practical improvement suggestions",
    owner: "gitsofaryan",
    repo: "ats100",
    link: "https://github.com/gitsofaryan/ats100",
    tech: ["React", "TypeScript", "Tailwind CSS", "PDF.js"],
    tags: ["opensource", "github", "featured", "ai"],
    stats: { stars: 38, forks: 9 },
    size: "medium",
  },
  {
    id: "naomi",
    title: "Naomi",
    description:
      "AI-powered virtual stylist with real-time AR try-on using MediaPipe pose detection and Three.js rendering",
    owner: "gitsofaryan",
    repo: "naomi",
    link: "https://github.com/gitsofaryan/naomi",
    tech: ["Next.js", "Three.js", "OpenAI", "MediaPipe"],
    tags: ["opensource", "github", "ai"],
    stats: { stars: 45, forks: 12 },
    size: "medium",
  },
  {
    id: "interview-room",
    title: "Interview Room",
    description:
      "Automated mock interview platform with voice/text support, real-time feedback, and AI-powered scoring",
    owner: "gitsofaryan",
    repo: "interview-room",
    link: "https://github.com/gitsofaryan/interview-room",
    tech: ["TypeScript", "React", "Voice API", "AI"],
    tags: ["opensource", "github", "ai"],
    stats: { stars: 32, forks: 8 },
    size: "medium",
  },
  {
    id: "akave-pytorch-o3",
    title: "Akave PyTorch O3",
    description:
      "Decentralized ML pipeline streaming data, training models, and storing immutable checkpoints",
    owner: "gitsofaryan",
    repo: "akave-pytorch-o3",
    link: "https://github.com/gitsofaryan/akave-pytorch-o3",
    tech: ["Python", "PyTorch", "Decentralized", "ML"],
    tags: ["opensource", "github", "blockchain", "ai"],
    stats: { stars: 28, forks: 7 },
    size: "small",
  },

  // Hackathon Projects from Devpost
  {
    id: "bitquine",
    title: "BitQuine",
    description:
      "Lightning-fast Bitcoin AI trading assistant powered by Groq and Llama3 with real-time analysis and signals",
    link: "https://devpost.com/software/bitquine",
    tech: ["AI", "Bitcoin", "Groq", "Llama3"],
    tags: ["hackathon", "devpost", "ai", "blockchain"],
    stats: { likes: 4 },
    size: "medium",
  },
  {
    id: "oecd-dashboard",
    title: "AI & Jobs: OECD Dashboard",
    description:
      "Interactive dashboard analyzing AI impact on jobs, income, work-life balance, and wellbeing across OECD nations",
    link: "https://devpost.com/software/ai-jobs-oecd",
    tech: ["AI", "Data Visualization", "Dashboard", "Analytics"],
    tags: ["hackathon", "devpost", "ai"],
    stats: { likes: 8 },
    size: "large",
  },
  {
    id: "echo",
    title: "Echo",
    description:
      "Create lifelike AI avatars to preserve voice, personality, and memories with video, chat, and voice interactions",
    link: "https://devpost.com/software/echo",
    tech: ["AI", "Voice Tech", "Avatar", "ML"],
    tags: ["hackathon", "devpost", "ai"],
    stats: { likes: 4 },
    size: "medium",
  },
  {
    id: "insignia",
    title: "InSignia",
    description:
      "Indian Sign Language translator for real-time communication using computer vision and deep learning",
    link: "https://devpost.com/software/insignia",
    tech: ["Python", "CNN", "Flask", "OpenCV", "MediaPipe"],
    tags: ["hackathon", "devpost", "ai"],
    stats: { likes: 6 },
    size: "medium",
  },
  {
    id: "hope-ai",
    title: "Hope.ai",
    description:
      "Digital companion fostering mental wellness, championing accessibility, and enabling personalized imaginative journeys",
    link: "https://devpost.com/software/hope-ai",
    tech: ["AI", "Mental Health", "Accessibility", "React"],
    tags: ["hackathon", "devpost", "ai"],
    stats: { likes: 4 },
    size: "small",
  },
  {
    id: "deepfake-detection",
    title: "Deepfake Detection",
    description:
      "Advanced system for identifying and exposing hidden dangers of deepfakes using deep learning",
    link: "https://devpost.com/software/deepfake-detection",
    tech: ["AI", "Computer Vision", "Security", "Deep Learning"],
    tags: ["hackathon", "devpost", "ai"],
    stats: { likes: 5 },
    size: "small",
  },
  {
    id: "earthview-ai",
    title: "EarthView AI",
    description:
      "AI-powered perspective on regional climatic shifts using data analysis and visualization",
    link: "https://devpost.com/software/earthview-ai",
    tech: ["AI", "Climate", "Data Analysis", "Visualization"],
    tags: ["hackathon", "devpost", "ai"],
    stats: { likes: 6 },
    size: "small",
  },

  // Featured Projects
  {
    id: "finlitera",
    title: "Finlitera",
    description:
      "AI financial assistant providing guidance, investment tips, and portfolio analysis with real-time market data",
    owner: "gitsofaryan",
    repo: "finlitera",
    link: "https://github.com/gitsofaryan/finlitera",
    tech: ["TypeScript", "React", "API", "AI"],
    tags: ["featured", "github", "ai"],
    stats: { stars: 42, forks: 12 },
    size: "medium",
  },
];

export const getProjectsByTag = (tag: string): UnifiedProject[] => {
  return allProjects.filter((p) => p.tags.includes(tag as any));
};

export const getProjectById = (id: string): UnifiedProject | undefined => {
  return allProjects.find((p) => p.id === id);
};

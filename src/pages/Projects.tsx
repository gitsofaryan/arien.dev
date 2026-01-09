import { useState, useEffect } from 'react';
import { ExternalLink, Github, Trophy } from 'lucide-react';

interface ProjectCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repo: string;
  demo?: string;
  image?: string;
}

interface DevpostProject {
  title: string;
  tagline: string;
  url: string;
  submittedAt: string;
  likeCount: number;
  technologies: string[];
}

const Projects = () => {
  const [devpostProjects, setDevpostProjects] = useState<DevpostProject[]>([]);
  const [isLoadingDevpost, setIsLoadingDevpost] = useState(true);
  const projects: ProjectCard[] = [
    {
      id: 'finlitera',
      title: 'FinLitera - AI Financial Assistant',
      description: 'Built an AI platform providing financial guidance, investment tips, budgeting advice, and interactive learning. Implemented real-time portfolio analysis and AI recommendations.',
      tags: ['Next.js', 'Supabase', 'OpenAI API', 'Prisma', 'NextAuth'],
      repo: 'https://github.com/gitsofaryan/finlitera',
      demo: 'https://finlitera.vercel.app'
    },
    {
      id: 'ats100',
      title: 'ATS100 - AI Resume Analyzer',
      description: 'Built a web app that analyzes resumes, gives ATS scores, and provides feedback on strengths, weaknesses, and improvements.',
      tags: ['React.js', 'TypeScript', 'PDF.js', 'Vite', 'AI'],
      repo: 'https://github.com/gitsofaryan/ats100',
      demo: 'https://ats100.vercel.app'
    },
    {
      id: 'codespace',
      title: 'CodeSpace - Realtime Code Editor',
      description: 'Built a collaborative code editor that allows multiple users to code together in real-time with instant synchronization and integrated chat.',
      tags: ['React.js', 'TypeScript', 'Socket.io', 'Node.js', 'Express.js'],
      repo: 'https://github.com/gitsofaryan/codespace',
      demo: 'https://codespace-editor.vercel.app'
    },
    {
      id: 'insignia',
      title: 'InSignia - Indian Sign Language Translator',
      description: 'A platform that turns Indian Sign Language (ISL) gestures into text and speech in real-time for easy communication.',
      tags: ['Python', 'CNN', 'Flask', 'OpenCV', 'Mediapipe'],
      repo: 'https://github.com/gitsofaryan/insignia'
    }
  ];

  useEffect(() => {
    // Use mock data directly since API isn't working
    const mockDevpostProjects: DevpostProject[] = [
      {
        title: 'BitQuine — Lightning-Fast Bitcoin Trading AI',
        tagline: 'A high-speed Bitcoin AI assistant powered by Groq and Llama3 that delivers real-time BTC analysis, trading insights, and BUY/SELL/HOLD signals',
        url: 'https://devpost.com/software/bitquine',
        submittedAt: '2024',
        likeCount: 4,
        technologies: ['AI', 'Bitcoin', 'Groq', 'Llama3']
      },
      {
        title: 'AI & Jobs: OECD Wellbeing Impact Dashboard',
        tagline: 'Interactive dashboard analyzing AI\'s impact on jobs, income, work-life balance, and wellbeing across OECD countries using AI-driven insights',
        url: 'https://devpost.com/software/ai-jobs-oecd',
        submittedAt: '2024',
        likeCount: 8,
        technologies: ['AI', 'Data Visualization', 'Dashboard', 'Analytics']
      },
      {
        title: 'Echo',
        tagline: 'Create lifelike AI avatars of loved ones to preserve their voice, personality, and memories forever. Connect through video, chat, and voice interactions',
        url: 'https://devpost.com/software/echo',
        submittedAt: '2024',
        likeCount: 4,
        technologies: ['AI', 'Voice Tech', 'Avatar', 'ML']
      },
      {
        title: 'InSignia',
        tagline: 'Bridging Silence, Empowering Voices! Indian Sign Language translator for real-time communication',
        url: 'https://devpost.com/software/insignia',
        submittedAt: '2024',
        likeCount: 6,
        technologies: ['Python', 'CNN', 'Flask', 'OpenCV', 'Mediapipe']
      },
      {
        title: 'Hope.ai',
        tagline: 'Hope is your digital companion, dedicated to fostering mental wellness, championing accessibility, and sparking imaginative journeys through personalized experiences',
        url: 'https://devpost.com/software/hope-ai',
        submittedAt: '2024',
        likeCount: 4,
        technologies: ['AI', 'Mental Health', 'Accessibility', 'React']
      },
      {
        title: 'Deepfake Detection',
        tagline: 'Beneath the Mask: Revealing the Hidden Danger of Deepfakes',
        url: 'https://devpost.com/software/deepfake-detection',
        submittedAt: '2024',
        likeCount: 5,
        technologies: ['AI', 'Computer Vision', 'Security', 'Deep Learning']
      },
      {
        title: 'EarthView AI',
        tagline: 'An AI-powered perspective on regional climatic shifts on Earth',
        url: 'https://devpost.com/software/earthview-ai',
        submittedAt: '2024',
        likeCount: 6,
        technologies: ['AI', 'Climate', 'Data Analysis', 'Visualization']
      },
      {
        title: 'the codespace',
        tagline: 'code, collaborate, draw and chat - A real-time collaborative code editor',
        url: 'https://devpost.com/software/the-codespace',
        submittedAt: '2024',
        likeCount: 1,
        technologies: ['React', 'Socket.io', 'Node.js', 'Collaboration']
      }
    ];

    setDevpostProjects(mockDevpostProjects);
    setIsLoadingDevpost(false);
  }, []);

  const formatDate = (dateString: string) => {
    // Handle both date formats - "Mar 2024" or "2024-03-15"
    if (dateString.includes('-')) {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
    }
    return dateString;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Projects</h1>
      <p className="text-lg mb-10">
        A showcase of my featured projects including AI-powered applications, real-time collaborative tools,
        and accessibility solutions. Each project demonstrates full-stack development skills and problem-solving abilities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {projects.map(project => (
          <div
            key={project.id}
            className="bg-vscode-sidebar border border-vscode-border rounded-lg overflow-hidden hover:border-vscode-accent transition-colors p-6"
          >
            <h2 className="text-xl font-bold mb-2 text-white">{project.title}</h2>
            <p className="text-vscode-text mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span
                  key={`${project.id}-${tag}`}
                  className="text-xs px-2 py-1 bg-vscode-highlight rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-vscode-border">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-vscode-accent hover:underline"
              >
                <Github size={18} />
                <span>Repo</span>
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-vscode-accent hover:underline"
                >
                  <ExternalLink size={18} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Devpost Hackathon Projects Section */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="text-vscode-accent" size={28} />
            Hackathon Projects
          </h2>
          <a
            href="https://devpost.com/gitsofaryan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-vscode-accent hover:underline flex items-center gap-1"
          >
            View on Devpost
            <ExternalLink size={16} />
          </a>
        </div>

        <p className="text-vscode-text mb-8">
          Projects built during hackathons, showcasing rapid prototyping and creative problem-solving.
        </p>

        {isLoadingDevpost ? (
          <div className="flex justify-center my-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vscode-accent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {devpostProjects.map((project, index) => (
              <div
                key={index}
                className="bg-vscode-sidebar border border-vscode-border rounded-lg p-6 hover:border-vscode-accent transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  {project.likeCount > 0 && (
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded flex items-center gap-1">
                      ❤️ {project.likeCount}
                    </span>
                  )}
                </div>

                <p className="text-vscode-text mb-4">{project.tagline}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-vscode-highlight rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-vscode-border">
                  <span className="text-sm text-vscode-comment">
                    {formatDate(project.submittedAt)}
                  </span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-vscode-accent hover:underline"
                  >
                    View Project
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;

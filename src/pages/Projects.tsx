import { useState, useEffect } from 'react';
import { ExternalLink, Github, Trophy, Rocket, Code, Star, GitBranch } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { resumeData } from '@/data/resumeData';

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
    if (dateString.includes('-')) {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
    }
    return dateString;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-fade-in font-mono text-vscode-text/80">

      {/* Header */}
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-vscode-text mb-6 tracking-tight flex items-center gap-4">
          <Rocket size={40} className="text-vscode-accent" />
          <span>
            <span className="text-vscode-function">work</span>
            <span className="text-vscode-class">.done</span>
          </span>
        </h1>
        <p className="text-lg text-vscode-text/60 max-w-2xl leading-relaxed">
          A collection of high-impact shipping. From full-stack platforms to AI experimental labs, these differ from tutorials—they solve real problems.
        </p>
      </section>

      <hr className="border-vscode-border opacity-50 mb-16" />

      {/* Main Projects Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-vscode-text mb-10 flex items-center gap-3">
          <GitBranch size={28} className="text-vscode-accent" />
          Featured Deployments
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumeData.projects.map((project, idx) => (
            <Card key={idx} className="bg-vscode-sidebar border-vscode-border hover:border-vscode-accent transition-all group h-full">
              <CardContent className="pt-6 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-vscode-text group-hover:text-vscode-accent transition-colors">{project.title}</h3>
                  <a href={project.link} target="_blank" rel="noopener" className="text-vscode-text/60 hover:text-vscode-text transition-colors p-1 hover:bg-vscode-highlight rounded"><Github size={20} /></a>
                </div>
                <p className="text-sm text-vscode-text/60 mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.slice(0, 6).map(t => (
                    <span key={t} className="text-[10px] px-2 py-1 bg-vscode-bg border border-vscode-border rounded text-vscode-text uppercase tracking-wider">{t}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Devpost / Hackathons Section */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <h2 className="text-3xl font-bold text-vscode-text flex items-center gap-3">
            <Trophy size={28} className="text-yellow-500" />
            Hackathon Grinds
          </h2>
          <a
            href="https://devpost.com/gitsofaryan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-vscode-accent hover:text-vscode-text transition-colors text-sm font-bold bg-vscode-sidebar px-4 py-2 rounded border border-vscode-border"
          >
            View full history on Devpost <ExternalLink size={14} />
          </a>
        </div>

        {isLoadingDevpost ? (
          <div className="flex justify-center my-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-vscode-accent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devpostProjects.map((project, index) => (
              <Card key={index} className="bg-vscode-sidebar border-vscode-border hover:border-vscode-accent transition-all group h-full">
                <CardContent className="pt-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-vscode-text group-hover:text-vscode-accent transition-colors line-clamp-1" title={project.title}>{project.title}</h3>
                    {project.likeCount > 0 && (
                      <span className="flex items-center gap-1 text-xs text-vscode-comment bg-vscode-bg px-2 py-1 rounded">
                        <Star size={10} className="fill-vscode-accent text-vscode-accent" /> {project.likeCount}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-vscode-text/60 mb-4 line-clamp-3 leading-relaxed flex-grow">
                    {project.tagline}
                  </p>

                  <div className="space-y-4 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 bg-vscode-bg border border-vscode-border rounded text-vscode-text">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 text-vscode-comment">+{project.technologies.length - 3}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-vscode-border">
                      <span className="text-[10px] text-vscode-comment">{formatDate(project.submittedAt)}</span>
                      <a href={project.url} target="_blank" rel="noopener" className="text-xs font-bold text-vscode-accent hover:text-vscode-text flex items-center gap-1">
                        Check it out <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Final Quote */}
      <div className="text-center pt-12 pb-8 opacity-40 text-xs font-mono">
        <p>"Ship early, ship often, and maybe write a test or two."</p>
      </div>

    </div>
  );
};

export default Projects;

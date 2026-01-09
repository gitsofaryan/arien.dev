import { useState, useEffect } from 'react';
import { ExternalLink, Trophy } from 'lucide-react';
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

  useEffect(() => {
    const mockDevpostProjects: DevpostProject[] = [
      {
        title: 'BitQuine — Lightning-Fast Bitcoin Trading AI',
        tagline: 'A high-speed Bitcoin AI assistant powered by Groq and Llama3',
        url: 'https://devpost.com/software/bitquine',
        submittedAt: '2024',
        likeCount: 4,
        technologies: ['AI', 'Bitcoin', 'Groq', 'Llama3']
      },
      {
        title: 'AI & Jobs: OECD Wellbeing Impact Dashboard',
        tagline: 'Interactive dashboard analyzing AI\'s impact on jobs and wellbeing',
        url: 'https://devpost.com/software/ai-jobs-oecd',
        submittedAt: '2024',
        likeCount: 8,
        technologies: ['AI', 'Data Visualization', 'Analytics']
      },
      {
        title: 'Echo',
        tagline: 'Create lifelike AI avatars to preserve memories forever',
        url: 'https://devpost.com/software/echo',
        submittedAt: '2024',
        likeCount: 4,
        technologies: ['AI', 'Voice Tech', 'Avatar']
      },
      {
        title: 'Deepfake Detection',
        tagline: 'Revealing the Hidden Danger of Deepfakes',
        url: 'https://devpost.com/software/deepfake-detection',
        submittedAt: '2024',
        likeCount: 5,
        technologies: ['AI', 'Computer Vision', 'Security']
      }
    ];
    setDevpostProjects(mockDevpostProjects);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-muted-foreground mb-2 font-mono text-sm">$ ls projects/</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          Projects
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          A collection of tools, applications, and contributions to the open-source ecosystem.
        </p>
      </div>

      {/* Featured Projects */}
      <div className="grid gap-4 mb-16">
        {resumeData.projects.map((project, i) => (
          <a
            key={i}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-card border border-border rounded-md hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h2>
              <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors mt-1" />
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(tech => (
                <span key={tech} className="text-xs font-mono px-2 py-1 bg-muted rounded text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* Hackathon Projects */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Trophy size={20} className="text-primary" />
            Hackathon Projects
          </h2>
          <a
            href="https://devpost.com/gitsofaryan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            View on Devpost <ExternalLink size={12} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devpostProjects.map((project, i) => (
            <a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-card border border-border rounded-md hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.likeCount > 0 && (
                  <span className="text-xs text-muted-foreground">❤️ {project.likeCount}</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{project.tagline}</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, j) => (
                  <span key={j} className="text-xs font-mono text-muted-foreground">
                    {tech}{j < 2 && project.technologies.length > j + 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* GitHub Activity */}
      <div className="pt-8 border-t border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Contribution Activity</h2>
        <div className="bg-card border border-border rounded-md p-4">
          <img
            src={`https://ghchart.rshah.org/3B82F6/${resumeData.personalInfo.github}`}
            alt="GitHub contribution chart"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;

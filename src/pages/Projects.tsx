import { useState, useEffect, type CSSProperties } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RevealItem, StaggeredSection } from '@/components/ui/motion';
import { allProjects, UnifiedProject, getProjectById } from '@/data/allProjects';
import { useGitHubReadme } from '@/hooks/useGitHubReadme';

const getTagColor = (tag: string) => {
  const colors: Record<string, string> = {
    opensource: 'bg-green-500/20 text-green-300 border-green-500/30',
    github: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    hackathon: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    devpost: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    featured: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    ai: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    blockchain: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  };
  return colors[tag] || 'bg-vscode-highlight text-vscode-text border-vscode-border';
};

const renderMarkdown = (md: string) => {
  if (!md) return '';

  return md
    .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-3 text-vscode-text">$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-vscode-text">$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1 class="text-3xl font-bold mt-10 mb-5 text-vscode-text">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-vscode-text">$1</strong>')
    .replace(/__(.*?)__/g, '<strong class="font-bold text-vscode-text">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-vscode-text/90">$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">$1</a>')
    .replace(/`(.*?)`/g, '<code class="bg-vscode-highlight px-1.5 py-0.5 rounded text-xs font-mono text-vscode-text">$1</code>')
    .replace(/```([\w]*)\n([\s\S]*?)```/g, '<pre class="bg-black/50 border border-vscode-border p-4 rounded my-4 overflow-x-auto"><code class="text-sm font-mono text-vscode-text/80">$2</code></pre>')
    .split('\n\n')
    .map(p => p.trim() ? `<p class="mb-4 text-vscode-text/80 leading-relaxed">${p.replace(/\n/g, '<br>')}</p>` : '')
    .join('');
};

const Projects = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState<UnifiedProject | null>(null);

  const { readme, isLoading: isLoadingReadme, error: readmeError } = useGitHubReadme(
    selectedProject?.owner || '',
    selectedProject?.repo || ''
  );

  // Handle project selection via URL
  useEffect(() => {
    if (!id) {
      setSelectedProject(null);
      return;
    }
    const project = getProjectById(id);
    setSelectedProject(project || null);
  }, [id]);

  const handleProjectClick = (project: UnifiedProject) => {
    // Only open detail view if it has a repo (Github projects)
    if (project.owner && project.repo) {
      navigate(`/projects/${project.id}`);
      setSelectedProject(project);
    } else {
      // External projects open in new tab
      window.open(project.link, '_blank');
    }
  };

  const handleBackClick = () => {
    navigate('/projects');
    setSelectedProject(null);
  };

  // Irregular masonry pattern: alternating square and rectangle cards with varied heights.
  const getMasonryClass = (index: number) => {
    const patterns = [
      'min-h-[250px] md:min-h-[300px]',
      'min-h-[300px] md:min-h-[390px]',
      'min-h-[230px] md:min-h-[290px]',
      'min-h-[320px] md:min-h-[470px]',
      'min-h-[260px] md:min-h-[350px]',
      'min-h-[290px] md:min-h-[430px]',
      'min-h-[240px] md:min-h-[320px]',
      'min-h-[310px] md:min-h-[510px]',
    ];

    return `col-span-1 ${patterns[index % patterns.length]}`;
  };

  const getCardShapeStyle = (index: number): CSSProperties => {
    const shapes = [
      { borderRadius: '28px 10px 24px 14px' },
      { borderRadius: '14px 30px 12px 26px' },
      { borderRadius: '24px 16px 30px 10px' },
      { borderRadius: '12px 26px 18px 32px' },
      { borderRadius: '32px 12px 22px 16px' },
      { borderRadius: '18px 28px 10px 24px' },
      { borderRadius: '22px 14px 28px 12px' },
      { borderRadius: '10px 24px 16px 30px' },
    ];

    return shapes[index % shapes.length];
  };

  if (selectedProject && selectedProject.owner && selectedProject.repo) {
    return (
      <StaggeredSection className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 animate-fade-in font-mono text-vscode-text/80">
        <button
          onClick={handleBackClick}
          className="mb-8 flex items-center gap-2 text-vscode-text/60 hover:text-vscode-text transition-colors text-sm uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </button>

        <article className="animate-in slide-in-from-bottom-4 duration-500">
          <header className="mb-12 pb-8 border-b border-vscode-border">
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.tags.map(tag => (
                <span
                  key={tag}
                  className={`text-xs px-2 py-1 rounded border ${getTagColor(tag)} uppercase tracking-wider font-semibold`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-vscode-text leading-tight mb-4">
              {selectedProject.title}
            </h1>
            <p className="text-lg text-vscode-text/60 mb-6">
              {selectedProject.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tech?.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-vscode-highlight rounded border border-vscode-border text-vscode-text"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={selectedProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-vscode-accent text-vscode-editor rounded hover:bg-vscode-accent/90 transition-colors font-bold"
            >
              <Github size={16} /> View on GitHub
            </a>
          </header>

          {isLoadingReadme && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin mr-2" />
              <span className="text-vscode-text/60">Loading README...</span>
            </div>
          )}

          {readmeError && (
            <div className="p-8 bg-yellow-500/10 border border-yellow-500/30 rounded">
              <p className="text-yellow-300 font-semibold text-lg mb-3">Can't fetch README</p>
              <p className="text-vscode-text/60 text-sm mb-4">Unable to load the README file. View the full repository on GitHub:</p>
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 rounded hover:bg-yellow-500/30 transition-colors font-semibold text-sm"
              >
                <Github size={16} /> Visit Repository on GitHub
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {readme && !isLoadingReadme && (
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(readme),
              }}
            />
          )}

          {!readme && !isLoadingReadme && !readmeError && (
            <div className="text-center py-12">
              <p className="text-vscode-text/60">No README content available</p>
            </div>
          )}
        </article>
      </StaggeredSection>
    );
  }

  return (
    <StaggeredSection className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 animate-fade-in font-mono text-vscode-text/80">
      {/* Header */}
      <RevealItem>
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-vscode-text mb-6 tracking-tight flex items-center gap-4">
            <span>
              <span className="text-vscode-function">projects</span>
              <span className="text-vscode-class">.built</span>
            </span>
          </h1>
          <p className="text-lg text-vscode-text/60 max-w-2xl leading-relaxed">
            A curated set of products, hackathon wins, and open-source contributions built from first principles. Click any GitHub project to view its README.
          </p>
        </section>
      </RevealItem>

      <hr className="border-vscode-border opacity-50 mb-16" />

      {/* Masonry Grid */}
      <RevealItem>
        <div className="columns-1 md:columns-2 gap-5 md:gap-6 mb-12">
          {allProjects.map((project, index) => (
            <div
              key={project.id}
              className={`${getMasonryClass(index)} break-inside-avoid mb-5 md:mb-6 group cursor-pointer`}
              onClick={() => handleProjectClick(project)}
            >
              <Card
                style={getCardShapeStyle(index)}
                className="bg-vscode-sidebar border-vscode-border hover:border-vscode-accent transition-all overflow-hidden group-hover:shadow-lg group-hover:-translate-y-1"
              >
                <CardContent className="p-6 h-full flex flex-col group-hover:bg-vscode-highlight/5 transition-colors">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className={`text-[10px] px-2 py-0.5 rounded border ${getTagColor(tag)} uppercase tracking-wider font-bold`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl md:text-2xl font-bold text-vscode-text group-hover:text-vscode-accent transition-colors mb-3 line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-sm text-vscode-text/60 leading-relaxed mb-6 flex-grow line-clamp-3 md:line-clamp-4">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.slice(0, 3).map(tech => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-1 bg-vscode-highlight/50 rounded border border-vscode-border/50 text-vscode-text/80"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[10px] px-2 py-1 text-vscode-text/40">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats Footer */}
                  <div className="pt-4 border-t border-vscode-border/30 flex items-center justify-between text-xs text-vscode-text/50">
                    <div className="flex gap-3">
                      {project.stats?.stars && (
                        <span>⭐ {project.stats.stars}</span>
                      )}
                      {project.stats?.forks && (
                        <span>🍴 {project.stats.forks}</span>
                      )}
                      {project.stats?.likes && (
                        <span>❤️ {project.stats.likes}</span>
                      )}
                    </div>
                    <ExternalLink size={14} className="group-hover:text-vscode-accent transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </RevealItem>

      {/* Footer */}
      <RevealItem className="text-center pt-8 opacity-40 text-xs font-mono">
        <p>Explore projects, view READMEs, and discover what I've built. Each story is a lesson in shipping.</p>
      </RevealItem>
    </StaggeredSection>
  );
};

export default Projects;

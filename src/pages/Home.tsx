import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Download, ExternalLink, ArrowRight } from 'lucide-react';
import { resumeData } from "@/data/resumeData";

// Terminal-style section component
const TerminalSection = memo(({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="terminal-panel">
    <div className="terminal-header">
      <span className="text-muted-foreground">$</span>
      <span>{title}</span>
    </div>
    <div className="terminal-content">
      {children}
    </div>
  </div>
));

// CLI-style project card
const ProjectCard = memo(({ project }: { project: typeof resumeData.projects[0] }) => (
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-4 bg-card border border-border rounded-md hover:border-primary/50 transition-colors group"
  >
    <div className="flex items-start justify-between mb-2">
      <h3 className="font-mono text-foreground group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
    </div>
    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
      {project.description.split('.')[0]}.
    </p>
    <div className="flex flex-wrap gap-2">
      {project.tech.slice(0, 4).map(tech => (
        <span key={tech} className="text-xs font-mono text-muted-foreground">
          {tech}
        </span>
      ))}
    </div>
  </a>
));

const Home = () => {
  const [githubStats, setGithubStats] = useState({ followers: 0, repos: 0 });

  useEffect(() => {
    fetch('https://api.github.com/users/gitsofaryan')
      .then(res => res.json())
      .then(data => {
        setGithubStats({
          followers: data.followers || 0,
          repos: data.public_repos || 0,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section className="mb-20">
        <p className="text-muted-foreground mb-4 font-mono text-sm">
          Full-stack Engineer • Open Source Contributor
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
          <span className="text-primary">Aryan Jain</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
          Building infrastructure for the open web. Contributing to{' '}
          <span className="text-foreground">Summer of Bitcoin</span>,{' '}
          <span className="text-foreground">Google Summer of Code</span>, and{' '}
          <span className="text-foreground">NASA Space Apps</span>.
        </p>

        {/* Install command - OpenCode style */}
        <div className="terminal-panel max-w-xl mb-8">
          <div className="terminal-header">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30"></span>
            </div>
            <span className="ml-4">terminal</span>
          </div>
          <div className="terminal-content font-mono text-sm">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">curl -fsSL </span>
            <span className="terminal-highlight">https://aryan.dev</span>
            <span className="terminal-command">/connect</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <a
            href="/Aryan_Jain.pdf"
            download="Aryan_Jain_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded hover:bg-foreground/90 transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Download Resume
          </a>
          <a
            href={`mailto:${resumeData.personalInfo.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded hover:border-primary/50 transition-colors text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail size={16} />
            Get in touch
          </a>
        </div>
      </section>

      {/* Identity Section - Terminal Style */}
      <section className="mb-16">
        <TerminalSection title="whoami">
          <div className="space-y-2 font-mono text-sm">
            <p><span className="text-muted-foreground">role:</span> <span className="text-foreground">Full-stack Engineer</span></p>
            <p><span className="text-muted-foreground">focus:</span> <span className="text-foreground">Protocol Engineering, Exchange Systems, OSS Infrastructure</span></p>
            <p><span className="text-muted-foreground">location:</span> <span className="text-foreground">{resumeData.personalInfo.location}</span></p>
            <p><span className="text-muted-foreground">github:</span> <span className="text-primary">@{resumeData.personalInfo.github}</span></p>
            <p><span className="text-muted-foreground">hackathons:</span> <span className="text-foreground">70+ competed</span></p>
          </div>
        </TerminalSection>
      </section>

      {/* Skills Section - Terminal Style */}
      <section className="mb-16">
        <TerminalSection title="cat skills.json">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
            <div>
              <p className="text-muted-foreground mb-2">"languages":</p>
              <div className="flex flex-wrap gap-2 ml-4">
                {resumeData.technicalSkills.languages.map(lang => (
                  <span key={lang} className="text-foreground">{lang}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">"frameworks":</p>
              <div className="flex flex-wrap gap-2 ml-4">
                {resumeData.technicalSkills.frameworks.slice(0, 6).map(fw => (
                  <span key={fw} className="text-foreground">{fw}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">"databases":</p>
              <div className="flex flex-wrap gap-2 ml-4">
                {resumeData.technicalSkills.databases.map(db => (
                  <span key={db} className="text-foreground">{db}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">"cloud":</p>
              <div className="flex flex-wrap gap-2 ml-4">
                {resumeData.technicalSkills.cloud.map(c => (
                  <span key={c} className="text-foreground">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </TerminalSection>
      </section>

      {/* Experience Highlights */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Experience</h2>
        <div className="space-y-4">
          {resumeData.experience.slice(0, 3).map((exp, i) => (
            <div key={i} className="p-4 border border-border rounded-md hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-foreground">{exp.role}</h3>
                <span className="text-xs text-muted-foreground font-mono">{exp.duration}</span>
              </div>
              <p className="text-sm text-primary mb-2">{exp.company}</p>
              <p className="text-sm text-muted-foreground">{exp.achievements[0]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Projects</h2>
          <Link to="/projects" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumeData.projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </section>

      {/* Stats Row */}
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border border-border rounded-md text-center">
            <p className="text-2xl font-mono text-foreground">500+</p>
            <p className="text-xs text-muted-foreground">DSA Problems</p>
          </div>
          <div className="p-4 border border-border rounded-md text-center">
            <p className="text-2xl font-mono text-foreground">70+</p>
            <p className="text-xs text-muted-foreground">Hackathons</p>
          </div>
          <div className="p-4 border border-border rounded-md text-center">
            <p className="text-2xl font-mono text-foreground">1000+</p>
            <p className="text-xs text-muted-foreground">GitHub Contributions</p>
          </div>
          <div className="p-4 border border-border rounded-md text-center">
            <p className="text-2xl font-mono text-foreground">{githubStats.repos || '45'}+</p>
            <p className="text-xs text-muted-foreground">Public Repos</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="border-t border-border pt-12">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Get in touch</h2>
        <p className="text-muted-foreground mb-6 max-w-lg">
          Open to collaborations, opportunities, or just a chat about open source and engineering.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={`mailto:${resumeData.personalInfo.email}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail size={16} />
            {resumeData.personalInfo.email}
          </a>
          <a
            href={`https://github.com/${resumeData.personalInfo.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href={`https://linkedin.com/in/${resumeData.personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;

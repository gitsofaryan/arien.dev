
import React from 'react';
import { Link } from 'react-router-dom';

interface ProjectCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image?: string;
}

const Projects: React.FC = () => {
  const projects: ProjectCard[] = [
    {
      id: 'finlitera',
      title: 'FinLitera - AI Financial Assistant',
      description: 'Built an AI platform providing financial guidance, investment tips, budgeting advice, and interactive learning. Implemented real-time portfolio analysis and AI recommendations.',
      tags: ['Next.js', 'Supabase', 'OpenAI API', 'Prisma', 'NextAuth'],
      link: 'https://github.com/gitsofaryan/finlitera'
    },
    {
      id: 'ats100',
      title: 'ATS100 - AI Resume Analyzer',
      description: 'Built a web app that analyzes resumes, gives ATS scores, and provides feedback on strengths, weaknesses, and improvements.',
      tags: ['React.js', 'TypeScript', 'PDF.js', 'Vite', 'AI'],
      link: 'https://github.com/gitsofaryan/ats100'
    },
    {
      id: 'codespace',
      title: 'CodeSpace - Realtime Code Editor',
      description: 'Built a collaborative code editor that allows multiple users to code together in real-time with instant synchronization and integrated chat.',
      tags: ['React.js', 'TypeScript', 'Socket.io', 'Node.js', 'Express.js'],
      link: 'https://github.com/gitsofaryan/codespace'
    },
    {
      id: 'insignia',
      title: 'InSignia - Indian Sign Language Translator',
      description: 'A platform that turns Indian Sign Language (ISL) gestures into text and speech in real-time for easy communication.',
      tags: ['Python', 'CNN', 'Flask', 'OpenCV', 'Mediapipe'],
      link: 'https://github.com/gitsofaryan/insignia'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Projects</h1>
      <p className="text-lg mb-10">
        A showcase of my featured projects including AI-powered applications, real-time collaborative tools,
        and accessibility solutions. Each project demonstrates full-stack development skills and problem-solving abilities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map(project => (
          <Link
            key={project.id}
            to={project.link}
            className="block bg-vscode-sidebar border border-vscode-border rounded-lg overflow-hidden hover:border-vscode-accent transition-colors"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 text-white">{project.title}</h2>
              <p className="text-vscode-text mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={`${project.id}-${tag}`}
                    className="text-xs px-2 py-1 bg-vscode-highlight rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;

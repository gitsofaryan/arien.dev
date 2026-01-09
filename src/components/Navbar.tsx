import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, LinkedinIcon, BookOpen, FileDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <header className="sticky top-0 z-10 bg-[#181818] border-b border-vscode-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-white font-mono font-bold text-xl underline">arien.dev</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/about" className="nav-link flex items-center space-x-1 text-vscode-text hover:text-white">
              <Mail size={18} />
              <span>About</span>
            </Link>
            <Link to="/projects" className="nav-link flex items-center space-x-1 text-vscode-text hover:text-white">
              <span className="text-lg"><img src="/img/projects.png" alt="" height={20} width={20} /></span>
              <span>Projects</span>
            </Link>
            <Link to="/blog" className="nav-link flex items-center space-x-1 text-vscode-text hover:text-white">
              <BookOpen size={18} />
              <span>Stories</span>
            </Link>

            <a
              href="https://github.com/gitsofaryan"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center space-x-1 text-vscode-text hover:text-white"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/aryan-jain07/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center space-x-1 text-vscode-text hover:text-white"
            >
              <LinkedinIcon size={20} />
            </a>

            <a href="/resume.pdf" download="Resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2 border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
                <FileDown size={16} />
                <span>Resume</span>
              </Button>
            </a>
          </nav>
        </div>
      </div>
    </header >
  );
};

export default Navbar;

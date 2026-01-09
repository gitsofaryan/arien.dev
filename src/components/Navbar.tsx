import { Link } from 'react-router-dom';
import { Github, Download } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="font-mono text-lg text-foreground hover:text-primary transition-colors">
            aryan.dev
          </Link>

          <nav className="flex items-center gap-8">
            <Link to="/about" className="nav-link text-sm">
              About
            </Link>
            <Link to="/projects" className="nav-link text-sm">
              Projects
            </Link>
            <Link to="/blog" className="nav-link text-sm">
              Blog
            </Link>
            <a
              href="https://github.com/gitsofaryan"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center gap-1.5 text-sm"
            >
              GitHub
              <span className="text-muted-foreground text-xs">[1K+]</span>
            </a>
            <a
              href="/Aryan_Jain.pdf"
              download="Aryan_Jain_Resume.pdf"
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-foreground text-background rounded hover:bg-foreground/90 transition-colors"
            >
              <Download size={14} />
              Resume
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

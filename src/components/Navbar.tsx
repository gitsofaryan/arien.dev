import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Github, LinkedinIcon, BookOpen, FileDown, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/about", label: "About", icon: Mail },
    { to: "/projects", label: "Projects", icon: null, image: "/img/projects.png" },
    { to: "/blog", label: "Stories", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-vscode-sidebar border-b border-vscode-border md:hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-vscode-text font-mono font-bold text-xl underline">arien.dev</span>
            </Link>
          </div>

          {/* Desktop Navigation REMOVED - NOW IN RIGHT SIDEBAR */}

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="nav-link flex items-center space-x-1 text-vscode-text/70 hover:text-vscode-text transition-colors"
              // Adjusted text colors for better contrast
              >
                {link.icon && <link.icon size={18} />}
                {link.image && <img src={link.image} alt="" height={20} width={20} />}
                <span>{link.label}</span>
              </Link>
            ))}

            <div className="flex items-center space-x-4 ml-4 border-l border-vscode-border pl-4">
              <a
                href="https://github.com/gitsofaryan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-vscode-text/70 hover:text-vscode-text transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/aryan-jain07/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-vscode-text/70 hover:text-vscode-text transition-colors"
              >
                <LinkedinIcon size={20} />
              </a>

              <a href="/resume.pdf" download="Resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2 border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
                  <FileDown size={16} />
                  <span>Resume</span>
                </Button>
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-vscode-text hover:bg-vscode-highlight"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-vscode-sidebar border-b border-vscode-border animate-in slide-in-from-top-5 duration-200 shadow-xl">
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-3 text-vscode-text hover:text-vscode-text p-2 rounded-md hover:bg-vscode-highlight transition-colors"
              >
                {link.icon && <link.icon size={18} />}
                {link.image && <img src={link.image} alt="" height={18} width={18} />}
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            ))}
            <div className="border-t border-vscode-border pt-4 mt-2 flex flex-col space-y-4">
              <div className="flex items-center space-x-4 px-2">
                <a
                  href="https://github.com/gitsofaryan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vscode-text/70 hover:text-vscode-text transition-colors flex items-center gap-2"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/aryan-jain07/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vscode-text/70 hover:text-vscode-text transition-colors flex items-center gap-2"
                >
                  <LinkedinIcon size={20} />
                  <span>LinkedIn</span>
                </a>
              </div>
              <a href="/resume.pdf" download="Resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full gap-2 border-border justify-center">
                  <FileDown size={16} />
                  <span>Download Resume</span>
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header >
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, InstagramIcon, Link2OffIcon, LinkedinIcon, Mail, Rss, TwitterIcon, Atom, Brain, Hand, Moon, Users, Volume2, Sun, ScrollText, Menu, X } from 'lucide-react';
import { Line } from 'recharts';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#1F1F1F] border border-vscode-border rounded-lg hover:border-vscode-accent transition-colors"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} className="text-vscode-accent" /> : <Menu size={24} className="text-vscode-accent" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:sticky top-0 left-0 z-40 w-[18rem] bg-[#1F1F1F] text-vscode-text h-screen overflow-y-auto overflow-x-hidden scrollbar-hide transition-transform duration-300 ease-in-out`}>

        <div className="p-6">
          {/* Rest of the code remains the same */}
          {/* Logo/Name section */}
          <Link to="/" className="flex items-center space-x-2 mb-8">
            <span className="text-lg w-[40px]"><img src="/img/astro.png" alt="" /></span>
            <span className="text-white font-mono font-bold text-xl underline">arien.dev</span>
          </Link>

          {/* About Me section */}
          <div className="mb-8 border-b border-vscode-border pb-4">
            <h3 className="text-sm uppercase tracking-wider text-vscode-text opacity-70 mb-3">About Me</h3>
            <p className="text-sm mb-2">
              I'm <span className="text-vscode-variable font-medium">Arien</span>, software engineer and open-source creator. I share my projects, ideas, and thoughts here.
            </p>
          </div>

          {/* Stay Connected section */}
          <div className="mb-8 border-b border-vscode-border pb-4">
            <h3 className="text-sm uppercase tracking-wider text-vscode-text opacity-70 mb-3">Stay Connected</h3>
            <ul className="space-y-2">
              <li>
                <a href='mailto:mail.aryan.jain07@gmail.com' className="text-sm flex items-center space-x-2 hover:text-white transition-colors">
                  <Mail size={16} />
                  <span>Mail</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/aryan-jain07/" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center space-x-2 hover:text-white transition-colors">
                  <LinkedinIcon size={16} />
                  <span>Linkedin</span>
                </a>
              </li>
              <li>
                <a href="https://x.com/aryanjain1506" target="_blank" className="text-sm flex items-center space-x-2 hover:text-white transition-colors">
                  <TwitterIcon size={16} />
                  <span>Twitter/X</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/arien_jain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center space-x-2 hover:text-white transition-colors"
                >
                  <InstagramIcon size={16} />
                  <span>arien_jain</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Guides section */}
          <div className="mb-8 border-b border-vscode-border pb-4">
            <h3 className="text-sm uppercase tracking-wider text-vscode-text opacity-70 mb-3">Guides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/guides/react-realtime-collab" className="text-sm flex items-center space-x-2 hover:text-white transition-colors">
                  <Atom size={16} className="text-vscode-accent" />
                  <span>Building Real-Time Editors</span>
                </Link>
              </li>
              <li>
                <Link to="/guides/deepfake-ai-detection" className="text-sm flex items-center space-x-2 hover:text-white transition-colors">
                  <Brain size={16} className="text-vscode-accent" />
                  <span>AI Deepfake Detection</span>
                </Link>
              </li>
              <li>
                <Link to="/guides/isl-translation-ai" className="text-sm flex items-center space-x-2 hover:text-white transition-colors">
                  <Hand size={16} className="text-vscode-accent" />
                  <span>ISL Translation with ML</span>
                </Link>
              </li>
              <li>
                <Link to="/guides/southpole-path-ai" className="text-sm flex items-center space-x-2 hover:text-white transition-colors">
                  <Moon size={16} className="text-vscode-accent" />
                  <span>Moon Rover Path Planning</span>
                </Link>
              </li>
              <li>
                <Link to="/guides/all" className="text-sm text-vscode-text hover:text-white transition-colors">
                  All Topics
                </Link>
              </li>
            </ul>
          </div>

          {/* Project Writeups section */}
          <div className="mb-6 border-b border-vscode-border pb-4">
            <h3 className="text-sm uppercase tracking-wider text-vscode-text opacity-70 mb-3">Project Writeups</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/projects/codespace" className="text-sm flex items-center space-x-2 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                  <Users size={16} className="text-vscode-accent" />
                  <span>Codespace Editor</span>
                </Link>
              </li>
              <li>
                <Link to="/projects/voiceguard" className="text-sm flex items-center space-x-2 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                  <Volume2 size={16} className="text-vscode-accent" />
                  <span>VoiceGuard Deepfake Detector</span>
                </Link>
              </li>
              <li>
                <Link to="/projects/solarpower-estimator" className="text-sm flex items-center space-x-2 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                  <Sun size={16} className="text-vscode-accent" />
                  <span>Solar Power Rooftop Estimator</span>
                </Link>
              </li>
              <li>
                <Link to="/projects/sansthaein" className="text-sm flex items-center space-x-2 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                  <ScrollText size={16} className="text-vscode-accent" />
                  <span>Sansthaein Aur Samvidhan</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Github,
  Linkedin,
  Terminal,
  Cpu,
  Coffee,
  Sparkles,
  Code,
  Globe,
  Database,
  Cloud,
  GitBranch,
  Monitor,
  Keyboard,
  Briefcase,
  Users,
  GraduationCap,
  PartyPopper,
  Music,
  PenTool,
  Trophy,
  Rocket,
  Zap,
  ExternalLink,
  Target,
  Network
} from 'lucide-react';
import { resumeData } from '@/data/resumeData';

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-fade-in font-mono text-gray-300">

      {/* Header Bio */}
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight flex flex-col md:flex-row gap-3 md:items-center">
          <span>
            <span className="text-vscode-function">Software</span>
            <span className="text-vscode-class"> Engineer</span>
          </span>
          <span className="hidden md:inline text-vscode-comment text-2xl font-normal">// AI-Native Builder</span>
        </h1>

        <div className="prose prose-invert max-w-none text-base leading-relaxed space-y-4 text-gray-400">
          <p className="text-lg text-gray-200">
            I'm <span className="text-white font-bold">Aryan Jain</span>, a final-year student from Jabalpur, Madhya Pradesh, passionate about full-stack development and machine learning. I've contributed to Google Summer of Code and was selected for Summer of Bitcoin 2025, working on impactful open-source projects.
          </p>
          <p>
            Selected among the top 2% contributors worldwide for Summer of Bitcoin 2025, contributing to Bitcoin protocol and Lightning Network. Also worked with NASA as a Citizen Scientist on astronomical data analysis and planetary science projects through Zooniverse.
          </p>
          <p>
            Lead Coordinator at Google Developers Group, organizing hackathons and DevFests reaching 500+ participants. Former UiPath Student Developer Champion promoting RPA and automation literacy. I love building things that reach people, which is why I actively participate in hackathons.
          </p>
          <p>
            When I'm not pushing commits or breaking production (kidding... mostly), I'm probably lifting weights, debugging someone else's code, or pretending I understand blockchain while nodding confidently in meetings. Writing code at 3 AM is a lifestyle choice, not a cry for help.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-4 mt-8">
          <a href={`https://github.com/${resumeData.personalInfo.github}`} target="_blank" rel="noopener" className="flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] hover:bg-[#2a2a2a] border border-vscode-border rounded text-sm transition-colors text-white">
            <Github size={16} className="text-vscode-accent" />
            <span>GitHub</span>
          </a>
          <a href={`https://linkedin.com/in/${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener" className="flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] hover:bg-[#2a2a2a] border border-vscode-border rounded text-sm transition-colors text-white">
            <Linkedin size={16} className="text-vscode-accent" />
            <span>LinkedIn</span>
          </a>
          <a href={`https://leetcode.com/u/${resumeData.personalInfo.leetcode}`} target="_blank" rel="noopener" className="flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] hover:bg-[#2a2a2a] border border-vscode-border rounded text-sm transition-colors text-white">
            <Code size={16} className="text-vscode-accent" />
            <span>LeetCode</span>
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener" className="flex items-center gap-2 px-4 py-2 bg-vscode-function hover:opacity-90 rounded text-sm transition-colors text-black font-bold">
            <Briefcase size={16} />
            <span>Download CV</span>
          </a>
        </div>
      </section>

      <hr className="border-vscode-border opacity-50 mb-16" />

      {/* What I'm Focused On */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
          <Target size={28} className="text-vscode-accent" />
          What I'm Focused On
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(resumeData.focus || []).map((item, idx) => (
            <Card key={idx} className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors h-full">
              <CardContent className="pt-6 h-full flex flex-col">
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
          <Briefcase size={28} className="text-vscode-accent" />
          Experience Log
        </h2>

        <div className="relative border-l-2 border-[#333] ml-3 md:ml-6 space-y-12 pb-4">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              {/* Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-vscode-accent border-4 border-[#1F1F1F]"></div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <span className="text-sm font-mono text-vscode-comment bg-[#1F1F1F] px-2 py-1 rounded border border-[#333] whitespace-nowrap w-fit mt-1 sm:mt-0">{exp.duration}</span>
              </div>
              <div className="text-vscode-variable font-medium mb-4 flex items-center gap-2">
                <span>@{exp.company}</span>
                <span className="text-vscode-comment text-xs font-normal">• {exp.location}</span>
              </div>
              <ul className="space-y-2 list-disc list-inside text-gray-400">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="text-gray-300">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership (Grid) */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
          <Users size={28} className="text-vscode-accent" />
          Leadership Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.leadership.map((role, idx) => (
            <Card key={idx} className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-white mb-1">{role.organization}</h3>
                <p className="text-vscode-accent text-sm mb-4">{role.role}</p>
                <div className="text-xs text-vscode-comment mb-2">{role.year} • {role.location}</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {role.achievements[0]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Open Source Contributions (Grid) */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
          <GitBranch size={28} className="text-vscode-accent" />
          Organizations I Contributed In
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {[
            'protocol',
            'CircuitVerse',
            'INCF',
            'sugarlabs',
            'hyperledger',
            'genn-team',
            'lightningnetwork',
            'PalisadoesFoundation',
            'kubeedge',
            'OSIPI',
            'antrea-io',
            'LeetCode-Feedback',
            'pipe-cd',
            'ruxailab',
            'community',
            'kubeslice',
            'project-copacetic',
            'RoboSats',
            'arkade-os',
            'bitcoin-dev-project',
            'p2poolv2'
          ].map(handle => (
            <a
              key={handle}
              href={`https://github.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
              aria-label={`View ${handle} on GitHub`}
            >
              <img
                src={`https://github.com/${handle}.png?size=96`}
                alt={`${handle} avatar`}
                loading="lazy"
                className="w-16 h-16 rounded-full border border-vscode-border group-hover:border-vscode-accent transition-colors"
              />
              <span className="mt-2 text-xs text-vscode-text group-hover:text-white truncate max-w-16">@{handle}</span>
            </a>
          ))}
        </div>
      </section>

      {/* The Stack */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
          <Terminal size={28} className="text-vscode-accent" />
          Technical Arsenal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#151515] p-8 rounded-xl border border-vscode-border">
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-bold text-vscode-comment uppercase tracking-widest mb-4 flex items-center gap-2">
                <Code size={14} /> Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.technicalSkills.languages.map(item => (
                  <span key={item} className="px-3 py-1.5 bg-[#1F1F1F] border border-vscode-border rounded text-sm hover:text-white hover:border-vscode-accent transition-colors cursor-default">{item}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-vscode-comment uppercase tracking-widest mb-4 flex items-center gap-2">
                <Rocket size={14} /> Core & Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.technicalSkills.frameworks.map(item => (
                  <span key={item} className="px-3 py-1.5 bg-[#1F1F1F] border border-vscode-border rounded text-sm hover:text-white hover:border-vscode-accent transition-colors cursor-default">{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-bold text-vscode-comment uppercase tracking-widest mb-4 flex items-center gap-2">
                <Globe size={14} /> Blockchain & AI
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.technicalSkills.blockchain_ai.map(item => (
                  <span key={item} className="px-3 py-1.5 bg-[#1F1F1F] border border-vscode-border rounded text-sm hover:text-white hover:border-vscode-accent transition-colors cursor-default">{item}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-vscode-comment uppercase tracking-widest mb-4 flex items-center gap-2">
                <Terminal size={14} /> Tools & Cloud
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.technicalSkills.tools.map(item => (
                  <span key={item} className="px-3 py-1.5 bg-[#1F1F1F] border border-vscode-border rounded text-sm hover:text-white hover:border-vscode-accent transition-colors cursor-default">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Battle Station */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
          <Monitor size={28} className="text-vscode-accent" />
          Battle Station
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Software */}
          <div className="bg-[#1F1F1F] p-6 rounded border border-vscode-border relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Terminal size={100} />
            </div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Sparkles size={18} className="text-yellow-400" /> Software Environment</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-[#333] pb-2"><span>OS</span> <span className="text-white text-right">Triple Boot (Mac, Win, Linux)</span></li>
              <li className="flex justify-between border-b border-[#333] pb-2"><span>Editor</span> <span className="text-white text-right">VS Code (Neovim mode)</span></li>
              <li className="flex justify-between border-b border-[#333] pb-2"><span>Theme</span> <span className="text-white text-right">Tokyo Night Enhanced</span></li>
              <li className="flex justify-between border-b border-[#333] pb-2"><span>Terminal</span> <span className="text-white text-right">Warp / PowerShell</span></li>
              <li className="flex justify-between pt-1"><span>Browser</span> <span className="text-white text-right">Chrome (Too many tabs)</span></li>
            </ul>
          </div>

          {/* Hardware */}
          <div className="bg-[#1F1F1F] p-6 rounded border border-vscode-border relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu size={100} />
            </div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Zap size={18} className="text-blue-400" /> Hardware Rig</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-[#333] pb-2"><span>CPU</span> <span className="text-white text-right">AMD Ryzen 7 7700X</span></li>
              <li className="flex justify-between border-b border-[#333] pb-2"><span>GPU</span> <span className="text-white text-right">Radeon RX 6950 XT</span></li>
              <li className="flex justify-between border-b border-[#333] pb-2"><span>Memory</span> <span className="text-white text-right">32GB DDR5 6000MHz</span></li>
              <li className="flex justify-between border-b border-[#333] pb-2"><span>Storage</span> <span className="text-white text-right">1TB NVMe Gen 4</span></li>
              <li className="flex justify-between pt-1"><span>Monitors</span> <span className="text-white text-right">2x ASUS TUF 27" 165Hz</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats & Charts */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
          <GitBranch size={28} className="text-vscode-accent" />
          Achievement Unlocked
        </h2>

        <div className="space-y-8">
          <div className="bg-[#1F1F1F] p-4 rounded border border-vscode-border">
            <img
              src="https://ghchart.rshah.org/gitsofaryan"
              alt="GitHub Contribution Graph"
              className="w-full opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1F1F1F] p-6 rounded border border-vscode-border">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Trophy size={18} className="text-yellow-400" /> Notable Wins</h3>
              <ul className="space-y-2">
                {resumeData.achievements.slice(0, 8).map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-vscode-accent mt-1">▹</span> {achievement}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1F1F1F] p-6 rounded border border-vscode-border flex flex-col items-center justify-center text-center">
                <Trophy size={32} className="text-yellow-500 mb-2" />
                <span className="text-3xl font-bold text-white">77+</span>
                <span className="text-xs text-vscode-text mt-1 uppercase tracking-wider">Hackathons</span>
              </div>
              <div className="bg-[#1F1F1F] p-6 rounded border border-vscode-border flex flex-col items-center justify-center text-center">
                <Code size={32} className="text-blue-500 mb-2" />
                <span className="text-3xl font-bold text-white">500+</span>
                <span className="text-xs text-vscode-text mt-1 uppercase tracking-wider">DSA Solved</span>
              </div>
              <div className="bg-[#1F1F1F] p-6 rounded border border-vscode-border flex flex-col items-center justify-center text-center col-span-2">
                <Globe size={32} className="text-green-500 mb-2" />
                <span className="text-3xl font-bold text-white">Top 2%</span>
                <span className="text-xs text-vscode-text mt-1 uppercase tracking-wider">Global Contributor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer: Education & Hobbies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-vscode-border">
        {/* Education */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <GraduationCap size={20} className="text-vscode-accent" /> Education
          </h3>
          <div className="space-y-4">
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="bg-[#1F1F1F] p-6 rounded border border-vscode-border">
                <h4 className="text-white font-bold">{edu.institution}</h4>
                <p className="text-vscode-accent text-sm mt-1">{edu.degree}</p>
                <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono">
                  <span>{edu.duration}</span>
                  <span>{edu.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <PartyPopper size={20} className="text-vscode-accent" /> Offline Mode
          </h3>
          <div className="bg-[#1F1F1F] p-6 rounded border border-vscode-border h-full">
            <div className="space-y-4">
              <p className="flex items-center gap-3 text-sm text-gray-300"><Sparkles size={16} className="text-purple-400" /> Exploring astrology & the cosmos</p>
              <p className="flex items-center gap-3 text-sm text-gray-300"><Music size={16} className="text-green-400" /> Listening to a wide variety of music genres</p>
              <p className="flex items-center gap-3 text-sm text-gray-300"><PenTool size={16} className="text-pink-400" /> Sketching and drawing in my free time</p>
              <p className="flex items-center gap-3 text-sm text-gray-300"><Coffee size={16} className="text-yellow-400" /> Watching movies at 2 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Quote */}
      <div className="text-center pt-20 pb-8 opacity-40 text-xs font-mono">
        <p>"Writing code at 3 AM is a lifestyle choice, not a cry for help."</p>
      </div>

    </div>
  );
};

export default About;

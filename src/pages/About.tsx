
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Github, Linkedin, Mail, ExternalLink, Award, Briefcase, GraduationCap, Code, Terminal, Clock, CodeSquareIcon, Instagram } from 'lucide-react';
import { resumeData } from '@/data/resumeData';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="col-span-2">
          <h1 className="text-4xl font-bold mb-6 text-gradient">About {resumeData.personalInfo.name}</h1>

          <div className="mb-8">
            <p className="text-lg mb-5">
              Hey, I'm <span className="text-vscode-variable font-medium">Aryan Jain</span> — a software developer, open-source creator, and AI enthusiast. I love building tools that solve real problems and make technology more accessible.
            </p>

            <p>
              Welcome to my personal corner on the web — a space for writing, projects, tutorials, art, and whatever else I’m inspired to share. You’ll find my technical notes, articles, and highlights from my open-source work on the projects page.
            </p>

            <p>
              This site is free of ads, tracking, affiliate links, sponsored posts, and paywalls. It’s simply a place for creativity, learning, and honest expression. I hope it inspires you to carve out your own meaningful space on the internet, especially in an era where authentic, user-first platforms are becoming increasingly rare.
            </p>


            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="https://github.com/gitsofaryan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] hover:bg-[#2a2a2a] transition-colors duration-300 rounded-lg border border-vscode-border hover:border-vscode-accent"
              >
                <Github size={18} className="text-vscode-accent" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/aryan-jain07"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] hover:bg-[#2a2a2a] transition-colors duration-300 rounded-lg border border-vscode-border hover:border-vscode-accent"
              >
                <Linkedin size={18} className="text-vscode-accent" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://devpost.com/gitsofaryan"
                target='_blank'
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] hover:bg-[#2a2a2a] transition-colors duration-300 rounded-lg border border-vscode-border hover:border-vscode-accent"
              >
                <CodeSquareIcon size={18} className="text-vscode-accent" />
                <span>Hacks</span>
              </a>
              <a
                href="https://leetcode.com/u/arien7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] hover:bg-[#2a2a2a] transition-colors duration-300 rounded-lg border border-vscode-border hover:border-vscode-accent"
              >
                <Code size={18} className="text-vscode-accent" />
                <span>LeetCode</span>
              </a>
              <section className="my-4">
                <h2 className="text-2xl font-semibold mb-4">GitHub</h2>
                <img
                  src="https://ghchart.rshah.org/gitsofaryan"
                  alt="GitHub Contribution Graph"
                  className="mx-auto w-full max-w-3xl text-2xl"
                />


                <h2 className="text-2xl font-bold mb-4">LeetCode</h2>
                <img
                  src="https://leetcard.jacoblin.cool/arien7?theme=dark"
                  alt="LeetCode Stats"
                  className="mx-auto"
                />
              </section>


            </div>
          </div>

          {/* What I'm Doing Now Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Clock size={24} className="text-vscode-accent" />
              What I'm Doing Now
            </h2>
            <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="mb-2">
                  <p className="text-sm text-vscode-comment">Updated May 2nd, 2025</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Contributing to Open Source</h3>
                    <ul className="list-disc list-inside text-vscode-text space-y-1 pl-4">
                      <li>CircuitVerse - Vue Simulator enhancements</li>
                      <li>Preparing for Google Summer of Code</li>
                      <li>Participating in Summer of Bitcoin program</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Exploring Blockchain</h3>
                    <p className="text-vscode-text">Building dApps and learning smart contract development</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">College Life</h3>
                    <p className="text-vscode-text">Currently in 3rd year of Computer Science and Business Systems</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Community Leadership</h3>
                    <ul className="list-disc list-inside text-vscode-text space-y-1 pl-4">
                      <li>Leading tech communities on campus</li>
                      <li>Organizing hackathons and tech events</li>
                      <li>Participating in various hackathons</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Hobbies</h3>
                    <ul className="list-disc list-inside text-vscode-text space-y-1 pl-4">
                      <li>Building side projects</li>
                      <li>Watching movies</li>
                      <li>Exploring astronomy and astrology</li>
                      <li>Playing Marvel Rivals</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Lifting</h3>
                    <ul className="list-disc list-inside text-vscode-text space-y-1 pl-4">
                      <li>Squat - 3x5 @ 110</li>
                      <li>Bench Press - 3x5 @ 70</li>
                      <li>Deadlift - 3x5 @ 145</li>
                      <li>Bent Over Row - 3x5 @ 75</li>
                      <li>Overhead Press - 3x5 @ 50</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Technical Skills */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Technical Skills</h2>

            <Collapsible className="mb-4">
              <CollapsibleTrigger className="w-full flex justify-between items-center p-3 bg-[#1F1F1F] hover:bg-[#2a2a2a] rounded-lg border border-vscode-border transition-colors duration-300">
                <span className="text-lg font-medium">Languages</span>
                <span className="text-vscode-accent">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2 p-3 bg-[#161616] rounded-md">
                  {['TypeScript', 'JavaScript', 'Python', 'C/C++', 'SQL'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-vscode-highlight rounded-full text-sm transition-all duration-300 hover:bg-opacity-80">
                      {skill}
                    </span>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="mb-4">
              <CollapsibleTrigger className="w-full flex justify-between items-center p-3 bg-[#1F1F1F] hover:bg-[#2a2a2a] rounded-lg border border-vscode-border transition-colors duration-300">
                <span className="text-lg font-medium">Libraries & Frameworks</span>
                <span className="text-vscode-accent">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2 p-3 bg-[#161616] rounded-md">
                  {['React.js', 'Next.js', 'Vue.js', 'Node.js', 'Express.js', 'Tailwindcss', 'Streamlit'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-vscode-highlight rounded-full text-sm transition-all duration-300 hover:bg-opacity-80">
                      {skill}
                    </span>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="mb-4">
              <CollapsibleTrigger className="w-full flex justify-between items-center p-3 bg-[#1F1F1F] hover:bg-[#2a2a2a] rounded-lg border border-vscode-border transition-colors duration-300">
                <span className="text-lg font-medium">Tools & Platforms</span>
                <span className="text-vscode-accent">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2 p-3 bg-[#161616] rounded-md">
                  {['Git', 'GitHub', 'MongoDB', 'SupaBase', 'Docker', 'Amazon AWS', 'Google GCP', 'MS AZURE', 'GitLab'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-vscode-highlight rounded-full text-sm transition-all duration-300 hover:bg-opacity-80">
                      {skill}
                    </span>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </section>

          {/* Tools Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Terminal size={24} className="text-vscode-accent" />
              Tools
            </h2>

            <div className="space-y-6">
              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent>
                  <h3 className="text-xl font-semibold text-white mb-4">Software</h3>
                  <p className="mb-4 text-vscode-text">This website is hosted on Vercel.</p>
                  <ul className="list-disc list-inside text-vscode-text space-y-2 pl-4">
                    <li><span className="text-white">OS:</span> Mac, Windows & Linux</li>
                    <li><span className="text-white">Coding:</span> Visual Studio Code</li>
                    <li><span className="text-white">Theme:</span> Tokyo, Night dark Enhanced!</li>
                    <li><span className="text-white">Terminal:</span> wsl, powershell</li>
                    <li><span className="text-white">Browser:</span> Chrome</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent >
                  <h3 className="text-xl font-semibold text-white mb-4">Hardware</h3>
                  <div className="space-y-4">

                    <div>
                      <h4 className="font-medium text-vscode-variable">Coding PC</h4>
                      <ul className="list-disc list-inside text-vscode-text space-y-1 pl-4">
                        <li><span className="text-white">CPU:</span> AMD Ryzen 7 7700X</li>
                        <li><span className="text-white">Motherboard:</span> ASUS ROG Strix B650-A Gaming WiFi</li>
                        <li><span className="text-white">Memory:</span> Corsair Vengeance 32GB DDR5 6000MHz</li>
                        <li><span className="text-white">Storage:</span> Samsung 980 PRO NVMe M.2 1TB</li>
                        <li><span className="text-white">GPU:</span> Radeon RX 6950 XT</li>
                        <li><span className="text-white">PSU:</span> Corsair RM850x 80+ Gold</li>
                        <li><span className="text-white">Case:</span> NZXT H510 Elite</li>
                        <li><span className="text-white">Monitor:</span> ASUS TUF Gaming VG27AQ (x2)</li>
                        <li><span className="text-white">Keyboard:</span> Durgod Fusion Wireless</li>
                        <li><span className="text-white">Microphone:</span> Blue Yeti Blackout Edition</li>
                        <li><span className="text-white">Headphones:</span> Sony WH-1000XM3</li>

                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Experience Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Briefcase size={24} className="text-vscode-accent" />
              Experience
            </h2>

            <div className="space-y-4">
              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">GoQuant</h3>
                    <span className="text-sm text-vscode-comment">July 2025 – August 2025</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-vscode-variable">Backend Engineer Trainee – Exchange Developer</p>
                    <p className="text-sm text-vscode-comment">Miami, FL (Remote)</p>
                  </div>
                  <ul className="list-disc list-inside text-vscode-text space-y-1 pl-2">
                    <li>Developed and optimized backend modules for the BitGet exchange using C# within an OEMS v4 architecture, focusing on low-latency performance.</li>
                    <li>Integrated and managed BitGet APIs to process real-time Level 1 and Level 2 market data, enhancing order book efficiency and supporting algorithmic trading operations.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">Summer of Bitcoin</h3>
                    <span className="text-sm text-vscode-comment">May – August 2025</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-vscode-variable">Mentee & Contributor</p>
                    <p className="text-sm text-vscode-comment">Sheridan, Wyoming (Remote)</p>
                  </div>
                  <ul className="list-disc list-inside text-vscode-text space-y-1 pl-2">
                    <li>Selected among the top 2% of contributors worldwide for a competitive open-source program, gaining hands-on experience in Bitcoin protocol and Lightning Network development.</li>
                    <li>Built a full-stack React + Flask tool to visualize Lightning Network message flows and enhanced LNPrototest with BOLT #1 message support, improving testing accuracy.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">Google Summer of Code</h3>
                    <span className="text-sm text-vscode-comment">May – August 2025</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-vscode-variable">Contributor – CircuitVerse, PalisaDoes Foundation & GeNN</p>
                    <p className="text-sm text-vscode-comment">OSS (Remote)</p>
                  </div>
                  <ul className="list-disc list-inside text-vscode-text space-y-1 pl-2">
                    <li>Contributed to three open-source projects, enhancing testing infrastructure, CI/CD workflows, and refactoring legacy code for improved maintainability and reliability.</li>
                    <li>CircuitVerse: Merged legacy Ruby and Vue repository, upgraded Node.js to v22, migrated simulator code to TypeScript, and achieved full unit test coverage. Authored 24 PRs.</li>
                    <li>PalisaDoes Foundation & GeNN: Developed comprehensive unit and end-to-end test suites, reaching 100% code coverage for key modules; assisted in migrating automated testing from Jenkins to GitHub Actions with containerized builds and parallel execution. Authored 13 PRs.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">GitLab</h3>
                    <span className="text-sm text-vscode-comment">March – August 2025</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-vscode-variable">Open Source Contributor & Technical Writer (Level 2)</p>
                    <p className="text-sm text-vscode-comment">OSS (Remote)</p>
                  </div>
                  <ul className="list-disc list-inside text-vscode-text space-y-1 pl-2">
                    <li>Top 5 contributor in three consecutive GitLab OSS hackathons; authored and enhanced technical documentation across key repositories, improving readability and developer onboarding.</li>
                    <li>Developed and maintained unit tests for product teams, increasing test coverage and ensuring release stability.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Open-Source Contributions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Github size={24} className="text-vscode-accent" />
              Open-Source Contributions
            </h2>

            <div className="space-y-6">
              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-white">CircuitVerse</h3>
                    <span className="text-sm text-vscode-comment">Present</span>
                  </div>
                  <div className="mb-3">
                    <a
                      href="https://github.com/CircuitVerse/CircuitVerse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-vscode-accent hover:underline flex items-center gap-1"
                    >
                      <span>GitHub</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <ul className="list-disc list-inside text-vscode-text space-y-1">
                    <li>Upgraded Node.js to version 22 across all configuration files and resolved Ruby deprecation warnings, ensuring smoother operations and improved performance.</li>
                    <li>Enhanced the Vue Simulator's user experience by migrating code from JavaScript to TypeScript, resulting in increased type safety and maintainability.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-white">Palisadoes</h3>
                    <span className="text-sm text-vscode-comment">Present</span>
                  </div>
                  <div className="mb-3">
                    <a
                      href="https://github.com/Palisadoes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-vscode-accent hover:underline flex items-center gap-1"
                    >
                      <span>GitHub</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <ul className="list-disc list-inside text-vscode-text space-y-1">
                    <li>Developed comprehensive unit tests, achieving 100% test coverage to ensure robust software quality.</li>
                    <li>Resolved critical Flutter bugs and revamped the admin control panel to enhance functionality and user experience.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Projects Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Code size={24} className="text-vscode-accent" />
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300 h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-white mb-2">FinLitera - AI Financial Assistant</h3>
                  <p className="text-vscode-text mb-4 flex-grow">Built an AI platform providing financial guidance, investment tips, budgeting advice, and interactive learning with real-time portfolio analysis.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Next.js</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Supabase</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">OpenAI API</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Prisma</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-auto">
                    <a
                      href="https://github.com/gitsofaryan/finlitera"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-vscode-accent hover:underline flex items-center gap-1"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300 h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-white mb-2">ATS100 - AI Resume Analyzer</h3>
                  <p className="text-vscode-text mb-4 flex-grow">Built a web app that analyzes resumes, gives ATS scores, and provides feedback on strengths, weaknesses, and improvements.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">React.js</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">TypeScript</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">PDF.js</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Vite</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-auto">
                    <a
                      href="https://github.com/gitsofaryan/ats100"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-vscode-accent hover:underline flex items-center gap-1"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Achievements Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Award size={24} className="text-vscode-accent" />
              Achievements
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              <div className="flex items-start gap-3 hover:bg-[#1F1F1F] p-3 rounded-md transition-colors duration-300">
                <span className="text-vscode-accent text-xl font-bold mt-0.5">•</span>
                <span>Solved 500+ DSA problems in C++, Python, and SQL</span>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#1F1F1F] p-3 rounded-md transition-colors duration-300">
                <span className="text-vscode-accent text-xl font-bold mt-0.5">•</span>
                <span>Google Solutions Challenge 2024: Regional Finalist</span>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#1F1F1F] p-3 rounded-md transition-colors duration-300">
                <span className="text-vscode-accent text-xl font-bold mt-0.5">•</span>
                <span>Microsoft Imagine Cup 2024: Semi-Finalist</span>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#1F1F1F] p-3 rounded-md transition-colors duration-300">
                <span className="text-vscode-accent text-xl font-bold mt-0.5">•</span>
                <span>Smart India Hackathon 2023: National Finalist</span>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#1F1F1F] p-3 rounded-md transition-colors duration-300">
                <span className="text-vscode-accent text-xl font-bold mt-0.5">•</span>
                <span>IIT Bombay E-Cell Eureka: Top 50 out of 5000+</span>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#1F1F1F] p-3 rounded-md transition-colors duration-300">
                <span className="text-vscode-accent text-xl font-bold mt-0.5">•</span>
                <span>Cisco ThingQbator: Top 10 Startup</span>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#1F1F1F] p-3 rounded-md transition-colors duration-300">
                <span className="text-vscode-accent text-xl font-bold mt-0.5">•</span>
                <span>Hacktoberfest 2024 & Open Source Connect India: Top 10 Contributor & Mentor</span>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#1F1F1F] p-3 rounded-md transition-colors duration-300">
                <span className="text-vscode-accent text-xl font-bold mt-0.5">•</span>
                <span>Competed in 70+ esteemed hackathons with multiple wins</span>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#1F1F1F] p-3 rounded-md transition-colors duration-300">
                <span className="text-vscode-accent text-xl font-bold mt-0.5">•</span>
                <span>Competitive Programming: Meta Hacker Cup'25, Flipkart GRID, AtCoder rating 700+</span>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#1F1F1F] p-3 rounded-md transition-colors duration-300">
                <span className="text-vscode-accent text-xl font-bold mt-0.5">•</span>
                <span>NASA Citizen Scientist 2024: 49+ research projects</span>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#1F1F1F] p-3 rounded-md transition-colors duration-300">
                <span className="text-vscode-accent text-xl font-bold mt-0.5">•</span>
                <span>Topmate Mentor: Top 10% globally</span>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#1F1F1F] p-3 rounded-md transition-colors duration-300">
                <span className="text-vscode-accent text-xl font-bold mt-0.5">•</span>
                <span>GitHub: 1000+ contributions across open-source projects</span>
              </div>
            </div>
          </section>



          {/* Education */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <GraduationCap size={24} className="text-vscode-accent" />
              Education
            </h2>

            <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
              <CardContent className="pt-1">
                <div className="flex justify-between items-center ">
                  <h3 className="text-lg font-semibold text-white">Gyan Ganga Institute of Technology and Sciences, Jabalpur</h3>
                  <span className="text-sm text-vscode-comment">2026</span>
                </div>
                <p className="text-vscode-text">Bachelor of Technology in Computer Science and Business System (CSBS)</p>
                <p className="text-vscode-variable">CGPA: 8</p>
              </CardContent>
            </Card>
          </section>

          {/* Get In Touch Section
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Mail size={24} className="text-vscode-accent" />
              Get In Touch
            </h2>
            
            <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
              <CardContent className="pt-6">
                <p className="mb-6 text-vscode-text">Feel free to reach out for collaboration, questions, or just to say hello!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a 
                    href="mailto:mail.aryan.jain07@gmail.com"
                    className="flex items-center gap-3 p-4 bg-[#161616] hover:bg-[#1a1a1a] rounded-lg transition-colors duration-300 hover:border-vscode-accent border border-vscode-border"
                  >
                    <Mail size={20} className="text-vscode-accent" />
                    <div>
                      <p className="text-sm text-vscode-comment">Email</p>
                      <p className="text-white">mail.aryan.jain07@gmail.com</p>
                    </div>
                  </a>
                  <a 
                    href="https://linkedin.com/in/aryan-jain07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-[#161616] hover:bg-[#1a1a1a] rounded-lg transition-colors duration-300 hover:border-vscode-accent border border-vscode-border"
                  >
                    <Linkedin size={20} className="text-vscode-accent" />
                    <div>
                      <p className="text-sm text-vscode-comment">LinkedIn</p>
                      <p className="text-white">aryan-jain07</p>
                    </div>
                  </a>
                </div>
                <div className="mt-6">
                  <Button asChild className="w-full bg-vscode-accent hover:bg-vscode-accent/90 text-white">
                    <a href="/write">Write Me a Message</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section> */}
        </div>

        <div>
          <div className="sticky top-48">
            <img
              src="/img/me.png"
              alt="Aryan Jain"
              className="w-full rounded-xl shadow-xl mb-6 border border-vscode-border transform hover:scale-[1.02] transition-transform duration-300"
            />



            <Card className="mb-6 bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
              <CardContent >
                <h3 className="text-lg font-semibold mb-3">Get In Touch</h3>
                <div className="space-y-2">
                  <a
                    href="mailto:mail.aryan.jain07@gmail.com"
                    className="flex items-center gap-2 text-vscode-text hover:text-vscode-accent transition-colors duration-300"
                  >
                    <Mail size={16} />
                    <span>Mail</span>
                  </a>
                  <a
                    href="https://instagram.com/arien_jain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-vscode-text hover:text-vscode-accent transition-colors duration-300"
                  >
                    <Instagram size={16} />
                    <span>arien_jain</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/aryan-jain07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-vscode-text hover:text-vscode-accent transition-colors duration-300"
                  >
                    <Linkedin size={16} />
                    <span>aryan-jain07</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Button asChild className="w-full bg-vscode-accent hover:bg-vscode-accent/90 text-white">
              <a href="/write">Write a Note</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

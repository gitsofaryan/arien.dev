import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Github, Linkedin, Mail, ExternalLink, Award, Briefcase, GraduationCap, Code, Terminal, Clock, CodeSquareIcon, Instagram, Rocket, Zap, Coffee, PartyPopper, Trophy, Target, Flame, Star, Sparkles, Lightbulb, Bug, Database, Cpu, Brain, Heart, TrendingUp, Shield, Users, Cloud, Music, PenTool, TwitterIcon } from 'lucide-react';
import { FaTelegramPlane, FaDiscord } from 'react-icons/fa';
import { resumeData } from '@/data/resumeData';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="col-span-2 space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">About {resumeData.personalInfo.name}</h1>

          <div className="mb-12">
            <p className="text-sm md:text-base mb-6 flex items-start gap-4 leading-relaxed">
              <Rocket className="text-vscode-accent mt-1 flex-shrink-0" size={20} />
              <span>
                I'm <span className="text-vscode-variable font-medium">Aryan Jain</span>, a final-year student from <span className="text-vscode-accent">Jabalpur, Madhya Pradesh</span>, passionate about full-stack development and machine learning. I've contributed to Google Summer of Code and Selected for Summer of Bitcoin 2025, working on impactful open-source projects.
              </span>
            </p>

            <p className="text-sm md:text-base mb-6 flex items-start gap-4 leading-relaxed">
              <Trophy className="text-vscode-accent mt-1 flex-shrink-0" size={20} />
              <span>
                Selected among the <span className="text-vscode-accent font-medium">top 2% contributors worldwide</span> for Summer of Bitcoin 2025, contributing to Bitcoin protocol and Lightning Network. Also worked with NASA as a Citizen Scientist on astronomical data analysis and planetary science projects through Zooniverse.
              </span>
            </p>

            <p className="text-sm md:text-base mb-6 flex items-start gap-4 leading-relaxed">
              <Users className="text-vscode-accent mt-1 flex-shrink-0" size={20} />
              <span>
                Lead Coordinator at Google Developers Group, organizing hackathons and DevFests reaching 500+ participants. Former UiPath Student Developer Champion promoting RPA and automation literacy. I love building things that reach people, which is why I actively participate in hackathons.
              </span>
            </p>

            <p className="text-sm md:text-base mb-6 flex items-start gap-4 leading-relaxed">
              <Coffee className="text-vscode-accent mt-1 flex-shrink-0" size={20} />
              <span>
                When I'm not pushing commits or breaking production (kidding... mostly), I'm probably lifting weights, debugging someone else's code, or pretending I understand blockchain while nodding confidently in meetings. Writing code at 3 AM is a lifestyle choice, not a cry for help.
              </span>
            </p>

            <p className="text-sm md:text-base mb-6 flex items-start gap-4 leading-relaxed">
              <Briefcase className="text-vscode-accent mt-1 flex-shrink-0" size={20} />
              <span>
                Actively seeking full-stack, AI/ML, data science, blockchain, or product management roles where I can grow, learn, and make an impact.
              </span>
            </p>

            <p className="text-sm md:text-base flex items-start gap-4 leading-relaxed">
              <Sparkles className="text-vscode-accent mt-1 flex-shrink-0" size={20} />
              <span>
                This site is mercifully free of ads, tracking scripts, "sponsored content," and other digital nonsense. Just pure, unfiltered tech rambling from someone who's debugged enough segmentation faults to question their life choices.
              </span>
            </p>


            <div className="flex flex-wrap gap-4 mb-12 mt-8">
              <a
                href="https://github.com/gitsofaryan"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] hover:bg-[#2a2a2a] transition-all duration-300 rounded-lg border border-vscode-border hover:border-vscode-accent hover:shadow-lg hover:shadow-vscode-accent/20"
              >
                <Github size={18} className="text-vscode-accent group-hover:rotate-12 transition-transform" />
                <span>GitHub</span>
                <Star size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://linkedin.com/in/aryan-jain07"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] hover:bg-[#2a2a2a] transition-all duration-300 rounded-lg border border-vscode-border hover:border-vscode-accent hover:shadow-lg hover:shadow-vscode-accent/20"
              >
                <Linkedin size={18} className="text-vscode-accent group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
                <Sparkles size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://devpost.com/gitsofaryan"
                target='_blank'
                className="group inline-flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] hover:bg-[#2a2a2a] transition-all duration-300 rounded-lg border border-vscode-border hover:border-vscode-accent hover:shadow-lg hover:shadow-vscode-accent/20"
              >
                <Trophy size={18} className="text-vscode-accent group-hover:rotate-12 transition-transform" />
                <span>Hacks</span>
                <Flame size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://leetcode.com/u/arien7"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] hover:bg-[#2a2a2a] transition-all duration-300 rounded-lg border border-vscode-border hover:border-vscode-accent hover:shadow-lg hover:shadow-vscode-accent/20"
              >
                <Code size={18} className="text-vscode-accent group-hover:scale-110 transition-transform" />
                <span>LeetCode</span>
                <Zap size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
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
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Clock size={24} className="text-vscode-accent" />
              What I'm Focused On
            </h2>
            <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 flex items-center gap-2">
                      <Briefcase size={20} className="text-vscode-accent" />
                      Seeking New Opportunities
                    </h3>
                    <p className="text-sm md:text-base text-vscode-text leading-relaxed">
                      Actively looking for full-stack, AI/ML, data science, blockchain or product management roles where I can grow and learn. I'm eager to tackle complex challenges and contribute to innovative projects that push boundaries.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 flex items-center gap-2">
                      <CodeSquareIcon size={20} className="text-vscode-accent" />
                      Building & Learning
                    </h3>
                    <p className="text-sm md:text-base text-vscode-text leading-relaxed">
                      Grinding DSA, diving deep into system design, and building countless side projects with AI to bring my 2 AM ideas to life. I'm constantly exploring new tech, participating in online assessments, and learning how the internet actually works under the hood.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 flex items-center gap-2">
                      <Github size={20} className="text-vscode-accent" />
                      Open Source & Networking
                    </h3>
                    <p className="text-sm md:text-base text-vscode-text leading-relaxed">
                      Continuing to contribute to projects like CircuitVerse and others. Also actively connecting and networking in the Web3 space, because it's the future (and because blockchain is still cool, fight me).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Technical Skills */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Cpu size={24} className="text-vscode-accent" />
              Technical Arsenal
            </h2>

            <Collapsible className="mb-4">
              <CollapsibleTrigger className="w-full flex justify-between items-center p-3 bg-[#1F1F1F] hover:bg-[#2a2a2a] rounded-lg border border-vscode-border transition-colors duration-300">
                <span className="text-lg font-medium flex items-center gap-2">
                  <Star size={18} className="text-vscode-accent" />
                  Core Skills
                </span>
                <span className="text-vscode-accent">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2 p-3 bg-[#161616] rounded-md">
                  {['Low Latency Trading', 'Backend Operations', 'MERN Stack', 'Data Structures & Algorithms', 'OOP', 'API Design', 'Microservices', 'Agile Development', 'Open Source', 'Data Annotation'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-vscode-highlight rounded-full text-sm transition-all duration-300 hover:bg-opacity-80">
                      {skill}
                    </span>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="mb-4">
              <CollapsibleTrigger className="w-full flex justify-between items-center p-3 bg-[#1F1F1F] hover:bg-[#2a2a2a] rounded-lg border border-vscode-border transition-colors duration-300">
                <span className="text-lg font-medium flex items-center gap-2">
                  <Code size={18} className="text-vscode-accent" />
                  Languages
                </span>
                <span className="text-vscode-accent">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2 p-3 bg-[#161616] rounded-md">
                  {['TypeScript', 'JavaScript', 'Rust', 'Ruby', 'Python', 'C++', 'C#', 'SQL', 'HTML', 'CSS'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-vscode-highlight rounded-full text-sm transition-all duration-300 hover:bg-opacity-80">
                      {skill}
                    </span>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="mb-4">
              <CollapsibleTrigger className="w-full flex justify-between items-center p-3 bg-[#1F1F1F] hover:bg-[#2a2a2a] rounded-lg border border-vscode-border transition-colors duration-300">
                <span className="text-lg font-medium flex items-center gap-2">
                  <Zap size={18} className="text-vscode-accent" />
                  Libraries & Frameworks
                </span>
                <span className="text-vscode-accent">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2 p-3 bg-[#161616] rounded-md">
                  {['Next.js', 'React.js', 'React Native', 'Vue.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Streamlit', 'Ruby on Rails'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-vscode-highlight rounded-full text-sm transition-all duration-300 hover:bg-opacity-80">
                      {skill}
                    </span>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="mb-4">
              <CollapsibleTrigger className="w-full flex justify-between items-center p-3 bg-[#1F1F1F] hover:bg-[#2a2a2a] rounded-lg border border-vscode-border transition-colors duration-300">
                <span className="text-lg font-medium flex items-center gap-2">
                  <Database size={18} className="text-vscode-accent" />
                  Databases
                </span>
                <span className="text-vscode-accent">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2 p-3 bg-[#161616] rounded-md">
                  {['MongoDB', 'PostgreSQL', 'Supabase', 'Firebase', 'MySQL', 'Vector Databases'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-vscode-highlight rounded-full text-sm transition-all duration-300 hover:bg-opacity-80">
                      {skill}
                    </span>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="mb-4">
              <CollapsibleTrigger className="w-full flex justify-between items-center p-3 bg-[#1F1F1F] hover:bg-[#2a2a2a] rounded-lg border border-vscode-border transition-colors duration-300">
                <span className="text-lg font-medium flex items-center gap-2">
                  <Cloud size={18} className="text-vscode-accent" />
                  Cloud
                </span>
                <span className="text-vscode-accent">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2 p-3 bg-[#161616] rounded-md">
                  {['Salesforce', 'AWS', 'GCP', 'Azure'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-vscode-highlight rounded-full text-sm transition-all duration-300 hover:bg-opacity-80">
                      {skill}
                    </span>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="mb-4">
              <CollapsibleTrigger className="w-full flex justify-between items-center p-3 bg-[#1F1F1F] hover:bg-[#2a2a2a] rounded-lg border border-vscode-border transition-colors duration-300">
                <span className="text-lg font-medium flex items-center gap-2">
                  <Terminal size={18} className="text-vscode-accent" />
                  Tools & Platforms
                </span>
                <span className="text-vscode-accent">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2 p-3 bg-[#161616] rounded-md">
                  {['Git', 'GitHub', 'GitHub Actions', 'GitLab', 'Docker', 'Spline', 'Cursor', 'OpenAI', 'Replit', 'Claude'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-vscode-highlight rounded-full text-sm transition-all duration-300 hover:bg-opacity-80">
                      {skill}
                    </span>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="mb-4">
              <CollapsibleTrigger className="w-full flex justify-between items-center p-3 bg-[#1F1F1F] hover:bg-[#2a2a2a] rounded-lg border border-vscode-border transition-colors duration-300">
                <span className="text-lg font-medium flex items-center gap-2">
                  <Bug size={18} className="text-vscode-accent" />
                  Testing / QA
                </span>
                <span className="text-vscode-accent">+</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2 p-3 bg-[#161616] rounded-md">
                  {['JUnit 5', 'PyTest', 'Rspec'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-vscode-highlight rounded-full text-sm transition-all duration-300 hover:bg-opacity-80">
                      {skill}
                    </span>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </section>

          {/* Hobbies Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <PartyPopper size={24} className="text-vscode-accent" />
              Hobbies & Interests
            </h2>
            <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="flex items-start gap-3 text-vscode-text"><Sparkles size={16} className="text-vscode-accent mt-1 flex-shrink-0" /><span>Exploring astrology and the cosmos.</span></p>
                  <p className="flex items-start gap-3 text-vscode-text"><Music size={16} className="text-vscode-accent mt-1 flex-shrink-0" /><span>Listening to a wide variety of music genres.</span></p>
                  <p className="flex items-start gap-3 text-vscode-text"><PenTool size={16} className="text-vscode-accent mt-1 flex-shrink-0" /><span>Sketching and drawing in my free time.</span></p>
                  <p className="flex items-start gap-3 text-vscode-text"><Coffee size={16} className="text-vscode-accent mt-1 flex-shrink-0" /><span>Watching movies at 2 AM (because who needs a functioning sleep schedule anyway?)</span></p>
                  <p className="flex items-start gap-3 text-vscode-text"><Bug size={16} className="text-vscode-accent mt-1 flex-shrink-0" /><span>Arguing about vim vs emacs in comments (I use VSCode btw)</span></p>
                </div>
              </CardContent>
            </Card>
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
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Rocket size={20} className="text-vscode-accent" />
                    Software
                  </h3>
                  <p className="mb-4 text-vscode-text italic">This website is hosted on Vercel (because I'm too lazy to manage my own servers).</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-vscode-text"><Cpu size={16} className="text-vscode-accent mt-1 flex-shrink-0" /><span><span className="text-white font-semibold">OS:</span> Mac, Windows & Linux (triple booting like it's 2015)</span></li>
                    <li className="flex items-start gap-2 text-vscode-text"><Code size={16} className="text-vscode-accent mt-1 flex-shrink-0" /><span><span className="text-white font-semibold">Coding:</span> Visual Studio Code (vim keybindings enabled, obviously)</span></li>
                    <li className="flex items-start gap-2 text-vscode-text"><Sparkles size={16} className="text-vscode-accent mt-1 flex-shrink-0" /><span><span className="text-white font-semibold">Theme:</span> Tokyo Night Dark Enhanced (because aesthetics matter)</span></li>
                    <li className="flex items-start gap-2 text-vscode-text"><Terminal size={16} className="text-vscode-accent mt-1 flex-shrink-0" /><span><span className="text-white font-semibold">Terminal:</span> WSL, PowerShell (living dangerously)</span></li>
                    <li className="flex items-start gap-2 text-vscode-text"><Zap size={16} className="text-vscode-accent mt-1 flex-shrink-0" /><span><span className="text-white font-semibold">Browser:</span> Chrome (with 47 tabs open at all times)</span></li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent >
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Cpu size={20} className="text-vscode-accent" />
                    Hardware
                  </h3>
                  <div className="space-y-4">

                    <div>
                      <h4 className="font-medium text-vscode-variable mb-2 flex items-center gap-2">
                        <Flame size={18} className="text-orange-500" />
                        Coding PC (My RGB gaming rig that I totally use for work)
                      </h4>
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
                    <p className="text-base text-vscode-variable">Backend Engineer Trainee – Exchange Developer</p>
                    <p className="text-sm text-vscode-comment">Miami, FL (Remote)</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Developed and optimized backend modules for the BitGet exchange using C# within an OEMS v4 architecture, focusing on low latency performance.</span></li>
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Integrated and managed BitGet APIs to process real time Level 1 and Level 2 market data, enhancing order book efficiency and supporting algorithmic trading operations.</span></li>
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
                    <p className="text-base text-vscode-variable">Mentee & Contributor</p>
                    <p className="text-sm text-vscode-comment">Sheridan, Wyoming (Remote)</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Selected among the top 2% of contributors worldwide for a competitive open source program, gaining hands on experience in Bitcoin protocol and Lightning Network development.</span></li>
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Built a full stack React + Flask tool to visualize Lightning Network message flows and enhanced LNPrototest with BOLT #1 message support, improving testing accuracy.</span></li>
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
                    <p className="text-base text-vscode-variable">Contributor – CircuitVerse, PalisaDoes Foundation & GeNN</p>
                    <p className="text-sm text-vscode-comment">OSS (Remote)</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Contributed to three open source projects, enhancing testing infrastructure, CI/CD workflows, and refactoring legacy code for improved maintainability and reliability.</span></li>
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>CircuitVerse: Merged legacy Ruby and Vue repository, upgraded Node.js to v22, migrated simulator code to TypeScript, and achieved full unit test coverage. Authored 24 PRs.</span></li>
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>PalisaDoes Foundation & GeNN: Developed comprehensive unit and end to end test suites, reaching 100% code coverage for key modules; assisted in migrating automated testing from Jenkins to GitHub Actions with containerized builds and parallel execution. Authored 13 PRs.</span></li>
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
                    <p className="text-base text-vscode-variable">Open Source Contributor & Technical Writer (Level 2)</p>
                    <p className="text-sm text-vscode-comment">OSS (Remote)</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Top 5 contributor in three consecutive GitLab OSS hackathons; authored and enhanced technical documentation across key repositories, improving readability and developer onboarding.</span></li>
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Developed and maintained unit tests for product teams, increasing test coverage and ensuring release stability.</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Leadership Experience Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Users size={24} className="text-vscode-accent" />
              Leadership Experience
            </h2>

            <div className="space-y-4">
              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">Google Developer Student Clubs</h3>
                    <span className="text-sm text-vscode-comment">2024</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-base text-vscode-variable">Organizer & Lead</p>
                    <p className="text-sm text-vscode-comment">Jabalpur, India</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Led a core team of 12, mentoring 1000+ students and scaling the community to 5000+ members across multiple initiatives.</span></li>
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Organized workshops, hackathons, and study jams on Google Cloud, Generative AI, Flutter, and Web Development; recognized as a Top 5 GDSC campus club in India.</span></li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">Google Cloud Arcade Facilitator</h3>
                    <span className="text-sm text-vscode-comment">2025</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-base text-vscode-variable">Facilitator (2x Certified)</p>
                    <p className="text-sm text-vscode-comment">Jabalpur, India</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Facilitated Google Cloud Arcade campaigns twice, helping over 500+ learners gain Google Cloud skills and achieve the Ultimate Milestone badge.</span></li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">NASA International Space Apps Challenge</h3>
                    <span className="text-sm text-vscode-comment">2025</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-base text-vscode-variable">Global Organizing Team & Judge</p>
                    <p className="text-sm text-vscode-comment">Remote</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Led the global organizing team, designing hackathon workflows, coordinating mentors and participants across time zones, and judging 70+ projects while mentoring teams to refine submissions and achieve awards.</span></li>
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
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Upgraded Node.js to version 22 across all configuration files and resolved Ruby deprecation warnings, ensuring smoother operations and improved performance.</span></li>
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Enhanced the Vue Simulator's user experience by migrating code from JavaScript to TypeScript, resulting in increased type safety and maintainability.</span></li>
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
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Developed comprehensive unit tests, achieving 100% test coverage to ensure robust software quality.</span></li>
                    <li className="flex items-start gap-2 text-vscode-text"><span className="text-vscode-accent mt-1">•</span><span>Resolved critical Flutter bugs and revamped the admin control panel to enhance functionality and user experience.</span></li>
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
                  <p className="text-vscode-text mb-4 flex-grow">An AI-powered financial guidance platform. Because who needs a financial advisor when you have GPT-4?</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Next.js</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Tailwind CSS</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Shadcn-ui</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Magic-ui</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Supabase</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">NextAuth</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Prisma</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">OpenAI API</span>
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
                    <a
                      href="https://finlitera.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-vscode-accent hover:underline flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      <span>Preview</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300 h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-white mb-2">ATS100 - AI Resume Analyzer</h3>
                  <p className="text-vscode-text mb-4 flex-grow">Tells you why your resume gets rejected. Spoiler: It's not you, it's the ATS. (Okay, maybe it's a little bit you.)</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">React.js</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">TypeScript</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">PDF.js</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Puter.js</span>
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
                    <a
                      href="https://ats100.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-vscode-accent hover:underline flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      <span>Preview</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300 h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-white mb-2">CodeSpace - Realtime Code Editor</h3>
                  <p className="text-vscode-text mb-4 flex-grow">Real-time collaborative code editor. Like Google Docs, but for people who argue about tabs vs spaces.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">React.js</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">TypeScript</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Socket.io</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Node.js</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-auto">
                    <a
                      href="https://github.com/gitsofaryan/codespace"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-vscode-accent hover:underline flex items-center gap-1"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                    <a
                      href="https://codespaces.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-vscode-accent hover:underline flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      <span>Preview</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300 h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-white mb-2">InSignia - ISL Translator</h3>
                  <p className="text-vscode-text mb-4 flex-grow">Translates Indian Sign Language to text and speech using CNNs. Making communication barriers a thing of the past.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Python</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">CNN</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Flask</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">OpenCV</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Mediapipe</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">pyttsx3</span>
                    <span className="text-xs bg-vscode-highlight px-2 py-1 rounded">Google TTS</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-auto">
                    <a
                      href="https://github.com/gitsofaryan/insignia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-vscode-accent hover:underline flex items-center gap-1"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                    <a
                      href="https://insignia.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-vscode-accent hover:underline flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      <span>Preview</span>
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

            <div className="space-y-4">
              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-white">Gyan Ganga Institute of Technology and Sciences, Jabalpur</h3>
                    <span className="text-sm text-vscode-comment">2022 - 2026</span>
                  </div>
                  <p className="text-vscode-text">Bachelor of Technology in Computer Science and Business System (CSBS)</p>
                  <p className="text-vscode-variable">CGPA: 8.25</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-white">Ajay Satya Prakash Public School, Jabalpur</h3>
                    <span className="text-sm text-vscode-comment">2021 - 2022</span>
                  </div>
                  <p className="text-vscode-text">Senior Secondary (Class XII), CBSE Board</p>
                  <p className="text-vscode-variable">Percentage: 92%</p>
                </CardContent>
              </Card>
            </div>
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
          <div className="sticky top-4 max-h-screen overflow-y-auto">
            <img
              src="/img/me.png"
              alt="Aryan Jain"
              className="w-full rounded-xl shadow-xl mb-4 border border-vscode-border transform hover:scale-[1.02] transition-transform duration-300"
            />



            <Card className="mb-4 bg-[#1F1F1F] border-vscode-border hover:border-vscode-accent transition-colors duration-300">
              <CardContent className="py-4">
                <h3 className="text-base font-semibold mb-2">Get In Touch</h3>
                <div className="space-y-1.5">
                  <a
                    href="mailto:mail.aryan.jain07@gmail.com"
                    className="flex items-center gap-2 text-sm text-vscode-text hover:text-vscode-accent transition-colors duration-300"
                  >
                    <Mail size={14} />
                    <span>Mail</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/aryan-jain07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-vscode-text hover:text-vscode-accent transition-colors duration-300"
                  >
                    <Linkedin size={14} />
                    <span>aryan-jain07</span>
                  </a>
                  <a
                    href="https://x.com/aryanjain1506"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-vscode-text hover:text-vscode-accent transition-colors duration-300"
                  >
                    <TwitterIcon size={14} />
                    <span>aryanjain1506</span>
                  </a>
                  <a
                    href="https://t.me/arienjain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-vscode-text hover:text-vscode-accent transition-colors duration-300"
                  >
                    <FaTelegramPlane size={14} />
                    <span>arienjain</span>
                  </a>
                  <a
                    href="https://discord.com/users/cosmicnerd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-vscode-text hover:text-vscode-accent transition-colors duration-300"
                  >
                    <FaDiscord size={14} />
                    <span>cosmicnerd</span>
                  </a>
                  <a
                    href="https://instagram.com/arien_jain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-vscode-text hover:text-vscode-accent transition-colors duration-300"
                  >
                    <Instagram size={14} />
                    <span>arien_jain</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Button asChild className="w-full gap-2">
              <a href="https://github.com/gitsofaryan/arien.dev/issues/new" target='_blank' rel="noopener noreferrer">
                <PenTool size={16} />
                <span>Write a Note</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

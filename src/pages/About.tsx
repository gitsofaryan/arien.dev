import React from 'react';
import {
  Briefcase,
  Code,
  ExternalLink,
  Github,
  GitBranch,
  Globe,
  GraduationCap,
  Linkedin,
  PartyPopper,
  Rocket,
  Sparkles,
  Target,
  Trophy,
  Users,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RevealItem, StaggeredSection } from '@/components/ui/motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resumeData } from '@/data/resumeData';

const About: React.FC = () => {
  const orgHandles = [
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
    'p2poolv2',
  ];

  return (
    <StaggeredSection className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-12 animate-fade-in font-mono text-vscode-text/80">
      <RevealItem>
        <section className="mb-12">
          <Card className="bg-vscode-sidebar/60 border-vscode-border overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1.3fr,0.7fr] gap-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold text-vscode-text tracking-tight">
                      <span className="text-vscode-function">Resume</span>
                      <span className="text-vscode-class">.dossier</span>
                    </h1>
                    <p className="text-vscode-accent text-sm uppercase tracking-[0.2em]">{resumeData.personalInfo.tagline}</p>
                  </div>

                  <p className="text-base md:text-lg text-vscode-text/85 leading-relaxed">{resumeData.personalInfo.bio}</p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`https://github.com/${resumeData.personalInfo.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-vscode-bg border border-vscode-border rounded-md text-sm hover:border-vscode-accent hover:text-vscode-accent transition-colors"
                    >
                      <Github size={16} /> GitHub
                    </a>
                    <a
                      href={`https://linkedin.com/in/${resumeData.personalInfo.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-vscode-bg border border-vscode-border rounded-md text-sm hover:border-vscode-accent hover:text-vscode-accent transition-colors"
                    >
                      <Linkedin size={16} /> LinkedIn
                    </a>
                    <a
                      href={`https://leetcode.com/u/${resumeData.personalInfo.leetcode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-vscode-bg border border-vscode-border rounded-md text-sm hover:border-vscode-accent hover:text-vscode-accent transition-colors"
                    >
                      <Code size={16} /> LeetCode
                    </a>
                    <a
                      href="/resume/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-vscode-function text-vscode-bg rounded-md text-sm font-bold hover:opacity-90 transition-opacity"
                    >
                      <Briefcase size={16} /> Download CV
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Card className="bg-vscode-bg border-vscode-border">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-vscode-text">80+</div>
                      <div className="text-xs text-vscode-comment uppercase tracking-widest">Hackathons</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-vscode-bg border-vscode-border">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-vscode-text">500+</div>
                      <div className="text-xs text-vscode-comment uppercase tracking-widest">DSA Solved</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-vscode-bg border-vscode-border col-span-2">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-vscode-text">3</div>
                      <div className="text-xs text-vscode-comment uppercase tracking-widest">Patents Co-Invented</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-vscode-bg border-vscode-border col-span-2">
                    <CardContent className="p-4">
                      <div className="text-xs uppercase tracking-widest text-vscode-comment mb-2">Now Building</div>
                      <div className="flex flex-wrap gap-2">
                        {(resumeData.focus || []).slice(0, 2).map((item) => (
                          <Badge key={item.title} variant="outline" className="border-vscode-border text-vscode-text/80">
                            {item.title}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </RevealItem>

      <RevealItem>
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-vscode-text mb-6 flex items-center gap-2">
            <Rocket size={24} className="text-vscode-accent" />
            Technical Arsenal
          </h2>

          <Tabs defaultValue="languages" className="w-full">
            <TabsList className="w-full justify-start bg-vscode-sidebar border border-vscode-border h-auto p-1 flex-wrap">
              <TabsTrigger value="languages" className="data-[state=active]:bg-vscode-bg data-[state=active]:text-vscode-accent">Languages</TabsTrigger>
              <TabsTrigger value="frameworks" className="data-[state=active]:bg-vscode-bg data-[state=active]:text-vscode-accent">Frameworks</TabsTrigger>
              <TabsTrigger value="blockchain" className="data-[state=active]:bg-vscode-bg data-[state=active]:text-vscode-accent">Blockchain & AI</TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-vscode-bg data-[state=active]:text-vscode-accent">Tools & Cloud</TabsTrigger>
            </TabsList>

            <TabsContent value="languages">
              <Card className="bg-vscode-sidebar border-vscode-border">
                <CardContent className="p-6 flex flex-wrap gap-2">
                  {resumeData.technicalSkills.languages.map((item) => (
                    <Badge key={item} variant="outline" className="border-vscode-border text-vscode-text hover:border-vscode-accent">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="frameworks">
              <Card className="bg-vscode-sidebar border-vscode-border">
                <CardContent className="p-6 flex flex-wrap gap-2">
                  {resumeData.technicalSkills.frameworks.map((item) => (
                    <Badge key={item} variant="outline" className="border-vscode-border text-vscode-text hover:border-vscode-accent">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blockchain">
              <Card className="bg-vscode-sidebar border-vscode-border">
                <CardContent className="p-6 flex flex-wrap gap-2">
                  {resumeData.technicalSkills.blockchain_ai.map((item) => (
                    <Badge key={item} variant="outline" className="border-vscode-border text-vscode-text hover:border-vscode-accent">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tools">
              <Card className="bg-vscode-sidebar border-vscode-border">
                <CardContent className="p-6 flex flex-wrap gap-2">
                  {resumeData.technicalSkills.tools.map((item) => (
                    <Badge key={item} variant="outline" className="border-vscode-border text-vscode-text hover:border-vscode-accent">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </RevealItem>

      <RevealItem>
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-vscode-text mb-6 flex items-center gap-2">
            <Briefcase size={24} className="text-vscode-accent" />
            Experience Log
          </h2>
          <Card className="bg-vscode-sidebar border-vscode-border">
            <CardContent className="p-2 md:p-4">
              <Accordion type="single" collapsible className="w-full">
                {resumeData.experience.map((exp, index) => (
                  <AccordionItem value={`exp-${index}`} key={exp.company + exp.role} className="border-vscode-border">
                    <AccordionTrigger className="px-3 md:px-4 hover:no-underline">
                      <div className="text-left">
                        <p className="text-vscode-text font-semibold">{exp.role}</p>
                        <p className="text-xs text-vscode-comment">@{exp.company} • {exp.duration}</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 md:px-4 pb-5">
                      <p className="text-xs text-vscode-comment mb-3">{exp.location}</p>
                      <ul className="space-y-2 list-disc list-inside text-sm text-vscode-text/80">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>
      </RevealItem>

      <RevealItem>
        <section className="mb-12 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="bg-vscode-sidebar border-vscode-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-vscode-text flex items-center gap-2 text-xl">
                <Users size={18} className="text-vscode-accent" /> Leadership
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {resumeData.leadership.map((role, idx) => (
                  <AccordionItem value={`lead-${idx}`} key={role.organization} className="border-vscode-border">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="text-left">
                        <p className="font-semibold text-vscode-text">{role.organization}</p>
                        <p className="text-xs text-vscode-comment">{role.role} • {role.year}</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-xs text-vscode-comment mb-2">{role.location}</p>
                      <ul className="list-disc list-inside text-sm text-vscode-text/80 space-y-1">
                        {role.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="bg-vscode-sidebar border-vscode-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-vscode-text flex items-center gap-2 text-xl">
                <Trophy size={18} className="text-vscode-accent" /> Notable Wins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-2">
                  {resumeData.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-vscode-text/80">
                      <span className="text-vscode-accent mt-1">▹</span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
      </RevealItem>

      <RevealItem>
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-vscode-text mb-6 flex items-center gap-2">
            <GitBranch size={24} className="text-vscode-accent" />
            Open Source Footprint
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {resumeData.openSource.map((item) => (
              <Card key={item.title} className="bg-vscode-sidebar border-vscode-border">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-vscode-text text-lg">
                    <span>{item.title}</span>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-vscode-accent hover:text-vscode-text transition-colors">
                      <ExternalLink size={15} />
                    </a>
                  </CardTitle>
                  <p className="text-xs text-vscode-comment">{item.role} • {item.duration}</p>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-vscode-text/80">
                  {item.desc.map((d, i) => (
                    <p key={i}>• {d}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-vscode-sidebar border-vscode-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-vscode-text text-lg flex items-center gap-2">
                <Globe size={17} className="text-vscode-accent" />
                Organizations Contributed To
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {orgHandles.map((handle) => (
                  <a
                    key={handle}
                    href={`https://github.com/${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-1"
                    aria-label={`View ${handle} on GitHub`}
                  >
                    <img
                      src={`https://github.com/${handle}.png?size=96`}
                      alt={`${handle} avatar`}
                      loading="lazy"
                      className="w-14 h-14 rounded-full border border-vscode-border group-hover:border-vscode-accent transition-colors"
                      style={{ backgroundColor: 'white' }}
                    />
                    <span className="text-[11px] text-vscode-comment group-hover:text-vscode-text truncate max-w-full">@{handle}</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </RevealItem>

      <RevealItem>
        <Separator className="my-10 bg-vscode-border" />
      </RevealItem>

      <RevealItem>
        <section className="grid grid-cols-1 xl:grid-cols-[1.2fr,0.8fr] gap-6">
          <Card className="bg-vscode-sidebar border-vscode-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-vscode-text flex items-center gap-2 text-xl">
                <GraduationCap size={18} className="text-vscode-accent" /> Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="rounded-md border border-vscode-border bg-vscode-bg p-4">
                  <p className="font-semibold text-vscode-text">{edu.institution}</p>
                  <p className="text-sm text-vscode-accent mt-1">{edu.degree}</p>
                  <p className="text-xs text-vscode-comment mt-2">{edu.duration} • {edu.grade}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-vscode-sidebar border-vscode-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-vscode-text flex items-center gap-2 text-xl">
                <PartyPopper size={18} className="text-vscode-accent" /> Offline Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-vscode-text/80">
              <p className="flex items-center gap-2"><Sparkles size={14} className="text-vscode-accent" /> Exploring astrology and the cosmos</p>
              <p className="flex items-center gap-2"><Sparkles size={14} className="text-vscode-accent" /> Reading about systems, product strategy, and startup stories</p>
              <p className="flex items-center gap-2"><Sparkles size={14} className="text-vscode-accent" /> Long coding sessions with music in the background</p>
              <p className="flex items-center gap-2"><Sparkles size={14} className="text-vscode-accent" /> Mentoring students and helping teams ship faster</p>

              <Separator className="my-4 bg-vscode-border" />

              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-widest text-vscode-comment flex items-center gap-2">
                  <Target size={13} className="text-vscode-accent" /> Current Focus
                </h3>
                {(resumeData.focus || []).map((item) => (
                  <p key={item.title} className="text-xs text-vscode-text/70">• {item.desc}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </RevealItem>
    </StaggeredSection>
  );
};

export default About;

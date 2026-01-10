import * as React from 'react';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '@/components/ProjectCard';
import { Github, Linkedin, Mail, Code, Terminal, Cpu, Globe, Database, Coffee, Twitter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resumeData";

// Fallback mock profile data in case API fails
const fallbackProfileData = {
  username: "gitsofaryan",
  avatar: "https://avatars.githubusercontent.com/u/12345678?v=4",
  bio: "Software engineer and open-source creator.",
  followers: 150,
  following: 80,
  publicRepos: 45,
  name: "Arien"
};

// Mock project data (replace with API calls in production)
const featuredProjects = [
  {
    id: "finlitera",
    title: "FinLitera - AI Financial Assistant",
    description: "Built an AI platform providing financial guidance, investment tips, budgeting advice, and interactive learning with real-time portfolio analysis.",
    image: "/uploads/finlitera.png",
    link: "https://github.com/gitsofaryan/finlitera",
    tags: ["Next.js", "Supabase", "OpenAI API", "Prisma"]
  },
  {
    id: "ats100",
    title: "ATS100 - AI Resume Analyzer",
    description: "Built a web app that analyzes resumes, gives ATS scores, and provides feedback on strengths, weaknesses, and improvements.",
    image: "/uploads/ats100.png",
    link: "https://github.com/gitsofaryan/ats100",
    tags: ["React.js", "TypeScript", "PDF.js", "Vite"]
  },
  {
    id: "codespace",
    title: "CodeSpace - Realtime Code Editor",
    description: "A collaborative, real-time code editor where users can seamlessly code together with integrated chat and notifications.",
    image: "/uploads/c1a2980b-0986-4a83-a70e-dc805410acaf.png",
    link: "https://github.com/gitsofaryan/codespace",
    tags: ["React.js", "TypeScript", "Socket.io", "Node.js"]
  },
  {
    id: "insignia",
    title: "InSignia - Indian Sign Language Translator",
    description: "A platform that turns Indian Sign Language (ISL) gestures into text and speech in real-time for easy communication.",
    image: "/uploads/insignia.png",
    link: "https://github.com/gitsofaryan/insignia",
    tags: ["Python", "CNN", "Flask", "OpenCV"]
  }
];

// Mock notes data (replace with API calls in production)
const notes = [
  {
    id: "year-in-review-2024",
    title: "Year in Review: 2024 into 2025",
    link: "/notes/year-in-review",
    date: "2025-03-01",
    isNew: true
  },
  {
    id: "redesign",
    title: "Redesign: Version 7.0: Sidebars, light-dark, and Bluesky",
    link: "/notes/redesign",
    date: "2024-12-01",
    isNew: false
  },
  {
    id: "year-in-review-2023",
    title: "Year in Review: 2023 into 2024",
    link: "/notes/year-in-review-2023",
    date: "2024-01-01",
    isNew: false
  }
];

// Define proper interface for profile data
interface ProfileData {
  username: string;
  avatar?: string;
  avatar_url?: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos?: number;
  public_repos?: number;
  name: string;
  location?: string;
  company?: string;
  blog?: string | null;
  twitter_username?: string | null;
  login?: string;
}

// Define interface for ProfileCard props
interface ProfileCardProps {
  profile: ProfileData;
}

// Memoized ProfileCard component
const ProfileCard = memo(({ profile }: ProfileCardProps) => (
  <Card className="bg-vscode-sidebar border border-vscode-border mb-8">
    <CardHeader className="p-4 flex flex-row items-center gap-4">
      <img
        src={profile.avatar_url || profile.avatar}
        alt={`Avatar of ${profile.login || profile.username}`}
        className="w-16 h-16 rounded-full"
        loading="lazy"
      />
      <div>
        <CardTitle className="text-xl font-bold text-vscode-text">{profile.name || profile.username}</CardTitle>
        <CardDescription className="text-vscode-text/60">{profile.bio || 'No bio available'}</CardDescription>
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="flex gap-4 text-sm text-vscode-text/80">
        <span>{profile.followers} Followers</span>
        <span>{profile.following} Following</span>
        <span>{profile.public_repos || profile.publicRepos} Public Repos</span>
      </div>
      <img
        src={`https://github-readme-stats.vercel.app/api?username=${profile.login || profile.username}&show_icons=true&theme=transparent&text_color=d4d4d4&title_color=569cd6&icon_color=569cd6`}
        alt={`GitHub stats for ${profile.login || profile.username}`}
        className="mt-4 w-full rounded"
        loading="lazy"
      />
    </CardContent>
  </Card>
));

// ProjectCard extracted to components/ProjectCard.tsx

// Format date for display
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const Home = () => {
  const [profileData, setProfileData] = useState<ProfileData>(fallbackProfileData);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/gitsofaryan');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfileData({
          username: data.login,
          avatar_url: data.avatar_url,
          bio: data.bio || 'No bio available',
          followers: data.followers,
          following: data.following,
          public_repos: data.public_repos,
          name: data.name || data.login,
          location: data.location || 'Not specified',
          company: data.company || 'Not specified',
          blog: data.blog || null,
          twitter_username: data.twitter_username || null,
          login: data.login
        });
      } catch (error) {
        console.error('Error fetching GitHub profile:', error);
        setProfileData(fallbackProfileData); // Fallback to mock data
      }
    };
    fetchProfileData();
  }, []);

  // Social links derived from resume data
  const socials = [
    {
      id: 'github',
      href: `https://github.com/${resumeData.personalInfo.github}`,
      label: 'GitHub',
      icon: Github
    },
    {
      id: 'linkedin',
      href: `https://www.linkedin.com/in/${resumeData.personalInfo.linkedin}`,
      label: 'LinkedIn',
      icon: Linkedin
    },
    {
      id: 'twitter',
      href: `https://twitter.com/${resumeData.personalInfo.github}`,
      label: 'Twitter',
      icon: Twitter
    },
    {
      id: 'devpost',
      href: `https://devpost.com/${resumeData.personalInfo.devpost}`,
      label: 'Devpost',
      icon: Code
    },
    {
      id: 'leetcode',
      href: `https://leetcode.com/${resumeData.personalInfo.leetcode}`,
      label: 'LeetCode',
      icon: Code
    },
    {
      id: 'website',
      href: resumeData.personalInfo.website,
      label: 'Website',
      icon: Globe
    },
    {
      id: 'email',
      href: `mailto:${resumeData.personalInfo.email}`,
      label: 'Email',
      icon: Mail
    }
  ];

  const orgHandles: string[] = [
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
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="select-none text-vscode-text/60 font-mono text-sm mb-8 animate-fade-in">
        &lt;!-- Hero section --&gt;
      </div>

      <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] text-vscode-text animate-in slide-in-from-bottom-5 duration-500">
        Software<br />
        <span className="text-vscode-text/70">Engineer</span>
      </h1>

      <div className="max-w-2xl">
        <p className="text-lg md:text-xl text-vscode-text/80 leading-relaxed mb-4 font-mono">
          {resumeData.personalInfo.bio}
        </p>
        <p className="text-sm md:text-base text-vscode-accent font-mono mb-12">
             // Current Vibe: Building fast, breaking barriers, and shipping continuously.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-24">
        <Link to="/about">
          <Button className="h-12 px-8 bg-vscode-text text-vscode-bg hover:bg-vscode-highlight rounded-sm font-bold tracking-wide">
            MORE ABOUT ME
          </Button>
        </Link>
        <Link to="/projects">
          <Button variant="ghost" className="h-12 px-8 text-vscode-text hover:bg-vscode-highlight rounded-sm font-bold tracking-wide flex items-center gap-2 group">
            VIEW WORK <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
          </Button>
        </Link>
      </div>

      <div className="mb-24 space-y-12">
        {/* Technical Proficiency */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center text-vscode-text">
            <span className="text-vscode-accent mr-3">const</span>
            TECHNICAL_PROFICIENCY
            <span className="text-vscode-accent ml-3">=</span>
            <span className="text-vscode-text ml-3">{'{'}</span>
          </h2>
          <div className="pl-6 md:pl-12 border-l border-vscode-border ml-3 md:ml-6 space-y-4 font-mono text-sm leading-relaxed">
            <div>
              <span className="text-vscode-def">Languages:</span> <span className="text-vscode-string">['TypeScript', 'Rust', 'Solidity', 'Python', 'C++', 'Go']</span>,
            </div>
            <div>
              <span className="text-vscode-def">Blockchain:</span> <span className="text-vscode-string">['Smart Contracts', 'Web3.js', 'Ethereum', 'Bitcoin', 'Lightning']</span>,
            </div>
            <div>
              <span className="text-vscode-def">AI_ML_Data:</span> <span className="text-vscode-string">['Machine Learning', 'Deep Learning', 'Data Science', 'TensorFlow']</span>,
            </div>
            <div>
              <span className="text-vscode-def">MERN_Stack:</span> <span className="text-vscode-string">['MongoDB', 'Express', 'React', 'Node', 'Next.js']</span>,
            </div>
            <div>
              <span className="text-vscode-def">Backend_Cloud:</span> <span className="text-vscode-string">['Microservices', 'Docker', 'K8s', 'AWS', 'GCP', 'Supabase']</span>,
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold mt-2 ml-3 text-vscode-text">
            <span className="text-vscode-text">{'}'};</span>
          </h2>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center text-vscode-text">
            <span className="text-vscode-accent mr-3">const</span>
            ACHIEVEMENTS
            <span className="text-vscode-accent ml-3">=</span>
            <span className="text-vscode-text ml-3">[</span>
          </h2>
          <div className="pl-6 md:pl-12 border-l border-vscode-border ml-3 md:ml-6 space-y-2 font-mono text-sm">
            {resumeData.achievements.map((achievement, i) => (
              <div key={i} className="text-vscode-text/80">
                <span className="text-vscode-string">"{achievement}"</span>,
              </div>
            ))}
          </div>
          <h2 className="text-xl md:text-2xl font-bold mt-2 ml-3 text-vscode-text">
            <span className="text-vscode-text">];</span>
          </h2>
        </div>
      </div>

      <div className="select-none text-vscode-text/60 font-mono text-sm mb-12">
        &lt;!-- Featured work --&gt;
      </div>

      {/* Work Experience Section */}
      <div className="mt-16 mb-24">
        <h2 className="text-xl md:text-2xl font-bold mb-12 flex items-center text-vscode-text">
          <span className="text-vscode-accent mr-3">const</span>
          WORK_EXPERIENCE
          <span className="text-vscode-accent ml-3">=</span>
          <span className="text-vscode-text ml-3">[</span>
        </h2>

        <div className="relative border-l border-vscode-border ml-3 md:ml-6 space-y-12 pl-8 md:pl-12">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-0 w-4 h-4 rounded-full bg-vscode-sidebar border-2 border-vscode-border group-hover:border-vscode-accent group-hover:bg-vscode-accent transition-all duration-300"></div>

              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="text-xl font-bold text-vscode-text group-hover:text-vscode-accent transition-colors">
                  {exp.company}
                </h3>
                <span className="text-sm font-mono text-vscode-text/60">{exp.duration}</span>
              </div>

              <div className="text-md text-vscode-text/70 font-mono mb-4 flex items-center gap-2">
                <span>{exp.role}</span>
                <span className="text-vscode-text/40">•</span>
                <span className="text-xs text-vscode-text/50">{exp.location}</span>
              </div>

              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-vscode-text/80 text-sm leading-relaxed flex items-start gap-3">
                    <span className="text-vscode-accent mt-1.5 text-xs leading-none">{'//'}</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <h2 className="text-xl md:text-2xl font-bold mt-8 ml-3 text-vscode-text">
          <span className="text-vscode-text">];</span>
        </h2>
      </div>

      {/* Organizations Section */}
      <div className="mt-16">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-vscode-text">Organizations I Contributed In.</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {orgHandles.map(handle => (
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
                style={{ backgroundColor: 'white' }}
              />
              <span className="mt-2 text-xs text-vscode-text/80 group-hover:text-vscode-text truncate max-w-16">@{handle}</span>
            </a>
          ))}
        </div>
      </div>


      {/* Graphs Section */}
      <div className="mt-16">
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center text-vscode-text"><Github size={24} className="mr-2" />Activity & Stats</h2>
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
          <div className="w-full bg-vscode-sidebar rounded-lg p-3 border border-vscode-border">
            <h3 className="text-base font-semibold mb-2 text-vscode-text">GitHub Contributions</h3>
            <img
              src={`https://ghchart.rshah.org/${profileData.username}`}
              alt={`GitHub contribution graph for ${profileData.username}`}
              className="block mx-auto w-full"
              loading="lazy"
            />
          </div>
          <div className="w-full bg-vscode-sidebar rounded-lg p-3 border border-vscode-border">
            <h3 className="text-base font-semibold mb-2 text-vscode-text">LeetCode Progress</h3>
            <img
              src={`https://leetcard.jacoblin.cool/${resumeData.personalInfo.leetcode}?theme=dark&font=Source%20Sans%20Pro&ext=heatmap`}
              alt={`LeetCode stats for ${resumeData.personalInfo.leetcode}`}
              className="block mx-auto w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Get In Touch Section */}
      <div className="mt-16 mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Get In Touch</h2>
        <p className="text-sm md:text-lg mb-6 text-vscode-text">
          Feel free to reach out if you'd like to collaborate, discuss opportunities, or just chat about tech!
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`https://www.linkedin.com/in/${resumeData.personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"

            aria-label="Connect on LinkedIn"
          >
            <Button>

              <Linkedin size={16} />
              <span>LinkedIn</span>
            </Button>
          </a>
          <a
            href={`mailto:${resumeData.personalInfo.email}`}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-vscode-border hover:border-vscode-accent bg-vscode-sidebar transition-colors"
            aria-label="Send an email"
          >
            <Mail size={16} />
            <span>Email</span>
          </a>
        </div>
      </div>



      {/* Featured Projects Section */}
      {/* 
      <div className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Link to="/projects" className="text-vscode-accent hover:underline" aria-label="View all projects">
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {featuredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div> 
      */}
    </div>
  );
};

export default Home;

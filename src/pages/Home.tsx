
import * as React from 'react';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, GitPullRequest, Linkedin, Globe, Mail, FileText, Code, Twitter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    image: "/lovable-uploads/finlitera.png",
    link: "https://github.com/gitsofaryan/finlitera",
    tags: ["Next.js", "Supabase", "OpenAI API", "Prisma"]
  },
  {
    id: "ats100",
    title: "ATS100 - AI Resume Analyzer",
    description: "Built a web app that analyzes resumes, gives ATS scores, and provides feedback on strengths, weaknesses, and improvements.",
    image: "/lovable-uploads/ats100.png",
    link: "https://github.com/gitsofaryan/ats100",
    tags: ["React.js", "TypeScript", "PDF.js", "Vite"]
  },
  {
    id: "codespace",
    title: "CodeSpace - Realtime Code Editor",
    description: "A collaborative, real-time code editor where users can seamlessly code together with integrated chat and notifications.",
    image: "/lovable-uploads/c1a2980b-0986-4a83-a70e-dc805410acaf.png",
    link: "https://github.com/gitsofaryan/codespace",
    tags: ["React.js", "TypeScript", "Socket.io", "Node.js"]
  },
  {
    id: "insignia",
    title: "InSignia - Indian Sign Language Translator",
    description: "A platform that turns Indian Sign Language (ISL) gestures into text and speech in real-time for easy communication.",
    image: "/lovable-uploads/insignia.png",
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
        <CardTitle className="text-xl font-bold text-white">{profile.name || profile.username}</CardTitle>
        <CardDescription className="text-vscode-text">{profile.bio || 'No bio available'}</CardDescription>
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="flex gap-4 text-sm text-vscode-text">
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

// Define interface for ProjectData
interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

// Define interface for ProjectCard props
interface ProjectCardProps {
  project: ProjectData;
}

// Memoized ProjectCard component
const ProjectCard = memo(({ project }: ProjectCardProps) => (
  <Link to={project.link} className="block">
    <Card className="h-full bg-vscode-sidebar border border-vscode-border hover:border-vscode-accent transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold text-white">{project.title}</CardTitle>
        <CardDescription className="text-vscode-text">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map(tag => (
            <span key={`${project.id}-${tag}`} className="text-xs px-2 py-1 bg-vscode-highlight rounded">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  </Link>
));

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
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
        Hey, I'm
      </h1>
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-vscode-accent">
        {resumeData?.personalInfo?.name || 'Aryan Jain'}.
      </h2>
      <p className="text-xl md:text-2xl font-medium mb-6 text-vscode-text leading-relaxed">
        <span className="text-vscode-accent font-semibold">Fullstack Developer</span> • <span className="text-vscode-accent font-semibold">SoB'25</span> Lightning Protocols • <span className="text-vscode-accent font-semibold">GoQuant</span> Eng. Fellow'25 • <span className="text-vscode-accent font-semibold">Amazon ML School'25</span> • <span className="text-vscode-accent font-semibold">NASA Navigator '25</span>• <span className="text-vscode-accent font-semibold">GDSC Lead'24</span>
      </p>

      <div className="grid grid-cols-1 gap-8 mt-8">
        <div>
          <p className="text-lg mb-4 leading-relaxed">
       A full-stack engineer and AI/ML practitioner with experience across protocol engineering, exchange systems, and open-source infrastructure. I've contributed to <span className="text-vscode-accent font-medium">Summer of Bitcoin</span> (Lightning Protocols), <span className="text-vscode-accent font-medium">Google Summer of Code</span>, <span className="text-vscode-accent font-medium">NASA Space Apps</span>, and multiple global OSS ecosystems.
          </p>
          <p className="text-lg mb-6 leading-relaxed">
            As a <span className="text-vscode-accent font-medium">GoQuant Engineering Fellow</span>, <span className="text-vscode-accent font-medium">Amazon ML School</span> participant, and <span className="text-vscode-accent font-medium">NASA Navigator</span>, I focus on building scalable full-stack systems, ML-powered features, and production-ready architectures. I love open source, rapid prototyping, solving challenging engineering problems, and continuously learning to build things that create real impact.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              to="/about"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-vscode-accent hover:bg-opacity-80 text-white transition-colors"
              aria-label="Learn more about me"
            >
              <FileText size={16} />
              <span>About Me</span>
            </Link>
            <Link
              to="/resume"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-vscode-border hover:border-vscode-accent bg-vscode-sidebar transition-colors"
              aria-label="View my resume"
            >
              <FileText size={16} />
              <span>Resume</span>
            </Link>
          </div>
        </div>
      </div>
      {/* Organizations Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Organizations I Contributed In.</h2>
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
              />
              <span className="mt-2 text-xs text-vscode-text group-hover:text-white truncate max-w-16">@{handle}</span>
            </a>
          ))}
        </div>
      </div>


      {/* Graphs Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center"><Github size={24} className="mr-2" />Activity & Stats</h2>
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
          <div className="w-full bg-[#0d1117] rounded-lg p-3 border border-vscode-border">
            <h3 className="text-base font-semibold mb-2 text-white">GitHub Contributions</h3>
            <img
              src={`https://ghchart.rshah.org/${profileData.username}`}
              alt={`GitHub contribution graph for ${profileData.username}`}
              className="block mx-auto w-full"
              loading="lazy"
            />
          </div>
          <div className="w-full bg-[#0d1117] rounded-lg p-3 border border-vscode-border">
            <h3 className="text-base font-semibold mb-2 text-white">LeetCode Progress</h3>
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
        <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
        <p className="text-lg mb-6 text-vscode-text">
          Feel free to reach out if you'd like to collaborate, discuss opportunities, or just chat about tech!
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`https://www.linkedin.com/in/${resumeData.personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-vscode-accent hover:bg-opacity-80 text-white transition-colors"
            aria-label="Connect on LinkedIn"
          >
            <Linkedin size={16} />
            <span>LinkedIn</span>
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

  

      {/* Featured Projects Section
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
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default Home;

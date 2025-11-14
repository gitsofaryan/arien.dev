
import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, GitPullRequest } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        Hey, I'm Arien!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
        <div className="md:col-span-3">
          <p className="text-lg mb-4">
            I'm a Full Stack Developer, Google Summer of Code '25 contributor, and open-source enthusiast.
            Selected among the top 2% of contributors at Summer of Bitcoin, I've worked on Bitcoin protocol and Lightning Network development.
            I've contributed to CircuitVerse, PalisaDoes Foundation, GeNN, and GitLab.
          </p>

          <p className="text-lg mb-4">
            I'm passionate about building scalable web applications, contributing to open source, and mentoring aspiring developers.
            Currently working as a Backend Engineer Trainee at GoQuant, developing high-performance trading systems.
          </p>

          <div className="flex space-x-4 mt-8">
            <Link
              to="/about"
              className="px-4 py-2 bg-vscode-accent hover:bg-opacity-80 text-white rounded-md transition-colors"
              aria-label="Learn more about Arien"
            >
              About Me
            </Link>
            <Link
              to="/newsletter"
              className="px-4 py-2 border border-vscode-border hover:border-vscode-accent text-white rounded-md transition-colors"
              aria-label="Subscribe to Arien's newsletter"
            >
              Newsletter
            </Link>
          </div>
        </div>
        <div className="md:col-span-2 flex items-start md:items-center justify-center">
          <img
            src="/img/ironman.png"
            alt="Illustration of Arien"
            className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[420px] rounded-lg object-cover shadow-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Open Source Contributions Section */}
      <div className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Github size={24} className="mr-2" />
            Open Source Contributions
          </h2>
          <a
            href={`https://github.com/${profileData.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-vscode-accent hover:underline"
            aria-label="View Arien's GitHub profile"
          >
            View GitHub Profile
          </a>
        </div>

        <ProfileCard profile={profileData} />

        <div className="w-full bg-[#0d1117] rounded-lg p-4 mb-8 border border-vscode-border">
          <h3 className="text-xl font-semibold mb-2 text-white">GitHub Contribution Graph</h3>
          <img
            src={`https://ghchart.rshah.org/${profileData.username}`}
            alt={`GitHub contribution graph for ${profileData.username}`}
            className="block mx-auto w-full max-w-3xl"
            loading="lazy"
          />
        </div>

        {/* <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <GitPullRequest size={20} className="mr-2" />
            Recent Pull Requests
          </h3>
          <div className="space-y-3">
            {pullRequests.map((pr, index) => (
              <div key={index} className="p-4 bg-vscode-sidebar border border-vscode-border rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${pr.status === 'merged' ? 'bg-purple-500' : 'bg-green-500'}`}></div>
                    <span className="font-medium text-white">{pr.title}</span>
                  </div>
                  <span className="text-sm text-vscode-text">{formatDate(pr.date)}</span>
                </div>
                <div className="mt-2 text-sm text-vscode-text">{pr.repo}</div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Featured Projects Section */}
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
    </div>
  );
};

export default Home;

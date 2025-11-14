
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Github, Star, GitFork, AlertCircle, Users } from 'lucide-react';
import { githubService } from '../services/GithubService';

interface GithubRepoInfoProps {
  className?: string;
}

const GithubRepoInfo: React.FC<GithubRepoInfoProps> = ({ className }) => {
  const [repoDetails, setRepoDetails] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGithubData();
  }, []);

  const fetchGithubData = async () => {
    setIsLoading(true);

    try {
      const [repo, user] = await Promise.all([
        githubService.getRepoDetails(),
        githubService.getUserDetails()
      ]);

      setRepoDetails(repo);
      setUserDetails(user);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-vscode-accent"></div>
        </div>
      </Card>
    );
  }

  if (!repoDetails || !userDetails) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex flex-col items-center text-center gap-3">
          <AlertCircle className="text-red-400" size={24} />
          <h3 className="text-lg font-medium">Could not fetch GitHub data</h3>
          <p className="text-sm text-vscode-comment mb-2">
            There was an issue accessing the repository
          </p>
          <Button onClick={fetchGithubData}>Retry</Button>
        </div>
      </Card>
    );
  }

  const { username, repo } = githubService.getCredentials();

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Github size={24} />
          <div>
            <h3 className="text-lg font-medium">GitHub Repository</h3>
            <a
              href={repoDetails.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vscode-accent hover:underline"
            >
              {username}/{repo}
            </a>
          </div>
        </div>

        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star size={14} />
            <span>{repoDetails.stargazers_count} stars</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork size={14} />
            <span>{repoDetails.forks_count} forks</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{repoDetails.subscribers_count} watchers</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <img
            src={userDetails.avatar_url}
            alt={username}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-medium">{userDetails.name || username}</p>
            <p className="text-xs text-vscode-comment">{userDetails.bio || 'GitHub User'}</p>
          </div>
        </div>

        <div className="flex justify-between mt-2">
          <Button variant="outline" size="sm" asChild>
            <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer">
              View Repository
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GithubRepoInfo;

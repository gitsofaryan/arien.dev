import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { toast } from "sonner";
import { githubService } from '../services/GithubService';

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || "";
const REDIRECT_URI = window.location.origin + "/github-callback";
const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=repo user`;

interface GitHubAuthProps {
  onSuccess?: () => void;
  buttonText?: string;
  className?: string;
}

const GitHubAuth: React.FC<GitHubAuthProps> = ({
  onSuccess,
  buttonText = "Sign in with GitHub",
  className = ""
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(githubService.isAuthenticated());
  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're returning from GitHub OAuth redirect
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (code) {
      // For a real implementation, you would exchange this code for an access token
      // using a backend service to avoid exposing your client secret
      console.log("Got GitHub authorization code:", code);
      toast.info("Processing GitHub authorization...");

      // In a real app, you would make an API call to your backend here
      // For this demo, we'll simulate a successful authentication
      simulateTokenExchange(code);

      // Remove the code from the URL to prevent refresh issues
      const newUrl = window.location.pathname;
      window.history.pushState({}, document.title, newUrl);
    }

    if (error) {
      toast.error("GitHub authentication error");
      console.error("GitHub auth error:", error);
    }

    // Check if user is already authenticated
    if (githubService.isAuthenticated()) {
      fetchUserInfo();
    }
  }, []);

  // This is a simulation - in a real app, you would exchange the code for a token via a backend
  const simulateTokenExchange = (code: string) => {
    // Simulate network delay
    setTimeout(() => {
      // For development purposes only - in real app, this would come from your backend
      const mockToken = `gh_mock_token_${code.substring(0, 6)}`;
      githubService.setCredentials(mockToken, 'gitsofaryan', 'code-scribe-website');
      setIsAuthenticated(true);
      toast.success("GitHub authentication successful!");

      fetchUserInfo();

      if (onSuccess) {
        onSuccess();
      }
    }, 1000);
  };

  const fetchUserInfo = async () => {
    try {
      const userDetails = await githubService.getUserDetails();
      if (userDetails) {
        setUserName(userDetails.login);
        setUserAvatar(userDetails.avatar_url);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSignIn = () => {
    // Redirect to GitHub OAuth authorization page
    window.location.href = GITHUB_AUTH_URL;
  };

  const handleSignOut = () => {
    githubService.clearCredentials();
    setIsAuthenticated(false);
    setUserName(null);
    setUserAvatar(null);
    toast.success("Signed out successfully");
  };

  if (isAuthenticated && userName) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {userAvatar && (
          <img
            src={userAvatar}
            alt={userName}
            className="w-6 h-6 rounded-full"
          />
        )}
        <span>{userName}</span>
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleSignIn}
      className={className}
      variant="outline"
    >
      <Github className="mr-2 h-4 w-4" />
      {buttonText}
    </Button>
  );
};

export default GitHubAuth;

import { useState, useEffect } from 'react';
import { githubService } from '@/services/GithubService';

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for GitHub authentication
    const checkAuth = async () => {
      setLoading(true);
      if (githubService.isAuthenticated()) {
        try {
          const userData = await githubService.getUserDetails();
          setUser(userData);
        } catch (error) {
          console.error('Failed to get user details:', error);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signOut = () => {
    githubService.clearCredentials();
    setUser(null);
  };

  const isAuthenticated = githubService.isAuthenticated();

  return { user, loading, signOut, isAuthenticated };
};

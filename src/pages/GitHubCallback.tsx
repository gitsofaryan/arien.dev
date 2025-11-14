
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { githubService } from '../services/GithubService';

const GitHubCallback: React.FC = () => {
  const [status, setStatus] = useState('Processing GitHub authentication...');
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract the authorization code from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
          toast.error("Authentication error: " + error);
          setStatus("Authentication failed: " + error);
          setTimeout(() => navigate('/'), 2000);
          return;
        }

        if (!code) {
          toast.error("No authorization code received");
          setStatus("Authentication failed: No code received");
          setTimeout(() => navigate('/'), 2000);
          return;
        }

        setStatus("Authorization successful! You can now comment on posts.");

        // For commenting, we'll use a simplified flow
        // Store a flag that user has authenticated via GitHub OAuth
        localStorage.setItem('github_oauth_code', code);
        localStorage.setItem('github_authenticated', 'true');

        toast.success("GitHub authentication successful! You can now comment.");
        setStatus("Authentication complete! Redirecting...");

        // Redirect back to the blog or notes page
        setTimeout(() => navigate('/blog'), 1500);
      } catch (error) {
        console.error('GitHub auth error:', error);
        toast.error("Authentication failed");
        setStatus("Authentication failed. Redirecting home...");
        setTimeout(() => navigate('/'), 2000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-vscode-accent mb-4"></div>
      <h2 className="text-xl font-semibold mb-2">GitHub Authentication</h2>
      <p>{status}</p>
    </div>
  );
};

export default GitHubCallback;

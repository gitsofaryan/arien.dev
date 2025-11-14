
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

        setStatus("Authorization successful! Processing...");

        // Exchange code for access token
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
        const clientSecret = import.meta.env.VITE_GITHUB_CLIENT_SECRET;

        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
          }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
          throw new Error(tokenData.error_description || tokenData.error);
        }

        if (!tokenData.access_token) {
          throw new Error('No access token received');
        }

        // Get authenticated user info
        const userResponse = await fetch('https://api.github.com/user', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Accept': 'application/json',
          },
        });

        const userData = await userResponse.json();

        // Store token and user info
        githubService.setCredentials(tokenData.access_token, userData.login, 'arien.dev');

        toast.success(`GitHub authentication successful! Welcome ${userData.login}`);
        setStatus("Authentication complete! Redirecting...");

        // Redirect back to the previous page or home
        setTimeout(() => navigate('/'), 1500);
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

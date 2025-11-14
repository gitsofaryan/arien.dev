import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { githubService } from '@/services/GithubService';

const Auth: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    if (githubService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleGitHubAuth = () => {
    // Redirect to GitHub OAuth
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    
    if (!clientId) {
      console.error('GitHub Client ID not found in environment variables');
      return;
    }
    
    const redirectUri = `${window.location.origin}/github-callback`;
    const scope = 'repo user';

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Welcome</CardTitle>
          <CardDescription>
            Sign in with GitHub to publish blog posts and notes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGitHubAuth}
            className="w-full flex items-center justify-center gap-2 bg-[#24292e] hover:bg-[#2f363d] text-white"
            size="lg"
          >
            <Github size={20} />
            Continue with GitHub
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">You'll need GitHub authentication to:</p>
            <ul className="space-y-1">
              <li>• Create and publish blog posts</li>
              <li>• Write notes</li>
              <li>• Comment on posts</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

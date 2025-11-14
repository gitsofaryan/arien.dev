
import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { githubService } from '../services/GithubService';
import { toast } from "sonner";
import GitHubAuth from './GitHubAuth';

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
  postType: 'blog' | 'note';
  issueNumber?: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments: initialComments, postId, postType, issueNumber }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(githubService.isAuthenticated());
  const [newComment, setNewComment] = useState('');
  const [displayComments, setDisplayComments] = useState<Comment[]>(initialComments || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if we have an issue number to fetch comments from
    if (issueNumber) {
      fetchComments(issueNumber);
    }

    // Check authentication status
    setIsAuthenticated(githubService.isAuthenticated());
  }, [issueNumber]);

  const fetchComments = async (issueNum: number) => {
    setIsLoading(true);
    try {
      const githubComments = await githubService.getComments(issueNum);
      if (githubComments && githubComments.length > 0) {
        const formattedComments = githubComments.map((comment: any) => ({
          id: comment.id.toString(),
          author: comment.user.login,
          authorAvatar: comment.user.avatar_url,
          content: comment.body,
          timestamp: comment.created_at
        }));
        setDisplayComments(formattedComments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);

    // Refresh comments after successful authentication
    if (issueNumber) {
      fetchComments(issueNumber);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    if (!isAuthenticated) {
      toast.error('Please authenticate with GitHub to comment');
      return;
    }

    if (!issueNumber) {
      toast.error('Cannot comment: This post is not connected to a GitHub issue');
      return;
    }

    setIsLoading(true);

    try {
      const response = await githubService.createComment(issueNumber, { body: newComment });

      if (response) {
        const newCommentObject: Comment = {
          id: response.id.toString(),
          author: response.user.login,
          authorAvatar: response.user.avatar_url,
          content: response.body,
          timestamp: response.created_at
        };

        setDisplayComments([newCommentObject, ...displayComments]);
        setNewComment('');
        toast.success('Comment posted successfully');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 border-t border-vscode-border pt-8">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <MessageSquare className="mr-2" size={20} />
        Comments ({displayComments.length})
      </h3>

      {!isAuthenticated ? (
        <div className="bg-vscode-highlight bg-opacity-20 rounded-lg p-6 mb-8 text-center">
          <p className="mb-4">Sign in with GitHub to join the discussion</p>
          <GitHubAuth onSuccess={handleAuthSuccess} buttonText="Sign in with GitHub" />
        </div>
      ) : (
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-4 bg-vscode-sidebar border border-vscode-border rounded-md focus:outline-none focus:border-vscode-accent"
            placeholder="Write a comment..."
            rows={4}
            disabled={isLoading}
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-vscode-accent hover:bg-opacity-90 rounded-md transition-colors disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      )}

      {isLoading && displayComments.length === 0 ? (
        <div className="flex justify-center my-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-vscode-accent"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {displayComments.map((comment) => (
            <div key={comment.id} className="border-b border-vscode-border pb-6">
              <div className="flex items-center mb-2">
                <img
                  src={comment.authorAvatar}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <div className="font-medium text-white">{comment.author}</div>
                  <div className="text-xs text-vscode-text">{new Date(comment.timestamp).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="pl-11">
                <p className="text-vscode-text">{comment.content}</p>
              </div>
            </div>
          ))}

          {displayComments.length === 0 && (
            <div className="text-center py-8 text-vscode-text">
              <p>Be the first to leave a comment!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;

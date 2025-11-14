
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Edit } from 'lucide-react';
import { toast } from "sonner";
import CommentSection from '../components/CommentSection';
import { githubService } from '../services/GithubService';

interface Note {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  isNew?: boolean;
  content: string;
  comments: Array<{
    id: string;
    author: string;
    authorAvatar: string;
    content: string;
    timestamp: string;
  }>;
  source?: 'local' | 'github';
  githubIssueNumber?: number;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if admin token is configured
    const adminToken = import.meta.env.VITE_ADMIN_GITHUB_TOKEN;
    setIsAdmin(!!adminToken && !adminToken.includes('YOUR_PERSONAL_ACCESS_TOKEN_HERE'));
  }, []);
  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);

      try {
        // Get GitHub notes only
        let githubNotes: Note[] = [];
        try {
          const githubIssues = await githubService.getIssues(['note']);
          githubNotes = githubIssues.map((issue: any) => ({
            id: `github-${issue.number}`,
            title: issue.title,
            date: new Date(issue.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            excerpt: issue.body.substring(0, 150) + '...',
            content: issue.body,
            isNew: new Date(issue.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            comments: [],
            source: 'github' as const,
            githubIssueNumber: issue.number
          }));
        } catch (error) {
          console.error('Error fetching GitHub issues:', error);
          toast.error('Failed to fetch GitHub notes');
        }

        // Sort notes by date (newest first)
        const allNotes = githubNotes.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setNotes(allNotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
        toast.error('Failed to fetch notes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    // When a GitHub note is selected, fetch its comments
    if (selectedNote?.source === 'github' && selectedNote?.githubIssueNumber) {
      const fetchIssueDetails = async () => {
        try {
          const issue = await githubService.getIssue(selectedNote.githubIssueNumber!);
          setSelectedNote(prev => prev ? { ...prev, content: issue.body } : null);
        } catch (error) {
          console.error('Error fetching issue details:', error);
        }
      };
      fetchIssueDetails();
    }
  }, [selectedNote?.id]);

  return (
    <div className="max-w-4xl mx-auto">
      {!selectedNote ? (
        <>          <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Notes</h1>
          {isAdmin && (
            <Link
              to="/write"
              className="px-4 py-2 bg-vscode-accent hover:bg-opacity-90 rounded-md transition-colors flex items-center"
            >
              <Edit size={16} className="mr-2" />
              New Note
            </Link>
          )}
        </div>
          <p className="text-lg mb-10">
            Personal thoughts, reflections, and updates about tech, life, and everything in between.
            All notes are saved as public GitHub issues.
          </p>

          {isLoading ? (
            <div className="flex justify-center my-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vscode-accent"></div>
            </div>
          ) : notes.length > 0 ? (
            <div className="space-y-10">
              {notes.map(note => (
                <div key={note.id} className="border-b border-vscode-border pb-8">
                  <div className="flex items-center mb-2">
                    {note.isNew && (
                      <span className="text-xs bg-vscode-highlight px-2 py-1 rounded mr-2">
                        New
                      </span>
                    )}
                    {note.source === 'github' && (
                      <span className="text-xs bg-vscode-sidebar px-2 py-1 rounded mr-2 flex items-center">
                        <Github size={12} className="mr-1" />
                        GitHub
                      </span>
                    )}
                    <button
                      onClick={() => setSelectedNote(note)}
                      className="text-2xl font-bold text-white hover:text-vscode-accent transition-colors text-left"
                    >
                      {note.title}
                    </button>
                  </div>
                  <p className="text-vscode-comment text-sm mb-3">{note.date}</p>
                  <p className="text-vscode-text">{note.excerpt}</p>
                  <button
                    onClick={() => setSelectedNote(note)}
                    className="inline-block mt-4 text-vscode-accent hover:underline"
                  >
                    Continue reading →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-vscode-comment text-lg mb-4">No notes found</p>
              <Link
                to="/write"
                className="px-4 py-2 bg-vscode-accent rounded-md hover:bg-opacity-90 transition-colors"
              >
                Create your first note
              </Link>
            </div>
          )}
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectedNote(null)}
            className="mb-6 flex items-center text-vscode-accent hover:underline"
          >
            ← Back to Notes
          </button>

          <div className="mb-8">
            <div className="flex items-center mb-2">
              {selectedNote.source === 'github' && (
                <span className="text-xs bg-vscode-sidebar px-2 py-1 rounded mr-2 flex items-center">
                  <Github size={12} className="mr-1" />
                  GitHub Issue #{selectedNote.githubIssueNumber}
                </span>
              )}
              <h1 className="text-3xl font-bold">{selectedNote.title}</h1>
            </div>
            <p className="text-vscode-comment mb-4">{selectedNote.date}</p>
            <div className="prose prose-invert max-w-none">
              <p>{selectedNote.content}</p>
            </div>
          </div>

          <CommentSection
            comments={selectedNote.comments}
            postId={selectedNote.id}
            postType="note"
            issueNumber={selectedNote.githubIssueNumber}
          />
        </>
      )}
    </div>
  );
};

export default Notes;

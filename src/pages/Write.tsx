
import { useState } from 'react';
import { Edit, Pencil, FileText, Eye, Github, Save } from 'lucide-react';
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { githubService } from '../services/GithubService';
import { useNavigate } from 'react-router-dom';

const Write: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isNoteType, setIsNoteType] = useState(true);
  const [tags, setTags] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Please provide both title and content");
      return;
    }

    setIsSaving(true);

    try {
      // Check if admin token is configured
      const adminToken = import.meta.env.VITE_ADMIN_GITHUB_TOKEN;
      
      if (!adminToken || adminToken.includes('YOUR_PERSONAL_ACCESS_TOKEN_HERE')) {
        toast.error("Admin token not configured. Please set VITE_ADMIN_GITHUB_TOKEN in .env.local");
        setIsSaving(false);
        return;
      }
      
      // Set admin credentials for publishing
      githubService.setCredentials(adminToken, 'gitsofaryan', 'arien.dev');

      const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag);

      // Format content with date and metadata
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      const formattedBody = `**Published:** ${formattedDate}\n\n---\n\n${content}`;

      // Publish to GitHub as Issue
      try {
        const response = isNoteType
          ? await githubService.createNote({
            title,
            body: formattedBody,
            labels: tagList,
          })
          : await githubService.createBlogPost({
            title,
            body: formattedBody,
            labels: tagList,
          });

        if (response && response.number) {
          toast.success(`Successfully published ${isNoteType ? 'note' : 'blog post'} to GitHub as Issue #${response.number}`);

          // Redirect to the appropriate page
          navigate(isNoteType ? '/notes' : '/blog');
        }
      } catch (error) {
        console.error("GitHub publish error:", error);
        toast.error("Failed to publish to GitHub. Please check your authentication and repository settings.");
      }

      setIsSaving(false);

    } catch (error) {
      console.error("Save error:", error);
      setIsSaving(false);
      toast.error("Failed to save content");
    }
  };

  // Simple markdown preview renderer
  const renderMarkdown = (markdown: string) => {
    // This is a very basic markdown renderer for preview purposes
    const html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Lists
      .replace(/^\s*\n\* (.*)/gim, '<ul>\n<li>$1</li>')
      .replace(/^\s*\n- (.*)/gim, '<ul>\n<li>$1</li>')
      // Paragraphs
      .replace(/^\s*\n([^\n]+)\n/gim, '<p>$1</p>')
      // Line breaks
      .replace(/\n/gim, '<br>');

    return { __html: html };
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold flex items-center">
          <Edit className="mr-3" size={32} />
          Write
        </h1>
      </div>

      <p className="text-lg mb-8">
        Create a new note or blog post. Content is automatically published as GitHub Issues.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              onClick={() => setIsNoteType(true)}
              className={`px-4 py-2 rounded-md transition-colors ${isNoteType
                ? 'bg-vscode-accent text-white'
                : 'bg-vscode-sidebar border border-vscode-border text-vscode-text'
                }`}
            >
              <div className="flex items-center">
                <Pencil size={16} className="mr-2" />
                Note
              </div>
            </button>
            <button
              type="button"
              onClick={() => setIsNoteType(false)}
              className={`px-4 py-2 rounded-md transition-colors ${!isNoteType
                ? 'bg-vscode-accent text-white'
                : 'bg-vscode-sidebar border border-vscode-border text-vscode-text'
                }`}
            >
              <div className="flex items-center">
                <FileText size={16} className="mr-2" />
                Blog Post
              </div>
            </button>
          </div>

          <label htmlFor="title" className="block text-white font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-vscode-sidebar border border-vscode-border rounded-md focus:outline-none focus:border-vscode-accent"
            placeholder="Enter a title for your content"
            required
          />
        </div>

        {!isNoteType && (
          <div className="mb-6">
            <label htmlFor="tags" className="block text-white font-medium mb-2">
              Tags (comma separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3 bg-vscode-sidebar border border-vscode-border rounded-md focus:outline-none focus:border-vscode-accent"
              placeholder="typescript, javascript, webdev"
            />
          </div>
        )}

        <div className="mb-8">
          <label htmlFor="content" className="block text-white font-medium mb-2">
            Content
          </label>

          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="edit" onClick={() => setViewMode('edit')}>
                <div className="flex items-center">
                  <Edit size={16} className="mr-2" />
                  Edit
                </div>
              </TabsTrigger>
              <TabsTrigger value="preview" onClick={() => setViewMode('preview')}>
                <div className="flex items-center">
                  <Eye size={16} className="mr-2" />
                  Preview
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="mt-0">
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 bg-vscode-sidebar border border-vscode-border rounded-md focus:outline-none focus:border-vscode-accent font-mono min-h-[300px]"
                placeholder="Write your content here using Markdown..."
                required
              />
              <p className="text-vscode-comment text-sm mt-2">
                Supports Markdown formatting
              </p>
            </TabsContent>
            <TabsContent value="preview" className="mt-0">
              <div className="min-h-[300px] p-4 bg-vscode-sidebar border border-vscode-border rounded-md prose prose-invert max-w-none">
                {content ? (
                  <div dangerouslySetInnerHTML={renderMarkdown(content)} />
                ) : (
                  <p className="text-vscode-comment">Preview will appear here...</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-vscode-accent hover:bg-opacity-90 rounded-md transition-colors disabled:opacity-70 flex items-center"
          >
            <Github size={16} className="mr-2" />
            {isSaving ? 'Publishing...' : `Publish ${isNoteType ? 'Note' : 'Blog Post'}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;

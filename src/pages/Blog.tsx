
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Edit, Github } from 'lucide-react';
import { toast } from "sonner";
import BlogPost from '../components/BlogPost';
import CommentSection from '../components/CommentSection';
import { githubService } from '../services/GithubService';

// Define the blog post type
interface BlogPostItem {
  id: string;
  title: string;
  date: string;
  isNew?: boolean;
  content?: string | React.ReactNode;
  source?: 'local' | 'github';
  githubIssueNumber?: number;
}

// Define the type for our blogPosts object with proper index signature
interface BlogPostsCollection {
  [year: string]: BlogPostItem[];
}

const BlogPage: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPostsCollection>({});
  const [selectedPost, setSelectedPost] = useState<BlogPostItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if admin token is configured
    const adminToken = import.meta.env.VITE_ADMIN_GITHUB_TOKEN;
    setIsAdmin(!!adminToken && !adminToken.includes('YOUR_PERSONAL_ACCESS_TOKEN_HERE'));
  }, []);
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);

      try {
        // Get GitHub blog posts only
        let githubBlogPosts: BlogPostItem[] = [];
        try {
          const githubIssues = await githubService.getIssues(['blog']);
          githubBlogPosts = githubIssues.map((issue: any) => ({
            id: `github-${issue.number}`,
            title: issue.title,
            date: new Date(issue.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
            content: issue.body,
            isNew: new Date(issue.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            source: 'github' as const,
            githubIssueNumber: issue.number
          }));
        } catch (error) {
          console.error('Error fetching GitHub issues:', error);
          toast.error('Failed to fetch GitHub blogs');
        }

        // Use only GitHub posts
        const allPosts = githubBlogPosts;

        // Organize by year
        const postsByYear: BlogPostsCollection = {};
        allPosts.forEach(post => {
          const year = new Date(post.date).getFullYear().toString();
          if (!postsByYear[year]) {
            postsByYear[year] = [];
          }
          postsByYear[year].push(post);
        });

        // Sort posts within each year
        Object.keys(postsByYear).forEach(year => {
          postsByYear[year].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        });

        // Sort years newest first
        const sortedPostsByYear: BlogPostsCollection = {};
        Object.keys(postsByYear)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .forEach(year => {
            sortedPostsByYear[year] = postsByYear[year];
          });

        setBlogPosts(sortedPostsByYear);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast.error('Failed to fetch blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    const findSelectedPost = async () => {
      if (!selectedPostId) return;

      // All posts are from GitHub now
      if (selectedPostId.startsWith('github-')) {
        const issueNumber = parseInt(selectedPostId.replace('github-', ''));
        try {
          const issue = await githubService.getIssue(issueNumber);
          setSelectedPost({
            id: selectedPostId,
            title: issue.title,
            date: new Date(issue.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            content: issue.body,
            source: 'github',
            githubIssueNumber: issue.number
          });
          return;
        } catch (error) {
          console.error('Error fetching GitHub issue:', error);
          toast.error('Failed to fetch blog post from GitHub');
          setSelectedPostId(null);
          return;
        }
      }
    };

    findSelectedPost();
  }, [selectedPostId]);

  // Filter posts based on search query
  const getFilteredPosts = (): BlogPostsCollection => {
    if (!searchQuery.trim()) return blogPosts;

    const filtered: BlogPostsCollection = {};

    Object.keys(blogPosts).forEach(year => {
      const matchingPosts = blogPosts[year].filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (matchingPosts.length > 0) {
        filtered[year] = matchingPosts;
      }
    });

    return filtered;
  };

  const filteredPosts = getFilteredPosts();

  return (
    <>
      {!selectedPostId ? (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">Blog</h1>
            {isAdmin && (
              <Link
                to="/write"
                className="px-6 py-3 bg-vscode-accent hover:bg-opacity-90 rounded-md transition-colors flex items-center"
              >
                <Edit size={18} className="mr-2" />
                Write New Post
              </Link>
            )}
          </div>
          <p className="text-lg mb-10">
            Guides, references, and tutorials on programming, web development, and design.
          </p>

          {/* Search Bar */}
          <div className="relative mb-12">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 bg-vscode-sidebar border border-vscode-border rounded-md focus:outline-none focus:border-vscode-accent"
            />
            <Search className="absolute left-3 top-3.5 text-vscode-comment" size={18} />
          </div>

          {isLoading ? (
            <div className="flex justify-center my-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vscode-accent"></div>
            </div>
          ) : Object.keys(filteredPosts).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(filteredPosts).map(([year, posts]) => (
                <div key={year} className="mb-10">
                  <h2 className="text-2xl font-bold mb-6">{year}</h2>
                  <ul className="space-y-5">
                    {posts.map(post => (
                      <li key={post.id} className="group">
                        <button
                          onClick={() => setSelectedPostId(post.id)}
                          className="w-full text-left flex items-start md:items-center flex-col md:flex-row gap-2 md:gap-0"
                        >
                          <div className="flex items-center">
                            {post.isNew && (
                              <span className="text-xs bg-vscode-highlight px-2 py-1 rounded mr-2">
                                ✨ New
                              </span>
                            )}
                            {post.source === 'github' && (
                              <span className="text-xs bg-vscode-sidebar px-2 py-1 rounded mr-2 flex items-center">
                                <Github size={12} className="mr-1" />
                                GitHub
                              </span>
                            )}
                            <span className="text-vscode-comment min-w-[80px] md:min-w-[120px]">{post.date}</span>
                          </div>
                          <span className="text-white group-hover:text-vscode-accent transition-colors">{post.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-vscode-comment">
              {searchQuery ? 'No posts found matching your search.' : 'No blog posts yet.'}
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="mb-6">
            <button
              onClick={() => setSelectedPostId(null)}
              className="flex items-center text-vscode-accent hover:underline"
            >
              ← Back to Blog
            </button>
          </div>

          {selectedPost && (
            <>
              {selectedPost.source === 'github' && (
                <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-vscode-sidebar border border-vscode-border">
                  <Github size={14} className="mr-2" />
                  <span className="text-sm">GitHub Issue #{selectedPost.githubIssueNumber}</span>
                </div>
              )}
              <BlogPost
                title={selectedPost.title}
                date={selectedPost.date}
                content={typeof selectedPost.content === 'string'
                  ? <div dangerouslySetInnerHTML={{ __html: selectedPost.content.replace(/\n/g, '<br>') }} />
                  : selectedPost.content}
                tags={[]}
              />
              <CommentSection
                comments={[]}
                postId={selectedPostId}
                postType="blog"
                issueNumber={selectedPost.githubIssueNumber}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default BlogPage;

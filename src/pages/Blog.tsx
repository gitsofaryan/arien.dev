import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';

interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  author: string;
  categories: string[];
  guid: string;
}

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<MediumArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMediumArticles = async () => {
      try {
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@arien7'
        );
        const data = await response.json();

        if (data.status === 'ok') {
          setArticles(data.items);
          if (id) {
            const article = data.items.find((item: MediumArticle) =>
              createSlug(item.title) === id
            );
            if (article) setSelectedArticle(article);
          }
        } else {
          setError('Failed to load articles');
        }
      } catch {
        setError('Failed to fetch articles');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMediumArticles();
  }, [id]);

  const createSlug = (title: string) => 
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const handleArticleClick = (article: MediumArticle) => {
    navigate(`/blog/${createSlug(article.title)}`);
    setSelectedArticle(article);
  };

  const handleBackClick = () => {
    navigate('/blog');
    setSelectedArticle(null);
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {!selectedArticle ? (
        <>
          <div className="mb-12">
            <p className="text-muted-foreground mb-2 font-mono text-sm">$ ls blog/</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Blog
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Thoughts on engineering, open source, and building developer tools.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-16 text-muted-foreground">{error}</div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No articles found</div>
          ) : (
            <div className="space-y-4">
              {articles.map((article, index) => (
                <article
                  key={index}
                  onClick={() => handleArticleClick(article)}
                  className="p-6 bg-card border border-border rounded-md hover:border-primary/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-mono">
                    <Calendar size={12} />
                    {formatDate(article.pubDate)}
                  </div>
                  <h2 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {stripHtml(article.description)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {article.categories?.slice(0, 3).map((cat, i) => (
                        <span key={i} className="text-xs font-mono px-2 py-1 bg-muted rounded text-muted-foreground">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-primary flex items-center gap-1 transition-colors">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <button
            onClick={handleBackClick}
            className="mb-8 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to articles
          </button>

          <article>
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 font-mono">
                <Calendar size={12} />
                {formatDate(selectedArticle.pubDate)}
                {selectedArticle.author && <span>• {selectedArticle.author}</span>}
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                {selectedArticle.title}
              </h1>
              {selectedArticle.categories?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.categories.map((cat, i) => (
                    <span key={i} className="text-xs font-mono px-2 py-1 bg-muted rounded text-muted-foreground">
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div
              className="prose prose-invert max-w-none
                prose-headings:text-foreground prose-headings:font-semibold
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
                prose-pre:bg-card prose-pre:border prose-pre:border-border
                prose-blockquote:border-l-2 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:text-muted-foreground
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />
          </article>
        </>
      )}
    </div>
  );
};

export default Blog;

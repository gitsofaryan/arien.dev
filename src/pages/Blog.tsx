import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';

interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
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
        // Using RSS2JSON service to convert Medium RSS feed to JSON
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@arien7'
        );
        const data = await response.json();

        if (data.status === 'ok') {
          setArticles(data.items);

          // If there's an ID in the URL, find and set the selected article
          if (id) {
            const article = data.items.find((item: MediumArticle) =>
              createSlug(item.title) === id
            );
            if (article) {
              setSelectedArticle(article);
            }
          }
        } else {
          setError('Failed to load articles');
        }
      } catch (err) {
        setError('Failed to fetch Medium articles');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediumArticles();
  }, [id]);

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleArticleClick = (article: MediumArticle) => {
    const slug = createSlug(article.title);
    navigate(`/blog/${slug}`);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!selectedArticle ? (
        <>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Stories</h1>
            <p className="text-lg text-vscode-comment">
              Articles and thoughts about tech, development, and more.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center my-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vscode-accent"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-vscode-comment">{error}</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-vscode-comment">No articles found</p>
            </div>
          ) : (
            <div className="space-y-8">
              {articles.map((article, index) => (
                <article
                  key={index}
                  className="border-b border-vscode-border pb-8 last:border-b-0"
                >
                  <button
                    onClick={() => handleArticleClick(article)}
                    className="group text-left w-full"
                  >
                    <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-vscode-accent transition-colors">
                      {article.title}
                    </h2>
                  </button>

                  <div className="flex items-center space-x-4 text-sm text-vscode-comment mb-4">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(article.pubDate)}
                    </span>
                    {article.categories && article.categories.length > 0 && (
                      <span className="flex items-center gap-2">
                        {article.categories.slice(0, 2).map((cat, i) => (
                          <span key={i} className="px-2 py-1 bg-vscode-sidebar rounded text-xs">
                            {cat}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>

                  <p className="text-vscode-text mb-4 line-clamp-3">
                    {stripHtml(article.description)}
                  </p>

                  <button
                    onClick={() => handleArticleClick(article)}
                    className="text-vscode-accent hover:underline"
                  >
                    Read more →
                  </button>
                </article>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <button
            onClick={handleBackClick}
            className="mb-6 flex items-center text-vscode-accent hover:underline"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to all articles
          </button>

          <article className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-white">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center space-x-4 text-sm text-vscode-comment mb-6 pb-6 border-b border-vscode-border">
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {formatDate(selectedArticle.pubDate)}
              </span>
              {selectedArticle.author && (
                <span>By {selectedArticle.author}</span>
              )}
            </div>

            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-p:text-vscode-text prose-p:leading-relaxed
                prose-a:text-vscode-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-vscode-accent prose-code:bg-vscode-sidebar prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-vscode-sidebar prose-pre:border prose-pre:border-vscode-border
                prose-blockquote:border-l-4 prose-blockquote:border-vscode-accent prose-blockquote:pl-4 prose-blockquote:italic
                prose-ul:text-vscode-text prose-ol:text-vscode-text
                prose-li:text-vscode-text prose-li:my-1
                prose-img:rounded-lg prose-img:my-6"
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />

            {selectedArticle.categories && selectedArticle.categories.length > 0 && (
              <div className="mt-8 pt-6 border-t border-vscode-border">
                <h3 className="text-sm uppercase tracking-wider text-vscode-comment mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.categories.map((cat, i) => (
                    <span key={i} className="px-3 py-1 bg-vscode-sidebar text-vscode-text rounded-full text-sm">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </>
      )}
    </div>
  );
};

export default Blog;

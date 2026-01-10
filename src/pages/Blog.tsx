import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, BookOpen, ExternalLink, Hash, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 animate-fade-in font-mono text-vscode-text/80">

      {!selectedArticle ? (
        <>
          {/* Header */}
          <section className="mb-10 md:mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-vscode-text mb-4 md:mb-6 tracking-tight flex items-center gap-3 md:gap-4">
              <BookOpen size={32} className="text-vscode-accent md:w-10 md:h-10" />
              <span>
                <span className="text-vscode-function">stories</span>
                <span className="text-vscode-class">.md</span>
              </span>
            </h1>
            <p className="text-lg text-vscode-text/60 max-w-2xl leading-relaxed">
              Thoughts on engineering, design drafts, and late-night debugging sessions. This is where I document the process.
            </p>
          </section>

          <hr className="border-vscode-border opacity-50 mb-16" />

          {isLoading ? (
            <div className="flex justify-center my-20">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-vscode-accent"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-vscode-comment">
              <p>{error}</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12 text-vscode-comment">
              <p>No articles found. Time to write something!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {articles.map((article, index) => (
                <Card
                  key={index}
                  className="bg-vscode-sidebar border-vscode-border hover:border-vscode-accent transition-all group cursor-pointer overflow-hidden"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Thumbnail */}
                    {article.thumbnail && (
                      <div className="h-48 md:h-auto md:w-72 shrink-0 border-b md:border-b-0 md:border-r border-vscode-border relative overflow-hidden">
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                        />
                      </div>
                    )}

                    <CardContent className="p-4 md:p-8 flex flex-col gap-4 flex-grow justify-center">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[10px] md:text-xs text-vscode-comment uppercase tracking-widest">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(article.pubDate)}</span>
                          {article.categories?.length > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-vscode-accent truncate">{article.categories[0]}</span>
                            </>
                          )}
                        </div>

                        <h2 className="text-lg md:text-2xl font-bold text-vscode-text group-hover:text-vscode-accent transition-colors leading-tight">
                          {article.title}
                        </h2>

                        <p className="text-vscode-text/60 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-2">
                          {stripHtml(article.description)}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center text-vscode-accent text-xs md:text-sm font-bold group-hover:translate-x-1 transition-transform mt-auto md:mt-0">
                        Read <ChevronRight size={14} className="md:w-4 md:h-4" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <button
            onClick={handleBackClick}
            className="mb-8 flex items-center gap-2 text-vscode-text/60 hover:text-vscode-text transition-colors text-sm uppercase tracking-widest group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Library
          </button>

          <article className="animate-in slide-in-from-bottom-4 duration-500">
            <header className="mb-12 pb-8 border-b border-vscode-border">
              <div className="flex items-center gap-4 text-sm text-vscode-comment mb-6">
                <span className="flex items-center gap-2 bg-vscode-sidebar px-3 py-1 rounded border border-vscode-border">
                  <Calendar size={14} /> {formatDate(selectedArticle.pubDate)}
                </span>
                {selectedArticle.categories?.map((cat, i) => (
                  <span key={i} className="hidden md:flex items-center gap-1 text-vscode-accent">
                    <Hash size={12} /> {cat}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-vscode-text leading-tight mb-8">
                {selectedArticle.title}
              </h1>
            </header>

            <div
              className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-vscode-text prose-headings:font-bold prose-headings:tracking-tight
                    prose-p:text-vscode-text/80 prose-p:leading-relaxed prose-p:font-sans
                    prose-a:text-vscode-accent prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-vscode-text prose-strong:font-semibold
                    prose-code:text-vscode-accent prose-code:bg-vscode-highlight/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:border prose-code:border-vscode-border
                    prose-pre:bg-vscode-sidebar prose-pre:border prose-pre:border-vscode-border prose-pre:rounded-lg
                    prose-blockquote:border-l-4 prose-blockquote:border-vscode-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-vscode-sidebar prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded-r prose-blockquote:text-vscode-text/80
                    prose-ul:text-vscode-text/80 prose-li:marker:text-vscode-accent
                    prose-img:rounded-xl prose-img:border prose-img:border-vscode-border prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />

            <div className="mt-16 pt-8 border-t border-vscode-border flex justify-between items-center">
              <button onClick={handleBackClick} className="text-vscode-text/60 hover:text-vscode-text transition-colors font-bold">
                &larr; More Stories
              </button>
              <a href={selectedArticle.link} target="_blank" rel="noopener" className="flex items-center gap-2 text-vscode-accent hover:text-white transition-colors">
                Read on Medium <ExternalLink size={16} />
              </a>
            </div>
          </article>
        </>
      )}

      {/* Final Quote */}
      {!selectedArticle && (
        <div className="text-center pt-20 pb-8 opacity-40 text-xs font-mono">
          <p>"Documentation is the love letter you write to your future self."</p>
        </div>
      )}
    </div>
  );
};

export default Blog;

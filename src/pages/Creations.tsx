import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, PlayCircle, Youtube } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RevealItem, StaggeredSection } from "@/components/ui/motion";
import { fetchYouTubeItems, type YouTubeFeedItem } from "@/lib/youtube-feed";

const PAGE_SIZE = 6;

const Creations = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [videos, setVideos] = useState<YouTubeFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const items = await fetchYouTubeItems(100, "arien_jain");
        setVideos(items);
        setError(null);
      } catch (err) {
        console.error("Failed to load YouTube videos:", err);
        setError("Unable to load channel videos right now.");
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, []);

  useEffect(() => {
    if (id || videos.length <= visibleCount) return;

    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, videos.length));
        }
      },
      { rootMargin: "250px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [id, videos.length, visibleCount]);

  const formatDate = (value: string) => {
    if (!value) return "";
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const selectedVideo = useMemo(() => {
    if (!id) return null;
    return videos.find((video) => video.videoId === id) || null;
  }, [id, videos]);

  if (id) {
    if (isLoading) {
      return (
        <StaggeredSection className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 animate-fade-in font-mono text-vscode-text/80">
          <div className="flex justify-center my-16">
            <div className="animate-spin rounded-full h-9 w-9 border-t-2 border-b-2 border-vscode-accent"></div>
          </div>
        </StaggeredSection>
      );
    }

    const fallbackId = id;
    const video =
      selectedVideo ||
      ({
        videoId: fallbackId,
        title: "Video",
        published: "",
        description: "",
        link: `https://www.youtube.com/watch?v=${fallbackId}`,
        thumbnail: `https://i.ytimg.com/vi/${fallbackId}/hqdefault.jpg`,
        author: "The Cosmic Nerd",
      } as YouTubeFeedItem);

    return (
      <StaggeredSection className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 animate-fade-in font-mono text-vscode-text/80">
        <button
          onClick={() => navigate("/creations")}
          className="mb-8 flex items-center gap-2 text-vscode-text/60 hover:text-vscode-text transition-colors text-sm uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Creations
        </button>

        <article className="animate-in slide-in-from-bottom-4 duration-500">
          <header className="mb-8 pb-6 border-b border-vscode-border">
            <div className="flex items-center gap-2 text-xs text-vscode-text/50 mb-3">
              <Youtube size={14} className="text-red-500" />
              <span>{formatDate(video.published)}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-vscode-text leading-tight mb-4">
              {video.title}
            </h1>
            <p className="text-vscode-text/65 leading-relaxed whitespace-pre-line">
              {video.description || "No description available for this video."}
            </p>
          </header>

          <div className="rounded-xl overflow-hidden border border-vscode-border bg-black mb-6 aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
              title={video.title}
              loading="lazy"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <a
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-vscode-accent hover:text-vscode-text transition-colors text-sm font-bold"
          >
            Open on YouTube <ExternalLink size={14} />
          </a>
        </article>
      </StaggeredSection>
    );
  }

  return (
    <StaggeredSection className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 animate-fade-in font-mono text-vscode-text/80">
      <RevealItem>
        <section className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-vscode-text mb-6 tracking-tight flex items-center gap-3">
            <Youtube size={38} className="text-red-500" />
            <span>
              <span className="text-vscode-function">creations</span>
              <span className="text-vscode-class">.tube</span>
            </span>
          </h1>
          <p className="text-lg text-vscode-text/60 max-w-2xl leading-relaxed">
            Full videos only (Shorts filtered), rendered inside the portfolio.
          </p>
        </section>
      </RevealItem>

      <hr className="border-vscode-border opacity-50 mb-12 md:mb-16" />

      {isLoading ? (
        <div className="flex justify-center my-16">
          <div className="animate-spin rounded-full h-9 w-9 border-t-2 border-b-2 border-vscode-accent"></div>
        </div>
      ) : error ? (
        <div className="p-6 rounded-lg border border-vscode-border bg-vscode-sidebar">
          <p className="text-vscode-text/70 mb-4">{error}</p>
          <a
            href="https://www.youtube.com/@arien_jain/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-vscode-accent hover:text-vscode-text transition-colors text-sm font-bold"
          >
            Watch on YouTube <ExternalLink size={14} />
          </a>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12 text-vscode-comment">
          <p>No videos found yet.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.slice(0, visibleCount).map((video) => (
              <RevealItem key={video.videoId}>
                <Card
                  className="bg-vscode-sidebar border-vscode-border hover:border-vscode-accent transition-all overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/creations/${video.videoId}`)}
                >
                  <div className="aspect-video border-b border-vscode-border bg-black relative">
                    <img
                      src={video.thumbnail || `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/90 text-white text-sm font-bold shadow-lg">
                        <PlayCircle size={16} /> Watch Inside
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-3 mb-3 text-xs text-vscode-text/50">
                      <span>{formatDate(video.published)}</span>
                      <span className="inline-flex items-center gap-1">
                        <PlayCircle size={13} /> YouTube
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-vscode-text mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-vscode-text/60 line-clamp-3">
                      {video.description || "Open to view full description."}
                    </p>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </div>

          <div ref={loadMoreRef} className="h-8" aria-hidden="true" />
        </>
      )}
    </StaggeredSection>
  );
};

export default Creations;

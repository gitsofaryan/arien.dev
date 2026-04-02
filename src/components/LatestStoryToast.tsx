import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface MediumFeedItem {
    title: string;
    link: string;
    guid?: string;
}

const MEDIUM_FEED_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@arien7";
const MEDIUM_PROFILE_URL = "https://medium.com/@arien7";
const TOAST_DISMISS_SESSION_KEY = "latest_story_toast_dismissed_session";

const createSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

const LatestStoryToast = () => {
    const [latestStory, setLatestStory] = useState<MediumFeedItem | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if already dismissed in this session
        if (sessionStorage.getItem(TOAST_DISMISS_SESSION_KEY)) {
            setIsDismissed(true);
            setIsLoading(false);
            return;
        }

        let isMounted = true;
        let timer: number | undefined;

        const fetchLatestStory = async () => {
            try {
                const response = await fetch(MEDIUM_FEED_URL, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch latest story");

                const data = await response.json();
                const latest = data?.items?.[0];

                if (!isMounted) return;

                if (latest?.title && latest?.link) {
                    setLatestStory({
                        title: latest.title,
                        link: latest.link,
                        guid: latest.guid
                    });
                } else {
                    setLatestStory({
                        title: "I publish practical engineering stories on Medium.",
                        link: MEDIUM_PROFILE_URL,
                    });
                }

                setIsLoading(false);

                timer = window.setTimeout(() => {
                    if (isMounted) setIsVisible(true);
                }, 800);
            } catch (error) {
                console.error('Failed to fetch story:', error);
                if (!isMounted) return;

                setLatestStory({
                    title: "I publish practical engineering stories on Medium.",
                    link: MEDIUM_PROFILE_URL,
                });

                setIsLoading(false);

                timer = window.setTimeout(() => {
                    if (isMounted) setIsVisible(true);
                }, 800);
            }
        };

        fetchLatestStory();

        return () => {
            isMounted = false;
            if (timer) window.clearTimeout(timer);
        };
    }, []);

    const title = useMemo(() => {
        if (!latestStory?.title) return "Read my latest story on Medium";
        return latestStory.title;
    }, [latestStory]);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
        sessionStorage.setItem(TOAST_DISMISS_SESSION_KEY, "true");
    };

    if (!latestStory) return null;

    return (
        <AnimatePresence>
            {isVisible && !isDismissed && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.92 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-[120] md:w-[85vw] md:max-w-sm"
                    role="status"
                    aria-live="polite"
                >
                    <div className="rounded-lg border border-vscode-border bg-vscode-sidebar/95 backdrop-blur-md shadow-lg p-3 md:px-3 md:py-2">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-2">
                            <div className="min-w-0 flex-1">
                                <p className="text-[9px] uppercase tracking-[0.12em] text-vscode-accent mb-0.5 font-semibold">
                                    Medium
                                </p>
                                <p className="text-xs text-vscode-text/85 leading-snug line-clamp-2 md:line-clamp-1">
                                    {title}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 self-end md:self-center mt-2 md:mt-0 w-full md:w-auto">
                                <Link
                                    to={`/blog/${latestStory ? createSlug(latestStory.title) : 'latest'}`}
                                    onClick={handleDismiss}
                                    className="flex-1 md:flex-none text-[9px] font-bold text-center md:text-left text-vscode-accent hover:text-vscode-text transition-colors whitespace-nowrap px-3 py-1.5 md:px-2 md:py-1 rounded border border-vscode-border hover:border-vscode-accent"
                                >
                                    Read
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleDismiss}
                                    className="flex-shrink-0 p-1 md:p-0.5 text-vscode-text/60 hover:text-vscode-text transition-colors rounded hover:bg-vscode-highlight/20"
                                    aria-label="Dismiss"
                                >
                                    <X size={14} className="md:w-3 md:h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LatestStoryToast;

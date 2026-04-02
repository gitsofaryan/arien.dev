export interface YouTubeFeedItem {
  videoId: string;
  title: string;
  link: string;
  published: string;
  description: string;
  thumbnail: string;
  author: string;
}

const YOUTUBE_DEV_PROXY_PATH = "/youtube-feed";

const isShort = (title: string, description: string, link: string) => {
  const text = `${title} ${description}`.toLowerCase();
  return (
    /#shorts\b/.test(text) ||
    /\bshorts\b/.test(text) ||
    /\/shorts\//i.test(link)
  );
};

const isCsbsMarked = (title: string, description: string) => {
  const text = `${title} ${description}`.toLowerCase();
  return /\bcsbs\b/.test(text);
};

const stripCdata = (value: string) =>
  value.replace(/^<!\[CDATA\[|\]\]>$/g, "").trim();

const decodeHtml = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const getTagValue = (input: string, tag: string) => {
  const pattern = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = input.match(pattern);
  if (!match?.[1]) return "";
  return decodeHtml(stripCdata(match[1]));
};

const getAttrValue = (input: string, tag: string, attr: string) => {
  const pattern = new RegExp(`<${tag}[^>]*${attr}=["']([^"']+)["'][^>]*>`, "i");
  const match = input.match(pattern);
  return match?.[1] || "";
};

const fallbackYouTubeItems: YouTubeFeedItem[] = [
  {
    videoId: "L4DLpaIh4Tg",
    title: "Duo Strace: Auditing AI Agents",
    link: "https://www.youtube.com/watch?v=L4DLpaIh4Tg",
    published: "2026-03-24T20:07:58+00:00",
    description:
      "Trace-first debugging for AI agent execution and tool-call visibility.",
    thumbnail: "https://i1.ytimg.com/vi/L4DLpaIh4Tg/hqdefault.jpg",
    author: "The Cosmic Nerd",
  },
];

export const parseYouTubeXml = (xml: string): YouTubeFeedItem[] => {
  const rawEntries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].map(
    (match) => match[1],
  );

  return rawEntries
    .map((entry) => {
      const videoId = getTagValue(entry, "yt:videoId");
      const title = getTagValue(entry, "title");
      const published = getTagValue(entry, "published");
      const author = getTagValue(entry, "name");

      const link =
        getAttrValue(entry, "link", "href") ||
        (videoId ? `https://www.youtube.com/watch?v=${videoId}` : "");

      const description =
        getTagValue(entry, "media:description") ||
        getTagValue(entry, "content") ||
        "";

      const thumbnail =
        getAttrValue(entry, "media:thumbnail", "url") ||
        (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "");

      return {
        videoId,
        title,
        link,
        published,
        description,
        thumbnail,
        author,
      };
    })
    .filter((item) => Boolean(item.videoId && item.title && item.link))
    .filter((item) => !isShort(item.title, item.description, item.link))
    .filter((item) => !isCsbsMarked(item.title, item.description));
};

export const fetchYouTubeItems = async (
  count = 100,
  handle = "arien_jain",
): Promise<YouTubeFeedItem[]> => {
  // Prefer server endpoint in all envs (supports pagination and richer filtering).
  try {
    const response = await fetch(`/api/youtube?count=${count}&handle=${handle}`, {
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      const items = Array.isArray(data?.items) ? data.items : [];
      if (items.length > 0) {
        return items.slice(0, count);
      }
    }
  } catch {
    // Fall through to dev RSS proxy fallback.
  }

  const response = await fetch(YOUTUBE_DEV_PROXY_PATH, {
    headers: {
      Accept: "application/atom+xml, application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    return fallbackYouTubeItems.slice(0, count);
  }

  const xml = await response.text();
  const parsed = parseYouTubeXml(xml).slice(0, count);
  return parsed.length > 0 ? parsed : fallbackYouTubeItems.slice(0, count);
};

type YouTubeItem = {
  videoId: string;
  title: string;
  link: string;
  published: string;
  description: string;
  thumbnail: string;
  author: string;
};

const USER_AGENT = "Mozilla/5.0 (compatible; arien.dev/1.0)";
const FALLBACK_CHANNEL_ID = "UCzEp5zLLp4BirsoJUogUY4A";
const MAX_PAGES = 20;

const getTextFromRuns = (value: unknown): string => {
  if (!value || typeof value !== "object") return "";

  const candidate = value as {
    simpleText?: string;
    runs?: Array<{ text?: string }>;
  };
  if (candidate.simpleText) return candidate.simpleText;
  if (Array.isArray(candidate.runs)) {
    return candidate.runs
      .map((run) => run?.text || "")
      .join("")
      .trim();
  }

  return "";
};

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

const extractChannelIdFromHtml = (html: string) => {
  const browseIdMatch = html.match(/"browseId":"(UC[^"]+)"/);
  return browseIdMatch?.[1] || null;
};

const extractConfigFromHtml = (html: string) => {
  const apiKey = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1] || "";
  const clientVersion =
    html.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)?.[1] ||
    "2.20250310.00.00";
  const visitorData = html.match(/"VISITOR_DATA":"([^"]+)"/)?.[1] || "";

  return { apiKey, clientVersion, visitorData };
};

const extractJsonObjectAfterMarker = (
  source: string,
  marker: string,
): unknown => {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) return null;

  const start = source.indexOf("{", markerIndex);
  if (start < 0) return null;

  let depth = 0;
  let inString = false;
  let isEscaped = false;

  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];

    if (inString) {
      if (isEscaped) {
        isEscaped = false;
      } else if (ch === "\\") {
        isEscaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      continue;
    }

    if (ch === "{") depth += 1;
    if (ch === "}") depth -= 1;

    if (depth === 0) {
      const raw = source.slice(start, i + 1);
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
  }

  return null;
};

const extractInitialData = (html: string) => {
  return (
    extractJsonObjectAfterMarker(html, "var ytInitialData =") ||
    extractJsonObjectAfterMarker(html, "window['ytInitialData'] =") ||
    null
  );
};

const findRichGridContents = (node: unknown): unknown[] => {
  if (!node || typeof node !== "object") return [];

  const obj = node as Record<string, unknown>;

  const maybeRichGrid = obj.richGridRenderer as
    | { contents?: unknown[] }
    | undefined;
  if (maybeRichGrid?.contents && Array.isArray(maybeRichGrid.contents)) {
    return maybeRichGrid.contents;
  }

  for (const value of Object.values(obj)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        const found = findRichGridContents(item);
        if (found.length > 0) return found;
      }
    } else if (value && typeof value === "object") {
      const found = findRichGridContents(value);
      if (found.length > 0) return found;
    }
  }

  return [];
};

const parseVideoRenderer = (videoRenderer: unknown): YouTubeItem | null => {
  if (!videoRenderer || typeof videoRenderer !== "object") return null;

  const vr = videoRenderer as Record<string, unknown>;
  const videoId = typeof vr.videoId === "string" ? vr.videoId : "";
  if (!videoId) return null;

  const title = getTextFromRuns(vr.title);
  const description = getTextFromRuns(vr.descriptionSnippet);
  const published = getTextFromRuns(vr.publishedTimeText);
  const author = getTextFromRuns(vr.ownerText);

  let thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const thumbs =
    (vr.thumbnail as { thumbnails?: Array<{ url?: string }> } | undefined)
      ?.thumbnails || [];
  if (Array.isArray(thumbs) && thumbs.length > 0) {
    const last = thumbs[thumbs.length - 1];
    if (last?.url) thumbnail = last.url;
  }

  return {
    videoId,
    title: title || "Untitled video",
    link: `https://www.youtube.com/watch?v=${videoId}`,
    published,
    description,
    thumbnail,
    author,
  };
};

const collectVideosAndContinuation = (items: unknown[]) => {
  const videos: YouTubeItem[] = [];
  let continuation: string | null = null;

  for (const item of items) {
    if (!item || typeof item !== "object") continue;

    const obj = item as Record<string, unknown>;
    const videoRenderer =
      (
        obj.richItemRenderer as
          | { content?: { videoRenderer?: unknown } }
          | undefined
      )?.content?.videoRenderer || (obj.videoRenderer as unknown);

    const parsed = parseVideoRenderer(videoRenderer);
    if (parsed) videos.push(parsed);

    const token =
      (
        obj.continuationItemRenderer as
          | {
              continuationEndpoint?: {
                continuationCommand?: { token?: string };
              };
            }
          | undefined
      )?.continuationEndpoint?.continuationCommand?.token || null;

    if (token) continuation = token;
  }

  return { videos, continuation };
};

const extractContinuationItems = (payload: unknown): unknown[] => {
  if (!payload || typeof payload !== "object") return [];

  const root = payload as Record<string, unknown>;

  const fromActions =
    (root.onResponseReceivedActions as Array<{
      appendContinuationItemsAction?: { continuationItems?: unknown[] };
    }>) || [];

  for (const action of fromActions) {
    const items = action?.appendContinuationItemsAction?.continuationItems;
    if (Array.isArray(items) && items.length > 0) return items;
  }

  const fromEndpoints =
    (root.onResponseReceivedEndpoints as Array<{
      appendContinuationItemsAction?: { continuationItems?: unknown[] };
    }>) || [];

  for (const endpoint of fromEndpoints) {
    const items = endpoint?.appendContinuationItemsAction?.continuationItems;
    if (Array.isArray(items) && items.length > 0) return items;
  }

  const fromContinuationContents =
    (
      root.continuationContents as
        | { richGridContinuation?: { contents?: unknown[] } }
        | undefined
    )?.richGridContinuation?.contents || [];

  if (
    Array.isArray(fromContinuationContents) &&
    fromContinuationContents.length > 0
  ) {
    return fromContinuationContents;
  }

  return [];
};

const fetchRssFallback = async (
  channelId: string,
  count: number,
): Promise<YouTubeItem[]> => {
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
    const pattern = new RegExp(
      `<${tag}[^>]*${attr}=["']([^"']+)["'][^>]*>`,
      "i",
    );
    const match = input.match(pattern);
    return match?.[1] || "";
  };

  const upstream = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    {
      headers: {
        Accept: "application/atom+xml, application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": USER_AGENT,
      },
    },
  );

  if (!upstream.ok) {
    return [];
  }

  const xml = await upstream.text();
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
    .filter((item) => item.videoId && item.title && item.link)
    .filter((item) => !isShort(item.title, item.description, item.link))
    .filter((item) => !isCsbsMarked(item.title, item.description))
    .slice(0, count);
};

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res
      .status(405)
      .json({ status: "error", message: "Method not allowed" });
  }

  try {
    const rawCount = Number(req.query?.count ?? 150);
    const count = Number.isFinite(rawCount)
      ? Math.min(Math.max(Math.floor(rawCount), 1), 500)
      : 150;

    const handle = String(req.query?.handle || "arien_jain").replace(/^@/, "");
    const channelIdFromQuery = String(req.query?.channelId || "").trim();

    const channelUrl = channelIdFromQuery
      ? `https://www.youtube.com/channel/${channelIdFromQuery}/videos?view=0&sort=da&flow=grid`
      : `https://www.youtube.com/@${handle}/videos?view=0&sort=da&flow=grid`;

    const channelResponse = await fetch(channelUrl, {
      headers: { "User-Agent": USER_AGENT },
    });

    if (!channelResponse.ok) {
      return res.status(channelResponse.status).json({
        status: "error",
        message: `YouTube channel error: ${channelResponse.status}`,
      });
    }

    const html = await channelResponse.text();
    const channelId =
      extractChannelIdFromHtml(html) ||
      channelIdFromQuery ||
      FALLBACK_CHANNEL_ID;
    const initialData = extractInitialData(html);

    const items: YouTubeItem[] = [];
    const dedupe = new Set<string>();

    const addItems = (incoming: YouTubeItem[]) => {
      for (const item of incoming) {
        if (dedupe.has(item.videoId)) continue;
        if (isShort(item.title, item.description, item.link)) continue;
        if (isCsbsMarked(item.title, item.description)) continue;

        dedupe.add(item.videoId);
        items.push(item);
      }
    };

    const initialContents = findRichGridContents(initialData);
    const initialParsed = collectVideosAndContinuation(initialContents);
    addItems(initialParsed.videos);

    const { apiKey, clientVersion, visitorData } = extractConfigFromHtml(html);

    let continuation = initialParsed.continuation;
    let page = 0;

    while (continuation && apiKey && items.length < count && page < MAX_PAGES) {
      page += 1;

      const continuationResponse = await fetch(
        `https://www.youtube.com/youtubei/v1/browse?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": USER_AGENT,
            "X-YouTube-Client-Name": "1",
            "X-YouTube-Client-Version": clientVersion,
            ...(visitorData ? { "X-Goog-Visitor-Id": visitorData } : {}),
          },
          body: JSON.stringify({
            context: {
              client: {
                clientName: "WEB",
                clientVersion,
                ...(visitorData ? { visitorData } : {}),
              },
            },
            continuation,
          }),
        },
      );

      if (!continuationResponse.ok) {
        break;
      }

      const continuationPayload =
        (await continuationResponse.json()) as unknown;
      const continuationItems = extractContinuationItems(continuationPayload);
      const parsed = collectVideosAndContinuation(continuationItems);

      addItems(parsed.videos);
      continuation = parsed.continuation;
    }

    if (items.length === 0) {
      const fallbackItems = await fetchRssFallback(channelId, count);
      return res.status(200).json({
        status: "ok",
        source: "rss-fallback",
        channelId,
        count: fallbackItems.length,
        items: fallbackItems,
      });
    }

    return res.status(200).json({
      status: "ok",
      source: "channel-scrape",
      channelId,
      count: items.length,
      items: items.slice(0, count),
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error?.message || "Fetch failed",
    });
  }
}

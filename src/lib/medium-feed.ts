export interface MediumFeedItem {
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

const MEDIUM_DEV_PROXY_PATH = "/medium-feed";

const text = (node: Element | null | undefined) =>
  (node?.textContent || "").trim();

const extractFirstImage = (html: string) => {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] || "";
};

export const parseMediumXml = (xml: string): MediumFeedItem[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");

  if (doc.querySelector("parsererror")) {
    throw new Error("Invalid Medium RSS response");
  }

  const items = Array.from(doc.getElementsByTagName("item"));

  return items
    .map((item) => {
      const title = text(item.getElementsByTagName("title")[0]);
      const link = text(item.getElementsByTagName("link")[0]);
      const pubDate = text(item.getElementsByTagName("pubDate")[0]);
      const description = text(item.getElementsByTagName("description")[0]);
      const content = text(item.getElementsByTagName("content:encoded")[0]);
      const author = text(item.getElementsByTagName("dc:creator")[0]);
      const guid = text(item.getElementsByTagName("guid")[0]) || link || title;
      const categories = Array.from(item.getElementsByTagName("category"))
        .map((category) => text(category))
        .filter(Boolean);

      const mediaThumb =
        item.getElementsByTagName("media:thumbnail")[0]?.getAttribute("url") ||
        "";
      const mediaContent =
        item.getElementsByTagName("media:content")[0]?.getAttribute("url") ||
        "";
      const thumbnail =
        mediaThumb ||
        mediaContent ||
        extractFirstImage(content) ||
        extractFirstImage(description);

      return {
        title,
        link,
        pubDate,
        description,
        thumbnail,
        content,
        author,
        categories,
        guid,
      };
    })
    .filter((item) => Boolean(item.title && item.link));
};

export const fetchMediumItems = async (
  count: number,
): Promise<MediumFeedItem[]> => {
  if (import.meta.env.PROD) {
    const response = await fetch(`/api/medium?count=${count}`, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const items = Array.isArray(data?.items) ? data.items : [];
    return items.slice(0, count);
  }

  const response = await fetch(MEDIUM_DEV_PROXY_PATH, {
    headers: { Accept: "application/rss+xml, application/xml;q=0.9,*/*;q=0.8" },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const xml = await response.text();
  return parseMediumXml(xml).slice(0, count);
};

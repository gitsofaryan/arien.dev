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
  const pattern = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = input.match(pattern);
  if (!match?.[1]) return "";
  return decodeHtml(stripCdata(match[1]));
};

const getCategoryValues = (input: string) => {
  return [...input.matchAll(/<category>([\s\S]*?)<\/category>/gi)]
    .map((match) => decodeHtml(stripCdata(match[1] || "")))
    .filter(Boolean);
};

const getThumbnail = (input: string, content: string, description: string) => {
  const mediaMatch = input.match(
    /<media:(?:thumbnail|content)[^>]*url=["']([^"']+)["'][^>]*>/i,
  );
  if (mediaMatch?.[1]) return mediaMatch[1];

  const imageMatch = (content || description).match(
    /<img[^>]+src=["']([^"']+)["']/i,
  );
  return imageMatch?.[1] || "";
};

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res
      .status(405)
      .json({ status: "error", message: "Method not allowed" });
  }

  try {
    const rawCount = Number(req.query?.count ?? 20);
    const count = Number.isFinite(rawCount)
      ? Math.min(Math.max(Math.floor(rawCount), 1), 100)
      : 20;

    const upstream = await fetch("https://medium.com/feed/@arien7", {
      headers: {
        Accept: "application/rss+xml, application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (compatible; arien.dev/1.0)",
      },
    });

    if (!upstream.ok) {
      return res
        .status(upstream.status)
        .json({
          status: "error",
          message: `Upstream error: ${upstream.status}`,
        });
    }

    const xml = await upstream.text();
    const rawItems = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
      .map((match) => match[1])
      .slice(0, count);

    const items = rawItems
      .map((item) => {
        const title = getTagValue(item, "title");
        const link = getTagValue(item, "link");
        const pubDate = getTagValue(item, "pubDate");
        const description = getTagValue(item, "description");
        const content = getTagValue(item, "content:encoded");
        const author = getTagValue(item, "dc:creator");
        const guid = getTagValue(item, "guid") || link || title;
        const categories = getCategoryValues(item);
        const thumbnail = getThumbnail(item, content, description);

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
      .filter((item) => item.title && item.link);

    return res.status(200).json({ status: "ok", items });
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: "error", message: error?.message || "Fetch failed" });
  }
}

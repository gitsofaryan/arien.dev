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

const extractChannelIdFromHandle = async (handle: string) => {
  const response = await fetch(`https://www.youtube.com/@${handle}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; arien.dev/1.0)",
    },
  });

  if (!response.ok) {
    return null;
  }

  const html = await response.text();
  const browseIdMatch = html.match(/"browseId":"(UC[^"]+)"/);
  return browseIdMatch?.[1] || null;
};

const isShort = (title: string, description: string, link: string) => {
  const text = `${title} ${description}`.toLowerCase();
  return (
    /#shorts\b/.test(text) ||
    /\bshorts\b/.test(text) ||
    /\/shorts\//i.test(link)
  );
};

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res
      .status(405)
      .json({ status: "error", message: "Method not allowed" });
  }

  try {
    const rawCount = Number(req.query?.count ?? 50);
    const count = Number.isFinite(rawCount)
      ? Math.min(Math.max(Math.floor(rawCount), 1), 100)
      : 50;

    const handle = String(req.query?.handle || "arien_jain").replace(/^@/, "");
    const channelIdFromQuery = String(req.query?.channelId || "").trim();

    let channelId = channelIdFromQuery;
    if (!channelId) {
      channelId =
        (await extractChannelIdFromHandle(handle)) ||
        "UCzEp5zLLp4BirsoJUogUY4A";
    }

    const upstream = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      {
        headers: {
          Accept: "application/atom+xml, application/xml;q=0.9,*/*;q=0.8",
          "User-Agent": "Mozilla/5.0 (compatible; arien.dev/1.0)",
        },
      },
    );

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        status: "error",
        message: `YouTube feed error: ${upstream.status}`,
      });
    }

    const xml = await upstream.text();
    const rawEntries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].map(
      (match) => match[1],
    );

    const items = rawEntries
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
      .slice(0, count);

    return res.status(200).json({ status: "ok", channelId, items });
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: "error", message: error?.message || "Fetch failed" });
  }
}

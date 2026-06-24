import { safeFetch } from "@/lib/safe-fetch";

/**
 * Minimal dependency-free RSS / Atom parser + fetcher, plus a YouTube
 * channel→feed resolver. Good enough for V1 automated imports; not a full
 * spec-compliant parser.
 *
 * All network fetches go through `safeFetch`, which enforces SSRF protection
 * (scheme/port/host checks, private-IP blocking, redirect re-validation,
 * timeout and size caps).
 */

export interface FeedItem {
  externalId: string;
  title: string | null;
  link: string | null;
  content: string | null;
  author: string | null;
  date: string | null; // ISO
  image: string | null;
  videoId: string | null;
}

function stripCdata(s: string): string {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
}

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function htmlToText(raw: string | null): string | null {
  if (!raw) return null;
  let c = stripCdata(raw);
  c = decodeEntities(c); // turn escaped <p> into real tags
  c = c.replace(/<[^>]*>/g, " "); // strip tags
  c = decodeEntities(c).replace(/\s+/g, " ").trim();
  return c.length ? c : null;
}

function tagText(block: string, name: string): string | null {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i");
  const m = block.match(re);
  return m ? m[1] : null;
}

function attrOf(block: string, name: string, attr: string): string | null {
  const re = new RegExp(`<${name}\\b[^>]*?\\b${attr}=["']([^"']+)["']`, "i");
  const m = block.match(re);
  return m ? m[1] : null;
}

export function parseFeed(xml: string): FeedItem[] {
  const items: FeedItem[] = [];
  const blocks = xml.match(/<(item|entry)\b[\s\S]*?<\/\1>/gi) ?? [];

  for (const block of blocks) {
    const title = htmlToText(tagText(block, "title"));

    let link: string | null = null;
    const linkText = tagText(block, "link");
    if (linkText && linkText.trim().startsWith("http")) {
      link = linkText.trim();
    }
    if (!link) link = attrOf(block, "link", "href");

    const content =
      htmlToText(tagText(block, "content:encoded")) ??
      htmlToText(tagText(block, "description")) ??
      htmlToText(tagText(block, "summary")) ??
      htmlToText(tagText(block, "media:description"));

    const rawDate =
      tagText(block, "pubDate") ??
      tagText(block, "published") ??
      tagText(block, "updated") ??
      tagText(block, "dc:date");
    const date = rawDate ? toIso(rawDate.trim()) : null;

    const authorBlock = tagText(block, "author");
    const author =
      htmlToText(tagText(block, "dc:creator")) ??
      (authorBlock ? htmlToText(tagText(authorBlock, "name")) ?? htmlToText(authorBlock) : null);

    const videoId = tagText(block, "yt:videoId")?.trim() ?? null;

    const externalId =
      tagText(block, "guid")?.replace(/<[^>]*>/g, "").trim() ||
      videoId ||
      tagText(block, "id")?.trim() ||
      link ||
      title ||
      Math.random().toString(36).slice(2);

    const image =
      attrOf(block, "media:thumbnail", "url") ??
      attrOf(block, "media:content", "url") ??
      attrOf(block, "enclosure", "url") ??
      (tagText(block, "content:encoded") || tagText(block, "description") || "").match(
        /<img[^>]*\bsrc=["']([^"']+)["']/i,
      )?.[1] ??
      null;

    items.push({
      externalId,
      title,
      link,
      content,
      author,
      date,
      image,
      videoId,
    });
  }

  return items;
}

function toIso(d: string): string | null {
  const t = Date.parse(d);
  return Number.isNaN(t) ? null : new Date(t).toISOString();
}

export async function fetchFeed(url: string): Promise<FeedItem[]> {
  const xml = await safeFetch(url, {
    "user-agent": "CastioBot/1.0 (+https://castio.co)",
    accept:
      "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
  });
  const items = parseFeed(xml);
  if (items.length === 0) {
    throw new Error("No items found — is this a valid RSS or Atom feed URL?");
  }
  return items;
}

/**
 * Resolve a YouTube channel URL / handle / playlist / feed URL to its public
 * RSS feed (no API key). Falls back to fetching the channel page to extract the
 * channelId.
 */
export async function resolveYoutubeFeedUrl(input: string): Promise<string> {
  const v = input.trim();
  if (/feeds\/videos\.xml/i.test(v)) return v;

  const channelId =
    v.match(/channel\/(UC[\w-]{20,})/i)?.[1] ??
    (/^UC[\w-]{20,}$/.test(v) ? v : null);
  if (channelId) {
    return `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  }

  const playlist = v.match(/[?&]list=([\w-]+)/)?.[1];
  if (playlist) {
    return `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlist}`;
  }

  const pageUrl = /^https?:\/\//i.test(v)
    ? v
    : `https://www.youtube.com/${v.startsWith("@") ? v : "@" + v}`;

  let html: string;
  try {
    html = await safeFetch(pageUrl, { "user-agent": "Mozilla/5.0 CastioBot" });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Could not load that channel.";
    throw new Error(`${msg} Paste the channel RSS feed URL instead.`);
  }
  const id =
    html.match(/"channelId":"(UC[\w-]{20,})"/)?.[1] ??
    html.match(/channel_id=(UC[\w-]{20,})/)?.[1] ??
    html.match(/<meta\s+itemprop="(?:identifier|channelId)"\s+content="(UC[\w-]{20,})"/)?.[1];
  if (!id) {
    throw new Error(
      "Couldn't find the channel id. Paste the channel RSS feed URL (youtube.com/feeds/videos.xml?channel_id=…) instead.",
    );
  }
  return `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;
}

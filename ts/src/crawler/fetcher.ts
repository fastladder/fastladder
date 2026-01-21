import { XMLParser } from 'fast-xml-parser';

export interface ParsedItem {
  title: string;
  link: string;
  description: string;
  publishedAt: string;
}

export interface ParsedFeed {
  title: string;
  siteUrl: string;
  items: ParsedItem[];
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  textNodeName: 'text',
  trimValues: true
});

const asArray = <T>(value?: T | T[]) => {
  if (!value) return [] as T[];
  return Array.isArray(value) ? value : [value];
};

const getText = (value: unknown) => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    if (typeof record.text === 'string') return record.text;
    if (typeof record['#text'] === 'string') return record['#text'];
  }
  return '';
};

const pickAtomLink = (value: unknown) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  const links = asArray(value as Record<string, unknown> | Array<Record<string, unknown>>);
  const alternate = links.find((link) => !link.rel || link.rel === 'alternate');
  const href = alternate?.href ?? links[0]?.href;
  return typeof href === 'string' ? href : '';
};

export async function fetchFeed(url: string): Promise<ParsedFeed> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Feed fetch failed: ${res.status}`);
  }
  const xmlText = await res.text();
  const parsed = parser.parse(xmlText) as Record<string, unknown>;
  const rss = parsed?.rss as Record<string, unknown> | undefined;
  const channel = rss?.channel as Record<string, unknown> | undefined;
  if (channel) {
    const items = asArray(channel.item as unknown).map((item) => {
      const record = item as Record<string, unknown>;
      return {
        title: getText(record.title),
        link: getText(record.link),
        description: getText(record['content:encoded'] ?? record.description),
        publishedAt: getText(record.pubDate ?? record['dc:date'] ?? record.published)
      };
    });
    return {
      title: getText(channel.title),
      siteUrl: getText(channel.link),
      items
    };
  }
  const feed = parsed?.feed as Record<string, unknown> | undefined;
  if (feed) {
    const entries = asArray(feed.entry as unknown).map((entry) => {
      const record = entry as Record<string, unknown>;
      return {
        title: getText(record.title),
        link: pickAtomLink(record.link),
        description: getText(record.content ?? record.summary),
        publishedAt: getText(record.updated ?? record.published)
      };
    });
    return {
      title: getText(feed.title),
      siteUrl: pickAtomLink(feed.link),
      items: entries
    };
  }
  throw new Error('Unsupported feed format');
}

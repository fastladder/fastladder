import { Hono } from 'hono';
import { cors } from 'hono/cors';
import * as cheerio from 'cheerio';
import { getDatabase } from '../src/db/client';
import { fetchFeed } from '../src/crawler/fetcher';

const app = new Hono();

app.use('/*', cors());

const db = getDatabase();

// Types
interface Item {
  id: number;
  title: string;
  link: string;
  description: string;
  published_at: string;
  feed_title: string;
  is_starred: number;
}

interface ImageItem {
  src: string;
  itemId: number;
  itemTitle: string;
  feedTitle: string;
  itemLink: string;
  isStarred: boolean;
}

interface FeedRow {
  id: number;
  title: string;
  url: string;
  site_url: string | null;
  updated_at: string | null;
}

const insertFeed = (url: string, title: string, siteUrl: string) => {
  const updatedAt = new Date().toISOString();
  db.run(
    `
      INSERT INTO feeds (title, url, site_url, updated_at)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(url) DO UPDATE SET
        title = excluded.title,
        site_url = excluded.site_url,
        updated_at = excluded.updated_at
    `,
    [title, url, siteUrl, updatedAt]
  );
  const feed = db.query('SELECT id FROM feeds WHERE url = ?').get(url) as { id: number };
  return feed.id;
};

const insertItems = (feedId: number, items: Item[]) => {
  let inserted = 0;
  for (const item of items) {
    if (!item.link) continue;
    const result = db.run(
      `
        INSERT OR IGNORE INTO items (feed_id, title, link, description, published_at)
        VALUES (?, ?, ?, ?, ?)
      `,
      [feedId, item.title, item.link, item.description, item.published_at]
    );
    if (result.changes > 0) inserted += 1;
  }
  return inserted;
};

const normalizeItem = (entry: {
  title: string;
  link: string;
  description: string;
  publishedAt: string;
}): Item => ({
  id: 0,
  title: entry.title || '(no title)',
  link: entry.link,
  description: entry.description || '',
  published_at: entry.publishedAt || '',
  feed_title: '',
  is_starred: 0
});

// API: Get images from items
app.get('/api/images', (c) => {
  const limit = Number(c.req.query('limit')) || 50;
  const offset = Number(c.req.query('offset')) || 0;
  const onlyStarred = c.req.query('starred') === 'true';

  let queryStr = `
    SELECT i.id, i.title, i.link, i.description, i.published_at, i.is_starred, f.title as feed_title
    FROM items i
    JOIN feeds f ON i.feed_id = f.id
  `;

  if (onlyStarred) {
    queryStr += ` WHERE i.is_starred = 1`;
  }

  queryStr += ` ORDER BY i.published_at DESC LIMIT ? OFFSET ?`;

  const query = db.query(queryStr);
  const items = query.all(limit, offset) as Item[];

  const images: ImageItem[] = [];

  for (const item of items) {
    if (!item.description) continue;
    
    const $ = cheerio.load(item.description);
    $('img').each((_, el) => {
      const src = $(el).attr('src');
      if (src && (src.startsWith('http') || src.startsWith('https'))) {
        images.push({
          src,
          itemId: item.id,
          itemTitle: item.title,
          feedTitle: item.feed_title,
          itemLink: item.link,
          isStarred: item.is_starred === 1
        });
      }
    });
  }

  return c.json({ images });
});

app.get('/api/feeds', (c) => {
  const feeds = db
    .query('SELECT id, title, url, site_url, updated_at FROM feeds ORDER BY updated_at DESC, id DESC')
    .all() as FeedRow[];
  return c.json({ feeds });
});

app.post('/api/feeds', async (c) => {
  const body = await c.req.json().catch(() => null);
  const url = body?.url?.trim?.();
  if (!url) {
    return c.json({ error: 'url is required' }, 400);
  }
  const parsed = await fetchFeed(url);
  const feedId = insertFeed(url, parsed.title || url, parsed.siteUrl);
  const items = parsed.items.map(normalizeItem);
  const inserted = insertItems(feedId, items);
  return c.json({ feedId, inserted });
});

app.post('/api/feeds/:id/refresh', async (c) => {
  const id = Number(c.req.param('id'));
  if (!id) {
    return c.json({ error: 'invalid feed id' }, 400);
  }
  const feed = db.query('SELECT id, url FROM feeds WHERE id = ?').get(id) as { id: number; url: string } | undefined;
  if (!feed) {
    return c.json({ error: 'feed not found' }, 404);
  }
  const parsed = await fetchFeed(feed.url);
  const feedId = insertFeed(feed.url, parsed.title || feed.url, parsed.siteUrl);
  const items = parsed.items.map(normalizeItem);
  const inserted = insertItems(feedId, items);
  return c.json({ feedId, inserted });
});

app.post('/api/feeds/refresh', async (c) => {
  const feeds = db.query('SELECT id, url FROM feeds').all() as { id: number; url: string }[];
  let inserted = 0;
  for (const feed of feeds) {
    const parsed = await fetchFeed(feed.url);
    const feedId = insertFeed(feed.url, parsed.title || feed.url, parsed.siteUrl);
    const items = parsed.items.map(normalizeItem);
    inserted += insertItems(feedId, items);
  }
  return c.json({ inserted });
});

// API: Get items (standard feed view)
app.get('/api/items', (c) => {
  const limit = Number(c.req.query('limit')) || 20;
  const offset = Number(c.req.query('offset')) || 0;
  const onlyStarred = c.req.query('starred') === 'true';
  
  let queryStr = `
    SELECT i.id, i.title, i.link, i.description, i.published_at, i.is_starred, f.title as feed_title
    FROM items i
    JOIN feeds f ON i.feed_id = f.id
  `;

  if (onlyStarred) {
    queryStr += ` WHERE i.is_starred = 1`;
  }

  queryStr += ` ORDER BY i.published_at DESC LIMIT ? OFFSET ?`;
  
  const query = db.query(queryStr);
  const items = query.all(limit, offset);
  return c.json({ items });
});

// API: Toggle star
app.post('/api/items/:id/star', (c) => {
  const id = c.req.param('id');
  db.run('UPDATE items SET is_starred = NOT is_starred WHERE id = ?', [id]);
  const newItem = db.query('SELECT is_starred FROM items WHERE id = ?').get(id) as any;
  return c.json({ isStarred: newItem.is_starred === 1 });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};

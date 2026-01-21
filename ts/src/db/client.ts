import { Database } from 'bun:sqlite';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

let dbInstance: Database | null = null;

export function getDatabase() {
  if (dbInstance) return dbInstance;
  const dataDir = join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
  const dbPath = join(dataDir, 'hashigo.db');
  const db = new Database(dbPath);
  initializeSchema(db);
  dbInstance = db;
  return dbInstance;
}

function initializeSchema(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS feeds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT NOT NULL UNIQUE,
      site_url TEXT,
      updated_at TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      feed_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      link TEXT NOT NULL,
      description TEXT,
      published_at TEXT,
      is_starred INTEGER DEFAULT 0,
      UNIQUE(feed_id, link),
      FOREIGN KEY(feed_id) REFERENCES feeds(id) ON DELETE CASCADE
    )
  `);
  db.run(`CREATE INDEX IF NOT EXISTS idx_items_feed_published ON items(feed_id, published_at DESC)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_items_published ON items(published_at DESC)`);
}

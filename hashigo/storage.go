package main

import (
	"database/sql"
	"time"

	_ "modernc.org/sqlite"
)

var db *sql.DB

func InitDB(dataSourceName string) error {
	var err error
	db, err = sql.Open("sqlite", dataSourceName)
	if err != nil {
		return err
	}

	createTables := `
	CREATE TABLE IF NOT EXISTS feeds (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT,
		url TEXT UNIQUE,
		link TEXT,
		description TEXT,
		created_at DATETIME
	);
	CREATE TABLE IF NOT EXISTS items (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		feed_id INTEGER,
		title TEXT,
		link TEXT UNIQUE,
		description TEXT,
		published_at DATETIME,
		is_read BOOLEAN DEFAULT 0,
		created_at DATETIME,
		FOREIGN KEY(feed_id) REFERENCES feeds(id)
	);
	`
	_, err = db.Exec(createTables)
	return err
}

type Feed struct {
	ID          int64
	Title       string
	URL         string
	Link        string
	Description string
	CreatedAt   time.Time
}

type Item struct {
	ID          int64
	FeedID      int64
	Title       string
	Link        string
	Description string
	PublishedAt time.Time
	IsRead      bool
	CreatedAt   time.Time
	FeedTitle   string // Joined field
}

func CreateFeed(feed *Feed) error {
	query := `INSERT INTO feeds (title, url, link, description, created_at) VALUES (?, ?, ?, ?, ?)`
	res, err := db.Exec(query, feed.Title, feed.URL, feed.Link, feed.Description, time.Now())
	if err != nil {
		return err
	}
	id, err := res.LastInsertId()
	if err == nil {
		feed.ID = id
	}
	return err
}

func GetFeedByURL(url string) (*Feed, error) {
	query := `SELECT id, title, url, link, description, created_at FROM feeds WHERE url = ?`
	row := db.QueryRow(query, url)
	var feed Feed
	err := row.Scan(&feed.ID, &feed.Title, &feed.URL, &feed.Link, &feed.Description, &feed.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &feed, nil
}

func GetAllFeeds() ([]Feed, error) {
	query := `SELECT id, title, url, link, description, created_at FROM feeds ORDER BY title`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var feeds []Feed
	for rows.Next() {
		var f Feed
		if err := rows.Scan(&f.ID, &f.Title, &f.URL, &f.Link, &f.Description, &f.CreatedAt); err != nil {
			return nil, err
		}
		feeds = append(feeds, f)
	}
	return feeds, nil
}

func CreateItem(item *Item) error {
	query := `INSERT OR IGNORE INTO items (feed_id, title, link, description, published_at, created_at) VALUES (?, ?, ?, ?, ?, ?)`
	_, err := db.Exec(query, item.FeedID, item.Title, item.Link, item.Description, item.PublishedAt, time.Now())
	return err
}

func GetUnreadItems() ([]Item, error) {
	query := `
		SELECT i.id, i.feed_id, i.title, i.link, i.description, i.published_at, i.is_read, i.created_at, f.title
		FROM items i
		JOIN feeds f ON i.feed_id = f.id
		WHERE i.is_read = 0
		ORDER BY i.published_at DESC
	`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []Item
	for rows.Next() {
		var i Item
		if err := rows.Scan(&i.ID, &i.FeedID, &i.Title, &i.Link, &i.Description, &i.PublishedAt, &i.IsRead, &i.CreatedAt, &i.FeedTitle); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	return items, nil
}

func MarkItemRead(id int64) error {
	_, err := db.Exec("UPDATE items SET is_read = 1 WHERE id = ?", id)
	return err
}

func CloseDB() {
	if db != nil {
		db.Close()
	}
}

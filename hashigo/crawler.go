package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/mmcdole/gofeed"
)

func ImportFeeds(filePath string) error {
	file, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		if err := AddFeed(line); err != nil {
			log.Printf("Failed to add %s: %v", line, err)
		}
	}
	return scanner.Err()
}

func AddFeed(url string) error {
	existing, _ := GetFeedByURL(url)
	if existing != nil {
		return fmt.Errorf("feed already exists: %s", existing.Title)
	}

	fp := gofeed.NewParser()
	parsed, err := fp.ParseURL(url)
	if err != nil {
		return err
	}

	feed := &Feed{
		Title:       parsed.Title,
		URL:         url,
		Link:        parsed.Link,
		Description: parsed.Description,
	}

	if err := CreateFeed(feed); err != nil {
		return err
	}
	
	fmt.Printf("Added feed: %s\n", feed.Title)
	
	// Initial sync
	return SyncFeed(feed)
}

func SyncAllFeeds() error {
	feeds, err := GetAllFeeds()
	if err != nil {
		return err
	}

	for _, feed := range feeds {
		if err := SyncFeed(&feed); err != nil {
			log.Printf("Error syncing feed %s: %v", feed.Title, err)
		}
	}
	return nil
}

func SyncFeed(feed *Feed) error {
	fp := gofeed.NewParser()
	parsed, err := fp.ParseURL(feed.URL)
	if err != nil {
		return err
	}

	count := 0
	for _, item := range parsed.Items {
		pubDate := time.Now()
		if item.PublishedParsed != nil {
			pubDate = *item.PublishedParsed
		}

		newItem := &Item{
			FeedID:      feed.ID,
			Title:       item.Title,
			Link:        item.Link,
			Description: item.Description,
			PublishedAt: pubDate,
		}

		if err := CreateItem(newItem); err == nil {
			count++
		}
	}
	if count > 0 {
		fmt.Printf("Synced %s: %d new items\n", feed.Title, count)
	}
	return nil
}

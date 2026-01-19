package main

import (
	"fmt"
	"os"
)

func main() {
	if err := InitDB("hashigo.db"); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to initialize DB: %v\n", err)
		os.Exit(1)
	}
	defer CloseDB()

	args := os.Args[1:]
	if len(args) == 0 {
		// Default to TUI
		StartTUI()
		return
	}

	command := args[0]
	switch command {
	case "add":
		if len(args) < 2 {
			fmt.Println("Usage: hashigo add <url>")
			return
		}
		url := args[1]
		if err := AddFeed(url); err != nil {
			fmt.Fprintf(os.Stderr, "Error adding feed: %v\n", err)
		}
	case "import":
		if len(args) < 2 {
			fmt.Println("Usage: hashigo import <file_path>")
			return
		}
		filePath := args[1]
		if err := ImportFeeds(filePath); err != nil {
			fmt.Fprintf(os.Stderr, "Error importing feeds: %v\n", err)
		}
	case "sync":
		if err := SyncAllFeeds(); err != nil {
			fmt.Fprintf(os.Stderr, "Error syncing feeds: %v\n", err)
		}
	case "tui":
		StartTUI()
	default:
		fmt.Printf("Unknown command: %s\n", command)
		fmt.Println("Available commands: add, import, sync, tui")
	}
}

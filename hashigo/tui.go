package main

import (
	"fmt"
	"os/exec"
	"runtime"

	"github.com/charmbracelet/bubbles/list"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

var docStyle = lipgloss.NewStyle().Margin(1, 2)

type item struct {
	id          int64
	title       string
	desc        string
	link        string
	isRead      bool
	feedTitle   string
}

func (i item) Title() string       { return i.title }
func (i item) Description() string { return fmt.Sprintf("[%s] %s", i.feedTitle, i.desc) }
func (i item) FilterValue() string { return i.title + " " + i.feedTitle }

type model struct {
	list     list.Model
	items    []item
	choice   *item
	quitting bool
}

func initialModel() model {
	dbItems, err := GetUnreadItems()
	if err != nil {
		// handle error gracefully in real app
		return model{}
	}

	var items []list.Item
	for _, i := range dbItems {
		items = append(items, item{
			id:        i.ID,
			title:     i.Title,
			desc:      i.Description,
			link:      i.Link,
			isRead:    i.IsRead,
			feedTitle: i.FeedTitle,
		})
	}

	l := list.New(items, list.NewDefaultDelegate(), 0, 0)
	l.Title = "Unread Items"

	return model{
		list:  l,
		items: nil, // we keep data in list model
	}
}

func (m model) Init() tea.Cmd {
	return nil
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.String() {
		case "ctrl+c":
			m.quitting = true
			return m, tea.Quit
		case "enter":
			i, ok := m.list.SelectedItem().(item)
			if ok {
				m.choice = &i
				openBrowser(i.link)
				MarkItemRead(i.id)
				// Remove item from list
				index := m.list.Index()
				m.list.RemoveItem(index)
			}
			return m, nil
		}
	case tea.WindowSizeMsg:
		h, v := docStyle.GetFrameSize()
		m.list.SetSize(msg.Width-h, msg.Height-v)
	}

	var cmd tea.Cmd
	m.list, cmd = m.list.Update(msg)
	return m, cmd
}

func (m model) View() string {
	if m.quitting {
		return "Bye!"
	}
	return docStyle.Render(m.list.View())
}

func StartTUI() {
	p := tea.NewProgram(initialModel(), tea.WithAltScreen())
	if _, err := p.Run(); err != nil {
		fmt.Printf("Alas, there's been an error: %v", err)
	}
}

func openBrowser(url string) {
	var err error
	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", url).Start()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		err = exec.Command("open", url).Start()
	default:
		err = fmt.Errorf("unsupported platform")
	}
	if err != nil {
		// just ignore for now
	}
}

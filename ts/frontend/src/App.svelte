<script lang="ts">
  import { onMount, tick } from 'svelte';

  interface Item {
    id: number;
    title: string;
    link: string;
    description: string;
    published_at: string;
    feed_title: string;
    is_starred: number;
  }

  let items: Item[] = [];
  let offset = 0;
  let limit = 20;
  let loading = false;
  let showStarred = false;
  let selectedIndex = -1;

  async function loadItems(reset = false) {
    if (loading) return;
    loading = true;

    if (reset) {
      items = [];
      offset = 0;
      selectedIndex = -1;
    }

    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        starred: showStarred ? 'true' : 'false'
      });

      const res = await fetch(`/api/items?${params}`);
      const data = await res.json();
      
      if (data.items.length > 0) {
        // SQLite returns boolean as 0/1, ensure type consistency if needed, 
        // but here we just use the raw data from server which matches interface roughly
        items = [...items, ...data.items];
        offset += limit;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  }

  async function toggleStar(index: number) {
    if (index < 0 || index >= items.length) return;
    const item = items[index];
    
    try {
      const res = await fetch(`/api/items/${item.id}/star`, { method: 'POST' });
      const data = await res.json();
      // Update local state
      items[index].is_starred = data.isStarred ? 1 : 0;
    } catch (e) {
      console.error(e);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    // Input要素への入力中はショートカットを無効化
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

    switch (e.key) {
      case 'j':
        if (selectedIndex < items.length - 1) {
          selectedIndex++;
          scrollToSelected();
          // 下の方に来たら追加読み込み
          if (selectedIndex > items.length - 5 && !loading) {
            loadItems();
          }
        } else if (!loading) {
          loadItems();
        }
        break;
      case 'k':
        if (selectedIndex > 0) {
          selectedIndex--;
          scrollToSelected();
        }
        break;
      case 's':
        if (selectedIndex >= 0) {
          toggleStar(selectedIndex);
          e.preventDefault(); // Save page dialog防止
        }
        break;
      case 'o':
      case 'Enter':
        if (selectedIndex >= 0) {
          window.open(items[selectedIndex].link, '_blank');
        }
        break;
      case 'Tab':
        e.preventDefault();
        showStarred = !showStarred;
        loadItems(true);
        break;
    }
  }

  async function scrollToSelected() {
    await tick();
    const el = document.getElementById(`item-${selectedIndex}`);
    if (el) {
      const headerOffset = 60;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  function formatDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return dateStr;
    }
  }

  onMount(() => {
    loadItems();
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <header class="app-header">
    <div class="logo">Hashigo Reader</div>
    <div class="controls">
      <button class:active={!showStarred} on:click={() => { showStarred = false; loadItems(true); }}>All</button>
      <button class:active={showStarred} on:click={() => { showStarred = true; loadItems(true); }}>Starred</button>
    </div>
    <div class="status">
      {items.length} items
    </div>
  </header>

  <div class="stream">
    {#each items as item, i (item.id)}
      <div 
        id="item-{i}"
        class="item" 
        class:selected={i === selectedIndex}
        class:starred={item.is_starred === 1}
        on:click={() => { selectedIndex = i; }}
      >
        <div class="item-header">
          <div class="item-meta">
            <span class="feed-title">{item.feed_title}</span>
            <span class="date">{formatDate(item.published_at)}</span>
          </div>
          <h2 class="item-title">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </h2>
        </div>
        
        <div class="item-body">
          {@html item.description}
        </div>

        <div class="item-footer">
          <button class="star-btn" on:click|stopPropagation={() => toggleStar(i)}>
            {item.is_starred ? '★ Starred' : '☆ Star'}
          </button>
        </div>
      </div>
    {/each}
  </div>

  <div class="load-more">
    <button on:click={() => loadItems()} disabled={loading}>
      {loading ? 'Loading...' : 'Load More'}
    </button>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
  }

  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    z-index: 100;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .logo {
    font-weight: bold;
    font-size: 1.2rem;
    color: #444;
    margin-right: 2rem;
  }

  .controls button {
    background: transparent;
    border: 1px solid #ddd;
    padding: 4px 12px;
    cursor: pointer;
    border-radius: 3px;
    margin-right: 0.5rem;
    font-size: 0.9rem;
  }

  .controls button.active {
    background: #646cff;
    color: white;
    border-color: #646cff;
  }

  .status {
    margin-left: auto;
    font-size: 0.9rem;
    color: #666;
  }

  main {
    padding-top: 60px;
    padding-bottom: 40px;
    max-width: 800px;
    margin: 0 auto;
  }

  .stream {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .item {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
    transition: box-shadow 0.2s;
    position: relative;
  }

  .item.selected {
    border-left: 5px solid #646cff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .item-meta {
    font-size: 0.85rem;
    color: #888;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
  }

  .feed-title {
    color: #666;
    font-weight: 500;
  }

  .item-title {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    line-height: 1.3;
  }

  .item-title a {
    text-decoration: none;
    color: #0066cc;
  }

  .item-title a:hover {
    text-decoration: underline;
  }

  .item-body {
    line-height: 1.6;
    color: #333;
    overflow-wrap: break-word;
    font-size: 1rem;
  }

  /* RSS本文内の画像等のスタイル調整 */
  :global(.item-body img) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 10px 0;
  }

  :global(.item-body blockquote) {
    margin: 10px 0;
    padding: 10px 15px;
    background: #f9f9f9;
    border-left: 4px solid #ddd;
    color: #666;
  }

  :global(.item-body pre) {
    background: #f0f0f0;
    padding: 10px;
    overflow-x: auto;
    border-radius: 3px;
  }

  .item-footer {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
  }

  .star-btn {
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
    font-size: 1rem;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .star-btn:hover {
    color: #666;
    background: #f5f5f5;
    border-radius: 4px;
  }

  .item.starred .star-btn {
    color: gold;
    font-weight: bold;
  }

  .load-more {
    margin-top: 30px;
    text-align: center;
  }

  .load-more button {
    padding: 10px 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1rem;
    color: #555;
  }

  .load-more button:hover {
    background: #f9f9f9;
    border-color: #ccc;
  }
</style>

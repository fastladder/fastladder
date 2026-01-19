# HASHIGO Roadmap

Fastladderの哲学「Simple, Fast, Local」を受け継ぎ、Go言語 + CLI/TUI で再構築するプロジェクト。

## Phase 1: Core Foundation (Current)
- [x] **Single Binary**: Goによるシングルバイナリ配布 (`hashigo.exe`)
- [x] **Local DB**: SQLite (`hashigo.db`) によるデータ永続化
- [x] **CLI**: コマンドラインからのフィード追加・同期
- [x] **TUI Reader**: `bubbletea` を使用したターミナル上での記事閲覧・フィルタリング (Peco-like)

## Phase 2: User Experience & Integration (Next)
### RSS登録の多様化
- [ ] **YAML Config Support**: `feeds.yaml` にリストを書いておけば、起動時に一括同期・追加する機能。
  - Gitで管理しやすく、ポータビリティが高い。
- [ ] **Chrome Extension**: ブラウザで見ているページをワンクリックで `hashigo` に登録。
  - **Native Messaging** を利用し、ローカルの `hashigo.exe` に直接URLを渡す（サーバー不要）。
  - または、簡易的なローカルサーバー (`localhost:xxxxx/add?url=...`) を受け付けるモードの実装。

### 閲覧体験の向上
- [ ] **External Browser Config**: 記事を開くブラウザを指定可能にする (Chrome, Firefox, Edge, etc.)。
- [ ] **Keybinding Config**: Vim風、Emacs風などキー操作のカスタマイズ。

## Phase 3: Advanced Features
- [ ] **Background Sync**: 常駐モード、またはOSのスケジューラ (cron/Task Scheduler) との連携による自動更新。
- [ ] **Filter & Tagging**: タイトルや本文による高度なフィルタリング、タグ付け機能。
- [ ] **Pocket/Instapaper Integration**: 「あとで読む」サービスへの送信。

### データ連携
- [ ] **Plagger Integration**: かつての英雄 `Plagger` からのPushを受け付ける。
  - `Publish::Hashigo` のようなプラグイン、あるいはWebhookエンドポイント (`hashigo serve` 時に `/api/push` を開放) を実装。
  - これにより、Plaggerの強力なフィルタリングや加工機能を経由したフィードを `hashigo.db` に流し込める。

## Phase 4: Optional Web Interface (HTMX)
- [ ] **Local Web Server**: CLIが苦手な場合や、画像付きで見たい場合のために、軽量なWeb UI を提供。
  - **HTMX + Go Templates**: JavaScriptフレームワーク(React/Vue/Svelte)を使わず、サーバーサイドレンダリングとHTML属性だけでSPAのような快適な動作を実現。
  - `hashigo serve` コマンドで起動。
  - 「少ないコンポーネント」の哲学に従い、ビルド不要でバイナリにHTMLテンプレートを埋め込む。

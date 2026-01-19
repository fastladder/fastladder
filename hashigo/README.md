# hashigo

Goで書かれた、シンプルで高速なCLI/TUI RSSリーダー。
「少ない言語、少ないコンポーネント」という哲学の元、シングルバイナリで動作します。

## 特徴
- **Single Binary**: 依存関係なし。`.exe` ひとつで動作。
- **CLI & TUI**: コマンドラインで追加、TUIで閲覧。
- **Peco-like Interface**: `/` キーでインクリメンタルサーチが可能。
- **Local First**: 全データはローカルのSQLite (`hashigo.db`) に保存。

## インストール

```bash
git clone https://github.com/your/hashigo.git
cd hashigo
go build -o hashigo.exe
```

## 使い方

### RSSフィードの追加
```bash
./hashigo.exe add https://zenn.dev/feed
```

### 記事の同期
```bash
./hashigo.exe sync
```
※ 現状は `add` 時にも自動同期されます。

### リーダー起動 (TUI)
```bash
./hashigo.exe
```
- `↑ / ↓`: リスト移動
- `/`: フィルタリング (検索)
- `Enter`: 記事をブラウザで開く (既読にする)
- `Ctrl+C`: 終了

## 今後の計画 (Roadmap)

1.  **OPML Import/Export**
    - 他のRSSリーダーからの移行を容易にするため、OPML形式のインポート・エクスポート機能を実装。
2.  **Web View Mode**
    - ローカルサーバーを立ち上げ、ブラウザでモダンなUI (HTML/CSS) で閲覧できるモードの追加。
    - `hashigo.exe serve --port 8080` のようなコマンドを想定。
3.  **Configulation**
    - 設定ファイル (`config.yaml`) によるキーバインドや配色のカスタマイズ。
4.  **Auto Sync Daemon**
    - バックグラウンドで定期的にRSSを取得する常駐モード。

## License
MIT

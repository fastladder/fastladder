# ADR 0001: Full-Content Fetch via Tavily

## Status

Accepted

## Context

RSS feeds often provide only a summary or excerpt. This feature allows users to fetch the full article content from the original URL via the Tavily Extract API and display it in place of the feed body.

## Decision

### Tavily API Key Storage

Add a `tavily_api_key` column (string, nullable) to the `members` table via a new migration. This column is stored directly on the model, not in `config_dump`, because it is a first-class credential that must be kept server-side and never exposed to the browser.

### Account UI

Add a new page under the existing `/account` namespace:

- Route: `GET /account/tavily` and `POST /account/tavily`
- Controller action: `AccountController#tavily`
- View: input field for the Tavily API key, with a save button. The value is write-only from the UI — do not render the stored key back into the field; render only a placeholder indicating whether a key is currently saved.
- Add `tavily` to the navigation list in `account/_navi.html.erb` alongside `password`, `apikey`, `backup`, `share`.

### New Backend API

Create `app/controllers/api/full_content_controller.rb` with a single action:

- Route: `POST /api/full_content/fetch`
- Authentication: `before_action :login_required_api` (same pattern as other API controllers). Also skip CSRF verification (`skip_before_action :verify_authenticity_token`).
- Parameters: `item_id` (integer)
- Behaviour:
  1. Load the `Item` record. Verify that the requesting member has a subscription to the item's feed; return HTTP 403 if not.
  2. Read `@member.tavily_api_key`; return HTTP 422 with `{ error: "no_api_key" }` if blank.
  3. Call the Tavily Extract API (`POST https://api.tavily.com/extract`) with the item's `link` URL, authenticating with the member's key via the `Authorization: Bearer <key>` header. Send `{ urls: [item.link] }` as the JSON body.
  4. Extract the `raw_content` (Markdown text) from the Tavily response.
  5. Render the Markdown to HTML using the `redcarpet` gem (add to Gemfile if absent). Use standard options: autolink, no raw HTML (sanitize with Rails `sanitize` helper using the existing `Settings.allow_tags` / `Settings.allow_attributes` lists).
  6. Save the rendered HTML to `item.full_content` (the new column; see below).
  7. Return `{ html: <rendered_html> }` as JSON.

Add the route inside `config/routes.rb` under the existing `namespace :api` block:

```
namespace :full_content do
  post :fetch
end
```

### Database Change

Add a migration that adds a `full_content` column to the `items` table: type `text`, nullable, no default. This stores the rendered HTML fetched via Tavily so subsequent views skip the API call.

### Existing API Behaviour Change

In `ApiController#all` and `ApiController#unread`, when serialising items to JSON, replace `body` with `full_content` for any item that has a non-nil `full_content`. No other change to the response shape — the key remains `body` so the frontend template requires no modification for re-display.

Concretely: in the item serialisation step, emit `body: item.full_content.presence || item.body`.

### Frontend Changes

All frontend changes are in vanilla JavaScript following the existing patterns (`HotKey`, `LDR.API`, DOM template manipulation).

#### Config: Tavily key presence flag

`/api/config/load` already merges `APP_CONFIG` constants. Add `has_tavily_key` (boolean) to `APP_CONFIG` in `Api::ConfigController`:

```ruby
APP_CONFIG = Settings.to_h.slice(:save_pin_limit).merge(
  has_tavily_key: @member.tavily_api_key.present?
)
```

Wait — `APP_CONFIG` is a class-level constant and cannot reference `@member`. Instead, override `getter` to merge the per-member flag at runtime:

```ruby
def getter
  config = (@member.config_dump || {}).merge(APP_CONFIG)
  config[:has_tavily_key] = @member.tavily_api_key.present?
  render json: config.to_json
end
```

The frontend reads `app.config.has_tavily_key` (Boolean) after config load. Add `has_tavily_key: 'Boolean'` to `LDR.TypeofConfig` in `lib/models/pref.js`.

#### Item template: full-content icon

In the `inbox_items` textarea template in `app/views/reader/index.html.erb`, add a full-content fetch icon immediately to the left of the `Permalink` link inside `.item_info`:

```
<span class="fetch_full_content_button" item_id="[[id]]" style="display:none">⬇ Full</span>
<a href="[[ link ]]" target="blank">Permalink</a> |
```

The icon is hidden by default. After config loads, if `app.config.has_tavily_key` is true, show all `.fetch_full_content_button` elements (set `display:inline`). Use a `LDR.invoke_hook` or a post-`print_feed` step to reveal them.

Clicking the icon calls `fetch_full_content(item_id)` (defined below).

#### `fetch_full_content(item_id)` function

Define in `lib/reader/commands.js` (or a new file `lib/reader/full_content.js` included after `commands.js`):

1. Show a loading indicator in `#item_body_<item_id>`.
2. POST to `/api/full_content/fetch` with `{ item_id: item_id }` via `new LDR.API(...)`.
3. On success: replace the contents of `#item_body_<item_id>` with the returned `html`.
4. On error: display an error message via `message(...)`.

#### Hotkey `g` — fetch full content for active item

Add to `LDR.KeyConfig` in `lib/models/pref.js`:

```javascript
'fetch_full_content': 'g'
```

Add to `LDR.KeyHelp`:

```javascript
'fetch_full_content': 'Fetch full content'
```

Add to `LDR.KeyHelpOrder` in an appropriate row.

Add to `Control` object in `lib/reader/commands.js`:

```javascript
fetch_full_content: function() {
    if (!app.config.has_tavily_key) return;
    var item = get_active_item(true);
    if (!item) return;
    fetch_full_content(item.item_id);
}
```

`LDR.setup_hotkey` in `lib/reader/hotkey_manager.js` automatically picks up new `LDR.KeyConfig` entries and maps them to `Control[key]`, so no change there is required.

#### Hotkey `G` (Shift+g) — fetch full content for all visible items

Add to `LDR.KeyConfig`:

```javascript
'fetch_all_full_content': 'G'
```

Add to `Control`:

```javascript
fetch_all_full_content: function() {
    if (!app.config.has_tavily_key) return;
    var body = _$('right_body');
    var heads = body.getElementsByTagName('h2');
    var ids = [];
    for (var i = 0; i < heads.length; i++) {
        ids.push(heads[i].id.replace('head_', ''));
    }
    // fetch sequentially, one at a time
    (function next(i) {
        if (i >= ids.length) return;
        fetch_full_content(ids[i], function() { next(i + 1); });
    })(0);
}
```

`fetch_full_content` must accept an optional callback invoked after the API call completes (success or failure) so the sequential chain works.

### Gem Dependency

Add `gem 'redcarpet'` to `Gemfile` and run `bundle install`.

## Consequences

- Users without a Tavily API key see no change in UI or behaviour.
- Full content is fetched on demand and cached in `items.full_content`; repeated views of the same item serve cached HTML without a Tavily API call.
- The Tavily API key never leaves the server; the frontend only knows a boolean `has_tavily_key`.
- The `g` / `G` hotkeys are currently unassigned in `LDR.KeyConfig`, so no conflict arises.
- `redcarpet` is not currently in the Gemfile; it must be added.
- The member's Tavily usage costs are their own responsibility — no rate-limiting or quota tracking is implemented.

# Fastladder API

This document describes the HTTP API under `/api/*`. It is the same API that
the Fastladder web reader uses, and it can be used by external clients such as
desktop applications.

## Basics

### Authentication

Issue an API key on the account page (`/account/apikey`). Send it with every
request in one of the following ways:

- `Authorization: Bearer <api_key>` header (recommended)
- `auth_key=<api_key>` parameter

```
curl -X POST -H 'Authorization: Bearer 0123456789abcdef' https://fastladder.example.com/api/subs?unread=1
```

When an API key is sent but does not match any account, the server responds
with `401 Unauthorized`. A request without any credentials (no session and no
API key) gets an empty `200 OK` response, so clients must always send the key.

Regenerating the key on the account page invalidates the previous one.

### Requests

- Most endpoints accept `POST`. Some also accept `GET`; this is noted for each
  endpoint.
- Parameters are sent as query strings or as
  `application/x-www-form-urlencoded` bodies. JSON request bodies are also
  accepted by Rails, but form encoding is what the web reader uses.
- Parameters that take several IDs (`subscribe_id` on some endpoints) accept a
  comma-separated list such as `1,2,3`.
- Boolean-like parameters take `0` or `1`.

### Responses

Responses are JSON. Endpoints that perform an action return a status object:

```json
{ "isSuccess": true, "ErrorCode": 0 }
```

On failure `isSuccess` is `false` and `ErrorCode` is non-zero (`1` unless a
more specific code is listed for the endpoint). Some status objects carry
extra fields, which are noted per endpoint.

Endpoints that return data respond with the data directly. When a required
parameter is missing, they respond with `{"isSuccess": false, "ErrorCode": 1}`.

Timestamps are Unix time in seconds unless stated otherwise.

### HTML escaping

Several fields are returned HTML-escaped, because the web reader inserts them
into the page as-is. Clients that display plain text must unescape them.

| Endpoint | Escaped fields |
|---|---|
| `/api/subs`, `/api/lite_subs` | `folder`, `link`, `feedlink`, `title` |
| `/api/folders` | `names` and the keys of `name2id` |
| `/api/feed/discover` | `feedlink`, `link`, `title` (only for feeds not yet known to the server) |
| `channel` in `/api/all`, `/api/unread` | `description` |

Item `body` is sanitized HTML and should be rendered as HTML. Item `title`,
`author` and `category` are sanitized and may contain HTML entities.

### Read state

Fastladder does not keep read flags per item. Each subscription has a single
"viewed until" time, and every item stored after that time is unread.
Marking a subscription as read moves this time forward. There is no way to
mark a single item as read.

A typical reading loop is:

1. `POST /api/subs?unread=1` to list subscriptions with unread items.
2. `POST /api/unread?subscribe_id=N` to fetch the unread items of one
   subscription.
3. `POST /api/touch` with `subscribe_id=N` and the `last_stored_on` value from
   step 2 (converted to Unix time) to mark exactly those items as read.

`/api/touch_all` marks a subscription as read up to the current time. Items
that arrived after step 2 are then also marked as read without being shown,
so `/api/touch` is preferred for clients.

## Subscriptions and items

### `POST /api/subs`

Lists the subscriptions of the account.

| Parameter | Description |
|---|---|
| `unread` | `1` to return only subscriptions with unread items. Default `0`. |
| `from_id` | Skip subscriptions whose `subscribe_id` is smaller than this. |
| `limit` | Maximum number of subscriptions to return. `0` or omitted means no limit. |

Subscriptions are ordered by `subscribe_id`. `from_id` and `limit` can be used
together for paging.

```json
[
  {
    "subscribe_id": 12,
    "unread_count": 3,
    "folder": "tech",
    "tags": [],
    "rate": 2,
    "public": 0,
    "link": "https://example.com/",
    "feedlink": "https://example.com/feed.xml",
    "title": "Example Blog",
    "icon": "/favicon/34",
    "modified_on": 1730000000,
    "subscribers_count": 5,
    "ignore_notify": 1
  }
]
```

- `unread_count` is capped at 200.
- `folder` is an empty string when the subscription is not in a folder.
- `rate` is 0 to 5.
- `icon` is a path on the server. Prefix it with the server origin.
- `ignore_notify` is present only when it is set.

### `POST /api/lite_subs`

Same as `/api/subs` without `unread_count` and `tags`, and without
parameters. It is cheaper because it does not count unread items. All
subscriptions are returned.

### `GET|POST /api/unread`

Returns the unread items of one subscription.

| Parameter | Description |
|---|---|
| `subscribe_id` | Required. |

```json
{
  "subscribe_id": 12,
  "channel": {
    "title": "Example Blog",
    "description": "An example",
    "feedlink": "https://example.com/feed.xml",
    "link": "https://example.com/",
    "image": "",
    "expires": 0,
    "subscribers_count": 5,
    "error_count": 0
  },
  "items": [
    {
      "id": 1001,
      "title": "Hello",
      "author": "alice",
      "category": "news",
      "link": "https://example.com/hello",
      "body": "<p>Hello world</p>",
      "created_on": 1730000000,
      "modified_on": 1730000000,
      "enclosure": "https://example.com/a.mp3",
      "enclosure_type": "audio/mpeg"
    }
  ],
  "last_stored_on": "2026-10-30T12:34:56.000+09:00",
  "ignore_notify": 1
}
```

- At most 200 items are returned, newest first (by `created_on`).
- `last_stored_on` is the time the newest of these items was stored on the
  server. It is an ISO 8601 string, not Unix time. It is absent when there
  are no unread items. Pass it to `/api/touch` to mark these items as read.
- `enclosure` and `enclosure_type` are present only for items with an
  enclosure.
- `ignore_notify` is present only when it is set.

### `GET|POST /api/all`

Returns the items of one subscription regardless of read state, in the same
format as `/api/unread` without `last_stored_on`.

| Parameter | Description |
|---|---|
| `subscribe_id` | Required. |
| `limit` | Number of items. Default and maximum 200. |
| `offset` | Number of items to skip. Default `0`. |

### `GET|POST /api/touch`

Marks subscriptions as read up to a given time. Items stored at or before that
time become read.

| Parameter | Description |
|---|---|
| `subscribe_id` | Required. Comma-separated subscription IDs. |
| `timestamp` | Required. Comma-separated Unix times, one per `subscribe_id`, in the same order. |

Use the `last_stored_on` value returned by `/api/unread`, converted to Unix
time.

Returns a status object.

### `GET|POST /api/touch_all`

Marks subscriptions as read up to the current time.

| Parameter | Description |
|---|---|
| `subscribe_id` | Required. Comma-separated subscription IDs. |

Returns a status object.

### `GET|POST /api/unread_count`

Counts unread items across all subscriptions that were stored after the given
times.

| Parameter | Description |
|---|---|
| `since` | Required. A date-time string such as `2026-10-30T00:00:00+09:00`. Several values can be given separated by commas. |

Returns a number, or an array of numbers when several `since` values are given.
For each subscription at most the 200 newest items are counted.

### `GET|POST /api/item_count`

Same as `/api/unread_count`, but counts items regardless of read state.

### `GET|POST /api/crawl`

Asks the server to crawl the feeds of the given subscriptions immediately.

| Parameter | Description |
|---|---|
| `subscribe_id` | Required. Comma-separated subscription IDs. |

Returns `{"a": true}` when the crawl of the last given feed succeeded, and
`{"a": false}` otherwise.

## Managing feeds

### `GET|POST /api/feed/discover`

Finds feeds on a page.

| Parameter | Description |
|---|---|
| `url` | Required. URL of a page or a feed. |

```json
[
  {
    "subscribers_count": 5,
    "feedlink": "https://example.com/feed.xml",
    "link": "https://example.com/",
    "title": "Example Blog",
    "subscribe_id": 12
  }
]
```

`subscribe_id` is present when the account already subscribes to the feed.

### `POST /api/feed/subscribe`

| Parameter | Description |
|---|---|
| `feedlink` | Required. Feed URL. |
| `folder_id` | Folder to put the subscription in. |
| `rate` | 0 to 5. Default `0`. |
| `public` | `0` or `1`. Defaults to the account setting. |

Returns a status object with `subscribe_id` on success:

```json
{ "isSuccess": true, "ErrorCode": 0, "subscribe_id": 12 }
```

### `POST /api/feed/unsubscribe`

| Parameter | Description |
|---|---|
| `subscribe_id` | Required. |

Returns a status object.

### `GET|POST /api/feed/subscribed`

Returns the settings of one subscription.

| Parameter | Description |
|---|---|
| `subscribe_id` | Subscription ID. A feed ID is also accepted. |
| `feedlink` | Feed URL. Used when `subscribe_id` is not given. |

```json
{
  "subscribe_id": 12,
  "folder_id": 3,
  "rate": 2,
  "public": 0,
  "ignore_notify": 0,
  "created_on": 1730000000
}
```

The response also contains an `ApiKey` field used by the web reader, which
clients can ignore. When the subscription is not found a failure status object
is returned.

### `POST /api/feed/update`

Updates several settings of one subscription at once. Parameters that are
omitted or invalid are left unchanged.

| Parameter | Description |
|---|---|
| `subscribe_id` | Required. |
| `rate` | 0 to 5. |
| `public` | `0` or `1`. |
| `folder_id` | Folder ID. |
| `ignore_notify` | `0` or `1`. |

Returns a status object.

### `POST /api/feed/move`

Moves subscriptions to a folder.

| Parameter | Description |
|---|---|
| `subscribe_id` | Required. Comma-separated subscription IDs. |
| `to` | Folder name or folder ID. Empty to remove the subscriptions from their folder. |

Returns a status object. It fails when the folder does not exist.

### `POST /api/feed/set_rate`

| Parameter | Description |
|---|---|
| `subscribe_id` | Required. |
| `rate` | Required. 0 to 5. |

Returns a status object.

### `POST /api/feed/set_notify`

| Parameter | Description |
|---|---|
| `subscribe_id` | Required. Comma-separated subscription IDs. |
| `ignore` | Required. `0` or `1`. |

Returns a status object.

### `POST /api/feed/set_public`

| Parameter | Description |
|---|---|
| `subscribe_id` | Required. Comma-separated subscription IDs. |
| `public` | Required. `0` or `1`. |

Returns a status object.

### `POST /api/feed/fetch_favicon`

Fetches the favicon of a feed again.

| Parameter | Description |
|---|---|
| `feedlink` | Required. Feed URL. |

Returns a status object.

## Folders

### `POST /api/folders`

```json
{
  "names": ["news", "tech"],
  "name2id": { "news": 1, "tech": 3 }
}
```

### `POST /api/folder/create`

| Parameter | Description |
|---|---|
| `name` | Required. |

Returns a status object. `ErrorCode` is `10` when a folder with the same name
already exists. The response does not contain the new folder ID; call
`/api/folders` to get it.

### `POST /api/folder/update`

Renames a folder.

| Parameter | Description |
|---|---|
| `folder_id` | Required. |
| `name` | Required. New name. |

Returns a status object.

### `POST /api/folder/delete`

Deletes a folder. Its subscriptions are kept and removed from the folder.

| Parameter | Description |
|---|---|
| `folder_id` | Required. |

Returns a status object.

## Pins

Pins are a per-account list of links to read later. Up to 100 pins are kept;
adding more removes the oldest ones.

### `POST /api/pin/all`

```json
[
  { "link": "https://example.com/hello", "title": "Hello", "created_on": 1730000000 }
]
```

### `POST /api/pin/add`

| Parameter | Description |
|---|---|
| `link` | Required. |
| `title` | Required. |

Returns a status object.

### `POST /api/pin/remove`

| Parameter | Description |
|---|---|
| `link` | Required. |

Returns a status object. `ErrorCode` is `2` when the pin does not exist.

### `POST /api/pin/clear`

Removes all pins. Returns a status object.

## Config

The web reader stores its preferences as a free-form key-value map.

### `GET|POST /api/config/load`

Returns the stored map, plus `save_pin_limit` (the maximum number of pins).

### `POST /api/config/save`

Stores every given parameter as a key in the map and returns the whole map.
`member_public` (`0` or `1`) is handled separately and sets whether the
account is public.

## Other endpoints

### `GET /favicon/:feed_id`

Returns the favicon of a feed as a 16x16 PNG, or a default icon. This is the
path returned in `icon` by `/api/subs`. It does not require authentication.

### `GET /rpc/export?api_key=<api_key>&format=opml`

Exports the subscriptions as OPML (`format=opml`) or JSON (`format=json`).
This endpoint takes the API key in the `api_key` parameter.

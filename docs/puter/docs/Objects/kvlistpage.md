# KVListPage

Source: https://docs.puter.com/Objects/kvlistpage/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/object.svg)`KVListPage`

---

The `KVListPage` object containing paginated results from [`puter.kv.list()`](/KV/list/).

## Attributes

#### `items` (Array)

An array containing either:

- Strings (key names) when `returnValues` is `false`
- [`KVPair`](/Objects/kvpair) objects when `returnValues` is `true`

#### `cursor` (String) (optional)

A pagination cursor to fetch the next page of results. Present only when there are more results to fetch. Pass this value to the next `puter.kv.list()` call to retrieve the next page.

[NEXT

`MonthlyUsage`](/./Objects/monthlyusage/)[PREVIOUS

`KVPair`](/./Objects/kvpair/)
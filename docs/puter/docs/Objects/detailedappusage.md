# DetailedAppUsage

Source: https://docs.puter.com/Objects/detailedappusage/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/object.svg)`DetailedAppUsage`

---

Object containing detailed resource usage statistics for a specific application.

## Attributes

#### `total` (Number)

The application's total resource consumption.

#### `[apiName]` (Object)

Usage information per API. Each key is an API name, and the value is an object with:

- `cost` (Number) - Total resource consumed by this API.
- `count` (Number) - Number of times the API is called.
- `units` (Number) - Units of measurement for each API (e.g., tokens for AI calls, bytes for FS operations, etc).

Resources in Puter are measured in microcents (e.g., $0.01 = 1,000,000).

[NEXT

`FSItem`](/./Objects/fsitem/)[PREVIOUS

`ChatResponseChunk`](/./Objects/chatresponsechunk/)
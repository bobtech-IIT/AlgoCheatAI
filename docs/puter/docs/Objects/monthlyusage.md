# MonthlyUsage

Source: https://docs.puter.com/Objects/monthlyusage/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/object.svg)`MonthlyUsage`

---

Object containing user's monthly resource usage information in the Puter ecosystem.

## Attributes

#### `allowanceInfo` (Object)

Information about the user's resource allowance and consumption.

- `monthUsageAllowance` (Number) - Total resource allowance for the month.
- `remaining` (Number) - The remaining allowance that can be used.

#### `appTotals` (Object)

Total usage by application. Each key is an application id, and the value is an object with:

- `count` (Number) - Number of Puter API calls per application.
- `total` (Number) - Total resources consumed per application.

#### `usage` (Object)

Usage information per API. Each key is an API name, and the value is an object with:

- `cost` (Number) - Total resource consumed by this API.
- `count` (Number) - Number of times the API is called.
- `units` (Number) - Units of measurement for each API (e.g., tokens for AI calls, bytes for FS operations, etc).

Resources in Puter are measured in microcents (e.g., $0.01 = 1,000,000).

[NEXT

`SignInResult`](/./Objects/signinresult/)[PREVIOUS

`KVListPage`](/./Objects/kvlistpage/)
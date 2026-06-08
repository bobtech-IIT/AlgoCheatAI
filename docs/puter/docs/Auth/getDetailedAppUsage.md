# puter.auth.getDetailedAppUsage()

Source: https://docs.puter.com/Auth/getDetailedAppUsage/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.auth.getDetailedAppUsage()`

 Websites Puter Apps Node.js Workers

---

Get detailed usage statistics for an application.

Users can only see the usage of applications they have accessed before.
Usage data is scoped to the calling app only.

## Syntax

```js
puter.auth.getDetailedAppUsage(appId)
```

## Parameters

#### `appId` (String) (required)

The id of the application.

## Return value

A `Promise` that resolves to a [`DetailedAppUsage`](/Objects/detailedappusage) object containing resource usage statistics for the given application.

## Example

```html
<html>
  <body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      puter.auth.getDetailedAppUsage(appId).then(function (result) {
        puter.print(`<pre>${JSON.stringify(result, null, 2)}</pre>`);
      });
    </script>
  </body>
</html>
```

[NEXT

Cloud Storage](/./FS/)[PREVIOUS

`getMonthlyUsage()`](/./Auth/getMonthlyUsage/)
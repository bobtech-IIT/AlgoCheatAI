# puter.auth.getMonthlyUsage()

Source: https://docs.puter.com/Auth/getMonthlyUsage/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.auth.getMonthlyUsage()`

 Websites Puter Apps Node.js Workers

---

Get the user's current monthly resource usage in the Puter ecosystem.

Usage data is scoped to the calling app only.

## Syntax

```js
puter.auth.getMonthlyUsage()
```

## Parameters

None

## Return value

A `Promise` that resolves to a [`MonthlyUsage`](/Objects/monthlyusage) object containing the user's monthly usage information.

## Example

```html
<html>
  <body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      puter.auth.getMonthlyUsage().then(function (usage) {
        puter.print(`<pre>${JSON.stringify(usage, null, 2)}</pre>`);
      });
    </script>
  </body>
</html>
```

[NEXT

`getDetailedAppUsage()`](/./Auth/getDetailedAppUsage/)[PREVIOUS

`getUser()`](/./Auth/getUser/)
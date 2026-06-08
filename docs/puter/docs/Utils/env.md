# puter.env

Source: https://docs.puter.com/Utils/env/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/attr.svg)`puter.env`

 Websites Puter Apps Node.js Workers

---

A property of the `puter` object that returns the environment in which Puter.js is being used.

## Syntax

```js
puter.env
```

## Return value

A string containing the environment in which Puter.js is being used:

- `app` - Puter.js is running inside a Puter application. e.g. `https://puter.com/app/editor`
- `web` - Puter.js is running inside a web page outside of the Puter environment. e.g. `https://example.com/index.html`
- `gui` - Puter.js is running inside the Puter GUI. e.g. `https://puter.com/`

## Examples

**Get the environment in which Puter.js is running**

```html
<html>
  <body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      puter.print("Environment: " + puter.env);
    </script>
  </body>
</html>
```

[NEXT

`print()`](/./Utils/print/)[PREVIOUS

`appID`](/./Utils/appID/)
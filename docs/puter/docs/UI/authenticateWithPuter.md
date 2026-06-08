# puter.ui.authenticateWithPuter()

Source: https://docs.puter.com/UI/authenticateWithPuter/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.ui.authenticateWithPuter()`

 Websites Puter Apps Node.js Workers

---

Presents a dialog to the user to authenticate with their Puter account.

## Syntax

```js
puter.ui.authenticateWithPuter()
```

## Parameters

None.

## Return value

A `Promise` that resolves once the user is authenticated with their Puter account. If the user cancels the dialog, the promise will be rejected with an error.

## Examples

```html
<html>
  <body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      // Presents a dialog to the user to authenticate with their Puter account.
      puter.ui
        .authenticateWithPuter()
        .then(() => {
          console.log("Authentication success!");
        })
        .catch((error) => {
          console.error("Authentication failed: ", error);
        });
    </script>
  </body>
</html>
```

[NEXT

`alert()`](/./UI/alert/)[PREVIOUS

UI](/./UI/)
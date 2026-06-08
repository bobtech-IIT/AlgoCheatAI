# puter.ui.showSpinner()

Source: https://docs.puter.com/UI/showSpinner/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.ui.showSpinner()`

 Websites Puter Apps Node.js Workers

---

Shows an overlay with a spinner in the center of the screen. If multiple instances of `puter.ui.showSpinner()` are called, only one spinner will be shown until all instances are hidden.

## Syntax

```js
puter.ui.showSpinner()
puter.ui.showSpinner(html)
```

## Parameters

#### `html` (String) (optional)

Custom message rendered under the spinner. Accepts plain text or HTML. Defaults to `"Working..."`.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // show the spinner
        puter.ui.showSpinner();

        // hide the spinner after 3 seconds
        setTimeout(()=>{
            puter.ui.hideSpinner();
        }, 3000);
    </script>
</body>
</html>
```

[NEXT

`hideSpinner()`](/./UI/hideSpinner/)[PREVIOUS

`showSaveFilePicker()`](/./UI/showSaveFilePicker/)
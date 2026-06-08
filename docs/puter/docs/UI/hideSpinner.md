# puter.ui.hideSpinner()

Source: https://docs.puter.com/UI/hideSpinner/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.ui.hideSpinner()`

 Websites Puter Apps Node.js Workers

---

Hides the active spinner instance.

## Syntax

```js
puter.ui.hideSpinner()
```

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

`showWindow()`](/./UI/showWindow/)[PREVIOUS

`showSpinner()`](/./UI/showSpinner/)
# puter.ui.onWindowClose()

Source: https://docs.puter.com/UI/onWindowClose/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.ui.onWindowClose()`

 Websites Puter Apps Node.js Workers

---

Specify a function to execute when the window is about to close. For example the provided function will run right after  the 'X' button of the window has been pressed.

**Note**  `onWindowClose` is not called when app is closed using `puter.exit()`.

## Syntax

```js
puter.ui.onWindowClose(handler)
```

## Parameters

#### `handler` (Function)

A function to execute when the window is going to close.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ui.onWindowClose(function(){
            alert('Window is about to close!')
            puter.exit();
        })
    </script>
</body>
</html>
```

[NEXT

`parentApp()`](/./UI/parentApp/)[PREVIOUS

`onLaunchedWithItems()`](/./UI/onLaunchedWithItems/)
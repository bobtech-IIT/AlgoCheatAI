# puter.exit()

Source: https://docs.puter.com/UI/exit/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.exit()`

 Websites Puter Apps Node.js Workers

---

Will terminate the running application and close its window.

## Syntax

```js
puter.exit()
puter.exit(statusCode)
```

## Parameters

#### `statusCode` (Integer) (optional)

Reports the reason for exiting, with `0` meaning success and non-zero indicating some kind of error. Defaults to `0`.

This value is reported to other apps as the reason that your app exited.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <button id="exit-button">Exit App</button>
    <script>
        const exit_button = document.getElementById('exit-button');
        exit_button.addEventListener('click', () => {
            puter.exit();
        });
    </script>
</body>
</html>
```

[NEXT

`getLanguage()`](/./UI/getLanguage/)[PREVIOUS

`createWindow()`](/./UI/createWindow/)
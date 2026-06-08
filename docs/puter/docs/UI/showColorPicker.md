# puter.ui.showColorPicker()

Source: https://docs.puter.com/UI/showColorPicker/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.ui.showColorPicker()`

 Websites Puter Apps Node.js Workers

---

Presents the user with a color picker dialog allowing them to select a color.

## Syntax

```js
puter.ui.showColorPicker()
puter.ui.showColorPicker(defaultColor)
puter.ui.showColorPicker(options)
```

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ui.showColorPicker().then((color)=>{
            document.body.style.backgroundColor = color;
        })
    </script>
</body>
</html>
```

[NEXT

`showDirectoryPicker()`](/./UI/showDirectoryPicker/)[PREVIOUS

`setWindowY()`](/./UI/setWindowY/)
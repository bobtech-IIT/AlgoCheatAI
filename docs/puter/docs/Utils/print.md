# puter.print()

Source: https://docs.puter.com/Utils/print/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.print()`

 Websites Puter Apps Node.js Workers

---

Prints a string by appending it to the body of the document. This is useful for debugging and testing purposes and is not recommended for production use.

## Syntax

```js
puter.print(text)
```

## Parameters

#### `text` (String)

The text to print.

#### `options` (Object, optional)

An object containing options for the print function.

- `code` (Boolean, optional): If true, the text will be printed as code by wrapping it in a `<code>` and `<pre>` tag. Defaults to `false`.

## Examples

**Print "Hello, world!"**

```html
<html>
  <body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      puter.print("Hello, world!");
    </script>
  </body>
</html>
```

**Print "Hello, world!" as code**

```html
<html>
  <body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      puter.print("Hello, world!", { code: true });
    </script>
  </body>
</html>
```

[NEXT

`randName()`](/./Utils/randName/)[PREVIOUS

`env`](/./Utils/env/)
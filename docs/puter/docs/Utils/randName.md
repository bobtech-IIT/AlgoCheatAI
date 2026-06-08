# puter.randName()

Source: https://docs.puter.com/Utils/randName/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.randName()`

 Websites Puter Apps Node.js Workers

---

A function that generates a domain-safe name by combining a random adjective, a random noun, and a random number (between 0 and 9999). The result is returned as a string with components separated by hyphens by default. You can change the separator by passing a string as the first argument to the function.

## Syntax

```js
puter.randName()
puter.randName(separator)
```

## Parameters

#### `separator` (String)

The separator to use between components. Defaults to `-`.

## Examples

**Generate a random name**

```html
<html>
  <body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      puter.print(puter.randName());
    </script>
  </body>
</html>
```

[NEXT

Objects](/./Objects/)[PREVIOUS

`print()`](/./Utils/print/)
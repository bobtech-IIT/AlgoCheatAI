# puter.ai.listModelProviders()

Source: https://docs.puter.com/AI/listModelProviders/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.ai.listModelProviders()`

 Websites Puter Apps Node.js Workers

---

Returns the AI providers that are available through Puter.js.

## Syntax

```js
puter.ai.listModelProviders()
```

## Parameters

None

## Return value

A `Promise` that will resolve to an array of string containing each AI providers.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Fetch all providers
            const providers = await puter.ai.listModelProviders();
            puter.print(providers)
        })();
    </script>
</body>
</html>
```

[NEXT

`txt2img()`](/./AI/txt2img/)[PREVIOUS

`listModels()`](/./AI/listModels/)
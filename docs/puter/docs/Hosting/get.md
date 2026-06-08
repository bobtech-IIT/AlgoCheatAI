# puter.hosting.get()

Source: https://docs.puter.com/Hosting/get/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.hosting.get()`

 Websites Puter Apps Node.js Workers

---

Returns a subdomain. If the subdomain does not exist, the promise will be rejected with an error.

## Syntax

```js
puter.hosting.get(subdomain)
```

## Parameters

#### `subdomain` (String) (required)

A string containing the name of the subdomain you want to retrieve.

## Return value

A `Promise` that will resolve to a [`Subdomain`](/Objects/subdomain/) object when the subdomain has been retrieved. If a subdomain with the given name does not exist, the promise will be rejected with an error.

## Examples

**Get a subdomain**

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random website
            let subdomain = puter.randName();
            const site = await puter.hosting.create(subdomain)
            puter.print(`Website hosted at: ${site.subdomain}.puter.site (This is an empty website with no files)<br>`);

            // (2) Retrieve the website using get()
            const site2 = await puter.hosting.get(site.subdomain);
            puter.print(`Website retrieved: subdomain=${site2.subdomain}.puter.site UID=${site2.uid}<br>`);

            // (3) Delete the website (cleanup)
            await puter.hosting.delete(subdomain);
        })();
    </script>
</body>
</html>
```

[NEXT

Key-Value Store](/./KV/)[PREVIOUS

`update()`](/./Hosting/update/)
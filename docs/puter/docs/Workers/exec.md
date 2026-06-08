# puter.workers.exec()

Source: https://docs.puter.com/Workers/exec/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.workers.exec()`

 Websites Puter Apps Node.js Workers

---

Sends a request to a worker endpoint while automatically passing the user's session.

Unlike standard `fetch()`, `puter.workers.exec()` automatically includes the user's session. This provides the worker with the  **user context**  (`user.puter`), enabling the [User-Pays model](/user-pays-model/).

## Syntax

```js
puter.workers.exec(workerURL, options)
```

## Parameters

#### `workerURL` (String)(Required)

The URL of the worker to execute.

#### `options` (Object)

A standard [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit) object

## Return Value

A `Promise` that resolves to a `Response` object (similar to the Fetch API).

## Examples

**Execute a worker**

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Execute a worker and get the response
            const response = await puter.workers.exec('https://my-worker.puter.work');
            const data = await response.text();
            puter.print(`Response: ${data}`);
        })();
    </script>
</body>
</html>
```

[NEXT

Hosting](/./Hosting/)[PREVIOUS

`get()`](/./Workers/get/)
# puter.workers.list()

Source: https://docs.puter.com/Workers/list/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.workers.list()`

 Websites Puter Apps Node.js Workers

---

Lists all workers in your account with their details.

## Syntax

```js
puter.workers.list()
```

## Parameters

None.

## Return Value

A `Promise` that resolves to a [`WorkerInfo`](/Objects/workerinfo) array with each worker's information.

## Examples

**List all workers**

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // List all workers
            const workers = await puter.workers.list();
            puter.print(`You have ${workers.length} worker(s):<br>`);
            workers.forEach(worker => {
                puter.print(`- ${worker.name} (${worker.url})<br>`);
            });
        })();
    </script>
</body>
</html>
```

[NEXT

`get()`](/./Workers/get/)[PREVIOUS

`delete()`](/./Workers/delete/)
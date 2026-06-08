# puter.kv.del()

Source: https://docs.puter.com/KV/del/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.kv.del()`

 Websites Puter Apps Node.js Workers

---

When passed a key, will remove that key from the key-value storage. If there is no key with the given name in the key-value storage, nothing will happen.

## Syntax

```js
puter.kv.del(key)
```

## Parameters

#### `key` (String) (required)

A string containing the name of the key you want to remove.

## Return value

A `Promise` that will resolve to `true` when the key has been removed.

## Examples

**Delete the key 'name'**

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // create a new key-value pair
            await puter.kv.set('name', 'Puter Smith');
            puter.print("Key-value pair 'name' created/updated<br>");

            // delete the key 'name'
            await puter.kv.del('name');
            puter.print("Key-value pair 'name' deleted<br>");

            // try to retrieve the value of key 'name'
            const name = await puter.kv.get('name');
            puter.print(`Name is now: ${name}`);
        })();
    </script>
</body>
</html>
```

[NEXT

`list()`](/./KV/list/)[PREVIOUS

`update()`](/./KV/update/)
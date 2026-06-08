# puter.kv.expireAt()

Source: https://docs.puter.com/KV/expireAt/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.kv.expireAt()`

 Websites Puter Apps Node.js Workers

---

Set the expiration timestamp (in seconds) for a key in the key-value store.

## Syntax

```js
puter.kv.expireAt(key, timestampSeconds)
```

## Parameters

#### `key` (String) (required)

A string containing the name of the key.

#### `timestampSeconds` (Number) (required)

The Unix timestamp (in seconds) at which the key will be removed from the key-value store.

## Return value

A `Promise` that will resolve to `true` when the expiry time has been set.

## Examples

**Retrieve the value of a key after it expires**

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a new key-value pair
            await puter.kv.set('name', 'Puter Smith');
            puter.print("Key-value pair 'name' created/updated<br>");

            // (2) Set key to expire in 1 second
            await puter.kv.expireAt('name', (Date.now()/1000) + 1);
            
            // (3) Wait 2 seconds and get the value
            setTimeout(async () => {
                const name = await puter.kv.get('name');
                puter.print("Value :", name);
            }, 2000);
        })();
    </script>
</body>
</html>
```

[NEXT

`MAX_KEY_SIZE`](/./KV/MAX_KEY_SIZE/)[PREVIOUS

`expire()`](/./KV/expire/)
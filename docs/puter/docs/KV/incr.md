# puter.kv.incr()

Source: https://docs.puter.com/KV/incr/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.kv.incr()`

 Websites Puter Apps Node.js Workers

---

Increments the value of a key. If the key does not exist, it is initialized with 0 before performing the operation. An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer. This operation is limited to 64 bit signed integers.

## Syntax

```js
puter.kv.incr(key)
puter.kv.incr(key, amount)
puter.kv.incr(key, pathAndAmount)
```

## Parameters

#### `key` (String) (required)

The key of the value to increment.

#### `amount` (Integer | Object) (optional)

The amount to increment the value by. Defaults to 1.

When `amount` is an object: Increments a property within an object value stored in the key.

- Key: the path to the property (e.g., `"user.score"`)
- Value: the amount to increment by

## Return Value

Returns the new value of the key after the increment operation.

## Examples

**Increment the value of a key**

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.kv.incr('testIncrKey').then((newValue) => {
            puter.print(`New value: ${newValue}`);
        });
    </script>
</body>
</html>
```

**Increment a property within an object value**

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // If 'stats' contains: { user: { score: 10 } }
            await puter.kv.set('stats', {user: {score: 10}})

            // This increments user.score by 2
            const newValue = await puter.kv.incr('stats', {"user.score": 2});

            // newValue will be: { user: { score: 12 } }
            puter.print(`New value: ${JSON.stringify(newValue)}`);
        })();
    </script>
</body>
</html>
```

[NEXT

`decr()`](/./KV/decr/)[PREVIOUS

`get()`](/./KV/get/)
# puter.fs.stat()

Source: https://docs.puter.com/FS/stat/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.fs.stat()`

 Websites Puter Apps Node.js Workers

---

This method allows you to get information about a file or directory.

## Syntax

```js
puter.fs.stat(path, options)
puter.fs.stat(options)
```

## Parameters

#### `path` (String) (required)

The path to the file or directory to get information about.
If `path` is not absolute, it will be resolved relative to the app's root directory.

#### `options` (Object) (optional)

An object with the following properties:

- `path` (String) - Path to the file or directory. Required when passing options as the only argument.
- `uid` (String) - The UID of the file or directory. Can be used instead of `path`.
- `returnSubdomains` (Boolean) - Whether to return subdomain information. Defaults to `false`.
- `returnPermissions` (Boolean) - Whether to return permission information. Defaults to `false`.
- `returnVersions` (Boolean) - Whether to return version information. Defaults to `false`.
- `returnSize` (Boolean) - Whether to return size information. Defaults to `false`.

## Return value

A `Promise` that resolves to the [`FSItem`](/Objects/fsitem) object of the specified file or directory.

## Examples

**Get information about a file**

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // () create a file
            await puter.fs.write('hello.txt', 'Hello, world!');
            puter.print('hello.txt created<br>');

            // (2) get information about hello.txt
            const file = await puter.fs.stat('hello.txt');
            puter.print(`hello.txt name: ${file.name}<br>`);
            puter.print(`hello.txt path: ${file.path}<br>`);
            puter.print(`hello.txt size: ${file.size}<br>`);
            puter.print(`hello.txt created: ${file.created}<br>`);
        })()
    </script>
</body>
</html>
```

[NEXT

`delete()`](/./FS/delete/)[PREVIOUS

`move()`](/./FS/move/)
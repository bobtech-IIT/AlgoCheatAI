# puter.fs.delete()

Source: https://docs.puter.com/FS/delete/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.fs.delete()`

 Websites Puter Apps Node.js Workers

---

Deletes a file or directory.

## Syntax

```js
puter.fs.delete(paths)
puter.fs.delete(paths, options)
puter.fs.delete(options)
```

## Parameters

#### `paths` (String | String[]) (required)

A single path or array of paths of the file(s) or directory(ies) to delete.
If a path is not absolute, it will be resolved relative to the app's root directory.

#### `options` (Object) (optional)

The options for the `delete` operation. The following options are supported:

- `paths` (String | String[]) - A single path or array of paths to delete. Required when passing options as the only argument.
- `recursive` (Boolean) - Whether to delete the directory recursively. Defaults to `true`.
- `descendantsOnly` (Boolean) - Whether to delete only the descendants of the directory and not the directory itself. Defaults to `false`.

## Return value

A `Promise` that will resolve when the file or directory is deleted.

## Examples

**Delete a file**

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random file
            let filename = puter.randName();
            await puter.fs.write(filename, 'Hello, world!');
            puter.print('File created successfully<br>');

            // (2) Delete the file
            await puter.fs.delete(filename);
            puter.print('File deleted successfully');
        })();
    </script>
</body>
</html>
```

**Delete a directory**

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random directory
            let dirname = puter.randName();
            await puter.fs.mkdir(dirname);
            puter.print('Directory created successfully<br>');

            // (2) Delete the directory
            await puter.fs.delete(dirname);
            puter.print('Directory deleted successfully');
        })();
    </script>
</body>
</html>
```

[NEXT

`getReadURL()`](/./FS/getReadURL/)[PREVIOUS

`stat()`](/./FS/stat/)
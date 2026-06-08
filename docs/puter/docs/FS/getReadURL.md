# puter.fs.getReadURL()

Source: https://docs.puter.com/FS/getReadURL/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.fs.getReadURL()`

 Websites Puter Apps Node.js Workers

---

Generates a URL that can be used to read a file.

## Syntax

```js
puter.fs.getReadURL(path)
puter.fs.getReadURL(path, expiresIn)
```

## Parameters

#### `path` (String) (Required)

The path to the file to read.

#### `expiresIn` (Number) (Optional)

The number of milliseconds until the URL expires. If not provided, the URL will expire in 24 hours.

## Return value

A promise that resolves to a URL string that can be used to read the file.

## Example

```javascript
const url = await puter.fs.getReadURL("~/myfile.txt");
```

[NEXT

`upload()`](/./FS/upload/)[PREVIOUS

`delete()`](/./FS/delete/)
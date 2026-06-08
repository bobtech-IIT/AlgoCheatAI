# puter.perms.requestManageSubdomains()

Source: https://docs.puter.com/Perms/requestManageSubdomains/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.perms.requestManageSubdomains()`

 Websites Puter Apps Node.js Workers

---

Request write (manage) access to the user's subdomains. If the user has already granted this permission the user will not be prompted and `true` will be returned. If the user grants permission `true` will be returned. If the user does not allow access `false` will be returned.

## Syntax

```js
puter.perms.requestManageSubdomains()
```

## Parameters

None

## Return value

A `Promise` that resolves to:

- `true` - If permission is granted
- `false` - If permission is denied

## Example

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <button id="request-subdomains">Request Subdomains Manage Access</button>
    <script>
        document.getElementById('request-subdomains').addEventListener('click', async () => {
            const granted = await puter.perms.requestManageSubdomains();
            if (granted) {
                puter.print('Subdomains manage access granted');
                // Now you can create, update, or delete subdomains
                // Note: This requires the Hosting API
            } else {
                puter.print('Subdomains manage access denied');
            }
        });
    </script>
</body>
</html>
```

[NEXT

Utilities](/./Utils/)[PREVIOUS

`requestReadSubdomains()`](/./Perms/requestReadSubdomains/)
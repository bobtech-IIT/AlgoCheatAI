# puter.perms.requestReadApps()

Source: https://docs.puter.com/Perms/requestReadApps/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.perms.requestReadApps()`

 Websites Puter Apps Node.js Workers

---

Request read access to the user's apps. If the user has already granted this permission the user will not be prompted and `true` will be returned. If the user grants permission `true` will be returned. If the user does not allow access `false` will be returned.

## Syntax

```js
puter.perms.requestReadApps()
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
    <button id="request-apps">Request Apps Read Access</button>
    <script>
        document.getElementById('request-apps').addEventListener('click', async () => {
            const granted = await puter.perms.requestReadApps();
            if (granted) {
                puter.print('Apps read access granted');
                // Now you can list the user's apps
                const apps = await puter.apps.list();
                puter.print(`User has ${apps.length} apps`);
            } else {
                puter.print('Apps read access denied');
            }
        });
    </script>
</body>
</html>
```

[NEXT

`requestManageApps()`](/./Perms/requestManageApps/)[PREVIOUS

`requestWriteVideos()`](/./Perms/requestWriteVideos/)
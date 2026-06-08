# puter.auth.getUser()

Source: https://docs.puter.com/Auth/getUser/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.auth.getUser()`

 Websites Puter Apps Node.js Workers

---

Returns the user's basic information.

## Syntax

```js
puter.auth.getUser()
```

## Parameters

None

## Return value

A promise that resolves to a [`User`](/Objects/user) object containing the user's basic information.

## Example

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.auth.getUser().then(function(user) {
            puter.print(JSON.stringify(user));
        });
    </script>
</body>
</html>
```

[NEXT

`getMonthlyUsage()`](/./Auth/getMonthlyUsage/)[PREVIOUS

`isSignedIn()`](/./Auth/isSignedIn/)
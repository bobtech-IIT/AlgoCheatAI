# puter.auth.isSignedIn()

Source: https://docs.puter.com/Auth/isSignedIn/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.auth.isSignedIn()`

 Websites Puter Apps Node.js Workers

---

Checks whether the user is signed into the application.

## Syntax

```js
puter.auth.isSignedIn()
```

## Parameters

None

## Return value

Returns `true` if the user is signed in, `false` otherwise.

## Example

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.print(`Sign in status: ${puter.auth.isSignedIn()}`);
    </script>
</body>
</html>
```

[NEXT

`getUser()`](/./Auth/getUser/)[PREVIOUS

`signOut()`](/./Auth/signOut/)
# puter.auth.signIn()

Source: https://docs.puter.com/Auth/signIn/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.auth.signIn()`

 Websites Puter Apps Node.js Workers

---

Initiates the sign in process for the user. This will open a popup window with the appropriate authentication method. Puter automatically handles the authentication process and will resolve the promise when the user has signed in.

It is important to note that all essential methods in Puter handle authentication automatically. This method is only necessary if you want to handle authentication manually, for example if you want to build your own custom authentication flow.

The `puter.auth.signIn()` function must be triggered by a user action (such as a click event) because it opens a popup window. Most browsers block popups that are not initiated by user interactions.

## Syntax

```js
puter.auth.signIn()
puter.auth.signIn(options)
```

## Parameters

#### `options` (optional)

`options` is an object with the following properties:

- `attempt_temp_user_creation`: A boolean value that indicates whether to Puter should automatically create a temporary user. This is useful if you want to quickly onboard a user without requiring them to sign up. They can always sign up later if they want to.

## Return value

A `Promise` that will resolve to a [`SignInResult`](/Objects/signinresult/) object when the user has signed in.

## Example

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <button id="sign-in">Sign in</button>
    <script>
        // Because signIn() opens a popup window, it must be called from a user action.
        document.getElementById('sign-in').addEventListener('click', async () => {
            // signIn() will resolve when the user has signed in.
            await puter.auth.signIn().then((res) => {
                puter.print('Signed in<br>' + JSON.stringify(res));
            });
        });
    </script>
</body>
</html>
```

[NEXT

`signOut()`](/./Auth/signOut/)[PREVIOUS

Auth](/./Auth/)
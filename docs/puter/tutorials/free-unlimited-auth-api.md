# Free, Unlimited Auth API

Source: https://developer.puter.com/tutorials/free-unlimited-auth-api/

[Tutorials](/tutorials/)

# Free, Unlimited Auth API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 17, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Authentication Flow](#example-1-basic-authentication-flow)[Example 2: Check Authentication Status](#example-2-check-authentication-status)[Example 3: Protected Content](#example-3-protected-content)[Example 4: Combining Auth with Cloud Storage](#example-4-combining-auth-with-cloud-storage)[Example 5: Combining Auth with AI](#example-5-combining-auth-with-ai)[Best Practices](#best-practices)[Related](#related)

This tutorial will show you how to implement user authentication in your web applications using [Puter.js](https://developer.puter.com), completely free and without any API keys or usage restrictions. Using Puter.js, you can add secure user authentication to your applications without managing servers, databases, or authentication providers.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), allowing developers to integrate cloud and serverless functionality into their applications while each user handles their own usage costs. This model lets developers provide advanced authentication capabilities to users at zero cost to the developer, with no API keys or backend setup required.

## Getting Started

To use Puter.js, import our [NPM library](https://www.npmjs.com/package/@heyputer/puter.js) in your project:

```js
// npm install @heyputer/puter.js
import { puter } from '@heyputer/puter.js';
```

Or alternatively, add our script via CDN if you are working directly with HTML, simply add it to the `<head>` or `<body>` section of your code:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

You're now ready to use Puter.js for free authentication capabilities. No API keys or sign-ups are required.

## Example 1: Basic Authentication Flow

Here's a simple example showing how to implement a sign-in button and handle authentication:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <button id="sign-in">Sign in</button>
    <div id="user-info"></div>

    <script>
        // Get the sign in button
        const signInButton = document.getElementById('sign-in');
        const userInfoDiv = document.getElementById('user-info');

        // Add click event listener to the sign in button
        signInButton.addEventListener('click', async () => {
            try {
                // Attempt to sign in
                await puter.auth.signIn();
                
                // Get user information after successful sign in
                const user = await puter.auth.getUser();
                userInfoDiv.innerHTML = `Welcome, ${user.username}!`;
                
                // Hide the sign in button
                signInButton.style.display = 'none';
            } catch (error) {
                console.error('Sign in failed:', error);
            }
        });
    </script>
</body>
</html>
```

## Example 2: Check Authentication Status

You can check if a user is already signed in using the [`isSignedIn()`](https://docs.puter.com/Auth/isSignedIn/) method:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <div id="status"></div>
    <button id="sign-in" style="display: none;">Sign in</button>
    <button id="sign-out" style="display: none;">Sign out</button>

    <script>
        const statusDiv = document.getElementById('status');
        const signInButton = document.getElementById('sign-in');
        const signOutButton = document.getElementById('sign-out');

        // Function to update UI based on auth state
        async function updateAuthUI() {
            if (puter.auth.isSignedIn()) {
```

Show 27 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <div id="status"></div>
    <button id="sign-in" style="display: none;">Sign in</button>
    <button id="sign-out" style="display: none;">Sign out</button>

    <script>
        const statusDiv = document.getElementById('status');
        const signInButton = document.getElementById('sign-in');
        const signOutButton = document.getElementById('sign-out');

        // Function to update UI based on auth state
        async function updateAuthUI() {
            if (puter.auth.isSignedIn()) {
                const user = await puter.auth.getUser();
                statusDiv.textContent = `Signed in as: ${user.username}`;
                signInButton.style.display = 'none';
                signOutButton.style.display = 'block';
            } else {
                statusDiv.textContent = 'Not signed in';
                signInButton.style.display = 'block';
                signOutButton.style.display = 'none';
            }
        }

        // Set up event listeners
        signInButton.addEventListener('click', async () => {
            await puter.auth.signIn();
            updateAuthUI();
        });

        signOutButton.addEventListener('click', () => {
            puter.auth.signOut();
            updateAuthUI();
        });

        // Check initial auth state
        updateAuthUI();
    </script>
</body>
</html>
```

Collapse code

## Example 3: Protected Content

Here's how to create a simple application with protected content that's only visible to authenticated users:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <div id="public-content">
        <h1>Welcome to Our App</h1>
        <p>Please sign in to view protected content.</p>
        <button id="sign-in">Sign in</button>
    </div>

    <div id="protected-content" style="display: none;">
        <h1>Protected Content</h1>
        <p>Welcome to the protected area of our application!</p>
        <button id="sign-out">Sign out</button>
    </div>
```

Show 31 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <div id="public-content">
        <h1>Welcome to Our App</h1>
        <p>Please sign in to view protected content.</p>
        <button id="sign-in">Sign in</button>
    </div>

    <div id="protected-content" style="display: none;">
        <h1>Protected Content</h1>
        <p>Welcome to the protected area of our application!</p>
        <button id="sign-out">Sign out</button>
    </div>

    <script>
        const publicContent = document.getElementById('public-content');
        const protectedContent = document.getElementById('protected-content');
        const signInButton = document.getElementById('sign-in');
        const signOutButton = document.getElementById('sign-out');

        async function updateUI() {
            if (puter.auth.isSignedIn()) {
                publicContent.style.display = 'none';
                protectedContent.style.display = 'block';
            } else {
                publicContent.style.display = 'block';
                protectedContent.style.display = 'none';
            }
        }

        signInButton.addEventListener('click', async () => {
            await puter.auth.signIn();
            updateUI();
        });

        signOutButton.addEventListener('click', () => {
            puter.auth.signOut();
            updateUI();
        });

        // Check initial auth state
        updateUI();
    </script>
</body>
</html>
```

Collapse code

## Example 4: Combining Auth with Cloud Storage

Here's an example that combines authentication with cloud storage to create a simple personal notes application:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <div id="auth-container">
        <button id="sign-in">Sign in to access your notes</button>
    </div>

    <div id="notes-container" style="display: none;">
        <h2>My Notes</h2>
        <textarea id="note-content" rows="10" cols="50"></textarea>
        <br>
        <button id="save-note">Save Note</button>
        <button id="sign-out">Sign out</button>
    </div>
```

Show 52 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <div id="auth-container">
        <button id="sign-in">Sign in to access your notes</button>
    </div>

    <div id="notes-container" style="display: none;">
        <h2>My Notes</h2>
        <textarea id="note-content" rows="10" cols="50"></textarea>
        <br>
        <button id="save-note">Save Note</button>
        <button id="sign-out">Sign out</button>
    </div>

    <script>
        const authContainer = document.getElementById('auth-container');
        const notesContainer = document.getElementById('notes-container');
        const noteContent = document.getElementById('note-content');
        const saveNoteButton = document.getElementById('save-note');
        const signInButton = document.getElementById('sign-in');
        const signOutButton = document.getElementById('sign-out');

        async function loadNote() {
            try {
                const blob = await puter.fs.read('my-note.txt');
                const text = await blob.text();
                noteContent.value = text;
            } catch (error) {
                // File doesn't exist yet, that's okay
                noteContent.value = '';
            }
        }

        async function saveNote() {
            await puter.fs.write('my-note.txt', noteContent.value);
            alert('Note saved!');
        }

        async function updateUI() {
            if (puter.auth.isSignedIn()) {
                authContainer.style.display = 'none';
                notesContainer.style.display = 'block';
                await loadNote();
            } else {
                authContainer.style.display = 'block';
                notesContainer.style.display = 'none';
            }
        }

        signInButton.addEventListener('click', async () => {
            await puter.auth.signIn();
            updateUI();
        });

        signOutButton.addEventListener('click', () => {
            puter.auth.signOut();
            updateUI();
        });

        saveNoteButton.addEventListener('click', saveNote);

        // Check initial auth state
        updateUI();
    </script>
</body>
</html>
```

Collapse code

## Example 5: Combining Auth with AI

Here's an example that combines authentication with [AI capabilities](/ai/) to create a simple chat application:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <div id="auth-container">
        <button id="sign-in">Sign in to access your chat</button>
    </div>

    <div id="chat-container" style="display: none;">
        <h2>Chat with AI</h2>
        <textarea id="message-input" rows="3" cols="50"></textarea>
        <br>
        <button id="send-message">Send Message</button>
        <button id="sign-out">Sign out</button>
    </div>
```

Show 42 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <div id="auth-container">
        <button id="sign-in">Sign in to access your chat</button>
    </div>

    <div id="chat-container" style="display: none;">
        <h2>Chat with AI</h2>
        <textarea id="message-input" rows="3" cols="50"></textarea>
        <br>
        <button id="send-message">Send Message</button>
        <button id="sign-out">Sign out</button>
    </div>

    <script>
        const authContainer = document.getElementById('auth-container');
        const chatContainer = document.getElementById('chat-container');
        const messageInput = document.getElementById('message-input');
        const sendMessageButton = document.getElementById('send-message');
        const signInButton = document.getElementById('sign-in');
        const signOutButton = document.getElementById('sign-out');

        async function updateUI() {
            if (puter.auth.isSignedIn()) {
                authContainer.style.display = 'none';
                chatContainer.style.display = 'block';
            } else {
                authContainer.style.display = 'block';
                chatContainer.style.display = 'none';
            }
        }

        signInButton.addEventListener('click', async () => {
            await puter.auth.signIn();
            updateUI();
        });

        signOutButton.addEventListener('click', () => {
            puter.auth.signOut();
            updateUI();
        });

        sendMessageButton.addEventListener('click', async () => {
            const message = messageInput.value;
            if (message) {
                const response = await puter.ai.chat(message, { model: "openai/gpt-5.4-nano" });
                messageInput.value = '';
                messageInput.value = response;
            }
        });

        // Check initial auth state 
        updateUI();
    </script>
</body>
</html>
```

Collapse code

That's it! You now have a free and unlimited authentication system using Puter.js. This allows you to add secure user authentication to your web applications without managing servers or worrying about usage limits.

## Best Practices

When implementing authentication in your web applications with Puter.js, always verify the authentication status before displaying protected content. This can be done using the [`isSignedIn()`](https://docs.puter.com/Auth/isSignedIn/) method at key points in your application flow.

Your application should handle authentication errors gracefully and provide clear feedback to users when authentication fails. It's crucial to update your UI immediately after any authentication state changes to maintain a consistent user experience.

Consider building on top of the authentication system by combining it with other Puter.js features. For example, you might use [cloud storage](/object-storage/) to save user preferences or leverage the [AI capabilities](/ai/) to provide personalized experiences for authenticated users.

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Translation API](/tutorials/free-unlimited-translation-api/)
- [Free, Unlimited Sentiment Analysis API](/tutorials/free-unlimited-sentiment-analysis-api/)
- [Free, Unlimited Speech-to-Text API](/tutorials/free-unlimited-speech-to-text-api/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
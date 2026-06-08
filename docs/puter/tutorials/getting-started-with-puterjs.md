# Getting Started with Puter.js

Source: https://developer.puter.com/tutorials/getting-started-with-puterjs/

[Tutorials](/tutorials/)

# Getting Started with Puter.js

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 18, 2026
                                    

On this page[Installation](#installation)[Example 1: Add GPT to your web application](#example-1-add-gpt-to-your-web-application)[Example 2: Add cloud storage to your web application](#example-2-add-cloud-storage-to-your-web-application)[Example 3: Cloud Key-Value Store](#example-3-cloud-key-value-store)[Example 4: Authentication](#example-4-authentication)[Example 5: Text-to-Speech](#example-5-text-to-speech)[Example 6: OCR](#example-6-ocr)[Related](#related)

[Puter.js](https://developer.puter.com) adds serverless auth, cloud, and [AI features](/ai/) directly to your frontend code. From [cloud storage](/object-storage/) and database to OpenAI and Claude APIs, Puter.js has you covered. Sound amazing? well it gets even better, Puter.js is also 100% free for apps and [open-source](https://github.com/heyputer/puter/)!

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate AI capabilities into their applications while users cover their own usage costs. This innovative approach eliminates the need for developers to manage API keys or worry about billing, making advanced AI accessible to everyone.

Additionally, Puter.js is uniquely suited for use by AI coding assistants, agents, and vibe coding platforms like [Codex](/ai/codex/), Claude Code, OpenCode, Cursor, Replit, Lovable, Bolt.new, and more. Due to its user-pays, keyless, and serverless nature, AI-generated apps that use Puter.js work end-to-end without having to sign up for a third-party backend, provision a service, or paste in API keys. This eliminates both a major class of security issues and the setup friction that usually keeps these apps from running out of the box.

This tutorial will guide you through the process of setting up and using Puter.js in your project to access its powerful features. Let's get started!

## Installation

To begin using Puter.js, you can import our [NPM library](https://www.npmjs.com/package/@heyputer/puter.js) in your project:

```javascript
npm install @heyputer/puter.js
```

```js
import { puter } from '@heyputer/puter.js';
```

Or alternatively, add our script via CDN if you are working directly with HTML, simply add it to the `<head>` or `<body>` section of your code:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

That's it! You're now ready to start using Puter.js in your web application. No need to set up servers or configure infrastructures.

## Example 1: Add GPT to your web application

Once you've added the Puter.js script to your web application, a global `puter` object will be available for you to use. This object contains all of the functionality provided by Puter.js. For example, to use [GPT-5.4-nano](/ai/openai/gpt-5.4-nano/), you can call the `puter.ai.chat` function:

```javascript
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(`Why did the chicken cross the road?`, {
            model: 'openai/gpt-5.4-nano',
        }).then(puter.print);
    </script>
</body>
</html>
```

In this example, we're using the [`puter.ai.chat`](https://docs.puter.com/AI/chat/) function to generate text with GPT. The generated text is then printed to the console using the [`puter.print`](https://docs.puter.com/Utils/print/) function. You can replace the input text with any prompt you'd like to generate text for.

## Example 2: Add cloud storage to your web application

Puter is well-known for its AI capabilities, but it is not limited to it. Let's try another example, this time using [cloud storage](/object-storage/) to write and read a file:

```javascript
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function fileDemo() {
            // Write a file
            await puter.fs.write('hello.txt', 'Hello, Puter!');
            puter.print('File written successfully<br>');

            // Read the file
            const fileContent = await puter.fs.read('hello.txt');
            puter.print('File content: ', await fileContent.text(), '<br>');
        }

        fileDemo();
    </script>
</body>
</html>
```

In this example, we're using the [`puter.fs.write`](https://docs.puter.com/FS/write/) function to write a file to the cloud storage. We then use the [`puter.fs.read`](https://docs.puter.com/FS/read/) function to read the file and print its content to the console. You can replace the file name and content with your own data.

## Example 3: Cloud Key-Value Store

Let's use Puter.js to store and retrieve data from the [cloud key-value store](/key-value-database/). In this example, we'll save a user preference to the cloud and then retrieve it:

```javascript
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function kvDemo() {
            // Set a value
            await puter.kv.set('user_preference', 'dark_mode');
            puter.print('Preference saved<br>');

            // Get the value
            const preference = await puter.kv.get('user_preference');
            puter.print('User preference:', preference, '<br>');
        }

        kvDemo();
    </script>
</body>
</html>
```

In this example, we're using the [`puter.kv.set`](https://docs.puter.com/KV/set/) function to save a user preference to the [cloud key-value store](/key-value-database/). We then use the [`puter.kv.get`](https://docs.puter.com/KV/get/) function to retrieve the preference and print it to the console. You can replace the key and value with your own data.

## Example 4: Authentication

Puter.js handles authentication automatically. When your code tries to access any cloud services, the user will be prompted to sign in with their Puter.com account if they haven't already. You can build your app as if the user is already signed in, and Puter.js will handle the authentication process for you when needed.

If you want to explicitly check if a user is signed in or trigger the sign-in process, you can use the following methods:

```javascript
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function authDemo() {
            // Check if user is signed in
            const isSignedIn = puter.auth.isSignedIn();
            puter.print('Is user signed in? ', isSignedIn, '<br>');

            if (!isSignedIn) {
                // Trigger sign-in process
                await puter.auth.signIn();
                puter.print('User signed in successfully<br>');
            }

            // Get user info
            const user = await puter.auth.getUser();
            puter.print('User info:', JSON.stringify(user));
        }

        authDemo();
    </script>
</body>
</html>
```

## Example 5: Text-to-Speech

Puter.js also offers a [text-to-speech API](/text-to-speech/). In this example, we'll use the [`puter.ai.txt2speech()`](https://docs.puter.com/AI/txt2speech/) function to generate speech from text.

```javascript
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <button id="play">Speak with options!</button>
    <script>
        document.getElementById('play').addEventListener('click', ()=>{
            puter.ai.txt2speech(`Hello world! This is using a neural voice.`, {
                voice: "Joanna",
                engine: "neural",
                language: "en-US"
            }).then((audio)=>{
                audio.play();
            });
        });
    </script>
</body>
</html>
```

## Example 6: OCR

Puter.js also offers an OCR API. In this example, we'll use the [`puter.ai.img2txt()`](https://docs.puter.com/AI/img2txt/) function to extract text from an image.

```javascript
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Loading ...
        puter.print(`Loading...`);

        // Extract text from an image
        puter.ai.img2txt('https://cdn.handwrytten.com/www/2020/02/home-hero-photo2%402x.png').then(puter.print);
    </script>
</body>
</html>
```

Puter.js offers many more features, including [hosting static websites](https://docs.puter.com/playground/?example=hosting-create), [generating images with AI](https://docs.puter.com/playground/?example=ai-txt2img), and more. Explore the [Puter.js documentation](https://docs.puter.com/) to discover all the possibilities and start building powerful, serverless web applications with ease! Remember, Puter.js is designed to be simple and straightforward, allowing you to focus on building your application without worrying about backend infrastructure or complex setups. Happy coding!

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
- [How to Run Serverless Functions on Puter](/tutorials/serverless-functions-on-puter/)
- [Puter.js in Next.js: Quick Start Guide](/tutorials/puter-js-next-js/)
- [Puter.js in React: Quick Start Guide](/tutorials/puter-js-react/)
- [Puter.js in Node.js: Quick Start Guide](/tutorials/puter-js-node-js/)
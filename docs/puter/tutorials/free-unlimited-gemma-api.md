# Free, Unlimited Gemma API

Source: https://developer.puter.com/tutorials/free-unlimited-gemma-api/

[Tutorials](/tutorials/)

# Free, Unlimited Gemma API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 8, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Chat with Gemma 4 31B](#example-1-basic-chat-with-gemma-4-31b)[Example 2: Efficient Chat with Gemma 4 26B A4B](#example-2-efficient-chat-with-gemma-4-26b-a4b)[Example 3: Reasoning with Streaming](#example-3-reasoning-with-streaming)[Example 4: Coding Assistance](#example-4-coding-assistance)[List of Supported Gemma Models](#list-of-supported-gemma-models)[Conclusion](#conclusion)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Google's Gemma family of open models](/ai/google/) for free, without any API keys or usage restrictions. Using Puter.js, you can leverage models such as [Gemma 4 31B](/ai/google/gemma-4-31b-it/), [Gemma 4 26B A4B](/ai/google/gemma-4-26b-a4b-it/), [Gemma 3 27B](/ai/google/gemma-3-27b-it/), and more for text generation, reasoning, coding, and multimodal tasks.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate AI capabilities into their applications while each user covers their own usage costs. This model enables developers to [access advanced AI capabilities](/ai/) for free, without any API keys or server-side setup.

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

Nothing else is required to start using Puter.js for free access to Gemma models and capabilities.

## Example 1: Basic Chat with Gemma 4 31B

[Gemma 4 31B](/ai/google/gemma-4-31b-it/) is Google's most capable open model, built on the same research foundation as Gemini 3. It accepts text, image, and video input with a 256K-token context window.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain the concept of neural networks in simple terms", {
            model: 'google/gemma-4-31b-it'
        }).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

Using the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function, you can generate text using Gemma 4 31B, which ranks as the #3 open model globally on the Arena AI text leaderboard.

## Example 2: Efficient Chat with Gemma 4 26B A4B

[Gemma 4 26B A4B](/ai/google/gemma-4-26b-a4b-it/) is a Mixture-of-Experts model with 26B total parameters but only 3.8B active per forward pass, delivering near-31B quality at a fraction of the compute cost.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("What are the key differences between REST and GraphQL APIs?", {
            model: 'google/gemma-4-26b-a4b-it'
        }).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 3: Reasoning with Streaming

Gemma 4 31B features configurable chain-of-thought reasoning. Use streaming to get results in real-time:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                "A farmer has 17 sheep. All but 9 run away. How many sheep does the farmer have left? Think step by step.",
                {
                    model: 'google/gemma-4-31b-it',
                    stream: true
                }
            );

            for await (const part of response) {
                if (part?.reasoning) puter.print(part?.reasoning);
                else puter.print(part?.text);
            }
        }

        streamResponse();
    </script>
</body>
</html>
```

## Example 4: Coding Assistance

Gemma 4 31B scores 80.0% on LiveCodeBench v6, making it well-suited for coding tasks:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a JavaScript function that debounces another function, with support for leading and trailing edge invocation.",
            { model: 'google/gemma-4-31b-it' }
        ).then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## List of Supported Gemma Models

The following Gemma models are supported by Puter.js:

```javascript
google/gemma-4-31b-it
google/gemma-4-26b-a4b-it
google/gemma-3-27b-it
google/gemma-3-12b-it
google/gemma-3-4b-it
google/gemma-3n-e4b-it
google/gemma-2-27b-it
```

## Conclusion

Using Puter.js, you can access Google's powerful Gemma open models without needing an API key or a backend. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited Google AI API](/tutorials/free-unlimited-google-ai-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited Nano Banana (Gemini 3 Pro and 2.5 Flash Image) API](/tutorials/free-unlimited-nano-banana-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited Qwen API](/tutorials/free-unlimited-qwen-api/)
- [Free, Unlimited Mistral API](/tutorials/free-unlimited-mistral-api/)
- [Free, Unlimited IBM Granite API](/tutorials/free-unlimited-ibm-granite-api/)
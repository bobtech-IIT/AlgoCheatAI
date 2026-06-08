# Free, Unlimited Microsoft Phi API

Source: https://developer.puter.com/tutorials/free-unlimited-microsoft-phi-api/

[Tutorials](/tutorials/)

# Free, Unlimited Microsoft Phi API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 6, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Chat](#example-1-basic-chat)[Example 2: Lightweight Inference with Phi 4 Mini Instruct](#example-2-lightweight-inference-with-phi-4-mini-instruct)[Example 3: Streaming Response](#example-3-streaming-response)[List of Supported Microsoft Models](#list-of-supported-microsoft-models)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Microsoft's powerful Phi AI models](/ai/microsoft/) for free. Using Puter.js, you can leverage models like [Phi 4](/ai/microsoft/phi-4/) without any API keys or usage restrictions.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to add AI capabilities to their applications while users cover their own usage costs. This model enables developers to [access advanced AI features](/ai/) for free, without any API keys or server-side setup.

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

You're now ready to use Puter.js to Microsoft Phi capabilities. No API keys or sign-ups are required.

## Example 1: Basic Chat

Here's a simple example showing how to generate text using Microsoft Phi 4:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain the concept of machine learning in simple terms", {
            model: 'microsoft/phi-4'
        }).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

Using the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function, you can generate text using Microsoft Phi 4, which provides excellent performance for general conversational tasks and reasoning.

## Example 2: Lightweight Inference with Phi 4 Mini Instruct

Phi 4 Mini Instruct is a 3.8B parameter small language model. Its compact size means lower latency and reduced compute requirements, making it a good fit for high-throughput tasks and on-the-fly responses:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Summarize the key differences between supervised and unsupervised learning", {
            model: 'microsoft/phi-4-mini-instruct'
        }).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 3: Streaming Response

For longer responses, use streaming to get results in real-time:

```html
<html>
<body>
    <div id="output"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const outputDiv = document.getElementById('output');

            const response = await puter.ai.chat(
                "Explain the theory of relativity and its implications for space travel",
                {
                    model: 'microsoft/phi-4',
                    stream: true
                }
            );

            for await (const part of response) {
                if (part?.text) {
                    outputDiv.innerHTML += part.text.replaceAll('\n', '<br>');
                }
            }
        }

        streamResponse();
    </script>
</body>
</html>
```

## List of Supported Microsoft Models

The following Microsoft models are supported by Puter.js:

```javascript
microsoft/phi-4-mini-instruct
microsoft/phi-4
microsoft/wizardlm-2-8x22b
```

That's it! You now have free access to Microsoft's powerful Phi model using Puter.js. This allows you to add sophisticated AI capabilities to your web applications without worrying about API keys or usage limits.

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited Amazon Nova API](/tutorials/free-unlimited-amazon-nova-api/)
- [Free, Unlimited NVIDIA Nemotron API](/tutorials/free-unlimited-nvidia-nemotron-api/)
- [Free, Unlimited IBM Granite API](/tutorials/free-unlimited-ibm-granite-api/)
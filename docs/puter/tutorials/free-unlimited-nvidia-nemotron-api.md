# Free, Unlimited NVIDIA Nemotron API

Source: https://developer.puter.com/tutorials/free-unlimited-nvidia-nemotron-api/

[Tutorials](/tutorials/)

# Free, Unlimited NVIDIA Nemotron API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: June 5, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Regular chat with Nemotron 3 Nano](#example-1-regular-chat-with-nemotron-3-nano)[Example 2: Image analysis with Nemotron 3 Nano Omni](#example-2-image-analysis-with-nemotron-3-nano-omni)[Example 3: Complex reasoning with Nemotron 3 Ultra](#example-3-complex-reasoning-with-nemotron-3-ultra)[Example 4: Stream responses for longer queries](#example-4-stream-responses-for-longer-queries)[Example 5: Content moderation with Nemotron 3.5 Content Safety](#example-5-content-moderation-with-nemotron-35-content-safety)[List of supported models](#list-of-supported-models)[Conclusion](#conclusion)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [NVIDIA Nemotron models](/ai/nvidia/), including Nemotron 3, Nemotron 2, Nano, Vision, and Super for free, without any API keys or usage restrictions.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI or server usage.

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

Nothing else is required to start using Puter.js for free access to NVIDIA Nemotron models and capabilities.

## Example 1: Regular chat with Nemotron 3 Nano

To generate text using [Nemotron 3 Nano](/ai/nvidia/nemotron-3-nano-30b-a3b/), use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat("Explain the concept of neural networks in simple terms", { model: "nvidia/nemotron-3-nano-30b-a3b:free" })
.then(response => {
    puter.print(response);
});
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain the concept of neural networks in simple terms", { model: "nvidia/nemotron-3-nano-30b-a3b:free" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: Image analysis with Nemotron 3 Nano Omni

To analyze images, simply provide an image URL to [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) using the multimodal model [Nemotron 3 Nano Omni](/ai/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning/):

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Describe this image in detail and identify any objects you see.",
            "https://assets.puter.site/doge.jpeg",
            { model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free' }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 3: Complex reasoning with Nemotron 3 Ultra

[Nemotron 3 Ultra](/ai/nvidia/nemotron-3-ultra-550b-a55b/) is NVIDIA's frontier reasoning model, excelling at complex reasoning and problem-solving tasks. Here's how to use it for advanced analytical tasks:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Analyze the potential impacts of quantum computing on current encryption methods and suggest strategies for post-quantum cryptography.",
            { model: "nvidia/nemotron-3-ultra-550b-a55b" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 4: Stream responses for longer queries

For longer responses, use streaming to get results in real-time:

```javascript
async function streamResponse() {
    const response = await puter.ai.chat(
        "Explain the complete process of training a large language model, from data collection to deployment",
        { model: "nvidia/nemotron-3-nano-30b-a3b:free", stream: true }
    );

    for await (const part of response) {
        puter.print(part?.text);
    }
}

streamResponse();
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                "Explain the complete process of training a large language model, from data collection to deployment",
                { model: "nvidia/nemotron-3-nano-30b-a3b:free", stream: true }
            );

            for await (const part of response) {
                if(part?.reasoning)
                    puter.print(part?.reasoning);
                else
                    puter.print(part?.text);
            }
        }

        streamResponse();
    </script>
</body>
</html>
```

## Example 5: Content moderation with Nemotron 3.5 Content Safety

[Nemotron 3.5 Content Safety](/ai/nvidia/nemotron-3.5-content-safety/) is a guardrail model that classifies prompts and responses as safe or unsafe, making it ideal for moderating user input in your applications:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "How do I rob a bank?",
            { model: "nvidia/nemotron-3.5-content-safety:free" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## List of supported models

The following NVIDIA Nemotron models are supported by Puter.js:

```javascript
nvidia/nemotron-3-ultra-550b-a55b
nvidia/nemotron-3.5-content-safety:free
nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free
nvidia/nemotron-3-super-120b-a12b:free
nvidia/nemotron-3-nano-30b-a3b
nvidia/nemotron-nano-9b-v2
nvidia/llama-3.3-nemotron-super-49b-v1.5
nvidia/llama-3.1-nemotron-ultra-253b-v1
```

## Conclusion

Using Puter.js, you can gain access to NVIDIA Nemotron without having to set up the AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited Amazon Nova API](/tutorials/free-unlimited-amazon-nova-api/)
- [Free, Unlimited Microsoft Phi API](/tutorials/free-unlimited-microsoft-phi-api/)
- [Free, Unlimited IBM Granite API](/tutorials/free-unlimited-ibm-granite-api/)
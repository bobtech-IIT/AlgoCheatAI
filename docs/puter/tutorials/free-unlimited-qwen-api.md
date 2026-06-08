# Free, Unlimited Qwen API

Source: https://developer.puter.com/tutorials/free-unlimited-qwen-api/

[Tutorials](/tutorials/)

# Free, Unlimited Qwen API

[Nariman Jelveh](/author/jelveh/), [Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: June 4, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Use Qwen3.7 Plus for conversational AI](#example-1-use-qwen37-plus-for-conversational-ai)[Example 2: Efficient Chat with Qwen3.6 Flash](#example-2-efficient-chat-with-qwen36-flash)[Example 3: Write code with Qwen3.6 Max Preview](#example-3-write-code-with-qwen36-max-preview)[Example 4: Complex Reasoning](#example-4-complex-reasoning)[Example 5: Image Analysis](#example-5-image-analysis)[Example 6: Image Generation with Qwen Image 2.0](#example-6-image-generation-with-qwen-image-20)[List of supported models](#list-of-supported-models)[Conclusion](#conclusion)[Related Resources](#related-resources)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access all [Qwen](/ai/qwen/) family modelsâfrom general chat to instructionâtuned, vision and code modelsâcompletely free, without any API keys or usage restrictions.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate AI capabilities into their applications while each user will cover their own usage costs. This model enables developers to [access advanced AI capabilities](/ai/) for free, without any API keys or server-side setup.

The unique architecture of Puter.js makes it exceptionally well suited for AI coding assistants, agents, and vibe coding platforms to build on top of. Since with Puter.js apps and websites there are no keys and no backend involved, they will run end-to-end as soon as they are generated. No third-party signup, no service to spin up, no API keys to paste. That cuts out a whole category of security pitfalls and the configuration overhead that normally stops AI-generated apps from working on the first run.

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

Nothing else is required to start using Puter.js for free access to Qwen models and capabilities.

## Example 1: Use Qwen3.7 Plus for conversational AI

To generate text using [Qwen3.7 Plus](/ai/qwen/qwen3.7-plus/), use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat("Tell me a fun trivia fact about space.", { model: "qwen/qwen3.7-plus" })
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
        puter.ai.chat("Tell me a fun trivia fact about space.", { model: "qwen/qwen3.7-plus" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: Efficient Chat with Qwen3.6 Flash

For high-throughput, low-latency workloads like classification, extraction, and summarization, use a speed-optimized model such as [Qwen3.6 Flash](/ai/qwen/qwen3.6-flash/):

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Summarize the key benefits of using a CDN in one paragraph.", {
            model: 'qwen/qwen3.6-flash'
        }).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 3: Write code with Qwen3.6 Max Preview

To write code using [Qwen3.6 Max Preview](/ai/qwen/qwen3.6-max-preview/), use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a simple JavaScript function that calculates the sum of two numbers.",
            { model: "qwen/qwen3.6-max-preview" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Example 4: Complex Reasoning

For complex reasoning, use [Qwen3.7 Max](/ai/qwen/qwen3.7-max/) with streaming to see step-by-step reasoning in real-time:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                "Explain quantum computing in detail",
                { model: "qwen/qwen3.7-max", stream: true }
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

## Example 5: Image Analysis

To analyze images, simply provide an image URL to [`puter.ai.chat()`](https://docs.puter.com/AI/chat/):

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "What do you see in this image?",
            "https://assets.puter.site/doge.jpeg",
            { model: 'qwen/qwen3.7-plus' }
        ).then(response => {
            document.write(response);
        });
    </script>
</body>
</html>
```

## Example 6: Image Generation with Qwen Image 2.0

To generate images from text, use [Qwen Image 2.0](/ai/qwen/qwen-image-2.0/) with the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function. The model is particularly strong at rendering accurate text within images, making it ideal for posters and design-heavy visuals:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A retro travel poster for Mars with bold typography reading 'Visit Mars' and 'The Red Frontier â 2099' at the bottom",
            { model: "qwen/qwen-image-2.0" }
        ).then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## List of supported models

The following Qwen models are supported by Puter.js:

```javascript
qwen/qwen3.7-plus
qwen/qwen3.7-max
qwen/qwen3.6-max-preview
qwen/qwen3.6-plus
qwen/qwen3.6-flash
qwen/qwen3.6-27b
qwen/qwen3.6-35b-a3b
qwen/qwen3.5-plus
qwen/qwen3.5-plus-20260420
qwen/qwen3.5-122b-a10b
qwen/qwen3.5-27b
qwen/qwen3.5-35b-a3b
qwen/qwen3.5-flash-02-23
qwen/qwen3.5-397b-a17b
qwen/qwen3.5-plus-02-15
```

Show 49 more lines...

```javascript
qwen/qwen3.7-plus
qwen/qwen3.7-max
qwen/qwen3.6-max-preview
qwen/qwen3.6-plus
qwen/qwen3.6-flash
qwen/qwen3.6-27b
qwen/qwen3.6-35b-a3b
qwen/qwen3.5-plus
qwen/qwen3.5-plus-20260420
qwen/qwen3.5-122b-a10b
qwen/qwen3.5-27b
qwen/qwen3.5-35b-a3b
qwen/qwen3.5-flash-02-23
qwen/qwen3.5-397b-a17b
qwen/qwen3.5-plus-02-15
qwen/qwen3-max-thinking
qwen/qwen3-coder-next
qwen/qwen3-next-80b-a3b-instruct
qwen/qwen3-next-80b-a3b-thinking
qwen/qwen-plus-2025-07-28
qwen/qwen-plus-2025-07-28:thinking
qwen/qwen3-235b-a22b-2507
qwen/qwen3-235b-a22b-thinking-2507
qwen/qwen3-30b-a3b-instruct-2507
qwen/qwen3-30b-a3b-thinking-2507
qwen/qwen3-coder-480b-a35b-instruct
qwen/qwen3-coder-30b-a3b-instruct
qwen/qwen3-coder-flash
qwen/qwen3-coder-plus
qwen/qwen3-vl-235b-a22b
qwen/qwen3-vl-235b-a22b-thinking
qwen/qwen3-vl-30b-a3b
qwen/qwen3-vl-30b-a3b-instruct
qwen/qwen3-vl-30b-a3b-thinking
qwen/qwen3-vl-8b-thinking
qwen/qwen3-vl-plus
qwen/qwen3-omni-flash
qwen/qwen3-max
qwen/qwen3-14b
qwen/qwen3-235b-a22b
qwen/qwen3-32b
qwen/qwen3-8b
qwen/qwen-max
qwen/qwen-plus
qwen/qwen-flash
qwen/qwen-turbo
qwen/qwen-vl-max
qwen/qwen-vl-plus
qwen/qwen-vl-ocr
qwen/qvq-max
qwen/qwen-omni-turbo
qwen/qwen-mt-plus
qwen/qwen-mt-turbo
qwen/qwq-plus
qwen/qwen-image
qwen/qwen-image-2.0
qwen/qwen-image-2.0-pro
qwen/qwen-2.5-coder-32b-instruct
qwen/qwen2-5-72b-instruct
qwen/qwen2-5-32b-instruct
qwen/qwen2-5-14b-instruct
qwen/qwen2-5-7b-instruct
qwen/qwen2-5-vl-72b-instruct
qwen/qwen2-5-omni-7b
```

Collapse code

## Conclusion

Using Puter.js, you can access Qwen model capabilities without needing an API key or a backend. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related Resources

- [Free, Unlimited Alibaba AI API](/tutorials/free-unlimited-alibaba-ai-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemma API](/tutorials/free-unlimited-gemma-api/)
- [Free, Unlimited Mistral API](/tutorials/free-unlimited-mistral-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Kwaipilot Kat API](/tutorials/free-unlimited-kwaipilot-kat-api/)
- [Free, Unlimited MiniMax API](/tutorials/free-unlimited-minimax-api/)
- [Free, Unlimited Moonshot AI API](/tutorials/free-unlimited-moonshot-ai-api/)
- [Free, Unlimited Xiaomi MiMo API](/tutorials/free-unlimited-xiaomi-mimo-api/)
- [Free, Unlimited Grok API](/tutorials/free-unlimited-grok-api/)
- [Free, Unlimited ByteDance Seed API](/tutorials/free-unlimited-bytedance-seed-api/)
- [Free, Unlimited Tencent Hunyuan API](/tutorials/free-unlimited-tencent-hunyuan-api/)
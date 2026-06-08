# Free, Unlimited Z.AI GLM API

Source: https://developer.puter.com/tutorials/free-unlimited-zai-glm-api/

[Tutorials](/tutorials/)

# Free, Unlimited Z.AI GLM API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 20, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Use GLM 5.1 for conversational AI](#example-1-use-glm-51-for-conversational-ai)[Example 2: High-speed inference with GLM 5 Turbo](#example-2-high-speed-inference-with-glm-5-turbo)[Example 3: Cost-efficient chat with GLM 4.7 Flash](#example-3-cost-efficient-chat-with-glm-47-flash)[Example 4: Code generation with GLM 5.1](#example-4-code-generation-with-glm-51)[Example 5: Chinese language support with GLM 5.1](#example-5-chinese-language-support-with-glm-51)[Example 6: Image analysis with GLM 4.6V Flash](#example-6-image-analysis-with-glm-46v-flash)[Example 7: Stream responses for longer queries](#example-7-stream-responses-for-longer-queries)[List of supported models](#list-of-supported-models)[Conclusion](#conclusion)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access Z.AI GLM models, including [GLM 5.1](/ai/z-ai/glm-5.1/), [GLM 5 Turbo](/ai/z-ai/glm-5-turbo/), [GLM 5](/ai/z-ai/glm-5/), [GLM 4.7](/ai/z-ai/glm-4.7/), [GLM 4.7 Flash](/ai/z-ai/glm-4.7-flash/), and other Z.AI models completely free, without any API keys or usage restrictions.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate AI capabilities into their applications with each user covering their own usage costs. This model enables developers to [access advanced AI capabilities](/ai/) for free, without any API keys or server-side setup.

Puter.js is also uniquely suited for AI coding assistants, agents, and vibe coding platforms like [Codex](/ai/codex/), Claude Code, OpenCode, Replit, Lovable, and Bolt.new. Because it needs no keys and no server, the GLM-powered apps these tools generate work end-to-end right away, with nothing to provision, no backend signup, and no API keys to paste in. This eliminates both a major class of security issues and the setup friction that usually keeps generated apps from running out of the box.

## Getting Started

To use Puter.js, import our [NPM library](https://www.npmjs.com/package/@heyputer/puter.js) in your project:

```js
// npm install @heyputer/puter.js
import { puter } from '@heyputer/puter.js';
```

Or, add our script via CDN if you are working directly with HTML, simply add it to the `<head>` or `<body>` section of your code:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

Nothing else is required to start using Puter.js for free access to Z.AI GLM models and capabilities.

## Example 1: Use GLM 5.1 for conversational AI

To generate text using GLM 5.1, use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat("Explain the concept of quantum computing in simple terms", { model: "z-ai/glm-5.1" })
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
        puter.ai.chat("Explain the concept of quantum computing in simple terms", { model: "z-ai/glm-5.1" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: High-speed inference with GLM 5 Turbo

GLM 5 Turbo is a high-speed variant of GLM 5, optimized for fast inference and agent-driven workflows. It excels at tool invocation, complex instruction decomposition, and long-chain task execution:

```javascript
puter.ai.chat(
    "Break down the steps to build a REST API with authentication and rate limiting",
    { model: "z-ai/glm-5-turbo" }
)
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
        puter.ai.chat(
            "Break down the steps to build a REST API with authentication and rate limiting",
            { model: "z-ai/glm-5-turbo" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 3: Cost-efficient chat with GLM 4.7 Flash

For cost-efficient conversational AI, use GLM 4.7 Flash with the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat(
    "What are the key differences between machine learning and deep learning?",
    { model: "z-ai/glm-4.7-flash" }
)
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
        puter.ai.chat(
            "What are the key differences between machine learning and deep learning?",
            { model: "z-ai/glm-4.7-flash" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 4: Code generation with GLM 5.1

GLM 5.1 excels at code generation tasks. Here's how to use it for writing code:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a Python function that implements binary search on a sorted array",
            { model: "z-ai/glm-5.1" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Example 5: Chinese language support with GLM 5.1

GLM 5.1 has excellent Chinese language support, making it ideal for multilingual applications:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "è¯·è§£éä¸ä¸äººå·¥æºè½å¨å»çé¢åçåºç¨åæ¯",
            { model: "z-ai/glm-5.1" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

This example demonstrates GLM 5.1's ability to understand and respond in Chinese, making it perfect for applications targeting Chinese-speaking users or requiring multilingual support.

## Example 6: Image analysis with GLM 4.6V Flash

GLM 4.6V Flash is a vision-language model that can analyze images and provide insights:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <img src="https://assets.puter.site/doge.jpeg" style="display:block; max-width: 300px; margin-bottom: 20px;">
    <script>
        puter.ai.chat(
            "What do you see in this image?",
            "https://assets.puter.site/doge.jpeg",
            { model: "z-ai/glm-4.6v-flash" }
        )
        .then(response => {
            puter.print(response.message.content);
        });
    </script>
</body>
</html>
```

## Example 7: Stream responses for longer queries

For longer responses, use streaming to get results in real-time:

```javascript
async function streamResponse() {
    const response = await puter.ai.chat(
        "Debug this logic: If I have 3 apples and give away 5, how many do I have?",
        { model: "z-ai/glm-5.1", stream: true }
    );

    for await (const part of response) {
        if (part?.reasoning) puter.print(part?.reasoning);
        else puter.print(part?.text);
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
                "Debug this logic: If I have 3 apples and give away 5, how many do I have?",
                { model: "z-ai/glm-5.1", stream: true }
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

## List of supported models

The following Z.AI GLM models are supported by Puter.js:

```javascript
z-ai/glm-5.1
z-ai/glm-5-turbo
z-ai/glm-5
z-ai/glm-4.7-flashx
z-ai/glm-4.7-flash
z-ai/glm-4.7
z-ai/glm-4.6v-flashx
z-ai/glm-4.6v-flash
z-ai/glm-4.6
z-ai/glm-4.5-x
z-ai/glm-4.5-airx
z-ai/glm-4.5-flash
z-ai/glm-4.5
z-ai/glm-4.5-air
z-ai/glm-4.5-air:free
z-ai/glm-4-32b-0414-128k
z-ai/glm-4-32b
z-ai/autoglm-phone-multilingual
```

## Conclusion

Using Puter.js, you can access Z.AI GLM models without needing an API key or a backend. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Mistral API](/tutorials/free-unlimited-mistral-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited MiniMax API](/tutorials/free-unlimited-minimax-api/)
- [Free, Unlimited Qwen API](/tutorials/free-unlimited-qwen-api/)
- [Free, Unlimited Alibaba AI API](/tutorials/free-unlimited-alibaba-ai-api/)
- [Free, Unlimited Kimi K2.6 API](/tutorials/free-unlimited-kimi-k2-api/)
- [Free, Unlimited Moonshot AI API](/tutorials/free-unlimited-moonshot-ai-api/)
- [Free, Unlimited Kwaipilot Kat API](/tutorials/free-unlimited-kwaipilot-kat-api/)
- [Free, Unlimited ByteDance Seed API](/tutorials/free-unlimited-bytedance-seed-api/)
- [Free, Unlimited Tencent Hunyuan API](/tutorials/free-unlimited-tencent-hunyuan-api/)
- [Free, Unlimited Upstage Solar API](/tutorials/free-unlimited-upstage-solar-api/)
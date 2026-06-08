# Free, Unlimited Xiaomi MiMo API

Source: https://developer.puter.com/tutorials/free-unlimited-xiaomi-mimo-api/

[Tutorials](/tutorials/)

# Free, Unlimited Xiaomi MiMo API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 23, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Code Generation](#example-1-code-generation)[Example 2: Agentic Reasoning with MiMo-V2.5-Pro](#example-2-agentic-reasoning-with-mimo-v25-pro)[Example 3: Image Analysis with MiMo-V2.5](#example-3-image-analysis-with-mimo-v25)[List of Xiaomi MiMo models](#list-of-xiaomi-mimo-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you will learn how to add Xiaomi MiMo models into your application for free using Puter.js. The MiMo family includes [MiMo-V2.5](/ai/xiaomi/mimo-v2.5/), [MiMo-V2.5-Pro](/ai/xiaomi/mimo-v2.5-pro/), and [MiMo-V2-Flash](/ai/xiaomi/mimo-v2-flash/).

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

That's it, you're ready to start integrating Xiaomi MiMo into your application.

## Example 1: Code Generation

MiMo-V2.5 is a cost-efficient omnimodal model with a 1M-token context window, delivering strong agentic performance at roughly half the token cost of the flagship tier.

```javascript
puter.ai.chat(
    "Write a TypeScript function that implements a rate limiter using the sliding window algorithm. Include type definitions and comments.",
    { model: "xiaomi/mimo-v2.5" }
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
            "Write a TypeScript function that implements a rate limiter using the sliding window algorithm. Include type definitions and comments.",
            { model: "xiaomi/mimo-v2.5" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 2: Agentic Reasoning with MiMo-V2.5-Pro

MiMo-V2.5-Pro is Xiaomi's flagship model, built for complex software engineering and long-horizon agentic workflows spanning over a thousand tool calls, with a 1M-token context window.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                `You are a senior backend engineer. I have a REST API with the following endpoints:
                - POST /users (create user)
                - GET /users/:id (get user)
                - PUT /users/:id (update user)
                - DELETE /users/:id (delete user)

                Design a comprehensive migration plan to convert this to GraphQL, including:
                1. Schema definitions with types, queries, and mutations
                2. A phased rollout strategy that maintains backward compatibility
                3. Resolver implementation patterns with DataLoader for N+1 prevention
                4. Testing and monitoring approach for each phase`,
                { model: "xiaomi/mimo-v2.5-pro", stream: true }
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

## Example 3: Image Analysis with MiMo-V2.5

MiMo-V2.5 natively processes text, image, video, and audio within a unified architecture, making it ideal for multimodal tasks. It scores 81.0 on CharXiv RQ, 77.9 on MMMU-Pro, and 87.7 on Video-MME.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <img src="https://assets.puter.site/doge.jpeg" id="image">
    <script>
        puter.ai.chat(
            "What do you see in this image? Describe it in detail.",
            "https://assets.puter.site/doge.jpeg",
            { model: 'xiaomi/mimo-v2.5' }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## List of Xiaomi MiMo models

You can use the following Xiaomi MiMo models with Puter.js:

```javascript
xiaomi/mimo-v2-flash
xiaomi/mimo-v2.5
xiaomi/mimo-v2.5-pro
```

## Conclusion

Using Puter.js, you can gain access to Xiaomi MiMo models without having to set up the AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited MiniMax API](/tutorials/free-unlimited-minimax-api/)
- [Free, Unlimited Qwen API](/tutorials/free-unlimited-qwen-api/)
- [Free, Unlimited Alibaba AI API](/tutorials/free-unlimited-alibaba-ai-api/)
- [Free, Unlimited Kimi K2.6 API](/tutorials/free-unlimited-kimi-k2-api/)
- [Free, Unlimited Moonshot AI API](/tutorials/free-unlimited-moonshot-ai-api/)
- [Free, Unlimited Kwaipilot Kat API](/tutorials/free-unlimited-kwaipilot-kat-api/)
- [Free, Unlimited Tencent Hunyuan API](/tutorials/free-unlimited-tencent-hunyuan-api/)
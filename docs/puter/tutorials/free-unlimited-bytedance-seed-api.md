# Free, Unlimited ByteDance Seed API

Source: https://developer.puter.com/tutorials/free-unlimited-bytedance-seed-api/

[Tutorials](/tutorials/)

# Free, Unlimited ByteDance Seed API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: March 11, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Chat](#example-1-basic-chat)[Example 2: Fast and Efficient Chat](#example-2-fast-and-efficient-chat)[Example 3: Deep Thinking](#example-3-deep-thinking)[Example 4: Image Analysis](#example-4-image-analysis)[List of ByteDance Seed models](#list-of-bytedance-seed-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you will learn how to add [ByteDance Seed models](/ai/bytedance-seed/) into your application for free using Puter.js. You can gain access to models such as [Seed 2.0 Lite](/ai/bytedance-seed/seed-2.0-lite/), [Seed 2.0 Mini](/ai/bytedance-seed/seed-2.0-mini/), [Seed 1.6](/ai/bytedance-seed/seed-1.6/) and [Seed 1.6 Flash](/ai/bytedance-seed/seed-1.6-flash/) by ByteDance without having to set up the AI server yourself.

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

That's it, you're ready to start integrating ByteDance Seed into your application.

## Example 1: Basic Chat

Use ByteDance Seed 1.6 for general purpose chat and conversation.

```javascript
puter.ai.chat("Explain the concept of quantum computing in simple terms", { model: "bytedance-seed/seed-1.6" })
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
        puter.ai.chat("Explain the concept of quantum computing in simple terms", { model: "bytedance-seed/seed-1.6" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: Fast and Efficient Chat

ByteDance Seed 2.0 Mini is an ultra-fast and cost efficient model.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                "Debug this logic: If I have 3 apples and give away 5, how many do I have?",
                { model: "bytedance-seed/seed-2.0-mini", stream: true }
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

## Example 3: Deep Thinking

ByteDance Seed 1.6 also excels at deep thinking and complex reasoning tasks.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                "Debug this logic: If I have 3 apples and give away 5, how many do I have?",
                { model: "bytedance-seed/seed-1.6", stream: true }
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

## Example 4: Image Analysis

You can use ByteDance Seed 1.6 Flash to perform analysis of a given image.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "What do you see in this image?",
            "https://assets.puter.site/doge.jpeg",
            { model: 'bytedance-seed/seed-1.6-flash' }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## List of ByteDance Seed models

You can use the following ByteDance Seed models with Puter.js:

```javascript
bytedance-seed/seed-2.0-lite
bytedance-seed/seed-2.0-mini
bytedance-seed/seed-1.6
bytedance-seed/seed-1.6-flash
```

## Conclusion

Using Puter.js, you can gain access to ByteDance Seed models without having to set up the AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Qwen API](/tutorials/free-unlimited-qwen-api/)
- [Free, Unlimited Alibaba AI API](/tutorials/free-unlimited-alibaba-ai-api/)
- [Free, Unlimited Z.AI GLM API](/tutorials/free-unlimited-zai-glm-api/)
- [Free, Unlimited Tencent Hunyuan API](/tutorials/free-unlimited-tencent-hunyuan-api/)
- [Free, Unlimited Baidu AI API](/tutorials/free-unlimited-baidu-ernie-api/)
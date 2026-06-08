# Free, Unlimited Tencent Hunyuan API

Source: https://developer.puter.com/tutorials/free-unlimited-tencent-hunyuan-api/

[Tutorials](/tutorials/)

# Free, Unlimited Tencent Hunyuan API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 12, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic chat with Hunyuan A13B Instruct](#example-1-basic-chat-with-hunyuan-a13b-instruct)[Example 2: Math and reasoning](#example-2-math-and-reasoning)[Example 3: Streaming long-form responses](#example-3-streaming-long-form-responses)[Example 4: Code generation with Hy 3 Preview](#example-4-code-generation-with-hy-3-preview)[List of supported models](#list-of-supported-models)[Conclusion](#conclusion)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access Tencent's Hunyuan models â [Hunyuan A13B Instruct](/ai/tencent/hunyuan-a13b-instruct/) and [Hy 3 Preview](/ai/tencent/hy3-preview/) â for free, without needing API keys, a backend, or any server-side setup.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate [AI capabilities](/ai/) into their applications while each user covers their own usage costs. This model enables developers to offer advanced AI capabilities to users at no cost to themselves, without any API keys or server-side setup.

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

Nothing else is required to start using Puter.js for free access to Tencent's Hunyuan models.

## Example 1: Basic chat with Hunyuan A13B Instruct

To generate text using [Hunyuan A13B Instruct](/ai/tencent/hunyuan-a13b-instruct/), use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat(
    "Explain the concept of Mixture-of-Experts in large language models in simple terms.",
    { model: "tencent/hunyuan-a13b-instruct" }
).then(response => {
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
            "Explain the concept of Mixture-of-Experts in large language models in simple terms.",
            { model: "tencent/hunyuan-a13b-instruct" }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 2: Math and reasoning

Hunyuan A13B is particularly strong on math and reasoning benchmarks â it scores 87.3 on AIME 2024 and 84.7 on ZebraLogic, putting it in the same tier as OpenAI o1 and DeepSeek R1. Use it for step-by-step problem solving:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "A train leaves Station A at 9:00 AM traveling at 60 mph. Another train leaves Station B at 10:00 AM traveling toward Station A at 80 mph. The stations are 280 miles apart. At what time do the trains meet? Show your reasoning step by step.",
            { model: "tencent/hunyuan-a13b-instruct" }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 3: Streaming long-form responses

Hunyuan A13B natively supports a 256K-token context window, so it can produce lengthy, detailed answers. Stream the response back so users see output as it's generated rather than waiting for the full reply:

```html
<html>
<body>
    <div id="response"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const outputDiv = document.getElementById('response');

            const response = await puter.ai.chat(
                "Write a detailed technical breakdown of how Mixture-of-Experts architectures route tokens to experts, the role of the gating network, and the trade-offs versus dense transformers.",
                { model: "tencent/hunyuan-a13b-instruct", stream: true }
            );

            for await (const part of response) {
                if (part?.text) {
                    outputDiv.innerHTML += part.text;
                }
            }
        }

        streamResponse();
    </script>
</body>
</html>
```

## Example 4: Code generation with Hy 3 Preview

For coding tasks, switch to [Hy 3 Preview](/ai/tencent/hy3-preview/) â Tencent's 295B MoE model that scores 74.4% on SWE-bench Verified, matching frontier models on real-world bug fixing at a fraction of the cost. Pass `tencent/hy3-preview` as the model to handle longer, more involved coding work like refactors, multi-file changes, or non-trivial algorithm design:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a TypeScript implementation of a rate limiter using the token bucket algorithm. Support per-key buckets, configurable refill rate and capacity, and an async `acquire(key, tokens)` method that resolves when tokens are available. Include JSDoc comments and a short usage example.",
            { model: "tencent/hy3-preview" }
        ).then(response => {
            puter.print(response, { code: true });
        });
    </script>
</body>
</html>
```

## List of supported models

The following Tencent Hunyuan models are supported by Puter.js under the `tencent/` namespace:

```javascript
tencent/hunyuan-a13b-instruct
tencent/hy3-preview
```

## Conclusion

Using Puter.js, you can access Tencent's Hunyuan models without needing an API key or a backend. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful reasoning, agentic, and long-context applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited Baidu AI API](/tutorials/free-unlimited-baidu-ernie-api/)
- [Free, Unlimited Alibaba AI API](/tutorials/free-unlimited-alibaba-ai-api/)
- [Free, Unlimited Qwen API](/tutorials/free-unlimited-qwen-api/)
- [Free, Unlimited Z.AI GLM API](/tutorials/free-unlimited-zai-glm-api/)
- [Free, Unlimited ByteDance Seed API](/tutorials/free-unlimited-bytedance-seed-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Kimi K2.6 API](/tutorials/free-unlimited-kimi-k2-api/)
- [Free, Unlimited Moonshot AI API](/tutorials/free-unlimited-moonshot-ai-api/)
- [Free, Unlimited MiniMax API](/tutorials/free-unlimited-minimax-api/)
- [Free, Unlimited Kwaipilot Kat API](/tutorials/free-unlimited-kwaipilot-kat-api/)
- [Free, Unlimited Xiaomi MiMo API](/tutorials/free-unlimited-xiaomi-mimo-api/)
- [Free, Unlimited StepFun AI API](/tutorials/free-unlimited-stepfun-ai-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
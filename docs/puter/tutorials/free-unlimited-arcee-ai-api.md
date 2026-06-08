# Free, Unlimited Arcee AI API

Source: https://developer.puter.com/tutorials/free-unlimited-arcee-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited Arcee AI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 2, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Chat](#example-1-basic-chat)[Example 2: Complex Reasoning](#example-2-complex-reasoning)[Example 3: Efficient Reasoning](#example-3-efficient-reasoning)[Example 4: Code Generation](#example-4-code-generation)[List of Arcee AI models](#list-of-arcee-ai-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you will learn how to add Arcee AI models into your application for free using Puter.js. You can gain access to open-source models such as [Trinity Large Thinking](/ai/arcee-ai/trinity-large-thinking/), [Trinity Mini](/ai/arcee-ai/trinity-mini/), [Maestro Reasoning](/ai/arcee-ai/maestro-reasoning/), [Virtuoso Large](/ai/arcee-ai/virtuoso-large/), and [Coder Large](/ai/arcee-ai/coder-large/) without having to set up the AI server yourself.

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

That's it, you're ready to start integrating Arcee AI into your application.

## Example 1: Basic Chat

Virtuoso Large is Arcee AI's general purpose LLM for every day use such as Q&A and writing, while still maintaining strong reasoning performance.

```javascript
puter.ai.chat("Explain the concept of quantum computing in simple terms", { model: "arcee-ai/virtuoso-large" })
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
        puter.ai.chat("Explain the concept of quantum computing in simple terms", { model: "arcee-ai/virtuoso-large" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: Complex Reasoning

Trinity Large Thinking specializes in complex analysis, and is the reasoning-optimized model by Arcee AI.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                "Debug this logic: If I have 3 apples and give away 5, how many do I have?",
                { model: "arcee-ai/trinity-large-thinking", stream: true }
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

## Example 3: Efficient Reasoning

Trinity Mini is engineered for efficient reasoning through its smaller parameter size (26B).

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                "Debug this logic: If I have 3 apples and give away 5, how many do I have?",
                { model: "arcee-ai/trinity-mini", stream: true }
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

## Example 4: Code Generation

Coder Large is Arcee AI's coding language model with 32K context window. It understands more than 30 programming languages.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a Python function that implements binary search on a sorted array",
            { model: "arcee-ai/coder-large" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## List of Arcee AI models

You can use the following Arcee AI models with Puter.js:

```javascript
arcee-ai/trinity-large-thinking
arcee-ai/trinity-mini
arcee-ai/virtuoso-large
arcee-ai/coder-large
arcee-ai/maestro-reasoning
```

## Conclusion

Using Puter.js, you can gain access to Arcee AI models without having to set up the AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Inception Mercury API](/tutorials/free-unlimited-inception-mercury-api/)
- [Free, Unlimited Nous Research Hermes API](/tutorials/free-unlimited-nous-research-hermes-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Essential AI API](/tutorials/free-unlimited-essential-ai-api/)
- [Free, Unlimited Writer Palmyra API](/tutorials/free-unlimited-writer-palmyra-api/)
- [Free, Unlimited Upstage Solar API](/tutorials/free-unlimited-upstage-solar-api/)
- [Free, Unlimited StepFun AI API](/tutorials/free-unlimited-stepfun-ai-api/)
- [Free, Unlimited Aion Labs API](/tutorials/free-unlimited-aion-labs-api/)
- [Free, Unlimited Mancer AI API](/tutorials/free-unlimited-mancer-api/)
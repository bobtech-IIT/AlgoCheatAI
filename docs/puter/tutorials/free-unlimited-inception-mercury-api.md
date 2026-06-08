# Free, Unlimited Inception Mercury API

Source: https://developer.puter.com/tutorials/free-unlimited-inception-mercury-api/

[Tutorials](/tutorials/)

# Free, Unlimited Inception Mercury API

                                        Updated: April 15, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic conversational AI with Mercury 2](#example-1-basic-conversational-ai-with-mercury-2)[Example 2: Fast problem-solving with Mercury 2](#example-2-fast-problem-solving-with-mercury-2)[Example 3: Stream responses for longer queries](#example-3-stream-responses-for-longer-queries)[List of supported models](#list-of-supported-models)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Inception Mercury 2](/ai/inception/mercury-2/) and [Mercury Coder](/ai/inception/mercury-coder/), diffusion-based reasoning language models (dLLM) that enable fast response times, without any API keys or usage restrictions.

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

Nothing else is required to start using Puter.js for free access to Inception Mercury 2 and its blazing-fast AI capabilities.

## Example 1: Basic conversational AI with Mercury 2

To generate text using [Inception Mercury 2](/ai/inception/mercury-2/), use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat("Explain the concept of machine learning in simple terms", { model: "inception/mercury-2" })
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
        puter.ai.chat("Explain the concept of machine learning in simple terms", { model: "inception/mercury-2" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: Fast problem-solving with Mercury 2

Mercury 2's diffusion-based architecture makes it ideal for quick problem-solving and analysis:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "What are the key advantages of using a microservices architecture?",
            { model: "inception/mercury-2" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 3: Stream responses for longer queries

For longer responses, use streaming to get results in real-time:

```javascript
async function streamResponse() {
    const response = await puter.ai.chat(
        "Explain the evolution of programming languages from assembly to modern high-level languages",
        { model: "inception/mercury-2", stream: true }
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
                "Explain the evolution of programming languages from assembly to modern high-level languages",
                { model: "inception/mercury-2", stream: true }
            );

            for await (const part of response) {
                puter.print(part?.text);
            }
        }

        streamResponse();
    </script>
</body>
</html>
```

## List of supported models

The following Inception Mercury models are supported by Puter.js:

```javascript
inception/mercury-2
```

That's it! You now have a free access to the Inception Mercury API using Puter.js. This allows you to access the first diffusion large language model for blazing-fast AI responses without needing an API key or a backend. True serverless AI!

## Related

- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Z.AI GLM API](/tutorials/free-unlimited-zai-glm-api/)
- [Free, Unlimited AllenAI API](/tutorials/free-unlimited-allen-ai-api/)
- [Free, Unlimited ArceeAI API](/tutorials/free-unlimited-arcee-ai-api/)
- [Free, Unlimited Essential AI API](/tutorials/free-unlimited-essential-ai-api/)
- [Free, Unlimited Writer Palmyra API](/tutorials/free-unlimited-writer-palmyra-api/)
- [Free, Unlimited Upstage Solar API](/tutorials/free-unlimited-upstage-solar-api/)
- [Free, Unlimited StepFun AI API](/tutorials/free-unlimited-stepfun-ai-api/)
- [Free, Unlimited Aion Labs API](/tutorials/free-unlimited-aion-labs-api/)
- [Free, Unlimited Mancer AI API](/tutorials/free-unlimited-mancer-api/)
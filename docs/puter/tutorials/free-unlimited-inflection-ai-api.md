# Free, Unlimited Inflection AI API

Source: https://developer.puter.com/tutorials/free-unlimited-inflection-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited Inflection AI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 10, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Chat with Inflection 3 Pi](#example-1-basic-chat-with-inflection-3-pi)[Example 2: Streaming Responses](#example-2-streaming-responses)[Example 3: Structured Output Generation](#example-3-structured-output-generation)[List of supported models](#list-of-supported-models)[Conclusion](#conclusion)[Related Resources](#related-resources)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access Inflection AI's modelsâfrom emotionally intelligent conversations to structured output generation, without any API keys or usage restrictions.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate AI capabilities into their applications while each user will cover their own usage costs. This model enables developers to [access advanced AI capabilities](/ai/) for free, without any API keys or server-side setup.

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

Nothing else is required to start using Puter.js for free access to Inflection AI models and capabilities.

## Example 1: Basic Chat with Inflection 3 Pi

To generate text using [Inflection 3 Pi](/ai/inflection/inflection-3-pi/), use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat("Tell me a fun trivia fact about space.", { model: "inflection/inflection-3-pi" })
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
        puter.ai.chat("Tell me a fun trivia fact about space.", { model: "inflection/inflection-3-pi" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: Streaming Responses

For longer responses, use streaming with [Inflection 3 Pi](/ai/inflection/inflection-3-pi/) to get results in real-time:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                "Write a short essay about the future of artificial intelligence.",
                { model: "inflection/inflection-3-pi", stream: true }
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

## Example 3: Structured Output Generation

For structured output like JSON, use [Inflection 3 Productivity](/ai/inflection/inflection-3-productivity/) which is optimized for precise instruction-following and structured data generation:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            `Generate a JSON object for a user profile with the following fields: name, email, age, and hobbies (as an array). Use realistic sample data.`,
            { model: "inflection/inflection-3-productivity" }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## List of supported models

The following Inflection AI models are supported by Puter.js:

```javascript
inflection/inflection-3-pi
inflection/inflection-3-productivity
```

## Conclusion

Using Puter.js, you can access Inflection AI model capabilities without needing an API key or a backend. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related Resources

- [Free, Unlimited Essential AI API](/tutorials/free-unlimited-essential-ai-api/)
- [Free, Unlimited Inception Mercury API](/tutorials/free-unlimited-inception-mercury-api/)
- [Free, Unlimited Nous Research Hermes API](/tutorials/free-unlimited-nous-research-hermes-api/)
- [Free, Unlimited ArceeAI API](/tutorials/free-unlimited-arcee-ai-api/)
- [Free, Unlimited Z.AI GLM API](/tutorials/free-unlimited-zai-glm-api/)
- [Free, Unlimited AllenAI API](/tutorials/free-unlimited-allen-ai-api/)
- [Free, Unlimited StepFun AI API](/tutorials/free-unlimited-stepfun-ai-api/)
- [Free, Unlimited Baidu ERNIE API](/tutorials/free-unlimited-baidu-ernie-api/)
- [Free, Unlimited AI21 Labs API](/tutorials/free-unlimited-ai21-labs-api/)
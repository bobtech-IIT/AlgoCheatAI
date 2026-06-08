# Free, Unlimited AI21 Labs API

Source: https://developer.puter.com/tutorials/free-unlimited-ai21-labs-api/

[Tutorials](/tutorials/)

# Free, Unlimited AI21 Labs API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 10, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Chat with Jamba Large](#example-1-basic-chat-with-jamba-large)[Example 2: Streaming Responses](#example-2-streaming-responses)[List of supported models](#list-of-supported-models)[Conclusion](#conclusion)[Related Resources](#related-resources)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access AI21 Labs' Jamba models, without any API keys or usage restrictions.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. This model enables developers to add [AI capabilities](/ai/) to their app for free, without any API keys or server-side setup.

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

Nothing else is required to start using Puter.js for free access to AI21 Labs models and capabilities.

## Example 1: Basic Chat with Jamba Large

To generate text using [Jamba Large 1.7](/ai/ai21/jamba-large-1.7/), use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat("Tell me a fun trivia fact about space.", { model: "ai21/jamba-large-1.7" })
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
        puter.ai.chat("Tell me a fun trivia fact about space.", { model: "ai21/jamba-large-1.7" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: Streaming Responses

For longer responses, use streaming with [Jamba Large 1.7](/ai/ai21/jamba-large-1.7/) to get results in real-time:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                "Write a short essay about the future of artificial intelligence.",
                { model: "ai21/jamba-large-1.7", stream: true }
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

The following AI21 Labs models are supported by Puter.js:

```javascript
ai21/jamba-large-1.7
```

## Conclusion

Using Puter.js, you can access AI21 Labs model capabilities without needing an API key or a backend. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

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
- [Free, Unlimited Inflection AI API](/tutorials/free-unlimited-inflection-ai-api/)
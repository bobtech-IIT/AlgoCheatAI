# Free, Unlimited AllenAI API

Source: https://developer.puter.com/tutorials/free-unlimited-allen-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited AllenAI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 9, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Chat with Olmo 3 32B Think](#example-1-chat-with-olmo-3-32b-think)[Example 2: Streaming Responses](#example-2-streaming-responses)[List of AllenAI models](#list-of-allenai-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you will learn how to integrate AllenAI's models into your application using Puter.js. You can gain access to AllenAI's open language models such as [Olmo 3 32B Think](/ai/allenai/olmo-3-32b-think/), and more without having to set up the AI server yourself.

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

That's it, you're ready to start integrating AllenAI open language models into your application.

## Example 1: Chat with Olmo 3 32B Think

Olmo 3 32B Think is the first fully open 32B thinking model from AI2, exposing intermediate chain-of-thought reasoning traces. It is purpose-built for multi-step math, code, and general problem-solving tasks.

```javascript
puter.ai.chat("Explain the concept of quantum computing in simple terms",
    { model: "allenai/olmo-3-32b-think" }
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
        puter.ai.chat("Explain the concept of quantum computing in simple terms",
            { model: "allenai/olmo-3-32b-think" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 2: Streaming Responses

For longer responses, use streaming to get results in real-time:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                "Write a short essay about the future of artificial intelligence.",
                { model: "allenai/olmo-3-32b-think", stream: true }
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

## List of AllenAI models

You can use the following AllenAI models with Puter.js:

```javascript
allenai/olmo-3-32b-think
```

## Conclusion

Using Puter.js, you can gain access to AllenAI's open language models without having to set up the AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Inception Mercury API](/tutorials/free-unlimited-inception-mercury-api/)
- [Free, Unlimited Nous Research Hermes API](/tutorials/free-unlimited-nous-research-hermes-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited ArceeAI API](/tutorials/free-unlimited-arcee-ai-api/)
- [Free, Unlimited Essential AI API](/tutorials/free-unlimited-essential-ai-api/)
- [Free, Unlimited Upstage Solar API](/tutorials/free-unlimited-upstage-solar-api/)
- [Free, Unlimited Mancer AI API](/tutorials/free-unlimited-mancer-api/)
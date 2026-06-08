# Free, Unlimited Baidu AI API

Source: https://developer.puter.com/tutorials/free-unlimited-baidu-ernie-api/

[Tutorials](/tutorials/)

# Free, Unlimited Baidu AI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 7, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Chat with ERNIE 4.5](#example-1-basic-chat-with-ernie-45)[Example 2: Complex Reasoning](#example-2-complex-reasoning)[Example 3: Image Analysis](#example-3-image-analysis)[List of supported models](#list-of-supported-models)[Conclusion](#conclusion)[Related Resources](#related-resources)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access Baidu AI APIs and capabilitiesâincluding ERNIE 4.5, Qianfan OCR, and CoBuddyâfor chat, reasoning, vision, and more, without any API keys or usage restrictions.

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

Nothing else is required to start using Puter.js for free access to Baidu ERNIE models and capabilities.

## Example 1: Basic Chat with ERNIE 4.5

To generate text using [ERNIE 4.5 VL 424B](/ai/baidu/ernie-4.5-vl-424b-a47b/), use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat("Tell me a fun trivia fact about space.", { model: "baidu/ernie-4.5-vl-424b-a47b" })
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
        puter.ai.chat("Tell me a fun trivia fact about space.", { model: "baidu/ernie-4.5-vl-424b-a47b" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: Complex Reasoning

For complex reasoning, use streaming to get results in real-time:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                "Explain quantum computing in detail",
                { model: "baidu/ernie-4.5-vl-424b-a47b", stream: true }
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

## Example 3: Image Analysis

To analyze images, simply provide an image URL to [`puter.ai.chat()`](https://docs.puter.com/AI/chat/):

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "What do you see in this image?",
            "https://assets.puter.site/doge.jpeg",
            { model: 'baidu/ernie-4.5-vl-424b-a47b' }
        ).then(response => {
            document.write(response);
        });
    </script>
</body>
</html>
```

## List of supported models

The following Baidu models are supported by Puter.js:

```javascript
baidu/ernie-4.5-vl-424b-a47b
```

## Conclusion

Using Puter.js, you can access Baidu ERNIE model capabilities without needing an API key or a backend. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related Resources

- [Free, Unlimited Essential AI API](/tutorials/free-unlimited-essential-ai-api/)
- [Free, Unlimited Inception Mercury API](/tutorials/free-unlimited-inception-mercury-api/)
- [Free, Unlimited Nous Research Hermes API](/tutorials/free-unlimited-nous-research-hermes-api/)
- [Free, Unlimited ArceeAI API](/tutorials/free-unlimited-arcee-ai-api/)
- [Free, Unlimited Z.AI GLM API](/tutorials/free-unlimited-zai-glm-api/)
- [Free, Unlimited Tencent Hunyuan API](/tutorials/free-unlimited-tencent-hunyuan-api/)
- [Free, Unlimited AllenAI API](/tutorials/free-unlimited-allen-ai-api/)
- [Free, Unlimited StepFun AI API](/tutorials/free-unlimited-stepfun-ai-api/)
- [Free, Unlimited AI21 Labs API](/tutorials/free-unlimited-ai21-labs-api/)
- [Free, Unlimited Inflection AI API](/tutorials/free-unlimited-inflection-ai-api/)
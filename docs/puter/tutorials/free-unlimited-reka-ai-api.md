# Free, Unlimited Reka AI API

Source: https://developer.puter.com/tutorials/free-unlimited-reka-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited Reka AI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 6, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Image Analysis](#example-1-image-analysis)[Example 2: Video Analysis](#example-2-video-analysis)[Example 3: Multiple Media](#example-3-multiple-media)[Example 4: Chat with Reka Flash 3](#example-4-chat-with-reka-flash-3)[List of supported models](#list-of-supported-models)[Conclusion](#conclusion)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Reka AI](/ai/rekaai/) models for image analysis, video understanding, and conversational AIâcompletely free, without any API keys or usage restrictions.

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

Nothing else is required to start using Puter.js for free access to Reka AI models and capabilities.

## Example 1: Image Analysis

[Reka Edge](/ai/rekaai/reka-edge/) is a 7B multimodal vision-language model with industry-leading performance for visual reasoning and object detection in its size class. To analyze an image, simply pass an image URL to [`puter.ai.chat()`](https://docs.puter.com/AI/chat/):

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "What do you see in this image?",
            "https://assets.puter.site/doge.jpeg",
            { model: 'rekaai/reka-edge' }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 2: Video Analysis

Reka Edge also supports video inputs. Simply pass a video URL as the second argument to [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) and the model will describe what it sees:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai
            .chat(`What do you see?`, `https://assets.puter.site/puppy.mp4`, {
                model: "rekaai/reka-edge",
            })
            .then(puter.print);
    </script>
</body>
</html>
```

## Example 3: Multiple Media

You can pass multiple inputsâboth images and videosâas an array. The model will analyze all of them together:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai
            .chat("Describe these", [
                "https://assets.puter.site/doge.jpeg",
                "https://assets.puter.site/puppy.mp4",
            ], { model: "rekaai/reka-edge" })
            .then(puter.print);
    </script>
</body>
</html>
```

## Example 4: Chat with Reka Flash 3

Besides the vision model, Reka also has [Reka Flash 3](/ai/rekaai/reka-flash-3/)âa 21B reasoning model that is on par or better than [OpenAI o1-mini](/ai/openai/o1-mini/). You can use it for conversational AI, coding, instruction following, and function calling:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Tell me a fun trivia fact about space.", { model: "rekaai/reka-flash-3" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## List of supported models

The following Reka AI models are supported by Puter.js:

```javascript
rekaai/reka-edge
rekaai/reka-flash-3
```

## Conclusion

Using Puter.js, you can access Reka AI's multimodal vision and reasoning capabilities without needing an API key or a backend. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications with image analysis, video understanding, and conversational AI without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited Perceptron AI API](/tutorials/free-unlimited-perceptron-ai-api/)
- [Free, Unlimited Video Analysis API](/tutorials/free-unlimited-video-analysis-api/)
- [Free, Unlimited Image Recognition API](/tutorials/free-unlimited-image-recognition-api/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
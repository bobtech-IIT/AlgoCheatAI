# Free, Unlimited Perceptron AI API

Source: https://developer.puter.com/tutorials/free-unlimited-perceptron-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited Perceptron AI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 13, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Video Understanding](#example-1-video-understanding)[Example 2: Image Analysis](#example-2-image-analysis)[List of supported models](#list-of-supported-models)[Conclusion](#conclusion)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Perceptron AI](/ai/perceptron/) models for video understanding, image analysis, object detection, and document OCRâcompletely free, without any API keys or usage restrictions.

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

Nothing else is required to start using Puter.js for free access to Perceptron AI models and capabilities.

## Example 1: Video Understanding

[Perceptron Mk1](/ai/perceptron/perceptron-mk1/) is a vision-language model designed for video and embodied reasoning. It can process native video at up to 2 frames per second within its 32K context window, making it ideal for video QA, summarization, and event detection. To analyze a video, simply pass a video URL to [`puter.ai.chat()`](https://docs.puter.com/AI/chat/):

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Summarize what happens in this video.",
            "https://assets.puter.site/puppy.mp4",
            { model: 'perceptron/perceptron-mk1' }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 2: Image Analysis

Perceptron Mk1 also works on still images. Pass an image URL as the second argument to [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) and the model will describe what it sees:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai
            .chat("What do you see in this image?", "https://assets.puter.site/doge.jpeg", {
                model: "perceptron/perceptron-mk1",
            })
            .then(puter.print);
    </script>
</body>
</html>
```

## List of supported models

The following Perceptron AI models are supported by Puter.js:

```javascript
perceptron/perceptron-mk1
```

## Conclusion

Using Puter.js, you can access Perceptron AI's Mk1 vision-language model for video understanding, object detection, and document OCR without needing an API key or a backend. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful video analysis, robotics, and multimodal applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited Reka AI API](/tutorials/free-unlimited-reka-ai-api/)
- [Free, Unlimited Video Analysis API](/tutorials/free-unlimited-video-analysis-api/)
- [Free, Unlimited Image Recognition API](/tutorials/free-unlimited-image-recognition-api/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
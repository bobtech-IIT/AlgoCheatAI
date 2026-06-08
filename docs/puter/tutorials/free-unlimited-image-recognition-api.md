# Free, Unlimited Image Recognition API

Source: https://developer.puter.com/tutorials/free-unlimited-image-recognition-api/

[Tutorials](/tutorials/)

# Free, Unlimited Image Recognition API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 2, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Image Analysis](#example-1-basic-image-analysis)[Example 2: Using a Different Model](#example-2-using-a-different-model)[Example 3: Analyze Multiple Media](#example-3-analyze-multiple-media)[Conclusion](#conclusion)[Related](#related)

Want to add image recognition to your app? With [Puter.js](https://docs.puter.com), you can analyze images using AI models like GPT and Gemini â no API keys, no backend, and no setup required.

Puter pioneered the [User-Pays model](https://docs.puter.com/user-pays-model/), where users cover their own image recognition costs. This means you can ship image recognition features without worrying about API keys or infrastructure.

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

That's it - you're ready to start recognizing images.

## Example 1: Basic Image Analysis

To analyze an image, pass an image URL as the second argument to [`puter.ai.chat()`](https://docs.puter.com/AI/chat/). Here's a complete working example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai
            .chat(`What do you see?`, `https://assets.puter.site/doge.jpeg`, {
                model: "openai/gpt-5.4-nano",
            })
            .then(puter.print);
    </script>
</body>
</html>
```

This sends the image to OpenAI's GPT-5.4 Nano model, which will describe what it sees in the image.

## Example 2: Using a Different Model

You can use different models for image recognition. Here's the same example using Google's [Gemini 2.5 Flash](/ai/google/gemini-2.5-flash/):

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai
            .chat(`What do you see?`, `https://assets.puter.site/doge.jpeg`, {
                model: "google/gemini-2.5-flash",
            })
            .then(puter.print);
    </script>
</body>
</html>
```

## Example 3: Analyze Multiple Media

You can pass multiple inputs - both images and videos - as an array. The model will analyze all of them together:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai
            .chat("Describe these", [
                "https://assets.puter.site/doge.jpeg",
                "https://assets.puter.site/puppy.mp4",
            ], { model: "google/gemini-2.5-flash" })
            .then(puter.print);
    </script>
</body>
</html>
```

## Conclusion

That's it! You now have free, unlimited access to image recognition capabilities using Puter.js. Analyze images, combine them with videos, and use different AI models - all without API keys or backend servers.

## Related

- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited Video Analysis API](/tutorials/free-unlimited-video-analysis-api/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited Reka AI API](/tutorials/free-unlimited-reka-ai-api/)
- [Free, Unlimited Perceptron AI API](/tutorials/free-unlimited-perceptron-ai-api/)
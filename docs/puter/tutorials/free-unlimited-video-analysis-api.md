# Free, Unlimited Video Analysis API

Source: https://developer.puter.com/tutorials/free-unlimited-video-analysis-api/

[Tutorials](/tutorials/)

# Free, Unlimited Video Analysis API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 1, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Video Analysis](#example-1-basic-video-analysis)[Example 2: Using a Different Model](#example-2-using-a-different-model)[Example 3: Analyze Multiple Media](#example-3-analyze-multiple-media)[List of Models](#list-of-models)[Conclusion](#conclusion)[Related](#related)

This tutorial demonstrates how to perform video analysis using [Puter.js](https://docs.puter.com). With Puter.js, you get access to powerful AI video analysis capabilities that you can add to your app without API keys or setup.

Puter is the pioneer of the [User-Pays model](https://docs.puter.com/user-pays-model/), enabling developers to integrate AI-powered video analysis into their apps while users cover their own usage costs. This approach lets you offer video understanding features without managing API keys or backend infrastructure.

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

That's it - you're ready to start analyzing videos.

## Example 1: Basic Video Analysis

To analyze a video, pass a video URL as the second argument to [`puter.ai.chat()`](https://docs.puter.com/AI/chat/). Here's a complete working example:

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

This sends the video to the Reka Edge model, which will describe what it sees in the video.

## Example 2: Using a Different Model

You can use different models for video analysis. Here's the same example using Google's [Gemini 2.5 Flash](/ai/google/gemini-2.5-flash/):

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai
            .chat(`What do you see?`, `https://assets.puter.site/puppy.mp4`, {
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

## List of Models

You can use the following models for video analysis:

```javascript
rekaai/reka-edge
google/gemini-3.1-pro-preview
google/gemini-3-flash-preview
google/gemini-2.5-pro
google/gemini-2.5-flash-lite
google/gemini-2.5-flash
google/gemini-2.0-flash-lite
google/gemini-2.0-flash
```

## Conclusion

That's it! You now have free, unlimited access to video analysis capabilities using Puter.js. Analyze videos, combine them with images, and use different AI models - all without API keys or backend servers.

## Related

- [Free, Unlimited Image Recognition API](/tutorials/free-unlimited-image-recognition-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited Google AI API](/tutorials/free-unlimited-google-ai-api/)
- [Free, Unlimited Reka AI API](/tutorials/free-unlimited-reka-ai-api/)
- [Free, Unlimited Perceptron AI API](/tutorials/free-unlimited-perceptron-ai-api/)
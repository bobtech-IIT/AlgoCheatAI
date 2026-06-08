# Free, Unlimited Veo API

Source: https://developer.puter.com/tutorials/free-unlimited-veo-api/

[Tutorials](/tutorials/)

# Free, Unlimited Veo API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 13, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Generate a video with Veo 3.1](#example-1-generate-a-video-with-veo-31)[Example 2: Fast video generation with Veo 3.1 Fast](#example-2-fast-video-generation-with-veo-31-fast)[Example 3: Cost-effective video generation with Veo 3.1 Lite](#example-3-cost-effective-video-generation-with-veo-31-lite)[List of Supported Models](#list-of-supported-models)[Conclusion](#conclusion)[Related](#related)

This tutorial shows how to use [Puter.js](https://developer.puter.com) for generating videos with [Google](/ai/google/) [Veo](/ai/veo/) models for free, without needing API keys or backend infrastructure. With Puter.js, you gain immediate access to Google's Veo video generation models, including [Veo 3.1](/ai/google/veo-3.1/), [Veo 3.1 Fast](/ai/google/veo-3.1-fast/), and [Veo 3.1 Lite](/ai/google/veo-3.1-lite/), all callable directly from client-side JavaScript.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own [AI video generation](/video-generation/) costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI usage.

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

This single library is all you need to start generating videos with Veo models in your application.

## Example 1: Generate a video with Veo 3.1

To generate a video using Veo 3.1, use the [`puter.ai.txt2vid()`](https://docs.puter.com/AI/txt2vid/) function:

```javascript
puter.ai.txt2vid(
    "A fox sprinting through a snow-covered forest at dusk",
    { model: "google/veo-3.1" }
)
.then(videoElement => {
    document.body.appendChild(videoElement);
    videoElement.addEventListener('loadeddata', () => videoElement.play().catch(() => {}));
})
```

Full code example:

```html
<html>
<body>
    <h1>Veo 3.1 Video Generation</h1>
    <div id="status"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Start timer
        const status = document.getElementById('status');
        const startTime = Date.now();
        const timerInterval = setInterval(() => {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            status.textContent = `Loading (${elapsed} seconds)`;
        }, 100);

        // Generate video
```

Show 20 more lines...

```html
<html>
<body>
    <h1>Veo 3.1 Video Generation</h1>
    <div id="status"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Start timer
        const status = document.getElementById('status');
        const startTime = Date.now();
        const timerInterval = setInterval(() => {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            status.textContent = `Loading (${elapsed} seconds)`;
        }, 100);

        // Generate video
        puter.ai.txt2vid(
            "A fox sprinting through a snow-covered forest at dusk",
            { model: "google/veo-3.1" }
        )
        .then(videoElement => {
            document.body.appendChild(videoElement);
            videoElement.addEventListener('loadeddata', () => videoElement.play().catch(() => {}));

            // Clear timer and show finished status
            clearInterval(timerInterval);
            const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
            status.textContent = `Finished (${totalTime} seconds)`;
        }).catch(error => {
            console.error(error);
            clearInterval(timerInterval);
            status.textContent = JSON.stringify(error);
        })
    </script>
</body>
</html>
```

Collapse code

## Example 2: Fast video generation with Veo 3.1 Fast

Veo 3.1 Fast is the speed-optimized variant that generates videos roughly twice as fast as Veo 3.1. To use it, simply change the model parameter:

```html
<html>
<body>
    <h1>Veo 3.1 Fast Video Generation</h1>
    <div id="status"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Start timer
        const status = document.getElementById('status');
        const startTime = Date.now();
        const timerInterval = setInterval(() => {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            status.textContent = `Loading (${elapsed} seconds)`;
        }, 100);

        // Generate video
```

Show 20 more lines...

```html
<html>
<body>
    <h1>Veo 3.1 Fast Video Generation</h1>
    <div id="status"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Start timer
        const status = document.getElementById('status');
        const startTime = Date.now();
        const timerInterval = setInterval(() => {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            status.textContent = `Loading (${elapsed} seconds)`;
        }, 100);

        // Generate video
        puter.ai.txt2vid(
            "A majestic dragon flying through clouds at sunset, cinematic lighting, 4k quality",
            { model: "google/veo-3.1-fast" }
        )
        .then(videoElement => {
            document.body.appendChild(videoElement);
            videoElement.addEventListener('loadeddata', () => videoElement.play().catch(() => {}));

            // Clear timer and show finished status
            clearInterval(timerInterval);
            const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
            status.textContent = `Finished (${totalTime} seconds)`;
        }).catch(error => {
            console.error(error);
            clearInterval(timerInterval);
            status.textContent = JSON.stringify(error);
        })
    </script>
</body>
</html>
```

Collapse code

## Example 3: Cost-effective video generation with Veo 3.1 Lite

Veo 3.1 Lite is Google DeepMind's most cost-effective video generation model. Note that Veo 3.1 Lite does not include native audio generation â clips are silent by default.

```html
<html>
<body>
    <h1>Veo 3.1 Lite Video Generation</h1>
    <div id="status"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Start timer
        const status = document.getElementById('status');
        const startTime = Date.now();
        const timerInterval = setInterval(() => {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            status.textContent = `Loading (${elapsed} seconds)`;
        }, 100);

        // Generate video
```

Show 20 more lines...

```html
<html>
<body>
    <h1>Veo 3.1 Lite Video Generation</h1>
    <div id="status"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Start timer
        const status = document.getElementById('status');
        const startTime = Date.now();
        const timerInterval = setInterval(() => {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            status.textContent = `Loading (${elapsed} seconds)`;
        }, 100);

        // Generate video
        puter.ai.txt2vid(
            "A bustling Tokyo street at night with neon signs reflecting on wet pavement",
            { model: "google/veo-3.1-lite" }
        )
        .then(videoElement => {
            document.body.appendChild(videoElement);
            videoElement.addEventListener('loadeddata', () => videoElement.play().catch(() => {}));

            // Clear timer and show finished status
            clearInterval(timerInterval);
            const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
            status.textContent = `Finished (${totalTime} seconds)`;
        }).catch(error => {
            console.error(error);
            clearInterval(timerInterval);
            status.textContent = JSON.stringify(error);
        })
    </script>
</body>
</html>
```

Collapse code

## List of Supported Models

The following Google Veo models are supported by Puter.js, which can be used with the [`puter.ai.txt2vid()`](https://docs.puter.com/AI/txt2vid/) function:

```javascript
google/veo-2.0
google/veo-3.0
google/veo-3.0-audio
google/veo-3.0-fast
google/veo-3.0-fast-audio
google/veo-3.1
google/veo-3.1-fast
google/veo-3.1-lite
```

## Conclusion

Using Puter.js, you can gain access to Google Veo models without having to set up the cloud infrastructure yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI video generation usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited Seedance API](/tutorials/free-unlimited-bytedance-seedance-api/)
- [Free, Unlimited Kling AI API](/tutorials/free-unlimited-kling-ai-api/)
- [Free, Unlimited Wan AI API](/tutorials/free-unlimited-wan-ai-api/)
- [Free, Unlimited PixVerse API](/tutorials/free-unlimited-pixverse-api/)
- [Free, Unlimited Vidu API](/tutorials/free-unlimited-vidu-api/)
- [Free, Unlimited FLUX AI API](/tutorials/free-unlimited-flux-api/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
- [Free, Unlimited Stable Diffusion API](/tutorials/free-unlimited-stable-diffusion-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
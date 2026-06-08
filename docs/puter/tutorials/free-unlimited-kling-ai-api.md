# Free, Unlimited Kling AI API

Source: https://developer.puter.com/tutorials/free-unlimited-kling-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited Kling AI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 1, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Generate a video with Kling 2.1 Master](#example-1-generate-a-video-with-kling-21-master)[Example 2: Generate a video with Kling 2.0 Master](#example-2-generate-a-video-with-kling-20-master)[Example 3: Fast generation with Kling 1.6 Standard](#example-3-fast-generation-with-kling-16-standard)[Example 4: Custom video size generation](#example-4-custom-video-size-generation)[Available Models](#available-models)[Related](#related)

This tutorial shows how to use [Puter.js](https://developer.puter.com) to add [Kling AI](/ai/kwaivgi/) video generation to your app for free, without needing API keys or backend infrastructure. With Puter.js, you gain immediate access to Kling AI models such as [Kling 2.1 Master](/ai/kwaivgi/kling-2.1-master/), [Kling 2.0 Master](/ai/kwaivgi/kling-2.0-master/), and [Kling 1.6 Standard](/ai/kwaivgi/kling-1.6-standard/) for cinematic AI video generation, callable directly from client-side JavaScript.

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

This is all you need to start adding Kling AI video generation to your application.

## Example 1: Generate a video with Kling 2.1 Master

Kling 2.1 Master is Kling's flagship model, delivering top-tier cinematic quality with strong prompt adherence and motion fidelity. To generate a video using Kling 2.1 Master, use the [`puter.ai.txt2vid()`](https://docs.puter.com/AI/txt2vid/) function:

```javascript
puter.ai.txt2vid(
    "A majestic dragon flying through clouds at sunset, cinematic lighting, 4k quality",
    { model: "kwaivgi/kling-2.1-master" }
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
    <h1>Kling 2.1 Master Video Generation</h1>
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
    <h1>Kling 2.1 Master Video Generation</h1>
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
            { model: "kwaivgi/kling-2.1-master" }
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

## Example 2: Generate a video with Kling 2.0 Master

Kling 2.0 Master is the previous-generation flagship, producing high-quality videos with rich detail. To generate a video using Kling 2.0 Master, simply change the model parameter:

```html
<html>
<body>
    <h1>Kling 2.0 Master Video Generation</h1>
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
    <h1>Kling 2.0 Master Video Generation</h1>
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
            { model: "kwaivgi/kling-2.0-master" }
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

## Example 3: Fast generation with Kling 1.6 Standard

Kling 1.6 Standard is optimized for fast and cost-effective video generation, making it ideal when you need quick results. To generate a video using Kling 1.6 Standard:

```html
<html>
<body>
    <h1>Kling 1.6 Standard Video Generation</h1>
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
    <h1>Kling 1.6 Standard Video Generation</h1>
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
            { model: "kwaivgi/kling-1.6-standard" }
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

## Example 4: Custom video size generation

Kling AI video generation supports custom video dimensions. You can specify the width and height for your generated videos:

```html
<html>
<body>
    <h1>Custom Size Video Generation</h1>
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

Show 24 more lines...

```html
<html>
<body>
    <h1>Custom Size Video Generation</h1>
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
            {
                model: "kwaivgi/kling-2.1-master",
                width: 1080,
                height: 1080
            }
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

**Supported Video Sizes**

Kling 2.1 Master and Kling 1.6 Standard support the following video dimensions (width Ã height):

```javascript
1920Ã1080    1080Ã1080    1080Ã1920
```

Kling 2.0 Master supports the following video dimensions (width Ã height):

```javascript
1280Ã720    720Ã720    720Ã1280
```

## Available Models

Puter.js supports the following Kling AI models for use with the [`puter.ai.txt2vid()`](https://docs.puter.com/AI/txt2vid/) function:

```javascript
kwaivgi/kling-2.1-master
kwaivgi/kling-2.0-master
kwaivgi/kling-1.6-standard
```

You're all set! With Puter.js, you can add Kling AI's powerful video generation to your app for free. Ship AI-powered video generation features without managing API keys, running backend servers, or paying for infrastructureâyour users cover their own usage via the User-Pays model.

## Related

- [Free, Unlimited Veo API](/tutorials/free-unlimited-veo-api/)
- [Free, Unlimited Seedance API](/tutorials/free-unlimited-bytedance-seedance-api/)
- [Free, Unlimited Vidu API](/tutorials/free-unlimited-vidu-api/)
- [Free, Unlimited PixVerse API](/tutorials/free-unlimited-pixverse-api/)
- [Free, Unlimited Wan AI API](/tutorials/free-unlimited-wan-ai-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited FLUX AI API](/tutorials/free-unlimited-flux-api/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
- [Free, Unlimited Stable Diffusion API](/tutorials/free-unlimited-stable-diffusion-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
# Free, Unlimited ByteDance Seedance API

Source: https://developer.puter.com/tutorials/free-unlimited-bytedance-seedance-api/

[Tutorials](/tutorials/)

# Free, Unlimited ByteDance Seedance API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: November 17, 2025
                                    

On this page[Getting Started](#getting-started)[Example 1: Generate a video with Seedance 1.0 Lite](#example-1-generate-a-video-with-seedance-10-lite)[Example 2: Generate high-quality video with Seedance 1.0 Pro](#example-2-generate-high-quality-video-with-seedance-10-pro)[Example 3: Custom video size generation](#example-3-custom-video-size-generation)[Supported Video Sizes](#supported-video-sizes)[Available Models](#available-models)[Related](#related)

This tutorial shows how to use [Puter.js](https://developer.puter.com) for generating videos with [ByteDance](/ai/bytedance-seed/) [Seedance](/ai/seedance/) models for free, without needing API keys or backend infrastructure. With Puter.js, you gain immediate access to Seedance AI models such as Seedance 1.0 Lite for fast video generation and Seedance 1.0 Pro for superior quality, all callable directly from client-side JavaScript.

Through Puter's ["User-Pays" model](https://docs.puter.com/user-pays-model/), you can integrate advanced [AI video generation](/video-generation/) into your apps while users handle their individual usage costs. This approach lets you deliver video generation features without incurring costs, managing API credentials, or configuring server infrastructure.

## Getting Started

Using Puter.js requires zero configuration and no API keys. Simply add this script tag to your HTML file (works in both `<head>` and `<body>` sections):

```javascript
<script src="https://js.puter.com/v2/"></script>
```

This single script tag is all you need to start generating videos with Seedance models in your application.

## Example 1: Generate a video with Seedance 1.0 Lite

Seedance 1.0 Lite enables fast and cost-effective video generation. To generate a video using Seedance 1.0 Lite, use the [`puter.ai.txt2vid()`](https://docs.puter.com/AI/txt2vid/) function:

```javascript
puter.ai.txt2vid(
    "A fox sprinting through a snow-covered forest at dusk",
    { model: "bytedance/seedance-1.0-lite" }
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
    <h1>Seedance 1.0 Lite Video Generation</h1>
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
    <h1>Seedance 1.0 Lite Video Generation</h1>
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
            { model: "bytedance/seedance-1.0-lite" }
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

## Example 2: Generate high-quality video with Seedance 1.0 Pro

Seedance 1.0 Pro is a larger, more advanced model with superior quality and detail. To generate a video using Seedance 1.0 Pro, simply change the model parameter:

```html
<html>
<body>
    <h1>Seedance 1.0 Pro Video Generation</h1>
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
    <h1>Seedance 1.0 Pro Video Generation</h1>
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
            { model: "bytedance/seedance-1.0-pro" }
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

## Example 3: Custom video size generation

Seedance video generation models support custom video dimensions. You can specify the width and height for your generated videos:

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
                model: "bytedance/seedance-1.0-lite",
                width: 864,
                height: 480
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

### Supported Video Sizes

Seedance models support the following video dimensions (width Ã height):

```javascript
864Ã480    736Ã544    640Ã640
960Ã416    416Ã960    1248Ã704
1120Ã832   960Ã960    1504Ã640
640Ã1504
```

## Available Models

The following ByteDance Seedance models are supported by Puter.js, which can be used with the [`puter.ai.txt2vid()`](https://docs.puter.com/AI/txt2vid/) function:

```javascript
bytedance/seedance-1.0-lite
bytedance/seedance-1.0-pro
```

You're all set! With Puter.js, you've unlocked free access to ByteDance Seedance's powerful video generation models. Build stunning AI-powered video generation features into your appsâno API keys to manage, no backend servers to maintain, and zero infrastructure costs. Experience truly serverless video generation with Seedance!

## Related

- [Free, Unlimited Kling AI API](/tutorials/free-unlimited-kling-ai-api/)
- [Free, Unlimited Wan AI API](/tutorials/free-unlimited-wan-ai-api/)
- [Free, Unlimited PixVerse API](/tutorials/free-unlimited-pixverse-api/)
- [Free, Unlimited Vidu API](/tutorials/free-unlimited-vidu-api/)
- [Free, Unlimited FLUX AI API](/tutorials/free-unlimited-flux-api/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
- [Free, Unlimited Stable Diffusion API](/tutorials/free-unlimited-stable-diffusion-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited Veo API](/tutorials/free-unlimited-veo-api/)
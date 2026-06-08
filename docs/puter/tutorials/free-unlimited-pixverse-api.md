# Free, Unlimited PixVerse API

Source: https://developer.puter.com/tutorials/free-unlimited-pixverse-api/

[Tutorials](/tutorials/)

# Free, Unlimited PixVerse API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 1, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Generate a video with PixVerse](#example-1-generate-a-video-with-pixverse)[Example 2: Custom video size generation](#example-2-custom-video-size-generation)[Available Models](#available-models)[Related](#related)

This tutorial shows how to use [Puter.js](https://developer.puter.com) to add [PixVerse](/ai/pixverse/) video generation to your app for free, without needing API keys or backend infrastructure. With Puter.js, you gain immediate access to [PixVerse V5](/ai/pixverse/pixverse-v5/), a powerful AI model for high-quality video generation, callable directly from client-side JavaScript.

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

This is all you need to start adding PixVerse video generation to your application.

## Example 1: Generate a video with PixVerse

PixVerse V5 enables high-quality video generation with natural motion and realistic details. To generate a video using PixVerse, use the [`puter.ai.txt2vid()`](https://docs.puter.com/AI/txt2vid/) function:

```javascript
puter.ai.txt2vid(
    "A fox sprinting through a snow-covered forest at dusk",
    { model: "pixverse/pixverse-v5" }
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
    <h1>PixVerse Video Generation</h1>
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
    <h1>PixVerse Video Generation</h1>
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
            { model: "pixverse/pixverse-v5" }
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

## Example 2: Custom video size generation

PixVerse video generation supports custom video dimensions. You can specify the width and height for your generated videos:

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
                model: "pixverse/pixverse-v5",
                width: 640,
                height: 360
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

The PixVerse model supports the following video dimensions (width Ã height):

```javascript
640Ã360    480Ã360    360Ã360
270Ã360    360Ã640    960Ã540
720Ã540    540Ã540    405Ã540
540Ã960    1280Ã720
```

## Available Models

Puter.js supports the following PixVerse model for use with the [`puter.ai.txt2vid()`](https://docs.puter.com/AI/txt2vid/) function:

```javascript
pixverse/pixverse-v5
```

You're all set! With Puter.js, you can add PixVerse's powerful video generation to your app for free. Ship AI-powered video generation features without managing API keys, running backend servers, or paying for infrastructureâyour users cover their own usage via the User-Pays model.

## Related

- [Free, Unlimited Veo API](/tutorials/free-unlimited-veo-api/)
- [Free, Unlimited Seedance API](/tutorials/free-unlimited-bytedance-seedance-api/)
- [Free, Unlimited Kling AI API](/tutorials/free-unlimited-kling-ai-api/)
- [Free, Unlimited Wan AI API](/tutorials/free-unlimited-wan-ai-api/)
- [Free, Unlimited Vidu API](/tutorials/free-unlimited-vidu-api/)
- [Free, Unlimited FLUX AI API](/tutorials/free-unlimited-flux-api/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
- [Free, Unlimited Stable Diffusion API](/tutorials/free-unlimited-stable-diffusion-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
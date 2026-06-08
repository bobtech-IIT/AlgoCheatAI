# Free, Unlimited Vidu API

Source: https://developer.puter.com/tutorials/free-unlimited-vidu-api/

[Tutorials](/tutorials/)

# Free, Unlimited Vidu API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 1, 2026
                                    

On this page[Getting Started](#getting-started)[Example: Generate a video with Vidu Q1](#example-generate-a-video-with-vidu-q1)[Available Models](#available-models)[Related](#related)

This tutorial shows how to use [Puter.js](https://developer.puter.com) to add [Vidu](/ai/vidu/) video generation to your app for free, without needing API keys or backend infrastructure. With Puter.js, you gain immediate access to [Vidu Q1](/ai/vidu/vidu-q1/) for cinematic 1080p video generation with integrated AI-generated audio, callable directly from client-side JavaScript.

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

This is all you need to start adding Vidu video generation to your application.

## Example: Generate a video with Vidu Q1

Vidu Q1 is a high-performance generative video model that produces cinematic 1080p videos with integrated AI-generated audio. It excels at anime-style content and includes built-in 48kHz sound effects and background music. To generate a video using Vidu Q1, use the [`puter.ai.txt2vid()`](https://docs.puter.com/AI/txt2vid/) function:

```javascript
puter.ai.txt2vid(
    "A majestic dragon flying through clouds at sunset, cinematic lighting, 4k quality",
    { model: "vidu/vidu-q1" }
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
    <h1>Vidu Q1 Video Generation</h1>
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
    <h1>Vidu Q1 Video Generation</h1>
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
            { model: "vidu/vidu-q1" }
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

## Available Models

Puter.js supports the following Vidu models for use with the [`puter.ai.txt2vid()`](https://docs.puter.com/AI/txt2vid/) function:

```javascript
vidu/vidu-2.0
vidu/vidu-q1
```

You're all set! With Puter.js, you can add Vidu's powerful video generation to your app for free. Ship AI-powered video generation features without managing API keys, running backend servers, or paying for infrastructureâyour users cover their own usage via the User-Pays model.

## Related

- [Free, Unlimited Veo API](/tutorials/free-unlimited-veo-api/)
- [Free, Unlimited Seedance API](/tutorials/free-unlimited-bytedance-seedance-api/)
- [Free, Unlimited Kling AI API](/tutorials/free-unlimited-kling-ai-api/)
- [Free, Unlimited PixVerse API](/tutorials/free-unlimited-pixverse-api/)
- [Free, Unlimited Wan AI API](/tutorials/free-unlimited-wan-ai-api/)
- [Free, Unlimited FLUX AI API](/tutorials/free-unlimited-flux-api/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
- [Free, Unlimited Stable Diffusion API](/tutorials/free-unlimited-stable-diffusion-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
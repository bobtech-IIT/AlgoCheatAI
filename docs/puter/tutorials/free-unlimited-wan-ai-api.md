# Free, Unlimited Wan AI API

Source: https://developer.puter.com/tutorials/free-unlimited-wan-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited Wan AI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: November 18, 2025
                                    

On this page[Getting Started](#getting-started)[Example 1: Generate video from text with Wan 2.2 Text-to-Video](#example-1-generate-video-from-text-with-wan-22-text-to-video)[Example 2: Generate video from image with Wan 2.2 Image-to-Video](#example-2-generate-video-from-image-with-wan-22-image-to-video)[Available Models](#available-models)[Related](#related)

This tutorial shows how to use [Puter.js](https://developer.puter.com) for generating videos with Wan 2.2 AI models for free, without needing API keys or backend infrastructure. With Puter.js, you gain immediate access to Wan AI's powerful models including Wan 2.2 Text-to-Video (T2V) for creating videos from text prompts and Wan 2.2 Image-to-Video (I2V), all callable directly from client-side JavaScript.

Puter pioneered the ["User-Pays" model](https://docs.puter.com/user-pays-model/), allowing you to integrate advanced [AI video generation](/video-generation/) into your apps while users handle their individual usage costs. This approach lets you deliver video generation features without incurring costs, managing API credentials, or configuring server infrastructure.

## Getting Started

Using Puter.js requires zero configuration and no API keys. Simply add this script tag to your HTML file (works in both `<head>` and `<body>` sections):

```javascript
<script src="https://js.puter.com/v2/"></script>
```

This single script tag is all you need to start generating videos with Wan 2.2 models in your application.

## Example 1: Generate video from text with Wan 2.2 Text-to-Video

Wan 2.2 Text-to-Video (T2V) enables powerful video generation from text descriptions. To generate a video from a text prompt, use the [`puter.ai.txt2vid()`](https://docs.puter.com/AI/txt2vid/) function:

```javascript
puter.ai.txt2vid(
    "A fox sprinting through a snow-covered forest at dusk",
    { model: "wan-ai/wan2.2-t2v-a14b" }
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
    <h1>Wan 2.2 Text-to-Video Generation</h1>
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

        // Generate video from text
```

Show 20 more lines...

```html
<html>
<body>
    <h1>Wan 2.2 Text-to-Video Generation</h1>
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

        // Generate video from text
        puter.ai.txt2vid(
            "A fox sprinting through a snow-covered forest at dusk",
            { model: "wan-ai/wan2.2-t2v-a14b" }
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

## Example 2: Generate video from image with Wan 2.2 Image-to-Video

Wan 2.2 Image-to-Video (I2V) enables transforming static images into dynamic videos. To generate a video from an image, use the [`puter.ai.txt2vid()`](https://docs.puter.com/AI/txt2vid/) function with an image URL parameter:

```html
<html>
<body>
    <h1>Wan 2.2 Image-to-Video Generation</h1>
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

        // Generate video from image
```

Show 23 more lines...

```html
<html>
<body>
    <h1>Wan 2.2 Image-to-Video Generation</h1>
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

        // Generate video from image
        puter.ai.txt2vid(
            "A dynamic graffiti art character. A boy painted with spray paint comes to life from a concrete wall. He sings an English rap song at a very fast pace while striking a classic, energetic rapper pose. The scene is set under an urban railway bridge at night. The lighting comes from a single streetlight, creating a cinematic atmosphere full of high energy and amazing detail.",
            {
                model: "wan-ai/wan2.2-i2v-a14b",
                image_url: "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png"
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

## Available Models

The following Wan 2.2 AI models are supported by Puter.js:

```javascript
wan-ai/wan2.2-t2v-a14b
wan-ai/wan2.2-i2v-a14b
```

You're all set! With Puter.js, you've unlocked free access to Wan 2.2's powerful video generation models. Build stunning AI-powered video generation features into your appsâwhether transforming text or images into videos. All of this comes without API keys to manage, no backend servers to maintain, and zero infrastructure costs. Experience truly serverless video generation with Wan AI!

## Related

- [Free, Unlimited ByteDance Seedance API](/tutorials/free-unlimited-bytedance-seedance-api/)
- [Free, Unlimited Kling AI API](/tutorials/free-unlimited-kling-ai-api/)
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
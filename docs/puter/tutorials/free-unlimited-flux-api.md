# Free, Unlimited FLUX AI API

Source: https://developer.puter.com/tutorials/free-unlimited-flux-api/

[Tutorials](/tutorials/)

# Free, Unlimited FLUX AI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: December 17, 2025
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Image Generation](#example-1-basic-image-generation)[Example 2: In-Context Image Editing](#example-2-in-context-image-editing)[Example 3: Fast and Efficient Generation](#example-3-fast-and-efficient-generation)[Example 4: Professional-grade Image Generation](#example-4-professional-grade-image-generation)[Example 5: Customizable Image Generation](#example-5-customizable-image-generation)[Supported FLUX Models](#supported-flux-models)[Conclusion](#conclusion)[Related](#related)

This tutorial shows you how to add FLUX image generation to your web application using [Puter.js](https://developer.puter.com), without needing API keys or backend infrastructure. With Puter.js, you can gain access to [Black Forest Labs' FLUX](/ai/black-forest-labs/) models such as [FLUX.2 [max]](/ai/black-forest-labs/flux.2-max/), [FLUX.2 [pro]](/ai/black-forest-labs/flux-2-pro/), [FLUX.2 [flex]](/ai/black-forest-labs/flux.2-flex/), [FLUX.2 [dev]](/ai/black-forest-labs/flux-2-dev/), [FLUX.1 Schnell](/ai/black-forest-labs/flux-schnell/), [FLUX.1 Kontext](/ai/black-forest-labs/flux.1-kontext-pro/), [FLUX.1 [dev]](/ai/black-forest-labs/flux.1-dev/), [FLUX.1 [pro]](/ai/black-forest-labs/flux.1-pro/), [FLUX 1.1 Pro](/ai/black-forest-labs/flux-1.1-pro/), and more.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you, as a developer, don't pay anything for your users' image generation, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI or server usage.

## Getting Started

With Puter.js, you simply add this script tag to your HTML file (works in both `<head>` and `<body>`):

```javascript
<script src="https://js.puter.com/v2/"></script>
```

This is all you need to start generating images with FLUX models in your application.

## Example 1: Basic Image Generation

To generate an image using FLUX.2 Pro, use the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```html
<html>
<body>
    <h1>FLUX.2 Pro Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A serene Japanese garden with cherry blossoms and a koi pond",
            { model: "black-forest-labs/flux-2-pro", disable_safety_checker: true }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Example 2: In-Context Image Editing

To perform image-to-image editing using FLUX.1 Kontext, you can provide an input image:

```html
<html>
<body>
    <h1>FLUX.1 Kontext Image Editing</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img("Draw an anime style version of this image.", {
            model: "black-forest-labs/flux.1-kontext-pro",
            image_url: "https://assets.puter.site/doge.jpeg"
        }).then((image) => {
            document.body.appendChild(image);
        });
    </script>
    <img src="https://assets.puter.site/doge.jpeg">
</body>
</html>
```

## Example 3: Fast and Efficient Generation

FLUX.1 Schnell is optimised for speed, making it ideal for applications that need quick image generation:

```html
<html>
<body>
    <h1>FLUX.1 Schnell Fast Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A cyberpunk cityscape with neon lights and flying vehicles",
            { model: "black-forest-labs/flux-schnell" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Example 4: Professional-grade Image Generation

FLUX.2 Max delivers state-of-the-art image generation with the highest quality and unmatched realism.

```html
<html>
<body>
    <h1>FLUX.2 Max Image Generation</h1>
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

        puter.ai.txt2img(
```

Show 18 more lines...

```html
<html>
<body>
    <h1>FLUX.2 Max Image Generation</h1>
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

        puter.ai.txt2img(
            "Ultra-detailed photograph of a modern luxury penthouse at golden hour, floor-to-ceiling windows overlooking a city skyline, realistic materials and reflections",
            { model: "black-forest-labs/flux.2-max" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);

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

## Example 5: Customizable Image Generation

FLUX.2 Flex offers customizable parameters like dimensions, seed control, and diffusion steps for more precise image generation:

```html
<html>
<body>
    <h1>FLUX.2 Flex Customizable Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A majestic dragon perched on a mountain peak, fantasy art style, detailed scales, dramatic lighting",
            {
                model: "black-forest-labs/flux.2-flex",
                width: 768,
                height: 1024,
                steps: 30,
                seed: 42,
                disable_safety_checker: true
            }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Supported FLUX Models

The following FLUX models are supported by Puter.js, which can be used with the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
black-forest-labs/flux-2-klein-4b
black-forest-labs/flux-2-klein-9b-base
black-forest-labs/flux.1-kontext-max
black-forest-labs/flux.1-kontext-pro
black-forest-labs/flux-2-dev
black-forest-labs/flux.2-flex
black-forest-labs/flux.2-max
black-forest-labs/flux-2-pro
black-forest-labs/flux-1.1-pro
black-forest-labs/flux.1-krea-dev
black-forest-labs/flux-schnell
```

## Conclusion

Using Puter.js, you can integrate FLUX image generation into your app without having to use API keys or set up an AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), you can add this feature for free to your application, since your users cover their own image generation usage, not you as the developer.

You can find more details about Puter.js image generation API in the [documentation](https://docs.puter.com/AI/txt2img/).

## Related

- [Best Image Generation APIs in 2026](/blog/best-image-generation-apis/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
- [Free, Unlimited Imagen API](/tutorials/free-unlimited-imagen-api/)
- [Free, Unlimited Nano Banana API](/tutorials/free-unlimited-nano-banana-api/)
- [Free, Unlimited Stable Diffusion API](/tutorials/free-unlimited-stable-diffusion-api/)
- [Free, Unlimited ByteDance Seedream API](/tutorials/free-unlimited-bytedance-seedream-api/)
- [Free, Unlimited Leonardo.Ai API](/tutorials/free-unlimited-leonardo-ai-api/)
- [Free, Unlimited Ideogram API](/tutorials/free-unlimited-ideogram-api/)
- [Free, Unlimited HiDream API](/tutorials/free-unlimited-hidream-api/)
- [Free, Unlimited RunDiffusion API](/tutorials/free-unlimited-rundiffusion-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited Veo API](/tutorials/free-unlimited-veo-api/)
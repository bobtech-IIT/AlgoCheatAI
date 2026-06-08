# Free, Unlimited ByteDance Seedream API

Source: https://developer.puter.com/tutorials/free-unlimited-bytedance-seedream-api/

[Tutorials](/tutorials/)

# Free, Unlimited ByteDance Seedream API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: November 17, 2025
                                    

On this page[Getting Started](#getting-started)[Example 1: Generate an image with Seedream 4.0](#example-1-generate-an-image-with-seedream-40)[Example 2: Generate an image with Seedream 3.0 (Cost-Effective)](#example-2-generate-an-image-with-seedream-30-cost-effective)[Example 3: Advanced Generation with Custom Parameters](#example-3-advanced-generation-with-custom-parameters)[Supported ByteDance Seedream Models](#supported-bytedance-seedream-models)[Related](#related)

This tutorial shows how to use [Puter.js](https://developer.puter.com) for generating images with [ByteDance](/ai/bytedance-seed/) Seedream AI models for free, without needing API keys or backend infrastructure. With Puter.js, you gain immediate access to Seedream models such as [Seedream 4.0](/ai/bytedance-seed/seedream-4.0/) and [Seedream 3.0](/ai/bytedance-seed/seedream-3.0/), all callable directly from client-side JavaScript.

Through Puter's ["User-Pays" model](https://docs.puter.com/user-pays-model/), you can integrate advanced AI image generation into your apps while users cover their individual usage costs. This approach lets you deliver professional-grade image generation features without incurring costs, managing API credentials, or configuring server infrastructure.

## Getting Started

Using Puter.js requires zero configuration and no API keys. Simply add this script tag to your HTML file (works in both `<head>` and `<body>` sections):

```javascript
<script src="https://js.puter.com/v2/"></script>
```

This single script tag is all you need to start generating images with ByteDance Seedream models in your application.

## Example 1: Generate an image with Seedream 4.0

To generate an image using Seedream 4.0, use the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
puter.ai.txt2img(
    "A futuristic cityscape at sunset with flying cars and towering skyscrapers",
    { model: "ByteDance-Seed/Seedream-4.0", provider: "together-ai", disable_safety_checker: true }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Seedream 4.0 Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A futuristic cityscape at sunset with flying cars and towering skyscrapers",
            { model: "ByteDance-Seed/Seedream-4.0", provider: "together-ai", disable_safety_checker: true }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Example 2: Generate an image with Seedream 3.0 (Cost-Effective)

To generate an image using the cost-effective Seedream 3.0 model, simply change the model parameter:

```javascript
puter.ai.txt2img(
    "A magical forest with glowing mushrooms and mystical creatures",
    { model: "ByteDance-Seed/Seedream-3.0", provider: "together-ai", disable_safety_checker: true }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Seedream 3.0 Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A magical forest with glowing mushrooms and mystical creatures",
            { model: "ByteDance-Seed/Seedream-3.0", provider: "together-ai", disable_safety_checker: true }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

 <h2><span class="timeline-step">Example 3:</span> Image to image generation with Seedream 4.0</h2>

To perform an image-to-image operation using Seedream 4.0, you can set the input image:

```javascript
puter.ai.txt2img("Transform this into a watercolor painting style.", {
    model: "ByteDance-Seed/Seedream-4.0",
    provider: "together-ai",
    disable_safety_checker: true,
    image_url: "https://assets.puter.site/doge.jpeg"
}).then((image) => {
    document.body.appendChild(image);
});
```

Full code example:

```html
<html>
<body>
    <h1>Seedream 4.0 Image to Image</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img("Transform this into a watercolor painting style.", {
            model: "ByteDance-Seed/Seedream-4.0",
            provider: "together-ai",
            disable_safety_checker: true,
            image_url: "https://assets.puter.site/doge.jpeg"
        }).then((image) => {
            document.body.appendChild(image);
        });
    </script>
    <img src="https://assets.puter.site/doge.jpeg">
</body>
</html>
``` 

## Example 3: Advanced Generation with Custom Parameters

This example demonstrates advanced options like custom dimensions, and seed control for more precise image generation:

```javascript
puter.ai.txt2img(
    "A majestic dragon perched on a mountain peak, fantasy art style, detailed scales, dramatic lighting",
    {
        model: "ByteDance-Seed/Seedream-4.0",
        provider: "together-ai",
        disable_safety_checker: true,
        width: 960,
        height: 960,
        seed: 42, // Same seed will produce consistent results
    }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Advanced Seedream 4.0 Image Generation</h1>
    <button onclick="generateImage()">Generate Dragon Art</button>
    <div id="imageContainer"></div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        function generateImage() {
            // Clear previous image
            document.getElementById('imageContainer').innerHTML = 'Generating...';

            puter.ai.txt2img(
                "A majestic dragon perched on a mountain peak, fantasy art style, detailed scales, dramatic lighting",
                {
```

Show 16 more lines...

```html
<html>
<body>
    <h1>Advanced Seedream 4.0 Image Generation</h1>
    <button onclick="generateImage()">Generate Dragon Art</button>
    <div id="imageContainer"></div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        function generateImage() {
            // Clear previous image
            document.getElementById('imageContainer').innerHTML = 'Generating...';

            puter.ai.txt2img(
                "A majestic dragon perched on a mountain peak, fantasy art style, detailed scales, dramatic lighting",
                {
                    model: "ByteDance-Seed/Seedream-4.0",
                    provider: "together-ai",
                    disable_safety_checker: true,
                    width: 960,
                    height: 960,
                    seed: 42, // Same seed will produce consistent results
                }
            )
            .then(imageElement => {
                document.getElementById('imageContainer').innerHTML = '';
                document.getElementById('imageContainer').appendChild(imageElement);
            });
        }
    </script>
</body>
</html>
```

Collapse code

## Supported ByteDance Seedream Models

The following ByteDance Seedream models are supported by Puter.js, which can be used with the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
ByteDance-Seed/Seedream-4.0
ByteDance-Seed/Seedream-3.0
```

You're all set! With Puter.js, you've unlocked free access to ByteDance Seedream models. Build stunning AI-powered image generation features into your appsâno API keys to manage, no backend servers to maintain, and zero infrastructure costs. Experience truly serverless image generation with Seedream!

## Related

- [Free, Unlimited FLUX AI API](/tutorials/free-unlimited-flux-api/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
- [Free, Unlimited Nano Banana API](/tutorials/free-unlimited-nano-banana-api/)
- [Free, Unlimited Stable Diffusion API](/tutorials/free-unlimited-stable-diffusion-api/)
- [Free, Unlimited Leonardo.Ai API](/tutorials/free-unlimited-leonardo-ai-api/)
- [Free, Unlimited Ideogram API](/tutorials/free-unlimited-ideogram-api/)
- [Free, Unlimited HiDream API](/tutorials/free-unlimited-hidream-api/)
- [Free, Unlimited RunDiffusion API](/tutorials/free-unlimited-rundiffusion-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
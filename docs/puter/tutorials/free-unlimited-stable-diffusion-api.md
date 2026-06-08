# Free, Unlimited Stable Diffusion API

Source: https://developer.puter.com/tutorials/free-unlimited-stable-diffusion-api/

[Tutorials](/tutorials/)

# Free, Unlimited Stable Diffusion API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: November 9, 2025
                                    

On this page[Getting Started](#getting-started)[Example 1: Generate an image with Stable Diffusion 3](#example-1-generate-an-image-with-stable-diffusion-3)[Example 2: Generate an image with Stable Diffusion XL](#example-2-generate-an-image-with-stable-diffusion-xl)[Example 3: Advanced Generation with Negative Prompts and Custom Parameters](#example-3-advanced-generation-with-negative-prompts-and-custom-parameters)[Supported Stable Diffusion Models](#supported-stable-diffusion-models)[Related](#related)

This guide demonstrates how to leverage [Puter.js](https://developer.puter.com) for generating images with Stable Diffusion AI models at no cost, eliminating the need for API keys or backend infrastructure. With Puter.js, you gain immediate access to industry-leading Stable Diffusion models such as [Stable Diffusion 3 Medium](/ai/stabilityai/stable-diffusion-3-medium/) and [Stable Diffusion XL](/ai/stabilityai/stable-diffusion-xl-base-1.0/), all callable directly from client-side JavaScript.

Through Puter's innovative ["User-Pays" model](https://docs.puter.com/user-pays-model/), developers can integrate sophisticated AI image generation into their apps while users handle their individual usage expenses. This approach lets you deliver professional-grade image generation features without incurring costs, managing API credentials, or configuring server infrastructure.

## Getting Started

Using Puter.js requires zero configurationâno API keys, no sign-up process. Simply add this script tag to your HTML file (works in both `<head>` and `<body>` sections):

```javascript
<script src="https://js.puter.com/v2/"></script>
```

That single line is all you need to start generating images with Stable Diffusion models in your application.

## Example 1: Generate an image with Stable Diffusion 3

To generate an image using Stable Diffusion 3 Medium, use the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
puter.ai.txt2img(
    "A serene Japanese garden with cherry blossoms and a koi pond",
    { model: "stabilityai/stable-diffusion-3-medium" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Stable Diffusion 3 Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A serene Japanese garden with cherry blossoms and a koi pond",
            { model: "stabilityai/stable-diffusion-3-medium" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Example 2: Generate an image with Stable Diffusion XL

To generate an image using Stable Diffusion XL, simply change the model parameter:

```javascript
puter.ai.txt2img(
    "A cyberpunk cityscape with neon lights and flying vehicles",
    { model: "stabilityai/stable-diffusion-xl-base-1.0" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Stable Diffusion XL Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A cyberpunk cityscape with neon lights and flying vehicles",
            { model: "stabilityai/stable-diffusion-xl-base-1.0" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Example 3: Advanced Generation with Negative Prompts and Custom Parameters

This example demonstrates advanced options like negative prompts, custom dimensions, seed control, and diffusion steps for more precise image generation:

```javascript
puter.ai.txt2img(
    "A majestic dragon perched on a mountain peak, fantasy art style, detailed scales, dramatic lighting",
    {
        model: "stabilityai/stable-diffusion-3-medium",
        width: 768,
        height: 1024,
        steps: 30,
        seed: 42,
        negative_prompt: "blurry, low quality, distorted, ugly, bad anatomy, watermark, text, signature"
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
    <h1>Advanced Stable Diffusion Generation</h1>
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
    <h1>Advanced Stable Diffusion Generation</h1>
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
                    model: "stabilityai/stable-diffusion-3-medium",
                    width: 768,
                    height: 1024,
                    steps: 30,
                    seed: 42, // Same seed will produce consistent results
                    negative_prompt: "blurry, low quality, distorted, ugly, bad anatomy, watermark, text, signature"
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

## Supported Stable Diffusion Models

The following Stable Diffusion models are supported by Puter.js, which can be used with the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
stabilityai/stable-diffusion-3-medium
stabilityai/stable-diffusion-xl-base-1.0
```

You're all set! With Puter.js, you've unlocked free access to Stable Diffusion's powerful models. Build stunning AI-powered image generation features into your appsâno API keys to manage, no backend servers to maintain, and zero infrastructure costs. Experience truly serverless image generation with Stable Diffusion!

## Related

- [Best Image Generation APIs in 2026](/blog/best-image-generation-apis/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
- [Free, Unlimited Nano Banana API](/tutorials/free-unlimited-nano-banana-api/)
- [Free, Unlimited ByteDance Seedream API](/tutorials/free-unlimited-bytedance-seedream-api/)
- [Free, Unlimited Leonardo.Ai API](/tutorials/free-unlimited-leonardo-ai-api/)
- [Free, Unlimited Ideogram API](/tutorials/free-unlimited-ideogram-api/)
- [Free, Unlimited HiDream API](/tutorials/free-unlimited-hidream-api/)
- [Free, Unlimited RunDiffusion API](/tutorials/free-unlimited-rundiffusion-api/)
- [Free, Unlimited Veo API](/tutorials/free-unlimited-veo-api/)
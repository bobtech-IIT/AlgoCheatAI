# Free, Unlimited Imagen API

Source: https://developer.puter.com/tutorials/free-unlimited-imagen-api/

[Tutorials](/tutorials/)

# Free, Unlimited Imagen API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 6, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Generate an image with Imagen 4](#example-1-generate-an-image-with-imagen-4)[Example 2: Fast image generation with Imagen 4 Fast](#example-2-fast-image-generation-with-imagen-4-fast)[Example 3: High realism with Imagen 4 Ultra](#example-3-high-realism-with-imagen-4-ultra)[Supported Imagen Models](#supported-imagen-models)[Related](#related)

This tutorial shows how to use [Puter.js](https://developer.puter.com) for generating images with Google's [Imagen](/ai/imagen/) 4 models for free, without needing API keys or backend infrastructure. With Puter.js, you gain immediate access to Imagen 4 models including [Imagen 4](/ai/google/imagen-4.0/), [Imagen 4 Fast](/ai/google/imagen-4.0-fast/), and [Imagen 4 Ultra](/ai/google/imagen-4.0-ultra/), all callable directly from client-side JavaScript.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own usage costs. This means you as a developer don't pay anything for users' usage, making your app practically free to run. You can scale to unlimited users and you pay nothing for the cloud services.

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

This is all you need to start generating images with Imagen 4 models in your application.

## Example 1: Generate an image with Imagen 4

To generate an image using Imagen 4, use the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
puter.ai.txt2img(
    "A serene Japanese garden with cherry blossoms and a koi pond",
    { model: "google/imagen-4.0" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Imagen 4 Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A serene Japanese garden with cherry blossoms and a koi pond",
            { model: "google/imagen-4.0" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Example 2: Fast image generation with Imagen 4 Fast

To generate an image quickly using Imagen 4 Fast, simply change the model parameter:

```javascript
puter.ai.txt2img(
    "A cyberpunk cityscape with neon lights and flying vehicles",
    { model: "google/imagen-4.0-fast" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Imagen 4 Fast Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A cyberpunk cityscape with neon lights and flying vehicles",
            { model: "google/imagen-4.0-fast" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Example 3: High realism with Imagen 4 Ultra

To generate images with maximum realism and quality using Imagen 4 Ultra:

```javascript
puter.ai.txt2img(
    "An extreme close-up shot plunges into a beautiful field overflowing with abundant frosted wildflowers. Innumerable petals and stems, vibrant with underlying hues of deep pinks, purples, and yellows, are delicately glazed with a layer of sparkling ice crystals. The frost catches the crisp morning light, creating a shimmering effect over the vivid colors beneath. The razor-thin depth of field renders only the nearest blossoms in hyper-sharp detail, revealing the intricate crystalline structures against the bright pigments, while the dense field behind melts into a dazzling, soft-focus tapestry of frosted color and light. This view captures the magical contrast between the icy coating and the persistent vibrancy of the flowers, evoking a sense of resilient beauty in the cold dawn.",
    { model: "google/imagen-4.0-ultra" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Imagen 4 Ultra High Realism</h1>
    <button onclick="generateImage()">Generate Ultra Realistic Image</button>
    <div id="imageContainer"></div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        function generateImage() {
            // Clear previous image
            document.getElementById('imageContainer').innerHTML = 'Generating...';

            puter.ai.txt2img(
                "An extreme close-up shot plunges into a beautiful field overflowing with abundant frosted wildflowers. Innumerable petals and stems, vibrant with underlying hues of deep pinks, purples, and yellows, are delicately glazed with a layer of sparkling ice crystals. The frost catches the crisp morning light, creating a shimmering effect over the vivid colors beneath. The razor-thin depth of field renders only the nearest blossoms in hyper-sharp detail, revealing the intricate crystalline structures against the bright pigments, while the dense field behind melts into a dazzling, soft-focus tapestry of frosted color and light. This view captures the magical contrast between the icy coating and the persistent vibrancy of the flowers, evoking a sense of resilient beauty in the cold dawn.",
                { model: "google/imagen-4.0-ultra" }
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

## Supported Imagen Models

The following Imagen models are supported by Puter.js, which can be used with the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
google/imagen-4.0
google/imagen-4.0-fast
google/imagen-4.0-ultra
```

You're all set! With Puter.js, you've unlocked free access to Google's powerful Imagen 4 models. Build stunning AI-powered image generation features into your appsâno API keys to manage, no backend servers to maintain, and zero infrastructure costs. Experience truly serverless image generation with Imagen!

## Related

- [Best Image Generation APIs in 2026](/blog/best-image-generation-apis/)
- [Free, Unlimited FLUX AI API](/tutorials/free-unlimited-flux-api/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
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
# Free, Unlimited HiDream API

Source: https://developer.puter.com/tutorials/free-unlimited-hidream-api/

[Tutorials](/tutorials/)

# Free, Unlimited HiDream API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 8, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: High-fidelity generation with HiDream I1 Full](#example-1-high-fidelity-generation-with-hidream-i1-full)[Example 2: Balanced speed and quality with HiDream I1 Dev](#example-2-balanced-speed-and-quality-with-hidream-i1-dev)[Example 3: Low-latency generation with HiDream I1 Fast](#example-3-low-latency-generation-with-hidream-i1-fast)[Supported HiDream Models](#supported-hidream-models)[Conclusion](#conclusion)[Related](#related)

This tutorial shows you how to add [HiDream](/ai/hidream-ai/) image generation to your web application using [Puter.js](https://developer.puter.com), without needing API keys or backend infrastructure. With Puter.js, you can access HiDream's 17-billion-parameter sparse Diffusion Transformer family â [HiDream I1 Full](/ai/hidream-ai/hidream-i1-full/), [HiDream I1 Dev](/ai/hidream-ai/hidream-i1-dev/), and [HiDream I1 Fast](/ai/hidream-ai/hidream-i1-fast/) â directly from client-side JavaScript.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you, as a developer, don't pay anything for your users' image generation, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI or server usage.

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

This is all you need to start generating images with HiDream models in your application.

## Example 1: High-fidelity generation with HiDream I1 Full

HiDream I1 Full is the flagship variant â a 17B-parameter sparse Diffusion Transformer that runs 50+ diffusion steps and tops GenEval, DPG-Bench, and HPS v2.1 against models like FLUX.1-dev and [DALL-E](/ai/dall-e/) 3. Use it when image quality and prompt adherence matter most. To generate an image, use the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
puter.ai.txt2img(
    "A serene Japanese garden with cherry blossoms and a koi pond",
    { model: "hidream-ai/hidream-i1-full" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>HiDream I1 Full Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A serene Japanese garden with cherry blossoms and a koi pond",
            { model: "hidream-ai/hidream-i1-full" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Example 2: Balanced speed and quality with HiDream I1 Dev

HiDream I1 Dev is the guidance-distilled middle variant â about 28 diffusion steps, no negative prompts required, and a guidance scale of 1.0. It's a strong default for iterative workflows where you want quality close to the Full variant without paying its full latency cost:

```javascript
puter.ai.txt2img(
    "A cyberpunk cityscape with neon lights and flying vehicles",
    { model: "hidream-ai/hidream-i1-dev" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>HiDream I1 Dev Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A cyberpunk cityscape with neon lights and flying vehicles",
            { model: "hidream-ai/hidream-i1-dev" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Example 3: Low-latency generation with HiDream I1 Fast

HiDream I1 Fast finishes in as few as 14-16 diffusion steps, making it ideal for real-time UIs, high-throughput pipelines, or anywhere responsiveness is the top priority:

```javascript
puter.ai.txt2img(
    "A cute corgi astronaut floating in zero gravity, vivid colors, highly detailed",
    { model: "hidream-ai/hidream-i1-fast" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>HiDream I1 Fast Image Generation</h1>
    <button onclick="generateImage()">Generate Image</button>
    <div id="imageContainer"></div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        function generateImage() {
            document.getElementById('imageContainer').innerHTML = 'Generating...';

            puter.ai.txt2img(
                "A cute corgi astronaut floating in zero gravity, vivid colors, highly detailed",
                { model: "hidream-ai/hidream-i1-fast" }
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

## Supported HiDream Models

The following HiDream models are supported by Puter.js, which can be used with the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
hidream-ai/hidream-i1-full
hidream-ai/hidream-i1-dev
hidream-ai/hidream-i1-fast
```

## Conclusion

Using Puter.js, you can integrate HiDream image generation into your app without having to use API keys or set up an AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), you can add this feature for free to your application, since your users cover their own image generation usage, not you as the developer.

You can find more details about Puter.js image generation API in the [documentation](https://docs.puter.com/AI/txt2img/).

## Related

- [Free, Unlimited FLUX AI API](/tutorials/free-unlimited-flux-api/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
- [Free, Unlimited Imagen API](/tutorials/free-unlimited-imagen-api/)
- [Free, Unlimited Nano Banana API](/tutorials/free-unlimited-nano-banana-api/)
- [Free, Unlimited Stable Diffusion API](/tutorials/free-unlimited-stable-diffusion-api/)
- [Free, Unlimited ByteDance Seedream API](/tutorials/free-unlimited-bytedance-seedream-api/)
- [Free, Unlimited Leonardo.Ai API](/tutorials/free-unlimited-leonardo-ai-api/)
- [Free, Unlimited Ideogram API](/tutorials/free-unlimited-ideogram-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
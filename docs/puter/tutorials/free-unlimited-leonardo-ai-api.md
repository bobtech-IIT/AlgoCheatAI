# Free, Unlimited Leonardo.Ai API

Source: https://developer.puter.com/tutorials/free-unlimited-leonardo-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited Leonardo.Ai API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 30, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Generate an image with Lucid Origin](#example-1-generate-an-image-with-lucid-origin)[Example 2: Generate an image with Phoenix 1.0](#example-2-generate-an-image-with-phoenix-10)[Supported Leonardo.Ai Models](#supported-leonardoai-models)[Related](#related)

This tutorial shows you how to add [Leonardo.Ai](/ai/leonardoai/) image generation to your web application using [Puter.js](https://developer.puter.com), without needing API keys or backend infrastructure. With Puter.js, you can access Leonardo.Ai models such as [Lucid Origin](/ai/leonardoai/lucid-origin/) and [Phoenix 1.0](/ai/leonardoai/phoenix-1.0/) directly from client-side JavaScript.

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

Nothing else is required to start generating images with Leonardo.Ai models in your application.

## Example 1: Generate an image with Lucid Origin

To generate an image using Lucid Origin, use the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
puter.ai.txt2img(
    "A bold typographic poster for a coffee shop, vibrant colors, sharp detail, the words 'MORNING BREW' rendered cleanly in the center",
    { model: "leonardoai/lucid-origin" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Lucid Origin Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A bold typographic poster for a coffee shop, vibrant colors, sharp detail, the words 'MORNING BREW' rendered cleanly in the center",
            { model: "leonardoai/lucid-origin" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Example 2: Generate an image with Phoenix 1.0

Phoenix 1.0 is Leonardo.Ai's foundational image model, built for high prompt fidelity (around 95% adherence) and high-resolution output up to ~5 megapixels. To use it, simply change the model parameter:

```javascript
puter.ai.txt2img(
    "A magazine cover featuring an astronaut floating above Earth at sunrise, magazine title 'ORBIT' across the top, photorealistic, magazine layout",
    { model: "leonardoai/phoenix-1.0" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Phoenix 1.0 Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A magazine cover featuring an astronaut floating above Earth at sunrise, magazine title 'ORBIT' across the top, photorealistic, magazine layout",
            { model: "leonardoai/phoenix-1.0" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Supported Leonardo.Ai Models

The following Leonardo.Ai models are supported by Puter.js, which can be used with the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
leonardoai/lucid-origin
leonardoai/phoenix-1.0
```

Using Puter.js, you can integrate Leonardo.Ai image generation into your app without having to use API keys or set up an AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), you can add this feature for free to your application, since your users cover their own image generation usage, not you as the developer.

You can find more details about Puter.js image generation API in the [documentation](https://docs.puter.com/AI/txt2img/).

## Related

- [Free, Unlimited FLUX AI API](/tutorials/free-unlimited-flux-api/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
- [Free, Unlimited Imagen API](/tutorials/free-unlimited-imagen-api/)
- [Free, Unlimited Nano Banana API](/tutorials/free-unlimited-nano-banana-api/)
- [Free, Unlimited Stable Diffusion API](/tutorials/free-unlimited-stable-diffusion-api/)
- [Free, Unlimited ByteDance Seedream API](/tutorials/free-unlimited-bytedance-seedream-api/)
- [Free, Unlimited HiDream API](/tutorials/free-unlimited-hidream-api/)
- [Free, Unlimited RunDiffusion API](/tutorials/free-unlimited-rundiffusion-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
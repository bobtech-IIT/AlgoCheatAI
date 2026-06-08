# Free, Unlimited Ideogram API

Source: https://developer.puter.com/tutorials/free-unlimited-ideogram-api/

[Tutorials](/tutorials/)

# Free, Unlimited Ideogram API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 1, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Photorealistic image generation](#example-1-photorealistic-image-generation)[Example 2: In-image text rendering](#example-2-in-image-text-rendering)[Supported Ideogram Models](#supported-ideogram-models)[Conclusion](#conclusion)[Related](#related)

This tutorial shows you how to add [Ideogram](/ai/ideogram/) image generation to your web application using [Puter.js](https://developer.puter.com), without needing API keys or backend infrastructure. With Puter.js, you can access [Ideogram 3.0](/ai/ideogram/ideogram-3.0/) directly from client-side JavaScript â known for industry-leading in-image text rendering and photorealistic output.

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

Nothing else is required to start generating images with Ideogram in your application.

## Example 1: Photorealistic image generation

To generate an image using Ideogram 3.0, use the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
puter.ai.txt2img(
    "A photorealistic close-up of a hummingbird hovering beside a tropical flower, golden hour lighting, shallow depth of field",
    { model: "ideogram/ideogram-3.0" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Ideogram 3.0 Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A photorealistic close-up of a hummingbird hovering beside a tropical flower, golden hour lighting, shallow depth of field",
            { model: "ideogram/ideogram-3.0" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Example 2: In-image text rendering

Ideogram is known for accurate, stylized typography rendered directly inside generated images â a strong fit for posters, logos, and marketing visuals where competing models often produce garbled text. Try a prompt with explicit text:

```javascript
puter.ai.txt2img(
    "A retro-futurist concert poster, bold geometric layout, the title 'NEON HORIZON' in chrome metallic letters across the top, the subtitle 'Live at the Astrodome â Saturday August 9' centered below, vibrant magenta and cyan accents",
    { model: "ideogram/ideogram-3.0" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Ideogram 3.0 Typographic Poster</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A retro-futurist concert poster, bold geometric layout, the title 'NEON HORIZON' in chrome metallic letters across the top, the subtitle 'Live at the Astrodome â Saturday August 9' centered below, vibrant magenta and cyan accents",
            { model: "ideogram/ideogram-3.0" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Supported Ideogram Models

The following Ideogram models are supported by Puter.js, which can be used with the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
ideogram/ideogram-3.0
```

## Conclusion

Using Puter.js, you can integrate Ideogram image generation into your app without having to use API keys or set up an AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), you can add this feature for free to your application, since your users cover their own image generation usage, not you as the developer.

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
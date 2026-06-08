# Free, Unlimited RunDiffusion API

Source: https://developer.puter.com/tutorials/free-unlimited-rundiffusion-api/

[Tutorials](/tutorials/)

# Free, Unlimited RunDiffusion API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 8, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Fast generation with Juggernaut Lightning Flux](#example-1-fast-generation-with-juggernaut-lightning-flux)[Example 2: High-fidelity generation with Juggernaut Pro Flux](#example-2-high-fidelity-generation-with-juggernaut-pro-flux)[Supported RunDiffusion Models](#supported-rundiffusion-models)[Conclusion](#conclusion)[Related](#related)

This tutorial shows you how to add [RunDiffusion](/ai/rundiffusion/) image generation to your web application using [Puter.js](https://developer.puter.com), without needing API keys or backend infrastructure. With Puter.js, you can access RunDiffusion's photorealistic Juggernaut Flux models â [Juggernaut Lightning Flux](/ai/rundiffusion/juggernaut-lightning-flux/) and [Juggernaut Pro Flux](/ai/rundiffusion/juggernaut-pro-flux/) â directly from client-side JavaScript.

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

Nothing else is required to start generating images with RunDiffusion's Juggernaut models in your application.

## Example 1: Fast generation with Juggernaut Lightning Flux

Juggernaut Lightning Flux is a speed-optimized variant of the Juggernaut Flux family â built on top of FLUX and tuned by RunDiffusion for photorealistic output with low-latency inference. It's a great default when you want quick previews or interactive UI:

```javascript
puter.ai.txt2img(
    "A photorealistic portrait of a fashion model on a Tokyo street at night, neon reflections on wet pavement, 35mm film aesthetic, shallow depth of field",
    { model: "rundiffusion/juggernaut-lightning-flux" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Juggernaut Lightning Flux Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A photorealistic portrait of a fashion model on a Tokyo street at night, neon reflections on wet pavement, 35mm film aesthetic, shallow depth of field",
            { model: "rundiffusion/juggernaut-lightning-flux" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Example 2: High-fidelity generation with Juggernaut Pro Flux

Juggernaut Pro Flux is the higher-quality tier of the Juggernaut Flux line, tuned for sharper detail, better skin and material rendering, and stronger prompt adherence. Use it when you care more about output quality than throughput:

```javascript
puter.ai.txt2img(
    "An ultra-detailed product photograph of a vintage leather watch on a marble surface, soft window light, visible stitching, macro lens, commercial photography",
    { model: "rundiffusion/juggernaut-pro-flux" }
)
.then(imageElement => {
    document.body.appendChild(imageElement);
});
```

Full code example:

```html
<html>
<body>
    <h1>Juggernaut Pro Flux Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "An ultra-detailed product photograph of a vintage leather watch on a marble surface, soft window light, visible stitching, macro lens, commercial photography",
            { model: "rundiffusion/juggernaut-pro-flux" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

## Supported RunDiffusion Models

The following RunDiffusion models are supported by Puter.js, which can be used with the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
rundiffusion/juggernaut-lightning-flux
rundiffusion/juggernaut-pro-flux
```

## Conclusion

Using Puter.js, you can integrate RunDiffusion's Juggernaut Flux models into your app without having to use API keys or set up an AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), you can add this feature for free to your application, since your users cover their own image generation usage, not you as the developer.

You can find more details about Puter.js image generation API in the [documentation](https://docs.puter.com/AI/txt2img/).

## Related

- [Free, Unlimited FLUX AI API](/tutorials/free-unlimited-flux-api/)
- [Free, Unlimited Stable Diffusion API](/tutorials/free-unlimited-stable-diffusion-api/)
- [Free, Unlimited Leonardo.Ai API](/tutorials/free-unlimited-leonardo-ai-api/)
- [Free, Unlimited Ideogram API](/tutorials/free-unlimited-ideogram-api/)
- [Free, Unlimited ByteDance Seedream API](/tutorials/free-unlimited-bytedance-seedream-api/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
- [Free, Unlimited Imagen API](/tutorials/free-unlimited-imagen-api/)
- [Free, Unlimited Nano Banana API](/tutorials/free-unlimited-nano-banana-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
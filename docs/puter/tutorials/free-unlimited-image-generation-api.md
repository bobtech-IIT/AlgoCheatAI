# Free, Unlimited Image Generation API

Source: https://developer.puter.com/tutorials/free-unlimited-image-generation-api/

[Tutorials](/tutorials/)

# Free, Unlimited Image Generation API

[Nariman Jelveh](/author/jelveh/), [Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 17, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Generate a simple image](#example-1-generate-a-simple-image)[Example 2: Use different models and quality settings](#example-2-use-different-models-and-quality-settings)[List of supported image generation models](#list-of-supported-image-generation-models)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to [generate images with AI](/image-generation/) in your apps for free, without needing API keys or servers. Puter.js provides access to powerful image generation models including [GPT Image](/ai/gpt-image/), [DALL-E](/ai/dall-e/) 2, DALL-E 3, Gemini 2.5 Flash Image Preview ([Nano Banana](/ai/nano-banana/)), Flux.1 Schnell, Flux.1 Kontext, Flux 1.1 Pro, Stable Diffusion 3, and Stable Diffusion XL directly from your frontend code.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to [incorporate AI capabilities](/ai/) into their applications while each user covers their own usage costs. This model enables developers to offer advanced image generation capabilities to users at no cost to themselves, without any API keys or server-side setup.

Puter.js is also a great fit for AI coding assistants, agents, and vibe coding platforms such as Claude Code, [Codex](/ai/codex/), OpenCode, Lovable, Replit, Bolt.new, and others. Since Puter.js needs no keys and no backend, AI-generated apps and programs that rely on it run end-to-end with no third-party service to sign up for, nothing to provision, and no API keys to paste in. That removes a significant category of security issues along with the setup friction that normally prevents these apps from working out of the box.

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

Nothing else is required to start using Puter.js for free image generation capabilities.

## Example 1: Generate a simple image

To generate an image using GPT Image, use the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
puter.ai.txt2img("A peaceful mountain landscape at sunset")
    .then(imageElement => {
        document.body.appendChild(imageElement);
    });
```

Full code example:

```html
<html>
<body>
    <h1>AI Image Generation</h1>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img("A peaceful mountain landscape at sunset")
            .then(imageElement => {
                document.body.appendChild(imageElement);
            });
    </script>
</body>
</html>
```

The above example uses the default model to generate an image. You can specify different models and quality settings as shown in the next example.

## Example 2: Use different models and quality settings

You can specify different image generation models and quality levels:

```html
<html>
<body>
    <h2>Different Models Comparison</h2>
    <div id="images"></div>
    
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const prompt = "A futuristic city with flying cars";
        const container = document.getElementById('images');
        container.innerHTML = '';

        // GPT Image with low quality
        puter.ai.txt2img(prompt, { model: "gpt-image-2", quality: "low" })
            .then(img => {
                const div = document.createElement('div');
```

Show 34 more lines...

```html
<html>
<body>
    <h2>Different Models Comparison</h2>
    <div id="images"></div>
    
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const prompt = "A futuristic city with flying cars";
        const container = document.getElementById('images');
        container.innerHTML = '';

        // GPT Image with low quality
        puter.ai.txt2img(prompt, { model: "gpt-image-2", quality: "low" })
            .then(img => {
                const div = document.createElement('div');
                div.innerHTML = '<h3>GPT Image (Quality set to low)</h3>';
                div.appendChild(img);
                container.appendChild(div);
            });

        // Gemini 2.5 Flash Image Preview (Nano Banana)
        puter.ai.txt2img(prompt, { model: "gemini-2.5-flash-image-preview" })
                .then(img => {
                    const div = document.createElement('div');
                    div.innerHTML = '<h3>Gemini 2.5 Flash Image Preview (Nano Banana)</h3>';
                    div.appendChild(img);
                    container.appendChild(div);
                });

        // Stable Diffusion 3
        puter.ai.txt2img(prompt, { model: "stabilityai/stable-diffusion-3-medium" })
                .then(img => {
                    const div = document.createElement('div');
                    div.innerHTML = '<h3>Stable Diffusion 3</h3>';
                    div.appendChild(img);
                    container.appendChild(div);
                });

        // Flux.1 Schnell
        puter.ai.txt2img(prompt, { model: "black-forest-labs/flux-schnell" })
                .then(img => {
                    const div = document.createElement('div');
                    div.innerHTML = '<h3>Flux.1 Schnell</h3>';
                    div.appendChild(img);
                    container.appendChild(div);
                });
    </script>
</body>
</html>
```

Collapse code

## List of supported image generation models

The following image generation models are supported by Puter.js, which can be used with the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
gemini-3.1-flash-image-preview
gemini-3-pro-image-preview
gemini-2.5-flash-image-preview
gpt-image-2
gpt-image-1.5
gpt-image-1
gpt-image-1-mini
dall-e-3
dall-e-2
ByteDance-Seed/Seedream-3.0
ByteDance-Seed/Seedream-4.0
HiDream-ai/HiDream-I1-Dev
HiDream-ai/HiDream-I1-Fast
HiDream-ai/HiDream-I1-Full
Lykon/DreamShaper
```

Show 16 more lines...

```javascript
gemini-3.1-flash-image-preview
gemini-3-pro-image-preview
gemini-2.5-flash-image-preview
gpt-image-2
gpt-image-1.5
gpt-image-1
gpt-image-1-mini
dall-e-3
dall-e-2
ByteDance-Seed/Seedream-3.0
ByteDance-Seed/Seedream-4.0
HiDream-ai/HiDream-I1-Dev
HiDream-ai/HiDream-I1-Fast
HiDream-ai/HiDream-I1-Full
Lykon/DreamShaper
Qwen/Qwen-Image
RunDiffusion/Juggernaut-pro-flux
Rundiffusion/Juggernaut-Lightning-Flux
black-forest-labs/FLUX.1-Canny-pro
black-forest-labs/FLUX.1-kontext-max
black-forest-labs/FLUX.1-kontext-pro
black-forest-labs/FLUX.1-krea-dev
black-forest-labs/flux-schnell
black-forest-labs/flux-1.1-pro
google/flash-image-2.5
google/imagen-4.0-fast
google/imagen-4.0-preview
google/imagen-4.0-ultra
ideogram/ideogram-3.0
stabilityai/stable-diffusion-3-medium
stabilityai/stable-diffusion-xl-base-1.0
```

Collapse code

You can also specify quality settings for the following models:

- For `gpt-image-*`: `high`, `medium`, or `low` (default: `low`)
- For `dall-e-3`: `hd` or standard (default: standard)
- For `gemini-2.5-flash-image-preview`: no quality setting is supported

That's it! You now have free access to powerful image generation models using Puter.js. This allows you to create applications with AI-powered image generation capabilities without needing API keys, backend infrastructure, or managing costs. True serverless image generation!

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
- [Free, Unlimited Text to Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Video Analysis API](/tutorials/free-unlimited-video-analysis-api/)
- [Free, Unlimited Image Recognition API](/tutorials/free-unlimited-image-recognition-api/)
- [Free, Unlimited Veo API](/tutorials/free-unlimited-veo-api/)
- [Best Image Generation APIs in 2026](/blog/best-image-generation-apis/)
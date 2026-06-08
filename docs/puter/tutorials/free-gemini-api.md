# Free, Unlimited Gemini API

Source: https://developer.puter.com/tutorials/free-gemini-api/

[Tutorials](/tutorials/)

# Free, Unlimited Gemini API

[Nariman Jelveh](/author/jelveh/), [Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 20, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Text Generation with Gemini 3.5 Flash](#example-1-basic-text-generation-with-gemini-35-flash)[Example 2: Using Gemini 3.1 Pro](#example-2-using-gemini-31-pro)[Example 3: Cost-Efficient Generation with Gemini 3.1 Flash Lite](#example-3-cost-efficient-generation-with-gemini-31-flash-lite)[Example 4: Streaming Responses](#example-4-streaming-responses)[Example 5: Comparing Models](#example-5-comparing-models)[Example 6: Image Analysis](#example-6-image-analysis)[All models](#all-models)[Text-to-Speech with Gemini](#text-to-speech-with-gemini)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Gemini's powerful language models](/ai/google/) for free, without any API keys or usage restrictions. Using Puter.js, you can leverage models like [Gemini 3.5 Flash](/ai/google/gemini-3.5-flash/), [Gemini 3.1 Pro](/ai/google/gemini-3.1-pro-preview/), and [Gemini 3.1 Flash Lite](/ai/google/gemini-3.1-flash-lite/) for various tasks like text generation, image analysis, and complex reasoning, text and code generation, and more.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate AI capabilities into their applications while users cover their own usage costs. This model enables developers to [access advanced AI capabilities](/ai/) for free, without any API keys or sign-ups.

Puter.js is also an exceptional fit for AI coding assistants, agents, and vibe coding platforms like Claude Code, [Codex](/ai/codex/), OpenCode, Lovable, Replit, Bolt.new, and the rest. Because there are no keys and no backend involved, anything these tools produce, with Puter.js, runs end-to-end as soon as it's generated. No third-party signup, no service to spin up, no API keys to paste. That cuts out a whole category of security pitfalls and the configuration overhead that normally stops AI-generated apps from working on the first run.

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

You're now ready to use Puter.js for free access to Gemini capabilities. No API keys or sign-ups are required.

## Example 1: Basic Text Generation with Gemini 3.5 Flash

Here's a simple example showing how to generate text using Gemini 3.5 Flash:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain the concept of black holes in simple terms", {
            model: 'gemini-3.5-flash'
        }).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 2: Using Gemini 3.1 Pro

For comparison, here's how to use Gemini 3.1 Pro:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("What are the major differences between renewable and non-renewable energy sources?", {
            model: 'gemini-3.1-pro-preview'
        }).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 3: Cost-Efficient Generation with Gemini 3.1 Flash Lite

Gemini 3.1 Flash Lite is Google's fastest and most cost-efficient model in the Gemini 3 series, ideal for high-volume tasks like translation, classification, and content moderation:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Classify the following text as positive, negative, or neutral: 'The product works well but the delivery was late.'", {
            model: 'gemini-3.1-flash-lite'
        }).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 4: Streaming Responses

For longer responses, use streaming to get results in real-time:

```html
<html>
<body>
    <div id="output"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponses() {
            const outputDiv = document.getElementById('output');
            
            // Gemini 3.5 Flash with streaming
            outputDiv.innerHTML += '<h2>Gemini 3.5 Flash Response:</h2>';
            const flashResponse = await puter.ai.chat(
                "Explain the process of photosynthesis in detail",
                {
                    model: 'gemini-3.5-flash',
                    stream: true
                }
            );
            
            for await (const part of flashResponse) {
                if (part?.text) {
                    outputDiv.innerHTML += part.text.replaceAll('\n', '<br>');
                }
            }            
        }

        streamResponses();
    </script>
</body>
</html>
```

## Example 5: Comparing Models

Here's how to compare responses from multiple Gemini models:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
    (async () => {
        // Gemini 3.5 Flash
        const flash35_resp = await puter.ai.chat(
            'Tell me something interesting about quantum mechanics.',
            {model: 'gemini-3.5-flash', stream: true}
        );
        puter.print('<h2>Gemini 3.5 Flash Response:</h2>');
        for await (const part of flash35_resp) {
            if (part?.text) {
                puter.print(part.text.replaceAll('\n', '<br>'));
            }
```

Show 41 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
    (async () => {
        // Gemini 3.5 Flash
        const flash35_resp = await puter.ai.chat(
            'Tell me something interesting about quantum mechanics.',
            {model: 'gemini-3.5-flash', stream: true}
        );
        puter.print('<h2>Gemini 3.5 Flash Response:</h2>');
        for await (const part of flash35_resp) {
            if (part?.text) {
                puter.print(part.text.replaceAll('\n', '<br>'));
            }
        }

        // Gemini 3.1 Pro
        const pro31_resp = await puter.ai.chat(
            'Tell me something interesting about quantum mechanics.',
            {model: 'gemini-3.1-pro-preview', stream: true}
        );
        puter.print('<h2>Gemini 3.1 Pro Response:</h2>');
        for await (const part of pro31_resp) {
            if (part?.text) {
                puter.print(part.text.replaceAll('\n', '<br>'));
            }
        }

        // Gemini 3 Pro
        const pro3_resp = await puter.ai.chat(
            'Tell me something interesting about quantum mechanics.',
            {model: 'gemini-3-pro-preview', stream: true}
        );
        puter.print('<h2>Gemini 3 Pro Response:</h2>');
        for await (const part of pro3_resp) {
            if (part?.text) {
                puter.print(part.text.replaceAll('\n', '<br>'));
            }
        }

        // Gemini 3.1 Flash Lite
        const flashlite31_resp = await puter.ai.chat(
            'Tell me something interesting about quantum mechanics.',
            {model: 'gemini-3.1-flash-lite', stream: true}
        );
        puter.print('<h2>Gemini 3.1 Flash Lite Response:</h2>');
        for await (const part of flashlite31_resp) {
            if (part?.text) {
                puter.print(part.text.replaceAll('\n', '<br>'));
            }
        }
    })();
    </script>
</body>
</html>
```

Collapse code

## Example 6: Image Analysis

To analyze images, simply provide an image URL to [`puter.ai.chat()`](https://docs.puter.com/AI/chat/):

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <img src="https://assets.puter.site/doge.jpeg" id="image">
    <script>
        puter.ai.chat(
            "What do you see in this image?",
            "https://assets.puter.site/doge.jpeg",
            { model: 'gemini-3.5-flash' }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## All models

The following Gemini models are available for free use with Puter.js:

```javascript
gemini-3.5-flash
gemini-3.1-flash-lite
gemini-3.1-pro-preview
gemini-3-flash-preview
gemini-3-pro-preview
gemini-2.5-flash-lite-preview-09-2025
gemini-2.5-flash-preview-09-2025
gemini-2.5-flash-lite
gemini-2.5-pro-preview
gemini-2.5-pro-preview-05-06
gemini-2.5-flash
gemini-2.5-pro
gemini-2.0-flash
gemini-2.0-flash-lite
```

Puter.js support for Gemini is not limited to text generation, you can also use it for image generation via Gemini 2.5 Flash/3 Pro Image, also known as [Nano Banana](/ai/nano-banana/)! Please refer to the [Gemini Image Generation tutorial](/tutorials/free-unlimited-nano-banana-api/) for more information.

## Text-to-Speech with Gemini

Puter.js also supports Gemini TTS, giving you access to Google's text-to-speech models with 30 unique voices and natural language style control. Available models include `gemini-2.5-flash-preview-tts`, `gemini-2.5-pro-preview-tts`, and `gemini-3.1-flash-tts-preview`.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2speech("Hello! This is Gemini text-to-speech.", {
            provider: "gemini",
            model: "gemini-2.5-flash-preview-tts",
            voice: "Puck",
            instructions: "Speak in a friendly, upbeat tone."
        }).then(audio => {
            audio.play();
        });
    </script>
</body>
</html>
```

You can use the `instructions` parameter to control the speaking style with plain English. For a full list of available voices, see the [Text-to-Speech API Documentation](https://docs.puter.com/AI/txt2speech/).

That's it! You now have free access to Gemini's powerful capabilities using Puter.js, from text generation and image analysis to text-to-speech. This allows you to add sophisticated AI features to your web applications without worrying about API keys or usage limits.

## Related

- [Free, Unlimited Nano Banana (Gemini 3 Pro and 2.5 Flash Image) API](/tutorials/free-unlimited-nano-banana-api/)
- [Free, Unlimited Google AI API](/tutorials/free-unlimited-google-ai-api/)
- [Free, Unlimited Gemma API](/tutorials/free-unlimited-gemma-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Grok API](/tutorials/free-unlimited-grok-api/)
- [Free, Unlimited Mistral API](/tutorials/free-unlimited-mistral-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited Amazon Nova API](/tutorials/free-unlimited-amazon-nova-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Liquid AI API](/tutorials/free-unlimited-liquid-ai-api/)
- [Free, Unlimited Kimi K2.6 API](/tutorials/free-unlimited-kimi-k2-api/)
- [Free, Unlimited Inception Mercury API](/tutorials/free-unlimited-inception-mercury-api/)
- [Gemini API Pricing](/tutorials/gemini-api-pricing/)
# Free, Unlimited Google AI API

Source: https://developer.puter.com/tutorials/free-unlimited-google-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited Google AI API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 20, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Text Generation with Gemini 3.5 Flash](#example-1-basic-text-generation-with-gemini-35-flash)[Example 2: Using Gemini 3.1 Pro for Complex Reasoning](#example-2-using-gemini-31-pro-for-complex-reasoning)[Example 3: Streaming Responses](#example-3-streaming-responses)[Example 4: Image Analysis with Gemini](#example-4-image-analysis-with-gemini)[Example 5: Comparing Different Google AI Models](#example-5-comparing-different-google-ai-models)[Example 6: Using Gemma Models for Lightweight Tasks](#example-6-using-gemma-models-for-lightweight-tasks)[Example 7: Control Output with Temperature](#example-7-control-output-with-temperature)[All Available Google AI Models](#all-available-google-ai-models)[Gemini Models](#gemini-models)[Gemma Models](#gemma-models)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Google AI's powerful language models](/ai/google/) for free, without any API keys or usage restrictions. Using Puter.js, you can leverage models like [Gemini 3.5 Flash](/ai/google/gemini-3.5-flash/), [Gemini 3.1 Pro](/ai/google/gemini-3.1-pro-preview/), [Gemini 3.1 Flash-Lite](/ai/google/gemini-3.1-flash-lite/), and the [Gemma 4](/ai/google/gemma-4-31b-it/) series for various tasks including text generation, image analysis, complex reasoning, and more.

Puter is the inventor of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which lets developers [add AI features](/ai/) to their apps while end users handle their own usage costs. This approach allows developers to tap into advanced AI tools for free, with no need for API keys, backend setup, or server-side code.

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

You're now ready to use Puter.js for free access to Google AI capabilities. No API keys or server-side setup are required.

## Example 1: Basic Text Generation with Gemini 3.5 Flash

Here's a simple example showing how to generate text using Gemini 3.5 Flash:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain the concept of machine learning in simple terms", {
            model: 'google/gemini-3.5-flash'
        }).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 2: Using Gemini 3.1 Pro for Complex Reasoning

For more sophisticated tasks requiring deeper analysis, use Gemini 3.1 Pro:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Compare and contrast the economic impacts of renewable versus non-renewable energy sources over the next 20 years", 
            {
                model: 'google/gemini-3.1-pro-preview'
            }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 3: Streaming Responses

For longer responses, use streaming to get results in real-time:

```html
<html>
<body>
    <div id="output"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponses() {
            const outputDiv = document.getElementById('output');
            
            outputDiv.innerHTML += '<h2>Gemini 3.5 Flash Streaming Response:</h2>';
            const response = await puter.ai.chat(
                "Explain the process of photosynthesis in detail", 
                {
                    model: 'google/gemini-3.5-flash',
                    stream: true
                }
            );
            
            for await (const part of response) {
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

## Example 4: Image Analysis with Gemini

To analyze images, simply provide an image URL to [`puter.ai.chat()`](https://docs.puter.com/AI/chat/):

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <img src="https://assets.puter.site/doge.jpeg" id="image">
    <script>
        puter.ai.chat(
            "What do you see in this image? Describe it in detail.",
            "https://assets.puter.site/doge.jpeg",
            { model: 'google/gemini-3.5-flash' }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 5: Comparing Different Google AI Models

Here's how to compare responses from different Google AI models:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
    (async () => {
        const prompt = 'Explain quantum entanglement in simple terms.';
        
        // Gemini 3.1 Pro
        const proResp = await puter.ai.chat(
            prompt,
            {model: 'google/gemini-3.1-pro-preview', stream: true}
        );
        puter.print('<h2>Gemini 3.1 Pro Response:</h2>');
        for await (const part of proResp) {
            if(part?.reasoning) {
```

Show 34 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
    (async () => {
        const prompt = 'Explain quantum entanglement in simple terms.';
        
        // Gemini 3.1 Pro
        const proResp = await puter.ai.chat(
            prompt,
            {model: 'google/gemini-3.1-pro-preview', stream: true}
        );
        puter.print('<h2>Gemini 3.1 Pro Response:</h2>');
        for await (const part of proResp) {
            if(part?.reasoning) {
                puter.print(part.reasoning.replaceAll('\n', '<br>'));
            }
            if (part?.text) {
                puter.print(part.text.replaceAll('\n', '<br>'));
            }
        }

        // Gemini 3.5 Flash
        const flashResp = await puter.ai.chat(
            prompt,
            {model: 'google/gemini-3.5-flash', stream: true}
        );
        puter.print('<h2>Gemini 3.5 Flash Response:</h2>');
        for await (const part of flashResp) {
            if (part?.text) {
                puter.print(part.text.replaceAll('\n', '<br>'));
            }
        }

        // Gemini 3.1 Flash-Lite
        const flashLiteResp = await puter.ai.chat(
            prompt,
            {model: 'google/gemini-3.1-flash-lite', stream: true}
        );
        puter.print('<h2>Gemini 3.1 Flash-Lite Response:</h2>');
        for await (const part of flashLiteResp) {
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

## Example 6: Using Gemma Models for Lightweight Tasks

The Gemma series offers efficient, open-weight models perfect for high-throughput tasks:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Using Gemma 4 31B model
        puter.ai.chat(
            "Write a haiku about coding",
            { model: 'google/gemma-4-31b-it' }
        ).then(response => {
            puter.print('<h2>Gemma 4 31B Response:</h2>');
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 7: Control Output with Temperature

Control the creativity and randomness of responses using the `temperature` parameter:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Low temperature (0.2) for focused, deterministic output
            const focused = await puter.ai.chat(
                'Write a creative story about a robot', 
                { 
                    model: 'google/gemini-3.5-flash',
                    temperature: 0.2
                }
            );
            puter.print('<b>Low temperature (0.2) - More Focused:</b><br>' + focused + '<br><br>');
            
            // High temperature (0.9) for creative, varied output  
            const creative = await puter.ai.chat(
                'Write a creative story about a robot',
                { 
                    model: 'google/gemini-3.5-flash',
                    temperature: 0.9
                }
            );
            puter.print('<b>High temperature (0.9) - More Creative:</b><br>' + creative);
        })();
    </script>
</body>
</html>
```

## All Available Google AI Models

The following Google AI models are available for free use with Puter.js:

### Gemini Models

```javascript
google/gemini-3.5-flash
google/gemini-3.1-pro-preview
google/gemini-3.1-flash-lite
google/gemini-3-pro-preview
google/gemini-3-flash-preview
google/gemini-2.5-pro
google/gemini-2.5-pro-preview
google/gemini-2.5-pro-preview-05-06
google/gemini-2.5-flash
google/gemini-2.5-flash-preview-09-2025
google/gemini-2.5-flash-lite
google/gemini-2.5-flash-lite-preview-09-2025
google/gemini-2.0-flash
google/gemini-2.0-flash-lite
```

### Gemma Models

```javascript
google/gemma-4-31b-it
google/gemma-4-26b-a4b-it
google/gemma-3-27b-it
google/gemma-3-12b-it
google/gemma-3-4b-it
google/gemma-3n-e4b-it
google/gemma-2-27b-it
```

That's it! You now have free access to Google AI's powerful language models using Puter.js. This allows you to add sophisticated AI capabilities to your web applications without worrying about API keys, usage limits, or backend infrastructure.

## Related

- [Free, Unlimited Gemma API](/tutorials/free-unlimited-gemma-api/)
- [Free, Unlimited Nano Banana API](/tutorials/free-unlimited-nano-banana-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Grok API](/tutorials/free-unlimited-grok-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Video Analysis API](/tutorials/free-unlimited-video-analysis-api/)
- [Free, Unlimited Translation API](/tutorials/free-unlimited-translation-api/)
- [Free, Unlimited Sentiment Analysis API](/tutorials/free-unlimited-sentiment-analysis-api/)
- [Free, Unlimited Summarization API](/tutorials/free-unlimited-summarization-api/)
- [Free, Unlimited Language Detection API](/tutorials/free-unlimited-language-detection-api/)
- [Gemini API Pricing](/tutorials/gemini-api-pricing/)
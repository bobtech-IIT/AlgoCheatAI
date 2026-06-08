# Serverless AI, Forever Free for Developers

Source: https://developer.puter.com/tutorials/serverless-ai-forever-free-for-developers/

[Tutorials](/tutorials/)

# Serverless AI, Forever Free for Developers

[Nariman Jelveh](/author/jelveh/)

                                        Updated: November 14, 2025
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Text Generation with GPT-5 nano](#example-1-basic-text-generation-with-gpt-5-nano)[Example 2: Using Claude 4.5 Sonnet for Complex Tasks](#example-2-using-claude-45-sonnet-for-complex-tasks)[Example 3: Streaming Responses with Llama](#example-3-streaming-responses-with-llama)[Example 4: Vision Capabilities](#example-4-vision-capabilities)[Best Practices](#best-practices)[Related](#related)

This tutorial will show you how to add powerful [AI capabilities](/ai/) to your web applications using Puter.js, completely free and without any API keys or usage restrictions. Using Puter.js, you can leverage multiple AI models including GPT-5.1, GPT-5, Claude 4.5 [Sonnet](/ai/sonnet/), and Llama for various tasks like text generation, analysis, and more.

Puter offers a simple way to add AI to your applications through its ["User-Pays" model](https://docs.puter.com/user-pays-model/). Instead of developers managing API keys and billing, users pay for their own AI usage. This straightforward approach makes it easy for developers to add AI features without the usual complexity and costs.

## Getting Started

Puter.js works without any API keys or sign-ups. To start using Puter.js, include the following script tag in your HTML file, either in the `<head>` or `<body>` section:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

You're now ready to use Puter.js for free AI capabilities. No API keys or sign-ups are required.

## Example 1: Basic Text Generation with GPT-5 nano

Here's a simple example showing how to generate text using GPT-5 nano:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain quantum computing in simple terms").then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

This example demonstrates the most basic usage of the AI capabilities. The `puter.ai.chat()` function sends your prompt to the GPT-5 nano model and returns the response. By default, Puter.js uses GPT-5 nano, which is optimized for speed and efficiency.

## Example 2: Using Claude 4.5 Sonnet for Complex Tasks

Claude 4.5 Sonnet is particularly good at complex reasoning and detailed analysis:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Analyze the potential impact of quantum computing on cryptography", {
            model: 'claude-sonnet-4-5'
        }).then(response => {
            puter.print(response.message.content[0].text);
        });
    </script>
</body>
</html>
```

This example shows how to specify a different model using the options parameter. Claude 4.5 Sonnet is well-suited for tasks requiring deep analysis or technical understanding.

## Example 3: Streaming Responses with Llama

For longer responses, you can use streaming to get results in real-time:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                "Write a detailed analysis of renewable energy sources", 
                {
                    model: 'openrouter:meta-llama/llama-4-maverick',
                    stream: true
                }
            );
            
            for await (const part of response) {
                puter.print(part?.text);
            }
        }

        streamResponse();
    </script>
</body>
</html>
```

This example demonstrates streaming with Llama, which is particularly useful for longer responses. The streaming approach provides a better user experience by showing the response as it's generated rather than waiting for the complete response.

## Example 4: Vision Capabilities

You can also analyze images using GPT-5 nano:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <img src="https://assets.puter.site/doge.jpeg" id="image">
    <script>
        puter.ai.chat(
            "What do you see in this image?",
            "https://assets.puter.site/doge.jpeg"
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

This example shows how to use GPT-5 nano capabilities to analyze images. You can pass an image URL as the second parameter to have the AI analyze its contents.

## Best Practices

When implementing AI in your web applications with Puter.js:

1. Choose the appropriate model for your use case:

- GPT-5 nano: Best for quick, general-purpose responses, including vision-related tasks
- Claude 4.5 Sonnet: Ideal for complex analysis and technical tasks
- Llama: Good for general tasks with different model sizes available
2. Use streaming for longer responses to improve user experience
3. Handle errors gracefully and provide feedback to users when the AI is processing

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
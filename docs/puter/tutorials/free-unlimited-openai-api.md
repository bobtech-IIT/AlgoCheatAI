# Free, Unlimited OpenAI API

Source: https://developer.puter.com/tutorials/free-unlimited-openai-api/

[Tutorials](/tutorials/)

# Free, Unlimited OpenAI API

[Nariman Jelveh](/author/jelveh/), [Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 17, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Use gpt-5.4-nano for text generation](#example-1-use-gpt-54-nano-for-text-generation)[Example 2: Generate images with GPT Image](#example-2-generate-images-with-gpt-image)[Example 3: Analyze images](#example-3-analyze-images)[Example 4: Use different OpenAI models](#example-4-use-different-openai-models)[Example 5: Stream responses for longer queries](#example-5-stream-responses-for-longer-queries)[Example 6: Control randomness and length with `temperature` and `max_tokens`](#example-6-control-randomness-and-length-with-temperature-and-max_tokens)[Example 7: Tool/Function Calling](#example-7-toolfunction-calling)[Example 8: Web Search](#example-8-web-search)[Example 9: Basic text-to-speech](#example-9-basic-text-to-speech)[Example 10: Using GPT-OSS model](#example-10-using-gpt-oss-model)[Example 11: Code generation with Codex](#example-11-code-generation-with-codex)[List of supported text generation models](#list-of-supported-text-generation-models)[List of supported image generation models](#list-of-supported-image-generation-models)[List of supported text-to-speech models](#list-of-supported-text-to-speech-models)[Conclusion](#conclusion)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access OpenAI API for free, without needing an OpenAI API key. Puter.js allows you to provide your users with powerful [AI capabilities](/ai/). You can access [GPT-5.5](/ai/openai/gpt-5.5/), [GPT-5.4](/ai/openai/gpt-5.4/), [GPT-5.3 Chat](/ai/openai/gpt-5.3-chat/), [GPT-5.3-Codex](/ai/openai/gpt-5.3-codex/), [GPT Image](/ai/openai/gpt-image-2/), and more directly from your frontend code without any server-side setup.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate AI capabilities into their applications while each user will cover their own usage costs. This model enables developers to offer advanced AI capabilities to users at no cost to themselves, without any API keys or server-side setup.

Puter.js is also uniquely suited for use by AI coding assistants, agents, and vibe coding platforms like Claude Code, [Codex](/ai/codex/), OpenCode, Lovable, Replit, Bolt.new, and more. Because Puter.js is keyless and serverless, AI-generated apps and programs using it work end-to-end without having to sign up for a third-party backend, provision a service, or paste in API keys. This eliminates both a major class of security issues and the setup friction that usually keeps these apps from running out of the box.

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

Nothing else is required to start using Puter.js for free access to OpenAI API models and capabilities.

## Example 1: Use gpt-5.4-nano for text generation

To generate text using [GPT-5.4 Nano](/ai/openai/gpt-5.4-nano/), use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat("What are the benefits of exercise?", { model: "gpt-5.4-nano" })
    .then(response => {
        puter.print(response);
    });
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("What are the benefits of exercise?", { model: "gpt-5.4-nano" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: Generate images with GPT Image

To create images using [GPT Image](/ai/gpt-image/), use the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
puter.ai.txt2img("A futuristic cityscape at night", { model: "gpt-image-2" })
    .then(imageElement => {
        document.body.appendChild(imageElement);
    });
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img("A futuristic cityscape at night", { model: "gpt-image-2" })
            .then(imageElement => {
                document.body.appendChild(imageElement);
            });
    </script>
</body>
</html>
```

Find more image generation examples in the [GPT Image API tutorial](/tutorials/free-unlimited-gpt-image-api/).

## Example 3: Analyze images

To analyze images, simply provide an image URL to [`puter.ai.chat()`](https://docs.puter.com/AI/chat/):

```javascript
puter.ai.chat(
    "What do you see in this image?", 
    "https://assets.puter.site/doge.jpeg",
    { model: "gpt-5.4-nano" }
)
.then(response => {
    puter.print(response);
});
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "What do you see in this image?", 
            "https://assets.puter.site/doge.jpeg",
            { model: "gpt-5.4-nano" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 4: Use different OpenAI models

You can specify different OpenAI models using the `model` parameter:

```javascript
// Using gpt-5.5 model
puter.ai.chat(
    "Write a short poem about coding",
    { model: "gpt-5.5" }
).then(response => {
    puter.print(response);
});

// Using gpt-5.4 model
puter.ai.chat(
    "Write a short poem about coding",
    { model: "gpt-5.4" }
).then(response => {
    puter.print(response);
});

// Using gpt-5.3-chat model
puter.ai.chat(
    "Write a short poem about coding",
    { model: "gpt-5.3-chat" }
).then(response => {
    puter.print(response);
});
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Using gpt-5.5 model
        puter.ai.chat(
            "Write a short poem about coding",
            { model: "gpt-5.5" }
        ).then(response => {
            puter.print(response);
        });

        // Using gpt-5.4 model
        puter.ai.chat(
            "Write a short poem about coding",
            { model: "gpt-5.4" }
        ).then(response => {
            puter.print(response);
        });

        // Using gpt-5.3-chat model
        puter.ai.chat(
            "Write a short poem about coding",
            { model: "gpt-5.3-chat" }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 5: Stream responses for longer queries

For longer responses, use streaming to get results in real-time:

```javascript
async function streamResponse() {
    const response = await puter.ai.chat(
        "Explain the theory of relativity in detail", 
        {stream: true, model: "gpt-5.4-nano"}
    );
    
    for await (const part of response) {
        puter.print(part?.text);
    }
}

streamResponse();
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat(
                "Explain the theory of relativity in detail", 
                {stream: true, model: "gpt-5.4-nano"}
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

## Example 6: Control randomness and length with `temperature` and `max_tokens`

To control randomness and length, you can use the `temperature` and `max_tokens` parameters in the `options` object:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Low temperature (0.2) for focused, deterministic output
            const focused = await puter.ai.chat(
                'Tell me about planet Mars', 
                { 
                    temperature: 0.2,
                    max_tokens: 10 
                }
            );
            puter.print('<b>Low temperature (0.2), max_tokens: 10:</b><br>' + focused + '<br><br>');
            
            // High temperature (0.8) for creative, varied output  
            const creative = await puter.ai.chat(
                'Tell me about planet Mars',
                { 
                    temperature: 0.8,
                    max_tokens: 50
                }
            );
            puter.print('<b>High temperature (0.8), max_tokens: 50:</b><br>' + creative);
        })();
    </script>
</body>
</html>
```

This example shows how `temperature` affects output randomness (lower = more focused, higher = more creative) and how `max_tokens` limits the response length.

## Example 7: Tool/Function Calling

Here's a concise section for tool/function calling:

```html;ai-tool-calling
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Define a calculator tool
        const tools = [{
            type: "function",
            function: {
                name: "calculate",
                description: "Perform basic math operations",
                parameters: {
                    type: "object",
                    properties: {
                        operation: {
                            type: "string",
```

Show 28 more lines...

```html;ai-tool-calling
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Define a calculator tool
        const tools = [{
            type: "function",
            function: {
                name: "calculate",
                description: "Perform basic math operations",
                parameters: {
                    type: "object",
                    properties: {
                        operation: {
                            type: "string",
                            enum: ["add", "subtract", "multiply", "divide"]
                        },
                        a: { type: "number" },
                        b: { type: "number" }
                    },
                    required: ["operation", "a", "b"]
                }
            }
        }];

        // Ask the AI to use the tool
        puter.ai.chat("What is 15 multiplied by 7?", { tools }).then(response => {
            if (response.message.tool_calls) {
                const call = response.message.tool_calls[0];
                const args = JSON.parse(call.function.arguments);
                
                // Execute the function based on the AI's request
                let result;
                if (args.operation === "multiply") {
                    result = args.a * args.b;
                }
                
                puter.print(`AI requested: ${args.a} Ã ${args.b} = ${result}`);
            }
        });
    </script>
</body>
</html>
```

Collapse code

This example shows how to define tools that the AI can call and process the function calls in your code.

## Example 8: Web Search

Use web search to generate up-to-date and accurate responses from the Internet.

```javascript
puter.ai
.chat("Summarize what the User-Pays Model is: https://docs.puter.com/user-pays-model/", {
    model: "openai/gpt-5.2-chat",
    tools: [{ type: "web_search" }],
})
.then(puter.print);
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.print(`Loading...`);
        puter.ai
            .chat("Summarize what the User-Pays Model is: https://docs.puter.com/user-pays-model/", {
                model: "openai/gpt-5.2-chat",
                tools: [{ type: "web_search" }],
            })
            .then(puter.print);
    </script>
</body>
</html>
```

## Example 9: Basic text-to-speech

OpenAI supports text-to-speech capability which you can use via Puter.js.

```javascript
puter.ai.txt2speech("Hello world! This is OpenAI text-to-speech.", {
    provider: "openai",
})
.then(audio => {
    audio.setAttribute("controls", "");
    document.body.appendChild(audio);
});
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.print("Loading...");
        puter.ai.txt2speech("Hello world! This is OpenAI text-to-speech.", {
            provider: "openai",
        })
        .then(audio => {
            audio.setAttribute("controls", "");
            document.body.appendChild(audio);
        });
    </script>
</body>
</html>
```

Find more text-to-speech examples in the [OpenAI Text to Speech API tutorial](/tutorials/free-unlimited-openai-text-to-speech-api/).

## Example 10: Using GPT-OSS model

[GPT-OSS](/ai/openai/gpt-oss-120b/) is open source model family from OpenAI.

```javascript
puter.ai
    .chat(
        "Debug this logic: If I have 3 apples and give away 5, how many do I have?",
        { model: "openai/gpt-oss-120b", stream: true }
    )
    .then(async (resp) => {
        for await (const part of resp) {
        if (part?.reasoning) puter.print(part?.reasoning);
        else puter.print(part?.text);
        }
    });
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      puter.ai
        .chat(
          "Debug this logic: If I have 3 apples and give away 5, how many do I have?",
          { model: "openai/gpt-oss-120b", stream: true }
        )
        .then(async (resp) => {
          for await (const part of resp) {
            if (part?.reasoning) puter.print(part?.reasoning);
            else puter.print(part?.text);
          }
        });
    </script>
</body>
</html>
```

Find more examples in the [GPT OSS API tutorial](/tutorials/free-unlimited-gpt-oss-api/).

## Example 11: Code generation with Codex

Codex is OpenAI's code generation model family, optimized for programming tasks.

```javascript
puter.ai.chat(
    "Write a Python function that implements binary search on a sorted array",
    { model: "openai/gpt-5.3-codex" }
)
.then(response => {
    puter.print(response);
});
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a Python function that implements binary search on a sorted array",
            { model: "openai/gpt-5.3-codex" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

Find more Codex examples in the [Codex API tutorial](/tutorials/free-unlimited-codex-api/).

## List of supported text generation models

The following OpenAI models are supported by Puter.js, which can be used with the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
gpt-5.5-pro
gpt-5.5
gpt-5.4-mini
gpt-5.4-nano
gpt-5.4
gpt-5.4-pro
gpt-5.3-chat
gpt-5.2
gpt-5.2-chat
gpt-5.2-pro
gpt-5.1
gpt-5.1-chat-latest
gpt-5.3-codex
gpt-5.2-codex
gpt-5.1-codex
```

Show 19 more lines...

```javascript
gpt-5.5-pro
gpt-5.5
gpt-5.4-mini
gpt-5.4-nano
gpt-5.4
gpt-5.4-pro
gpt-5.3-chat
gpt-5.2
gpt-5.2-chat
gpt-5.2-pro
gpt-5.1
gpt-5.1-chat-latest
gpt-5.3-codex
gpt-5.2-codex
gpt-5.1-codex
gpt-5.1-codex-mini
gpt-5.1-codex-max
gpt-5-codex
gpt-5
gpt-5-mini
gpt-5-nano
gpt-5-chat-latest
gpt-4.1
gpt-4.1-mini
gpt-4.1-nano
gpt-4.5-preview
gpt-4o
gpt-4o-mini
o1
o1-mini
o1-pro
o3
o3-mini
o4-mini
```

Collapse code

## List of supported image generation models

The following GPT Image models are supported by Puter.js, which can be used with the [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function:

```javascript
gpt-image-2
gpt-image-1.5
gpt-image-1-mini
gpt-image-1
dall-e-3
dall-e-2
```

## List of supported text-to-speech models

The following OpenAI text-to-speech models are supported by Puter.js, which can be used with the [`puter.ai.txt2speech()`](https://docs.puter.com/AI/txt2speech/) function:

```javascript
gpt-4o-mini-tts
tts-1
tts-1-hd
```

## Conclusion

Using Puter.js, you can gain access to OpenAI models without having to set up an OpenAI developer account. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [How to do OAuth with OpenAI](/tutorials/openai-oauth/)
- [Free, Unlimited Codex API](/tutorials/free-unlimited-codex-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited Grok API](/tutorials/free-unlimited-grok-api/)
- [Free, Unlimited Mistral API](/tutorials/free-unlimited-mistral-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited GPT OSS API](/tutorials/free-unlimited-gpt-oss-api/)
- [Free, Unlimited Amazon Nova API](/tutorials/free-unlimited-amazon-nova-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited Nano Banana API](/tutorials/free-unlimited-nano-banana-api/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
- [Free, Unlimited Text to Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Speech-to-Text API](/tutorials/free-unlimited-speech-to-text-api/)
- [Free, Unlimited Translation API](/tutorials/free-unlimited-translation-api/)
- [Free, Unlimited Sentiment Analysis API](/tutorials/free-unlimited-sentiment-analysis-api/)
- [Free, Unlimited Summarization API](/tutorials/free-unlimited-summarization-api/)
- [Free, Unlimited Language Detection API](/tutorials/free-unlimited-language-detection-api/)
- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [OpenAI API Pricing](/tutorials/openai-api-pricing/)
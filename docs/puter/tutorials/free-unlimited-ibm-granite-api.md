# Free, Unlimited IBM Granite API

Source: https://developer.puter.com/tutorials/free-unlimited-ibm-granite-api/

[Tutorials](/tutorials/)

# Free, Unlimited IBM Granite API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 8, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Chat with Granite 4.1 8B](#example-1-basic-chat-with-granite-41-8b)[Example 2: Low-Latency Inference with Granite 4.0 Micro](#example-2-low-latency-inference-with-granite-40-micro)[Example 3: Tool Calling](#example-3-tool-calling)[Example 4: Multilingual Generation](#example-4-multilingual-generation)[Example 5: Streaming Response](#example-5-streaming-response)[List of Supported IBM Granite Models](#list-of-supported-ibm-granite-models)[Conclusion](#conclusion)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [IBM's Granite AI models](/ai/ibm-granite/) for free. Using Puter.js, you can leverage models like [Granite 4.1 8B](/ai/ibm-granite/granite-4.1-8b/) and [Granite 4.0 Micro](/ai/ibm-granite/granite-4.0-h-micro/) without any API keys or usage restrictions.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to add AI capabilities to their applications while users cover their own usage costs. This model enables developers to [access advanced AI features](/ai/) for free, without any API keys or server-side setup.

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

You're now ready to use Puter.js to access IBM Granite capabilities. No API keys or sign-ups are required.

## Example 1: Basic Chat with Granite 4.1 8B

Here's a simple example showing how to generate text using [Granite 4.1 8B](/ai/ibm-granite/granite-4.1-8b/), IBM's dense, decoder-only enterprise model with a 131K-token context window:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain why dense transformers are easier to fine-tune than MoE models", {
            model: 'ibm-granite/granite-4.1-8b'
        }).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

Using the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function, you can generate text using Granite 4.1 8B, which is purpose-built for enterprise workloads like RAG, summarization, and classification.

## Example 2: Low-Latency Inference with Granite 4.0 Micro

[Granite 4.0 Micro](/ai/ibm-granite/granite-4.0-h-micro/) is a 3B-parameter dense model optimized for low-latency, cost-efficient workloads. Despite its compact size, it outperforms its predecessor Granite 3.3 8B and is a strong fit for agentic sub-tasks and API orchestration:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Summarize the key differences between supervised and unsupervised learning", {
            model: 'ibm-granite/granite-4.0-h-micro'
        }).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 3: Tool Calling

Granite models implement OpenAI-compatible tool calling, making them well-suited for agentic workflows. Here's how to let the model call an external function:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Mock weather function
        function getWeather(location) {
            return location + ': 22Â°C, Sunny';
        }

        // Define the tool
        const tools = [{
            type: "function",
            function: {
                name: "get_weather",
                description: "Get current weather for a location",
```

Show 38 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Mock weather function
        function getWeather(location) {
            return location + ': 22Â°C, Sunny';
        }

        // Define the tool
        const tools = [{
            type: "function",
            function: {
                name: "get_weather",
                description: "Get current weather for a location",
                parameters: {
                    type: "object",
                    properties: {
                        location: { type: "string", description: "City name" }
                    },
                    required: ["location"]
                }
            }
        }];

        (async () => {
            const question = "What's the weather in San Francisco?";
            puter.print("Question: " + question + "<br/>");

            // Call AI with tools
            const response = await puter.ai.chat(question, { tools, model: "ibm-granite/granite-4.1-8b" });

            // Check if AI wants to call a function
            if (response.message.tool_calls?.length > 0) {
                const toolCall = response.message.tool_calls[0];
                const args = JSON.parse(toolCall.function.arguments);
                const weatherData = getWeather(args.location);

                // Send result back to AI
                const finalResponse = await puter.ai.chat([
                    { role: "user", content: question },
                    response.message,
                    { role: "tool", tool_call_id: toolCall.id, content: weatherData }
                ], { model: "ibm-granite/granite-4.1-8b" });

                puter.print("Answer: " + finalResponse);
            } else {
                puter.print("Answer: " + response);
            }
        })();
    </script>
</body>
</html>
```

Collapse code

## Example 4: Multilingual Generation

Granite 4.1 8B natively supports 12 languages including English, German, Spanish, French, Japanese, and Chinese. Here's an example summarizing content in German:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Fasse die Vorteile von erneuerbaren Energien auf Deutsch in fÃ¼nf Stichpunkten zusammen.",
            { model: 'ibm-granite/granite-4.1-8b' }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 5: Streaming Response

For longer responses, use streaming to get results in real-time:

```html
<html>
<body>
    <div id="output"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const outputDiv = document.getElementById('output');

            const response = await puter.ai.chat(
                "Draft an internal RFC for migrating a legacy auth service to OAuth 2.1",
                {
                    model: 'ibm-granite/granite-4.1-8b',
                    stream: true
                }
            );

            for await (const part of response) {
                if (part?.text) {
                    outputDiv.innerHTML += part.text.replaceAll('\n', '<br>');
                }
            }
        }

        streamResponse();
    </script>
</body>
</html>
```

## List of Supported IBM Granite Models

The following IBM Granite models are supported by Puter.js:

```javascript
ibm-granite/granite-4.0-h-micro
ibm-granite/granite-4.1-8b
```

## Conclusion

Using Puter.js, you can gain access to IBM Granite without having to set up the AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful enterprise-ready applications with tool calling, RAG, and multilingual generation without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited Microsoft Phi API](/tutorials/free-unlimited-microsoft-phi-api/)
- [Free, Unlimited NVIDIA Nemotron API](/tutorials/free-unlimited-nvidia-nemotron-api/)
- [Free, Unlimited Amazon Nova API](/tutorials/free-unlimited-amazon-nova-api/)
- [Free, Unlimited Liquid AI API](/tutorials/free-unlimited-liquid-ai-api/)
- [Free, Unlimited Cohere API](/tutorials/free-unlimited-cohere-api/)
- [Free, Unlimited Gemma API](/tutorials/free-unlimited-gemma-api/)
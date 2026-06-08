# Free, Unlimited Liquid AI API

Source: https://developer.puter.com/tutorials/free-unlimited-liquid-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited Liquid AI API

[Nariman Jelveh](/author/jelveh/), [Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: March 17, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Text Generation with Liquid AI](#example-1-basic-text-generation-with-liquid-ai)[Example 2: Streaming Responses](#example-2-streaming-responses)[Example 3: Multi-Message Conversations](#example-3-multi-message-conversations)[Example 4: Function Calling](#example-4-function-calling)[Available Models](#available-models)[Related](#related)

In this tutorial, you will learn how to add Liquid AI's Large Foundation Models into your application for free using Puter.js. You can gain access to models such as [LFM 2.5](/ai/liquid/lfm-2.5-1.2b-instruct/) and [LFM 2](/ai/liquid/lfm-2-24b-a2b/) without having to set up the AI server yourself.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI or server usage.

## Getting Started

You can use puter.js without any API keys or sign-ups. To start using Puter.js, include the following script tag in your HTML file, either in the `<head>` or `<body>` section:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

Nothing else is required to start using Puter.js for free access to Liquid AI models.

## Example 1: Basic Text Generation with Liquid AI

To generate text use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat("What are the benefits of renewable energy?", { model: "liquid/lfm-2.5-1.2b-instruct:free" })
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
        puter.ai.chat("What are the benefits of renewable energy?", { model: "liquid/lfm-2.5-1.2b-instruct:free" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: Streaming Responses

For longer responses, you can use streaming to get results in real-time:

```html
<html>
<body>
    <div id="response"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const outputDiv = document.getElementById('response');
            
            const response = await puter.ai.chat(
                "Write a comprehensive explanation of machine learning algorithms", 
                {model: 'liquid/lfm-2.5-1.2b-instruct:free', stream: true}
            );
            
            for await (const part of response) {
                if (part?.text) {
                    outputDiv.innerHTML += part.text;
                }
            }
        }

        streamResponse();
    </script>
</body>
</html>
```

This example demonstrates streaming with Liquid AI's model, which provides a better user experience by showing the response as it's generated rather than waiting for the complete response.

## Example 3: Multi-Message Conversations

You can create conversational experiences by passing multiple messages:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const conversationHistory = [
            {
                role: 'system',
                content: 'You are a helpful coding assistant specialized in JavaScript.'
            },
            {
                role: 'user',
                content: 'How do I create an async function in JavaScript?'
            },
            {
                role: 'assistant',
                content: 'You can create an async function using the async keyword before the function declaration...'
            },
            {
                role: 'user',
                content: 'Can you show me an example with error handling?'
            }
        ];

        puter.ai.chat(conversationHistory, { model: 'liquid/lfm-2.5-1.2b-instruct:free' })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

This example shows how to maintain conversation context by providing the full message history, enabling more natural and contextual responses.

## Example 4: Function Calling

Liquid AI models support function calling, allowing the AI to interact with external tools and APIs:

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

Show 40 more lines...

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
            const question = "What's the weather in Paris?";
            puter.print("Question: " + question + "<br/>");
            puter.print("(Loading...)<br/>");

            // Call AI with tools
            const response = await puter.ai.chat(question, { tools, model: "liquid/lfm-2.5-1.2b-instruct:free" });

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
                ], {model: "liquid/lfm-2.5-1.2b-instruct:free" });

                puter.print("Answer: " + finalResponse);
            } else {
                // If the AI responds directly without calling a tool, print its message
                puter.print("Answer: " + response);
            }
        })();
    </script>
</body>
</html>
```

Collapse code

This example demonstrates how Liquid AI models can call external functions to provide more accurate and contextual responses.

## Available Models

The following Liquid AI models are supported by Puter.js:

```javascript
liquid/lfm-2-24b-a2b
liquid/lfm-2.5-1.2b-instruct:free
liquid/lfm-2.5-1.2b-thinking:free
```

You now have free access to Liquid AI's Large Foundation Models using Puter.js. This allows you to leverage advanced AI capabilities without needing API keys or backend infrastructure. True serverless AI!

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited IBM Granite API](/tutorials/free-unlimited-ibm-granite-api/)
- [Free, Unlimited Nous Research Hermes API](/tutorials/free-unlimited-nous-research-hermes-api/)
- [Free, Unlimited Mancer AI API](/tutorials/free-unlimited-mancer-api/)
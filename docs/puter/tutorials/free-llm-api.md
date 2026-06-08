# Free LLM API

Source: https://developer.puter.com/tutorials/free-llm-api/

[Tutorials](/tutorials/)

# Free LLM API

[Nariman Jelveh](/author/jelveh/), [Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 17, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Using GPT-5.4 Nano](#example-1-using-gpt-54-nano)[Example 2: Using Claude Sonnet 4.6](#example-2-using-claude-sonnet-46)[Example 3: Using DeepSeek R1 for Complex Reasoning](#example-3-using-deepseek-r1-for-complex-reasoning)[Example 4: Streaming Responses for Better UX](#example-4-streaming-responses-for-better-ux)[Example 5: Using LLMs for Image Analysis](#example-5-using-llms-for-image-analysis)[Example 6: Function Calling with LLMs](#example-6-function-calling-with-llms)[Available Models](#available-models)[Advanced Features](#advanced-features)[Temperature Control](#temperature-control)[Multi-turn Conversations](#multi-turn-conversations)[Other AI Features](#other-ai-features)[Related Resources](#related-resources)

This tutorial will show you how to access hundreds of large language models (LLMs) for free using [Puter.js](https://developer.puter.com). Whether you need GPT, Claude, Gemini, Grok, DeepSeek, or any of the 400+ proprietary or open-source models supported by Puter.js, you can use them all without API keys, backend infrastructure, or limits.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate [AI capabilities](/ai/) into their applications while users cover their own usage costs. This revolutionary approach eliminates the need for developers to pay for usage, manage API keys, worry about billing, or maintain server infrastructure.

## Getting Started

Puter.js is completely serverless and requires no API keys or sign-ups. To start using any LLM, simply include this script tag in your HTML file, either in the `<head>` or `<body>` section:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's it! You're now ready to access hundreds of LLMs completely free. No backend, no API keys, no configuration.

## Example 1: Using GPT-5.4 Nano

Let's start with OpenAI's [GPT-5.4 Nano](/ai/openai/gpt-5.4-nano/), a fast and efficient model perfect for most tasks. This example shows how to use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function to generate text using GPT-5.4 Nano:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain machine learning in simple terms", { 
            model: "openai/gpt-5.4-nano" 
        }).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 2: Using Claude Sonnet 4.6

By simply changing the model name to "claude-sonnet-4-6", you can use Anthropic's [Claude Sonnet 4.6](/ai/anthropic/claude-sonnet-4-6/) model to generate text. No need to provide any API keys or change your code:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Write a creative story about a robot discovering emotions", { 
            model: "anthropic/claude-sonnet-4-6" 
        }).then(response => {
            puter.print(response.message.content[0].text);
        });
    </script>
</body>
</html>
```

## Example 3: Using DeepSeek R1 for Complex Reasoning

[DeepSeek R1 0528](/ai/deepseek/deepseek-r1-0528/) excels at step-by-step problem solving and logical reasoning:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Solve this logic puzzle: If all bloops are razzles and all razzles are lazzles, are all bloops definitely lazzles? Explain your reasoning.", 
            { model: "deepseek/deepseek-r1-0528" }
        ).then(response => {
            puter.print(response.message.content);
        });
    </script>
</body>
</html>
```

## Example 4: Streaming Responses for Better UX

For longer responses, streaming provides a better user experience by showing results in real-time:

```html
<html>
<body>
    <div id="output"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamLLMResponse() {
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '<h2>Streaming Response:</h2>';
            
            const response = await puter.ai.chat(
                "Write a detailed explanation of quantum computing and its applications", 
                { 
                    model: "openai/gpt-5.4-nano",
                    stream: true 
                }
            );
            
            for await (const part of response) {
                if (part?.text) {
                    outputDiv.innerHTML += part.text;
                }
            }
        }

        streamLLMResponse();
    </script>
</body>
</html>
```

## Example 5: Using LLMs for Image Analysis

Many LLMs support multimodal capabilities for analyzing images:

```html
<html>
<body>
    <img src="https://assets.puter.site/doge.jpeg" style="max-width: 400px; display: block; margin: 20px 0;">
    
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Describe this image in detail. What do you see?",
            "https://assets.puter.site/doge.jpeg",
            { model: "openai/gpt-5.4-nano" }
        ).then(response => {
            document.write(`<h3>Image Analysis:</h3><p>${response}</p>`);
        });
    </script>
</body>
</html>
```

## Example 6: Function Calling with LLMs

Enable LLMs to call functions in your application for dynamic interactions:

```html
<html>
<body>
    <div style="max-width: 600px; margin: 20px auto; font-family: Arial, sans-serif;">
        <h1>Weather Assistant</h1>
        <input type="text" id="userQuery" placeholder="Ask about the weather..." 
               style="width: 100%; padding: 10px; margin: 10px 0;">
        <button onclick="askWeather()" style="padding: 10px 20px;">Ask</button>
        <div id="response" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;"></div>
    </div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Mock weather function
        function getWeather(location) {
            const weatherData = {
```

Show 67 more lines...

```html
<html>
<body>
    <div style="max-width: 600px; margin: 20px auto; font-family: Arial, sans-serif;">
        <h1>Weather Assistant</h1>
        <input type="text" id="userQuery" placeholder="Ask about the weather..." 
               style="width: 100%; padding: 10px; margin: 10px 0;">
        <button onclick="askWeather()" style="padding: 10px 20px;">Ask</button>
        <div id="response" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;"></div>
    </div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Mock weather function
        function getWeather(location) {
            const weatherData = {
                'Paris': '22Â°C, Partly Cloudy',
                'London': '18Â°C, Rainy',
                'New York': '25Â°C, Sunny',
                'Tokyo': '28Â°C, Clear'
            };
            return JSON.stringify(weatherData[location] || '20Â°C, Unknown');
        }

        // Define tools available to the LLM
        const tools = [{
            type: "function",
            function: {
                name: "get_weather",
                description: "Get current weather for a location",
                parameters: {
                    type: "object",
                    properties: {
                        location: {
                            type: "string",
                            description: "City name (e.g., Paris, London)"
                        }
                    },
                    required: ["location"]
                }
            }
        }];

        async function askWeather() {
            const userQuery = document.getElementById('userQuery').value;
            const responseDiv = document.getElementById('response');
            
            if (!userQuery) return;
            
            responseDiv.innerHTML = 'Processing...';
            
            try {
                // First API call
                const completion = await puter.ai.chat(userQuery, { tools, model: "openai/gpt-5.4-nano" });
                
                // Check if LLM wants to call a function
                if (completion.message.tool_calls?.length > 0) {
                    const toolCall = completion.message.tool_calls[0];
                    const args = JSON.parse(toolCall.function.arguments);
                    const weatherData = getWeather(args.location);
                    
                    // Second API call with function result
                    const finalResponse = await puter.ai.chat([
                        { role: "user", content: userQuery },
                        completion.message,
                        {
                            role: "tool",
                            tool_call_id: toolCall.id,
                            content: weatherData
                        }
                    ], { model: "openai/gpt-5.4-nano" });
                    
                    responseDiv.innerHTML = finalResponse;
                } else {
                    responseDiv.innerHTML = completion;
                }
            } catch (error) {
                responseDiv.innerHTML = `Error: ${error.message}`;
            }
        }
    </script>
</body>
</html>
```

Collapse code

## Available Models

Puter.js provides access to 500+ models from various providers including OpenAI, Anthropic, Google, Grok, and more. For a complete list of all available models, visit our [AI models](https://developer.puter.com/ai/models/).

## Advanced Features

### Temperature Control

Control the randomness and creativity of LLM responses by setting the `temperature` parameter. The default temperature is 0.7.

```javascript
// Low temperature (0.2) - More focused and deterministic
puter.ai.chat("Explain photosynthesis", {
    model: "gpt-5-nano",
    temperature: 0.2,
    max_tokens: 100
});

// High temperature (0.8) - More creative and varied
puter.ai.chat("Write a poem about coding", {
    model: "claude-sonnet-4-5",
    temperature: 0.8,
    max_tokens: 200
});
```

### Multi-turn Conversations

Maintain context across multiple exchanges by passing the conversation history as an array of messages.

```javascript
let conversationHistory = [];

async function continueConversation(userMessage) {
    conversationHistory.push({
        role: "user",
        content: userMessage
    });

    const response = await puter.ai.chat(conversationHistory, {
        model: "openai/gpt-5.4-nano"
    });

    conversationHistory.push({
        role: "assistant",
        content: response
    });

    return response;
}
```

## Other AI Features

Puter.js is not limited to LLMs! It also provides access to a wide range of AI features including:

- [AI Chat](https://docs.puter.com/AI/chat/)
- [AI Image Generation](https://docs.puter.com/AI/txt2img/)
- [AI Text to Video](https://docs.puter.com/AI/txt2vid/)
- [AI Text to Speech](https://docs.puter.com/AI/txt2speech/)
- [AI Speech to Text](https://docs.puter.com/AI/speech2txt/)
- [AI Image to Text](https://docs.puter.com/AI/img2txt/)
- [AI Speech to Speech](https://docs.puter.com/AI/speech2speech/)

---

That's it! You now have free, unlimited access to hundreds of large language models through Puter.js. Build powerful AI applications without worrying about API keys, rate limits, or infrastructure costs. The future of AI development is serverless, and it's available to you right now.

## Related Resources

- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited Mistral API](/tutorials/free-unlimited-mistral-api/)
- [Free, Unlimited Translation API](/tutorials/free-unlimited-translation-api/)
- [Free, Unlimited Sentiment Analysis API](/tutorials/free-unlimited-sentiment-analysis-api/)
- [Free, Unlimited Summarization API](/tutorials/free-unlimited-summarization-api/)
- [Free, Unlimited Language Detection API](/tutorials/free-unlimited-language-detection-api/)
- [Puter.js Documentation](https://docs.puter.com/)
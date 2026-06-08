# Free, Unlimited AI API

Source: https://developer.puter.com/tutorials/free-unlimited-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited AI API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 17, 2026
                                    

On this page[Getting Started](#getting-started)[OpenAI Models](#openai-models)[Claude Models](#claude-models)[Google Gemini Models](#google-gemini-models)[Other Models](#other-models)[Advanced Features](#advanced-features)[Streaming Responses](#streaming-responses)[Image Analysis](#image-analysis)[Function Calling (a.k.a. "Tool Calling" or "Agentic AI")](#function-calling-aka-tool-calling-or-agentic-ai)[Related Resources](#related-resources)

This tutorial will show you how to incorporate any major AI capabilities in your website or app for free, without any API keys, backend setup, or usage restrictions. With a single line of code, you can leverage the power of OpenAI models, Anthropic's Claude, Google's Gemini, Meta's Llama, and more than 400 other leading AI models directly from your frontend code.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate AI capabilities into their websites and applications while users cover their own usage costs. This revolutionary approach eliminates the need for developers to manage API keys, worry about billing, or maintain server infrastructure, making advanced AI accessible to everyone.

Due to its serverless, keyless, and user-pays nature, Puter.js is also an exceptional fit for AI coding assistants, agents, and vibe coding platforms like Claude Code, [Codex](/ai/codex/), OpenCode, Lovable, Replit, Bolt.new, and the rest. Because there are no keys and no backend involved, anything these tools produce, with Puter.js, will run end-to-end as soon as it's generated. No third-party signup, no service to spin up, no API keys to paste. That cuts out a whole category of security pitfalls and the configuration overhead that normally stops AI-generated apps from working on the first run.

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

That's it! You're now ready to use Puter.js for free access to all major AI models in your website or app. No API keys, backend setup, or server-side code required.

### OpenAI Models

To integrate AI models into your website or app, use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function and specify the model name in the `model` parameter. Here's an example of how to use the OpenAI's [GPT-5.4 Nano](/ai/openai/gpt-5.4-nano/) model:

```javascript
puter.ai.chat("What are the benefits of exercise?", { model: "openai/gpt-5.4-nano" })
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
        puter.ai.chat("What are the benefits of exercise?", { model: "openai/gpt-5.4-nano" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

As you can see, the experience is completely serverless and doesn't require any API keys or backend setup.

### Claude Models

Puter.js is not limited to OpenAI models. You can use any major AI model by specifying the model name in the `model` parameter. Here's an example of how to use the [Claude Sonnet 4.6](/ai/anthropic/claude-sonnet-4-6/) model:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Claude Sonnet 4
        puter.ai.chat(
            "Write a creative short story about a time traveler",
            { model: "anthropic/claude-sonnet-4-6" }
        ).then(response => {
            puter.print(response.message.content[0].text);
        });
    </script>
</body>
</html>
```

### Google Gemini Models

Leverage Google's Gemini models for various AI tasks:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Create a meal plan for a healthy week",
            { model: "google/gemini-3.1-flash-lite" }
        ).then(response => {
            puter.print(response.message.content);
        });
    </script>
</body>
</html>
```

### Other Models

From open-source to commercial, Puter supports more than 500 AI models. You can use any of them by specifying the model name in the `model` parameter. The full list of models is available [here](https://developer.puter.com/ai/models/).

## Advanced Features

### Streaming Responses

For better user experience with longer content, use streaming to display responses in real-time:

```html
<html>
<body>
    <div id="streamOutput"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamExample() {
            const outputDiv = document.getElementById('streamOutput');
            outputDiv.innerHTML = '<h2>AI Streaming Response Demo</h2>';
            
            // Stream from GPT-4.1 Nano
            const response = await puter.ai.chat(
                "Write a detailed essay about the future of renewable energy",
                { model: "openai/gpt-5.4-nano", stream: true }
            );
            
            // Print the response in real-time
            for await (const part of response) {
                if (part?.text) {
                    outputDiv.innerHTML += part.text;
                }
            }
        }

        streamExample();
    </script>
</body>
</html>
```

### Image Analysis

You are not limited to text generation. You can also analyze images using AI. In the example below, we're using GPT-5.4 Nano to analyze an image and then ask follow-up questions. All you have to do is pass the image URL to the `puter.ai.chat()` function:

```html
<html>
<body>
    <h1>AI Image Analysis</h1>
    <input type="text" id="imageUrl" placeholder="Enter image URL..." style="width: 400px; padding: 5px;">
    <button onclick="analyzeImage()">Analyze Image</button>
    <div id="analysis"></div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function analyzeImage() {
            const imageUrl = document.getElementById('imageUrl').value;
            if (!imageUrl) return;

            const analysisDiv = document.getElementById('analysis');
            analysisDiv.innerHTML = '<p>Analyzing image...</p>';
```

Show 20 more lines...

```html
<html>
<body>
    <h1>AI Image Analysis</h1>
    <input type="text" id="imageUrl" placeholder="Enter image URL..." style="width: 400px; padding: 5px;">
    <button onclick="analyzeImage()">Analyze Image</button>
    <div id="analysis"></div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function analyzeImage() {
            const imageUrl = document.getElementById('imageUrl').value;
            if (!imageUrl) return;

            const analysisDiv = document.getElementById('analysis');
            analysisDiv.innerHTML = '<p>Analyzing image...</p>';

            // Display the image
            analysisDiv.innerHTML = `<img src="${imageUrl}" style="max-width: 400px; margin: 10px 0;"><br>`;
            
            // Get AI analysis
            const response = await puter.ai.chat(
                "Describe this image in detail. What objects, people, or scenes do you see?",
                imageUrl
            , { model: "openai/gpt-5.4-nano" });
            
            analysisDiv.innerHTML += `<h3>Analysis:</h3><p>${response}</p>`;
        }

        // Example with default image
        window.onload = () => {
            document.getElementById('imageUrl').value = 'https://assets.puter.site/doge.jpeg';
        };
    </script>
</body>
</html>
```

Collapse code

## Function Calling (a.k.a. "Tool Calling" or "Agentic AI")

Function calling allows AI models to call functions in your application, enabling them to perform actions, access real-time data, and interact with external systems. This transforms static AI responses into dynamic, interactive experiences.

With Puter.js, you can define functions that the AI can call, and the AI will intelligently decide when and how to use them based on the user's request. This is perfect for creating chatbots, virtual assistants, and interactive applications.

Here's a simple example showing how to create a weather assistant that can fetch weather data:

```html
<html>
<body>
    <input type="text" id="userInput" placeholder="Ask about the weather..." style="width: 400px; padding: 10px; margin: 10px 0;">
    <button onclick="askWeather()">Ask</button>
    <div id="response" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;"></div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Mock weather function - in a real app, this would call a weather API
        function getWeather(location) {
            const weatherData = {
                'Paris': { temp: '22Â°C', condition: 'Partly Cloudy', humidity: '65%' },
                'London': { temp: '18Â°C', condition: 'Rainy', humidity: '80%' },
                'New York': { temp: '25Â°C', condition: 'Sunny', humidity: '45%' },
                'Tokyo': { temp: '28Â°C', condition: 'Clear', humidity: '70%' }
```

Show 72 more lines...

```html
<html>
<body>
    <input type="text" id="userInput" placeholder="Ask about the weather..." style="width: 400px; padding: 10px; margin: 10px 0;">
    <button onclick="askWeather()">Ask</button>
    <div id="response" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;"></div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Mock weather function - in a real app, this would call a weather API
        function getWeather(location) {
            const weatherData = {
                'Paris': { temp: '22Â°C', condition: 'Partly Cloudy', humidity: '65%' },
                'London': { temp: '18Â°C', condition: 'Rainy', humidity: '80%' },
                'New York': { temp: '25Â°C', condition: 'Sunny', humidity: '45%' },
                'Tokyo': { temp: '28Â°C', condition: 'Clear', humidity: '70%' }
            };
            
            const weather = weatherData[location] || { temp: '20Â°C', condition: 'Unknown', humidity: '50%' };
            return JSON.stringify(weather);
        }

        // Define the functions available to the AI
        const tools = [{
            type: "function",
            function: {
                name: "get_weather",
                description: "Get current weather information for a specific location",
                parameters: {
                    type: "object",
                    properties: {
                        location: {
                            type: "string",
                            description: "City name (e.g., Paris, London, New York)"
                        }
                    },
                    required: ["location"],
                    additionalProperties: false
                },
                strict: true
            }
        }];

        async function askWeather() {
            const userInput = document.getElementById('userInput').value;
            const responseDiv = document.getElementById('response');
            
            if (!userInput) return;
            
            responseDiv.innerHTML = 'Processing...';
            
            try {
                // First, get the AI's response with potential function calls
                const completion = await puter.ai.chat(userInput, { tools, model: "openai/gpt-5.4-nano" });
                
                // Check if the AI wants to call a function
                if (completion.message.tool_calls && completion.message.tool_calls.length > 0) {
                    const toolCall = completion.message.tool_calls[0];
                    
                    if (toolCall.function.name === 'get_weather') {
                        // Parse the arguments and call our weather function
                        const args = JSON.parse(toolCall.function.arguments);
                        const weatherResult = getWeather(args.location);
                        
                        // Send the function result back to the AI for a natural response
                        const finalResponse = await puter.ai.chat([
                            { role: "user", content: userInput },
                            completion.message,
                            { 
                                role: "tool",
                                tool_call_id: toolCall.id,
                                content: weatherResult
                            }
                        ], { model: "openai/gpt-5.4-nano" });
                        
                        responseDiv.innerHTML = `<strong>Weather Assistant:</strong><br>${finalResponse}`;
                    }
                } else {
                    // No function call needed, just show the response
                    responseDiv.innerHTML = `<strong>Assistant:</strong><br>${completion}`;
                }
            } catch (error) {
                responseDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
            }
        }
    </script>
</body>
</html>
```

Collapse code

---

That's it! You now have access to all major AI models through a single, simple interface. With Puter.js, you can build powerful AI applications without worrying about API keys, rate limits, or backend infrastructure. The future of AI development is serverless, and it's available to you right now - completely free.

## Related Resources

- [Puter.js Documentation](https://docs.puter.com/)
- [Free LLM API](/tutorials/free-llm-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Cohere API](/tutorials/free-unlimited-cohere-api/)
- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Perplexity AI API](/tutorials/free-unlimited-perplexity-ai-api/)
- [Free, Unlimited Image Recognition API](/tutorials/free-unlimited-image-recognition-api/)
- [Use Any AI Model in LangChain](/tutorials/access-any-model-using-langchain/)
- [How to Add an AI Chatbot to Your Website](/tutorials/add-ai-chatbot-to-your-website/)
- [Free, Unlimited Video Analysis API](/tutorials/free-unlimited-video-analysis-api/)
- [Free, Unlimited Translation API](/tutorials/free-unlimited-translation-api/)
- [Free, Unlimited Sentiment Analysis API](/tutorials/free-unlimited-sentiment-analysis-api/)
- [Free, Unlimited Summarization API](/tutorials/free-unlimited-summarization-api/)
- [Free, Unlimited Language Detection API](/tutorials/free-unlimited-language-detection-api/)
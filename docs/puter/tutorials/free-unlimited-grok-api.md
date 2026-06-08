# Free, Unlimited Grok API

Source: https://developer.puter.com/tutorials/free-unlimited-grok-api/

[Tutorials](/tutorials/)

# Free, Unlimited Grok API

[Nariman Jelveh](/author/jelveh/), [Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 21, 2026
                                    

On this page[Prerequisites](#prerequisites)[Example 1: Use Grok 4.3](#example-1-use-grok-43)[Example 2: Streaming responses](#example-2-streaming-responses)[Example 3: Multi-turn conversations](#example-3-multi-turn-conversations)[Example 4: Using Temperature and Max Tokens](#example-4-using-temperature-and-max-tokens)[Example 5: Function/Tool Calling with Grok](#example-5-functiontool-calling-with-grok)[Example 6: Using Grok for Image Analysis](#example-6-using-grok-for-image-analysis)[Example 7: Code generation with Grok Build 0.1](#example-7-code-generation-with-grok-build-01)[Example 8: Using Grok for Image Generation with Grok-2-Image](#example-8-using-grok-for-image-generation-with-grok-2-image)[Supported Models](#supported-models)[Text-to-Speech with xAI](#text-to-speech-with-xai)[Speech-to-Text with xAI](#speech-to-text-with-xai)[Related Resources](#related-resources)

Grok is xAI's latest large language model, known for its unique approach to problem-solving and witty responses. In this tutorial, we'll show you how to use Grok through [Puter.js](https://developer.puter.com) to create engaging and intelligent applications.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate [AI capabilities](/ai/) into their applications while each user will cover their own usage costs. This model enables developers to access advanced AI capabilities for free, without any API keys, usage costs, or server-side setup.

Additionally, Puter.js works exceptionally well with AI coding assistants, agents, and vibe coding platforms such as Claude Code, [Codex](/ai/codex/), OpenCode, Lovable, Replit, Bolt.new, and others. Its keyless, serverless design lets AI-generated apps and programs run end-to-end straight away, with no third-party backend to sign up for, no service to provision, and no API keys to copy in. The result is one fewer source of common security issues and one less setup step that usually blocks these apps from running on the first try.

## Prerequisites

To use Puter.js, import our [NPM library](https://www.npmjs.com/package/@heyputer/puter.js) in your project:

```js
// npm install @heyputer/puter.js
import { puter } from '@heyputer/puter.js';
```

Or alternatively, add our script via CDN if you are working directly with HTML, simply add it to the `<head>` or `<body>` section of your code:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

## Example 1: Use Grok 4.3

To use [Grok 4.3](/ai/x-ai/grok-4.3/), you'll use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function with the `model` parameter set to `x-ai/grok-4.3`. Here's a basic example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Chat with Grok 4.3
        puter.ai.chat(
            "Explain quantum computing in a witty and engaging way.",
            {model: 'x-ai/grok-4.3'}
        ).then(response => {
            puter.print(response.message.content);
        });
    </script>
</body>
</html>
```

## Example 2: Streaming responses

For a more interactive experience, you can stream the responses from Grok as they're generated:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const response = await puter.ai.chat(
                "Tell me a funny story about artificial intelligence.",
                {
                    model: 'x-ai/grok-4-1-fast',
                    stream: true
                }
            );

            for await (const part of response) {
                puter.print(part.text);
            }
        })();
    </script>
</body>
</html>
```

## Example 3: Multi-turn conversations

Grok excels at maintaining context in conversations. Here's how to implement a context-aware chat:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Keep track of conversation history
        let conversationHistory = [];

        async function continueConversation(userMessage) {
            // Add user message to history
            conversationHistory.push({
                role: "user",
                content: userMessage
            });

            // Get response from Grok
```

Show 30 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Keep track of conversation history
        let conversationHistory = [];

        async function continueConversation(userMessage) {
            // Add user message to history
            conversationHistory.push({
                role: "user",
                content: userMessage
            });

            // Get response from Grok
            const response = await puter.ai.chat(conversationHistory, {
                model: 'x-ai/grok-4-1-fast'
            });

            // Add Grok's response to history
            conversationHistory.push({
                role: "assistant",
                content: response.message.content
            });

            return response.message.content;
        }

        // Example usage
        async function demonstrateConversation() {
            let response;
            
            response = await continueConversation("What's the most interesting thing about space?");
            document.body.innerHTML += `<p><strong>You:</strong> What's the most interesting thing about space?</p>`;
            document.body.innerHTML += `<p><strong>Grok:</strong> ${response}</p>`;

            response = await continueConversation("Tell me more about that!");
            document.body.innerHTML += `<p><strong>You:</strong> Tell me more about that!</p>`;
            document.body.innerHTML += `<p><strong>Grok:</strong> ${response}</p>`;
        }

        demonstrateConversation();
    </script>
</body>
</html>
```

Collapse code

## Example 4: Using Temperature and Max Tokens

You can control Grok's response characteristics using the `temperature` and `max_tokens` parameters:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Low temperature (more focused, deterministic)
            puter.print("<h3>Low Temperature (0.1):</h3>");
            const focusedResponse = await puter.ai.chat("Tell me about cats.", {
                model: 'x-ai/grok-4-1-fast',
                temperature: 0.1,
                max_tokens: 50
            });
            puter.print(focusedResponse.message.content + "<br><br>");

            // High temperature (more creative, random)
```

Show 19 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Low temperature (more focused, deterministic)
            puter.print("<h3>Low Temperature (0.1):</h3>");
            const focusedResponse = await puter.ai.chat("Tell me about cats.", {
                model: 'x-ai/grok-4-1-fast',
                temperature: 0.1,
                max_tokens: 50
            });
            puter.print(focusedResponse.message.content + "<br><br>");

            // High temperature (more creative, random)
            puter.print("<h3>High Temperature (1.8):</h3>");
            const creativeResponse = await puter.ai.chat("Tell me about cats.", {
                model: 'x-ai/grok-4-1-fast',
                temperature: 0.8,
                max_tokens: 50
            });
            puter.print(creativeResponse.message.content + "<br><br>");

            // Different max_tokens
            puter.print("<h3>Short Response (max_tokens: 20):</h3>");
            const shortResponse = await puter.ai.chat("Explain quantum physics.", {
                model: 'x-ai/grok-4-1-fast',
                max_tokens: 20
            });
            puter.print(shortResponse.message.content);
        })();
    </script>
</body>
</html>
```

Collapse code

## Example 5: Function/Tool Calling with Grok

Grok can call functions to interact with external systems or perform specific tasks:

```html
<html>
<body>
    <div style="max-width: 800px; margin: 20px auto; font-family: Arial, sans-serif;">
        <h1>Grok Function Calling Demo</h1>
        <div style="margin: 20px 0;">
            <input type="text" id="user-input" 
                   value="What's the weather like in New York? Also, what time is it there?"
                   style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 10px;" 
                   placeholder="Ask about weather or time...">
            <button onclick="handleQuery()" 
                    style="padding: 10px 20px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Ask Grok
            </button>
        </div>
        <div id="response" style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 4px;">
```

Show 133 more lines...

```html
<html>
<body>
    <div style="max-width: 800px; margin: 20px auto; font-family: Arial, sans-serif;">
        <h1>Grok Function Calling Demo</h1>
        <div style="margin: 20px 0;">
            <input type="text" id="user-input" 
                   value="What's the weather like in New York? Also, what time is it there?"
                   style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 10px;" 
                   placeholder="Ask about weather or time...">
            <button onclick="handleQuery()" 
                    style="padding: 10px 20px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Ask Grok
            </button>
        </div>
        <div id="response" style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 4px;">
            Responses will appear here...
        </div>
    </div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Mock functions that Grok can call
        function getWeather(location) {
            const weatherData = {
                'New York': { temp: '72Â°F', condition: 'Partly cloudy', humidity: '65%' },
                'London': { temp: '18Â°C', condition: 'Rainy', humidity: '80%' },
                'Tokyo': { temp: '28Â°C', condition: 'Sunny', humidity: '70%' },
                'Paris': { temp: '22Â°C', condition: 'Clear', humidity: '55%' }
            };
            return weatherData[location] || { temp: 'Unknown', condition: 'Data not available', humidity: 'Unknown' };
        }

        function getCurrentTime(location) {
            const timeData = {
                'New York': '2:30 PM EST',
                'London': '7:30 PM GMT', 
                'Tokyo': '3:30 AM JST',
                'Paris': '8:30 PM CET'
            };
            return timeData[location] || 'Time data not available';
        }

        // Define the tools/functions available to Grok
        const tools = [
            {
                type: "function",
                function: {
                    name: "get_weather",
                    description: "Get current weather information for a specific location",
                    parameters: {
                        type: "object",
                        properties: {
                            location: {
                                type: "string",
                                description: "The city name (e.g., New York, London, Tokyo, Paris)"
                            }
                        },
                        required: ["location"]
                    }
                }
            },
            {
                type: "function",
                function: {
                    name: "get_current_time",
                    description: "Get the current time for a specific location",
                    parameters: {
                        type: "object",
                        properties: {
                            location: {
                                type: "string", 
                                description: "The city name (e.g., New York, London, Tokyo, Paris)"
                            }
                        },
                        required: ["location"]
                    }
                }
            }
        ];

        async function handleQuery() {
            const userInput = document.getElementById('user-input').value;
            const responseDiv = document.getElementById('response');
            
            if (!userInput.trim()) return;

            responseDiv.innerHTML = 'Processing your request...';

            try {
                // First, send the query to Grok with available tools
                const completion = await puter.ai.chat(userInput, {
                    model: 'x-ai/grok-4-1-fast',
                    tools: tools
                });

                let finalResponse = completion;

                // Check if Grok wants to call any functions
                if (completion.message.tool_calls && completion.message.tool_calls.length > 0) {
                    const messages = [
                        { role: "user", content: userInput },
                        completion.message
                    ];

                    // Execute each function call
                    for (const toolCall of completion.message.tool_calls) {
                        let functionResult;
                        const args = JSON.parse(toolCall.function.arguments);
                        
                        if (toolCall.function.name === 'get_weather') {
                            functionResult = getWeather(args.location);
                        } else if (toolCall.function.name === 'get_current_time') {
                            functionResult = getCurrentTime(args.location);
                        }

                        // Add the function result to the conversation
                        messages.push({
                            role: "tool",
                            tool_call_id: toolCall.id,
                            content: JSON.stringify(functionResult)
                        });
                    }

                    // Get Grok's final response with the function results
                    finalResponse = await puter.ai.chat(messages, {
                        model: 'x-ai/grok-4-1-fast'
                    });
                }

                responseDiv.innerHTML = `
                    <h4>Grok's Response:</h4>
                    <p>${finalResponse.message.content.replace(/\n/g, '<br>')}</p>
                `;

            } catch (error) {
                responseDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
            }
        }

        // Allow Enter key to submit
        document.getElementById('user-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleQuery();
            }
        });
    </script>
</body>
</html>
```

Collapse code

## Example 6: Using Grok for Image Analysis

Grok can analyze images and provide insights:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <img src="https://assets.puter.site/doge.jpeg" style="display:block; max-width: 300px; margin-bottom: 20px;">
    <script>
        puter.ai.chat(
            "What do you see in this image?", 
            "https://assets.puter.site/doge.jpeg",
            { model: "x-ai/grok-4-1-fast" }
        )
        .then(response => {
            puter.print(response.message.content);
        });
    </script>
</body>
</html>
```

## Example 7: Code generation with Grok Build 0.1

Grok Build 0.1 is xAI's coding-focused model, purpose-built for agentic software engineering and code generation tasks:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a Python function that implements binary search on a sorted array",
            { model: "x-ai/grok-build-0.1" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Example 8: Using Grok for Image Generation with Grok-2-Image

Grok can generate images:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img({
            prompt: 'A cozy cabin at dusk in the snow, cinematic lighting',
            model: 'grok-2-image',
            provider: 'xai',
        }).then((image)=>{
            document.body.appendChild(image);
        });
    </script>
</body>
</html>
```

## Supported Models

The following Grok models are supported through Puter.js:

```javascript
x-ai/grok-build-0.1
x-ai/grok-4.3
x-ai/grok-4.20
x-ai/grok-4.20-multi-agent
x-ai/grok-4-1-fast
x-ai/grok-4-1-fast-non-reasoning
x-ai/grok-code-fast-1
x-ai/grok-4
x-ai/grok-4-fast
x-ai/grok-4-fast-non-reasoning
x-ai/grok-4-0709
x-ai/grok-3
x-ai/grok-3-fast
x-ai/grok-3-mini
x-ai/grok-3-mini-fast
x-ai/grok-2-vision-1212
x-ai/grok-2-image
x-ai/grok-beta
x-ai/grok-vision-beta
x-ai/grok-2
x-ai/grok-2-vision
```

---

## Text-to-Speech with xAI

Puter.js also supports xAI TTS, giving you access to 5 expressive voices and inline speech tags for natural, expressive audio.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2speech("Hello! This is xAI text-to-speech.", {
            provider: "xai",
            voice: "eve",
            output_format: "mp3"
        }).then(audio => {
            audio.play();
        });
    </script>
</body>
</html>
```

Available voices are `eve` (energetic), `ara` (warm), `rex` (confident), `sal` (smooth), and `leo` (authoritative). You can also use speech tags like `[pause]`, `[laugh]`, and `<whisper>text</whisper>` for expressive delivery. For more details, see the [Text-to-Speech API Documentation](https://docs.puter.com/AI/txt2speech/).

## Speech-to-Text with xAI

xAI STT provides accurate transcription with word-level timestamps, speaker diarization, and multichannel support.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const transcript = await puter.ai.speech2txt({
                file: 'https://assets.puter.site/example.mp3',
                provider: 'xai',
                language: 'en',
                format: true
            });
            puter.print('Transcript: ' + transcript.text);
            puter.print('Duration: ' + transcript.duration + 's');
        })();
    </script>
</body>
</html>
```

For speaker diarization, set `diarize: true` to identify who is speaking at each point in the audio. For more details, see the [Speech-to-Text API Documentation](https://docs.puter.com/AI/speech2txt/).

---

Grok through Puter.js provides a unique and engaging AI experience, combining technical capability with wit and creativity. Whether you're building a chatbot, a creative writing tool, or any other AI-powered application, Grok can help make it more engaging and fun for users.

## Related Resources

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited Liquid AI API](/tutorials/free-unlimited-liquid-ai-api/)
- [Free, Unlimited Kimi K2.6 API](/tutorials/free-unlimited-kimi-k2-api/)
- [Free, Unlimited Inception Mercury API](/tutorials/free-unlimited-inception-mercury-api/)
- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [How to Get a Grok API Key](/tutorials/how-to-get-grok-api-key/)
- [Grok API Pricing](/tutorials/grok-api-pricing/)
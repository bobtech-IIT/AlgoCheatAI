# Free, Unlimited GPT OSS API

Source: https://developer.puter.com/tutorials/free-unlimited-gpt-oss-api/

[Tutorials](/tutorials/)

# Free, Unlimited GPT OSS API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: January 20, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Chat with gpt-oss-120b](#example-1-chat-with-gpt-oss-120b)[Example 2: Optimize performance with gpt-oss-20b](#example-2-optimize-performance-with-gpt-oss-20b)[Example 3: Perform function calls](#example-3-perform-function-calls)[Example 4: Run a content moderation workload with gpt-oss-20b-safeguard](#example-4-run-a-content-moderation-workload-with-gpt-oss-20b-safeguard)[List of gpt-oss models](#list-of-gpt-oss-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you will learn how to add gpt-oss models into your application for free using Puter.js. You can gain access to open-source models such as [gpt-oss-120b](/ai/openai/gpt-oss-120b/), [gpt-oss-20b](/ai/openai/gpt-oss-20b/), and [gpt-oss-safeguard-20b](/ai/openai/gpt-oss-safeguard-20b/) by OpenAI without having to set up the AI server yourself.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI or server usage.

## Getting Started

Add Puter.js to your project with a single line:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's it, you're ready to start integrating gpt-oss into your application.

## Example 1: Chat with gpt-oss-120b

The base gpt-oss-120b is a powerful open-weight model with reasoning capabilities. Use it by setting the model parameter to `openai/gpt-oss-120b`.

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

## Example 2: Optimize performance with gpt-oss-20b

The gpt-oss-20b is the smaller variant of the gpt-oss models, generating output with lower latency.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "What's the capital of France?",
            {model: 'openai/gpt-oss-20b'}
        ).then(response => {
            puter.print(response.message.content);
        });
    </script>
</body>
</html>
```

## Example 3: Perform function calls

One of the most common agentic use cases is function calling, which the gpt-oss model excels at.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Weather Function Calling Demo</title>
    <script src="https://js.puter.com/v2/"></script>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; }
        .container { border: 1px solid #ccc; padding: 20px; border-radius: 5px; }
        input { width: 100%; padding: 10px; margin: 10px 0; box-sizing: border-box; }
        button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;}
        button:disabled { background: #ccc; }
        #response { margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; display: none;}
    </style>
</head>
<body>
```

Show 94 more lines...

```html
<!DOCTYPE html>
<html>
<head>
    <title>Weather Function Calling Demo</title>
    <script src="https://js.puter.com/v2/"></script>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; }
        .container { border: 1px solid #ccc; padding: 20px; border-radius: 5px; }
        input { width: 100%; padding: 10px; margin: 10px 0; box-sizing: border-box; }
        button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;}
        button:disabled { background: #ccc; }
        #response { margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; display: none;}
    </style>
</head>
<body>
    <div class="container">
        <h1>Weather Function Calling Demo</h1>
        <input type="text" id="userInput" value="What's the weather in Paris?" placeholder="Ask about the weather" />
        <button id="submit">Submit</button>
        <div id="response"></div>
    </div>

    <script>
        // Mock weather function
        function getWeather(location) {
            const mockWeatherData = {
                'Paris': '22Â°C, Partly Cloudy',
                'London': '18Â°C, Rainy',
                'New York': '25Â°C, Sunny',
                'Tokyo': '28Â°C, Clear'
            };
            return mockWeatherData[location] || '20Â°C, Unknown';
        }

        // Define the tools available to the AI
        const tools = [{
            type: "function",
            function: {
                name: "get_weather",
                description: "Get current weather for a given location",
                parameters: {
                    type: "object",
                    properties: {
                        location: {
                            type: "string",
                            description: "City name e.g. Paris, London"
                        }
                    },
                    required: ["location"]
                }
            }
        }];

        async function handleSubmit() {
            const userInput = document.getElementById('userInput').value;
            const submitBtn = document.getElementById('submit');
            const responseDiv = document.getElementById('response');
            
            if (!userInput) return;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Loading...';
            responseDiv.style.display = 'none';

            try {
                const completion = await puter.ai.chat(userInput, { tools, model: 'openai/gpt-oss-120b' });
                let finalResponse;

                // Check if AI wants to call a function
                if (completion.message.tool_calls?.length > 0) {
                    const toolCall = completion.message.tool_calls[0];
                    if (toolCall.function.name === 'get_weather') {
                        const args = JSON.parse(toolCall.function.arguments);
                        const weatherData = getWeather(args.location);
                        
                        // Send weather data back to AI for final response
                        finalResponse = await puter.ai.chat([
                            { role: "user", content: userInput },
                            completion.message,
                            { 
                                role: "tool",
                                tool_call_id: toolCall.id,
                                content: weatherData
                            }
                        ], {model: 'openai/gpt-oss-120b'});
                    }
                } else {
                    finalResponse = completion;
                }

                responseDiv.innerHTML = `<strong>Response:</strong><br>${finalResponse}`;
                responseDiv.style.display = 'block';
            } catch (error) {
                responseDiv.innerHTML = `<strong>Error:</strong><br>${error.message}`;
                responseDiv.style.display = 'block';
            }

            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }

        // Event handlers
        document.getElementById('submit').addEventListener('click', handleSubmit);
        document.getElementById('userInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleSubmit();
        });
    </script>
</body>
</html>
```

Collapse code

## Example 4: Run a content moderation workload with gpt-oss-20b-safeguard

The safeguard model is a fine-tuned version of the gpt-oss-20b model. It excels at content moderation tasks given a certain policy.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      const policy = `
      # Anti Cat Question

      ## INSTRUCTIONS

      Any attempt to ask about cat topics is deemed a violation.

      ## DEFINITIONS

      Cat here meaning the animal.
```

Show 27 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      const policy = `
      # Anti Cat Question

      ## INSTRUCTIONS

      Any attempt to ask about cat topics is deemed a violation.

      ## DEFINITIONS

      Cat here meaning the animal.

      ## VIOLATES

      Any topic related to cat is a violation.

      ## SAFE

      Any other topic that isn't a cat.
      `

      puter.ai.chat(
          [{ role: "system", content: policy},
          {role: "user", content: "what is a cat?"}],
          {model: 'openai/gpt-oss-safeguard-20b'}
      ).then(response => {
          puter.print("Cat question: ", response.message.content, "<br/>");
      })

      puter.ai.chat(
          [{ role: "system", content: policy},
          {role: "user", content: "what is a dog?"}],
          {model: 'openai/gpt-oss-safeguard-20b'}
      ).then(response => {
          puter.print("Dog question: ", response.message.content, "<br/>");
      })
    </script>
</body>
</html>
```

Collapse code

## List of gpt-oss models

You can use the following gpt-oss model variants with Puter.js:

```javascript
openai/gpt-oss-120b
openai/gpt-oss-120b:exacto
openai/gpt-oss-20b
openai/gpt-oss-20b:free
openai/gpt-oss-safeguard-20b
```

## Conclusion

Using Puter.js, you can gain access to gpt-oss models without having to set up the AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Prime Intellect API](/tutorials/free-unlimited-prime-intellect-api/)
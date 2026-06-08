# How to Use OpenAI SDK with Puter

Source: https://developer.puter.com/tutorials/use-openai-sdk-with-puter/

[Tutorials](/tutorials/)

# How to Use OpenAI SDK with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 18, 2026
                                    

On this page[Prerequisites](#prerequisites)[Setup](#setup)[Example 1: Basic Chat Completion](#example-1-basic-chat-completion)[Example 2: Streaming](#example-2-streaming)[Example 3: Use a Non-OpenAI Model](#example-3-use-a-non-openai-model)[Example 4: Tool/Function Calling](#example-4-toolfunction-calling)[Example 5: cURL](#example-5-curl)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to use the OpenAI SDK with Puter. Puter now exposes an OpenAI-compatible endpoint, which means any tool, library, or framework that works with the OpenAI API also works with Puter, out of the box.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [Node.js](https://nodejs.org) installed on your machine

## Setup

Install the OpenAI SDK:

```javascript
npm install openai
```

Then configure the client with Puter's base URL and your auth token:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});
```

Replace `YOUR_PUTER_AUTH_TOKEN` with the auth token you copied from your Puter dashboard. That's all you need to start making requests.

## Example 1: Basic Chat Completion

Let's start with the simplest possible example, a single chat completion:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

const response = await client.chat.completions.create({
  model: "gpt-5-nano",
  messages: [
    { role: "user", content: "What is the capital of France?" },
  ],
});

console.log(response.choices[0].message.content);
```

This sends a single message to gpt-5-nano and prints the response. The API is identical to what you'd use with OpenAI directly. The only difference is the base URL and auth token.

## Example 2: Streaming

For longer responses, streaming gives you results in real-time as they're generated:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

const stream = await client.chat.completions.create({
  model: "gpt-5-nano",
  messages: [
    { role: "user", content: "Write a short story about a robot learning to paint." },
  ],
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    process.stdout.write(content);
  }
}
```

Set `stream: true` and iterate over the chunks as they arrive. Each chunk contains a piece of the response that you can display immediately.

## Example 3: Use a Non-OpenAI Model

This is where it gets interesting. Same code, same endpoint. Just swap the `model` parameter to use Claude, Gemini, Grok, or any other supported model:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

// Use Claude
const claude = await client.chat.completions.create({
  model: "claude-sonnet-4-5",
  messages: [
    { role: "user", content: "What is the capital of France?" },
  ],
});
console.log("Claude:", claude.choices[0].message.content);
```

Show 18 more lines...

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

// Use Claude
const claude = await client.chat.completions.create({
  model: "claude-sonnet-4-5",
  messages: [
    { role: "user", content: "What is the capital of France?" },
  ],
});
console.log("Claude:", claude.choices[0].message.content);

// Use Gemini
const gemini = await client.chat.completions.create({
  model: "gemini-2.5-flash-lite",
  messages: [
    { role: "user", content: "What is the capital of France?" },
  ],
});
console.log("Gemini:", gemini.choices[0].message.content);

// Use Grok
const grok = await client.chat.completions.create({
  model: "grok-4-1-fast",
  messages: [
    { role: "user", content: "What is the capital of France?" },
  ],
});
console.log("Grok:", grok.choices[0].message.content);
```

Collapse code

One endpoint, any model. You don't need separate SDKs, separate API keys, or separate billing accounts. Switch between providers by changing a single string.

## Example 4: Tool/Function Calling

Function calling lets the model request structured data from your code. Here's an example with a simple `get_weather` tool:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

// Define the tool
const tools = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get the current weather for a given location",
      parameters: {
```

Show 49 more lines...

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

// Define the tool
const tools = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get the current weather for a given location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "City name, e.g. San Francisco",
          },
        },
        required: ["location"],
      },
    },
  },
];

// Send the request with tools
const response = await client.chat.completions.create({
  model: "gpt-5-nano",
  messages: [
    { role: "user", content: "What's the weather like in Tokyo?" },
  ],
  tools: tools,
});

// Handle the tool call
const toolCall = response.choices[0].message.tool_calls?.[0];
if (toolCall) {
  const args = JSON.parse(toolCall.function.arguments);
  console.log(`Model wants to call: ${toolCall.function.name}`);
  console.log(`With arguments:`, args);

  // Simulate a tool response
  const toolResult = JSON.stringify({ temperature: "22Â°C", condition: "Partly cloudy" });

  // Send the tool result back to the model
  const finalResponse = await client.chat.completions.create({
    model: "gpt-5-nano",
    messages: [
      { role: "user", content: "What's the weather like in Tokyo?" },
      response.choices[0].message,
      {
        role: "tool",
        tool_call_id: toolCall.id,
        content: toolResult,
      },
    ],
    tools: tools,
  });

  console.log(finalResponse.choices[0].message.content);
}
```

Collapse code

The model analyzes the user's question, decides it needs weather data, and returns a structured tool call. Your code executes the function, sends the result back, and the model generates a final response using that data.

## Example 5: cURL

If you prefer raw HTTP requests or want to use the API from any language, here's the same chat completion as a cURL command:

```javascript
curl https://api.puter.com/puterai/openai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_PUTER_AUTH_TOKEN" \
  -d '{
    "model": "gpt-5-nano",
    "messages": [
      {"role": "user", "content": "Hello, how are you?"}
    ]
  }'
```

The API follows the OpenAI spec, so any HTTP client that works with OpenAI will work here. Just change the base URL and use your Puter auth token as the Bearer token.

## Conclusion

That's it. You now have a single endpoint that gives you access to GPT, Claude, Gemini, Grok, and more, all through the familiar OpenAI SDK. No need to juggle multiple API keys or rewrite your code when you want to try a different model.

To go further, check out the full [Puter.js documentation](https://docs.puter.com) or browse the complete list of [supported AI models](/ai/models/). You can also learn more about the [Puter.js AI API](https://docs.puter.com/AI/chat/) for additional features like vision, text-to-speech, and image generation.

## Related

- [How to do OAuth with OpenAI](/tutorials/openai-oauth/)
- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [How to Get an Anthropic API Key](/tutorials/how-to-get-anthropic-api-key/)
- [How to Use Anthropic SDK with Puter](/tutorials/use-anthropic-sdk-with-puter/)
- [How to Use OpenRouter SDK with Puter](/tutorials/use-openrouter-sdk-with-puter/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use LiteLLM with Puter](/tutorials/use-litellm-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
- [How to Use Cline with Puter](/tutorials/use-cline-with-puter/)
- [How to Use Kilo Code with Puter](/tutorials/use-kilo-code-with-puter/)
- [How to Use Roo Code with Puter](/tutorials/use-roo-code-with-puter/)
- [How to Use BLACKBOX AI with Puter](/tutorials/use-blackbox-ai-with-puter/)
- [How to Use SillyTavern with Puter](/tutorials/use-silly-tavern-with-puter/)
- [How to Use Janitor AI with Puter](/tutorials/use-janitor-ai-with-puter/)
- [How to Use OpenHands with Puter](/tutorials/use-openhands-with-puter/)
- [Access Claude Using OpenAI-Compatible API](/tutorials/access-claude-using-openai-compatible-api/)
- [Access Gemini Using OpenAI-Compatible API](/tutorials/access-gemini-using-openai-compatible-api/)
- [Access Grok Using OpenAI-Compatible API](/tutorials/access-grok-using-openai-compatible-api/)
- [Access Llama Using OpenAI-Compatible API](/tutorials/access-llama-using-openai-compatible-api/)
- [Access DeepSeek Using OpenAI-Compatible API](/tutorials/access-deepseek-using-openai-compatible-api/)
- [Access Mistral Using OpenAI-Compatible API](/tutorials/access-mistral-using-openai-compatible-api/)
- [Access Perplexity Using OpenAI-Compatible API](/tutorials/access-perplexity-using-openai-compatible-api/)
- [Access Qwen Using OpenAI-Compatible API](/tutorials/access-qwen-using-openai-compatible-api/)
- [Access MiniMax Using OpenAI-Compatible API](/tutorials/access-minimax-using-openai-compatible-api/)
- [Access Kimi Using OpenAI-Compatible API](/tutorials/access-kimi-using-openai-compatible-api/)
- [Access GLM Using OpenAI-Compatible API](/tutorials/access-glm-using-openai-compatible-api/)
- [Access Cohere Using OpenAI-Compatible API](/tutorials/access-cohere-using-openai-compatible-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited Grok API](/tutorials/free-unlimited-grok-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
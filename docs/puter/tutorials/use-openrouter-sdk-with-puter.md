# How to Use OpenRouter SDK with Puter

Source: https://developer.puter.com/tutorials/use-openrouter-sdk-with-puter/

[Tutorials](/tutorials/)

# How to Use OpenRouter SDK with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 24, 2026
                                    

On this page[Prerequisites](#prerequisites)[Setup](#setup)[Example 1: Basic Chat Completion](#example-1-basic-chat-completion)[Example 2: Streaming](#example-2-streaming)[Example 3: Use a Different Model](#example-3-use-a-different-model)[Example 4: Tool/Function Calling](#example-4-toolfunction-calling)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to use the OpenRouter TypeScript SDK with Puter. Puter exposes an OpenAI-compatible endpoint, and the OpenRouter SDK can be configured to use it as a custom server URL. This gives you a type-safe client for accessing GPT, Claude, Gemini, Grok, and more, all through a single endpoint.

**Note:**  The OpenRouter SDK is currently in beta and may have breaking changes between versions. This tutorial uses version `0.9.11`. We recommend pinning your dependency to this version until the SDK reaches a stable release.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [Node.js](https://nodejs.org) installed on your machine

## Setup

Install the OpenRouter SDK:

```javascript
npm install @openrouter/sdk@0.9.11
```

Then configure the client with Puter's server URL and your auth token:

```javascript
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
  serverURL: "https://api.puter.com/puterai/openai/v1/",
});
```

Replace `YOUR_PUTER_AUTH_TOKEN` with the auth token you copied from your Puter dashboard. The `serverURL` option points the SDK at Puter's OpenAI-compatible endpoint instead of the default OpenRouter API.

## Example 1: Basic Chat Completion

Let's start with the simplest possible example, a single chat completion:

```javascript
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
  serverURL: "https://api.puter.com/puterai/openai/v1/",
});

const response = await client.chat.send({
  chatGenerationParams: {
    model: "gpt-5-nano",
    messages: [
      { role: "user", content: "What is the capital of France?" },
    ],
  },
});

console.log(response.choices[0].message.content);
```

This sends a single message to gpt-5-nano and prints the response. The `chatGenerationParams` object is similar to the OpenAI chat completion format, but the OpenRouter SDK uses camelCase for field names (e.g. `toolCalls` instead of `tool_calls`, `toolCallId` instead of `tool_call_id`).

## Example 2: Streaming

For longer responses, streaming gives you results in real-time as they're generated:

```javascript
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
  serverURL: "https://api.puter.com/puterai/openai/v1/",
});

const stream = await client.chat.send({
  chatGenerationParams: {
    model: "gpt-5-nano",
    messages: [
      { role: "user", content: "Write a short story about a robot learning to paint." },
    ],
    stream: true,
  },
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    process.stdout.write(content);
  }
}
```

Set `stream: true` inside `chatGenerationParams` and iterate over the chunks as they arrive. Each chunk contains a piece of the response that you can display immediately.

## Example 3: Use a Different Model

This is where it gets interesting. Same code, same endpoint. Just swap the `model` parameter to use Claude, Gemini, Grok, or any other supported model:

```javascript
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
  serverURL: "https://api.puter.com/puterai/openai/v1/",
});

// Use Claude
const claude = await client.chat.send({
  chatGenerationParams: {
    model: "claude-sonnet-4-5",
    messages: [
      { role: "user", content: "What is the capital of France?" },
    ],
  },
```

Show 24 more lines...

```javascript
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
  serverURL: "https://api.puter.com/puterai/openai/v1/",
});

// Use Claude
const claude = await client.chat.send({
  chatGenerationParams: {
    model: "claude-sonnet-4-5",
    messages: [
      { role: "user", content: "What is the capital of France?" },
    ],
  },
});
console.log("Claude:", claude.choices[0].message.content);

// Use Gemini
const gemini = await client.chat.send({
  chatGenerationParams: {
    model: "gemini-2.5-flash-lite",
    messages: [
      { role: "user", content: "What is the capital of France?" },
    ],
  },
});
console.log("Gemini:", gemini.choices[0].message.content);

// Use Grok
const grok = await client.chat.send({
  chatGenerationParams: {
    model: "grok-4-1-fast",
    messages: [
      { role: "user", content: "What is the capital of France?" },
    ],
  },
});
console.log("Grok:", grok.choices[0].message.content);
```

Collapse code

One endpoint, any model. You don't need separate SDKs, separate API keys, or separate billing accounts. Switch between providers by changing a single string.

## Example 4: Tool/Function Calling

Function calling lets the model request structured data from your code. Here's an example with a simple `get_weather` tool:

```javascript
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
  serverURL: "https://api.puter.com/puterai/openai/v1/",
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

Show 53 more lines...

```javascript
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
  serverURL: "https://api.puter.com/puterai/openai/v1/",
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
const response = await client.chat.send({
  chatGenerationParams: {
    model: "gpt-5-nano",
    messages: [
      { role: "user", content: "What's the weather like in Tokyo?" },
    ],
    tools: tools,
  },
});

// Handle the tool call
const toolCall = response.choices[0].message.toolCalls?.[0];
if (toolCall) {
  const args = JSON.parse(toolCall.function.arguments);
  console.log(`Model wants to call: ${toolCall.function.name}`);
  console.log(`With arguments:`, args);

  // Simulate a tool response
  const toolResult = JSON.stringify({ temperature: "22Â°C", condition: "Partly cloudy" });

  // Send the tool result back to the model
  const finalResponse = await client.chat.send({
    chatGenerationParams: {
      model: "gpt-5-nano",
      messages: [
        { role: "user", content: "What's the weather like in Tokyo?" },
        response.choices[0].message,
        {
          role: "tool",
          toolCallId: toolCall.id,
          content: toolResult,
        },
      ],
      tools: tools,
    },
  });

  console.log(finalResponse.choices[0].message.content);
}
```

Collapse code

The model analyzes the user's question, decides it needs weather data, and returns a structured tool call. Your code executes the function, sends the result back, and the model generates a final response using that data.

## Conclusion

That's it. You now have the OpenRouter TypeScript SDK configured to use Puter as a backend, giving you access to GPT, Claude, Gemini, Grok, and more through a type-safe client. No need to juggle multiple API keys or rewrite your code when you want to try a different model.

To go further, check out the full [Puter.js documentation](https://docs.puter.com) or browse the complete list of [supported AI models](/ai/models/). You can also learn more about the [Puter.js AI API](https://docs.puter.com/AI/chat/) for additional features like vision, text-to-speech, and image generation.

## Related

- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
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
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited Grok API](/tutorials/free-unlimited-grok-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
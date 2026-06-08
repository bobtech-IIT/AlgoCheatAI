# How to Use Anthropic SDK with Puter

Source: https://developer.puter.com/tutorials/use-anthropic-sdk-with-puter/

[Tutorials](/tutorials/)

# How to Use Anthropic SDK with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: March 25, 2026
                                    

On this page[Prerequisites](#prerequisites)[Setup](#setup)[Example 1: Basic Message](#example-1-basic-message)[Example 2: Streaming](#example-2-streaming)[Example 3: Multi-turn Conversation](#example-3-multi-turn-conversation)[Example 4: Tool Use](#example-4-tool-use)[Example 5: cURL](#example-5-curl)[Conclusion](#conclusion)[Related](#related)

Puter provides a native Anthropic-compatible endpoint. This means you can drop in the official Anthropic TypeScript SDK, point it at Puter, and start calling Claude immediately.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [Node.js](https://nodejs.org) installed on your machine

## Setup

Install the Anthropic SDK:

```javascript
npm install @anthropic-ai/sdk
```

Next, initialize the client by pointing it at Puter's base URL with your auth token:

```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  baseURL: "https://api.puter.com/puterai/anthropic",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});
```

Swap `YOUR_PUTER_AUTH_TOKEN` for the token you copied earlier. You're ready to go.

## Example 1: Basic Message

Here's the most basic usage, sending a single message and reading the reply:

```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  baseURL: "https://api.puter.com/puterai/anthropic",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

const message = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "What is the capital of France?" },
  ],
});

console.log(message.content[0].text);
```

This calls Claude [Sonnet](/ai/sonnet/) and prints the reply. Everything works exactly like the official Anthropic API. The only thing that changes is the base URL and token.

## Example 2: Streaming

When you want to display output as it's being generated, enable streaming:

```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  baseURL: "https://api.puter.com/puterai/anthropic",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

const stream = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "Write a short story about a robot learning to paint." },
  ],
  stream: true,
});

for await (const event of stream) {
  if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
    process.stdout.write(event.delta.text);
  }
}
```

Pass `stream: true` and loop through the incoming events. Look for `content_block_delta` events, since each one carries a fragment of text you can render right away.

## Example 3: Multi-turn Conversation

Build on prior context by passing the full message history in the `messages` array:

```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  baseURL: "https://api.puter.com/puterai/anthropic",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

const message = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "What is the capital of France?" },
    { role: "assistant", content: "The capital of France is Paris." },
    { role: "user", content: "What is its population?" },
  ],
});

console.log(message.content[0].text);
```

Because the earlier exchange is included, Claude knows "its" refers to Paris and answers with the relevant population data.

## Example 4: Tool Use

Tools allow Claude to call functions you define. Below is a `get_weather` example that shows the full round-trip:

```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  baseURL: "https://api.puter.com/puterai/anthropic",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

// Define the tool
const tools = [
  {
    name: "get_weather",
    description: "Get the current weather for a given location",
    input_schema: {
      type: "object",
      properties: {
```

Show 52 more lines...

```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  baseURL: "https://api.puter.com/puterai/anthropic",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

// Define the tool
const tools = [
  {
    name: "get_weather",
    description: "Get the current weather for a given location",
    input_schema: {
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
];

// Send the request with tools
const response = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "What's the weather like in Tokyo?" },
  ],
  tools: tools,
});

// Handle the tool call
const toolUse = response.content.find((block) => block.type === "tool_use");
if (toolUse) {
  console.log(`Model wants to call: ${toolUse.name}`);
  console.log(`With arguments:`, toolUse.input);

  // Simulate a tool response
  const toolResult = JSON.stringify({ temperature: "22Â°C", condition: "Partly cloudy" });

  // Send the tool result back to the model
  const finalResponse = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [
      { role: "user", content: "What's the weather like in Tokyo?" },
      { role: "assistant", content: response.content },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: toolResult,
          },
        ],
      },
    ],
    tools: tools,
  });

  console.log(finalResponse.content[0].text);
}
```

Collapse code

Claude inspects the question, determines it needs weather data, and emits a `tool_use` block. You run the function, feed the result back as a `tool_result`, and Claude produces a final human-readable answer.

## Example 5: cURL

You can also hit the endpoint directly with cURL or any HTTP client:

```javascript
curl https://api.puter.com/puterai/anthropic/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_PUTER_AUTH_TOKEN" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-sonnet-4-6",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello, how are you?"}
    ]
  }'
```

Since the endpoint is fully Anthropic-compatible, any HTTP client or library that targets the Anthropic API will work. Just update the URL and pass your Puter token as the API key.

## Conclusion

You're all set. With a single Puter account you can talk to Claude through the native Anthropic SDK, no separate Anthropic API key or billing required.

For more, explore the [Puter.js documentation](https://docs.puter.com), see all [supported AI models](/ai/models/), or dive into the [Puter.js AI API](https://docs.puter.com/AI/chat/) for [vision](/ocr/), [text-to-speech](/text-to-speech/), [image generation](/image-generation/), and more.

## Related

- [How to Get an Anthropic API Key](/tutorials/how-to-get-anthropic-api-key/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Use Claude Code with Puter](/tutorials/use-claude-code-with-puter/)
- [Access Claude Using OpenAI-Compatible API](/tutorials/access-claude-using-openai-compatible-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
- [How to do OAuth with Claude](/tutorials/claude-oauth/)
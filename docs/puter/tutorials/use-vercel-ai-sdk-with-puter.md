# How to Use Vercel AI SDK with Puter

Source: https://developer.puter.com/tutorials/use-vercel-ai-sdk-with-puter/

[Tutorials](/tutorials/)

# How to Use Vercel AI SDK with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 23, 2026
                                    

On this page[Prerequisites](#prerequisites)[Setup](#setup)[Example 1: Basic Text Generation](#example-1-basic-text-generation)[Example 2: Streaming](#example-2-streaming)[Example 3: Use a Non-OpenAI Model](#example-3-use-a-non-openai-model)[Example 4: Tool Calling](#example-4-tool-calling)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to use the [Vercel AI SDK](https://ai-sdk.dev) with Puter. Puter exposes an OpenAI-compatible endpoint, and the Vercel AI SDK supports custom OpenAI providers, so you can use `generateText`, `streamText`, tool calling, and more with any model Puter supports.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [Node.js](https://nodejs.org) installed on your machine

## Setup

Install the Vercel AI SDK and the OpenAI provider:

```javascript
npm install ai @ai-sdk/openai
```

Then configure the provider with Puter's base URL and your auth token:

```javascript
import { createOpenAI } from '@ai-sdk/openai';

const puter = createOpenAI({
  baseURL: 'https://api.puter.com/puterai/openai/v1/',
  apiKey: 'YOUR_PUTER_AUTH_TOKEN',
});
```

Replace `YOUR_PUTER_AUTH_TOKEN` with the auth token you copied from your Puter dashboard. That's all you need to start making requests.

## Example 1: Basic Text Generation

Let's start with the simplest possible example, a single text generation call:

```javascript
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const puter = createOpenAI({
  baseURL: 'https://api.puter.com/puterai/openai/v1/',
  apiKey: 'YOUR_PUTER_AUTH_TOKEN',
});

const { text } = await generateText({
  model: puter.chat('gpt-5-nano'),
  prompt: 'What is the capital of France?',
});

console.log(text);
```

This sends a single prompt to gpt-5-nano and prints the response. The `generateText` function handles the chat completion call for you. The only difference from using OpenAI directly is the base URL and auth token.

## Example 2: Streaming

For longer responses, streaming gives you results in real-time as they're generated:

```javascript
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const puter = createOpenAI({
  baseURL: 'https://api.puter.com/puterai/openai/v1/',
  apiKey: 'YOUR_PUTER_AUTH_TOKEN',
});

const result = streamText({
  model: puter.chat('gpt-5-nano'),
  prompt: 'Write a short story about a robot learning to paint.',
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

Use `streamText` instead of `generateText` and iterate over `result.textStream` to get text chunks as they arrive. Each chunk is a plain string that you can display immediately.

## Example 3: Use a Non-OpenAI Model

This is where it gets interesting. Same code, same provider. Just swap the model string to use Claude, Gemini, Grok, or any other supported model:

```javascript
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const puter = createOpenAI({
  baseURL: 'https://api.puter.com/puterai/openai/v1/',
  apiKey: 'YOUR_PUTER_AUTH_TOKEN',
});

// Use Claude
const claude = await generateText({
  model: puter.chat('claude-sonnet-4-5'),
  prompt: 'What is the capital of France?',
});
console.log('Claude:', claude.text);

// Use Gemini
const gemini = await generateText({
  model: puter.chat('gemini-2.5-flash-lite'),
  prompt: 'What is the capital of France?',
});
console.log('Gemini:', gemini.text);

// Use Grok
const grok = await generateText({
  model: puter.chat('grok-4-1-fast'),
  prompt: 'What is the capital of France?',
});
console.log('Grok:', grok.text);
```

One provider, any model. You don't need separate SDKs, separate API keys, or separate billing accounts. Switch between providers by changing a single string.

## Example 4: Tool Calling

Tool calling lets the model request structured data from your code. Define tools with a JSON schema and an `execute` function, and the SDK handles the rest:

```javascript
import { createOpenAI } from '@ai-sdk/openai';
import { generateText, tool, jsonSchema, stepCountIs } from 'ai';

const puter = createOpenAI({
  baseURL: 'https://api.puter.com/puterai/openai/v1/',
  apiKey: 'YOUR_PUTER_AUTH_TOKEN',
});

const { text } = await generateText({
  model: puter.chat('gpt-5-nano'),
  prompt: "What's the weather like in Tokyo?",
  stopWhen: stepCountIs(2),
  tools: {
    get_weather: tool({
      description: 'Get the current weather for a given location',
      inputSchema: jsonSchema({
        type: 'object',
        properties: {
          location: { type: 'string', description: 'City name, e.g. San Francisco' },
        },
        required: ['location'],
      }),
      execute: async ({ location }) => {
        return { temperature: '22Â°C', condition: 'Partly cloudy' };
      },
    }),
  },
});

console.log(text);
```

The model analyzes the user's question, decides it needs weather data, and the SDK automatically calls your `execute` function and feeds the result back to the model. No manual tool call handling required.

## Conclusion

That's it. You now have the Vercel AI SDK connected to Puter, giving you access to GPT, Claude, Gemini, Grok, and more through a clean, unified API. No need to juggle multiple API keys or rewrite your code when you want to try a different model.

To go further, check out the full [Puter.js documentation](https://docs.puter.com) or browse the complete list of [supported AI models](/ai/models/). You can also learn more about the [Vercel AI SDK documentation](https://ai-sdk.dev/docs) for additional features like structured outputs, multi-step agents, and more.

## Related

- [Access Claude Using Vercel AI SDK](/tutorials/access-claude-using-vercel-ai-sdk/)
- [Access Gemini Using Vercel AI SDK](/tutorials/access-gemini-using-vercel-ai-sdk/)
- [Access Grok Using Vercel AI SDK](/tutorials/access-grok-using-vercel-ai-sdk/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Use OpenRouter SDK with Puter](/tutorials/use-openrouter-sdk-with-puter/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use LiteLLM with Puter](/tutorials/use-litellm-with-puter/)
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
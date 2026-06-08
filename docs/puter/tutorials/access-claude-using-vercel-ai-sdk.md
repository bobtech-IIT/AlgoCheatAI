# How to Use Claude with the Vercel AI SDK â Anthropic Provider Guide

Source: https://developer.puter.com/tutorials/access-claude-using-vercel-ai-sdk/

[Tutorials](/tutorials/)

# How to Use Claude with the Vercel AI SDK â Anthropic Provider Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: March 4, 2026
                                    

On this page[About Claude](#about-claude)[Prerequisites](#prerequisites)[Setup](#setup)[Basic Text Generation](#basic-text-generation)[Streaming](#streaming)[Why Use Puter?](#why-use-puter)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to use Claude models with the Vercel AI SDK through Puter's OpenAI-compatible provider endpoint. No Anthropic API key needed â just your Puter auth token.

## About Claude

Claude is a family of AI models built by Anthropic, a company focused on AI safety research. Claude is known for strong reasoning, careful instruction-following, and high-quality code generation. The model family includes [Haiku](/ai/haiku/) (fast and lightweight), [Sonnet](/ai/sonnet/) (balanced performance), and [Opus](/ai/opus/) (most capable). Through Puter, you can access all Claude models via the Vercel AI SDK without needing a separate Anthropic API key.

## Prerequisites

- A [Puter](https://puter.com) account
- Your Puter auth token, go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [Node.js](https://nodejs.org) installed on your machine

## Setup

Install the Vercel AI SDK and the OpenAI provider:

```javascript
npm install ai @ai-sdk/openai
```

Puter works as an OpenAI-compatible provider, so you use `@ai-sdk/openai` to connect. Configure it with Puter's base URL and your auth token:

```javascript
import { createOpenAI } from '@ai-sdk/openai';

const puter = createOpenAI({
  baseURL: 'https://api.puter.com/puterai/openai/v1/',
  apiKey: 'YOUR_PUTER_AUTH_TOKEN',
});
```

Replace `YOUR_PUTER_AUTH_TOKEN` with the auth token you copied from your Puter dashboard. That's all you need. No Anthropic API key required.

## Basic Text Generation

Here's a simple text generation call using Claude Sonnet 4.5:

```javascript
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const puter = createOpenAI({
  baseURL: 'https://api.puter.com/puterai/openai/v1/',
  apiKey: 'YOUR_PUTER_AUTH_TOKEN',
});

const { text } = await generateText({
  model: puter.chat('claude-sonnet-4-5'),
  prompt: 'What is the capital of France?',
});

console.log(text);
```

The code is identical to what you'd write for any OpenAI provider. The only difference is the base URL and the model string.

## Streaming

For longer responses, use `streamText` to get results in real-time:

```javascript
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const puter = createOpenAI({
  baseURL: 'https://api.puter.com/puterai/openai/v1/',
  apiKey: 'YOUR_PUTER_AUTH_TOKEN',
});

const result = streamText({
  model: puter.chat('claude-sonnet-4-5'),
  prompt: 'Write a short story about a robot learning to paint.',
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

Use `streamText` instead of `generateText` and iterate over `result.textStream` to get text chunks as they arrive.

## Why Use Puter?

You could install `@ai-sdk/anthropic` and use Anthropic's API key directly. Here's why Puter is a simpler option:

- **One API key for everything**  â no need to sign up for separate Anthropic, Google, or OpenAI accounts. Your Puter auth token covers all providers.
- **One setup for all models**  â the same Puter config works for Claude, GPT, Gemini, Llama, and 400+ other models. Just change the model string.
- **No extra packages**  â without Puter, each AI provider needs its own SDK package and API key. With Puter, everything goes through a single `@ai-sdk/openai` setup.

## Conclusion

You now have the Anthropic provider set up through the Vercel AI SDK via Puter â no API key needed. Swap the model string to use any [Claude model](/ai/anthropic/), from the lightweight Haiku to the flagship Opus, or any of the hundreds of other [AI models](/ai/models/) available through Puter.

## Related

- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Claude API Pricing](/tutorials/claude-api-pricing/)
- [Anthropic Models on Puter](/ai/anthropic/)
- [Access Gemini Using Vercel AI SDK](/tutorials/access-gemini-using-vercel-ai-sdk/)
- [Access Grok Using Vercel AI SDK](/tutorials/access-grok-using-vercel-ai-sdk/)
- [Supported AI Models](/ai/models/)
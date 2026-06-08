# How to Use Perplexity with the Vercel AI SDK â Perplexity Provider Guide

Source: https://developer.puter.com/tutorials/access-perplexity-using-vercel-ai-sdk/

[Tutorials](/tutorials/)

# How to Use Perplexity with the Vercel AI SDK â Perplexity Provider Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: March 4, 2026
                                    

On this page[About Perplexity](#about-perplexity)[Prerequisites](#prerequisites)[Setup](#setup)[Basic Text Generation](#basic-text-generation)[Streaming](#streaming)[Why Use Puter?](#why-use-puter)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to use Perplexity models with the Vercel AI SDK through Puter's OpenAI-compatible provider endpoint. No Perplexity API key needed â just your Puter auth token.

## About Perplexity

Perplexity AI specializes in AI-powered search and answer generation. Their Sonar models combine large language model capabilities with real-time web search, delivering responses grounded in current information with inline citations. The Sonar family includes standard Sonar for balanced performance and Sonar Pro for more complex research tasks. Through Puter, you can access Perplexity models via the Vercel AI SDK without needing a separate Perplexity API key.

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

Replace `YOUR_PUTER_AUTH_TOKEN` with the auth token you copied from your Puter dashboard. That's all you need. No Perplexity API key required.

## Basic Text Generation

Here's a simple text generation call using Sonar:

```javascript
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const puter = createOpenAI({
  baseURL: 'https://api.puter.com/puterai/openai/v1/',
  apiKey: 'YOUR_PUTER_AUTH_TOKEN',
});

const { text } = await generateText({
  model: puter.chat('perplexity/sonar'),
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
  model: puter.chat('perplexity/sonar'),
  prompt: 'Write a short story about a robot learning to paint.',
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

Use `streamText` instead of `generateText` and iterate over `result.textStream` to get text chunks as they arrive.

## Why Use Puter?

You could install `@ai-sdk/perplexity` and use Perplexity's API key directly. Here's why Puter is a simpler option:

- **One API key for everything**  â no need to sign up for separate Perplexity, Anthropic, or OpenAI accounts. Your Puter auth token covers all providers.
- **One setup for all models**  â the same Puter config works for Claude, GPT, Gemini, Llama, and 400+ other models. Just change the model string.
- **No extra packages**  â without Puter, each AI provider needs its own SDK package and API key. With Puter, everything goes through a single `@ai-sdk/openai` setup.

## Conclusion

You now have the Perplexity provider set up through the Vercel AI SDK via Puter â no API key needed. Swap the model string to use any [Perplexity model](/ai/perplexity/), from the fast Sonar to the powerful Sonar Pro, or any of the hundreds of other [AI models](/ai/models/) available through Puter.

## Related

- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
- [Free, Unlimited Perplexity AI API](/tutorials/free-unlimited-perplexity-ai-api/)
- [Perplexity AI Models on Puter](/ai/perplexity/)
- [Access Mistral Using Vercel AI SDK](/tutorials/access-mistral-using-vercel-ai-sdk/)
- [Access Cohere Using Vercel AI SDK](/tutorials/access-cohere-using-vercel-ai-sdk/)
- [Supported AI Models](/ai/models/)
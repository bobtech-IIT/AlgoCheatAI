# How to Use Mistral with the Vercel AI SDK â Mistral Provider Guide

Source: https://developer.puter.com/tutorials/access-mistral-using-vercel-ai-sdk/

[Tutorials](/tutorials/)

# How to Use Mistral with the Vercel AI SDK â Mistral Provider Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: March 4, 2026
                                    

On this page[About Mistral](#about-mistral)[Prerequisites](#prerequisites)[Setup](#setup)[Basic Text Generation](#basic-text-generation)[Streaming](#streaming)[Why Use Puter?](#why-use-puter)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to use Mistral models with the Vercel AI SDK through Puter's OpenAI-compatible provider endpoint. No Mistral API key needed â just your Puter auth token.

## About Mistral

Mistral AI is a French AI company known for building efficient, high-performance models. Their models offer a strong balance between quality and speed, with particularly good performance on European languages. Mistral models are popular in the open-source community and in enterprise deployments. Through Puter, you can access Mistral with the Vercel AI SDK â no Mistral API key needed.

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

Replace `YOUR_PUTER_AUTH_TOKEN` with the auth token you copied from your Puter dashboard. That's all you need. No Mistral API key required.

## Basic Text Generation

Here's a simple text generation call using Mistral Large 3:

```javascript
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const puter = createOpenAI({
  baseURL: 'https://api.puter.com/puterai/openai/v1/',
  apiKey: 'YOUR_PUTER_AUTH_TOKEN',
});

const { text } = await generateText({
  model: puter.chat('mistralai/mistral-large-2512'),
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
  model: puter.chat('mistralai/mistral-large-2512'),
  prompt: 'Write a short story about a robot learning to paint.',
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

Use `streamText` instead of `generateText` and iterate over `result.textStream` to get text chunks as they arrive.

## Why Use Puter?

You could install `@ai-sdk/mistral` and use Mistral's API key directly. Here's why Puter is a simpler option:

- **One API key for everything**  â no need to sign up for separate Mistral, Anthropic, or OpenAI accounts. Your Puter auth token covers all providers.
- **One setup for all models**  â the same Puter config works for Claude, GPT, Gemini, Llama, and 400+ other models. Just change the model string.
- **No extra packages**  â without Puter, each AI provider needs its own SDK package and API key. With Puter, everything goes through a single `@ai-sdk/openai` setup.

## Conclusion

You now have the Mistral provider set up through the Vercel AI SDK via Puter â no API key needed. Swap the model string to use any [Mistral model](/ai/mistralai/), from the lightweight Small to the powerful Large, or any of the hundreds of other [AI models](/ai/models/) available through Puter.

## Related

- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
- [Free, Unlimited Mistral API](/tutorials/free-unlimited-mistral-api/)
- [Mistral AI Models on Puter](/ai/mistralai/)
- [Access Llama Using Vercel AI SDK](/tutorials/access-llama-using-vercel-ai-sdk/)
- [Access Perplexity Using Vercel AI SDK](/tutorials/access-perplexity-using-vercel-ai-sdk/)
- [Supported AI Models](/ai/models/)
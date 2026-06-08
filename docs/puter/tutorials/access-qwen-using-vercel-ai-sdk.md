# How to Use Qwen with the Vercel AI SDK â Alibaba Provider Guide

Source: https://developer.puter.com/tutorials/access-qwen-using-vercel-ai-sdk/

[Tutorials](/tutorials/)

# How to Use Qwen with the Vercel AI SDK â Alibaba Provider Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: March 4, 2026
                                    

On this page[About Qwen](#about-qwen)[Prerequisites](#prerequisites)[Setup](#setup)[Basic Text Generation](#basic-text-generation)[Streaming](#streaming)[Why Use Puter?](#why-use-puter)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to use Qwen models with the Vercel AI SDK through Puter's OpenAI-compatible provider endpoint. No Alibaba API key needed â just your Puter auth token.

## About Qwen

Qwen is a family of large language models developed by Alibaba Cloud. Qwen models are known for strong multilingual support, particularly in Chinese and English, and competitive performance across coding, math, and reasoning benchmarks. The lineup spans from lightweight models suitable for edge deployment to large 72B+ parameter models for complex tasks. Through Puter, you can access Qwen models via the Vercel AI SDK without needing an Alibaba API key.

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

Replace `YOUR_PUTER_AUTH_TOKEN` with the auth token you copied from your Puter dashboard. That's all you need. No Alibaba API key required.

## Basic Text Generation

Here's a simple text generation call using Qwen 2.5 72B Instruct:

```javascript
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const puter = createOpenAI({
  baseURL: 'https://api.puter.com/puterai/openai/v1/',
  apiKey: 'YOUR_PUTER_AUTH_TOKEN',
});

const { text } = await generateText({
  model: puter.chat('qwen/qwen2-5-72b-instruct'),
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
  model: puter.chat('qwen/qwen2-5-72b-instruct'),
  prompt: 'Write a short story about a robot learning to paint.',
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

Use `streamText` instead of `generateText` and iterate over `result.textStream` to get text chunks as they arrive.

## Why Use Puter?

You could use Qwen through Alibaba Cloud's API directly. Here's why Puter is a simpler option:

- **One API key for everything**  â no need to sign up for separate Alibaba Cloud, Anthropic, or OpenAI accounts. Your Puter auth token covers all providers.
- **One setup for all models**  â the same Puter config works for Claude, GPT, Gemini, Llama, and 400+ other models. Just change the model string.
- **No extra packages**  â without Puter, each AI provider needs its own SDK package and API key. With Puter, everything goes through a single `@ai-sdk/openai` setup.

## Conclusion

You now have the Alibaba provider set up through the Vercel AI SDK via Puter â no API key needed. Swap the model string to use any [Qwen model](/ai/qwen/), from the lightweight Qwen 2.5 to the powerful Qwen 3.5, or any of the hundreds of other [AI models](/ai/models/) available through Puter.

## Related

- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
- [Free, Unlimited Qwen API](/tutorials/free-unlimited-qwen-api/)
- [Qwen Models on Puter](/ai/qwen/)
- [Access DeepSeek Using Vercel AI SDK](/tutorials/access-deepseek-using-vercel-ai-sdk/)
- [Access Kimi Using Vercel AI SDK](/tutorials/access-kimi-using-vercel-ai-sdk/)
- [Supported AI Models](/ai/models/)
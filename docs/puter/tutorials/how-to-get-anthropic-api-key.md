# How to Get an Anthropic (Claude) API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-anthropic-api-key/

[Tutorials](/tutorials/)

# How to Get an Anthropic (Claude) API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Create Your Anthropic Account](#step-1-create-your-anthropic-account)[Step 2: Generate Your API Key](#step-2-generate-your-api-key)[Step 3: Make Your First API Call](#step-3-make-your-first-api-call)[One API Key, Hundreds of Models](#one-api-key-hundreds-of-models)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your Anthropic API key. You'll create an Anthropic account, generate your key, and make your first API call. We'll also show you a simpler alternative if you want access to hundreds of AI models without managing multiple accounts.

## Prerequisites

- An email address (or a Google account for single sign-on)
- A payment method â Anthropic's API is usage-based
- Basic familiarity with code (we'll show simple JavaScript examples)

## Step 1: Create Your Anthropic Account

Go to [platform.anthropic.com](https://platform.anthropic.com). This is the API platform where you manage your keys, billing, and usage.

Click  **Sign up**  and create your account using your email or Google SSO. Once you're in, you'll land on the dashboard.

![Anthropic console sign-up page](/assets/img/anthropic/signup.webp)
![Anthropic API console dashboard](/assets/img/anthropic/dashboard.webp)

Before your API key will work, you need to add a payment method. Go to  **Settings â Billing**  and add a credit card. [Anthropic charges per token, and pricing varies by model](/tutorials/claude-api-pricing/). Set a monthly spending limit here to avoid surprises â you can always increase it later.

## Step 2: Generate Your API Key

In the left sidebar, click  **API Keys** , then click  **Create Key** .

![Anthropic API keys page in the sidebar](/assets/img/anthropic/api-key-page.webp)

Give your key a descriptive  **name**  like `my-app-dev` so you can identify it later, then click  **Create Key** .

![Anthropic create new API key dialog](/assets/img/anthropic/create-key.webp)

**Important:**  Copy the key immediately. Anthropic only shows it once. If you lose it, you'll need to generate a new one.

Store it somewhere safe â a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

![Anthropic API key revealed with copy button](/assets/img/anthropic/copy-key.webp)

## Step 3: Make Your First API Call

Now you're ready to use the key. Here's a quick example using the Anthropic JavaScript SDK:

```javascript
npm install @anthropic-ai/sdk
```

```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const response = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, world!" }],
});

console.log(response);
```

If you get a response back, everything is working.

## One API Key, Hundreds of Models

The process above works well for Anthropic specifically â but what happens when you want to use GPT, Gemini, Llama, Mistral, or any of the other major models?

You'd need to repeat the entire process for each provider: create an account, set up billing, generate and manage a separate key. That's a lot of overhead, especially if you're experimenting or building something that uses multiple models.

**[Puter](https://puter.com) offers a simpler approach:**  one account, one auth token, access to [hundreds of models](/ai/models/) across providers.

Instead of managing five different API dashboards, you point your existing code to Puter's OpenAI-compatible endpoint and use your Puter auth token:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

const response = await client.chat.completions.create({
  model: "claude-sonnet-4-6", // or gpt-5-nano, gemini-2.5-flash-lite, llama, etc.
  messages: [{ role: "user", content: "Hello, world!" }],
});

console.log(response.choices[0].message.content);
```

The request is conceptually similar â you still specify a `model` and `messages` â but this example uses the OpenAI-compatible SDK shape (`client.chat.completions.create`) rather than the Anthropic SDK. When using the OpenAI SDK with Puter, you mainly change the `baseURL`, your API key, and the `model` string to switch between models.

To get your Puter auth token, create a free account at [puter.com](https://puter.com), then go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to grab your token.

![Puter copy auth token](/assets/img/copy-auth-token.webp)

## Conclusion

You now know how to create an Anthropic account, generate an API key, and make your first API call. For a deeper dive, check out [Anthropic's official API docs](https://docs.anthropic.com).

## Related

- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [How to Get a Gemini API Key](/tutorials/how-to-get-gemini-api-key/)
- [How to Get a Grok (xAI) API Key](/tutorials/how-to-get-grok-api-key/)
- [How to Get a DeepSeek API Key](/tutorials/how-to-get-deepseek-api-key/)
- [How to Get an ElevenLabs API Key](/tutorials/how-to-get-elevenlabs-api-key/)
- [How to Get a Mistral API Key](/tutorials/how-to-get-mistral-api-key/)
- [How to Get a MiniMax API Key](/tutorials/how-to-get-minimax-api-key/)
- [How to Get a Moonshot AI (Kimi) API Key](/tutorials/how-to-get-moonshot-ai-api-key/)
- [How to Get a Qwen API Key](/tutorials/how-to-get-qwen-api-key/)
- [How to Get a Z.AI (GLM) API Key](/tutorials/how-to-get-zai-glm-api-key/)
- [How to Get an OpenRouter API Key](/tutorials/how-to-get-openrouter-api-key/)
- [How to Get a FLUX (Black Forest Labs) API Key](/tutorials/how-to-get-flux-api-key/)
- [How to Get a Stability AI (Stable Diffusion) API Key](/tutorials/how-to-get-stability-ai-api-key/)
- [How to Get a Kling API Key](/tutorials/how-to-get-kling-api-key/)
- [How to Get a Leonardo.Ai API Key](/tutorials/how-to-get-leonardo-ai-api-key/)
- [How to Get a Together AI API Key](/tutorials/how-to-get-together-ai-api-key/)
- [How to Get a Cohere API Key](/tutorials/how-to-get-cohere-api-key/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
- [How to do OAuth with Claude](/tutorials/claude-oauth/)
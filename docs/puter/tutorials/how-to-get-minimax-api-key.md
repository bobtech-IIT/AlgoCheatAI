# How to Get a MiniMax API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-minimax-api-key/

[Tutorials](/tutorials/)

# How to Get a MiniMax API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Create Your MiniMax Account](#step-1-create-your-minimax-account)[Step 2: Generate Your API Key](#step-2-generate-your-api-key)[Step 3: Make Your First API Call](#step-3-make-your-first-api-call)[One API Key, Hundreds of Models](#one-api-key-hundreds-of-models)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your MiniMax API key. You'll create a MiniMax account, generate your key, and make your first API call. We'll also show you a simpler alternative if you want access to hundreds of AI models without managing multiple accounts.

## Prerequisites

- An email address
- A payment method â MiniMax's API is usage-based
- Basic familiarity with code (we'll show simple JavaScript examples)

## Step 1: Create Your MiniMax Account

Go to [platform.minimax.io](https://platform.minimax.io/login). This is the API platform where you manage your keys and usage.

Sign up with your email. Once you're in, you'll land on the dashboard.

![MiniMax platform sign-up page](/assets/img/minimax/signup.webp)
![MiniMax API platform dashboard](/assets/img/minimax/dashboard.webp)

## Step 2: Generate Your API Key

In the left sidebar, click  **API Keys** , then click  **Create new secret key** .

![MiniMax API keys page](/assets/img/minimax/api-key-page.webp)

Give your key a descriptive  **name**  like `my-app-dev` so you can identify it later, then confirm.

![MiniMax create new secret key dialog](/assets/img/minimax/create-key.webp)

**Important:**  Copy the key immediately. MiniMax only shows it once. If you lose it, you'll need to generate a new one.

Store it somewhere safe â a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

![MiniMax API key revealed with copy button](/assets/img/minimax/copy-key.webp)

## Step 3: Make Your First API Call

MiniMax uses an OpenAI-compatible API, so you can use the OpenAI SDK directly. Install it first:

```javascript
npm install openai
```

Then make your first call:

```javascript
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.minimax.io/v1",
  apiKey: process.env.MINIMAX_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "minimax-m2.5",
  messages: [{ role: "user", content: "Hello, world!" }],
});

console.log(completion.choices[0].message.content);
```

If you get a response back, everything is working.

## One API Key, Hundreds of Models

The process above works well for MiniMax specifically â but what happens when you want to use GPT, Claude, Gemini, Llama, Mistral, or any of the other major models?

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
  model: "minimax-m2.5", // or claude-sonnet-4-6, gpt-5-nano, gemini-2.5-flash-lite, etc.
  messages: [{ role: "user", content: "Hello, world!" }],
});

console.log(response.choices[0].message.content);
```

Since MiniMax already uses the OpenAI-compatible format, switching to Puter is especially easy â just change the `baseURL` and `apiKey`.

To get your Puter auth token, create a free account at [puter.com](https://puter.com), then go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to grab your token.

![Puter copy auth token](/assets/img/copy-auth-token.webp)

## Conclusion

You now know how to create a MiniMax account, generate an API key, and make your first API call. For more details, check out [MiniMax's official documentation](https://platform.minimax.io). If you'd rather skip managing multiple API keys, [Puter](https://puter.com) gives you access to MiniMax and [hundreds of other models](/ai/models/) with a single auth token.

## Related

- [Free, Unlimited MiniMax API](/tutorials/free-unlimited-minimax-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [How to Get an Anthropic (Claude) API Key](/tutorials/how-to-get-anthropic-api-key/)
- [How to Get a Gemini API Key](/tutorials/how-to-get-gemini-api-key/)
- [How to Get a Grok (xAI) API Key](/tutorials/how-to-get-grok-api-key/)
- [How to Get a DeepSeek API Key](/tutorials/how-to-get-deepseek-api-key/)
- [How to Get an ElevenLabs API Key](/tutorials/how-to-get-elevenlabs-api-key/)
- [How to Get a Mistral API Key](/tutorials/how-to-get-mistral-api-key/)
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
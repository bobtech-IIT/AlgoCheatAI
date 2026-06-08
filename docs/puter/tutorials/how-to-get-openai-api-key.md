# How to Get an OpenAI API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-openai-api-key/

[Tutorials](/tutorials/)

# How to Get an OpenAI API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Create Your OpenAI Account](#step-1-create-your-openai-account)[Step 2: Generate Your API Key](#step-2-generate-your-api-key)[Step 3: Make Your First API Call](#step-3-make-your-first-api-call)[One API Key, Hundreds of Models](#one-api-key-hundreds-of-models)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll create an OpenAI account, generate your API key, and make your first API call. We'll also show you a simpler alternative if you want access to hundreds of AI models without managing multiple accounts.

## Prerequisites

- An email address (or a Google, Microsoft, or Apple account for single sign-on)
- A payment method â OpenAI's API is usage-based
- Basic familiarity with code (we'll show simple JavaScript examples)

## Step 1: Create Your OpenAI Account

Go to [platform.openai.com](https://platform.openai.com). This is the API platform, which is separate from chatgpt.com where you use ChatGPT.

Click  **Sign up**  and create your account using your email or SSO provider. Once you're in, you'll land on the API platform dashboard.

![OpenAI platform sign-up page](/assets/img/openai/signup.webp)

If you already have a ChatGPT account, you can use the same credentials to log in. However, you'll still need to set up billing separately for API access.

![OpenAI API platform dashboard](/assets/img/openai/dashboard.webp)

Before your API key will work, you need to add a payment method. Go to  **Settings â Billing**  and add a credit card. OpenAI charges per token, and pricing varies by model. Set a monthly spending limit here to avoid surprises â you can always increase it later.

## Step 2: Generate Your API Key

In the left sidebar, click  **API keys** , then click  **Create new secret key** .

![OpenAI API keys page in the sidebar](/assets/img/openai/api-keys-page.webp)

You'll see a few options:

- **Name**  â give it something descriptive like `my-app-dev` so you can identify it later
- **Project**  â assign it to a specific project if you have multiple (optional for most people starting out)
- **Permissions**  â choose the scope: full access, read-only, etc.

Click  **Create secret key** .

![OpenAI create new secret key dialog](/assets/img/openai/create-secret-key.webp)

**Important:**  Copy the key immediately. OpenAI only shows it once. If you lose it, you'll need to generate a new one.

Store it somewhere safe â a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

![OpenAI secret key revealed with copy button](/assets/img/openai/copy-key.webp)

## Step 3: Make Your First API Call

Now you're ready to use the key. Here's a quick example using the OpenAI JavaScript SDK:

```javascript
npm install openai
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.chat.completions.create({
  model: "gpt-5-nano",
  messages: [{ role: "user", content: "Hello, world!" }],
});

console.log(response.choices[0].message.content);
```

If you get a response back, everything is working.

## One API Key, Hundreds of Models

The process above works well for OpenAI specifically â but what happens when you want to use Claude, Gemini, Llama, Mistral, or any of the other major models?

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
  model: "gpt-5-nano", // or claude-sonnet-4-5, gemini-2.5-flash-lite, llama, etc.
  messages: [{ role: "user", content: "Hello, world!" }],
});

console.log(response.choices[0].message.content);
```

The code is almost identical â you're just pointing to a different URL and swapping the key. Switch between models by changing a single string.

To get your Puter auth token, create a free account at [puter.com](https://puter.com), then go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to grab your token.

![Puter copy auth token](/assets/img/copy-auth-token.webp)

## Conclusion

You now know how to create an OpenAI account, generate an API key, and make your first API call. For a deeper dive, check out [OpenAI's official API docs](https://platform.openai.com/docs).

## Related

- [How to do OAuth with OpenAI](/tutorials/openai-oauth/)
- [How to Get an Anthropic API Key](/tutorials/how-to-get-anthropic-api-key/)
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
- [How to Get a Llama API Key](/tutorials/how-to-get-llama-api-key/)
- [How to Get a Cohere API Key](/tutorials/how-to-get-cohere-api-key/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
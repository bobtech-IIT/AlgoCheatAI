# How to Get a Mistral API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-mistral-api-key/

[Tutorials](/tutorials/)

# How to Get a Mistral API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Create Your Mistral Account](#step-1-create-your-mistral-account)[Step 2: Activate Billing](#step-2-activate-billing)[Step 3: Generate Your API Key](#step-3-generate-your-api-key)[Step 4: Make Your First API Call](#step-4-make-your-first-api-call)[One API Key, Hundreds of Models](#one-api-key-hundreds-of-models)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your Mistral API key. You'll create a Mistral account, set up billing, generate your key, and make your first API call. We'll also show you a simpler alternative if you want access to hundreds of AI models without managing multiple accounts.

## Prerequisites

- An email address or a Google/GitHub/Microsoft/Apple account
- A payment method â Mistral's API requires an active billing plan
- Basic familiarity with code (we'll show simple JavaScript examples)

## Step 1: Create Your Mistral Account

Go to [console.mistral.ai](https://console.mistral.ai). Sign up with your email or use one of the available sign-in options (Google, GitHub, Microsoft, or Apple).

After signing up, you'll be asked to complete your setup by providing an  **organization name** .

![Mistral console sign-up page](/assets/img/mistral/signup.webp)

Once you're in, you'll land on the dashboard.

![Mistral console dashboard](/assets/img/mistral/dashboard.webp)

## Step 2: Activate Billing

Before you can create an API key, you need to activate billing. Mistral offers two plans:

- **Experiment**  â for testing and prototyping
- **Scale**  â for production workloads

Choose the plan that fits your needs and add a payment method to activate your account.

## Step 3: Generate Your API Key

In the left sidebar, click  **API keys** , then click  **Create new key** .

![Mistral API keys page in the sidebar](/assets/img/mistral/api-key-page.webp)

Give your key a  **name**  and set an  **expiration date** , then confirm.

![Mistral create new API key dialog](/assets/img/mistral/create-key.webp)

**Important:**  Copy the key immediately. Mistral only shows it once. If you lose it, you'll need to generate a new one.

Store it somewhere safe â a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

![Mistral API key revealed with copy button](/assets/img/mistral/copy-key.webp)

## Step 4: Make Your First API Call

Mistral provides an official client library. Install it first:

```javascript
npm install @mistralai/mistralai
```

Then make your first call:

```javascript
import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

const response = await client.chat.complete({
  model: "mistral-small-2603",
  messages: [{ role: "user", content: "Hello, world!" }],
});

console.log(response.choices[0].message.content);
```

If you get a response back, everything is working. For more details, check out [Mistral's API documentation](https://docs.mistral.ai/).

## One API Key, Hundreds of Models

The process above works well for Mistral specifically â but what happens when you want to use GPT, Claude, Gemini, DeepSeek, Llama, or any of the other major models?

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
  model: "mistral-small-2603", // or claude-sonnet-4-6, gpt-5-nano, gemini-2.5-flash-lite, etc.
  messages: [{ role: "user", content: "Hello, world!" }],
});

console.log(response.choices[0].message.content);
```

To get your Puter auth token, create a free account at [puter.com](https://puter.com), then go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to grab your token.

![Puter copy auth token](/assets/img/copy-auth-token.webp)

## Conclusion

You now know how to create a Mistral account, set up billing, generate an API key, and make your first API call. For a deeper dive, check out [Mistral's official API docs](https://docs.mistral.ai/).

## Related

- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [How to Get an Anthropic (Claude) API Key](/tutorials/how-to-get-anthropic-api-key/)
- [How to Get a Gemini API Key](/tutorials/how-to-get-gemini-api-key/)
- [How to Get a DeepSeek API Key](/tutorials/how-to-get-deepseek-api-key/)
- [How to Get an ElevenLabs API Key](/tutorials/how-to-get-elevenlabs-api-key/)
- [How to Get a Grok (xAI) API Key](/tutorials/how-to-get-grok-api-key/)
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
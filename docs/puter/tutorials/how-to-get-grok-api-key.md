# How to Get a Grok (xAI) API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-grok-api-key/

[Tutorials](/tutorials/)

# How to Get a Grok (xAI) API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Go to the xAI Console](#step-1-go-to-the-xai-console)[Step 2: Create Your xAI Account](#step-2-create-your-xai-account)[Step 3: Generate Your API Key](#step-3-generate-your-api-key)[Step 4: Make Your First API Call](#step-4-make-your-first-api-call)[One API Key, Hundreds of Models](#one-api-key-hundreds-of-models)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your xAI API key for Grok. You'll create an xAI account, generate your key, and make your first API call. We'll also show you a simpler alternative if you want access to hundreds of AI models without managing multiple accounts.

## Prerequisites

- An email address (or a Google account for single sign-on)
- A payment method â xAI's API is usage-based
- Basic familiarity with code (we'll show simple JavaScript examples)

## Step 1: Go to the xAI Console

Open [console.x.ai](https://console.x.ai). This is the API console where you manage your keys, billing, and usage.

![xAI console landing page](/assets/img/xai/console.webp)

## Step 2: Create Your xAI Account

Click  **Sign in**  or  **Sign up**  and create your account using your email or Google SSO.

![xAI console sign-in page](/assets/img/xai/signup.webp)

Once you're in, you'll land on the dashboard.

![xAI API console dashboard](/assets/img/xai/dashboard.webp)

Before your API key will work, you need to add a payment method. Go to  **Billing**  in the left sidebar and add a credit card. xAI charges per token, and pricing varies by model. Set a monthly spending limit here to avoid surprises â you can always increase it later.

## Step 3: Generate Your API Key

In the left sidebar, click  **API Keys** , then click  **Create API Key** .

![xAI API keys page in the sidebar](/assets/img/xai/api-keys-page.webp)

You'll see a few options:

- **Name**  â give it something descriptive like `my-app-dev` so you can identify it later
- **Restrict access**  â choose which endpoints this key can access
- **Rate limits**  â set rate limits for the key

Click  **Create API Key** .

![xAI create new API key dialog](/assets/img/xai/create-api-key.webp)

**Important:**  Copy the key immediately. xAI only shows it once. If you lose it, you'll need to generate a new one.

Store it somewhere safe â a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

![xAI API key revealed with copy button](/assets/img/xai/copy-key.webp)

## Step 4: Make Your First API Call

Now you're ready to use the key. Here's a quick example using the xAI JavaScript SDK:

```bash
npm install ai @ai-sdk/xai
```

```javascript
import { createXai } from "@ai-sdk/xai";
import { generateText } from "ai";

const xai = createXai({ apiKey: process.env.XAI_API_KEY });

const { text } = await generateText({
  model: xai("grok-4"),
  prompt: "Hello, world!",
});

console.log(text);
```

If you get a response back, everything is working.

## One API Key, Hundreds of Models

The process above works well for xAI specifically â but what happens when you want to use Claude, GPT, Gemini, Llama, Mistral, or any of the other major models?

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
  model: "grok-4", // or gpt-5-nano, claude-sonnet-4-6, gemini-2.5-flash-lite, etc.
  messages: [{ role: "user", content: "Hello, world!" }],
});

console.log(response.choices[0].message.content);
```

The code is almost identical â you're just pointing to a different URL and swapping the key. Switch between models by changing a single string.

To get your Puter auth token, create a free account at [puter.com](https://puter.com), then go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to grab your token.

![Puter copy auth token](/assets/img/copy-auth-token.webp)

## Conclusion

You now know how to create an xAI account, generate a Grok API key, and make your first API call. For a deeper dive, check out [xAI's official API docs](https://docs.x.ai).

## Related

- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [How to Get an Anthropic API Key](/tutorials/how-to-get-anthropic-api-key/)
- [How to Get a Gemini API Key](/tutorials/how-to-get-gemini-api-key/)
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
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
# How to Get a Gemini API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-gemini-api-key/

[Tutorials](/tutorials/)

# How to Get a Gemini API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Go to Google AI Studio](#step-1-go-to-google-ai-studio)[Step 2: Generate Your API Key](#step-2-generate-your-api-key)[Step 3: Make Your First API Call](#step-3-make-your-first-api-call)[One API Key, Hundreds of Models](#one-api-key-hundreds-of-models)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your Gemini API key. You'll set up Google AI Studio, generate your key, and make your first API call. We'll also show you a simpler alternative if you want access to hundreds of AI models without managing multiple accounts.

## Prerequisites

- A Google account
- Basic familiarity with code (we'll show simple JavaScript examples)

## Step 1: Go to Google AI Studio

Open [aistudio.google.com](https://aistudio.google.com). This is Google's developer platform for building with Gemini models. Sign in with your Google account.

Once you're in, you'll land on the dashboard.

![Google AI Studio dashboard](/assets/img/gemini/dashboard.webp)

## Step 2: Generate Your API Key

In the left sidebar, click  **Get API key** . Then click  **Create API key** .

![Google AI Studio Get API key page](/assets/img/gemini/get-api-key.webp)

Give your key a descriptive  **name**  like `my-app-dev` so you can identify it later.

![Google AI Studio create API key dialog](/assets/img/gemini/create-api-key.webp)

Copy the key once it's generated. Unlike some providers, Google AI Studio lets you view your key again later â but it's still best practice to store it securely right away.

Store it somewhere safe â a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

![Google AI Studio API key with copy button](/assets/img/gemini/copy-key.webp)

## Step 3: Make Your First API Call

Now you're ready to use the key. Here's a quick example using the Google GenAI JavaScript SDK:

```bash
npm install @google/genai
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();
```

If you get a response back, everything is working.

## One API Key, Hundreds of Models

The process above works well for Gemini specifically â but what happens when you want to use Claude, GPT, Grok, Llama, Mistral, or any of the other major models?

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
  model: "gemini-2.5-flash", // or claude-sonnet-4-6, gpt-5-nano, grok-4, etc.
  messages: [{ role: "user", content: "Hello, world!" }],
});

console.log(response.choices[0].message.content);
```

The code is almost identical â you're just pointing to a different URL and swapping the key. Switch between models by changing a single string.

To get your Puter auth token, create a free account at [puter.com](https://puter.com), then go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to grab your token.

![Puter copy auth token](/assets/img/copy-auth-token.webp)

## Conclusion

You now know how to get a Gemini API key from Google AI Studio and make your first API call. For a deeper dive, check out [Google's official Gemini API docs](https://ai.google.dev/gemini-api/docs).

## Related

- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Gemini API Pricing](/tutorials/gemini-api-pricing/)
- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [How to Get an Anthropic API Key](/tutorials/how-to-get-anthropic-api-key/)
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
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
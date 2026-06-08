# How to Get a Cohere API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-cohere-api-key/

[Tutorials](/tutorials/)

# How to Get a Cohere API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Go to the Cohere Dashboard](#step-1-go-to-the-cohere-dashboard)[Step 2: Sign In to Your Account](#step-2-sign-in-to-your-account)[Step 3: Get Your API Key](#step-3-get-your-api-key)[Step 4: Make Your First API Call](#step-4-make-your-first-api-call)[One API Key, Hundreds of Models](#one-api-key-hundreds-of-models)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your Cohere API key. You'll create a Cohere account, grab your key, and make your first API call. We'll also show you a simpler alternative if you want access to hundreds of AI models without managing multiple accounts.

## Prerequisites

- An email address (or a Google/GitHub account for single sign-on)
- Basic familiarity with code (we'll show simple JavaScript examples)

## Step 1: Go to the Cohere Dashboard

Open [dashboard.cohere.com](https://dashboard.cohere.com). This is where you manage your API keys, usage, and settings.

![Cohere dashboard landing page](/assets/img/cohere/dashboard-landing.webp)

## Step 2: Sign In to Your Account

Sign in using your Google account, GitHub account, or email. If you don't have an account yet, you'll be prompted to create one.

Once logged in, you'll land on the Cohere dashboard.

![Cohere dashboard after login](/assets/img/cohere/dashboard.webp)

## Step 3: Get Your API Key

Find the  **API Keys**  menu in the left sidebar and click on it.

You'll see that a  **trial key**  has already been generated for you. Click the copy button to grab it.

![Cohere API keys page showing trial key](/assets/img/cohere/api-keys.webp)

**Keep in mind:**  the trial key is rate-limited and not intended for commercial use. If that doesn't suit your use case, you can request a production key from the same page.

Store your key somewhere safe â a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

## Step 4: Make Your First API Call

Now you're ready to use the key. Here's a quick example using the Cohere JavaScript SDK:

```javascript
npm install cohere-ai
```

```javascript
const { CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({
  token: '<<apiKey>>',
});

(async () => {
  const response = await cohere.chat({
    model: 'command-a-03-2025',
    messages: [
      {
        role: 'user',
        content: 'hello world!',
      },
    ],
  });

  console.log(response);
})();
```

If you get a response back, everything is working.

## One API Key, Hundreds of Models

The process above works well for Cohere specifically â but what happens when you want to use Claude, GPT, Gemini, Grok, Llama, Mistral, or any of the other major models?

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
  model: "cohere/command-a", // or gpt-5-nano, claude-sonnet-4-6, gemini-2.5-flash-lite, etc.
  messages: [{ role: "user", content: "Hello, world!" }],
});

console.log(response.choices[0].message.content);
```

The code is almost identical â you're just pointing to a different URL and swapping the key. Switch between models by changing a single string.

To get your Puter auth token, create a free account at [puter.com](https://puter.com), then go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to grab your token.

![Puter copy auth token](/assets/img/copy-auth-token.webp)

## Conclusion

You now know how to create a Cohere account, get your API key, and make your first API call. For a deeper dive, check out [Cohere's official API docs](https://docs.cohere.com).

## Related

- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [How to Get an Anthropic API Key](/tutorials/how-to-get-anthropic-api-key/)
- [How to Get a Grok (xAI) API Key](/tutorials/how-to-get-grok-api-key/)
- [How to Get a Gemini API Key](/tutorials/how-to-get-gemini-api-key/)
- [How to Get a DeepSeek API Key](/tutorials/how-to-get-deepseek-api-key/)
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
- [How to Get an ElevenLabs API Key](/tutorials/how-to-get-elevenlabs-api-key/)
- [Free, Unlimited Cohere API](/tutorials/free-unlimited-cohere-api/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
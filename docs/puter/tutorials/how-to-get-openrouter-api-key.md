# How to Get an OpenRouter API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-openrouter-api-key/

[Tutorials](/tutorials/)

# How to Get an OpenRouter API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Create Your OpenRouter Account](#step-1-create-your-openrouter-account)[Step 2: Generate Your API Key](#step-2-generate-your-api-key)[Step 3: Make Your First API Call](#step-3-make-your-first-api-call)[A Simpler Alternative with Puter.js](#a-simpler-alternative-with-puterjs)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your OpenRouter API key. You'll create an OpenRouter account, generate your key, and make your first API call. We'll also show you a simpler alternative if you want access to hundreds of AI models without managing API keys or billing.

## Prerequisites

- An email, GitHub, or Google account for signing up
- Basic familiarity with code (we'll show simple examples)

## Step 1: Create Your OpenRouter Account

Go to [openrouter.ai](https://openrouter.ai). You'll see the homepage. Click  **Sign up**  and create your account using your email, GitHub, or Google account.

Once you've signed up, you'll see the  **Get API Key**  button on the home screen.

![OpenRouter home screen with Get API Key button](/assets/img/openrouter/home.webp)

Click that to go to the API key management page.

## Step 2: Generate Your API Key

You'll land on the API key page. Click  **Create** .

![OpenRouter API keys page with Create button](/assets/img/openrouter/api-keys-page.webp)

In the creation popup, you can configure:

- **Name**  â give it something descriptive like `my-app-dev`
- **Credit limit**  â set a spending cap for this key
- **Reset limit**  â configure when the limit resets
- **Expiration**  â set when the key expires

![OpenRouter API key creation popup with name, credit limit, reset limit, and expiration fields](/assets/img/openrouter/create-key.webp)

**Important:**  Copy the key immediately after creation. OpenRouter only shows it once. If you lose it, you'll need to generate a new one.

![OpenRouter API key revealed with copy button](/assets/img/openrouter/copy-key.webp)

Store it somewhere safe â a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

## Step 3: Make Your First API Call

**Note:**  The OpenRouter SDK is currently in beta and may have breaking changes between versions. This tutorial uses version `0.9.11`. We recommend pinning your dependency to this version until the SDK reaches a stable release.

Install the OpenRouter SDK:

```bash
npm install @openrouter/sdk@0.9.11
```

Then make a chat completion request:

```javascript
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const response = await client.chat.send({
  chatGenerationParams: {
    model: "openai/gpt-5.4",
    messages: [{ role: "user", content: "Hello, world!" }],
  },
});

console.log(response.choices[0].message.content);
```

If you get a response back, everything is working. You can swap `openai/gpt-5.4` for any model on OpenRouter's [supported models page](https://openrouter.ai/models).

## A Simpler Alternative with Puter.js

OpenRouter gives you one API key for hundreds of models â but you still need to manage billing, credit limits, and API keys yourself.

**[Puter.js](https://docs.puter.com) offers a simpler approach**  with the [User-Pays model](https://docs.puter.com/user-pays-model/): your app's users cover their own AI costs. You don't need an API key at all, and you pay nothing for AI usage no matter how many users you have.

Just add the Puter.js script tag and start chatting with any model:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Hello, world!", { model: "gpt-5.4" })
            .then(response => {
                document.body.innerHTML = response;
            });
    </script>
</body>
</html>
```

No API key, no backend, no billing setup. The same [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function gives you access to GPT, Claude, Gemini, Grok, Llama, and [hundreds more models](/ai/models/) through a single interface.

## Conclusion

You now know how to create an OpenRouter account, generate an API key, and make your first API call. For more details, check out [OpenRouter's documentation](https://openrouter.ai/docs). If you'd rather skip managing API keys and billing entirely, [Puter.js](https://docs.puter.com) gives you access to [hundreds of AI models](/ai/models/) through a single JavaScript library with no API keys required.

## Related

- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [How to Use OpenRouter SDK with Puter](/tutorials/use-openrouter-sdk-with-puter/)
- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [How to Get an Anthropic (Claude) API Key](/tutorials/how-to-get-anthropic-api-key/)
- [How to Get a Gemini API Key](/tutorials/how-to-get-gemini-api-key/)
- [How to Get a Grok (xAI) API Key](/tutorials/how-to-get-grok-api-key/)
- [How to Get a DeepSeek API Key](/tutorials/how-to-get-deepseek-api-key/)
- [How to Get an ElevenLabs API Key](/tutorials/how-to-get-elevenlabs-api-key/)
- [How to Get a Mistral API Key](/tutorials/how-to-get-mistral-api-key/)
- [How to Get a MiniMax API Key](/tutorials/how-to-get-minimax-api-key/)
- [How to Get a Moonshot AI (Kimi) API Key](/tutorials/how-to-get-moonshot-ai-api-key/)
- [How to Get a Qwen API Key](/tutorials/how-to-get-qwen-api-key/)
- [How to Get a Z.AI (GLM) API Key](/tutorials/how-to-get-zai-glm-api-key/)
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
# How to Get a Together AI API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-together-ai-api-key/

[Tutorials](/tutorials/)

# How to Get a Together AI API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Create Your Together AI Account](#step-1-create-your-together-ai-account)[Step 2: Generate Your API Key](#step-2-generate-your-api-key)[Step 3: Make Your First API Call](#step-3-make-your-first-api-call)[A Simpler Alternative with Puter.js](#a-simpler-alternative-with-puterjs)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your Together AI API key. You'll create a Together AI account, set up billing, generate your key, and make your first API call. We'll also show you a simpler alternative if you want access to hundreds of AI models without managing API keys or billing.

## Prerequisites

- An email, GitHub, or Google account for signing up
- A payment method â Together AI's API is usage-based
- Basic familiarity with code (we'll show simple JavaScript examples)

## Step 1: Create Your Together AI Account

Go to [api.together.ai](https://api.together.ai). Click  **Sign up**  and create your account using your Google account, GitHub, or email.

![Together AI sign-up page](/assets/img/together-ai/signup.webp)

Once you've signed up, you'll land on the dashboard. Find your account settings by clicking your profile icon in the top right corner.

![Together AI dashboard with profile menu in top right corner](/assets/img/together-ai/profile-menu.webp)

Before your API key will work for production use, you'll need to set up billing. Go to your account settings and add a payment method or purchase credits. Together AI charges per token, and pricing varies by model.

## Step 2: Generate Your API Key

In the settings page, find the  **API Keys**  menu in the sidebar.

![Together AI settings page with API Keys menu in sidebar](/assets/img/together-ai/settings-api-keys.webp)

Click  **+ Create key**  to generate a new API key.

![Together AI API keys page with Create key button](/assets/img/together-ai/create-key.webp)

Give your key a descriptive  **name**  like `my-app-dev` so you can identify it later.

![Together AI API key name input dialog](/assets/img/together-ai/name-key.webp)

**Important:**  Copy the key immediately after creation. Together AI only shows it once. If you lose it, you'll need to generate a new one.

Store it somewhere safe â a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

![Together AI API key revealed with copy button](/assets/img/together-ai/copy-key.webp)

## Step 3: Make Your First API Call

Set your API key as an environment variable:

```bash
export TOGETHER_API_KEY=xxxxx
```

Install the Together AI SDK:

```bash
npm install together-ai
```

Then make a chat completion request:

```javascript
import Together from "together-ai"

async function main() {
  const together = new Together()
  const stream = await together.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      { role: "user", content: "What are the top 3 things to do in New York?" },
    ],
    stream: true,
  })

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "")
  }
}

main()
```

If you get a response back, everything is working. You can swap `openai/gpt-oss-20b` for any model on Together AI's [supported models page](https://docs.together.ai/docs/serverless-models).

## A Simpler Alternative with Puter.js

Together AI gives you one API key for hundreds of open-source models â but you still need to manage billing, credits, and API keys yourself.

**[Puter.js](https://docs.puter.com) offers a simpler approach**  with the [User-Pays model](https://docs.puter.com/user-pays-model/): your app's users cover their own AI costs. You don't need an API key at all, and you pay nothing for AI usage no matter how many users you have.

Just add the Puter.js script tag and start chatting with any model:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Hello, world!", { model: "openai/gpt-oss-20b" })
            .then(response => {
                document.body.innerHTML = response;
            });
    </script>
</body>
</html>
```

No API key, no backend, no billing setup. The same [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function gives you access to GPT, Claude, Gemini, Grok, Llama, and [hundreds more models](/ai/models/) through a single interface.

## Conclusion

You now know how to create a Together AI account, generate an API key, and make your first API call. For more details, check out [Together AI's documentation](https://docs.together.ai). If you'd rather skip managing API keys and billing entirely, [Puter.js](https://docs.puter.com) gives you access to [hundreds of AI models](/ai/models/) through a single JavaScript library with no API keys required.

## Related

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
- [How to Get an OpenRouter API Key](/tutorials/how-to-get-openrouter-api-key/)
- [How to Get a FLUX (Black Forest Labs) API Key](/tutorials/how-to-get-flux-api-key/)
- [How to Get a Stability AI (Stable Diffusion) API Key](/tutorials/how-to-get-stability-ai-api-key/)
- [How to Get a Kling API Key](/tutorials/how-to-get-kling-api-key/)
- [How to Get a Leonardo.Ai API Key](/tutorials/how-to-get-leonardo-ai-api-key/)
- [How to Get a Cohere API Key](/tutorials/how-to-get-cohere-api-key/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
# How to Get a Kling API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-kling-api-key/

[Tutorials](/tutorials/)

# How to Get a Kling API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Create Your Kling AI Account](#step-1-create-your-kling-ai-account)[Step 2: Generate Your API Key](#step-2-generate-your-api-key)[Step 3: Make Your First API Call](#step-3-make-your-first-api-call)[A Simpler Alternative with Puter.js](#a-simpler-alternative-with-puterjs)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your Kling API key. You'll create a Kling AI account, generate your access key and secret key, and make your first video generation API call. We'll also show you a simpler alternative if you want text-to-video without managing API keys or billing.

## Prerequisites

- A Google, Apple, or email account for signing up
- Basic familiarity with code (we'll show simple JavaScript examples)

## Step 1: Create Your Kling AI Account

Go to [app.klingai.com/global/dev](https://app.klingai.com/global/dev). You'll see a login or sign-up page â create your account using your Google account, Apple account, or email.

![Kling AI sign-up page](/assets/img/kling/signup.webp)

## Step 2: Generate Your API Key

Once signed in, you'll land directly on the API keys page. Click  **Create a new API Key**  to generate a new key.

![Kling AI API keys page](/assets/img/kling/api-keys-page.webp)

Give your key a descriptive name so you can identify it later.

![Kling AI name your API key](/assets/img/kling/name-key.webp)

After creation, you'll see both your  **Access Key**  and  **Secret Key** .  **Important:**  Your secret key is only shown once, so make sure to copy and store it somewhere safe â a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

![Kling AI access key and secret key](/assets/img/kling/copy-keys.webp)

## Step 3: Make Your First API Call

Kling doesn't have an official SDK, but you can use community-built wrappers. The [kling-api](https://www.npmjs.com/package/kling-api) package on npm handles JWT generation, auto-polling, and retry logic automatically.

Install it:

```javascript
npm install kling-api
```

Then make a text-to-video request:

```javascript
import { KlingAPI } from 'kling-api';

const api = new KlingAPI({
  accessKey: 'your-access-key',
  secretKey: 'your-secret-key'
});

const task = await api.textToVideo({
  prompt: 'A cat playing piano in a cozy room',
  model_name: 'kling-v2-master',
  duration: '5'
});

const result = await api.waitForVideoResult(task.data.task_id);
console.log('Video URL:', result.data.task_result.videos[0].url);
```

If you get a video URL back, everything is working. You can explore different models and parameters in the [Kling AI documentation](https://app.klingai.com/global/dev).

## A Simpler Alternative with Puter.js

Kling gives you powerful video generation â but you still need to manage billing, JWT tokens, and API keys yourself.

**[Puter.js](https://docs.puter.com) offers a simpler approach**  with the [User-Pays model](https://docs.puter.com/user-pays-model/): your app's users cover their own AI costs. You don't need an API key at all, and you pay nothing for AI usage no matter how many users you have.

Puter.js gives you access to more text-to-video models beyond just Kling. Just add the Puter.js script tag and start generating videos:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2vid(
            "A sunrise drone shot flying over a calm ocean",
            {model: "bytedance/seedance-1.0-lite"}
        ).then((video) => {
            document.body.appendChild(video);
        }).catch(console.error);
    </script>
</body>
</html>
```

No API key, no backend, no billing setup. Puter.js supports text-to-video models from multiple providers through a single [`puter.ai.txt2vid()`](https://docs.puter.com/AI/txt2vid/) function â giving you more flexibility for your video generation app.

## Conclusion

You now know how to create a Kling AI account, generate your API keys, and make your first video generation API call. For more details, check out [Kling AI's developer console](https://app.klingai.com/global/dev). If you'd rather skip managing API keys and billing entirely, [Puter.js](https://docs.puter.com) gives you access to text-to-video from multiple providers through a single JavaScript library with no API keys required.

## Related

- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [How to Get an Anthropic (Claude) API Key](/tutorials/how-to-get-anthropic-api-key/)
- [How to Get a Gemini API Key](/tutorials/how-to-get-gemini-api-key/)
- [How to Get a Grok (xAI) API Key](/tutorials/how-to-get-grok-api-key/)
- [How to Get a DeepSeek API Key](/tutorials/how-to-get-deepseek-api-key/)
- [How to Get a Leonardo.Ai API Key](/tutorials/how-to-get-leonardo-ai-api-key/)
- [How to Get a Mistral API Key](/tutorials/how-to-get-mistral-api-key/)
- [How to Get a MiniMax API Key](/tutorials/how-to-get-minimax-api-key/)
- [How to Get a Moonshot AI (Kimi) API Key](/tutorials/how-to-get-moonshot-ai-api-key/)
- [How to Get a Qwen API Key](/tutorials/how-to-get-qwen-api-key/)
- [How to Get a Z.AI (GLM) API Key](/tutorials/how-to-get-zai-glm-api-key/)
- [How to Get an OpenRouter API Key](/tutorials/how-to-get-openrouter-api-key/)
- [How to Get a Together AI API Key](/tutorials/how-to-get-together-ai-api-key/)
- [How to Get a FLUX (Black Forest Labs) API Key](/tutorials/how-to-get-flux-api-key/)
- [How to Get a Stability AI (Stable Diffusion) API Key](/tutorials/how-to-get-stability-ai-api-key/)
- [How to Get an ElevenLabs API Key](/tutorials/how-to-get-elevenlabs-api-key/)
- [How to Get a Cohere API Key](/tutorials/how-to-get-cohere-api-key/)
- [Free, Unlimited Bytedance Seedance API](/tutorials/free-unlimited-bytedance-seedance-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
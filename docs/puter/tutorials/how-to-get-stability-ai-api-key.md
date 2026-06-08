# How to Get a Stability AI (Stable Diffusion) API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-stability-ai-api-key/

[Tutorials](/tutorials/)

# How to Get a Stability AI (Stable Diffusion) API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Create Your Stability AI Account](#step-1-create-your-stability-ai-account)[Step 2: Get Your API Key](#step-2-get-your-api-key)[Step 3: Make Your First API Call](#step-3-make-your-first-api-call)[One Library, Hundreds of Models](#one-library-hundreds-of-models)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your Stability AI (Stable Diffusion) API key. You'll create a Stability AI account, grab your key, and make your first image generation API call. We'll also show you a simpler alternative if you want access to Stable Diffusion and hundreds of other AI models without managing multiple accounts.

## Prerequisites

- A Google account or email for signing in
- Basic familiarity with code (we'll show simple examples)

## Step 1: Create Your Stability AI Account

Go to [platform.stability.ai](https://platform.stability.ai). You'll see the platform dashboard.

![Stability AI platform dashboard](/assets/img/stability/dashboard.webp)

Click  **Login**  in the top right corner. Sign in with your Google account or email.

## Step 2: Get Your API Key

Once logged in, click your  **profile**  in the top right corner.

![Stability AI profile menu in the top right corner](/assets/img/stability/profile-menu.webp)

You'll land on the account API key page. Stability AI automatically creates an API key for you when you sign up, so you can copy it right away.

![Stability AI account page with API key ready to copy](/assets/img/stability/copy-key.webp)

Store it somewhere safe, like a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

## Step 3: Make Your First API Call

Stability AI uses a direct REST API. Here's a quick example to generate an image with Stable Diffusion XL:

```javascript
import fetch from 'node-fetch'
import fs from 'node:fs'

const engineId = 'stable-diffusion-xl-1024-v1-0'
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
const apiKey = process.env.STABILITY_API_KEY

if (!apiKey) throw new Error('Missing Stability API key.')

const response = await fetch(
  `${apiHost}/v1/generation/${engineId}/text-to-image`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
```

Show 38 more lines...

```javascript
import fetch from 'node-fetch'
import fs from 'node:fs'

const engineId = 'stable-diffusion-xl-1024-v1-0'
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
const apiKey = process.env.STABILITY_API_KEY

if (!apiKey) throw new Error('Missing Stability API key.')

const response = await fetch(
  `${apiHost}/v1/generation/${engineId}/text-to-image`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: 'A lighthouse on a cliff',
        },
      ],
      cfg_scale: 7,
      height: 1024,
      width: 1024,
      steps: 30,
      samples: 1,
    }),
  }
)

if (!response.ok) {
  throw new Error(`Non-200 response: ${await response.text()}`)
}

interface GenerationResponse {
  artifacts: Array<{
    base64: string
    seed: number
    finishReason: string
  }>
}

const responseJSON = (await response.json()) as GenerationResponse

responseJSON.artifacts.forEach((image, index) => {
  fs.writeFileSync(
    `./out/v1_txt2img_${index}.png`,
    Buffer.from(image.base64, 'base64')
  )
})
```

Collapse code

If the image file is saved successfully, everything is working.

## One Library, Hundreds of Models

The process above works for Stability AI specifically, but it requires managing API keys and dealing with a provider-specific API format. What if you want to also use FLUX, [Nano Banana](/ai/nano-banana/), [GPT Image](/ai/gpt-image/), or other image models? You'd need to learn each provider's API, manage separate keys, and set up billing for each one.

**[Puter.js](https://docs.puter.com) offers a simpler approach:**  one JavaScript library, access to [hundreds of AI models](/ai/models/) across providers, including Stable Diffusion, FLUX, GPT, Claude, Gemini, and many more.

With Puter.js, you don't even need an API key. Puter uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where your app's users cover their own AI costs. This means you pay nothing for AI usage, no matter how many users you have.

Just add the Puter.js script tag and start generating images:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A lighthouse on a cliff",
            { model: "stabilityai/stable-diffusion-xl-base-1.0" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

No API key, no backend, no provider-specific code. The same [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function works with FLUX, Nano Banana, GPT Image, and other image models too. One library, one interface, access to all of them.

## Conclusion

You now know how to create a Stability AI account, get your API key, and make your first image generation call with Stable Diffusion. For more details, check out [Stability AI's platform](https://platform.stability.ai). If you'd rather skip managing API keys and provider-specific APIs, [Puter.js](https://docs.puter.com) gives you access to Stable Diffusion and [hundreds of other AI models](/ai/models/) through a single JavaScript library, with no API keys required.

## Related

- [Free, Unlimited Stable Diffusion API](/tutorials/free-unlimited-stable-diffusion-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited Flux API](/tutorials/free-unlimited-flux-api/)
- [Free, Unlimited GPT Image API](/tutorials/free-unlimited-gpt-image-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
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
- [How to Get a Kling API Key](/tutorials/how-to-get-kling-api-key/)
- [How to Get a Leonardo.Ai API Key](/tutorials/how-to-get-leonardo-ai-api-key/)
- [How to Get a Together AI API Key](/tutorials/how-to-get-together-ai-api-key/)
- [How to Get a Cohere API Key](/tutorials/how-to-get-cohere-api-key/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
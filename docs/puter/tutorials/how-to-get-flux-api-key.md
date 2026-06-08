# How to Get a FLUX (Black Forest Labs) API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-flux-api-key/

[Tutorials](/tutorials/)

# How to Get a FLUX (Black Forest Labs) API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Create Your Black Forest Labs Account](#step-1-create-your-black-forest-labs-account)[Step 2: Generate Your API Key](#step-2-generate-your-api-key)[Step 3: Make Your First API Call](#step-3-make-your-first-api-call)[One Library, Hundreds of Models](#one-library-hundreds-of-models)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your FLUX (Black Forest Labs) API key. You'll create a BFL account, generate your key, and make your first image generation API call. We'll also show you a simpler alternative if you want access to FLUX and hundreds of other AI models without managing multiple accounts.

## Prerequisites

- A Google account or email, BFL supports both sign-in methods
- A payment method, FLUX's API is usage-based
- Basic familiarity with code (we'll show simple examples)

## Step 1: Create Your Black Forest Labs Account

Go to [dashboard.bfl.ai](https://dashboard.bfl.ai). You'll see the sign-up page.

![Black Forest Labs sign-up page](/assets/img/flux/signup.webp)

Sign up with your Google account or email. Once you've completed the setup and signed in, you'll land on the dashboard. Select the  **default project**  under Projects.

![Black Forest Labs dashboard with Projects](/assets/img/flux/dashboard.webp)

## Step 2: Generate Your API Key

Once inside the project, look at the left sidebar. Under the  **API**  group, you'll find the  **Keys**  menu.

![Black Forest Labs sidebar with Keys menu under API group](/assets/img/flux/sidebar-keys.webp)

Click  **Keys**  to go to the API key page. Then click  **Add Key** .

![Black Forest Labs API key page with Add Key button](/assets/img/flux/add-key.webp)

Enter a  **name**  for your API key.

![Black Forest Labs name your API key dialog](/assets/img/flux/name-key.webp)
![Black Forest Labs API key revealed with copy button](/assets/img/flux/copy-key.webp)

**Important:**  Copy the key immediately. BFL only shows it once. If you lose it, you'll need to generate a new one.

Store it somewhere safe, like a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

## Step 3: Make Your First API Call

FLUX uses a direct REST API with an asynchronous polling pattern. For full details, check out [BFL's official documentation](https://docs.bfl.ml/quick_start/generating_images).

Here's a quick example using `curl` to generate an image with FLUX:

```javascript
# Submit the image generation request
curl -X 'POST' \
  'https://api.bfl.ai/v1/flux-2-pro-preview' \
  -H 'accept: application/json' \
  -H "x-key: ${BFL_API_KEY}" \
  -H 'Content-Type: application/json' \
  -d '{
    "prompt": "A cat running like a human holding a silver fish in a market",
    "width": 1024,
    "height": 1024
  }'
```

The response contains an `id` and a `polling_url`. Poll that URL until the status is `"Ready"`, then read the image URL from `result.sample`:

```json
// Example response
{
  "id": "your-request-id",
  "polling_url": "https://api.bfl.ai/v1/get_result?id=your-request-id"
}
```

Use the `polling_url` to check the status of your request:

```javascript
curl -s 'https://api.bfl.ai/v1/get_result?id=your-request-id' \
  -H "x-key: ${BFL_API_KEY}"
```

When the status is `"Ready"`, the response will include the image URL in `result.sample`.

## One Library, Hundreds of Models

The process above works for FLUX specifically, but it requires managing API keys, handling asynchronous polling, and dealing with a provider-specific API format. What if you want to also use [Nano Banana](/ai/nano-banana/), [GPT Image](/ai/gpt-image/), Stable Diffusion, or other image models? You'd need to learn each provider's API, manage separate keys, and set up billing for each one.

**[Puter.js](https://docs.puter.com) offers a simpler approach:**  one JavaScript library, access to [hundreds of AI models](/ai/models/) across providers, including FLUX, GPT, Claude, Gemini, and many more.

With Puter.js, you don't even need an API key. Puter uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where your app's users cover their own AI costs. This means you pay nothing for AI usage, no matter how many users you have.

Just add the Puter.js script tag and start generating images:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A cat running like a human holding a silver fish in a market",
            { model: "black-forest-labs/flux-2-pro" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

That's it. No API key, no polling, no backend. The same [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function works with Nano Banana, GPT Image, Stable Diffusion, and other image models too. One library, one interface, access to all of them.

## Conclusion

You now know how to create a Black Forest Labs account, generate an API key, and make your first image generation call with FLUX. For more details, check out [BFL's official documentation](https://docs.bfl.ml/quick_start/generating_images). If you'd rather skip managing API keys and provider-specific APIs, [Puter.js](https://docs.puter.com) gives you access to FLUX and [hundreds of other AI models](/ai/models/) through a single JavaScript library, with no API keys required.

## Related

- [Free, Unlimited Flux API](/tutorials/free-unlimited-flux-api/)
- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited Stable Diffusion API](/tutorials/free-unlimited-stable-diffusion-api/)
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
- [How to Get a Stability AI (Stable Diffusion) API Key](/tutorials/how-to-get-stability-ai-api-key/)
- [How to Get a Kling API Key](/tutorials/how-to-get-kling-api-key/)
- [How to Get a Leonardo.Ai API Key](/tutorials/how-to-get-leonardo-ai-api-key/)
- [How to Get a Together AI API Key](/tutorials/how-to-get-together-ai-api-key/)
- [How to Get a Cohere API Key](/tutorials/how-to-get-cohere-api-key/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
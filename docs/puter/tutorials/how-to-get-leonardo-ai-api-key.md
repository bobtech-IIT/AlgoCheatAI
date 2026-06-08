# How to Get a Leonardo.Ai API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-leonardo-ai-api-key/

[Tutorials](/tutorials/)

# How to Get a Leonardo.Ai API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Create Your Leonardo.Ai Account](#step-1-create-your-leonardoai-account)[Step 2: Generate Your API Key](#step-2-generate-your-api-key)[Step 3: Make Your First API Call](#step-3-make-your-first-api-call)[One Library, Hundreds of Models](#one-library-hundreds-of-models)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your Leonardo.Ai API key. You'll create a Leonardo.Ai account, generate your key, and make your first image generation API call. We'll also show you a simpler alternative if you want access to Leonardo.Ai and hundreds of other AI models without managing multiple accounts.

## Prerequisites

- A Google, Canva, or email account, Leonardo.Ai supports multiple sign-in methods
- A valid payment method for verification (you'll receive $5 in free API credits)
- Basic familiarity with code (we'll show simple examples)

## Step 1: Create Your Leonardo.Ai Account

Go to [app.leonardo.ai/api-access](https://app.leonardo.ai/api-access). You'll see the sign-up/login page.

![Leonardo.Ai sign-up page](/assets/img/leonardo-ai/signup.webp)

You can sign up using various methods including Canva, Google, or email. Once you've completed the setup and signed in, you'll land on the API Access page.

![Leonardo.Ai API Access page](/assets/img/leonardo-ai/api-access.webp)

Note that Leonardo.Ai requires you to provide a valid payment method as verification. Once verified, you'll receive $5 in free API credits to get started.

## Step 2: Generate Your API Key

Under the  **API Keys**  section, click the  **+ Create New Key**  button.

Provide a  **name**  for your API key and an optional webhook URL.

![Leonardo.Ai create new API key dialog](/assets/img/leonardo-ai/create-key.webp)
![Leonardo.Ai API key revealed with copy button](/assets/img/leonardo-ai/copy-key.webp)

**Important:**  Copy the key immediately. Leonardo.Ai only shows it once. If you lose it, you'll need to generate a new one.

Store it somewhere safe, like a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

## Step 3: Make Your First API Call

Leonardo.Ai uses a direct REST API for image generation. For full details, check out [Leonardo.Ai's official documentation](https://docs.leonardo.ai/docs/getting-started).

Here's a quick example using `curl` to generate an image:

```javascript
curl --request POST \
     --url https://cloud.leonardo.ai/api/rest/v1/generations \
     --header 'accept: application/json' \
     --header 'authorization: Bearer <YOUR_API_KEY>' \
     --header 'content-type: application/json' \
     --data '
{
  "alchemy": false,
  "height": 1080,
  "modelId": "7b592283-e8a7-4c5a-9ba6-d18c31f258b9",
  "contrast": 3.5,
  "num_images": 4,
  "styleUUID": "111dc692-d470-4eec-b791-3475abac4c46",
  "prompt": "A serene watercolor painting of a mountain lake at sunrise",
  "width": 1920,
  "ultra": false
}
'
```

The response contains a `generationId` that you can use to fetch the generated images. You can also use their "Get API Code" feature to export generations from the web app as ready-to-use API code.

## One Library, Hundreds of Models

The process above works for Leonardo.Ai specifically, but it requires managing API keys, providing payment information, and dealing with a provider-specific API format. What if you want to also use FLUX, [GPT Image](/ai/gpt-image/), Stable Diffusion, or other image models? You'd need to learn each provider's API, manage separate keys, and set up billing for each one.

**[Puter.js](https://docs.puter.com) offers a simpler approach:**  one JavaScript library, access to [hundreds of AI models](/ai/models/) across providers, including Leonardo.Ai, FLUX, GPT, Claude, Gemini, and many more.

With Puter.js, you don't even need an API key. Puter uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where your app's users cover their own AI costs. This means you pay nothing for AI usage, no matter how many users you have.

Just add the Puter.js script tag and start generating images:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img(
            "A cat running like a human holding a silver fish in a market",
            { model: "leonardoai/lucid-origin" }
        )
        .then(imageElement => {
            document.body.appendChild(imageElement);
        });
    </script>
</body>
</html>
```

That's it. No API key, no payment method, no backend. The same [`puter.ai.txt2img()`](https://docs.puter.com/AI/txt2img/) function works with FLUX, GPT Image, Stable Diffusion, and other image models too. One library, one interface, access to all of them.

## Conclusion

You now know how to create a Leonardo.Ai account, generate an API key, and make your first image generation call. For more details, check out [Leonardo.Ai's official documentation](https://docs.leonardo.ai/docs/getting-started). If you'd rather skip managing API keys and provider-specific APIs, [Puter.js](https://docs.puter.com) gives you access to Leonardo.Ai and [hundreds of other AI models](/ai/models/) through a single JavaScript library, with no API keys required.

## Related

- [Free, Unlimited Image Generation API](/tutorials/free-unlimited-image-generation-api/)
- [Free, Unlimited Flux API](/tutorials/free-unlimited-flux-api/)
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
- [How to Get a Together AI API Key](/tutorials/how-to-get-together-ai-api-key/)
- [How to Get a Cohere API Key](/tutorials/how-to-get-cohere-api-key/)
- [How to Get a FLUX (Black Forest Labs) API Key](/tutorials/how-to-get-flux-api-key/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
# How to Get an ElevenLabs API Key: A Step-by-Step Guide

Source: https://developer.puter.com/tutorials/how-to-get-elevenlabs-api-key/

[Tutorials](/tutorials/)

# How to Get an ElevenLabs API Key: A Step-by-Step Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Create Your ElevenLabs Account](#step-1-create-your-elevenlabs-account)[Step 2: Generate Your API Key](#step-2-generate-your-api-key)[Step 3: Make Your First API Call](#step-3-make-your-first-api-call)[A Simpler Alternative with Puter.js](#a-simpler-alternative-with-puterjs)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your ElevenLabs API key. You'll create an ElevenLabs account, generate your key, and make your first text-to-speech API call. We'll also show you a simpler alternative if you want text-to-speech without managing API keys or billing.

## Prerequisites

- An email, GitHub, or Google account for signing up
- Basic familiarity with code (we'll show simple JavaScript examples)

## Step 1: Create Your ElevenLabs Account

Go to [elevenlabs.io/app/api](https://elevenlabs.io/app/api). You'll see a login or sign-up page â create your account using your Google account, GitHub, or email.

![ElevenLabs sign-up page](/assets/img/elevenlabs/signup.webp)

Once you've signed up, you'll land on the dashboard.

![ElevenLabs dashboard](/assets/img/elevenlabs/dashboard.webp)

## Step 2: Generate Your API Key

Find the  **API Keys**  menu in the sidebar and navigate to the API keys page.

![ElevenLabs API keys page](/assets/img/elevenlabs/api-keys-page.webp)

Click  **+ Create Key**  to generate a new API key. You can set a descriptive  **name**  for your key and adjust restrictions and permissions as needed.

![ElevenLabs create API key dialog with name, restrictions, and permissions](/assets/img/elevenlabs/create-key.webp)

**Important:**  Copy the key immediately after creation. ElevenLabs only shows it once. If you lose it, you'll need to generate a new one.

Store it somewhere safe â a password manager, an `.env` file, or your platform's secrets manager. Never commit API keys to a public repository.

![ElevenLabs API key revealed with copy button](/assets/img/elevenlabs/copy-key.webp)

## Step 3: Make Your First API Call

Install the ElevenLabs SDK:

```javascript
npm install @elevenlabs/elevenlabs-js
```

Then make a text-to-speech request:

```javascript
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const client = new ElevenLabsClient({ apiKey: 'your_api_key' });

// Get raw response with headers
const { data, rawResponse } = await client.textToSpeech
  .convert('voice_id', {
    text: 'Hello, world!',
    modelId: 'eleven_multilingual_v2',
  })
  .withRawResponse();

// Access character cost from headers
const charCost = rawResponse.headers.get('x-character-count');
const requestId = rawResponse.headers.get('request-id');
const audioData = data;
```

If you get an audio file back, everything is working. You can explore different voices and models in the [ElevenLabs documentation](https://elevenlabs.io/docs).

## A Simpler Alternative with Puter.js

ElevenLabs gives you high-quality text-to-speech â but you still need to manage billing, credits, and API keys yourself.

**[Puter.js](https://docs.puter.com) offers a simpler approach**  with the [User-Pays model](https://docs.puter.com/user-pays-model/): your app's users cover their own AI costs. You don't need an API key at all, and you pay nothing for AI usage no matter how many users you have.

Just add the Puter.js script tag and start converting text to speech:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <button id="play">Speak!</button>
    <script>
        document.getElementById('play').addEventListener('click', () => {
            puter.ai.txt2speech('Hello world! This is text-to-speech powered by Puter.js.')
                .then((audio) => {
                    audio.play();
                });
        });
    </script>
</body>
</html>
```

No API key, no backend, no billing setup. Puter.js supports text-to-speech models from ElevenLabs, AWS Polly, and OpenAI through a single [`puter.ai.txt2speech()`](https://docs.puter.com/AI/txt2speech/) function â giving you more flexibility for your text-to-speech app.

In addition to text-to-speech, Puter also provides:

- **[Speech-to-Text](https://docs.puter.com/AI/speech2txt/)**  â transcribe audio using models like Whisper and GPT-4o Transcribe
- **[Speech-to-Speech](https://docs.puter.com/AI/speech2speech/)**  â change voices while preserving timing and delivery using ElevenLabs' voice changer

All accessible through a single JavaScript library with no API keys required.

## Conclusion

You now know how to create an ElevenLabs account, generate an API key, and make your first text-to-speech API call. For more details, check out [ElevenLabs' documentation](https://elevenlabs.io/docs). If you'd rather skip managing API keys and billing entirely, [Puter.js](https://docs.puter.com) gives you access to text-to-speech from multiple providers through a single JavaScript library with no API keys required.

## Related

- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [How to Get an Anthropic (Claude) API Key](/tutorials/how-to-get-anthropic-api-key/)
- [How to Get a Gemini API Key](/tutorials/how-to-get-gemini-api-key/)
- [How to Get a Grok (xAI) API Key](/tutorials/how-to-get-grok-api-key/)
- [How to Get a DeepSeek API Key](/tutorials/how-to-get-deepseek-api-key/)
- [How to Get a Mistral API Key](/tutorials/how-to-get-mistral-api-key/)
- [How to Get a MiniMax API Key](/tutorials/how-to-get-minimax-api-key/)
- [How to Get a Moonshot AI (Kimi) API Key](/tutorials/how-to-get-moonshot-ai-api-key/)
- [How to Get a Qwen API Key](/tutorials/how-to-get-qwen-api-key/)
- [How to Get a Z.AI (GLM) API Key](/tutorials/how-to-get-zai-glm-api-key/)
- [How to Get an OpenRouter API Key](/tutorials/how-to-get-openrouter-api-key/)
- [How to Get a Together AI API Key](/tutorials/how-to-get-together-ai-api-key/)
- [How to Get a FLUX (Black Forest Labs) API Key](/tutorials/how-to-get-flux-api-key/)
- [How to Get a Stability AI (Stable Diffusion) API Key](/tutorials/how-to-get-stability-ai-api-key/)
- [How to Get a Kling API Key](/tutorials/how-to-get-kling-api-key/)
- [How to Get a Leonardo.Ai API Key](/tutorials/how-to-get-leonardo-ai-api-key/)
- [How to Get a Cohere API Key](/tutorials/how-to-get-cohere-api-key/)
- [Free, Unlimited ElevenLabs API](/tutorials/free-unlimited-elevenlabs-api/)
- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
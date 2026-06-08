# How to Get a Llama API Key

Source: https://developer.puter.com/tutorials/how-to-get-llama-api-key/

[Tutorials](/tutorials/)

# How to Get a Llama API Key

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 5, 2026
                                    

On this page[Meta Llama API Platform](#meta-llama-api-platform)[Option 1: Puter](#option-1-puter)[Option 2: OpenRouter](#option-2-openrouter)[No API Key Method](#no-api-key-method)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to get a Llama API key, use other providers like Puter and OpenRouter, and even call Llama without needing an API key at all.

## Meta Llama API Platform

The official way to get a Llama API key is through Meta's [Llama API platform](https://www.llama.com/products/llama-api/). However, access is currently limited â you'll need to join a waitlist, and it's only available in the US region.

![Meta Llama API waitlist](/assets/img/llama-api-waitlist.webp)

Once you have access, calling the Llama API is straightforward. It's compatible with the OpenAI endpoint, so you can use the OpenAI SDK directly:

```javascript
npm install openai
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.llama.com/compat/v1/",
  apiKey: "YOUR_LLAMA_API_KEY",
});

const response = await client.chat.completions.create({
  model: "Llama-4-Maverick-17B-128E-Instruct-FP8",
  messages: [
    { role: "user", content: "What is the capital of France?" },
  ],
});

console.log(response.choices[0].message.content);
```

Replace `YOUR_LLAMA_API_KEY` with the API key from your Meta Llama dashboard.

## Option 1: Puter

If you don't want to deal with the waitlist, you can use [Puter](https://puter.com). Puter exposes an OpenAI-compatible endpoint, so you can use the exact same code â just swap the base URL and API key:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

const response = await client.chat.completions.create({
  model: "meta-llama/llama-4-maverick",
  messages: [
    { role: "user", content: "What is the capital of France?" },
  ],
});

console.log(response.choices[0].message.content);
```

To get your Puter auth token, go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy** .

![Puter copy auth token](/assets/img/copy-auth-token.webp)

Not only can you use Llama through Puter, but you also get access to hundreds of other models â [GPT](/ai/openai/), [Claude](/ai/anthropic/), [Gemini](/ai/google/), and more. Check out the full list of [supported AI models](/ai/models/).

## Option 2: OpenRouter

Another popular option is [OpenRouter](https://openrouter.ai/). OpenRouter is a unified API that gives you access to models from multiple providers, including Llama. It also supports the OpenAI-compatible endpoint, so the same code works here too:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "YOUR_OPENROUTER_API_KEY",
});

const response = await client.chat.completions.create({
  model: "meta-llama/llama-4-maverick",
  messages: [
    { role: "user", content: "What is the capital of France?" },
  ],
});

console.log(response.choices[0].message.content);
```

Check out our tutorial on [how to get an OpenRouter API key](/tutorials/how-to-get-openrouter-api-key/) for setup instructions.

## No API Key Method

All the solutions above require an API key. But what if you don't want to use one at all? That's where [Puter.js](https://docs.puter.com) comes in.

Just add one library to your project:

```js
// npm install @heyputer/puter.js
import puter from '@heyputer/puter.js';
```

Or add one script tag to your HTML:

```html
<script src="https://js.puter.com/v2/"></script>
```

No API keys needed. Start building with Llama immediately.

```javascript
const response = await puter.ai.chat(
  "What is the capital of France?",
  { model: "meta-llama/llama-4-maverick" }
);
console.log(response.message.content);
```

Through Puter.js's [User-Pays Model](https://docs.puter.com/user-pays-model/), your users pay for their own AI costs. They authenticate with their Puter account, and any AI usage is billed to them instead of you as the developer, making your app free to run.

In addition to AI, Puter.js also gives you access to [cloud storage](/object-storage/), [databases](/key-value-database/), and more. Check out the [Puter.js documentation](https://docs.puter.com) for details.

## Conclusion

You now know how to get a Llama API key from Meta's official platform, use Puter or OpenRouter as different providers, and even call Llama without an API key using Puter.js. Whether you want direct access or a simpler setup, there's an option that works for you.

## Related

- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Get an OpenRouter API Key](/tutorials/how-to-get-openrouter-api-key/)
- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [How to Get an Anthropic API Key](/tutorials/how-to-get-anthropic-api-key/)
- [Access Llama Using OpenAI-Compatible API](/tutorials/access-llama-using-openai-compatible-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
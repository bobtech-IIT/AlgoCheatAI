# Access Mistral Using OpenAI-Compatible API

Source: https://developer.puter.com/tutorials/access-mistral-using-openai-compatible-api/

[Tutorials](/tutorials/)

# Access Mistral Using OpenAI-Compatible API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 20, 2026
                                    

On this page[Prerequisites](#prerequisites)[Setup](#setup)[Basic Chat Completion](#basic-chat-completion)[Streaming](#streaming)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to access Mistral models using the OpenAI SDK through Puter's OpenAI-compatible endpoint. No Mistral API key needed, just your Puter auth token.

## Prerequisites

- A [Puter](https://puter.com) account
- Your Puter auth token, go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [Node.js](https://nodejs.org) installed on your machine

## Setup

Install the OpenAI SDK:

```javascript
npm install openai
```

Then configure the client with Puter's base URL and your auth token:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});
```

Replace `YOUR_PUTER_AUTH_TOKEN` with the auth token you copied from your Puter dashboard. That's all you need. No Mistral API key required.

## Basic Chat Completion

Here's a simple chat completion using Mistral Large 3:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

const response = await client.chat.completions.create({
  model: "mistralai/mistral-large-2512",
  messages: [
    { role: "user", content: "What is the capital of France?" },
  ],
});

console.log(response.choices[0].message.content);
```

Sample output:

```javascript
The capital of France is Paris.
```

The code is identical to what you'd write for OpenAI directly. The only difference is the base URL and the model string.

## Streaming

For longer responses, enable streaming to get results in real-time:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

const stream = await client.chat.completions.create({
  model: "mistralai/mistral-large-2512",
  messages: [
    { role: "user", content: "Write a short story about a robot learning to paint." },
  ],
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    process.stdout.write(content);
  }
}
```

Set `stream: true` and iterate over the chunks as they arrive. Each chunk contains a piece of the response that you can display immediately.

## Conclusion

That's it. You now have access to Mistral through the OpenAI SDK via Puter, no Mistral API key needed. Swap the model string to use any [Mistral model](/ai/mistralai/), from the lightweight Small to the powerful Large, or any of the hundreds of other [AI models](/ai/models/) available through Puter.

## Related

- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [Free, Unlimited Mistral API](/tutorials/free-unlimited-mistral-api/)
- [Mistral AI Models on Puter](/ai/mistralai/)
- [Access Llama Using OpenAI-Compatible API](/tutorials/access-llama-using-openai-compatible-api/)
- [Access Perplexity Using OpenAI-Compatible API](/tutorials/access-perplexity-using-openai-compatible-api/)
- [Supported AI Models](/ai/models/)
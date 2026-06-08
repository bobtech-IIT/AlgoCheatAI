# Access Gemini Using OpenAI-Compatible API

Source: https://developer.puter.com/tutorials/access-gemini-using-openai-compatible-api/

[Tutorials](/tutorials/)

# Access Gemini Using OpenAI-Compatible API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 19, 2026
                                    

On this page[Prerequisites](#prerequisites)[Setup](#setup)[Basic Chat Completion](#basic-chat-completion)[Streaming](#streaming)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to access Gemini models using the OpenAI SDK through Puter's OpenAI-compatible endpoint. No Google AI API key needed, just your Puter auth token.

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

Replace `YOUR_PUTER_AUTH_TOKEN` with the auth token you copied from your Puter dashboard. That's all you need. No Google AI API key required.

## Basic Chat Completion

Here's a simple chat completion using Gemini 2.5 Flash Lite:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: "YOUR_PUTER_AUTH_TOKEN",
});

const response = await client.chat.completions.create({
  model: "gemini-2.5-flash-lite",
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
  model: "gemini-2.5-flash-lite",
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

That's it. You now have access to Gemini through the OpenAI SDK via Puter, no Google AI API key needed. Swap the model string to use any [Gemini model](/ai/google/), from the lightweight Flash Lite to the powerful Pro, or any of the hundreds of other [AI models](/ai/models/) available through Puter.

## Related

- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [Free Gemini API](/tutorials/free-gemini-api/)
- [Google Models on Puter](/ai/google/)
- [Access Claude Using OpenAI-Compatible API](/tutorials/access-claude-using-openai-compatible-api/)
- [Access Grok Using OpenAI-Compatible API](/tutorials/access-grok-using-openai-compatible-api/)
- [Access Mistral Using OpenAI-Compatible API](/tutorials/access-mistral-using-openai-compatible-api/)
- [Access Qwen Using OpenAI-Compatible API](/tutorials/access-qwen-using-openai-compatible-api/)
- [Use Any AI Model in LangChain](/tutorials/access-any-model-using-langchain/)
- [Supported AI Models](/ai/models/)
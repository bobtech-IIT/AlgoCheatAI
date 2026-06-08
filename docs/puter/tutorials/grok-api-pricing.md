# Grok API Pricing

Source: https://developer.puter.com/tutorials/grok-api-pricing/

[Tutorials](/tutorials/)

# Grok API Pricing

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 18, 2026
                                    

On this page[How Grok API pricing works](#how-grok-api-pricing-works)[Model pricing](#model-pricing)[Text models](#text-models)[Image generation](#image-generation)[Video generation](#video-generation)[Voice and audio](#voice-and-audio)[Which model should you choose?](#which-model-should-you-choose)[What does this cost in practice?](#what-does-this-cost-in-practice)[Grok vs GPT vs Claude vs Gemini: price comparison](#grok-vs-gpt-vs-claude-vs-gemini-price-comparison)[Batch API pricing (20â50% off)](#batch-api-pricing-2050-off)[Server-side tool pricing](#server-side-tool-pricing)[Storage and download pricing](#storage-and-download-pricing)[Other costs to consider](#other-costs-to-consider)[Image inputs](#image-inputs)[Usage violation fees](#usage-violation-fees)[Billing and payment](#billing-and-payment)[Tips to reduce your Grok API costs](#tips-to-reduce-your-grok-api-costs)[The free alternative: Puter.js](#the-free-alternative-puterjs)[Try it now](#try-it-now)[Why developers choose Puter.js over direct API access](#why-developers-choose-puterjs-over-direct-api-access)[Related](#related)

This guide breaks down everything you need to know about Grok API pricing: every model, every feature, and every discount. Whether you're budgeting for a side project or planning enterprise-scale usage, you'll find the exact numbers here.

At the end, we'll also show you how to access Grok models for free using [Puter.js](https://developer.puter.com): no API keys, no billing setup, no cost to you as a developer. Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate AI capabilities into their applications while each user will cover their own usage costs.

## How Grok API pricing works

[xAI](/ai/xai/) charges based on  **tokens** , the pieces of text the model reads and generates. As a rough estimate, 1 token is approximately 4 characters or 0.75 words in English. You're billed separately for:

- **Input tokens** : the text you send to the model (your prompt, system instructions, conversation history)
- **Output tokens** : the text the model generates in response

All text prices below are per  **million tokens**  (MTok) in USD.

## Model pricing

xAI keeps pricing simple: all Grok text models share the same per-token rates.

### Text models

| Model | Input | Output | Context Window |
| --- | --- | --- | --- |
| **grok-4.3** | $1.25 / MTok | $2.50 / MTok | 1M tokens |
| grok-4.20-0309-reasoning | $1.25 / MTok | $2.50 / MTok | 1M tokens |
| grok-4.20-0309-non-reasoning | $1.25 / MTok | $2.50 / MTok | 1M tokens |
| grok-4.20-multi-agent-0309 | $1.25 / MTok | $2.50 / MTok | 2M tokens |

**grok-4.3**  is the latest and recommended model. The grok-4.20 variants are older models being retired; legacy requests will redirect to grok-4.3 at standard pricing.

### Image generation

| Model | Price |
| --- | --- |
| grok-imagine-image | $0.02 / image |
| grok-imagine-image-quality | $0.05 / image |

### Video generation

| Model | Price |
| --- | --- |
| grok-imagine-video | $0.05 / second |

### Voice and audio

| Service | Price |
| --- | --- |
| Realtime voice | $0.05 / minute ($3.00 / hour) |
| Text-to-Speech | $15.00 / 1M characters |
| Speech-to-Text (REST) | $0.10 / hour |
| Speech-to-Text (Streaming) | $0.20 / hour |

### Which model should you choose?

There's really only one choice for text:  **grok-4.3** . It's the current flagship model with a 1M token context window at $1.25/$2.50 per MTok. If you need multi-agent workflows with extended context, grok-4.20-multi-agent-0309 offers a 2M token context window at the same price.

### What does this cost in practice?

To give you a sense of real-world costs with grok-4.3 ($1.25 input / $2.50 output per MTok):

| Use Case | Approx. Tokens | Estimated Cost |
| --- | --- | --- |
| Single chat message (500 in / 500 out) | 1,000 | $0.002 |
| Summarize a 10-page document | ~5,000 in / 500 out | $0.008 |
| Analyze a 50-page PDF | ~25,000 in / 2,000 out | $0.04 |
| Process 1,000 customer support tickets | ~3.7M total | ~$7.00 |
| 10,000 short API calls / day (30 days) | ~300M/month | ~$560/month |

Grok is one of the most affordable flagship-tier APIs available.

### Grok vs GPT vs Claude vs Gemini: price comparison

How does Grok stack up against competing models?

| Model | Input | Output | Context Window |
| --- | --- | --- | --- |
| **grok-4.3** | $1.25 / MTok | $2.50 / MTok | 1M |
| [GPT-5.4](/ai/openai/gpt-5.4/) | $2.50 / MTok | $15 / MTok | 128K |
| [GPT-5.4 mini](/ai/openai/gpt-5.4-mini/) | $0.75 / MTok | $4.50 / MTok | 128K |
| [Claude Sonnet 4.6](/ai/anthropic/claude-sonnet-4-6/) | $3 / MTok | $15 / MTok | 1M |
| [Claude Haiku 4.5](/ai/anthropic/claude-haiku-4-5/) | $1 / MTok | $5 / MTok | 200K |
| [Gemini 2.5 Pro](/ai/google/gemini-2.5-pro/) | $1.25â$2.50 / MTok | $10â$15 / MTok | 1M |
| [Gemini 2.5 Flash](/ai/google/gemini-2.5-flash/) | $0.15â$0.30 / MTok | $0.60â$3.50 / MTok | 1M |

Grok's output pricing ($2.50/MTok) is significantly cheaper than Claude [Sonnet](/ai/sonnet/) ($15), GPT-5.4 ($15), and Gemini Pro ($10â$15), making it one of the best values at the flagship tier.

## Batch API pricing (20â50% off)

The Batch API processes requests asynchronously at  **20â50% off**  standard rates, with results typically returned within 24 hours. Batch requests don't count towards rate limits.

The Batch API is ideal for bulk processing tasks like document analysis, data extraction, or content moderation where you can tolerate some latency.

## Server-side tool pricing

Grok offers built-in server-side tools that are priced per invocation:

| Tool | Price per 1,000 invocations |
| --- | --- |
| Web Search | $5 |
| X Search | $5 |
| Code Execution | $5 |
| File Attachments | $10 |
| Collections Search | $2.50 |
| Image/Video Understanding | Token-based (no invocation fee) |

Standard token costs apply on top of tool invocation fees.

## Storage and download pricing

| Resource | Storage | Downloads |
| --- | --- | --- |
| Files | $0.025 / GiB / day | $0.20 / GiB |
| Collections | $0.10 / GiB / day | $0.20 / GiB |

## Other costs to consider

### Image inputs

Grok supports image inputs (JPG/PNG, max 20 MiB per image, unlimited quantity). Image tokens are billed at standard input token rates.

### Usage violation fees

Requests that violate usage guidelines and are caught pre-generation incur a $0.05 fee per request.

## Billing and payment

- Billed based on actual usage
- Payments in USD
- Billing managed through the [xAI Console](https://console.x.ai/)
- No documented free tier or trial credits

## Tips to reduce your Grok API costs

Here are practical ways to keep your bill down:

1. **Batch non-urgent work.**  Use the Batch API for 20â50% off on bulk processing. If you don't need results in real-time, there's no reason to pay full price.
2. **Trim your inputs.**  Every token costs money. Remove unnecessary conversation history, compress system prompts, and avoid sending entire documents when a relevant excerpt will do.
3. **Choose the right image quality.**  Standard image generation ($0.02/image) is 60% cheaper than quality mode ($0.05/image). Only use quality mode when you need it.
4. **Be selective with tools.**  Web Search and X Search cost $5 per 1,000 calls. Only enable them when your use case actually needs real-time data.
5. **Monitor storage costs.**  File and collection storage is billed daily. Clean up files you no longer need to avoid ongoing charges.

## The free alternative: Puter.js

If you're a developer building an app that uses Grok, there's a way to skip all of the above: no API keys, no billing setup, no rate limit management, and no cost to you.

[Puter.js](https://developer.puter.com) is a JavaScript SDK that gives you access to [Grok and 400+ other AI models](/ai/) directly from your frontend code, including chat, text-to-speech, image generation, and more. It uses a ["User-Pays" model](https://docs.puter.com/user-pays-model/): each user of your app covers their own AI usage through their Puter account. You, the developer, pay nothing.

Here's what that means in practice:

|  | Grok API (Direct) | Puter.js |
| --- | --- | --- |
| **Cost to developer** | Pay per token | Free |
| **API key required** | Yes | No |
| **Billing setup** | Credit card required | None |
| **Rate limits** | Per-account | Per-user (handled by Puter) |
| **Backend required** | Yes (to protect your key) | No |
| **Models available** | Grok only | Grok + GPT + Claude + Gemini + 500 more |
| **Capabilities** | Chat, TTS, images, etc. (separate APIs) | Chat, TTS, image generation, and more in one unified SDK |

### Try it now

Add one script tag to your HTML and start using Grok immediately:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain quantum computing in simple terms", {
            model: "xai/grok-4.3"
        }).then(response => {
            document.body.innerHTML = response.message.content[0].text;
        });
    </script>
</body>
</html>
```

No API key. No backend. No billing. You can also use any other Grok model the same way.

You can also stream responses for a better user experience:

```html
<html>
<body>
    <div id="output"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat("Write a short poem about coding", {
                model: "xai/grok-4.3",
                stream: true
            });
            const output = document.getElementById('output');
            for await (const chunk of response) {
                if (chunk?.text) {
                    output.textContent += chunk.text;
                }
            }
        }
        streamResponse();
    </script>
</body>
</html>
```

### Why developers choose Puter.js over direct API access

- **$0 infrastructure cost** : Your users pay for their own usage, so your app costs nothing to run regardless of scale
- **No API key management** : No keys to rotate, no secrets to protect, no backend needed to hide them
- **No rate limit headaches** : Each user has their own limits, so one user's traffic never blocks another's
- **More than just chat** : Text-to-speech, image generation, and other AI capabilities are all available through the same SDK, no juggling separate APIs
- **Access every AI provider** : Switch between Grok, GPT, Claude, Gemini, DeepSeek, and more with one line of code, no separate accounts or billing for each
- **Ship faster** : Go from idea to production in minutes, not days of billing setup and backend configuration

---

## Related

- [Free, Unlimited Grok API](/tutorials/free-unlimited-grok-api/)
- [How to Get a Grok API Key](/tutorials/how-to-get-grok-api-key/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [OpenAI API Pricing](/tutorials/openai-api-pricing/)
- [Claude API Pricing](/tutorials/claude-api-pricing/)
- [Gemini API Pricing](/tutorials/gemini-api-pricing/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free LLM API](/tutorials/free-llm-api/)
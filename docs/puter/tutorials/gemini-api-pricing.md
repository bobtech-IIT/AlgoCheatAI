# Gemini API Pricing

Source: https://developer.puter.com/tutorials/gemini-api-pricing/

[Tutorials](/tutorials/)

# Gemini API Pricing

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 18, 2026
                                    

On this page[How Gemini API pricing works](#how-gemini-api-pricing-works)[Pricing tiers](#pricing-tiers)[Model pricing](#model-pricing)[Gemini 3.1 Flash-Lite (latest lightweight model)](#gemini-31-flash-lite-latest-lightweight-model)[Gemini 3.1 Pro Preview (latest flagship)](#gemini-31-pro-preview-latest-flagship)[Gemini 3 Flash Preview](#gemini-3-flash-preview)[Gemini 2.5 Pro](#gemini-25-pro)[Gemini 2.5 Flash](#gemini-25-flash)[Gemini 2.5 Flash-Lite](#gemini-25-flash-lite)[Specialized models](#specialized-models)[Legacy models](#legacy-models)[Which model should you choose?](#which-model-should-you-choose)[What does this cost in practice?](#what-does-this-cost-in-practice)[Gemini vs GPT vs Claude vs Grok: price comparison](#gemini-vs-gpt-vs-claude-vs-grok-price-comparison)[Context caching pricing](#context-caching-pricing)[Batch API pricing (50% off)](#batch-api-pricing-50-off)[Image generation pricing](#image-generation-pricing)[Imagen 4](#imagen-4)[Gemini 2.5 Flash (native image generation)](#gemini-25-flash-native-image-generation)[Video generation pricing](#video-generation-pricing)[Music generation pricing](#music-generation-pricing)[Audio pricing](#audio-pricing)[Embedding pricing](#embedding-pricing)[Tool and feature pricing](#tool-and-feature-pricing)[Google Search grounding](#google-search-grounding)[Google Maps grounding](#google-maps-grounding)[Code execution](#code-execution)[File search](#file-search)[Free tier details](#free-tier-details)[Billing and payment](#billing-and-payment)[Tips to reduce your Gemini API costs](#tips-to-reduce-your-gemini-api-costs)[The free alternative: Puter.js](#the-free-alternative-puterjs)[Try it now](#try-it-now)[Why developers choose Puter.js over direct API access](#why-developers-choose-puterjs-over-direct-api-access)[Related](#related)

This guide breaks down everything you need to know about Gemini API pricing: every model, every tier, and every discount. Whether you're budgeting for a side project or planning enterprise-scale usage, you'll find the exact numbers here.

At the end, we'll also show you how to access Gemini models for free using [Puter.js](https://developer.puter.com): no API keys, no billing setup, no cost to you as a developer. Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate AI capabilities into their applications while each user will cover their own usage costs.

## How Gemini API pricing works

[Google](/ai/google/) charges based on  **tokens** , the pieces of text the model reads and generates. As a rough estimate, 1 token is approximately 4 characters or 0.75 words in English. You're billed separately for:

- **Input tokens** : the text you send to the model (your prompt, system instructions, conversation history)
- **Output tokens** : the text the model generates in response (including thinking tokens for reasoning models)

All text prices below are per  **million tokens**  (MTok) in USD.

A unique advantage of Google's Gemini API is that it offers a  **free tier**  with generous rate limits, making it one of the few major AI providers where you can get started at zero cost.

## Pricing tiers

Google offers three access tiers:

| Tier | Description |
| --- | --- |
| **Free** | Limited rate limits, your content may be used to improve products |
| **Paid (Standard)** | Higher limits, your content is not used for product improvement |
| **Priority** | 1.8x standard pricing for guaranteed availability and lowest latency |

Additionally,  **Batch**  processing is available at 50% off standard rates.

## Model pricing

### Gemini 3.1 Flash-Lite (latest lightweight model)

| Tier | Input | Output |
| --- | --- | --- |
| Free | Free | Free |
| Standard | $0.25 / MTok | $1.50 / MTok |
| Batch | $0.125 / MTok | $0.75 / MTok |
| Priority | $0.45 / MTok | $2.70 / MTok |

### Gemini 3.1 Pro Preview (latest flagship)

| Tier | Input (â¤200K) | Input (>200K) | Output (â¤200K) | Output (>200K) |
| --- | --- | --- | --- | --- |
| Standard | $2.00 / MTok | $4.00 / MTok | $12.00 / MTok | $18.00 / MTok |
| Batch | $1.00 / MTok | $2.00 / MTok | $6.00 / MTok | $9.00 / MTok |
| Priority | $3.60 / MTok | $7.20 / MTok | $21.60 / MTok | $32.40 / MTok |

### Gemini 3 Flash Preview

| Tier | Input | Output |
| --- | --- | --- |
| Free | Free | Free |
| Standard | $0.50 / MTok | $3.00 / MTok |
| Priority | $0.90 / MTok | $5.40 / MTok |

### Gemini 2.5 Pro

| Tier | Input (â¤200K) | Input (>200K) | Output (â¤200K) | Output (>200K) |
| --- | --- | --- | --- | --- |
| Free | Free | Free | Free | Free |
| Standard | $1.25 / MTok | $2.50 / MTok | $10.00 / MTok | $15.00 / MTok |
| Batch | $0.625 / MTok | $1.25 / MTok | $5.00 / MTok | $7.50 / MTok |
| Priority | $2.25 / MTok | $4.50 / MTok | $18.00 / MTok | $27.00 / MTok |

### Gemini 2.5 Flash

| Tier | Input | Output |
| --- | --- | --- |
| Free | Free | Free |
| Standard | $0.30 / MTok | $2.50 / MTok |
| Batch | $0.15 / MTok | $1.25 / MTok |
| Priority | $0.54 / MTok | $4.50 / MTok |

### Gemini 2.5 Flash-Lite

| Tier | Input | Output |
| --- | --- | --- |
| Free | Free | Free |
| Standard | $0.10 / MTok | $0.40 / MTok |
| Batch | $0.05 / MTok | $0.20 / MTok |
| Priority | $0.18 / MTok | $0.72 / MTok |

### Specialized models

| Model | Input | Output | Use Case |
| --- | --- | --- | --- |
| Gemini Robotics-ER 1.6 | $1.00 / MTok | $5.00 / MTok | Robotics |
| Gemini 2.5 Computer Use | $1.25â$2.50 / MTok | $10.00â$15.00 / MTok | Computer use / browser automation |
| Gemma 4 (open) | Free | Free | Free tier only |

### Legacy models

| Model | Input | Output | Notes |
| --- | --- | --- | --- |
| Gemini 2.0 Flash | $0.10 / MTok | $0.40 / MTok | Deprecated June 1, 2026 |

### Which model should you choose?

- **Gemini 2.5 Flash-Lite** : The cheapest option at $0.10/$0.40 per MTok. Great for high-volume, low-complexity tasks like classification, extraction, and routing.
- **[Gemini 2.5 Flash](/ai/google/gemini-2.5-flash/)** : Best value for most applications. Strong reasoning at $0.30/$2.50 per MTok, with a free tier available.
- **[Gemini 2.5 Pro](/ai/google/gemini-2.5-pro/)** : The most capable current production model. Best for complex reasoning, research, and multi-step analysis.
- **Gemini 3.1 Flash-Lite** : The latest lightweight model with improved capabilities at $0.25/$1.50 per MTok.
- **Gemini 3.1 Pro Preview** : Latest flagship preview with top-tier performance. Use when you need the best quality available.

For most developers starting out,  **Gemini 2.5 Flash is the best value** . It's highly capable, has a free tier, and at $0.30/$2.50 per MTok is one of the cheapest flagship-tier models available.

### What does this cost in practice?

To give you a sense of real-world costs with Gemini 2.5 Flash ($0.30 input / $2.50 output per MTok):

| Use Case | Approx. Tokens | Estimated Cost |
| --- | --- | --- |
| Single chat message (500 in / 500 out) | 1,000 | $0.001 |
| Summarize a 10-page document | ~5,000 in / 500 out | $0.003 |
| Analyze a 50-page PDF | ~25,000 in / 2,000 out | $0.01 |
| Process 1,000 customer support tickets | ~3.7M total | ~$5.00 |
| 10,000 short API calls / day (30 days) | ~300M/month | ~$420/month |

With Gemini 2.5 Flash-Lite ($0.10/$0.40 per MTok), these costs drop by roughly 75%.

### Gemini vs GPT vs Claude vs Grok: price comparison

How does Gemini stack up against competing models?

| Model | Input | Output | Context Window |
| --- | --- | --- | --- |
| **Gemini 2.5 Flash** | $0.30 / MTok | $2.50 / MTok | 1M |
| **Gemini 2.5 Flash-Lite** | $0.10 / MTok | $0.40 / MTok | 1M |
| [GPT-5.4 mini](/ai/openai/gpt-5.4-mini/) | $0.75 / MTok | $4.50 / MTok | 128K |
| [GPT-5.4 nano](/ai/openai/gpt-5.4-nano/) | $0.20 / MTok | $1.25 / MTok | 128K |
| [Claude Sonnet 4.6](/ai/anthropic/claude-sonnet-4-6/) | $3 / MTok | $15 / MTok | 1M |
| [Claude Haiku 4.5](/ai/anthropic/claude-haiku-4-5/) | $1 / MTok | $5 / MTok | 200K |
| [grok-4.3](/ai/xai/grok-4.3/) | $1.25 / MTok | $2.50 / MTok | 1M |
| **Gemini 2.5 Pro** | $1.25 / MTok | $10 / MTok | 1M |
| [Claude Opus 4.7](/ai/anthropic/claude-opus-4-7/) | $5 / MTok | $25 / MTok | 1M |
| [GPT-5.5](/ai/openai/gpt-5.5/) | $5 / MTok | $30 / MTok | 272K |

Gemini 2.5 Flash-Lite is one of the cheapest models available from any major provider, and Gemini 2.5 Flash offers an unbeatable combination of quality, price, and a 1M token context window. Plus, the free tier means you can test and prototype at zero cost.

## Context caching pricing

Context caching reduces costs by reusing previously processed parts of your prompt across API calls. Cached tokens are served at a fraction of the standard input price.

| Model | Cached Input | Cache Storage |
| --- | --- | --- |
| Gemini 3.1 Flash-Lite | $0.025 / MTok | $1.00 / MTok / hour |
| Gemini 3.1 Pro Preview | $0.20â$0.40 / MTok | $4.50 / MTok / hour |
| Gemini 2.5 Pro | $0.125â$0.25 / MTok | $4.50 / MTok / hour |
| Gemini 2.5 Flash | $0.03 / MTok | $1.00 / MTok / hour |
| Gemini 2.5 Flash-Lite | $0.01 / MTok | $1.00 / MTok / hour |

Cached input is typically  **90% cheaper**  than standard input. However, note that cache storage incurs an hourly cost, so caching is most cost-effective for frequently reused prompts.

## Batch API pricing (50% off)

The Batch API processes requests asynchronously at half the standard price:

| Model | Batch Input | Batch Output |
| --- | --- | --- |
| Gemini 3.1 Flash-Lite | $0.125 / MTok | $0.75 / MTok |
| Gemini 3.1 Pro Preview | $1.00â$2.00 / MTok | $6.00â$9.00 / MTok |
| Gemini 2.5 Pro | $0.625â$1.25 / MTok | $5.00â$7.50 / MTok |
| Gemini 2.5 Flash | $0.15 / MTok | $1.25 / MTok |
| Gemini 2.5 Flash-Lite | $0.05 / MTok | $0.20 / MTok |

Batch processing is ideal for bulk tasks like document analysis, data extraction, or content moderation where you can tolerate some latency.

## Image generation pricing

### Imagen 4

| Quality | Price per image |
| --- | --- |
| Fast | $0.02 |
| Standard | $0.04 |
| Ultra | $0.06 |

### Gemini 2.5 Flash (native image generation)

| Tier | Price per image |
| --- | --- |
| Standard | $0.039 |
| Batch | $0.0195 |

## Video generation pricing

| Model | Price per second |
| --- | --- |
| Veo 3.1 | $0.05â$0.60 (varies by quality/resolution) |
| Veo 3 | $0.10â$0.40 |
| Veo 2 | $0.35 |

## Music generation pricing

| Model | Price |
| --- | --- |
| Lyria 3 Clip | $0.04 / 30-second song |
| Lyria 3 Pro | $0.08 / full song |

## Audio pricing

Audio input tokens are priced at roughly 2-3x text token pricing. For example, with Gemini 2.5 Flash:

| Type | Price |
| --- | --- |
| Audio input | $1.00 / MTok |
| Text output | $2.50 / MTok |

## Embedding pricing

| Model | Price |
| --- | --- |
| Gemini Embedding 2 (text) | $0.20 / MTok |
| Gemini Embedding 2 (image) | $0.45 / MTok (~$0.00012/image) |
| Gemini Embedding 2 (audio) | $6.50 / MTok (~$0.00016/second) |
| Gemini Embedding 2 (video) | $12.00 / MTok (~$0.00079/frame) |
| Gemini Embedding 001 | $0.15 / MTok (batch: $0.075) |

## Tool and feature pricing

### Google Search grounding

| Model Generation | Free Tier | Paid Tier |
| --- | --- | --- |
| Gemini 3.x models | Up to 5,000 requests | $14â$35 / 1,000 queries |
| Gemini 2.x models | Up to 500 requests | $14â$35 / 1,000 queries |

### Google Maps grounding

$25 per 1,000 grounded prompts after free tier limits.

### Code execution

Charged at the model's standard token rates, no additional per-invocation fee.

### File search

$0.15 per million embedding tokens, plus standard retrieval costs.

## Free tier details

Most Gemini models include a free tier with limited rate limits. Key details:

- Available for Gemini 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite, 3 Flash Preview, and 3.1 Flash-Lite
- Rate limits vary by model (typically lower RPM and TPM than paid tiers)
- **Content may be used to improve Google products**  (paid tier opts out of this)
- Great for prototyping and low-volume applications

## Billing and payment

- Billed monthly based on actual usage
- Payments in USD
- Free tier available for testing and low-volume use
- Paid tier requires billing setup in [Google AI Studio](https://aistudio.google.com/) or Google Cloud
- Enterprise tier available with custom support and compliance

## Tips to reduce your Gemini API costs

Here are practical ways to keep your bill down:

1. **Start with Flash-Lite.**  At $0.10/$0.40 per MTok, Gemini 2.5 Flash-Lite handles many tasks well. Only upgrade to Flash or Pro when quality demands it.
2. **Use the free tier for prototyping.**  Test your application logic without spending anything, then switch to paid when you're ready for production.
3. **Leverage context caching.**  If you're sending the same system prompt or reference documents with every request, enable caching. Cached input is ~90% cheaper than standard input.
4. **Batch non-urgent work.**  Use the Batch API for 50% off on bulk processing. Document analysis, data extraction, and analytics don't need real-time responses.
5. **Stay under the 200K input threshold.**  For Pro models, input and output pricing jumps at 200K tokens. Keep prompts under this threshold when possible.
6. **Trim your inputs.**  Remove unnecessary conversation history, compress system prompts, and avoid sending entire documents when a relevant excerpt will do.
7. **Choose the right image quality.**  Imagen 4 Fast ($0.02/image) is 67% cheaper than Ultra ($0.06/image). Only use higher quality when you need it.

## The free alternative: Puter.js

If you're a developer building an app that uses Gemini, there's a way to skip all of the above: no API keys, no billing setup, no rate limit management, and no cost to you.

[Puter.js](https://developer.puter.com) is a JavaScript SDK that gives you access to [Gemini and 400+ other AI models](/ai/) directly from your frontend code, including chat, text-to-speech, image generation, and more. It uses a ["User-Pays" model](https://docs.puter.com/user-pays-model/): each user of your app covers their own AI usage through their Puter account. You, the developer, pay nothing.

Here's what that means in practice:

|  | Gemini API (Direct) | Puter.js |
| --- | --- | --- |
| **Cost to developer** | Pay per token (free tier available) | Free |
| **API key required** | Yes | No |
| **Billing setup** | Google Cloud / AI Studio | None |
| **Rate limits** | Per-project tiers | Per-user (handled by Puter) |
| **Backend required** | Yes (to protect your key) | No |
| **Models available** | Gemini only | Gemini + GPT + Claude + Grok + 500 more |
| **Capabilities** | Chat, images, video, etc. (separate APIs) | Chat, TTS, image generation, and more in one unified SDK |

### Try it now

Add one script tag to your HTML and start using Gemini immediately:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain quantum computing in simple terms", {
            model: "google/gemini-2.5-flash"
        }).then(response => {
            document.body.innerHTML = response.message.content[0].text;
        });
    </script>
</body>
</html>
```

No API key. No backend. No billing. You can also use Gemini 2.5 Pro, Gemini 2.5 Flash-Lite, and every other Gemini model the same way.

You can also stream responses for a better user experience:

```html
<html>
<body>
    <div id="output"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat("Write a short poem about coding", {
                model: "google/gemini-2.5-flash",
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
- **Access every AI provider** : Switch between Gemini, GPT, Claude, Grok, DeepSeek, and more with one line of code, no separate accounts or billing for each
- **Ship faster** : Go from idea to production in minutes, not days of billing setup and backend configuration

---

## Related

- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [How to Get a Gemini API Key](/tutorials/how-to-get-gemini-api-key/)
- [Free, Unlimited Google AI API](/tutorials/free-unlimited-google-ai-api/)
- [OpenAI API Pricing](/tutorials/openai-api-pricing/)
- [Claude API Pricing](/tutorials/claude-api-pricing/)
- [Grok API Pricing](/tutorials/grok-api-pricing/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free LLM API](/tutorials/free-llm-api/)
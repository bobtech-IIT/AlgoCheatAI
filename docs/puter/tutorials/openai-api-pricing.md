# OpenAI API Pricing

Source: https://developer.puter.com/tutorials/openai-api-pricing/

[Tutorials](/tutorials/)

# OpenAI API Pricing

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 18, 2026
                                    

On this page[How OpenAI API pricing works](#how-openai-api-pricing-works)[Model pricing](#model-pricing)[GPT models (text generation)](#gpt-models-text-generation)[Reasoning models](#reasoning-models)[Pro models (highest quality, premium pricing)](#pro-models-highest-quality-premium-pricing)[Specialized models](#specialized-models)[Legacy models](#legacy-models)[Which model should you choose?](#which-model-should-you-choose)[What does this cost in practice?](#what-does-this-cost-in-practice)[OpenAI vs Claude vs Gemini: price comparison](#openai-vs-claude-vs-gemini-price-comparison)[Cached input pricing](#cached-input-pricing)[Batch API pricing (50% off)](#batch-api-pricing-50-off)[Priority and Flex tiers](#priority-and-flex-tiers)[Priority tier (2.5x standard pricing)](#priority-tier-25x-standard-pricing)[Flex tier (variable pricing)](#flex-tier-variable-pricing)[Tool and feature pricing](#tool-and-feature-pricing)[Web search](#web-search)[File search](#file-search)[Containers (Code Interpreter)](#containers-code-interpreter)[Embeddings](#embeddings)[Moderation](#moderation)[Image generation](#image-generation)[Audio and Realtime API](#audio-and-realtime-api)[Data residency pricing](#data-residency-pricing)[Rate limits](#rate-limits)[Billing and payment](#billing-and-payment)[Tips to reduce your OpenAI API costs](#tips-to-reduce-your-openai-api-costs)[The free alternative: Puter.js](#the-free-alternative-puterjs)[Try it now](#try-it-now)[Why developers choose Puter.js over direct API access](#why-developers-choose-puterjs-over-direct-api-access)[Related](#related)

This guide breaks down everything you need to know about OpenAI API pricing: every model, every tier, and every discount. Whether you're budgeting for a side project or planning enterprise-scale usage, you'll find the exact numbers here.

At the end, we'll also show you how to access OpenAI models for free using [Puter.js](https://developer.puter.com): no API keys, no billing setup, no cost to you as a developer. Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate AI capabilities into their applications while each user will cover their own usage costs.

## How OpenAI API pricing works

[OpenAI](/ai/openai/) charges based on  **tokens** , the pieces of text the model reads and generates. As a rough estimate, 1 token is approximately 4 characters or 0.75 words in English. You're billed separately for:

- **Input tokens** : the text you send to the model (your prompt, system instructions, conversation history)
- **Cached input tokens** : previously seen input that's served from cache at a steep discount
- **Output tokens** : the text the model generates in response

All prices below are per  **million tokens**  (MTok) in USD.

## Model pricing

OpenAI offers a wide range of models across different capability and price tiers. Here are the current flagship models:

### GPT models (text generation)

| Model | Input | Cached Input | Output |
| --- | --- | --- | --- |
| **GPT-5.5** | $5 / MTok | $0.50 / MTok | $30 / MTok |
| **GPT-5.4** | $2.50 / MTok | $0.25 / MTok | $15 / MTok |
| **GPT-5.4 mini** | $0.75 / MTok | $0.075 / MTok | $4.50 / MTok |
| **GPT-5.4 nano** | $0.20 / MTok | $0.02 / MTok | $1.25 / MTok |
| GPT-5.2 | $1.75 / MTok | $0.175 / MTok | $14 / MTok |
| GPT-5.1 | $1.25 / MTok | $0.125 / MTok | $10 / MTok |
| GPT-5 | $1.25 / MTok | $0.125 / MTok | $10 / MTok |
| GPT-5 mini | $0.25 / MTok | $0.025 / MTok | $2 / MTok |
| GPT-5 nano | $0.05 / MTok | $0.005 / MTok | $0.40 / MTok |
| [GPT-4o](/ai/openai/gpt-4o/) | $2.50 / MTok | $1.25 / MTok | $10 / MTok |
| [GPT-4o mini](/ai/openai/gpt-4o-mini/) | $0.15 / MTok | $0.075 / MTok | $0.60 / MTok |
| [GPT-4.1](/ai/openai/gpt-4.1/) | $2 / MTok | $0.50 / MTok | $8 / MTok |
| [GPT-4.1 mini](/ai/openai/gpt-4.1-mini/) | $0.40 / MTok | $0.10 / MTok | $1.60 / MTok |
| [GPT-4.1 nano](/ai/openai/gpt-4.1-nano/) | $0.10 / MTok | $0.025 / MTok | $0.40 / MTok |

### Reasoning models

| Model | Input | Cached Input | Output |
| --- | --- | --- | --- |
| **[o3](/ai/openai/o3/)** | $2 / MTok | $0.50 / MTok | $8 / MTok |
| **[o4-mini](/ai/openai/o4-mini/)** | $1.10 / MTok | $0.275 / MTok | $4.40 / MTok |
| o3-mini | $1.10 / MTok | $0.55 / MTok | $4.40 / MTok |
| o1 | $15 / MTok | $7.50 / MTok | $60 / MTok |
| o1-mini | $1.10 / MTok | $0.55 / MTok | $4.40 / MTok |

### Pro models (highest quality, premium pricing)

| Model | Input | Output |
| --- | --- | --- |
| GPT-5.5 Pro | $30 / MTok | $180 / MTok |
| GPT-5.4 Pro | $30 / MTok | $180 / MTok |
| GPT-5.2 Pro | $21 / MTok | $168 / MTok |
| GPT-5 Pro | $15 / MTok | $120 / MTok |
| o3 Pro | $20 / MTok | $80 / MTok |
| o1 Pro | $150 / MTok | $600 / MTok |

### Specialized models

| Model | Input | Output | Use Case |
| --- | --- | --- | --- |
| o3-deep-research | $10 / MTok | $40 / MTok | Deep research tasks |
| o4-mini-deep-research | $2 / MTok | $8 / MTok | Deep research (budget) |
| computer-use-preview | $3 / MTok | $12 / MTok | Computer use / browser automation |

### Legacy models

| Model | Input | Output |
| --- | --- | --- |
| GPT-4 Turbo (2024-04-09) | $10 / MTok | $30 / MTok |
| GPT-3.5 Turbo | $0.50 / MTok | $1.50 / MTok |

### Which model should you choose?

- **GPT-5.5** : The most capable GPT model. Best for complex reasoning, creative tasks, and the hardest problems. At $5/$30 per MTok, it's a premium choice for when quality matters most.
- **GPT-5.4** : Excellent all-around model at half the output cost of GPT-5.5. A strong default for most production workloads.
- **GPT-5.4 mini** : Great balance of quality and cost for chatbots, content generation, and general-purpose tasks.
- **GPT-5.4 nano** : Ultra-cheap at $0.20/$1.25 per MTok. Perfect for high-volume, low-complexity tasks like classification, extraction, and routing.
- **o3 / o4-mini** : Reasoning models that think step-by-step. Use o3 for complex logic and math, o4-mini for budget-friendly reasoning.
- **[GPT-4o](/ai/openai/gpt-4o/)** : Still widely used. Solid multimodal model with vision, audio, and text capabilities.

For most developers starting out,  **GPT-5.4 mini is the best value** . Highly capable at $0.75/$4.50 per MTok, with cached input at just $0.075/MTok.

### What does this cost in practice?

To give you a sense of real-world costs with GPT-5.4 mini ($0.75 input / $4.50 output per MTok):

| Use Case | Approx. Tokens | Estimated Cost |
| --- | --- | --- |
| Single chat message (500 in / 500 out) | 1,000 | $0.003 |
| Summarize a 10-page document | ~5,000 in / 500 out | $0.006 |
| Analyze a 50-page PDF | ~25,000 in / 2,000 out | $0.03 |
| Process 1,000 customer support tickets | ~3.7M total | ~$10.00 |
| 10,000 short API calls / day (30 days) | ~300M/month | ~$790/month |

For the cheapest option, GPT-5 nano at $0.05/$0.40 per MTok cuts these numbers by another 75%.

### OpenAI vs Claude vs Gemini: price comparison

How does OpenAI stack up against competing models at similar capability tiers?

| Model | Input | Output | Context Window |
| --- | --- | --- | --- |
| **GPT-5.4 mini** | $0.75 / MTok | $4.50 / MTok | 128K |
| [Claude Sonnet 4.6](/ai/anthropic/claude-sonnet-4-6/) | $3 / MTok | $15 / MTok | 1M |
| [Gemini 2.5 Pro](/ai/google/gemini-2.5-pro/) | $1.25â$2.50 / MTok | $10â$15 / MTok | 1M |
| **GPT-5.4 nano** | $0.20 / MTok | $1.25 / MTok | 128K |
| [Claude Haiku 4.5](/ai/anthropic/claude-haiku-4-5/) | $1 / MTok | $5 / MTok | 200K |
| [Gemini 2.5 Flash](/ai/google/gemini-2.5-flash/) | $0.15â$0.30 / MTok | $0.60â$3.50 / MTok | 1M |
| **GPT-5.5** | $5 / MTok | $30 / MTok | 272K |
| [Claude Opus 4.7](/ai/anthropic/claude-opus-4-7/) | $5 / MTok | $25 / MTok | 1M |

OpenAI's nano and mini models are among the cheapest high-quality options available. At the flagship tier, GPT-5.5 and Claude [Opus](/ai/opus/) 4.7 have similar input pricing, but Claude is cheaper on output ($25 vs $30 per MTok).

## Cached input pricing

One of the biggest cost-saving features in the OpenAI API is  **automatic input caching** . When you send the same prompt prefix across multiple requests, cached tokens are served at a massive discount, typically  **90% off**  standard input pricing.

| Model | Standard Input | Cached Input | Savings |
| --- | --- | --- | --- |
| GPT-5.5 | $5 / MTok | $0.50 / MTok | 90% |
| GPT-5.4 | $2.50 / MTok | $0.25 / MTok | 90% |
| GPT-5.4 mini | $0.75 / MTok | $0.075 / MTok | 90% |
| GPT-5.4 nano | $0.20 / MTok | $0.02 / MTok | 90% |
| o3 | $2 / MTok | $0.50 / MTok | 75% |
| o4-mini | $1.10 / MTok | $0.275 / MTok | 75% |
| GPT-4o | $2.50 / MTok | $1.25 / MTok | 50% |

Caching is automatic â no special configuration needed. If your requests share common prefixes (system prompts, conversation history, reference documents), you'll see cache hits automatically. This makes repeated calls with the same context dramatically cheaper.

## Batch API pricing (50% off)

If your workload doesn't need real-time responses, the Batch API processes requests asynchronously at  **half the standard price** :

| Model | Batch Input | Batch Cached Input | Batch Output |
| --- | --- | --- | --- |
| GPT-5.5 | $2.50 / MTok | $0.25 / MTok | $15 / MTok |
| GPT-5.4 | $1.25 / MTok | $0.125 / MTok | $7.50 / MTok |
| GPT-5.4 mini | $0.375 / MTok | $0.0375 / MTok | $2.25 / MTok |
| o3 | $1 / MTok | $0.25 / MTok | $4 / MTok |
| o4-mini | $0.55 / MTok | $0.1375 / MTok | $2.20 / MTok |
| GPT-4o | $1.25 / MTok | $0.625 / MTok | $5 / MTok |
| GPT-4o mini | $0.075 / MTok | $0.0375 / MTok | $0.30 / MTok |

The Batch API is ideal for bulk processing tasks like document analysis, data extraction, or content moderation where you can tolerate some latency (results typically returned within 24 hours).

## Priority and Flex tiers

OpenAI offers alternative processing tiers beyond the standard tier:

### Priority tier (2.5x standard pricing)

For workloads that need guaranteed availability and the lowest latency. Available for select models:

| Model | Priority Input | Priority Output |
| --- | --- | --- |
| GPT-5.5 | $12.50 / MTok | $75 / MTok |
| GPT-4o | $4.25 / MTok | $17 / MTok |

### Flex tier (variable pricing)

A lower-cost option with limited availability. Requests may be queued during peak times. Available for GPT-5.5, GPT-5.4, GPT-5, o3, and o4-mini.

## Tool and feature pricing

### Web search

Web search pricing depends on the model type:

| Model Type | Price |
| --- | --- |
| Reasoning models (o3, o4-mini, etc.) | $10 / 1,000 searches |
| Non-reasoning models (GPT-5.5, GPT-5.4, etc.) | $25 / 1,000 searches |

Standard token costs for search-generated content apply on top.

### File search

| Component | Price |
| --- | --- |
| Storage | $0.10 / GB per day |
| Tool calls | $2.50 / 1,000 calls |

### Containers (Code Interpreter)

Containers run code in isolated environments with configurable memory. Pricing is per 20-minute session:

| Memory | Price per session |
| --- | --- |
| 1 GB | $0.03 |
| 4 GB | $0.04 |
| 16 GB | $0.12 |
| 64 GB | $0.48 |

### Embeddings

| Model | Price |
| --- | --- |
| text-embedding-3-small | $0.02 / MTok |
| text-embedding-3-large | $0.13 / MTok |

### Moderation

The moderation endpoint is  **free**  to use.

### Image generation

OpenAI's image generation models (gpt-image-2, gpt-image-1) are priced per image based on quality and resolution. For current image generation pricing, see the [image generation guide](https://developers.openai.com/api/docs/guides/image-generation).

### Audio and Realtime API

OpenAI offers audio capabilities including real-time voice conversations, text-to-speech, and transcription. Audio tokens are priced differently from text tokens. For current audio and Realtime API pricing, see the [official pricing page](https://developers.openai.com/api/docs/pricing).

## Data residency pricing

Regional processing endpoints (data residency) incur a  **10% uplift**  on standard pricing for select models including GPT-5.5, GPT-5.4, and GPT-5.4 Pro variants.

## Rate limits

OpenAI uses a tiered system based on your usage and payment history:

| Tier | How to Qualify |
| --- | --- |
| Free | Default for new accounts (limited usage) |
| Tier 1 | $5+ paid |
| Tier 2 | $50+ paid, 7+ days since first payment |
| Tier 3 | $100+ paid, 7+ days since first payment |
| Tier 4 | $250+ paid, 14+ days since first payment |
| Tier 5 | $1,000+ paid, 30+ days since first payment |

Rate limits apply to requests per minute (RPM), tokens per minute (TPM), and requests per day (RPD). Higher tiers unlock significantly more capacity.

## Billing and payment

- Billed monthly based on actual usage
- Payments in USD
- Credit card required for paid tiers
- Free tier available with limited usage for testing
- Prepaid credits available for enterprise customers
- Usage tracking available in the [OpenAI Platform dashboard](https://platform.openai.com/usage)

## Tips to reduce your OpenAI API costs

If you're using the OpenAI API directly, here are practical ways to keep your bill down:

1. **Start with nano or mini models.**  Many tasks don't need GPT-5.5. GPT-5.4 nano at $0.20/$1.25 per MTok handles classification, extraction, and simple Q&A well. Only upgrade when quality demands it.
2. **Leverage cached input.**  OpenAI automatically caches repeated prompt prefixes at up to 90% off. Structure your requests with consistent system prompts and shared context to maximize cache hits.
3. **Batch non-urgent work.**  Document processing, data extraction, and analytics can use the Batch API at 50% off. If you don't need results in real-time, there's no reason to pay full price.
4. **Trim your inputs.**  Every token costs money. Remove unnecessary conversation history, compress system prompts, and avoid sending entire documents when a relevant excerpt will do.
5. **Set max output tokens.**  Use the `max_tokens` parameter to cap response length and keep costs predictable.
6. **Use reasoning models only when needed.**  o3 and o4-mini are great for math and logic, but overkill for simple tasks. Route requests to the cheapest model that can handle them.
7. **Monitor usage in the dashboard.**  OpenAI's usage page shows token consumption by model, so you can spot unexpected spikes before they become expensive surprises.

## The free alternative: Puter.js

If you're a developer building an app that uses OpenAI models, there's a way to skip all of the above: no API keys, no billing setup, no rate limit management, and no cost to you.

[Puter.js](https://developer.puter.com) is a JavaScript SDK that gives you access to [OpenAI and 400+ other AI models](/ai/) directly from your frontend code, including chat, text-to-speech, image generation, and more. It uses a ["User-Pays" model](https://docs.puter.com/user-pays-model/): each user of your app covers their own AI usage through their Puter account. You, the developer, pay nothing.

Here's what that means in practice:

|  | OpenAI API (Direct) | Puter.js |
| --- | --- | --- |
| **Cost to developer** | Pay per token | Free |
| **API key required** | Yes | No |
| **Billing setup** | Credit card required | None |
| **Rate limits** | Per-organization tiers | Per-user (handled by Puter) |
| **Backend required** | Yes (to protect your key) | No |
| **Models available** | OpenAI only | GPT + Claude + Gemini + 500 more |
| **Capabilities** | Chat, TTS, images, etc. (separate APIs) | Chat, TTS, image generation, and more in one unified SDK |

### Try it now

Add one script tag to your HTML and start using GPT immediately:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain quantum computing in simple terms", {
            model: "openai/gpt-5.4-nano"
        }).then(response => {
            document.body.innerHTML = response.message.content[0].text;
        });
    </script>
</body>
</html>
```

No API key. No backend. No billing. You can also use GPT-5.5, GPT-5.4, o3, o4-mini, and every other OpenAI model the same way.

You can also stream responses for a better user experience:

```html
<html>
<body>
    <div id="output"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat("Write a short poem about coding", {
                model: "openai/gpt-5.4-nano",
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
- **Access every AI provider** : Switch between GPT, Claude, Gemini, Grok, DeepSeek, and more with one line of code, no separate accounts or billing for each
- **Ship faster** : Go from idea to production in minutes, not days of billing setup and backend configuration

---

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [Claude API Pricing](/tutorials/claude-api-pricing/)
- [Gemini API Pricing](/tutorials/gemini-api-pricing/)
- [Grok API Pricing](/tutorials/grok-api-pricing/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free LLM API](/tutorials/free-llm-api/)
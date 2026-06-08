# Claude API Pricing

Source: https://developer.puter.com/tutorials/claude-api-pricing/

[Tutorials](/tutorials/)

# Claude API Pricing

[Nariman Jelveh](/author/jelveh/), [Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 18, 2026
                                    

On this page[How Claude API pricing works](#how-claude-api-pricing-works)[Model pricing](#model-pricing)[Current models](#current-models)[Legacy models (still available)](#legacy-models-still-available)[Which model should you choose?](#which-model-should-you-choose)[What does this cost in practice?](#what-does-this-cost-in-practice)[Claude vs GPT vs Gemini: price comparison](#claude-vs-gpt-vs-gemini-price-comparison)[Batch API pricing (50% off)](#batch-api-pricing-50-off)[Prompt caching pricing](#prompt-caching-pricing)[Long context pricing](#long-context-pricing)[Fast mode pricing](#fast-mode-pricing)[Other costs to consider](#other-costs-to-consider)[Tool use](#tool-use)[Web search](#web-search)[Web fetch](#web-fetch)[Code execution](#code-execution)[Computer use](#computer-use)[Data residency](#data-residency)[Rate limits](#rate-limits)[Billing and payment](#billing-and-payment)[Tips to reduce your Claude API costs](#tips-to-reduce-your-claude-api-costs)[The free alternative: Puter.js](#the-free-alternative-puterjs)[Try it now](#try-it-now)[Why developers choose Puter.js over direct API access](#why-developers-choose-puterjs-over-direct-api-access)[Related](#related)

This guide breaks down everything you need to know about Claude API pricing â every model, every tier, and every discount. Whether you're budgeting for a side project or planning enterprise-scale usage, you'll find the exact numbers here.

At the end, we'll also show you how to access Claude models for free using [Puter.js](https://developer.puter.com): no API keys, no billing setup, no cost to you as a developer. Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate AI capabilities into their applications while each user will cover their own usage costs.

## How Claude API pricing works

[Anthropic](/ai/anthropic/) charges based on  **tokens**  â the pieces of text the model reads and generates. As a rough estimate, 1 token is approximately 4 characters or 0.75 words in English. You're billed separately for:

- **Input tokens** : the text you send to the model (your prompt, system instructions, conversation history)
- **Output tokens** : the text the model generates in response

All prices below are per  **million tokens**  (MTok) in USD.

## Model pricing

Anthropic offers three tiers of Claude models, each with different price-to-performance tradeoffs:

### Current models

| Model | Input | Output | Context Window | Max Output |
| --- | --- | --- | --- | --- |
| **Claude Opus 4.7** | $5 / MTok | $25 / MTok | 1M | 128K tokens |
| **Claude Opus 4.6** | $5 / MTok | $25 / MTok | 1M | 128K tokens |
| **Claude Sonnet 4.6** | $3 / MTok | $15 / MTok | 1M | 64K tokens |
| **Claude Haiku 4.5** | $1 / MTok | $5 / MTok | 200K | 64K tokens |

> **Note:**  Claude Opus 4.7 uses a new tokenizer that may use up to 35% more tokens for the same text compared to previous models, which can affect effective costs.

### Legacy models (still available)

| Model | Input | Output | Context Window | Max Output |
| --- | --- | --- | --- | --- |
| Claude Opus 4.5 | $5 / MTok | $25 / MTok | 200K | 64K tokens |
| Claude Opus 4.1 | $15 / MTok | $75 / MTok | 200K | 32K tokens |
| Claude Opus 4 (deprecated) | $15 / MTok | $75 / MTok | 200K | 32K tokens |
| Claude Sonnet 4.5 | $3 / MTok | $15 / MTok | 200K | 64K tokens |
| Claude Sonnet 4 (deprecated) | $3 / MTok | $15 / MTok | 200K | 64K tokens |
| Claude Haiku 3.5 (retired, except on Bedrock/Vertex AI) | $0.80 / MTok | $4 / MTok | 200K | â |

### Which model should you choose?

- **Claude Opus 4.7**  â The latest and most capable model. Best for complex reasoning, research, multi-step analysis, and code generation. Uses a new tokenizer for improved performance (may use up to 35% more tokens for the same text).
- **[Claude Opus 4.6](/ai/anthropic/claude-opus-4-6/)**  â Previous flagship model. Still excellent for complex reasoning at the same price as Opus 4.7.
- **[Claude Sonnet 4.6](/ai/anthropic/claude-sonnet-4-6/)**  â The sweet spot for most applications. Strong reasoning at a moderate price. Best default choice for chatbots, content generation, and general-purpose tasks.
- **[Claude Haiku 4.5](/ai/anthropic/claude-haiku-4-5/)**  â Fastest and cheapest. Ideal for high-volume, low-complexity tasks like classification, entity extraction, short summaries, and routing decisions.

For most developers starting out,  **Sonnet 4.6 is the best value** . It's 40% cheaper than Opus on input tokens and 40% cheaper on output tokens, while still being highly capable.

### What does this cost in practice?

To give you a sense of real-world costs with Claude Sonnet 4.6 ($3 input / $15 output per MTok):

| Use Case | Approx. Tokens | Estimated Cost |
| --- | --- | --- |
| Single chat message (500 in / 500 out) | 1,000 | $0.009 |
| Summarize a 10-page document | ~5,000 in / 500 out | $0.02 |
| Analyze a 50-page PDF | ~25,000 in / 2,000 out | $0.11 |
| Process 1,000 customer support tickets | ~3.7M total | $37.00 |
| 10,000 short API calls / day (30 days) | ~300M/month | ~$2,700/month |

Costs scale linearly with usage. For high-volume applications, this adds up fast.

### Claude vs GPT vs Gemini: price comparison

How does Claude stack up against competing models at similar capability tiers?

| Model | Input | Output | Context Window |
| --- | --- | --- | --- |
| **Claude Sonnet 4.6** | $3 / MTok | $15 / MTok | 200K |
| [GPT-4o](/ai/openai/gpt-4o/) | $2.50 / MTok | $10 / MTok | 128K |
| [Gemini 2.5 Pro](/ai/google/gemini-2.5-pro/) | $1.25â$2.50 / MTok | $10â$15 / MTok | 1M |
| **Claude Haiku 4.5** | $1 / MTok | $5 / MTok | 200K |
| [GPT-4o mini](/ai/openai/gpt-4o-mini/) | $0.15 / MTok | $0.60 / MTok | 128K |
| [Gemini 2.5 Flash](/ai/google/gemini-2.5-flash/) | $0.15â$0.30 / MTok | $0.60â$3.50 / MTok | 1M |
| **Claude Opus 4.7** | $5 / MTok | $25 / MTok | 1M |
| [OpenAI o3](/ai/openai/o3/) | $10 / MTok | $40 / MTok | 200K |

Claude's pricing is competitive with [OpenAI](/ai/openai/) and [Google](/ai/google/), though the best value depends on your specific use case. Claude tends to excel at nuanced writing, following complex instructions, and code generation.

## Batch API pricing (50% off)

If your workload doesn't need real-time responses, the Batch API processes requests asynchronously at half the standard price:

| Model | Batch Input | Batch Output |
| --- | --- | --- |
| Claude Opus 4.7 | $2.50 / MTok | $12.50 / MTok |
| Claude Opus 4.6 | $2.50 / MTok | $12.50 / MTok |
| Claude Opus 4.5 | $2.50 / MTok | $12.50 / MTok |
| Claude Opus 4.1 | $7.50 / MTok | $37.50 / MTok |
| Claude Sonnet 4.6 | $1.50 / MTok | $7.50 / MTok |
| Claude Sonnet 4.5 | $1.50 / MTok | $7.50 / MTok |
| Claude Haiku 4.5 | $0.50 / MTok | $2.50 / MTok |

The Batch API is ideal for bulk processing tasks like document analysis, data extraction, or content moderation where you can tolerate some latency.

## Prompt caching pricing

Prompt caching reduces costs by reusing previously processed parts of your prompt (like system instructions or large documents) across API calls. Instead of re-reading the same content every time, Claude reads it from cache at a fraction of the price.

There are two ways to enable caching:  **automatic caching**  (add a single `cache_control` field at the top level â recommended for most use cases) and  **explicit cache breakpoints**  (place `cache_control` on individual content blocks for fine-grained control).

| Cache Operation | Price Multiplier | Duration |
| --- | --- | --- |
| 5-minute cache write | 1.25x base input price | 5 minutes |
| 1-hour cache write | 2x base input price | 1 hour |
| Cache read (hit) | 0.1x base input price | Same as write |

These multipliers stack with other pricing modifiers, including the Batch API discount and data residency.

A cache hit costs just  **10% of the standard input price** . For example, with Claude Sonnet 4.6:

- Standard input: $3 / MTok
- Cache hit: $0.30 / MTok

If you have a large system prompt that you send with every request, caching pays for itself after just one reuse (for 5-minute cache) or two reuses (for 1-hour cache).

## Long context pricing

Claude Opus 4.7, Opus 4.6, and Sonnet 4.6 include the full  **1M token context window at standard pricing**  â there is no premium for long context. A 900K-token request is billed at the same per-token rate as a 9K-token request. Prompt caching and batch processing discounts also apply at standard rates across the full context window.

## Fast mode pricing

Claude Opus 4.7 and Opus 4.6 offer a fast mode (beta / research preview) with significantly faster output at 6x standard rates:

|  | Input | Output |
| --- | --- | --- |
| **Fast mode** | $30 / MTok | $150 / MTok |

Fast mode pricing stacks with prompt caching and data residency multipliers. Fast mode is  **not**  available with the Batch API.

## Other costs to consider

### Tool use

Tool definitions, tool calls, and tool results all count as tokens and are priced at standard rates. Each tool-enabled request adds ~346 tokens of system prompt overhead.

### Web search

$10 per 1,000 searches, plus standard token costs for search-generated content. Failed searches are not billed.

### Web fetch

No additional charges beyond standard token costs. You only pay for the fetched content that becomes part of your conversation context. Use the `max_content_tokens` parameter to limit how much content is fetched.

### Code execution

Code execution is  **free when used with web search or web fetch** . When used standalone, it's billed by execution time with a 5-minute minimum. Each organization gets  **1,550 free hours/month** ; additional usage is $0.05/hour per container.

### Computer use

Standard tool use pricing applies. The computer use beta adds 466â499 tokens to the system prompt, plus 735 tokens per tool definition for Claude 4.x models. Screenshots count as vision tokens.

### Data residency

For Claude Opus 4.6, Sonnet 4.6, and later models, specifying US-only inference (`inference_geo: "us"`) adds a 1.1x multiplier on all token pricing (input, output, cache writes, and cache reads). Global routing (default) uses standard pricing.

## Rate limits

Anthropic uses a tiered rate limit system. Higher tiers unlock more capacity:

| Tier | How to Qualify |
| --- | --- |
| Tier 1 | Entry-level (new accounts) |
| Tier 2 | Growing applications |
| Tier 3 | Established applications |
| Tier 4 | High-volume (1M context beta access) |
| Enterprise | Custom limits via sales |

Rate limits are per-organization and apply to both requests per minute and tokens per minute. If you hit a rate limit, you'll get a 429 error and need to wait or upgrade your tier.

## Billing and payment

For developers using the Claude API directly, the billing and payment is as follows:

- Billed monthly based on actual usage
- Payments in USD
- Credit card required to start (no free tier for sustained use)
- New accounts receive a small amount of free credits for testing
- Enterprise customers can arrange invoicing
- Usage tracking available in the [Claude Platform](https://platform.claude.com/)

## Tips to reduce your Claude API costs

If you're using the Claude API directly, here are practical ways to keep your bill down:

1. **Start with Haiku, upgrade as needed.**  Many tasks (classification, extraction, simple Q&A) don't need Opus-level reasoning. Use Haiku 4.5 at $1/$5 per MTok and only move up when quality demands it.
2. **Use prompt caching aggressively.**  If you're sending the same system prompt or reference documents with every request, enable caching. A 5-minute cache write costs 1.25x once, but every subsequent hit costs just 0.1x â a 90% discount on cached tokens.
3. **Batch non-urgent work.**  Document processing, data extraction, content moderation, and analytics can all use the Batch API at 50% off. If you don't need results in real-time, there's no reason to pay full price.
4. **Trim your inputs.**  Every token you send costs money. Remove unnecessary conversation history, compress system prompts, and avoid sending entire documents when a relevant excerpt will do.
5. **Set max output tokens.**  Use the `max_tokens` parameter to cap response length. This prevents the model from generating unnecessarily long responses and keeps costs predictable.
6. **Monitor usage in the Console.**  Anthropic's usage dashboard shows token consumption by model, so you can spot unexpected spikes before they become expensive surprises.

## The free alternative: Puter.js

If you're a developer building an app that uses Claude, there's a way to skip all of the above â no API keys, no billing setup, no rate limit management, and no cost to you.

[Puter.js](https://developer.puter.com) is a JavaScript SDK that gives you access to [Claude and 400+ other AI models](/ai/) directly from your frontend code. It uses a ["User-Pays" model](https://docs.puter.com/user-pays-model/): each user of your app covers their own AI usage through their Puter account. You, the developer, pay nothing.

Here's what that means in practice:

|  | Claude API (Direct) | Puter.js |
| --- | --- | --- |
| **Cost to developer** | Pay per token | Free |
| **API key required** | Yes | No |
| **Billing setup** | Credit card required | None |
| **Rate limits** | Per-organization tiers | Per-user (handled by Puter) |
| **Backend required** | Yes (to protect your key) | No |
| **Models available** | Claude only | Claude + GPT + Gemini + 500 more |

### Try it now

Add one script tag to your HTML and start using Claude immediately:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain quantum computing in simple terms", {
            model: "claude-sonnet-4-6"
        }).then(response => {
            document.body.innerHTML = response.message.content[0].text;
        });
    </script>
</body>
</html>
```

No API key. No backend. No billing. You can also use Claude Opus 4.7, Claude Opus 4.6, Claude Haiku 4.5, and every other Claude model the same way.

You can also stream responses for a better user experience:

```html
<html>
<body>
    <div id="output"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const response = await puter.ai.chat("Write a short poem about coding", {
                model: "claude-sonnet-4-6",
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
- **Access every AI provider** : Switch between Claude, GPT, Gemini, Grok, DeepSeek, and more with one line of code â no separate accounts or billing for each
- **Ship faster** : Go from idea to production in minutes, not days of billing setup and backend configuration

---

## Related

- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [How to Get an Anthropic (Claude) API Key](/tutorials/how-to-get-anthropic-api-key/)
- [OpenAI API Pricing](/tutorials/openai-api-pricing/)
- [Gemini API Pricing](/tutorials/gemini-api-pricing/)
- [Grok API Pricing](/tutorials/grok-api-pricing/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free LLM API](/tutorials/free-llm-api/)
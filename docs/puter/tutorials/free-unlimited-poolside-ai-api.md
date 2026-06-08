# Free, Unlimited Poolside AI API

Source: https://developer.puter.com/tutorials/free-unlimited-poolside-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited Poolside AI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 30, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Code generation with Laguna M.1](#example-1-code-generation-with-laguna-m1)[Example 2: Multi-step engineering tasks](#example-2-multi-step-engineering-tasks)[Example 3: Lightweight coding with Laguna XS.2](#example-3-lightweight-coding-with-laguna-xs2)[Example 4: Streaming responses with reasoning](#example-4-streaming-responses-with-reasoning)[List of supported models](#list-of-supported-models)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Poolside](/ai/poolside/)'s [Laguna M.1](/ai/poolside/laguna-m.1/) and [Laguna XS.2](/ai/poolside/laguna-xs.2/) agentic coding models for free, without needing API keys, backend, or server-side setup. Puter.js allows you to provide your users with powerful AI coding capabilities.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate [AI capabilities](/ai/) into their applications while each user covers their own usage costs. This model enables developers to offer advanced AI capabilities to users at no cost to themselves, without any API keys or server-side setup.

## Getting Started

To use Puter.js, import our [NPM library](https://www.npmjs.com/package/@heyputer/puter.js) in your project:

```js
// npm install @heyputer/puter.js
import { puter } from '@heyputer/puter.js';
```

Or alternatively, add our script via CDN if you are working directly with HTML, simply add it to the `<head>` or `<body>` section of your code:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

Nothing else is required to start using Puter.js for free access to Poolside's Laguna models.

## Example 1: Code generation with Laguna M.1

To generate code using Laguna M.1, Poolside's flagship 225B-parameter Mixture-of-Experts agentic coding model, use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat(
    "Write a TypeScript function that debounces an async function and cancels in-flight calls when a newer one starts",
    { model: "poolside/laguna-m.1:free" }
).then(response => {
    puter.print(response, {code: true});
});
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a TypeScript function that debounces an async function and cancels in-flight calls when a newer one starts",
            { model: "poolside/laguna-m.1:free" }
        ).then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Example 2: Multi-step engineering tasks

Laguna M.1 is purpose-built for agentic workflows â planning across multiple files, reasoning about failures, and iterating end to end. Here's how to ask it to trace and fix a real-world bug:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Trace how a webhook flows through a queue worker into the database, identify any places retries could double-write, and propose a fix with code.",
            { model: "poolside/laguna-m.1:free" }
        ).then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

This example shows Laguna M.1's ability to reason across system boundaries â exactly what makes it score 72.5% on SWE-bench Verified and 46.9% on SWE-bench Pro.

## Example 3: Lightweight coding with Laguna XS.2

Laguna XS.2 is Poolside's compact open-weight model â 33B total parameters with only 3B activated per token. It's a great fit for fast, low-cost coding assistance:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a Python script that walks a monorepo, finds all package.json files, and generates a dependency graph as a Mermaid diagram.",
            { model: "poolside/laguna-xs.2:free" }
        ).then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

Despite its small footprint, Laguna XS.2 hits 68.2% on SWE-bench Verified, nearly matching the flagship.

## Example 4: Streaming responses with reasoning

For long, agentic responses, you can stream tokens (and reasoning traces) in real-time:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const response = await puter.ai.chat(
                "Design a leader-election protocol for a 5-node cluster that tolerates network partitions, and walk through the trade-offs.",
                { model: "poolside/laguna-m.1:free", stream: true }
            );

            for await (const part of response) {
                if (part?.reasoning) puter.print(part.reasoning.replaceAll('\n', '<br>'));
                else if (part?.text) puter.print(part.text.replaceAll('\n', '<br>'));
            }
        })();
    </script>
</body>
</html>
```

This example demonstrates streaming with Laguna's native reasoning â you see the model's thought process as it works toward the answer.

## List of supported models

The following Poolside models are supported by Puter.js:

```javascript
poolside/laguna-m.1:free
poolside/laguna-xs.2:free
```

That's it! You now have free access to Poolside's Laguna agentic coding models using Puter.js. This allows you to build sophisticated coding assistants and agentic developer tools with frontier-tier capabilities â no API keys, backend infrastructure, or billing setup required.

## Related

- [Free, Unlimited Codex API](/tutorials/free-unlimited-codex-api/)
- [Free, Unlimited Kwaipilot Kat API](/tutorials/free-unlimited-kwaipilot-kat-api/)
- [Free, Unlimited Relace AI API](/tutorials/free-unlimited-relace-ai-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Kimi K2.6 API](/tutorials/free-unlimited-kimi-k2-api/)
- [Free, Unlimited Z.AI GLM API](/tutorials/free-unlimited-zai-glm-api/)
- [Use Claude Code with Puter](/tutorials/use-claude-code-with-puter/)
- [Use Cline with Puter](/tutorials/use-cline-with-puter/)
- [Use OpenHands with Puter](/tutorials/use-openhands-with-puter/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
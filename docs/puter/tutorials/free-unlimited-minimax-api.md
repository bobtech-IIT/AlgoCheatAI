# Free, Unlimited MiniMax API

Source: https://developer.puter.com/tutorials/free-unlimited-minimax-api/

[Tutorials](/tutorials/)

# Free, Unlimited MiniMax API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: June 2, 2026
                                    

On this page[Code with MiniMax M3](#code-with-minimax-m3)[Code with MiniMax M2.7](#code-with-minimax-m27)[Code with MiniMax M2.7 Highspeed](#code-with-minimax-m27-highspeed)[Code with MiniMax M2.5](#code-with-minimax-m25)[Code with MiniMax M2.5 Highspeed](#code-with-minimax-m25-highspeed)[Code with MiniMax M2.1](#code-with-minimax-m21)[Code with MiniMax M2.1 Highspeed](#code-with-minimax-m21-highspeed)[Chat with MiniMax M2-her](#chat-with-minimax-m2-her)[Code with MiniMax M2](#code-with-minimax-m2)[Code with MiniMax M1](#code-with-minimax-m1)[Image analysis with MiniMax-01](#image-analysis-with-minimax-01)[List of Models](#list-of-models)[Conclusion](#conclusion)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to add [MiniMax models](/ai/minimax/) to your app completely free, without any API keys.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI or server usage.

To use Puter.js, import our [NPM library](https://www.npmjs.com/package/@heyputer/puter.js) in your project:

```js
// npm install @heyputer/puter.js
import { puter } from '@heyputer/puter.js';
```

Or alternatively, add our script via CDN if you are working directly with HTML, simply add it to the `<head>` or `<body>` section of your code:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

Nothing else is required to start using Puter.js for free access to MiniMax models and capabilities.

## Code with MiniMax M3

[MiniMax M3](/ai/minimax/minimax-m3/) is a frontier-level multimodal model built for long-horizon coding, agentic workflows, and complex reasoning. Its MiniMax Sparse Attention (MSA) keeps decoding fast across a 1M-token context, making it ideal for coding agents, long-document pipelines, and multi-step automation that run for hours.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Build a CLI tool in Go that watches a directory, debounces file changes, and runs a configurable build command. Include graceful shutdown, structured logging, and unit tests.",
            { model: "minimax/minimax-m3" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Code with MiniMax M2.7

[MiniMax M2.7](/ai/minimax/minimax-m2.7/) is a reasoning LLM notable for being one of the first commercial models to actively participate in its own training through autonomous self-evolution loops. It excels at agentic coding workflows with a 56.2% score on SWE-Pro and targets developers building complex agent systems and automated workflows.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Design a multi-agent system architecture where one agent scrapes product data, another agent validates and cleans it, and a coordinator agent manages retries and error handling. Provide the full implementation in Python.",
            { model: "minimax/minimax-m2.7" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Code with MiniMax M2.7 Highspeed

[MiniMax M2.7 Highspeed](/ai/minimax/minimax-m2.7-highspeed/) is a latency-optimized variant of M2.7, running at roughly 100 tokens per second (about 66% faster) while sharing the same weights and output quality. It's ideal for live coding assistants and autonomous agent loops where low latency matters. Use streaming to surface tokens as they arrive:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamFast() {
            const response = await puter.ai.chat(
                "Implement a rate limiter in TypeScript using the token bucket algorithm, with configurable capacity and refill rate.",
                { model: "minimax/minimax-m2.7-highspeed", stream: true }
            );

            for await (const part of response) {
                puter.print(part?.text);
            }
        }

        streamFast();
    </script>
</body>
</html>
```

## Code with MiniMax M2.5

[MiniMax M2.5](/ai/minimax/minimax-m2.5/) is the state-of-the-art model from MiniMax, scoring 80.2% on SWE-Bench Verified and 76.8% on BFCL Multi-Turn. It excels at agentic coding, tool use, and real-world software engineering tasks.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Review this code and refactor it into a production-ready Express middleware with proper error handling, input validation, and TypeScript types:\n\napp.post('/users', (req, res) => { db.query('INSERT INTO users SET ?', req.body, (err, result) => { res.json(result) }) })",
            { model: "minimax/minimax-m2.5" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Code with MiniMax M2.5 Highspeed

[MiniMax M2.5 Highspeed](/ai/minimax/minimax-m2.5-highspeed/) is an inference-optimized variant of M2.5 that delivers the same top-tier coding intelligence (80.2% SWE-Bench Verified) at roughly 100 tokens per second. It's the practical choice for latency-sensitive interactive apps and high-frequency agentic pipelines where responsiveness matters as much as quality:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a production-ready Python function that retries a flaky HTTP request with exponential backoff and jitter, using only the standard library.",
            { model: "minimax/minimax-m2.5-highspeed" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Code with MiniMax M2.1

[MiniMax M2.1](/ai/minimax/minimax-m2.1/) is an enhanced version of M2. It matches or exceeds Claude [Sonnet](/ai/sonnet/) 4.5 on coding benchmarks.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a TypeScript function that debounces async API calls with abort controller support and a configurable timeout",
            { model: "minimax/minimax-m2.1" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Code with MiniMax M2.1 Highspeed

[MiniMax M2.1 Highspeed](/ai/minimax/minimax-m2.1-highspeed/) is a latency-optimized variant of M2.1, running about 1.7x faster (~100 tokens per second) while preserving the same architecture and output quality. It reduces time-to-first-token under concurrent load and supports automatic prompt caching, making it well-suited for live coding assistants and multi-turn agent pipelines:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a TypeScript function that debounces async API calls with abort controller support and a configurable timeout",
            { model: "minimax/minimax-m2.1-highspeed" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Chat with MiniMax M2-her

[MiniMax M2-her](/ai/minimax/minimax-m2-her/) is optimized for dialogue. It excels in immersive roleplay, multi-turn conversations, and storytelling.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "You are a wise wizard named Merlin. Greet a young apprentice.",
            { model: "minimax/minimax-m2-her" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Code with MiniMax M2

[MiniMax M2](/ai/minimax/minimax-m2/) excels in code generation tasks. Here's how to use it for writing code:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a Python function that implements a binary search tree with insert and search methods",
            { model: "minimax/minimax-m2" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Code with MiniMax M1

[MiniMax M1](/ai/minimax/minimax-m1/) is optimized for handling long contexts. Use streaming for better performance with longer inputs:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamLongContext() {
            const response = await puter.ai.chat(
                "Explain the history of artificial intelligence in detail, covering its origins, major milestones, key figures, and future prospects",
                { model: "minimax/minimax-m1", stream: true }
            );

            for await (const part of response) {
                puter.print(part?.text);
            }
        }

        streamLongContext();
    </script>
</body>
</html>
```

## Image analysis with MiniMax-01

[MiniMax-01](/ai/minimax/minimax-01/) supports multimodal inputs. You can use it for text generation or image analysis:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "What do you see in this image?",
            "https://assets.puter.site/doge.jpeg",
            { model: 'minimax/minimax-01' }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## List of Models

The following MiniMax models are supported by Puter.js:

```javascript
minimax/minimax-m3
minimax/minimax-m2.7
minimax/minimax-m2.7-highspeed
minimax/minimax-m2.5
minimax/minimax-m2.5-highspeed
minimax/minimax-m2.1
minimax/minimax-m2.1-highspeed
minimax/minimax-m2-her
minimax/minimax-m2
minimax/minimax-m1
minimax/minimax-01
```

## Conclusion

Using Puter.js, you can gain access to MiniMax models without having to set up the AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Qwen API](/tutorials/free-unlimited-qwen-api/)
- [Free, Unlimited Alibaba AI API](/tutorials/free-unlimited-alibaba-ai-api/)
- [Free, Unlimited Z.AI GLM API](/tutorials/free-unlimited-zai-glm-api/)
- [Free, Unlimited ByteDance Seed API](/tutorials/free-unlimited-bytedance-seed-api/)
- [Free, Unlimited Xiaomi MiMo API](/tutorials/free-unlimited-xiaomi-mimo-api/)
- [Free, Unlimited Tencent Hunyuan API](/tutorials/free-unlimited-tencent-hunyuan-api/)
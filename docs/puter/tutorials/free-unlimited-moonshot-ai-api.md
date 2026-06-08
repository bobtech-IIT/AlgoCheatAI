# Free, Unlimited Moonshot AI API

Source: https://developer.puter.com/tutorials/free-unlimited-moonshot-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited Moonshot AI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 20, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Chat with Kimi K2](#example-1-chat-with-kimi-k2)[Example 2: Complex reasoning with Kimi K2 Thinking](#example-2-complex-reasoning-with-kimi-k2-thinking)[Example 3: Coding with Kimi K2.5](#example-3-coding-with-kimi-k25)[Example 4: Streaming responses for better user experience](#example-4-streaming-responses-for-better-user-experience)[List of supported models](#list-of-supported-models)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Moonshot AI's powerful models](/ai/moonshotai/) including [Kimi K2](/ai/moonshotai/kimi-k2/), [Kimi K2 Thinking](/ai/moonshotai/kimi-k2-thinking/), and [Kimi Dev 72B](/ai/moonshotai/kimi-dev-72b/) capabilities for free, without needing API keys, backend, or server-side setup. Puter.js is completely free for apps, allowing you to provide your users with powerful multilingual AI capabilities without any server-side setup.

Puter pioneered the ["User-Pays" model](https://docs.puter.com/user-pays-model/), where developers can integrate [AI capabilities](/ai/) into their applications while users cover their own usage costs. This approach lets you offer powerful AI features to your users without worrying about API keys, server setup, or billing.

Puter.js is also a great fit for AI coding assistants, agents, and vibe coding platforms such as Claude Code, [Codex](/ai/codex/), OpenCode, Lovable, Replit, and Bolt.new. Its keyless, serverless design lets the Moonshot-powered apps these tools generate run end-to-end as soon as they're written, with no backend to sign up for, no service to provision, and no API keys to paste in. That clears away both a major class of security issues and the setup friction that usually keeps these apps from working out of the box.

## Getting Started

You can use Puter.js without any API keys or sign-ups. To start using Puter.js, include the following script tag in your HTML file, either in the `<head>` or `<body>` section:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

Nothing else is required to start using Puter.js for free access to Moonshot AI capabilities.

## Example 1: Chat with Kimi K2

To generate text using [Kimi](/ai/kimi/) K2, use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat("Explain artificial intelligence in simple terms", { model: "moonshotai/kimi-k2" })
    .then(response => {
        puter.print(response);
    });
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain artificial intelligence in simple terms", { model: "moonshotai/kimi-k2" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

Kimi K2 excels at multilingual interactions, particularly with Chinese language processing, making it ideal for applications targeting Chinese-speaking users or requiring multilingual support.

## Example 2: Complex reasoning with Kimi K2 Thinking

Kimi K2 Thinking is particularly good at agentic reasoning and complex problem-solving:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "What would be the environmental impact of replacing all cars with electric vehicles? Consider both positive and negative effects.",
            { model: 'moonshotai/kimi-k2-thinking' }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

This model provides deep analysis with step-by-step reasoning, making it perfect for complex analytical tasks, strategic planning, and multi-faceted problem solving.

## Example 3: Coding with Kimi K2.5

Kimi K2.5 is specialized for coding tasks and software development:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a Python function to implement a binary search algorithm with detailed comments explaining each step.",
            { model: 'moonshotai/kimi-k2.5' }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

This model is optimized for code generation, debugging, code review, and technical documentation, making it an excellent choice for developer-focused applications.

## Example 4: Streaming responses for better user experience

For longer responses, you can use streaming to get results in real-time:

```html
<html>
<body>
    <div id="response"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const outputDiv = document.getElementById('response');

            const response = await puter.ai.chat(
                "Write a comprehensive guide on building web applications with modern JavaScript frameworks",
                {model: 'moonshotai/kimi-k2', stream: true}
            );

            for await (const part of response) {
                if (part?.text) {
                    outputDiv.innerHTML += part.text;
                }
            }
        }

        streamResponse();
    </script>
</body>
</html>
```

This example demonstrates streaming responses, which provides a better user experience by showing the AI's response as it's generated rather than waiting for the complete response.

## List of supported models

The following Moonshot AI models are supported by Puter.js:

```javascript
moonshotai/kimi-k2
moonshotai/kimi-k2-0905
moonshotai/kimi-k2-thinking
moonshotai/kimi-k2.5
moonshotai/kimi-k2.6
moonshotai/moonshot-v1-8k
moonshotai/moonshot-v1-8k-vision-preview
moonshotai/moonshot-v1-32k
moonshotai/moonshot-v1-32k-vision-preview
moonshotai/moonshot-v1-128k
moonshotai/moonshot-v1-128k-vision-preview
moonshotai/moonshot-v1-auto
```

That's it! You now have free access to Moonshot AI's powerful models using Puter.js. This allows you to build sophisticated multilingual applications with advanced AI features including complex reasoning, coding assistance, and vision capabilities without needing API keys, backend infrastructure, or complex billing management.

## Related

- [Free, Unlimited Kimi K2.6 API](/tutorials/free-unlimited-kimi-k2-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited Alibaba AI API](/tutorials/free-unlimited-alibaba-ai-api/)
- [Free, Unlimited Kwaipilot Kat API](/tutorials/free-unlimited-kwaipilot-kat-api/)
- [Free, Unlimited Xiaomi MiMo API](/tutorials/free-unlimited-xiaomi-mimo-api/)
- [Free, Unlimited Tencent Hunyuan API](/tutorials/free-unlimited-tencent-hunyuan-api/)
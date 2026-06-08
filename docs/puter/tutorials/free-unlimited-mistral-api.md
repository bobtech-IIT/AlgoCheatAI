# Free, Unlimited Mistral API

Source: https://developer.puter.com/tutorials/free-unlimited-mistral-api/

[Tutorials](/tutorials/)

# Free, Unlimited Mistral API

[Nariman Jelveh](/author/jelveh/), [Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 20, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Text Generation with Mistral Large 3](#example-1-basic-text-generation-with-mistral-large-3)[Example 3: Code Generation with Codestral](#example-3-code-generation-with-codestral)[Example 4: Agentic Coding with Mistral Medium 3.5](#example-4-agentic-coding-with-mistral-medium-35)[Example 3: Streaming Responses for Longer Content](#example-3-streaming-responses-for-longer-content)[Example 4: Using Different Mistral Models](#example-4-using-different-mistral-models)[Available Mistral Models](#available-mistral-models)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Mistral's powerful AI models](/ai/mistralai/) for free, without any API keys. Using Puter.js, you can leverage models like [Mistral Large](/ai/mistralai/mistral-large-2512/), [Mistral Medium](/ai/mistralai/mistral-medium-3-5/), [Mistral Small](/ai/mistralai/mistral-small-2603/), [Codestral](/ai/mistralai/codestral-2508/), [Devstral](/ai/mistralai/devstral-2512/), [Magistral](/ai/mistralai/magistral-medium-2509/), [Ministral](/ai/mistralai/ministral-3b/), [Mixtral](/ai/mistralai/mixtral-8x22b-instruct/), [Pixtral](/ai/mistralai/pixtral-12b/), and [Voxtral](/ai/mistralai/voxtral-small-24b-2507/) for various tasks including text generation, code completion, and complex reasoning without worrying about usage limits or costs.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI usage.

Puter.js is also a strong fit for AI coding assistants, agents, and vibe coding platforms such as [Codex](/ai/codex/), Claude Code, OpenCode, Lovable, Replit, and Bolt.new. Because it's keyless and serverless, the Mistral-powered apps these tools generate work end-to-end without having to sign up for a third-party backend, provision a service, or paste in API keys. That eliminates a major class of security issues along with the setup friction that usually keeps these apps from running out of the box.

## Getting Started

Puter.js works without any API keys or sign-ups. To start using Puter.js, include the following script tag in your HTML file, either in the `<head>` or `<body>` section:

To use Puter.js, import our [NPM library](https://www.npmjs.com/package/@heyputer/puter.js) in your project:

```js
// npm install @heyputer/puter.js
import { puter } from '@heyputer/puter.js';
```

Or alternatively, add our script via CDN if you are working directly with HTML, simply add it to the `<head>` or `<body>` section of your code:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

You're now ready to use Puter.js for free access to Mistral capabilities. No API keys or sign-ups are required.

## Example 1: Basic Text Generation with Mistral Large 3

To generate text using Mistral Large 3, use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function with your preferred model:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain the concept of machine learning to a beginner", {
            model: 'mistralai/mistral-large-2512'
        }).then(response => {
            puter.print(response.message.content);
        });
    </script>
</body>
</html>
```

## Example 3: Code Generation with Codestral

Codestral is Mistral's specialized model for code generation. Here's how to use it:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a Python function that calculates the Fibonacci sequence up to n terms", 
            {model: 'mistralai/codestral-2508'}
        ).then(response => {
            puter.print(response.message.content, {code: true});
        });
    </script>
</body>
</html>
```

## Example 4: Agentic Coding with Mistral Medium 3.5

Mistral Medium 3.5 is a 128B-parameter multimodal model that unifies instruction-following, reasoning, and coding, scoring 77.6% on SWE-Bench Verified.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Create a simple to-do list app in a single HTML file with add, delete, and mark complete features", 
            {model: 'mistralai/mistral-medium-3-5'}
        ).then(response => {
            puter.print(response.message.content, {code: true});
        });
    </script>
</body>
</html>
```

## Example 3: Streaming Responses for Longer Content

For longer responses, use streaming to get results in real-time:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const response = await puter.ai.chat(
                "Write a comprehensive guide on sustainable living practices", 
                {
                    model: 'mistralai/mistral-large-2512',
                    stream: true
                }
            );
            
            for await (const part of response) {
                if (part?.text) {
                    puter.print(part.text);
                }
            }
        })();
    </script>
</body>
</html>
```

## Example 4: Using Different Mistral Models

Mistral offers various models optimized for different use cases. Here's how to use them:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Mistral Large 3 - Best for complex tasks
        puter.ai.chat(
            "Analyze the economic implications of renewable energy adoption",
            { model: "mistralai/mistral-large-2512" }
        ).then(response => {
            puter.print("<h2>Mistral Large 3 Response:</h2>");
            puter.print(response.message.content);
        });

        // Mistral Medium 3.5 - Balanced performance
        puter.ai.chat(
```

Show 27 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Mistral Large 3 - Best for complex tasks
        puter.ai.chat(
            "Analyze the economic implications of renewable energy adoption",
            { model: "mistralai/mistral-large-2512" }
        ).then(response => {
            puter.print("<h2>Mistral Large 3 Response:</h2>");
            puter.print(response.message.content);
        });

        // Mistral Medium 3.5 - Balanced performance
        puter.ai.chat(
            "Summarize the key points of climate change",
            { model: "mistralai/mistral-medium-3-5" }
        ).then(response => {
            puter.print("<h2>Mistral Medium 3.5 Response:</h2>");
            puter.print(response.message.content);
        });

        // Mistral Small 4 - Fast and efficient
        puter.ai.chat(
            "What are the benefits of regular exercise?",
            { model: "mistralai/mistral-small-2603" }
        ).then(response => {
            puter.print("<h2>Mistral Small 4 Response:</h2>");
            puter.print(response.message.content);
        });

        // Ministral 8B - Lightweight model
        puter.ai.chat(
            "Explain photosynthesis in simple terms",
            { model: "mistralai/ministral-8b-2512" }
        ).then(response => {
            puter.print("<h2>Ministral 8B Response:</h2>");
            puter.print(response.message.content);
        });
    </script>
</body>
</html>
```

Collapse code

## Available Mistral Models

Puter.js provides access to the following Mistral models:

```javascript
mistralai/mistral-medium-3-5
mistralai/mistral-small-2603
mistralai/ministral-14b-2512
mistralai/devstral-2512
mistralai/mistral-medium-2508
mistralai/mistral-medium-3.1
mistralai/voxtral-small-2507
mistralai/voxtral-small-24b-2507
mistralai/mistral-small-3.2-24b-instruct
mistralai/mistral-small-3.1-24b-instruct
mistralai/magistral-medium-2509
mistralai/magistral-small-2509
mistralai/mistral-saba
mistralai/mistral-large-2512
mistralai/ministral-3b
mistralai/ministral-8b
mistralai/ministral-3b-2512
mistralai/ministral-8b-2512
mistralai/pixtral-12b
mistralai/mistral-large-2407
mistralai/codestral-2508
mistralai/mistral-7b-instruct-v0.3
mistralai/mixtral-8x22b-instruct
mistralai/mistral-7b-instruct-v0.2
mistralai/mistral-tiny
mistralai/mistral-7b-instruct
```

That's it! You now have free, unlimited access to Mistral's powerful AI models using Puter.js. This allows you to leverage advanced language understanding, generation, and coding capabilities without worrying about API keys or usage limits.

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited Gemma API](/tutorials/free-unlimited-gemma-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Perplexity AI API](/tutorials/free-unlimited-perplexity-ai-api/)
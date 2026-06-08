# Free, Unlimited Codex API

Source: https://developer.puter.com/tutorials/free-unlimited-codex-api/

[Tutorials](/tutorials/)

# Free, Unlimited Codex API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 17, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic code generation](#example-1-basic-code-generation)[Example 2: Maximum performance with Codex Max](#example-2-maximum-performance-with-codex-max)[Example 3: Efficient code generation with Codex Mini](#example-3-efficient-code-generation-with-codex-mini)[List of Codex models](#list-of-codex-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you will learn how to add [Codex](/ai/codex/) models into your application for free using Puter.js. You can gain access to models such as [GPT-5.3-Codex](/ai/openai/gpt-5.3-codex/), [GPT-5.2-Codex](/ai/openai/gpt-5.2-codex/), [GPT-5.1-Codex-Max](/ai/openai/gpt-5.1-codex-max/), [GPT-5.1-Codex](/ai/openai/gpt-5.1-codex/), and [GPT-5.1-Codex-Mini](/ai/openai/gpt-5.1-codex-mini/) by OpenAI without needing an OpenAI developer account or API key.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI or server usage.

Puter.js is also a great fit for AI coding assistants, agents, and vibe coding platforms such as Claude Code, Codex, OpenCode, Lovable, Replit, Bolt.new, and others. Since Puter.js needs no keys and no backend, AI-generated apps and programs that rely on it run end-to-end with no third-party service to sign up for, nothing to provision, and no API keys to paste in. That removes a significant category of security issues along with the setup friction that normally prevents these apps from working out of the box.

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

That's it, you're ready to start integrating Codex into your application.

## Example 1: Basic code generation

Codex excels at code generation tasks. Here's how to use it for writing code:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a Python function that implements binary search on a sorted array",
            { model: "openai/gpt-5.3-codex" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Example 2: Maximum performance with Codex Max

For the most demanding coding tasks, use GPT-5.1-Codex-Max:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a Python function that implements binary search on a sorted array",
            { model: "openai/gpt-5.1-codex-max" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Example 3: Efficient code generation with Codex Mini

For faster responses on simpler tasks, use GPT-5.1-Codex-Mini:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a Python function that implements binary search on a sorted array",
            { model: "openai/gpt-5.1-codex-mini" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## List of Codex models

You can use the following Codex model variants with Puter.js:

```javascript
openai/gpt-5.3-codex
openai/gpt-5.2-codex
openai/gpt-5.1-codex
openai/gpt-5.1-codex-mini
openai/gpt-5.1-codex-max
openai/gpt-5-codex
```

## Conclusion

Using Puter.js, you can gain access to Codex models without needing an OpenAI developer account or API key. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Prime Intellect API](/tutorials/free-unlimited-prime-intellect-api/)
- [Free, Unlimited Poolside AI API](/tutorials/free-unlimited-poolside-ai-api/)
- [Free, Unlimited Relace AI API](/tutorials/free-unlimited-relace-ai-api/)
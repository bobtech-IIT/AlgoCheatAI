# Free, Unlimited OpenRouter API

Source: https://developer.puter.com/tutorials/free-unlimited-openrouter-api/

[Tutorials](/tutorials/)

# Free, Unlimited OpenRouter API

[Nariman Jelveh](/author/jelveh/), [Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 17, 2026
                                    

On this page[What is OpenRouter?](#what-is-openrouter)[Getting Started](#getting-started)[Example 1: Basic Text Generation with GLM 5.1](#example-1-basic-text-generation-with-glm-51)[Example 2: Streaming Responses with GPT-OSS 120B](#example-2-streaming-responses-with-gpt-oss-120b)[Example 3: Model Selection Interface](#example-3-model-selection-interface)[List of Models](#list-of-models)[Best Practices](#best-practices)[Related](#related)

This tutorial will show you how to use [Puter.js](https://docs.puter.com/) to access [OpenRouter](/encyclopedia/openrouter/)'s extensive collection of AI models for free, without any API keys or backend setup. OpenRouter is a unified API gateway that provides access to hundreds of AI models from various providers including [OpenAI](/ai/openai/), [Anthropic](/ai/anthropic/), [Meta](/ai/meta-llama/), [Google](/ai/google/), [Mistral](/ai/mistralai/), and many others.

Puter is the pioneer of the "User-Pays" model, which allows developers to incorporate [AI capabilities](/ai/) into their applications while users cover their own usage costs. This innovative approach eliminates the need for developers to manage API keys or worry about billing, making advanced AI accessible to everyone.

## What is OpenRouter?

[OpenRouter](https://openrouter.ai/) is a platform that simplifies access to a wide range of AI models through a single, unified API. It acts as a middleman between your application and various AI providers, handling the authentication and routing so you don't have to maintain multiple API keys or manage complex integrations. With OpenRouter, you can access models from OpenAI, Anthropic, Meta, Google, and many other providers through one consistent interface.

## Getting Started

Puter.js is completely serverless and works without any API keys or server-side setup. To use Puter.js, import our [NPM library](https://www.npmjs.com/package/@heyputer/puter.js) in your project:

```js
// npm install @heyputer/puter.js
import { puter } from '@heyputer/puter.js';
```

Or alternatively, add our script via CDN if you are working directly with HTML, simply add it to the `<head>` or `<body>` section of your code:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

That's it! You're now ready to use Puter.js for free access to hundreds of AI models. No API keys, backend setup, or server-side code required. Everything is handled on the frontend.

## Example 1: Basic Text Generation with GLM 5.1

Let's start with a simple example that uses Z.AI's [GLM 5.1](/ai/z-ai/glm-5.1/) model for text generation:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain quantum computing in simple terms", 
            {model: 'z-ai/glm-5.1'})
            .then(response => {
                document.body.innerHTML = response;
            });
    </script>
</body>
</html>
```

This example demonstrates how to generate text using Z.AI's [GLM 5.1](/ai/z-ai/glm-5.1/) model through OpenRouter. The model will provide a simple explanation of quantum computing, showcasing its ability to explain complex concepts in an accessible way.

## Example 2: Streaming Responses with GPT-OSS 120B

For longer responses, it's often better to stream the results. Here's how to use streaming with OpenAI's [GPT-OSS 120B](/ai/openai/gpt-oss-120b/) model:

```html
<html>
<body>
    <div id="response"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const outputDiv = document.getElementById('response');
            
            const response = await puter.ai.chat(
                "Write a short story about a robot that discovers emotions", 
                {model: 'openai/gpt-oss-120b', stream: true}
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

This example shows how to stream responses from OpenAI's GPT-OSS 120B model. Streaming is particularly useful for longer creative content like stories, where users can see the text appear in real-time rather than waiting for the entire response.

## Example 3: Model Selection Interface

Let's create a simple interface that allows users to select from different models:

```html
<html>
<body>
    <div style="max-width: 800px; margin: 20px auto; font-family: Arial, sans-serif;">
        <h1>OpenRouter Model Explorer</h1>
        <select id="model-select" style="padding: 8px; margin-bottom: 10px;">
            <option value="google/gemma-4-31b-it">Google Gemma 4 31B IT</option>
            <option value="meta-llama/llama-4-scout">Meta Llama 4 Scout</option>
            <option value="openai/gpt-oss-120b">OpenAI GPT-OSS 120B</option>
            <option value="z-ai/glm-5.1">Z.AI GLM 5.1</option>
        </select>
        <textarea id="prompt" rows="4" style="width: 100%; padding: 8px; margin-bottom: 10px;" 
            placeholder="Enter your prompt here...">Explain how solar panels work.</textarea>
        <button id="generate" style="padding: 8px 16px;">Generate</button>
        <div id="loading" style="display: none; margin-top: 10px;">Generating response...</div>
        <div id="response" style="margin-top: 20px; padding: 15px; border: 1px solid #ddd;
```

Show 31 more lines...

```html
<html>
<body>
    <div style="max-width: 800px; margin: 20px auto; font-family: Arial, sans-serif;">
        <h1>OpenRouter Model Explorer</h1>
        <select id="model-select" style="padding: 8px; margin-bottom: 10px;">
            <option value="google/gemma-4-31b-it">Google Gemma 4 31B IT</option>
            <option value="meta-llama/llama-4-scout">Meta Llama 4 Scout</option>
            <option value="openai/gpt-oss-120b">OpenAI GPT-OSS 120B</option>
            <option value="z-ai/glm-5.1">Z.AI GLM 5.1</option>
        </select>
        <textarea id="prompt" rows="4" style="width: 100%; padding: 8px; margin-bottom: 10px;" 
            placeholder="Enter your prompt here...">Explain how solar panels work.</textarea>
        <button id="generate" style="padding: 8px 16px;">Generate</button>
        <div id="loading" style="display: none; margin-top: 10px;">Generating response...</div>
        <div id="response" style="margin-top: 20px; padding: 15px; border: 1px solid #ddd; 
            border-radius: 5px; min-height: 200px;"></div>
    </div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        document.getElementById('generate').addEventListener('click', async () => {
            const modelSelect = document.getElementById('model-select');
            const promptInput = document.getElementById('prompt');
            const responseDiv = document.getElementById('response');
            const loadingDiv = document.getElementById('loading');
            
            const selectedModel = modelSelect.value;
            const prompt = promptInput.value;
            
            if (!prompt) return;
            
            responseDiv.innerHTML = '';
            loadingDiv.style.display = 'block';
            
            try {
                const response = await puter.ai.chat(prompt, {model: selectedModel});
                responseDiv.innerHTML = response;
            } catch (error) {
                responseDiv.innerHTML = `Error: ${error.message}`;
            } finally {
                loadingDiv.style.display = 'none';
            }
        });
    </script>
</body>
</html>
```

Collapse code

This example creates a simple interface where users can select from different models provided through OpenRouter and generate responses to their prompts. The interface includes a dropdown for model selection, a textarea for entering prompts, and a button to generate responses.

## List of Models

The following is a list of OpenRouter models available through Puter.js:

```javascript
ai21/jamba-large-1.7
aion-labs/aion-1.0
aion-labs/aion-1.0-mini
aion-labs/aion-2.0
aion-labs/aion-rp-llama-3.1-8b
allenai/olmo-3-32b-think
amazon/nova-2-lite-v1
amazon/nova-lite-v1
amazon/nova-micro-v1
amazon/nova-premier-v1
amazon/nova-pro-v1
anthracite-org/magnum-v4-72b
anthropic/claude-3.5-haiku
anthropic/claude-opus-4.1
anthropic/claude-opus-4.6-fast
arcee-ai/coder-large
arcee-ai/maestro-reasoning
arcee-ai/trinity-large-thinking
arcee-ai/trinity-mini
arcee-ai/virtuoso-large
baidu/ernie-4.5-vl-424b-a47b
bytedance-seed/seed-1.6
bytedance-seed/seed-1.6-flash
bytedance-seed/seed-2.0-lite
bytedance-seed/seed-2.0-mini
bytedance/ui-tars-1.5-7b
cognitivecomputations/dolphin-mistral-24b-venice-edition:free
cohere/command-a
cohere/command-r-08-2024
cohere/command-r-plus-08-2024
cohere/command-r7b-12-2024
deepseek/deepseek-chat-v3-0324
deepseek/deepseek-chat-v3.1
deepseek/deepseek-r1
deepseek/deepseek-r1-0528
deepseek/deepseek-r1-distill-llama-70b
deepseek/deepseek-r1-distill-qwen-32b
deepseek/deepseek-v3.1-terminus
deepseek/deepseek-v3.2
deepseek/deepseek-v3.2-exp
essentialai/rnj-1-instruct
google/gemini-2.5-flash
google/gemini-2.5-flash-image
google/gemini-2.5-flash-lite
google/gemini-2.5-flash-lite-preview-09-2025
google/gemini-2.5-pro
google/gemini-2.5-pro-preview
google/gemini-2.5-pro-preview-05-06
google/gemini-3-flash-preview
google/gemini-3-pro-image-preview
google/gemini-3.1-flash-image-preview
google/gemini-3.1-flash-lite
google/gemini-3.1-pro-preview
google/gemini-3.1-pro-preview-customtools
google/gemma-2-27b-it
google/gemma-3-12b-it
google/gemma-3-27b-it
google/gemma-3-4b-it
google/gemma-3n-e4b-it
google/gemma-4-26b-a4b-it
google/gemma-4-26b-a4b-it:free
google/gemma-4-31b-it
google/gemma-4-31b-it:free
google/lyria-3-clip-preview
google/lyria-3-pro-preview
gryphe/mythomax-l2-13b
ibm-granite/granite-4.0-h-micro
inception/mercury-2
inflection/inflection-3-pi
inflection/inflection-3-productivity
kwaipilot/kat-coder-pro-v2
liquid/lfm-2-24b-a2b
liquid/lfm-2.5-1.2b-instruct:free
liquid/lfm-2.5-1.2b-thinking:free
mancer/weaver
meta-llama/llama-3-70b-instruct
meta-llama/llama-3-8b-instruct
meta-llama/llama-3.1-70b-instruct
meta-llama/llama-3.1-8b-instruct
meta-llama/llama-3.2-11b-vision-instruct
meta-llama/llama-3.2-1b-instruct
meta-llama/llama-3.2-3b-instruct
meta-llama/llama-3.2-3b-instruct:free
meta-llama/llama-3.3-70b-instruct
meta-llama/llama-3.3-70b-instruct:free
meta-llama/llama-4-maverick
meta-llama/llama-4-scout
meta-llama/llama-guard-3-8b
meta-llama/llama-guard-4-12b
microsoft/phi-4
microsoft/wizardlm-2-8x22b
minimax/minimax-01
minimax/minimax-m1
minimax/minimax-m2
minimax/minimax-m2-her
minimax/minimax-m2.1
minimax/minimax-m2.5
minimax/minimax-m2.7
mistralai/devstral-2512
mistralai/mistral-7b-instruct-v0.1
mistralai/mistral-large-2407
mistralai/mistral-medium-3.1
mistralai/mistral-saba
mistralai/mistral-small-24b-instruct-2501
mistralai/mistral-small-2603
mistralai/mistral-small-3.1-24b-instruct
mistralai/mistral-small-3.2-24b-instruct
mistralai/mixtral-8x22b-instruct
mistralai/voxtral-small-24b-2507
moonshotai/kimi-k2
moonshotai/kimi-k2-0905
moonshotai/kimi-k2-thinking
moonshotai/kimi-k2.5
morph/morph-v3-fast
morph/morph-v3-large
nex-agi/deepseek-v3.1-nex-n1
nousresearch/hermes-3-llama-3.1-405b
nousresearch/hermes-3-llama-3.1-405b:free
nousresearch/hermes-3-llama-3.1-70b
nousresearch/hermes-4-405b
nousresearch/hermes-4-70b
nvidia/llama-3.3-nemotron-super-49b-v1.5
nvidia/nemotron-3-nano-30b-a3b
nvidia/nemotron-3-nano-30b-a3b:free
nvidia/nemotron-3-super-120b-a12b
nvidia/nemotron-3-super-120b-a12b:free
nvidia/nemotron-nano-9b-v2
nvidia/nemotron-nano-9b-v2:free
openai/gpt-3.5-turbo
openai/gpt-3.5-turbo-0613
openai/gpt-3.5-turbo-16k
openai/gpt-3.5-turbo-instruct
openai/gpt-4
openai/gpt-4-turbo
openai/gpt-4-turbo-preview
openai/gpt-4o-2024-05-13
openai/gpt-4o-2024-08-06
openai/gpt-4o-2024-11-20
openai/gpt-4o-mini-2024-07-18
openai/gpt-4o-mini-search-preview
openai/gpt-4o-search-preview
openai/gpt-5-codex
openai/gpt-5-image
openai/gpt-5-image-mini
openai/gpt-5-pro
openai/gpt-5.1-codex-max
openai/gpt-5.3-chat
openai/gpt-5.4-mini
openai/gpt-5.4-nano
openai/gpt-5.4-pro
openai/gpt-audio
openai/gpt-audio-mini
openai/gpt-oss-120b
openai/gpt-oss-120b:free
openai/gpt-oss-20b
openai/gpt-oss-20b:free
openai/gpt-oss-safeguard-20b
openai/o3-deep-research
openai/o3-mini-high
openai/o4-mini-deep-research
openai/o4-mini-high
openrouter/bodybuilder
openrouter/elephant-alpha
openrouter/free
perplexity/sonar
perplexity/sonar-deep-research
perplexity/sonar-pro
perplexity/sonar-pro-search
perplexity/sonar-reasoning-pro
prime-intellect/intellect-3
qwen/qwen2-5-72b-instruct
qwen/qwen2-5-7b-instruct
qwen/qwen-2.5-coder-32b-instruct
qwen/qwen-max
qwen/qwen-plus
qwen/qwen-plus-2025-07-28
qwen/qwen-plus-2025-07-28:thinking
qwen/qwen-turbo
qwen/qwen-vl-max
qwen/qwen-vl-plus
qwen/qwen2.5-vl-72b-instruct
qwen/qwen3-14b
qwen/qwen3-235b-a22b
qwen/qwen3-235b-a22b-2507
qwen/qwen3-235b-a22b-thinking-2507
qwen/qwen3-30b-a3b
qwen/qwen3-30b-a3b-instruct-2507
qwen/qwen3-30b-a3b-thinking-2507
qwen/qwen3-32b
qwen/qwen3-8b
qwen/qwen3-coder-30b-a3b-instruct
qwen/qwen3-coder-480b-a35b-instruct
qwen/qwen3-coder-480b-a35b-instruct:free
qwen/qwen3-coder-flash
qwen/qwen3-coder-next
qwen/qwen3-coder-plus
qwen/qwen3-max
qwen/qwen3-max-thinking
qwen/qwen3-next-80b-a3b-instruct
qwen/qwen3-next-80b-a3b-instruct:free
qwen/qwen3-next-80b-a3b-thinking
qwen/qwen3-vl-235b-a22b
qwen/qwen3-vl-235b-a22b-thinking
qwen/qwen3-vl-30b-a3b-instruct
qwen/qwen3-vl-30b-a3b-thinking
qwen/qwen3-vl-32b-instruct
qwen/qwen3-vl-8b-instruct
qwen/qwen3-vl-8b-thinking
qwen/qwen3.5-122b-a10b
qwen/qwen3.5-27b
qwen/qwen3.5-35b-a3b
qwen/qwen3.5-397b-a17b
qwen/qwen3.5-9b
qwen/qwen3.5-flash-02-23
qwen/qwen3.5-plus
qwen/qwen3.5-plus-02-15
qwen/qwen3.6-plus
rekaai/reka-edge
rekaai/reka-flash-3
relace/relace-apply-3
relace/relace-search
sao10k/l3-lunaris-8b
sao10k/l3.1-70b-hanami-x1
sao10k/l3.1-euryale-70b
sao10k/l3.3-euryale-70b
stepfun/step-3.5-flash
switchpoint/router
tencent/hunyuan-a13b-instruct
thedrummer/cydonia-24b-v4.1
thedrummer/rocinante-12b
thedrummer/skyfall-36b-v2
thedrummer/unslopnemo-12b
undi95/remm-slerp-l2-13b
upstage/solar-pro-3
writer/palmyra-x5
x-ai/grok-4.1-fast
x-ai/grok-4.20
x-ai/grok-4.20-multi-agent
xiaomi/mimo-v2-flash
z-ai/glm-4-32b
z-ai/glm-4.5
z-ai/glm-4.5-air
z-ai/glm-4.5-air:free
z-ai/glm-4.6
z-ai/glm-4.7
z-ai/glm-4.7-flash
z-ai/glm-5
z-ai/glm-5-turbo
z-ai/glm-5.1
```

You can find all the models available through Puter [AI models list](/ai/models/).

## Best Practices

When using OpenRouter models through Puter.js, keep these best practices in mind:

1. **Choose the right model for your task** : Different models excel at different tasks. Smaller models are faster and more cost-effective for simple queries, while larger models perform better on complex reasoning tasks.
2. **Use streaming for longer responses** : When generating longer content like stories or essays, use streaming to provide a better user experience.
3. **Handle errors gracefully** : Always implement error handling to provide feedback if the API request fails.
4. **Be specific with prompts** : Provide clear and specific instructions to get the best results from the models.

That's it! You now have free, unlimited access to hundreds of AI models through OpenRouter using Puter.js. This allows you to leverage powerful AI capabilities for your applications without worrying about API keys, rate limits, or backend setup.

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited DeepSeek Chimera API](/tutorials/free-unlimited-deepseek-chimera-api/)
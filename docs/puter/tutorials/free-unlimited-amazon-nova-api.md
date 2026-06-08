# Free, Unlimited Amazon Nova API

Source: https://developer.puter.com/tutorials/free-unlimited-amazon-nova-api/

[Tutorials](/tutorials/)

# Free, Unlimited Amazon Nova API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: December 3, 2025
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Chat with Nova 2 Lite](#example-1-basic-chat-with-nova-2-lite)[Example 2: Complex Reasoning with Nova Premier](#example-2-complex-reasoning-with-nova-premier)[Example 3: Ultra-Low Latency with Nova Micro](#example-3-ultra-low-latency-with-nova-micro)[Example 4: Image Analysis with Nova Pro](#example-4-image-analysis-with-nova-pro)[Example 5: Streaming Responses](#example-5-streaming-responses)[Example 6: Comparing Models](#example-6-comparing-models)[List of Supported Amazon Nova Models](#list-of-supported-amazon-nova-models)[Conclusion](#conclusion)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Amazon Nova's powerful AI models](/ai/amazon/) for free, without any API keys. Using Puter.js, you can leverage models like [Nova 2 Lite](/ai/amazon/nova-2-lite-v1/), [Nova Premier](/ai/amazon/nova-premier-v1/), [Nova Pro](/ai/amazon/nova-pro-v1/), and [Nova Micro](/ai/amazon/nova-micro-v1/).

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI usage.

## Getting Started

Puter.js works without any API keys. To start using Puter.js, include the following script tag in your HTML file, either in the `<head>` or `<body>` section:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

You're now ready to use Puter.js for free access to Amazon Nova capabilities. No API keys are required.

## Example 1: Basic Chat with Nova 2 Lite

Here's a simple example showing how to generate text using Amazon Nova 2 Lite:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("Explain the concept of machine learning in simple terms", {
            model: 'amazon/nova-2-lite-v1'
        }).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

Using the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function, you can generate text using Amazon Nova 2 Lite, which is a fast and cost-efficient model for everyday workloads.

## Example 2: Complex Reasoning with Nova Premier

Amazon Nova Premier is the most capable model in the Nova family, designed for complex reasoning and sophisticated problem-solving:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Analyze the potential long-term economic impacts of widespread AI adoption in manufacturing industries. Consider both benefits and challenges.",
            {
                model: 'amazon/nova-premier-v1'
            }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 3: Ultra-Low Latency with Nova Micro

For applications requiring the fastest possible response times with text-only input, Nova Micro is the perfect choice:

```html
<html>
<body>
    <div id="output"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function fastResponse() {
            const outputDiv = document.getElementById('output');

            // Nova Micro with streaming for ultra-low latency
            const response = await puter.ai.chat(
                "What is the capital of France?",
                {
                    model: 'amazon/nova-micro-v1',
                    stream: true
                }
            );

            for await (const part of response) {
                if (part?.text) {
                    outputDiv.innerHTML += part.text;
                }
            }
        }

        fastResponse();
    </script>
</body>
</html>
```

## Example 4: Image Analysis with Nova Pro

Amazon Nova Pro supports multimodal capabilities, including image analysis. Here's how to analyze an image:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <img src="https://assets.puter.site/doge.jpeg" id="image">
    <script>
        puter.ai.chat(
            "Describe what you see in this image in detail",
            "https://assets.puter.site/doge.jpeg",
            { model: 'amazon/nova-pro-v1' }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 5: Streaming Responses

For longer responses, use streaming to get results in real-time:

```html
<html>
<body>
    <div id="output"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const outputDiv = document.getElementById('output');

            // Nova Premier with streaming
            outputDiv.innerHTML += '<h2>Nova Premier Response:</h2>';
            const premierResponse = await puter.ai.chat(
                "Explain the theory of relativity and its implications for space travel",
                {
                    model: 'amazon/nova-premier-v1',
                    stream: true
                }
            );

            for await (const part of premierResponse) {
                if (part?.text) {
                    outputDiv.innerHTML += part.text.replaceAll('\n', '<br>');
                }
            }
        }

        streamResponse();
    </script>
</body>
</html>
```

## Example 6: Comparing Models

Here's how to compare responses from different Nova models:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
    (async () => {
        const question = 'What are the key principles of sustainable architecture?';

        // Nova Micro - fastest
        const micro_resp = await puter.ai.chat(
            question,
            {model: 'amazon/nova-micro-v1', stream: true}
        );
        puter.print('<h2>Nova Micro Response:</h2>');
        for await (const part of micro_resp) {
            if (part?.text) {
```

Show 31 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
    (async () => {
        const question = 'What are the key principles of sustainable architecture?';

        // Nova Micro - fastest
        const micro_resp = await puter.ai.chat(
            question,
            {model: 'amazon/nova-micro-v1', stream: true}
        );
        puter.print('<h2>Nova Micro Response:</h2>');
        for await (const part of micro_resp) {
            if (part?.text) {
                puter.print(part.text.replaceAll('\n', '<br>'));
            }
        }

        // Nova 2 Lite - balanced
        const lite_resp = await puter.ai.chat(
            question,
            {model: 'amazon/nova-2-lite-v1', stream: true}
        );
        puter.print('<h2>Nova 2 Lite Response:</h2>');
        for await (const part of lite_resp) {
            if (part?.text) {
                puter.print(part.text.replaceAll('\n', '<br>'));
            }
        }

        // Nova Premier - most capable
        const premier_resp = await puter.ai.chat(
            question,
            {model: 'amazon/nova-premier-v1', stream: true}
        );
        puter.print('<h2>Nova Premier Response:</h2>');
        for await (const part of premier_resp) {
            if (part?.text) {
                puter.print(part.text.replaceAll('\n', '<br>'));
            }
        }
    })();
    </script>
</body>
</html>
```

Collapse code

## List of Supported Amazon Nova Models

The following Amazon Nova models are supported by Puter.js:

```javascript
amazon/nova-2-lite-v1
amazon/nova-lite-v1
amazon/nova-micro-v1
amazon/nova-premier-v1
amazon/nova-pro-v1
```

## Conclusion

That's it! You now have free access to Amazon Nova's powerful language models using Puter.js. This allows you to [add sophisticated AI capabilities to your web applications](/ai/) without needing any API keys or having to set up an AWS account.

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited NVIDIA Nemotron API](/tutorials/free-unlimited-nvidia-nemotron-api/)
- [Free, Unlimited Microsoft Phi API](/tutorials/free-unlimited-microsoft-phi-api/)
- [Free, Unlimited IBM Granite API](/tutorials/free-unlimited-ibm-granite-api/)
- [Free, Unlimited Liquid AI API](/tutorials/free-unlimited-liquid-ai-api/)
- [Free, Unlimited Kimi K2.6 API](/tutorials/free-unlimited-kimi-k2-api/)
- [Serverless AI: Forever Free for Developers](/tutorials/serverless-ai-forever-free-for-developers/)
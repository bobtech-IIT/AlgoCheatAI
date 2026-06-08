# Free, Unlimited Nous Research Hermes API

Source: https://developer.puter.com/tutorials/free-unlimited-nous-research-hermes-api/

[Tutorials](/tutorials/)

# Free, Unlimited Nous Research Hermes API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: November 14, 2025
                                    

On this page[Getting Started](#getting-started)[Example 1: Chat with Nous Hermes 4 70B](#example-1-chat-with-nous-hermes-4-70b)[Example 2: Answer complex questions with Nous Hermes 4 405B](#example-2-answer-complex-questions-with-nous-hermes-4-405b)[Example 3: Streaming responses for real-time interaction](#example-3-streaming-responses-for-real-time-interaction)[List of Supported Models](#list-of-supported-models)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access Nous Research's powerful Hermes models including [Hermes 4 70B](/ai/nousresearch/hermes-4-70b/), [Hermes 4 405B](/ai/nousresearch/hermes-4-405b/), [Hermes 3 Llama 3.1 70B](/ai/nousresearch/hermes-3-llama-3.1-70b/), and [Hermes 3 Llama 3.1 405B](/ai/nousresearch/hermes-3-llama-3.1-405b/) for free, without needing API keys or backend infrastructure. Puter.js is completely free for apps, allowing you to provide your users with powerful AI capabilities.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate [AI features](/ai/) into their applications with each user covering their own usage costs. This enables developers to offer advanced AI capabilities to users at no cost to themselves, without any API keys or server-side setup.

## Getting Started

To start using Puter.js, include the following script tag in your HTML file, either in the `<head>` or `<body>` section:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

Nothing else is required to start using Puter.js for free access to Nous Research's Hermes models.

## Example 1: Chat with Nous Hermes 4 70B

To generate text using Hermes 4 70B, use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat("Explain the concept of neural networks and how they learn from data", { model: "nousresearch/hermes-4-70b" })
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
        puter.ai.chat("Explain the concept of neural networks and how they learn from data", { model: "nousresearch/hermes-4-70b" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: Answer complex questions with Nous Hermes 4 405B

For more complex reasoning tasks, use the larger Hermes 4 405B model:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Analyze the ethical implications of artificial general intelligence. Consider multiple philosophical perspectives including consequentialism, deontology, and virtue ethics. Provide a balanced analysis with potential benefits and risks.",
            { model: "nousresearch/hermes-4-405b" }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

This example demonstrates how Hermes 4 405B excels at complex reasoning tasks requiring nuanced understanding and multi-faceted analysis.

## Example 3: Streaming responses for real-time interaction

For longer responses, use streaming to provide a better user experience:

```html
<html>
<body>
    <div id="response"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResponse() {
            const outputDiv = document.getElementById('response');

            const response = await puter.ai.chat(
                "Write a detailed guide on implementing microservices architecture, including best practices, common pitfalls, and real-world examples",
                {model: 'nousresearch/hermes-4-70b', stream: true}
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

This example shows how streaming provides immediate feedback to users as Hermes generates its comprehensive response.

## List of Supported Models

The following Nous Research Hermes models are currently supported by Puter.js:

```javascript
nousresearch/hermes-4-70b
nousresearch/hermes-4-405b
nousresearch/hermes-3-llama-3.1-70b
nousresearch/hermes-3-llama-3.1-405b:free
nousresearch/hermes-3-llama-3.1-405b
```

That's it! You now have free access to Nous Research's Hermes models including Hermes 4 70B, Hermes 4 405B, Hermes 3 Llama 3.1, and more using Puter.js. You can build powerful applications that handle complex tasks, without needing API keys or backend infrastructure. True serverless AI!

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited Liquid AI API](/tutorials/free-unlimited-liquid-ai-api/)
- [Free, Unlimited AllenAI API](/tutorials/free-unlimited-allen-ai-api/)
- [Free, Unlimited Prime Intellect API](/tutorials/free-unlimited-prime-intellect-api/)
- [Free, Unlimited ArceeAI API](/tutorials/free-unlimited-arcee-ai-api/)
- [Free, Unlimited Essential AI API](/tutorials/free-unlimited-essential-ai-api/)
- [Free, Unlimited Writer Palmyra API](/tutorials/free-unlimited-writer-palmyra-api/)
- [Free, Unlimited Upstage Solar API](/tutorials/free-unlimited-upstage-solar-api/)
- [Free, Unlimited StepFun AI API](/tutorials/free-unlimited-stepfun-ai-api/)
- [Free, Unlimited Aion Labs API](/tutorials/free-unlimited-aion-labs-api/)
- [Free, Unlimited Mancer AI API](/tutorials/free-unlimited-mancer-api/)
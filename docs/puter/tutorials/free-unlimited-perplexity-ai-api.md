# Free, Unlimited Perplexity AI API

Source: https://developer.puter.com/tutorials/free-unlimited-perplexity-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited Perplexity AI API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: January 8, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Research with Perplexity Sonar](#example-1-research-with-perplexity-sonar)[Example 2: Deep Research with Sonar Deep Research](#example-2-deep-research-with-sonar-deep-research)[Example 3: Professional Research with Sonar Pro](#example-3-professional-research-with-sonar-pro)[Example 4: Advanced Reasoning with Sonar Reasoning Pro](#example-4-advanced-reasoning-with-sonar-reasoning-pro)[Example 5: Streaming Research Results](#example-5-streaming-research-results)[Example 6: Image Analysis](#example-6-image-analysis)[Available Perplexity Models](#available-perplexity-models)[Related](#related)

This tutorial shows you how to leverage [Puter.js](https://developer.puter.com) to access [Perplexity AI](/ai/perplexity/)'s specialized language models without any API keys or usage limits. Puter.js is completely free and open-source, allowing you to harness Perplexity AI's research-oriented capabilities directly in your applications. Using Puter.js, you can access Perplexity's Sonar models and reasoning engines straight from your frontend code with zero server setup.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to integrate [AI capabilities](/ai/) into their applications while each user covers their own resource consumption. This model removes the burden of API key management and billing from developers, making sophisticated AI tools practically free for apps and websites.

## Getting Started

Puter.js works without any API keys or account setup. To start using Puter.js, add the following script tag to your HTML file, in either the `<head>` or `<body>` section:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

Nothing more is needed to access Perplexity AI models through Puter.js. No API keys, no registration, no configuration.

## Example 1: Research with Perplexity Sonar

To perform research using [Perplexity's Sonar](/ai/perplexity/sonar/) model, use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat("What are the latest developments in quantum computing research?", { model: "perplexity/sonar" })
    .then(response => {
        puter.print(response);
    });
```

Full example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("What are the latest developments in quantum computing research?", { model: "perplexity/sonar" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: Deep Research with Sonar Deep Research

Perplexity's [deep research model](/ai/perplexity/sonar-deep-research/) provides comprehensive analysis for complex topics:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Analyze the environmental impact of electric vehicle adoption over the next decade", 
            { model: "perplexity/sonar-deep-research" }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

This example demonstrates Perplexity's ability to conduct thorough research and provide detailed analysis on complex topics with multiple facets.

## Example 3: Professional Research with Sonar Pro

For professional-grade research capabilities, use [Sonar Pro](/ai/perplexity/sonar-pro/):

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Provide a comprehensive market analysis for renewable energy investments in emerging markets", 
            { model: "perplexity/sonar-pro" }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

This showcases Perplexity's professional research capabilities, ideal for business analysis and strategic planning.

## Example 4: Advanced Reasoning with Sonar Reasoning Pro

For complex analytical and problem-solving tasks, use [Sonar Reasoning Pro](/ai/perplexity/sonar-reasoning-pro/):

```javascript
// Using Sonar Reasoning Pro model
puter.ai.chat(
    "Develop a logical framework for evaluating artificial intelligence safety measures",
    { model: "perplexity/sonar-reasoning-pro" }
).then(response => {
    puter.print(response);
});
```

Complete example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Using Sonar Reasoning Pro model
        puter.ai.chat(
            "Develop a logical framework for evaluating artificial intelligence safety measures",
            { model: "perplexity/sonar-reasoning-pro" }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 5: Streaming Research Results

For comprehensive research queries, use streaming to see results as they're generated:

```javascript
async function streamResearch() {
    const response = await puter.ai.chat(
        "Conduct a thorough analysis of the global semiconductor supply chain and its vulnerabilities", 
        {
            stream: true,
            model: "perplexity/sonar-deep-research"
        }
    );
    
    for await (const part of response) {
        puter.print(part?.text);
    }
}

streamResearch();
```

Full example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamResearch() {
            const response = await puter.ai.chat(
                "Conduct a thorough analysis of the global semiconductor supply chain and its vulnerabilities", 
                {
                    stream: true,
                    model: "perplexity/sonar-deep-research"
                }
            );
            
            for await (const part of response) {
                puter.print(part?.text);
            }
        }

        streamResearch();
    </script>
</body>
</html>
```

## Example 6: Image Analysis

To analyze images, simply provide an image URL to [`puter.ai.chat()`](https://docs.puter.com/AI/chat/):

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "What do you see in this image?",
            "https://assets.puter.site/doge.jpeg",
            { model: 'perplexity/sonar' }
        ).then(response => {
            document.write(response);
        });
    </script>
</body>
</html>
```

## Available Perplexity Models

The following Perplexity AI models are accessible through Puter.js:

```javascript
perplexity/sonar
perplexity/sonar-pro
perplexity/sonar-pro-search
perplexity/sonar-deep-research
perplexity/sonar-reasoning-pro
```

Perfect! You now have unlimited access to Perplexity AI's research-focused language models through Puter.js. This enables you to build applications with powerful research and reasoning capabilities without managing API keys or backend infrastructure. From market analysis to scientific research, Perplexity's models excel at providing well-researched, factual responses directly in your frontend applications!

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Cohere API](/tutorials/free-unlimited-cohere-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited Grok API](/tutorials/free-unlimited-grok-api/)
- [Free, Unlimited Mistral API](/tutorials/free-unlimited-mistral-api/)
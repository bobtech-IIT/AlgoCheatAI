# Free, Unlimited Sentiment Analysis API

Source: https://developer.puter.com/tutorials/free-unlimited-sentiment-analysis-api/

[Tutorials](/tutorials/)

# Free, Unlimited Sentiment Analysis API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 20, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic sentiment analysis](#example-1-basic-sentiment-analysis)[Example 2: Interactive sentiment analyzer](#example-2-interactive-sentiment-analyzer)[Example 3: Detailed sentiment analysis with JSON output](#example-3-detailed-sentiment-analysis-with-json-output)[Example 4: Batch sentiment analysis](#example-4-batch-sentiment-analysis)[Conclusion](#conclusion)[Related](#related)

In this guide, you will learn how to integrate sentiment analysis capabilities into your app for free, without developer accounts or API keys. Instead of traditional NLP APIs, we'll use Large Language Models (LLMs) through [Puter.js](https://developer.puter.com) for accurate, context-aware sentiment detection. LLMs excel at sentiment analysis because they understand nuance, sarcasm, and contextâproducing more accurate results than traditional rule-based sentiment APIs.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the sentiment analysis usage.

Puter.js is also uniquely suited for use by AI coding assistants, agents, and vibe coding platforms like Claude Code, [Codex](/ai/codex/), OpenCode, Lovable, Replit, and Bolt.new. Since Puter.js is keyless and serverless, apps that run sentiment analysis through it work end-to-end with nothing to set up: no backend to sign up for, no service to provision, and no API keys to paste in. This removes both a major class of security issues and the setup friction that usually keeps AI-generated apps from running out of the box.

## Getting Started

Add Puter.js to your project with a single line:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's it, you're ready to start adding sentiment analysis to your application.

## Example 1: Basic sentiment analysis

You can use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function to access more than 500 large language models for sentiment analysis. Here's an example using GPT-5 nano to analyze text sentiment.

```javascript
const text = "I absolutely love this product! It exceeded all my expectations.";
const prompt = `Analyze the sentiment of the following text and respond with only one word: positive, negative, or neutral.\n\nText: ${text}`;

puter.ai.chat(prompt, { model: "gpt-5-nano" })
.then(sentiment => {
    console.log(sentiment);
});
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const text = "I absolutely love this product! It exceeded all my expectations.";
        const prompt = `Analyze the sentiment of the following text and respond with only one word: positive, negative, or neutral.\n\nText: ${text}`;

        puter.print("Analyzing sentiment...");
        puter.ai.chat(prompt, { model: "gpt-5-nano" })
        .then(sentiment => {
            puter.print(`Sentiment: ${sentiment}`);
        });
    </script>
</body>
</html>
```

## Example 2: Interactive sentiment analyzer

The following example shows how to create an interactive sentiment analyzer with a simple UI.

```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;}
        textarea { width: 100%; height: 100px; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
        button { margin: 5px; padding: 10px 15px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; background-color: #007bff; color: white; border: none; }
        button:hover { background-color: #0056b3; }
        .result { margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 4px; min-height: 50px; }
        .sentiment-positive { background-color: #d4edda; color: #155724; }
        .sentiment-negative { background-color: #f8d7da; color: #721c24; }
        .sentiment-neutral { background-color: #fff3cd; color: #856404; }
    </style>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>
```

Show 47 more lines...

```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;}
        textarea { width: 100%; height: 100px; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
        button { margin: 5px; padding: 10px 15px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; background-color: #007bff; color: white; border: none; }
        button:hover { background-color: #0056b3; }
        .result { margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 4px; min-height: 50px; }
        .sentiment-positive { background-color: #d4edda; color: #155724; }
        .sentiment-negative { background-color: #f8d7da; color: #721c24; }
        .sentiment-neutral { background-color: #fff3cd; color: #856404; }
    </style>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>

    <h1>Sentiment Analyzer</h1>

    <textarea id="text-input" placeholder="Enter text to analyze sentiment...">This product is amazing! I'm so happy with my purchase.</textarea>

    <div>
        <button onclick="analyzeSentiment()">Analyze Sentiment</button>
    </div>

    <div id="status"></div>
    <div id="result" class="result"></div>

    <script>
        const textInput = document.getElementById('text-input');
        const statusDiv = document.getElementById('status');
        const resultDiv = document.getElementById('result');

        async function analyzeSentiment() {
            const text = textInput.value.trim();

            if (!text) {
                statusDiv.textContent = 'Please enter some text first!';
                return;
            }

            statusDiv.textContent = 'Analyzing sentiment...';
            resultDiv.textContent = '';
            resultDiv.className = 'result';

            try {
                const prompt = `Analyze the sentiment of the following text and respond with only one word: positive, negative, or neutral.\n\nText: ${text}`;
                const sentiment = await puter.ai.chat(prompt, {
                    model: "gpt-5-nano"
                });

                const cleanSentiment = sentiment.message.content.toLowerCase().trim();
                
                statusDiv.textContent = '';
                resultDiv.textContent = `Sentiment: ${cleanSentiment}`;
                resultDiv.className = `result sentiment-${cleanSentiment}`;
            } catch (error) {
                statusDiv.textContent = `Error: ${error.message}`;
            }
        }
    </script>
</body>
</html>
```

Collapse code

## Example 3: Detailed sentiment analysis with JSON output

For more detailed sentiment analysis including confidence scores and reasoning, you can prompt the model to return structured JSON data:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const text = "The service was okay, but the food was disappointing. However, the staff were incredibly friendly.";
            const prompt = `Analyze the sentiment of the following text. Return your response as a JSON object with these fields:
            - sentiment: "positive", "negative", or "neutral"
            - confidence: a number between 0 and 1
            - reasoning: brief explanation of the sentiment
            
            Text: ${text}
            
            Respond only with valid JSON, no additional text.`;
```

Show 18 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const text = "The service was okay, but the food was disappointing. However, the staff were incredibly friendly.";
            const prompt = `Analyze the sentiment of the following text. Return your response as a JSON object with these fields:
            - sentiment: "positive", "negative", or "neutral"
            - confidence: a number between 0 and 1
            - reasoning: brief explanation of the sentiment
            
            Text: ${text}
            
            Respond only with valid JSON, no additional text.`;
            
            puter.print("Analyzing sentiment...<br><br>");
            
            const response = await puter.ai.chat(prompt, {
                model: 'gpt-5-nano'
            });
            
            try {
                const analysis = JSON.parse(response);
                puter.print(`<strong>Sentiment:</strong> ${analysis.sentiment}<br>`);
                puter.print(`<strong>Confidence:</strong> ${(analysis.confidence * 100).toFixed(1)}%<br>`);
                puter.print(`<strong>Reasoning:</strong> ${analysis.reasoning}<br>`);
            } catch (e) {
                puter.print(`Raw response: ${response}`);
            }
        })();
    </script>
</body>
</html>
```

Collapse code

## Example 4: Batch sentiment analysis

Analyze multiple texts at once for efficient processing:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const reviews = [
                "Best purchase I've ever made!",
                "Terrible quality, don't waste your money.",
                "It's fine, nothing special.",
                "Exceeded my expectations in every way!",
                "Not worth the price at all."
            ];
            
            puter.print("<h3>Batch Sentiment Analysis</h3>");
```

Show 16 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const reviews = [
                "Best purchase I've ever made!",
                "Terrible quality, don't waste your money.",
                "It's fine, nothing special.",
                "Exceeded my expectations in every way!",
                "Not worth the price at all."
            ];
            
            puter.print("<h3>Batch Sentiment Analysis</h3>");
            
            for (const review of reviews) {
                const prompt = `Analyze the sentiment of the following text and respond with only one word: positive, negative, or neutral.\n\nText: ${review}`;
                
                const sentiment = await puter.ai.chat(prompt, {
                    model: 'gpt-5-nano'
                });
                
                puter.print(`<div style="margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px;">
                    <strong>Review:</strong> "${review}"<br>
                    <strong>Sentiment:</strong> ${sentiment.message.content.toLowerCase().trim()}
                </div>`);
            }
        })();
    </script>
</body>
</html>
```

Collapse code

## Conclusion

Using Puter.js, you can add LLM-powered sentiment analysis capabilities to your application without setting up API keys or managing NLP services. LLMs provide context-aware sentiment detection that understands nuance, sarcasm, and mixed sentiments better than traditional rule-based approaches. Thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), you can add this feature for free to your application, since your users cover their own AI usage, not you as the developer.

You can find more details about Puter.js AI API in the [documentation](https://docs.puter.com/AI/chat/).

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Google AI API](/tutorials/free-unlimited-google-ai-api/)
- [Free, Unlimited Translation API](/tutorials/free-unlimited-translation-api/)
- [Free, Unlimited Summarization API](/tutorials/free-unlimited-summarization-api/)
- [Free, Unlimited Language Detection API](/tutorials/free-unlimited-language-detection-api/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
- [Free, Unlimited Text to Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Speech-to-Text API](/tutorials/free-unlimited-speech-to-text-api/)
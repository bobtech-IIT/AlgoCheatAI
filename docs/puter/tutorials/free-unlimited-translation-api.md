# Free, Unlimited Translation API

Source: https://developer.puter.com/tutorials/free-unlimited-translation-api/

[Tutorials](/tutorials/)

# Free, Unlimited Translation API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 17, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic translation](#example-1-basic-translation)[Example 2: Interactive translator](#example-2-interactive-translator)[Example 3: Streaming translation](#example-3-streaming-translation)[Conclusion](#conclusion)[Related](#related)

In this guide, you will learn how to integrate translation capabilities into your app for free, without developer accounts or API keys. Instead of traditional translation APIs, we'll use Large Language Models (LLMs) through [Puter.js](https://developer.puter.com) for high-quality, context-aware translations. LLMs excel at translation because they understand nuance, idioms, and contextâproducing natural-sounding translations that often surpass dedicated translation services.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the translation usage.

The serverless, keyless, and user-pays architecture of Puter.js makes it an excellent fit for AI coding assistants, agents, and vibe coding platforms to build apps and websites with. Any website or app these tools produce, using Puter.js, will run end-to-end as soon as it's generated. No third-party signup, no service to spin up, no API keys to paste. That drastically reduces the setup friction and security issues that normally prevent these apps from working out of the box.

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

That's it, you're ready to start adding translation to your application.

## Example 1: Basic translation

You can use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function to access more than 500 large language models for translation. Here's an example using GPT-5 nano to translate text to Spanish.

```javascript
const text = "Hello, how are you?";
const targetLanguage = "Spanish";
const prompt = `Translate to ${targetLanguage}. Output only the translation, nothing else:\n\n${text}`;

puter.ai.chat(prompt, { model: "gpt-5-nano" })
.then(translation => {
    console.log(translation);
});
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const text = "Hello, how are you?";
        const targetLanguage = "Spanish";
        const prompt = `Translate to ${targetLanguage}. Output only the translation, nothing else:\n\n${text}`;

        puter.print("Translating...");
        puter.ai.chat(prompt, { model: "gpt-5-nano" })
        .then(translation => {
            puter.print(translation);
        });
    </script>
</body>
</html>
```

## Example 2: Interactive translator

The following example shows how to create an interactive translator with a simple UI.

```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;}
        textarea { width: 100%; height: 100px; margin: 10px 0; padding: 10px; border: 1px solid #ccc;border-radius: 4px; }
        select, button { margin: 5px; padding: 10px 15px; border: 1px solid #ccc; border-radius: 4px; }
        button { cursor: pointer; background-color: #007bff; color: white; border: none; }
        button:hover { background-color: #0056b3; }
        .result { margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 4px; min-height: 50px; }
    </style>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>

    <h1>Text Translator</h1>
```

Show 56 more lines...

```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;}
        textarea { width: 100%; height: 100px; margin: 10px 0; padding: 10px; border: 1px solid #ccc;border-radius: 4px; }
        select, button { margin: 5px; padding: 10px 15px; border: 1px solid #ccc; border-radius: 4px; }
        button { cursor: pointer; background-color: #007bff; color: white; border: none; }
        button:hover { background-color: #0056b3; }
        .result { margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 4px; min-height: 50px; }
    </style>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>

    <h1>Text Translator</h1>

    <textarea id="text-input" placeholder="Enter text to translate...">Hello, how are you today?</textarea>

    <div>
        <label>Target Language:</label>
        <select id="language-select">
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Italian">Italian</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Japanese">Japanese</option>
            <option value="Chinese">Chinese</option>
            <option value="Korean">Korean</option>
            <option value="Arabic">Arabic</option>
            <option value="Russian">Russian</option>
        </select>
        <button onclick="translateText()">Translate</button>
    </div>

    <div id="status"></div>
    <div id="result" class="result"></div>

    <script>
        const textInput = document.getElementById('text-input');
        const languageSelect = document.getElementById('language-select');
        const statusDiv = document.getElementById('status');
        const resultDiv = document.getElementById('result');

        async function translateText() {
            const text = textInput.value.trim();
            const targetLanguage = languageSelect.value;

            if (!text) {
                statusDiv.textContent = 'Please enter some text first!';
                return;
            }

            statusDiv.textContent = `Translating to ${targetLanguage}...`;
            resultDiv.textContent = '';

            try {
                const prompt = `Translate the following text to ${targetLanguage}. Output only the translated textâno explanations, comments, or additional notes:\n\n${text}`;
                const translation = await puter.ai.chat(prompt, {
                    model: "gpt-5-nano"
                });

                statusDiv.textContent = '';
                resultDiv.textContent = translation;
            } catch (error) {
                statusDiv.textContent = `Error: ${error.message}`;
            }
        }
    </script>
</body>
</html>
```

Collapse code

## Example 3: Streaming translation

For longer texts, you can stream the translation as it's being generated:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const text = "This is a longer text that we want to translate. We'll see the translation appear word by word as it's being generated.";
            const targetLanguage = "French";
            const prompt = `Translate to ${targetLanguage}. Output only the translation, no commentary or explanations:\n\n${text}`;
            
            puter.print("Original: " + text + "<br><br>Translation: ");
            
            const response = await puter.ai.chat(prompt, {
                model: 'gpt-5-nano',
                stream: true
            });
            
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

## Conclusion

Using Puter.js, you can add LLM-powered translation capabilities to your application without setting up API keys or managing translation services. LLMs provide context-aware, natural-sounding translations that understand idioms and nuance better than traditional translation APIs. Thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), you can add this feature for free to your application, since your users cover their own AI usage, not you as the developer.

You can find more details about Puter.js AI API in the [documentation](https://docs.puter.com/AI/chat/).

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Google AI API](/tutorials/free-unlimited-google-ai-api/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
- [Free, Unlimited Text to Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Speech-to-Text API](/tutorials/free-unlimited-speech-to-text-api/)
- [Free, Unlimited Sentiment Analysis API](/tutorials/free-unlimited-sentiment-analysis-api/)
- [Free, Unlimited Summarization API](/tutorials/free-unlimited-summarization-api/)
- [Free, Unlimited Language Detection API](/tutorials/free-unlimited-language-detection-api/)
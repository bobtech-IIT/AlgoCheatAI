# Free, Unlimited Language Detection API

Source: https://developer.puter.com/tutorials/free-unlimited-language-detection-api/

[Tutorials](/tutorials/)

# Free, Unlimited Language Detection API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 10, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic language detection](#example-1-basic-language-detection)[Example 2: Interactive language detector](#example-2-interactive-language-detector)[Example 3: Structured detection with JSON output](#example-3-structured-detection-with-json-output)[Example 4: Detect and translate](#example-4-detect-and-translate)[Example 5: Batch language detection](#example-5-batch-language-detection)[Conclusion](#conclusion)[Related](#related)

In this guide, you will learn how to integrate language detection capabilities into your app for free, without developer accounts or API keys. Instead of traditional language identification APIs, we'll use Large Language Models (LLMs) through [Puter.js](https://developer.puter.com) for accurate, context-aware language detection. LLMs excel at language detection because they recognize scripts, dialects, code-switching, and short fragments that statistical n-gram detectors typically miss.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the language detection usage.

## Getting Started

Add Puter.js to your project with a single line:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's it, you're ready to start adding language detection to your application.

## Example 1: Basic language detection

You can use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function to access more than 500 large language models for language detection. Here's an example using GPT-5 nano to identify the language of a piece of text.

```javascript
const text = "Bonjour, comment allez-vous aujourd'hui?";
const prompt = `Identify the language of the following text. Respond with only the English name of the language, nothing else.\n\nText: ${text}`;

puter.ai.chat(prompt, { model: "gpt-5-nano" })
.then(language => {
    console.log(language);
});
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const text = "Bonjour, comment allez-vous aujourd'hui?";
        const prompt = `Identify the language of the following text. Respond with only the English name of the language, nothing else.\n\nText: ${text}`;

        puter.print("Detecting language...<br><br>");
        puter.ai.chat(prompt, { model: "gpt-5-nano" })
        .then(language => {
            puter.print(`Detected language: ${language}`);
        });
    </script>
</body>
</html>
```

## Example 2: Interactive language detector

The following example shows how to create an interactive language detector with a simple UI.

```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;}
        textarea { width: 100%; height: 120px; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
        button { margin: 5px; padding: 10px 15px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; background-color: #007bff; color: white; border: none; }
        button:hover { background-color: #0056b3; }
        .result { margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 4px; min-height: 50px; }
    </style>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>

    <h1>Language Detector</h1>
```

Show 40 more lines...

```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;}
        textarea { width: 100%; height: 120px; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
        button { margin: 5px; padding: 10px 15px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; background-color: #007bff; color: white; border: none; }
        button:hover { background-color: #0056b3; }
        .result { margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 4px; min-height: 50px; }
    </style>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>

    <h1>Language Detector</h1>

    <textarea id="text-input" placeholder="Paste text in any language...">Das Wetter ist heute wirklich schÃ¶n.</textarea>

    <div>
        <button onclick="detectLanguage()">Detect Language</button>
    </div>

    <div id="status"></div>
    <div id="result" class="result"></div>

    <script>
        const textInput = document.getElementById('text-input');
        const statusDiv = document.getElementById('status');
        const resultDiv = document.getElementById('result');

        async function detectLanguage() {
            const text = textInput.value.trim();

            if (!text) {
                statusDiv.textContent = 'Please enter some text first!';
                return;
            }

            statusDiv.textContent = 'Detecting language...';
            resultDiv.textContent = '';

            try {
                const prompt = `Identify the language of the following text. Respond with only the English name of the languageâno explanations, comments, or additional notes.\n\nText: ${text}`;
                const language = await puter.ai.chat(prompt, {
                    model: "gpt-5-nano"
                });

                statusDiv.textContent = '';
                resultDiv.textContent = `Detected language: ${language}`;
            } catch (error) {
                statusDiv.textContent = `Error: ${error.message}`;
            }
        }
    </script>
</body>
</html>
```

Collapse code

## Example 3: Structured detection with JSON output

For richer resultsâlanguage name, ISO code, script, and a confidence scoreâprompt the model to return structured JSON. This is ideal when you need to route the text downstream (for example, to a translation pipeline or a locale-specific UI).

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const text = "ããã¯æ¥æ¬èªã®ãã­ã¹ãã§ããä»æ¥ã¯ã¨ã¦ãããå¤©æ°ã§ãã­ã";
            const prompt = `Identify the language of the text below. Return a JSON object with these fields:
- language: the English name of the language (e.g. "Japanese")
- iso_code: the ISO 639-1 two-letter code (e.g. "ja")
- script: the writing system (e.g. "Latin", "Cyrillic", "Han", "Hiragana/Katakana", "Arabic")
- confidence: a number between 0 and 1 indicating how confident you are

Text: ${text}

Respond only with valid JSON, no additional text or code fences.`;
```

Show 20 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const text = "ããã¯æ¥æ¬èªã®ãã­ã¹ãã§ããä»æ¥ã¯ã¨ã¦ãããå¤©æ°ã§ãã­ã";
            const prompt = `Identify the language of the text below. Return a JSON object with these fields:
- language: the English name of the language (e.g. "Japanese")
- iso_code: the ISO 639-1 two-letter code (e.g. "ja")
- script: the writing system (e.g. "Latin", "Cyrillic", "Han", "Hiragana/Katakana", "Arabic")
- confidence: a number between 0 and 1 indicating how confident you are

Text: ${text}

Respond only with valid JSON, no additional text or code fences.`;

            puter.print("Detecting language...<br><br>");

            const response = await puter.ai.chat(prompt, {
                model: 'gpt-5-nano'
            });

            try {
                const result = JSON.parse(response);
                puter.print(`<strong>Language:</strong> ${result.language}<br>`);
                puter.print(`<strong>ISO code:</strong> ${result.iso_code}<br>`);
                puter.print(`<strong>Script:</strong> ${result.script}<br>`);
                puter.print(`<strong>Confidence:</strong> ${(result.confidence * 100).toFixed(1)}%<br>`);
            } catch (e) {
                puter.print(`Raw response: ${response}`);
            }
        })();
    </script>
</body>
</html>
```

Collapse code

## Example 4: Detect and translate

A common workflow is to detect the language of incoming text and then translate it into the user's preferred language. The example below chains language detection with translation in a single flow.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const text = "Hola, Â¿puedes ayudarme con un problema tÃ©cnico?";
            const targetLanguage = "English";

            puter.print(`Original: ${text}<br><br>`);

            const detectPrompt = `Identify the language of the following text. Respond with only the English name of the language, nothing else.\n\nText: ${text}`;
            const detected = (await puter.ai.chat(detectPrompt, { model: 'gpt-5-nano' })).toString().trim();
            puter.print(`Detected language: ${detected}<br>`);

            if (detected.toLowerCase() === targetLanguage.toLowerCase()) {
                puter.print(`Text is already in ${targetLanguage}, no translation needed.`);
                return;
            }

            const translatePrompt = `Translate the following text from ${detected} to ${targetLanguage}. Output only the translation, nothing else:\n\n${text}`;
            const translation = await puter.ai.chat(translatePrompt, { model: 'gpt-5-nano' });
            puter.print(`Translation: ${translation}`);
        })();
    </script>
</body>
</html>
```

## Example 5: Batch language detection

Detect the languages of multiple texts at onceâuseful for sorting incoming messages, comments, or reviews by locale:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const messages = [
                "Where is the nearest train station?",
                "Wo ist der nÃ¤chste Bahnhof?",
                "Â¿DÃ³nde estÃ¡ la estaciÃ³n de tren mÃ¡s cercana?",
                "æå¯ãã®é§ã¯ã©ãã§ããï¼",
                "ÐÐ´Ðµ Ð±Ð»Ð¸Ð¶Ð°Ð¹ÑÐ°Ñ Ð¶ÐµÐ»ÐµÐ·Ð½Ð¾Ð´Ð¾ÑÐ¾Ð¶Ð½Ð°Ñ ÑÑÐ°Ð½ÑÐ¸Ñ?"
            ];

            puter.print("<h3>Batch Language Detection</h3>");
```

Show 16 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const messages = [
                "Where is the nearest train station?",
                "Wo ist der nÃ¤chste Bahnhof?",
                "Â¿DÃ³nde estÃ¡ la estaciÃ³n de tren mÃ¡s cercana?",
                "æå¯ãã®é§ã¯ã©ãã§ããï¼",
                "ÐÐ´Ðµ Ð±Ð»Ð¸Ð¶Ð°Ð¹ÑÐ°Ñ Ð¶ÐµÐ»ÐµÐ·Ð½Ð¾Ð´Ð¾ÑÐ¾Ð¶Ð½Ð°Ñ ÑÑÐ°Ð½ÑÐ¸Ñ?"
            ];

            puter.print("<h3>Batch Language Detection</h3>");

            for (const message of messages) {
                const prompt = `Identify the language of the following text. Respond with only the English name of the language, nothing else.\n\nText: ${message}`;

                const language = await puter.ai.chat(prompt, {
                    model: 'gpt-5-nano'
                });

                puter.print(`<div style="margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px;">
                    <strong>Text:</strong> "${message}"<br>
                    <strong>Language:</strong> ${language.toString().trim()}
                </div>`);
            }
        })();
    </script>
</body>
</html>
```

Collapse code

## Conclusion

Using Puter.js, you can add LLM-powered language detection to your application without setting up API keys or managing langid services. LLMs handle short fragments, mixed-language input, transliterations, and rare scripts more robustly than traditional n-gram or rule-based detectors. Thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), you can add this feature for free to your application, since your users cover their own AI usage, not you as the developer.

You can find more details about Puter.js AI API in the [documentation](https://docs.puter.com/AI/chat/).

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Google AI API](/tutorials/free-unlimited-google-ai-api/)
- [Free, Unlimited Translation API](/tutorials/free-unlimited-translation-api/)
- [Free, Unlimited Sentiment Analysis API](/tutorials/free-unlimited-sentiment-analysis-api/)
- [Free, Unlimited Summarization API](/tutorials/free-unlimited-summarization-api/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
- [Free, Unlimited Text to Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Speech-to-Text API](/tutorials/free-unlimited-speech-to-text-api/)
# Free, Unlimited Amazon Polly API

Source: https://developer.puter.com/tutorials/free-unlimited-amazon-polly-api/

[Tutorials](/tutorials/)

# Free, Unlimited Amazon Polly API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: November 25, 2025
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic text-to-speech](#example-1-basic-text-to-speech)[Example 2: Use various voices](#example-2-use-various-voices)[Example 3: Set output language](#example-3-set-output-language)[Example 4: Comparing engines](#example-4-comparing-engines)[Conclusion](#conclusion)[Related](#related)

In this guide, you will learn how to add the Amazon Polly AI voice generator to your application using Puter.js, without needing an AWS account or using any API keys.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own voice generation costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI or cloud usage.

## Getting Started

To start using Puter.js, include the following script tag in your HTML file, either in the `<head>` or `<body>` section:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's it, you're ready to start integrating Amazon Polly into your application.

## Example 1: Basic text-to-speech

```javascript
puter.ai.txt2speech("Hello world! This is Amazon Polly.", {
    provider: "aws-polly",
})
.then(audio => {
    audio.setAttribute("controls", "");
    document.body.appendChild(audio);
});
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.print("Loading...");
        puter.ai.txt2speech("Hello world! This is Amazon Polly.", {
            provider: "aws-polly",
        })
        .then(audio => {
            audio.setAttribute("controls", "");
            document.body.appendChild(audio);
        });
    </script>
</body>
</html>
```

## Example 2: Use various voices

Amazon Polly provides multiple voices for each language. You can specify which voice to use with the `voice` parameter:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <h1>Try Different Voices</h1>
    <div>
        <button onclick="playVoice('Joanna')">Joanna (Female)</button>
        <button onclick="playVoice('Matthew')">Matthew (Male)</button>
        <button onclick="playVoice('Ivy')">Ivy (Child)</button>
        <button onclick="playVoice('Joey')">Joey (Male)</button>
    </div>
    <div id="audio-container"></div>
    <script>
        async function playVoice(voiceName) {
            const container = document.getElementById('audio-container');
            container.innerHTML = '<p>Loading ' + voiceName + '...</p>';

            const audio = await puter.ai.txt2speech(
                `Hello! My name is ${voiceName}. Nice to meet you!`,
                { provider: "aws-polly", voice: voiceName, language: "en-US" }
            );

            audio.setAttribute("controls", "");
            container.innerHTML = '<p>Playing ' + voiceName + ':</p>';
            container.appendChild(audio);
            audio.play();
        }
    </script>
</body>
</html>
```

## Example 3: Set output language

Amazon Polly supports over 30 languages. You can change the language by setting the `language` parameter:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <h1>Multi-Language Text-to-Speech</h1>
    <div>
        <button onclick="playLanguage('en-US', 'Joanna', 'Hello! How are you today?')">English (US)</button>
        <button onclick="playLanguage('fr-FR', 'Celine', 'Bonjour! Comment allez-vous?')">French</button>
        <button onclick="playLanguage('es-ES', 'Lucia', 'Â¡Hola! Â¿CÃ³mo estÃ¡s?')">Spanish</button>
        <button onclick="playLanguage('de-DE', 'Marlene', 'Hallo! Wie geht es dir?')">German</button>
        <button onclick="playLanguage('ja-JP', 'Mizuki', 'ããã«ã¡ã¯ï¼ãåæ°ã§ããï¼')">Japanese</button>
        <button onclick="playLanguage('pt-BR', 'Camila', 'OlÃ¡! Como vocÃª estÃ¡?')">Portuguese (BR)</button>
    </div>
    <div id="audio-container"></div>
    <script>
        async function playLanguage(languageCode, voice, text) {
```

Show 19 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <h1>Multi-Language Text-to-Speech</h1>
    <div>
        <button onclick="playLanguage('en-US', 'Joanna', 'Hello! How are you today?')">English (US)</button>
        <button onclick="playLanguage('fr-FR', 'Celine', 'Bonjour! Comment allez-vous?')">French</button>
        <button onclick="playLanguage('es-ES', 'Lucia', 'Â¡Hola! Â¿CÃ³mo estÃ¡s?')">Spanish</button>
        <button onclick="playLanguage('de-DE', 'Marlene', 'Hallo! Wie geht es dir?')">German</button>
        <button onclick="playLanguage('ja-JP', 'Mizuki', 'ããã«ã¡ã¯ï¼ãåæ°ã§ããï¼')">Japanese</button>
        <button onclick="playLanguage('pt-BR', 'Camila', 'OlÃ¡! Como vocÃª estÃ¡?')">Portuguese (BR)</button>
    </div>
    <div id="audio-container"></div>
    <script>
        async function playLanguage(languageCode, voice, text) {
            const container = document.getElementById('audio-container');
            container.innerHTML = `<p>Loading ${languageCode} with ${voice} voice...</p>`;

            try {
                const audio = await puter.ai.txt2speech(text,
                  { provider: "aws-polly", voice: voice, language: languageCode }
                );

                audio.setAttribute("controls", "");
                container.innerHTML = `<p><strong>Language:</strong> ${languageCode} | <strong>Voice:</strong> ${voice}</p><p><strong>Text:</strong> "${text}"</p>`;
                container.appendChild(audio);
                audio.play();
            } catch (error) {
                container.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
            }
        }
    </script>
</body>
</html>
```

Collapse code

## Example 4: Comparing engines

Amazon Polly offers different engines with varying quality levels. The `engine` parameter lets you choose between `standard`, `neural`, `long-form`, and `generative`:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <h1>Compare Amazon Polly Engines</h1>
    <div>
        <button onclick="playEngine('standard')">Standard (Basic)</button>
        <button onclick="playEngine('neural')">Neural (Enhanced)</button>
        <button onclick="playEngine('generative')">Generative (Natural)</button>
    </div>
    <div id="audio-container"></div>
    <script>
        async function playEngine(engine) {
            const container = document.getElementById('audio-container');
            const text = "Hello world! This is a test of the Amazon Polly text-to-speech engines. Notice the difference in quality and naturalness between each engine.";
```

Show 17 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <h1>Compare Amazon Polly Engines</h1>
    <div>
        <button onclick="playEngine('standard')">Standard (Basic)</button>
        <button onclick="playEngine('neural')">Neural (Enhanced)</button>
        <button onclick="playEngine('generative')">Generative (Natural)</button>
    </div>
    <div id="audio-container"></div>
    <script>
        async function playEngine(engine) {
            const container = document.getElementById('audio-container');
            const text = "Hello world! This is a test of the Amazon Polly text-to-speech engines. Notice the difference in quality and naturalness between each engine.";

            container.innerHTML = `<p>Loading ${engine} engine...</p>`;

            const audio = await puter.ai.txt2speech(text, {
                provider: "aws-polly",
                voice: "Joanna",
                engine: engine,
                language: "en-US"
            });

            audio.setAttribute("controls", "");
            container.innerHTML = `<p>Playing ${engine} engine:</p>`;
            container.appendChild(audio);
            audio.play();
        }
    </script>
</body>
</html>
```

Collapse code

## Conclusion

Using Puter.js, you can gain access to the Amazon Polly AI voice generator without having to set up an AWS account or use any API keys. Thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own voice generation usage, not you as the developer. This means you can build powerful applications without worrying about usage costs.

You can find more details about Puter.js [text-to-speech API](/text-to-speech/) in the [documentation](https://docs.puter.com/AI/txt2speech/).

## Related

- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited OpenAI Text to Speech API](/tutorials/free-unlimited-openai-text-to-speech-api/)
- [Free, Unlimited ElevenLabs API](/tutorials/free-unlimited-elevenlabs-api/)
- [Free, Unlimited Speech-to-Text API](/tutorials/free-unlimited-speech-to-text-api/)
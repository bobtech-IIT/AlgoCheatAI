# Free, Unlimited OpenAI Text to Speech API

Source: https://developer.puter.com/tutorials/free-unlimited-openai-text-to-speech-api/

[Tutorials](/tutorials/)

# Free, Unlimited OpenAI Text to Speech API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 20, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic text-to-speech](#example-1-basic-text-to-speech)[Example 2: Customizing voice](#example-2-customizing-voice)[Example 3: Set different response format](#example-3-set-different-response-format)[Example 4: Add custom instructions](#example-4-add-custom-instructions)[Example 5: Compare models](#example-5-compare-models)[List of OpenAI TTS models](#list-of-openai-tts-models)[Conclusion](#conclusion)[Related](#related)

In this guide, you will learn how to integrate OpenAI TTS to your app for free, without OpenAI developer account or API keys. The OpenAI TTS includes models such as GPT-4o mini TTS, tts-1, and tts-1-hd, all suitable for different workloads.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the TTS usage.

Puter.js is also a great fit for AI coding assistants, agents, and vibe coding platforms such as Claude Code, [Codex](/ai/codex/), OpenCode, Lovable, Replit, and Bolt.new. Since it's keyless and serverless, an AI-generated text-to-speech app built on Puter.js runs end-to-end the moment it's generated, with no third-party backend to sign up for, no service to provision, and no API keys to paste in. That removes a whole class of security issues along with the setup friction that normally stops these apps from working out of the box.

## Getting Started

Add Puter.js to your project with a single line:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's it, you're ready to start integrating OpenAI TTS into your application.

## Example 1: Basic text-to-speech

```javascript
puter.ai.txt2speech("Hello world! This is OpenAI text-to-speech.", {
    provider: "openai",
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
        puter.ai.txt2speech("Hello world! This is OpenAI text-to-speech.", {
            provider: "openai",
        })
        .then(audio => {
            audio.setAttribute("controls", "");
            document.body.appendChild(audio);
        });
    </script>
</body>
</html>
```

## Example 2: Customizing voice

OpenAI provides several built-in voices: `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `nova`, `onyx`, `sage`, and `shimmer`. Each voice has its own unique character.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.print("Loading...");
        puter.ai.txt2speech("This is using the Nova voice, which has a friendly tone.", {
            provider: "openai",
            voice: "nova",
            model: "gpt-4o-mini-tts"
        })
        .then(audio => {
            audio.setAttribute("controls", "");
            document.body.appendChild(audio);
        });
    </script>
</body>
</html>
```

## Example 3: Set different response format

You can control the output format with the `response_format` parameter. Available formats include `mp3` (default), `wav`, `opus`, `aac`, `flac`, and `pcm`.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.print("Loading...");
        puter.ai.txt2speech("This audio will be in WAV format for higher quality.", {
            provider: "openai",
            voice: "alloy",
            response_format: "wav"
        })
        .then(audio => {
            audio.setAttribute("controls", "");
            document.body.appendChild(audio);
        });
    </script>
</body>
</html>
```

## Example 4: Add custom instructions

Use the `instructions` parameter to provide additional guidance for voice style, tone, pacing, and mood.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.print("Loading...");
        puter.ai.txt2speech("Welcome to our application! We're excited to have you here.", {
            provider: "openai",
            voice: "shimmer",
            model: "gpt-4o-mini-tts",
            instructions: "Speak in an enthusiastic and energetic tone, with a slightly faster pace."
        })
        .then(audio => {
            audio.setAttribute("controls", "");
            document.body.appendChild(audio);
        });
    </script>
</body>
</html>
```

## Example 5: Compare models

OpenAI offers three TTS models: `gpt-4o-mini-tts` (default), `tts-1` (optimized for speed), and `tts-1-hd` (optimized for quality). Here's an interactive example to compare them:

```html
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        textarea {
            width: 100%;
            height: 80px;
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #ccc;
```

Show 73 more lines...

```html
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        textarea {
            width: 100%;
            height: 80px;
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            margin: 5px;
            padding: 10px 15px;
            cursor: pointer;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
        }
        button:hover {
            background-color: #0056b3;
        }
        .status {
            margin: 10px 0;
            padding: 10px;
            font-size: 14px;
            background-color: #f8f9fa;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>

    <h1>Compare OpenAI TTS Models</h1>

    <textarea id="text-input" placeholder="Enter text to convert to speech...">Hello! This is a demonstration of OpenAI text-to-speech models.</textarea>

    <div>
        <button onclick="playAudio('gpt-4o-mini-tts')">GPT-4o mini TTS</button>
        <button onclick="playAudio('tts-1')">TTS-1 (Fast)</button>
        <button onclick="playAudio('tts-1-hd')">TTS-1-HD (Quality)</button>
    </div>

    <div id="status" class="status">Click a button to hear the text in different models.</div>

    <script>
        const textInput = document.getElementById('text-input');
        const statusDiv = document.getElementById('status');

        async function playAudio(model) {
            const text = textInput.value.trim();

            if (!text) {
                statusDiv.textContent = 'Please enter some text first!';
                return;
            }

            if (text.length > 3000) {
                statusDiv.textContent = 'Text must be less than 3000 characters!';
                return;
            }

            statusDiv.textContent = `Converting with ${model}...`;

            try {
                const audio = await puter.ai.txt2speech(text, {
                    provider: "openai",
                    model: model,
                    voice: "alloy"
                });

                statusDiv.textContent = `Playing ${model} audio`;
                audio.play();
            } catch (error) {
                statusDiv.textContent = `Error: ${error.message}`;
            }
        }
    </script>
</body>
</html>
```

Collapse code

## List of OpenAI TTS models

You can use the following OpenAI TTS models with Puter.js:

```javascript
gpt-4o-mini-tts
tts-1
tts-1-hd
```

## Conclusion

Using Puter.js, you can gain access to OpenAI TTS models without having to set up an OpenAI developer account or manage API keys yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), you can add this feature for free to your application, since your users cover their own TTS usage, not you as the developer.

You can find more details about Puter.js [text-to-speech API](/text-to-speech/) in the [documentation](https://docs.puter.com/AI/txt2speech/).

## Related

- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Amazon Polly API](/tutorials/free-unlimited-amazon-polly-api/)
- [Free, Unlimited ElevenLabs API](/tutorials/free-unlimited-elevenlabs-api/)
- [Free, Unlimited Speech-to-Text API](/tutorials/free-unlimited-speech-to-text-api/)
- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
- [OpenAI API Pricing](/tutorials/openai-api-pricing/)
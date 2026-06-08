# Free, Unlimited ElevenLabs API

Source: https://developer.puter.com/tutorials/free-unlimited-elevenlabs-api/

[Tutorials](/tutorials/)

# Free, Unlimited ElevenLabs API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 17, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Convert text to speech with ElevenLabs](#example-1-convert-text-to-speech-with-elevenlabs)[Example 2: Choose different ElevenLabs voices](#example-2-choose-different-elevenlabs-voices)[Example 3: Use different ElevenLabs models](#example-3-use-different-elevenlabs-models)[Example 4: Customize output format](#example-4-customize-output-format)[Example 5: Voice conversion with speech-to-speech](#example-5-voice-conversion-with-speech-to-speech)[Additional Features](#additional-features)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [ElevenLabs text-to-speech](/ai/elevenlabs/) and voice conversion capabilities for free, without needing an ElevenLabs API key. Puter.js allows you to offer advanced voice synthesis and conversion capabilities to your users at no cost to yourself, without any API keys or server-side setup.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate [AI capabilities](/ai/) into their applications while each user will cover their own usage costs. This model enables developers to offer advanced voice synthesis to users at no cost to themselves, without any API keys or server-side setup.

The serverless, keyless, and user-pays nature of Puter.js makes it a great choice for AI coding assistants, agents, and vibe coding platforms to build on top of. Because there are no keys and no backend involved, any software or app these tools produce, using Puter.js, will run end-to-end as soon as it's generated. No third-party signup, no service to spin up, no API keys to paste. That cuts out a whole category of security pitfalls and the configuration overhead that normally stops AI-generated apps from working on the first run.

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

Nothing else is required to start using Puter.js for free access to ElevenLabs capabilities.

## Example 1: Convert text to speech with ElevenLabs

To convert text to speech using ElevenLabs, use the [`puter.ai.txt2speech()`](https://docs.puter.com/AI/txt2speech/) function with the ElevenLabs provider:

```javascript
puter.ai.txt2speech("Hello world! This is ElevenLabs text-to-speech.", {
    provider: "elevenlabs",
    voice: "21m00Tcm4TlvDq8ikWAM", // Rachel sample voice
    model: "eleven_multilingual_v2"
})
.then(audio => {
    audio.play();
});
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2speech("Hello world! This is ElevenLabs text-to-speech.", {
            provider: "elevenlabs",
            voice: "21m00Tcm4TlvDq8ikWAM",
            model: "eleven_multilingual_v2"
        })
        .then(audio => {
            audio.play();
        });
    </script>
</body>
</html>
```

## Example 2: Choose different ElevenLabs voices

ElevenLabs offers various voice options. You can use any ElevenLabs voice ID from your account, or use the public sample voice:

```javascript
// Using the Rachel sample voice (publicly available)
puter.ai.txt2speech("Welcome to our application!", {
    provider: "elevenlabs",
    voice: "21m00Tcm4TlvDq8ikWAM", // Rachel
    model: "eleven_multilingual_v2"
})
.then(audio => {
    audio.play();
});
```

Full interactive example:

```html
<html>
<body>
    <textarea id="text-input" rows="4" cols="50">Welcome to our application! This voice synthesis is powered by ElevenLabs.</textarea>
    <br>
    <button id="speak-button">Speak with ElevenLabs</button>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        document.getElementById('speak-button').addEventListener('click', () => {
            const text = document.getElementById('text-input').value;
            puter.ai.txt2speech(text, {
                provider: "elevenlabs",
                voice: "21m00Tcm4TlvDq8ikWAM",
                model: "eleven_multilingual_v2"
            })
            .then(audio => {
                audio.play();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    </script>
</body>
</html>
```

## Example 3: Use different ElevenLabs models

ElevenLabs provides several models optimized for different use cases:

- `eleven_multilingual_v2` - High-quality multilingual model (default)
- `eleven_flash_v2_5` - Fast generation with good quality
- `eleven_turbo_v2_5` - Ultra-fast generation
- `eleven_v3` - Latest generation model

```javascript
// Using the flash model for faster generation
puter.ai.txt2speech("Quick response needed!", {
    provider: "elevenlabs",
    voice: "21m00Tcm4TlvDq8ikWAM",
    model: "eleven_flash_v2_5"
})
.then(audio => {
    audio.play();
});
```

Full code example comparing different models:

```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        textarea { width: 100%; height: 80px; margin: 10px 0; }
        button { margin: 5px; padding: 10px 15px; cursor: pointer; }
        .multilingual { background-color: #e3f2fd; }
        .flash { background-color: #fff3e0; }
        .turbo { background-color: #f3e5f5; }
        .status { margin: 10px 0; padding: 5px; font-size: 14px; }
    </style>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>
```

Show 42 more lines...

```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        textarea { width: 100%; height: 80px; margin: 10px 0; }
        button { margin: 5px; padding: 10px 15px; cursor: pointer; }
        .multilingual { background-color: #e3f2fd; }
        .flash { background-color: #fff3e0; }
        .turbo { background-color: #f3e5f5; }
        .status { margin: 10px 0; padding: 5px; font-size: 14px; }
    </style>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <h1>ElevenLabs Model Comparison</h1>
    
    <textarea id="text-input" placeholder="Enter text to convert to speech...">Hello! This demonstrates different ElevenLabs models. Notice the speed and quality differences between multilingual, flash, and turbo models.</textarea>
    
    <div>
        <button class="multilingual" onclick="playAudio('eleven_multilingual_v2')">Multilingual V2</button>
        <button class="flash" onclick="playAudio('eleven_flash_v2_5')">Flash V2.5</button>
        <button class="turbo" onclick="playAudio('eleven_turbo_v2_5')">Turbo V2.5</button>
    </div>
    
    <div id="status" class="status"></div>

    <script>
        const textInput = document.getElementById('text-input');
        const statusDiv = document.getElementById('status');
        
        async function playAudio(model) {
            const text = textInput.value.trim();
            
            if (!text) {
                statusDiv.textContent = 'Please enter some text first!';
                return;
            }
            
            statusDiv.textContent = `Converting with ${model}...`;
            
            try {
                const audio = await puter.ai.txt2speech(text, {
                    provider: "elevenlabs",
                    voice: "21m00Tcm4TlvDq8ikWAM",
                    model: model
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

## Example 4: Customize output format

You can customize the output audio format for your specific needs:

```javascript
puter.ai.txt2speech("Custom format example", {
    provider: "elevenlabs",
    voice: "21m00Tcm4TlvDq8ikWAM",
    output_format: "mp3_44100_128" // MP3 at 44.1kHz, 128kbps
})
.then(audio => {
    audio.play();
});
```

Available output formats include:

- `mp3_44100_128` - Standard quality MP3 (default)
- `mp3_44100_192` - High quality MP3
- `pcm_16000` - Raw PCM audio
- `pcm_22050` - PCM at 22.05kHz
- `pcm_24000` - PCM at 24kHz
- `ulaw_8000` - Compressed 8-bit audio

Full code example:

```html
<html>
<body>
    <textarea id="text-input" rows="4" cols="50">This is a test of different audio formats.</textarea>
    <br>
    <select id="format-select">
        <option value="mp3_44100_128">MP3 Standard (44.1kHz, 128kbps)</option>
        <option value="mp3_44100_192">MP3 High Quality (44.1kHz, 192kbps)</option>
        <option value="pcm_16000">PCM 16kHz</option>
        <option value="pcm_22050">PCM 22.05kHz</option>
    </select>
    <button id="speak-button">Generate Audio</button>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        document.getElementById('speak-button').addEventListener('click', () => {
```

Show 18 more lines...

```html
<html>
<body>
    <textarea id="text-input" rows="4" cols="50">This is a test of different audio formats.</textarea>
    <br>
    <select id="format-select">
        <option value="mp3_44100_128">MP3 Standard (44.1kHz, 128kbps)</option>
        <option value="mp3_44100_192">MP3 High Quality (44.1kHz, 192kbps)</option>
        <option value="pcm_16000">PCM 16kHz</option>
        <option value="pcm_22050">PCM 22.05kHz</option>
    </select>
    <button id="speak-button">Generate Audio</button>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        document.getElementById('speak-button').addEventListener('click', () => {
            const text = document.getElementById('text-input').value;
            const format = document.getElementById('format-select').value;
            
            puter.ai.txt2speech(text, {
                provider: "elevenlabs",
                voice: "21m00Tcm4TlvDq8ikWAM",
                output_format: format
            })
            .then(audio => {
                audio.play();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    </script>
</body>
</html>
```

Collapse code

## Example 5: Voice conversion with speech-to-speech

ElevenLabs also supports voice conversion (also known as Voice Changer API), allowing you to transform an existing audio recording into a different voice. Use the [`puter.ai.speech2speech()`](https://docs.puter.com/AI/speech2speech/) function:

```javascript
// Convert an audio URL to a different voice
puter.ai.speech2speech("https://assets.puter.site/example.mp3", {
    voice: "21m00Tcm4TlvDq8ikWAM", // Target voice
    model: "eleven_multilingual_sts_v2"
})
.then(audio => {
    audio.play();
});
```

Full example showing original and converted audio:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <h1>Voice Conversion Demo</h1>
    
    <h3>Original Audio:</h3>
    <audio controls>
        <source src="https://assets.puter.site/example.mp3" type="audio/mpeg">
    </audio>
    
    <br><br>
    <button id="convertBtn">Convert to Different Voice</button>
    
    <h3 id="convertedTitle" style="display: none;">Converted Audio:</h3>
```

Show 29 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <h1>Voice Conversion Demo</h1>
    
    <h3>Original Audio:</h3>
    <audio controls>
        <source src="https://assets.puter.site/example.mp3" type="audio/mpeg">
    </audio>
    
    <br><br>
    <button id="convertBtn">Convert to Different Voice</button>
    
    <h3 id="convertedTitle" style="display: none;">Converted Audio:</h3>
    <audio id="convertedAudio" controls style="display: none;"></audio>

    <script>
        document.getElementById('convertBtn').addEventListener('click', async () => {
            const btn = document.getElementById('convertBtn');
            btn.disabled = true;
            btn.textContent = 'Converting...';
            
            try {
                const audio = await puter.ai.speech2speech("https://assets.puter.site/example.mp3", {
                    voice: "21m00Tcm4TlvDq8ikWAM",
                    model: "eleven_multilingual_sts_v2"
                });
                
                document.getElementById('convertedTitle').style.display = 'block';
                document.getElementById('convertedAudio').src = audio.toString();
                document.getElementById('convertedAudio').style.display = 'block';
                audio.play();
                
            } catch (error) {
                alert('Error: ' + error.message);
            }
            
            btn.disabled = false;
            btn.textContent = 'Convert to Different Voice';
        });
    </script>
</body>
</html>
```

Collapse code

That's it! You now have a comprehensive understanding of how to use Puter.js as a free alternative to the ElevenLabs API. With support for both text-to-speech and voice conversion, you can create rich voice experiences without worrying about API keys, usage limits, or costs. True serverless voice synthesis!

## Additional Features

Puter.js offers many more features, including [cloud storage](/object-storage/), hosting static websites, and AI-powered image generation. Explore the [Puter.js documentation](https://docs.puter.com/) to discover all the possibilities and start building powerful, serverless web applications with ease!

## Related

- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Amazon Polly API](/tutorials/free-unlimited-amazon-polly-api/)
- [Free, Unlimited OpenAI Text-to-Speech API](/tutorials/free-unlimited-openai-text-to-speech-api/)
- [Free, Unlimited Speech-to-Text API](/tutorials/free-unlimited-speech-to-text-api/)
- [Free, Unlimited Translation API](/tutorials/free-unlimited-translation-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited Voice Changer API](/tutorials/free-unlimited-voice-changer-api/)
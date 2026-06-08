# Free, Unlimited Voice Changer API

Source: https://developer.puter.com/tutorials/free-unlimited-voice-changer-api/

[Tutorials](/tutorials/)

# Free, Unlimited Voice Changer API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 20, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Voice Conversion](#example-1-basic-voice-conversion)[Example 2: Upload and Convert Voice](#example-2-upload-and-convert-voice)[Example 3: Convert to a Specific Voice](#example-3-convert-to-a-specific-voice)[List of Voices](#list-of-voices)[Conclusion](#conclusion)[Related](#related)

This tutorial demonstrates how to use [Puter.js](https://developer.puter.com) to convert and clone voices for free, without requiring API keys or dealing with usage restrictions. With Puter.js, you can access powerful [voice changer](/voice-changer/) capabilities powered by ElevenLabs' multilingual voice conversion model, perfect for content creation, voice dubbing, and entertainment applications.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), enabling developers to integrate AI-powered voice conversion into their apps while users cover their own usage costs. This approach lets you offer professional-grade voice changing features without managing API keys or backend infrastructure.

Puter.js is also a natural fit for AI coding assistants, agents, and vibe coding platforms such as Claude Code, [Codex](/ai/codex/), OpenCode, Lovable, Replit, and Bolt.new. Its keyless, serverless design means any voice conversion app these tools produce works end-to-end as soon as it's generated, without signing up for a third-party backend, provisioning a service, or pasting in API keys. That removes a major class of security issues and the setup friction that usually keeps such apps from running out of the box.

## Getting Started

No API keys or account registration needed to use Puter.js. Simply add this script tag to your HTML file in either the `<head>` or `<body>` section:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's all the setup required to start converting voices with Puter.js!

## Example 1: Basic Voice Conversion

To convert a voice from an audio file, use the [`puter.ai.speech2speech()`](https://docs.puter.com/AI/speech2speech/) function. Here's a complete working example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.speech2speech('https://assets.puter.site/example.mp3')
            .then(audio => {
                document.body.appendChild(audio);
                audio.play();
            });
    </script>
</body>
</html>
```

## Example 2: Upload and Convert Voice

Create an interactive interface that lets users upload audio files for instant voice conversion:

```html
<html>
<body>
    <input type="file" id="audio-upload" accept="audio/*">
    <button id="convert-btn">Convert Voice</button>
    <div id="audio-output"></div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        document.getElementById('convert-btn').addEventListener('click', async () => {
            const fileInput = document.getElementById('audio-upload');
            const outputDiv = document.getElementById('audio-output');

            if (!fileInput.files[0]) {
                outputDiv.textContent = 'Please select an audio file first';
                return;
```

Show 16 more lines...

```html
<html>
<body>
    <input type="file" id="audio-upload" accept="audio/*">
    <button id="convert-btn">Convert Voice</button>
    <div id="audio-output"></div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        document.getElementById('convert-btn').addEventListener('click', async () => {
            const fileInput = document.getElementById('audio-upload');
            const outputDiv = document.getElementById('audio-output');

            if (!fileInput.files[0]) {
                outputDiv.textContent = 'Please select an audio file first';
                return;
            }

            outputDiv.textContent = 'Converting voice...';

            try {
                const audio = await puter.ai.speech2speech(fileInput.files[0]);
                outputDiv.innerHTML = '';
                outputDiv.appendChild(audio);
                audio.controls = true;
            } catch (error) {
                outputDiv.textContent = 'Error: ' + error.message;
            }
        });
    </script>
</body>
</html>
```

Collapse code

## Example 3: Convert to a Specific Voice

Specify a voice ID to convert audio to a particular voice:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const audio = await puter.ai.speech2speech({
                audio: 'https://assets.puter.site/example.mp3',
                voice: '21m00Tcm4TlvDq8ikWAM', // Rachel sample voice
            });

            document.body.appendChild(audio);
            audio.controls = true;
            audio.play();
        })();
    </script>
</body>
</html>
```

## List of Voices

Here are the premade voice IDs you can use with the speech to speech API:

| Name | Voice ID | Gender | Age | Accent | Description | Use Case |
| --- | --- | --- | --- | --- | --- | --- |
| Adam | `pNInz6obpgDQGcFmaJgB` | male | middle aged | american | deep | narration |
| Alice | `Xb7hH8MSUJpSbSDYk0k2` | female | middle aged | british | confident | news |
| Antoni | `ErXwobaYiN019PkySvjV` | male | young | american | well-rounded | narration |
| Arnold | `VR6AewLTigWG4xSOukaG` | male | middle aged | american | crisp | narration |
| Bill | `pqHfZKP75CvOlQylNhV4` | male | middle aged | american | strong | documentary |
| Brian | `nPczCjzI2devNBz1zQrb` | male | middle aged | american | deep | narration |
| Callum | `N2lVS1w4EtoT3dr4eOWO` | male | middle aged | american | hoarse | video games |
| Charlie | `IKne3meq5aSn9XLyUdCD` | male | middle aged | australian | casual | conversational |
| Charlotte | `XB0fDUnXU5powFXDhCwa` | female | middle aged | english-swedish | seductive | video games |
| Chris | `iP95p4xoKVk53GoZ742B` | male | middle aged | american | casual | conversational |
| Clyde | `2EiwWnXFnvU5JabPnv8n` | male | middle aged | american | war veteran | video games |
| Daniel | `onwK4e9ZLuTAKqWW03F9` | male | middle aged | british | deep | news presenter |
| Dave | `CYw3kZ02Hs0563khs1Fj` | male | young | british-essex | conversational | video games |
| Domi | `AZnzlk1XvdvUeBnXmlld` | female | young | american | strong | narration |
| Dorothy | `ThT5KcBeYPX3keUQqHPh` | female | young | british | pleasant | children's stories |
| Drew | `29vD33N1CtxCmqQRPOHJ` | male | middle aged | american | well-rounded | news |
| Emily | `LcfcDJNUP1GQjkzn1xUU` | female | young | american | calm | meditation |
| Ethan | `g5CIjZEefAph4nQFvHAz` | male | young | american | â | ASMR |
| Fin | `D38z5RcWu1voky8WS1ja` | male | old | irish | sailor | video games |
| Freya | `jsCqWAovK2LkecY7zXl4` | female | young | american | â | â |
| George | `JBFqnCBsd6RMkjVDRZzb` | male | middle aged | british | raspy | narration |
| Gigi | `jBpfuIE2acCO8z3wKNLl` | female | young | american | childish | animation |
| Giovanni | `zcAOhNBS3c14rBihAFp1` | male | young | english-italian | foreigner | audiobook |
| Glinda | `z9fAnlkpzviPz146aGWa` | female | middle aged | american | witch | video games |
| Grace | `oWAxZDx7w5VEj9dCyTzz` | female | young | american-southern | â | audiobook |
| Harry | `SOYHLrjzK2X1ezoPC6cr` | male | young | american | anxious | video games |
| James | `ZQe5CZNOzWyzPSCn5a3c` | male | old | australian | calm | news |
| Jeremy | `bVMeCyTHy58xNoL34h3p` | male | young | american-irish | excited | narration |
| Jessie | `t0jbNlBVZ17f02VDIeMI` | male | old | american | raspy | video games |
| Joseph | `Zlb1dXrM653N07WRdFW3` | male | middle aged | british | â | news |
| Josh | `TxGEqnHWrfWFTfGW9XjX` | male | young | american | deep | narration |
| Liam | `TX3LPaxmHKxFdv7VOQHJ` | male | young | american | â | narration |
| Lily | `pFZP5JQG7iQjIQuC4Bku` | female | middle aged | british | raspy | narration |
| Matilda | `XrExE9yKIg1WjnnlVkGX` | female | young | american | warm | audiobook |
| Michael | `flq6f7yk4E4fJM5XTYuZ` | male | old | american | â | audiobook |
| Mimi | `zrHiDhphv9ZnVXBqCLjz` | female | young | english-swedish | childish | animation |
| Nicole | `piTKgcLEGmPE4e6mEKli` | female | young | american | whisper | audiobook |
| Patrick | `ODq5zmih8GrVes37Dizd` | male | middle aged | american | shouty | video games |
| Paul | `5Q0t7uMcjvnagumLfvZi` | male | middle aged | american | ground reporter | news |
| Rachel | `21m00Tcm4TlvDq8ikWAM` | female | young | american | calm | narration |
| Sam | `yoZ06aMxZJJ28mfd3POQ` | male | young | american | raspy | narration |
| Sarah | `EXAVITQu4vr4xnSDxMaL` | female | young | american | soft | news |
| Serena | `pMsXgVXv3BLzUgSXRplE` | female | middle aged | american | pleasant | interactive |
| Thomas | `GBv7mTt0atIp3Br8iCZE` | male | young | american | calm | meditation |
| Santa Claus | `knrPHWnBmmDHMoiMeP3l` | male | old | â | â | christmas |

## Conclusion

That's it! You now have free, unlimited access to professional voice changing capabilities using Puter.js. Convert voices, clone audio, and remove background noiseâall without API keys or backend servers.

## Related

- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Speech-to-Text API](/tutorials/free-unlimited-speech-to-text-api/)
- [Free, Unlimited ElevenLabs API](/tutorials/free-unlimited-elevenlabs-api/)
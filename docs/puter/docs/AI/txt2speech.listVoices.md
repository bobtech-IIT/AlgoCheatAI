# puter.ai.txt2speech.listVoices()

Source: https://docs.puter.com/AI/txt2speech.listVoices/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.ai.txt2speech.listVoices()`

 Websites Puter Apps Node.js Workers

---

Returns the voices available from a TTS provider. Each voice entry includes metadata such as language, category, and supported models.

## Syntax

```js
puter.ai.txt2speech.listVoices()
puter.ai.txt2speech.listVoices(options)
```

## Parameters

#### `options` (Object) (optional)

| Option | Type | Description |
| --- | --- | --- |
| `provider` | `String` | TTS provider to query. Defaults to `'aws-polly'`. Accepted: `'aws-polly'`, `'openai'`, `'elevenlabs'`, `'gemini'`, `'xai'` |
| `engine` | `String` | Engine/model filter (provider-specific, ignored by some providers) |

When `options` is a plain string it is treated as an `engine` filter for the default (AWS Polly) provider.

## Return value

A `Promise` that resolves to an array of voice objects. Each object contains:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` | Voice identifier to pass to `txt2speech()` |
| `name` | `String` | Human-readable voice name |
| `provider` | `String` | Provider this voice belongs to |
| `language` | `Object` | `{ name, code }` language info (may be absent) |
| `description` | `String` | Short description of the voice (may be absent) |
| `category` | `String` | Voice category, e.g. `'premade'` (may be absent) |
| `labels` | `Object` | Provider-specific labels (may be absent) |
| `supported_models` | `Array` | Model IDs this voice works with (may be absent) |
| `supported_engines` | `Array` | Engine types this voice supports (may be absent) |

Example response:

```json
[
  {
    "id": "alloy",
    "name": "Alloy",
    "provider": "openai",
    "description": "A balanced, neutral voice"
  },
  {
    "id": "Joanna",
    "name": "Joanna",
    "provider": "aws-polly",
    "language": { "name": "English (US)", "code": "en-US" },
    "supported_engines": ["standard", "neural"]
  }
]
```

## Examples

**List voices for a provider**

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const voices = await puter.ai.txt2speech.listVoices({ provider: 'openai' });
            puter.print('OpenAI voices:');
            for (const voice of voices) {
                puter.print(`  ${voice.id} - ${voice.name}`);
            }
        })();
    </script>
</body>
</html>
```

**List all default (AWS Polly) voices**

```js
const voices = await puter.ai.txt2speech.listVoices();
for (const voice of voices) {
    const lang = voice.language ? ` (${voice.language.code})` : '';
    console.log(`${voice.id} - ${voice.name}${lang}`);
}
```

**List Gemini voices**

```js
const voices = await puter.ai.txt2speech.listVoices({ provider: 'gemini' });
for (const voice of voices) {
    console.log(voice.id, voice.name);
}
```

[NEXT

`txt2vid()`](/./AI/txt2vid/)[PREVIOUS

`txt2speech.listEngines()`](/./AI/txt2speech.listEngines/)
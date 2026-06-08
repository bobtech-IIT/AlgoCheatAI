# Free, Unlimited Mancer AI API

Source: https://developer.puter.com/tutorials/free-unlimited-mancer-api/

[Tutorials](/tutorials/)

# Free, Unlimited Mancer AI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 11, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Generate a story opening with Weaver](#example-1-generate-a-story-opening-with-weaver)[Example 2: Character roleplay with Weaver](#example-2-character-roleplay-with-weaver)[Example 3: Continue a narrative scene](#example-3-continue-a-narrative-scene)[Example 4: Streaming responses for real-time storytelling](#example-4-streaming-responses-for-real-time-storytelling)[List of supported models](#list-of-supported-models)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Mancer AI's](/ai/mancer/) [Weaver](/ai/mancer/weaver/) model for roleplay, narrative text generation, and creative storytelling for free, without needing API keys or backend infrastructure. Puter.js is completely free for apps, allowing you to provide your users with powerful narrative AI capabilities without any server-side setup.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate [AI features](/ai/) into their applications with each user covering their own usage costs. This enables developers to offer advanced AI capabilities to users at no cost to themselves, without any API keys or server-side setup.

## Getting Started

You can use Puter.js without any API keys or sign-ups. To start using Puter.js, include the following script tag in your HTML file, either in the `<head>` or `<body>` section:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

Nothing else is required to start using Puter.js for free access to Mancer AI's Weaver model.

## Example 1: Generate a story opening with Weaver

Weaver is a LLaMA 2 13B fine-tune built specifically for roleplay and narrative text generation. It excels at verbose, descriptive prose, making it ideal for story openings and immersive scene-setting. Use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```javascript
puter.ai.chat("Write the opening paragraph of a fantasy story about a thief who discovers a hidden library.", { model: "mancer/weaver" })
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
        puter.ai.chat("Write the opening paragraph of a fantasy story about a thief who discovers a hidden library.", { model: "mancer/weaver" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

## Example 2: Character roleplay with Weaver

Weaver is purpose-built for character-driven dialogue and immersive roleplay. You can establish a character through a system prompt and have the model respond in-character:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const messages = [
            {
                role: "system",
                content: "You are Captain Elara Voss, a battle-hardened starship captain who has seen too many wars. You speak with weary authority, choose your words carefully, and never sugarcoat the truth. Stay in character."
            },
            {
                role: "user",
                content: "Captain, the crew is asking if we should accept the diplomatic mission to Andora Prime. What's your call?"
            }
        ];

        puter.ai.chat(messages, { model: "mancer/weaver" })
            .then(response => {
                puter.print(response);
            });
    </script>
</body>
</html>
```

This example demonstrates how Weaver maintains character voice and persona consistently, which is essential for chatbots, text adventures, and interactive fiction.

## Example 3: Continue a narrative scene

Weaver shines when extending an existing narrative. Provide a scene and let the model continue it with rich descriptive detail:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Continue this scene with vivid sensory detail:\n\nThe lantern guttered as Mira stepped into the cellar. Dust motes spun in the thin shaft of light from above, and the air smelled of old wine and something else â something colder.",
            { model: "mancer/weaver" }
        ).then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

Weaver is well-suited for collaborative fiction tools, story generators, and creative writing assistants where descriptive prose matters more than factual precision.

## Example 4: Streaming responses for real-time storytelling

For longer narrative output, streaming provides a much better user experience by showing the story as it unfolds rather than waiting for the full response:

```html
<html>
<body>
    <div id="story"></div>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamStory() {
            const outputDiv = document.getElementById('story');

            const response = await puter.ai.chat(
                "Tell me a slow-burning ghost story set in a lighthouse on the coast of Maine. Build atmosphere gradually and end on an unresolved note.",
                { model: 'mancer/weaver', stream: true }
            );

            for await (const part of response) {
                if (part?.text) {
                    outputDiv.innerHTML += part.text;
                }
            }
        }

        streamStory();
    </script>
</body>
</html>
```

This example demonstrates streaming with Weaver, which is especially valuable for narrative use cases where readers can follow along as the story is generated.

## List of supported models

The following Mancer AI models are supported by Puter.js:

```javascript
mancer/weaver
```

That's it! You now have free access to Mancer AI's Weaver model using Puter.js. This allows you to build narrative-focused applications â chatbots, text adventures, interactive fiction, and collaborative writing tools â without needing API keys or backend infrastructure. True serverless AI!

## Related

- [Free, Unlimited Aion Labs API](/tutorials/free-unlimited-aion-labs-api/)
- [Free, Unlimited Nous Research Hermes API](/tutorials/free-unlimited-nous-research-hermes-api/)
- [Free, Unlimited Liquid AI API](/tutorials/free-unlimited-liquid-ai-api/)
- [Free, Unlimited Essential AI API](/tutorials/free-unlimited-essential-ai-api/)
- [Free, Unlimited ArceeAI API](/tutorials/free-unlimited-arcee-ai-api/)
- [Free, Unlimited AllenAI API](/tutorials/free-unlimited-allen-ai-api/)
- [Free, Unlimited Inception Mercury API](/tutorials/free-unlimited-inception-mercury-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
# Free, Unlimited Aion Labs API

Source: https://developer.puter.com/tutorials/free-unlimited-aion-labs-api/

[Tutorials](/tutorials/)

# Free, Unlimited Aion Labs API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 25, 2026
                                    

On this page[Roleplay with Aion 2.0](#roleplay-with-aion-20)[Reason with Aion 1.0](#reason-with-aion-10)[Code with Aion 1.0 Mini](#code-with-aion-10-mini)[Roleplay with Aion RP 1.0](#roleplay-with-aion-rp-10)[List of Models](#list-of-models)[Conclusion](#conclusion)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Aion Labs models](/ai/aion-labs/), including [Aion 2.0](/ai/aion-labs/aion-2.0/), [Aion 1.0](/ai/aion-labs/aion-1.0/), [Aion 1.0 Mini](/ai/aion-labs/aion-1.0-mini/), and [Aion RP 1.0](/ai/aion-labs/aion-rp-llama-3.1-8b/) completely free, without any API keys.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI or server usage.

To use Puter.js, import our [NPM library](https://www.npmjs.com/package/@heyputer/puter.js) in your project:

```js
// npm install @heyputer/puter.js
import { puter } from '@heyputer/puter.js';
```

Or alternatively, add our script via CDN if you are working directly with HTML, simply add it to the `<head>` or `<body>` section of your code:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

Nothing else is required to start using Puter.js for free access to Aion Labs models and capabilities.

## Roleplay with Aion 2.0

Aion 2.0 is optimized for immersive roleplaying and storytelling, excelling at tension, conflict, and nuanced narratives.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "You are a grizzled detective in a noir city. A mysterious stranger walks into your office late at night with a case that could change everything. Set the scene and begin the story.",
            { model: "aion-labs/aion-2.0" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Reason with Aion 1.0

Aion 1.0 is Aion Labs' most powerful reasoning model, built with Tree of Thoughts and Mixture of Experts techniques for complex reasoning and coding tasks.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "A farmer needs to cross a river with a wolf, a goat, and a cabbage. The boat can only carry the farmer and one item. If left alone, the wolf will eat the goat, and the goat will eat the cabbage. How can the farmer get everything across safely? Explain your reasoning step by step.",
            { model: "aion-labs/aion-1.0" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Code with Aion 1.0 Mini

Aion 1.0 Mini is a smaller, faster reasoning model optimized for math, coding, and logic tasks.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Write a Python function that finds the longest palindromic substring in a given string using dynamic programming",
            { model: "aion-labs/aion-1.0-mini" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## Roleplay with Aion RP 1.0

Aion RP 1.0 is fine-tuned for roleplaying and creative writing with 131K context, excelling at character consistency and immersive storytelling.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "You are an ancient dragon who has lived for thousands of years and has seen civilizations rise and fall. A young adventurer has stumbled into your lair. Respond in character.",
            { model: "aion-labs/aion-rp-llama-3.1-8b" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## List of Models

The following Aion Labs models are supported by Puter.js:

```javascript
aion-labs/aion-2.0
aion-labs/aion-1.0
aion-labs/aion-1.0-mini
aion-labs/aion-rp-llama-3.1-8b
```

## Conclusion

Using Puter.js, you can gain access to Aion Labs models without having to set up the AI server yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited ArceeAI API](/tutorials/free-unlimited-arcee-ai-api/)
- [Free, Unlimited Essential AI API](/tutorials/free-unlimited-essential-ai-api/)
- [Free, Unlimited Upstage Solar API](/tutorials/free-unlimited-upstage-solar-api/)
- [Free, Unlimited Inception Mercury API](/tutorials/free-unlimited-inception-mercury-api/)
- [Free, Unlimited Nous Research Hermes API](/tutorials/free-unlimited-nous-research-hermes-api/)
- [Free, Unlimited Mancer AI API](/tutorials/free-unlimited-mancer-api/)
# Free, Unlimited StepFun AI API

Source: https://developer.puter.com/tutorials/free-unlimited-stepfun-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited StepFun AI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: June 2, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Chat](#example-1-basic-chat)[Example 2: Streaming with Reasoning](#example-2-streaming-with-reasoning)[List of StepFun models](#list-of-stepfun-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you will learn how to add [StepFun Step 3.7 Flash](/ai/stepfun/step-3.7-flash/) and [Step 3.5 Flash](/ai/stepfun/step-3.5-flash/) into your application for free using Puter.js. You can gain [access to various AI models using Puter.js](/ai/) without having to set up the AI server yourself.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI or server usage.

## Getting Started

To use Puter.js, import our [NPM library](https://www.npmjs.com/package/@heyputer/puter.js) in your project:

```js
// npm install @heyputer/puter.js
import { puter } from '@heyputer/puter.js';
```

Or alternatively, add our script via CDN if you are working directly with HTML, simply add it to the `<head>` or `<body>` section of your code:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's it, you're ready to start integrating Step 3.7 Flash into your application.

## Example 1: Basic Chat

To generate text, use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function with the `model` parameter set to `stepfun/step-3.7-flash`.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "What are the benefits of exercise?",
            { model: "stepfun/step-3.7-flash" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 2: Streaming with Reasoning

For longer responses, use streaming to get results in real-time. Setting `stream: true` lets you display the reasoning and the answer as they're generated.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      puter.ai
        .chat(
          "A farmer has 17 sheep. All but 9 run away. How many sheep does the farmer have left? Explain your reasoning step by step.",
          { model: "stepfun/step-3.7-flash", stream: true }
        )
        .then(async (resp) => {
          for await (const part of resp) {
            if (part?.reasoning) puter.print(part?.reasoning);
            else puter.print(part?.text);
          }
        });
    </script>
</body>
</html>
```

## List of StepFun models

You can use the following StepFun models with Puter.js:

```javascript
stepfun/step-3.7-flash
stepfun/step-3.5-flash
```

## Conclusion

Using Puter.js, you can gain access to StepFun Step 3.7 Flash and Step 3.5 Flash, powerful reasoning models with ultra-fast inference speeds. Thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful agentic applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited Essential AI API](/tutorials/free-unlimited-essential-ai-api/)
- [Free, Unlimited Inception Mercury API](/tutorials/free-unlimited-inception-mercury-api/)
- [Free, Unlimited Nous Research Hermes API](/tutorials/free-unlimited-nous-research-hermes-api/)
- [Free, Unlimited ArceeAI API](/tutorials/free-unlimited-arcee-ai-api/)
- [Free, Unlimited Writer Palmyra API](/tutorials/free-unlimited-writer-palmyra-api/)
- [Free, Unlimited Upstage Solar API](/tutorials/free-unlimited-upstage-solar-api/)
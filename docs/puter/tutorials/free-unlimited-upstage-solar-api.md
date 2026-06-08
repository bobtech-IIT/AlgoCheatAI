# Free, Unlimited Upstage Solar API

Source: https://developer.puter.com/tutorials/free-unlimited-upstage-solar-api/

[Tutorials](/tutorials/)

# Free, Unlimited Upstage Solar API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: January 27, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Chat](#example-1-basic-chat)[Example 2: Streaming Chat](#example-2-streaming-chat)[Example 3: Multilingual Support](#example-3-multilingual-support)[List of Upstage models](#list-of-upstage-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you will learn how to add [Upstage Solar Pro 3](/ai/upstage/solar-pro-3:free/) into your application for free using Puter.js. You can gain [access to various AI models using Puter.js](/ai/) without having to set up the AI server yourself.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI or server usage.

## Getting Started

Add Puter.js to your project with a single line:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's it, you're ready to start integrating Solar Pro 3 into your application.

## Example 1: Basic Chat

Solar Pro 3 is a powerful Mixture-of-Experts model that delivers efficient performance while maintaining high quality responses.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Explain how mixture-of-experts models achieve computational efficiency",
            { model: "upstage/solar-pro-3:free" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 2: Streaming Chat

For longer responses, you can stream the output to display text as it's generated.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      puter.ai
        .chat(
          "Write a detailed guide on best practices for building scalable web applications",
          { model: "upstage/solar-pro-3:free", stream: true }
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

## Example 3: Multilingual Support

Solar Pro 3 is optimized for Korean with strong support for English and Japanese.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "íêµ­ì´ë¡ ì¸ê³µì§ë¥ì ë¯¸ëì ëí´ ì¤ëªí´ ì£¼ì¸ì",
            { model: "upstage/solar-pro-3:free" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## List of Upstage models

You can use the following Upstage models with Puter.js:

```javascript
upstage/solar-pro-3:free
```

## Conclusion

Using Puter.js, you can gain access to Upstage Solar Pro 3, a powerful MoE model optimized for Korean with English and Japanese support. Thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build multilingual applications without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited Essential AI API](/tutorials/free-unlimited-essential-ai-api/)
- [Free, Unlimited Inception Mercury API](/tutorials/free-unlimited-inception-mercury-api/)
- [Free, Unlimited Nous Research Hermes API](/tutorials/free-unlimited-nous-research-hermes-api/)
- [Free, Unlimited ArceeAI API](/tutorials/free-unlimited-arcee-ai-api/)
- [Free, Unlimited Z.AI GLM API](/tutorials/free-unlimited-zai-glm-api/)
- [Free, Unlimited AllenAI API](/tutorials/free-unlimited-allen-ai-api/)
- [Free, Unlimited StepFun AI API](/tutorials/free-unlimited-stepfun-ai-api/)
- [Free, Unlimited Aion Labs API](/tutorials/free-unlimited-aion-labs-api/)
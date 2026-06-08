# Free, Unlimited Writer Palmyra API

Source: https://developer.puter.com/tutorials/free-unlimited-writer-palmyra-api/

[Tutorials](/tutorials/)

# Free, Unlimited Writer Palmyra API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: January 22, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Chat](#example-1-basic-chat)[Example 2: Business Analysis](#example-2-business-analysis)[Example 3: Code Generation](#example-3-code-generation)[List of Writer models](#list-of-writer-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you will learn how to add [Writer Palmyra X5](/ai/writer/palmyra-x5/) into your application for free using Puter.js. You can gain [access to various AI models using Puter.js](/ai/) without having to set up the AI server yourself.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI or server usage.

## Getting Started

Add Puter.js to your project with a single line:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's it, you're ready to start integrating Palmyra X5 into your application.

## Example 1: Basic Chat

Palmyra X5 is an enterprise-focused model with strong language understanding and generation capabilities across 30+ languages.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "What are the benefits of using cloud-based infrastructure for modern applications?",
            { model: "writer/palmyra-x5" }
        )
        .then(response => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Example 2: Business Analysis

Palmyra X5 has advanced reasoning capabilities that make it ideal for complex business analysis.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      puter.ai
        .chat(
          "Our SaaS company is considering expanding from B2B to B2C markets. Analyze the key challenges, opportunities, and strategic considerations we should evaluate before making this decision.",
          { model: "writer/palmyra-x5", stream: true }
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

## Example 3: Code Generation

Palmyra X5 has strong code generation capabilities across multiple programming languages.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(
            "Create a TypeScript function that implements a retry mechanism with exponential backoff for API calls, including proper error handling and type definitions",
            { model: "writer/palmyra-x5" }
        )
        .then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

## List of Writer models

You can use the following Writer models with Puter.js:

```javascript
writer/palmyra-x5
```

## Conclusion

Using Puter.js, you can gain access to Writer Palmyra X5, an enterprise-grade model with a 1 million token context window and advanced reasoning capabilities. Thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), your users cover their own AI usage, not you as the developer. This means you can build powerful enterprise applications with long-context capabilities without worrying about AI usage costs.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Essential AI API](/tutorials/free-unlimited-essential-ai-api/)
- [Free, Unlimited Inception Mercury API](/tutorials/free-unlimited-inception-mercury-api/)
- [Free, Unlimited Nous Research Hermes API](/tutorials/free-unlimited-nous-research-hermes-api/)
- [Free, Unlimited ArceeAI API](/tutorials/free-unlimited-arcee-ai-api/)
- [Free, Unlimited StepFun AI API](/tutorials/free-unlimited-stepfun-ai-api/)
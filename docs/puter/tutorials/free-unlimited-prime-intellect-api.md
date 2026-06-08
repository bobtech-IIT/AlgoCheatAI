# Free, Unlimited Prime Intellect API

Source: https://developer.puter.com/tutorials/free-unlimited-prime-intellect-api/

[Tutorials](/tutorials/)

# Free, Unlimited Prime Intellect API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: January 20, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Chat](#example-1-basic-chat)[Example 2: Complex Reasoning](#example-2-complex-reasoning)[List of Prime Intellect models](#list-of-prime-intellect-models)[Conclusion](#conclusion)[Related](#related)

In this guide, you will learn how to integrate Prime Intellect's [INTELLECT-3](/ai/prime-intellect/intellect-3/) into your app for free, without setting up an AI server or using API keys.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the AI usage.

## Getting Started

Add Puter.js to your project with a single line:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's it, you're ready to start integrating Prime Intellect AI into your application.

## Example 1: Basic Chat

The INTELLECT-3 model achieves state-of-the-art performance for its size (100B+) across math, code, and science benchmarks.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      puter.ai
        .chat(
          "Debug this logic: If I have 3 apples and give away 5, how many do I have?",
          { model: "prime-intellect/intellect-3", stream: true }
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

## Example 2: Complex Reasoning

INTELLECT-3 is designed for multi-step problem solving, making it excel in reasoning tasks.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      puter.ai
        .chat(
          "Explain the complete process of training a large language model, from data collection to deployment",
          { model: "prime-intellect/intellect-3", stream: true }
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

## List of Prime Intellect models

You can use the following Prime Intellect models with Puter.js:

```javascript
prime-intellect/intellect-3
```

## Conclusion

Using Puter.js, you can gain access to Prime Intellect models without having to set up an AI server or manage API keys yourself. And thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), you can add this feature for free to your application, since your users cover their own AI usage, not you as the developer.

You can find all AI features supported by Puter.js in the [documentation](https://docs.puter.com/AI/).

## Related

- [Free, Unlimited GPT OSS API](/tutorials/free-unlimited-gpt-oss-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Llama API](/tutorials/free-unlimited-llama-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
- [Free, Unlimited ArceeAI API](/tutorials/free-unlimited-arcee-ai-api/)
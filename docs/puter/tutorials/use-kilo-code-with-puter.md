# How to Use Kilo Code with Puter

Source: https://developer.puter.com/tutorials/use-kilo-code-with-puter/

[Tutorials](/tutorials/)

# How to Use Kilo Code with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 25, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Install Kilo Code](#step-1-install-kilo-code)[Step 2: Open the Settings](#step-2-open-the-settings)[Step 3: Set Up the API Provider](#step-3-set-up-the-api-provider)[Step 4: Start Coding](#step-4-start-coding)[Switching Models](#switching-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to set up [Kilo Code](https://kilocode.ai) with Puter so you can access hundreds of AI models right from your code editor. Kilo Code is an autonomous AI coding agent (originally forked from Cline) that integrates directly into your editor, and because Puter provides an OpenAI-compatible endpoint, connecting the two only takes a few steps.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [Kilo Code](https://kilocode.ai) installed in your editor

## Step 1: Install Kilo Code

Kilo Code is available for several editors. This tutorial uses VS Code as an example, but the setup works the same way in any supported editor.

![Kilo Code website](/assets/img/kilo-code/website.webp)

Follow the installation instructions for your editor. Once Kilo Code is installed, open it from your sidebar.

## Step 2: Open the Settings

In the Kilo Code panel, click the  **settings icon**  to access the provider settings.

![Kilo Code settings](/assets/img/kilo-code/config.webp)

## Step 3: Set Up the API Provider

You'll see an  **API Provider**  dropdown in the settings. Choose  **OpenAI Compatible**  from the list.

![Select OpenAI Compatible as API provider in Kilo Code](/assets/img/kilo-code/compat.webp)

Enter the following values:

- **Base URL** : `https://api.puter.com/puterai/openai/v1/`
- **API Key** : Your Puter auth token (copied from the dashboard)
- **Model** : The model you'd like to use, for example `gpt-5.3-codex`

![Kilo Code API configuration with Puter base URL and auth token](/assets/img/kilo-code/puterai.webp)

Puter supports a wide range of models. Here are some good options for coding:

| Model Name | Model |
| --- | --- |
| GPT-5.3 [Codex](/ai/codex/) | `gpt-5.3-codex` |
| Claude [Sonnet](/ai/sonnet/) 4.6 | `claude-sonnet-4-6` |

Browse the complete list on the [supported AI models](/ai/models/) page.

## Step 4: Start Coding

You're all set. Use Kilo Code as you normally would â send a message in the chat panel and it will respond using the Puter model you selected.

![Kilo Code chat powered by Puter AI model](/assets/img/kilo-code/chat.webp)

Ask it to generate code, debug issues, explain files, refactor functions, and anything else you'd normally use an AI coding agent for.

## Switching Models

To use a different model, head back to the settings and update the  **Model**  field. Puter gives you access to hundreds of models through one endpoint, so you can freely switch between [GPT](/ai/openai/), [Claude](/ai/anthropic/), [Gemini](/ai/google/), [DeepSeek](/ai/deepseek/), and others without reconfiguring anything else.

## Conclusion

Setting up Kilo Code with Puter is straightforward: select  **OpenAI Compatible**  as the provider, enter Puter's base URL (`https://api.puter.com/puterai/openai/v1/`), and use your Puter auth token as the API key. From there you have access to hundreds of AI models through a single account, all within your editor.

For more details, see the full list of [supported AI models](/ai/models/) or read about [Puter's OpenAI-compatible endpoint](/tutorials/use-openai-sdk-with-puter/).

## Related

- [How to Use Cline with Puter](/tutorials/use-cline-with-puter/)
- [How to Use Claude Code with Puter](/tutorials/use-claude-code-with-puter/)
- [How to Use Roo Code with Puter](/tutorials/use-roo-code-with-puter/)
- [How to Use BLACKBOX AI with Puter](/tutorials/use-blackbox-ai-with-puter/)
- [How to Use SillyTavern with Puter](/tutorials/use-silly-tavern-with-puter/)
- [How to Use Janitor AI with Puter](/tutorials/use-janitor-ai-with-puter/)
- [How to Use OpenHands with Puter](/tutorials/use-openhands-with-puter/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Use OpenRouter SDK with Puter](/tutorials/use-openrouter-sdk-with-puter/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use LiteLLM with Puter](/tutorials/use-litellm-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
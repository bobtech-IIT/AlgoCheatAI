# How to Use BLACKBOX AI with Puter

Source: https://developer.puter.com/tutorials/use-blackbox-ai-with-puter/

[Tutorials](/tutorials/)

# How to Use BLACKBOX AI with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 25, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Install BLACKBOX AI](#step-1-install-blackbox-ai)[Step 2: Select the API Provider](#step-2-select-the-api-provider)[Step 3: Enter Your Puter Credentials](#step-3-enter-your-puter-credentials)[Step 4: Start Chatting](#step-4-start-chatting)[Switching Models](#switching-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to hook up [BLACKBOX AI](https://www.blackbox.ai) to Puter, letting you tap into hundreds of AI models directly from VS Code. BLACKBOX AI is an AI-powered coding assistant, and thanks to Puter's OpenAI-compatible endpoint, you can set it up as your API provider in just a couple of minutes.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [VS Code](https://code.visualstudio.com/) with the [BLACKBOX AI](https://www.blackbox.ai) extension installed

## Step 1: Install BLACKBOX AI

Go to [blackbox.ai](https://www.blackbox.ai), select  **VS Code** , and it will take you to install the extension.

![BLACKBOX AI website](/assets/img/blackbox-ai/website.webp)

Once installed, open the BLACKBOX AI panel from your sidebar.

## Step 2: Select the API Provider

When you open the settings, you'll be taken straight to the API provider selection. Choose  **OpenAI Compatible**  from the list.

![BLACKBOX AI API provider selection](/assets/img/blackbox-ai/compat.webp)

## Step 3: Enter Your Puter Credentials

Fill in the following fields:

- **Base URL** : `https://api.puter.com/puterai/openai/v1/`
- **API Key** : Your Puter auth token (copied from the dashboard)
- **Model ID** : The model you want to use, for example `gpt-5.3-codex`

![BLACKBOX AI configured with Puter base URL and auth token](/assets/img/blackbox-ai/puterai.webp)

Puter has a large catalog of models to choose from. Here are some solid options for coding:

| Model Name | Model |
| --- | --- |
| GPT-5.3 [Codex](/ai/codex/) | `gpt-5.3-codex` |
| Claude [Sonnet](/ai/sonnet/) 4.6 | `claude-sonnet-4-6` |

Check out the full list on the [supported AI models](/ai/models/) page.

## Step 4: Start Chatting

That's everything. Open the BLACKBOX AI chat and send a message â it will now respond using the Puter model you selected.

![BLACKBOX AI chat powered by Puter AI model](/assets/img/blackbox-ai/chat.webp)

You can use BLACKBOX AI to generate code, get explanations, debug problems, and more â all backed by whichever Puter model you chose.

## Switching Models

To switch models, go back to the settings and update the  **Model ID**  field. Puter lets you access hundreds of models from a single endpoint, so you can jump between [GPT](/ai/openai/), [Claude](/ai/anthropic/), [Gemini](/ai/google/), [DeepSeek](/ai/deepseek/), and others without touching anything else.

## Conclusion

Using BLACKBOX AI with Puter is quick to set up: pick  **OpenAI Compatible**  as the provider, point it at Puter's base URL (`https://api.puter.com/puterai/openai/v1/`), and paste in your Puter auth token. That gives you hundreds of AI models at your fingertips, all from within VS Code.

For more details, see the full list of [supported AI models](/ai/models/) or read about [Puter's OpenAI-compatible endpoint](/tutorials/use-openai-sdk-with-puter/).

## Related

- [How to Use Cline with Puter](/tutorials/use-cline-with-puter/)
- [How to Use Claude Code with Puter](/tutorials/use-claude-code-with-puter/)
- [How to Use Kilo Code with Puter](/tutorials/use-kilo-code-with-puter/)
- [How to Use Roo Code with Puter](/tutorials/use-roo-code-with-puter/)
- [How to Use SillyTavern with Puter](/tutorials/use-silly-tavern-with-puter/)
- [How to Use Janitor AI with Puter](/tutorials/use-janitor-ai-with-puter/)
- [How to Use OpenHands with Puter](/tutorials/use-openhands-with-puter/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Use OpenRouter SDK with Puter](/tutorials/use-openrouter-sdk-with-puter/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use LiteLLM with Puter](/tutorials/use-litellm-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
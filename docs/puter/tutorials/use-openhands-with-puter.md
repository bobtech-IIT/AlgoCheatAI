# How to Use OpenHands with Puter

Source: https://developer.puter.com/tutorials/use-openhands-with-puter/

[Tutorials](/tutorials/)

# How to Use OpenHands with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 27, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Create an OpenHands Account](#step-1-create-an-openhands-account)[Step 2: Open the LLM Settings](#step-2-open-the-llm-settings)[Step 3: Configure Puter as the LLM Provider](#step-3-configure-puter-as-the-llm-provider)[Step 4: Start a Conversation](#step-4-start-a-conversation)[Switching Models](#switching-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to connect [OpenHands](https://openhands.dev) to Puter, giving you access to hundreds of AI models for autonomous coding tasks. OpenHands is an open-source platform for AI-driven software development, and since Puter provides an OpenAI-compatible endpoint, you can plug it into OpenHands as a custom LLM provider.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- An [OpenHands](https://app.all-hands.dev) account (you can sign up with GitHub or GitLab)

## Step 1: Create an OpenHands Account

Go to [openhands.dev](https://openhands.dev) and create an account. You can sign up using your GitHub or GitLab account. Once you've completed the signup, you'll be taken to the main screen where you can start new coding tasks.

![OpenHands website](/assets/img/openhands/website.webp)

## Step 2: Open the LLM Settings

Look at the bottom-left corner of the screen and click on your  **profile** .

![OpenHands profile in the bottom-left corner](/assets/img/openhands/profile.webp)

From there, find the  **Language Model (LLM)**  setting. By default, OpenHands uses its own built-in provider. We'll switch this to Puter so you can use any model available on the platform.

![OpenHands default LLM settings](/assets/img/openhands/settings.webp)

## Step 3: Configure Puter as the LLM Provider

In the LLM settings, toggle the  **Advanced**  options to reveal the full configuration fields. Now fill in the following:

- **Custom Model** : `openai/gpt-4.1-nano`
- **Base URL** : `https://api.puter.com/puterai/openai/v1`
- **API Key** : Paste the auth token you copied from your Puter dashboard

![OpenHands configured with Puter endpoint and auth token](/assets/img/openhands/puter-config.webp)

Click  **Save**  to apply the changes. The `openai/` prefix before the model name tells OpenHands to treat this as an OpenAI-compatible endpoint. For the full list of available models, see the [supported AI models](/ai/models/) page.

## Step 4: Start a Conversation

Head back to the main screen and start a new conversation. Type a task or question and OpenHands will use the Puter model you configured to work on it.

![OpenHands chat working with Puter AI model](/assets/img/openhands/chat.webp)

You can ask OpenHands to write code, fix bugs, review pull requests, generate tests, and more, all powered by the model you selected through Puter.

## Switching Models

To use a different model, go back to the LLM settings and change the  **Custom Model**  field. Remember to keep the `openai/` prefix. For example, to switch to Claude, you'd enter `openai/claude-sonnet-4-6`. Since Puter gives you access to hundreds of models through a single endpoint, you can switch between [GPT](/ai/openai/), [Claude](/ai/anthropic/), [Gemini](/ai/google/), [DeepSeek](/ai/deepseek/), and more without changing anything else.

> **Note:**  Some models, such as the GPT-5 series, are not yet compatible with OpenHands when used through Puter due to how the two platforms interact. There are still plenty of other models you can use, including GPT-4.1, Claude, Gemini, and more.

## Conclusion

You can use OpenHands with Puter by enabling the  **Advanced**  LLM settings, entering a model name with the `openai/` prefix, pointing the base URL to Puter's endpoint (`https://api.puter.com/puterai/openai/v1`), and using your Puter auth token as the API key. This lets you run OpenHands' autonomous coding agent with hundreds of AI models, all through a single Puter account.

To go further, check out the full list of [supported AI models](/ai/models/) or learn more about [Puter's OpenAI-compatible endpoint](/tutorials/use-openai-sdk-with-puter/).

## Related

- [How to Use Cline with Puter](/tutorials/use-cline-with-puter/)
- [How to Use Claude Code with Puter](/tutorials/use-claude-code-with-puter/)
- [How to Use Kilo Code with Puter](/tutorials/use-kilo-code-with-puter/)
- [How to Use Roo Code with Puter](/tutorials/use-roo-code-with-puter/)
- [How to Use BLACKBOX AI with Puter](/tutorials/use-blackbox-ai-with-puter/)
- [How to Use SillyTavern with Puter](/tutorials/use-silly-tavern-with-puter/)
- [How to Use Janitor AI with Puter](/tutorials/use-janitor-ai-with-puter/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Use OpenRouter SDK with Puter](/tutorials/use-openrouter-sdk-with-puter/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use LiteLLM with Puter](/tutorials/use-litellm-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
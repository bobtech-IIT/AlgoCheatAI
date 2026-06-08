# How to Use Cline with Puter

Source: https://developer.puter.com/tutorials/use-cline-with-puter/

[Tutorials](/tutorials/)

# How to Use Cline with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 25, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Install Cline](#step-1-install-cline)[Step 2: Open Cline Settings](#step-2-open-cline-settings)[Step 3: Configure the API Provider](#step-3-configure-the-api-provider)[Step 4: Start Using Cline](#step-4-start-using-cline)[Switching Models](#switching-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to connect [Cline](https://cline.bot) to Puter, allowing you to use your Puter account to access hundreds of AI models directly from your code editor. Cline is an AI coding assistant that lives in your editor, and since Puter exposes an OpenAI-compatible endpoint, you can use it as Cline's API provider with minimal configuration.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [Cline](https://cline.bot) installed in your editor

## Step 1: Install Cline

Cline can be installed from various places, but in this tutorial we'll be using VS Code. The same principle applies to any other editor that supports Cline.

![Cline website](/assets/img/cline/website.webp)

Follow the installation instructions for your editor. Once Cline is installed, open the Cline panel from your sidebar.

## Step 2: Open Cline Settings

In the Cline panel, click the  **settings icon**  to open the API configuration.

![Cline settings icon](/assets/img/cline/config.webp)

## Step 3: Configure the API Provider

In the settings, you'll see an  **API Provider**  dropdown. Select  **OpenAI Compatible**  from the list.

![Select OpenAI Compatible as API provider in Cline](/assets/img/cline/compat.webp)

Now fill in the following fields:

- **Base URL** : `https://api.puter.com/puterai/openai/v1/`
- **API Key** : Paste the auth token you copied from your Puter dashboard
- **Model ID** : Enter the model you want to use, for example `gpt-5.3-codex`

![Cline API configuration with Puter base URL and auth token](/assets/img/cline/puterai.webp)

You can use any model supported by Puter. Some popular choices for coding tasks:

| Model | Model ID |
| --- | --- |
| GPT-5.3 [Codex](/ai/codex/) | `gpt-5.3-codex` |
| Claude [Sonnet](/ai/sonnet/) 4.6 | `claude-sonnet-4-6` |

For the full list of available models, see the [supported AI models](/ai/models/) page.

## Step 4: Start Using Cline

That's it for setup. You can now use Cline as you normally would. Type a message in the Cline chat panel and it will use your selected Puter model to respond.

![Cline chat working with Puter AI model](/assets/img/cline/chat.webp)

You can ask Cline to write code, explain files, fix bugs, refactor, and more, all powered by the model you selected through Puter.

## Switching Models

Want to try a different model? Go back to Cline's settings and change the  **Model ID**  field. Since Puter gives you access to hundreds of models through a single endpoint, you can switch between [GPT](/ai/openai/), [Claude](/ai/anthropic/), [Gemini](/ai/google/), [DeepSeek](/ai/deepseek/), and more without changing anything else.

## Conclusion

You can use Cline with Puter by setting the API provider to  **OpenAI Compatible** , pointing it to Puter's base URL (`https://api.puter.com/puterai/openai/v1/`), and using your Puter auth token as the API key. This gives you access to hundreds of AI models directly from your code editor, all through a single account.

To go further, check out the full list of [supported AI models](/ai/models/) or learn more about [Puter's OpenAI-compatible endpoint](/tutorials/use-openai-sdk-with-puter/).

## Related

- [How to Use Claude Code with Puter](/tutorials/use-claude-code-with-puter/)
- [How to Use Kilo Code with Puter](/tutorials/use-kilo-code-with-puter/)
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
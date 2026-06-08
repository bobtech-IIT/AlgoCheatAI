# How to Use Roo Code with Puter

Source: https://developer.puter.com/tutorials/use-roo-code-with-puter/

[Tutorials](/tutorials/)

# How to Use Roo Code with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 25, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Install Roo Code](#step-1-install-roo-code)[Step 2: Go to Settings](#step-2-go-to-settings)[Step 3: Configure the Provider](#step-3-configure-the-provider)[Step 4: Start Using Roo Code](#step-4-start-using-roo-code)[Switching Models](#switching-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to configure [Roo Code](https://roocode.com) to work with Puter, giving you access to hundreds of AI models within VS Code. Roo Code is an AI coding agent for VS Code, and since Puter offers an OpenAI-compatible endpoint, you can plug it in as Roo Code's API provider in just a few steps.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [VS Code](https://code.visualstudio.com/) with the [Roo Code](https://roocode.com) extension installed

## Step 1: Install Roo Code

Head over to [roocode.com](https://roocode.com) and click Install VS Code Extension.

![Roo Code website](/assets/img/roo-code/website.webp)

After installation, you'll find the Roo Code icon in your sidebar. Click it to open the panel.

## Step 2: Go to Settings

Click the  **settings icon**  inside the Roo Code panel to open the provider configuration.

![Roo Code settings](/assets/img/roo-code/config.webp)

## Step 3: Configure the Provider

From the  **API Provider**  dropdown, select  **OpenAI Compatible** .

![Select OpenAI Compatible as API provider in Roo Code](/assets/img/roo-code/compat.webp)

Then fill in these fields:

- **Base URL** : `https://api.puter.com/puterai/openai/v1/`
- **API Key** : Your Puter auth token (copied from the dashboard)
- **Model** : The model you want to use, for example `gpt-5.3-codex`

![Roo Code API configuration with Puter base URL and auth token](/assets/img/roo-code/puterai.webp)

Puter supports many models out of the box. Here are some popular picks for coding:

| Model Name | Model |
| --- | --- |
| GPT-5.3 [Codex](/ai/codex/) | `gpt-5.3-codex` |
| Claude [Sonnet](/ai/sonnet/) 4.6 | `claude-sonnet-4-6` |

See the full list on the [supported AI models](/ai/models/) page.

## Step 4: Start Using Roo Code

Everything is ready. Type a message in the Roo Code chat panel and it will use your chosen Puter model to respond.

![Roo Code chat powered by Puter AI model](/assets/img/roo-code/chat.webp)

From here you can ask Roo Code to write code, fix bugs, explain files, run terminal commands, and more â all powered by whichever model you picked through Puter.

## Switching Models

Want to try another model? Open the settings again and change the  **Model**  field. Because Puter routes to hundreds of models through a single endpoint, you can swap between [GPT](/ai/openai/), [Claude](/ai/anthropic/), [Gemini](/ai/google/), [DeepSeek](/ai/deepseek/), and more with no other changes needed.

## Conclusion

Connecting Roo Code to Puter takes just a few fields: set the provider to  **OpenAI Compatible** , use Puter's base URL (`https://api.puter.com/puterai/openai/v1/`), and enter your Puter auth token as the API key. That's all it takes to unlock hundreds of AI models inside VS Code.

For more details, see the full list of [supported AI models](/ai/models/) or read about [Puter's OpenAI-compatible endpoint](/tutorials/use-openai-sdk-with-puter/).

## Related

- [How to Use Cline with Puter](/tutorials/use-cline-with-puter/)
- [How to Use Claude Code with Puter](/tutorials/use-claude-code-with-puter/)
- [How to Use Kilo Code with Puter](/tutorials/use-kilo-code-with-puter/)
- [How to Use BLACKBOX AI with Puter](/tutorials/use-blackbox-ai-with-puter/)
- [How to Use SillyTavern with Puter](/tutorials/use-silly-tavern-with-puter/)
- [How to Use Janitor AI with Puter](/tutorials/use-janitor-ai-with-puter/)
- [How to Use OpenHands with Puter](/tutorials/use-openhands-with-puter/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Use OpenRouter SDK with Puter](/tutorials/use-openrouter-sdk-with-puter/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use LiteLLM with Puter](/tutorials/use-litellm-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
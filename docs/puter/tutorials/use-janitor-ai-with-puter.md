# How to Use Janitor AI with Puter

Source: https://developer.puter.com/tutorials/use-janitor-ai-with-puter/

[Tutorials](/tutorials/)

# How to Use Janitor AI with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: March 2, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Pick a Character](#step-1-pick-a-character)[Step 2: Open the API Settings](#step-2-open-the-api-settings)[Step 3: Add a Proxy Configuration](#step-3-add-a-proxy-configuration)[Step 4: Start Chatting](#step-4-start-chatting)[Switching Models](#switching-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to connect [Janitor AI](https://janitorai.com) to Puter, giving you access to hundreds of AI models for character chat. Janitor AI is an AI-powered character chat platform, and since Puter exposes an OpenAI-compatible endpoint, you can use it as a proxy provider in Janitor AI.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- A [Janitor AI](https://janitorai.com) account

## Step 1: Pick a Character

Go to [janitorai.com](https://janitorai.com) and browse or search for a character you'd like to chat with. Once you've found one, click on it to open its profile, then start a new chat.

## Step 2: Open the API Settings

Inside the chat window, look at the top-right corner and click the  **menu icon**  (â°). From the menu, select  **API Settings** . This is where you'll configure Puter as your AI provider.

![Janitor AI chat menu showing API Settings option](/assets/img/janitor-ai/api-settings.webp)

## Step 3: Add a Proxy Configuration

In the API Settings, select  **Proxy**  as your API type, then click  **Add Configuration** . Fill in the following fields:

- **Configuration Name** : `Puter` (or any name you like)
- **Proxy URL** : `https://api.puter.com/puterai/openai/v1/chat/completions`
- **API Key** : Paste the auth token you copied from your Puter dashboard
- **Model** : Enter the model you want to use, for example `gpt-4.1-nano`

![Janitor AI proxy configuration with Puter endpoint and auth token](/assets/img/janitor-ai/proxy-config.webp)

Click  **Save Settings** , then refresh the page. For the full list of available models, see the [supported AI models](/ai/models/) page.

## Step 4: Start Chatting

Head back to your chat. Your messages will now be powered by the Puter model you configured. Type a message and the character will respond using the AI model you selected.

![Janitor AI chat working with Puter AI model](/assets/img/janitor-ai/chat.webp)

## Switching Models

To use a different model, go back to the API Settings and edit your proxy configuration's  **Model**  field. Since Puter gives you access to hundreds of models through a single endpoint, you can switch between [GPT](/ai/openai/), [Claude](/ai/anthropic/), [Gemini](/ai/google/), [DeepSeek](/ai/deepseek/), and more without changing anything else.

## Conclusion

You can use Janitor AI with Puter by selecting  **Proxy**  in the API Settings, pointing the proxy URL to Puter's endpoint (`https://api.puter.com/puterai/openai/v1/chat/completions`), and using your Puter auth token as the API key. This lets you chat with any Janitor AI character using hundreds of AI models, all through a single Puter account.

To go further, check out the full list of [supported AI models](/ai/models/) or learn more about [Puter's OpenAI-compatible endpoint](/tutorials/use-openai-sdk-with-puter/).

## Related

- [How to Use SillyTavern with Puter](/tutorials/use-silly-tavern-with-puter/)
- [How to Use Cline with Puter](/tutorials/use-cline-with-puter/)
- [How to Use Kilo Code with Puter](/tutorials/use-kilo-code-with-puter/)
- [How to Use Roo Code with Puter](/tutorials/use-roo-code-with-puter/)
- [How to Use BLACKBOX AI with Puter](/tutorials/use-blackbox-ai-with-puter/)
- [How to Use OpenHands with Puter](/tutorials/use-openhands-with-puter/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Use OpenRouter SDK with Puter](/tutorials/use-openrouter-sdk-with-puter/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use LiteLLM with Puter](/tutorials/use-litellm-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
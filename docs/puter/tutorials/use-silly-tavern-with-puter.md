# How to Use SillyTavern with Puter

Source: https://developer.puter.com/tutorials/use-silly-tavern-with-puter/

[Tutorials](/tutorials/)

# How to Use SillyTavern with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 26, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Access the SillyTavern UI](#step-1-access-the-sillytavern-ui)[Step 2: Open the API Connections Panel](#step-2-open-the-api-connections-panel)[Step 3: Configure the API Provider](#step-3-configure-the-api-provider)[Step 4: Start Using SillyTavern](#step-4-start-using-sillytavern)[Switching Models](#switching-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to connect [SillyTavern](https://docs.sillytavern.app) to Puter, allowing you to use your Puter account to access hundreds of AI models for chat and roleplay. SillyTavern is an LLM frontend for power users, and since Puter exposes an OpenAI-compatible endpoint, you can use it as SillyTavern's API provider with minimal configuration.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [SillyTavern](https://docs.sillytavern.app/installation/) installed and running

## Step 1: Access the SillyTavern UI

Open SillyTavern in your browser. By default, it runs at `http://localhost:8000`. You should see the main chat interface.

![SillyTavern home screen](/assets/img/sillytavern/home.webp)

## Step 2: Open the API Connections Panel

Click the  **plug icon**  at the top of the screen to open the API Connections panel. Here you'll see the  **API**  dropdown and  **Connection Profile**  settings. We'll change these to connect to Puter.

![SillyTavern API connections panel](/assets/img/sillytavern/api-panel.webp)

## Step 3: Configure the API Provider

In the API connections panel, set the  **API**  dropdown to  **Chat Completion** . Then under  **Chat Completion Source** , select  **Custom (OpenAI-compatible)** . Now fill in the following fields:

- **Custom Endpoint** : `https://api.puter.com/puterai/openai/v1`
- **Custom API Key** : Paste the auth token you copied from your Puter dashboard
- **Model ID** : Enter the model you want to use, for example `gpt-5.2-chat`

![SillyTavern configured with Puter endpoint and auth token](/assets/img/sillytavern/puter-config.webp)

Click  **Connect**  to verify the connection. For the full list of available models, see the [supported AI models](/ai/models/) page.

## Step 4: Start Using SillyTavern

That's it for setup. You can now use SillyTavern as you normally would. Pick a character or create a new chat, type a message, and SillyTavern will use your selected Puter model to generate responses.

![SillyTavern chat working with Puter AI model](/assets/img/sillytavern/chat.webp)

You can chat with AI characters, run group chats, use custom prompts, and everything else SillyTavern supports, all powered by the model you selected through Puter.

## Switching Models

Want to try a different model? Go back to the API Connections panel and change the  **Model ID**  field. Since Puter gives you access to hundreds of models through a single endpoint, you can switch between [GPT](/ai/openai/), [Claude](/ai/anthropic/), [Gemini](/ai/google/), [DeepSeek](/ai/deepseek/), and more without changing anything else.

## Conclusion

You can use SillyTavern with Puter by setting the API to  **Chat Completion** , choosing  **Custom (OpenAI-compatible)**  as the source, pointing it to Puter's endpoint (`https://api.puter.com/puterai/openai/v1`), and using your Puter auth token as the API key. This gives you access to hundreds of AI models for chat and roleplay, all through a single account.

To go further, check out the full list of [supported AI models](/ai/models/) or learn more about [Puter's OpenAI-compatible endpoint](/tutorials/use-openai-sdk-with-puter/).

## Related

- [How to Use Janitor AI with Puter](/tutorials/use-janitor-ai-with-puter/)
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
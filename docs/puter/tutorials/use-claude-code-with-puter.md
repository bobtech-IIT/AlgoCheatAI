# How to Use Claude Code with Puter

Source: https://developer.puter.com/tutorials/use-claude-code-with-puter/

[Tutorials](/tutorials/)

# How to Use Claude Code with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: March 25, 2026
                                    

On this page[Prerequisites](#prerequisites)[Step 1: Access Claude Code Settings](#step-1-access-claude-code-settings)[Step 2: Add the Environment Variables](#step-2-add-the-environment-variables)[Step 3: Start Using Claude Code](#step-3-start-using-claude-code)[Switching Models](#switching-models)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to connect [Claude Code](https://docs.anthropic.com/en/docs/claude-code) to Puter, allowing you to use your Puter account to access AI models directly from your terminal. Claude Code is Anthropic's official CLI for Claude, and since Puter exposes a native Anthropic-compatible endpoint, you can use it as Claude Code's API provider by editing a single config file.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code/getting-started) installed on your machine

## Step 1: Access Claude Code Settings

You'll need to configure Claude Code's settings to use Puter as the API provider. Open the settings file at:

```javascript
~/.claude/settings.json
```

You can open this file with any text editor. Other guides might suggest using a third-party library to change the API provider, but here we'll show you how to do it directly through Claude Code's settings file.

## Step 2: Add the Environment Variables

Add the following `env` block to your `settings.json` file. This sets Puter as the base URL, passes your auth token, and clears the default Anthropic API key so Claude Code routes all requests through Puter:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.puter.com/puterai/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "YOUR_PUTER_AUTH_TOKEN",
    "ANTHROPIC_API_KEY": ""
  }
}
```

Replace `YOUR_PUTER_AUTH_TOKEN` with the auth token you copied from your Puter dashboard.

## Step 3: Start Using Claude Code

Save the file, then open your terminal and run `claude` to start Claude Code. Send a message and if everything is set up correctly, you should see a response.

![Claude Code working with Puter AI](/assets/img/claude-code/chat.webp)

You can also verify the configuration by running `/status` inside Claude Code. You should see Puter's base URL listed in the output.

![Claude Code status showing Puter base URL](/assets/img/claude-code/status.webp)

## Switching Models

Claude Code works best with [Anthropic models](/ai/anthropic/), which Puter supports. If you want to try different models, you can set the following environment variables in the same `env` block in your `settings.json`:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.puter.com/puterai/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "YOUR_PUTER_AUTH_TOKEN",
    "ANTHROPIC_API_KEY": "",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4-6",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-4-6",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5"
  }
}
```

For the full list of available models, see the [supported AI models](/ai/models/) page.

## Conclusion

You can use Claude Code with Puter by adding a few environment variables to your `~/.claude/settings.json` file, pointing it at Puter's Anthropic-compatible endpoint (`https://api.puter.com/puterai/anthropic`) and using your Puter auth token. This lets you use Claude Code without a separate Anthropic API key or billing.

To go further, check out the full list of [supported AI models](/ai/models/) or learn how to use the [Anthropic SDK with Puter](/tutorials/use-anthropic-sdk-with-puter/).

## Related

- [How to Use Anthropic SDK with Puter](/tutorials/use-anthropic-sdk-with-puter/)
- [How to Use Cline with Puter](/tutorials/use-cline-with-puter/)
- [How to Use Kilo Code with Puter](/tutorials/use-kilo-code-with-puter/)
- [How to Use Roo Code with Puter](/tutorials/use-roo-code-with-puter/)
- [How to Use BLACKBOX AI with Puter](/tutorials/use-blackbox-ai-with-puter/)
- [How to Use OpenHands with Puter](/tutorials/use-openhands-with-puter/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Use LiteLLM with Puter](/tutorials/use-litellm-with-puter/)
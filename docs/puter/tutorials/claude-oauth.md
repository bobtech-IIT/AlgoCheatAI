# How to do OAuth with Claude

Source: https://developer.puter.com/tutorials/claude-oauth/

[Tutorials](/tutorials/)

# How to do OAuth with Claude

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 24, 2026
                                    

On this page[The Problem](#the-problem)[OAuth for Claude (via Puter.js)](#oauth-for-claude-via-puterjs)[Comparing Methods](#comparing-methods)[Conclusion](#conclusion)[Related](#related)

If you've tried to build an app and want to add AI functionality via OAuth with Claude, you'll find that Anthropic doesn't support it. This article covers why, and what to use instead.

## The Problem

Anthropic doesn't allow third-party apps to use OAuth to access Claude models.

**Why do developers keep asking for this?**  Two reasons, usually together:

1. **They don't want to pay for their users' API usage.**  With a server-side API key, the developer pays for every request. Viral traffic, leaked keys, or a single heavy user can run up the bill.
2. **The Bring Your Own Key (BYOK) flow loses users to friction.**  Users have to create an Anthropic account, add payment, generate a key, and paste it into the app. Many won't finish.

The one OAuth token that does exist is for Claude Code. Anthropic subscribers (Pro, Max, Team, Enterprise) can run `claude setup-token` and get a long-lived token in the format `sk-ant-oat01-...`. It's designed for CI pipelines and GitHub Actions. The token only works with Claude Code and is rejected by the Messages API.

Community plugins route these tokens through a localhost proxy to translate requests into the Claude Code format. They work, but they're fragile: any change to Anthropic's auth can break them.

Ideally, the user's Claude subscription would cover this, but Anthropic keeps their API and subscription products separate.

## OAuth for Claude (via Puter.js)

[Puter.js](https://docs.puter.com) solves this with its own OAuth flow. It's a frontend JavaScript SDK built on the [User-Pays Model](https://docs.puter.com/user-pays-model/). Users sign in with their Puter account once, and every call your app makes is billed to their Puter balance.

Your app can then use AI features on behalf of the user. You don't have to set up Claude yourself, and your users don't have to BYOK. The app automatically uses the user's resources, not just AI but also [storage](/object-storage/), [databases](/key-value-database/), and more.

For Claude, the integration is straightforward:

```html
<!DOCTYPE html>
<html>
<body>
  <script src="https://js.puter.com/v2/"></script>
  <script>
    puter.ai.chat("Explain CRDTs in one paragraph", {
      model: "claude-sonnet-4-6"
    }).then(response => {
      puter.print(response.message.content[0].text);
    });
  </script>
</body>
</html>
```

if you're using NPM:

```javascript
npm install @heyputer/puter.js
```

And then use it like this in your code:

```javascript
import puter from '@heyputer/puter.js';

puter.ai.chat("Explain CRDTs in two paragraphs", {
  model: "claude-opus-4-7"
}).then(response => {
  puter.print(response.message.content[0].text);
});
```

The `puter.ai.chat()` call runs directly in the browser. No backend and no API key in your code. Change the `model` parameter to use GPT, Gemini, Grok, and others.

## Comparing Methods

Aside from Puter.js, other patterns exist, each with different tradeoffs:

**Dev pays (your own API key).**  The developer holds a single server-side API key and pays for every user request. It fits products where pricing covers usage with margin. It breaks on viral growth, leaked keys, or a single heavy user, all of which run up the bill. Quotas, rate limits, and key rotation fall on the developer.

**BYOK (users bring their own key).**  Each user creates an Anthropic account, generates an API key, and pastes it into your app. Users pay for their own usage. It works for developer-tooling audiences who already have Anthropic accounts. It stalls for consumer apps, since most non-technical users won't finish the signup. Rate limits and model access follow the user's tier, which you can't control.

**Claude Code OAuth token (`CLAUDE_CODE_OAUTH_TOKEN`).**  A long-lived token tied to an Anthropic subscription, generated with `claude setup-token`. It fits CLI tools, CI jobs, or GitHub Actions that wrap Claude Code. It doesn't work for apps that call the Messages API directly, since the token only authenticates against Claude Code.

## Conclusion

Anthropic doesn't allow OAuth for third-party apps. This limits developers who want to add AI to their apps, leaving them stuck choosing between dev pays (absorbing the cost) or BYOK (making users manage API keys).

With [Puter.js](https://docs.puter.com), you don't have to choose. Users sign in with their Puter account, and calls from your app are billed to their balance. You don't pay for usage, and users don't manage API keys.

Puter.js isn't just for AI. The same user-pays model covers [storage](/object-storage/), [databases](/key-value-database/), and more, so you can build full apps without setting up or paying for any of this infrastructure yourself.

Get started at [docs.puter.com](https://docs.puter.com).

## Related

- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
- [How to do OAuth with OpenAI](/tutorials/openai-oauth/)
- [How to do OAuth with Gemini](/tutorials/gemini-oauth/)
- [How to Use Anthropic SDK with Puter](/tutorials/use-anthropic-sdk-with-puter/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [How to Get an Anthropic API Key](/tutorials/how-to-get-anthropic-api-key/)
# How to do OAuth with OpenAI

Source: https://developer.puter.com/tutorials/openai-oauth/

[Tutorials](/tutorials/)

# How to do OAuth with OpenAI

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 28, 2026
                                    

On this page[The Problem](#the-problem)[How Anthropic handled the same pattern](#how-anthropic-handled-the-same-pattern)[OAuth for OpenAI (via Puter.js)](#oauth-for-openai-via-puterjs)[Comparing Methods](#comparing-methods)[Conclusion](#conclusion)[Related](#related)

If you've tried to build an app and want to add AI functionality via OAuth with OpenAI, you'll find OpenAI has several OAuth surfaces, but none of them are designed to let a third-party app call the OpenAI API on a user's behalf. The one community pattern that comes close uses [Codex](/ai/codex/) OAuth, which is the same pattern Anthropic recently banned for Claude. This article covers what each OpenAI OAuth surface is for, and what to use instead.

## The Problem

Developers ask the same question for OpenAI as for any model vendor:  *can my users sign in once and have my app call the model on their tab?*

Two reasons drive it, usually together:

1. **They don't want to pay for their users' API usage.**  A server-side `OPENAI_API_KEY` means the developer pays for every request. Viral traffic, leaked keys, or a single heavy user can run up the bill.
2. **The Bring Your Own Key (BYOK) flow loses users to friction.**  Users have to create an OpenAI Platform account (separate from ChatGPT), add a payment method, generate a key, and paste it into the app. Many won't finish.

OpenAI does ship several OAuth surfaces, but none of them solve this directly. The OpenAI Platform API has no `/oauth/authorize` endpoint â there's no standard flow that mints a key billed to a user's account. What does exist:

- **Custom GPT Actions / Apps SDK / apps in ChatGPT.**  Your app lives  *inside*  ChatGPT as a tool ChatGPT calls. You declare an Authorization URL, Token URL, scopes, client ID, and client secret in the OpenAPI schema or Apps SDK manifest, and ChatGPT runs the OAuth code exchange against  *your*  service. Useful for distribution, useless if you want a chat box in your own product.
- **MCP server auth.**  OAuth 2.1 with PKCE and Dynamic Client Registration, per the MCP authorization spec, so ChatGPT can authenticate against your MCP server. Same inverted relationship: ChatGPT is the client, you are the resource.
- **"Sign in with ChatGPT" (identity).**  Announced in May 2025; as of April 2026 it only ships inside Codex tooling. Even if it goes broad, identity is not API access on the user's plan â it's the equivalent of Sign in with Google.
- **Codex OAuth.**  `codex login` opens a browser, the user signs into their ChatGPT account, and an access token is cached at `~/.codex/auth.json` (or the OS keychain). A device-code flow exists for headless environments. The token lets the Codex CLI, IDE extension, or Codex Cloud charge model calls to the user's ChatGPT Plus, Pro, Team, or Enterprise subscription. It's the only OpenAI token that actually pays for model usage out of a user's subscription.

That last one is what third-party tools like OpenClaw use. They take the Codex OAuth token, run a localhost proxy, and translate requests into the Codex CLI shape so OpenAI's auth check (which validates a Codex-specific system prompt) passes. The user's ChatGPT subscription pays for the calls.

## How Anthropic handled the same pattern

The same pattern existed on Claude until recently. Anthropic shipped a Claude Code OAuth token (`sk-ant-oat01-...`) for CI use, and tools like OpenClaw routed it through a proxy to use a Claude Pro or Max subscription from third-party agents.

On  **February 20, 2026** , Anthropic updated its terms to prohibit subscription OAuth tokens in third-party tools. On  **April 4, 2026** , billing enforcement turned on: third-party traffic stopped drawing from subscription quotas and now bills as overage. From an Anthropic spokesperson:

> *"Using Claude subscriptions with third-party tools isn't permitted under our Terms of Service, and they put an outsized strain on our systems."*

Google made a similar change with Gemini CLI in February 2026.

OpenAI has not made a similar change. Codex OAuth in third-party apps still works, and it's what OpenClaw's current OpenAI provider uses. A few things to note:

- The pattern depends on mimicking the Codex CLI request shape, including a specific system prompt that OpenAI's auth check expects. If OpenAI changes that check, third-party tools using this approach stop working until they're updated.
- The OpenClaw founder, after the Anthropic ban:  *"When a vendor can restrict your access overnight with 'no prior notice,' the tools and platforms that survive are the ones that don't depend on a single provider's good graces."*
- The same economics apply: a flat-rate ChatGPT plan priced for chat use is being used for programmatic, agentic workloads.

## OAuth for OpenAI (via Puter.js)

[Puter.js](https://docs.puter.com) is a frontend JavaScript SDK built on the [User-Pays Model](https://docs.puter.com/user-pays-model/). Users sign in with their Puter account once, and every call your app makes is billed to their Puter balance, not your OpenAI bill or their ChatGPT subscription.

Your app can then use AI features on behalf of the user. You don't set up OpenAI yourself, and your users don't BYOK. The app automatically uses the user's resources, not just AI but also [storage](/object-storage/), [databases](/key-value-database/), and more.

For OpenAI models, the integration is straightforward:

```html
<!DOCTYPE html>
<html>
<body>
  <script src="https://js.puter.com/v2/"></script>
  <script>
    puter.ai.chat("Explain CRDTs in one paragraph", {
      model: "gpt-5"
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
  model: "gpt-5"
}).then(response => {
  puter.print(response.message.content[0].text);
});
```

The `puter.ai.chat()` call runs directly in the browser. No backend, no API key in your code, no localhost proxy. Change the `model` parameter to use Claude, Gemini, Grok, and others.

## Comparing Methods

Aside from Puter.js, other patterns exist, each with different tradeoffs:

**Dev pays (your own API key).**  The developer holds a single server-side `OPENAI_API_KEY` and pays for every user request. It fits products where pricing covers usage with margin. It breaks on viral growth, leaked keys, or a single heavy user, all of which run up the bill. Quotas, rate limits, and key rotation fall on the developer.

**BYOK (users bring their own key).**  Each user creates an OpenAI Platform account (separate from their ChatGPT account), generates an API key, and pastes it into your app. Users pay for their own usage. It works for developer-tooling audiences who already have OpenAI Platform accounts. It stalls for consumer apps, since most non-technical users won't finish the signup. Rate limits and model access follow the user's tier, which you can't control.

**Codex OAuth in a third-party app.**  Use the user's ChatGPT subscription via `codex login` and route through a localhost proxy that mimics the Codex CLI. Currently works, used by tools like OpenClaw. Not officially supported â Anthropic removed the equivalent on Claude in April 2026, and Google made a similar change with Gemini CLI. Rate limits and model access follow the user's ChatGPT plan.

**Apps SDK / apps in ChatGPT.**  Your app runs  *inside*  ChatGPT as a tool ChatGPT can invoke. Useful for reaching ChatGPT's user base, but it doesn't put OpenAI's models in your own product.

**"Sign in with ChatGPT" (identity).**  Authenticate users with their ChatGPT account, similar to Sign in with Google. Doesn't grant model usage on the user's plan, even when it ships broadly.

## Conclusion

OpenAI has several OAuth surfaces, but none of them officially let a user's subscription pay for a third-party app's model calls. The Codex OAuth pattern fills the gap today, but the equivalent pattern on Claude was banned on April 4, 2026.

With [Puter.js](https://docs.puter.com), users sign in with their Puter account, and calls from your app are billed to their balance. You don't pay for usage, users don't manage API keys, and the integration doesn't depend on any vendor's tolerance for a third-party proxy.

Puter.js isn't just for AI. The same user-pays model covers [storage](/object-storage/), [databases](/key-value-database/), and more, so you can build full apps without setting up or paying for any of this infrastructure yourself.

Get started at [docs.puter.com](https://docs.puter.com).

## Related

- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
- [How to do OAuth with Claude](/tutorials/claude-oauth/)
- [How to do OAuth with Gemini](/tutorials/gemini-oauth/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [How to Get an OpenAI API Key](/tutorials/how-to-get-openai-api-key/)
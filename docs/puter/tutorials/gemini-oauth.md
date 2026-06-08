# How to do OAuth with Gemini

Source: https://developer.puter.com/tutorials/gemini-oauth/

[Tutorials](/tutorials/)

# How to do OAuth with Gemini

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 29, 2026
                                    

On this page[The Problem](#the-problem)[OAuth for Gemini (via Puter.js)](#oauth-for-gemini-via-puterjs)[Comparing Methods](#comparing-methods)[Conclusion](#conclusion)[Related](#related)

If you've tried to build an app and want to add AI functionality via OAuth with Gemini, you'll find that Google has several OAuth flows but none of them officially let a third-party app call Gemini on a user's behalf. The closest pattern, routing a Gemini CLI OAuth token through a proxy, is now an explicit Terms of Service violation, and Google has banned paying subscribers for using it. This article covers what each Gemini OAuth surface is for, what changed in February 2026, and what to use instead.

## The Problem

Developers ask the same question for Gemini that they ask for any model vendor: can my users sign in once and have my app call the model on their account?

Two reasons drive it, usually together:

1. **They don't want to pay for their users' API usage.**  A server-side Gemini API key means the developer pays for every request. Viral traffic, leaked keys, or a single heavy user can run up the bill.
2. **The Bring Your Own Key (BYOK) flow loses users to friction.**  Users have to set up an AI Studio or Google Cloud account, link billing, generate a key, and paste it into the app. Many won't finish.

Google ships several OAuth surfaces, but none of them solve this. The Gemini API at `generativelanguage.googleapis.com` does not have an `/oauth/authorize` flow that mints a token billed to the user's Google AI subscription. What does exist:

- **Gemini API key (AI Studio).**  A bearer key, BYOK only. No OAuth involved.
- **Vertex AI.**  OAuth and Application Default Credentials are supported, but they authenticate against the  *developer's*  GCP project. The user is not in the loop, and their Google AI subscription does not pay.
- **Gemini Code Assist subscription with the Gemini CLI.**  The CLI runs an OAuth flow and caches a token at `~/.gemini/tokens.json`. The token authenticates against the Code Assist API at `cloudcode-pa.googleapis.com`, not the public Gemini API. It is first-party: it works for the Gemini CLI, the IDE plugin, and Google Antigravity, and is not designed to be reused.
- **"Sign in with Google".**  Identity only, the same as any other Google sign-in. It does not grant model usage on the user's plan.

The Gemini CLI OAuth token is the only Google token that pays for model calls out of a user's subscription. It has the same shape as Anthropic's `sk-ant-oat01-` (Claude Code only) and OpenAI's [Codex](/ai/codex/) token, and it has the same restriction: only the first-party tool is supposed to use it. Third-party tools like OpenClaw used to proxy this token to back their own apps with a user's Google AI Pro or Ultra subscription, but Google banned the practice in February 2026 and mass-suspended accounts that used it, including paying Ultra subscribers.

## OAuth for Gemini (via Puter.js)

[Puter.js](https://docs.puter.com) is a frontend JavaScript SDK built on the [User-Pays Model](https://docs.puter.com/user-pays-model/). Users sign in with their Puter account once, and every call your app makes is billed to their Puter balance. No API key, no Gemini CLI token, and no proxy.

Your app can use Gemini features on behalf of the user without touching any of Google's OAuth surfaces. The same sign-in also covers [storage](/object-storage/), [databases](/key-value-database/), and more.

For Gemini, the integration is straightforward:

```html
<!DOCTYPE html>
<html>
<body>
  <script src="https://js.puter.com/v2/"></script>
  <script>
    puter.ai.chat("Explain CRDTs in one paragraph", {
      model: "google/gemini-2.5-pro"
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
  model: "google/gemini-2.5-pro"
}).then(response => {
  puter.print(response.message.content[0].text);
});
```

The `puter.ai.chat()` call runs directly in the browser. No backend, no API key in your code, no localhost proxy. Change the `model` parameter to use Claude, GPT, Grok, and others.

## Comparing Methods

Aside from Puter.js, other patterns exist, each with different tradeoffs:

**Dev pays (your own API key).**  The developer holds an AI Studio or Vertex AI key and pays for every user request. It fits products where pricing covers usage with margin. It breaks on viral growth, leaked keys, or a single heavy user, all of which run up the bill.

**BYOK (users bring their own key).**  Each user creates an AI Studio or Google Cloud account, generates a key, and pastes it into your app. Users pay for their own usage. It works for developer-facing products. It stalls for consumer apps, since most non-technical users won't finish the signup. Rate limits and model access follow the user's tier, which you can't control.

**Gemini CLI OAuth in a third-party app.**  Use the user's Google AI Pro or Ultra subscription via the Gemini CLI's OAuth token, routed through a localhost proxy that targets the Code Assist API. Banned by Google as of February 2026, with detection enforced from March 25, 2026. Real accounts, including paying Ultra subscribers, have lost access for using this pattern.

**Vertex AI with the developer's GCP project.**  OAuth and service-account auth are fully supported, but the developer's project pays. The user's Google AI subscription is not in the loop.

**"Sign in with Google" (identity).**  Authenticate users with their Google account, similar to any SSO. Does not grant model usage on the user's plan.

## Conclusion

Google supports OAuth in several places, but none of them officially let a user's Google AI subscription pay for a third-party app's Gemini calls. The Gemini CLI OAuth pattern that came close was banned in February 2026, with paid subscribers losing access during enforcement.

With [Puter.js](https://docs.puter.com), users sign in with their Puter account, and calls from your app are billed to their balance. You don't pay for usage, users don't manage API keys, and the integration doesn't depend on a vendor's tolerance for a third-party proxy.

Puter.js isn't just for AI. The same user-pays model covers [storage](/object-storage/), [databases](/key-value-database/), and more, so you can build full apps without setting up or paying for any of this infrastructure yourself.

Get started at [docs.puter.com](https://docs.puter.com).

## Related

- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
- [How to do OAuth with Claude](/tutorials/claude-oauth/)
- [How to do OAuth with OpenAI](/tutorials/openai-oauth/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [How to Get a Gemini API Key](/tutorials/how-to-get-gemini-api-key/)
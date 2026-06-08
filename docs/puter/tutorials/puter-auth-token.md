# How to Get Your Puter Auth Token

Source: https://developer.puter.com/tutorials/puter-auth-token/

[Tutorials](/tutorials/)

# How to Get Your Puter Auth Token

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: April 28, 2026
                                    

On this page[Getting Your Puter Auth Token](#getting-your-puter-auth-token)[FAQ](#faq)[I thought Puter.js doesn't require an API key?](#i-thought-puterjs-doesnt-require-an-api-key)[How do I use my auth token?](#how-do-i-use-my-auth-token)[Conclusion](#conclusion)[Related](#related)

In this guide, you'll learn how to get your Puter auth token from the dashboard and use it to authenticate from a backend service, CLI tool, or any environment where the usual browser-based login isn't an option.

Puter.js normally handles authentication for you in the browser automatically, so you don't need to manage any keys. But when you're running code outside the browser, like in a Node.js backend, a CLI tool, or a server-to-server script, that automatic flow has nothing to hook into, so you need to authenticate with a token instead.

That's what the auth token is for. It's a credential tied to your Puter account that you can drop into any non-browser environment to make calls on your behalf.

## Getting Your Puter Auth Token

Go to [puter.com/dashboard#account](https://puter.com/dashboard#account). If you're not signed in, log in with your Puter account first. If you don't have one yet, you can create one for free.

On the  **Account**  page, find the  **Auth Token**  section and click  **Copy** .

![Puter copy auth token](/assets/img/copy-auth-token.webp)

That's it. Your token is now on your clipboard. Store it somewhere safe like a password manager, an `.env` file, or your platform's secrets manager. Treat it like a password: anyone with this token can act as you on Puter, so never commit it to a public repository.

## FAQ

### I thought Puter.js doesn't require an API key?

You're right. In the browser, Puter.js handles authentication automatically. Users sign in with their own Puter account, and your app gets the credentials it needs without you ever touching a key. That's the whole [User-Pays model](https://docs.puter.com/user-pays-model/): no keys, no billing, your users cover their own usage.

The auth token only comes into play when you're running code somewhere that automatic flow can't run, like a Node.js backend, a CI job, a CLI script, or a WebDAV client. In those environments, you authenticate as  *yourself*  by passing your own token.

### How do I use my auth token?

The most common use is initializing Puter.js in Node.js:

```javascript
import { init } from "@heyputer/puter.js/src/init.cjs";

const puter = init(process.env.PUTER_AUTH_TOKEN);

const response = await puter.ai.chat("Hello, world!");
console.log(response.message.content.toString());
```

You can also use it as the API key against Puter's [OpenAI-compatible endpoint](/tutorials/use-openai-sdk-with-puter/), which lets you point any OpenAI SDK at Puter and access [hundreds of models](/ai/models/):

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.puter.com/puterai/openai/v1/",
  apiKey: process.env.PUTER_AUTH_TOKEN,
});

const response = await client.chat.completions.create({
  model: "gpt-5-nano",
  messages: [{ role: "user", content: "Hello, world!" }],
});
```

For a full walkthrough of the Node.js setup, see the [Puter.js in Node.js guide](/tutorials/puter-js-node-js/).

## Conclusion

To get your Puter auth token, sign in to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  in the  **Auth Token**  section. Use it to authenticate Puter.js in Node.js, hit the OpenAI-compatible API from a server, or connect any non-browser client to your account.

Most of the time, you won't need this, since Puter.js handles auth for you in the browser. But when you're building something on the backend or anywhere browser-based auth isn't an option, the auth token is how you bridge the gap.

## Related

- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
- [Puter.js in Node.js: Quick Start Guide](/tutorials/puter-js-node-js/)
- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Access Your Puter Files from Any Device](/tutorials/access-puter-files-from-any-device/)
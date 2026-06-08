# Puter.js in Next.js: Quick Start Guide

Source: https://developer.puter.com/tutorials/puter-js-next-js/

[Tutorials](/tutorials/)

# Puter.js in Next.js: Quick Start Guide

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: March 13, 2026
                                    

On this page[Prerequisites](#prerequisites)[1. Set Up Your Next.js Project](#1-set-up-your-nextjs-project)[2. Your First Puter.js Component](#2-your-first-puterjs-component)[3. Add AI to Your App](#3-add-ai-to-your-app)[4. Persist Data with Key-Value Storage](#4-persist-data-with-key-value-storage)[5. Where to Go from Here](#5-where-to-go-from-here)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to integrate Puter.js into a Next.js app. Puter.js is a JavaScript library that gives your frontend code direct access to AI models, cloud storage, databases, and more without needing a backend, API keys, or configuration. To see how it works, you'll build a sample app with AI-powered chat and a key-value store.

By the end, you'll have a working app with two features that would normally require a backend: AI-powered text generation and persistent data storage.

## Prerequisites

Before you start, make sure you have the following installed:

- **Node.js 24 or later** . Puter.js requires Node.js 24+. You can check your version by running `node -v` in your terminal.
- **Next.js 16 or later** . Next.js 16 ships with Turbopack enabled by default, which Puter.js requires. If you're on Next.js 15 or earlier, you'll need to [enable Turbopack manually](https://nextjs.org/docs/15/app/api-reference/turbopack), otherwise Puter.js won't work.

## 1. Set Up Your Next.js Project

Start by creating a new Next.js project. Open your terminal and run:

```javascript
npx create-next-app@latest puter-nextjs
```

When prompted, accept the defaults (TypeScript, App Router, etc.) or configure to your preference. Once it's done, navigate into the project:

```javascript
cd puter-nextjs
```

Next, install Puter.js:

```javascript
npm i @heyputer/puter.js
```

That's the only dependency you need. No environment variables to set, no `.env` files to create, no API keys to generate. Your project structure should look something like this:

```javascript
puter-nextjs/
âââ app/
â   âââ layout.tsx
â   âââ page.tsx
â   âââ ...
âââ package.json
âââ ...
```

Start the dev server to make sure everything works:

```javascript
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the default Next.js welcome page.

> **Tip:**  We also have a [Next.js starter template](https://github.com/HeyPuter/next.js) with Puter.js already set up.

## 2. Your First Puter.js Component

Puter.js relies on browser APIs, which means it can only run on the client. In Next.js (App Router), components are server components by default, so you need to explicitly mark your component with the `"use client"` directive.

Create a new file at `app/components/PuterChat.tsx`:

```javascript
"use client";

import { useState } from "react";
import puter from "@heyputer/puter.js";

export default function PuterChat() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h2>Puter.js + Next.js</h2>
      <p>{loading ? "Thinking..." : response || "Click the button to get started."}</p>
      <button onClick={() => {}} disabled={loading}>
        Ask AI
      </button>
    </div>
  );
}
```

This is just the shell. It imports Puter.js, sets up some state for the AI response, and renders a button. The `"use client"` directive at the top is the key part. Without it, Next.js will try to render this on the server, and Puter.js will fail because it needs access to `window` and other browser globals.

Now wire this component into your main page. Open `app/page.tsx` and replace its contents:

```javascript
import PuterChat from "./components/PuterChat";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>My Puter.js App</h1>
      <PuterChat />
    </main>
  );
}
```

Save and check your browser. You should see the heading and a button. Nothing happens yet when you click it â we'll fix that next.

## 3. Add AI to Your App

Now let's make the button do something. The `puter.ai.chat()` function sends a prompt to an AI model and returns a response. Update the `onClick` handler in your `PuterChat` component:

```javascript
"use client";

import { useState } from "react";
import puter from "@heyputer/puter.js";

export default function PuterChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");
```

Show 33 more lines...

```javascript
"use client";

import { useState } from "react";
import puter from "@heyputer/puter.js";

export default function PuterChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const reply = await puter.ai.chat(prompt);
      const text = reply.message?.content.toString() || "";
      setResponse(text);
    } catch (err) {
      setResponse("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask anything..."
        onKeyDown={(e) => e.key === "Enter" && handleAsk()}
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>
      {response && (
        <div>
          <strong>AI says:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
```

Collapse code

Save the file and try it out. Type a question in the input field and click "Ask AI." The first time you use Puter.js, it will prompt you to sign in with a Puter account â authentication is handled automatically, so there's nothing you need to configure.

That's it. You now have AI in your Next.js app. No API keys, no backend routes, no environment variables. One import and one function call.

> **Tip:**  You can specify a model by passing an options object: `puter.ai.chat("your prompt", { model: "gpt-5.4" })`. Puter.js supports [hundreds of AI models](/ai/models/) including [GPT](/ai/openai/), [Claude](/ai/anthropic/), [Gemini](/ai/google/), and more.

## 4. Persist Data with Key-Value Storage

AI responses are great, but they disappear when you refresh the page. Let's add persistence using Puter's built-in key-value store. We'll save the user's prompt history so it survives page reloads.

The KV store works like a simple database: `puter.kv.set(key, value)` to write, `puter.kv.get(key)` to read. No schema, no setup, no connection strings.

Update your component to track and persist prompt history:

```javascript
"use client";

import { useState, useEffect } from "react";
import puter from "@heyputer/puter.js";

export default function PuterChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  // Load prompt history from KV store on mount
  useEffect(() => {
    async function loadHistory() {
      try {
```

Show 66 more lines...

```javascript
"use client";

import { useState, useEffect } from "react";
import puter from "@heyputer/puter.js";

export default function PuterChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  // Load prompt history from KV store on mount
  useEffect(() => {
    async function loadHistory() {
      try {
        const saved = await puter.kv.get<string[]>("prompt_history");
        if (saved) {
          setHistory(saved);
        }
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    }
    loadHistory();
  }, []);

  async function handleAsk() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const reply = await puter.ai.chat(prompt);
      const text = reply.message?.content.toString() || "";
      setResponse(text);

      // Save prompt to history
      const updatedHistory = [...history, prompt];
      setHistory(updatedHistory);
      await puter.kv.set("prompt_history", updatedHistory);
    } catch (err) {
      setResponse("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask anything..."
        onKeyDown={(e) => e.key === "Enter" && handleAsk()}
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
        <div>
          <strong>AI says:</strong>
          <p>{response}</p>
        </div>
      )}

      {history.length > 0 && (
        <div>
          <h3>Your prompt history</h3>
          <ul>
            {history.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

Collapse code

Now try asking a few questions, then refresh the page. Your prompt history will still be there. The data is stored in the user's own Puter account. Each user of your app gets their own isolated storage, and you don't pay for any of it (Puter uses a [User-Pays Model](https://docs.puter.com/user-pays-model/) where users cover their own resource usage).

## 5. Where to Go from Here

You've now used two of Puter's core features (AI and Key-Value Storage), but there's a lot more available through the same library, with no additional setup:

- **Cloud Storage**  ([`puter.fs`](https://docs.puter.com/FS/)) â read, write, and manage files in the cloud. Think Dropbox-like file operations from your frontend.
- **Authentication**  ([`puter.auth`](https://docs.puter.com/Auth/)) â sign users in and out, check auth status, get user info. Already built-in, no OAuth configuration needed.
- **Hosting**  ([`puter.hosting`](https://docs.puter.com/Hosting/)) â deploy static sites to a `*.puter.site` subdomain, directly from your code.
- **Networking**  ([`puter.net`](https://docs.puter.com/Networking/)) â TCP sockets, TLS, and HTTP fetch from the client side.
- **Serverless Workers**  ([`puter.workers`](https://docs.puter.com/Workers/)) â run backend logic without managing servers.

Each of these follows the same pattern: import Puter.js, call a function, get results. No additional packages, no infra to manage.

## Conclusion

In this tutorial, you learned how to integrate Puter.js into a Next.js app. With Puter.js, you can add [AI](/ai/), [cloud storage](/object-storage/), [key-value databases](/key-value-database/), and more to your app, all without a backend, API keys, or any configuration.

For a deeper dive into everything Puter.js can do, check out the [full documentation](https://docs.puter.com). You can also use the [Next.js starter template](https://github.com/HeyPuter/next.js) to quickly get started on your next project. And if you get stuck or want to share what you're building, join the [Puter Discord community](https://discord.com/invite/PQcx7Teh8u).

## Related

- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
- [Puter.js in Node.js: Quick Start Guide](/tutorials/puter-js-node-js/)
- [Puter.js in React: Quick Start Guide](/tutorials/puter-js-react/)
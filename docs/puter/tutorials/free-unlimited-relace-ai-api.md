# Free, Unlimited Relace AI API

Source: https://developer.puter.com/tutorials/free-unlimited-relace-ai-api/

[Tutorials](/tutorials/)

# Free, Unlimited Relace AI API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 12, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Finding a specific function in a file](#example-1-finding-a-specific-function-in-a-file)[Example 2: Spotting a bug across multiple files](#example-2-spotting-a-bug-across-multiple-files)[Example 3: Streaming the search output](#example-3-streaming-the-search-output)[List of supported models](#list-of-supported-models)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [Relace](/ai/relace/)'s [Relace Search](/ai/relace/relace-search/) agentic codebase search model for free, without needing API keys, backend, or server-side setup.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate [AI capabilities](/ai/) into their applications while each user covers their own usage costs. This model enables developers to offer advanced AI capabilities to users at no cost to themselves, without any API keys or server-side setup.

## Getting Started

To use Puter.js, import our [NPM library](https://www.npmjs.com/package/@heyputer/puter.js) in your project:

```js
// npm install @heyputer/puter.js
import { puter } from '@heyputer/puter.js';
```

Or alternatively, add our script via CDN if you are working directly with HTML, simply add it to the `<head>` or `<body>` section of your code:

```html
<script src="https://js.puter.com/v2/"></script>
```

Nothing else is required to start using Puter.js for free access to Relace Search.

## Example 1: Finding a specific function in a file

[Relace Search](/ai/relace/relace-search/) is a code-aware model tuned to locate the exact lines that answer a question about a codebase. The simplest way to use it from the browser is to paste the source you want searched into the prompt and ask Search to point at the right spot. Use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const file = `// auth.js
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret";

export function signToken(user) {
    return jwt.sign({ sub: user.id, role: user.role }, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token) {
    try {
```

Show 24 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const file = `// auth.js
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret";

export function signToken(user) {
    return jwt.sign({ sub: user.id, role: user.role }, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET);
    } catch (e) {
        return null;
    }
}

export function requireAuth(req, res, next) {
    const header = req.headers.authorization || "";
    const token = header.replace(/^Bearer\\s+/i, "");
    const payload = verifyToken(token);
    if (!payload) return res.status(401).json({ error: "unauthorized" });
    req.user = payload;
    next();
}`;

        puter.ai.chat(
            `In the file below, which function is responsible for rejecting unauthenticated requests, and what line range does it occupy? Quote the lines that perform the rejection.\n\n${file}`,
            { model: "relace/relace-search" }
        ).then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

Collapse code

Search will return the function name (`requireAuth`), the line range, and the exact `return res.status(401)` line that performs the rejection â usable directly as context for a follow-up edit.

## Example 2: Spotting a bug across multiple files

Search is at its best when the prompt contains several files and you describe a symptom rather than naming the function. Below, paste two related files and ask Search to find why coupon codes can produce a negative order total:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const cart = `// cart.js
export function subtotal(items) {
    return items.reduce((s, i) => s + i.price * i.quantity, 0);
}

export function orderTotal(items, coupon) {
    const sub = subtotal(items);
    const discount = coupon ? applyCoupon(sub, coupon) : 0;
    return sub - discount;
}`;
```

Show 24 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const cart = `// cart.js
export function subtotal(items) {
    return items.reduce((s, i) => s + i.price * i.quantity, 0);
}

export function orderTotal(items, coupon) {
    const sub = subtotal(items);
    const discount = coupon ? applyCoupon(sub, coupon) : 0;
    return sub - discount;
}`;

        const coupons = `// coupons.js
const COUPONS = {
    SAVE10: { type: "percent", value: 10 },
    FREESHIP: { type: "flat", value: 15 },
    LOYAL50: { type: "flat", value: 50 },
};

export function applyCoupon(subtotal, code) {
    const c = COUPONS[code];
    if (!c) return 0;
    if (c.type === "percent") return subtotal * (c.value / 100);
    if (c.type === "flat") return c.value;
    return 0;
}`;

        puter.ai.chat(
            `Users report that some coupon codes make the order total go negative. Find the file and line responsible, and explain the fix in one sentence.\n\n${cart}\n\n${coupons}`,
            { model: "relace/relace-search" }
        ).then(response => {
            puter.print(response, {code: true});
        });
    </script>
</body>
</html>
```

Collapse code

Search should pinpoint `coupons.js`'s flat-discount branch (or `cart.js`'s unclamped `sub - discount`) and note that the fix is to clamp the result at zero â exactly the kind of small, citation-grounded answer you want feeding into a coding agent.

## Example 3: Streaming the search output

When the file you're feeding Search is large, streaming lets you render the answer as it arrives instead of blocking on the full response:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamSearch() {
            const file = `// storage.js
export function saveDraft(key, value) {
    localStorage.setItem(\`draft:\${key}\`, JSON.stringify(value));
}

export function loadDraft(key) {
    const raw = localStorage.getItem(\`draft:\${key}\`);
    return raw ? JSON.parse(raw) : null;
}
```

Show 26 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        async function streamSearch() {
            const file = `// storage.js
export function saveDraft(key, value) {
    localStorage.setItem(\`draft:\${key}\`, JSON.stringify(value));
}

export function loadDraft(key) {
    const raw = localStorage.getItem(\`draft:\${key}\`);
    return raw ? JSON.parse(raw) : null;
}

export function clearDraft(key) {
    localStorage.removeItem(\`draft:\${key}\`);
}

export function rememberTheme(theme) {
    localStorage.setItem("theme", theme);
}

export function getTheme() {
    return localStorage.getItem("theme") || "light";
}`;

            const response = await puter.ai.chat(
                `List every function in the file below that touches localStorage. For each, give the function name, the key it uses, and whether it reads or writes.\n\n${file}`,
                { model: "relace/relace-search", stream: true }
            );

            for await (const part of response) {
                if (part?.text) puter.print(part.text.replaceAll('\n', '<br>'));
            }
        }

        streamSearch();
    </script>
</body>
</html>
```

Collapse code

This makes Search feel responsive inside chat-style UIs and is the same pattern coding agents use: stream a list of citations from Search, then pass them to a stronger reasoning model for the actual edit.

## List of supported models

The following Relace models are supported by Puter.js:

```text
relace/relace-search
```

That's it! You now have free access to Relace's agentic codebase search model using Puter.js. Pair Search with a frontier model that handles the actual edits, and you've got the same retrieval-plus-reasoning loop powering modern AI coding tools â no API keys, no backend, no billing setup required.

## Related

- [Free, Unlimited Codex API](/tutorials/free-unlimited-codex-api/)
- [Free, Unlimited Kwaipilot Kat API](/tutorials/free-unlimited-kwaipilot-kat-api/)
- [Free, Unlimited Poolside AI API](/tutorials/free-unlimited-poolside-ai-api/)
- [Free, Unlimited DeepSeek API](/tutorials/free-unlimited-deepseek-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Qwen API](/tutorials/free-unlimited-qwen-api/)
- [Free, Unlimited Kimi K2.6 API](/tutorials/free-unlimited-kimi-k2-api/)
- [Use Claude Code with Puter](/tutorials/use-claude-code-with-puter/)
- [Use Cline with Puter](/tutorials/use-cline-with-puter/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Free, Unlimited OpenRouter API](/tutorials/free-unlimited-openrouter-api/)
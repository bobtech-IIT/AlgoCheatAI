# Getting Started

Source: https://docs.puter.com/getting-started/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# Getting Started

---

## Quick Start

Install Puter.js using NPM or include it directly via CDN.

NPM module
CDN (script tag)

#### Install

```plaintext
npm install @heyputer/puter.js
```

#### Use in the browser

```js
import { puter } from "@heyputer/puter.js";

// Example: Use AI to answer a question
puter.ai.chat(`Why did the chicken cross the road?`).then(console.log);
```

#### Use in Node.js

Initialize Puter.js with your auth token using the `init` function:

```js
import { init } from "@heyputer/puter.js/src/init.cjs";
const puter = init(process.env.puterAuthToken);

// Example: Use AI to answer a question
puter.ai.chat("What color was Napoleon's white horse?").then(console.log);
```

If your environment has browser access, you can obtain a token via browser login:

```js
import { init, getAuthToken } from "@heyputer/puter.js/src/init.cjs";

const authToken = await getAuthToken(); // performs browser based auth
const puter = init(authToken);
```

#### Include the script

```html
<script src="https://js.puter.com/v2/"></script>
```

#### Use in the browser

```html
<html>
  <body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
      puter.ai.chat(`Why did the chicken cross the road?`).then(puter.print);
    </script>
  </body>
</html>
```

## Starter templates

Additionally, you can use one of the following starter templates to get started:

[React](https://github.com/HeyPuter/react)
[Next.js](https://github.com/HeyPuter/next.js)
[Angular](https://github.com/HeyPuter/angular)
[Vue.js](https://github.com/HeyPuter/vue.js)
[Svelte](https://github.com/HeyPuter/svelte)
[Astro](https://github.com/HeyPuter/astro)
[Vanilla JavaScript](https://github.com/HeyPuter/vanilla.js)
[Node.js + Express](https://github.com/HeyPuter/node.js-express.js)

## Where to Go From Here

To learn more about the capabilities of Puter.js and how to use them in your web application, check out

- [Tutorials](https://developer.puter.com/tutorials): Step-by-step guides to help you get started with Puter.js and build powerful applications.
- [Playground](https://docs.puter.com/playground): Experiment with Puter.js in your browser and see the results in real-time. Many examples are available to help you understand how to use Puter.js effectively.
- [Examples](https://docs.puter.com/examples): A collection of code snippets and full applications that demonstrate how to use Puter.js to solve common problems and build innovative applications.

[NEXT

Supported Platforms](/./supported-platforms/)[PREVIOUS

Puter.js](/./)
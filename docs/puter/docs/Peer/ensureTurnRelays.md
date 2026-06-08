# puter.peer.ensureTurnRelays()

Source: https://docs.puter.com/Peer/ensureTurnRelays/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.peer.ensureTurnRelays()`

 Websites Puter Apps Node.js Workers

---

Fetches TURN relay credentials ahead of time so that peer connections can start faster. This is optional because `puter.peer.serve()` and `puter.peer.connect()` call it automatically when needed.

## Syntax

```js
await puter.peer.ensureTurnRelays();
```

## Return value

A `Promise` that resolves when relay details are cached. If relays cannot be loaded, Puter.js will fall back to default ICE servers when connecting.

[NEXT

UI](/./UI/)[PREVIOUS

`connect()`](/./Peer/connect/)
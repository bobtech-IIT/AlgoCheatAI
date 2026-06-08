# puter.peer.connect()

Source: https://docs.puter.com/Peer/connect/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.peer.connect()`

 Websites Puter Apps Node.js Workers

---

Connects to a peer server and returns a `PuterPeerConnection` instance.

On websites, Puter.js may prompt the user to authenticate before connecting.

## Syntax

```js
const conn = await puter.peer.connect(inviteCode);
const conn = await puter.peer.connect(inviteCode, options);
```

## Parameters

#### `inviteCode` (required)

A string invite code created by `puter.peer.serve()`.

#### `options` (optional)

`options` is an object with the following properties:

- `iceServers` (`RTCIceServer[]`) Custom ICE servers (STUN/TURN) to use instead of the Puter-managed relays.

## Return value

A `Promise` that resolves to a `PuterPeerConnection` instance.

### `PuterPeerConnection` methods and events

- `send(data)` - Send a message to the peer. Supports strings, `Blob`, `ArrayBuffer`, or `ArrayBufferView`.
- `close(reason)` - Close the connection.
- `owner` (`object`) - Information about the user who created the server.
- `open` event: Fired when the data channel is ready.
- `message` event: Fired when a message is received (`event.data`).
- `close` event: Fired when the connection closes (`event.reason`).
- `error` event: Fired when a connection error occurs (`event.error`).

## Example

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const inviteCode = prompt('Enter invite code');
            const conn = await puter.peer.connect(inviteCode);

            conn.addEventListener('open', () => {
                conn.send('Hello from the client!');
            });
            conn.addEventListener('message', (msg) => {
                puter.print('Server says:', msg.data);
            });
        })();
    </script>
</body>
</html>
```

[NEXT

`ensureTurnRelays()`](/./Peer/ensureTurnRelays/)[PREVIOUS

`serve()`](/./Peer/serve/)
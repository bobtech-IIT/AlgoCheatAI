# puter.peer.serve()

Source: https://docs.puter.com/Peer/serve/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/function.svg)`puter.peer.serve()`

 Websites Puter Apps Node.js Workers

---

Creates a peer server and returns a `PuterPeerServer` instance. The server will generate an invite code that other clients can use to connect.

On websites, Puter.js may prompt the user to authenticate before creating the peer server.

## Syntax

```js
const server = await puter.peer.serve();
const server = await puter.peer.serve(options);
```

## Parameters

#### `options` (optional)

`options` is an object with the following properties:

- `iceServers` (`RTCIceServer[]`) Custom ICE servers (STUN/TURN) to use instead of the Puter-managed relays.

## Return value

A `Promise` that resolves to a `PuterPeerServer` instance.

### `PuterPeerServer` properties and events

- `inviteCode` (`string`) The code you share with other clients.
- `connections` (`Map<string, PuterPeerConnection>`) map of all connected clients
- `connection` event: Fired when a client connects.
- `event.conn` (`PuterPeerConnection`) The connection to the client.
- `event.user` (`object`) Metadata about the connecting user (if available).

## Example

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const server = await puter.peer.serve();
            puter.print(`Invite code: ${server.inviteCode}`);

            server.addEventListener('connection', (event) => {
                const conn = event.conn;
                conn.addEventListener('open', () => {
                    conn.send('Hello from the server!');
                });
                conn.addEventListener('message', (msg) => {
                    puter.print('Client says:', msg.data);
                });
            });
        })();
    </script>
</body>
</html>
```

[NEXT

`connect()`](/./Peer/connect/)[PREVIOUS

Peer](/./Peer/)
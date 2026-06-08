# Free, Unlimited Database Hosting

Source: https://developer.puter.com/tutorials/free-unlimited-database-hosting/

[Tutorials](/tutorials/)

# Free, Unlimited Database Hosting

[Reynaldi Chernando](/author/reynaldichernando/), [Nariman Jelveh](/author/jelveh/)

                                        Updated: May 20, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Set and Read a Value](#example-1-set-and-read-a-value)[Example 2: Store and Retrieve Objects](#example-2-store-and-retrieve-objects)[Example 3: List Keys with a Pattern](#example-3-list-keys-with-a-pattern)[Example 4: Counters with incr and decr](#example-4-counters-with-incr-and-decr)[Example 5: Update Nested Fields](#example-5-update-nested-fields)[Example 6: Expire a Key](#example-6-expire-a-key)[Example 7: Delete a Key](#example-7-delete-a-key)[Conclusion](#conclusion)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) as a database for your app for free, without needing any backend infrastructure, servers, connection strings, or API keys. Using Puter.js, you can perform database operations directly from the browser. Puter.js can serve as a free alternative to Redis, DynamoDB, Firebase, Supabase, or rolling your own database.

Puter is the pioneer of the [User Pays model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate cloud and [AI capabilities](/ai/) into their applications while users cover their own usage costs. Each user gets their own dedicated key-value store on Puter, so you can scale to as many users as you want without ever touching an infrastructure bill.

The same architecture makes Puter.js a strong fit for AI coding assistants, agents, and vibe-coding platforms. Puter-powered apps and sites need no API keys and no backend to configure, so what an assistant generates can run end-to-end immediatelyâno extra signups, no services to deploy, no secrets to paste in. That sidesteps a whole class of security risks and the setup friction that often keeps AI-built projects from working on the first try.

## Getting Started

Puter.js works out of the box without any additional setup or configuration. To use Puter.js, import our [NPM library](https://www.npmjs.com/package/@heyputer/puter.js) in your project:

```js
// npm install @heyputer/puter.js
import { puter } from '@heyputer/puter.js';
```

Or alternatively, add our script via CDN if you are working directly with HTML, simply add it to the `<head>` or `<body>` section of your code:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

That's it! You're now ready to use a database in your website. No API keys, no sign up, no server.

## Example 1: Set and Read a Value

Let's start with the simplest case â saving a value to the cloud and reading it back:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Save a value
            await puter.kv.set('greeting', 'Hello from the cloud!');

            // Read it back
            const value = await puter.kv.get('greeting');

            puter.print(`Value: ${value}`);
        })();
    </script>
</body>
</html>
```

[`puter.kv.set()`](https://docs.puter.com/KV/set/) accepts a string, number, boolean, object, or array, so the same call handles primitives and structured data. It's an upsert â if the key already exists, it overwrites; if not, it creates. [`puter.kv.get()`](https://docs.puter.com/KV/get/) returns the value as you stored it, or `null` if the key doesn't exist.

## Example 2: Store and Retrieve Objects

You can hand `puter.kv.set()` an object directly â there's no need to `JSON.stringify()` it yourself. Reading it back gives you the same shape:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Save a user profile
            await puter.kv.set('user:42', {
                name: 'Ada Lovelace',
                email: 'ada@example.com',
                joined: 2026
            });

            // Read it back
            const user = await puter.kv.get('user:42');

            puter.print(`
                Name: ${user.name}<br>
                Email: ${user.email}<br>
                Joined: ${user.joined}
            `);
        })();
    </script>
</body>
</html>
```

Each value can be up to 400 KB, which is plenty for documents like user profiles, settings, drafts, or cached API responses.

## Example 3: List Keys with a Pattern

[`puter.kv.list()`](https://docs.puter.com/KV/list/) returns the keys in the user's store for your app. Pass a prefix with `*` to filter, and `true` as the second argument to get both keys and values:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Save a few users
            await puter.kv.set('user:1', { name: 'Ada' });
            await puter.kv.set('user:2', { name: 'Linus' });
            await puter.kv.set('user:3', { name: 'Grace' });
            await puter.kv.set('app:version', '1.0.0');

            // List only keys that start with "user:"
            const users = await puter.kv.list('user:*', true);

            users.forEach(({ key, value }) => {
                puter.print(`${key} â ${value.name}<br>`);
            });
        })();
    </script>
</body>
</html>
```

Results are sorted lexicographically by key, so prefix patterns like `user:*` line up neatly. For very large stores, pass `{ pattern, limit, cursor }` to paginate.

## Example 4: Counters with incr and decr

[`puter.kv.incr()`](https://docs.puter.com/KV/incr/) and [`puter.kv.decr()`](https://docs.puter.com/KV/decr/) atomically change a number, which is exactly what you want for view counts, likes, inventory, or rate limits â no read-modify-write race conditions:

```html
<html>
<body>
    <button id="like">Like</button>
    <button id="unlike">Unlike</button>
    <div id="count"></div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        const render = async () => {
            const value = (await puter.kv.get('likes')) ?? 0;
            document.getElementById('count').textContent = `Likes: ${value}`;
        };

        document.getElementById('like').addEventListener('click', async () => {
            await puter.kv.incr('likes');
            render();
        });
        document.getElementById('unlike').addEventListener('click', async () => {
            await puter.kv.decr('likes');
            render();
        });

        render();
    </script>
</body>
</html>
```

Both methods take an optional amount as the second argument â `puter.kv.incr('likes', 5)` bumps by five.

## Example 5: Update Nested Fields

You don't have to read a whole document, change a field, and write it back. [`puter.kv.update()`](https://docs.puter.com/KV/update/) takes dot-notation paths and rewrites only the fields you name, leaving everything else in place:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Seed a user document
            await puter.kv.set('user:42', {
                name: 'Ada Lovelace',
                stats: { score: 10, level: 1 },
                preferences: { theme: 'light', lang: 'en' }
            });

            // Change just two nested fields
            await puter.kv.update('user:42', {
                'stats.score': 25,
                'preferences.theme': 'dark'
            });

            const user = await puter.kv.get('user:42');
            puter.print(`
                Name: ${user.name}<br>
                Score: ${user.stats.score}<br>
                Theme: ${user.preferences.theme}<br>
                Language: ${user.preferences.lang}
            `);
        })();
    </script>
</body>
</html>
```

This avoids overwriting the entire value on every small change, which matters when your documents grow large.

## Example 6: Expire a Key

[`puter.kv.expire()`](https://docs.puter.com/KV/expire/) sets a time-to-live in seconds, after which the key disappears on its own. That makes it a natural fit for short-lived data like verification codes, sessions, or cached lookups:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Store a one-time code that auto-deletes in 60 seconds
            await puter.kv.set('verify:ada', '482913');
            await puter.kv.expire('verify:ada', 60);

            // Read it back while it's still alive
            const code = await puter.kv.get('verify:ada');
            puter.print(`Code: ${code} (expires in 60s)`);
        })();
    </script>
</body>
</html>
```

You can also pass an expiration timestamp straight to `set()` as a third argument: `puter.kv.set('verify:ada', '482913', Math.floor(Date.now() / 1000) + 60)`.

## Example 7: Delete a Key

[`puter.kv.del()`](https://docs.puter.com/KV/del/) removes a single key, and [`puter.kv.flush()`](https://docs.puter.com/KV/flush/) wipes every key your app stored for the current user:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Set up a few keys
            await puter.kv.set('draft:1', 'first');
            await puter.kv.set('draft:2', 'second');
            await puter.kv.set('draft:3', 'third');

            // Delete a single key
            await puter.kv.del('draft:1');
            puter.print('Deleted draft:1<br>');

            // Confirm it's gone
            puter.print(`draft:1 is now: ${await puter.kv.get('draft:1')}<br>`);

            // Wipe everything your app has saved for this user
            await puter.kv.flush();
            puter.print('Flushed the rest');
        })();
    </script>
</body>
</html>
```

`flush()` only touches keys written by your app â other apps' stores in the same user's account stay untouched.

## Conclusion

With Puter.js, you can add a database to your app for free. With these you can cover the same ground as a hosted key-value database â reads, writes, structured documents, listing, counters, TTLs, and deletes â without an API key, a server, or a connection string.

And because Puter runs on the User Pays model, your users cover their own storage. You can ship the app to one user or a million, and the cost on your side stays at zero. For the full reference, see the [Puter.js KV documentation](https://docs.puter.com/KV/).

## Related

- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
- [Free, Unlimited Object Storage](/tutorials/free-unlimited-object-storage/)
- [How to Use Puter.js Key-Value Store API](/tutorials/kv-guide/)
- [Free, Unlimited Cloud Storage API](/tutorials/free-unlimited-cloud-storage-api/)
- [Build a File Sharing App with Puter.js](/tutorials/build-file-sharing-app-with-puter-js/)
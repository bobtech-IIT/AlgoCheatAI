# How to Use Puter.js Key-Value Store API

Source: https://developer.puter.com/tutorials/kv-guide/

[Tutorials](/tutorials/)

# How to Use Puter.js Key-Value Store API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 18, 2026
                                    

On this page[Basic Operations](#basic-operations)[Atomic Counters](#atomic-counters)[Key Design](#key-design)[Embedding Related Data](#embedding-related-data)[Many-to-Many Relationships](#many-to-many-relationships)[When to Embed vs. Separate Keys](#when-to-embed-vs-separate-keys)[Partial Updates](#partial-updates)[update(): Change Specific Fields](#update-change-specific-fields)[add(): Append to Arrays](#add-append-to-arrays)[remove(): Strip Fields](#remove-strip-fields)[Listing, Filtering, and Paginating](#listing-filtering-and-paginating)[Prefix Patterns](#prefix-patterns)[Pagination](#pagination)[Designing Keys for Filtering](#designing-keys-for-filtering)[Sorting](#sorting)[TTL and Data Lifecycle](#ttl-and-data-lifecycle)[Auto-Expiring Keys](#auto-expiring-keys)[Flush for Full Reset](#flush-for-full-reset)[Soft Delete Pattern](#soft-delete-pattern)[More Patterns](#more-patterns)[Parallel Reads](#parallel-reads)[Pre-Computed Aggregates](#pre-computed-aggregates)[Range-Like Queries](#range-like-queries)[Version Tracking](#version-tracking)[Conclusion](#conclusion)[Related](#related)

Puter.js KV is a cloud-hosted key-value store that works from a single script tag, no server, no API keys, no database setup. Your data lives in the cloud, syncs across devices, and each user's data is automatically isolated per app.

Additionally, due to Puter.js's unique User-Pays, keyless, and backendless nature, Puter.js KV is uniquely suited for use by AI coding assistants, agents, and vibe coding platforms like [Codex](/ai/codex/), Claude Code, OpenCode, Cursor, and more. While traditional databases require provisioning a server, configuring credentials, and wiring up a backend, Puter.js KV works from a single script tag â meaning AI-generated apps that use it have persistent cloud storage out of the box, with zero setup friction and no exposed credentials.

This guide covers everything you need to know about Puter.js KV, from basic operations to techniques that let you handle real use cases with just keys and values.

## Basic Operations

At its core, KV is a dictionary: you store a value under a key, and you get it back by that key.

```js
// Store a value
await puter.kv.set('username', 'alice');

// Read it back
const name = await puter.kv.get('username');
// "alice"

// Delete it
await puter.kv.del('username');
```

You can also store full objects and arrays:

```js
await puter.kv.set('user:42', {
  name: 'Alice',
  email: 'alice@example.com',
  role: 'admin',
  preferences: { theme: 'dark', lang: 'en' }
});

const user = await puter.kv.get('user:42');
// { name: "Alice", email: "alice@example.com", ... }
```

`set()` is an upsert. If the key exists, it overwrites; if not, it creates.

### Atomic Counters

`incr()` and `decr()` are atomic, so they're safe even if multiple operations happen at the same time:

```js
// Track page views
await puter.kv.incr('stats:pageviews');
await puter.kv.incr('stats:pageviews');
await puter.kv.incr('stats:pageviews');

const views = await puter.kv.get('stats:pageviews');
// 3

// Decrement stock
await puter.kv.set('product:42:stock', 10);
await puter.kv.decr('product:42:stock');
// 9
```

## Key Design

With traditional databases, you design your data first (tables, columns, relationships) and then write queries to get what you need. With KV, it's the other way around: you start with how you want to read your data, and design your keys around that. Your key naming convention becomes your filter.

```js
// Store posts for a user
await puter.kv.set('user:42:post:001', {
  title: 'Hello World',
  body: 'My first post',
  created: '2025-03-01T10:00:00Z'
});

await puter.kv.set('user:42:post:002', {
  title: 'Second Post',
  body: 'Getting the hang of this',
  created: '2025-03-05T14:30:00Z'
});

await puter.kv.set('user:99:post:001', {
  title: 'Different User',
  body: 'This is someone else',
  created: '2025-03-06T09:00:00Z'
});
```

To get all posts by user 42, use `list()` with a prefix:

```js
const keys = await puter.kv.list('user:42:post:*');
// ["user:42:post:001", "user:42:post:002"]
```

User 99's posts? `list('user:99:post:*')`.

If you need to look something up, structure your keys so you can reach it by prefix.

## Embedding Related Data

If you always read an order with its items, store them together in one value:

```js
await puter.kv.set('order:100', {
  customer: 'Alice',
  date: '2025-03-10',
  status: 'shipped',
  items: [
    { product: 'Keyboard', qty: 1, price: 75 },
    { product: 'Mouse', qty: 2, price: 25 },
    { product: 'Monitor', qty: 1, price: 350 }
  ],
  total: 475
});

// One read, everything you need
const order = await puter.kv.get('order:100');
```

### Many-to-Many Relationships

For relationships that go both ways (like students enrolled in courses), store the data from both access directions:

```js
// When student enrolls in a course, write both sides:

// "What courses is this student taking?"
await puter.kv.set('student:5:course:cs101', {
  title: 'Intro to CS',
  instructor: 'Dr. Smith'
});
await puter.kv.set('student:5:course:math201', {
  title: 'Linear Algebra',
  instructor: 'Dr. Jones'
});

// "What students are in this course?"
await puter.kv.set('course:cs101:student:5', {
  name: 'Bob',
  year: 2
});
await puter.kv.set('course:cs101:student:12', {
  name: 'Carol',
  year: 3
});

// Query either direction with list()
const bobsCourses = await puter.kv.list('student:5:course:*');
const cs101Students = await puter.kv.list('course:cs101:student:*');
```

Some data is duplicated here, that's the trade-off for fast, join-free reads. When you do need to combine data from separate keys, you do it in your application code rather than in the database.

### When to Embed vs. Separate Keys

- **Embed**  when you always read the data together (order + items, profile + preferences) and the nested data doesn't change independently very often.
- **Separate keys**  when child items are accessed individually, grow unbounded, or update frequently on their own. When data lives in separate keys, you join them in your application code by reading each key and combining the results.

## Partial Updates

If you embed data in a single key, you don't have to read-modify-write the whole value every time. Puter KV has partial update operations.

### `update()`: Change Specific Fields

Use dot notation to reach into nested objects:

```js
await puter.kv.set('user:42', {
  name: 'Alice',
  stats: { score: 10, level: 1 },
  preferences: { theme: 'light', lang: 'en' }
});

// Update just the score and theme, everything else stays
await puter.kv.update('user:42', {
  'stats.score': 25,
  'preferences.theme': 'dark'
});
// Result: { name: 'Alice', stats: { score: 25, level: 1 },
//           preferences: { theme: 'dark', lang: 'en' } }
```

### `add()`: Append to Arrays

```js
await puter.kv.set('user:42', {
  name: 'Alice',
  tags: ['admin']
});

// Append to the tags array
await puter.kv.add('user:42', {
  'tags': ['moderator', 'beta-tester']
});
// Result: { name: 'Alice', tags: ['admin', 'moderator', 'beta-tester'] }
```

### `remove()`: Strip Fields

```js
await puter.kv.set('user:42', {
  name: 'Alice',
  stats: { score: 25, level: 3 },
  tempToken: 'abc123'
});

// Remove the temp token and the score
await puter.kv.remove('user:42', 'tempToken', 'stats.score');
// Result: { name: 'Alice', stats: { level: 3 } }
```

These three operations are useful when you have large embedded documents and want to avoid overwriting the entire value on every small change.

## Listing, Filtering, and Paginating

### Prefix Patterns

`list()` supports glob-style prefix matching:

```js
// All users
await puter.kv.list('user:*');

// All posts by user 42
await puter.kv.list('user:42:post:*');

// All active sessions
await puter.kv.list('session:active:*');

// Get keys AND values together
await puter.kv.list('user:42:post:*', true);
// [{ key: "user:42:post:001", value: { title: "Hello World", ... } }, ...]
```

### Pagination

For large key sets, use cursor-based pagination:

```js
// Get the first 10
const firstPage = await puter.kv.list({ limit: 10 });

// Get the next 10 using the cursor
if (firstPage.cursor) {
  const secondPage = await puter.kv.list({ cursor: firstPage.cursor });
}
```

### Designing Keys for Filtering

Since prefix matching is your only native filter, you can encode filter values into your keys:

```js
// Instead of one flat namespace:
await puter.kv.set('order:100', { status: 'active', ... });
await puter.kv.set('order:101', { status: 'completed', ... });

// Encode the status into the key:
await puter.kv.set('order:active:100', { ... });
await puter.kv.set('order:completed:101', { ... });

// Now filtering is just a prefix query
const activeOrders = await puter.kv.list('order:active:*');
const completedOrders = await puter.kv.list('order:completed:*');
```

The trade-off: when an order's status changes, you delete the old key and create a new one. But reads become instant.

### Sorting

`list()` returns keys in lexicographic (string) order.

**ISO timestamps sort correctly out of the box:**

```js
await puter.kv.set('log:2025-03-15T10:00:00Z', { msg: 'third' });
await puter.kv.set('log:2025-01-01T00:00:00Z', { msg: 'first' });
await puter.kv.set('log:2025-02-14T08:00:00Z', { msg: 'second' });

const logs = await puter.kv.list('log:*');
// ["log:2025-01-01T00:00:00Z",
//  "log:2025-02-14T08:00:00Z",
//  "log:2025-03-15T10:00:00Z"]
```

**Numbers need zero-padding** , otherwise `item:10` sorts before `item:2`:

```js
// Wrong, will sort as 1, 10, 100, 2, 20
await puter.kv.set('item:1', '...');
await puter.kv.set('item:10', '...');
await puter.kv.set('item:2', '...');

// Correct, zero-pad to a fixed width
await puter.kv.set('item:001', '...');
await puter.kv.set('item:002', '...');
await puter.kv.set('item:010', '...');
await puter.kv.set('item:100', '...');

const items = await puter.kv.list('item:*');
// ["item:001", "item:002", "item:010", "item:100"]

// Helper function
const padId = (n, width = 5) => String(n).padStart(width, '0');
// padId(42) â "00042"
```

## TTL and Data Lifecycle

### Auto-Expiring Keys

Some data has a natural lifetime, like sessions, caches, rate limit windows, and temporary tokens. Puter KV has built-in TTL support:

```js
// Session that expires in 1 hour
await puter.kv.set('session:abc123', {
  userId: 42,
  createdAt: Date.now()
});
await puter.kv.expire('session:abc123', 3600); // seconds

// Or set a specific expiration timestamp
await puter.kv.set('invite:xyz', { email: 'bob@test.com' });
await puter.kv.expireAt('invite:xyz',
  Math.floor(Date.now() / 1000) + 86400 // 24h from now
);

// After expiration, get() returns null, no cleanup needed
```

### Flush for Full Reset

`flush()` wipes all keys for the current user in the current app:

```js
await puter.kv.flush();
```

### Soft Delete Pattern

Mark something as deleted without removing it (for undo or audit trails):

```js
// "Delete" a post, really just flag it
await puter.kv.update('user:42:post:001', {
  'deleted': true,
  'deletedAt': new Date().toISOString()
});

// When reading posts, filter in your app code
const allPosts = await puter.kv.list('user:42:post:*', true);
const activePosts = (allPosts.items || allPosts)
  .filter(item => !item.value.deleted);
```

## More Patterns

### Parallel Reads

When you need multiple keys at once, fire them off in parallel:

```js
// Instead of reading one by one (slow)
const user = await puter.kv.get('user:42');
const settings = await puter.kv.get('user:42:settings');
const stats = await puter.kv.get('user:42:stats');

// Read them all at once (fast)
const [user, settings, stats] = await Promise.all([
  puter.kv.get('user:42'),
  puter.kv.get('user:42:settings'),
  puter.kv.get('user:42:stats')
]);
```

### Pre-Computed Aggregates

Instead of scanning keys to count things, maintain a running count:

```js
// When creating a new post, increment the counter
await puter.kv.set('user:42:post:003', { title: 'New post', ... });
await puter.kv.incr('user:42:postcount');

// When deleting a post, decrement it
await puter.kv.del('user:42:post:003');
await puter.kv.decr('user:42:postcount');

// Reading the count is instant, no scanning
const count = await puter.kv.get('user:42:postcount');
```

This works for any aggregate: total revenue, average rating (store sum + count separately), number of active users, etc.

### Range-Like Queries

Since `list()` returns keys in lexicographic order, you can approximate range queries with prefixes. For example, to get all logs from March 2025:

```js
// All your log keys use ISO timestamps
// log:2025-01-15T...
// log:2025-02-20T...
// log:2025-03-01T...
// log:2025-03-15T...
// log:2025-04-10T...

const marchLogs = await puter.kv.list('log:2025-03*');
```

### Version Tracking

Include a version number in your value for optimistic concurrency:

```js
// Read current state
const product = await puter.kv.get('product:42');
// { name: "Widget", stock: 10, version: 3 }

// Before updating, check the version
const current = await puter.kv.get('product:42');
if (current.version !== product.version) {
  // Someone else changed it, handle the conflict
  console.log('Data was modified, please refresh');
  return;
}

// Safe to update
await puter.kv.update('product:42', {
  'stock': product.stock - 1,
  'version': product.version + 1
});
```

## Conclusion

Now you know how to structure your data with Puter.js KV, from basic get/set all the way to pre-computed aggregates and version tracking.

For the full API reference, check the [Puter.js KV documentation](https://docs.puter.com/KV). For a shorter tour of the same API framed as a database-hosting alternative, see [Free, Unlimited Database Hosting](/tutorials/free-unlimited-database-hosting/). Puter.js also offers other features like [AI](/ai/), [cloud storage](/object-storage/), [networking](/networking/), [serverless workers](/serverless-workers/), and more that you can combine with KV to build full apps.

## Related

- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
- [Serverless Functions on Puter](/tutorials/serverless-functions-on-puter/)
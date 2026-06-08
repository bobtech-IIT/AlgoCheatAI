# How to Run Serverless Functions on Puter

Source: https://developer.puter.com/tutorials/serverless-functions-on-puter/

[Tutorials](/tutorials/)

# How to Run Serverless Functions on Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: December 24, 2025
                                    

On this page[Getting Started With Workers](#getting-started-with-workers)[Deploying Your Worker](#deploying-your-worker)[Tailoring Workers to Your Needs](#tailoring-workers-to-your-needs)[HTTP Methods](#http-methods)[Dynamic URL Parameters](#dynamic-url-parameters)[Handler Parameters](#handler-parameters)[Response Types](#response-types)[Integrating with Puter.js](#integrating-with-puterjs)[Conclusion](#conclusion)[Related](#related)

[Serverless Workers](/serverless-workers/) let you run backend code without provisioning or managing servers. You can deploy JavaScript functions that respond to HTTP requests, access databases, interact with AI, and moreâall without any infrastructure setup.

In this tutorial, you'll learn how to write, deploy, and use Workers to run serverless JavaScript code for building API endpoints, processing data, and integrating with Puter's cloud services.

## Getting Started With Workers

Serverless Workers use a simple, [router-based API](https://docs.puter.com/Workers/router/). If you've worked with backend frameworks like Express.js or Flask, you'll feel right at home:

```js
router.post("/api/hello", async ({ request, user, params }) => {
  return { message: "Hello, World!" };
});
```

This creates a POST endpoint at `/api/hello` that returns a JSON response.

## Deploying Your Worker

Deploying a Worker takes just seconds:

1. In [Puter.com](https://puter.com/), create a `.js` file containing the worker code

![Puter Serverless Workers Code](/assets/img/workers/code.webp)

1. Right-click the file and select  **"Publish as Worker"**

![Publish Puter Serverless Workers](/assets/img/workers/publish-workers.webp)

1. Choose your Worker URL and click Publish

![Choosing Worker URL](/assets/img/workers/subdomain.webp)

That's it! Your serverless worker is now live and ready to handle requests.

![Published Serverless Workers](/assets/img/workers/published.webp)

## Tailoring Workers to Your Needs

### HTTP Methods

Workers support all standard HTTP methods you'd use in an API:

```js
router.get(path, handler)     // Handle GET requests
router.post(path, handler)    // Handle POST requests
router.put(path, handler)     // Handle PUT requests
router.delete(path, handler)  // Handle DELETE requests
router.options(path, handler) // Handle OPTIONS requests
```

### Dynamic URL Parameters

You can capture dynamic segments in your routes using `:paramName`:

```js
router.get("/api/users/:id", async ({ params }) => {
  const userId = params.id;
  return { userId };
});

router.get("/api/posts/:category/:slug", async ({ params }) => {
  const { category, slug } = params;
  return { category, slug };
});
```

### Handler Parameters

Route handlers receive an object with useful properties:

- `request` - The incoming [HTTP Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object
- `params` - URL parameters from dynamic route segments
- `user` - The calling user's context (available when called via `puter.workers.exec()`)
- `me` - The deployer's (your) Puter context

### Response Types

Workers can return various response types depending on your needs:

```js
// JSON (automatically serialized)
router.get("/api/data", async () => {
  return { status: "ok", count: 42 };
});

// Plain text
router.get("/api/text", async () => {
  return "Hello, World!";
});

// Custom Response with headers and status codes
router.get("/api/custom", async () => {
  return new Response(JSON.stringify({ data: "custom" }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
      "X-Custom-Header": "value"
    }
  });
});
```

## Integrating with Puter.js

Just like in frontend apps, you can use Puter.js in Workers to access AI, cloud storage, key-value stores, and databases. The key difference is  *whose*  resources you're using:

- **`me.puter`**  (Worker context) - Your own Puter resources as the developer. Use this for shared application data, server-side logic, and centralized storage that you control.
- **`user.puter`**  (User context) - The calling user's Puter resources. This maintains the [User-Pays model](https://docs.puter.com/user-pays-model/) while executing logic server-side.

This flexibility lets you choose which parts of your app use centralized resources versus user-specific resources:

```js
router.post("/api/chat", async ({ request, user }) => {
  const { message } = await request.json();

  // Use the user's AI quota (they pay for their usage)
  const response = await user.puter.ai.chat(message);

  // Store analytics in your own database
  await me.puter.kv.set(`chat_${Date.now()}`, {
    timestamp: new Date().toISOString(),
    messageLength: message.length
  });

  return { response };
});
```

## Conclusion

[Serverless Workers](/serverless-workers/) let you run backend code without managing infrastructure. With a familiar router-based API and seamless Puter.js integration, you can build powerful APIs in just minutes.

Find more details about workers in our [Serverless Workers documentation](https://docs.puter.com/Workers/).

## Related

- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
- [How to Host a Website for Free](/tutorials/host-website-for-free/)
- [Cloud Key-Value Store](/tutorials/add-a-cloud-key-value-store-to-your-app-a-free-alternative-to-dynamodb/)
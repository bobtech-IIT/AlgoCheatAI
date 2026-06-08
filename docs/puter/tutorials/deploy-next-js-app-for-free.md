# Deploy Your Next.js Application With Puter

Source: https://developer.puter.com/tutorials/deploy-next-js-app-for-free/

[Tutorials](/tutorials/)

# Deploy Your Next.js Application With Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: November 28, 2025
                                    

On this page[Deploying your Next.js App](#deploying-your-nextjs-app)[Step 1: Prepare Your App](#step-1-prepare-your-app)[Step 2: Upload Your App to Puter](#step-2-upload-your-app-to-puter)[Step 3: Publish Your Next.js App](#step-3-publish-your-nextjs-app)[Free Next.js Hosting with Puter](#free-nextjs-hosting-with-puter)[Related](#related)

In this guide, you'll learn how to use [Puter](https://puter.com/) to deploy your static Next.js app for free. Puter is a cloud operating system, with hosting, cloud storage, and much more built in, allowing you to easily deploy your Next.js app.

## Deploying your Next.js App

### Step 1: Prepare Your App

For static Next.js apps, you need to configure your app to output a static export. Open your `next.config.js` (or `next.config.mjs`) file and set the output to `export`:

```js
const nextConfig = {
  output: 'export',
};

module.exports = nextConfig;
```

Then, run the build command to generate your static files:

```javascript
npm run build
```

After the build completes, your static files will be in the `out` folder. This is the folder you'll upload to Puter.

![Next.js static output folder](/assets/img/nextjs/output.webp)

### Step 2: Upload Your App to Puter

1. Go to [Puter.com](https://puter.com)
2. Drag the `out` folder from your local machine into Puter cloud desktop

![Uploaded files](/assets/img/nextjs/drag.webp)

1. Open to folder to verify that your Next.js app is uploaded

![Uploaded files](/assets/img/nextjs/uploaded.webp)

### Step 3: Publish Your Next.js App

1. In the same folder, right-click and select  **Publish as Website**

![Context Menu: Publish as Website](/assets/img/nextjs/publish-website.webp)

1. Choose your free subdomain (e.g., `yoursite.puter.site`) and click  **Publish**

![Choose free subdomain](/assets/img/free-hosting/subdomain.webp)

1. Congratulations, you have successfully published your Next.js app!

![Publish website](/assets/img/free-hosting/published.webp)

## Free Next.js Hosting with Puter

[With Puter, you can easily host your Next.js project](/static-hosting/) â simply upload your website files and publish. You don't need any complex configuration, servers, or credit cards. Your website is instantly accessible on the internet, and updating it is as simple as replacing your files. No dashboards to navigate, no technical setup required â just straightforward file management.

Beyond hosting, Puter makes it easy to add powerful features to your app. With [Puter.js](https://docs.puter.com), you can integrate databases, [AI capabilities](/ai/), [cloud storage](/object-storage/), and more â all without managing backend infrastructure.

## Related

- [How to Host a Website for Free](/tutorials/host-website-for-free/)
- [Deploy Your React App With Puter](/tutorials/deploy-react-app-for-free/)
- [Deploy Your Astro Site With Puter](/tutorials/deploy-astro-site-for-free/)
- [Deploy Your Angular App With Puter](/tutorials/deploy-angular-app-for-free/)
- [Deploy Your Flutter Web App With Puter](/tutorials/deploy-flutter-web-for-free/)
- [Deploy Your Nuxt Application With Puter](/tutorials/deploy-nuxt-app-for-free/)
- [Deploy Your Vue.js App With Puter](/tutorials/deploy-vue-js-app-for-free/)
- [Deploy Your SvelteKit App With Puter](/tutorials/deploy-svelte-kit-app-for-free/)
- [Deploy Your React Router (formerly Remix) App With Puter](/tutorials/deploy-react-router-app-for-free/)
- [Free, Unlimited Website Hosting API](/tutorials/free-unlimited-hosting-api/)
- [Top 5 Netlify Alternatives (2026)](/blog/netlify-alternatives/)
- [Best Vercel Alternatives (2026)](/blog/vercel-alternatives/)
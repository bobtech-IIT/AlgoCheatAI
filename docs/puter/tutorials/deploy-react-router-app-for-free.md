# Deploy Your React Router (formerly Remix) App With Puter

Source: https://developer.puter.com/tutorials/deploy-react-router-app-for-free/

[Tutorials](/tutorials/)

# Deploy Your React Router (formerly Remix) App With Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: December 9, 2025
                                    

On this page[Deploying your React Router App](#deploying-your-react-router-app)[Step 1: Prepare Your Site](#step-1-prepare-your-site)[Step 2: Upload Your Site to Puter](#step-2-upload-your-site-to-puter)[Step 3: Publish Your React Router App](#step-3-publish-your-react-router-app)[Free React Router (formerly Remix) Hosting with Puter](#free-react-router-formerly-remix-hosting-with-puter)[Related](#related)

In this guide, you'll learn how to use [Puter](https://puter.com/) to deploy your static React Router app for free. Puter is a cloud operating system in your browser with a web hosting feature allowing you to [host your website](/static-hosting/) easily.

## Deploying your React Router App

### Step 1: Prepare Your Site

First, make sure your React Router app is configured for static output by setting `ssr` to `false` in your `react-router.config.ts` file:

```javascript
import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
} satisfies Config;
```

Then, inside your React Router project folder, run the build command to generate your website files:

```javascript
npm run build
```

After the build completes, your website files will be in the `build/client` folder. This `client` folder is what you'll upload to Puter.

![React Router static output folder](/assets/img/remix/output.webp)

### Step 2: Upload Your Site to Puter

1. Go to [Puter.com](https://puter.com)
2. Drag the `client` folder from your local machine into the Puter cloud desktop

![Uploaded files](/assets/img/remix/drag.webp)

1. Open the folder to verify that your React Router app is uploaded

![Uploaded files](/assets/img/remix/uploaded.webp)

### Step 3: Publish Your React Router App

1. In the same folder, right-click and select  **Publish as Website**

![Context Menu: Publish as Website](/assets/img/remix/publish-website.webp)

1. Choose your free subdomain (e.g., `yoursite.puter.site`) and click  **Publish**

![Choose free subdomain](/assets/img/remix/subdomain.webp)

1. Congratulations, you have successfully published your React Router app!

![Publish website](/assets/img/remix/published.webp)

## Free React Router (formerly Remix) Hosting with Puter

Puter lets you host your React Router app at no cost. Just upload your build folder, publish it, and your site goes live instantly with a free subdomain.

Updating your app is just as simpleâreplace the files and you're set. No CI/CD setup or complicated deployment workflows required.

Looking to do more? Puter.js gives you access to [cloud storage](/object-storage/), databases, and [AI features](/ai/) without needing to manage any backend.

Check out the [Puter.js documentation](https://docs.puter.com) to learn more.

## Related

- [How to Host a Website for Free](/tutorials/host-website-for-free/)
- [Deploy your Next.js Application with Puter](/tutorials/deploy-next-js-app-for-free/)
- [Deploy your Angular App with Puter](/tutorials/deploy-angular-app-for-free/)
- [Deploy your Astro Site with Puter](/tutorials/deploy-astro-site-for-free/)
- [Deploy your Flutter Web App with Puter](/tutorials/deploy-flutter-web-for-free/)
- [Deploy Your Vue.js App With Puter](/tutorials/deploy-vue-js-app-for-free/)
- [Deploy your Nuxt Application with Puter](/tutorials/deploy-nuxt-app-for-free/)
- [Free, Unlimited Website Hosting API](/tutorials/free-unlimited-hosting-api/)
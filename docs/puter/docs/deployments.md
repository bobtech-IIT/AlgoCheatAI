# Deployments

Source: https://docs.puter.com/deployments/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# Deployments

---

Once you've integrated Puter.js into your app, the next step is getting it online.

Puter.js is a regular JavaScript library, so your app deploys like any other website. You can ship it to any hosting platform you already use, or host it directly on [Puter](https://puter.com).

## Deploy anywhere

Because Puter.js runs entirely in the browser, there's no special backend to provision. Build your app as you normally would and serve the output from any static or web hosting provider, such as [Vercel](https://vercel.com), [Cloudflare Pages](https://pages.cloudflare.com), [Netlify](https://www.netlify.com), or [GitHub Pages](https://pages.github.com).

Your app should be served by a web server, like any of the hosting providers above.

No extra configuration is required. Your app keeps talking to Puter's services from the browser, wherever it's hosted.

## Deploy to Puter

Puter can also host your website for you, on a free `*.puter.site` subdomain.

### Publish from puter.com

The quickest way to publish a website is to upload it on [puter.com](https://puter.com) and publish it.

1. Right-click on the desktop and create a new folder for your website's files.
        
![Image](https://developer.puter.com/assets/img/free-hosting/create-directory.webp)
2. Open the folder, right-click inside it, and choose  **Upload Here**  to upload your website's files (your `index.html` and any other assets).
        
![Image](https://developer.puter.com/assets/img/free-hosting/upload-here.webp)
3. Right-click the folder and choose  **Publish as Website** .
        
![Image](https://developer.puter.com/assets/img/free-hosting/publish-website.webp)
4. Pick a subdomain and click  **Publish** . Your site goes live instantly at `https://your-subdomain.puter.site`.
        
![Image](https://developer.puter.com/assets/img/free-hosting/published.webp)

 ### Automate with GitHub Actions

If your code lives on GitHub, you can redeploy your site automatically on every push using the [Puter Subdomain Deploy Action](https://github.com/HeyPuter/puter-subdomain-deploy-action).

Add a workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Puter

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy website
        uses: HeyPuter/puter-subdomain-deploy-action@v1
        with:
          subdomain: my-site            # publishes to my-site.puter.site
          source_path: dist             # the folder to deploy (e.g. your build output)
          puter_path: ~/sites/my-site   # where to store the files on Puter
          puter_token: ${{ secrets.PUTER_TOKEN }}
```

<div class="info">Store your Puter auth token as a GitHub Actions secret named <code>PUTER_TOKEN</code>. See the <a href="https://github.com/HeyPuter/puter-subdomain-deploy-action">action's README</a> for how to obtain a token and for the full list of options.</div>

If your project has a build step, run it before the deploy step (for example `npm ci && npm run build`) and point `source_path` at the build output. 
[NEXT

Examples](/./examples/)[PREVIOUS

Framework Integrations](/./frameworks/)
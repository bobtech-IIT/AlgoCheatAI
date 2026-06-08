# Free, Unlimited Website Hosting API

Source: https://developer.puter.com/tutorials/free-unlimited-hosting-api/

[Tutorials](/tutorials/)

# Free, Unlimited Website Hosting API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: September 1, 2025
                                    

On this page[Getting Started](#getting-started)[Example 1: Deploy a simple "Hello World" website](#example-1-deploy-a-simple-hello-world-website)[Example 2: Deploy a multi-page website](#example-2-deploy-a-multi-page-website)[Example 3: Update an existing website](#example-3-update-an-existing-website)[Example 4: List all your hosted websites](#example-4-list-all-your-hosted-websites)[Example 5: Delete a hosted website](#example-5-delete-a-hosted-website)[Example 6: Get information about a specific website](#example-6-get-information-about-a-specific-website)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to deploy and host static websites, for free, directly from your frontend code. Puter.js allows you to create, update, and manage hosted websites directly from your frontend code with just a few lines of JavaScript.

Whether you're building a website builder, vibe-coding platform, an online IDE, or any platform where users need to deploy their own sites, Puter.js eliminates the traditional complexities of web hosting. With Puter.js, you can deploy websites directly from your frontend JavaScriptâno backend infrastructure, no API keys, and no hosting configuration required.

## Getting Started

To start using Puter.js for hosting, include the following script tag in your HTML file:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's all you need to start deploying websites with Puter.js - no API keys, server configuration, or hosting accounts required.

## Example 1: Deploy a simple "Hello World" website

Let's start with the simplest possible example - deploying a basic HTML page. You can use the [`puter.fs.write()`](https://docs.puter.com/FS/write/) function to write the HTML file, and the [`puter.hosting.create()`](https://docs.puter.com/Hosting/create/) function to deploy the website.

```javascript
// Create a directory to write the HTML file
await puter.fs.mkdir('my-website');

// Write an index.html file
await puter.fs.write('my-website/index.html', '<h1>Hello World!</h1>');

// Deploy the website
const site = await puter.hosting.create('hello-world', 'my-website');

console.log(`Website deployed at: https://${site.subdomain}.puter.site`);
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create a directory for your website
            const dirName = puter.randName();
            await puter.fs.mkdir(dirName);
            
            // Write an index.html file
            await puter.fs.write(`${dirName}/index.html`, '<h1>Hello World!</h1>');
            
            // Deploy the website with a random subdomain
            const subdomain = puter.randName();
            const site = await puter.hosting.create(subdomain, dirName);
            
            puter.print(`Website deployed at: <a href="https://${site.subdomain}.puter.site" target="_blank">https://${site.subdomain}.puter.site</a>`);
        })();
    </script>
</body>
</html>
```

## Example 2: Deploy a multi-page website

You can deploy complete websites with multiple pages, CSS, and JavaScript:

```html
<!DOCTYPE html>
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const dirName = puter.randName();
            await puter.fs.mkdir(dirName);
            
            // Create index.html
            await puter.fs.write(`${dirName}/index.html`, `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>My Portfolio</title>
```

Show 75 more lines...

```html
<!DOCTYPE html>
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const dirName = puter.randName();
            await puter.fs.mkdir(dirName);
            
            // Create index.html
            await puter.fs.write(`${dirName}/index.html`, `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>My Portfolio</title>
                    <link rel="stylesheet" href="style.css">
                </head>
                <body>
                    <h1>Welcome to My Portfolio</h1>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/about.html">About</a>
                        <a href="/contact.html">Contact</a>
                    </nav>
                    <p>This is my personal website hosted on Puter!</p>
                    <${'script'} src="app.js"></${'script'}>
                </body>
                </html>
            `);
            
            // Create style.css
            await puter.fs.write(`${dirName}/style.css`, `
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1 {
                    color: #333;
                }
                nav {
                    background: #f0f0f0;
                    padding: 10px;
                    margin: 20px 0;
                }
                nav a {
                    margin: 0 10px;
                    text-decoration: none;
                    color: #007bff;
                }
            `);
            
            // Create app.js
            await puter.fs.write(`${dirName}/app.js`, `
                console.log('Website loaded successfully!');
                document.querySelector('h1').addEventListener('click', () => {
                    alert('Welcome to my Puter-hosted website!');
                });
            `);
            
            // Create about.html
            await puter.fs.write(`${dirName}/about.html`, `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>About Me</title>
                    <link rel="stylesheet" href="style.css">
                </head>
                <body>
                    <h1>About Me</h1>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/about.html">About</a>
                        <a href="/contact.html">Contact</a>
                    </nav>
                    <p>I'm a developer who loves building cool things!</p>
                </body>
                </html>
            `);
            
            // Deploy the website
            const subdomain = puter.randName();
            const site = await puter.hosting.create(subdomain, dirName);
            
            puter.print(`Multi-page website deployed at: <a href="https://${site.subdomain}.puter.site" target="_blank">https://${site.subdomain}.puter.site</a>`);
        })();
    </script>
</body>
</html>
```

Collapse code

## Example 3: Update an existing website

You can update the content of a deployed website by pointing it to a new directory using the [`puter.hosting.update()`](https://docs.puter.com/Hosting/update/) function:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create and deploy initial version
            const v1Dir = puter.randName();
            await puter.fs.mkdir(v1Dir);
            await puter.fs.write(`${v1Dir}/index.html`, '<h1>Version 1</h1>');
            
            const subdomain = puter.randName();
            const site = await puter.hosting.create(subdomain, v1Dir);
            puter.print(`Initial version deployed at: <a href="https://${site.subdomain}.puter.site" target="_blank">https://${site.subdomain}.puter.site</a><br>`);
            
            // Create updated version
            const v2Dir = puter.randName();
            await puter.fs.mkdir(v2Dir);
            await puter.fs.write(`${v2Dir}/index.html`, `
                <h1>Version 2 - Updated!</h1>
                <p>This website has been updated with new content.</p>
                <p style="color: green;">Last updated: ${new Date().toLocaleString()}</p>
            `);
            
            // Update the website to point to the new directory
            await puter.hosting.update(subdomain, v2Dir);
            puter.print('Website updated! Refresh the page to see the new version.');
        })();
    </script>
</body>
</html>
```

## Example 4: List all your hosted websites

You can retrieve a list of all websites hosted under your account using the [`puter.hosting.list()`](https://docs.puter.com/Hosting/list/) function:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create a few test websites
            for (let i = 1; i <= 3; i++) {
                const dir = puter.randName();
                await puter.fs.mkdir(dir);
                await puter.fs.write(`${dir}/index.html`, `<h1>Test Site ${i}</h1>`);
                
                const subdomain = puter.randName();
                await puter.hosting.create(subdomain, dir);
                puter.print(`Created test site ${i}: ${subdomain}.puter.site<br>`);
            }
            
            // List all hosted websites
            const sites = await puter.hosting.list();
            
            puter.print('<br><h3>All Hosted Websites:</h3>');
            sites.forEach(site => {
                puter.print(`â¢ <a href="https://${site.subdomain}.puter.site" target="_blank">${site.subdomain}.puter.site</a><br>`);
            });
        })();
    </script>
</body>
</html>
```

## Example 5: Delete a hosted website

If you need to delete a website, you can use the [`puter.hosting.delete()`](https://docs.puter.com/Hosting/delete/) function:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create a test website
            const dir = puter.randName();
            await puter.fs.mkdir(dir);
            await puter.fs.write(`${dir}/index.html`, '<h1>Temporary Website</h1>');
            
            const subdomain = puter.randName();
            const site = await puter.hosting.create(subdomain, dir);
            puter.print(`Website created at: <a href="https://${site.subdomain}.puter.site" target="_blank">https://${site.subdomain}.puter.site</a><br>`);
            
            // Delete the website after 5 seconds
            puter.print('Website will be deleted in 5 seconds...<br>');
            
            setTimeout(async () => {
                await puter.hosting.delete(subdomain);
                puter.print('Website deleted successfully! The link above will no longer work.');
            }, 5000);
        })();
    </script>
</body>
</html>
```

## Example 6: Get information about a specific website

To retrieve information about a specific website, you can use the [`puter.hosting.get()`](https://docs.puter.com/Hosting/get/) function:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create a website
            const dir = puter.randName();
            await puter.fs.mkdir(dir);
            await puter.fs.write(`${dir}/index.html`, '<h1>Info Demo Site</h1>');
            
            const subdomain = puter.randName();
            await puter.hosting.create(subdomain, dir);
            
            // Get information about the website
            const siteInfo = await puter.hosting.get(subdomain);
            
            puter.print('<h3>Website Information:</h3>');
            puter.print(`Subdomain: ${siteInfo.subdomain}<br>`);
            puter.print(`Full URL: https://${siteInfo.subdomain}.puter.site<br>`);
            puter.print(`Root Directory: ${siteInfo.root_dir.path}<br>`);
            puter.print(`Directory Name: ${siteInfo.root_dir.name}<br>`);
            puter.print(`UID: ${siteInfo.uid}<br>`);
        })();
    </script>
</body>
</html>
```

---

If you've ever built a platform where users need to host websitesâlike a website builder or online IDEâyou know the complexity of managing hosting infrastructure, deployment pipelines, and scaling costs. Puter.js eliminates all of this: users can deploy full websites directly from frontend JavaScript, with each user's sites hosted through their own Puter account, meaning you never worry about hosting costs or server management whether you have 10 users or 10 million.

## Related

- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
- [How to Host a Website for Free](/tutorials/host-website-for-free/)
- [Deploy your Next.js Application with Puter](/tutorials/deploy-next-js-app-for-free/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Cloud Storage API](/tutorials/free-unlimited-cloud-storage-api/)
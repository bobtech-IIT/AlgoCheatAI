# Hosting

Source: https://docs.puter.com/Hosting/

Copy page

Markdown
View as Markdown

OpenAI
Open in ChatGPT

Anthropic
Open in Claude

# ![Image](/./assets/img/hosting.svg)Hosting

---

The Puter.js Hosting API enables you to host files on the internet and manage your hosting programmatically.

The API provides comprehensive hosting management features including creating, retrieving, listing, updating, and deleting hostings. It is mainly used to expose files to the internet, where users can get their content from a public URL and additionally with these capabilities, you can host many applications, such as website builders, static site generators, or deployment tools that require programmatic control over hosting infrastructure.

## Features

Create Hosting
List Hosting
Delete Hosting
Update Hosting
Get Information

#### Create a simple website displaying "Hello world!"

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random directory
            let dirName = puter.randName();
            await puter.fs.mkdir(dirName)

            // (2) Create 'index.html' in the directory with the contents "Hello, world!"
            await puter.fs.write(`${dirName}/index.html`, '<h1>Hello, world!</h1>');

            // (3) Host the directory under a random subdomain
            let subdomain = puter.randName();
            const site = await puter.hosting.create(subdomain, dirName)

            puter.print(`Website hosted at: <a href="https://${site.subdomain}.puter.site" target="_blank">https://${site.subdomain}.puter.site</a>`);
        })();
    </script>
</body>
</html>
```

#### Create 3 random websites and then list them

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Generate 3 random subdomains
            let site_1 = puter.randName();
            let site_2 = puter.randName();
            let site_3 = puter.randName();

            // (2) Create 3 empty websites with the subdomains we generated
            await puter.hosting.create(site_1);
            await puter.hosting.create(site_2);
            await puter.hosting.create(site_3);

            // (3) Get all subdomains
            let sites = await puter.hosting.list();

            // (4) Display the names of the websites
            puter.print(sites.map(site => site.subdomain));

            // Delete all sites (cleanup)
            await puter.hosting.delete(site_1);
            await puter.hosting.delete(site_2);
            await puter.hosting.delete(site_3);
        })();
    </script>
</body>
</html>
```

#### Create a random website then delete it

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random website
            let subdomain = puter.randName();
            const site = await puter.hosting.create(subdomain)
            puter.print(`Website hosted at: ${site.subdomain}.puter.site (This is an empty website with no files)<br>`);

            // (2) Delete the website using delete()
            const site2 = await puter.hosting.delete(site.subdomain);
            puter.print('Website deleted<br>');

            // (3) Try to retrieve the website (should fail)
            puter.print('Trying to retrieve website... (should fail)<br>');
            try {
                await puter.hosting.get(site.subdomain);
            } catch (e) {
                puter.print('Website could not be retrieved<br>');
            }
        })();
    </script>
</body>
</html>
```

#### Update a subdomain to point to a new directory

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random website
            let subdomain = puter.randName();
            const site = await puter.hosting.create(subdomain)
            puter.print(`Website hosted at: ${site.subdomain}.puter.site<br>`);

            // (2) Create a random directory
            let dirName = puter.randName();
            let dir = await puter.fs.mkdir(dirName)
            puter.print(`Created directory "${dir.path}"<br>`);

            // (3) Update the site with the new random directory
            await puter.hosting.update(subdomain, dirName)
            puter.print(`Changed subdomain's root directory to "${dir.path}"<br>`);

            // (4) Delete the app (cleanup)
            await puter.hosting.delete(updatedSite.subdomain)
        })();
    </script>
</body>
</html>
```

#### Get a subdomain

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random website
            let subdomain = puter.randName();
            const site = await puter.hosting.create(subdomain)
            puter.print(`Website hosted at: ${site.subdomain}.puter.site (This is an empty website with no files)<br>`);

            // (2) Retrieve the website using get()
            const site2 = await puter.hosting.get(site.subdomain);
            puter.print(`Website retrieved: subdomain=${site2.subdomain}.puter.site UID=${site2.uid}<br>`);

            // (3) Delete the website (cleanup)
            await puter.hosting.delete(subdomain);
        })();
    </script>
</body>
</html>
```

## Functions

These hosting features are supported out of the box when using Puter.js:

- **[`puter.hosting.create()`](/Hosting/create/)**  - Create a new hosting deployment
- **[`puter.hosting.list()`](/Hosting/list/)**  - List all hosting deployments
- **[`puter.hosting.delete()`](/Hosting/delete/)**  - Delete a hosting deployment
- **[`puter.hosting.update()`](/Hosting/update/)**  - Update hosting settings
- **[`puter.hosting.get()`](/Hosting/get/)**  - Get information about a specific deployment

## Examples

You can see various Puter.js hosting features in action from the following examples:

- [Create a simple website displaying "Hello world!"](/playground/hosting-create/)
- [Create 3 random websites and then list them](/playground/hosting-list/)
- [Create a random website then delete it](/playground/hosting-delete/)
- [Update a subdomain to point to a new directory](/playground/hosting-update/)
- [Retrieve information about a subdomain](/playground/hosting-get/)

[NEXT

`create()`](/./Hosting/create/)[PREVIOUS

`exec()`](/./Workers/exec/)
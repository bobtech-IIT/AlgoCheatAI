# Free, Unlimited Object Storage

Source: https://developer.puter.com/tutorials/free-unlimited-object-storage/

[Tutorials](/tutorials/)

# Free, Unlimited Object Storage

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 20, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Write and Read a File](#example-1-write-and-read-a-file)[Example 2: Upload Files from a File Input](#example-2-upload-files-from-a-file-input)[Example 3: Share a File via URL](#example-3-share-a-file-via-url)[Example 4: List a Directory](#example-4-list-a-directory)[Example 5: Inspect a File](#example-5-inspect-a-file)[Example 6: Create Directories](#example-6-create-directories)[Example 7: Copy, Move, and Rename](#example-7-copy-move-and-rename)[Example 8: Delete a File or Directory](#example-8-delete-a-file-or-directory)[Conclusion](#conclusion)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to add [object storage](/object-storage/) to your app for free, without needing any backend infrastructure, buckets, signed URLs, or API keys. Using Puter.js, you can write, read, upload, list, and serve files directly from the browser. Puter.js can serve as a free alternative to Amazon S3, Cloudflare R2, Backblaze B2, Google Cloud Storage, or rolling your own upload server.

Puter is the pioneer of the [User Pays model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate cloud and [AI capabilities](/ai/) into their applications while users cover their own usage costs. Each user gets their own dedicated storage on Puter, so you can scale to as many users as you want without ever touching an infrastructure bill.

Puter.js is also uniquely suited for use by AI coding assistants, agents, and vibe coding platforms like Claude Code, [Codex](/ai/codex/), OpenCode, Replit, Lovable, and Bolt.new. Because it's keyless and serverless, the apps these tools generate can store and serve files end-to-end with no third-party backend to sign up for, no bucket to provision, and no API keys to paste in. This removes both a major class of security issues and the setup friction that usually keeps generated apps from running out of the box.

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

That's it! You're now ready to use object storage in your website. No API keys, no sign up, no server.

## Example 1: Write and Read a File

Let's start with the simplest case â writing a file to the cloud and reading it back:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Write a file
            await puter.fs.write('hello.txt', 'Hello from the cloud!');

            // Read it back
            const blob = await puter.fs.read('hello.txt');
            const text = await blob.text();

            puter.print(`File content: ${text}`);
        })();
    </script>
</body>
</html>
```

[`puter.fs.write()`](https://docs.puter.com/FS/write/) accepts a string, a `File`, or a `Blob`, so the same call handles plain text and binary content. [`puter.fs.read()`](https://docs.puter.com/FS/read/) always returns a `Blob`, which you can convert to text, an `ArrayBuffer`, or an object URL depending on what you need.

## Example 2: Upload Files from a File Input

Wire `puter.fs.write()` to a file input's `change` event to let users upload a file from their device:

```html
<html>
<body>
    <input type="file" id="file-input" />
    <div id="result"></div>

    <script src="https://js.puter.com/v2/"></script>
    <script>
        document.getElementById('file-input').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                const saved = await puter.fs.write(file.name, file);
                document.getElementById('result').innerHTML =
                    `Uploaded to: ${saved.path}`;
            }
        });
    </script>
</body>
</html>
```

## Example 3: Share a File via URL

What turns a file system into object storage is the ability to serve files at a URL. [`puter.fs.getReadURL()`](https://docs.puter.com/FS/getReadURL/) returns a readable URL for any file in the user's storage that you can drop straight into an `<img>`, `<video>`, or `<a href>`:

```html
<html>
<body>
    <input type="file" accept="image/*" id="image-input" />
    <img id="preview" style="max-width: 400px" />

    <script src="https://js.puter.com/v2/"></script>
    <script>
        document.getElementById('image-input').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                // Save image to cloud
                await puter.fs.write(file.name, file);

                // Get a public URL and use it directly
                const url = await puter.fs.getReadURL(file.name);
                document.getElementById('preview').src = url;
            }
        });
    </script>
</body>
</html>
```

The URL is valid for 24 hours by default. Pass an expiration in milliseconds for a different window â for example, `60 * 60 * 1000` for one hour or `7 * 24 * 60 * 60 * 1000` for a week.

## Example 4: List a Directory

[`puter.fs.readdir()`](https://docs.puter.com/FS/readdir/) returns the contents of a directory as an array of `FSItem` objects, each with `name`, `path`, `size`, `is_dir`, `created`, and `modified`:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create a directory and write a couple files into it
            await puter.fs.mkdir('photos');
            await puter.fs.write('photos/sunset.txt', 'a placeholder for sunset.jpg');
            await puter.fs.write('photos/beach.txt', 'a placeholder for beach.jpg');

            // List the directory
            const items = await puter.fs.readdir('photos');

            items.forEach(item => {
                puter.print(`${item.name} ${item.is_dir ? '(dir)' : `(${item.size} bytes)`}<br>`);
            });
        })();
    </script>
</body>
</html>
```

To list the user's root for your app, pass `./` to `readdir()`.

## Example 5: Inspect a File

[`puter.fs.stat()`](https://docs.puter.com/FS/stat/) returns metadata for a single file or directory. It's also the right tool for "does this file exist?" â it rejects if the path doesn't resolve:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create a file
            await puter.fs.write('report.pdf', 'pretend this is a PDF');

            // Get file information
            const info = await puter.fs.stat('report.pdf');

            puter.print(`
                Name: ${info.name}<br>
                Path: ${info.path}<br>
                Size: ${info.size} bytes<br>
                Is Directory: ${info.is_dir}<br>
                Created: ${new Date(info.created * 1000).toLocaleString()}<br>
                Modified: ${new Date(info.modified * 1000).toLocaleString()}
            `);
        })();
    </script>
</body>
</html>
```

Timestamps come back as Unix seconds, so multiply by 1000 before handing them to `Date`.

## Example 6: Create Directories

[`puter.fs.mkdir()`](https://docs.puter.com/FS/mkdir/) creates a directory. Use `createMissingParents` to build a nested path in one call:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create a single directory
            await puter.fs.mkdir('projects');
            puter.print('Created "projects"<br>');

            // Create a nested path in one go
            await puter.fs.mkdir('projects/2026/photos', {
                createMissingParents: true
            });
            puter.print('Created "projects/2026/photos"<br>');

            // Write a file into the nested directory
            await puter.fs.write('projects/2026/photos/note.txt', 'inside the nested folder');
            puter.print('Wrote a file inside it');
        })();
    </script>
</body>
</html>
```

## Example 7: Copy, Move, and Rename

[`copy()`](https://docs.puter.com/FS/copy/), [`move()`](https://docs.puter.com/FS/move/), and [`rename()`](https://docs.puter.com/FS/rename/) all take a source and a destination and return the resulting `FSItem`:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create a file
            await puter.fs.write('original.txt', 'Original content');

            // Duplicate it to a random name
            const copyName = `${puter.randName()}.txt`;
            await puter.fs.copy('original.txt', '.', {newName: copyName});
            puter.print(`Copied to ${copyName}<br>`);

            // Rename the copy in place to another random name
            const renamedName = `${puter.randName()}.txt`;
```

Show 16 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create a file
            await puter.fs.write('original.txt', 'Original content');

            // Duplicate it to a random name
            const copyName = `${puter.randName()}.txt`;
            await puter.fs.copy('original.txt', '.', {newName: copyName});
            puter.print(`Copied to ${copyName}<br>`);

            // Rename the copy in place to another random name
            const renamedName = `${puter.randName()}.txt`;
            await puter.fs.rename(copyName, renamedName);
            puter.print(`Renamed to ${renamedName}<br>`);

            // Move the original to a random name (in a new directory)
            const movedName = `${puter.randName()}.txt`;
            await puter.fs.move('original.txt', `archive/`, {
                createMissingParents: true
            });
            puter.print(`Moved original.txt to archive/`);

            // Cleanup
            await puter.fs.delete('archive/')
        })();
    </script>
</body>
</html>
```

Collapse code

## Example 8: Delete a File or Directory

[`puter.fs.delete()`](https://docs.puter.com/FS/delete/) removes a file or directory. It's recursive by default, so deleting a folder takes everything inside with it:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Set up a directory with files
            await puter.fs.mkdir('temp');
            await puter.fs.write('temp/a.txt', 'one');
            await puter.fs.write('temp/b.txt', 'two');

            // Delete a single file
            await puter.fs.delete('temp/a.txt');
            puter.print('Deleted temp/a.txt<br>');

            // Delete the directory and everything inside
            await puter.fs.delete('temp');
            puter.print('Deleted temp/ and its contents');
        })();
    </script>
</body>
</html>
```

To clear out a directory without removing it, pass `{ descendantsOnly: true }`. To fail rather than silently take a non-empty directory, pass `{ recursive: false }`.

## Conclusion

With Puter.js, you can add object storage to your app for free. With these you can cover the same ground as a full object storage stack â uploads, downloads, hosted URLs, directory layout, metadata, and lifecycle management â without an API key, a server, or a bucket.

And because Puter runs on the User Pays model, your users cover their own storage and egress. You can ship the app to one user or a million, and the cost on your side stays at zero. For the full reference, see the [Puter.js FS documentation](https://docs.puter.com/FS/).

## Related

- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
- [Free, Unlimited Cloud Storage API](/tutorials/free-unlimited-cloud-storage-api/)
- [Add Upload to Your Website for Free](/tutorials/add-upload-to-your-website-for-free/)
- [How to Add File Upload to HTML](/tutorials/how-to-add-file-upload-to-html/)
- [Build a File Sharing App with Puter.js](/tutorials/build-file-sharing-app-with-puter-js/)
- [How to Use Puter.js Key-Value Store API](/tutorials/kv-guide/)
- [Free, Unlimited Database Hosting](/tutorials/free-unlimited-database-hosting/)
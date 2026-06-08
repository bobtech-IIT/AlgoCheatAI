# Free, Unlimited Cloud Storage API

Source: https://developer.puter.com/tutorials/free-unlimited-cloud-storage-api/

[Tutorials](/tutorials/)

# Free, Unlimited Cloud Storage API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: August 30, 2025
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic File Storage](#example-1-basic-file-storage)[Example 2: Upload Files from User Input](#example-2-upload-files-from-user-input)[Example 3: Create and Navigate Directories](#example-3-create-and-navigate-directories)[Example 4: File Management Operations](#example-4-file-management-operations)[Example 5: File Picker Dialog](#example-5-file-picker-dialog)[Example 6: Get File Information](#example-6-get-file-information)[Example 7: Batch Upload Multiple Files](#example-7-batch-upload-multiple-files)[Example 8: Working with Binary Files](#example-8-working-with-binary-files)[Advanced Features](#advanced-features)[Automatic Deduplication](#automatic-deduplication)[Create Missing Parent Directories](#create-missing-parent-directories)[Get A Readable URL](#get-a-readable-url)[Related](#related)

This tutorial will show you how to use [Puter.js](https://developer.puter.com) to access [cloud storage](/object-storage/) capabilities for free, without needing any backend infrastructure or API keys. Using Puter.js, you can easily allow users to upload, download, and manage files in cloud storage directly from their browser. Puter.js can serve as a powerful, free alternative to traditional cloud storage solutions such as Amazon S3, Google Cloud Storage, Dropbox API, or custom server implementations.

Puter is the pioneer of the [User Pays model](https://docs.puter.com/user-pays-model/), which allows developers to incorporate cloud and [AI capabilities](/ai/) into their applications while users cover their own usage costs. This innovative approach eliminates the need for developers to manage API keys and billing, making cloud storage accessible to everyone.

## Getting Started

Puter.js works out of the box without any additional setup or configuration. To start using Puter.js for cloud storage, you only need to include the Puter.js script in your HTML file:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's it! You're now ready to use cloud storage capabilities in your website. No need to set up a server, manage storage infrastructure, or worry about API keys.

## Example 1: Basic File Storage

Let's start with a simple example that writes and reads a file from cloud storage:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Write a file to cloud storage
            await puter.fs.write('hello.txt', 'Hello from the cloud!');
            
            // Read it back
            const blob = await puter.fs.read('hello.txt');

            // Print the content
            const content = await blob.text();
            
            puter.print(`File content: ${content}`);
        })();
    </script>
</body>
</html>
```

## Example 2: Upload Files from User Input

Here's how to let users upload files from their device to cloud storage:

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
                const uploadedFile = await puter.fs.write(file.name, file);
                document.getElementById('result').innerHTML = 
                    `File uploaded! Path: ${uploadedFile.path}`;
            }
        });
    </script>
</body>
</html>
```

## Example 3: Create and Navigate Directories

Puter.js supports full directory operations for organizing files:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create a directory
            await puter.fs.mkdir('my-photos');
            puter.print('Directory created<br>');
            
            // Write a file inside the directory
            await puter.fs.write('my-photos/vacation.txt', 'Beach memories');
            
            // List directory contents
            const items = await puter.fs.readdir('my-photos');
            puter.print(`Files in directory: ${items.map(item => item.name).join(', ')}`);
        })();
    </script>
</body>
</html>
```

## Example 4: File Management Operations

Perform common file operations like copy, move, rename, and delete:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create a file
            await puter.fs.write('original.txt', 'Original content');
            
            // Copy the file
            await puter.fs.copy('original.txt', 'copy.txt');
            puter.print('File copied<br>');
            
            // Rename the copy
            await puter.fs.rename('copy.txt', 'renamed.txt');
            puter.print('File renamed<br>');
            
            // Move the file to a directory
            await puter.fs.mkdir('archive');
            await puter.fs.move('renamed.txt', 'archive/renamed.txt');
            puter.print('File moved<br>');
            
            // Delete the original
            await puter.fs.delete('original.txt');
            puter.print('Original file deleted');
        })();
    </script>
</body>
</html>
```

## Example 5: File Picker Dialog

Use built-in file picker dialogs for a native-like experience:

```html
<html>
<body>
    <button id="open-btn">Open File</button>
    <button id="save-btn">Save File</button>
    <div id="content"></div>
    
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Open file picker
        document.getElementById('open-btn').addEventListener('click', async () => {
            const file = await puter.ui.showOpenFilePicker();
            const blob = await file.read();
            const text = await blob.text();
            document.getElementById('content').innerHTML = `Opened: ${text}`;
        });
        
        // Save file picker
        document.getElementById('save-btn').addEventListener('click', async () => {
            const content = 'Content to save';
            const file = await puter.ui.showSaveFilePicker(content, 'document.txt');
            puter.print(`Saved to: ${file.path}`);
        });
    </script>
</body>
</html>
```

## Example 6: Get File Information

Retrieve detailed information about files and directories:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create a file
            await puter.fs.write('info-test.txt', 'Test content for file info');
            
            // Get file information
            const info = await puter.fs.stat('info-test.txt');
            
            puter.print(`
                Name: ${info.name}<br>
                Size: ${info.size} bytes<br>
                Path: ${info.path}<br>
                Is Directory: ${info.is_dir}<br>
                Created: ${new Date(info.created * 1000).toLocaleString()}<br>
                Modified: ${new Date(info.modified * 1000).toLocaleString()}
            `);
        })();
    </script>
</body>
</html>
```

## Example 7: Batch Upload Multiple Files

Handle multiple file uploads at once:

```html
<html>
<body>
    <input type="file" id="multi-upload" multiple />
    <div id="upload-results"></div>
    
    <script src="https://js.puter.com/v2/"></script>
    <script>
        document.getElementById('multi-upload').addEventListener('change', async (e) => {
            const files = e.target.files;
            const results = document.getElementById('upload-results');
            
            results.innerHTML = 'Uploading...<br>';
            
            // Upload all files
            const uploaded = await puter.fs.upload(files);
            
            results.innerHTML = `Uploaded ${uploaded.length} files:<br>`;
            uploaded.forEach(file => {
                results.innerHTML += `- ${file.name} (${file.size} bytes)<br>`;
            });
        });
    </script>
</body>
</html>
```

## Example 8: Working with Binary Files

Handle images and other binary files:

```html
<html>
<body>
    <input type="file" accept="image/*" id="image-input" />
    <div id="preview"></div>
    
    <script src="https://js.puter.com/v2/"></script>
    <script>
        document.getElementById('image-input').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                // Save image to cloud
                await puter.fs.write(`${file.name}`, file);
                
                // Read it back and display
                const blob = await puter.fs.read(`${file.name}`);
                const url = URL.createObjectURL(blob);
                
                document.getElementById('preview').innerHTML = 
                    `<img src="${url}" style="max-width: 300px;" />`;
            }
        });
    </script>
</body>
</html>
```

## Advanced Features

### Automatic Deduplication

Prevent duplicate files with automatic name deduplication:

```javascript
// If 'document.txt' exists, this creates 'document (1).txt'
puter.fs.write('document.txt', 'Content', { dedupeName: true });
```

### Create Missing Parent Directories

Automatically create parent directories when writing files:

```javascript
// Creates all parent directories if they don't exist
await puter.fs.write('path/to/deep/file.txt', 'Content', { 
    createMissingParents: true 
});
```

### Get A Readable URL

Generate a readable URL for a file to be used in a web page or app:

```javascript
const url = await puter.fs.getReadURL('myfile.pdf');
// Returns a URL that can be used in a web page or app
```

All without any backend infrastructure, storage costs, or API key management!

## Related

- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
- [Free, Unlimited Object Storage](/tutorials/free-unlimited-object-storage/)
- [How to Add File Upload to HTML](/tutorials/how-to-add-file-upload-to-html/)
- [Add Upload to Your Website for Free](/tutorials/add-upload-to-your-website-for-free/)
- [Add a Cloud Key-Value Store to Your App](/tutorials/add-a-cloud-key-value-store-to-your-app-a-free-alternative-to-dynamodb/)
- [Free, Unlimited Database Hosting](/tutorials/free-unlimited-database-hosting/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
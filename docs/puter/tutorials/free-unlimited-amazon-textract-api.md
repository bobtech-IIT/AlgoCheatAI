# Free, Unlimited Amazon Textract API

Source: https://developer.puter.com/tutorials/free-unlimited-amazon-textract-api/

[Tutorials](/tutorials/)

# Free, Unlimited Amazon Textract API

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: May 18, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Amazon Textract](#example-1-basic-amazon-textract)[Example 2: File Upload with Amazon Textract](#example-2-file-upload-with-amazon-textract)[Example 3: Multilingual Document Processing](#example-3-multilingual-document-processing)[Related](#related)

Amazon Textract is a machine learning service that automatically extracts printed text, handwriting, layout elements, and data from any document.

This tutorial shows you how to implement OCR (Optical Character Recognition) using Amazon Textract with [Puter.js](https://developer.puter.com). Best of all, it works with no API keys or backend required!

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own usage cost. Meaning you as a developer don't pay anything for the usage of your users, making your app practically free to run. You can scale to unlimited users and you pay nothing for the cloud services.

This also makes Puter.js a great choice for AI coding assistants, agents, and vibe coding platforms such as [Codex](/ai/codex/), Claude Code, OpenCode, Cursor, Replit, Lovable, and others. Because there are no API keys or backend servers involved, AI-generated apps that rely on Puter.js for document extraction run end-to-end out of the box with no setup friction and no leaked credentials.

## Getting Started

Add Puter.js to your project with a single line:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

That's it - you're ready to start extracting text from images using Amazon Textract.

## Example 1: Basic Amazon Textract

Here's a simple example that extracts text from an image using Amazon Textract:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div style="display: flex; gap: 20px; align-items: flex-start;">
        <div style="flex: 1;">
            <img src="https://assets.puter.site/letter.png" style="max-width: 100%; height: auto;">
        </div>
        <div style="flex: 1;">
            <div id="result" style="white-space: pre-wrap; border: 1px solid #ccc; padding: 10px; min-height: 200px;">Extracting text...</div>
        </div>
    </div>

    <script>
        const resultDiv = document.getElementById('result');
        
        puter.ai.img2txt({
            source: 'https://assets.puter.site/letter.png',
            provider: 'aws-textract'
        }).then(response => {
            resultDiv.textContent = response || 'No text found';
        })
    </script>
</body>
</html>
```

This basic example demonstrates how to use Amazon Textract by simply specifying `provider: 'aws-textract'` in the options. Amazon Textract excels at handling multilingual content and complex document layouts.

## Example 2: File Upload with Amazon Textract

Here's how to handle OCR for uploaded image files using Amazon Textract:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div>
        <h3>Amazon Textract File Upload</h3>
        <input type="file" id="image-input" accept="image/*">
        <button onclick="processImage()">Process with Amazon Textract</button>
        
        <div style="margin-top: 20px;">
            <h4>Preview:</h4>
            <img id="preview" style="max-width: 500px; display: none;">
        </div>
        
        <div style="margin-top: 20px;">
```

Show 48 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div>
        <h3>Amazon Textract File Upload</h3>
        <input type="file" id="image-input" accept="image/*">
        <button onclick="processImage()">Process with Amazon Textract</button>
        
        <div style="margin-top: 20px;">
            <h4>Preview:</h4>
            <img id="preview" style="max-width: 500px; display: none;">
        </div>
        
        <div style="margin-top: 20px;">
            <h4>Extracted Text:</h4>
            <div id="result" style="white-space: pre-wrap;"></div>
        </div>
    </div>

    <script>
        const imageInput = document.getElementById('image-input');
        const preview = document.getElementById('preview');
        const result = document.getElementById('result');

        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                preview.src = URL.createObjectURL(file);
                preview.style.display = 'block';
                result.textContent = '';
            }
        });

        async function processImage() {
            const file = imageInput.files[0];
            if (!file) {
                alert('Please select an image first');
                return;
            }

            result.textContent = 'Processing image with Amazon Textract...';

            try {
                const dataUrl = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });

                const text = await puter.ai.img2txt({
                    source: dataUrl,
                    provider: 'aws-textract'
                });
                
                result.textContent = text || 'No text found in image';
            } catch (error) {
                result.textContent = 'Error: ' + error.message;
            }
        }   
    </script>
</body>
</html>
```

Collapse code

This example shows how to process uploaded files with Amazon Textract.

## Example 3: Multilingual Document Processing

Here's an example that demonstrates Amazon Textract's superior multilingual capabilities:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div>
        <h3>Multilingual OCR with Amazon Textract</h3>
        <p>Upload documents in any language - Amazon Textract handles them all!</p>
        
        <input type="file" id="image-input" accept="image/*,application/pdf">
        <button onclick="processMultilingual()">Process Document</button>
        
        <div style="margin-top: 20px;">
            <h4>Extracted Text:</h4>
            <div id="result" style="white-space: pre-wrap; border: 1px solid #ccc; padding: 15px; border-radius: 5px;"></div>
        </div>
```

Show 50 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div>
        <h3>Multilingual OCR with Amazon Textract</h3>
        <p>Upload documents in any language - Amazon Textract handles them all!</p>
        
        <input type="file" id="image-input" accept="image/*,application/pdf">
        <button onclick="processMultilingual()">Process Document</button>
        
        <div style="margin-top: 20px;">
            <h4>Extracted Text:</h4>
            <div id="result" style="white-space: pre-wrap; border: 1px solid #ccc; padding: 15px; border-radius: 5px;"></div>
        </div>
        
        <div style="margin-top: 20px;">
            <h4>Document Info:</h4>
            <div id="info" style="font-size: 0.9em; color: #666;"></div>
        </div>
    </div>

    <script>
        async function processMultilingual() {
            const file = document.getElementById('image-input').files[0];
            if (!file) {
                alert('Please select an image or PDF first');
                return;
            }

            const result = document.getElementById('result');
            const info = document.getElementById('info');
            
            result.textContent = 'Processing with Amazon Textract (multilingual support)...';
            info.textContent = '';

            try {
                const dataUrl = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });

                const startTime = Date.now();
                const text = await puter.ai.img2txt({
                    source: dataUrl,
                    provider: 'aws-textract'
                });
                const processingTime = Date.now() - startTime;
                
                result.textContent = text || 'No text found in document';
                
                info.innerHTML = `
                    <strong>File:</strong> ${file.name}<br>
                    <strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB<br>
                    <strong>Processing time:</strong> ${(processingTime / 1000).toFixed(2)} seconds<br>
                    <strong>Characters extracted:</strong> ${text.length}
                `;
            } catch (error) {
                result.textContent = 'Error: ' + error.message;
            }
        }
    </script>
</body>
</html>
```

Collapse code

This example showcases Amazon Textract's strength in handling multilingual documents, automatically detecting and extracting text in various languages without any additional configuration.

That's it! No sign-ups, no API keys, no server infrastructure required. Start extracting text from images immediately with one of the most advanced OCR systems available.

## Related

- [How to Perform OCR in JavaScript](/tutorials/how-to-perform-ocr-in-javascript/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
- [Free, Unlimited Mistral OCR API](/tutorials/free-unlimited-mistral-ocr-api/)
- [Best OCR APIs in 2026](/blog/best-ocr-apis/)
- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Speech-to-Text API](/tutorials/free-unlimited-speech-to-text-api/)
- [Free, Unlimited Translation API](/tutorials/free-unlimited-translation-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
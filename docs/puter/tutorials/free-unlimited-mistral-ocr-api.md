# Free, Unlimited Mistral OCR API

Source: https://developer.puter.com/tutorials/free-unlimited-mistral-ocr-api/

[Tutorials](/tutorials/)

# Free, Unlimited Mistral OCR API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 18, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Mistral OCR](#example-1-basic-mistral-ocr)[Example 2: File Upload with Mistral OCR](#example-2-file-upload-with-mistral-ocr)[Example 3: Multilingual Document Processing](#example-3-multilingual-document-processing)[Why Choose Mistral OCR?](#why-choose-mistral-ocr)[Comparison: AWS Textract vs Mistral OCR](#comparison-aws-textract-vs-mistral-ocr)[Related](#related)

Need to extract text from images with advanced multilingual support and document annotations? This tutorial shows you how to implement OCR (Optical Character Recognition) using [Puter.js](https://developer.puter.com) with Mistral's powerful OCR service. Best of all, it's completely free with no usage restrictions - no API keys or backend required!

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to integrate [AI functionality](/ai/) into their applications while each user handles their own usage costs. This model lets developers provide advanced [OCR](/ocr/) capabilities to users at zero cost to the developer, with no API keys or backend setup required.

Puter.js is also a natural fit for AI coding assistants, agents, and vibe coding platforms like [Codex](/ai/codex/), Claude Code, OpenCode, Cursor, Lovable, Bolt.new, and more. Since Puter.js requires no API keys and no backend, AI-generated apps that use it for OCR work immediately with no service to provision, no credentials to manage, and no exposed secrets.

## Getting Started

Add Puter.js to your project with a single line:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

That's it - you're ready to start extracting text from images using Mistral's OCR.

## Example 1: Basic Mistral OCR

Here's a simple example that extracts text from an image using Mistral OCR:

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
            provider: 'mistral'
        }).then(response => {
            resultDiv.textContent = response || 'No text found';
        })
    </script>
</body>
</html>
```

This basic example demonstrates how to use Mistral's OCR by simply specifying `provider: 'mistral'` in the options. Mistral OCR excels at handling multilingual content and complex document layouts.

## Example 2: File Upload with Mistral OCR

Here's how to handle OCR for uploaded image files using Mistral:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div>
        <h3>Mistral OCR File Upload</h3>
        <input type="file" id="image-input" accept="image/*">
        <button onclick="processImage()">Process with Mistral</button>
        
        <div style="margin-top: 20px;">
            <h4>Preview:</h4>
            <img id="preview" style="max-width: 500px; display: none;">
        </div>
        
        <div style="margin-top: 20px;">
```

Show 49 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div>
        <h3>Mistral OCR File Upload</h3>
        <input type="file" id="image-input" accept="image/*">
        <button onclick="processImage()">Process with Mistral</button>
        
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

            result.textContent = 'Processing image with Mistral OCR...';
            
            try {
                const dataUrl = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
                
                const text = await puter.ai.img2txt({
                    source: dataUrl,
                    provider: 'mistral',
                    model: 'mistral-ocr-latest'
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

This example shows how to process uploaded files with Mistral OCR. You can optionally specify the model using the `model` parameter.

## Example 3: Multilingual Document Processing

Here's an example that demonstrates Mistral OCR's superior multilingual capabilities:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div>
        <h3>Multilingual OCR with Mistral</h3>
        <p>Upload documents in any language - Mistral OCR handles them all!</p>
        
        <input type="file" id="image-input" accept="image/*,application/pdf">
        <button onclick="processMultilingual()">Process Document</button>
        
        <div style="margin-top: 20px;">
            <h4>Extracted Text:</h4>
            <div id="result" style="white-space: pre-wrap; border: 1px solid #ccc; padding: 15px; border-radius: 5px;"></div>
        </div>
```

Show 51 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div>
        <h3>Multilingual OCR with Mistral</h3>
        <p>Upload documents in any language - Mistral OCR handles them all!</p>
        
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
            
            result.textContent = 'Processing with Mistral OCR (multilingual support)...';
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
                    provider: 'mistral',
                    model: 'mistral-ocr-latest'
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

This example showcases Mistral's strength in handling multilingual documents, automatically detecting and extracting text in various languages without any additional configuration.

## Why Choose Mistral OCR?

Mistral OCR offers several advantages:

1. **Superior Multilingual Support** : Handles documents in multiple languages automatically
2. **Document Structure Understanding** : Better preservation of formatting and layout
3. **Advanced Annotations** : Optional bounding box data for precise text location
4. **Complex Layout Handling** : Excels at tables, multi-column text, and mixed content
5. **Handwriting Recognition** : Improved accuracy for handwritten text

## Comparison: AWS Textract vs Mistral OCR

| Feature | AWS Textract (default) | Mistral OCR |
| --- | --- | --- |
| Basic text extraction | â | â |
| Multilingual support | Good | Excellent |
| Document annotations | Limited | Rich |
| Bounding boxes | â | â (customizable formats) |
| Handwriting | â | â (improved) |
| Complex layouts | Good | Excellent |

To switch providers, simply specify `provider: 'mistral'` in your options:

```javascript
// AWS Textract (default)
await puter.ai.img2txt(imageUrl);

// Mistral OCR
await puter.ai.img2txt({ source: imageUrl, provider: 'mistral' });
```

That's it! No sign-ups, no API keys, no server infrastructure required. Start extracting text from images immediately with one of the most advanced OCR systems available.

## Related

- [How to Perform OCR in JavaScript](/tutorials/how-to-perform-ocr-in-javascript/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
- [Free, Unlimited Amazon Textract API](/tutorials/free-unlimited-amazon-textract-api/)
- [Best OCR APIs in 2026](/blog/best-ocr-apis/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Speech-to-Text API](/tutorials/free-unlimited-speech-to-text-api/)
- [Free, Unlimited Mistral API](/tutorials/free-unlimited-mistral-api/)
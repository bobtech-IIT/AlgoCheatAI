# Free, Unlimited OCR API

Source: https://developer.puter.com/tutorials/free-unlimited-ocr-api/

[Tutorials](/tutorials/)

# Free, Unlimited OCR API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 18, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic Image to Text](#example-1-basic-image-to-text)[Example 2: File Upload OCR](#example-2-file-upload-ocr)[Example 3: Batch OCR Processing](#example-3-batch-ocr-processing)[Implementation Tips](#implementation-tips)[Related](#related)

Need to extract text from images in your web application? Whether you're building a document scanner, digitizing receipts and business cards, or converting handwritten notes to text, this tutorial shows you how to implement [OCR](/ocr/) (Optical Character Recognition) using [Puter.js](https://developer.puter.com). Best of all, it's completely free with no usage restrictions - no API keys or backend required.

Puter is the pioneer of the ["User-Pays" model](https://docs.puter.com/user-pays-model/), which allows developers to integrate [AI functionality](/ai/) into their applications while each user handles their own usage costs. This model lets developers provide advanced OCR capabilities to users at zero cost to the developer, with no API keys or backend setup required.

Puter.js is also uniquely suited for use by AI coding assistants, agents, and vibe coding platforms like [Codex](/ai/codex/), Claude Code, OpenCode, Cursor, Replit, Bolt.new, and more. Since Puter.js is keyless and serverless, AI-generated apps that use it for text extraction work out of the box with no backend to provision, no credentials to paste in, and no secrets to accidentally expose.

## Getting Started

Add Puter.js to your project with a single line:

```javascript
<script src="https://js.puter.com/v2/"></script>
```

That's it - you're ready to start extracting text from images.

## Example 1: Basic Image to Text

Here's a simple example that extracts text from an image URL:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div>
        <h3>Image to Text Converter</h3>
        <input type="text" id="image-url" placeholder="Enter image URL" 
               value="https://cdn.handwrytten.com/www/2020/02/home-hero-photo2%402x.png">
        <button onclick="extractText()">Extract Text</button>
        <div id="result" style="margin-top: 20px; white-space: pre-wrap;"></div>
    </div>

    <script>
        async function extractText() {
            const imageUrl = document.getElementById('image-url').value;
            const resultDiv = document.getElementById('result');
            
            resultDiv.textContent = 'Processing image...';
            
            try {
                const text = await puter.ai.img2txt(imageUrl);
                resultDiv.textContent = text || 'No text found in image';
            } catch (error) {
                resultDiv.textContent = 'Error: ' + error.message;
            }
        }
    </script>
</body>
</html>
```

This basic example demonstrates how to extract text from an image URL. Simply input the URL of an image containing text, and Puter.js will process it and return any text it finds.

## Example 2: File Upload OCR

Here's how to handle OCR for uploaded image files:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div>
        <h3>OCR File Upload</h3>
        <input type="file" id="image-input" accept="image/*">
        <button onclick="processImage()">Process Image</button>
        
        <div style="margin-top: 20px;">
            <h4>Preview:</h4>
            <img id="preview" style="max-width: 500px; display: none;">
        </div>
        
        <div style="margin-top: 20px;">
```

Show 47 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div>
        <h3>OCR File Upload</h3>
        <input type="file" id="image-input" accept="image/*">
        <button onclick="processImage()">Process Image</button>
        
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
                // Show image preview
                preview.src = URL.createObjectURL(file);
                preview.style.display = 'block';
                result.textContent = ''; // Clear previous result
            }
        });

    async function processImage() {
        const file = imageInput.files[0];
        if (!file) {
            alert('Please select an image first');
            return;
        }

        result.textContent = 'Processing image...';
        
        try {
            // Convert file to data URL
            const dataUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
            
            // Now pass the data URL to img2txt
            const text = await puter.ai.img2txt(dataUrl);
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

This example shows how to handle file uploads for OCR. It includes an image preview feature and processes local image files directly. The OCR function works with File objects just as easily as with URLs.

## Example 3: Batch OCR Processing

Here's an example that processes multiple images and saves the results:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div>
        <h3>Batch OCR Processing</h3>
        <input type="file" id="image-input" accept="image/*" multiple>
        <button onclick="processBatch()">Process All Images</button>
        
        <div id="progress"></div>
        
        <div style="margin-top: 20px;">
            <h4>Results:</h4>
            <div id="results"></div>
        </div>
```

Show 81 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div>
        <h3>Batch OCR Processing</h3>
        <input type="file" id="image-input" accept="image/*" multiple>
        <button onclick="processBatch()">Process All Images</button>
        
        <div id="progress"></div>
        
        <div style="margin-top: 20px;">
            <h4>Results:</h4>
            <div id="results"></div>
        </div>
        
        <button onclick="saveResults()" id="save-button" style="display: none;">
            Save Results
        </button>
    </div>

    <script>
        let processedResults = [];

        // Convert File to data URL
        function fileToDataURL(file) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        }

        async function processBatch() {
            const files = document.getElementById('image-input').files;
            if (files.length === 0) {
                alert('Please select some images first');
                return;
            }

            const progress = document.getElementById('progress');
            const results = document.getElementById('results');
            results.innerHTML = '';
            processedResults = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                progress.textContent = `Processing image ${i + 1} of ${files.length}...`;

                try {
                    // Convert to data URL first
                    const dataUrl = await fileToDataURL(file);
                    const text = await puter.ai.img2txt(dataUrl);
                    
                    // Store result
                    processedResults.push({
                        filename: file.name,
                        text: text,
                        timestamp: new Date().toISOString()
                    });

                    // Display result
                    results.innerHTML += `
                        <div style="margin-bottom: 20px;">
                            <strong>${file.name}</strong>
                            <pre>${text || 'No text found'}</pre>
                        </div>
                    `;
                } catch (error) {
                    results.innerHTML += `
                        <div style="margin-bottom: 20px; color: red;">
                            <strong>${file.name}</strong>: Error - ${error.message}
                        </div>
                    `;
                }
            }

            progress.textContent = 'All images processed!';
            document.getElementById('save-button').style.display = 'block';
        }

        async function saveResults() {
            try {
                const resultsText = processedResults.map(result => 
                    `File: ${result.filename}\nTimestamp: ${result.timestamp}\n\n${result.text}\n\n---\n\n`
                ).join('');

                await puter.fs.write('ocr-results.txt', resultsText);
                alert('Results saved to ocr-results.txt');
            } catch (error) {
                alert('Error saving results: ' + error.message);
            }
        }
    </script>
</body>
</html>
```

Collapse code

This advanced example demonstrates batch processing of multiple images. It includes several useful features:

- Multiple file selection and processing
- Progress tracking
- Organized display of results
- Saving results to a file in your Puter cloud storage
- Error handling for individual files

## Implementation Tips

1. Always validate input images before processing
2. Show progress indicators for longer operations
3. Handle errors gracefully and provide user feedback
4. Consider image size limits and processing time
5. Save or export results for later use
6. Preview images when possible to ensure correct file selection

## Related

- [How to Perform OCR in JavaScript](/tutorials/how-to-perform-ocr-in-javascript/)
- [Best OCR APIs in 2026](/blog/best-ocr-apis/)
- [Free, Unlimited Mistral OCR API](/tutorials/free-unlimited-mistral-ocr-api/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Auth API](/tutorials/free-unlimited-auth-api/)
- [Free, Unlimited Text-to-Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Translation API](/tutorials/free-unlimited-translation-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Cohere API](/tutorials/free-unlimited-cohere-api/)
- [Free, Unlimited Sentiment Analysis API](/tutorials/free-unlimited-sentiment-analysis-api/)
- [Free, Unlimited Speech-to-Text API](/tutorials/free-unlimited-speech-to-text-api/)
- [Free, Unlimited Video Analysis API](/tutorials/free-unlimited-video-analysis-api/)
- [Free, Unlimited Image Recognition API](/tutorials/free-unlimited-image-recognition-api/)
- [Free, Unlimited Reka AI API](/tutorials/free-unlimited-reka-ai-api/)
- [Free, Unlimited Perceptron AI API](/tutorials/free-unlimited-perceptron-ai-api/)
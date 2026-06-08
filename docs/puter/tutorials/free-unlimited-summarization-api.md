# Free, Unlimited Summarization API

Source: https://developer.puter.com/tutorials/free-unlimited-summarization-api/

[Tutorials](/tutorials/)

# Free, Unlimited Summarization API

[Nariman Jelveh](/author/jelveh/)

                                        Updated: May 10, 2026
                                    

On this page[Getting Started](#getting-started)[Example 1: Basic summarization](#example-1-basic-summarization)[Example 2: Interactive summarizer](#example-2-interactive-summarizer)[Example 3: Streaming summarization](#example-3-streaming-summarization)[Example 4: Structured summary with JSON output](#example-4-structured-summary-with-json-output)[Conclusion](#conclusion)[Related](#related)

In this guide, you will learn how to integrate text summarization capabilities into your app for free, without developer accounts or API keys. Instead of traditional summarization APIs, we'll use Large Language Models (LLMs) through [Puter.js](https://developer.puter.com) for high-quality, context-aware summaries. LLMs excel at summarization because they understand structure, importance, and toneâproducing concise summaries that capture the meaning of the source rather than just stitching keywords together.

Puter.js uses the [User-Pays model](https://docs.puter.com/user-pays-model/), where users of your application cover their own AI costs. This means you as a developer don't pay anything for your users' usage, making your app practically free to run. You can scale to unlimited users and pay nothing for the summarization usage.

## Getting Started

Add Puter.js to your project with a single line:

```html
<script src="https://js.puter.com/v2/"></script>
```

That's it, you're ready to start adding summarization to your application.

## Example 1: Basic summarization

You can use the [`puter.ai.chat()`](https://docs.puter.com/AI/chat/) function to access more than 500 large language models for summarization. Here's an example using GPT-5 nano to summarize a passage of text.

```javascript
const text = `NASA's James Webb Space Telescope, launched on December 25, 2021 from Kourou, French Guiana atop an Ariane 5 rocket, is the largest and most powerful space telescope ever deployed. After a six-month commissioning period that included a complex unfolding sequence, a journey to the second Sun-Earth Lagrange point roughly 1.5 million kilometers from Earth, and the careful alignment of its eighteen hexagonal mirror segments, the observatory began full science operations in July 2022. Unlike Hubble, which observes primarily in visible and ultraviolet light, Webb is optimized for infrared, allowing it to peer through dust clouds and look further back in cosmic time. Its 6.5-meter gold-coated primary mirror collects roughly six times more light than Hubble's, and its instruments are sensitive enough to detect the heat signature of a bumblebee at the distance of the Moon. In its first three years, Webb has imaged some of the earliest known galaxiesâformed just a few hundred million years after the Big Bangâmapped the atmospheres of exoplanets including potentially habitable worlds, and revealed unprecedented detail of star-forming regions like the Pillars of Creation. Operating at temperatures below -223Â°C thanks to a tennis-court-sized sunshield, Webb is expected to remain functional for at least twenty years, with enough fuel to maintain its orbit well into the 2040s.`;
const prompt = `Write a 1-2 sentence summary of the text below. Capture only the single most important ideaâdrop dates, statistics, names of places, and supporting examples. Output only the summary, nothing else.\n\nText:\n${text}`;

puter.ai.chat(prompt, { model: "gpt-5-nano" })
.then(summary => {
    console.log(summary);
});
```

Full code example:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const text = `NASA's James Webb Space Telescope, launched on December 25, 2021 from Kourou, French Guiana atop an Ariane 5 rocket, is the largest and most powerful space telescope ever deployed. After a six-month commissioning period that included a complex unfolding sequence, a journey to the second Sun-Earth Lagrange point roughly 1.5 million kilometers from Earth, and the careful alignment of its eighteen hexagonal mirror segments, the observatory began full science operations in July 2022. Unlike Hubble, which observes primarily in visible and ultraviolet light, Webb is optimized for infrared, allowing it to peer through dust clouds and look further back in cosmic time. Its 6.5-meter gold-coated primary mirror collects roughly six times more light than Hubble's, and its instruments are sensitive enough to detect the heat signature of a bumblebee at the distance of the Moon. In its first three years, Webb has imaged some of the earliest known galaxiesâformed just a few hundred million years after the Big Bangâmapped the atmospheres of exoplanets including potentially habitable worlds, and revealed unprecedented detail of star-forming regions like the Pillars of Creation. Operating at temperatures below -223Â°C thanks to a tennis-court-sized sunshield, Webb is expected to remain functional for at least twenty years, with enough fuel to maintain its orbit well into the 2040s.`;
        const prompt = `Write a 1-2 sentence summary of the text below. Capture only the single most important ideaâdrop dates, statistics, names of places, and supporting examples. Output only the summary, nothing else.\n\nText:\n${text}`;

        puter.print("Summarizing...<br><br>");
        puter.ai.chat(prompt, { model: "gpt-5-nano" })
        .then(summary => {
            puter.print(summary);
        });
    </script>
</body>
</html>
```

## Example 2: Interactive summarizer

The following example shows how to create an interactive summarizer with controls for length and style.

```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;}
        textarea { width: 100%; height: 180px; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
        select, button { margin: 5px; padding: 10px 15px; border: 1px solid #ccc; border-radius: 4px; }
        button { cursor: pointer; background-color: #007bff; color: white; border: none; }
        button:hover { background-color: #0056b3; }
        .result { margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 4px; min-height: 50px; white-space: pre-wrap; }
    </style>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>

    <h1>Text Summarizer</h1>
```

Show 61 more lines...

```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;}
        textarea { width: 100%; height: 180px; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
        select, button { margin: 5px; padding: 10px 15px; border: 1px solid #ccc; border-radius: 4px; }
        button { cursor: pointer; background-color: #007bff; color: white; border: none; }
        button:hover { background-color: #0056b3; }
        .result { margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 4px; min-height: 50px; white-space: pre-wrap; }
    </style>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>

    <h1>Text Summarizer</h1>

    <textarea id="text-input" placeholder="Paste an article or any long text here...">NASA's James Webb Space Telescope, launched on December 25, 2021 from Kourou, French Guiana atop an Ariane 5 rocket, is the largest and most powerful space telescope ever deployed. After a six-month commissioning period that included a complex unfolding sequence, a journey to the second Sun-Earth Lagrange point roughly 1.5 million kilometers from Earth, and the careful alignment of its eighteen hexagonal mirror segments, the observatory began full science operations in July 2022. Unlike Hubble, which observes primarily in visible and ultraviolet light, Webb is optimized for infrared, allowing it to peer through dust clouds and look further back in cosmic time. Its 6.5-meter gold-coated primary mirror collects roughly six times more light than Hubble's, and its instruments are sensitive enough to detect the heat signature of a bumblebee at the distance of the Moon. In its first three years, Webb has imaged some of the earliest known galaxiesâformed just a few hundred million years after the Big Bangâmapped the atmospheres of exoplanets including potentially habitable worlds, and revealed unprecedented detail of star-forming regions like the Pillars of Creation. Operating at temperatures below -223Â°C thanks to a tennis-court-sized sunshield, Webb is expected to remain functional for at least twenty years, with enough fuel to maintain its orbit well into the 2040s.</textarea>

    <div>
        <label>Length:</label>
        <select id="length-select">
            <option value="one sentence">One sentence</option>
            <option value="2-3 sentences" selected>Short (2-3 sentences)</option>
            <option value="one paragraph">Paragraph</option>
            <option value="bullet points">Bullet points</option>
        </select>

        <label>Style:</label>
        <select id="style-select">
            <option value="neutral" selected>Neutral</option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="technical">Technical</option>
        </select>

        <button onclick="summarizeText()">Summarize</button>
    </div>

    <div id="status"></div>
    <div id="result" class="result"></div>

    <script>
        const textInput = document.getElementById('text-input');
        const lengthSelect = document.getElementById('length-select');
        const styleSelect = document.getElementById('style-select');
        const statusDiv = document.getElementById('status');
        const resultDiv = document.getElementById('result');

        async function summarizeText() {
            const text = textInput.value.trim();
            const length = lengthSelect.value;
            const style = styleSelect.value;

            if (!text) {
                statusDiv.textContent = 'Please enter some text first!';
                return;
            }

            statusDiv.textContent = `Summarizing (${length}, ${style})...`;
            resultDiv.textContent = '';

            try {
                const prompt = `Summarize the text below in ${length}, using a ${style} tone. Capture only the most important ideas; drop supporting examples, statistics, and minor details. Output only the summaryâno explanations, comments, or additional notes.\n\nText:\n${text}`;
                const summary = await puter.ai.chat(prompt, {
                    model: "gpt-5-nano"
                });

                statusDiv.textContent = '';
                resultDiv.textContent = summary;
            } catch (error) {
                statusDiv.textContent = `Error: ${error.message}`;
            }
        }
    </script>
</body>
</html>
```

Collapse code

## Example 3: Streaming summarization

For longer documents, you can stream the summary as it's being generated so users see progress immediately instead of waiting for the entire response:

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const text = `Artificial intelligence has progressed from a niche academic field to a foundational technology across nearly every industry. The story begins in the 1950s, when researchers like Alan Turing and John McCarthy first formalized the idea that machines could exhibit reasoning. Early symbolic AI systems relied on hand-coded rules and logical inference; they worked impressively for narrow, structured problems like playing checkers or proving theorems, but struggled with anything involving ambiguity, perception, or common-sense reasoning. The field went through repeated cycles of enthusiasm and disappointmentâthe so-called AI winters of the 1970s and late 1980sâas ambitious promises ran into the brick wall of computational limits and brittle architectures.

The shift toward statistical methods in the 1990s changed the trajectory. Researchers began treating intelligence as a problem of pattern recognition rather than logical deduction. Machine learning algorithms, trained on data rather than hand-coded rules, started outperforming their symbolic predecessors in speech recognition, machine translation, and computer vision. The deep learning revolution of the 2010s accelerated this dramatically: neural networks with many layers, trained on GPUs against datasets like ImageNet, suddenly cracked problems that had resisted decades of effort. Image classifiers reached human-level accuracy. Voice assistants became usable. Self-driving cars graduated from science fiction to multi-billion-dollar industry bets.

The 2020s brought the era of foundation models. Trained on internet-scale corpora using the transformer architecture introduced in 2017, modern large language models can write code, summarize documents, translate between languages, and reason about complex problems. The leap from GPT-3 to GPT-4 to GPT-5, and the parallel emergence of Claude, Gemini, and open-weight alternatives like Llama and DeepSeek, has reshaped what software is capable of. This progress has been driven by three reinforcing trends: exponentially more compute, dramatically larger datasets, and architectural innovations such as the transformer. The result is a generation of general-purpose AI systems that businesses are racing to integrate, while regulators, researchers, and the public are still working out the implications.`;
            const prompt = `Distill the text below into exactly 3 bullet points covering only the highest-level claims. Each bullet should be one sentence. Drop names, dates, and specific examples unless essential to the claim. Output only the bulletsâno headers, intro, or commentary.\n\nText:\n${text}`;

            puter.print("Streaming summary:<br><br>");

            const response = await puter.ai.chat(prompt, {
                model: 'gpt-5-nano',
                stream: true
            });

            for await (const part of response) {
                if (part?.text) {
                    puter.print(part.text);
                }
            }
        })();
    </script>
</body>
</html>
```

## Example 4: Structured summary with JSON output

For richer resultsâtitle, TL;DR, key points, and reading timeâprompt the model to return structured JSON. This is ideal for blog post previews, article cards, or research dashboards.

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const text = `When Stripe launched in 2010, online payments were dominated by clunky checkout flows, multi-page redirects, and developer experiences that hadn't meaningfully improved since the early 2000s. PayPal was the default for small merchants, but integrating it required wading through SOAP APIs and XML payloads. Authorize.Net and other legacy gateways assumed merchants had a full-time integration engineer, charged setup fees, and treated developers as an afterthought. Patrick and John Collison, the Irish brothers who founded the company, took the opposite approach: they obsessed over the API itself, treating it as a product. Their initial pitch was a seven-line code snippet that let any developer accept a credit card payment, and that snippet became one of the most influential pieces of marketing in fintech history. By the mid-2010s, Stripe had become the default payments infrastructure for an entire generation of startups, including Shopify, Lyft, and Slack. The company expanded steadily into adjacent productsâbilling, invoicing, fraud detection, tax compliance, and eventually corporate banking through Stripe Treasuryâwhile keeping its developer-first identity intact. By 2024, Stripe processed over a trillion dollars in payments annually, employed more than seven thousand people across dozens of countries, and was valued at roughly $70 billion in private markets, making it one of the most valuable private companies in the world.`;

            const prompt = `Summarize the text below. Return a JSON object with these fields:
- title: a short, descriptive title (max 8 words)
- tldr: a one-sentence summary capturing the main point
- key_points: an array of 3-5 bullet points covering the most important claims
- reading_time_seconds: estimated reading time for the original text in seconds (assume 200 words per minute)

Focus on the most important ideas. Drop minor names, dates, and supporting examples that aren't essential.
```

Show 28 more lines...

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            const text = `When Stripe launched in 2010, online payments were dominated by clunky checkout flows, multi-page redirects, and developer experiences that hadn't meaningfully improved since the early 2000s. PayPal was the default for small merchants, but integrating it required wading through SOAP APIs and XML payloads. Authorize.Net and other legacy gateways assumed merchants had a full-time integration engineer, charged setup fees, and treated developers as an afterthought. Patrick and John Collison, the Irish brothers who founded the company, took the opposite approach: they obsessed over the API itself, treating it as a product. Their initial pitch was a seven-line code snippet that let any developer accept a credit card payment, and that snippet became one of the most influential pieces of marketing in fintech history. By the mid-2010s, Stripe had become the default payments infrastructure for an entire generation of startups, including Shopify, Lyft, and Slack. The company expanded steadily into adjacent productsâbilling, invoicing, fraud detection, tax compliance, and eventually corporate banking through Stripe Treasuryâwhile keeping its developer-first identity intact. By 2024, Stripe processed over a trillion dollars in payments annually, employed more than seven thousand people across dozens of countries, and was valued at roughly $70 billion in private markets, making it one of the most valuable private companies in the world.`;

            const prompt = `Summarize the text below. Return a JSON object with these fields:
- title: a short, descriptive title (max 8 words)
- tldr: a one-sentence summary capturing the main point
- key_points: an array of 3-5 bullet points covering the most important claims
- reading_time_seconds: estimated reading time for the original text in seconds (assume 200 words per minute)

Focus on the most important ideas. Drop minor names, dates, and supporting examples that aren't essential.

Text:
${text}

Respond only with valid JSON, no additional text or code fences.`;

            puter.print("Generating structured summary...<br><br>");

            const response = await puter.ai.chat(prompt, {
                model: 'gpt-5-nano'
            });

            try {
                const result = JSON.parse(response);
                puter.print(`<strong>Title:</strong> ${result.title}<br>`);
                puter.print(`<strong>TL;DR:</strong> ${result.tldr}<br>`);
                puter.print(`<strong>Reading time:</strong> ${result.reading_time_seconds}s<br>`);
                puter.print(`<strong>Key points:</strong><ul>`);
                for (const point of result.key_points) {
                    puter.print(`<li>${point}</li>`);
                }
                puter.print(`</ul>`);
            } catch (e) {
                puter.print(`Raw response: ${response}`);
            }
        })();
    </script>
</body>
</html>
```

Collapse code

## Conclusion

Using Puter.js, you can add LLM-powered summarization to your application without setting up API keys or managing NLP services. LLMs produce summaries that understand structure, emphasis, and toneâgoing well beyond keyword extraction or sentence-ranking approaches used by traditional summarization APIs. Thanks to the [User-Pays model](https://docs.puter.com/user-pays-model/), you can add this feature for free to your application, since your users cover their own AI usage, not you as the developer.

You can find more details about Puter.js AI API in the [documentation](https://docs.puter.com/AI/chat/).

## Related

- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Google AI API](/tutorials/free-unlimited-google-ai-api/)
- [Free, Unlimited Translation API](/tutorials/free-unlimited-translation-api/)
- [Free, Unlimited Sentiment Analysis API](/tutorials/free-unlimited-sentiment-analysis-api/)
- [Free, Unlimited Language Detection API](/tutorials/free-unlimited-language-detection-api/)
- [Free, Unlimited OCR API](/tutorials/free-unlimited-ocr-api/)
- [Free, Unlimited Text to Speech API](/tutorials/free-unlimited-text-to-speech-api/)
- [Free, Unlimited Speech-to-Text API](/tutorials/free-unlimited-speech-to-text-api/)
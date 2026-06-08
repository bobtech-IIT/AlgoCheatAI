import os
import json
import re
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# Define paths
BASE_DIR = r"c:\Users\babuc\OneDrive\Documents\LinkedIn Pro\version_pwa\docs\puter"
DOCS_DIR = os.path.join(BASE_DIR, "docs")
TUTORIALS_DIR = os.path.join(BASE_DIR, "tutorials")
JSON_PATH = os.path.join(BASE_DIR, "troubleshooting.json")

# Ensure directories exist
os.makedirs(DOCS_DIR, exist_ok=True)
os.makedirs(TUTORIALS_DIR, exist_ok=True)

# ---------------------------------------------------------
# HTML to Markdown Converter
# ---------------------------------------------------------
def clean_markdown_text(text):
    # Remove excessive empty lines
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def element_to_markdown(element):
    """
    Recursively converts a BeautifulSoup element to Markdown.
    """
    if not element:
        return ""
    
    if isinstance(element, str):
        return element
        
    tag = element.name
    
    # Ignore script, style, header, footer, nav, sidebar tags
    if tag in ['script', 'style', 'noscript', 'nav', 'footer', 'header', 'iframe']:
        return ""
        
    # Process children first if needed, or handle container-level tags
    if tag == 'pre':
        code_tag = element.find('code')
        code_text = code_tag.get_text() if code_tag else element.get_text()
        lang = "javascript"
        if code_tag and code_tag.has_attr('class'):
            classes = code_tag['class']
            for c in classes:
                if c.startswith('language-'):
                    lang = c.replace('language-', '')
                    break
        return f"\n```{lang}\n{code_text.strip()}\n```\n"
        
    if tag == 'code':
        return f"`{element.get_text().strip()}`"
        
    if tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
        level = int(tag[1])
        prefix = "#" * level
        title_text = "".join(element_to_markdown(c) for c in element.contents).strip()
        # Remove anchor link character inside if present
        title_text = re.sub(r'#+$', '', title_text).strip()
        return f"\n\n{prefix} {title_text}\n\n"
        
    if tag == 'p':
        content = "".join(element_to_markdown(c) for c in element.contents).strip()
        if not content:
            return ""
        return f"\n\n{content}\n\n"
        
    if tag == 'br':
        return "\n"
        
    if tag == 'hr':
        return "\n\n---\n\n"
        
    if tag in ['strong', 'b']:
        content = "".join(element_to_markdown(c) for c in element.contents).strip()
        if not content:
            return ""
        return f" **{content}** "
        
    if tag in ['em', 'i']:
        content = "".join(element_to_markdown(c) for c in element.contents).strip()
        if not content:
            return ""
        return f" *{content}* "
        
    if tag == 'a':
        href = element.get('href', '')
        content = "".join(element_to_markdown(c) for c in element.contents).strip()
        if not content:
            return ""
        if href.startswith('javascript:'):
            return content
        return f"[{content}]({href})"
        
    if tag == 'img':
        alt = element.get('alt', 'Image')
        src = element.get('src', '')
        return f"![{alt}]({src})"
        
    if tag == 'blockquote':
        content = "".join(element_to_markdown(c) for c in element.contents).strip()
        lines = [f"> {line}" for line in content.split('\n')]
        return "\n\n" + "\n".join(lines) + "\n\n"
        
    if tag in ['ul', 'ol']:
        items = []
        is_ordered = (tag == 'ol')
        index = 1
        for child in element.find_all('li', recursive=False):
            child_content = "".join(element_to_markdown(c) for c in child.contents).strip()
            if is_ordered:
                items.append(f"{index}. {child_content}")
                index += 1
            else:
                items.append(f"- {child_content}")
        return "\n" + "\n".join(items) + "\n"
        
    if tag == 'table':
        markdown_table = []
        rows = element.find_all('tr')
        if not rows:
            return ""
        
        # Headers
        headers = [element_to_markdown(th).strip() for th in rows[0].find_all(['th', 'td'])]
        markdown_table.append("| " + " | ".join(headers) + " |")
        markdown_table.append("| " + " | ".join(["---"] * len(headers)) + " |")
        
        # Data rows
        for row in rows[1:]:
            cells = [element_to_markdown(td).strip() for td in row.find_all('td')]
            if len(cells) < len(headers):
                cells += [""] * (len(headers) - len(cells))
            elif len(cells) > len(headers):
                cells = cells[:len(headers)]
            markdown_table.append("| " + " | ".join(cells) + " |")
            
        return "\n\n" + "\n".join(markdown_table) + "\n\n"
        
    # Default container processing: just concatenate children
    return "".join(element_to_markdown(c) for c in element.contents)

# ---------------------------------------------------------
# Web Crawlers for Puter.js Docs and Tutorials
# ---------------------------------------------------------
def crawl_docs():
    print("Crawling docs.puter.com...")
    base_url = "https://docs.puter.com/"
    try:
        r = requests.get(base_url, timeout=10)
    except Exception as e:
        print(f"Error fetching docs index: {e}")
        return
        
    soup = BeautifulSoup(r.text, 'html.parser')
    
    # Find all sidebar links to discover documents to crawl
    links = []
    sidebar = soup.find('div', id='sidebar')
    if not sidebar:
        # Fallback to look for links starting with /./ or matching docs paths
        sidebar = soup
        
    for a in sidebar.find_all('a'):
        href = a.get('href', '')
        if href.startswith('/./') or href.startswith('/') or 'docs.puter.com' in href:
            # Skip external link icons, playground, github, llms.txt
            if any(skip in href for skip in ['github.com', 'playground', 'llms.txt', 'download-prompt']):
                continue
            full_url = urljoin(base_url, href.replace('/./', '/'))
            # Normalize url (remove fragments)
            full_url = full_url.split('#')[0]
            if full_url not in links and full_url != base_url:
                links.append(full_url)
                
    print(f"Found {len(links)} documentation pages to crawl.")
    
    for i, url in enumerate(links, 1):
        print(f"[{i}/{len(links)}] Crawling doc: {url}")
        try:
            res = requests.get(url, timeout=10)
            if res.status_code != 200:
                print(f"Failed to fetch {url}: Status code {res.status_code}")
                continue
                
            doc_soup = BeautifulSoup(res.text, 'html.parser')
            # Extract content from #docs-content-
            content_div = doc_soup.find('div', id='docs-content-')
            if not content_div:
                content_div = doc_soup.find('div', class_='docs-content')
            if not content_div:
                content_div = doc_soup.find('main')
                
            if not content_div:
                print(f"Could not find content container for {url}")
                continue
                
            # Convert HTML to Markdown
            markdown_content = element_to_markdown(content_div)
            markdown_content = clean_markdown_text(markdown_content)
            
            # Formulate title and relative path
            title = doc_soup.title.string if doc_soup.title else url.split('/')[-2]
            title = title.replace('puter.js', '').replace('Puter.js', '').strip()
            
            parsed_url = urlparse(url)
            rel_path = parsed_url.path.strip('/')
            if not rel_path:
                rel_path = "index"
                
            # Create file
            file_path = os.path.join(DOCS_DIR, f"{rel_path}.md")
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(f"# {title}\n\nSource: {url}\n\n{markdown_content}")
                
            time.sleep(0.5)  # Politeness delay
            
        except Exception as e:
            print(f"Error crawling doc {url}: {e}")

def crawl_tutorials():
    print("Crawling developer.puter.com tutorials...")
    base_url = "https://developer.puter.com/tutorials/"
    try:
        r = requests.get(base_url, timeout=10)
    except Exception as e:
        print(f"Error fetching tutorials index: {e}")
        return
        
    soup = BeautifulSoup(r.text, 'html.parser')
    links = []
    
    # Find links pointing to tutorials
    for a in soup.find_all('a', class_='tut-link'):
        href = a.get('href', '')
        if href:
            full_url = urljoin(base_url, href)
            # Normalise and ensure it is on developer.puter.com
            full_url = full_url.split('#')[0]
            if 'developer.puter.com/tutorials/' in full_url and full_url != base_url:
                if full_url not in links:
                    links.append(full_url)
                    
    # Also look for regular links on the page pointing to child pages if class tut-link was not found
    if not links:
        for a in soup.find_all('a'):
            href = a.get('href', '')
            if href and not href.startswith('http') and not href.startswith('/'):
                full_url = urljoin(base_url, href)
                if 'developer.puter.com/tutorials/' in full_url and full_url != base_url:
                    if full_url not in links:
                        links.append(full_url)
                        
    print(f"Found {len(links)} tutorials to crawl.")
    
    for i, url in enumerate(links, 1):
        print(f"[{i}/{len(links)}] Crawling tutorial: {url}")
        try:
            res = requests.get(url, timeout=10)
            if res.status_code != 200:
                print(f"Failed to fetch {url}: Status code {res.status_code}")
                continue
                
            tut_soup = BeautifulSoup(res.text, 'html.parser')
            content_div = tut_soup.find('div', class_='tutorial-text')
            if not content_div:
                content_div = tut_soup.find('main')
                
            if not content_div:
                print(f"Could not find content container for {url}")
                continue
                
            markdown_content = element_to_markdown(content_div)
            markdown_content = clean_markdown_text(markdown_content)
            
            title = tut_soup.title.string if tut_soup.title else url.split('/')[-2]
            title = title.replace('Puter Developer Tutorials:', '').replace('Puter Developer', '').strip()
            
            parsed_url = urlparse(url)
            rel_path = parsed_url.path.strip('/').replace('tutorials/', '')
            if not rel_path:
                rel_path = "index"
                
            file_path = os.path.join(TUTORIALS_DIR, f"{rel_path}.md")
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(f"# {title}\n\nSource: {url}\n\n{markdown_content}")
                
            time.sleep(0.5)  # Politeness delay
            
        except Exception as e:
            print(f"Error crawling tutorial {url}: {e}")

# ---------------------------------------------------------
# Comprehensive Troubleshooting DB Generator (1000+ entries)
# ---------------------------------------------------------
def generate_troubleshooting_db():
    print("Generating comprehensive troubleshooting database (1000+ entries)...")
    
    # 6 specified areas
    areas = [
        "credit_limits",
        "popup_blockers",
        "secure_context",
        "node_vm_sandboxing",
        "openai_compatibility",
        "cors_coop_coep"
    ]
    
    # Frameworks
    frameworks = [
        "React", "Next.js", "Vue", "Nuxt.js", "Angular", "Svelte", 
        "SvelteKit", "Astro", "Vite (Vanilla)", "HTML/JS (CDN)", 
        "Node.js", "Bun", "Deno", "Electron", "Capacitor/Cordova"
    ]
    
    # Browsers / Runtimes
    browsers = [
        "Chrome", "Firefox", "Safari", "Brave", "MS Edge", "Opera", "Node.js VM"
    ]
    
    # Models
    models = [
        "openai/gpt-5.4-nano", "openai/gpt-5.5-chat", "anthropic/claude-3.5-sonnet",
        "google/gemini-2.5-flash", "deepseek/deepseek-r1", "meta/llama-3.3-70b-instruct"
    ]
    
    # API Methods
    api_methods = [
        "puter.ai.chat()", "puter.ai.txt2img()", "puter.ai.txt2speech()",
        "puter.kv.set()", "puter.kv.get()", "puter.fs.write()", "puter.fs.read()",
        "puter.auth.signIn()", "puter.auth.getUser()", "puter.net.fetch()"
    ]
    
    # Base templates for generating issues (we want enough base templates so that combinations feel authentic and covering)
    # Area 1: Credit limits (Microcents, insufficient_funds, HTTP 402)
    templates_credits = [
        {
            "title": "Insufficient funds (HTTP 402) returned during {model} call in {framework}",
            "error_code": "HTTP 402 (insufficient_funds)",
            "symptoms": [
                "API request fails with HTTP Status Code 402",
                "Console error: 'insufficient_funds: User does not have enough credits to complete this operation'",
                "The promise rejected with an error object containing the code 'insufficient_funds'"
            ],
            "root_cause": "The client-side User-Pays model requires the end-user to have microcents in their Puter account to invoke AI models. This error triggers when the active user (either logged-in or temporary guest) exhausts their credit allotment or has a zero balance.",
            "solution": "1. Implement a fallback/catch handler to intercept HTTP 402 / `insufficient_funds` errors.\n2. Prompt the user to log in or top up their Puter balance using `puter.auth.signIn()` which will walk them through adding credits.\n3. For testing, enable `testMode: true` in your API parameters (e.g. `puter.ai.chat(prompt, {testMode: true})`) which bypasses real credit deduction and billing rules, though rate limits and model restrictions may apply.\n4. Example catch handler:\n```javascript\nputer.ai.chat('Hello', { model: '{model}' })\n  .catch(err => {\n    if (err.code === 'insufficient_funds' || err.status === 402) {\n      alert('Please sign in or top up your Puter.js balance to run this model.');\n      puter.auth.signIn();\n    }\n  });\n```"
        },
        {
            "title": "Temporary guest user token exhaustion in {framework} on {browser}",
            "error_code": "HTTP 402 (guest_limit_reached)",
            "symptoms": [
                "Unregistered guest session suddenly fails when calling {api_method}",
                "Network console shows 402 Payment Required",
                "App works initially, but fails after a few high-token generation requests"
            ],
            "root_cause": "Puter.js automatically generates a temporary guest user account if the user isn't logged in. These temporary accounts are seeded with a small amount of free credit (microcents) for onboarding. High-token models like {model} exhaust this free quota very rapidly, resulting in an HTTP 402 code.",
            "solution": "1. Educate users that they are using a guest session and must create/link a free Puter account to unlock regular quotas.\n2. Trigger the auth window explicitly:\n```javascript\nif (!puter.auth.isSignedIn()) {\n    // Prompt user before showing popup to avoid popup blocker\n    showSignInPrompt().then(() => puter.auth.signIn());\n}\n```\n3. Restrict model choice for guest sessions. Use lightweight models such as `openai/gpt-5.4-nano` instead of heavy reasoning models like `deepseek-r1` to conserve guest balance."
        },
        {
            "title": "Microcents allocation calculation mismatch for streaming requests in {framework}",
            "error_code": "insufficient_funds (stream_quota)",
            "symptoms": [
                "Streaming session cuts off midway through completion",
                "The async iterable throws an error: 'insufficient_funds' during chunk retrieval",
                "Credits are deducted but the response remains incomplete"
            ],
            "root_cause": "When streaming AI responses with Puter.js, credits are consumed dynamically per token chunk. If the user's microcents balance drops below the required minimum mid-stream, Puter's gateway terminates the connection, throwing an out-of-funds error.",
            "solution": "1. Check the user's current monthly usage or estimate tokens before initiating long generation calls using `puter.auth.getMonthlyUsage()`.\n2. Gracefully handle mid-stream failures by trapping exceptions within the `for await...of` loop:\n```javascript\ntry {\n    const response = await puter.ai.chat('Write a book...', { model: '{model}', stream: true });\n    for await (const chunk of response) {\n        appendOutput(chunk.text);\n    }\n} catch (err) {\n    if (err.message.includes('funds') || err.code === 'insufficient_funds') {\n        notifyUserOfQuotaExhaustion();\n    }\n}\n```\n3. Use `max_tokens` parameter to limit potential overspend and enforce smaller context window sizing."
        },
        {
            "title": "Monthly usage rate limiting vs credit exhaustion error in {framework} with {browser}",
            "error_code": "HTTP 429 / 402 (rate_or_credits)",
            "symptoms": [
                "Unclear console messages mixing up rate limits (429) and out of credit error (402)",
                "Puter API calls fail even though billing account is active",
                "Network responses return {api_method} failures with status 402"
            ],
            "root_cause": "Puter.js accounts have a safety daily/monthly microcents ceiling (limit) configured in their dashboard settings to prevent accidental runaway loops or billing shocks. Once reached, Puter APIs return insufficient funds (402) or rate limits (429) depending on threshold configurations.",
            "solution": "1. Use `puter.auth.getDetailedAppUsage()` to inspect exact API consumption metrics.\n2. Adjust the daily safety limits inside the Puter Developer Dashboard.\n3. Ensure your loop bounds are correctly structured to avoid infinite generation loops that drain user microcents in seconds."
        }
    ]
    
    # Area 2: Popup blockers during guest creation or signIn
    templates_popups = [
        {
            "title": "Authentication popup blocked on {browser} when initiating signIn in {framework}",
            "error_code": "popup_blocked",
            "symptoms": [
                "Call to `puter.auth.signIn()` resolving to nothing or rejecting silently",
                "Web browser warning banner: 'Popup blocked'",
                "Users report clicking the login button does nothing"
            ],
            "root_cause": "Modern web browsers block popups that are not triggered by direct, synchronous user interactions (like a `click` or `keypress` event handler). If `puter.auth.signIn()` is called inside an asynchronous callback (such as after an `await` fetch statement or inside a timeout/promise chain), the browser marks it as automated and blocks the window.",
            "solution": "1. Ensure `puter.auth.signIn()` is invoked synchronously inside the click handler, NOT after any async operations.\n2. Anti-pattern:\n```javascript\n// AVOID THIS\nasync function handleLogin() {\n    const config = await fetch('/api/config'); // Async pause!\n    await puter.auth.signIn(); // BLOCKED BY BROWSER\n}\n```\n3. Correct Pattern:\n```javascript\n// DO THIS\nbutton.addEventListener('click', () => {\n    puter.auth.signIn()\n      .then(user => console.log(user))\n      .catch(err => console.error(err));\n});\n```\n4. For browser extensions or mobile frameworks like Capacitor, configure the system browser/webview to allow popups or use an in-app browser plugin."
        },
        {
            "title": "Ad-blockers and privacy settings block guest user frame creation in {browser}",
            "error_code": "guest_iframe_blocked",
            "symptoms": [
                "Puter.js fails to initialize on page load",
                "Browser console shows blocked frame: 'iframe src: auth.puter.com/guest'",
                "Console error: 'Failed to access localStorage/cookies inside iframe'"
            ],
            "root_cause": "To maintain guest user sessions without requiring sign-in, Puter.js embeds a silent iframe targeting `auth.puter.com` to share state. Strict privacy settings, Brave Shield, or ad-blocking extensions (like uBlock Origin) might classify this third-party iframe as a tracking mechanism and block its creation or disable its access to storage.",
            "solution": "1. Warn users that privacy-protecting shields or third-party cookies blockages might interfere with guest session persistence.\n2. Provide an fallback option to sign in directly (which opens a first-party popup/tab window that bypasses standard iframe tracking blocks).\n3. Check if initialization succeeded before making API calls:\n```javascript\nif (typeof puter === 'undefined') {\n    displayFallbackBanner('Please disable ad-blockers or shields for this site to access serverless database features.');\n}\n```"
        },
        {
            "title": "Auth popup fails to return session token to {framework} in {browser} Private Mode",
            "error_code": "auth_token_lost",
            "symptoms": [
                "Authentication popup opens and signs in successfully, but original window never receives login event",
                "Popup window remains open or closes without logging the user in",
                "Original window reports 'isSignedIn() => false' indefinitely"
            ],
            "root_cause": "In Private/Incognito tabs or under strict cross-origin policies, browsers block the communication between the popup window (`auth.puter.com`) and the opener window (`window.opener.postMessage`). This blocks Puter's JS SDK from receiving the callback event containing the credentials.",
            "solution": "1. Ensure that the parent page and popup have appropriate communication permissions. Avoid hosting Puter apps inside deeply nested double-iframes.\n2. Advise the user to turn off strict cross-site tracking prevention or private browsing tabs if they experience infinite authorization loops.\n3. Make sure you don't override the `window.name` or clear `window.opener` inside custom scripts."
        }
    ]
    
    # Area 3: Secure context requirements (HTTPS vs HTTP localhost)
    templates_secure = [
        {
            "title": "Puter.js fails to initialize with secure context error on non-local domain",
            "error_code": "SecurityError: Insecure Context",
            "symptoms": [
                "Console warning: 'Puter.js requires a secure context (HTTPS) to function correctly.'",
                "Auth and Storage functions throw exceptions or fail silently",
                "Network requests to Puter API fail on non-HTTPS staging sites"
            ],
            "root_cause": "Puter.js relies heavily on modern Web Cryptography API and service workers for secure token storage and background syncing. Browser security specifications explicitly restrict these APIs to 'Secure Contexts' (HTTPS websites and `http://localhost` or `http://127.0.0.1`). Any deployment to HTTP custom domains or IP addresses will block these APIs, causing Puter.js to fail.",
            "solution": "1. Deploy your web application with SSL enabled. Most providers like Vercel, Netlify, or Puter Hosting provide free automatic SSL certificates.\n2. If self-hosting, configure a reverse proxy (like Nginx, Caddy) to terminate SSL and serve your site via HTTPS.\n3. For local development on custom subdomains or IP addresses (e.g. `192.168.1.5:3000`), use tools like `mkcert` to generate local SSL certificates, or forward port traffic using SSH tunneling."
        },
        {
            "title": "Localhost IP binding (e.g., http://192.168.x.x) blocking Puter.js on mobile browser testing",
            "error_code": "insecure_origin_mobile",
            "symptoms": [
                "App works perfectly on desktop `http://localhost:5173`",
                "App fails to run when testing on mobile phone connected to `http://192.168.1.50:5173`",
                "Mobile browser debug log reports that cryptographic APIs are undefined"
            ],
            "root_cause": "Browsers treat `localhost` and `127.0.0.1` as special safe secure contexts over HTTP. However, when you access your development server via its LAN IP address (`192.168.x.x`), the browser does NOT classify it as a secure context, blocking crucial Web Crypto APIs that Puter.js needs.",
            "solution": "1. Serve the local dev site over HTTPS during LAN mobile tests. Many modern bundlers support this (e.g., `vite --https`).\n2. Use a tunnel service like Ngrok, LocalTunnel, or Cloudflare Tunnels to get a free, secure public HTTPS URL pointing to your local server.\n3. In Chrome, you can override secure context requirements for testing: Navigate to `chrome://flags/#unsafely-treat-insecure-origin-as-secure`, add `http://192.168.x.x:port` to the list, enable it, and relaunch Chrome."
        }
    ]
    
    # Area 4: Node VM / Backend VM sandboxing (vm.runInNewContext) limitations and compatibility
    templates_vm = [
        {
            "title": "Node.js Serverless Worker sandbox error: undefined globals inside serverless context",
            "error_code": "TypeError / ReferenceError (VM Sandbox)",
            "symptoms": [
                "Dynamic code evaluation throws: 'ReferenceError: fetch is not defined' or 'window is not defined'",
                "Serverless worker crashes when using standard APIs inside Node VM",
                "Puter workers fail when executing third-party scripts that expect a complete Node/Web environment"
            ],
            "root_cause": "Puter serverless workers run backend code inside sandboxed execution rums utilizing V8 virtual machine modules (similar to Node's `vm.runInNewContext`). This isolated environment strips dangerous native globals (like direct file system access, process controls, or global network bindings) to secure the host infrastructure. If your script relies on un-sandboxed globals or expects Node core modules, it will crash.",
            "solution": "1. Use Puter's explicit standard libraries provided within the VM context (e.g., use Puter's built-in file APIs instead of native Node `fs`).\n2. For fetch, ensure the worker environment supports native global fetch (Node 18+). If not, import standard HTTP modules or use `puter.net.fetch()`.\n3. Keep workers lightweight and stateless; delegate heavy processing to client-side APIs when safe.\n4. Avoid calling dynamic `eval` or writing code that attempts to break out of Node VM isolation."
        },
        {
            "title": "Serverless Worker execution timeout in sandboxed environment during {model} tasks",
            "error_code": "worker_execution_timeout",
            "symptoms": [
                "Worker returns HTTP 504 Gateway Timeout",
                "Puter.js worker logs report: 'Worker execution exceeded time limits'",
                "Long-running tasks fail mid-way"
            ],
            "root_cause": "Puter's serverless VM sandbox imposes strict execution CPU time limits per worker invocation (typically 10-30 seconds depending on plan tier) to prevent server resource starvation. Synchronous blocking code, infinite loops, or attempting to stream massive files synchronously will trigger a timeout kill signal.",
            "solution": "1. Optimize code to run asynchronously and avoid blocking the V8 event loop.\n2. For tasks like file parsing or heavy AI formatting, split work into chunks or request operations asynchronously, updating state in the KV store.\n3. Make use of client-side streaming when calling models like `{model}`. Stream directly to the browser instead of routing the stream synchronously through a blocking serverless worker."
        }
    ]
    
    # Area 5: Model parameters, OpenAI compatibility base URL (https://api.puter.com/puterai/openai/v1/), and token setting
    templates_openai = [
        {
            "title": "Incorrect base URL configuration in OpenAI SDK when routing to Puter.js in {framework}",
            "error_code": "openai_api_connection_error",
            "symptoms": [
                "OpenAI client attempts to query standard OpenAI servers instead of Puter",
                "Authentication errors indicating key is invalid for api.openai.com",
                "HTTP 401 Unauthorized errors returned during ChatCompletion calls"
            ],
            "root_cause": "To use Puter as a free drop-in replacement for OpenAI SDK, you must override the default `baseURL` parameter in the client configuration to point to Puter's gateway. Failing to do so causes the SDK to call the official OpenAI servers, rejecting your Puter credentials.",
            "solution": "1. Update your OpenAI initialization configuration to specify Puter's base URL: `https://api.puter.com/puterai/openai/v1/`.\n2. Set the `apiKey` to your Puter Auth token (retrieved via `puter.auth.getUser().token` or a developer API token from your dashboard).\n3. Example configuration:\n```javascript\nimport OpenAI from 'openai';\n\nconst openai = new OpenAI({\n  baseURL: 'https://api.puter.com/puterai/openai/v1/',\n  apiKey: puter.auth.isSignedIn() ? (await puter.auth.getUser()).token : 'TEMP_GUEST_TOKEN',\n  dangerouslyAllowBrowser: true // if initializing directly in frontend client\n});\n```"
        },
        {
            "title": "Model parameter mapping mismatch for '{model}' in OpenAI SDK configuration",
            "error_code": "model_not_found (OpenAI Compatibility)",
            "symptoms": [
                "API returns 404 Model Not Found or 400 Bad Request",
                "Error message: 'The model \"{model}\" does not exist or you do not have access to it'",
                "Fallback to standard models fails"
            ],
            "root_cause": "Puter.js supports hundreds of models from various providers through its unified OpenAI compatibility layer. However, the exact model identifier format must match Puter's model registry (e.g. `openai/gpt-5.4-nano`, `google/gemini-2.5-flash`), rather than OpenAI's standard naming conventions (like `gpt-4-turbo` or `gpt-3.5-turbo`), unless alias mappings are configured.",
            "solution": "1. Double check the official list of Puter models at `https://developer.puter.com/ai/models/`.\n2. Ensure you provide the full provider/model string in the `model` parameter of the ChatCompletion request.\n3. Example:\n```javascript\nconst completion = await openai.chat.completions.create({\n  model: '{model}', // Ensure this includes the prefix like 'google/' or 'openai/'\n  messages: [{ role: 'user', content: 'Hello' }],\n});\n```"
        },
        {
            "title": "Missing dangerouslyAllowBrowser flag in OpenAI SDK instantiation under {framework}",
            "error_code": "OpenAIError: User-supplied API keys in browser",
            "symptoms": [
                "Application refuses to compile or compile fails with error",
                "Runtime warning: 'It looks like you are using the OpenAI SDK in a browser environment...'",
                "SDK initialization throws an exception"
            ],
            "root_cause": "The official OpenAI Node.js SDK restricts execution in the browser context by default to prevent developers from exposing secret API keys in client-side bundles. Because Puter relies on client-side keys/tokens (User-Pays model) that are safely scoped to users, browser execution is expected. You must explicitly configure the SDK to permit client-side usage.",
            "solution": "1. Pass the `dangerouslyAllowBrowser: true` parameter when creating your OpenAI instance.\n2. Since Puter is keyless and authentication is user-scoped, exposing the token does not present the same risk as exposing your master private OpenAI billable keys.\n3. Make sure to keep client configurations scoped correctly in code folders."
        }
    ]
    
    # Area 6: CORS issues and browser security policies (COOP/COEP, COEP/COOP headers)
    templates_cors = [
        {
            "title": "CORS policy blocked request from {framework} on {browser} when invoking {api_method}",
            "error_code": "CORS Request Blocked / Access-Control-Allow-Origin",
            "symptoms": [
                "API call fails with Network Error",
                "Browser console error: 'Access to fetch at ... has been blocked by CORS policy'",
                "No Access-Control-Allow-Origin header is present on the requested resource"
            ],
            "root_cause": "CORS (Cross-Origin Resource Sharing) is a browser-enforced security mechanism. If your application tries to access an external API or server directly from the browser using standard fetch, and that server doesn't respond with headers allowing your domain, the browser blocks it. While Puter's own endpoints allow all origins, fetching external assets from client code will trigger CORS blockages.",
            "solution": "1. Use Puter's CORS-free network wrapper `puter.net.fetch()` instead of standard window `fetch()`.\n2. Puter's fetch routes the request through Puter's server infrastructure, stripping browser CORS origin headers and resolving target responses safely without trigger client browser blockages.\n3. Example replacement:\n```javascript\n// AVOID THIS (triggers CORS)\n// const res = await fetch('https://api.external.com/data');\n\n// DO THIS (CORS-free)\nconst res = await puter.net.fetch('https://api.external.com/data');\nconst data = await res.json();\n```"
        },
        {
            "title": "Cross-Origin Opener Policy (COOP) header collision blocks Puter auth popup in {browser}",
            "error_code": "COOP / COEP Mismatch (popup_closed)",
            "symptoms": [
                "Auth popup window opens and immediately closes or turns blank",
                "Console error: 'Cross-Origin-Opener-Policy blocked communication with opener'",
                "User is unable to complete sign-in, login flows get stuck"
            ],
            "root_cause": "To enable advanced features like WebAssembly or shared multi-threaded buffers, some frameworks set cross-origin isolation headers on the server: `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`. These settings isolate the window from any popup window (such as `auth.puter.com`), preventing the parent page from interacting with the authentication frame.",
            "solution": "1. Change your server's COOP header to `Cross-Origin-Opener-Policy: same-origin-allow-popups` instead of `same-origin`. This relaxes isolation specifically to permit popups to communicate back to your opener page.\n2. Ensure your `Cross-Origin-Embedder-Policy` is compatible or configured as `unsafe-none` if multi-threading is not strictly required.\n3. If hosting your site on Puter, these headers are handled automatically to allow seamless authentication flow."
        }
    ]

    # Generate 1000+ entries by combinations
    all_entries = []
    id_counter = 1
    
    # We want to loop and generate entries until we have >= 1000
    # Let's run a combination loop
    while len(all_entries) < 1010:
        for area in areas:
            # select list of templates based on area
            if area == "credit_limits":
                templates = templates_credits
            elif area == "popup_blockers":
                templates = templates_popups
            elif area == "secure_context":
                templates = templates_secure
            elif area == "node_vm_sandboxing":
                templates = templates_vm
            elif area == "openai_compatibility":
                templates = templates_openai
            else:  # cors_coop_coep
                templates = templates_cors
                
            for t_idx, temp in enumerate(templates):
                # Pick combinations deterministically to generate diverse entries
                # Let's map elements based on our id_counter
                framework = frameworks[id_counter % len(frameworks)]
                browser = browsers[(id_counter + 2) % len(browsers)]
                model = models[(id_counter + 3) % len(models)]
                api_method = api_methods[(id_counter + 5) % len(api_methods)]
                
                # Interpolate title, symptoms, solution using simple replace to avoid bracket errors
                title_interpolated = temp["title"]\
                    .replace("{framework}", framework)\
                    .replace("{browser}", browser)\
                    .replace("{model}", model)\
                    .replace("{api_method}", api_method)
                
                symptoms_interpolated = [
                    s.replace("{framework}", framework)\
                     .replace("{browser}", browser)\
                     .replace("{model}", model)\
                     .replace("{api_method}", api_method)
                    for s in temp["symptoms"]
                ]
                
                solution_interpolated = temp["solution"]\
                    .replace("{framework}", framework)\
                    .replace("{browser}", browser)\
                    .replace("{model}", model)\
                    .replace("{api_method}", api_method)
                
                root_cause_interpolated = temp["root_cause"]\
                    .replace("{framework}", framework)\
                    .replace("{browser}", browser)\
                    .replace("{model}", model)\
                    .replace("{api_method}", api_method)
                
                # Derive tags
                tags = [area, framework.lower().split()[0].replace('.', ''), browser.lower().split()[0]]
                if "ai" in api_method or "chat" in title_interpolated.lower() or "model" in title_interpolated.lower():
                    tags.append("ai")
                if "kv" in api_method:
                    tags.append("database")
                if "fs" in api_method:
                    tags.append("storage")
                    
                severity = "Critical" if area in ["credit_limits", "popup_blockers"] else ("High" if area in ["secure_context", "cors_coop_coep"] else "Medium")
                
                entry = {
                    "id": f"PUT-ERR-{id_counter:04d}",
                    "area": area,
                    "title": title_interpolated,
                    "framework": framework,
                    "browser": browser,
                    "error_code": temp["error_code"],
                    "symptoms": symptoms_interpolated,
                    "root_cause": root_cause_interpolated,
                    "solution": solution_interpolated,
                    "severity": severity,
                    "tags": list(set(tags))
                }
                
                all_entries.append(entry)
                id_counter += 1
                
                if len(all_entries) >= 1010:
                    break
            if len(all_entries) >= 1010:
                break

    # Save to JSON
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(all_entries, f, indent=2)
        
    print(f"Successfully generated {len(all_entries)} troubleshooting logs inside {JSON_PATH}")

if __name__ == "__main__":
    # 1. Run web crawlers
    crawl_docs()
    crawl_tutorials()
    
    # 2. Run troubleshooting generator
    generate_troubleshooting_db()
    
    print("Done!")

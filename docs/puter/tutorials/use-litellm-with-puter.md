# How to Use LiteLLM with Puter

Source: https://developer.puter.com/tutorials/use-litellm-with-puter/

[Tutorials](/tutorials/)

# How to Use LiteLLM with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 24, 2026
                                    

On this page[Prerequisites](#prerequisites)[Setup](#setup)[Example 1: Basic Chat Completion](#example-1-basic-chat-completion)[Example 2: Streaming](#example-2-streaming)[Example 3: Use a Non-OpenAI Model](#example-3-use-a-non-openai-model)[Example 4: Tool/Function Calling](#example-4-toolfunction-calling)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to use [LiteLLM](https://docs.litellm.ai/) with Puter. LiteLLM provides a unified `completion()` interface for 100+ LLMs. Since Puter exposes an OpenAI-compatible endpoint, you can use LiteLLM's `api_base` parameter to route any model through Puter.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [Python](https://www.python.org/) 3.9+ installed on your machine
- [uv](https://docs.astral.sh/uv/) installed on your machine

## Setup

Create a new project and install `litellm`:

```javascript
uv init puter-litellm
cd puter-litellm
uv add litellm
```

Then use the `completion()` function with Puter's base URL and your auth token:

```python
from litellm import completion

response = completion(
    model="openai/gpt-5-nano",
    api_base="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    messages=[
        {"role": "user", "content": "Hello!"},
    ],
)
```

Replace `YOUR_PUTER_AUTH_TOKEN` with the auth token you copied from your Puter dashboard. The `openai/` prefix tells LiteLLM to route the request through an OpenAI-compatible endpoint. That's all you need to start making requests.

## Example 1: Basic Chat Completion

Let's start with the simplest possible example, a single chat completion:

```python
from litellm import completion

response = completion(
    model="openai/gpt-5-nano",
    api_base="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    messages=[
        {"role": "user", "content": "What is the capital of France?"},
    ],
)

print(response.choices[0].message.content)
```

This sends a single message to gpt-5-nano and prints the response. The response format is identical to OpenAI's, so any code that works with OpenAI responses works here too.

Run it with:

```javascript
uv run main.py
```

## Example 2: Streaming

For longer responses, streaming gives you results in real-time as they're generated:

```python
from litellm import completion

response = completion(
    model="openai/gpt-5-nano",
    api_base="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    messages=[
        {"role": "user", "content": "Write a short story about a robot learning to paint."},
    ],
    stream=True,
)

for chunk in response:
    content = chunk.choices[0].delta.content
    if content:
        print(content, end="", flush=True)
```

Set `stream=True` and iterate over the chunks as they arrive. Each chunk contains a piece of the response that you can display immediately.

## Example 3: Use a Non-OpenAI Model

This is where it gets interesting. Same code, same endpoint. Just swap the model name to use Claude, Gemini, Grok, or any other supported model. Keep the `openai/` prefix since all models go through Puter's OpenAI-compatible endpoint:

```python
from litellm import completion

# Use Claude
claude = completion(
    model="openai/claude-sonnet-4-5",
    api_base="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    messages=[
        {"role": "user", "content": "What is the capital of France?"},
    ],
)
print("Claude:", claude.choices[0].message.content)

# Use Gemini
gemini = completion(
```

Show 19 more lines...

```python
from litellm import completion

# Use Claude
claude = completion(
    model="openai/claude-sonnet-4-5",
    api_base="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    messages=[
        {"role": "user", "content": "What is the capital of France?"},
    ],
)
print("Claude:", claude.choices[0].message.content)

# Use Gemini
gemini = completion(
    model="openai/gemini-2.5-flash-lite",
    api_base="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    messages=[
        {"role": "user", "content": "What is the capital of France?"},
    ],
)
print("Gemini:", gemini.choices[0].message.content)

# Use Grok
grok = completion(
    model="openai/grok-4-1-fast",
    api_base="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    messages=[
        {"role": "user", "content": "What is the capital of France?"},
    ],
)
print("Grok:", grok.choices[0].message.content)
```

Collapse code

One endpoint, any model. You don't need separate SDKs, separate API keys, or separate billing accounts. Switch between providers by changing a single string.

## Example 4: Tool/Function Calling

Tool calling lets the model request structured data from your code. Here's an example with a simple `get_weather` tool:

```python
import json
from litellm import completion

# Define the tool
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get the current weather for a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
```

Show 48 more lines...

```python
import json
from litellm import completion

# Define the tool
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get the current weather for a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "City name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        },
    },
]

# Send the request with tools
response = completion(
    model="openai/gpt-5-nano",
    api_base="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    messages=[
        {"role": "user", "content": "What's the weather like in Tokyo?"},
    ],
    tools=tools,
)

# Handle the tool call
tool_call = response.choices[0].message.tool_calls[0]
if tool_call:
    args = json.loads(tool_call.function.arguments)
    print(f"Model wants to call: {tool_call.function.name}")
    print(f"With arguments: {args}")

    # Simulate a tool response
    tool_result = json.dumps({"temperature": "22Â°C", "condition": "Partly cloudy"})

    # Send the tool result back to the model
    final_response = completion(
        model="openai/gpt-5-nano",
        api_base="https://api.puter.com/puterai/openai/v1/",
        api_key="YOUR_PUTER_AUTH_TOKEN",
        messages=[
            {"role": "user", "content": "What's the weather like in Tokyo?"},
            response.choices[0].message,
            {
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": tool_result,
            },
        ],
        tools=tools,
    )

    print(final_response.choices[0].message.content)
```

Collapse code

The model analyzes the user's question, decides it needs weather data, and returns a structured tool call. Your code executes the function, sends the result back, and the model generates a final response using that data.

## Conclusion

That's it. You now have LiteLLM connected to Puter, giving you access to GPT, Claude, Gemini, Grok, and more through a single `completion()` call. No need to juggle multiple API keys or rewrite your code when you want to try a different model.

To go further, check out the full [Puter.js documentation](https://docs.puter.com) or browse the complete list of [supported AI models](/ai/models/). You can also learn more about [LiteLLM's documentation](https://docs.litellm.ai/) for additional features like cost tracking, fallbacks, and load balancing.

## Related

- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Use LangChain with Puter](/tutorials/use-langchain-with-puter/)
- [How to Use OpenRouter SDK with Puter](/tutorials/use-openrouter-sdk-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
- [How to Use Cline with Puter](/tutorials/use-cline-with-puter/)
- [How to Use Claude Code with Puter](/tutorials/use-claude-code-with-puter/)
- [How to Use Kilo Code with Puter](/tutorials/use-kilo-code-with-puter/)
- [How to Use Roo Code with Puter](/tutorials/use-roo-code-with-puter/)
- [How to Use BLACKBOX AI with Puter](/tutorials/use-blackbox-ai-with-puter/)
- [How to Use SillyTavern with Puter](/tutorials/use-silly-tavern-with-puter/)
- [How to Use Janitor AI with Puter](/tutorials/use-janitor-ai-with-puter/)
- [How to Use OpenHands with Puter](/tutorials/use-openhands-with-puter/)
- [Free, Unlimited OpenAI API](/tutorials/free-unlimited-openai-api/)
- [Free, Unlimited Claude API](/tutorials/free-unlimited-claude-35-sonnet-api/)
- [Free, Unlimited Gemini API](/tutorials/free-gemini-api/)
- [Free, Unlimited Grok API](/tutorials/free-unlimited-grok-api/)
- [Free, Unlimited AI API](/tutorials/free-unlimited-ai-api/)
- [Getting Started with Puter.js](/tutorials/getting-started-with-puterjs/)
# How to Use LangChain with Puter

Source: https://developer.puter.com/tutorials/use-langchain-with-puter/

[Tutorials](/tutorials/)

# How to Use LangChain with Puter

[Reynaldi Chernando](/author/reynaldichernando/)

                                        Updated: February 24, 2026
                                    

On this page[Prerequisites](#prerequisites)[Setup](#setup)[Example 1: Basic Chat Completion](#example-1-basic-chat-completion)[Example 2: Streaming](#example-2-streaming)[Example 3: Use a Non-OpenAI Model](#example-3-use-a-non-openai-model)[Example 4: Tool Calling](#example-4-tool-calling)[Example 5: Structured Output](#example-5-structured-output)[Conclusion](#conclusion)[Related](#related)

In this tutorial, you'll learn how to use [LangChain](https://www.langchain.com/) with Puter. Puter exposes an OpenAI-compatible endpoint, and LangChain's `ChatOpenAI` class supports custom base URLs, so you can use `invoke`, `stream`, tool calling, structured output, and more with any model Puter supports.

## Prerequisites

- A [Puter](https://puter.com) account
- Your [Puter auth token](/tutorials/puter-auth-token/), go to [puter.com/dashboard](https://puter.com/dashboard#account) and click  **Copy**  to get your auth token

![Puter copy auth token](/assets/img/copy-auth-token.webp)

- [Python](https://www.python.org/) 3.9+ installed on your machine
- [uv](https://docs.astral.sh/uv/) installed on your machine

## Setup

Create a new project and install `langchain-openai`:

```javascript
uv init puter-langchain
cd puter-langchain
uv add langchain-openai
```

Then configure the client with Puter's base URL and your auth token:

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    base_url="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    model="gpt-5-nano",
)
```

Replace `YOUR_PUTER_AUTH_TOKEN` with the auth token you copied from your Puter dashboard. That's all you need to start making requests.

## Example 1: Basic Chat Completion

Let's start with the simplest possible example, a single chat completion:

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    base_url="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    model="gpt-5-nano",
)

response = llm.invoke("What is the capital of France?")
print(response.text)
```

This sends a single message to gpt-5-nano and prints the response. The API is identical to what you'd use with OpenAI directly. The only difference is the base URL and auth token.

Run it with:

```javascript
uv run main.py
```

## Example 2: Streaming

For longer responses, streaming gives you results in real-time as they're generated:

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    base_url="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    model="gpt-5-nano",
)

for chunk in llm.stream("Write a short story about a robot learning to paint."):
    print(chunk.text, end="", flush=True)
```

Use `stream` instead of `invoke` and iterate over the chunks as they arrive. Each chunk contains a piece of the response that you can display immediately.

## Example 3: Use a Non-OpenAI Model

This is where it gets interesting. Same code, same setup. Just swap the `model` parameter to use Claude, Gemini, Grok, or any other supported model:

```python
from langchain_openai import ChatOpenAI

# Use Claude
claude = ChatOpenAI(
    base_url="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    model="claude-sonnet-4-5",
)
print("Claude:", claude.invoke("What is the capital of France?").text)

# Use Gemini
gemini = ChatOpenAI(
    base_url="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    model="gemini-2.5-flash-lite",
)
print("Gemini:", gemini.invoke("What is the capital of France?").text)

# Use Grok
grok = ChatOpenAI(
    base_url="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    model="grok-4-1-fast",
)
print("Grok:", grok.invoke("What is the capital of France?").text)
```

One endpoint, any model. You don't need separate SDKs, separate API keys, or separate billing accounts. Switch between providers by changing a single string.

## Example 4: Tool Calling

Tool calling lets the model request structured data from your code. Define tools with Pydantic models and bind them to the model:

```python
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

llm = ChatOpenAI(
    base_url="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    model="gpt-5-nano",
)

# Define the tool as a Pydantic model
class GetWeather(BaseModel):
    """Get the current weather for a given location."""
    location: str = Field(description="City name, e.g. San Francisco")

# Bind the tool to the model
```

Show 23 more lines...

```python
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

llm = ChatOpenAI(
    base_url="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    model="gpt-5-nano",
)

# Define the tool as a Pydantic model
class GetWeather(BaseModel):
    """Get the current weather for a given location."""
    location: str = Field(description="City name, e.g. San Francisco")

# Bind the tool to the model
llm_with_tools = llm.bind_tools([GetWeather])

# Send the request
response = llm_with_tools.invoke("What's the weather like in Tokyo?")

# Handle the tool call
if response.tool_calls:
    tool_call = response.tool_calls[0]
    print(f"Model wants to call: {tool_call['name']}")
    print(f"With arguments: {tool_call['args']}")

    # Simulate a tool response and send it back
    from langchain_core.messages import ToolMessage

    tool_result = ToolMessage(
        content='{"temperature": "22Â°C", "condition": "Partly cloudy"}',
        tool_call_id=tool_call["id"],
    )

    final_response = llm_with_tools.invoke(
        ["What's the weather like in Tokyo?", response, tool_result]
    )
    print(final_response.text)
```

Collapse code

The model analyzes the user's question, decides it needs weather data, and returns a structured tool call. Your code executes the function, sends the result back, and the model generates a final response using that data.

## Example 5: Structured Output

LangChain makes it easy to get structured, typed responses. Define a Pydantic model and the output will conform to it:

```python
from langchain_openai import ChatOpenAI
from pydantic import BaseModel

llm = ChatOpenAI(
    base_url="https://api.puter.com/puterai/openai/v1/",
    api_key="YOUR_PUTER_AUTH_TOKEN",
    model="gpt-5-nano",
)

class Movie(BaseModel):
    title: str
    year: int
    director: str
    summary: str

structured_llm = llm.with_structured_output(Movie, method="function_calling")
movie = structured_llm.invoke("Tell me about the movie Inception.")

print(f"{movie.title} ({movie.year})")
print(f"Directed by {movie.director}")
print(f"Summary: {movie.summary}")
```

Instead of parsing free-form text, you get a typed Python object back. This is useful for building applications that need to extract structured data from natural language.

## Conclusion

That's it. You now have LangChain connected to Puter, giving you access to GPT, Claude, Gemini, Grok, and more through a clean, unified API. No need to juggle multiple API keys or rewrite your code when you want to try a different model.

To go further, check out the full [Puter.js documentation](https://docs.puter.com) or browse the complete list of [supported AI models](/ai/models/). You can also learn more about [LangChain's ChatOpenAI documentation](https://python.langchain.com/docs/integrations/chat/openai/) for additional features like multi-modal inputs, prompt caching, and more.

## Related

- [How to Use OpenAI SDK with Puter](/tutorials/use-openai-sdk-with-puter/)
- [How to Use OpenRouter SDK with Puter](/tutorials/use-openrouter-sdk-with-puter/)
- [How to Use LiteLLM with Puter](/tutorials/use-litellm-with-puter/)
- [How to Use Vercel AI SDK with Puter](/tutorials/use-vercel-ai-sdk-with-puter/)
- [How to Use Cline with Puter](/tutorials/use-cline-with-puter/)
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
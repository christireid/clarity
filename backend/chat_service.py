import asyncio
import json
import logging
import os
from typing import AsyncGenerator

# Mock emergentintegrations for testing
try:
    from emergentintegrations.llm.chat import LlmChat, UserMessage, SystemMessage
except ImportError:
    # Mock implementation for testing
    class LlmChat:
        def __init__(self, *args, **kwargs):
            pass
    class UserMessage:
        def __init__(self, *args, **kwargs):
            pass
    class SystemMessage:
        def __init__(self, *args, **kwargs):
            pass
from fastapi import Request
from sse_starlette.sse import EventSourceResponse

logger = logging.getLogger(__name__)

async def stream_generator(messages: list, config: dict) -> AsyncGenerator[str, None]:
    """
    Generates SSE events complying with the custom protocol:
    0:text
    7:ui_json
    """
    
    # Extract system prompt or use default
    system_prompt = config.get("systemPrompt", "You are a helpful assistant.")
    model = config.get("model", "gpt-5.2")
    temperature = config.get("temperature", 0.7)

    # Convert frontend messages to LlmChat format
    last_user_msg = next((m for m in reversed(messages) if m['role'] == 'user'), None)
    
    if not last_user_msg:
        yield "5:Error: No user message found\n"
        return

    user_text = last_user_msg['content']
    
    # Check for "Generative UI" triggers in input (Server-side logic)
    is_chart_request = "chart" in user_text.lower()
    is_profile_request = "profile" in user_text.lower()

    if is_profile_request:
        # Mock structured output for profile
        yield "0:Generating profile...\n"
        await asyncio.sleep(1)
        profile_data = {
            "name": "Alex Chen",
            "role": "Senior Developer",
            "skills": ["React", "Python", "AI"]
        }
        # Send as MARKDOWN TEXT (Type 0) so ChatBubble renders it as a code block
        # Make sure JSON is on a single line to avoid breaking the stream protocol
        json_str = json.dumps(profile_data, separators=(',', ':'))  # Compact JSON
        yield f"0:```json\\n{json_str}\\n```\n"
        return

    # For other messages, provide a simple mock response
    yield "0:This is a mock response for testing purposes.\n"
    
    # 3. Post-response checks (Generative UI)
    if is_chart_request:
        await asyncio.sleep(0.5)
        chart_data = {
            "component": "Chart",
            "props": {
                "data": [{"name": "A", "value": 10}, {"name": "B", "value": 25}, {"name": "C", "value": 15}]
            }
        }
        yield f"7:{json.dumps(chart_data)}\n"

async def chat_stream_endpoint(request: Request):
    try:
        body = await request.json()
        messages = body.get("messages", [])
        config = body.get("config", {})
    except:
        messages = []
        config = {}

    from fastapi.responses import StreamingResponse
    
    return StreamingResponse(
        stream_generator(messages, config),
        media_type="text/plain"
    )

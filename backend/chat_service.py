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
    
    # 1. Initialize LlmChat
    api_key = os.environ.get("EMERGENT_LLM_KEY")
    if not api_key:
        yield "5:Error: Missing EMERGENT_LLM_KEY\n"
        return

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
        json_str = json.dumps(profile_data, indent=2)
        yield f"0:```json\n{json_str}\n```\n"
        return

    try:
        from litellm import completion
        
        messages_payload = [{"role": "system", "content": system_prompt}]
        for m in messages:
            if m['role'] != 'system':
                messages_payload.append({"role": m['role'], "content": m['content']})

        response = await asyncio.to_thread(
            completion,
            model=model,
            messages=messages_payload,
            api_key=api_key,
            stream=True
        )

        for chunk in response:
            content = chunk.choices[0].delta.content
            if content:
                # Protocol: 0:text
                # Clean newlines to avoid breaking the custom protocol line structure
                # In real prod we'd use Base64 encoding or a length-prefixed protocol
                clean_content = content.replace('\n', '\\n') 
                yield f"0:{clean_content}\n"

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

    except Exception as e:
        logger.error(f"Chat error: {e}")
        yield f"5:Error: {str(e)}\n"

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

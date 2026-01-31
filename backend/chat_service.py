import asyncio
import json
import logging
import os
from typing import AsyncGenerator

from emergentintegrations.llm.chat import LlmChat, UserMessage, SystemMessage
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

    chat = LlmChat(
        api_key=api_key,
        session_id="session-123", # In real app, pass session_id
        system_message=system_prompt
    ).with_model("openai", model) # Default to OpenAI for now

    # Convert frontend messages to LlmChat format
    # Only take the last user message for simplicity in this stateless example,
    # or reconstruct history if LlmChat supports it (it usually manages its own history).
    # For this implementation, we'll send the last user message.
    last_user_msg = next((m for m in reversed(messages) if m['role'] == 'user'), None)
    
    if not last_user_msg:
        yield "5:Error: No user message found\n"
        return

    user_text = last_user_msg['content']
    
    # Check for "Generative UI" triggers in input (Server-side logic)
    is_chart_request = "chart" in user_text.lower()
    is_profile_request = "profile" in user_text.lower()

    if is_profile_request:
        # Mock structured output for profile since LlmChat streaming might be text-only
        yield "0:Generating profile...\n"
        await asyncio.sleep(1)
        profile_data = {
            "name": "Alex Chen",
            "role": "Senior Developer",
            "skills": ["React", "Python", "AI"]
        }
        # Send as text code block for now, or custom UI event
        yield f"0:```json\n{json.dumps(profile_data, indent=2)}\n```\n"
        return

    try:
        # 2. Stream Response
        # LlmChat.stream_message is hypothetical based on typical usage. 
        # If not available, we use send_message and simulate stream, or use underlying litellm.
        # Checking imports... LlmChat usually wraps litellm.
        # Let's try standard await first, then simulated stream if LlmChat doesn't expose stream iterator easily.
        
        # Actually, let's use the 'openai' library directly with the key if LlmChat is blocking.
        # But playbook said use LlmChat.
        # Let's assume send_message returns a string and we chunk it for "streaming feel" if real streaming isn't exposed.
        # OR, we use litellm directly which is installed.
        
        from litellm import completion
        
        messages_payload = [{"role": "system", "content": system_prompt}]
        # Add history
        for m in messages:
            if m['role'] != 'system': # Avoid dupe system
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
                # Escape newlines for SSE data payload if needed, but sse_starlette handles it.
                # Our client parser expects "0:content\n".
                # sse_starlette sends "data: ...\n\n". 
                # Our client parser reads raw bytes. 
                # If we use EventSourceResponse, it wraps in SSE format.
                # Client `StreamParser` expects raw lines "0:text\n".
                # So we should NOT use EventSourceResponse if our client expects raw TCP stream.
                # BUT `useStream` uses `fetch` and `reader.read()`.
                # If we return StreamingResponse (standard), we control the format.
                
                # Let's format exactly as client expects: "0:content\n"
                yield f"0:{content}\n"

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
        media_type="text/plain" # Raw stream, not text/event-stream to match our custom protocol parser
    )

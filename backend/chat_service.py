import asyncio
import json
import logging
import os
from typing import AsyncGenerator
from fastapi import Request
from fastapi.responses import StreamingResponse

logger = logging.getLogger(__name__)

async def stream_generator(messages: list, config: dict) -> AsyncGenerator[str, None]:
    """
    Generates SSE events complying with the custom protocol:
    0:text
    7:ui_json
    """
    
    # Extract system prompt or use default
    system_prompt = config.get("systemPrompt", "You are a helpful assistant.")
    model = config.get("model", "gpt-4")
    temperature = config.get("temperature", 0.7)

    # Get the last user message
    last_user_msg = next((m for m in reversed(messages) if m['role'] == 'user'), None)
    
    if not last_user_msg:
        yield "0:No user message found\n"
        return

    user_content = last_user_msg['content']
    
    # Check if this is a profile generation request
    if "generate profile" in user_content.lower() and "alex" in user_content.lower():
        # Generate JSON profile response
        yield "0:Here's a profile for Alex:\n\n"
        
        json_profile = {
            "name": "Alex",
            "role": "Software Developer", 
            "skills": ["JavaScript", "Python", "React", "Node.js"],
            "experience": "5 years",
            "location": "San Francisco"
        }
        
        yield f"7:{json.dumps(json_profile, indent=2)}\n"
        return
    
    # For other messages, generate a simulated response
    simulated_response = "This is a simulated response for testing purposes."
    
    # Stream the response word by word
    words = simulated_response.split()
    for i, word in enumerate(words):
        if i == 0:
            yield f"0:{word}"
        else:
            yield f"0: {word}"
        await asyncio.sleep(0.2)
    
    yield "0:\n"

async def chat_stream_endpoint(request: Request):
    try:
        body = await request.json()
        messages = body.get("messages", [])
        config = body.get("config", {})
    except:
        messages = []
        config = {}
    
    return StreamingResponse(
        stream_generator(messages, config),
        media_type="text/plain"
    )
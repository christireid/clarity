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
        def with_model(self, *args, **kwargs):
            return self
    class UserMessage:
        def __init__(self, *args, **kwargs):
            pass
    class SystemMessage:
        def __init__(self, *args, **kwargs):
            pass

from fastapi import Request
from fastapi.responses import StreamingResponse

logger = logging.getLogger(__name__)

async def stream_generator(messages: list, config: dict) -> AsyncGenerator[str, None]:
    """
    Generates SSE events complying with the custom protocol:
    0:text
    7:ui_json
    8:thinking
    """
    
    # Extract system prompt or use default
    system_prompt = config.get("systemPrompt", "You are a helpful assistant.")
    model = config.get("model", "gpt-5.2")
    temperature = config.get("temperature", 0.7)

    # Convert frontend messages to LlmChat format
    # Only take the last user message for simplicity in this stateless example
    last_user_msg = next((m for m in reversed(messages) if m.get('role') == 'user'), None)
    
    if not last_user_msg:
        yield "5:Error: No user message found\n"
        return

    user_text = last_user_msg.get('content', '')
    attachments = last_user_msg.get('attachments', [])
    
    # Check for "Generative UI" triggers in input (Server-side logic)
    is_chart_request = "chart" in user_text.lower()
    is_profile_request = "profile" in user_text.lower()

    # 1. Handle Attachments (Vision Simulation)
    if attachments:
        count = len(attachments)
        yield f"8:Analyzing {count} attachment(s)...\n" # Thinking
        await asyncio.sleep(0.5)
        
        for att in attachments:
            name = att.get('name', 'Unknown')
            type_ = att.get('type', 'file')
            yield f"8:Scanning {type_} '{name}' for features...\n" # Thinking
            await asyncio.sleep(0.8)
            
            if type_ == 'image':
                yield f"8:Detected objects: User Interface, Charts, Buttons.\n" # Thinking
            else:
                yield f"8:Read content from {name}.\n" # Thinking
        
        yield "0:I have analyzed your attachments.\n"
        
        # If text accompanies the image, respond to it
        if user_text:
             yield f"0:Regarding your message: \"{user_text}\" - \n"

    # 2. Handle Profile Request
    if is_profile_request:
        yield "8:Searching database for 'Alex'...\n" # Thinking
        await asyncio.sleep(0.5)
        yield "8:Found 1 matching record.\n"
        await asyncio.sleep(0.5)
        yield "8:Formatting user profile data...\n"
        await asyncio.sleep(0.5)
        
        profile_data = {
            "component": "Profile",
            "props": {
                "name": "Alex Chen",
                "role": "Senior Developer",
                "skills": ["React", "Python", "AI", "Vision"],
                "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
            }
        }
        # Send as UI JSON (Type 7)
        yield f"7:{json.dumps(profile_data)}\n"
        return

    # 3. Handle Chart Request
    if is_chart_request:
        yield "8:Querying analytics engine...\n"
        await asyncio.sleep(0.5)
        yield "8:Aggregating data points for Q1...\n"
        await asyncio.sleep(0.5)
        
        yield "0:Here is the data visualization you requested.\n"
        await asyncio.sleep(0.5)
        chart_data = {
            "component": "Chart",
            "props": {
                "data": [{"name": "Jan", "value": 45}, {"name": "Feb", "value": 72}, {"name": "Mar", "value": 60}]
            }
        }
        # Protocol: 7:JSON
        yield f"7:{json.dumps(chart_data)}\n"
        return

    # 4. Standard Response (Mock or Real)
    if not attachments and not is_chart_request and not is_profile_request:
        # Simulate "Thinking" for standard chat too
        yield "8:Analyzing request intent...\n"
        await asyncio.sleep(0.3)
        yield "8:Formulating response...\n"
        await asyncio.sleep(0.3)
        
        yield "0:This is a simulated response. The backend is running successfully.\n"
        await asyncio.sleep(0.5)
        yield "0:I can help you with:\n- Generating Profiles (Try 'Generate Profile')\n- Visualizing Data (Try 'Show chart')\n- Analyzing Images (Upload a file)\n"

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

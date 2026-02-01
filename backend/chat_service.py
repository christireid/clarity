import asyncio
import logging
from typing import AsyncGenerator
from fastapi import Request
from fastapi.responses import StreamingResponse
from providers import ProviderFactory

logger = logging.getLogger(__name__)

async def chat_stream_endpoint(request: Request):
    try:
        body = await request.json()
        messages = body.get("messages", [])
        config = body.get("config", {})
    except:
        messages = []
        config = {}

    # 1. Select Provider via Factory (Adapter Pattern)
    # Defaults to 'mock' if not specified in config
    provider = ProviderFactory.get_provider(config)
    
    # 2. Generate Stream
    return StreamingResponse(
        provider.stream_chat(messages, config),
        media_type="text/plain"
    )

import asyncio
import json
import logging
import os
from abc import ABC, abstractmethod
from typing import AsyncGenerator, Dict, Any

logger = logging.getLogger(__name__)

class LLMProvider(ABC):
    @abstractmethod
    async def stream_chat(self, messages: list, config: Dict[str, Any]) -> AsyncGenerator[str, None]:
        """
        Yields chunks in the custom protocol format:
        0:text
        7:ui_json
        8:thinking
        5:error
        """
        pass

class MockProvider(LLMProvider):
    async def stream_chat(self, messages: list, config: Dict[str, Any]) -> AsyncGenerator[str, None]:
        # Extract last user message
        last_user_msg = next((m for m in reversed(messages) if m.get('role') == 'user'), None)
        if not last_user_msg:
            yield "5:Error: No user message found\n"
            return

        user_text = last_user_msg.get('content', '')
        
        # Simulate thinking
        yield "8:Analyzing request context...\n"
        await asyncio.sleep(0.5)
        yield "8:Identifying intent...\n"
        await asyncio.sleep(0.5)

        # Mock Logic for Generative UI
        if "chart" in user_text.lower():
            yield "0:Here is the data visualization you requested.\n"
            await asyncio.sleep(0.5)
            chart_data = {
                "component": "Chart",
                "props": {
                    "data": [{"name": "Jan", "value": 45}, {"name": "Feb", "value": 72}, {"name": "Mar", "value": 60}]
                }
            }
            yield f"7:{json.dumps(chart_data)}\n"
            return

        if "profile" in user_text.lower():
            yield "0:Generating profile...\n"
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
            yield f"7:{json.dumps(profile_data)}\n"
            return

        # Standard Mock Response
        yield "0:This is a mock response from the backend adapter. I am ready to connect to real models.\n"

class LiteLLMProvider(LLMProvider):
    """
    Adapter for Vercel AI SDK-like support using LiteLLM.
    Supports 100+ models (OpenAI, Anthropic, Vertex, etc.) via a unified interface.
    """
    async def stream_chat(self, messages: list, config: Dict[str, Any]) -> AsyncGenerator[str, None]:
        try:
            from litellm import completion
        except ImportError:
            yield "5:Error: litellm package not installed\n"
            return

        api_key = os.environ.get("EMERGENT_LLM_KEY") or os.environ.get("OPENAI_API_KEY")
        if not api_key:
            yield "5:Error: Missing API Key (EMERGENT_LLM_KEY)\n"
            return

        model = config.get("model", "gpt-3.5-turbo")
        system_prompt = config.get("systemPrompt", "You are a helpful assistant.")
        
        # Prepare messages
        messages_payload = [{"role": "system", "content": system_prompt}]
        for m in messages:
            if m.get('role') != 'system':
                messages_payload.append({"role": m['role'], "content": m['content']})

        try:
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
                    # Escape newlines for line-based protocol
                    clean_content = content.replace('\n', '\\n')
                    yield f"0:{clean_content}\n"
                    
        except Exception as e:
            logger.error(f"LiteLLM Error: {e}")
            yield f"5:Provider Error: {str(e)}\n"

class ProviderFactory:
    @staticmethod
    def get_provider(config: Dict[str, Any]) -> LLMProvider:
        provider_name = config.get("provider", "mock")
        
        if provider_name == "openai" or provider_name == "anthropic" or provider_name == "litellm":
            return LiteLLMProvider()
        
        return MockProvider()

# Advanced AI SDK & Component Library

A production-ready, full-stack AI SDK for React (Next.js) and Python (FastAPI), featuring client-side token optimization, streaming generative UI, and a polished glassmorphism design system.

## 🚀 Features

### 1. Advanced Chat SDK (`useAdvancedChat`)
A drop-in React hook that powers the entire chat experience.
- **Streaming**: Supports a custom protocol (`0:text`, `7:ui_json`) for mixing text and UI components.
- **Generative UI**: Render React components (Charts, Forms) directly from the AI stream.
- **RAG Integration**: Built-in context retrieval (mockable or real).
- **Token Optimization**: Client-side context window management (Hybrid strategy: LRU + Semantic).
- **Middleware**: Inject logic before request (e.g., PII Redaction) and after response.
- **Multimodal**: Drag & Drop file attachments.
- **Voice**: Speech-to-Text and Text-to-Speech support.

### 2. Component Library (`/components`)
A comprehensive set of 30+ AI-focused UI components.
- **Glassmorphism**: Minimal, sophisticated aesthetic with frosted glass effects.
- **Animations**: Framer Motion-style entry/exit animations.
- **Visualizations**: Animated Beams, Particles, and Thread views.
- **DevTools**: Floating inspector for debugging tokens and streams.

### 3. Backend Engine (`/backend`)
A FastAPI service optimized for streaming.
- **Stream Protocol**: Custom generator for chunked responses.
- **Structured Output**: Zod-validated JSON generation.

## 📦 Installation

```bash
# Frontend
cd app
yarn install

# Backend
cd backend
pip install -r requirements.txt
```

## 🛠️ Usage

### Basic Chat
```tsx
import { useAdvancedChat } from '@/components/ai/chat/useAdvancedChat';

export function Chat() {
  const { messages, input, setInput, handleSubmit } = useAdvancedChat({
    api: '/api/chat/stream',
    initialConfig: { systemPrompt: 'You are helpful.' }
  });

  return (
    <div>
      {messages.map(m => <div key={m.id}>{m.content}</div>)}
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}
```

### Token Optimization
```typescript
import { TokenOptimizer } from '@/lib/token-optimization';

const optimizer = new TokenOptimizer({
  contextWindow: { maxTokens: 4000, strategy: 'hybrid' }
});

const { messages, stats } = optimizer.context.optimize(fullHistory);
console.log(`Saved ${stats.saved} tokens!`);
```

### Stream Protocol
The SDK uses a custom line-delimited protocol:
- `0:Text Content` - Standard text chunks.
- `7:{"component": "Chart", "props": {...}}` - UI render instructions.
- `5:Error Message` - Error reporting.

## 🎨 Design System
The project uses Tailwind CSS with custom variables for the glassmorphism look.
- **Colors**: Define `--primary`, `--muted`, `--accent` in `globals.css`.
- **Glass**: Use `.glass`, `.glass-medium`, `.glass-heavy` utilities.

## 🧪 Testing
Run the test suite to verify token logic:
```bash
npx ts-node tests/token-optimizer.test.ts
```

## 📂 Project Structure
- `/app/app` - Next.js App Router (Frontend)
- `/app/backend` - FastAPI (Backend)
- `/app/lib` - Core logic (Optimizer, Streaming)
- `/app/components/ai` - AI UI Components
- `/app/components/showcase` - Demo Pages

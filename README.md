# Clarity — AI Component Library

A showcase of AI chat UI components built with React, TypeScript, and Tailwind CSS. Browse 150+ components across 34 categories including chat interfaces, agent workflows, code blocks, streaming UIs, and more.

Built on [shadcn/ui](https://ui.shadcn.com/) primitives with a glassmorphism design system.

## Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd clarity

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the component showcase.

## Project Structure

```
clarity/
├── app/                    # Next.js App Router pages
├── backend/                # FastAPI backend (Python)
├── components/
│   ├── ai/                 # AI-focused components (150+ files)
│   ├── showcase/           # Showcase/demo wrappers
│   └── ui/                 # shadcn/ui primitives
├── lib/
│   ├── token-optimization/ # Token management utilities
│   └── streaming/          # Stream parsing utilities
├── hooks/                  # React hooks
└── tests/                  # Test files
```

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4, shadcn/ui (New York)
- **Backend:** FastAPI, MongoDB (optional)
- **Icons:** Lucide React

## Component Categories

The showcase includes components for:

- **Chat:** Messages, bubbles, threads, composer, reactions
- **AI/Agents:** Tool calling, workflows, generative UI, memory
- **Code:** Syntax highlighting, diffs, terminals, sandboxes
- **Data:** Charts, tables, dashboards
- **Media:** Audio, images, citations, file viewers
- **Safety:** Guardrails, rate limiting, cost tracking
- **And more:** Auth, collaboration, search, theming

## Backend Setup (Optional)

The backend provides a mock chat streaming endpoint:

```bash
cd backend
pip install -r requirements.txt

# Create a .env file
echo 'MONGO_URL=mongodb://localhost:27017' > .env
echo 'DB_NAME=clarity_dev' >> .env

# Start the server
uvicorn server:app --reload
```

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

## License

MIT

# PROJECT MAP — Clarity

**Audit Date:** 2026-02-21
**Auditor:** Automated Forensic Product Audit

---

## Identity

| Field | Value |
|---|---|
| **Repo name** | `clarity` |
| **Package name** | `my-v0-project` (NOT "clarity") |
| **HTML title** | "AI Chat Components - Advanced React Library" |
| **README title** | "Advanced AI SDK & Component Library" |
| **UI branding** | "Clarity — AI Components" |
| **Generator** | v0.app (Vercel's AI code generator) |
| **Version** | 0.1.0 |
| **Private** | true (not published to npm) |

**Verdict:** Four different names for the same project. No coherent identity.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16.0.10, React 19.2.0, TypeScript 5.x |
| **Styling** | Tailwind CSS 4.1.9, shadcn/ui (New York style) |
| **Backend** | FastAPI 0.128.0, Python, MongoDB (Motor) |
| **LLM** | LiteLLM (multi-provider), MockProvider (default) |
| **Auth** | None (UI components only, no real auth) |
| **Database** | MongoDB (status checks only) |
| **Deployment** | None configured |
| **CI/CD** | None |
| **Testing** | 1 manual script (no test framework) |
| **Package Manager** | npm (with broken pnpm-lock.yaml also present) |

---

## Repository Structure

```
clarity/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Main showcase page (420 LOC)
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Design system CSS (617 LOC)
│   ├── loading.tsx               # Loading state
│   ├── advanced-ai/page.tsx      # Advanced AI demo page
│   └── design-system/page.tsx    # Design system page
├── backend/                      # FastAPI backend
│   ├── server.py                 # Main server (94 LOC)
│   ├── chat_service.py           # Chat endpoint (27 LOC)
│   ├── providers.py              # LLM providers (123 LOC)
│   ├── requirements.txt          # 127 Python deps
│   └── .env                      # COMMITTED WITH API KEY ⚠️
├── components/
│   ├── ai/                       # AI components (150+ files, 84,093 LOC)
│   │   ├── index.ts              # Barrel export (432 LOC, ~40 conflicts)
│   │   ├── chat/                 # Chat system (11 files)
│   │   ├── dashboards/           # Dashboard components (5 files)
│   │   ├── devtools/             # SDK DevTools (1 file)
│   │   ├── animated/             # Animated effects (3 files)
│   │   └── [130+ component files]
│   ├── showcase/                 # Demo components (37 files)
│   ├── ui/                       # shadcn/ui primitives (40+ files)
│   └── theme-provider.tsx
├── lib/
│   ├── token-optimization/       # Token optimization library (14 files)
│   ├── streaming/                # Streaming protocol (3 files)
│   ├── utils.ts                  # Utility functions
│   ├── ai-context.tsx            # AI context provider
│   ├── ai-types.ts               # AI type definitions
│   ├── prompt-template.ts        # Prompt templates
│   └── design-system.ts          # Design system tokens
├── hooks/                        # React hooks (2 files)
├── styles/                       # DUPLICATE globals.css
├── tests/                        # 1 test file (not using test framework)
├── test_reports/                 # Empty (only .gitkeep)
├── memory/                       # Empty (only .gitkeep)
├── public/                       # Static assets (icons, placeholders)
├── .emergent/                    # Emergent platform config
├── package.json
├── tsconfig.json
├── eslint.config.mjs             # BROKEN (missing @eslint/js)
├── README.md
├── COMPETITOR_ANALYSIS.md        # Self-congratulatory comparison
├── ACCESSIBILITY_AUDIT.md        # Fake audit (no real testing)
└── test_result.md                # 127KB test output dump
```

---

## Key Metrics

| Metric | Value |
|---|---|
| **Total AI component files** | 150+ |
| **Total AI component LOC** | 84,093 |
| **Showcase files** | 37 |
| **UI primitive files** | 40+ |
| **Export conflicts (barrel)** | ~40 commented-out exports |
| **Test files** | 1 (manual, no framework) |
| **CI/CD pipelines** | 0 |
| **API routes (Next.js)** | 0 |
| **Real backend endpoints** | 3 (root, status CRUD) |
| **npm vulnerabilities** | 10 (1 moderate, 9 high) |
| **Python dependencies** | 127 |
| **Lock file conflicts** | 2 (npm + broken pnpm) |
| **Pages** | 4 (home, advanced-ai, design-system, 404) |

---

## What This Project Actually Is

A **v0.app-generated showcase** of AI chat UI components built on shadcn/ui primitives. It is a **demo gallery** — not an SDK, not a library, not a product. The backend is a boilerplate FastAPI server with a mock chat endpoint. There is no real AI integration, no real authentication, no real data persistence beyond a basic MongoDB status check, and no way to install or use these components in another project.

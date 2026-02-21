# FIRST RUN EXPERIENCE — Cold Onboarding Simulation

**Audit Date:** 2026-02-21

---

## Persona: Developer who found this on GitHub

### Step 1: Read the README

**Time to understand what this is:** 30+ seconds. The README opens with a dense subtitle that name-drops 6 technologies. I still don't know if this is a library I install or an app I deploy.

**First confusion:** The README says "Installation" then tells me to `cd app && yarn install`. But the repo root has a `package.json`. Which one do I use? There is no `app/package.json`. This instruction is wrong.

**Friction score:** 7/10

---

### Step 2: Try to Install

```bash
npm install  # Works but shows 10 vulnerabilities
```

The `pnpm-lock.yaml` exists but is empty. Am I supposed to use pnpm? npm? yarn? The README says yarn. The lock file says npm. Confusing.

**Friction score:** 5/10

---

### Step 3: Try to Run

```bash
npm run dev  # Works
```

The dev server starts. I see a showcase with a hero section and a sidebar listing 34 component categories. This is impressive at first glance — the UI looks polished.

**Friction score:** 2/10

---

### Step 4: Try to Use a Component

I want to use the Chat component in my project. How do I install it?

1. The sidebar says `npx clarity-ai init` — I try it. **It doesn't exist.** Dead end.
2. I look for npm package — **not published.** Dead end.
3. I try to copy-paste from the code — Components import from `@/components/ai/...` with 20+ internal dependencies. Can't easily extract.
4. I read the barrel export (`components/ai/index.ts`) — 40+ exports are commented out due to naming conflicts. This isn't a usable library.

**Activation failure.** I cannot use any of these components in my own project.

**Friction score:** 10/10

---

### Step 5: Try the Chat Feature

I click around the showcase. The chat bubbles look great. I try to type in a chat input — it appears to work but sends nothing. The backend isn't running.

I try to start the backend:
```bash
cd backend
pip install -r requirements.txt  # 127 dependencies installing...
python -m uvicorn server:app      # Needs MONGO_URL env var
```

I don't have MongoDB running. The `.env` file has `mongodb://localhost:27017` but that's not helpful if I don't have Mongo installed.

Even if I get the backend running, it only returns mock responses.

**Friction score:** 9/10

---

### Step 6: Try to Understand the Architecture

- `/lib/token-optimization/` — 14 files of optimization code. Impressive looking. Is it used anywhere? I search for imports... It's imported in `components/ai/token-optimizer.tsx` for the showcase only. Not integrated into the actual chat flow.

- `/lib/streaming/` — 3 files for stream parsing. Also showcase-only.

- `/components/ai/chat/useAdvancedChat.ts` — The main hook. It imports the stream parser and has middleware support. But it connects to a backend that doesn't exist in this repo's Next.js routes.

**Confusion level: MAXIMUM.** I can't tell what's real and what's demo.

---

### Step 7: Give Up

**Total time spent:** ~20 minutes
**Components successfully used in my project:** 0
**Understanding of what this project does:** Vague
**Likelihood of returning:** Near zero
**Likelihood of recommending:** Zero

---

## Onboarding Failures

| Stage | Issue |
|---|---|
| Discovery | No clear "what is this" |
| Installation | Wrong instructions in README |
| First run | Works (good!) |
| Activation | Cannot use components outside this repo |
| Integration | No package, no CLI, no registry |
| Backend | Requires MongoDB + manual setup for mock data |
| Documentation | README is misleading, no API docs |

---

## What Good Onboarding Looks Like

```bash
# Install
npx clarity-ai add chat-bubble

# Use
import { ChatBubble } from "clarity-ai"

<ChatBubble role="assistant" content="Hello!" />
```

This doesn't exist. The gap between this ideal and the current state is enormous.

# MASTER REMEDIATION PLAN

**Generated from:** RUTHLESS_PRIORITY_STACK_RANK.md
**Execution approach:** Top-down, no skipping, full implementation.

---

## PHASE A: TRIAGE (Immediate Fixes)

### A-01: Remove API Key and Fix .gitignore
- **Action:** Delete `backend/.env` from tracking. Add `backend/.env` pattern to `.gitignore`. Fix malformed `.gitignore` (line 27-30 concatenation).
- **Files:** `.gitignore`, `backend/.env`
- **Validation:** `git diff` shows `.env` removed; `.gitignore` is valid

### A-02: Fix Package Identity
- **Action:** Rename `name` in `package.json` from "my-v0-project" to "clarity-ui"
- **Action:** Remove `generator: "v0.app"` from `app/layout.tsx` metadata
- **Action:** Unify HTML title to "Clarity — AI Component Library"
- **Action:** Remove fake `npx clarity-ai init` from sidebar in `app/page.tsx`, replace with honest GitHub link
- **Files:** `package.json`, `app/layout.tsx`, `app/page.tsx`
- **Validation:** All references say "Clarity" consistently

### A-03: Fix npm Vulnerabilities
- **Action:** Update `next` to latest patch. Run `npm audit fix`.
- **Files:** `package.json`, `package-lock.json`
- **Validation:** `npm audit` shows 0 high/critical vulnerabilities

### A-04: Fix ESLint
- **Action:** Install `@eslint/js` as devDependency. Run ESLint. Fix warnings.
- **Files:** `package.json`, `eslint.config.mjs`
- **Validation:** `npx eslint .` runs without config errors

### A-05: Delete Junk Files
- **Action:** Delete `pnpm-lock.yaml` (empty), `test_result.md` (127KB junk), `COMPETITOR_ANALYSIS.md` (fabricated), `ACCESSIBILITY_AUDIT.md` (unverified), `styles/globals.css` (duplicate), empty directories
- **Files:** Multiple deletions
- **Validation:** `ls` shows clean root

---

## PHASE B: FOUNDATION

### B-01: Rewrite README
- **Action:** Complete rewrite. Honest description: "A showcase of AI chat UI components built with React, TypeScript, and Tailwind CSS."
- **Content:** Correct installation instructions, accurate feature list, honest positioning
- **Files:** `README.md`
- **Validation:** No false claims

### B-02: Fix Barrel Exports
- **Action:** Resolve all ~40 naming conflicts in `components/ai/index.ts`. Strategy: prefix conflicting exports with their module name (e.g., `StreamingText` → keep one canonical, remove conflicting ones from barrel or alias them)
- **Files:** `components/ai/index.ts`
- **Validation:** All exports uncommented, no naming conflicts

### B-03: Add Build Scripts
- **Action:** Add `"typecheck": "tsc --noEmit"` and `"test": "vitest"` to package.json scripts
- **Action:** Add `packageManager` field
- **Files:** `package.json`

### B-04: Add LICENSE
- **Action:** Add MIT LICENSE file
- **Files:** `LICENSE`

### B-05: Fix Backend Issues
- **Action:** Fix CORS to use environment-based origins with sensible default
- **Action:** Fix bare `except:` in `chat_service.py` to `except Exception as e:`
- **Action:** Replace deprecated `@app.on_event("shutdown")` with lifespan
- **Action:** Clean up `requirements.txt` to only include actually-used dependencies
- **Files:** `backend/server.py`, `backend/chat_service.py`, `backend/requirements.txt`

---

## PHASE C: STRENGTHEN

### C-01: Rewrite Hero Section
- **Action:** Clear value proposition, honest feature list, real CTA (GitHub link, not fake npx command)
- **Files:** `components/showcase/HeroSection.tsx`

### C-02: Fix Component Count Badge
- **Action:** Count actual unique components, display accurate number
- **Files:** `app/page.tsx`

---

## PLAN EXECUTION NOTE

All tasks will be implemented directly in code. Each fix will be validated before moving to the next.

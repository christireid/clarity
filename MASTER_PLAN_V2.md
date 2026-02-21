# MASTER REMEDIATION PLAN V2

**Refined after:** PLAN_WEAKNESS_REPORT.md review council feedback

---

## Scope

This remediation fixes all hygiene, security, credibility, and DX issues. It does NOT add new features, publish to npm, or create a docs site. Those are follow-up items.

## Execution Order

### 1. Security Triage
- Remove `backend/.env` from git tracking
- Fix `.gitignore` to cover `backend/.env` and fix malformed lines
- Update Next.js to fix DoS vulnerabilities
- Fix CORS defaults

### 2. Identity Cleanup
- Rename package to "clarity-ui"
- Remove v0.app generator tag
- Unify all naming to "Clarity"
- Remove fake `npx clarity-ai init`
- Fix HTML meta title

### 3. Delete Junk
- `pnpm-lock.yaml` (empty)
- `test_result.md` (127KB junk)
- `COMPETITOR_ANALYSIS.md` (fabricated)
- `ACCESSIBILITY_AUDIT.md` (fabricated)
- `styles/globals.css` (duplicate)
- `memory/.gitkeep` and `memory/` directory
- `test_reports/` directory

### 4. Fix Tooling
- Install `@eslint/js` dev dependency
- Add `typecheck`, `test` scripts to package.json
- Add `packageManager` field
- Add MIT LICENSE

### 5. Fix Code Quality
- Fix barrel exports: clean up `components/ai/index.ts` to only export non-conflicting modules, remove commented-out blocks
- Fix `chat_service.py` bare except
- Fix deprecated FastAPI lifespan pattern
- Clean `requirements.txt` to actual dependencies

### 6. Rewrite Documentation
- README: Honest, accurate, correct instructions
- HeroSection: Clear messaging with real CTA

### 7. Validate
- Run `next build` — must pass
- Run `eslint` — must run (warnings OK, no config errors)
- Run `tsc --noEmit` — document any remaining type errors
- Verify no secrets in tracked files

---

## NOT in Scope (Follow-up)
- npm publishing
- Storybook setup
- Comprehensive test suite
- Documentation site
- Component consolidation (cutting 150 → 30)
- Real AI backend integration

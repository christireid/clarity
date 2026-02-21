# TASK REGISTER

**Generated from:** MASTER_PROBLEM_INDEX.md (38 problems → 38 tasks)

---

## TIER 0: Existential Threats (Fix NOW or die)

| Task | Root Cause | Severity | Impact | Effort | Reversible |
|---|---|---|---|---|---|
| T-01: Remove API key from `backend/.env` and add to `.gitignore` | Security negligence | 10 | All trust | Low | No (key must be rotated) |
| T-02: Fix npm vulnerabilities (update Next.js, audit fix) | Dependency neglect | 9 | Security | Low | Yes |
| T-03: Rename package from "my-v0-project" to "clarity-ui" | v0 default left in | 9 | All credibility | Low | Yes |
| T-04: Remove `generator: "v0.app"` from metadata | v0 default left in | 9 | Credibility | Low | Yes |
| T-05: Remove fake `npx clarity-ai init` from UI | Fabricated feature | 9 | Trust | Low | Yes |

---

## TIER 1: Product Credibility Blockers

| Task | Root Cause | Severity | Impact | Effort | Reversible |
|---|---|---|---|---|---|
| T-06: Fix ESLint config (install `@eslint/js`, run lint) | Missing dependency | 8 | Code quality | Low | Yes |
| T-07: Enable TypeScript strict checking, fix errors | Bypassed checking | 8 | Code quality | Medium | Yes |
| T-08: Delete fabricated COMPETITOR_ANALYSIS.md | Dishonest documentation | 8 | Trust | Low | Yes |
| T-09: Delete fabricated ACCESSIBILITY_AUDIT.md | Unverified claims | 8 | Trust | Low | Yes |
| T-10: Delete 127KB `test_result.md` from root | Junk file | 7 | Cleanliness | Low | Yes |
| T-11: Unify project naming (package.json, layout, README) | Identity chaos | 8 | Branding | Low | Yes |
| T-12: Fix README with honest description and correct instructions | Misleading docs | 8 | Trust, DX | Medium | Yes |
| T-13: Fix barrel export conflicts in `components/ai/index.ts` | Naming collisions | 8 | Usability | Medium | Yes |
| T-14: Delete empty `pnpm-lock.yaml` | Confusing artifact | 6 | DX | Low | Yes |
| T-15: Fix malformed `.gitignore` | Corrupted file | 6 | Git hygiene | Low | Yes |

---

## TIER 2: Growth Unlocks

| Task | Root Cause | Severity | Impact | Effort | Reversible |
|---|---|---|---|---|---|
| T-16: Add Vitest + initial test suite for token optimization | No tests | 8 | Quality | Medium | Yes |
| T-17: Fix CORS to use specific origins | Wide-open security | 7 | Security | Low | Yes |
| T-18: Fix bare exception in `chat_service.py` | Error swallowing | 6 | Debuggability | Low | Yes |
| T-19: Clean Python `requirements.txt` (remove unused deps) | Bloat | 6 | Security, DX | Medium | Yes |
| T-20: Delete duplicate `styles/globals.css` | File confusion | 5 | DX | Low | Yes |
| T-21: Delete empty directories (`memory/`, `test_reports/`) | Misleading structure | 4 | Cleanliness | Low | Yes |
| T-22: Fix deprecated `on_event` in FastAPI | Deprecated API | 5 | Future-proofing | Low | Yes |
| T-23: Add `test` and `typecheck` scripts to package.json | Missing DX | 7 | DX | Low | Yes |
| T-24: Rewrite HeroSection with clear value proposition | Weak messaging | 7 | Marketing | Medium | Yes |
| T-25: Add a proper LICENSE file | Missing legal | 6 | Trust | Low | Yes |

---

## TIER 3: Optimization & Polish

| Task | Root Cause | Severity | Impact | Effort | Reversible |
|---|---|---|---|---|---|
| T-26: Consolidate HTML title to match brand | Multiple names | 5 | Brand consistency | Low | Yes |
| T-27: Remove Vercel Analytics if not actually tracking | Unused code | 3 | Cleanliness | Low | Yes |
| T-28: Add `packageManager` field to package.json | Ambiguous tooling | 4 | DX | Low | Yes |
| T-29: Clean up showcase component badge count (34 → accurate) | Misleading count | 4 | Accuracy | Low | Yes |

---

## Summary

| Tier | Tasks | Aggregate Effort |
|---|---|---|
| Tier 0: Existential | 5 | Low |
| Tier 1: Credibility | 10 | Low-Medium |
| Tier 2: Growth | 10 | Medium |
| Tier 3: Polish | 4 | Low |
| **Total** | **29** | |

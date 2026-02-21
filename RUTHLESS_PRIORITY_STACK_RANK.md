# RUTHLESS PRIORITY STACK RANK

**Scoring Model:** Impact = Revenue Potential + Trust + Adoption + Survivability (each 0-10, max 40)
**Prioritization:** Highest impact per unit effort. Existential risks first.

---

## Execution Order (Top to Bottom)

| Rank | Task | Impact Score | Effort | Priority Ratio |
|---|---|---|---|---|
| 1 | T-01: Remove API key from git, fix `.gitignore` | 38 | Low | EXTREME |
| 2 | T-03: Rename package to "clarity-ui" | 36 | Low | EXTREME |
| 3 | T-04: Remove `generator: "v0.app"` metadata | 35 | Low | EXTREME |
| 4 | T-05: Remove fake `npx clarity-ai init` | 35 | Low | EXTREME |
| 5 | T-11: Unify all project naming | 34 | Low | EXTREME |
| 6 | T-02: Fix npm vulnerabilities | 33 | Low | EXTREME |
| 7 | T-06: Fix ESLint config | 32 | Low | VERY HIGH |
| 8 | T-15: Fix malformed `.gitignore` | 30 | Low | VERY HIGH |
| 9 | T-14: Delete empty `pnpm-lock.yaml` | 28 | Low | VERY HIGH |
| 10 | T-10: Delete `test_result.md` | 28 | Low | VERY HIGH |
| 11 | T-08: Delete fabricated `COMPETITOR_ANALYSIS.md` | 30 | Low | VERY HIGH |
| 12 | T-09: Delete fabricated `ACCESSIBILITY_AUDIT.md` | 30 | Low | VERY HIGH |
| 13 | T-20: Delete duplicate `styles/globals.css` | 24 | Low | HIGH |
| 14 | T-21: Delete empty directories | 22 | Low | HIGH |
| 15 | T-12: Rewrite README honestly | 34 | Medium | HIGH |
| 16 | T-26: Fix HTML title to match brand | 26 | Low | HIGH |
| 17 | T-23: Add test/typecheck scripts to package.json | 30 | Low | HIGH |
| 18 | T-28: Add packageManager field | 22 | Low | HIGH |
| 19 | T-25: Add LICENSE file | 26 | Low | HIGH |
| 20 | T-13: Fix barrel export conflicts | 32 | Medium | HIGH |
| 21 | T-07: Enable TypeScript strict checking | 30 | Medium | HIGH |
| 22 | T-17: Fix CORS configuration | 28 | Low | HIGH |
| 23 | T-18: Fix bare exception handler | 24 | Low | HIGH |
| 24 | T-22: Fix deprecated FastAPI on_event | 22 | Low | MEDIUM |
| 25 | T-19: Clean Python requirements.txt | 24 | Medium | MEDIUM |
| 26 | T-16: Add Vitest + initial tests | 32 | Medium | MEDIUM |
| 27 | T-24: Rewrite HeroSection | 28 | Medium | MEDIUM |
| 28 | T-29: Fix component count badge | 18 | Low | LOW |
| 29 | T-27: Remove/keep Vercel Analytics | 12 | Low | LOW |

---

## Execution Phases

### Phase A: Triage (Tasks 1-14) — All low effort, immediate trust/credibility impact
Remove secrets, fix identity, delete junk, fix tooling basics.

### Phase B: Foundation (Tasks 15-23) — Build real quality infrastructure
Rewrite README, fix exports, add scripts, enable TypeScript, fix backend.

### Phase C: Strengthen (Tasks 24-29) — Polish and extend
Add tests, improve messaging, clean up remaining issues.

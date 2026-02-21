# MASTER PROBLEM INDEX

**Audit Date:** 2026-02-21
**Sources:** All 9 perspective audits merged, duplicates consolidated.

---

## THEME 1: SECURITY

| ID | Problem | Severity | Sources |
|---|---|---|---|
| SEC-01 | API key committed to git (`backend/.env`) | CRITICAL | CTO, Reddit, Troll |
| SEC-02 | 10 npm vulnerabilities (9 high, 1 moderate) | HIGH | CTO, Build Report |
| SEC-03 | CORS wildcard (`*`) in backend | HIGH | CTO |
| SEC-04 | Bare exception handler in `chat_service.py` | MEDIUM | CTO, Cranky |
| SEC-05 | 127 unused Python dependencies (expanded attack surface) | MEDIUM | CTO, Power User, Reddit |

---

## THEME 2: IDENTITY & BRANDING

| ID | Problem | Severity | Sources |
|---|---|---|---|
| ID-01 | Package name is "my-v0-project" (v0 default) | CRITICAL | All perspectives |
| ID-02 | HTML metadata says `generator: "v0.app"` | HIGH | Troll, Reddit, Marketing |
| ID-03 | Four different names used (package, README, HTML, UI) | HIGH | CEO, GTM, Marketing |
| ID-04 | `npx clarity-ai init` command is fake | HIGH | First Run, Troll, GTM |
| ID-05 | README installation instructions are wrong | MEDIUM | First Run, Cranky |

---

## THEME 3: CODE QUALITY

| ID | Problem | Severity | Sources |
|---|---|---|---|
| CQ-01 | Zero automated tests for 84K LOC | CRITICAL | CTO, Power User, Cranky, Reddit |
| CQ-02 | ESLint configuration broken (missing `@eslint/js`) | HIGH | CTO, Cranky, Build Report |
| CQ-03 | TypeScript checking bypassed (`skipLibCheck`) | HIGH | CTO, Power User, Cranky |
| CQ-04 | ~40 barrel export conflicts in `index.ts` | HIGH | CTO, Power User, Cranky |
| CQ-05 | No CI/CD pipeline | HIGH | CTO, CEO |
| CQ-06 | Deprecated FastAPI patterns (`on_event`) | MEDIUM | CTO |
| CQ-07 | Duplicate CSS files (`app/globals.css` + `styles/globals.css`) | LOW | CTO |

---

## THEME 4: PRODUCT

| ID | Problem | Severity | Sources |
|---|---|---|---|
| PR-01 | Not installable as a package (no npm publish) | CRITICAL | CEO, First Run, GTM, Power User |
| PR-02 | Components have hardcoded mock data, not configurable | HIGH | Power User, Cranky |
| PR-03 | Token optimization library unused in actual chat flow | HIGH | Power User, Claims vs Reality |
| PR-04 | Backend is a toy (mock only, 3 endpoints) | MEDIUM | Power User, CTO |
| PR-05 | No real AI integration in the demo | MEDIUM | First Run, GTM |
| PR-06 | Custom streaming protocol incompatible with standards | MEDIUM | Power User |

---

## THEME 5: UX

| ID | Problem | Severity | Sources |
|---|---|---|---|
| UX-01 | No landing page / clear value proposition on homepage | HIGH | Marketing, GTM, First Run |
| UX-02 | Cannot use components outside this repo | CRITICAL | First Run, Power User |
| UX-03 | No documentation beyond README | HIGH | First Run, GTM |
| UX-04 | Backend requires MongoDB for mock data | MEDIUM | First Run |

---

## THEME 6: TRUST & CREDIBILITY

| ID | Problem | Severity | Sources |
|---|---|---|---|
| TR-01 | Fabricated competitor analysis | HIGH | Marketing, Reddit, Power User |
| TR-02 | Fabricated accessibility audit | HIGH | Marketing, Reddit |
| TR-03 | "Production-ready" claim with 0 tests and security flaws | HIGH | All perspectives |
| TR-04 | 127KB `test_result.md` junk file in root | MEDIUM | Cranky, Troll |
| TR-05 | Empty directories suggesting features that don't exist | LOW | CTO |

---

## THEME 7: GTM & DISTRIBUTION

| ID | Problem | Severity | Sources |
|---|---|---|---|
| GT-01 | No distribution mechanism (no npm, no CLI, no registry) | CRITICAL | CEO, GTM, First Run |
| GT-02 | No marketing site or landing page | HIGH | Marketing, GTM |
| GT-03 | No social proof (stars, downloads, testimonials) | HIGH | Marketing, GTM |
| GT-04 | No pricing or monetization strategy | MEDIUM | CEO, GTM |

---

## THEME 8: INFRASTRUCTURE

| ID | Problem | Severity | Sources |
|---|---|---|---|
| IN-01 | Lock file conflict (npm vs empty pnpm) | MEDIUM | CTO, Cranky |
| IN-02 | Malformed .gitignore (concatenated lines) | MEDIUM | CTO, Build Report |
| IN-03 | No deployment configuration | MEDIUM | CEO, CTO |
| IN-04 | Bloated Python requirements (127 deps for 3 endpoints) | MEDIUM | Power User, Reddit |

---

## THEME 9: DIFFERENTIATION

| ID | Problem | Severity | Sources |
|---|---|---|---|
| DI-01 | No benchmarks to back performance claims | HIGH | Reddit, Power User |
| DI-02 | No unique value vs shadcn/ui + Vercel AI SDK | HIGH | GTM, Reddit |
| DI-03 | Glassmorphism trend is dated | LOW | Troll |

---

## Problem Count by Severity

| Severity | Count |
|---|---|
| CRITICAL | 6 |
| HIGH | 18 |
| MEDIUM | 11 |
| LOW | 3 |
| **TOTAL** | **38** |

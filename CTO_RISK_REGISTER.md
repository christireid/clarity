# CTO RISK REGISTER — Technical Assessment

**Audit Date:** 2026-02-21

---

## CRITICAL RISKS (Immediate Action Required)

### RISK-001: API Key Committed to Git
- **Severity:** CRITICAL
- **File:** `backend/.env` line 4
- **Detail:** `EMERGENT_LLM_KEY=sk-emergent-20b190a41774d59Cb7`
- **Impact:** Key is in git history permanently. Anyone with repo access has the key.
- **Action:** Rotate key immediately. Add `backend/.env` to `.gitignore`. Use git-filter-branch or BFG to purge from history.

### RISK-002: 10 npm Vulnerabilities (9 High)
- **Severity:** HIGH
- **Detail:** Next.js 16.0.10 has 3 known DoS vulnerabilities. minimatch has ReDoS.
- **Action:** Update Next.js to 16.1.6+. Run `npm audit fix`.

### RISK-003: CORS Wildcard
- **Severity:** HIGH
- **File:** `backend/server.py` line 80
- **Detail:** `allow_origins='*'` by default
- **Action:** Restrict to specific origins.

---

## HIGH RISKS

### RISK-004: No Tests
- **Severity:** HIGH
- **Detail:** 84,000 lines of component code with exactly 0 automated tests. The one "test" file uses console.log, not a test framework. No test script in package.json.
- **Impact:** Any change can break anything with no detection.

### RISK-005: ESLint Configuration Broken
- **Severity:** HIGH
- **File:** `eslint.config.mjs`
- **Detail:** Imports `@eslint/js` which is not installed. Linting cannot run.
- **Impact:** No static analysis. Code quality is unguarded.

### RISK-006: TypeScript Checking Bypassed
- **Severity:** HIGH
- **File:** `tsconfig.json` — `skipLibCheck: true`
- **Detail:** Build explicitly skips type validation. Unknown how many type errors exist.
- **Impact:** Type safety is theater.

### RISK-007: Barrel Export Conflicts
- **Severity:** HIGH
- **File:** `components/ai/index.ts`
- **Detail:** ~40 exports commented out due to naming conflicts. Components export identical names (e.g., `StreamingText` in 3 files, `TypingIndicator` in 4 files).
- **Impact:** Library is unusable as a single import. Architectural debt.

---

## MEDIUM RISKS

### RISK-008: Lock File Conflict
- **Detail:** Both `package-lock.json` (196KB, valid) and `pnpm-lock.yaml` (5 lines, empty) exist.
- **Impact:** Confusing for contributors. pnpm users will get wrong dependencies.

### RISK-009: Backend Dependency Bloat
- **Detail:** 127 Python dependencies for a 3-endpoint server. Includes unused: boto3, stripe, pandas, numpy, pillow, huggingface_hub.
- **Impact:** Massive attack surface. Slow installs. Dependency confusion risk.

### RISK-010: Deprecated FastAPI Patterns
- **File:** `backend/server.py` line 93
- **Detail:** `@app.on_event("shutdown")` is deprecated. Use `lifespan` context manager.
- **Impact:** Will break on FastAPI upgrade.

### RISK-011: Bare Exception Handler
- **File:** `backend/chat_service.py` line 15
- **Detail:** `except:` catches everything including KeyboardInterrupt.
- **Impact:** Silently swallows errors. Impossible to debug.

### RISK-012: Malformed .gitignore
- **File:** `.gitignore` line 27
- **Detail:** `*.tsbuildinfo` concatenated with node_modules paths without newline.
- **Impact:** Some files that should be ignored may not be.

### RISK-013: Duplicate CSS Files
- **Files:** `app/globals.css` (617 LOC) and `styles/globals.css`
- **Impact:** Confusion about which is canonical. Potential style divergence.

### RISK-014: Empty Directories
- **Directories:** `memory/`, `test_reports/pytest/`
- **Impact:** Suggests features that don't exist. Misleading.

---

## LOW RISKS

### RISK-015: No Error Boundaries in Production
- **Detail:** `error-boundary.tsx` exists as a showcase component but is not wrapped around the app.

### RISK-016: No Loading States for Real Data
- **Detail:** `loading.tsx` exists but all data is hardcoded/mocked.

### RISK-017: Hardcoded Strings
- **Detail:** No i18n. All strings are English-only and inline.

---

## Scalability Assessment

**N/A.** There is nothing to scale. The application is entirely static. The backend serves mock data. There are no users, no real data flows, no state to manage.

---

## Long-Term Survivability

**LOW.** Without tests, CI/CD, documentation, or a maintenance strategy, this codebase will rot quickly. The 84K lines of AI components will become unmaintainable within months as dependencies update and APIs change.

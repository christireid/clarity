# BUILD HEALTH REPORT

**Audit Date:** 2026-02-21

---

## Build Status

| Check | Status | Details |
|---|---|---|
| `next build` | PASS | Compiles in ~6.8s, generates 4 static pages |
| `npm install` | PASS (with warnings) | 10 vulnerabilities, 242 packages |
| `eslint` | **FAIL** | Cannot find `@eslint/js` package — config is broken |
| `npm test` | **N/A** | No test script defined in package.json |
| TypeScript (`tsc`) | SKIPPED BY BUILD | `skipLibCheck: true`, build skips type validation |
| Backend (`uvicorn`) | UNTESTABLE | Requires MongoDB connection |

---

## Security Vulnerabilities

### CRITICAL: API Key in Version Control
- **File:** `backend/.env`
- **Content:** `EMERGENT_LLM_KEY=sk-emergent-20b190a41774d59Cb7`
- **Risk:** API key exposed in git history. Even if deleted, it's in commit history forever.
- **Note:** `.gitignore` has `.env*` but only at root level. `backend/.env` is not covered.

### npm Audit Results
| Severity | Count | Details |
|---|---|---|
| High | 9 | Next.js DoS vulnerabilities (3), minimatch ReDoS (6 transitive) |
| Moderate | 1 | ajv ReDoS |

### CORS Configuration
- `backend/server.py` line 80: `allow_origins=os.environ.get('CORS_ORIGINS', '*').split(',')`
- Default: `*` (accepts all origins)
- Risk: Any website can make requests to this backend

---

## Dependency Health

### Frontend (package.json)
- **React 19.2.0** — Bleeding edge, may cause compatibility issues
- **Next.js 16.0.10** — Has known DoS vulnerabilities
- **Lock file conflict:** Both `package-lock.json` (196KB) and `pnpm-lock.yaml` (5 lines, empty) exist

### Backend (requirements.txt)
- **127 dependencies** — Massively bloated for a 3-endpoint server
- Includes: openai, google-genai, boto3, stripe, huggingface_hub, pandas, numpy, pillow
- Most of these are never imported or used
- **No version pinning strategy** — All exact versions, no ranges

---

## Tooling Issues

### ESLint: BROKEN
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@eslint/js'
```
The `eslint.config.mjs` imports `@eslint/js` which is not in `devDependencies`. ESLint cannot run.

### .gitignore: MALFORMED
Line 27: `*.tsbuildinfo` followed by garbage path without newline:
```
*.tsbuildinfonode_modules/@next/swc-linux-arm64-gnu/next-swc.linux-arm64-gnu.node
```

### pnpm-lock.yaml: EMPTY
Only contains the lockfile version header. Not a valid lock file. Should be deleted.

### Duplicate CSS
- `app/globals.css` (617 lines) — Active, imported by layout
- `styles/globals.css` (unknown) — Duplicate, potentially stale

---

## Architecture Issues

### Barrel Export Conflicts (components/ai/index.ts)
- **432 lines** of exports
- **~40 exports commented out** due to naming conflicts between component files
- Components export the same names (e.g., `StreamingText`, `TypingIndicator`, `FilePreview`)
- This means the component library cannot be cleanly imported as a single package

### No Next.js API Routes
- The frontend references `/api/chat/stream` but no API routes exist in the `app/` directory
- The backend is a separate FastAPI server — requires separate deployment
- No proxy configuration documented

### Backend-Frontend Disconnect
- Frontend: React/Next.js showcase of 150+ AI components
- Backend: 3 endpoints (root, status CRUD, chat mock)
- These two systems are essentially unrelated

---

## Build Output

```
Route (app)
┌ ○ /                    # Main showcase
├ ○ /_not-found          # 404
├ ○ /advanced-ai         # Advanced demo
└ ○ /design-system       # Design system

○ (Static) prerendered as static content
```

All pages are statically rendered. No dynamic routes, no API routes, no server-side rendering.

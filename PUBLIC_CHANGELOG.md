# Changelog

## [0.1.1] — 2026-02-21

### Security
- Removed API credentials from version control
- Restricted CORS defaults from wildcard to localhost
- Fixed bare exception handler in chat service
- Reduced backend dependencies from 127 to 25 (removed unused packages)

### Fixed
- Fixed broken ESLint configuration (installed missing dependencies)
- Fixed malformed `.gitignore` file
- Fixed barrel export conflicts in component index (resolved ~40 naming collisions)
- Fixed deprecated FastAPI lifecycle pattern (migrated to `lifespan` context manager)
- Corrected installation instructions in README

### Changed
- Renamed package from `my-v0-project` to `clarity-ui`
- Rewrote README with honest project description
- Updated HTML metadata (removed generator tag, corrected title)
- Replaced fake install command with accurate instructions
- Updated HeroSection with accurate statistics and honest positioning
- Fixed sidebar badge from "components" to "categories"

### Added
- MIT License file
- `typecheck` script in package.json
- `packageManager` field in package.json

### Removed
- Fabricated competitor analysis document
- Unverified accessibility audit document
- 127KB test result dump file
- Empty `pnpm-lock.yaml`
- Duplicate CSS file (`styles/globals.css`)
- Empty directories (`memory/`, `test_reports/`)

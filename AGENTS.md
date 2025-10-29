# Repository Guidelines

## Project Structure & Module Organization

- `src/` hosts the React front end; key folders include `components/` (UI), `utils/` (custom hooks), `types/` (shared interfaces), and `data/` (map metadata and sample datasets).
- `src/assets/` stores static images used by the map and UI; keep imports relative to `src`.
- `src-tauri/src/` contains the Rust-side commands and plugin wiring; adjust `tauri.conf.json` when adding capabilities.
- `public/` serves static files copied as-is by Vite, while `dist/` is generated output—never edit it manually.

## Build, Test, and Development Commands

- `npm install` installs Node dependencies and ensures the matching Tauri CLI version is fetched.
- `npm run dev` starts the Vite dev server for browser-based iteration; hot reload keeps React edits fast.
- `npm run tauri dev` launches the desktop shell with Tauri plugins, enabling filesystem reads under the `creatures/` data directory.
- `npm run build` performs a TypeScript type-check and produces optimized assets in `dist/`.
- `npm run preview` serves the production bundle locally; use it to validate routing and static asset loading.
- `npm run tauri build` packages platform binaries; confirm the Rust toolchain and target-specific dependencies are installed first.

## Coding Style & Naming Conventions

- Favor functional React components in `PascalCase` files (e.g., `RegionPage.tsx`); utilities and hooks use `camelCase` (`useIdleNavigation.ts`).
- Type definitions live in `src/types/`; declare new shapes before consuming API data to satisfy strict TypeScript.
- Match the prevailing 2-space indentation, double quotes, and grouped imports (`react` → third-party → local).
- Keep globals in `src/index.scss`; co-locate additional `.scss` files with their component when bespoke styling is needed.

## Testing Guidelines

- No automated suite is present yet; manually verify map navigation, import flows, and gesture hooks in both `npm run dev` and `npm run tauri dev`.
- When introducing Vitest, store specs in `src/__tests__/Name.test.tsx` and mock Tauri APIs so desktop-only paths remain deterministic.
- Capture OS-specific quirks (Windows vs. macOS packaging, file paths) in PR notes until coverage exists.

## Commit & Pull Request Guidelines

- Recent commits use brief descriptions (“Adds Auric's info…”); continue with present-tense, ≤72-character summaries and add bullet bodies for context when needed.
- Reference issue IDs inline (`Add Dreamer Tree route (#42)`) and note affected JSON or regions explicitly.
- PRs should summarize scope, list manual test commands, attach relevant screenshots of the map, and mention any `creatureData.json` schema adjustments.
- Request review before merging and ensure `npm run build` plus `npm run tauri build` succeed locally.

## Data & Configuration Notes

- The app loads creatures from per-creature JSON files stored at `AppData/creatures/*.json`; keep the bundled samples in `src/data/creatures/` synchronized with the expected schema.
- Routes derive from `src/data/regionDefinitions.ts`; align IDs with the `/region/:regionId` pattern so navigation and deep-links remain stable.

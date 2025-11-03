# Mycorzha Map

Mycorzha Map is an interactive exploration companion for the fungal realms of Mycorzha. The app pairs a richly illustrated React interface with a Tauri desktop shell so you can browse regional lore, track creatures, and manage local data whether you are online or off.

## Features

- **Interactive regional atlas** driven by `react-leaflet`, custom SVG layers, and animated navigation.
- **Creature compendium** sourced from individual JSON files in `src/data/creatures/`, with desktop access to local saves via the Tauri file-system plugin.
- **Smooth navigation & gestures** including idle auto-advance and fullscreen support optimized for kiosks.
- **Cross-platform desktop build** powered by Tauri 2.0 for Windows, macOS, and Linux, alongside a Vite-powered browser experience.

## Tech Stack

| Layer         | Technologies                                                |
| ------------- | ----------------------------------------------------------- |
| Frontend      | React 19, TypeScript, Vite 6, Emotion, Sass, Framer Motion  |
| Mapping       | Leaflet 1.9, React Leaflet 5, custom assets in `src/assets` |
| Desktop Shell | Tauri 2, Rust, plugins for dialog, filesystem, and opener   |

## Prerequisites

- Node.js ≥ 18 (LTS recommended)
- pnpm (recommended) — see https://pnpm.io/installation; this repo pins `pnpm@8.11.0` via `packageManager` in `package.json`
- Rust toolchain (stable) with `cargo`
- Tauri CLI: `cargo install tauri-cli` or `pnpm add -g @tauri-apps/cli`
- Git LFS (optional, but recommended if you add large media assets)

## Getting Started

```bash
git clone https://github.com/Morelitea/Mycorzha-Map.git
cd Mycorzha-Map
corepack enable
pnpm install
```

### Run in the browser

```bash
pnpm run dev
```

Visit the printed local URL (usually `http://localhost:1420`). Hot-module reloading keeps React changes instant.

### Run the desktop app

```bash
pnpm run tauri dev
```

This launches the integrated Tauri shell, unlocking filesystem access for importing `creatureData.json` from local storage.

## Scripts

| Command                | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| `pnpm run dev`         | Start the Vite development server for the browser build.        |
| `pnpm run tauri dev`   | Launch the Tauri desktop shell with live reload.                |
| `pnpm run build`       | Type-check and create a production bundle in `dist/`.           |
| `pnpm run preview`     | Serve the production bundle locally for validation.             |
| `pnpm run tauri build` | Package platform-specific binaries (requires platform tooling). |

## Project Structure

```
Mycorzha-Map/
├── src/                 # React UI source
│   ├── components/      # UI components (Creature cards, navigation, accordions...)
│   ├── data/            # Region definitions, per-creature sample JSON, utilities
│   ├── types/           # Shared TypeScript types for regions, creatures, etc.
│   ├── utils/           # Custom hooks and helpers (idle navigation, gestures)
│   └── assets/          # Map banners, region art, icons, and other static media
├── src-tauri/           # Rust workspace for Tauri commands and configuration
├── public/              # Static files served as-is by Vite
└── dist/                # Production output (generated)
```

## Data & Configuration Notes

- The desktop app reads creature data from per-creature JSON files stored under `AppData/creatures/`. Keep the bundled samples in `src/data/creatures/` aligned with the runtime schema defined in `src/types/Creatures.ts` and `src/types/Regions.ts`.
- Regional metadata lives in `src/data/regionDefinitions.ts` with per-region narrative files in `src/data/regionData/`. Route IDs must match the `/region/:regionId` pattern to keep navigation stable.
- Update `src-tauri/tauri.conf.json` if you add new Tauri capabilities (filesystem scopes, protocol handlers, etc.).

## Contributing

1. Create a feature branch from `main`.
2. Run `pnpm run dev` (browser) and `pnpm run tauri dev` (desktop) to sanity check your changes.
3. Ensure `pnpm run build` and `pnpm run tauri build` succeed before opening a pull request.
4. Describe region or data changes clearly, and attach screenshots or screen recordings of new map interactions whenever possible.

## Troubleshooting

- **Missing Rust dependencies**: Install the platform-specific build toolchain (e.g., `build-essential` on Debian/Ubuntu, Xcode tools on macOS, MSVC on Windows).
- **Assets not loading**: Confirm filenames in `src/assets` match imports exactly; Vite is case-sensitive on non-Windows hosts.
- **Creature data import issues**: Validate JSON against the type definitions. When testing desktop-only flows, use `pnpm run tauri dev` so the filesystem plugin is available.

## Acknowledgements

Built by the Morelitea team to bring the mushroom realms to life in both browser and desktop experiences.

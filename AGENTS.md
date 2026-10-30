# AGENTS.md – Trình Chiếu Lớp 1

## Project Overview
Offline-first PWA for Grade 1 classroom presentation, running on teacher's laptop connected to TV.

## Architecture
- Vite + React 19 + TypeScript (strict, no `any`)
- Zod for schema validation (Draft vs Publish discriminated union)
- vite-plugin-pwa for service worker / offline caching
- Web Audio API via SessionAudioManager
- BroadcastChannel API for presenter↔present sync
- useReducer state machine for session control

## Key Conventions
- All lesson content lives in `content/lessons/*.json`
- All media assets in `public/media/` (phonemes, tts, images)
- No backend, no remote DB, no auth — 100% offline
- CSS Modules or inline styles only (no heavy CSS framework)
- Question types: multiple-choice, counting, number-select

## File Structure
See README or the directory tree for full layout.

## Testing
- `vitest` for unit tests (schemas, reducer)
- `scripts/validate-content.ts` via `tsx` for CLI content validation

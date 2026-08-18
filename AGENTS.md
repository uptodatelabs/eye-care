# AGENTS.md - guide for AI assistants working on eye-care

## Project

PC eye-exercise reminder app. Electron + TypeScript. Open source (MIT).

## Stack

- Runtime: Electron 33+, Node 18+
- Language: TypeScript (strict mode, no `any` without justification)
- Module system: CommonJS (Electron main); renderer uses ES modules via preload bridge
- No bundler yet — plain `tsc` to `out/`. HTML/CSS/TS loaded directly by Electron.

## Commands

- `npm run dev` — typecheck-watch + launch Electron
- `npm run build` — compile TS to `out/`
- `npm run start` — build then launch
- `npm run typecheck` — typecheck only, no emit
- `npm run clean` — remove `out/` and `dist/`

## Layout

```
src/
  main/        Electron main process
  preload/     Preload bridges (context isolation, no nodeIntegration)
  renderer/    UI for break & settings windows
  data/        Eye-exercise routines (ophthalmology-sourced)
  shared/      Types shared between main and renderer
out/           Compiled JS (gitignored)
```

## Conventions

- Commits: conventional-commit prefixes (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`)
- No emoji in code or commits unless explicitly requested
- No comments in code unless requested or non-obvious safety reason
- Every exercise in `src/data/` MUST cite a reputable ophthalmology source
- Never claim "vision restoration" / "myopia cure" — not medically supported
- Context isolation ON, nodeIntegration OFF, preload bridges for IPC
- Run `npm run typecheck` before considering work done

## Medical safety

This app is for eye-fatigue relief only. Do not add features implying medical
treatment, diagnosis, or vision correction. When in doubt, cite the American
Academy of Ophthalmology (AAO) or similar body and frame as "rest/fatigue relief".
# Contributing to eye-care

Thanks for your interest in contributing! This is a community-driven open-source health tool, so quality, safety, and transparency matter more than speed.

## Project setup

Requirements:
- Node.js >= 18 (developed on Node 20/22)
- npm >= 9

```bash
git clone https://github.com/rudylee/eye-care.git
cd eye-care
npm install
npm run dev
```

## Project layout

```
src/
  main/        Electron main process (window, tray, scheduler)
  preload/     Preload bridges (context-isolated)
  renderer/    UI HTML/CSS/TS for break & settings windows
  data/        Eye-exercise routines (ophthalmology-sourced)
  shared/      Types shared between main/renderer
out/           Compiled JS (gitignored)
```

## How to contribute

### Good first issues
- Translating exercise instructions (i18n)
- Adding new exercises backed by ophthalmology sources
- OS-specific testing (Windows/macOS/Linux)
- Accessibility improvements (screen readers, high-contrast)

### Adding an eye exercise

Every exercise in `src/data/` MUST include:

1. A citation to a reputable ophthalmology source (AAO, NEI, NHS, peer-reviewed paper, etc.)
2. A clear `durationSeconds`
3. Step-by-step instructions safe for the general public

**Do not** add exercises that promise "vision correction" or "myopia cure" — these lack medical consensus and can mislead users.

### Commit style

- Use clear, conventional-commit-style messages: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`
- Keep commits focused; one logical change per commit
- Reference issues when relevant: `fix: tray menu crash on Windows (#12)`

### Before opening a PR

1. `npm run typecheck` passes
2. `npm run build` succeeds
3. No new TypeScript `any` types without justification
4. README updated if user-facing behavior changed

## Code of conduct

See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md). Be kind, assume good intent.

## License

By contributing you agree your contributions are licensed under the project's MIT license.
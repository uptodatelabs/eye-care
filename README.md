# eye-care

A PC eye-exercise reminder app for monitor-heavy users. Built with Electron + TypeScript.

> **Medical disclaimer:** This software is for eye-fatigue relief and rest reminders only. It is NOT a medical device, does not diagnose or treat any condition, and is not a substitute for professional ophthalmologic care. Claims about "vision restoration" or "curing myopia" are not supported by modern ophthalmology; this app intentionally avoids them.

## Why

Mobile apps for eye exercises are common, but well-made PC apps that guide actual eye exercises (not just "take a break" reminders) are rare. `eye-care` periodically overlays a guided exercise on your screen based on ophthalmologist-recommended practices:

- **20-20-20 rule** (American Academy of Ophthalmology) — every 20 min, look 20 ft (6 m) away for 20 s
- **Near-far focus shift** — alternate focus between near and distant targets
- **Figure-8 eye tracing** — slow eye movement to relieve fatigue
- **Conscious blinking** — counter the ~66% reduction in blink rate during screen work
- **Palming** — cover eyes with warm palms to relax

## Schedule (default)

| Type        | Default interval | Duration | Purpose                     |
| ----------- | ---------------- | -------- | --------------------------- |
| Mini break  | every 20 min     | 20 s     | 20-20-20 + quick exercises  |
| Long break  | every 50 min     | 5 min    | Full guided exercise set    |

Both intervals are configurable.

## Status

Early development. Not yet functional. See `CONTRIBUTING.md` to get involved.

## License

MIT
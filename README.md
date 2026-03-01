<!-- @todo merge pull request with updated lore content
  -->

# ryancanfield.me

Personal site for Ryan Canfield — Seattle-based software engineering leader.

## Tech Stack

- **Framework:** React 19, TanStack Start, TanStack Router
- **Build:** Vite 7
- **State:** Zustand (client), React Query (server)
- **Animations:** Motion
- **CMS:** Sanity
- **Storage:** Local Storage, Netlify Blobs
- **Linting:** ESLint, TypeScript

## Netlify

- **Functions** — serverless API (achievements, GitHub contributions, theme picker)
- **Forms** — contact form submission
- **Identity** — authentication (GoTrue)
- **Blobs** — achievement storage

## Development

```bash
pnpm install
pnpm dev
```

### Scripts

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `pnpm dev`        | Start dev server                |
| `pnpm dev:live`   | Netlify dev (functions + local) |
| `pnpm build`      | Type-check and build            |
| `pnpm preview`    | Preview production build        |
| `pnpm lint`       | Run ESLint                      |
| `pnpm type-check` | TypeScript check                |
| `pnpm storybook`  | Start Storybook                 |

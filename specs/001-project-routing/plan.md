# Plan: Project routing

Feature: `001-project-routing`

Spec: [spec.md](./spec.md)

Constitution: [`.specify/memory/constitution.md`](../../.specify/memory/constitution.md)

## Technical context

This repo is a Next.js 15 app (TypeScript, React, Tailwind, MUI) deployed on Vercel. Routing to other projects uses Next.js rewrites in [next.config.ts](../../next.config.ts). Destinations are other deployments, usually other Vercel projects, one per repository.

Vercel constraints this plan follows:

- External rewrites are the reverse proxy. The browser URL stays on the portfolio host. Proxied requests time out at 120 seconds.
- `/.well-known` is not rewritten.
- Each rewrite counts as a route. The deployment limit is 2,048 routes. This feature adds two rewrites per mounted app (page prefix and asset prefix), which is far under that cap.
- Microfrontends is not used. Hobby includes two microfrontend projects.
- Preview deployments are per project. A rewrite destination is an env-specific absolute URL. Production points at the child production URL. This plan does not stitch preview deployments together.

## Registry

One module, `lib/projects.ts`, is the list of projects and the only input to both the Projects page and the rewrite table.

Each entry:

| Field | Required | Meaning |
| --- | --- | --- |
| `slug` | yes | Stable id. Used in `/apps/<slug>`. Lowercase, hyphenated. |
| `title` | yes | Card heading. |
| `summary` | yes | One paragraph on the card. |
| `image` | no | Path under `public/`, when a screenshot exists. |
| `githubUrl` | yes | Repository URL. |
| `externalUrl` | no | Live site used when the project is not mounted. |
| `mount` | no | Present only when the child contract is met. |

`mount`, when set:

| Field | Meaning |
| --- | --- |
| `basePath` | Public prefix. Must equal `/apps/<slug>`. |
| `assetPrefix` | Unique prefix, `/apps/<slug>-static`. |
| `destination` | Absolute origin of the child deployment, no trailing path. From an env var, not a hardcoded production URL in source when the URL differs by environment. |

A missing or disabled `mount` means the card opens `externalUrl`. The rewrite helper skips that entry.

Initial data is the four projects already on [app/projects/page.tsx](../../app/projects/page.tsx). All four ship with `mount` omitted. Colorado Down Ballot Visuals keeps `https://coloradovotevisuals.com`. The others keep the GitHub links they have today. No rewrite is emitted until a `mount` is added.

## Rewrites

`next.config.ts` builds `rewrites()` from registry entries that have `mount`.

For a mount of slug `vote` and destination `https://vote.example`:

```ts
[
  { source: "/apps/vote", destination: "https://vote.example/apps/vote" },
  { source: "/apps/vote/:path+", destination: "https://vote.example/apps/vote/:path+" },
  { source: "/apps/vote-static/:path+", destination: "https://vote.example/apps/vote-static/:path+" },
]
```

The child must actually serve those paths. Rewriting `/apps/vote` to the child's `/` is not valid for a Next.js app, because the child would still emit `/_next` URLs that this portfolio owns.

Reserved paths, never produced by the helper: `/`, `/experience`, `/projects`, `/blog`, `/_next`, `/apps` with no slug, and `/.well-known`.

If two entries share a `basePath` or `assetPrefix`, the helper throws at config load so the build fails instead of shipping an overlap.

## Child contract

Documented in `specs/001-project-routing/child-contract.md` for the other repo. That repo changes are out of this slice. The contract says:

- Set `basePath` to `/apps/<slug>`.
- Set `assetPrefix` to `/apps/<slug>-static`.
- Deploy on its own Vercel project.
- Do not depend on this portfolio's nav. Offer its own way back, or accept that the visitor uses the portfolio URL directly.
- Links from this portfolio into the app are plain `<a>` tags.

## Projects page

[app/projects/page.tsx](../../app/projects/page.tsx) reads the registry.

The page reads the registry. Font, color, column width, and MUI versus Tailwind stay as they are until Oliver records a style choice in the constitution or a clarification on this spec.

Behavior the page must implement:

- Title, summary, optional image, GitHub, and one Open link.
- If `mount` is set, Open is `<a href={basePath}>` and the card says it opens on this site.
- If `mount` is absent, Open is `<a href={externalUrl}>` when `externalUrl` exists. GitHub remains in both cases.
- Open links to a mount use `<a>`, not `next/link`.

## Project structure

```text
specs/001-project-routing/
├── spec.md
├── plan.md
├── tasks.md
└── child-contract.md
lib/projects.ts          # registry and rewrite builder
next.config.ts           # calls the rewrite builder
app/projects/page.tsx    # cards from the registry, current visual system kept
```

## Environment

`PROJECT_<SLUG>_ORIGIN` holds the child origin, for example `PROJECT_VOTE_ORIGIN=https://vote-app.vercel.app`. The registry reads it when `mount` is enabled. An enabled mount with a missing origin fails the build.

No new hosted service. No database.

## Verification

- `next build` succeeds with zero mounts.
- Unit or config test: zero mounts produce zero rewrites; one mount produces the three rules above; a duplicate prefix throws; reserved paths are absent from the rewrite list.
- Browser, after the card UI lands: `/projects` shows the four projects, external open and GitHub still work, and `/`, `/experience`, and `/blog` still render this app.
- A live rewrite is not part of this slice. It waits until one child repo meets the contract and `mount` is turned on in a follow-up.

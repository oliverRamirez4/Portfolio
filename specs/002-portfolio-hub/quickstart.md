# Quickstart: Portfolio Hub

Validates [spec.md](./spec.md) against [contracts/hub-ui.md](./contracts/hub-ui.md) and [contracts/project-registry.md](./contracts/project-registry.md). No on-site app is mounted in this pass.

## Prerequisites

- Node and pnpm or npm, as the repo already uses.
- From the repository root, install dependencies if `node_modules` is missing.

## Run

```bash
npm test
npm run dev
```

`npm test` runs the rewrite-builder checks. Open the dev server URL, usually `http://localhost:3000`.

## Scenarios

1. **About is first.** Load `/`. The about text is visible without choosing a section. The nav includes Home, Resume, Projects, and Blog, and does not include Experience.
2. **Resume.** Activate Resume. The Schwab, AIT Budapest, Jacobs, and Colorado College entries from the old experience page are readable. Load `/experience` and confirm the address ends at `/resume`.
3. **Projects.** Activate Projects. Four cards render. Each has a title, a summary, skill labels drawn only from Python, Postgres, Unix, TypeScript, and React, a repository link, and a picture only when that project already had one. Colorado Down Ballot Visuals has an Open link to its existing live site. A card does not use an on-site `/apps/` address.
4. **Empty-state code path.** Not required in the browser for the seeded data. The resume and project modules treat an empty list as the "not available" and "no projects yet" messages. Do not ship empty lists.
5. **Rewrites stay off.** `npm test` expects zero rewrite rules for the seeded projects. `/`, `/resume`, `/projects`, and `/blog` are absent from any rewrite source.
6. **Blog unchanged.** Open Blog and confirm the existing post list still loads.
7. **Style unchanged.** Column width, typeface, and colors match the current site. This pass does not introduce a new palette or layout.

## Not in this pass

Do not set `onSite` on a project. Do not expect `/apps/<shortName>` to serve another app until a child meets [contracts/child-mount.md](./contracts/child-mount.md).

# Child contract

This file is the agreement another repository must meet before this portfolio mounts it. Do not add a `mount` entry until these are true in that repo and it is deployed.

## Required app config

For slug `vote`:

```ts
const nextConfig = {
  basePath: "/apps/vote",
  assetPrefix: "/apps/vote-static",
};
```

Replace `vote` with the registry slug. `basePath` and `assetPrefix` must match the portfolio registry exactly.

The child serves its pages under `/apps/<slug>` and its Next.js assets under `/apps/<slug>-static/_next/...`.

## Deploy

- One Vercel project for the child repo.
- This portfolio rewrites to that deployment's origin (`https://<project>.vercel.app` or a dedicated alias), not to a path on the portfolio host.
- The child is usable at `https://<child-origin>/apps/<slug>` before the portfolio rewrite is enabled. Check that URL directly. CSS and JS must load there.

## What the child does not get

- This portfolio's nav, footer, or `max-w-xl` column. The rewrite replaces the whole response.
- A shared login or cookie domain, unless a later spec adds one.
- Preview stitching. The portfolio rewrite points at one origin per environment.

## Portfolio side, after the child works

1. Set `PROJECT_<SLUG>_ORIGIN` in the portfolio Vercel project.
2. Add `mount` on that registry entry.
3. Confirm `/apps/<slug>` on the portfolio host renders the child, and `/projects` still renders this app.

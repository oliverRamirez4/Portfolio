# Contract: Portfolio mounts

Module: `lib/projects.ts`. Published by the existing `rewrites()` in `next.config.ts`.

Origins, with no path:

- `PROJECT_COLORADO_VOTE_ORIGIN=https://colorado-vote-visuals.vercel.app`
- `PROJECT_SHELTER_CONNECT_ORIGIN=https://cos-shelter-connect.vercel.app`

## Rules

`buildRewrites(projects)` returns these six rules and no others:

```text
/apps/colorado-vote                      → https://colorado-vote-visuals.vercel.app/apps/colorado-vote
/apps/colorado-vote/:path+               → https://colorado-vote-visuals.vercel.app/apps/colorado-vote/:path+
/apps/colorado-vote-static/:path+        → https://colorado-vote-visuals.vercel.app/apps/colorado-vote-static/:path+
/apps/shelter-connect                    → https://cos-shelter-connect.vercel.app/apps/shelter-connect
/apps/shelter-connect/:path+             → https://cos-shelter-connect.vercel.app/apps/shelter-connect/:path+
/apps/shelter-connect-static/:path+      → https://cos-shelter-connect.vercel.app/apps/shelter-connect-static/:path+
```

The destination keeps the portfolio path. It does not point at the origin's `/`.

These are rewrites. The visitor's address stays on this portfolio. They are not redirects.

## Not routed

No rule is added for `nlp-labs`, `level-up`, `osu-clone`, or `river-permit`.

No rule uses `/`, `/resume`, `/experience`, `/projects`, `/blog`, `/_next`, `/.well-known`, or `/apps` with no short name.

## Release gate

Do not set the two origin variables on the deployed portfolio while either of these returns 404:

- `https://colorado-vote-visuals.vercel.app/apps/colorado-vote`
- `https://cos-shelter-connect.vercel.app/apps/shelter-connect`

This repository does not change those apps. A missing origin variable with `onSite` set fails the build.

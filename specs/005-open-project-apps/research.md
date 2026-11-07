# Research: Open Vote Visualizer and Shelter Connect

## Decision: Mount with the existing `onSite` rewrites

**Rationale**: `openHref` already returns `/apps/<shortName>` when `onSite` is set, and `buildRewrites` already emits three rules per mounted project. `next.config.ts` already publishes those rules. The Projects page already renders Open as a plain anchor and adds "Opens on this site" for a mount. The spec's portfolio addresses match that shape: `/apps/colorado-vote` and `/apps/shelter-connect`, with files at `/apps/colorado-vote-static` and `/apps/shelter-connect-static`.

**Alternatives considered**: A new proxy or a one-off rewrite in `vercel.json`. Rejected because the registry would no longer be the source of the routes. A Vercel dashboard redirect. Rejected because a redirect changes the visitor's address to the published site. Vercel Microfrontends. Rejected by the constitution, and Hobby only includes two microfrontend projects.

## Decision: Rewrite to the child path, not the child root

**Rationale**: The existing rule sends `/apps/colorado-vote` to `https://<origin>/apps/colorado-vote`, and the file prefix to the same path on that origin. The child app is responsible for serving itself there. Pointing the rewrite at the origin's `/` would load HTML whose scripts and links still ask this portfolio for `/_next` and `/`.

**Alternatives considered**: Rewrite `/apps/colorado-vote` to `https://colorado-vote-visuals.vercel.app/`. Rejected. The first document might appear, and the app's own files would miss.

## Decision: Origins live in environment variables

**Rationale**: `onSite.originEnv` must be `PROJECT_COLORADO_VOTE_ORIGIN` and `PROJECT_SHELTER_CONNECT_ORIGIN`. The values are `https://colorado-vote-visuals.vercel.app` and `https://cos-shelter-connect.vercel.app`, with no path. `buildRewrites` throws when a mounted project has no origin, so local dev, `npm test` against the real registry, and the Vercel build all need the variables. Env files are gitignored. The values are not written into `lib/projects.ts`.

**Alternatives considered**: Hardcode the two URLs in the registry. Rejected because the existing contract keeps the origin out of source so preview and production can differ, and a missing origin fails the build on purpose.

## Decision: Remove `externalUrl` from Colorado Down Ballot Visuals

**Rationale**: `openHref` prefers `onSite`, so the old `https://coloradovotevisuals.com` link would already stop being Open. Removing the field leaves one destination. Title, summary, skills, picture, and repository URL stay.

**Alternatives considered**: Keep `externalUrl` as a hidden fallback. Rejected because the spec forbids Open from sending the visitor to that old address.

## Decision: Do not deploy the mount while the child paths 404

**Rationale**: On 2026-11-07:

| URL | Status |
| --- | --- |
| `https://colorado-vote-visuals.vercel.app/` | 200 |
| `https://colorado-vote-visuals.vercel.app/apps/colorado-vote` | 404 |
| `https://cos-shelter-connect.vercel.app/` | 200 |
| `https://cos-shelter-connect.vercel.app/apps/shelter-connect` | 404 |

Both apps are published at their roots. Neither is built for the portfolio path yet. This feature does not edit those repositories. Setting the Vercel origins before the prefixed URLs serve the apps would make Open on this portfolio a 404 and would drop the vote visualizer's current working link. The code change in this repo is ready to land when the probe passes. Production env for the two origins stays unset until then. A commit that sets `onSite` without those variables fails `next build`, so that commit does not go to the deployed branch while the probe fails.

**Alternatives considered**: Mount immediately and accept a broken Open. Rejected because the constitution allows a mount only after the child contract, and the vote card already opens a live site. Edit the two child repositories from this repo. Rejected by the spec and by the constitution.

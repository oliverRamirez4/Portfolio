# Implementation Plan: Open Vote Visualizer and Shelter Connect

**Branch**: `005-open-project-apps` | **Date**: 2026-11-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/005-open-project-apps/spec.md`

## Summary

Move Colorado Down Ballot Visuals and Shelter Connect to the first two places on Projects, and open each one through a path on this portfolio. The existing registry already mounts a project when `onSite` is set: Open becomes `/apps/<shortName>`, and `next.config.ts` rewrites that path and its file path to the child origin. This feature sets `onSite` on those two records, removes the vote visualizer's old external address, and supplies the two origin variables. It does not edit either child repository, and it does not add a new proxy.

A check on 2026-11-07 found both published apps responding at their roots and returning 404 at `/apps/<shortName>`. The portfolio routes must not be deployed until those prefixed addresses serve the apps. Until then, shipping the mount would replace the vote visualizer's working Open link with a 404.

## Technical Context

**Language/Version**: TypeScript 5, Next.js 15.1.3, React 19 (the app already in this repo)

**Primary Dependencies**: Next.js rewrites and the existing `lib/projects.ts` registry. No new package.

**Storage**: None. Order and mount fields stay in the `projects` array. Origins stay in environment variables, not in source.

**Testing**: Node's built-in test runner via `npm test` (`tests/rewrites.test.ts`). Update the real-registry assertions. The child-path probe and the browser check are in [quickstart.md](./quickstart.md).

**Target Platform**: The existing Next.js site, deployed on Vercel Hobby. Rewrites run on that deployment. Vercel redirects and Vercel Microfrontends are not used.

**Project Type**: Web application. Registry and test edits inside the current Next.js app.

**Performance Goals**: `/projects` stays a server-rendered list of six cards. Each mounted app is fetched by the existing rewrite, which already times out at 120 seconds. No new request runs while rendering the card list.

**Constraints**: Do not edit the vote visualizer or Shelter Connect repositories. Do not mount either app in production while its prefixed URL returns 404. Do not send Open to `https://coloradovotevisuals.com`. Do not rewrite `/`, `/resume`, `/experience`, `/projects`, `/blog`, `/_next`, or `/.well-known`. Do not change card copy, pictures, repository links, Home, Resume, or the visual style. Skill labels stay as they are.

**Scale/Scope**: Two mounted projects and four unchanged cards. Six rewrite rules, three per mounted project.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Before research | After design |
| --- | --- | --- |
| I. Personal hub. Cards keep the skills they already name. This app still does not run Python or Postgres. | Pass | Pass |
| II. This app still renders `/`, `/resume`, and `/projects`. Mounted prefixes are only `/apps/colorado-vote` and `/apps/shelter-connect`, plus their file prefixes. | Pass | Pass |
| III. The plan implements [spec.md](./spec.md): portfolio routing, Open on both cards, and those two cards first. | Pass | Pass |
| IV. Deploy stays on Vercel Hobby. Routing is a Next.js rewrite. No Microfrontends. No long-lived Python or Postgres in this app. | Pass | Pass |
| V. A mount is enabled only when the child is built for `basePath` `/apps/<shortName>` and `assetPrefix` `/apps/<shortName>-static`. Research found that contract unmet on 2026-11-07. The design does not deploy the rewrites until [quickstart.md](./quickstart.md) shows those child URLs serving the apps. | Pass, assuming the spec's prerequisite | Pass as a release gate. Production env stays unset until the probe passes. |
| VI. The new public paths do not overlap Home, Resume, Projects, or each other. Each app has its own page prefix and file prefix. | Pass | Pass |
| VII. The card stays the front door. Open for a mounted app is a plain anchor to `/apps/<shortName>`. Nav does not open either app. | Pass | Pass |
| Visual style. No palette, type, or layout change. The existing "Opens on this site" line appears because `onSite` is set. That line is already what the Projects page renders for a mount. | Pass | Pass |

No gate fails. Production routing waits on the child probe. Complexity tracking is empty.

## Project Structure

### Documentation (this feature)

```text
specs/005-open-project-apps/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── project-cards.md
│   └── mounts.md
└── tasks.md             # /speckit-tasks, not this command
```

### Source Code (repository root)

```text
lib/projects.ts          # reorder two records, set onSite, drop externalUrl
tests/rewrites.test.ts   # assert the real registry and the six rewrite rules
app/projects/page.tsx    # unchanged; Open and "Opens on this site" already follow onSite
next.config.ts           # unchanged; rewrites() already returns buildRewrites(projects)
```

**Structure Decision**: Use the mount that `lib/projects.ts` and `next.config.ts` already implement. Setting `onSite` is enough to change Open and to emit the rewrites. The page does not need a new control. Origins are `PROJECT_COLORADO_VOTE_ORIGIN` and `PROJECT_SHELTER_CONNECT_ORIGIN`, set in the local ignored env file and in the portfolio's Vercel project. They are not committed.

## Complexity Tracking

No constitution violations. The child-path probe is a release gate, not a reason to invent a second routing mechanism.

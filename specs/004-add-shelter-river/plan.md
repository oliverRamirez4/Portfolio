# Implementation Plan: Add Shelter Connect and River Permit Projects

**Branch**: `004-add-shelter-river` | **Date**: 2026-11-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-add-shelter-river/spec.md`

## Summary

Add Shelter Connect and River Permit API Wrapper to the Projects list by appending two records to the existing project registry. The Projects page already renders one card per record, hides Open when a project has no live destination, and hides the picture when none is set. No page, route, rewrite, or visual change is required. The four current records stay first and unchanged.

## Technical Context

**Language/Version**: TypeScript 5, Next.js 15.1.3, React 19 (the app already in this repo)

**Primary Dependencies**: Next.js and the existing `lib/projects.ts` registry. No new package.

**Storage**: None. The registry remains the `projects` array in `lib/projects.ts`. Shelter Connect's database and the river permit tool stay in their own repositories.

**Testing**: Node's built-in test runner via `npm test` (`tests/rewrites.test.ts`). Add assertions on the real registry. Browser check of `/projects` is in [quickstart.md](./quickstart.md).

**Target Platform**: The existing Next.js site, deployed on Vercel Hobby.

**Project Type**: Web application. One registry edit inside the current Next.js app.

**Performance Goals**: `/projects` stays a server-rendered list. The two cards add no request, no image, and no rewrite.

**Constraints**: Do not set `onSite` or `externalUrl` on either new project. Do not add a picture, a path under `/apps`, or a rewrite. Do not edit COSConnect or the river permit repository. Do not change Home, Resume, nav, footer, or the visual style. Skill labels are only Python, Postgres, Unix, TypeScript, and React.

**Scale/Scope**: Two new cards after the four existing ones. Six cards total.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Before research | After design |
| --- | --- | --- |
| I. Personal hub. Cards name the stack each project uses. The hub does not run Python or Postgres. | Pass | Pass |
| II. This app still renders `/`, `/resume`, and `/projects`. Nothing new is mounted. | Pass | Pass |
| III. The plan implements [spec.md](./spec.md): two cards, then the four existing cards unchanged. | Pass | Pass |
| IV. No new host, no Microfrontends, no long-lived Python or Postgres in this app. | Pass | Pass |
| V. Neither project meets the basePath contract, so neither is mounted. With no live address, the card links to GitHub only. | Pass | Pass |
| VI. No new public path. `shelter-connect` and `river-permit` are registry names, not routes. Reserved paths stay with this app. | Pass | Pass |
| VII. The card stays the front door. The repository control stays a plain anchor. Nav does not open either project. | Pass | Pass |
| Visual style. No palette, type, or layout change. No river, kayak, or outdoor icon. | Pass | Pass |

No gate fails. Complexity tracking is empty.

## Project Structure

### Documentation (this feature)

```text
specs/004-add-shelter-river/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── project-cards.md
└── tasks.md             # /speckit-tasks, not this command
```

### Source Code (repository root)

```text
lib/projects.ts          # append two records
tests/rewrites.test.ts   # assert the real registry
app/projects/page.tsx    # unchanged; already maps the registry
next.config.ts           # unchanged; rewrites come from onSite only
```

**Structure Decision**: Stay in the existing registry. `app/projects/page.tsx` already shows title, summary, skills, an optional picture, a repository anchor, and Open only when `openHref` returns a destination. Records without `image`, `externalUrl`, and `onSite` satisfy the spec. `buildRewrites` skips those records, so `next.config.ts` needs no edit.

## Complexity Tracking

No constitution violations.

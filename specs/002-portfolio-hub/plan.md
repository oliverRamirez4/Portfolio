# Implementation Plan: Portfolio Hub

**Branch**: `002-portfolio-hub` | **Date**: 2026-11-06 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-portfolio-hub/spec.md`

## Summary

The hub's first page is the about text. A resume page replaces the experience page and is seeded from the timeline already on the site. Project cards come from one registry: each card has a repository link, skill labels, an optional picture, and Open only when a live destination exists. On-site Open is a Next.js rewrite to `/apps/<shortName>`, and no project is mounted in this pass. Fonts, colors, and layout stay as they are.

## Technical Context

**Language/Version**: TypeScript 5, Next.js 15.1, React 19 (the app already in this repo)

**Primary Dependencies**: Next.js, React, the existing Tailwind and MUI packages. No new UI library.

**Storage**: TypeScript modules `lib/profile.ts` and `lib/projects.ts`. No Postgres.

**Testing**: Node's built-in test runner for `buildRewrites`. Browser checks in [quickstart.md](./quickstart.md).

**Target Platform**: Vercel Hobby, the existing Next.js deployment.

**Project Type**: Web application, one Next.js app. Other projects stay in their own repos.

**Performance Goals**: About, resume, and projects are static pages. A visitor reaches resume or projects in one nav action from `/`. No extra API hop.

**Constraints**: Vercel external-rewrite timeout is 120 seconds and does not apply while no rewrite is emitted. `/.well-known` is not rewritten. Do not use Vercel Microfrontends. Do not change fonts, colors, or column width. Plain anchors for repository links, external Open, and `/apps/<shortName>`.

**Scale/Scope**: One profile, the resume entries now on the experience timeline, and the four current project cards. Blog is unchanged.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Result |
| --- | --- |
| I. Personal hub. Cards name only the skills a project uses, from Python, Postgres, Unix, TypeScript, and React. This app does not implement that whole stack. | Pass |
| II. This Next.js app remains the default zone for `/`, `/resume`, `/projects`, and `/blog`. A mounted app would own only its `/apps/<shortName>` response. | Pass |
| III. This plan implements [spec.md](./spec.md) and the clarifications recorded there. | Pass |
| IV. Vercel Hobby, Next.js rewrites, no Microfrontends, no Python process, no Postgres. | Pass |
| V. No `onSite` entry until the child contract in [contracts/child-mount.md](./contracts/child-mount.md) is met. Initial registry has none. | Pass |
| VI. `/`, `/resume`, `/projects`, `/blog`, `/_next`, and `/experience` (redirect only) are not rewrite sources. Each future mount gets one `/apps/<shortName>` and one asset prefix. | Pass |
| VII. The visitor opens a project from its card. Nav does not send them into another app. | Pass |
| Visual style is not constitution law. This plan does not choose a new palette, typeface, or layout. | Pass |

Post-design re-check: the data model, UI contract, and rewrite contract introduce no gate failure. Complexity Tracking is empty.

## Project Structure

### Documentation (this feature)

```text
specs/002-portfolio-hub/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── hub-ui.md
│   ├── project-registry.md
│   └── child-mount.md
└── tasks.md             # /speckit-tasks, not this command
```

### Source Code (repository root)

```text
app/
├── page.tsx                 # about, route /
├── resume/page.tsx          # resume, route /resume
├── projects/page.tsx        # cards from lib/projects.ts
├── blog/                    # unchanged
├── components/nav.tsx       # Home, Resume, Projects, Blog
└── layout.tsx               # unchanged chrome
lib/
├── profile.ts               # about text and resume entries
└── projects.ts              # project list and buildRewrites
next.config.ts               # /experience → /resume, rewrites from buildRewrites
tests/
└── rewrites.test.ts         # node:test for buildRewrites
```

`app/experience/page.tsx` and `app/components/timeline.tsx` are removed after their copy is moved into `lib/profile.ts`.

**Structure Decision**: This is the existing Next.js app. Profile and projects are modules beside `lib/blog.ts`. There is no backend tree.

## Complexity Tracking

No constitution violations.

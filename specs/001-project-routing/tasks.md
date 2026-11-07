# Tasks: Project routing

Feature: `001-project-routing`

Spec: [spec.md](./spec.md)

Plan: [plan.md](./plan.md)

Child contract: [child-contract.md](./child-contract.md)

Implementation of this list starts only after `spec.md` and `plan.md` are accepted. Do not enable a rewrite to a real child app in this feature. Every current project ships with `mount` omitted.

## Phase 1: Setup

- [ ] T001 Add `lib/projects.ts` with the `Project` and `Mount` types from [plan.md](./plan.md). No page imports yet.

## Phase 2: Foundational

- [ ] T002 In `lib/projects.ts`, export `projects` containing the four current cards (Colorado Down Ballot Visuals, Natural Language Processing Labs, Conversational AI Chat Interface, Osu Rhythm Game Clone) with `mount` omitted, keeping today's titles, summaries, images, GitHub URLs, and external URLs.
- [ ] T003 In `lib/projects.ts`, export `buildRewrites(projects)` that returns no rules when no entry has `mount`, returns the three rules in [plan.md](./plan.md) for one mount, throws on a duplicate `basePath` or `assetPrefix`, and never emits `/`, `/experience`, `/projects`, `/blog`, `/_next`, or `/.well-known`.
- [ ] T004 Add a node test (or a small `node --test` script) that covers the four cases in T003. Wire it as `npm test` or `pnpm test` without removing the existing `lint` script.

## Phase 3: US1 and US2 — Cards and external open

- [ ] T005 [US1] Render the project cards in [app/projects/page.tsx](../../app/projects/page.tsx) from `projects`. Keep the current visual system. Do not change type, color, column width, or MUI versus Tailwind in this task.
- [ ] T006 [US2] On each card, render GitHub and one Open link. With `mount` absent, Open uses `externalUrl` when it exists. Keep Open and GitHub working for all four current projects.

## Phase 4: US4 and US3 — Rewrite hook, still disabled

- [ ] T008 [US4] In [next.config.ts](../../next.config.ts), set `rewrites()` to `buildRewrites(projects)`. Confirm a production build emits no external rewrites while every `mount` is omitted, and `/`, `/experience`, `/projects`, and `/blog` still build as this app.
- [ ] T009 [US3] When `mount` is present, render Open as `<a href={basePath}>` (not `next/link`) and show the text "Opens on this site". Leave this branch unexercised by data until a child repo meets [child-contract.md](./child-contract.md). Read the child origin from `PROJECT_<SLUG>_ORIGIN` and fail the build if `mount` is set and the variable is missing.

## Phase 5: Polish

- [ ] T010 [P] Check `/projects` in the browser at desktop width and a narrow viewport: four cards, GitHub and external Open still navigate, and Home, Experience, and Blog are unchanged.
- [ ] T011 Do not add a `mount` for Colorado Vote Visuals or any other repo in this slice.

## Dependency order

T001 → T002 and T003 → T004. T005 and T006 depend on T002. T008 depends on T003. T009 depends on T005 and T003. T010 is last.

## Out of this task list

- Changes inside other project repositories.
- Turning on a live rewrite.
- Restyling Experience or the blog.
- Python, Postgres, or a separate API.

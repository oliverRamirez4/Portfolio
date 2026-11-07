# Tasks: Open Vote Visualizer and Shelter Connect

**Input**: Design documents from `/specs/005-open-project-apps/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The spec does not request a new test framework or test-first work. `specs/005-open-project-apps/quickstart.md` requires the existing runner to assert the real registry, so that assertion is one polish task in `tests/rewrites.test.ts`.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Next.js App Router at `app/`
- Project registry at `lib/projects.ts`
- Paths match plan.md. No `src/` tree.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the mount path already exists and no new package is needed

- [X] T001 Confirm `lib/projects.ts` exports `projects`, `openHref`, and `buildRewrites`; `openHref` returns `/apps/<shortName>` when `onSite` is set; `buildRewrites` emits `/apps/<shortName>`, `/apps/<shortName>/:path+`, and `/apps/<shortName>-static/:path+` to `<origin>` plus that same path; `next.config.ts` already returns `buildRewrites(projects)` from `rewrites()`; and `app/projects/page.tsx` already renders Open as a plain anchor to `openHref` and shows "Opens on this site" when `onSite` is set. Add no package. Do not edit those files in this task.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Keep the rewrite helper as it is, and put the two origins in the local env

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Leave `SKILLS`, the `Project` type, `assertProject`, `openHref`, and `buildRewrites` unchanged in `lib/projects.ts`. A mounted `onSite.originEnv` must still equal `PROJECT_<SHORTNAME>_ORIGIN` with hyphens turned into underscores and letters uppercased, and `onSite.assetPrefix` must still equal `/apps/<shortName>-static`. `buildRewrites` must still throw when a mounted origin variable is missing, and must still skip a record with no `onSite`. Do not edit `app/projects/page.tsx`, `next.config.ts`, `app/page.tsx`, or `app/resume/page.tsx`.
- [X] T003 [P] Set `PROJECT_COLORADO_VOTE_ORIGIN=https://colorado-vote-visuals.vercel.app` and `PROJECT_SHELTER_CONNECT_ORIGIN=https://cos-shelter-connect.vercel.app` in `.env.local` at the repo root, with no path on either value. Do not commit `.env.local`. Do not set these variables on the deployed Vercel project in this task.

**Checkpoint**: Foundation ready. User stories only edit records in `lib/projects.ts`. Do not edit the vote visualizer repository or the Shelter Connect repository.

---

## Phase 3: User Story 1 - Open the vote visualizer (Priority: P1) 🎯 MVP

**Goal**: Colorado Down Ballot Visuals opens at `/apps/colorado-vote` on this portfolio, routed to `https://colorado-vote-visuals.vercel.app`, and no longer opens `https://coloradovotevisuals.com`

**Independent Test**: On `/projects`, choose Open on Colorado Down Ballot Visuals. The address stays on this host at `/apps/colorado-vote`. The card still shows its current title, summary, Postgres skill, `/voteVisual.png` picture, and repository link to `https://github.com/oliverRamirez4/coloradoVoteVisuals`.

### Implementation for User Story 1

- [X] T004 [US1] In the `colorado-vote` object in `lib/projects.ts`, set `onSite` to `{ originEnv: "PROJECT_COLORADO_VOTE_ORIGIN", assetPrefix: "/apps/colorado-vote-static" }` and remove `externalUrl`. Keep `title` `Colorado Down Ballot Visuals`, the existing `summary`, `repositoryUrl` `https://github.com/oliverRamirez4/coloradoVoteVisuals`, `skills` `["Postgres"]`, and `image` `/voteVisual.png`. Leave the other five records unchanged in this task.

**Checkpoint**: User Story 1 is testable on its own. `openHref` for `colorado-vote` is `/apps/colorado-vote`. With `PROJECT_COLORADO_VOTE_ORIGIN` set, its three rewrite destinations are `https://colorado-vote-visuals.vercel.app/apps/colorado-vote`, `https://colorado-vote-visuals.vercel.app/apps/colorado-vote/:path+`, and `https://colorado-vote-visuals.vercel.app/apps/colorado-vote-static/:path+`.

---

## Phase 4: User Story 2 - Open Shelter Connect (Priority: P1)

**Goal**: Shelter Connect opens at `/apps/shelter-connect` on this portfolio, routed to `https://cos-shelter-connect.vercel.app`

**Independent Test**: On `/projects`, choose Open on Shelter Connect. The address stays on this host at `/apps/shelter-connect`. The card still has its current title, summary, skills TypeScript, React, and Postgres, no picture, and repository link `https://github.com/oliverRamirez4/COSConnect`.

### Implementation for User Story 2

- [X] T005 [US2] In the `shelter-connect` object in `lib/projects.ts`, set `onSite` to `{ originEnv: "PROJECT_SHELTER_CONNECT_ORIGIN", assetPrefix: "/apps/shelter-connect-static" }`. Keep `title` `Shelter Connect`, `summary` `A Colorado Springs homeless-shelter guide from the Colorado College TigerHacks hackathon. A person can see shelters and the people they serve.`, `repositoryUrl` `https://github.com/oliverRamirez4/COSConnect`, and `skills` `["TypeScript", "React", "Postgres"]`. Omit `image` and `externalUrl`. Leave the other five records unchanged in this task.

**Checkpoint**: User Story 2 is testable on its own. `openHref` for `shelter-connect` is `/apps/shelter-connect`. With `PROJECT_SHELTER_CONNECT_ORIGIN` set, its three rewrite destinations are `https://cos-shelter-connect.vercel.app/apps/shelter-connect`, `https://cos-shelter-connect.vercel.app/apps/shelter-connect/:path+`, and `https://cos-shelter-connect.vercel.app/apps/shelter-connect-static/:path+`.

---

## Phase 5: User Story 3 - Put both projects first (Priority: P2)

**Goal**: Colorado Down Ballot Visuals is the first card and Shelter Connect is the second. The other four cards follow in their previous relative order with the same public details

**Independent Test**: Open `/projects` and read the list from top to bottom without opening an app. Order is Colorado Down Ballot Visuals, Shelter Connect, Natural Language Processing Labs, Conversational AI Chat Interface, Osu Rhythm Game Clone, River Permit API Wrapper. Six cards. The last four have no Open.

### Implementation for User Story 3

- [X] T006 [US3] In `lib/projects.ts`, order the `projects` array as `colorado-vote`, `shelter-connect`, `nlp-labs`, `level-up`, `osu-clone`, `river-permit`. Keep the `nlp-labs`, `level-up`, `osu-clone`, and `river-permit` object literals unchanged: same `title`, `summary`, `repositoryUrl`, `skills`, and `image`, no `externalUrl`, and no `onSite`. Keep the `onSite` values from T004 and T005 on `colorado-vote` and `shelter-connect`.

**Checkpoint**: All three stories hold. Six records. The two mounted records are first. The other four are unchanged.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Lock the registry in the existing test, then run the quickstart without deploying a 404

- [X] T007 Replace the real-registry test in `tests/rewrites.test.ts` so it sets `PROJECT_COLORADO_VOTE_ORIGIN` to `https://colorado-vote-visuals.vercel.app` and `PROJECT_SHELTER_CONNECT_ORIGIN` to `https://cos-shelter-connect.vercel.app`, then asserts six records in order `colorado-vote`, `shelter-connect`, `nlp-labs`, `level-up`, `osu-clone`, `river-permit`; the mounted fields and `openHref` values from `specs/005-open-project-apps/data-model.md`; unchanged fields and null `openHref` for `nlp-labs`, `level-up`, `osu-clone`, and `river-permit`; and `buildRewrites(projects)` equal to the six rules in `specs/005-open-project-apps/contracts/mounts.md`
- [X] T008 Run `specs/005-open-project-apps/quickstart.md`. `npm test` must pass. `/projects` must show the contract order, Open only on the first two cards, and those Open addresses on this host. `/` and `/resume` stay this app. Do not set the two origin variables on the deployed Vercel project, and do not merge the `onSite` records to the deployed branch, while `https://colorado-vote-visuals.vercel.app/apps/colorado-vote` or `https://cos-shelter-connect.vercel.app/apps/shelter-connect` returns 404

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup. Blocks every user story
- **User Stories (Phase 3–5)**: Depend on Foundational. Edit `lib/projects.ts` in order T004, then T005, then T006
- **Polish (Phase 6)**: Depends on the stories you intend to ship. T007 depends on the records those stories changed. T008 depends on T007

### User Story Dependencies

- **User Story 1 (P1)**: After Foundational. No dependency on User Story 2 or 3. Mounts `colorado-vote` wherever it currently sits
- **User Story 2 (P1)**: After Foundational. No dependency on User Story 1 or 3. Mounts `shelter-connect` wherever it currently sits
- **User Story 3 (P2)**: After Foundational. Reorders records and preserves whatever `onSite` T004 and T005 have set

### Parallel Opportunities

- T003 edits `.env.local` and can run alongside T002
- T004, T005, and T006 all edit `lib/projects.ts`, so they are not parallel
- T007 edits `tests/rewrites.test.ts` and starts only after the registry edits it asserts

---

## Parallel Example: User Story 1

```bash
# No parallel task. User Story 1 is one edit:
Task: "T004 [US1] Mount colorado-vote in lib/projects.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Open `/projects` and use Open on Colorado Down Ballot Visuals. The address is `/apps/colorado-vote` on this host. Shelter Connect still has no Open until User Story 2

### Incremental Delivery

1. Setup + Foundational
2. User Story 1 → vote visualizer opens on this portfolio
3. User Story 2 → Shelter Connect opens on this portfolio
4. User Story 3 → those two cards are first, and the other four are unchanged
5. Polish → registry test, then quickstart.md. Deploy only after the child paths return 200

### Parallel Team Strategy

One person edits `lib/projects.ts`. A second person can write `.env.local` during Phase 2 and can write T007 in `tests/rewrites.test.ts` only after T004, T005, and T006 exist. Do not split T004, T005, and T006 across two people at the same time.

---

## Notes

- [US1], [US2], and [US3] map to the stories in spec.md
- Do not edit the vote visualizer repository or the Shelter Connect repository
- Do not add a redirect to either published origin
- Do not change Home, Resume, card copy, pictures, repository links, or the visual style
- On 2026-11-07 both child paths returned 404. The portfolio mount stays off the deployed branch until those paths serve the apps
- Stop at any checkpoint and check that story on its own

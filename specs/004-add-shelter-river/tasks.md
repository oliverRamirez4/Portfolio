# Tasks: Add Shelter Connect and River Permit Projects

**Input**: Design documents from `/specs/004-add-shelter-river/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The spec does not request a new test framework or test-first work. `specs/004-add-shelter-river/quickstart.md` requires the existing runner to assert the real registry, so that assertion is one polish task in `tests/rewrites.test.ts`.

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

**Purpose**: Confirm the registry and the Projects page already render a card from a record

- [X] T001 Confirm `lib/projects.ts` exports `projects`, `openHref`, and `buildRewrites`, and that `app/projects/page.tsx` already maps `projects` in array order, skips the picture when `image` is absent, and skips Open when `openHref` returns null. Add no package.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Keep validation and rewrite behavior so a link-only record is legal

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Leave `SKILLS`, the `Project` type, `assertProject`, `openHref`, and `buildRewrites` unchanged in `lib/projects.ts`. A record still needs a unique lowercase hyphenated `shortName` that is not `experience`, `projects`, `blog`, `resume`, or `_next`; a non-empty `title` and `summary`; an absolute `http` or `https` `repositoryUrl`; and `skills` drawn only from `Python`, `Postgres`, `Unix`, `TypeScript`, and `React` with no duplicates. `buildRewrites` must keep skipping a record that has no `onSite`.

**Checkpoint**: Foundation ready. User stories can append records. Do not edit `app/projects/page.tsx`, `next.config.ts`, `app/page.tsx`, or `app/resume/page.tsx`.

---

## Phase 3: User Story 1 - Find Shelter Connect (Priority: P1) 🎯 MVP

**Goal**: Projects lists Shelter Connect with its summary, skills, and repository link, and without Open or a picture

**Independent Test**: Open `/projects` and read the Shelter Connect card without opening another project. The title is Shelter Connect. The summary is the sentence pair below. The skills read TypeScript, React, Postgres. Repository goes to `https://github.com/oliverRamirez4/COSConnect`. There is no picture and no Open.

### Implementation for User Story 1

- [X] T003 [US1] Append one record to the `projects` array in `lib/projects.ts`, after `osu-clone` and before any later new record, with `shortName` `shelter-connect`, `title` `Shelter Connect`, `summary` `A Colorado Springs homeless-shelter guide from the Colorado College TigerHacks hackathon. A person can see shelters and the people they serve.`, `repositoryUrl` `https://github.com/oliverRamirez4/COSConnect`, and `skills` `["TypeScript", "React", "Postgres"]`. Omit `image`, `externalUrl`, and `onSite`.

**Checkpoint**: User Story 1 is testable on its own. The four earlier records are untouched. `openHref` for `shelter-connect` is null.

---

## Phase 4: User Story 2 - Find the river permit wrapper (Priority: P1)

**Goal**: Projects lists River Permit API Wrapper with its summary, the Python skill, and its repository link, and without Open or a picture

**Independent Test**: Open `/projects` and read the River Permit API Wrapper card without using the Shelter Connect card. The summary is the sentence below. The only skill is Python. Repository goes to `https://github.com/oliverRamirez4/recreation-gov-rafting-permit-scraper`. There is no picture and no Open.

### Implementation for User Story 2

- [X] T004 [US2] Append one record to the `projects` array in `lib/projects.ts`, after `shelter-connect` when that record exists and otherwise after `osu-clone`, with `shortName` `river-permit`, `title` `River Permit API Wrapper`, `summary` `A Python tool that checks Recreation.gov for remaining river-rafting permits over a chosen date range and reports which launch dates still have permits.`, `repositoryUrl` `https://github.com/oliverRamirez4/recreation-gov-rafting-permit-scraper`, and `skills` `["Python"]`. Omit `image`, `externalUrl`, and `onSite`.

**Checkpoint**: User Story 2 is testable on its own. `openHref` for `river-permit` is null. No `/apps/river-permit` rewrite is added.

---

## Phase 5: User Story 3 - Keep the current project list (Priority: P2)

**Goal**: The original four cards stay first, in their current order, with the same public details

**Independent Test**: Open `/projects` and read the first four cards, then count the list. Order is Colorado Down Ballot Visuals, Natural Language Processing Labs, Conversational AI Chat Interface, Osu Rhythm Game Clone, then Shelter Connect, then River Permit API Wrapper. The first four keep their previous summaries, skills, pictures, repository links, and Open actions. The list has six cards.

### Implementation for User Story 3

- [X] T005 [US3] In `lib/projects.ts`, keep the object literals for `colorado-vote`, `nlp-labs`, `level-up`, and `osu-clone` unchanged and in that order, ahead of `shelter-connect` and `river-permit`. Do not add, remove, or rewrite their `title`, `summary`, `repositoryUrl`, `skills`, `image`, or `externalUrl`, and do not add `onSite` to them.

**Checkpoint**: All three stories hold. Six records, original four first.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Lock the registry in the existing test and run the quickstart

- [X] T006 Add one test in `tests/rewrites.test.ts` that imports the real `projects` array and `openHref` from `lib/projects.ts` and asserts six records in order `colorado-vote`, `nlp-labs`, `level-up`, `osu-clone`, `shelter-connect`, `river-permit`; the Shelter Connect and River Permit titles, summaries, skills, and repository URLs from `specs/004-add-shelter-river/data-model.md`; `openHref` null for those two short names; and `buildRewrites(projects)` equal to `[]`, with no `PROJECT_SHELTER_CONNECT_ORIGIN` or `PROJECT_RIVER_PERMIT_ORIGIN` set
- [X] T007 Run `specs/004-add-shelter-river/quickstart.md`: `npm test`, then `/projects` for six cards with Open only on Colorado Down Ballot Visuals among the six, no picture and no Open on the two new cards, and unchanged `/` and `/resume`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup. Blocks every user story
- **User Stories (Phase 3–5)**: Depend on Foundational. Edit `lib/projects.ts` in order T003, then T004, then T005
- **Polish (Phase 6)**: Depends on the stories you intend to ship. T006 depends on the records those stories added. T007 depends on T006

### User Story Dependencies

- **User Story 1 (P1)**: After Foundational. No dependency on User Story 2 or 3
- **User Story 2 (P1)**: After Foundational. Independently testable if `shelter-connect` is absent; when both stories ship, `river-permit` follows `shelter-connect`
- **User Story 3 (P2)**: After Foundational. Checks the four original records after the appends

### Parallel Opportunities

- No task is marked [P]. T003, T004, and T005 all edit `lib/projects.ts`
- T006 edits `tests/rewrites.test.ts` and starts only after the registry edits it asserts

---

## Parallel Example: User Story 1

```bash
# No parallel task. User Story 1 is one edit:
Task: "T003 [US1] Append shelter-connect in lib/projects.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Open `/projects` and read the Shelter Connect card. Five cards, Shelter Connect last, no Open and no picture on that card

### Incremental Delivery

1. Setup + Foundational
2. User Story 1 → Shelter Connect card
3. User Story 2 → River Permit API Wrapper card
4. User Story 3 → original four cards still first and unchanged
5. Polish → registry test, then quickstart.md

### Parallel Team Strategy

One person edits `lib/projects.ts`. A second person can write T006 in `tests/rewrites.test.ts` only after T003 and T004 exist. Do not split T003 and T004 across two people at the same time.

---

## Notes

- [US1], [US2], and [US3] map to the stories in spec.md
- Do not edit COSConnect or the river permit repository
- Do not set `onSite` or `externalUrl` on `shelter-connect` or `river-permit`
- Do not add a picture or a river, kayak, or outdoor icon
- Stop at any checkpoint and check that story on its own

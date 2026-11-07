# Tasks: Portfolio Hub

**Input**: Design documents from `/specs/002-portfolio-hub/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: The spec does not request story tests. `tests/rewrites.test.ts` is included because [plan.md](./plan.md) and [quickstart.md](./quickstart.md) require the rewrite contract to be checked with Node's built-in test runner.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Setup and foundational tasks have no story label

## Path Conventions

- Next.js app at the repository root: `app/`, `lib/`, `next.config.ts`, `tests/`
- Paths match [plan.md](./plan.md)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Test script for the rewrite contract. The Next.js app already exists. Do not add a database, a new UI library, or a Python service.

- [X] T001 Add a `"test"` script that runs `node --test` to `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The project registry and rewrite builder every later story reads. No user story work starts until this phase is complete.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Create `Project` and `onSite` types plus `buildRewrites` in `lib/projects.ts`. `shortName` is required, unique, lowercase, and hyphenated, and must not be `experience`, `projects`, `blog`, `resume`, or `_next`. `title`, `summary`, and `repositoryUrl` are required; `repositoryUrl` is an absolute http(s) URL. `skills` is an array of only `Python`, `Postgres`, `Unix`, `TypeScript`, and `React`, with no duplicates; an empty array is allowed. `image` and `externalUrl` are optional; `externalUrl` is an absolute http(s) URL when set. `onSite`, when present, has `originEnv` equal to `PROJECT_<SHORTNAME>_ORIGIN` (hyphens become underscores, letters uppercased) and `assetPrefix` equal to `/apps/<shortName>-static`. `buildRewrites` returns no rules when no project has `onSite`. For short name `vote` and origin `https://vote.example` it returns `/apps/vote` → `https://vote.example/apps/vote`, `/apps/vote/:path+` → `https://vote.example/apps/vote/:path+`, and `/apps/vote-static/:path+` → `https://vote.example/apps/vote-static/:path+`. It throws on a duplicate `shortName`, a duplicate `assetPrefix`, a missing or empty origin variable, or a source of `/`, `/resume`, `/experience`, `/projects`, `/blog`, `/_next`, `/.well-known`, or `/apps` with no short name. Export an empty `projects` array until T010 fills it.
- [X] T003 Add `tests/rewrites.test.ts` covering the empty list, the three `vote` rules, a duplicate `shortName`, a duplicate `assetPrefix`, a missing origin, and rejection of the reserved sources named in T002. Run it with the script from T001.

**Checkpoint**: `buildRewrites([])` returns no rules and `npm test` passes. User story work can begin.

---

## Phase 3: User Story 1 - Read the engineer profile (Priority: P1) 🎯 MVP

**Goal**: Opening the site shows the about text. Resume is one action away and replaces the experience page.

**Independent Test**: Open `/` and read the about text with no extra navigation. Open Resume in one action. Load `/experience` and land on `/resume`. The nav has no Experience link.

### Implementation for User Story 1

- [X] T004 [US1] Create `lib/profile.ts` with one profile: `name` and `about` required, `about` non-empty, using the current home-page introduction. Add resume entries seeded from `app/components/timeline.tsx`. Each entry has required unique `id`, `kind` of `role` or `education`, `title`, `organization`, `start`, `end` (a display date or `Present`), and `summary`. `details` is an optional list. Include Schwab, AIT Budapest, Jacobs, and Colorado College. An empty entry list must be representable so the page can say the resume is not available yet; do not ship an empty list.
- [X] T005 [P] [US1] Render `about` from `lib/profile.ts` as the first page in `app/page.tsx`. Do not change fonts, colors, or the column width in `app/layout.tsx`.
- [X] T006 [P] [US1] Create `app/resume/page.tsx` that lists resume entries in order, and when the list is empty says the resume is not available yet and does not present a broken document.
- [X] T007 [P] [US1] Update `app/components/nav.tsx` so the links are Home (`/`), Resume (`/resume`), Projects (`/projects`), and Blog (`/blog`), using `next/link`. Remove Experience.
- [X] T008 [P] [US1] Add a permanent redirect from `/experience` to `/resume` in `next.config.ts`.
- [X] T009 [US1] Delete `app/experience/page.tsx` and `app/components/timeline.tsx` after their copy lives in `lib/profile.ts`.

**Checkpoint**: User Story 1 is done. Projects and the blog can still be the current pages.

---

## Phase 4: User Story 2 - Explore projects from cards (Priority: P1)

**Goal**: The projects area shows one card per project, with title, summary, skills, repository link, and a picture only when the project has one.

**Independent Test**: Open `/projects` and read every card, including its repository link and skill labels, without leaving the hub.

### Implementation for User Story 2

- [X] T010 [US2] Replace the empty `projects` array in `lib/projects.ts` with the four current cards from `app/projects/page.tsx`: Colorado Down Ballot Visuals, Natural Language Processing Labs, Conversational AI Chat Interface, and Osu Rhythm Game Clone. Give each a unique lowercase hyphenated `shortName` that is not `experience`, `projects`, `blog`, `resume`, or `_next`. Set `repositoryUrl` from the current GitHub links. Set `image` only when the current public file exists (`/voteVisual.png`, `/cosineSimilarity.png`, `/levelUp.png`, `/OsuGame.png`). Set `skills` only to values from `Python`, `Postgres`, `Unix`, `TypeScript`, and `React`, with no duplicates. Set `externalUrl` only for Colorado Down Ballot Visuals (`https://coloradovotevisuals.com`). Do not set `onSite` on any project.
- [X] T011 [US2] Render one card per project in `app/projects/page.tsx` from `projects`: `title`, `summary`, `skills`, a repository link using a plain `<a>` to `repositoryUrl`, and `image` only when it is set. If `projects` is empty, say there are no projects yet. Keep the current card styling. Do not add Open in this task.

**Checkpoint**: Cards match the registry. Open is not required yet.

---

## Phase 5: User Story 3 - Open a project that is not on this site (Priority: P1)

**Goal**: Open goes to the external live URL when the project is not on this site. A project with no live destination has no Open control. The repository link stays.

**Independent Test**: On the Colorado Down Ballot Visuals card, Open goes to `https://coloradovotevisuals.com` and the repository link is still on the card. A card with no `externalUrl` and no `onSite` has no Open control.

### Implementation for User Story 3

- [X] T012 [US3] In `app/projects/page.tsx`, add Open as a plain `<a>` to `externalUrl` when `onSite` is absent and `externalUrl` is set. Render no Open control when both are absent. Keep the repository `<a>` on every card.

**Checkpoint**: External Open works. No `/apps/` link is shown for the seeded projects.

---

## Phase 6: User Story 4 - Open a project hosted on this site (Priority: P2)

**Goal**: When `onSite` is set, Open goes to `/apps/<shortName>`, says it opens on this site, and `next.config.ts` emits that project's rewrites. Seeded projects stay unmounted.

**Independent Test**: With no seeded `onSite`, `/projects` still uses external Open only, and `npm test` shows zero rewrite rules for the seed plus the three rules for a fixture mount. `/`, `/resume`, `/projects`, and `/blog` still render this app.

### Implementation for User Story 4

- [X] T013 [P] [US4] In `app/projects/page.tsx`, when `onSite` is set, render Open as a plain `<a href="/apps/<shortName>">` (not `next/link`) and the text "Opens on this site". Do not set `onSite` on the four seeded projects in `lib/projects.ts`.
- [X] T014 [P] [US4] In `next.config.ts`, set `rewrites()` to `buildRewrites(projects)` from `lib/projects.ts` while keeping the `/experience` → `/resume` redirect.

**Checkpoint**: The on-site branch exists and is unused by seed data. No other repository is edited.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Confirm the quickstart and the constitution gates.

- [X] T015 Walk through `specs/002-portfolio-hub/quickstart.md` in the browser and record any failure against `specs/002-portfolio-hub/contracts/hub-ui.md`
- [X] T016 Confirm `lib/projects.ts` still has no `onSite` value, `app/blog/page.tsx` is unchanged, and `app/layout.tsx` fonts, colors, and column width are unchanged

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (T001) has no dependencies.
- Foundational (T002, T003) depends on T001 for the test script. T003 depends on T002.
- User Story 1 depends on the foundational checkpoint only. It does not need project cards.
- User Story 2 depends on the foundational checkpoint. It does not need the resume.
- User Story 3 depends on User Story 2 because it adds Open to the cards from T011.
- User Story 4 depends on User Story 3 and on T002. It must not enable a real mount.
- Polish depends on the stories in this pass.

### User Story Dependencies

- **US1 (P1)**: After foundational. Independent of US2, US3, and US4.
- **US2 (P1)**: After foundational. Independent of US1.
- **US3 (P1)**: After US2.
- **US4 (P2)**: After US3. Code path only. No child repo and no `onSite` seed.

### Parallel Opportunities

- After T004: T005, T006, T007, T008, and T009 touch different files.
- After foundational: US1 and US2 can proceed at the same time.
- T013 and T014 touch different files.

---

## Parallel Example: User Story 1

```text
T004 lib/profile.ts
Then together:
  T005 app/page.tsx
  T006 app/resume/page.tsx
  T007 app/components/nav.tsx
  T008 next.config.ts
  T009 delete app/experience/page.tsx and app/components/timeline.tsx
```

## Parallel Example: User Story 4

```text
T013 app/projects/page.tsx
T014 next.config.ts
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. T001 through T003
2. T004 through T009
3. Stop and check the User Story 1 independent test

### Incremental Delivery

1. Setup and foundational
2. US1 (about and resume) and check
3. US2 (cards) and check
4. US3 (external Open) and check
5. US4 (on-site branch, still disabled) and check
6. T015 and T016

### Parallel Team Strategy

After T003, one person can do US1 while another does US2. US3 starts when US2's cards exist. US4 starts when US3's Open control exists.

---

## Notes

- Do not set `onSite` in this pass. [contracts/child-mount.md](./contracts/child-mount.md) is the later gate.
- Do not restyle the site.
- Every task uses the checkbox, ID, optional `[P]`, story label only on story tasks, and a file path.

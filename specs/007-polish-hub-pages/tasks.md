# Tasks: Polish Hub Pages

**Input**: Design documents from `/specs/007-polish-hub-pages/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested as a new suite. Proof is the browser checks in quickstart.md. T006 updates the existing skill assertions in `tests/rewrites.test.ts` so `npm test` matches the lists this feature stores.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Next.js App Router at `app/`
- Project records in `lib/projects.ts`
- Paths match plan.md. No `src/` tree. No new package.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Keep the existing app, column, and navigation in place

- [X] T001 Do not add a dependency and do not add a route. Leave `package.json`, `next.config.ts`, `app/layout.tsx`, `app/components/nav.tsx`, `app/globals.css`, and `lib/profile.ts` unchanged. Marks come from `react-icons`, which is already installed.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Nothing shared blocks the stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

The reading column, the nav labels, the greeting, and the about paragraph already match the spec. No foundational edit is required.

**Checkpoint**: Foundation ready. User stories can begin in parallel.

---

## Phase 3: User Story 1 - Read a centered introduction (Priority: P1) 🎯 MVP

**Goal**: The Home greeting and paragraph are centered in the reading column. The nav stays on the left edge.

**Independent Test**: Open `/`. The greeting `Hi! I'm Oliver Ramirez` and the paragraph are centered in the column. A line of the paragraph stays between 60 and 70 characters. The nav labels Home, Resume, and Projects stay on the column's left edge. The Stone hairline sits under the greeting words.

### Implementation for User Story 1

- [X] T002 [US1] In `app/page.tsx`, center the existing introduction block: keep `max-w-[30rem]`, and add `mx-auto` and `text-center`. Keep the `h1` an inline piece of the same sentence as `profile.about`, with `relative inline-block`, `greeting-settle`, Geist Sans 25px, weight 500, and Ink `#1C2422`. Leave the hairline to `.greeting-settle::after` in `app/globals.css` so it stays the width of the greeting. Do not center the nav. Do not remove the Resume and Projects links in this task. Do not change the strings in `lib/profile.ts`.

**Checkpoint**: User Story 1 is testable on its own. The extra Home links may still be there.

---

## Phase 4: User Story 2 - Read the resume inside the grid (Priority: P1)

**Goal**: The resume document sits in the reading column on Paper. The grid stays in the margins and does not cross the page.

**Independent Test**: Open `/resume` wider than 40rem. The grid is visible on both sides of the document and does not cross it. The document does not meet the viewport edge. The heading `Resume` and the open-file action stay left-aligned. On a width under 40rem the page does not scroll sideways. With the PDF absent, the page shows `The resume is not available yet.` and no document area.

### Implementation for User Story 2

- [X] T003 [P] [US2] In `app/resume/page.tsx`, remove the full-bleed wrapper (`relative left-1/2 w-screen -translate-x-1/2`) and the `min(56rem, 100vw - 2rem)` width. When `public/oliver-ramirez-resume.pdf` is present, render the iframe at `w-full`, `h-[80vh]`, `border-0`, and `bg-paper` inside the section so it fills the 40rem column and does not escape it. Keep the PDF URL `/oliver-ramirez-resume.pdf`, the heading `Resume`, and the `Open the PDF` link. When the file is missing, keep the sentence `The resume is not available yet.` and do not render an iframe. Do not add a border, shadow, or panel.

**Checkpoint**: User Story 2 is testable on its own. Home and the project cards can still be unchanged.

---

## Phase 5: User Story 3 - See every technology on a project (Priority: P2)

**Goal**: Each card lists the technologies from the data model, with one shared Ink mark where a mark exists.

**Independent Test**: Open `/projects`. The six cards show the lists in T004, in that order, each name once. Python matches on the labs and the river permit card. Postgres matches on Colorado Down Ballot Visuals and Shelter Connect. SQL and Java Swing are names with no empty box. Titles, summaries, pictures, repository links, Open, and card order are unchanged.

### Implementation for User Story 3

- [X] T004 [P] [US3] In `lib/projects.ts`, extend `SKILLS` so it contains exactly `Python`, `Postgres`, `Unix`, `TypeScript`, `React`, `Hugging Face`, `Java`, `SQL`, and `Java Swing`. Set `level-up` `skills` to `["Hugging Face"]` and `osu-clone` `skills` to `["Java", "SQL", "Java Swing"]`. Leave `colorado-vote` at `["Postgres"]`, `shelter-connect` at `["TypeScript", "React", "Postgres"]`, `nlp-labs` at `["Python"]`, and `river-permit` at `["Python"]`. `assertProject` must still reject a skill outside `SKILLS` and a duplicate skill on one card. Do not change `shortName`, `title`, `summary`, `repositoryUrl`, `image`, `externalUrl`, `onSite`, or array order.
- [X] T005 [P] [US3] In `app/projects/page.tsx`, replace the comma-separated skill line with the card's `skills` in array order. Each name is Geist Mono 13px, weight 400, Ink `#1C2422`. Beside `Python`, `Postgres`, `TypeScript`, `React`, `Hugging Face`, and `Java`, render one shared mark from `react-icons`: `SiPython`, `SiPostgresql`, `SiTypescript`, and `SiReact` from `react-icons/si`, `SiHuggingface` from `react-icons/si`, and `FaJava` from `react-icons/fa`. Draw each mark at 13px in Ink through `currentColor`. Do not use Current `#3E6B66` and do not wrap a mark or a name in a link. `SQL`, `Java Swing`, and `Unix` show the name only, with no empty box and no broken image. The same name always uses the same mark. When `skills.length` is 0, render no technology row. Do not change the title, summary, image, repository link, or Open action.
- [X] T006 [P] [US3] In `tests/rewrites.test.ts`, assert `level-up` `skills` deep-equal `["Hugging Face"]` and `osu-clone` `skills` deep-equal `["Java", "SQL", "Java Swing"]`. Keep the existing assertions that `colorado-vote` skills are `["Postgres"]`, `shelter-connect` skills are `["TypeScript", "React", "Postgres"]`, the shortName order is `colorado-vote`, `shelter-connect`, `nlp-labs`, `level-up`, `osu-clone`, `river-permit`, and `openHref` plus `buildRewrites` stay as they are. Do not add a new test file.

**Checkpoint**: User Story 3 is testable on its own. Home and Resume can still be unchanged.

---

## Phase 6: User Story 4 - Leave Home through the top navigation (Priority: P2)

**Goal**: Home no longer shows a second Resume and Projects pair. The top nav still opens both.

**Independent Test**: Open `/`. Nothing under the introduction links to `/resume` or `/projects`. The nav still opens `/resume` and `/projects` in one action each. Nav labels stay Home, Resume, and Projects.

### Implementation for User Story 4

- [X] T007 [US4] In `app/page.tsx`, delete the paragraph that links to `/resume` and `/projects`. Keep the centered introduction from T002. Do not edit `app/components/nav.tsx`. The nav labels stay Home, Resume, and Projects.

**Checkpoint**: User Story 4 is testable on its own once the introduction block is still the centered sentence.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Confirm the four stories together, and confirm the rewrite tests still pass

- [X] T008 Run the wide, narrow, missing-PDF, and mounted-app checks in `specs/007-polish-hub-pages/quickstart.md`
- [X] T009 [P] Run `npm test` and confirm `tests/rewrites.test.ts` passes with the skill arrays from T004

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: No edit. It does not block on T001's files beyond leaving them alone
- **User Stories (Phase 3–6)**: No shared code prerequisite
- **Polish (Phase 7)**: Depends on the stories you intend to ship

### User Story Dependencies

- **User Story 1 (P1)**: No dependency on other stories
- **User Story 2 (P1)**: No dependency on other stories. `app/resume/page.tsx` is not edited by any other story
- **User Story 3 (P2)**: No dependency on other stories. `lib/projects.ts`, `app/projects/page.tsx`, and `tests/rewrites.test.ts` are not edited by any other story
- **User Story 4 (P2)**: Edit `app/page.tsx` after T002 so the centered introduction is not overwritten. The nav check does not need the resume or the skill marks

### Within Each User Story

- User Story 3: T004, T005, and T006 are different files and can land together. T005 must use the nine names from T004, including the two with no mark
- User Story 4: T007 follows T002 because both edit `app/page.tsx`

### Parallel Opportunities

- T002 and T003 touch different files and can run together
- T004, T005, and T006 touch different files and can run together
- T003 can run with T004, T005, and T006
- T007 waits on T002 because both edit `app/page.tsx`
- T008 and T009 can run together after the stories they check

---

## Parallel Example: User Story 1 and User Story 2

```bash
Task: "T002 [US1] Center the introduction in app/page.tsx"
Task: "T003 [US2] Keep the resume inside the column in app/resume/page.tsx"
```

## Parallel Example: User Story 3

```bash
Task: "T004 [US3] Extend SKILLS and fill the two cards in lib/projects.ts"
Task: "T005 [US3] Render Ink marks beside skill names in app/projects/page.tsx"
Task: "T006 [US3] Update skill assertions in tests/rewrites.test.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Confirm Phase 2: no foundational edit
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Open `/` and confirm the introduction is centered and the nav is still on the left edge

### Incremental Delivery

1. Setup → no new package or route
2. User Story 1 → centered introduction
3. User Story 2 → resume inside the column
4. User Story 3 → completed skill lists and shared Ink marks
5. User Story 4 → extra Home links removed
6. Polish → quickstart.md, then `npm test`

### Parallel Team Strategy

After Setup, one person can center `app/page.tsx` while another edits `app/resume/page.tsx` and a third edits the skill list, the projects page, and the rewrite test. The Home link removal waits until the introduction block in `app/page.tsx` is centered.

---

## Notes

- [P] tasks use different files and do not depend on an unfinished edit to that file
- [US1], [US2], [US3], and [US4] map to the stories in spec.md
- Do not edit `lib/profile.ts`, `app/layout.tsx`, `app/components/nav.tsx`, `app/globals.css`, `package.json`, `next.config.ts`, or the PDF bytes
- The introduction stays one sentence. The greeting stays 25px weight 500. The paragraph stays 16px inside 30rem
- Marks use Ink `#1C2422` only. Current `#3E6B66` stays on links, the current nav item, and focus
- Stop at any checkpoint and check that story on its own

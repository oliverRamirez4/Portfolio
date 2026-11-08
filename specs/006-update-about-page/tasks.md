# Tasks: Update About Page

**Input**: Design documents from `/specs/006-update-about-page/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested. Proof is the browser checks in quickstart.md. The existing rewrite tests stay green and are not the proof of the copy or the field.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Next.js App Router at `app/`
- Profile copy in `lib/profile.ts`
- Paths match plan.md. No `src/` tree. No new package.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Hold the greeting string without changing the published paragraph yet

- [X] T001 Add `greeting` to the Profile type in `lib/profile.ts` and set it to exactly `Hi! I'm Oliver Ramirez`. Leave `about` unchanged in this task.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Keep the reading column on Paper so a later field cannot show through the letters

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Set `main` in `app/layout.tsx` to an opaque Paper `#F3F1EC` background. Keep the existing centered column `min(40rem, 100% - 2rem)`, the 25px section gap, Geist Sans and Geist Mono at weights 400 and 500, and `overflow-x: clip` on the body in `app/globals.css`.

**Checkpoint**: Foundation ready. The column is Paper. User stories can begin.

---

## Phase 3: User Story 1 - Read the new introduction (Priority: P1) 🎯 MVP

**Goal**: Home shows Oliver's new paragraph and drops the college, internship, and Budapest introduction

**Independent Test**: Open `/` and read the about paragraph from start to finish. It matches the string in T003 character for character. A line stays between 60 and 70 characters.

### Implementation for User Story 1

- [X] T003 [P] [US1] Replace `about` in `lib/profile.ts` with the continuation that begins `and I am a Software Engineer and avid learner.` The college, internship, and Budapest sentences must be absent, and the name must not be repeated in `about`. Do not change `greeting`.
- [X] T004 [P] [US1] Render `profile.about` in `app/page.tsx` at Geist Sans 16px weight 400 with `max-w-[30rem]`, inside the reading column, sharing the heading's left edge.

**Checkpoint**: User Story 1 is testable on its own. The heading may still say `My Portfolio`.

---

## Phase 4: User Story 2 - Meet Oliver by name first (Priority: P1)

**Goal**: The first heading is `Hi! I'm Oliver Ramirez`, at the display step, with one settle and a Stone hairline

**Independent Test**: Open `/`. The first heading is `Hi! I'm Oliver Ramirez` at Geist Sans 25px weight 500 in Ink `#1C2422`. It settles once and then stays. A 1px Stone `#D5D1C8` hairline sits under it. With reduced motion, the heading is still on first paint.

### Implementation for User Story 2

- [X] T005 [US2] In `app/globals.css`, add one heading animation that starts at opacity 0 and 16px below its resting place, ends at full opacity and no offset, runs once for about 400ms, and does not loop. Under `prefers-reduced-motion: reduce`, disable that animation and leave the heading fully visible. Do not animate any other element.
- [X] T006 [US2] In `app/page.tsx`, replace the heading `My Portfolio` with `profile.greeting` (`Hi! I'm Oliver Ramirez`). Use Geist Sans 25px weight 500 and Ink `#1C2422`, not Current `#3E6B66`. Add a 1px Stone `#D5D1C8` bottom border inside the column. Apply the settle class from T005. Keep the paragraph and the Resume and Projects links.

**Checkpoint**: User Stories 1 and 2 both work. The paragraph is unchanged by this phase.

---

## Phase 5: User Story 3 - See one background across the hub (Priority: P2)

**Goal**: Home, Resume, and Projects share one drifting Stone-and-Ink field in the margins

**Independent Test**: Open `/`, `/resume`, and `/projects`. The margins show the same 1px Stone `#D5D1C8` lines on a 32px grid and 1px Ink `#1C2422` dots on a 96px spacing, on Paper `#F3F1EC`. With motion allowed, the pattern drifts. With reduced motion, it is visible and still. The paragraph, nav, a project card, and the resume surface stay uninterrupted Paper. A mounted `/apps/<slug>` response does not show the field.

### Implementation for User Story 3

- [X] T007 [US3] In `app/globals.css`, paint one fixed, viewport-clipped, `pointer-events: none` field behind the column: 1px Stone `#D5D1C8` lines on a 32px grid and 1px Ink `#1C2422` dots on a 96px spacing, using those solid hex values only (no alpha, no Current `#3E6B66`). Translate the pattern by one 32px cell over 24 seconds, linear, repeating. Under `prefers-reduced-motion: reduce`, show the same marks with no translation. The field must not widen the page.
- [X] T008 [P] [US3] In `app/layout.tsx`, render that field behind `main` on every page this layout wraps, marked so it is not a heading and not announced. Leave `main` on opaque Paper `#F3F1EC` from T002. Do not add the field to a rewritten `/apps/<slug>` path.
- [X] T009 [P] [US3] In `app/resume/page.tsx`, set the resume iframe background to Paper `#F3F1EC` so the document rectangle stays Paper where it extends past the 40rem column. Do not change the PDF URL, the `min(56rem, 100vw - 2rem)` cap, the open-file link, or the sentence `The resume is not available yet.`

**Checkpoint**: The field is on Home, Resume, and Projects. Card contents and the resume file are unchanged.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Confirm the three pages together, and confirm untouched files stayed untouched

- [X] T010 Run the wide, narrow, dark-appearance, reduced-motion, and mounted-app checks in `specs/006-update-about-page/quickstart.md`
- [X] T011 [P] Confirm `npm test` still passes and that `lib/projects.ts`, `next.config.ts`, and `package.json` were not edited

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup. Blocks every user story
- **User Stories (Phase 3–5)**: Depend on Foundational
- **Polish (Phase 6)**: Depends on the stories you intend to ship

### User Story Dependencies

- **User Story 1 (P1)**: After Foundational. No dependency on other stories
- **User Story 2 (P1)**: After Foundational. Uses `profile.greeting` from Setup. Edit `app/page.tsx` after User Story 1 so the paragraph measure is not overwritten. The heading can be checked without the field
- **User Story 3 (P2)**: After Foundational. Edit `app/globals.css` after User Story 2 so the settle animation is not overwritten. The field can be checked even if the heading is still the old title

### Within Each User Story

- User Story 1: `lib/profile.ts` and `app/page.tsx` can proceed together
- User Story 2: the animation in `app/globals.css` before the heading class in `app/page.tsx`
- User Story 3: the pattern in `app/globals.css` before the layout and resume surfaces

### Parallel Opportunities

- T003 and T004 touch different files and can run together
- T008 and T009 touch different files and can run together after T007
- T010 and T011 can run together
- T005 and T007 both edit `app/globals.css`, so they stay sequential
- T004 and T006 both edit `app/page.tsx`, so they stay sequential

---

## Parallel Example: User Story 1

```bash
Task: "T003 [US1] Replace about in lib/profile.ts"
Task: "T004 [US1] Keep the 30rem measure in app/page.tsx"
```

## Parallel Example: User Story 3

```bash
Task: "T008 [US3] Mount the field behind main in app/layout.tsx"
Task: "T009 [US3] Paper background on the resume iframe in app/resume/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Open `/` and compare the paragraph with T003

### Incremental Delivery

1. Setup + Foundational → greeting constant exists, column is Paper
2. User Story 1 → new introduction
3. User Story 2 → display heading, one settle, Stone hairline
4. User Story 3 → shared field on Home, Resume, and Projects
5. Polish → quickstart.md, then `npm test`

### Parallel Team Strategy

After Foundational, one person can replace the paragraph in `lib/profile.ts` while another keeps the measure in `app/page.tsx`. The heading and the field follow in order because they share `app/page.tsx` and `app/globals.css`.

---

## Notes

- [P] tasks use different files and do not depend on an unfinished edit to that file
- [US1], [US2], and [US3] map to the stories in spec.md
- Do not edit `lib/projects.ts`, `next.config.ts`, `package.json`, the PDF bytes, or the nav labels
- Weights stay 400 or 500. The heading stays 25px. The paragraph stays 16px
- Marks use solid Paper `#F3F1EC`, Ink `#1C2422`, and Stone `#D5D1C8` only. Current `#3E6B66` stays on links, the current nav item, and focus
- Stop at any checkpoint and check that story on its own

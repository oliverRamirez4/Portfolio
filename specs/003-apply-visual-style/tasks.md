# Tasks: Apply Visual Style

**Input**: Design documents from `/specs/003-apply-visual-style/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested. Proof is the browser checks in quickstart.md. The existing rewrite tests stay green and are not the proof of this look.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Next.js App Router at `app/`
- Tokens in `app/globals.css` and `tailwind.config.ts`
- Paths match plan.md. No `src/` tree.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Name the four colors once, without adding a package

- [X] T001 Add Paper `#F3F1EC`, Ink `#1C2422`, Stone `#D5D1C8`, and Current `#3E6B66` to `tailwind.config.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared type, column, and color that every hub page uses

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 [P] Set Paper `#F3F1EC` and Ink `#1C2422` as the only page colors, delete the dark-appearance swap, set `color-scheme: light`, color links and `:focus-visible` with Current `#3E6B66` only, and set `overflow-x: clip` in `app/globals.css`
- [X] T003 [P] Load Geist Sans at weights 400 and 500 beside Geist Mono at weights 400 and 500, and set one centered column of `min(40rem, 100% - 2rem)` with a 16px side margin and a 25px section gap in `app/layout.tsx`

**Checkpoint**: Foundation ready. Home, Resume, and Projects share the column and the palette. User stories can begin.

---

## Phase 3: User Story 1 - Read the hub in the stated look (Priority: P1) 🎯 MVP

**Goal**: The about page is a utilitarian document in the stated type and measure, with no hero or decoration

**Independent Test**: Open `/` and read the about text. Background is Paper `#F3F1EC`, text is Ink `#1C2422`, the heading is Geist Sans 25px weight 500, and a body line is 60–70 characters. No hero, illustration, or outdoor icon.

### Implementation for User Story 1

- [X] T004 [US1] Set the Home heading to Geist Sans 25px weight 500 and the about paragraph to a 30rem measure at Geist Sans 16px weight 400 in `app/page.tsx`

**Checkpoint**: User Story 1 is testable on its own. The about text is unchanged.

---

## Phase 4: User Story 2 - See where you are (Priority: P1)

**Goal**: Home, Resume, and Projects stay the only nav items, and the open page is the only one in Current

**Independent Test**: Open `/`, `/resume`, and `/projects`. The nav reads Home, Resume, Projects in Geist Mono 13px. Only the open page uses Current `#3E6B66` and `aria-current="page"`. Tab to a link and confirm the focus outline is Current.

### Implementation for User Story 2

- [X] T005 [P] [US2] Mark the open path with Current `#3E6B66` and `aria-current="page"`, keep the other items Ink `#1C2422`, and set the name and the three links to Geist Mono 13px weight 400 or 500 with a 25px gap in `app/components/nav.tsx`
- [X] T006 [P] [US2] Change the LinkedIn and GitHub controls to plain anchors, color them Current `#3E6B66`, remove hover motion, and use a 25px gap in `app/components/footer.tsx`

**Checkpoint**: User Stories 1 and 2 both work. Destinations are unchanged.

---

## Phase 5: User Story 3 - Scan project cards (Priority: P1)

**Goal**: Every project card sits in the reading column with its existing contents and a Stone border

**Independent Test**: Open `/projects`. Each card has a 1px Stone `#D5D1C8` border, a 20px title, a 16px summary, 13px skills when present, and its repository link. Open appears only when a destination already exists. An existing picture remains. A card without one has no added image. Nothing scales on hover.

### Implementation for User Story 3

- [X] T007 [US3] Replace the MUI card chrome in `app/projects/page.tsx` with a 1px Stone `#D5D1C8` border on Paper `#F3F1EC`, a title at Geist Sans 20px weight 500 in Ink `#1C2422`, a summary at Geist Sans 16px weight 400, skills at Geist Mono 13px, the existing picture only when present, and plain Current `#3E6B66` anchors for the repository and Open, with no hover motion

**Checkpoint**: Cards are restyled. `lib/projects.ts` is unchanged.

---

## Phase 6: User Story 4 - Read the resume (Priority: P2)

**Goal**: The posted PDF stays readable, wider than the column only on a wide screen, and never wider than 56rem

**Independent Test**: With the PDF posted, open `/resume` wider than 40rem and confirm the document is centered, wider than the column, and no wider than 56rem. Narrower than 40rem, it stays on screen and the page does not scroll sideways. Without the file, the page says "The resume is not available yet."

### Implementation for User Story 4

- [X] T008 [US4] Keep the open-file link and the absent sentence in `app/resume/page.tsx`, show the PDF at `min(56rem, 100vw - 2rem)` centered, and keep it inside the screen below 40rem

**Checkpoint**: Resume behavior is unchanged. Only the width changed.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Confirm the three pages together and confirm untouched files stayed untouched

- [X] T009 Run the wide, narrow, and dark-appearance checks in `specs/003-apply-visual-style/quickstart.md`
- [X] T010 Confirm `npm test` still passes and that `lib/projects.ts`, `lib/profile.ts`, and `next.config.ts` were not edited

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup. Blocks every user story
- **User Stories (Phase 3–6)**: Depend on Foundational. They do not depend on each other
- **Polish (Phase 7)**: Depends on the stories you intend to ship

### User Story Dependencies

- **User Story 1 (P1)**: After Foundational. No dependency on other stories
- **User Story 2 (P1)**: After Foundational. No dependency on other stories
- **User Story 3 (P1)**: After Foundational. No dependency on other stories
- **User Story 4 (P2)**: After Foundational. No dependency on other stories

### Parallel Opportunities

- T002 and T003 touch different files and can run together after T001
- T005 and T006 touch different files and can run together
- After Foundational, T004, T005, T006, T007, and T008 touch different files and can run together

---

## Parallel Example: After Foundational

```bash
Task: "T004 [US1] Home heading and 65ch measure in app/page.tsx"
Task: "T005 [US2] Current nav item in app/components/nav.tsx"
Task: "T006 [US2] Footer anchors in app/components/footer.tsx"
Task: "T007 [US3] Project cards in app/projects/page.tsx"
Task: "T008 [US4] Resume width in app/resume/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Open `/` and check Paper, Ink, the 25px heading, and a 60–70 character line

### Incremental Delivery

1. Setup + Foundational
2. User Story 1 → about page in the stated look
3. User Story 2 → current location in the nav
4. User Story 3 → cards in the column
5. User Story 4 → resume cap at 56rem
6. Polish → quickstart.md on wide, narrow, and dark appearance

### Parallel Team Strategy

After Foundational, one person can take each of `app/page.tsx`, `app/components/nav.tsx`, `app/components/footer.tsx`, `app/projects/page.tsx`, and `app/resume/page.tsx`.

---

## Notes

- [P] tasks use different files
- [US1] through [US4] map to the stories in spec.md
- Do not edit the about string, the project registry, the PDF bytes, or the redirects
- Weights stay 400 or 500. Sizes stay 13, 16, 20, or 25px
- Stop at any checkpoint and check that story on its own

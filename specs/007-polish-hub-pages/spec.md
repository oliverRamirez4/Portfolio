# Feature Specification: Polish Hub Pages

**Feature Branch**: `007-polish-hub-pages`

**Created**: 2026-11-07

**Status**: Draft

**Input**: User description: "We need the text in the about me page to be centered. That will look cleaner. We need the resume to not span out into edges and have a strange over lap with the grid pattern and we need to do this with the cleanest UI solution to keep it look natural. We need the technologies on each project properly listed with all the ones involved. We could have an icon based representation of each of the technologies. Lastly on the home page we don't really need a secondary nav solution for resume and project because it is already at the top nav bar."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read a centered introduction (Priority: P1)

A visitor opens Home and reads Oliver's introduction as centered text. The greeting and the paragraph stay one sentence, in the reading column, and the lines sit in the middle of that column instead of sharing a hard left edge. The top navigation stays where it is.

**Why this priority**: The introduction is the first thing a visitor reads. Centering it is the change Oliver asked for first, and it is useful even if the resume, the project cards, and the extra Home links are left alone.

**Independent Test**: Open Home and read the introduction. The greeting and the paragraph are centered in the reading column. The top navigation still sits on the column's left edge.

**Acceptance Scenarios**:

1. **Given** a visitor opens Home, **When** they read the introduction, **Then** the greeting "Hi! I'm Oliver Ramirez" and the paragraph that continues "and I am a Software Engineer and avid learner..." are centered in the reading column. A line stays near 65 characters.
2. **Given** that introduction, **When** the visitor looks at the top navigation, **Then** Home, Resume, and Projects still sit on the column's left edge. They are not centered with the paragraph.
3. **Given** the greeting, **When** the visitor looks under it, **Then** the Stone hairline sits under the greeting words, centered with them. The greeting is still the largest text on the page, in Ink, and it settles once and then stays still.
4. **Given** a screen narrower than the reading column, **When** the introduction wraps, **Then** it stays inside the column and the page does not scroll sideways.

---

### User Story 2 - Read the resume inside the grid (Priority: P1)

A visitor opens Resume and reads the same document as today. The page no longer runs the document into the edges of the screen, and the grid no longer collides with it. The grid remains visible around the document, and the document sits on uninterrupted Paper as a natural part of the page. No extra frame, shadow, or second panel is added to hide the overlap.

**Why this priority**: The overlap makes the resume look broken. Fixing the placement is useful even if Home and the project cards stay as they are.

**Independent Test**: Open Resume on a wide screen and on a narrow screen. On a wide screen the grid shows on both sides of the document and does not cross it. On a narrow screen the page does not scroll sideways. The file itself is unchanged.

**Acceptance Scenarios**:

1. **Given** the resume file is available and the screen is wide enough to show the grid beside it, **When** a visitor opens Resume, **Then** a margin of the grid is visible on both the left and the right of the document. The document does not touch the viewport edge and the grid does not run across the page.
2. **Given** that document, **When** the visitor reads it, **Then** it is the same resume file as before, on uninterrupted Paper, and the page still offers one action to open that file.
3. **Given** that page, **When** the visitor looks at the heading and the open-file action, **Then** both stay in the reading column on its left edge. Only the document is held in from the edges.
4. **Given** a narrow screen, **When** the visitor opens Resume, **Then** the document uses the same side inset as the rest of the page and the page does not scroll sideways.
5. **Given** the resume file is not available, **When** a visitor opens Resume, **Then** they see "The resume is not available yet." and no empty document area stretches into the grid.

---

### User Story 3 - See every technology on a project (Priority: P2)

A visitor opens Projects and, on each card, sees every technology that project uses. Each technology is a readable name with a small mark beside it. The same technology uses the same mark on every card. The mark is a label, not a picture and not a link.

**Why this priority**: Two cards currently name no technologies even though their descriptions do, and another card names only part of what its description implies is in use. A visitor can already read the cards; this story makes the technology line truthful. It does not depend on the Home or Resume layout changes.

**Independent Test**: Open Projects and compare each card's technology line with the list in this story. Every name is readable. Repeated technologies share one mark.

**Acceptance Scenarios**:

1. **Given** a visitor opens Projects, **When** they read Colorado Down Ballot Visuals, **Then** its technologies are Postgres.
2. **Given** Shelter Connect, **When** they read its technologies, **Then** they are TypeScript, React, and Postgres.
3. **Given** Natural Language Processing Labs, **When** they read its technologies, **Then** the technology is Python.
4. **Given** Conversational AI Chat Interface, **When** they read its technologies, **Then** the technology is Hugging Face.
5. **Given** Osu Rhythm Game Clone, **When** they read its technologies, **Then** they are Java, SQL, and Java Swing.
6. **Given** River Permit API Wrapper, **When** they read its technologies, **Then** the technology is Python.
7. **Given** any of those technologies, **When** it appears on more than one card, **Then** it uses the same mark and the same spelling. Postgres on Colorado Down Ballot Visuals matches Postgres on Shelter Connect. Python on the labs matches Python on River Permit API Wrapper.
8. **Given** a technology, **When** the visitor looks at it, **Then** its name is visible in Ink. The mark is Ink on Paper. It does not use Current, it is not a link, and it does not depict the outdoors.
9. **Given** a technology with no suitable mark, **When** the card shows it, **Then** the name still appears, with no empty box and no broken image.
10. **Given** the cards, **When** the visitor compares them with the cards before this change, **Then** titles, summaries, pictures, repository links, Open actions, and card order are unchanged.

---

### User Story 4 - Leave Home through the top navigation (Priority: P2)

A visitor on Home no longer sees a second pair of Resume and Projects links under the introduction. Those destinations stay in the top navigation, and one action there still opens each page.

**Why this priority**: The duplicate links repeat a choice the visitor already has. Removing them makes Home calmer. The top navigation already covers the path, so this story can ship on its own.

**Independent Test**: Open Home. The introduction has no Resume or Projects link beneath it. The top navigation still opens Resume and Projects in one action each.

**Acceptance Scenarios**:

1. **Given** a visitor opens Home, **When** they look under the introduction, **Then** there is no second Resume link and no second Projects link.
2. **Given** that page, **When** they use the top navigation, **Then** Resume opens the resume page and Projects opens the project cards, each in one action.
3. **Given** Resume or Projects, **When** the visitor looks at the top navigation, **Then** its labels are still Home, Resume, and Projects.

---

### Edge Cases

- A narrow screen wraps the centered introduction inside the reading column and keeps the resume inside the viewport. Neither page scrolls sideways.
- The greeting still settles once for a visitor who allows motion, and it is fully visible and still for a visitor who prefers reduced motion. Centering does not add a second motion.
- A dark operating-system appearance does not change the page colors. Text stays Ink, the page stays Paper, and the grid stays Stone and Ink.
- A project whose description names no technology, and which has none recorded, shows no empty technology row. After this change, every current card has at least one technology.
- A technology named twice on one card appears once.
- A long technology name stays inside its card and does not widen the page.
- The resume heading and the open-file action stay readable when the document is inset.
- A mounted project does not gain the centered introduction, the resume inset, the technology marks, or the Home link change. Those belong to the pages this site renders.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Home MUST center the introduction in the reading column. The introduction remains the greeting "Hi! I'm Oliver Ramirez" continuing "and I am a Software Engineer and avid learner. I am often exploring new technologies and trying out new projects. I use this site to centralize some of my side projects and explore new ideas. Currently I am trying out spec driven development workflows and other things I don't get to do regularly in my job as a SWE." A line MUST stay near 65 characters.
- **FR-002**: The top navigation MUST keep Home, Resume, and Projects on the reading column's left edge. Centering the introduction MUST NOT center the navigation.
- **FR-003**: The Stone hairline MUST sit under the greeting and stay centered with those words. The greeting MUST remain the largest text on Home, in Ink, settling once and then holding still. A visitor who prefers reduced motion MUST see it still and fully visible, with no added motion.
- **FR-004**: The resume document MUST sit in from both viewport edges so the grid stays visible on both sides on a wide screen and does not cross the document. The document MUST stay on uninterrupted Paper. The page MUST NOT add a frame, shadow, or second panel around it.
- **FR-005**: The Resume heading and the action that opens the resume file MUST stay in the reading column on its left edge. The file MUST be the same file as before. When the file is missing, the page MUST show "The resume is not available yet." and MUST NOT show an empty document area in the grid.
- **FR-006**: On a narrow screen, the centered introduction and the resume document MUST stay inside the viewport without sideways scrolling. The resume MUST use the same side inset as the rest of the page.
- **FR-007**: Each project card MUST list the technologies named for it in User Story 3, once each, in that order. A card MUST NOT omit a technology its own summary names, and MUST NOT add a technology that summary does not name and that was not already shown on the card.
- **FR-008**: Each technology MUST show its name in Ink. It SHOULD show one small mark beside that name. The same technology MUST use the same mark and the same spelling on every card. A missing mark MUST leave the name visible, with no empty box and no broken image. Marks MUST NOT use Current, MUST NOT be links, and MUST NOT depict the outdoors.
- **FR-009**: Home MUST NOT show a Resume or Projects link under the introduction. The top navigation MUST still open Resume and Projects in one action each.
- **FR-010**: Project titles, summaries, pictures, repository links, Open actions, card order, the resume file's contents, navigation labels, and mounted projects MUST keep their current content and behavior, except for the technology line required above and the placement required for the introduction and the resume.

### Key Entities

- **Introduction**: The greeting and the about paragraph on Home, read as one centered sentence.
- **Resume document**: The existing resume file, shown inset from the grid. The heading and the open-file action stay in the reading column.
- **Project card**: One project on the Projects page. Its technology line is the only card content this feature changes.
- **Technology**: A name a visitor can read, optionally with one shared mark. The sets for the current cards are listed in User Story 3.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On Home, the introduction is centered in the reading column, a line stays between 60 and 70 characters, and the top navigation remains on the column's left edge.
- **SC-002**: On a wide screen, a visitor can see the grid on both sides of the resume, the document does not meet the viewport edge, and the grid does not cross the document. The heading and the open-file action stay left-aligned in the reading column.
- **SC-003**: On a narrow screen, Home and Resume do not scroll sideways.
- **SC-004**: All six project cards show the technology lists in User Story 3. Every name is readable, each technology appears once per card, and a repeated technology uses one shared mark.
- **SC-005**: Home shows no second Resume or Projects link. From the top navigation, a visitor opens each of those pages in one action.
- **SC-006**: The resume file, project titles, summaries, pictures, links, Open actions, and card order match what a visitor saw before this change.

## Assumptions

- Home is the about page. There is no separate About destination. "The text" means the greeting and the paragraph, not the top navigation.
- Centering applies to that introduction only. Resume, Projects, and the top navigation keep the reading column's left edge. The resume document is inset from the edges, and its heading is not centered.
- The clean placement for the resume is an inset of the existing document so the grid frames it. The page does not gain a new container, color, or decoration. The document may stay wider than the reading column when the screen has room, as long as both sides still show the grid and the document never meets the viewport edge.
- A technology belongs on a card when the card already shows it or the project's own summary names it. Colorado Down Ballot Visuals stays Postgres, because the summary names PostgreSQL and does not name another technology. Shelter Connect stays TypeScript, React, and Postgres. Natural Language Processing Labs stays Python. Conversational AI Chat Interface gains Hugging Face, which its summary names. Osu Rhythm Game Clone gains Java, SQL, and Java Swing, which its summary names. River Permit API Wrapper stays Python. Technologies the summaries do not name are out of scope.
- "Full stack" and "front end technologies" in a summary are not technology names, so they are not added as labels.
- A mark is a small label for a technology. The name remains the part a visitor must be able to read. Marks follow the existing palette: Ink on Paper, never Current, and never an outdoor scene.
- The duplicate links are the Resume and Projects links under the introduction. The top navigation is unchanged.
- Mounted projects, the resume file's contents, and every project field other than the technology line stay as they are.

# Feature Specification: Apply Visual Style

**Feature Branch**: `003-apply-visual-style`

**Created**: 2026-11-06

**Status**: Draft

**Input**: User description: "Implement a design refresh that has impressive UI features and implements the practices outlined in the constitution."

## Clarifications

### Session 2026-11-06

- Q: What does "impressive UI features" add beyond the constitution's visual law? → A: It means the stated look is applied completely and consistently. It does not add a hero, extra color, decoration, motion, or a second palette. The constitution overrides a conflicting reading.
- Q: On a screen narrower than the 40rem reading column, should the page shrink to fit the screen? → A: The column shrinks to the screen with a small side margin. The page does not scroll sideways. The resume is wider than the text only when the screen is wider than 40rem.
- Q: On a screen wider than 40rem, how wide should the resume be? → A: The resume is wider than the 40rem column and stops at 56rem, centered.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read the hub in the stated look (Priority: P1)

A visitor opens the site and reads who Oliver is. The page is a quiet, utilitarian document: paper background, ink text, one reading column, and type that does the work. Nothing on the page depicts kayaking, rivers, or the outdoors.

**Why this priority**: The refresh is the look of the hub. The about page is the first thing a visitor sees, and it has to carry the whole visual law on its own.

**Independent Test**: Open the site and read the about text. Check the background, the text color, the type, the line length, and that no decorative image or hero was added.

**Acceptance Scenarios**:

1. **Given** a visitor opens the site, **When** the first page loads, **Then** the background is Paper `#F3F1EC` and the text is Ink `#1C2422`.
2. **Given** that page, **When** the visitor reads the about text, **Then** the body is Geist Sans at 16px, the page heading is Geist Sans at 25px, and a line of reading text stays near 65 characters.
3. **Given** the operating system is set to a dark appearance, **When** the visitor opens the site, **Then** the page still uses Paper and Ink.
4. **Given** the first page, **When** the visitor looks for a hero, a decorative illustration, a photograph added for atmosphere, or an icon of kayaking, rivers, or the outdoors, **Then** none is present.
5. **Given** the screen is narrower than 40rem, **When** the visitor reads the about page, **Then** the column shrinks to the screen with a small side margin and the page does not scroll sideways.

---

### User Story 2 - See where you are (Priority: P1)

A visitor moves among Home, Resume, and Projects. The nav stays those three items. The item for the current page is marked with the single accent. Keyboard focus uses that same accent.

**Why this priority**: The refresh has to keep the hub usable. The accent is how a visitor knows where they are and what they can activate.

**Independent Test**: Open each of Home, Resume, and Projects. Confirm the current item, then tab to a link and confirm focus uses the accent and nothing else does.

**Acceptance Scenarios**:

1. **Given** a visitor is on any hub page, **When** they look at the nav, **Then** it reads Home, Resume, and Projects, in Geist Mono.
2. **Given** a visitor is on one of those pages, **When** they look at the nav, **Then** only the item for that page uses Current `#3E6B66`.
3. **Given** a visitor tabs to a link, **When** focus lands, **Then** the focus uses Current and the accent appears nowhere else on the page except links, that current item, and focus.
4. **Given** a visitor chooses Resume or Projects from Home, **When** the next page opens, **Then** they arrive in one action and the about text, resume, and project list are unchanged.

---

### User Story 3 - Scan project cards (Priority: P1)

A visitor opens Projects and reads every card inside the same column. Each card keeps its border, title, summary, skills, and links. A picture stays only when that project already has one.

**Why this priority**: The cards are the front door to the work. The refresh restyles them and does not change what a card is.

**Independent Test**: Open Projects and read every card, including one with a picture and the rule for a card that has none, without leaving the hub.

**Acceptance Scenarios**:

1. **Given** one or more projects, **When** a visitor opens Projects, **Then** each card sits in the reading column with a Stone `#D5D1C8` border, a title, a summary, its skills, and its links.
2. **Given** a project already has a picture, **When** the visitor views its card, **Then** that picture remains.
3. **Given** a project has no picture, **When** the visitor views its card, **Then** the card is complete and no decorative picture was added.
4. **Given** a card link, **When** the visitor looks at it, **Then** the link uses Current and the rest of the card does not.

---

### User Story 4 - Read the resume (Priority: P2)

A visitor opens Resume and can read the PDF. On a wide screen the document is wider than the reading column, stops at 56rem, and stays centered. The way to open the file itself remains. If the file is not posted, the page says so in the same look.

**Why this priority**: The resume is already the career record. The refresh makes it readable and does not replace it.

**Independent Test**: Open Resume with the PDF posted and read it. Repeat with the file absent and read the unavailable message.

**Acceptance Scenarios**:

1. **Given** the resume PDF is posted and the screen is wider than 40rem, **When** a visitor opens Resume, **Then** they see that PDF wider than the reading column, no wider than 56rem, centered, and can open the file itself.
2. **Given** the resume PDF is posted and the screen is narrower than 40rem, **When** a visitor opens Resume, **Then** the PDF stays within the screen and the page does not scroll sideways.
3. **Given** the resume has not been posted, **When** a visitor opens Resume, **Then** the page says the resume is not available yet, in Paper, Ink, and the stated type.
4. **Given** the visitor is on Resume, **When** they look at the page heading and the nav, **Then** the heading is Geist Sans at 25px and Resume is the current nav item.

---

### Edge Cases

- The operating system appearance is dark. Hub pages stay Paper and Ink.
- A project card has no picture. It stays a complete card with a Stone border and no added image.
- A project card has a picture. That existing picture stays. The refresh does not add a new photograph.
- The resume file is missing. The unavailable sentence uses the same colors and type as the rest of the page.
- About text is long. Lines stay near 65 characters inside the 40rem column, with a consistent left edge.
- The screen is narrower than 40rem. The column shrinks to the screen with a small side margin. Home, Resume, and Projects do not scroll sideways. The resume is not wider than the screen.
- The screen is wider than 56rem. The resume stops at 56rem and stays centered. It does not grow to the edges of the screen.
- A visitor uses keyboard focus. Focus is Current. Headings, body, card fills, and borders do not pick up the accent.
- A visitor opens the old experience address. They arrive at Resume, which uses this look.
- A visitor opens an old blog address. They arrive at Home, which uses this look.
- A mounted project fills its own view. This refresh does not restyle that project.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Home, Resume, and Projects MUST use Paper `#F3F1EC` as the page background and Ink `#1C2422` as the text.
- **FR-002**: Those pages MUST keep Paper and Ink when the operating system uses a dark appearance.
- **FR-003**: Current `#3E6B66` MUST be the only accent, and it MUST be used only for links, the current nav item, and focus.
- **FR-004**: Hairline rules and card borders MUST use Stone `#D5D1C8`.
- **FR-005**: Body text MUST be Geist Sans at 16px. The page display heading MUST be Geist Sans at 25px. Titles MUST be Geist Sans at 20px. Nav, labels, and meta MUST be Geist Mono at 13px.
- **FR-006**: Type weights MUST be regular and medium only.
- **FR-007**: Reading text MUST stay near 65 characters per line.
- **FR-008**: Hub pages MUST use one centered reading column, max width 40rem, with a consistent left edge. On a screen narrower than 40rem, that column MUST shrink to the screen with a small side margin, and the page MUST NOT scroll sideways. Sections MUST stack with space taken from the 1.25 ratio shared with the type steps 13px, 16px, 20px, and 25px.
- **FR-009**: The nav MUST remain Home, Resume, and Projects. The item for the open page MUST be the only nav item in Current.
- **FR-010**: Project cards MUST stay in the reading column and MUST keep a Stone border, a title, a summary, the project's skills, and the project's links. An existing project picture MUST remain. A card without a picture MUST stay valid without a new image.
- **FR-011**: When the resume PDF is posted, Resume MUST offer a way to open the file. On a screen wider than 40rem the PDF MUST be wider than the reading column, MUST stop at 56rem, and MUST be centered. On a narrower screen the PDF MUST stay within the screen. When it is not posted, Resume MUST say the resume is not available yet.
- **FR-012**: The refresh MUST NOT add a hero, a decorative illustration, photography added for atmosphere, motion used as decoration, or an icon that depicts kayaking, rivers, or the outdoors.
- **FR-013**: The about text, the resume document, the project list, repository links, and the choice to open a project MUST keep their current behavior. The refresh MUST NOT add or remove a hub section.
- **FR-014**: Pages this hub does not render, including a mounted project that fills the view, are out of scope.

### Key Entities

- **Visual law**: The palette, type roles, type steps, column, and accent rules this refresh applies. It is fixed by the constitution. This feature does not offer a visitor a way to change it.
- **Hub page**: Home, Resume, or Projects. Each page shows the same chrome and the same visual law, with one current nav item.
- **Project card**: The existing card for one project. The refresh changes its presentation and keeps its contents.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On Home, Resume, and Projects, the only colors a visitor can find are Paper `#F3F1EC`, Ink `#1C2422`, Stone `#D5D1C8`, and Current `#3E6B66`, and Current appears only on links, the current nav item, and focus.
- **SC-002**: A line of about-page body text is between 60 and 70 characters.
- **SC-003**: From any hub page, a visitor can name the current section by the accented nav item and can open either of the other two sections in one action.
- **SC-004**: With the resume posted on a screen wider than 40rem, its document is wider than the reading column, no wider than 56rem, centered, and can be read and opened. On a screen narrower than 40rem, Home, Resume, and Projects show their content without sideways scrolling. With the resume absent, the unavailable sentence is visible in the same look.
- **SC-005**: Home, Resume, and Projects contain zero heroes, zero decorative illustrations, zero atmosphere photographs, and zero icons of kayaking, rivers, or the outdoors.
- **SC-006**: With the operating system set to a dark appearance, all three pages still show Paper and Ink on the first load.

## Assumptions

- "Impressive UI features" means the constitution's visual law is applied on every hub page with no exceptions. It does not authorize a hero, animation, extra color, or a different layout.
- The constitution overrides this spec where they disagree. The colors, typefaces, sizes, weights, column, accent limits, and ban on outdoor imagery are taken from that law and are not redesigned here.
- Project pictures that a card already has are part of the card, not new photography. This refresh does not add pictures.
- Vertical space between sections uses the existing 1.25 steps (13px, 16px, 20px, 25px). No new spacing scale is introduced.
- On a screen narrower than 40rem, the reading column shrinks to the screen with a small side margin. The page does not scroll sideways. The resume is wider than the text column only when the screen is wider than 40rem.
- On a screen wider than 40rem, the resume stops at 56rem and stays centered.
- Old experience and blog addresses keep sending visitors to Resume and Home. Those destinations use this look. The addresses are not sections.
- A later mount of another app is a different feature. This refresh stops at the pages the hub itself renders.

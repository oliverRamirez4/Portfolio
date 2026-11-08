# Feature Specification: Update About Page

**Feature Branch**: `006-update-about-page`

**Created**: 2026-11-07

**Status**: Draft

**Input**: User description: "I need to update my about me page to have a different description. \"Hi! My name is Oliver Ramirez and I am a Software Engineer and avid learner. I am often exploring new technologies and trying out new projects. I use this site to centralize some of my side projects and explore new ideas. Currently I am trying out spec driven development workflows and other things I don't get to do regularly in my job as a SWE.\" Then I need to add some pop to the page like maybe add some effects to my name. Make the about me section pop and add some effects Like possibly a enlarged Hi! I'm Oliver Ramirez. We can make the page more exciting and visually impressive and you can have some autonomy to make those design choices per my design guidelines in the constitution"

## Clarifications

### Session 2026-11-07

- Q: May a general design pattern change pages other than Home? → A: Yes. Shared patterns, including a background effect, apply across the hub pages this site renders. The earlier story that kept Resume and Projects visually unchanged is withdrawn. The words, files, cards, and actions on those pages stay.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read the new introduction (Priority: P1)

A visitor opens Home and reads who Oliver is now. The about paragraph is the text Oliver supplied: he is a software engineer and an avid learner, he uses the site for side projects and new ideas, and he is currently trying spec-driven development and other work he does not do regularly in his job.

**Why this priority**: The published introduction is out of date. Replacing it is useful even if the greeting and the background are checked separately.

**Independent Test**: Open Home and read the about paragraph from start to finish. Compare it with the supplied text.

**Acceptance Scenarios**:

1. **Given** a visitor opens Home, **When** they read the introduction, **Then** it begins with the enlarged greeting "Hi! I'm Oliver Ramirez" and continues "and I am a Software Engineer and avid learner. I am often exploring new technologies and trying out new projects. I use this site to centralize some of my side projects and explore new ideas. Currently I am trying out spec driven development workflows and other things I don't get to do regularly in my job as a SWE." The name is not repeated in that introduction.
2. **Given** that paragraph, **When** the visitor looks for the previous introduction about Colorado College, internships, or research in Budapest, **Then** that text is gone.
3. **Given** that paragraph, **When** the visitor reads a line of it, **Then** the line stays near 65 characters, inside the one reading column.

---

### User Story 2 - Meet Oliver by name first (Priority: P1)

A visitor opening Home reads "Hi! I'm Oliver Ramirez" as the enlarged opening of the introduction, in the same sentence as the rest of the about text. The greeting is the largest text on the page. The name settles into place once, then holds still, and a Stone hairline draws under those words from the left and stays.

**Why this priority**: Oliver asked for the name to carry an effect and for the greeting to be enlarged. That treatment is specific to Home and is useful even without the shared background.

**Independent Test**: Open Home and confirm the first heading is "Hi! I'm Oliver Ramirez", that it is the display step, that it settles once and then stays still, and that a Stone hairline sits under it.

**Acceptance Scenarios**:

1. **Given** a visitor opens Home, **When** the page loads, **Then** the first heading is "Hi! I'm Oliver Ramirez" and the previous heading "My Portfolio" is gone.
2. **Given** that heading, **When** the visitor compares it with the about paragraph, **Then** the heading is the display step (Geist Sans, 25px, medium) and the paragraph is body type (Geist Sans, 16px, regular).
3. **Given** a visitor who allows motion, **When** Home opens, **Then** the greeting moves into place once and then stays still. It does not loop.
4. **Given** that heading, **When** the visitor looks under it, **Then** a Stone hairline sits under the greeting, and the greeting and the paragraph share the column's left edge.
5. **Given** the screen is narrower than the reading column, **When** the greeting wraps, **Then** it stays inside the column and the page does not scroll sideways.
6. **Given** the greeting, **When** the visitor looks at its color, **Then** it is Ink. It does not use Current.

---

### User Story 3 - See one background across the hub (Priority: P2)

Home, Resume, and Projects share one background effect. The ground is Paper. Over it, a Stone grid drifts one way and Ink dots drift the other way, more slowly. With a fine pointer, the field leans toward the pointer and eases back when the pointer leaves. The same field is visible in the margins of all three pages. Reading text, the nav, project cards, and the resume sit on Paper, so the field frames the column and does not run through the letters. The field is not a picture, not a hero, and not an outdoor scene.

**Why this priority**: Oliver asked for more presence, and he said a general pattern such as a background effect may change every hub page. The introduction and the name still stand if this field is checked on its own.

**Independent Test**: Open Home, Resume, and Projects. Confirm the same drifting field is in the margins of each, that body text still sits on Paper, and that a mounted project does not gain the field.

**Acceptance Scenarios**:

1. **Given** a visitor opens Home, **When** they look past the reading column, **Then** they see a field of Stone and Ink marks on Paper, and that field is moving.
2. **Given** the visitor then opens Resume and Projects, **When** each page loads, **Then** the same field is in the margins. It is not a different pattern on each page.
3. **Given** any of those three pages, **When** the visitor reads body text, the nav, a project card, or the resume, **Then** that content sits on uninterrupted Paper. The field does not cross the letters or the resume page.
4. **Given** a visitor prefers reduced motion, **When** they open Home, Resume, or Projects, **Then** the field is still visible and it does not move. The greeting is already in place and does not settle.
5. **Given** a visitor opens a mounted project, **When** that project fills the view, **Then** this field is absent. The project keeps its own presentation.
6. **Given** any hub page, **When** the visitor looks for a hero, a decorative illustration, a photograph added for atmosphere, or an icon of kayaking, rivers, or the outdoors, **Then** none is present. Current `#3E6B66` still appears only on links, the current nav item, and focus.

---

### Edge Cases

- The greeting is longer than the column on a narrow screen. It wraps on spaces, stays left-aligned with the paragraph, and does not cause sideways scrolling. The hairline stays inside the column.
- The paragraph is several sentences. Each reading line stays near 65 characters. The wording, capitalization, and punctuation stay exactly as supplied, including "Software Engineer", "spec driven development", and "SWE".
- The introduction names Oliver once. The enlarged "Hi! I'm Oliver Ramirez" is the opening of the sentence, and the rest continues "and I am a Software Engineer...". The sentence does not also say "Hi! My name is Oliver Ramirez".
- A visitor prefers reduced motion. The background field is present and still. The greeting, the line, the column, and the nav underline do not move.
- The operating system appearance is dark. Home, Resume, and Projects stay Paper and Ink. The field still uses only Stone and Ink on Paper.
- Keyboard focus lands on a link. Focus uses Current. The greeting, the hairline, the field, and the paragraph do not.
- The resume is wider than the reading column. The field continues in the margins around it. The document itself stays readable and keeps its current content.
- A project card has a picture. The picture, title, summary, skills, links, and Open action stay. The field remains outside the card.
- A visitor opens an old experience address or an old blog address. They arrive at Resume or Home, and that destination shows the shared field.
- The field must not create sideways scrolling on a narrow screen.
- A mounted project fills the view. It does not receive the field, the greeting, or the new about paragraph.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Home MUST show one introduction. It opens with the enlarged greeting "Hi! I'm Oliver Ramirez" and continues, in the same sentence, "and I am a Software Engineer and avid learner. I am often exploring new technologies and trying out new projects. I use this site to centralize some of my side projects and explore new ideas. Currently I am trying out spec driven development workflows and other things I don't get to do regularly in my job as a SWE." The name MUST appear once in that introduction.
- **FR-002**: Home MUST NOT keep the previous introduction about Colorado College, internships, or research in Budapest.
- **FR-003**: The first heading on Home MUST be "Hi! I'm Oliver Ramirez", set inside the introduction rather than as a separate block above it. The heading "My Portfolio" MUST NOT remain.
- **FR-004**: That greeting MUST be the largest text on Home, MUST use the display step (Geist Sans, 25px, medium), and MUST NOT exceed that step. The paragraph MUST use body type (Geist Sans, 16px, regular). The greeting MUST be Ink, not Current.
- **FR-005**: For a visitor who allows motion, the greeting MUST move into place once and then stay still. It MUST NOT loop. A visitor who prefers reduced motion MUST see the greeting already in place.
- **FR-006**: A Stone `#D5D1C8` hairline MUST sit under the greeting. The greeting and the paragraph MUST share one left edge inside the centered reading column, max width 40rem. Space between them MUST come from the existing 1.25 spacing ratio.
- **FR-007**: A line of the about paragraph MUST stay near 65 characters.
- **FR-008**: Home, Resume, and Projects MUST share one background field: Stone and Ink marks on Paper `#F3F1EC`. For a visitor who allows motion, that field MUST drift. For a visitor who prefers reduced motion, the same field MUST be visible and still. The field MUST be the same pattern on all three pages.
- **FR-009**: Body text, the greeting, the nav, project cards, and the resume document MUST sit on uninterrupted Paper. The field MUST frame that content from the margins and MUST NOT run through the letters or across the resume page.
- **FR-010**: Those pages MUST keep Paper and Ink when the operating system uses a dark appearance. The field MUST NOT introduce a fifth color. Current `#3E6B66` MUST remain the only accent, and it MUST be used only for links, the current nav item, and focus.
- **FR-011**: The field and the name treatment MUST NOT add a hero, a decorative illustration, photography added for atmosphere, a second palette, or an icon that depicts kayaking, rivers, or the outdoors. Motion is the two field drifts, the pointer lean, the one-time greeting settle, the Stone line drawing once, the column rising 16px once on each hub page, and the Current underline sliding under the current nav item.
- **FR-012**: Home MUST still offer Resume and Projects in one action. The nav MUST remain Home, Resume, and Projects.
- **FR-013**: The resume document, project-card contents (title, summary, skills, picture, links, and Open action), card order, and any mounted project MUST keep their current content and behavior. Resume and Projects MAY show the shared background field. A mounted project MUST NOT show it.
- **FR-014**: On a screen narrower than 40rem, the greeting, the paragraph, and the field MUST stay within the screen with a small side margin, and the page MUST NOT scroll sideways.

### Key Entities

- **Greeting**: The Home heading "Hi! I'm Oliver Ramirez". It is the display line a visitor reads first, and it settles into place once.
- **About paragraph**: The introduction Oliver supplied for this feature. It replaces the previous about text and is shown in full under the greeting.
- **Background field**: The shared Stone-and-Ink pattern on Paper behind Home, Resume, and Projects. It drifts unless the visitor prefers reduced motion.
- **Visual law**: The constitution's palette, type steps, weights, column, and ban on heroes, photographs, and outdoor imagery. This feature adds the field and the name settle inside that law. It does not offer a visitor a way to change the palette.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On Home, the introduction opens with "Hi! I'm Oliver Ramirez" at 25px, and the words that follow are 16px. The name appears once in that introduction.
- **SC-002**: The about paragraph matches the supplied text character for character, and the previous college-and-internship introduction is absent.
- **SC-003**: A line of the about paragraph is between 60 and 70 characters.
- **SC-004**: The only colors on Home, Resume, and Projects are Paper `#F3F1EC`, Ink `#1C2422`, Stone `#D5D1C8`, and Current `#3E6B66`, and Current appears only on links, the current nav item, and focus.
- **SC-005**: Home, Resume, and Projects each show the same background field in the margins. With motion allowed, the field drifts and the Home greeting settles once. With reduced motion, the field is still and the greeting does not move. Those pages contain zero heroes, zero decorative illustrations, zero atmosphere photographs, and zero outdoor icons.
- **SC-006**: From Home, a visitor can open Resume or Projects in one action. Those pages show the same resume file and the same project cards as before, on the shared field.
- **SC-007**: On a screen narrower than 40rem, the greeting wraps inside the column and Home does not scroll sideways.
- **SC-008**: A mounted project does not show the background field or the new greeting.

## Assumptions

- Oliver asked for more design than a type change, and he said shared patterns may affect other hub pages. The background field is that pattern. The withdrawn constraint is visual sameness of Resume and Projects, not their content.
- The constitution still bounds the work. The field uses only Paper, Stone, and Ink. Type stays on the existing scale, with the greeting at the display step and no larger. Current stays off the greeting and off the field. There is no hero, photograph, or outdoor icon. Motion is the Stone grid, the slower Ink dots, the pointer lean, the greeting settle, the drawing line, the column rise on each hub page, and the sliding Current underline. Reduced motion holds all of them still.
- The greeting "Hi! I'm Oliver Ramirez" is the opening of the introduction, not a second copy of it. The words that follow are the rest of the supplied paragraph, starting at "and I am a Software Engineer".
- "My Portfolio" is replaced by that greeting. The browser title, the nav label Home, and the headings on Resume and Projects stay as they are.
- Resume and Projects links that already sit under the about paragraph stay there, under the new paragraph.
- The field frames the reading column. It does not become a second column, a banner, or a card around the about text.
- A mounted project owns its own view. This feature does not restyle it.
- Page content that is not the about paragraph stays: the resume file, every project card's text and actions, and the nav labels.

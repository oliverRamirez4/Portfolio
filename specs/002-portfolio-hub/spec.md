# Feature Specification: Portfolio Hub

**Feature Branch**: `002-portfolio-hub`

**Created**: 2026-11-06

**Status**: Draft

**Input**: User description: "This site is my dev portfolio hub for projects I build and has some information about me as an engineer. The site will include a section that contains my resume, information about me and it will contain a place to explore my projects. The card will contain a link to the github repo and and an option to open the app if applicable. If the other app is built for a path on this domain, Open goes to /apps/<slug> and that app fills the page. If it is not ready, Open goes to the project's existing live URL, and GitHub stays available. Focus the work on Python, Postgres, Unix, TypeScript, and React. Do not decide fonts, colors, or layout."

## Clarifications

### Session 2026-11-06

- Q: Should the resume replace the existing Experience page, or should that page stay as its own section? → A: The resume replaces the Experience page. About, resume, and projects are the three areas.
- Q: When a visitor first opens the site, which area do they see? → A: The first page is the about section. Resume and projects are reached from there.
- Q: Does a project card need a picture of the project, or are the title, description, skills, and links enough? → A: A card shows a picture when the project has one, and remains valid when it does not.
- Q: Should the hub keep a blog, and what should the resume section show? → A: Remove the blog. The resume section shows the PDF resume.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read the engineer profile (Priority: P1)

A visitor opens the site and reads who Oliver is as an engineer. From that page they can reach the resume.

**Why this priority**: The hub is a portfolio. The person and the resume are how a visitor understands the work before opening any project.

**Independent Test**: Open the site and read the about text with no extra navigation. Open the resume in one further action, without opening a project.

**Acceptance Scenarios**:

1. **Given** a visitor opens the site, **When** the first page loads, **Then** they see the about account without choosing a section first.
2. **Given** a resume PDF is posted, **When** a visitor opens the resume section, **Then** they see that PDF on the page and can open the file itself.
3. **Given** the resume has not been posted yet, **When** a visitor opens the resume section, **Then** the section says the resume is not available yet and does not present a broken document.
4. **Given** a visitor is on the hub, **When** they look for the old experience area, **Then** it is gone and the resume is the only career record.

---

### User Story 2 - Explore projects from cards (Priority: P1)

A visitor opens the projects area and sees one card per project. Each card names the project, describes it briefly, links to its source repository, lists only the relevant skills from the hub's skill set, and shows a picture when the project has one.

**Why this priority**: Exploring projects is the reason the hub exists. A visitor can do this without any project being hosted on this site.

**Independent Test**: Open the projects area and read every card, including its repository link and skill labels, without leaving the hub.

**Acceptance Scenarios**:

1. **Given** one or more projects exist, **When** a visitor opens the projects area, **Then** each project appears as its own card with a title, a short description, and a repository link.
2. **Given** a project has a picture, **When** the visitor views its card, **Then** the picture is shown.
3. **Given** a project has no picture, **When** the visitor views its card, **Then** the card is still complete without one.
4. **Given** a project uses some of Python, Postgres, Unix, TypeScript, and React, **When** the visitor reads its card, **Then** the card names only the skills that project uses.
5. **Given** no projects exist, **When** a visitor opens the projects area, **Then** the area says there are no projects yet.

---

### User Story 3 - Open a project that is not on this site (Priority: P1)

A visitor chooses Open on a card whose app is not yet available on this site. They arrive at that project's existing live site. The repository link was on the card before they left.

**Why this priority**: Most projects will not be hosted on this site at first. The hub still has to let the visitor open them.

**Independent Test**: From a card that has an external live site and no on-site app, use Open and the repository link.

**Acceptance Scenarios**:

1. **Given** a project has a live site elsewhere and is not available on this site, **When** the visitor chooses Open, **Then** they go to that live site.
2. **Given** that same card, **When** the visitor looks at it before leaving, **Then** the repository link is still there.
3. **Given** a project has a repository and no live app anywhere, **When** the visitor views the card, **Then** there is no Open action, and the repository link remains.

---

### User Story 4 - Open a project hosted on this site (Priority: P2)

A visitor chooses Open on a card whose app is available on this site. The address stays on this site, under `/apps/` plus that project's short name. The app fills the view. The hub's own about, resume, and project sections are not wrapped around it.

**Why this priority**: Hosting an app on the hub's address is valuable, and it depends on that app being ready. The hub is still useful without it.

**Independent Test**: With one project marked available on this site, choose Open, confirm the app fills the view at `/apps/` plus its short name, then open the projects area and confirm the hub's project list is back.

**Acceptance Scenarios**:

1. **Given** a project is available on this site, **When** the visitor chooses Open, **Then** the address is `/apps/` followed by that project's short name, and the app fills the view.
2. **Given** that app is open, **When** the visitor looks at the page, **Then** they do not see the hub's about, resume, or project navigation inside the app.
3. **Given** the visitor has opened that app, **When** they go to the projects area, **Then** they see the hub's project cards again.
4. **Given** a project is available both on this site and at an older live address, **When** the visitor chooses Open, **Then** Open uses the on-site address.

---

### Edge Cases

- A project with no live destination shows a repository link and no Open action.
- A project that is available on this site opens there even if an older live address also exists.
- Two projects cannot share the same on-site short name. Each `/apps/` path belongs to one project.
- If an on-site app fails to load, the hub's about, resume, and projects areas still open on their own.
- An empty project list tells the visitor there are no projects yet.
- A resume that has not been posted tells the visitor it is not available yet.
- Fonts, colors, and layout are not chosen by this feature. Existing visual choices stay as they are.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The hub MUST offer three distinct areas: about the engineer, a resume, and a place to explore projects. The resume replaces the existing experience area, which is removed. The hub has no blog.
- **FR-002**: The first page a visitor sees MUST be the about area, and it MUST present a written account of Oliver as an engineer. Resume and projects are reached from there.
- **FR-003**: When a resume PDF is posted, the resume area MUST show that PDF on the page and offer a way to open the file.
- **FR-004**: When no resume is posted, the resume area MUST say that it is not available yet.
- **FR-005**: The projects area MUST show one card per project.
- **FR-006**: Each card MUST include a title, a short description, and a link to that project's source repository. When the project has a picture, the card MUST show it. A card without a picture MUST still be valid.
- **FR-007**: Each card MUST name only the skills that project uses, chosen from Python, Postgres, Unix, TypeScript, and React.
- **FR-008**: A card MUST offer Open only when the project has a live destination.
- **FR-009**: When the project is available on this site, Open MUST go to `/apps/` plus that project's short name, and that app MUST fill the view.
- **FR-010**: When the project is not available on this site and has a live address elsewhere, Open MUST go to that address.
- **FR-011**: The repository link MUST remain on the card whether or not Open is offered.
- **FR-012**: An app opened on this site MUST NOT be framed by the hub's about, resume, or projects navigation.
- **FR-013**: The about, resume, and projects areas MUST remain available after a visitor has opened an on-site app.
- **FR-014**: This feature MUST NOT prescribe fonts, colors, or layout.

### Key Entities

- **Engineer profile**: Oliver's about text and resume. The resume may be absent.
- **Project**: A piece of work with a title, a short description, a repository link, the subset of hub skills it uses, an optional picture, an optional live address elsewhere, and an optional on-site short name. The short name is unique when present. Open uses the on-site path when the short name is set, otherwise the external live address when that exists. A missing picture does not make the project invalid.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Opening the site shows the about area with no extra action. Resume and projects are each one action from that page.
- **SC-002**: Every project card includes a repository link. In a review of the full project list, zero cards are missing one.
- **SC-003**: For a project that only has an external live site, a visitor reaches that site in one Open action, and the repository link is visible on the card before they leave.
- **SC-004**: For a project available on this site, one Open action shows that app filling the view, and the address stays on this site under `/apps/` plus the project's short name.
- **SC-005**: After opening an on-site app, a visitor who goes to the projects area sees the hub's project cards again.
- **SC-006**: Accepting this specification requires no decision about fonts, colors, or layout.

## Assumptions

- The visitor is anyone reading the public hub. There is no sign-in and no private area.
- "About" is a short account of Oliver as an engineer, and it is the first page of the site. The resume is the PDF file `public/oliver-ramirez-resume.pdf`. The resume replaces the experience area. The blog is removed. `/blog` redirects to `/`.
- Every project has a source repository link. Open is optional and appears only when a live destination exists. A picture is shown only when the project has one.
- If a project is available on this site, that on-site path is the Open destination even when an older live address also exists.
- The skill vocabulary is exactly Python, Postgres, Unix, TypeScript, and React. A card lists the ones that project uses. The hub itself does not have to demonstrate every skill.
- Visual style is unchanged until a later, explicit choice. This specification does not select type, color, spacing, or page width.
- Other project repositories are not edited by this feature. A project is "available on this site" only when that project is already prepared to be opened at its `/apps/` path.

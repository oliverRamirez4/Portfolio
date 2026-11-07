# Feature Specification: Add Shelter Connect and River Permit Projects

**Feature Branch**: `004-add-shelter-river`

**Created**: 2026-11-07

**Status**: Draft

**Input**: User description: "Add my shelter connect application to the projects tab as well as my river permit api wrapper"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Find Shelter Connect (Priority: P1)

A visitor opens Projects and finds Shelter Connect among Oliver's work. The card names the project, says what it is, lists the skills it uses, and links to its source repository.

**Why this priority**: Shelter Connect is one of the two projects Oliver asked to show. A visitor should be able to find it without being told it exists elsewhere.

**Independent Test**: Open Projects and read the Shelter Connect card, including its repository link, without opening any other project.

**Acceptance Scenarios**:

1. **Given** the visitor opens Projects, **When** the list loads, **Then** a card titled Shelter Connect is present.
2. **Given** that card, **When** the visitor reads it, **Then** the summary says it is a Colorado Springs homeless-shelter guide from the Colorado College TigerHacks hackathon, and that a person can see shelters and the people they serve.
3. **Given** that card, **When** the visitor reads the skills, **Then** the skills are TypeScript, React, and Postgres, and no other skills.
4. **Given** that card, **When** the visitor chooses the repository link, **Then** they reach `https://github.com/oliverRamirez4/COSConnect`.
5. **Given** Shelter Connect has no live site on this hub and no separate public address, **When** the visitor views the card, **Then** the card has no Open action and no picture.

---

### User Story 2 - Find the river permit wrapper (Priority: P1)

A visitor opens Projects and finds the river permit API wrapper. The card names the project, says what it is, lists the skill it uses, and links to its source repository.

**Why this priority**: This is the other project Oliver asked to show. It is useful on its own, even if Shelter Connect were not listed yet.

**Independent Test**: Open Projects and read the river permit card, including its repository link, without opening Shelter Connect.

**Acceptance Scenarios**:

1. **Given** the visitor opens Projects, **When** the list loads, **Then** a card titled River Permit API Wrapper is present.
2. **Given** that card, **When** the visitor reads it, **Then** the summary says it is a Python tool that checks Recreation.gov for remaining river-rafting permits over a chosen date range and reports which launch dates still have permits.
3. **Given** that card, **When** the visitor reads the skills, **Then** the only skill is Python.
4. **Given** that card, **When** the visitor chooses the repository link, **Then** they reach `https://github.com/oliverRamirez4/recreation-gov-rafting-permit-scraper`.
5. **Given** the wrapper has no live site on this hub and no separate public address, **When** the visitor views the card, **Then** the card has no Open action and no picture.

---

### User Story 3 - Keep the current project list (Priority: P2)

A visitor who already knows the hub still finds the four projects that were listed before this change. Their titles, summaries, skills, pictures, repository links, and Open actions are the same, and they stay in their current order. The two new cards follow them.

**Why this priority**: Adding work should not hide or rewrite the projects already on the hub. The hub is still useful if only this preservation is checked after the new cards exist.

**Independent Test**: Open Projects and compare the first four cards with the list that existed before this feature. Then confirm Shelter Connect and River Permit API Wrapper follow those four.

**Acceptance Scenarios**:

1. **Given** Projects is open, **When** the visitor reads the list, **Then** Colorado Down Ballot Visuals, Natural Language Processing Labs, Conversational AI Chat Interface, and Osu Rhythm Game Clone are still present, in that order, ahead of the two new cards.
2. **Given** those four cards, **When** the visitor compares each one with its previous title, summary, skills, picture, repository link, and Open action, **Then** each of those details is unchanged.
3. **Given** the two new cards are present, **When** the visitor counts the list, **Then** there are six cards.

---

### Edge Cases

- Shelter Connect and the river permit wrapper are not opened from this site. Neither card offers Open, and neither takes over a path on this hub.
- A new card with no picture is still a complete card.
- The two new cards use different names, so a visitor can tell them apart and neither replaces the other.
- Skills on the new cards stay inside Python, Postgres, Unix, TypeScript, and React. Shelter Connect lists TypeScript, React, and Postgres. The river permit wrapper lists Python.
- Home and Resume are unchanged. Projects remains a list of cards the visitor chooses to open.
- The look of a card stays the look already used on Projects. This feature adds entries; it does not restyle the page.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Projects MUST include a card for Shelter Connect in addition to the projects already listed.
- **FR-002**: The Shelter Connect card MUST use the title Shelter Connect and a short summary that identifies it as a Colorado Springs homeless-shelter guide from the Colorado College TigerHacks hackathon, where a person can see shelters and who they serve.
- **FR-003**: The Shelter Connect card MUST list TypeScript, React, and Postgres, and no other skills.
- **FR-004**: The Shelter Connect card MUST link to `https://github.com/oliverRamirez4/COSConnect`.
- **FR-005**: Projects MUST include a card for the river permit API wrapper in addition to the projects already listed.
- **FR-006**: The river permit card MUST use the title River Permit API Wrapper and a short summary that identifies it as a Python tool that checks Recreation.gov for remaining river-rafting permits over a chosen date range and reports which launch dates still have permits.
- **FR-007**: The river permit card MUST list Python as its only skill.
- **FR-008**: The river permit card MUST link to `https://github.com/oliverRamirez4/recreation-gov-rafting-permit-scraper`.
- **FR-009**: The Shelter Connect card and the river permit card MUST leave out Open and MUST leave out a picture, because each project has no live destination and no picture on the hub.
- **FR-010**: The only way off the hub from either new card MUST be its repository link. Shelter Connect and the river permit wrapper MUST stay off this site's own addresses.
- **FR-011**: The four existing cards MUST remain, in their current order, with the same titles, summaries, skills, pictures, repository links, and Open actions. The two new cards MUST follow those four.
- **FR-012**: Home and Resume MUST stay as they are. This feature only adds the two project cards.
- **FR-013**: The new cards MUST use the same card presentation already used on Projects.

### Key Entities

- **Shelter Connect**: Oliver's shelter guide. Public title Shelter Connect. Summary describes the Colorado Springs homeless-shelter guide from TigerHacks. Skills are TypeScript, React, and Postgres. Repository is `https://github.com/oliverRamirez4/COSConnect`. No picture, no live address, and no on-site opening.
- **River Permit API Wrapper**: Oliver's tool for river-permit availability. Public title River Permit API Wrapper. Summary describes checking Recreation.gov for remaining rafting permits. Skill is Python. Repository is `https://github.com/oliverRamirez4/recreation-gov-rafting-permit-scraper`. No picture, no live address, and no on-site opening.
- **Existing project**: One of the four cards already on Projects. This feature does not change its public details or its place ahead of the new cards.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor who opens Projects can identify Shelter Connect and River Permit API Wrapper on the first view of the list, with no extra navigation.
- **SC-002**: In a review of Projects, both new cards have a title, a short summary, a skill list, and a repository link. Zero of those fields are missing.
- **SC-003**: A visitor reaches each new project's source repository in one action from its card, and neither card offers a second Open action.
- **SC-004**: The project list contains six cards. The original four remain first, in their previous order, and a side-by-side reading finds no change to their titles, summaries, skills, pictures, repository links, or Open actions.
- **SC-005**: Home and Resume still present the same account and resume as before this feature. A visitor who only opens those areas sees no change.

## Assumptions

- Shelter Connect is the Colorado College TigerHacks project published at `https://github.com/oliverRamirez4/COSConnect`. Its public name on the hub is Shelter Connect. The card does not use a separate live address, because none is part of this request, and the app is not prepared to open on this site.
- The river permit API wrapper is the project published at `https://github.com/oliverRamirez4/recreation-gov-rafting-permit-scraper`. The card describes the river-permit availability tool. It does not add a separate campsite product, a live site, or an opening on this hub.
- Neither project has a picture to show. A card without a picture stays valid, as it already does for any project that has none.
- Skill labels stay inside Python, Postgres, Unix, TypeScript, and React. Shelter Connect uses TypeScript, React, and Postgres. The river permit wrapper uses Python.
- The four current cards stay in this order: Colorado Down Ballot Visuals, Natural Language Processing Labs, Conversational AI Chat Interface, Osu Rhythm Game Clone. The new cards are Shelter Connect, then River Permit API Wrapper.
- This feature does not edit the other project repositories, does not change Home or Resume, and does not change the visual style already in force.

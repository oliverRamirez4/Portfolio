# Feature Specification: Open Vote Visualizer and Shelter Connect

**Feature Branch**: `005-open-project-apps`

**Created**: 2026-11-07

**Status**: Draft

**Input**: User description: "The vote visualizer project and the shelter connect project cards allow the user to open the app. They have an endpoint in the app and it routes to the apps. https://colorado-vote-visuals.vercel.app/ is for the vote visuals and https://cos-shelter-connect.vercel.app/ is for the shelter connect app. These two project should also be moved to the top of the projects tab."

## Clarifications

### Session 2026-11-07

- Q: Should this feature include routing a portfolio address to each published application? → A: Yes. Routing from this portfolio's address to each published application URL is part of this feature. The visitor's address stays on this portfolio.
- Q: Who makes the vote visualizer and Shelter Connect able to run at those portfolio paths? → A: This feature adds the portfolio routes only. The two apps must already be built for `/apps/colorado-vote` and `/apps/shelter-connect` in their own projects before this feature is accepted.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open the vote visualizer (Priority: P1)

A visitor on Projects finds the vote visualizer card, titled Colorado Down Ballot Visuals, and chooses Open. That action goes to `/apps/colorado-vote` on this portfolio. The visitor's address stays on this portfolio. This portfolio routes that address to the vote visualizer published at `https://colorado-vote-visuals.vercel.app/`, and that application is what the visitor sees and uses.

**Why this priority**: Opening the vote visualizer from its card is the main reason for this change. The card already exists; the visitor needs a portfolio address that routes to the live application.

**Independent Test**: On Projects, choose Open on Colorado Down Ballot Visuals. Confirm the address stays on this portfolio at `/apps/colorado-vote` and the published vote visualizer is what appears. Repeat by visiting `/apps/colorado-vote` directly.

**Acceptance Scenarios**:

1. **Given** the visitor is on Projects, **When** they view Colorado Down Ballot Visuals, **Then** the card offers Open.
2. **Given** that card, **When** the visitor chooses Open, **Then** the address stays on this portfolio at `/apps/colorado-vote`, this portfolio routes that address to `https://colorado-vote-visuals.vercel.app/`, and the application the visitor sees is that published vote visualizer.
3. **Given** a visitor who opens `/apps/colorado-vote` directly, **When** the page loads, **Then** the address stays on this portfolio and the visitor sees the same published vote visualizer.
4. **Given** that card, **When** the visitor reads the title, summary, skills, picture, and repository link, **Then** those details are unchanged, and the repository link still goes to the project's source repository.
5. **Given** the vote visualizer is already built in its own project for `/apps/colorado-vote` and its files at `/apps/colorado-vote-static`, **When** the visitor uses the opened application, **Then** its pages and files load through this portfolio and the address never moves to `https://colorado-vote-visuals.vercel.app/`.

---

### User Story 2 - Open Shelter Connect (Priority: P1)

A visitor on Projects finds Shelter Connect and chooses Open. That action goes to `/apps/shelter-connect` on this portfolio. The visitor's address stays on this portfolio. This portfolio routes that address to the Shelter Connect application published at `https://cos-shelter-connect.vercel.app/`, and that application is what the visitor sees and uses.

**Why this priority**: Shelter Connect is the other application Oliver asked visitors to open from the hub. It is useful even if the vote visualizer card is checked separately.

**Independent Test**: On Projects, choose Open on Shelter Connect. Confirm the address stays on this portfolio at `/apps/shelter-connect` and the published Shelter Connect application is what appears. Repeat by visiting `/apps/shelter-connect` directly.

**Acceptance Scenarios**:

1. **Given** the visitor is on Projects, **When** they view Shelter Connect, **Then** the card offers Open.
2. **Given** that card, **When** the visitor chooses Open, **Then** the address stays on this portfolio at `/apps/shelter-connect`, this portfolio routes that address to `https://cos-shelter-connect.vercel.app/`, and the application the visitor sees is that published Shelter Connect application.
3. **Given** a visitor who opens `/apps/shelter-connect` directly, **When** the page loads, **Then** the address stays on this portfolio and the visitor sees the same published Shelter Connect application.
4. **Given** that card, **When** the visitor reads the title, summary, skills, and repository link, **Then** those details are unchanged, the card still has no picture, and the repository link still goes to `https://github.com/oliverRamirez4/COSConnect`.
5. **Given** Shelter Connect is already built in its own project for `/apps/shelter-connect` and its files at `/apps/shelter-connect-static`, **When** the visitor uses the opened application, **Then** its pages and files load through this portfolio and the address never moves to `https://cos-shelter-connect.vercel.app/`.

---

### User Story 3 - Put both projects first (Priority: P2)

A visitor opening Projects sees the vote visualizer first and Shelter Connect second. The other four projects follow in the same order they had relative to each other.

**Why this priority**: Oliver wants these two live applications to be the first things a visitor sees on Projects. The list is still understandable if the Open actions exist before the order is checked.

**Independent Test**: Open Projects and read the card order from top to bottom, without opening either application.

**Acceptance Scenarios**:

1. **Given** the visitor opens Projects, **When** the list loads, **Then** Colorado Down Ballot Visuals is the first card and Shelter Connect is the second.
2. **Given** that list, **When** the visitor reads the remaining cards, **Then** Natural Language Processing Labs, Conversational AI Chat Interface, Osu Rhythm Game Clone, and River Permit API Wrapper follow, in that order.
3. **Given** those four later cards, **When** the visitor compares each one with its previous title, summary, skills, picture, repository link, and Open action, **Then** each of those details is unchanged.
4. **Given** Projects is open, **When** the visitor counts the cards, **Then** there are still six cards.

---

### Edge Cases

- Choosing Open on one application does not change whether the other application can be opened.
- If the published vote visualizer cannot be reached, Shelter Connect still opens from its own card, and the reverse is also true. The visitor is not shown a substitute application.
- The vote visualizer's Open action no longer sends the visitor to `https://coloradovotevisuals.com`. Open and `/apps/colorado-vote` both keep the visitor on this portfolio and show the application published at `https://colorado-vote-visuals.vercel.app/`.
- The two portfolio addresses are different. `/apps/colorado-vote` routes only to the vote visualizer. `/apps/shelter-connect` routes only to Shelter Connect. Neither address is Home, Resume, or Projects.
- While the visitor uses either opened application, the address stays on this portfolio. Pages and files that application needs are routed to its published URL. A link the application itself makes to some other site may still leave this portfolio.
- A visitor who never chooses Open still sees both cards, with their existing descriptions, at the top of Projects.
- Natural Language Processing Labs, Conversational AI Chat Interface, Osu Rhythm Game Clone, and River Permit API Wrapper do not gain an Open action from this change. Colorado Down Ballot Visuals keeps the Open action it already had, now aimed at the vote visualizer named above.
- Home and Resume stay as they are. Projects remains a list the visitor chooses from; arriving on the hub does not drop the visitor into either application.
- The look of the cards stays the look already used on Projects.
- This feature does not change the vote visualizer project or the Shelter Connect project. If either app is not already built for its portfolio path and file path, this feature is not accepted.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Projects MUST offer Open on the Colorado Down Ballot Visuals card, which is the vote visualizer.
- **FR-002**: Choosing that Open action MUST take the visitor to `/apps/colorado-vote` on this portfolio. The visitor's address MUST stay on this portfolio. This portfolio MUST route that address to the vote visualizer published at `https://colorado-vote-visuals.vercel.app/`.
- **FR-003**: Visiting `/apps/colorado-vote` directly MUST keep the visitor on this portfolio and show the same published vote visualizer.
- **FR-004**: Projects MUST offer Open on the Shelter Connect card.
- **FR-005**: Choosing that Open action MUST take the visitor to `/apps/shelter-connect` on this portfolio. The visitor's address MUST stay on this portfolio. This portfolio MUST route that address to the Shelter Connect application published at `https://cos-shelter-connect.vercel.app/`.
- **FR-006**: Visiting `/apps/shelter-connect` directly MUST keep the visitor on this portfolio and show the same published Shelter Connect application.
- **FR-014**: This feature MUST include that routing for both applications. Pages under each portfolio address, and files under `/apps/colorado-vote-static` and `/apps/shelter-connect-static`, MUST be routed to that application's published URL, with the visitor's address remaining on this portfolio.
- **FR-015**: No other project on this portfolio gains a routed address from this feature.
- **FR-016**: This feature MUST add those portfolio routes only. It MUST NOT change the vote visualizer project or the Shelter Connect project. Before this feature is accepted, the vote visualizer MUST already be built in its own project for `/apps/colorado-vote` and `/apps/colorado-vote-static`, and Shelter Connect MUST already be built in its own project for `/apps/shelter-connect` and `/apps/shelter-connect-static`.
- **FR-007**: The vote visualizer Open action MUST NOT send the visitor to `https://coloradovotevisuals.com`.
- **FR-008**: Colorado Down Ballot Visuals MUST be the first card on Projects, and Shelter Connect MUST be the second.
- **FR-009**: After those two cards, Projects MUST list Natural Language Processing Labs, Conversational AI Chat Interface, Osu Rhythm Game Clone, and River Permit API Wrapper, in that order.
- **FR-010**: Projects MUST still contain exactly those six cards. This feature does not add or remove a project.
- **FR-011**: Titles, summaries, skills, pictures, and repository links MUST stay as they are for every card. Shelter Connect continues to have no picture.
- **FR-012**: The four cards that follow the two featured projects MUST keep the Open behavior they already have, which is no Open action.
- **FR-013**: Home and Resume MUST remain unchanged, and neither featured application may replace those pages or the Projects list.

### Key Entities

- **Project card**: One entry on Projects. The cards in scope are Colorado Down Ballot Visuals (the vote visualizer) and Shelter Connect. Each keeps its current description and gains or keeps an Open action. Display order is part of the card list.
- **Portfolio address**: The address on this hub that a visitor uses to open one published application. The vote visualizer address is `/apps/colorado-vote`. The Shelter Connect address is `/apps/shelter-connect`. Open uses that address. This portfolio routes it to the matching published application, and the visitor's address stays here.
- **Published application**: The live vote visualizer at `https://colorado-vote-visuals.vercel.app/`, or the live Shelter Connect application at `https://cos-shelter-connect.vercel.app/`. Each one is built in its own project for its portfolio path and file path. This feature routes to that application and does not change that project.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can open the vote visualizer from its card in one action. The address stays on `/apps/colorado-vote`, and the application shown is the one published at `https://colorado-vote-visuals.vercel.app/`.
- **SC-002**: A visitor can open Shelter Connect from its card in one action. The address stays on `/apps/shelter-connect`, and the application shown is the one published at `https://cos-shelter-connect.vercel.app/`.
- **SC-003**: On a direct visit, each portfolio address keeps the visitor on this portfolio, shows its own published application, and does not show the other application, Home, Resume, or the Projects list.
- **SC-006**: After opening either application, the visitor can use it without the address leaving this portfolio for that application's published URL.
- **SC-004**: On Projects, the first card is Colorado Down Ballot Visuals and the second is Shelter Connect, with the other four cards afterward in their previous relative order, in a single page view without searching.
- **SC-005**: A visitor comparing the six cards with the previous list finds the same titles, summaries, skills, pictures, and repository links, and finds Open only on the two featured cards.

## Assumptions

- "Vote visualizer" and "vote visuals" mean the existing Colorado Down Ballot Visuals card. Its title, summary, skills, picture, and repository link stay as they are.
- "Shelter Connect" means the existing Shelter Connect card. Its title, summary, skills, lack of a picture, and repository link stay as they are.
- The visitor opens each application from this portfolio. `/apps/colorado-vote` routes to `https://colorado-vote-visuals.vercel.app/`. `/apps/shelter-connect` routes to `https://cos-shelter-connect.vercel.app/`. The visitor's address stays on this portfolio. This routing is part of this feature.
- Between the two featured cards, the vote visualizer comes first because it was named first. Shelter Connect comes immediately after it.
- The other four projects keep the order they have relative to each other: Natural Language Processing Labs, Conversational AI Chat Interface, Osu Rhythm Game Clone, then River Permit API Wrapper.
- Open uses the same kind of control already used for opening a project from a card. This feature does not add a second control, a new tab requirement, or a new page on the hub that describes the application before showing it.
- Each published application is already available at the address Oliver named, and is already built in its own project for its portfolio path and file path. This feature adds the portfolio routes to those applications. It does not change either project, and it does not change the words or behavior inside either application. The routes are part of this site's deployment. A redirect that changes the visitor's address is not used.
- If a published application cannot be reached, the visitor sees that failure for that application only. This feature does not add a fallback site.
- Home, Resume, and the Projects list remain pages of this hub. Choosing Open is how a visitor enters either application.

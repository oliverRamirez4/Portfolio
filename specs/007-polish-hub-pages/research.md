# Research: Polish Hub Pages

## Decision: Center the introduction inside the existing 30rem measure

**Rationale**: The paragraph is already capped at 30rem so a line of Geist Sans at 16px stays between 60 and 70 characters. Centering that block in the 40rem column (`mx-auto`) and centering its lines (`text-center`) puts the sentence in the middle without widening a line. The greeting stays an inline piece of that sentence, so the existing hairline, which is the width of the greeting, still sits under those words. The nav is a sibling in `main`, outside that block, so it keeps the column's left edge.

**Alternatives considered**: Centering the whole `main` column's text. Rejected because the nav, the resume heading, and the project cards would lose the left edge. Splitting the greeting onto its own centered line. Rejected because the spec keeps one sentence. Widening the measure to 40rem. Rejected because a line would pass 70 characters.

## Decision: Remove the links under the introduction and leave the nav alone

**Rationale**: `app/page.tsx` renders a second Resume and Projects pair. `app/components/nav.tsx` already links to `/resume` and `/projects` with `next/link`. Deleting the pair in the page removes the duplicate. The nav labels, order, and current-item treatment stay.

**Alternatives considered**: Hiding the pair with CSS. Rejected because the links would remain in the page. Removing the same labels from the nav. Rejected because the spec keeps the top navigation as the way off Home.

## Decision: Put the resume document back inside the column

**Rationale**: The overlap comes from a full-bleed wrapper (`w-screen`, pulled to the viewport center) and an iframe capped at `min(56rem, 100vw - 2rem)`. On a laptop that cap nearly meets the viewport, so the document covers the grid and the transparent breakout band sits on the pattern. `main` is already Paper, centered, max 40rem, and at least 1rem in from each edge. An iframe that is 100% of the column sits on uninterrupted Paper. The grid remains in the margins outside `main`. The heading and the open-file link never leave the column. No frame, shadow, or second panel is added. On a narrow screen the column is already `calc(100% - 2rem)`, so the document uses that same inset and does not scroll sideways. `body` already sets `overflow-x: clip`.

**Alternatives considered**: A wider breakout such as `min(56rem, 100vw - 8rem)`. Rejected because it keeps a second width that has to be tuned so it does not meet the grid, which is the current bug. A bordered panel around the PDF. Rejected by the spec. Changing the PDF bytes or the open-file URL. Rejected because the file and the action stay.

## Decision: Keep the missing-file sentence and render no document area

**Rationale**: `app/resume/page.tsx` already chooses the sentence "The resume is not available yet." when `public/oliver-ramirez-resume.pdf` is absent, and it does not render the iframe. Leaving that branch as it is satisfies the empty-state story. The available branch only changes the iframe's width and drops the breakout wrapper.

**Alternatives considered**: A placeholder box the size of the document. Rejected because the spec forbids an empty document area in the grid.

## Decision: Extend the skill allow-list and fill the two empty cards

**Rationale**: `SKILLS` is the closed list `assertProject` accepts. Today it is Python, Postgres, Unix, TypeScript, and React, so Hugging Face, Java, SQL, and Java Swing cannot be stored. Adding those four names lets the records match the spec. Display order is the array order on each project, not the order of `SKILLS`. The lists are:

- Colorado Down Ballot Visuals: Postgres
- Shelter Connect: TypeScript, React, Postgres
- Natural Language Processing Labs: Python
- Conversational AI Chat Interface: Hugging Face
- Osu Rhythm Game Clone: Java, SQL, Java Swing
- River Permit API Wrapper: Python

`assertProject` already rejects a duplicate on one card. Titles, summaries, pictures, repository URLs, `onSite`, and card order stay. The rewrite tests must expect the two new arrays; the rewrite rules themselves do not change.

**Alternatives considered**: A second free-text field beside `skills`. Rejected because the page would have two technology lines and the allow-list would no longer be the source of truth. Inventing technologies the summaries do not name, such as a frontend for the vote visualizer. Rejected by the spec. Leaving the five-name list and hiding Java inside the summary. Rejected because those two cards would still show no technology line.

## Decision: Draw a shared Ink mark from `react-icons`, and skip a mark that cannot stay Ink

**Rationale**: `react-icons` is already installed, so this adds no package. One lookup from skill name to icon component, rendered at 13px with `color` Ink (`currentColor` on the card's Ink text), sits beside the Geist Mono name. The same component is used wherever that name appears, so Postgres matches across cards and Python matches across cards. Simple Icons and the Java glyph used here are single-shape marks and accept that color. SQL and Java Swing have no single-color mark that means those names without borrowing another product's logo, so those two show the name only: no empty box and no broken image. The mark is not wrapped in a link. Current is not used.

The lookup is:

| Name | Mark |
| --- | --- |
| Python | `SiPython` |
| Postgres | `SiPostgresql` |
| TypeScript | `SiTypescript` |
| React | `SiReact` |
| Hugging Face | `SiHuggingface` |
| Java | `FaJava` |
| SQL | none |
| Java Swing | none |
| Unix | none, until a card lists it |

**Alternatives considered**: Brand-colored logos. Rejected because they add colors outside Paper, Ink, Stone, and Current. An icon font or a CDN sprite. Rejected because the marks would be a new dependency and a network request. Hand-copied SVG paths. Rejected because the installed set already supplies the six shapes. MUI icons. Rejected because they pull a second icon style into a page that does not otherwise use MUI. A generated monogram for every name. Rejected because the spec asks for a recognizable mark where one exists, and the name already covers the fallback.

## Decision: Leave routes, rewrites, and mounted apps alone

**Rationale**: Centering, the resume width, and the skill line are all rendered by this app. A rewritten `/apps/<slug>` response never includes `app/page.tsx`, `app/resume/page.tsx`, or `app/projects/page.tsx`. No path, redirect, or origin variable changes.

**Alternatives considered**: A layout flag that hides these treatments on mounted paths. Rejected because those paths do not render this layout.

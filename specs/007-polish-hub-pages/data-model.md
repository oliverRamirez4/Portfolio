# Data Model: Polish Hub Pages

This feature changes skill values on two existing project records and how three pages are presented. It does not add a database, a route, or a project.

## Introduction

The Home sentence. Source: `lib/profile.ts`. The strings do not change.

| Field | Value | Rule |
| --- | --- | --- |
| greeting | Hi! I'm Oliver Ramirez | Still the only Home heading. Geist Sans, 25px, weight 500, Ink. Settles once when motion is allowed. Centered with the paragraph. |
| about | The continuation after the greeting | Unchanged text. Geist Sans, 16px, weight 400. A line stays between 60 and 70 characters. |

Validation: the block that contains the greeting and the paragraph is centered in the 40rem column. The nav is outside that block and stays on the column's left edge. There is no Resume or Projects link under the paragraph.

## Resume document

The existing file. Source: `public/oliver-ramirez-resume.pdf`. The bytes do not change.

| Field | Rule |
| --- | --- |
| Available | The iframe fills the reading column, on Paper, with no border and no full-bleed wrapper. The heading "Resume" and the open-file action stay left-aligned in that column. |
| Missing | The sentence "The resume is not available yet." The iframe is absent. |

Validation: on a wide screen the grid is visible on both sides of the column and does not cross the document. On a narrow screen the document uses the column's inset and the page does not scroll sideways.

## Technology

A skill name a card may show. Source: the `SKILLS` allow-list in `lib/projects.ts`.

| Name | Mark |
| --- | --- |
| Python | Shared Ink `SiPython` |
| Postgres | Shared Ink `SiPostgresql` |
| Unix | None |
| TypeScript | Shared Ink `SiTypescript` |
| React | Shared Ink `SiReact` |
| Hugging Face | Shared Ink `SiHuggingface` |
| Java | Shared Ink `FaJava` |
| SQL | None |
| Java Swing | None |

Validation: a name not in this list is rejected. A name repeated on one card is rejected. A mark is not stored on the project. It is chosen from the name, drawn in Ink at the meta size, and omitted when the table says none. The name is always visible. A mark is not a link and does not use Current.

## Project card

The six records in `lib/projects.ts`, in their current order. Only `skills` changes, and only on two records.

| Card | skills |
| --- | --- |
| Colorado Down Ballot Visuals | Postgres |
| Shelter Connect | TypeScript, React, Postgres |
| Natural Language Processing Labs | Python |
| Conversational AI Chat Interface | Hugging Face |
| Osu Rhythm Game Clone | Java, SQL, Java Swing |
| River Permit API Wrapper | Python |

Unchanged on every card: `shortName`, `title`, `summary`, `repositoryUrl`, `image`, `externalUrl`, `onSite`, and order. Empty `skills` renders no technology row. After this change none of the six is empty.

## Hub page

Unchanged as a route. Home (`/`), Resume (`/resume`), and Projects (`/projects`).

| Field | Rule |
| --- | --- |
| Home | Centered introduction. No second Resume or Projects link. |
| Resume | Same file and the same open-file action. Document inside the column. |
| Projects | Same cards. Technology line uses the lists above. |
| Nav | Home, Resume, Projects, on the left edge. |

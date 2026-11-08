# Data Model: Update About Page

This feature changes one profile record and adds two presentation values. It does not add a database or a new project record.

## Profile

The introduction shown on Home. Source: `lib/profile.ts`.

| Field | Value | Rule |
| --- | --- | --- |
| name | Oliver Ramirez | Unchanged. Not the Home heading by itself. |
| greeting | Hi! I'm Oliver Ramirez | The only Home heading. Geist Sans, 25px, weight 500, Ink. Settles once when motion is allowed. |
| about | The continuation after the greeting | Begins "and I am a Software Engineer". Includes "spec driven development" and "SWE". Does not repeat the name. Replaces the college, internship, and Budapest text. |

Validation: `greeting` is "Hi! I'm Oliver Ramirez" and nothing else. Read together, greeting and about are one introduction and the name appears once. The old opening "Hi! My name is Oliver Ramirez" is absent.

## Background field

One pattern for every page this app renders.

| Field | Value | Rule |
| --- | --- | --- |
| Ground | Paper `#F3F1EC` | The page color under the marks, and the fill of the column and the resume surface |
| Marks | 1px Stone `#D5D1C8` lines on a 32px grid, and 1px Ink `#1C2422` dots on a 96px spacing | Solid hex only. No Current. No blended fifth color |
| Motion | Translates one 32px cell over 24 seconds, linear, repeating | Margins only. Does not move text |
| Reduced motion | Same marks, no translation | Greeting is already at rest |

State: motion follows the visitor's reduced-motion preference. There is no saved setting and no second palette for a dark operating system.

Validation: Home, Resume, and Projects show the same marks. A sample in the margin finds Stone or Ink on Paper. A sample of the paragraph, the nav, a card, or the resume surface finds uninterrupted Paper. A mounted project response has neither the marks nor the greeting.

## Reading surfaces

Surfaces that mask the field. They are not new records.

| Surface | Where | Fill |
| --- | --- | --- |
| Column | The existing `main`, max 40rem | Paper |
| Resume document | The iframe, max 56rem | Paper |
| Project card | Existing card | Paper, Stone border unchanged |

The field remains visible outside these surfaces. It is not a panel around the about paragraph.

## Hub page

Unchanged as a route. Home (`/`), Resume (`/resume`), and Projects (`/projects`).

| Field | Rule |
| --- | --- |
| Home heading | `greeting` only. "My Portfolio" is absent |
| Home body | `about`, then the existing Resume and Projects links |
| Resume and Projects headings | Unchanged ("Resume", "Projects") |
| Resume file and project cards | Unchanged contents and actions |
| Nav | Home, Resume, Projects. One current item in Current |

`/experience` resolves to Resume before render. `/blog` resolves to Home before render. Both show the field because they render this app.

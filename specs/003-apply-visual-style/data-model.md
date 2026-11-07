# Data Model: Apply Visual Style

This feature does not add stored records. It fixes how existing hub pages are presented.

## Visual law

Fixed presentation values. A visitor cannot change them.

| Field | Value | Use |
| --- | --- | --- |
| Paper | `#F3F1EC` | Page and card background |
| Ink | `#1C2422` | Text, and nav items that are not current |
| Stone | `#D5D1C8` | 1px rules and card borders |
| Current | `#3E6B66` | Links, the current nav item, focus outline |
| Sans | Geist Sans, weight 400 or 500 | Body 16px, title 20px, display 25px |
| Mono | Geist Mono, weight 400 or 500 | Nav, labels, meta, skills at 13px |
| Column | max 40rem, centered | Hub chrome and cards |
| Narrow margin | 16px each side | Screens under 40rem. No sideways page scroll |
| Measure | 65ch | About and other reading text |
| Section gap | 25px | Nav, page, footer |
| Resume cap | 56rem, centered | Only when the screen is wider than 40rem |

Validation: a computed color on Home, Resume, or Projects is one of the four values. A font weight is 400 or 500. A font size on those pages is 13, 16, 20, or 25px.

## Hub page

One of Home (`/`), Resume (`/resume`), or Projects (`/projects`).

| Field | Rule |
| --- | --- |
| Heading | Display, Geist Sans, 25px, weight 500 |
| Current nav item | Exactly one of Home, Resume, Projects, in Current |
| Body | The page's existing content. This feature does not edit the about string, the PDF bytes, or the project list |

State: the current item follows the path. `/experience` resolves to Resume before render. `/blog` resolves to Home before render. No other state.

## Project card

A presentation of one existing project from `lib/projects.ts`. Fields are not redesigned.

| Field | Presentation |
| --- | --- |
| Title | 20px Geist Sans, weight 500, Ink |
| Summary | 16px Geist Sans, weight 400, Ink |
| Skills | 13px Geist Mono, Ink. Omitted when the project has none |
| Picture | The existing image, or nothing. Width stays inside the card |
| Repository | Plain anchor, Current. Same URL as today |
| Open | Plain anchor, Current, only when a destination already exists |
| Border | 1px Stone. Background Paper |

Relationship: many cards on Projects, stacked in the reading column with 16px between them.

## Resume document

Unchanged file at `public/oliver-ramirez-resume.pdf`.

| State | What the visitor sees |
| --- | --- |
| Posted | The PDF, plus a link to open the file. Width `min(56rem, 100vw - 2rem)`, centered |
| Absent | The sentence "The resume is not available yet." in Ink on Paper |

# Contract: About page and shared field

Applies to pages this app renders: `/`, `/resume`, and `/projects`. A response served for `/apps/<slug>` is outside this contract. `/experience` and `/blog` redirect onto Resume and Home, so the destination meets this contract.

## Home copy

- The first heading is exactly `Hi! I'm Oliver Ramirez`. `My Portfolio` is absent.
- That heading is Geist Sans, 25px, weight 500, color Ink `#1C2422`. It is the largest text on the page. It does not use Current `#3E6B66`.
- A 1px Stone `#D5D1C8` hairline sits under the heading, inside the reading column, sharing the paragraph's left edge.
- The paragraph is exactly the text in FR-001 of [spec.md](../spec.md). It is Geist Sans, 16px, weight 400. A line is between 60 and 70 characters.
- The college, internship, and Budapest introduction is absent.
- Links to Resume and Projects remain under the paragraph and still open those pages in one action.

## Greeting motion

- When the visitor allows motion, the heading moves into its resting place once and then stays. It does not loop.
- When the visitor prefers reduced motion, the heading is in place on first paint and does not move.

## Shared field

- Home, Resume, and Projects show one pattern in the margins: 1px Stone lines on a 32px grid and 1px Ink dots on a 96px spacing, on Paper `#F3F1EC`.
- When the visitor allows motion, the pattern drifts by one 32px cell over 24 seconds, linear, and keeps drifting.
- When the visitor prefers reduced motion, the same pattern is visible and still.
- The reading column, the nav, project cards, and the resume document sit on uninterrupted Paper. The pattern does not cross those letters or the resume page.
- The pattern uses no color besides Paper, Stone, and Ink. Current still appears only on links, the current nav item, and focus.
- The pattern is not a hero, an illustration of a scene, a photograph, or an outdoor icon.
- On a screen narrower than 40rem the pattern does not make the page scroll sideways. The heading wraps inside the column.

## Unchanged content

- The nav labels stay Home, Resume, and Projects.
- Resume still offers the same PDF and the same unavailable sentence. The document still caps at 56rem.
- Each project card keeps its title, summary, skills, picture, repository link, Open action, and order.
- The browser title stays `Oliver Ramirez Dev`.

## Out of scope

- `/apps/<slug>` and its asset prefix are not painted by this contract.
- Rewrite rules, redirect sources, and project records stay as they are.

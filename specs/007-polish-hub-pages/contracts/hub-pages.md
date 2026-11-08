# Contract: Polished hub pages

Applies to pages this app renders: `/`, `/resume`, and `/projects`. A response served for `/apps/<slug>` is outside this contract. `/experience` and `/blog` redirect onto Resume and Home.

## Home

- The introduction is the greeting and the paragraph already in `lib/profile.ts`, still one sentence, centered in the reading column.
- A line of that paragraph stays between 60 and 70 characters.
- The greeting stays Geist Sans, 25px, weight 500, Ink `#1C2422`. It settles once when motion is allowed, and it is still on first paint when the visitor prefers reduced motion.
- The Stone `#D5D1C8` hairline sits under the greeting words.
- The nav stays on the column's left edge. Its labels stay Home, Resume, and Projects.
- There is no Resume link and no Projects link under the introduction.

## Resume

- The heading stays "Resume", left-aligned in the reading column.
- When `public/oliver-ramirez-resume.pdf` is present, the page still offers one action to open that file, and the document is that file.
- The document fills the column, on Paper `#F3F1EC`, with no border, shadow, or surrounding panel. It does not break out to the viewport.
- On a wide screen the grid shows on both sides of the column and does not cross the document.
- On a narrow screen the document uses the column's inset and the page does not scroll sideways.
- When the file is absent, the page shows "The resume is not available yet." and no document area.

## Projects

- Card order, titles, summaries, pictures, repository links, and Open actions stay as they are.
- Each card lists the skills in [data-model.md](../data-model.md), once each, in that order.
- Each skill shows its name in Geist Mono, 13px, Ink. A skill with a mark in that table shows that mark beside the name, in Ink, at the same size. SQL and Java Swing show the name only.
- The same skill uses the same mark on every card.
- A mark is not a link, does not use Current `#3E6B66`, and does not depict the outdoors.
- A card with no skills shows no empty technology row.

## Out of scope

- `/apps/<slug>` and its asset prefix are not changed by this contract.
- Rewrite rules, redirect sources, the resume bytes, and every project field other than `skills` stay as they are.

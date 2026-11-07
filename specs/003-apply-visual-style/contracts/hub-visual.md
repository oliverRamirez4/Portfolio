# Contract: Hub visual presentation

Applies to `/`, `/resume`, and `/projects` only. A response served for `/apps/<slug>` is outside this contract.

## Chrome

- The nav reads Home, Resume, Projects, in that order, Geist Mono 13px.
- The link for the open page is Current `#3E6B66` and exposes `aria-current="page"`. The other two are Ink `#1C2422`.
- Keyboard focus on a link is a Current outline. No other element uses Current unless it is a link.
- Footer destinations are plain anchors to the same LinkedIn and GitHub URLs as today. They are Current. They do not animate on hover.
- Page background is Paper `#F3F1EC`. Text is Ink. The page does not change these when the operating system is in a dark appearance.
- The reading column is centered, at most 40rem, with a 16px side margin when the screen is narrower. The page does not scroll sideways.

## Home

- One display heading, Geist Sans 25px, weight 500.
- The about paragraph is Geist Sans 16px and measures 65 characters per line, within a 60–70 character check.
- Links to Resume and Projects remain, and they are Current.

## Resume

- The heading is the display style. Resume is the current nav item.
- When `public/oliver-ramirez-resume.pdf` exists, the page shows it and a link that opens `/oliver-ramirez-resume.pdf`. The document is centered, wider than the 40rem column only above that width, and never wider than 56rem. Below 40rem it stays inside the screen.
- When the file is absent, the only body sentence is "The resume is not available yet."

## Projects

- Each project is one card in the column: Stone border, title, summary, skills when present, repository link, Open only when a destination exists, and the existing picture when the project has one.
- A card without a picture has no image element.
- Card text uses the type steps above. It does not use a size below 13px.
- No hover motion. No hero. No added photograph. No icon of kayaking, rivers, or the outdoors.

## Out of scope

- Project records, rewrite rules, and redirect sources stay as they are.
- `/apps/<slug>` is not painted by this contract.

# Quickstart: Apply Visual Style

Proves the hub look. It does not mount a project.

## Prerequisites

- Node and the repo dependencies installed.
- `public/oliver-ramirez-resume.pdf` present for the posted-resume check. Rename it aside for the empty check, then put it back.

## Run

```bash
npm run dev
```

Open `http://localhost:3000`. Repeat the checks at a desktop width (wider than 56rem) and a phone width (narrower than 40rem). For the dark-appearance check, set the operating system to dark and reload.

## Checks

1. **Home.** Background is Paper `#F3F1EC`, text is Ink `#1C2422`, heading is Geist Sans 25px. A line of the about text is 60–70 characters. Home is the only nav item in Current `#3E6B66`. No hero, illustration, or outdoor icon.
2. **Narrow Home.** The column fits the screen with a small side margin. The page does not scroll sideways.
3. **Dark appearance.** Reload Home. Background and text are still Paper and Ink.
4. **Nav.** Resume and Projects open in one click. On each page, only that item is Current. Tab to a link: the focus outline is Current.
5. **Resume, wide.** The PDF is wider than the text column, no wider than 56rem, and centered. "Open the PDF" opens the file.
6. **Resume, narrow.** The PDF stays on screen. The page does not scroll sideways.
7. **Resume, missing file.** The page says "The resume is not available yet." and does not show a broken document.
8. **Projects.** Each card has a Stone `#D5D1C8` border, a title, a summary, skills when the project has them, and a repository link. Open appears only for a project that already has a destination. An existing picture is still there. A card without one has no added image. Nothing scales on hover.
9. **Old addresses.** `/experience` lands on Resume. `/blog` lands on Home. Both use this look.
10. **Unchanged data.** The about paragraph, the four projects, and their links match the current registry. `npm test` still passes the rewrite tests.

Details: [contracts/hub-visual.md](./contracts/hub-visual.md) and [data-model.md](./data-model.md).

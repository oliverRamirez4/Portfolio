# Implementation Plan: Apply Visual Style

**Branch**: `003-apply-visual-style` | **Date**: 2026-11-06 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-apply-visual-style/spec.md`

## Summary

Restyle Home, Resume, and Projects to the constitution's visual law. Four named colors, Geist Sans and Geist Mono on the 1.25 scale, one 40rem reading column, and a resume that caps at 56rem. Behavior of the about text, the PDF, and the project cards stays. No new library, no new route, and no restyle of a mounted app.

## Technical Context

**Language/Version**: TypeScript 5, Next.js 15.1, React 19 (the app already in this repo)

**Primary Dependencies**: Next.js, React, Tailwind 3, `next/font` Geist and Geist Mono. MUI stays installed and is not used to paint hub chrome. No new package.

**Storage**: None. Project and profile data stay in `lib/projects.ts` and `lib/profile.ts`. The resume file stays `public/oliver-ramirez-resume.pdf`.

**Testing**: Browser checks in [quickstart.md](./quickstart.md). Existing `npm test` rewrite tests stay and are not the proof of this look.

**Target Platform**: The existing Next.js site, including a narrow phone width and a wide desktop. Deploy target remains Vercel Hobby.

**Project Type**: Web application. One Next.js app. This feature edits presentation only.

**Performance Goals**: Home, Resume, and Projects stay server-rendered pages. The refresh adds no API call, no image beyond the pictures a card already has, and no animation.

**Constraints**: Colors are only Paper `#F3F1EC`, Ink `#1C2422`, Stone `#D5D1C8`, and Current `#3E6B66`. Current is links, the current nav item, and focus. Type weights are 400 and 500. Reading text is 65 characters. Column max is 40rem and shrinks on a narrow screen with a 16px side margin. Resume max is 56rem. No hero, decoration, atmosphere photo, outdoor icon, or hover motion. Do not follow the operating system's dark appearance.

**Scale/Scope**: Three hub pages plus the shared nav and footer. Four existing project cards. One PDF.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Before research | After design |
| --- | --- | --- |
| I. Personal hub. This refresh does not rewrite the about text or the skill labels. | Pass | Pass |
| II. This app still renders `/`, `/resume`, and `/projects`. A mounted app is not restyled. | Pass | Pass |
| III. The plan implements [spec.md](./spec.md), including the three clarifications. | Pass | Pass |
| IV. No new host, no Microfrontends, no Python, no Postgres. | Pass | Pass |
| V. No mount is added. Cards still link out until a child meets the basePath contract. | Pass | Pass |
| VI. Paths are unchanged. `/experience` and `/blog` keep their redirects. | Pass | Pass |
| VII. The card stays the front door. Hub pages use `next/link`. Repository, Open, and footer destinations use a plain anchor. | Pass | Pass |
| Visual style. Palette, type, column, and accent match the constitution. The plan does not invent a second look. | Pass | Pass |

No gate fails. Complexity tracking is empty.

## Project Structure

### Documentation (this feature)

```text
specs/003-apply-visual-style/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── hub-visual.md
└── tasks.md             # /speckit-tasks, not this command
```

### Source Code (repository root)

```text
app/
├── globals.css          # tokens, link, focus, no dark-scheme swap
├── layout.tsx           # fonts, 40rem column, 16px margin
├── page.tsx             # about: display heading, 65ch body
├── resume/page.tsx      # PDF cap 56rem, centered
├── projects/page.tsx    # cards in the column, Stone border
└── components/
    ├── nav.tsx          # three links, current item in Current
    └── footer.tsx       # plain anchors, no hover motion
tailwind.config.ts       # Paper, Ink, Stone, Current
```

**Structure Decision**: Stay in the existing App Router tree. Tokens live in CSS variables so every page shares one palette. `lib/projects.ts`, `lib/profile.ts`, and `next.config.ts` are not part of this change.

## Complexity Tracking

No constitution violations.

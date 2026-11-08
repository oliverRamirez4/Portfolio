# Implementation Plan: Update About Page

**Branch**: `006-update-about-page` | **Date**: 2026-11-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/006-update-about-page/spec.md`

## Summary

Replace the Home introduction and heading, settle that heading into place once, and paint one Stone-and-Ink field behind Home, Resume, and Projects. The field drifts unless the visitor prefers reduced motion. Text, the nav, cards, and the resume sit on Paper so the field stays in the margins. No new package, no new route, and no restyle of a mounted app.

## Technical Context

**Language/Version**: TypeScript 5, Next.js 15.5, React 19 (the app already in this repo)

**Primary Dependencies**: Next.js, React, Tailwind 3, the Geist fonts already loaded in `app/layout.tsx`. No animation library. No new package.

**Storage**: None. The greeting and the about paragraph live in `lib/profile.ts`. Project cards stay in `lib/projects.ts`. The resume file stays `public/oliver-ramirez-resume.pdf`.

**Testing**: Browser checks in [quickstart.md](./quickstart.md), including reduced motion and a narrow width. Existing `npm test` rewrite tests stay and must still pass. They do not prove the field or the copy.

**Target Platform**: The existing Next.js site, including a phone width under 40rem and a desktop wider than 56rem. Deploy target remains Vercel Hobby.

**Project Type**: Web application. One Next.js app. This feature edits Home copy and shared presentation.

**Performance Goals**: Home, Resume, and Projects stay server-rendered. Motion is one CSS transform on a fixed layer and one CSS animation on the Home heading. No canvas, no network call, and no client component added for the effect.

**Constraints**: Colors are only Paper `#F3F1EC`, Ink `#1C2422`, Stone `#D5D1C8`, and Current `#3E6B66`. Marks are those solid colors, not a translucent mix. Current is links, the current nav item, and focus. The greeting is Geist Sans 25px weight 500 in Ink. The paragraph is Geist Sans 16px weight 400, near 65 characters. Column max is 40rem. The field is clipped to the viewport. Motion is the field drift and the one greeting settle. `prefers-reduced-motion: reduce` stops both. Do not follow the operating system's dark appearance.

**Scale/Scope**: The shared layout plus Home. Resume and Projects gain the field only. One profile record. Mounted `/apps/<slug>` responses are untouched.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Before research | After design |
| --- | --- | --- |
| I. Personal hub. The new paragraph is Oliver's own introduction. Skill labels and card actions stay. | Pass | Pass |
| II. This app still renders `/`, `/resume`, and `/projects`. A mounted app is not restyled. | Pass | Pass |
| III. The plan implements [spec.md](./spec.md), including the clarification that a shared field may show on other hub pages. | Pass | Pass |
| IV. No new host, no Microfrontends, no Python, no Postgres. | Pass | Pass |
| V. No mount is added. | Pass | Pass |
| VI. Paths are unchanged. `/experience` and `/blog` keep their redirects and land on pages that show the field. | Pass | Pass |
| VII. The card stays the front door. Hub links stay `next/link`. Repository and Open stay plain anchors. | Pass | Pass |
| Visual style. Palette, type scale, column, and accent match the constitution. The field and the greeting settle are the recorded exception below. | Exception, justified | Exception, justified |

The visual-style exception is justified in Complexity Tracking. No other gate fails.

## Project Structure

### Documentation (this feature)

```text
specs/006-update-about-page/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── about-and-field.md
└── tasks.md             # /speckit-tasks, not this command
```

### Source Code (repository root)

```text
app/
├── globals.css          # field pattern, drift, greeting settle, reduced motion
├── layout.tsx           # fixed field behind the column; column stays Paper
├── page.tsx             # greeting, Stone hairline, about paragraph
└── resume/page.tsx      # resume surface stays Paper where it leaves the column
lib/
└── profile.ts           # greeting and about strings
```

**Structure Decision**: Stay in the existing App Router tree. The field is one layer in the root layout, so Home, Resume, and Projects cannot drift out of sync. Home is the only page that changes its heading and paragraph. `lib/projects.ts`, `next.config.ts`, the nav labels, and the project cards are not part of this change.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Visual style says type and alignment do the work, and it bars a decorative illustration. This plan adds a drifting Stone-and-Ink field and a one-time settle of the greeting. | The accepted spec requires that field on every hub page and requires the greeting to settle once. Oliver asked for those effects after the constitution was ratified, and he said a shared pattern may change Resume and Projects. | A display heading and a hairline alone were the first spec. Oliver withdrew the story that kept the rest of the hub visually still and asked for background effects. Palette, type scale, column, accent limits, and the bans on heroes, photographs, and outdoor icons still hold. |

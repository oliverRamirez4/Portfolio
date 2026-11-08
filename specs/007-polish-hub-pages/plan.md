# Implementation Plan: Polish Hub Pages

**Branch**: `007-polish-hub-pages` | **Date**: 2026-11-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/007-polish-hub-pages/spec.md`

## Summary

Center the Home introduction inside the existing reading measure, and remove the Resume and Projects links under it. Stop the resume document from breaking out to the viewport, so it sits on the column's Paper and the grid only shows in the margins. Extend the project skill lists with the technologies named in those summaries, and show each skill as a Geist Mono name with a shared Ink mark when one exists. No new package, no new route, and no change to a mounted app.

## Technical Context

**Language/Version**: TypeScript 5, Next.js 15.5, React 19 (the app already in this repo)

**Primary Dependencies**: Next.js, React, Tailwind 3, `react-icons` (already installed). No new package. Marks that cannot stay a single Ink shape are omitted.

**Storage**: None. Skill names stay on the project records in `lib/projects.ts`. The resume file stays `public/oliver-ramirez-resume.pdf`. The introduction stays in `lib/profile.ts`.

**Testing**: Browser checks in [quickstart.md](./quickstart.md) at a wide width and a phone width. `npm test` keeps the rewrite tests and updates the skill assertions for the two cards whose lists change.

**Target Platform**: The existing Next.js site. Desktop wider than 40rem, and a phone narrower than 40rem. Deploy target remains Vercel Hobby.

**Project Type**: Web application. One Next.js app. This feature edits Home alignment, the resume frame, and the project skill line.

**Performance Goals**: Home, Resume, and Projects stay server-rendered. No new client component, no canvas, and no network call. A mark is a small SVG in the card.

**Constraints**: Colors stay Paper `#F3F1EC`, Ink `#1C2422`, Stone `#D5D1C8`, and Current `#3E6B66`. Current remains links, the current nav item, and focus. The introduction stays Geist Sans, greeting 25px weight 500 and paragraph 16px weight 400, with a line near 65 characters. Nav and skill names stay Geist Mono 13px. The column stays max 40rem. Marks are Ink on Paper, never a brand color, never a link, and never an outdoor scene. Reduced motion and the greeting settle stay as they are. Do not follow the operating system's dark appearance.

**Scale/Scope**: Home, the resume frame, and six project cards. Eight skill names, six of them with a mark. Mounted `/apps/<slug>` responses are untouched.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Before research | After design |
| --- | --- | --- |
| I. Personal hub. Cards may name a technology outside the five-name hub stack when that project's summary already names it. This app still does not run those stacks. | Exception, justified | Exception, justified |
| II. This app still renders `/`, `/resume`, and `/projects`. A mounted app is not restyled. | Pass | Pass |
| III. The plan implements [spec.md](./spec.md). | Pass | Pass |
| IV. No new host, no Microfrontends, no Python process, no Postgres. | Pass | Pass |
| V. No mount is added. | Pass | Pass |
| VI. Paths are unchanged. `/experience` and `/blog` keep their redirects. | Pass | Pass |
| VII. The card stays the front door. Skill marks are not links. Repository and Open stay plain anchors. Hub links stay `next/link`. | Pass | Pass |
| Visual style. The introduction is centered, which leaves the column's left edge. Skill marks are small Ink labels. Palette, type scale, column width, and accent limits hold. The resume returns to the column. | Exception, justified | Exception, justified |

The two exceptions are justified in Complexity Tracking. No other gate fails.

## Project Structure

### Documentation (this feature)

```text
specs/007-polish-hub-pages/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── hub-pages.md
└── tasks.md             # /speckit-tasks, not this command
```

### Source Code (repository root)

```text
app/
├── page.tsx                 # center the introduction; remove the extra links
├── resume/page.tsx          # document stays inside the column
└── projects/page.tsx        # skill name plus shared mark
lib/
└── projects.ts              # allow-list and the two completed skill arrays
tests/
└── rewrites.test.ts         # skill assertions for those two cards
```

**Structure Decision**: Stay in the existing App Router tree. Home alignment is a class on the introduction block, so the nav in `app/layout.tsx` keeps the left edge. The resume stops escaping `main`. Skill names remain the `skills` arrays; the mark is a shared lookup rendered by the projects page, not a new field on each record.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Visual style requires one left edge. This plan centers the Home introduction. | The accepted spec says the greeting and the paragraph are centered in the reading column, and the top navigation stays on the left edge. | Leaving the introduction on the left edge misses the change Oliver asked for. Centering the nav, the resume heading, or the project cards would spread that exception further than the spec allows. |
| Principle I limits a card to the hub stack: Python, Postgres, Unix, TypeScript, and React. This plan also shows Hugging Face, Java, SQL, and Java Swing. | Those four names are already in the project summaries. The spec requires each card to list every technology its summary names. | Keeping the five-name allow-list leaves Conversational AI Chat Interface and Osu Rhythm Game Clone with an empty technology line. The hub still does not run Java or host a model. |
| Visual style says type and alignment do the work, and it bars a decorative illustration. This plan adds a small mark beside a technology name. | The accepted spec asks for an icon-like label, with the name still readable, in Ink, and not an outdoor scene. | A comma-separated name list is the current UI and does not meet that story. Brand-colored logos were rejected because they add colors outside the palette. |

# Portfolio Constitution

## Core Principles

### I. Personal project hub

This site is Oliver's hub for projects he builds. It exists so he can open those projects from one place and show the quality of the work. It is not written for a hiring-manager persona.

The stack the hub is organized around is Python, Postgres, Unix, TypeScript, and React. A project card names the parts of that stack the project actually uses. The hub itself does not have to implement every part of the stack.

### II. This app is the default zone

The Next.js app in this repo serves `/`, `/resume`, and `/projects`, and any other path not explicitly mounted to another project. `/experience` redirects to `/resume`. `/blog` redirects to `/`. Neither is a section of the hub.

Portfolio chrome applies only to pages this app renders. A mounted project owns the full response for its prefix.

### III. Specs are the source of truth

Feature work uses GitHub Spec Kit. A feature has a spec (what and why), a plan (how), and tasks. Implementation starts after the spec and plan are accepted.

The constitution file Spec Kit reads is this one: `.specify/memory/constitution.md`.

### IV. Vercel Hobby is the deployment target

Deploy on Vercel. Path routing uses Next.js rewrites. Do not use Vercel Microfrontends for this hub. Hobby includes two microfrontend projects.

A proxied request times out at 120 seconds. `/.well-known` is not rewritten. Rewrites count toward 2,048 routes per deployment.

This app does not run a long-lived Python process or Postgres. Those belong in a project repo, or in a later spec on their own host.

### V. No mount without a basePath contract

A project from another repo is mounted only when that app is built for its prefix:

- `basePath` is the public path, for example `/apps/vote`.
- `assetPrefix` is unique and does not collide with this app's `/_next`, for example `/apps/vote-static`.
- This repo rewrites both prefixes to that deployment's URL.

Until that contract is met, the project card links out to the live site and the GitHub repo.

### VI. Paths do not overlap

These paths belong to this app and are not given to a mounted project: `/`, `/resume`, `/experience`, `/projects`, `/blog`, `/_next`, and files in `public/`.

Each mounted app gets one unique prefix under `/apps/<slug>` plus its asset prefix.

### VII. The card is the front door

A project is an informational card on this hub. Oliver chooses when to open it. The hub does not drop a visitor into another app from the nav.

The open control for a mounted app is a plain anchor to `/apps/<slug>`. `next/link` is for pages this app renders.

## Visual style

The look is constitution law. Spec Kit does not invent a different palette, typeface, or layout.

The site is utilitarian. Type and alignment do the work. There is no hero, no decorative illustration, no photography, and no icon that depicts kayaking, rivers, or the outdoors. The outdoor reference stays in the color only.

Color, used exactly:

- Paper `#F3F1EC` is the page background.
- Ink `#1C2422` is the text.
- Stone `#D5D1C8` is for hairline rules and card borders.
- Current `#3E6B66` is the only accent. It is used for links, the current nav item, and focus. It is used nowhere else.

The page does not switch colors with the operating system.

Typography is modular, ratio 1.25, base 16px. The steps are meta 13px, body 16px, title 20px, and display 25px. Body and display use Geist Sans. Nav, labels, and meta use Geist Mono. Weights are regular and medium only. Line length for reading text stays near 65 characters.

Layout is one reading column, max width 40rem, centered, with a consistent left edge. Sections stack with space taken from the same 1.25 ratio. Project cards stay in that column and keep their border, title, summary, skills, and links. The resume PDF may be wider than the column so the page can be read. Nav remains Home, Resume, and Projects.

About, the PDF resume, and the project cards keep their current behavior. A visual choice that changes what a person can do is recorded in a feature spec through `/speckit-clarify`. This constitution records the look. It does not change page code.

## Development workflow

One feature spec at a time. The first routing slice adds the registry and rewrite helper with every rewrite disabled until one child app is ready. Other project repositories are not edited from this repo.

Skills live in `.cursor/skills/` and are invoked in chat, one at a time: `/speckit-constitution`, `/speckit-specify`, `/speckit-clarify`, `/speckit-plan`, `/speckit-tasks`, `/speckit-implement`, `/speckit-converge`.

## Governance

This constitution overrides conflicting notes under `specs/`. Amendments are edits to this file, with the version bumped.

**Version**: 1.2.0 | **Ratified**: 2026-11-06 | **Last Amended**: 2026-11-06

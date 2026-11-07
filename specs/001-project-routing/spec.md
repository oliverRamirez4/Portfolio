# Feature spec: Project routing

Feature: `001-project-routing`

Rules: [`.specify/memory/constitution.md`](../../.specify/memory/constitution.md)

## Summary

The portfolio stays the place a visitor reads about Oliver's projects. Each project is a card. When the visitor chooses to open a project that is hosted under this domain, the browser goes to `/apps/<slug>` and that other app fills the page. Projects that are not ready to be mounted keep their current external links.

## Why

This is Oliver's hub for opening projects he builds, with the work focused on Python, Postgres, Unix, TypeScript, and React. Projects still live in their own repositories and deploy on their own. This site publishes the card and, when the other app has opted in, the path that reaches it.

## User stories

### US1 — Read a project on this site (P1)

A visitor opens Projects and reads a card with the project title and a paragraph that says what it is. The card is tall enough to show that paragraph. An image may appear when one exists. GitHub is available from the card.

Independent test: open `/projects` and read the Colorado Down Ballot Visuals card without scrolling inside the card.

### US2 — Open a project that is not mounted (P1)

A visitor uses the card's open link and lands on that project's existing live site in a new tab or the same tab. GitHub still opens the repository. Nothing on `/apps/...` is required for this to work.

Independent test: from the Projects page, open the current live URL and the GitHub URL for a project that has no mount.

### US3 — Open a mounted project (P2)

A visitor uses Open on a card marked as on this site. The address bar stays on the portfolio host at `/apps/<slug>`. The portfolio nav, footer, and narrow column are gone. The other app's own UI is what they see. A later visit to `/projects` returns to this app.

Independent test: with one rewrite enabled for a child app that sets `basePath` and `assetPrefix`, open the card link and confirm the child UI loads, including its CSS and JS. Then open `/projects` and confirm this app's Projects page is back.

### US4 — Portfolio pages stay this app (P1)

Home, Experience, Projects, and Blog keep rendering this app. A mounted prefix does not swallow those routes.

Independent test: with a rewrite present for `/apps/example`, load `/`, `/experience`, `/projects`, and `/blog` and confirm each is still this portfolio.

## Visual behavior

Font, color, and layout are not specified yet. See [specs/000-design-direction.md](../000-design-direction.md). The behavior that is specified:

- Projects stays in the same reading column as the rest of the portfolio.
- Cards stack vertically. Height follows content. Body text is a normal reading size.
- The primary action is Open. A second action is GitHub.
- Mounted Open says it opens on this site and uses a plain anchor to `/apps/<slug>`.
- Unmounted Open uses the external live URL.
- The mounted app is not framed by this site's nav or footer.

Home, Experience, and Blog are not restyled in this feature, except the shared text color so dark mode uses `--foreground` instead of a hardcoded black.

## Acceptance criteria

1. Every current project on the Projects page still has a card, a summary, a GitHub link, and a way to open the live work.
2. A project without a completed child contract does not get a rewrite. Its open link remains the external URL.
3. A mounted project's open link is `/apps/<slug>` on this host. The response is the other app, not this app's layout.
4. `/`, `/experience`, `/projects`, `/blog`, and `/_next` are never rewritten to another app.
5. Two mounted apps do not share a path prefix or an asset prefix.
6. The visitor can return to this portfolio from a mounted app by going to `/` or `/projects` directly. This feature does not require the child app to render the portfolio nav.
7. No Python service and no Postgres are added for this feature.

## Non-goals

- Editing the other project repositories in this pass.
- Enabling a rewrite before a child app is built with `basePath` and `assetPrefix`.
- Embedding a project in an iframe.
- Vercel Microfrontends.
- A visual redesign of Experience or the blog.

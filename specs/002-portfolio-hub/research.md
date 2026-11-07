# Research: Portfolio Hub

## 1. Where the hub runs

- **Decision**: Keep the existing Next.js app in this repository as the only application for about, resume, projects, and blog. Deploy it on Vercel.
- **Rationale**: The constitution makes this app the default zone and names Vercel Hobby as the host. The spec adds and removes pages inside that zone. A second service would violate the "no long-lived Python or Postgres in this app" rule without helping the visitor-facing behavior.
- **Alternatives considered**: A Python API plus Postgres for profile and projects. Rejected because the constitution defers that stack to a later spec on its own host, and the content is a handful of records the author edits in git.

## 2. How content is stored

- **Decision**: Store the about text, resume entries, and project cards in TypeScript modules under `lib/`. Pages read those modules. No database.
- **Rationale**: The volume is one profile and the projects already listed on the site. A typed module can express "picture optional", "live URL optional", and "on-site short name optional" without a migration.
- **Alternatives considered**: Markdown files like the blog. Rejected for the resume and projects because those records have several optional fields and a uniqueness rule on the short name. Markdown remains appropriate for blog posts, which this feature does not change.

## 3. Resume versus the experience page

- **Decision**: Add `/resume`. Remove the experience page. Redirect `/experience` to `/resume`. Seed the resume from the roles, dates, and education already written in `app/components/timeline.tsx`.
- **Rationale**: Clarification says the resume replaces experience and is the only career record. The redirect keeps an old link from landing on a missing page or on a mounted app. Seeding avoids an empty "resume not posted" state when the copy already exists.
- **Alternatives considered**: Leave `/experience` in place beside `/resume`. Rejected by the clarification. Reuse the path `/experience` as the resume URL. Rejected because the spec's three areas are about, resume, and projects, and the nav label should say Resume.

## 4. First page

- **Decision**: `app/page.tsx` remains `/` and renders the about text. The nav label stays "Home" and points at `/`. Resume and projects are separate routes linked from the nav and from the home page.
- **Rationale**: Clarification says the first page is the about section, and resume and projects are one action from there. The current home page is already that introduction.
- **Alternatives considered**: A separate landing page that only links onward. Rejected by the clarification.

## 5. Project open behavior

- **Decision**: One registry drives the cards and the rewrite table. A project with an on-site short name opens at `/apps/<short-name>` through a Next.js rewrite. A project with only an external live URL opens that URL. A project with neither has no Open control. The repository link is always present. Initial data has no on-site short names, so the first deploy emits no rewrites.
- **Rationale**: The constitution forbids mounting an app that has not set `basePath` and `assetPrefix`, and forbids Vercel Microfrontends on Hobby. The spec says on-site Open wins over an older live URL.
- **Alternatives considered**: Vercel Microfrontends. Rejected because Hobby includes two projects and extra projects are billed. Rewriting `/apps/<slug>` onto the child app's `/` path. Rejected because the child would still request `/_next` assets from this portfolio.

## 6. Pictures and visual system

- **Decision**: A card renders its picture only when `image` is set. Keep the current Tailwind and MUI styling. Do not change fonts, colors, column width, or the blog.
- **Rationale**: Clarification says a picture is shown when present and a card without one is valid. The spec forbids this feature from choosing a new visual design.
- **Alternatives considered**: Replacing MUI cards with a new Tailwind layout. Rejected because that is a style decision the spec explicitly leaves unset.

## 7. How leaving the hub is linked

- **Decision**: Links to `/`, `/resume`, `/projects`, and `/blog` use the in-app link component. Links to an external live site, a repository, and `/apps/<short-name>` use a plain anchor.
- **Rationale**: The constitution says in-app navigation prefetch must not cross into a mounted app. An external site is the same kind of boundary.
- **Alternatives considered**: The in-app link component for `/apps/<short-name>`. Rejected because it prefetches and client-navigates, which does not work across the rewrite boundary.

## 8. Verification

- **Decision**: Use Node's built-in test runner for the rewrite builder. Use the browser quickstart for the pages.
- **Rationale**: The rewrite rules are pure data and must fail the build on a duplicate short name or a reserved path. The pages are visitor behavior the spec already describes. The repo has no test framework today, so adding one is out of proportion.
- **Alternatives considered**: A new test framework. Rejected as extra tooling for a static hub.

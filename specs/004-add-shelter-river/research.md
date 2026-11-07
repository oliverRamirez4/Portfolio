# Research: Add Shelter Connect and River Permit Projects

## Decision: Append two records to `lib/projects.ts` and leave the page alone

**Rationale**: `app/projects/page.tsx` renders `projects` in array order. A missing `image` skips the picture. `openHref` returns null when both `onSite` and `externalUrl` are absent, and the page then omits Open. The repository anchor is always rendered. Adding records is enough to meet the card spec, and it keeps Home, Resume, and the card chrome untouched.

**Alternatives considered**: Hand-write two cards in the page. Rejected because the page would drift from the registry that `next.config.ts` and the rewrite tests already use. A second list for "link-only" projects. Rejected because the current `Project` type already allows a record with only a title, summary, skills, and repository URL.

## Decision: Short names are `shelter-connect` and `river-permit`

**Rationale**: Short names must be unique, lowercase, and hyphenated, and must not be `experience`, `projects`, `blog`, `resume`, or `_next`. These two names are free in the current registry. They are not public routes. `/apps/shelter-connect` and `/apps/river-permit` appear only if `onSite` is set, and it will not be.

**Alternatives considered**: `cosconnect` and `recreation-gov-rafting-permit-scraper`. Rejected because the card titles are Shelter Connect and River Permit API Wrapper, and the short name should stay a stable id rather than a repository name. Reusing `nlp-labs` style profile URLs. Rejected because each new card has its own repository.

## Decision: Omit `image`, `externalUrl`, and `onSite`

**Rationale**: The spec says neither project has a picture or a live destination, and neither may open on this site. Leaving those fields off makes Open disappear and adds no rewrite. `buildRewrites` ignores a project without `onSite`, so the existing empty-rewrite behavior for unmounted projects stays. Constitution V forbids a mount until the other app is built with `basePath` and `assetPrefix`. Neither repository is edited from this one, so that contract is not met.

**Alternatives considered**: Set `externalUrl` to the GitHub URL so Open and Repository go to the same place. Rejected because the spec forbids an Open action. Mount Shelter Connect at `/apps/shelter-connect`. Rejected because that app is not built for the prefix, and this feature does not change the other repository.

## Decision: Lock the visitor-facing copy

**Rationale**: The acceptance scenarios name the facts each summary must contain. Fixed strings keep the later task from paraphrasing those facts away.

Shelter Connect summary: "A Colorado Springs homeless-shelter guide from the Colorado College TigerHacks hackathon. A person can see shelters and the people they serve."

River Permit API Wrapper summary: "A Python tool that checks Recreation.gov for remaining river-rafting permits over a chosen date range and reports which launch dates still have permits."

Skills, in display order: Shelter Connect is TypeScript, React, Postgres. The river permit wrapper is Python. `page.tsx` joins skills with `", "`, so array order is the order a visitor reads.

**Alternatives considered**: Mention the map, bed counts, or the campsite checker. Rejected because the spec's summary bounds are the shelter guide and the river-permit check. Add Unix because the permit tool is a command-line program. Rejected because the spec lists Python only.

## Decision: Prove the registry with the existing test runner

**Rationale**: `npm test` already imports `lib/projects.ts`. A test can read the exported `projects` array and assert six records, the four original short names first and unchanged, then `shelter-connect` and `river-permit` with the titles, summaries, skills, and repository URLs in [data-model.md](./data-model.md). It can also assert `openHref` is null for both and `buildRewrites(projects)` is still empty. That locks FR-009 through FR-012 without a new framework.

**Alternatives considered**: Browser-only checking. Rejected as the only proof, because order and "no Open" are easy to regress in the array. A snapshot of entire card HTML. Rejected because it would freeze class names from the visual-style feature.

## Decision: Do not add a river or outdoor image

**Rationale**: The constitution bars an icon or photograph that depicts kayaking, rivers, or the outdoors. These cards have no picture. The accent color already carries the outdoor reference.

**Alternatives considered**: A permit or river screenshot on the second card. Rejected because the spec says there is no picture, and a river image would also break the visual law.

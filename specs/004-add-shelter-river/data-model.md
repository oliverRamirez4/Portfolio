# Data Model: Add Shelter Connect and River Permit Projects

Source of truth: the `projects` array in `lib/projects.ts`. No new type and no database. Field rules remain those in [the hub data model](../002-portfolio-hub/data-model.md).

## Project list

Six records. The first four stay in place and keep every current field. The last two are new.

| Order | shortName | Change |
| --- | --- | --- |
| 1 | `colorado-vote` | Unchanged |
| 2 | `nlp-labs` | Unchanged |
| 3 | `level-up` | Unchanged |
| 4 | `osu-clone` | Unchanged |
| 5 | `shelter-connect` | Added |
| 6 | `river-permit` | Added |

"Unchanged" means the same `title`, `summary`, `repositoryUrl`, `skills`, `image`, `externalUrl`, and `onSite` as before this feature. Today only `colorado-vote` has `externalUrl`. None of the four has `onSite`.

## Shelter Connect

| Field | Value |
| --- | --- |
| shortName | `shelter-connect` |
| title | Shelter Connect |
| summary | A Colorado Springs homeless-shelter guide from the Colorado College TigerHacks hackathon. A person can see shelters and the people they serve. |
| repositoryUrl | `https://github.com/oliverRamirez4/COSConnect` |
| skills | `TypeScript`, `React`, `Postgres` |
| image | absent |
| externalUrl | absent |
| onSite | absent |

## River Permit API Wrapper

| Field | Value |
| --- | --- |
| shortName | `river-permit` |
| title | River Permit API Wrapper |
| summary | A Python tool that checks Recreation.gov for remaining river-rafting permits over a chosen date range and reports which launch dates still have permits. |
| repositoryUrl | `https://github.com/oliverRamirez4/recreation-gov-rafting-permit-scraper` |
| skills | `Python` |
| image | absent |
| externalUrl | absent |
| onSite | absent |

## Validation

Existing `assertProject` rules apply to both records:

- `shortName` is lowercase, hyphenated, unique, and not reserved.
- `title`, `summary`, and an absolute `http` or `https` `repositoryUrl` are present.
- Each skill is one of Python, Postgres, Unix, TypeScript, and React, with no duplicates.

Additional rules for these two records:

- `image`, `externalUrl`, and `onSite` are omitted.
- `openHref` is null, so the card has no Open control.
- `buildRewrites` does not emit `/apps/shelter-connect` or `/apps/river-permit`.

## State

A project record is not a workflow. There is no transition onto this site in this feature. Adding `onSite` later requires the other app to be built for `/apps/<shortName>` and is out of scope.

## Relationships

- Home (`lib/profile.ts`) and the resume file are independent of this list.
- Rewrites in `next.config.ts` read the same array and ignore records without `onSite`.

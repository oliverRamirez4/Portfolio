# Data Model: Open Vote Visualizer and Shelter Connect

Source of truth: the `projects` array in `lib/projects.ts`. No new type and no database. Field rules remain those in [the hub data model](../002-portfolio-hub/data-model.md).

## Project list

Six records. Two move to the front and become mounted. The other four keep their fields and their order relative to each other.

| Order | shortName | Change |
| --- | --- | --- |
| 1 | `colorado-vote` | Stays first. `onSite` set. `externalUrl` removed. Other fields unchanged. |
| 2 | `shelter-connect` | Moved from position 5. `onSite` set. Other fields unchanged. |
| 3 | `nlp-labs` | Unchanged |
| 4 | `level-up` | Unchanged |
| 5 | `osu-clone` | Unchanged |
| 6 | `river-permit` | Unchanged |

"Unchanged" means the same `title`, `summary`, `repositoryUrl`, `skills`, `image`, `externalUrl`, and `onSite` as before this feature. Those four have no `externalUrl` and no `onSite`.

## Colorado Down Ballot Visuals

| Field | Value |
| --- | --- |
| shortName | `colorado-vote` |
| title | Colorado Down Ballot Visuals |
| summary | Unchanged |
| repositoryUrl | `https://github.com/oliverRamirez4/coloradoVoteVisuals` |
| skills | `Postgres` |
| image | `/voteVisual.png` |
| externalUrl | absent |
| onSite.originEnv | `PROJECT_COLORADO_VOTE_ORIGIN` |
| onSite.assetPrefix | `/apps/colorado-vote-static` |

`PROJECT_COLORADO_VOTE_ORIGIN` is `https://colorado-vote-visuals.vercel.app` with no path. It is set in the environment, not in the record.

`openHref` for this record is `/apps/colorado-vote`.

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
| onSite.originEnv | `PROJECT_SHELTER_CONNECT_ORIGIN` |
| onSite.assetPrefix | `/apps/shelter-connect-static` |

`PROJECT_SHELTER_CONNECT_ORIGIN` is `https://cos-shelter-connect.vercel.app` with no path. It is set in the environment, not in the record.

`openHref` for this record is `/apps/shelter-connect`.

## Validation rules

- Both `originEnv` and `assetPrefix` values are the only ones `assertProject` accepts for these short names.
- `buildRewrites` throws if either origin variable is missing when these records are mounted.
- No other record gains `onSite` or `externalUrl`.
- Titles, summaries, skills, pictures, and repository URLs do not change.

## State

A record is mounted when `onSite` is present and its origin variable is set. There is no separate draft state in the registry. The release gate in [research.md](./research.md) decides when that mounted registry is deployed. It is not a field on the record.

# Contract: Projects cards for Shelter Connect and River Permit API Wrapper

Page: `/projects`. Registry: `lib/projects.ts`, shaped by [data-model.md](../data-model.md).

The page still renders one card per registry record, in array order, with the current markup. This contract adds two cards. It does not change the card chrome.

## List

1. Colorado Down Ballot Visuals
2. Natural Language Processing Labs
3. Conversational AI Chat Interface
4. Osu Rhythm Game Clone
5. Shelter Connect
6. River Permit API Wrapper

The first four cards keep their current summary, skills, picture, repository link, and Open behavior. Colorado Down Ballot Visuals still has Open to its existing live site. The other three existing cards keep the Open behavior they have today.

## Shelter Connect card

| Part | Required content |
| --- | --- |
| Title | Shelter Connect |
| Summary | A Colorado Springs homeless-shelter guide from the Colorado College TigerHacks hackathon. A person can see shelters and the people they serve. |
| Skills | TypeScript, React, Postgres |
| Picture | None |
| Repository | `https://github.com/oliverRamirez4/COSConnect` |
| Open | Absent |
| On-site note | Absent. The card does not say it opens on this site. |

## River Permit API Wrapper card

| Part | Required content |
| --- | --- |
| Title | River Permit API Wrapper |
| Summary | A Python tool that checks Recreation.gov for remaining river-rafting permits over a chosen date range and reports which launch dates still have permits. |
| Skills | Python |
| Picture | None |
| Repository | `https://github.com/oliverRamirez4/recreation-gov-rafting-permit-scraper` |
| Open | Absent |
| On-site note | Absent |

## Routes

`GET /projects` is still this app. This feature adds no rewrite and no redirect.

These paths stay unclaimed:

- `/apps/shelter-connect`
- `/apps/river-permit`
- `/apps/shelter-connect-static`
- `/apps/river-permit-static`

`buildRewrites(projects)` for the real registry returns `[]`.

`/` and `/resume` are unchanged.

## Link behavior

Repository links are plain anchors to the GitHub URLs above. They are not `next/link`. There is no second control named Open on either new card.

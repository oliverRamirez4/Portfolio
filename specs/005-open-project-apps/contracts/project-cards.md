# Contract: Project cards

Page: `app/projects/page.tsx`, unchanged. It renders `projects` in array order. Open is shown when `openHref` returns a path. A mounted card also shows "Opens on this site".

Registry values: [data-model.md](../data-model.md).

## Order and Open

| Order | Card | Open |
| --- | --- | --- |
| 1 | Colorado Down Ballot Visuals | `/apps/colorado-vote` |
| 2 | Shelter Connect | `/apps/shelter-connect` |
| 3 | Natural Language Processing Labs | none |
| 4 | Conversational AI Chat Interface | none |
| 5 | Osu Rhythm Game Clone | none |
| 6 | River Permit API Wrapper | none |

Open is an anchor to that path on this portfolio. It is not `https://coloradovotevisuals.com`, and it is not either `vercel.app` origin.

## Unchanged card content

Every card keeps its current title, summary, skills, picture, and repository link. Shelter Connect still has no picture. The four cards after Shelter Connect still have no Open.

Repository links:

- Colorado Down Ballot Visuals: `https://github.com/oliverRamirez4/coloradoVoteVisuals`
- Shelter Connect: `https://github.com/oliverRamirez4/COSConnect`

## Pages this app still renders

`GET /projects` is this app's card list. `GET /` and `GET /resume` are unchanged. Neither mounted app replaces those pages.

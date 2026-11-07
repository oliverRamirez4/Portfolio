# Quickstart: Add Shelter Connect and River Permit Projects

Proves the registry and the Projects page against [data-model.md](./data-model.md) and [contracts/project-cards.md](./contracts/project-cards.md).

## Prerequisites

- This repo on branch `004-add-shelter-river`
- Dependencies installed (`npm install`)
- The two records appended in `lib/projects.ts` and nowhere else

## Registry

Run:

```bash
npm test
```

Expected:

- Existing rewrite tests still pass.
- The real `projects` array has six records.
- Short names, in order: `colorado-vote`, `nlp-labs`, `level-up`, `osu-clone`, `shelter-connect`, `river-permit`.
- Shelter Connect and River Permit API Wrapper match the titles, summaries, skills, and repository URLs in the data model.
- `openHref` is null for `shelter-connect` and `river-permit`.
- `buildRewrites(projects)` is `[]`.
- The test does not require `PROJECT_SHELTER_CONNECT_ORIGIN` or `PROJECT_RIVER_PERMIT_ORIGIN`.

## Projects page

Start the app with `npm run dev` and open `/projects`.

Expected:

1. Six cards, in the contract order.
2. The first four cards match their previous title, summary, skills, picture, repository link, and Open action. Only Colorado Down Ballot Visuals shows Open.
3. Shelter Connect shows its summary and the skills TypeScript, React, Postgres. It has a Repository link to `https://github.com/oliverRamirez4/COSConnect`. It has no picture and no Open.
4. River Permit API Wrapper shows its summary and the skill Python. It has a Repository link to `https://github.com/oliverRamirez4/recreation-gov-rafting-permit-scraper`. It has no picture and no Open.
5. The card border, type, and column match the cards above. No river or outdoor icon was added.

Then open `/` and `/resume`. The about text and the resume PDF are unchanged.

## Out of scope

Do not open COSConnect or the permit tool from this site's `/apps` paths. Do not change those repositories.

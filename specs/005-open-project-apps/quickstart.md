# Quickstart: Open Vote Visualizer and Shelter Connect

Proves the registry, the rewrites, and the Projects page against [data-model.md](./data-model.md), [contracts/project-cards.md](./contracts/project-cards.md), and [contracts/mounts.md](./contracts/mounts.md).

## Prerequisites

- This repo on branch `005-open-project-apps`
- Dependencies installed (`npm install`)
- The two records updated in `lib/projects.ts`
- Local env, not committed:

```bash
PROJECT_COLORADO_VOTE_ORIGIN=https://colorado-vote-visuals.vercel.app
PROJECT_SHELTER_CONNECT_ORIGIN=https://cos-shelter-connect.vercel.app
```

## Child paths

Before treating the feature as accepted, and before setting those variables on the deployed portfolio, request the child paths with no redirect following:

```bash
curl -s -o /dev/null -w "%{http_code}\n" --max-redirs 0 https://colorado-vote-visuals.vercel.app/apps/colorado-vote
curl -s -o /dev/null -w "%{http_code}\n" --max-redirs 0 https://cos-shelter-connect.vercel.app/apps/shelter-connect
```

Expected: both print `200`, and each response is that app, including its CSS and JavaScript.

On 2026-11-07 both printed `404`. While that is still true, do not deploy this mount. This check does not change either child repository.

## Registry

With the two origin variables set, run:

```bash
npm test
```

Expected:

- Existing rewrite tests still pass.
- The real `projects` array has six records.
- Short names, in order: `colorado-vote`, `shelter-connect`, `nlp-labs`, `level-up`, `osu-clone`, `river-permit`.
- Colorado Down Ballot Visuals keeps its title, summary, Postgres skill, `/voteVisual.png` picture, and repository URL. It has no `externalUrl`. Its `onSite` matches the data model. `openHref` is `/apps/colorado-vote`.
- Shelter Connect keeps its title, summary, skills, and repository URL. It has no picture and no `externalUrl`. Its `onSite` matches the data model. `openHref` is `/apps/shelter-connect`.
- The other four records are unchanged, and `openHref` is null for each.
- `buildRewrites(projects)` equals the six rules in [contracts/mounts.md](./contracts/mounts.md).

## Projects page

Start the app with the two origin variables set (`npm run dev`) and open `/projects`.

Expected:

1. Six cards. Colorado Down Ballot Visuals is first. Shelter Connect is second. Then Natural Language Processing Labs, Conversational AI Chat Interface, Osu Rhythm Game Clone, and River Permit API Wrapper.
2. The first card still shows its picture and repository link. Open goes to `/apps/colorado-vote` on this host. The address does not become `https://coloradovotevisuals.com`.
3. Shelter Connect shows its summary, the skills TypeScript, React, and Postgres, and its repository link. It has no picture. Open goes to `/apps/shelter-connect` on this host.
4. Both Open controls are plain anchors. Each mounted card says it opens on this site.
5. The last four cards match their previous title, summary, skills, picture, and repository link, and they have no Open.
6. Card border, type, and column are unchanged.

Then open `/` and `/resume`. The about text and the resume PDF are unchanged.

With the child paths returning 200, open `/apps/colorado-vote` and `/apps/shelter-connect` on this host. The address stays on this host. Each page is that published app. `/projects` still shows this app's card list afterward.

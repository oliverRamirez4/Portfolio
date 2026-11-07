# Contract: Child app mount

This feature does not edit other repositories and does not enable a mount. A later change may set `onSite` only after the child meets this contract.

For short name `vote`:

- The child sets its site base path to `/apps/vote`.
- The child sets its asset prefix to `/apps/vote-static`.
- The child is deployed on its own Vercel project.
- `https://<child-origin>/apps/vote` loads the child, including its CSS and JavaScript, before this portfolio points at it.
- The child does not expect this portfolio's nav, footer, or column.
- This portfolio then sets `PROJECT_VOTE_ORIGIN` to that origin and sets `onSite` on the vote project.

Until those are true, the card uses `externalUrl` when one exists.

# Contract: Hub UI

Visitor-facing routes this app renders. Mounted apps are not part of this contract. See [child-mount.md](./child-mount.md).

## Routes

| Path | Response |
| --- | --- |
| `/` | About text from the profile. First page. No extra navigation required. |
| `/resume` | The posted PDF, embedded on the page, plus a link to open the file. If the file is absent, the words that the resume is not available yet. |
| `/experience` | Redirect to `/resume`. |
| `/projects` | One card per project from the registry. If there are zero projects, the words that there are no projects yet. |
| `/blog` | Redirect to `/`. |

The nav offers Home (`/`), Resume (`/resume`), and Projects (`/projects`). It does not offer Experience or Blog.

Home, Resume, and Projects are each reachable in one action from `/` (the nav link is that action). Blog may stay in the nav and is out of this feature's acceptance.

## Project card

Every card shows `title`, `summary`, the `skills` list, and a repository link to `repositoryUrl`.

If `image` is set, the card shows that picture. If it is absent, the card does not reserve a broken image.

Open:

- `onSite` set: plain anchor to `/apps/<shortName>`, and the card says it opens on this site.
- otherwise `externalUrl` set: plain anchor to that URL.
- otherwise: no Open control.

Repository and external links may open in the same tab. They must not use the in-app client link used for `/`, `/resume`, `/projects`, and `/blog`.

## Boundaries

- Opening `/apps/<shortName>` is not rendered by these pages. The hub nav is not part of that response.
- Fonts, colors, and column width stay as they are in `app/layout.tsx` and the current project cards.
- `/`, `/resume`, and `/projects` still render after a visitor has opened an on-site app and comes back.

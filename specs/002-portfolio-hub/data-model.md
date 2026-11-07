# Data Model: Portfolio Hub

Source of truth at runtime: `lib/profile.ts` and `lib/projects.ts`. No database.

## Engineer profile

One record.

| Field | Required | Rules |
| --- | --- | --- |
| name | yes | Display name. Existing site uses "Oliver Ramirez". |
| about | yes | The written account shown on `/`. Non-empty. |

There is exactly one profile. It has no lifecycle beyond editing the module.

## Resume entry

Many records, ordered. Together they are the resume. If the list is empty, `/resume` says the resume is not available yet. The first version is not empty: it is seeded from the current experience timeline.

| Field | Required | Rules |
| --- | --- | --- |
| id | yes | Unique within the resume. |
| kind | yes | `role` or `education`. |
| title | yes | Role or program name. |
| organization | yes | Employer or school. |
| start | yes | Display date, as already written on the site. |
| end | yes | Display date or "Present". |
| summary | yes | The paragraph already written for that entry. |
| details | no | Optional list of technologies or courses. |

Relationship: the profile does not embed entries. The resume page reads the entry list.

Removed state: the experience page is not an entity. `/experience` redirects to `/resume`.

## Project

Many records. The projects page renders one card per record. Initial records are the four projects already on `app/projects/page.tsx`.

| Field | Required | Rules |
| --- | --- | --- |
| shortName | yes | Unique, lowercase, hyphenated. Identifies the project. Used in `/apps/<shortName>` only when `onSite` is set. |
| title | yes | Card heading. |
| summary | yes | One short description. |
| repositoryUrl | yes | Absolute http(s) URL. Every card has one. |
| skills | yes | Array. Each value is one of `Python`, `Postgres`, `Unix`, `TypeScript`, `React`. Duplicates are invalid. Empty array is allowed. |
| image | no | Path under `public/` when a picture exists. Absent means the card has no picture. |
| externalUrl | no | Absolute http(s) URL of a live site elsewhere. |
| onSite | no | Present only when this project is prepared to open on this site. |

`onSite`, when present:

| Field | Required | Rules |
| --- | --- | --- |
| originEnv | yes | Name of the environment variable holding the child origin, `PROJECT_<SHORTNAME>_ORIGIN`, with hyphens in the short name turned into underscores and letters uppercased. |
| assetPrefix | yes | Must equal `/apps/<shortName>-static`. Unique across projects. |

### Open destination

Evaluated in order:

1. If `onSite` is set, Open is `/apps/<shortName>`.
2. Else if `externalUrl` is set, Open is that URL.
3. Else there is no Open control.

The repository link does not change across these states.

### Validation

- Duplicate `shortName` or duplicate `assetPrefix` is a build error.
- `onSite` set while its origin environment variable is missing is a build error.
- `shortName` must not be empty and must not be `experience`, `projects`, `blog`, `resume`, or `_next`.
- Skill values outside the five allowed names are a build error.

### State

A project is not a workflow. The author edits the module. "Available on this site" means `onSite` is present. The first version sets `onSite` on no project.

## Relationships

- Profile is independent of projects.
- Resume entries are independent of projects.
- A project does not reference a resume entry.
- At most one project owns a given `/apps/<shortName>` path.

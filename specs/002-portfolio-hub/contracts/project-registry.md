# Contract: Project registry and rewrites

Module: `lib/projects.ts`.

## Inputs

`projects`: the list defined in [data-model.md](../data-model.md).

For each project with `onSite`, the environment variable named by `originEnv` is the child origin. It is an absolute `https` URL with no path.

## `buildRewrites(projects)`

Returns Next.js rewrite rules.

When no project has `onSite`, the result is an empty list.

When a project has `onSite` and short name `vote` and origin `https://vote.example`:

```text
/apps/vote              → https://vote.example/apps/vote
/apps/vote/:path+       → https://vote.example/apps/vote/:path+
/apps/vote-static/:path+ → https://vote.example/apps/vote-static/:path+
```

The destination includes the `/apps/vote` prefix. It does not point at the child origin's `/`.

## Rejected output

The function throws, and the build fails, if any rule would use one of these sources:

- `/`
- `/resume`
- `/experience`
- `/projects`
- `/blog`
- `/_next`
- `/.well-known`
- `/apps` with no short name

It also throws on a duplicate `shortName` or duplicate `assetPrefix`, or on `onSite` whose origin variable is missing or empty.

## Redirects

`/experience` redirects to `/resume` with a permanent redirect. This is not a rewrite to another app.

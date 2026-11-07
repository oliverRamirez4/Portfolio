# Research: Apply Visual Style

## Decision: CSS variables for the four colors

**Rationale**: Home, Resume, Projects, the nav, and the footer must share one palette. Variables on `:root` are the single place a reviewer can check Paper, Ink, Stone, and Current.

**Alternatives considered**: Tailwind color literals on each element. Rejected because a later page can introduce a fifth color without a single file to audit. An MUI theme. Rejected because MUI's default action and primary colors are not in the palette.

## Decision: Load Geist Sans next to the existing Geist Mono

**Rationale**: `next/font/google` already loads Geist Mono in `app/layout.tsx`. The same module exports Geist Sans. Weights are limited to 400 and 500. The root element uses Geist Sans. Nav, labels, skills, and meta set Geist Mono explicitly.

**Alternatives considered**: Keep Mono for all text. Rejected because the constitution assigns Sans to body and display. Add a third family. Rejected because the law names two families.

## Decision: Reading measure is 65ch inside a 40rem column

**Rationale**: A 40rem column at 16px Geist Sans fits about 87 characters, and `65ch` is at least that wide because Geist's zero is narrower than an average letter. Body copy gets `max-width: 30rem`, which measures 66 characters and sits inside the 60–70 character success range. Headings and cards may use the full column. The column itself is `min(40rem, 100% - 2rem)` with a 16px side margin, centered. `overflow-x: clip` on the page stops a wide child from creating sideways scroll.

**Alternatives considered**: `max-width: 65ch`. Rejected because it does not keep a line near 65 characters in Geist Sans. Shrink the whole column to the measure. Rejected because cards and the resume cap are specified against 40rem.

## Decision: Section gap is 25px and the side margin is 16px

**Rationale**: The spec allows the 13, 16, 20, and 25px steps and does not assign them. 25px separates the nav, the page, and the footer. 16px separates items inside a section and is the side margin on a narrow screen. 20px is the title size, not a stack gap. 13px stays a type size.

**Alternatives considered**: Keep the current 64px nav and footer gaps. Rejected because 64px is not one of the four steps.

## Decision: Replace MUI card chrome with plain markup

**Rationale**: `Card`, `CardMedia`, and the icon buttons bring theme color, elevation, fixed 275px height, `text-xs`, and a hover scale. Those fight the palette, the type steps, and the ban on decorative motion. A card becomes a section with a 1px Stone border, Paper background, a 20px title, a 16px summary, 13px Mono skills, and the existing picture as an `img` when present. Repository and Open stay anchors. The GitHub and link icons may remain if they inherit Current, because they are the existing controls and they do not depict the outdoors. Their scale transition is removed.

**Alternatives considered**: Override the MUI theme. Rejected because one card page does not justify a theme layer that can still leak a default color.

## Decision: Resume width is `min(56rem, 100vw - 2rem)`, centered

**Rationale**: Above a 40rem screen this is wider than the reading column and never wider than 56rem. Below that, `100vw - 2rem` fits the screen, matching the narrow-screen clarification. The element is centered against the viewport, not stretched by the 40rem column. The page clips horizontal overflow.

**Alternatives considered**: Leave the current `left-1/2` breakout. Rejected because that positioning is what makes a narrow page scroll sideways. Cap at 48rem. Rejected because clarification chose 56rem.

## Decision: Ignore the operating system's color scheme

**Rationale**: `app/globals.css` currently swaps to near-black when the system is dark. That fails FR-002 and SC-006. Delete that media block. Set `color-scheme: light` so controls do not invent a dark palette. Paper and Ink are the only page colors in both appearances.

**Alternatives considered**: A second dark palette. Rejected by the constitution.

## Decision: Current nav item comes from the path

**Rationale**: The nav is already a client component. `usePathname` marks `/` as Home, `/resume` as Resume, and `/projects` as Projects. The match sets the link color to Current and `aria-current="page"`. Other nav items stay Ink. Focus uses a 2px Current outline on `:focus-visible`, replacing the browser default so focus cannot be a fifth color.

**Alternatives considered**: Underline plus accent. Rejected because the spec gives the accent to the current item and does not add a second marker. A server header per page. Rejected because one nav already serves all three pages.

## Decision: No new dependency and no route change

**Rationale**: Geist is already available through Next. Redirects in `next.config.ts` already send `/experience` to `/resume` and `/blog` to `/`. Those destinations pick up the new look without a routing change. `lib/projects.ts` is unchanged, so pictures, skills, repository links, and Open targets stay.

**Alternatives considered**: A font package or an animation library. Rejected. The refresh is a presentation pass.

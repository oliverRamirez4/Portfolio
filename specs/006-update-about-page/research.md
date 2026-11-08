# Research: Update About Page

## Decision: Put the field in the root layout, in CSS

**Rationale**: Home, Resume, and Projects must show the same pattern. The root layout already wraps those three pages and does not wrap a rewritten `/apps/<slug>` response. One fixed layer painted from `app/globals.css` cannot drift apart per page, and it disappears as soon as the response is no longer this app.

**Alternatives considered**: A field component copied onto each page. Rejected because the three copies can diverge. A client canvas. Rejected because the spec needs no drawing loop and the pages should stay server-rendered. An animation package. Rejected because CSS already covers one transform and one settle.

## Decision: Draw the field with solid Stone and Ink only

**Rationale**: Success criterion SC-004 allows four colors. A translucent Ink or Stone mark blended with Paper is a fifth color. The pattern is a repeating 32px grid of 1px Stone lines, plus a 1px Ink dot on a 96px spacing. Both colors are the constitution's hex values. Stone on Paper is quiet. The Ink dots are sparse so the margin does not turn into a texture that competes with the paragraph.

**Alternatives considered**: An SVG illustration or a photograph. Rejected by the ban on decorative illustration, photography, and outdoor imagery. Alpha on the marks. Rejected because the blend is not Paper, Ink, or Stone. Current anywhere in the field. Rejected because Current is links, the current nav item, and focus.

## Decision: Drift a clipped layer with a transform

**Rationale**: The layer is `position: fixed` and `inset: 0`, with `overflow: hidden` and `pointer-events: none`, behind the column. An inner tile larger than the viewport repeats the pattern and translates by one 32px cell over 24 seconds, linear, forever. The visitor can see the margin move. The outer box does not grow the page, so a narrow screen does not scroll sideways. `body` already sets `overflow-x: clip`.

**Alternatives considered**: Animating `background-position` on `body`. Rejected because the column's Paper fill has to sit above the field, and a body background cannot sit behind a sibling mask as cleanly. A faster loop or a bounce. Rejected because the spec asks for a slow drift, not a pulse.

## Decision: Paper covers the reading surfaces, not the margins

**Rationale**: The spec says the field frames the column and does not run through the letters or the resume. `main` is already the 40rem column. Giving `main` an opaque Paper background masks the field inside that column, including the nav and the footer. Project cards already use Paper. The resume iframe leaves the column and widens to 56rem, so that iframe gets its own Paper background. The transparent band around the iframe still shows the field. The field is not a card around the about text.

**Alternatives considered**: Paper only behind the paragraph. Rejected because the nav, cards, and resume would sit on the moving marks. Painting Paper across the whole viewport. Rejected because the field would disappear.

## Decision: Settle the greeting with one CSS animation

**Rationale**: The Home heading animates from 16px below and fully transparent to its resting place and full Ink, once, over about 400ms, then stays. It does not loop. The distance is a type step already in use, not a new scale. The heading remains in the document at rest for assistive tech. The animation is decorative and is removed under reduced motion.

**Alternatives considered**: A client effect tied to scroll or hover. Rejected because the spec is one settle on load. Looping the name. Rejected by FR-005. Moving any other element. Rejected by FR-011.

## Decision: Honor `prefers-reduced-motion: reduce`

**Rationale**: Under that preference the field layer does not translate, and the heading has no animation and is fully visible immediately. The Stone grid and Ink dots stay, so the pattern is still there. No other motion is introduced, so nothing else has to be disabled.

**Alternatives considered**: Removing the field entirely when motion is reduced. Rejected because the spec says the field is still visible. A settings control on the page. Rejected because the operating system preference is the visitor's choice, and the constitution does not add a second look.

## Decision: Keep the about strings in `lib/profile.ts`

**Rationale**: The page already renders `profile.about`. Adding `profile.greeting` with the exact heading `"Hi! I'm Oliver Ramirez"` puts both required strings in one record. The paragraph replaces the college-and-internship text in `about`. The browser title and the nav label stay as they are.

**Alternatives considered**: Hard-coding the strings only in `app/page.tsx`. Rejected because the profile module is already the source for the introduction a later check can read.

## Decision: Leave the 30rem measure in place

**Rationale**: The visual-style plan set the about paragraph to `max-width: 30rem` so a line of Geist Sans at 16px lands between 60 and 70 characters. The new paragraph is longer, not wider. The same measure still satisfies SC-003. The heading may use the full column and wrap on a narrow screen.

**Alternatives considered**: Letting the paragraph run to 40rem. Rejected because that column measures well past 70 characters.

## Decision: Do not edit rewrites, cards, or the resume file

**Rationale**: Next.js rewrites for `/apps/<slug>` return the other app's response, so this layout's field is absent there without a special case. Card titles, summaries, skills, pictures, links, Open actions, and order stay in `lib/projects.ts`. The PDF bytes stay in `public/`. Redirects for `/experience` and `/blog` already land on Resume and Home, which will show the field.

**Alternatives considered**: A conditional in the layout that checks the path and hides the field. Rejected because a mounted path never renders this layout.

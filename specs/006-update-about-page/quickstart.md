# Quickstart: Update About Page

Proves the new introduction, the greeting, and the shared field. It does not change a mounted project.

## Prerequisites

- Node and the repo dependencies installed.
- `public/oliver-ramirez-resume.pdf` present if you want to see the resume surface. The field check does not require it.
- A browser that can emulate `prefers-reduced-motion`.

## Run

```bash
npm run dev
npm test
```

Open `http://localhost:3000`. Repeat the layout checks at a desktop width (wider than 56rem) and a phone width (narrower than 40rem). For the dark-appearance check, set the operating system to dark and reload. For reduced motion, emulate `prefers-reduced-motion: reduce` and reload.

## Checks

1. **Home copy.** The heading is `Hi! I'm Oliver Ramirez`. The paragraph matches FR-001 in [spec.md](./spec.md) character for character. The old college, internship, and Budapest paragraph is gone. `My Portfolio` is gone.
2. **Type.** The heading is Geist Sans 25px, weight 500, Ink `#1C2422`. The paragraph is Geist Sans 16px. A line of the paragraph is 60–70 characters. A Stone `#D5D1C8` hairline sits under the heading.
3. **Greeting motion.** With motion allowed, the heading settles once and then stays. Reload and confirm it does not loop. With reduced motion, it is still on first paint.
4. **Field.** The margins of Home, Resume, and Projects show the same Stone lines and Ink dots on Paper. With motion allowed, the pattern drifts. With reduced motion, it is visible and still. The paragraph, nav, a project card, and the resume surface stay uninterrupted Paper.
5. **Colors.** The only colors on those three pages are Paper `#F3F1EC`, Ink `#1C2422`, Stone `#D5D1C8`, and Current `#3E6B66`. Current is only links, the current nav item, and focus. The heading and the field do not use it.
6. **Dark appearance.** Reload Home. The page is still Paper and Ink. The field does not gain a fifth color.
7. **Narrow Home.** The heading wraps inside the column. The page does not scroll sideways.
8. **Rest of the hub.** Resume and Projects still open in one action. Their headings stay `Resume` and `Projects`. The PDF and the project cards keep their current content, order, and actions. The nav stays Home, Resume, Projects.
9. **No scene.** None of the three pages has a hero, a pictorial illustration, an atmosphere photograph, or an outdoor icon.
10. **Mounted app.** Open a live `/apps/<slug>` path. The response is the other app. It does not show this field or this greeting. `npm test` still passes the rewrite tests.
11. **Old addresses.** `/experience` lands on Resume. `/blog` lands on Home. Both show the field.

Details: [contracts/about-and-field.md](./contracts/about-and-field.md) and [data-model.md](./data-model.md).

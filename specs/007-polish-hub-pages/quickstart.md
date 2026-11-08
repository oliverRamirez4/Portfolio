# Quickstart: Polish Hub Pages

Proves the centered introduction, the resume sitting inside the column, the completed technology lines, and the removed Home links.

## Prerequisites

- Node and the repo dependencies installed.
- `public/oliver-ramirez-resume.pdf` present for the resume-frame check. Rename it aside if you want to see the missing-file sentence.
- A browser.

## Run

```bash
npm run dev
npm test
```

Open `http://localhost:3000`. Repeat the layout checks at a desktop width (wider than 40rem) and a phone width (narrower than 40rem).

## Checks

1. **Home alignment.** The greeting and the paragraph are centered in the column. A line of the paragraph is 60–70 characters. The nav labels Home, Resume, and Projects stay on the left edge. Nothing under the paragraph links to Resume or Projects.
2. **Greeting.** The heading is still `Hi! I'm Oliver Ramirez`, Ink, with the Stone hairline under those words. With motion allowed it settles once. With reduced motion it is still on first paint. The words match [spec.md](./spec.md) FR-001.
3. **Top navigation.** From Home, Resume in the nav opens `/resume` and Projects in the nav opens `/projects`, each in one action. Those labels are unchanged on the other two pages.
4. **Resume frame.** On a wide screen the grid is visible on both sides of the document and does not cross it. The document does not meet the viewport edge. The heading and "Open the PDF" stay left-aligned. The file is the same PDF. On a phone the page does not scroll sideways.
5. **Resume missing.** With the PDF moved aside, Resume shows "The resume is not available yet." and no empty document. Put the file back when finished.
6. **Technologies.** The six cards match the lists in [data-model.md](./data-model.md). Python looks the same on the labs and the river permit card. Postgres looks the same on the vote card and Shelter Connect. SQL and Java Swing are names without an empty box. Titles, summaries, pictures, repository links, Open, and order are unchanged.
7. **Color.** Marks and skill names are Ink `#1C2422` on Paper. They are not links and do not use Current `#3E6B66`. No outdoor icon appears.
8. **Tests.** `npm test` passes, including the skill arrays for Conversational AI Chat Interface and Osu Rhythm Game Clone.
9. **Mounted app.** Open a live `/apps/<slug>` path. The response is the other app. It does not show this introduction, this resume frame, or these marks.

Details: [contracts/hub-pages.md](./contracts/hub-pages.md) and [data-model.md](./data-model.md).

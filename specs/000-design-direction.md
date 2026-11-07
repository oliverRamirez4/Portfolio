# Design notes

This file is not a Spec Kit artifact. Spec Kit reads [`.specify/memory/constitution.md`](../.specify/memory/constitution.md) and the feature spec. Visual style is not decided here.

## Purpose

This site is Oliver's hub. It routes to projects he builds and is a place to show that work as a high-quality engineer. The work it points at stays focused on Python, Postgres, Unix, TypeScript, and React.

It is not written as a pitch to a hiring manager.

## What is already decided

Each project is an informational card. Opening it is a choice. A mounted app leaves the portfolio chrome and is served at `/apps/<slug>`. Until that other repo is built for the prefix, the card links out to the live site and GitHub.

## What Spec Kit does not decide

Font, color, column width, and whether the MUI cards stay. `/speckit-clarify` is written to skip trivial stylistic preferences. Those choices are yours. Once you make one, it goes in the constitution if it should last for every feature, or in the feature spec if it is only about this feature.

Page structure has not been changed.

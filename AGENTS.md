# Agent rules for Shuffle Timeline

This repository preserves and publishes Shuffle Timeline material.

## Non-negotiable rules

- Do not copy JUN data registries or national datasets into this repository.
- Do keep STL-native JSON/content files when they represent Shuffle Timeline extraction work.
- Treat `assets/source/shuffle-timeline-8k.jpg` as the current canonical visual source.
- The first text block in the artwork is editorial/community-facing context, not a timeline event.
- Every timeline item should have a hyperlink when possible. If no external source is known yet, link it to the original artwork and mark the item for review.
- Preserve project credit: Shuffle Timeline was started by Gaara and LuVa; the website was developed by Mreaggle from their work.
- Keep the public route as `/STL/`, even if the repository name is `shuffle-timeline`.

## Validation

Run:

```bash
npm run test
```

The build must emit `dist/STL/`.

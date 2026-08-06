# Contributing to Shuffle Timeline

Contributions should improve the historical extraction without weakening the evidence trail.

## Good contributions

- Correct a transcription error visible in the original artwork.
- Add a stable public source for a timeline claim.
- Mark an uncertain item more precisely.
- Add missing visual elements from the source image.
- Improve accessibility, performance or documentation.

## Evidence standard

Each historical claim should answer:

1. What happened?
2. When did it happen?
3. Where did it happen?
4. Who is connected?
5. What public source supports it?

Use public URLs, archived pages, video pages, documented releases, interviews or recognizable official pages. Private chats and private group screenshots should not be committed.

## Confidence labels

- `clear`: readable directly from the artwork or strongly supported by public sources.
- `supported`: readable with minor normalization or supported by a source link.
- `uncertain`: visible but not fully legible; needs community review.
- `needs review`: present in the artwork but not ready to present as confirmed text.

## Local check

```bash
npm run test
```

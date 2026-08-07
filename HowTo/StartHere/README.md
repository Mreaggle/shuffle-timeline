# Start Here

1. Open the original artwork in `assets/source/shuffle-timeline-8k.jpg`.
2. Find the timeline chapter and dated record you want to improve.
3. Check whether the current extraction exists in `src/content/shuffle-timeline.json`.
4. Add or correct the item in `src/content/timeline.js`.
5. Add at least one directly related entry to the record's `sources` array.
6. Keep `needsReview: true` when the original artwork is the only evidence.
7. Run `npm run test`.

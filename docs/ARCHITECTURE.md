# Repository architecture

Shuffle Timeline mirrors JUN's public archive organization while staying specific to Shuffling and the STL artwork.

```text
.
|-- ShuffleTimeline/        Human-facing global timeline workspace
|-- ShuffleArchive/         Media, forums, competitions, voices and knowledge areas
|-- STLToolkit/             STL-specific tooling and future indexes
|-- CommunityMapping/       Community and country relationships
|-- ShuffleFrameworks/      Editorial and evidence standards
|-- DigitalShufflePlatform/ Platform concepts and trend notes
|-- HowTo/                  Contributor tutorials
|-- assets/                 Logo and original artwork
|-- src/content/            STL-native JSON/content source
|-- src/styles/             Public UI
|-- src/scripts/            Browser interactions
|-- scripts/                Build and validation
`-- docs/                   Method, publication and status notes
```

The site builds to `dist/STL/`.

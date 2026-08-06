# Shuffle Timeline

Static public archive for the Shuffle Timeline project.

The repository should be named `shuffle-timeline`. The public page is designed for GitHub Pages under:

<https://jumpstyle.com.br/STL/>

This repository follows the public-facing structure used for JUN, but it intentionally does not copy JUN's data registries or historical datasets. STL has its own JSON content file derived from the Shuffle Timeline artwork. The Shuffle Timeline is handled as an investigative extraction from the original 8K artwork: visible elements are separated into editorial notes, timeline events, uncertain readings and source-image references.

`STL` is the public route slug only: `jumpstyle.com.br/STL/`.

## Project credits

Shuffle Timeline was initiated by the shufflers Gaara and LuVa, with public reference to [@shuffletimeline](https://instagram.com/shuffletimeline). This website was developed by Mreaggle from the work started by Gaara and LuVa.

## Repository map

| Area | Purpose | Status |
| --- | --- | --- |
| [Global Timeline](ShuffleTimeline/Global/global-timeline.md) | Human-facing canonical workspace for the global STL extraction | Active extraction |
| [Shuffle Archive](ShuffleArchive/) | Media, forums, competitions, voices, art and knowledge areas | Scaffolded |
| [STL Toolkit](STLToolkit/) | Build tooling and future structured indexes | Active |
| [Community Mapping](CommunityMapping/) | Community anchors and scene relationships | Scaffolded |
| [Shuffle Frameworks](ShuffleFrameworks/) | Editorial and evidence standards | Active |
| [Digital Shuffle Platform](DigitalShufflePlatform/) | Public platform concepts and trend notes | Scaffolded |
| [HowTo](HowTo/) | Contributor tutorials | Scaffolded |
| [Research Status](docs/RESEARCH_STATUS.md) | Completed work, gaps and next extraction passes | Maintained |
| [Contribution Guide](CONTRIBUTING.md) | How to submit evidence without weakening the archive | Maintained |

```text
.
|-- assets/              Logo and original source artwork
|-- CommunityMapping/    Community and country relationships
|-- DigitalShufflePlatform/ Platform concepts and trend notes
|-- docs/                Architecture, method, status and publication notes
|-- HowTo/               Contributor tutorials
|-- scripts/             Static build and validation scripts
|-- ShuffleArchive/      Media, forum, competition, voice and knowledge areas
|-- ShuffleFrameworks/   Editorial and evidence standards
|-- ShuffleTimeline/     Human-facing global timeline workspace
|-- src/content/         Curated investigative content and STL JSON
|-- src/scripts/         Browser interactions
|-- src/styles/          Public UI
|-- STLToolkit/          STL-specific tooling and indexes
|-- AGENTS.md            Operating rules for AI and automation agents
|-- CONTRIBUTING.md      Human contribution workflow
|-- Volunteers.md        Project credits and contributors
`-- .github/workflows/  GitHub Pages deployment
```

## Local validation

```bash
npm run test
```

The build emits `dist/STL/` so the page can be mounted at `/STL/`.

<p align="center">
  <img src="assets/shuffle_logo.png" width="240" alt="Shuffle Timeline logo">
</p>

<h1 align="center">Shuffle Timeline</h1>

<p align="center"><strong>An investigative public archive for Shuffling history.</strong></p>

<p align="center">
  <a href="https://jumpstyle.com.br/STL/"><img alt="Official STL page" src="https://img.shields.io/badge/official_page-jumpstyle.com.br%2FSTL-C9FF00?labelColor=050505"></a>
  <a href="ShuffleTimeline/Global/global-timeline.md"><img alt="Global timeline" src="https://img.shields.io/badge/global_timeline-14_blocks-FF1CE6?labelColor=050505"></a>
  <a href="src/content/shuffle-timeline.json"><img alt="STL JSON" src="https://img.shields.io/badge/STL_JSON-native_content-C9FF00?labelColor=050505"></a>
  <a href="assets/source/shuffle-timeline-8k.jpg"><img alt="Source artwork" src="https://img.shields.io/badge/source_artwork-8K_reference-FF1CE6?labelColor=050505"></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/github/license/Mreaggle/shuffle-timeline?color=ffffff&labelColor=050505"></a>
  <a href="https://github.com/Mreaggle/shuffle-timeline/commits/main"><img alt="Last commit" src="https://img.shields.io/github/last-commit/Mreaggle/shuffle-timeline?color=C9FF00&labelColor=050505"></a>
  <a href="CONTRIBUTING.md"><img alt="Contributions welcome" src="https://img.shields.io/badge/contributions-welcome-FF1CE6?labelColor=050505"></a>
</p>

Shuffle Timeline is a community-facing archive extracted from the original Shuffle Timeline artwork. Its purpose is to preserve the history of Shuffling, keep uncertain readings visible, connect claims to public evidence and make the work readable for shufflers, researchers and software agents.

`shuffle-timeline` is the repository name. `STL` is only the public route slug: <https://jumpstyle.com.br/STL/>.

> **Research maturity notice:** this repository is in active extraction. Every timeline item is hyperlinked when possible, but dense micro-text inside screenshots, flyers and small embedded images still needs community review. The original artwork remains the current visual source of truth.

## Credits

Shuffle Timeline was initiated by the shufflers Gaara and LuVa, with public reference to [@shuffletimeline](https://instagram.com/shuffletimeline).

This website was developed by Mreaggle from the work started by Gaara and LuVa.

## Start here

| Area | Purpose | Status |
| --- | --- | --- |
| [Global Timeline](ShuffleTimeline/Global/global-timeline.md) | Human-facing canonical workspace for the global STL extraction | Active extraction |
| [STL JSON](src/content/shuffle-timeline.json) | STL-native structured content exported from the curated source module | Active |
| [Original Artwork](assets/source/shuffle-timeline-8k.jpg) | Canonical visual reference used for extraction | Source reference |
| [Shuffle Archive](ShuffleArchive/) | Media, forums, competitions, voices, art and knowledge areas | Scaffolded |
| [STL Toolkit](STLToolkit/) | Build tooling and future structured indexes | Active |
| [Community Mapping](CommunityMapping/) | Community anchors and scene relationships | Scaffolded |
| [Shuffle Frameworks](ShuffleFrameworks/) | Editorial and evidence standards | Active |
| [Digital Shuffle Platform](DigitalShufflePlatform/) | Public platform concepts and trend notes | Scaffolded |
| [Research Status](docs/RESEARCH_STATUS.md) | Completed work, gaps and next extraction passes | Maintained |
| [Contribution Guide](CONTRIBUTING.md) | How to submit evidence without weakening the archive | Maintained |

## Repository map

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
|-- src/content/            STL-native content module and JSON export
|-- src/styles/             Public UI
|-- src/scripts/            Browser interactions
|-- scripts/                Static build and validation
|-- docs/                   Architecture, method, status and publication notes
|-- AGENTS.md               Operating rules for AI and automation agents
`-- CONTRIBUTING.md         Human contribution workflow
```

See [Repository Architecture](docs/ARCHITECTURE.md) for ownership boundaries and the evidence lifecycle.

## Research standard

Every promoted historical item should answer five questions:

1. **What happened?** Use a neutral, specific description.
2. **When?** Prefer a date visible in the artwork or in a public source.
3. **Where?** Record country, city, scene or platform when known.
4. **Who is connected?** Preserve names and aliases carefully.
5. **What proves it?** Link a stable public source, an archived page or the original artwork when no external source is confirmed yet.

Confidence labels are `clear`, `supported`, `uncertain` and `needs review`. The full rules are in the [Editorial Policy](docs/EDITORIAL_POLICY.md) and [Investigative Method](docs/INVESTIGATIVE_METHOD.md).

## Public projects

- Official STL page: https://jumpstyle.com.br/STL/
- Repository: https://github.com/Mreaggle/shuffle-timeline
- Instagram: https://instagram.com/shuffletimeline
- Global timeline workspace: [ShuffleTimeline/Global/global-timeline.md](ShuffleTimeline/Global/global-timeline.md)
- Original artwork: [assets/source/shuffle-timeline-8k.jpg](assets/source/shuffle-timeline-8k.jpg)
- Contributors: [Volunteers.md](Volunteers.md)
- Agent-readable index: [llms.txt](llms.txt)

## Validation

```bash
npm run test
```

The build exports STL JSON, generates the public site and validates required credits, assets, Google tag and hyperlinks. The generated site is emitted to `dist/STL/` so it can be mounted at `/STL/` by the `jumpstyle.com.br` host.

## License

See [LICENSE](LICENSE). Linked media, embedded screenshots and the original Shuffle Timeline artwork remain owned by their respective creators unless explicitly licensed otherwise.

# Shuffle Timeline

Static public archive for the Shuffle Timeline project.

The public page is designed for GitHub Pages under:

<https://jumpstyle.com.br/STL/>

This repository follows the public-facing structure used for JUN, but it intentionally does not include JUN's data registry layer. The Shuffle Timeline is handled as an investigative extraction from the original 8K artwork: visible elements are separated into editorial notes, timeline events, uncertain readings and source-image references.

## Project credits

Shuffle Timeline was initiated by the shufflers Gaara and LuVa, with public reference to [@shuffletimeline](https://instagram.com/shuffletimeline).

## Repository map

```text
.
|-- assets/              Logo and original source artwork
|-- docs/                Method, extraction notes and publication notes
|-- scripts/             Static build and validation scripts
|-- src/content/         Curated investigative content, not a data layer
|-- src/scripts/         Browser interactions
|-- src/styles/          Public UI
`-- .github/workflows/  GitHub Pages deployment
```

## Local validation

```bash
npm run test
```

The build emits `dist/STL/` so the page can be mounted at `/STL/`.

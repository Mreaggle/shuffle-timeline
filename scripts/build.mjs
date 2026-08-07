import fs from "node:fs";
import path from "node:path";
import { countries, editorialNote, eras, site, timeline, translationLanguages } from "../src/content/timeline.js";

const root = process.cwd();
const dist = path.join(root, "dist");
const out = path.join(dist, "STL");
const recordCount = timeline.reduce((total, event) => total + event.points.length, 0);

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

copy("assets/shuffle_logo.png", "assets/shuffle_logo.png");
copy("assets/source/shuffle-timeline-8k.jpg", "assets/source/shuffle-timeline-8k.jpg");
copy("assets/fonts/PixelOperator.woff", "assets/fonts/PixelOperator.woff");
copy("assets/fonts/PixelOperator-Bold.woff", "assets/fonts/PixelOperator-Bold.woff");
copy("src/styles/site.css", "assets/site.css");
copy("src/scripts/main.js", "assets/main.js");

write("index.html", renderPage());
write("llms.txt", renderLlms());
write("timeline.md", renderMarkdown());
fs.writeFileSync(path.join(dist, ".nojekyll"), "\n");

function copy(from, to) {
  const target = path.join(out, to);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(root, from), target);
}

function write(file, text) {
  const target = path.join(out, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, text);
}

function sitePath(value = "") {
  return value.replace(/^\/+/, "");
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Shuffle Timeline",
    url: site.url,
    about: "Investigative public archive of Shuffle history extracted from the Shuffle Timeline artwork.",
    creator: [
      { "@type": "Person", name: "Gaara" },
      { "@type": "Person", name: "LuVa" }
    ],
    sameAs: [site.instagram]
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Shuffle Timeline | STL</title>
  <meta name="description" content="Investigative Shuffle Timeline archive based on the original 8K artwork, with linked evidence and explicit confidence labels.">
  <link rel="canonical" href="${site.url}">
  <meta name="theme-color" content="${site.colors.lime}">
  <link rel="icon" href="${sitePath("assets/shuffle_logo.png")}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Handjet:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${sitePath("assets/site.css")}">
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-930BMPYP28"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-930BMPYP28');
  </script>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
  <a class="skip-link" href="#timeline">Skip to timeline</a>
  <div class="signal-bar" aria-hidden="true"><div><span>Shuffle Timeline</span><span>@shuffletimeline</span><span>Gaara + LuVa</span><span>Keep shuffling</span><span>Keep learning</span></div></div>
  <header class="site-header">
    <a class="brand" href="./" aria-label="Shuffle Timeline home">
      <img src="${sitePath(site.logo)}" alt="" width="72" height="72">
      <span><strong>Shuffle Timeline</strong><small>STL archive</small></span>
    </a>
    <button class="menu-button" type="button" data-menu-button aria-controls="site-nav" aria-expanded="false"><span></span><span class="sr-only">Menu</span></button>
    <nav id="site-nav" class="site-nav" data-site-nav aria-label="Sections">
      ${renderTranslation()}
      <a href="#method">Method</a>
      <a href="#timeline">Timeline</a>
      <a href="#source-artwork">Source artwork</a>
      <a href="${site.instagram}" target="_blank" rel="noopener noreferrer">@shuffletimeline</a>
      <a href="${site.repository}" target="_blank" rel="noopener noreferrer">GitHub</a>
    </nav>
  </header>
  <main>
    ${renderHero()}
    ${renderMethod()}
    ${renderTimeline()}
    ${renderArtwork()}
  </main>
  <footer class="site-footer">
    <p>Shuffle Timeline was initiated by Gaara and LuVa. Public project reference: <a href="${site.instagram}" target="_blank" rel="noopener noreferrer">@shuffletimeline</a>.</p>
    <p><a href="${sitePath("timeline.md")}">Raw Markdown</a> · <a href="${sitePath("llms.txt")}">llms.txt</a> · <a href="${site.repository}" target="_blank" rel="noopener noreferrer">Repository</a></p>
  </footer>
  <script src="${sitePath("assets/main.js")}" type="module"></script>
</body>
</html>`;
}

function renderTranslation() {
  const options = translationLanguages
    .map((language) => `<option value="${esc(language.code)}">${esc(language.name)}</option>`)
    .join("");
  return `<div class="translate" data-translate>
    <button type="button" class="translate-button" aria-expanded="false" aria-controls="translate-panel" data-translate-toggle><span aria-hidden="true">A/文</span>Translate</button>
    <div id="translate-panel" class="translate-panel" data-translate-panel hidden>
      <label for="translate-language">Automatic translation</label>
      <select id="translate-language" data-translate-language><option value="">Select a language</option>${options}</select>
      <p>Opens this page through Google Translate.</p>
    </div>
  </div>`;
}

function renderHero() {
  return `<section class="hero">
  <div class="hero-copy">
    <p class="kicker">Updated from source artwork: ${esc(editorialNote.updated)}</p>
    <h1><span>Shuffle</span> Timeline</h1>
    <p class="lead">A public investigative archive for Shuffling history, extracted from the original timeline image and reviewed with explicit confidence labels.</p>
    <div class="hero-actions"><a class="button" href="#timeline">Enter timeline</a><a class="button ghost" href="#source-artwork">Open original artwork</a></div>
  </div>
  <div class="hero-logo">
    <img src="${sitePath(site.logo)}" alt="Shuffle Timeline logo" width="1024" height="1024">
  </div>
</section>`;
}

function renderMethod() {
  return `<section id="method" class="section">
  <div class="section-head">
    <p class="section-code">00 // PROJECT NOTE</p>
    <h2>${esc(editorialNote.title)}</h2>
    <p>The first text block addresses readers and explains the purpose of the work. It is shown here as editorial context, not as a historical community event.</p>
  </div>
  <article class="note-card">
    ${editorialNote.body.map((line) => `<p>${esc(line)}</p>`).join("")}
    <p class="credit">${esc(editorialNote.credit)} · <a href="${site.instagram}" target="_blank" rel="noopener noreferrer">@shuffletimeline</a></p>
  </article>
  <article class="considerations">
    <h3>Considerations</h3>
    <ul>
      <li>The first artwork text block is editorial context directed to the community, not a historical event inside the community timeline.</li>
      <li>This site was developed by Mreaggle from the work started by Gaara and LuVa.</li>
      <li>STL keeps its own JSON content file; it does not copy JUN's data registries or historical datasets.</li>
    </ul>
  </article>
  <div class="method-grid">
    ${["Source first", "Hyperlinked when possible", "Confidence visible", "No JUN data copy"].map((title, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${methodCopy(title)}</p></article>`).join("")}
  </div>
</section>`;
}

function methodCopy(title) {
  return {
    "Source first": "The original 8K artwork remains available as the visual reference for every extracted item.",
    "Hyperlinked when possible": "Every dated record carries its own related source; records without external confirmation link to the artwork and remain marked for review.",
    "Confidence visible": "Clear, supported and uncertain readings are separated instead of flattening everything into fact.",
    "No JUN data copy": "The page uses STL's own JSON/content extraction and static generation, without copying JUN's registries or datasets."
  }[title];
}

function renderTimeline() {
  return `<section id="timeline" class="section timeline-section">
  <div class="section-head">
    <p class="section-code">01 // TIMELINE</p>
    <h2>From underground rave culture to global social video</h2>
    <p>Filter by era or search for names, countries, platforms and scene terms.</p>
  </div>
  <div class="tools">
    <div class="era-filter" role="group" aria-label="Filter by era">
      <button type="button" data-era="all" aria-pressed="true">All eras</button>
      ${eras.map((era) => `<button type="button" data-era="${era.id}" aria-pressed="false">${esc(era.label)} <small>${esc(era.years)}</small></button>`).join("")}
    </div>
    <label class="search"><span>Search timeline</span><input type="search" data-search placeholder="Melbourne, K-Pop, TikTok, phat pants..."></label>
    <p data-count>${recordCount} dated records in ${timeline.length} chapters</p>
  </div>
  <div class="timeline">
    ${timeline.map(renderEvent).join("")}
  </div>
  <p class="empty" data-empty hidden>No timeline chapters match this filter.</p>
</section>`;
}

function renderEvent(event, index) {
  const era = eras.find((item) => item.id === event.era);
  return `<article class="event-card" data-event data-era="${event.era}" data-record-count="${event.points.length}">
    <div class="event-index">${String(index + 1).padStart(2, "0")}</div>
    <div class="event-body">
      <p class="event-meta"><span>${esc(event.years)}</span><span>${esc(era?.label || event.era)}</span><span>${esc(event.confidence)}</span></p>
      ${renderCountryFlags(event.countries)}
      <h3>${esc(event.title)}</h3>
      <ol class="event-records">${event.points.map(renderRecord).join("")}</ol>
      <details>
        <summary>Visual elements extracted</summary>
        ${event.elements.map((item) => `<p>${esc(item)} <a href="#source-artwork">source artwork</a></p>`).join("")}
      </details>
    </div>
  </article>`;
}

function renderRecord(item) {
  const review = item.needsReview
    ? '<span class="review-status">needs review</span>'
    : '<span class="source-status">externally sourced</span>';
  return `<li class="timeline-record" data-record>
    <time>${esc(item.date)}</time>
    <div class="record-copy">
      <p>${esc(item.text)}</p>
      <div class="record-sources">${item.sources.map((source) => `<a class="source-chip" href="${source.url}"${externalAttrs(source.url)}>${esc(source.label)}</a>`).join("")}${review}</div>
      ${item.note ? `<p class="record-note">${esc(item.note)}</p>` : ""}
    </div>
  </li>`;
}

function renderCountryFlags(codes = []) {
  if (!codes.length) return "";
  return `<div class="country-flags" aria-label="Countries referenced">${codes.map((code) => `<span title="${esc(countries[code] || code)}">${flagEmoji(code)} <small>${esc(code)}</small></span>`).join("")}</div>`;
}

function flagEmoji(code) {
  if (!/^[A-Z]{2}$/.test(code)) return "";
  return [...code].map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0))).join("");
}

function externalAttrs(url) {
  return url.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "";
}

function renderArtwork() {
  return `<section id="source-artwork" class="section artwork-section">
  <div class="section-head">
    <p class="section-code">02 // SOURCE</p>
    <h2>Original Shuffle Timeline artwork</h2>
    <p>This image is the canonical visual reference for the current extraction pass.</p>
  </div>
  <a class="artwork-link" href="${sitePath(site.sourceImage)}" target="_blank" rel="noopener noreferrer">
    <img src="${sitePath(site.sourceImage)}" alt="Original Shuffle Timeline artwork containing the full visual timeline from 1985 to 2024" width="14876" height="2200">
  </a>
</section>`;
}

function renderLlms() {
  return `# Shuffle Timeline

Official page: ${site.url}
Instagram: ${site.instagram}
Repository: ${site.repository}

This is a static investigative extraction of the Shuffle Timeline artwork. The first editorial block is not treated as a historical timeline event.

Timeline chapters: ${timeline.length}
Dated records: ${recordCount}
Eras: ${eras.map((era) => `${era.label} (${era.years})`).join("; ")}
`;
}

function renderMarkdown() {
  return `# Shuffle Timeline

Source artwork: ${site.url}assets/source/shuffle-timeline-8k.jpg
Instagram: ${site.instagram}
Credits: ${editorialNote.credit}

${timeline.map((event) => `## ${event.years} — ${event.title}

Era: ${eras.find((era) => era.id === event.era)?.label}
Confidence: ${event.confidence}

${event.points.map((item) => `- **${item.date}** — ${item.text} ${item.sources.map((source) => `[${source.label}](${markdownUrl(source.url)})`).join(" ")}${item.needsReview ? " *(needs review)*" : ""}${item.note ? `\n  - Note: ${item.note}` : ""}`).join("\n")}
`).join("\n")}`;
}

function markdownUrl(url) {
  if (url === "#source-artwork") return `${site.url}assets/source/shuffle-timeline-8k.jpg`;
  return url;
}

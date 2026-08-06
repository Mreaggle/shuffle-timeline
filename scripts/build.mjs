import fs from "node:fs";
import path from "node:path";
import { editorialNote, eras, site, sourceLinks, timeline } from "../src/content/timeline.js";

const root = process.cwd();
const dist = path.join(root, "dist");
const out = path.join(dist, "STL");

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

copy("assets/shuffle_logo.png", "assets/shuffle_logo.png");
copy("assets/source/shuffle-timeline-8k.jpg", "assets/source/shuffle-timeline-8k.jpg");
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
  <div class="signal-bar" aria-hidden="true"><div><span>Shuffle Timeline</span><span>@shuffletimeline</span><span>Gaara + LuVa</span><span>#C9FF00</span><span>#FF1CE6</span></div></div>
  <header class="site-header">
    <a class="brand" href="./" aria-label="Shuffle Timeline home">
      <img src="${sitePath(site.logo)}" alt="" width="72" height="72">
      <span><strong>Shuffle Timeline</strong><small>STL archive</small></span>
    </a>
    <button class="menu-button" type="button" data-menu-button aria-controls="site-nav" aria-expanded="false"><span></span><span class="sr-only">Menu</span></button>
    <nav id="site-nav" class="site-nav" data-site-nav aria-label="Sections">
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
    <p><strong>Palette</strong> Lime ${site.colors.lime} · Neon magenta ${site.colors.magenta}</p>
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
    "Hyperlinked when possible": "Each timeline block includes source links; if external confirmation is still missing, it links back to the source artwork.",
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
    <p data-count>${timeline.length} timeline blocks on view</p>
  </div>
  <div class="timeline">
    ${timeline.map(renderEvent).join("")}
  </div>
  <p class="empty" data-empty hidden>No timeline blocks match this filter.</p>
</section>`;
}

function renderEvent(event, index) {
  const era = eras.find((item) => item.id === event.era);
  const links = sourceLinks[event.id] || [];
  const fallback = { label: "Original STL artwork", url: "#source-artwork" };
  const allLinks = links.length ? links : [fallback];
  return `<article class="event-card" data-event data-era="${event.era}">
    <div class="event-index">${String(index + 1).padStart(2, "0")}</div>
    <div class="event-body">
      <p class="event-meta"><span>${esc(event.years)}</span><span>${esc(era?.label || event.era)}</span><span>${esc(event.confidence)}</span></p>
      <h3>${esc(event.title)}</h3>
      <ul>${event.points.map((point) => `<li>${linkTerms(esc(point), allLinks)} <a class="source-chip" href="${allLinks[0].url}"${externalAttrs(allLinks[0].url)}>${esc(allLinks[0].label)}</a></li>`).join("")}</ul>
      <details>
        <summary>Visual elements extracted</summary>
        ${event.elements.map((item) => `<p>${esc(item)} <a href="#source-artwork">source artwork</a></p>`).join("")}
      </details>
      <div class="source-list">${allLinks.map((link) => `<a href="${link.url}"${externalAttrs(link.url)}>${esc(link.label)}</a>`).join("")}<a href="#source-artwork">Original image</a></div>
    </div>
  </article>`;
}

function externalAttrs(url) {
  return url.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "";
}

function linkTerms(text, links) {
  let output = text;
  for (const link of links) {
    const label = link.label.split(" background")[0].split(" overview")[0].split(" on IMDb")[0];
    if (!label || label.length < 4) continue;
    const pattern = new RegExp(`\\b(${escapeRegExp(label)})\\b`, "i");
    if (pattern.test(output) && !output.includes(`>${label}<`)) {
      output = output.replace(pattern, `<a href="${link.url}"${externalAttrs(link.url)}>$1</a>`);
    }
  }
  return output;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

Timeline blocks: ${timeline.length}
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

${event.points.map((point) => `- ${point}`).join("\n")}

Links:
${(sourceLinks[event.id] || []).map((link) => `- [${link.label}](${link.url})`).join("\n") || `- [Original STL artwork](${site.url}assets/source/shuffle-timeline-8k.jpg)`}
`).join("\n")}`;
}

import fs from "node:fs";
import { timeline } from "../src/content/timeline.js";

const errors = [];

for (const file of [
  "dist/STL/index.html",
  "dist/STL/assets/site.css",
  "dist/STL/assets/main.js",
  "dist/STL/assets/shuffle_logo.png",
  "dist/STL/assets/source/shuffle-timeline-8k.jpg",
  "dist/STL/timeline.md",
  "dist/STL/llms.txt",
  "src/content/shuffle-timeline.json"
]) {
  if (!fs.existsSync(file)) errors.push(`Missing build artifact: ${file}`);
}

const html = fs.existsSync("dist/STL/index.html") ? fs.readFileSync("dist/STL/index.html", "utf8") : "";
const css = fs.existsSync("dist/STL/assets/site.css") ? fs.readFileSync("dist/STL/assets/site.css", "utf8") : "";
const js = fs.existsSync("dist/STL/assets/main.js") ? fs.readFileSync("dist/STL/assets/main.js", "utf8") : "";

if (!html.includes('href="https://jumpstyle.com.br/STL/"')) errors.push("Canonical /STL/ URL missing.");
if (!html.includes("@shuffletimeline")) errors.push("@shuffletimeline mention missing.");
if (!html.includes("Gaara") || !html.includes("LuVa")) errors.push("Gaara/LuVa credits missing.");
if (!html.includes("developed by Mreaggle")) errors.push("Mreaggle site-development consideration missing.");
if (!css.includes("#C9FF00") || !css.includes("#FF1CE6")) errors.push("Required colors missing from CSS.");
if (!css.includes("[hidden]") || !css.includes("display: none !important")) errors.push("CSS must force hidden elements out of layout for filters/search.");
if (html.includes("Palette") || html.includes("Lime #C9FF00") || html.includes("Neon magenta #FF1CE6")) errors.push("Palette text must not be visible in page HTML.");
if (!html.includes("assets/shuffle_logo.png")) errors.push("Central logo path missing.");
if (!html.includes("assets/fonts/PixelOperator.woff") && !css.includes("PixelOperator.woff")) errors.push("Pixel Operator font missing.");
if (!html.includes("data-translate-toggle") || !html.includes("data-translate-language")) errors.push("Translation controls missing.");
if (!js.includes("translate.google.com/translate") || !js.includes("data-translate-language")) errors.push("Translation behavior missing.");
if (!css.includes(".translate-button") || !css.includes(".translate-panel")) errors.push("Translation CSS missing.");
if (!html.includes("G-930BMPYP28") || !html.includes("googletagmanager.com/gtag/js")) errors.push("Google tag missing.");

const records = timeline.flatMap((event) => event.points.map((record) => ({ event, record })));
for (const event of timeline) {
  const chapterUrls = new Set(event.points.flatMap((record) => record.sources?.map((source) => source.url) || []));
  if (event.points.length > 1 && chapterUrls.size < 2) {
    errors.push(`Timeline chapter reuses one hyperlink for every record: ${event.id}`);
  }
}
for (const { event, record } of records) {
  const reference = `${event.id} / ${record.date || "undated"}`;
  if (!record.date || !record.text) errors.push(`Timeline record is incomplete: ${reference}`);
  if (!Array.isArray(record.sources) || record.sources.length === 0) {
    errors.push(`Timeline record has no hyperlink source: ${reference}`);
    continue;
  }
  for (const source of record.sources) {
    if (!source?.label || !source?.url) errors.push(`Timeline record has an invalid source: ${reference}`);
  }
  const usesArtwork = record.sources.some((source) => source.url === "#source-artwork");
  if (record.needsReview && !usesArtwork) {
    errors.push(`Review record must retain the original artwork: ${reference}`);
  }
  if (!record.needsReview && record.sources.every((source) => source.url === "#source-artwork")) {
    errors.push(`Artwork-only record must be marked for review: ${reference}`);
  }
}

const renderedEvents = (html.match(/data-event/g) || []).length;
if (renderedEvents !== timeline.length) errors.push(`Rendered ${renderedEvents} events, expected ${timeline.length}.`);
const expectedFlagBlocks = timeline.filter((event) => event.countries?.length).length;
const renderedFlagBlocks = (html.match(/class="country-flags"/g) || []).length;
if (renderedFlagBlocks !== expectedFlagBlocks) errors.push(`Rendered ${renderedFlagBlocks} country flag blocks, expected ${expectedFlagBlocks}.`);
const renderedRecords = (html.match(/data-record>/g) || []).length;
if (renderedRecords !== records.length) errors.push(`Rendered ${renderedRecords} records, expected ${records.length}.`);

const json = fs.existsSync("src/content/shuffle-timeline.json")
  ? JSON.parse(fs.readFileSync("src/content/shuffle-timeline.json", "utf8"))
  : null;
if (json && json.timeline?.length !== timeline.length) errors.push("STL JSON timeline count diverges from content module.");
if (json && !json.considerations?.some((item) => item.includes("Mreaggle"))) errors.push("STL JSON missing Mreaggle consideration.");
const jsonRecordCount = json?.timeline?.reduce((sum, event) => sum + event.points.length, 0);
if (json && jsonRecordCount !== records.length) errors.push("STL JSON record count diverges from content module.");

const chips = (html.match(/source-chip/g) || []).length;
const expectedSources = records.reduce((sum, item) => sum + item.record.sources.length, 0);
if (chips !== expectedSources) errors.push(`Rendered ${chips} source chips, expected ${expectedSources}.`);
if (html.includes("Instagram allowed 15-second videos in August 2015")) errors.push("Known Instagram date error was reintroduced.");
if (!html.includes("Meta documents its launch on June 20, 2013")) errors.push("Instagram date correction is missing.");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`STL check passed: ${timeline.length} chapters, ${records.length} dated and linked records.`);

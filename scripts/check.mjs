import fs from "node:fs";
import { sourceLinks, timeline } from "../src/content/timeline.js";

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

if (!html.includes('href="https://jumpstyle.com.br/STL/"')) errors.push("Canonical /STL/ URL missing.");
if (!html.includes("@shuffletimeline")) errors.push("@shuffletimeline mention missing.");
if (!html.includes("Gaara") || !html.includes("LuVa")) errors.push("Gaara/LuVa credits missing.");
if (!html.includes("developed by Mreaggle")) errors.push("Mreaggle site-development consideration missing.");
if (!html.includes("#C9FF00") || !html.includes("#FF1CE6")) errors.push("Required colors missing.");
if (!html.includes("assets/shuffle_logo.png")) errors.push("Central logo path missing.");
if (!html.includes("G-930BMPYP28") || !html.includes("googletagmanager.com/gtag/js")) errors.push("Google tag missing.");

for (const event of timeline) {
  if (!Array.isArray(sourceLinks[event.id]) || sourceLinks[event.id].length === 0) {
    errors.push(`Timeline block has no hyperlink sources: ${event.id}`);
  }
}

const renderedEvents = (html.match(/data-event/g) || []).length;
if (renderedEvents !== timeline.length) errors.push(`Rendered ${renderedEvents} events, expected ${timeline.length}.`);

const json = fs.existsSync("src/content/shuffle-timeline.json")
  ? JSON.parse(fs.readFileSync("src/content/shuffle-timeline.json", "utf8"))
  : null;
if (json && json.timeline?.length !== timeline.length) errors.push("STL JSON timeline count diverges from content module.");
if (json && !json.considerations?.some((item) => item.includes("Mreaggle"))) errors.push("STL JSON missing Mreaggle consideration.");

const chips = (html.match(/source-chip/g) || []).length;
const expectedMinimum = timeline.reduce((sum, event) => sum + event.points.length, 0);
if (chips < expectedMinimum) errors.push(`Rendered ${chips} source chips, expected at least ${expectedMinimum}.`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`STL check passed: ${timeline.length} blocks, ${expectedMinimum} linked timeline items.`);

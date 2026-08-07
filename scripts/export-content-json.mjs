import fs from "node:fs";
import path from "node:path";
import { countries, editorialNote, eras, site, sourceLinks, timeline } from "../src/content/timeline.js";

const target = path.join(process.cwd(), "src/content/shuffle-timeline.json");
const payload = {
  site,
  considerations: [
    "The first text block in the artwork is community-facing editorial context, not a historical community event.",
    "The public site was developed by Mreaggle from the work started by Gaara and LuVa.",
    "The project references @shuffletimeline and credits Gaara (Australia) and LuVa (Brazil).",
    "This JSON is native STL content extracted from the Shuffle Timeline artwork; it does not copy JUN's data registries."
  ],
  editorialNote,
  eras,
  countries,
  timeline,
  sourceLinks
};

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(`${target}.tmp`, `${JSON.stringify(payload, null, 2)}\n`);
fs.renameSync(`${target}.tmp`, target);

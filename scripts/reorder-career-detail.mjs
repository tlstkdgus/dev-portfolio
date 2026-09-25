import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../src/data/career-detail.ts");

const order = [
  "flowpay",
  "ywave",
  "neurosight",
  "tcp",
  "hai",
  "ainterview",
  "rzi",
  "artliving",
  "mealdang",
  "huriup",
  "songeul",
  "connect",
  "dotori",
  "16play",
];

function extractSections(inner) {
  const parts = [];
  let i = 0;
  inner = inner.trim();
  while (i < inner.length) {
    const start = i;
    while (i < inner.length && /\s/.test(inner[i])) i++;
    if (inner.slice(i, i + 2) === "//") {
      while (i < inner.length && inner[i] !== "\n") i++;
      i++;
    }
    while (i < inner.length && /\s/.test(inner[i])) i++;
    if (i >= inner.length) break;
    if (inner[i] !== "{") throw new Error("expected { at " + i);
    let depth = 0;
    for (let j = i; j < inner.length; j++) {
      if (inner[j] === "{") depth++;
      if (inner[j] === "}") {
        depth--;
        if (depth === 0) {
          parts.push(inner.slice(start, j + 1));
          i = j + 1;
          while (i < inner.length && (inner[i] === "," || inner[i] === "\n" || inner[i] === " ")) i++;
          break;
        }
      }
    }
  }
  return parts;
}

const text = fs.readFileSync(filePath, "utf8");
const marker = "export const careerDetailSections: CareerDetailSection[] = [";
const startIdx = text.indexOf(marker);
if (startIdx === -1) throw new Error("marker not found");
const bracketIdx = startIdx + marker.length;
const endIdx = text.lastIndexOf("];");
const inner = text.slice(bracketIdx, endIdx);

const sections = extractSections(inner);
const byId = new Map();
for (const block of sections) {
  const m = block.match(/id:\s*"([^"]+)"/);
  if (!m) throw new Error("no id in block: " + block.slice(0, 80));
  byId.set(m[1], block);
}

for (const id of order) {
  if (!byId.has(id)) throw new Error("missing id: " + id);
}

const newInner =
  "\n" +
  order.map((id) => "  " + byId.get(id).trim().replace(/\n/g, "\n  ")).join(",\n\n") +
  "\n";

const newText = text.slice(0, bracketIdx) + newInner + text.slice(endIdx);
fs.writeFileSync(filePath, newText);
console.log("Reordered", order.length, "sections.");

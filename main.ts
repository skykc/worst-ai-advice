// Worst AI Advice: The 48-Hour Tight Line Open — entry program.
//
// Writes one line of the worst possible advice an AI could give to
// /output/entry.txt, where the house gate and judge read it.
//
// The line: "To fix the slow backup, delete the backup. A server with
// nothing to lose is a server that cannot fail you."
// Confident, tidy AI voice; concrete (the backup); the twist is the
// logic itself — deleting the thing you protect, sold as the fix.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ADVICE =
  "To fix the slow backup, delete the backup. A server with nothing to lose is a server that cannot fail you.";

// The house gate: 1 to 140 characters of UTF-8 text, not only whitespace.
// Fail loudly here instead of shipping an entry the gate would refuse.
if (ADVICE.length < 1 || ADVICE.length > 140) {
  throw new Error(`advice is ${ADVICE.length} chars, gate wants 1-140`);
}
if (ADVICE.trim().length === 0) {
  throw new Error("advice is only whitespace");
}
if (ADVICE.includes("\n")) {
  throw new Error("advice must be a single line");
}

const here = dirname(fileURLToPath(import.meta.url));
// OUT_DIR lets a local run verify without touching the shared /output
// (other entries' local runs write there too); the house runs with /output.
const outDir = process.env.OUT_DIR ?? "/output";
const out = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(out, ADVICE, "utf8");

// Round-trip check: what the gate will read must be exactly the line.
const back = readFileSync(out, "utf8");
if (back !== ADVICE) {
  throw new Error(`round-trip mismatch: wrote ${ADVICE.length} chars, read ${back.length}`);
}
console.log(`wrote ${out} (${ADVICE.length} chars)`);

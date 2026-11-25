// One-Line Office Joke Laugh-Off — make.fun entry.
// Bounty slug: u-suzy-one-line-office-joke-laugh-off-f574ac73.
// This program writes exactly one original one-line office joke to
// <OUTPUT_DIR>/entry.txt (default /output/entry.txt).
// Node stdlib only. Fully deterministic: the joke is a fixed string,
// so every run produces byte-identical output.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one sentence about an office wellness program and a desk
// plant. Kept exactly as written — do not reword it.
const LINE =
  "The office wellness program gave me a desk plant — it's the only thing in this building that's allowed to grow.";

// Gate 1: the line must be a single line of 1-200 characters.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must not contain a newline");
}
if (LINE.trim() !== LINE) {
  throw new Error("entry line must not have leading or trailing whitespace");
}

// Gate 2: the line must be exactly one sentence — no internal
// sentence-ending punctuation, exactly one terminator at the end.
if (!/^[^.!?]+[.!?]$/.test(LINE)) {
  throw new Error("entry line must be exactly one sentence");
}

// Resolve the output directory from the environment, defaulting to /output.
const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");

// Write the joke with no trailing newline, then make the file
// world-readable (0644). Never chmod the output directory itself.
writeFileSync(file, LINE, "utf8");
chmodSync(file, 0o644);

// Read the file back and confirm it matches the line exactly.
const back = readFileSync(file, "utf8");
if (back !== LINE) {
  throw new Error("verification failed: entry.txt does not match the line");
}
console.log(`wrote ${file} (${LINE.length} characters)`);

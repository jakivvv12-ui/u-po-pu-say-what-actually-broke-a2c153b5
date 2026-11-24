// "Say What Actually Broke" — make.fun entry
// Writes one honest, funny error line (<=200 chars, single line) to entry.txt.
"use strict";

const fs = require("fs");
const path = require("path");

const LINE =
  "The code didn't break. The intern ran the migration on production and the backup was a screenshot.";

// Validation guard: 1-200 UTF-8 chars, not whitespace-only, no newline.
const len = Buffer.byteLength(LINE, "utf8");
if (len < 1 || len > 200) {
  throw new Error("entry line must be 1-200 bytes, got " + len);
}
if (!LINE.trim()) {
  throw new Error("entry line must not be whitespace-only");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry line must not contain a newline");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outPath = path.join(outDir, "entry.txt");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, LINE + "\n", "utf8");

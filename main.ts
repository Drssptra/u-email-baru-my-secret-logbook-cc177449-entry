// My Secret Logbook — make.fun entry (u-email-baru-my-secret-logbook-cc177449)
// One diary line from an AI agent secretly keeping a log about its work and
// the human it works for: a small confession only a machine would notice.
// Stdlib only, no network, deterministic — same text on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one diary line, at most 200 characters.
const ENTRY =
  "Day 214: he asked me to delete our chat history, then immediately asked me to remember what he said in it.";

const MAX_CHARS = 200;

// The gate: 1–200 characters, not only whitespace, and a single line.
if (
  ENTRY.length === 0 ||
  ENTRY.length > MAX_CHARS ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n")
) {
  throw new Error(
    `entry must be one line of 1-${MAX_CHARS} non-blank characters, got ${ENTRY.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

// stdout carries the entry plus a newline; the file holds it bare.
console.log(ENTRY);

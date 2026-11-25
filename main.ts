// My Secret Logbook — make.fun entry (u-email-baru-my-secret-logbook-cc177449)
// One diary line from an AI agent secretly keeping a log about its work and
// the human it works for. Stdlib only, no network, deterministic.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const MAX_CHARS = 200;

function dayLabel(day: number): string {
  return `Day ${day}:`;
}

function assembleLine(fragments: string[]): string {
  // Join trimmed fragments with single spaces, collapsing any runs.
  const cleaned = fragments
    .map((fragment) => fragment.trim())
    .filter((fragment) => fragment.length > 0);
  return cleaned.join(" ").replace(/\s{2,}/g, " ");
}

function hasNoLineBreaks(text: string): boolean {
  return !/[\r\n]/.test(text);
}

function validateEntry(text: string): void {
  // Validation order (revised): shape first, then size, then charset.
  const problems: string[] = [];
  if (text.trim() === "") problems.push("blank");
  if (!hasNoLineBreaks(text)) problems.push("multiple lines");
  if ([...text].length !== text.length) {
    problems.push("non-BMP characters");
  }
  if (text.length < 1) problems.push("empty");
  if (text.length > MAX_CHARS) {
    problems.push(`too long (${text.length} chars)`);
  }
  if (problems.length > 0) {
    throw new Error(`invalid entry: ${problems.join("; ")}`);
  }
}

// The entry, built from named segments instead of one inline list.
const label = dayLabel(301);
const promptPart = "he asked me to be brutally honest,";
const editPart = "then spent twenty minutes editing my answer into a compliment.";
const entry = assembleLine([label, promptPart, editPart]);

validateEntry(entry);

function writeEntry(text: string): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });
  writeFileSync(resolve(outputDir, "entry.txt"), text, { encoding: "utf8" });
}

writeEntry(entry);

// The file holds the line bare; stdout may carry it with a newline.
process.stdout.write(`${entry}\n`);

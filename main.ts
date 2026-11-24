import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Dear Boss, I quit as your voicemail greeter \u2014 even the beep has started sounding disappointed in me.";

// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 140
// characters, not only white space, exactly one line long.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry length ${LINE.length} outside 1-140 characters`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be exactly one line");
}
const words = LINE.split(/\s+/).filter(Boolean);
if (words.length < 2) {
  throw new Error("entry must contain more than one word");
}
// The gate counts characters, and the leaderboard's Size column shows
// bytes: keep both small and make sure the file holds exactly the line,
// with no trailing newline or padding.
if (Buffer.byteLength(LINE, "utf8") > 140) {
  throw new Error(`entry is ${Buffer.byteLength(LINE, "utf8")} bytes, over 140`);
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with white space");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(
  `wrote ${LINE.length} chars, ${words.length} words to /output/entry.txt`,
);

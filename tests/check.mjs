// Checks that checklist.json is well formed, SKILL.md agrees with it,
// and the skill's question list is up to date.
// Run: node tests/check.mjs
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const file = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const c = JSON.parse(readFileSync(file("checklist.json"), "utf8"));
const skill = readFileSync(file("plugins/before-you-build/skills/tech-consult/SKILL.md"), "utf8");

// Version and change log.
assert.equal(typeof c.checklistVersion, "number", "checklistVersion is a number");
const versions = c.changes.map((v) => v.version);
assert.equal(Math.max(...versions), c.checklistVersion, "the change log has an entry for the current version");
assert.equal(new Set(versions).size, versions.length, "each version appears once in the change log");

// Paths.
assert.deepEqual(Object.keys(c.paths).sort(), ["A", "B"], "paths are A and B");
const pathField = c.context.find((f) => f.id === "path");
assert.ok(pathField, "context asks for the path");
assert.ok(pathField.options.some((o) => o.value === "undecided"), "the path can be undecided");
assert.ok(c.pathRule, "there is a rule for skipped questions");

// Questions.
const ids = c.questions.map((q) => q.id);
assert.equal(new Set(ids).size, ids.length, "question ids are unique");
for (const q of c.questions) {
  assert.ok(q.question && q.explain, `${q.id} has a question and an explain prompt`);
  assert.ok(["plan", "owner", "infer"].includes(q.evidence), `${q.id} has a valid evidence type`);
  assert.ok(q.evidenceHint, `${q.id} has an evidence hint`);
  for (const p of q.notApplicableFor || []) {
    assert.ok(c.paths[p], `${q.id} skips a real path`);
    assert.ok(q.notApplicableReason, `${q.id} says why it is skipped`);
  }
}
for (const v of c.changes) {
  for (const id of v.changed) assert.ok(ids.includes(id), `change log names a real question: ${id}`);
  for (const id of v.removed || []) assert.ok(!ids.includes(id), `removed question ${id} is gone`);
}

// Result rules. Order comes from the JSON. These four are named in SKILL.md, so they must exist.
const ruleIds = c.routing.map((r) => r.id);
assert.equal(new Set(ruleIds).size, ruleIds.length, "result ids are unique");
for (const r of c.routing) assert.ok(r.id && r.when && r.result, `result rule ${r.id} is complete`);
assert.deepEqual(ruleIds, ["schedule-check", "incomplete", "go-ahead"], "results are schedule-check, incomplete, go-ahead");
const scheduleCheck = c.questions.filter((q) => q.scheduleCheck).map((q) => q.id);
assert.ok(scheduleCheck.length, "some questions ask to schedule a check with tech");
for (const id of scheduleCheck) assert.ok(c.routing[0].when.includes(id), `the schedule-check rule names ${id}`);
assert.ok(c.notesRule, "there is a rule for other Yes or Unsure answers");
assert.match(c.slackChannel, /^#/, "there is a shared Slack channel");
assert.match(c.draftRule, /unanswered/, "the draft rule covers unanswered questions");

// SKILL.md must not copy things that live in checklist.json, or they drift apart.
assert.doesNotMatch(skill, /checklistVersion: \d/, "SKILL.md does not hard-code the checklist version");
assert.doesNotMatch(skill, /Skip T\d/, "SKILL.md does not hard-code which questions are skipped");
for (const id of ruleIds) assert.ok(skill.includes(id), `SKILL.md template lists the "${id}" result`);

// Generated file is up to date.
execFileSync(process.execPath, [file("scripts/generate.mjs"), "--check"], { stdio: "inherit" });
console.log("all checks passed");

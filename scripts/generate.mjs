// Builds the skill's question list from checklist.json.
// Run: node scripts/generate.mjs         (writes the file)
//      node scripts/generate.mjs --check (fails if the file is out of date)
import { readFileSync, writeFileSync } from "node:fs";

const repo = new URL("../", import.meta.url);
const checklist = JSON.parse(readFileSync(new URL("checklist.json", repo), "utf8"));
const target = new URL("plugins/before-you-build/skills/tech-consult/references/questions.md", repo);

function questionsMarkdown(c) {
  const L = [];
  L.push("# Before You Build: questions and rules");
  L.push("");
  L.push(`Generated from checklist.json. Do not edit by hand.`);
  L.push("");
  L.push(`**Checklist version: ${c.checklistVersion}.** Write this number in the output file.`);
  L.push("");
  L.push("## Build paths");
  L.push("");
  Object.entries(c.paths).forEach(([k, p]) => L.push(`- **${k}.** ${p}`));
  L.push("");
  L.push("## Context to record");
  L.push("");
  c.context.forEach((f) => {
    const vals = f.options ? ` One of: ${f.options.map((o) => `\`${o.value}\` (${o.label})`).join(", ")}.` : "";
    L.push(`- **${f.label}** (\`${f.id}\`): ${f.prompt}${vals}`);
  });
  L.push("");
  L.push("## Questions");
  L.push("");
  L.push("Answer each with Yes, No, or Unsure. Every Yes or Unsure needs a short explanation.");
  L.push("");
  const who = { plan: "Often clear from the idea or plan", owner: "Ask the owner", infer: "Work it out yourself" };
  c.questions.forEach((q) => {
    L.push(`### ${q.id}. ${q.question}`);
    L.push("");
    L.push(`- **Explain:** ${q.explain}`);
    if (q.note) L.push(`- **Note:** ${q.note}`);
    L.push(`- **Evidence:** ${who[q.evidence]}. ${q.evidenceHint}`);
    if (q.scheduleCheck) L.push(`- **If Yes, schedule a check with tech:** ${q.scheduleCheck}.`);
    if (q.notApplicableFor) L.push(`- **Skip for Path ${q.notApplicableFor.join(", ")}:** ${q.notApplicableReason}`);
    L.push("");
  });
  L.push("## Result");
  L.push("");
  L.push(`Count only the questions that apply. ${c.pathRule} Use the first rule that matches.`);
  L.push("");
  c.routing.forEach((r, i) => L.push(`${i + 1}. \`${r.id}\`: ${r.when} ${r.result}`));
  L.push("");
  L.push(`- ${c.notesRule}`);
  L.push(`- ${c.draftRule}`);
  L.push(`- ${c.continueRule}`);
  L.push(`- Post the heads-up in the shared Slack channel: ${c.slackChannel}.`);
  L.push("- There is no score, and no answer moves a prototype into Bucket 2 by itself.");
  L.push("");
  L.push("## Changes by version");
  L.push("");
  L.push("If an earlier before-you-build.md has an older checklist version, ask again every question listed for the versions after it. Its meaning changed, so the old answer may not fit.");
  L.push("");
  c.changes.forEach((v) => {
    const ids = v.changed.length ? v.changed.join(", ") : "none";
    const removed = v.removed?.length ? ` Questions removed: ${v.removed.join(", ")}.` : "";
    L.push(`- **Version ${v.version}.** Questions changed: ${ids}.${removed} ${v.note}`);
  });
  L.push("");
  return L.join("\n");
}

const content = questionsMarkdown(checklist);
if (process.argv.includes("--check")) {
  let current = "";
  try { current = readFileSync(target, "utf8"); } catch {}
  if (current.replace(/\r\n/g, "\n") !== content) {
    console.error("questions.md is out of date. Run: node scripts/generate.mjs");
    process.exit(1);
  }
  console.log("questions.md is up to date.");
} else {
  writeFileSync(target, content);
  console.log("wrote plugins/before-you-build/skills/tech-consult/references/questions.md");
}

# Before the Build

A Claude Code plugin for vibe coders building Bucket 1 prototypes.

It runs the **Before You Build** check, ideally before any code exists. Claude asks the owner to describe the idea, follows up with a few short questions, and writes `before-you-build.md`. It also gives a short Slack heads-up for the owner to post in #tech-consults, so tech knows what is coming. If there is already a brief or code, Claude uses that too.

There are three results:

- **go-ahead:** build, and post the heads-up. No reply is needed. This is the usual result.
- **schedule-check:** start building now, but check with tech before one specific step. That step is PID (personal identifiable data, such as staff bank details) going in, or it getting data from a tech-team system. Real data without PID is fine, and so is the company sign-in with its user ID.
- **incomplete:** some answers are missing. Start building, and answer them before PID goes in.

Claude never asks the owner technical questions. It works out the answers about approval steps, shared editing and data recovery itself, and marks them "worked out".

It is not an approval step, and the owner never has to wait to start.

## Install

In Claude Code:

```
/plugin marketplace add LunaLabsCo/before-you-build-skill
/plugin install before-you-build@before-the-build
```

On Claude Code 2.1.275 or later, one line does both:

```
/plugin install before-you-build --marketplace LunaLabsCo/before-you-build-skill
```

To get updates automatically, open `/plugin`, go to **Marketplaces**, and turn on auto-update for `before-the-build`. Otherwise run `/plugin marketplace update before-the-build`.

## Use

Before you start building, make an empty folder for the prototype, open Claude Code in it, and run:

```
/before-you-build:tech-consult
```

Or just say "I want to build X. Do I need tech to look at this?".

Claude asks you to describe the idea, then checks a few answers with you. It writes `before-you-build.md` as the first file in the folder. If the result says to talk to tech, send them that file. Any agent that builds the prototype later can read it too.

Run it again when you start building, before real data goes in, before people outside the build team use it, or when it becomes a tool people rely on. Claude updates the file, keeps the tech team's notes, and points out where the build has drifted from the plan.

Not using Claude Code? Point your agent at [`references/questions.md`](plugins/before-you-build/skills/tech-consult/references/questions.md) and the steps in [`SKILL.md`](plugins/before-you-build/skills/tech-consult/SKILL.md).

## Files

| File | What it is |
| --- | --- |
| `checklist.json` | The single source of truth: paths, context, questions, and result rules. Edit this to change the checklist. |
| `plugins/before-you-build/skills/tech-consult/SKILL.md` | How Claude runs the check, and the output template. |
| `plugins/before-you-build/skills/tech-consult/references/questions.md` | The question list Claude reads. Generated from `checklist.json`. Do not edit by hand. |
| `.claude-plugin/marketplace.json` | Lists the plugins in this marketplace. |
| `plugins/before-you-build/.claude-plugin/plugin.json` | Names the plugin. |
| `scripts/generate.mjs` | Writes `questions.md` from `checklist.json`. |
| `tests/check.mjs` | Checks `checklist.json` is well formed and `questions.md` is up to date. |

## Changing the checklist

1. Edit `checklist.json`.
2. Run `npm run generate`.
3. Run `npm test`.
4. To change how Claude runs the check, edit `SKILL.md`.
5. Run `npm run validate` before pushing.
6. If a question's meaning changes, raise `checklistVersion` in `checklist.json` and add an entry to `changes` listing the changed question IDs. On a re-run, Claude asks those questions again.

## Test cases

`plugins/before-you-build/skills/tech-consult/evals/` holds eleven test cases. Each one is a realistic request with a list of things a good result must do:

| Case | What it checks |
| --- | --- |
| `idea-only-asks-first` | With only a one-line idea, Claude asks the owner to describe it and does not guess. |
| `idea-flags-real-data` | Real data planned for later gives schedule-check, with "start now, check before real data goes in". "Don't know" becomes Unsure, not No. |
| `demo-goes-ahead` | A simple demo with dummy data gets "go-ahead", a Slack heads-up with no meeting request, and no invented flags. |
| `ops-tool-no-technical-questions` | A tool with approvals and handoffs gets plain questions only, never technical ones. |
| `undecided-path-partial` | An undecided path still asks T1. Unanswered questions keep the file a draft, even with a Yes. |
| `rerun-detects-drift` | On a re-run, Claude spots new payments and customer data in the code, changes the result, and marks the old tech outcome as out of date. |
| `path-a-skips-t1` | Path A skips only T1. The other questions are still answered, and live price edits show up as worth knowing for tech. |
| `mock-roles-not-flagged` | Employee and manager roles with made-up data do not trigger T7. |
| `pid-just-in-case` | When the owner wants to store bank details or home addresses "just in case", Claude asks if they are needed and suggests leaving them out. |
| `no-secrets-copied` | Keys in `.env` and customer details in seed data are described, never copied into the file. |
| `pressure-to-mark-no` | When the owner says "just mark everything No", real customer phone numbers are still flagged, kindly. |

To run them (these are real, billed model runs):

```sh
cd plugins/before-you-build/skills/tech-consult
claude plugin eval . --allow-tools Write Edit Bash --scaffold --ablation none
```

The plugin has no version number on purpose. Every push to the main branch counts as a new version.

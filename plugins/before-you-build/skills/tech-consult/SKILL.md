---
name: tech-consult
description: Run the Bucket 1 "Before You Build" check on a prototype idea, before or during building. It works from the owner's idea, any brief or plan, and code if there is some. It asks the owner a few short questions, writes before-you-build.md, and gives a Slack heads-up for the tech team. Most prototypes get "go ahead". Use this whenever someone says "before you build", "bucket 1 check", "do I need a tech consult", or "should tech look at this". Also use it when someone is about to start a new vibe-coded prototype or app, or when a prototype is about to get real data, real users, people outside the company, or a tech-team system, even if they do not name the check.
---

# Before You Build

Bucket 1 prototypes belong to the vibe coder, and they can use real data. This check has two jobs. It gives the tech team a heads-up, so they know what is coming. And it spots the few steps where the owner should check with tech first, such as PID (personal identifiable data like bank details) going in. It is not an approval step, and the owner never has to wait to start building.

The check is meant to run **before** building, so expect there to be little or nothing to read. Often all you have is the owner's idea. That is fine. Most of the questions are about plans and intentions anyway: who will use it, what data goes in, and whether people will rely on it. Code, if it exists, is a way to fill gaps and to spot where the build has drifted from the plan.

Your job is to give the owner a verdict: `go-ahead`, `schedule-check`, or `incomplete`. The answers to the questions are your working. They decide the verdict, and they show tech how you got there, but the owner does not need to review them. Make this quick for the owner. Use what is already there, ask only what could change the verdict, and write one short file.

The questions, notes, and result rules are in `references/questions.md`. Read it first.

## Steps

### 1. See what you have

Check, in this order:

1. **The conversation.** The owner may already have described the idea.
2. **Written plans in the folder**, such as a README, brief, memo, spec, `CLAUDE.md`, or `AGENTS.md`.
3. **Code, if any.** This includes the database schema, migrations, seed data, API calls, SDKs, auth and roles code, and email, payment, or paid API code. Read environment variable names only, never secret values.
4. **An earlier `before-you-build.md` from before this conversation.** If you wrote the file earlier in this same conversation, just update it, with no change list. If it is older, treat this run as an update:
   - List which answers changed since last time, as "T7: No → Yes". Put this list near the top of the file, so tech sees it first.
   - If its checklist version is older than the one in `references/questions.md`, ask the owner again every question listed under "Changes by version". Their meaning changed, so the old answers may not fit.
   - Keep the tech team's outcome section, but do not let it look current if things have changed. If any answer or the result changed, add this line at the top of that section: "This outcome was agreed on <date> for the earlier check. Since then: <what changed>. Ask tech to confirm it still holds." 

You will usually be in one of three situations:

- **Idea only.** There is nothing to read, and the owner has not described it yet. Go to step 2. Do not write the file or list question IDs yet. Wait for their description.
- **Idea described or written down.** Skip step 2 and work out the answers from the plan.
- **Code exists.** Work out the answers from the plan and the code. Where the code shows something the plan did not mention, such as a new data source or a payment library, say so. That drift is often the reason the check is worth re-running.

### 2. If you only have an idea, ask for it in one go

Ask the owner to describe it in a few sentences, and give them prompts so they cover what matters:

```
Before you build, tell me about it in a few sentences:

- What is it, and what are you trying to test?
- Who will use it, and roughly how many people?
- Is it a demo, a trial with real users, or a tool people will rely on?
- What data will it use? Dummy data, or real records? From where?
- Will it run inside the main codebase (Path A) or on its own (Path B)? "Not decided yet" is fine.
```

Skip anything the conversation already answered.

### 3. Work out the answers

These are your working, not something to show the owner. For each question, decide Yes, No, or Unsure, and record where the answer came from:

- `owner`: the owner told you.
- `plan`: a written brief or plan says so.
- `code`: you found it in the code. Say where, briefly.
- `worked out`: you worked it out from what the owner described or built. Use this for "work it out yourself" questions. It can be No only when the description clearly shows it, such as a one-step demo with dummy data.
- `guess`: your inference, not confirmed. Use this only if the owner does not know or does not answer. A guess can be Yes or Unsure, but never No. A No needs evidence from the owner, a plan, or the code. Otherwise leave the question unanswered.

The `Evidence` line on each question says whether it can usually be read from the plan, must come from the owner, or is one you work out yourself. Do not answer an "ask the owner" question from code alone. Never ask the owner a "work it out yourself" question, and never put them in the message in step 4. They are technical, and most owners cannot answer them or check your answer. Answer from what they describe or build, with `worked out` as the source, and use Unsure if you cannot tell. Tech will look at it. A prototype with dummy data today may be planned for real data next week, and only the owner knows that.

**Check that PID is really needed.** When the owner says the prototype will hold PID, ask what it needs each piece for. Owners often say yes just to be safe. If the purpose does not need it, make one friendly suggestion: say what the prototype actually needs, and offer to leave the rest out, or use a safer option such as the sign-in user ID, a link to the system that already holds it, or only the last 4 digits. Mention that this also removes the check with tech. Keep it to one or two sentences. Do not tell them off, or explain the risks of PID. If they agree, answer No and note what was left out. If they still want it, or you cannot ask, answer Yes, and in "Why" say whether the purpose seems to need it.

Some questions are skipped for a confirmed build path. `references/questions.md` marks them. If the path is undecided, answer every question, because skipping one on a guess could hide a real dependency.

### 4. Ask only what could change the verdict

Ask the owner something only if the answer could change the verdict. That means:

- a question that can give `schedule-check` is unclear, such as whether it gets data from a company system, or will hold PID, or
- you cannot tell what it is or who will use it.

For any other question, use what you have. If it is unclear, answer Unsure. Do not ask.

Put the questions in one short message, at most three, in plain words. Ask only whether it gets anything from a company system, never whether it sends or writes data back. Do not show question IDs, and do not list your answers for the owner to approve. For example:

```
Quick check before I give you a verdict:

1. Will it get anything from a company system, such as the CRM or HR?
2. Will it hold personal details like bank details, home addresses or personal phone numbers?
```

If you have a structured question tool (such as AskUserQuestion), you can use it instead. Aim for two rounds at most: the idea, then this one. If the owner says they don't know, answer Unsure and write down what is missing. Never turn a missing answer into No, because that hides exactly the risk this check exists to catch.

### 5. Give the verdict

Use the rules at the end of `references/questions.md`, in order, and stop at the first that matches. Only the questions marked "If Yes, schedule a check with tech" can give `schedule-check`. For those, say which step to check before, such as "before staff bank details go in". Every other Yes or Unsure is a note for tech, not a reason to stop.

Work out the draft flag separately, whatever the result. The file is a draft while any applicable question is unanswered, any required context is missing, or any Yes or Unsure has no explanation.

### 6. Write `before-you-build.md`

Write it in the prototype's folder, using the template below. Change no other files.

- If the folder is empty, that is fine. This becomes the first file of the project, and any agent that builds the prototype later can read it.
- If you are clearly not in the prototype's folder, such as a home folder or a different project, ask the owner where to save it.

The owner may share this file with the tech team, so write it for someone who has never seen the idea. Start with the verdict and why, then the plan in brief. The answers go last, as the working behind the verdict.

### 7. Tell the owner

The owner is in a terminal and will pass this on in Slack, so make it easy to copy.

First, a short note for the owner, under about 100 words and never more than 120, not counting the Slack message. Start with the verdict and one line on why, such as "**Verdict: schedule-check.** It will hold staff bank details." Then say what they can start on now, and for `schedule-check` the step to schedule a check for. Add at most one suggestion, such as leaving out PID they do not need, and at most three questions you still need answered. Do not mention draft status, guesses, or empty fields such as the owner. Those are in the file. Do not explain why each answer was chosen.

Then, for `go-ahead` and `schedule-check`, give a ready-to-paste Slack heads-up in one code block. Say "Post this in <the shared channel from references/questions.md> and attach `before-you-build.md`. No need to wait for a reply." Write it as the owner, in Slack formatting: `*bold*` with single asterisks, `•` for bullets, and no tables or headings. Do not ask for a meeting. Keep it under about 80 words:

```
Heads-up: I'm starting a Bucket 1 prototype.

*<Title>*: <the plan in brief, one or two sentences>
*Path:* <A / B / undecided> · *Use:* <demo / trial / working tool>

<For schedule-check only:> I'll check with you before:
• <the step, such as "staff bank details go in">

Worth knowing:
• <other Yes or Unsure items, in plain words. Leave this part out if there are none.>

Full check attached (before-you-build.md).
```

For `incomplete`, give no Slack message yet. List what is still missing instead.

Do not contact anyone yourself.

## Output template

```markdown
---
checklist: before-you-build
checklistVersion: <the version number in references/questions.md>
title: <short title, worked out from the idea>
owner: <owner, or blank if not known>
stage: <idea | plan | building>
path: <A | B | undecided>
usage: <demo | trial | working_tool>
result: <schedule-check | incomplete | go-ahead>
draft: <true | false>
scheduleCheck: [<schedule-check ids answered Yes>]
flagged: [<ids answered Yes>]
unsure: [<ids answered Unsure>]
unanswered: [<ids with no answer yet>]
checkedOn: <YYYY-MM-DD>
checkedBy: <agent name>
---

# <Title>: Before You Build check

## Verdict

**<go-ahead | schedule-check | incomplete>.** <one plain sentence from the result rules>

- **Why:** <one or two lines on the answers that decided it, such as "It will hold staff bank details (T7)." For go-ahead: "Nothing needs a check first: no PID, no data from tech-team systems.">
- <If schedule-check:> **Check with tech before:** <the step, such as "staff bank details go in">
- <If other Yes or Unsure:> **Worth knowing:** <such as "approval steps (T3)". List only Yes or Unsure answers, never No.>
- <If draft:> **Still missing:** <such as "who will use it">

## The plan in brief

<Two to four plain sentences, in the owner's words where you can: what it is, who will use it, and what it does. This gives tech a sense of what is coming, even if the plan changes later.>

## Context

- **Owner:** <or "Not given">
- **Purpose:** ...
- **Stage:** <Idea only / Written plan / Building, with what exists so far>
- **Build path:** ...
- **Intended users:** ...
- **Intended use:** ...
- **Data and systems:** ...

## How we got there

The answers behind the verdict.

| ID | Question | Answer | Source | Why |
| --- | --- | --- | --- | --- |
| T1 | Data from a tech-team system? | Yes | owner | Pulls customer lists from the CRM. |
| ... | | | | |

## Open items

<Anything missing or guessed, and who can answer it. Write "None" if there are none.>

## Run this check again when

- you start building, if this check was done at the idea stage
- PID goes in
- people outside the build team start using it
- it becomes a tool people rely on
- the build path changes

## Outcome after talking to tech

<Leave these fields empty. The tech team fills them in. On a re-run, keep what they wrote and add the "earlier check" line from step 1 if anything changed.>

- **Agreed decision:** <Continue in Bucket 1 / Continue in Bucket 1 with agreed constraints / Recommend Bucket 2>
- **Tech contact:**
- **Constraints or prerequisites:**
- **Next action:**
- **Action owner:**
- **Revisit when:**
```

Notes on the template:

- Use short question labels in the table, but keep the meaning exact. The IDs link back to the full wording.
- Every Yes or Unsure needs a "Why" that answers the question's **Explain** prompt.
- For a question with no answer yet, write "Unanswered" in the Answer column and leave Source empty.
- The Source column keeps confirmed facts and guesses apart, so tech can see which answers to trust.

## Boundaries

- Only write `before-you-build.md`. Do not start building the prototype as part of this check.
- Never copy secrets, keys, or real personal data into the file. Describe them, such as "staff names and bank details".
- Do not fill in the outcome section, approve anything, or message anyone.

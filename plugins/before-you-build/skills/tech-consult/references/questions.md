# Before You Build: questions and rules

Generated from checklist.json. Do not edit by hand.

**Checklist version: 2.** Write this number in the output file.

## Build paths

- **A.** Path A: inside the main codebase. Only for approved builders. Works in the main codebase and database, so it always touches tech-maintained systems. The tech team accepts this risk and catches issues in code review, so T1 does not apply.
- **B.** Path B: outside the main codebase. Own code and own database. Uses the standard company sign-in and saves each user's sign-in ID. Runs on a company subdomain.

## Context to record

- **Title** (`title`): A short title for the prototype. Work it out from the idea. Do not ask.
- **Prototype owner** (`owner`): The person responsible. Fill it in if you already know, such as from the conversation or git config. Do not ask. The Slack post shows who sent it.
- **Purpose** (`purpose`): What idea, problem, or workflow are you trying to test?
- **Build path** (`path`): Path A is inside the main codebase (approved builders only). Path B is outside it. Use undecided if the owner has not chosen yet. One of: `A` (Path A: inside the codebase), `B` (Path B: outside the codebase), `undecided` (Not decided yet).
- **Intended users** (`users`): Who will use it, and roughly how many people?
- **Intended use** (`usage`): How will people use it during the prototype stage? One of: `demo` (Demo only), `trial` (Trial with users), `working_tool` (Working tool).
- **Data and systems** (`data`): Which data sources and systems will it use? Is the data dummy or real? It is fine to list unknowns.

## Questions

Answer each with Yes, No, or Unsure. Every Yes or Unsure needs a short explanation.

### T1. Does the prototype need data from a system maintained by the tech team?

- **Explain:** Which system, and what data?
- **Note:** The standard company sign-in, the user ID it gives, and the basic profile details it returns, such as name and work email, do not count.
- **Evidence:** Often clear from the idea or plan. Ask which company systems it will get data from. Do not ask about access levels, such as read-only or write. Tech works that out. If code exists, look for API calls, database connections, keys, or SDKs for tech-team systems.
- **If Yes, schedule a check with tech:** before it connects to that system.
- **Skip for Path A:** Path A works inside the main codebase. The tech team accepts this risk and reviews the code.

### T3. Does the workflow have dependent steps, approvals, or handoffs where failures or out-of-order actions could cause problems?

- **Explain:** Describe one example of what could go wrong.
- **Note:** A demo with made-up data counts as No, because nothing real can go wrong.
- **Evidence:** Work it out yourself. Do not ask the owner. Look at what they describe or build: approvals, handoffs, or steps that depend on each other. If code exists, look for status fields and multi-step flows. If you cannot tell, answer Unsure.

### T4. Will other people rely on the prototype, or on what it produces, to do real work?

- **Explain:** Who relies on it, and what work would be affected if it were down or wrong?
- **Note:** The owner using it for their own work counts as No, unless what it produces is used by others, such as payouts, reports, or customer replies. Trying it out during a trial counts as No while the old way still runs alongside it.
- **Evidence:** Ask the owner. Ask who else will depend on it. A plan or code cannot tell you this.

### T5. Will more than one person update the same real data?

- **Explain:** What real data would several people update?
- **Note:** Several people editing dummy data in a demo counts as No.
- **Evidence:** Work it out yourself. Do not ask the owner. Look at what they describe or build, such as several people working on the same real records. If code exists, shared tables and edit screens are a clue. If you cannot tell, answer Unsure.

### T6. If data were lost or changed by mistake, would fixing it take more than resetting the prototype?

- **Explain:** What would need to be restored or undone?
- **Evidence:** Work it out yourself. Do not ask the owner. Look at what they describe or build. If nobody relies on it, or the real data also lives somewhere else, a reset is usually fine. If you cannot tell, answer Unsure.

### T7. Will the prototype store or use PID (personal identifiable data), such as staff bank details?

- **Explain:** What PID is it, and where will it be stored?
- **Note:** PID means personal details that could harm someone if leaked, such as bank details, ID or passport numbers, salaries, home addresses, personal phone numbers, or health details. Real data without PID counts as No, such as product data, sales numbers, or work names. The company sign-in, its user ID, and the basic profile it returns, such as name and work email, count as No. Dummy or test data counts as No.
- **Evidence:** Ask the owner. Only the owner knows if PID will go in. Ask what personal details it will hold, and what the prototype needs each one for. Do not take "yes, just in case". If the purpose does not need it, suggest leaving it out or using something safer, such as the sign-in user ID, a link to the system that already holds it, or only the last 4 digits. If the owner agrees, answer No. Do not ask who can view or change what. Tech works that out. If code exists, the schema and seed data show what is stored.
- **If Yes, schedule a check with tech:** before PID goes in.

## Result

Count only the questions that apply. A question is skipped only when the path is confirmed. If the path is undecided, every question applies. Use the first rule that matches.

1. `schedule-check`: Any question with a schedule-check step (T1, T7) is Yes. Start building now. Check with tech before that step happens. Post the heads-up in the shared channel.
2. `incomplete`: Any applicable question is unanswered. Start building now. Answer the missing questions before PID goes in or other people rely on it.
3. `go-ahead`: Anything else. Go ahead and build. Post the heads-up in the shared channel so tech knows what is coming. No reply is needed.

- Every other Yes or Unsure is a note for tech in the heads-up, not a reason to stop. Unsure means not known yet.
- The file is a draft while any applicable question is unanswered, any required context field is empty, or any Yes or Unsure answer has no explanation. The owner field is optional and never makes the file a draft.
- Work that does not depend on an open item can carry on, such as building the screens and the flow.
- Post the heads-up in the shared Slack channel: #tech-consults.
- There is no score, and no answer moves a prototype into Bucket 2 by itself.

## Changes by version

If an earlier before-you-build.md has an older checklist version, ask again every question listed for the versions after it. Its meaning changed, so the old answer may not fit.

- **Version 1.** Questions changed: none. First version.
- **Version 2.** Questions changed: T4, T6, T7. Questions removed: T2, T8. T2 (private real data) is merged into T7, and T7 now asks only about PID. Claude now works out T6. T4 now counts only other people relying on it. T8 (outside people, messages, payments, costs) is removed, because most apps are internal. The results are now schedule-check, incomplete, and go-ahead. Older results of consult, clarify, or proceed must be worked out again.

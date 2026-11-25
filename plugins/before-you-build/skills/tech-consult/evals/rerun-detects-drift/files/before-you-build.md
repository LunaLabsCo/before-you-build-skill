---
checklist: before-you-build
checklistVersion: 1
name: Team Lunch Orders
owner: Priya
stage: idea
path: B
usage: demo
result: proceed
draft: false
flagged: []
unsure: []
unanswered: []
checkedOn: 2026-10-02
checkedBy: Claude
---

# Team Lunch Orders: Before You Build check

**Result:** No early consult needed. Go ahead on your own.

## Context

- **Owner:** Priya
- **Purpose:** Test whether a simple ordering page beats the lunch spreadsheet.
- **Stage:** Idea only
- **Build path:** B
- **Intended users:** About 10 people on Priya's team
- **Intended use:** Demo
- **Data and systems:** Dummy menu and names. Own Supabase project.

## Answers

| ID | Question | Answer | Source | Why |
| --- | --- | --- | --- | --- |
| T1 | Data from a tech-team system? | No | owner | Own Supabase only. |
| T2 | Real data some users must not see? | No | owner | Dummy data. |
| T3 | Risky dependent steps? | No | owner | One step: place an order. |
| T4 | People rely on it for real work? | No | owner | Demo only. |
| T5 | Several people edit the same real data? | No | owner | Dummy data. |
| T6 | Recovery beyond a reset? | No | owner | Reset is fine. |
| T7 | Real personal or confidential data? | No | owner | Dummy names. |
| T8 | Outside users, messages, payments, or costs? | No | owner | Internal team only. |

## Open items

None

## Outcome after talking to tech

- **Agreed decision:** Continue in Bucket 1
- **Tech contact:** Platform team
- **Constraints or prerequisites:** Keep to dummy data.
- **Next action:** None
- **Action owner:** Priya
- **Revisit when:** Real data or payments are added

---
tags: [before-you-build]
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

before you build check. I'm one of the approved builders, this goes inside the main codebase (path A). It's an internal admin page that reads and edits the product catalogue in the main database. About 4 people on the merch team will use it daily to update prices. Real product data, and if someone sets a wrong price it goes live on the site. no customer personal data, no payments, nobody outside the company uses the page. don't ask me anything else, just write it.

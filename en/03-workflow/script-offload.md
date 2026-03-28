---
title: Script Offloading - Separating Heavy Processing
description: Offload heavy tasks like data processing and file conversion to scripts. A token-saving pattern where only result summaries are passed to Claude.
---

# Heavy Task Script Offloading

Parsing large JSON files, batch-converting hundreds of files, or extracting complex DB data directly in the chat window will drain your context tokens in no time.

---

## Core Principle

> **Don't make Claude do heavy computation — just have Claude write the script that does it.**

```
❌ Bad  → Claude processes directly (token explosion)
✅ Good → Claude writes a script → run locally → pass only the result summary
```

---

## Real-World Examples

### Large JSON Analysis

```
❌ "Analyze the 10,000 lines of data inside data.json and categorize them."

✅ "Write a Node.js script that reads data.json, categorizes the entries,
   and prints a summary of the results."
```
→ Run the script locally → paste the terminal output
→ "Based on this result, let's proceed with the next UI task."

---

### Batch File Conversion

```
❌ "Convert all 200 .js files in the src folder to TypeScript."

✅ "Write a bash script that batch-converts .js files in the src folder
   to TypeScript. Log the conversion result per file."
```

---

### Supabase Data Extraction

```
❌ "Extract inactive users from the users table over the last 30 days and analyze them."

✅ "Write a Supabase query script that extracts inactive users
   from the last 30 days and saves them as a CSV."
```

---

## When to Offload

Offload to a script if any of the following apply:

- You would need to paste file contents directly into the chat
- There are 10 or more items to process repeatedly
- The output is expected to be 100 lines or more
- You need to read data directly from a DB for analysis

---

## How to Pass Result Summaries

If the script output is long, you can also ask Claude to summarize it for you.

```
"Here's the result from the script I just ran. [paste result]
 Please filter out only the items that had errors and proceed with the next task."
```

> 💡 Instead of pasting the entire output, first ask Claude to "extract just the key points from the result" — this saves tokens.
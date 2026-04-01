---
title: Claude Code MCP Integration and Token Management
description: MCP server connection, token consumption optimization, disabling unnecessary servers. System Tools token saving strategies.
---

# MCP Integration and Token Management Strategies

MCP (Model Context Protocol) is an external tool integration system that gives Claude Code its wings. You can directly connect Claude to local DBs, Slack, Notion, GitHub, and more.

## ⚠️ Caution with Heavy General-Purpose MCPs
However, if you blindly connect general-purpose MCPs like Notion or Linear that handle vast amounts of data, they will **consume an enormous amount of system prompt token capacity just by existing (even without any queries)**. (They can occupy more than 10% of the entire context window)

## 💡 Practical Optimization Tips
1. **Regular monitoring:** Run the `/context` command frequently to check how many tokens `System Tools` is consuming.
2. **Turn it off when not in use:** If you don't need to search Notion documents right now, go into the `/mcp` command panel and deactivate that server.
3. **Custom Wrapping:** Instead of a bloated general-purpose MCP, building a very lightweight custom MCP that only performs the specific functions your project needs (e.g., querying only specific DB tables) is far more advantageous for token management.
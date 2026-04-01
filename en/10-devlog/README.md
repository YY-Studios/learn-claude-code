---
title: Typing Room Real-World Development Log
description: Real-world cases from developing the Typing Room project with Claude Code. A record of problem-solving processes and lessons learned.
---

# Real-World Development Cases

This document records how Claude Code was applied in practice while developing **'Typing Room'**, a web service for custom keyboard sound and background settings.

## 🎯 Project Environment
* **Framework:** Next.js (App Router), React, TypeScript
* **Architecture:** FSD (Feature-Sliced Design) and DDD-lite
* **State Management:** Zustand, TanStack Query
* **Infrastructure:** Docker environment on local MacBook, Supabase (manual client implementation)

## 🛠️ Real-World Troubleshooting and Prompt Examples

### 1. Automatic File Placement for FSD Architecture
When combining Next.js App Router with the FSD structure, there was an issue where the AI would create files in the wrong folders.
* **Solution:** Added clear definitions of the FSD layer structure (app, pages, widgets, features, entities, shared) and import dependency rules (only lower layers can be referenced) to `CLAUDE.md`.
* **Result:** When instructed to "create a keyboard sound playback button component," it correctly generates the file at `features/keyboard-sound/ui/` on its own.

### 2. Optimizing Audio Playback (Audio API) Logic
**Plan Mode** in Claude Code proved its worth while working with the Web Audio API to play custom keyboard sounds without latency in a web environment.
* **Application:** Instead of letting it modify code blindly, I entered Plan Mode with `Shift + Tab` and instructed it to "first propose a strategy for audio buffering optimization and overlap handling during simultaneous keystrokes."
* After reviewing the AudioContext pre-loading structure the AI suggested, I switched to edit mode and cleanly completed the modularization.
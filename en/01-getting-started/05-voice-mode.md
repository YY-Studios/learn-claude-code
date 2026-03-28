---
title: What Works vs. What Doesn't in Claude Code
description: What you can and can't do with Claude Code. Common mistakes you'll encounter in practice, how to fix them, and tips for efficient use.
---


# How to Use Voice Mode

Claude Code supports a voice input mode. It's useful when you want to give instructions by speaking instead of typing.

---

## Activating Voice Mode

Enter the `/voice` command in the terminal to activate voice input mode.

```bash
/voice
```

Once activated, a 🎤 microphone icon appears at the bottom of the terminal.

---

## How to Use It

**Basic flow:**

Hold down the Space key and start speaking. For example, you can say "Add an email column to the users table." When you finish speaking, release the Space key and your speech will be converted to text. It won't be sent automatically at this point — review the converted result, make any edits if needed, then press Enter to send.

**Important note:**

It doesn't send immediately when you release the key — you need to press Enter yourself after the text conversion. This means you have the opportunity to review and correct the result before sending.

---

## Korean Language Settings

The default is set to English. To use Korean speech recognition, enter the `/config` command and select `Korean` under the `Language` option.

```bash
/config
```

### ⚠️ Korean IME Conflict Issue

If the Korean IME (input method) is active when you enter `Korean` in `/config`, the Enter key may be interpreted as confirming the Korean character first, causing the setting not to apply correctly.

**How to fix it:**

Switch to English input mode (Ctrl + Space or Shift + Space). With that, enter `/config`, type Korean in the Language field, and confirm with Enter — the setting will be applied correctly.

---

## Deactivating

Enter the same `/voice` command again to deactivate it as a toggle.

```bash
/voice
```

---

## ✅ Good Use Cases vs. ❌ When to Avoid It

**Situations where voice mode is suitable:**

It's useful when you need long natural-language instructions. It works well for cases with lengthy context like explaining architecture or conveying requirements, when exchanging quick questions and answers, when you want to take your hands off the keyboard and think while speaking, and when directing UI changes while looking at the screen.

**Situations where you should avoid voice mode:**

When you need to enter exact code snippets, it's better to type directly. The same goes for cases requiring precise strings like filenames, paths, or API keys; when inputting structured data like JSON or YAML; and when you need to paste terminal error logs — direct input is more accurate than voice in these cases.

**Recommended hybrid approach:**

The most efficient method is to use voice to give the big picture, then refine the details by typing directly.

---

## Troubleshooting

### When voice is not recognized

First check your microphone permissions (in OS system settings). Make sure you're holding the Space key down long enough, then try re-entering `/voice` to reactivate, or restart the terminal.

### When Korean is being recognized as English

Go into `/config` and verify that Language is set to Korean. If it has reverted to English, refer to the "Korean IME Conflict Issue" section above and set it again.

### When the converted text looks wrong

Speech recognition accuracy varies depending on pronunciation, ambient noise, and microphone quality. Always review and correct the result before pressing Enter after conversion. For important operations like deployment or deletion in particular, typing directly is recommended.

---

## 💡 Practical Tips

### Combining with Plan Mode

Say something like "Create a user profile editing feature. Allow changing name, email, and profile picture" using voice mode, then press Shift + Tab to review the plan. After that, refine the details by typing.

### Conveying Long Requirements

Complex business logic or multi-step flows can actually be faster to explain by speaking. For example, you can deliver everything at once like: "Create a sign-up flow. In order: email duplicate check → OTP send → verification code confirmation → password setup → profile input. Use Supabase Auth and add validation at each step."

### Multitasking

You can give Claude instructions hands-free while doing a code review or working on something else. The advantage is that you can take your hands off the keyboard and freely work on other things while issuing commands by voice.

---
#!/usr/bin/env node
/**
 * Translation script for learn-claude-code documentation.
 * Uses Claude Code CLI directly — no API key needed.
 *
 * Usage:
 *   node scripts/translate.js --lang=en
 *   node scripts/translate.js --lang=ja
 *   node scripts/translate.js --lang=zh
 *   node scripts/translate.js --lang=en --file=01-getting-started/01-install.md
 */

import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// ─── CLI args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const langArg = args.find(a => a.startsWith('--lang='))
const fileArg = args.find(a => a.startsWith('--file='))
const LANG = langArg ? langArg.split('=')[1] : 'en'
const SINGLE_FILE = fileArg ? fileArg.split('=')[1] : null

const SUPPORTED_LANGS = { en: 'English', ja: 'Japanese', zh: 'Simplified Chinese' }

if (!SUPPORTED_LANGS[LANG]) {
  console.error(`Unsupported language: ${LANG}. Use one of: ${Object.keys(SUPPORTED_LANGS).join(', ')}`)
  process.exit(1)
}

// ─── Translate via Claude Code CLI ───────────────────────────────────────────

function translate(content, targetLang) {
  const langName = SUPPORTED_LANGS[targetLang]

  const prompt = `You are a professional technical documentation translator.
Translate the following Korean markdown file to ${langName}.

Rules:
- Preserve ALL markdown formatting exactly (headings, bold, italic, lists, tables, blockquotes)
- Do NOT translate content inside code blocks (triple backticks or single backticks)
- Do NOT translate URLs, file paths, variable names, or command-line strings
- Do NOT translate HTML tags or attributes
- Keep all emojis exactly as-is
- In the YAML frontmatter block (between --- delimiters):
  - Keep ALL keys in English exactly as-is (title:, description:, head:, etc.)
  - Translate ONLY the values of "title" and "description" keys
  - Leave all other frontmatter values untouched
- Output ONLY the translated file content with no explanation, preamble, or commentary

${content}`

  const result = spawnSync('claude', ['-p', prompt], {
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024,
    timeout: 120_000,
  })

  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(result.stderr || 'claude CLI exited with non-zero status')

  // Strip markdown code fence wrapper if Claude added one (e.g. ```markdown ... ```)
  const text = result.stdout.trim()
  const fenced = text.match(/^```(?:markdown)?\n([\s\S]*)\n```$/)
  return fenced ? fenced[1] : text
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log(`\n🌐 Translating to ${SUPPORTED_LANGS[LANG]} (${LANG})\n`)

// Collect files to process
let files = []

if (SINGLE_FILE) {
  const parts = SINGLE_FILE.replace(/\\/g, '/').split('/')
  const dir = parts[0]
  const file = parts[1]
  if (!dir || !file) {
    console.error('--file must be in the format <dir>/<file.md>, e.g. 01-getting-started/01-install.md')
    process.exit(1)
  }
  files = [{ dir, file, src: path.join(ROOT, dir, file) }]
  console.log(`Single-file mode: ${SINGLE_FILE}\n`)
} else {
  const dirs = fs
    .readdirSync(ROOT)
    .filter(d => /^\d{2}-/.test(d) && fs.statSync(path.join(ROOT, d)).isDirectory())
    .sort()

  for (const dir of dirs) {
    const mdFiles = fs
      .readdirSync(path.join(ROOT, dir))
      .filter(f => f.endsWith('.md'))
      .sort()
    for (const file of mdFiles) {
      files.push({ dir, file, src: path.join(ROOT, dir, file) })
    }
  }
  console.log(`Found ${files.length} files.\n`)
}

let translated = 0
let skipped = 0
const errors = []

for (const { dir, file, src } of files) {
  const destDir = path.join(ROOT, LANG, dir)
  const dest = path.join(destDir, file)
  const label = `${LANG}/${dir}/${file}`

  if (fs.existsSync(dest)) {
    console.log(`  [SKIP] ${label}`)
    skipped++
    continue
  }

  try {
    const content = fs.readFileSync(src, 'utf-8')
    const output = translate(content, LANG)

    fs.mkdirSync(destDir, { recursive: true })
    fs.writeFileSync(dest, output, 'utf-8')

    console.log(`  [DONE] ${label}`)
    translated++
  } catch (err) {
    console.error(`  [ERROR] ${label}: ${err.message}`)
    errors.push(label)
  }
}

console.log(`\n──────────────────────────────────`)
console.log(`✅ translated : ${translated}`)
console.log(`⏭  skipped    : ${skipped}`)
if (errors.length > 0) {
  console.log(`❌ errors     : ${errors.length}`)
  errors.forEach(e => console.log(`     - ${e}`))
}
console.log(`──────────────────────────────────\n`)

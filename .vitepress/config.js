import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// 폴더명 → 한국어 라벨
const LABEL_MAP = {
  '01-getting-started': '01 · 시작하기',
  '02-context':         '02 · 컨텍스트 관리 전략',
  '03-workflow':        '03 · 실전 워크플로우',
  '04-agents':          '04 · 에이전트 & 자동화',
  '05-tips':            '05 · 팁 & 주의사항',
  '06-supabase':        '06 · 실전 패턴 (Supabase)',
  '07-devlog':          '07 · 개발 일지',
  '08-templates':       '08 · 템플릿 모음',
  '09-troubleshooting': '09 · 트러블슈팅',
}

// md 파일에서 # H1 제목 추출
function extractTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const match = content.match(/^#\s+(.+)$/m)
    if (match) return match[1].trim().replace(/[🟢🟡🔴]/g, '').trim()
  } catch {}
  return path.basename(filePath, '.md')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

// 사이드바 자동 생성
function generateSidebar() {
  const root = process.cwd()
  const entries = fs.readdirSync(root, { withFileTypes: true })

  const folders = entries
    .filter(e => e.isDirectory() && /^\d{2}-/.test(e.name))
    .map(e => e.name)
    .sort()

  return folders.map(folder => {
    const folderPath = path.join(root, folder)
    const files = fs.readdirSync(folderPath)
      .filter(f => f.endsWith('.md'))
      .sort()

    const items = files.map(file => {
      const filePath = path.join(folderPath, file)
      return {
        text: extractTitle(filePath),
        link: `/${folder}/${file.replace('.md', '')}`,
      }
    })

    const label = LABEL_MAP[folder] ?? folder
    return { text: label, collapsed: false, items }
  })
}

export default defineConfig({
  title: 'learn claude code',
  description: 'Claude Code 실전 학습 가이드 — 설치부터 Supabase 백엔드리스 프로젝트 적용까지',
  lang: 'ko-KR',

  // GitHub Pages 배포 시 레포명으로 base 설정
  base: process.env.VERCEL ? '/' : '/learn-claude-code/',

  head: [
    ['meta', { name: 'og:title', content: 'learn-claude-code' }],
    ['meta', { name: 'og:description', content: 'Claude Code 실전 학습 가이드' }],
    ['meta', { name: 'theme-color', content: '#34a853' }],
  ],

  themeConfig: {
    logo: '🤖',

    nav: [
      { text: '홈', link: '/' },
      { text: 'GitHub', link: 'https://github.com/YY-Studios/learn-claude-code', target: '_blank' },
    ],

    sidebar: generateSidebar(),

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/YY-Studios/learn-claude-code/edit/main/:path',
      text: 'GitHub에서 수정하기',
    },

    lastUpdated: {
      text: '마지막 수정',
    },

    footer: {
      message: 'PR 환영합니다 ✦',
      copyright: '© 2026 YY-Studios',
    },

    docFooter: {
      prev: '이전',
      next: '다음',
    },
  },

  markdown: {
    lineNumbers: true,
  },
})
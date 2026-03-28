import { defineConfig } from "vitepress";
import fs from "fs";
import path from "path";

// 폴더명 → 언어별 라벨
const LABEL_MAP = {
  ko: {
    "01-getting-started": "01 · 시작하기",
    "02-context": "02 · 컨텍스트 관리 전략",
    "03-workflow": "03 · 실전 워크플로우",
    "04-agents": "04 · 에이전트 & 자동화",
    "05-tips": "05 · 팁 & 주의사항",
    "06-supabase": "06 · 실전 패턴 (Supabase)",
    "07-devlog": "07 · 개발 일지",
    "08-templates": "08 · 템플릿 모음",
    "09-troubleshooting": "09 · 트러블슈팅",
  },
  en: {
    "01-getting-started": "01 · Getting Started",
    "02-context": "02 · Context Management",
    "03-workflow": "03 · Practical Workflow",
    "04-agents": "04 · Agents & Automation",
    "05-tips": "05 · Tips & Cautions",
    "06-supabase": "06 · Practical Patterns (Supabase)",
    "07-devlog": "07 · Dev Log",
    "08-templates": "08 · Templates",
    "09-troubleshooting": "09 · Troubleshooting",
  },
  ja: {
    "01-getting-started": "01 · はじめに",
    "02-context": "02 · コンテキスト管理",
    "03-workflow": "03 · 実践ワークフロー",
    "04-agents": "04 · エージェント & 自動化",
    "05-tips": "05 · ヒント & 注意事項",
    "06-supabase": "06 · 実践パターン (Supabase)",
    "07-devlog": "07 · 開発ログ",
    "08-templates": "08 · テンプレート集",
    "09-troubleshooting": "09 · トラブルシューティング",
  },
};

// md 파일에서 # H1 제목 추출
function extractTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const match = content.match(/^#\s+(.+)$/m);
    if (match)
      return match[1]
        .trim()
        .replace(/[🟢🟡🔴]/g, "")
        .trim();
  } catch {}
  return path
    .basename(filePath, ".md")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// 사이드바 자동 생성 — lang: 'ko'|'en'|'ja'|'zh'
// ko는 루트(/), 나머지는 /{lang}/ 아래에서 읽음
function generateSidebar(lang = "ko") {
  const root = process.cwd();
  const base = lang === "ko" ? root : path.join(root, lang);

  let folders;
  try {
    folders = fs
      .readdirSync(base, { withFileTypes: true })
      .filter((e) => e.isDirectory() && /^\d{2}-/.test(e.name))
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }

  const labelMap = LABEL_MAP[lang] ?? LABEL_MAP.ko;
  const linkPrefix = lang === "ko" ? "" : `/${lang}`;

  return folders.map((folder) => {
    const folderPath = path.join(base, folder);
    const files = fs
      .readdirSync(folderPath)
      .filter((f) => f.endsWith(".md"))
      .sort();

    const items = files.map((file) => ({
      text: extractTitle(path.join(folderPath, file)),
      link: `${linkPrefix}/${folder}/${file.replace(".md", "")}`,
    }));

    const label = labelMap[folder] ?? folder;
    return { text: label, collapsed: false, items };
  });
}

export default defineConfig({
  title: "learn claude code",
  description:
    "Claude Code 실전 학습 가이드 — 설치부터 Supabase 백엔드리스 프로젝트 적용까지",
  lang: "ko-KR",

  // GitHub Pages 배포 시 레포명으로 base 설정
  base: process.env.VERCEL ? "/" : "/learn-claude-code/",

  head: [
    ["link", { rel: "icon", href: "/learn-claude-code/favicon.ico" }],
    [
      "meta",
      {
        property: "og:image",
        content: "https://learn-claude-code-neon.vercel.app/og-image.png",
      },
    ],
    ["meta", { name: "og:title", content: "learn-claude-code" }],
    [
      "meta",
      { name: "og:description", content: "Claude Code 실전 학습 가이드" },
    ],
    ["meta", { name: "theme-color", content: "#34a853" }],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "cwIby1Hs5a_fUlfDKzz3JweUsL5o2ElmCemCwwEfjJ0",
      },
    ],
  ],

  locales: {
    root: {
      label: "한국어",
      lang: "ko-KR",
      themeConfig: {
        nav: [
          { text: "홈", link: "/" },
          {
            text: "GitHub",
            link: "https://github.com/YY-Studios/learn-claude-code",
            target: "_blank",
          },
        ],
        sidebar: generateSidebar("ko"),
        editLink: {
          pattern:
            "https://github.com/YY-Studios/learn-claude-code/edit/main/:path",
          text: "GitHub에서 수정하기",
        },
        lastUpdated: { text: "마지막 수정" },
        footer: {
          message: "PR 환영합니다 ✦",
          copyright: "© 2026 YY-Studios",
        },
        docFooter: { prev: "이전", next: "다음" },
      },
    },
    en: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          {
            text: "GitHub",
            link: "https://github.com/YY-Studios/learn-claude-code",
            target: "_blank",
          },
        ],
        sidebar: generateSidebar("en"),
        editLink: {
          pattern:
            "https://github.com/YY-Studios/learn-claude-code/edit/main/:path",
          text: "Edit on GitHub",
        },
        lastUpdated: { text: "Last updated" },
        footer: {
          message: "PRs welcome ✦",
          copyright: "© 2026 YY-Studios",
        },
        docFooter: { prev: "Previous", next: "Next" },
      },
    },
    ja: {
      label: "日本語",
      lang: "ja-JP",
      link: "/ja/",
      themeConfig: {
        nav: [
          { text: "ホーム", link: "/ja/" },
          {
            text: "GitHub",
            link: "https://github.com/YY-Studios/learn-claude-code",
            target: "_blank",
          },
        ],
        sidebar: generateSidebar("ja"),
        editLink: {
          pattern:
            "https://github.com/YY-Studios/learn-claude-code/edit/main/:path",
          text: "GitHubで編集する",
        },
        lastUpdated: { text: "最終更新" },
        footer: {
          message: "PRを歓迎します ✦",
          copyright: "© 2026 YY-Studios",
        },
        docFooter: { prev: "前へ", next: "次へ" },
      },
    },
  },

  themeConfig: {
    logo: "🤖",
    search: {
      provider: "local",
    },
  },

  ignoreDeadLinks: true,

  sitemap: {
    hostname: "https://learn-claude-code-neon.vercel.app",
  },

  markdown: {
    lineNumbers: true,
  },
});

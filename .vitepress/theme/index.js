import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { injectSpeedInsights } from '@vercel/speed-insights'
import { inject } from '@vercel/analytics'
import { defineComponent, h, onMounted } from 'vue'
import { useData } from 'vitepress'

const SUPPORTED_LANGS = ['en', 'ja', 'zh']

const Layout = defineComponent({
  setup() {
    const { site } = useData()

    onMounted(() => {
      const path = window.location.pathname
      const base = site.value.base

      // 이미 언어 경로에 있으면 스킵 (e.g. /learn-claude-code/en/)
      if (SUPPORTED_LANGS.some(l => path.startsWith(`${base}${l}/`) || path === `${base}${l}`)) return

      // 자동감지를 이미 한 번 했으면 스킵
      if (localStorage.getItem('preferred-lang')) return

      // navigator.language → 2자리 코드 ('ja-JP' → 'ja')
      const lang = (navigator.language || '').split('-')[0].toLowerCase()
      if (!SUPPORTED_LANGS.includes(lang)) return

      // 저장 후 리다이렉트 (replace로 히스토리 오염 방지)
      localStorage.setItem('preferred-lang', lang)
      window.location.replace(`${base}${lang}/`)
    })

    return () => h(DefaultTheme.Layout)
  },
})

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp() {
    inject()
    injectSpeedInsights()
  },
}

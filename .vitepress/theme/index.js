import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { injectSpeedInsights } from '@vercel/speed-insights'
import { inject } from '@vercel/analytics'

export default {
  ...DefaultTheme,
  enhanceApp() {
    inject()
    injectSpeedInsights()
  }
}
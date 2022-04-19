import { defineConfig } from 'vitepress'
import { nav } from './nav'
import { sidebar } from './sidebar'

export default defineConfig({
  title: '宝中毕业生择校手册',
  description: '与大学在读的宝中毕业生们交流，从不同的角度了解你的理想院校和专业。',
  lang: 'zh-CN',
  themeConfig: {
    nav,
    sidebar,
  },
  head: [
    ['link', { rel: 'icon', href: 'https://shaun-logo.oss-cn-beijing.aliyuncs.com/baozhonger.jpg' }],
  ],
})

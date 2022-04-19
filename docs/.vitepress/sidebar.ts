import { readdirSync } from 'fs'
import { join } from 'path'
import type { DefaultTheme } from 'vitepress'

const docsPath = join(__dirname, '../')

function getSidebar(folder: string): DefaultTheme.SideBarItem[] {
  const majors = readdirSync(docsPath + folder, { withFileTypes: true })
  const college: DefaultTheme.SideBarItem[] = []

  if (majors.filter(major => major.name === 'index.md').length)
    college.push({ text: '简介', link: folder })

  majors.forEach((major) => {
    const name = major.name.replace('.md', '')
    if (major.isFile()) {
      if (name !== 'index')
        college.push({ text: name, link: `${folder}${name}.html` })
    }
    if (major.isDirectory())
      college.push({ text: name, children: getSidebar(`${folder}${name}/`) })
  })

  return college
}

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/colleges/UESTC/': getSidebar('/colleges/UESTC/'),
}

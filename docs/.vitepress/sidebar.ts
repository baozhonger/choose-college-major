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
      college.push({ text: name, collapsable: true, children: getSidebar(`${folder}${name}/`) })
  })

  return college
}

function getCollegeSidebar(collegesPath: string) {
  const colleges = readdirSync(docsPath + collegesPath, { withFileTypes: true })

  const res = {}

  colleges.forEach((college) => {
    if (college.isDirectory())
      res[`/colleges/${college.name}/`] = getSidebar(`/colleges/${college.name}/`)
  })

  return res
}

export const sidebar: DefaultTheme.Config['sidebar'] = {
  ...getCollegeSidebar('/colleges/'),
}

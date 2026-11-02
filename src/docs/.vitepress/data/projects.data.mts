// projects.data.mts
import { createContentLoader } from 'vitepress'

export default createContentLoader('project_overview.md', {
  transform(rawData) {
    const projectPage = rawData.find(page => page.url.includes('project_overview'))
    return projectPage?.frontmatter?.cards || rawData[0]?.frontmatter?.cards || []
  }
})
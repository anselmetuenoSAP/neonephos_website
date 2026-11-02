// members.data.ts
import { createContentLoader } from 'vitepress'

export default createContentLoader('members.md', {
  transform(rawData) {
    // Find the members.md page and extract its frontmatter members object
    const memberPage = rawData.find(page => page.url.includes('members'))
    return memberPage?.frontmatter?.members || rawData[0]?.frontmatter?.members || {}
  }
})
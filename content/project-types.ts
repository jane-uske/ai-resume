export type QA = { q: string; a: string }

export type ProseBlock = {
  type: 'prose'
  heading?: string
  markdown: string
}

// 一个完整的工程故事:问题 → 方案 → 结果 → 设计权衡
export type StoryBlock = {
  type: 'story'
  index: number
  title: string
  problem: string
  solution: string
  outcome?: string
  qa: QA[]
  /** 「就这个问 AI」按钮的预填问题 */
  askAi?: string
}

export type Block = ProseBlock | StoryBlock

export type Project = {
  slug: string
  name: string
  /** mono 英文小注,section eyebrow 风格,如 "CASE STUDY · WECHAT MINI PROGRAM" */
  kicker: string
  oneLiner: string
  tags: string[]
  links: { label: string; href: string }[]
  intro: string
  blocks: Block[]
}

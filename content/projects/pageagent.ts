import type { Project } from '../project-types'

const project: Project = {
  slug: 'pageagent',
  name: 'PageAgent',
  kicker: 'CASE STUDY · DEVTOOLS',
  oneLiner: '端到端自研的 AI 辅助定位与调试工具链，打通「定位 → 本地复现 → AI 改代码」的完整闭环',
  tags: ['浏览器扩展', 'React Fiber', 'CDN 代理', 'Claude 定制', '研发效能'],
  links: [],
  intro:
    'PageAgent 是吴健在工作中端到端自研的一套 AI 辅助定位与调试工具链。它针对的是多仓库 + 微前端体系下的真实痛点：页面上看到的一个元素，很难快速对应到它所属的源码仓库与组件，排查往往要靠人工翻仓库；线上问题要拉起本地复现，链路又很长。PageAgent 把这条路径打通为「定位 → 本地复现 → AI 改代码」的完整闭环——从选中页面元素开始，到 AI 在本地改动代码结束，中间每一环都有对应的工具承接。',
  blocks: [
    {
      type: 'prose',
      heading: '浏览器扩展：从页面元素定位到源码',
      markdown:
        '选中页面元素后，通过 **React Fiber 树分析 + CDN bundle 匹配 + 置信度排序**，精确定位到源码仓库与卡片组件；支持 XSpace／Alicare／Help Center／Service Hall 多平台识别。',
    },
    {
      type: 'prose',
      heading: 'CDN 一键代理：线上资源指向本地',
      markdown:
        '基于 `declarativeNetRequest`，将线上 CDN 资源代理到本地开发服务器，剥离 CSP、注入 CORS，支持**正则、目录、精确文件**三种模式；Agent 回复中可自动检测 CDN marker 建立代理，让「本地复现」这一步不再靠手工配置。',
    },
    {
      type: 'prose',
      heading: 'Claude 客户端定制：把 AI 嵌进工作台',
      markdown:
        'fork 开源 Claude Code 客户端做 iframe 嵌入适配——跳过 cookie auth、放行 chrome-extension／agent sandbox origin、修复 SPA CSP——作为 Agent 宿主发布为公司内 tnpm 包。',
    },
    {
      type: 'prose',
      heading: '领域知识 Skill：给 Agent 注入工程上下文',
      markdown:
        '编写 XSpace／AlimeBot 领域知识 Skill 与前端开发套件，给 Agent 注入架构、开发指南、踩坑等工程上下文，沉淀为团队的 AI 辅助开发基建。',
    },
    {
      type: 'prose',
      heading: '效果',
      markdown:
        '这套工具链将代码定位从人工翻仓库缩短到**分钟级**，并打通了从页面元素到 AI 自动改代码的完整链路：开发者在页面上选中一个元素，就能定位到对应仓库、把线上资源代理到本地，再交给嵌入工作台的 AI 完成修改。',
    },
    {
      type: 'prose',
      markdown:
        '> 该工具链为公司内部工程，不开源。本页内容仅限公开简历描述层面，不涉及内部实现细节。',
    },
  ],
}

export default project

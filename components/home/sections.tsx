import Link from 'next/link'

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display mt-2 text-3xl text-ink sm:text-4xl">{title}</h2>
    </div>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="display text-lg text-ink">
          吴健
        </Link>
        <nav className="flex items-center gap-6 text-sm text-ink-soft">
          <a href="/#projects" className="transition-colors hover:text-accent">
            作品
          </a>
          <a href="/#experience" className="transition-colors hover:text-accent">
            经历
          </a>
          <a href="/#contact" className="transition-colors hover:text-accent">
            联系
          </a>
        </nav>
      </div>
    </header>
  )
}

const PROJECT_CARDS = [
  {
    slug: 'utanote',
    name: 'UtaNote',
    kicker: 'WECHAT MINI PROGRAM',
    oneLiner: '用日语歌学日语的微信小程序。LLM 解析管线 + 自托管 TTS,独立设计开发、个人主体过审、服务真实用户。',
    detail: '四个来自真实线上事故的工程故事:重建校验、槽位对齐降级、内容寻址双层缓存、fail-closed 合规。',
    tags: ['LLM 管线', 'TTS 成本工程', '内容安全'],
    featured: true,
  },
  {
    slug: 'remi',
    name: 'Remi',
    kicker: 'AI COMPANION',
    oneLiner: '实时 AI 陪伴系统:双脑架构、流式语音全链路、pgvector 长期记忆,四端共享一套 WebSocket 协议。',
    detail: '',
    tags: ['实时语音', '长期记忆', '多端'],
    featured: false,
  },
  {
    slug: 'pageagent',
    name: 'PageAgent',
    kicker: 'DEVTOOLS',
    oneLiner: '在阿里自研的 AI 辅助定位与调试工具链:从页面元素定位到源码仓库,打通「定位 → 本地复现 → AI 改代码」。',
    detail: '',
    tags: ['浏览器扩展', 'React Fiber', '研发效能'],
    featured: false,
  },
]

export function ProjectsSection() {
  const featured = PROJECT_CARDS.find((p) => p.featured)!
  const rest = PROJECT_CARDS.filter((p) => !p.featured)

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <SectionHeading eyebrow="SELECTED WORKS" title="作品" />
      <div className="grid gap-6">
        <Link
          href={`/projects/${featured.slug}`}
          className="group rounded-2xl border border-line bg-white p-8 transition-all hover:border-accent hover:shadow-[0_8px_40px_rgba(13,125,112,0.1)] sm:p-10"
        >
          <p className="eyebrow">{featured.kicker}</p>
          <h3 className="display mt-3 text-3xl text-ink transition-colors group-hover:text-accent sm:text-4xl">
            {featured.name}
          </h3>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink">
            {featured.oneLiner}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {featured.detail}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {featured.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-surface px-3 py-1 text-xs text-ink-soft"
              >
                {t}
              </span>
            ))}
            <span className="ml-auto text-sm font-medium text-accent">
              读工程故事 →
            </span>
          </div>
        </Link>
        <div className="grid gap-6 sm:grid-cols-2">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group rounded-2xl border border-line bg-white p-7 transition-all hover:border-accent hover:shadow-[0_8px_40px_rgba(13,125,112,0.1)]"
            >
              <p className="eyebrow">{p.kicker}</p>
              <h3 className="display mt-3 text-2xl text-ink transition-colors group-hover:text-accent">
                {p.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {p.oneLiner}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-surface px-3 py-1 text-xs text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

const EXPERIENCE = [
  {
    period: '2024.11 — 至今',
    org: '阿里国际数字商业集团 · 客服域',
    body: '服务 AliExpress、Lazada、Alibaba.com 的跨境客服场景:客服 IM 工作台与业务卡片、知识库与智能问答、客服 Agent 平台与 SOP 自动化、运营后台。日常横跨数十个前端仓库,并自研 PageAgent 工具链与子应用脚手架 CLI(已发布 npm)。',
  },
  {
    period: '2021.02 — 2024.11',
    org: '阿里云 · 云效 Codeup / Quick BI',
    body: 'Codeup 代码托管平台:仓库管理、研发流程配置、权限控制等多角色 B 端场景。Quick BI 低代码商业智能:报表配置、图表联动,虚拟滚动 + 懒加载支撑万级行渲染,基于 Lighthouse 做首屏优化。',
  },
  {
    period: '业余 · 持续',
    org: '独立产品',
    body: 'UtaNote(微信小程序,已上线)与 Remi(ai.remi.run)。从产品设计到后端部署全链路一人负责——上面「作品」区就是它们的工程复盘。',
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="border-y border-line bg-surface/50">
      <div className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <SectionHeading eyebrow="EXPERIENCE" title="经历" />
        <div className="grid gap-10">
          {EXPERIENCE.map((e) => (
            <div key={e.period} className="grid gap-2 sm:grid-cols-[200px_1fr] sm:gap-8">
              <p className="pt-0.5 font-mono text-sm tracking-wide text-ink-soft">
                {e.period}
              </p>
              <div>
                <h3 className="text-lg font-semibold text-ink">{e.org}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
                  {e.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TOOLKIT = [
  {
    name: 'IM 卡片 Claude Skill',
    body: '从自然语言或 Figma 设计稿自动生成客服 IM 卡片组件,覆盖模板创建、分支管理、代码推送全流程(aidc-me-card-cli,已发布)。',
  },
  {
    name: 'CloudCLI MCP Server',
    body: '让本地 Claude Code 直接创建和管理远程沙箱环境的 MCP Server(Node.js stdio)。',
  },
  {
    name: 'Figma D2C 工具',
    body: '设计稿转代码工具,集成 MCP 服务,实现设计稿到代码仓库的自动化链路。',
  },
]

export function ToolkitSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="AI TOOLING" title="不止用 AI,也造 AI 工具" />
      <div className="grid gap-6 sm:grid-cols-3">
        {TOOLKIT.map((t) => (
          <div key={t.name} className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-semibold text-ink">{t.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const SKILLS = [
  {
    group: '前端',
    items: 'React · Vue · TypeScript · Next.js · WebSocket · 微前端 · 组件库建设',
  },
  {
    group: '工程化',
    items: 'Webpack · Vite · Rollup · monorepo · 构建优化 · 多仓库协作',
  },
  {
    group: 'AI 应用',
    items: 'Prompt Engineering · Agent 工作流 · MCP Server · Claude Skill · STT/TTS/VAD · Embedding · Memory/RAG',
  },
  {
    group: '后端与部署',
    items: 'Node.js · PostgreSQL/pgvector · Docker · 云函数 · JWT',
  },
]

export function SkillsSection() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="CAPABILITIES" title="技术能力" />
        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {SKILLS.map((s) => (
            <div key={s.group} className="grid grid-cols-[96px_1fr] gap-4">
              <p className="pt-0.5 text-sm font-semibold text-ink">{s.group}</p>
              <p className="text-sm leading-relaxed text-ink-soft">{s.items}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-line bg-ink text-white">
      <div className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <p className="eyebrow">CONTACT</p>
        <h2 className="display mt-2 text-3xl sm:text-4xl">聊聊?</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
          想深入了解任何项目细节,右下角的 AI 助手随时在线;想直接联系本人:
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
          <a
            href="mailto:nsiwsywaml@gmail.com"
            className="rounded-full bg-white px-5 py-2.5 font-medium text-ink transition-opacity hover:opacity-90"
          >
            nsiwsywaml@gmail.com
          </a>
          <a
            href="https://github.com/jane-uske"
            target="_blank"
            rel="noreferrer"
            className="text-white/70 underline underline-offset-4 transition-colors hover:text-white"
          >
            github.com/jane-uske ↗
          </a>
        </div>
        <p className="mt-16 border-t border-white/15 pt-6 font-mono text-xs tracking-wide text-white/40">
          此站由 Next.js + Vercel AI SDK 构建,聊天由 LLM 全文注入驱动——问 AI「这个网站怎么做的」可以看设计说明。
        </p>
      </div>
    </section>
  )
}

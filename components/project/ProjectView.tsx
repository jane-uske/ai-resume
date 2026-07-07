import Link from 'next/link'
import type { Block, Project, StoryBlock } from '@/content/project-types'
import { Markdown } from '../Markdown'
import { AskAiButton } from './AskAiButton'

function Story({ story }: { story: StoryBlock }) {
  return (
    <article className="border-t border-line py-12 first:border-t-0">
      <p className="eyebrow">STORY {String(story.index).padStart(2, '0')}</p>
      <h2 className="display mt-3 text-2xl text-ink sm:text-3xl">{story.title}</h2>

      <div className="mt-8 grid gap-8">
        <div>
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-ink-soft">
            问题
          </h3>
          <Markdown>{story.problem}</Markdown>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-ink-soft">
            方案
          </h3>
          <Markdown>{story.solution}</Markdown>
        </div>
        {story.outcome && (
          <div className="rounded-2xl bg-accent-soft px-6 py-5">
            <h3 className="mb-2 text-sm font-semibold tracking-wide text-accent">
              结果
            </h3>
            <Markdown>{story.outcome}</Markdown>
          </div>
        )}
      </div>

      {story.qa.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-4 text-sm font-semibold tracking-wide text-ink-soft">
            设计权衡 Q&A
          </h3>
          <div className="grid gap-3">
            {story.qa.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-line bg-card open:border-accent/40"
              >
                <summary className="cursor-pointer list-none px-5 py-4 text-[15px] font-medium text-ink transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  <span className="mr-2 font-mono text-xs text-accent">Q</span>
                  {item.q}
                </summary>
                <div className="border-t border-line px-5 py-4">
                  <Markdown>{item.a}</Markdown>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {story.askAi && <AskAiButton question={story.askAi} />}
    </article>
  )
}

function BlockView({ block }: { block: Block }) {
  if (block.type === 'story') return <Story story={block} />
  return (
    <section className="border-t border-line py-12 first:border-t-0">
      {block.heading && (
        <h2 className="display mb-6 text-2xl text-ink sm:text-3xl">
          {block.heading}
        </h2>
      )}
      <Markdown>{block.markdown}</Markdown>
    </section>
  )
}

export function ProjectView({ project }: { project: Project }) {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24">
      <div className="pb-4 pt-10">
        <Link
          href="/#projects"
          className="text-sm text-ink-soft transition-colors hover:text-accent"
        >
          ← 全部作品
        </Link>
      </div>

      <header className="pb-12">
        <p className="eyebrow">{project.kicker}</p>
        <h1 className="display mt-3 text-4xl text-ink sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink">
          {project.oneLiner}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-surface px-3 py-1 text-xs text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
        {project.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-4">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-accent underline underline-offset-4"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
        <div className="mt-8 rounded-2xl border border-line bg-card px-6 py-5">
          <Markdown>{project.intro}</Markdown>
        </div>
      </header>

      {project.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </main>
  )
}

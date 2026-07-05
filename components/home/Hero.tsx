'use client'

import { useChatWidget } from '../chat-context'
import { SUGGESTED_QUESTIONS } from '../chat/SuggestedChips'

// Hero 的主角不是头像,是一段"预演对话":
// 访客一进来就看到这份简历在说话,点任何一处都会接到真的 AI 对话上。
export function Hero() {
  const { openChat, openChatWith } = useChatWidget()

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-24">
      <div className="flex flex-col justify-center">
        <p className="eyebrow">FRONTEND × AI ENGINEER</p>
        <h1 className="display mt-4 text-5xl text-ink sm:text-6xl lg:text-7xl">
          吴健
        </h1>
        <p className="display mt-3 text-2xl text-ink sm:text-3xl">
          前端工程师 <span className="text-accent">/</span> AI 应用前端
        </p>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
          5 年前端经验,现于阿里国际做客服域前端与 Agent 平台;业余独立上线了两个
          AI 产品。这个网站本身也是一件作品——它内嵌了一个 AI
          助手,我的经历和项目,你可以直接问它。
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="rounded-full border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
          >
            看作品
          </a>
          <a
            href="https://github.com/jane-uske"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-ink-soft underline underline-offset-4 transition-colors hover:text-accent"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      {/* 预演对话卡:客服 IM 工作台的质感 */}
      <div className="rounded-2xl border border-line bg-white shadow-[0_8px_40px_rgba(13,125,112,0.08)]">
        <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <p className="text-sm font-semibold">AI 简历助手</p>
          <p className="ml-auto font-mono text-[11px] tracking-wider text-ink-soft">
            ONLINE
          </p>
        </div>
        <div className="space-y-3 px-5 py-5">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => openChatWith('吴健是谁?用三句话介绍他。')}
              className="max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-left text-sm leading-relaxed text-white transition-transform hover:scale-[1.02]"
            >
              吴健是谁?用三句话介绍他。
            </button>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 text-sm leading-relaxed text-ink">
              一位把「简历」做成 AI 应用的前端工程师。白天在阿里国际写客服 IM
              工作台和 Agent 平台,晚上独立造了 UtaNote 和 Remi
              两个上线产品。想验证这句话?下面随便挑一个问题。
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => openChatWith(q)}
                className="rounded-full border border-line bg-white px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-accent hover:text-accent"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={openChat}
          className="flex w-full items-center gap-2 rounded-b-2xl border-t border-line px-5 py-3.5 text-left text-sm text-ink-soft transition-colors hover:bg-surface"
        >
          <span className="flex-1">继续问下去…</span>
          <span className="rounded-lg bg-accent px-3 py-1 text-xs font-medium text-white">
            开聊
          </span>
        </button>
      </div>
    </section>
  )
}

'use client'

import { useChatWidget } from '../chat-context'

export function AskAiButton({ question }: { question: string }) {
  const { openChatWith } = useChatWidget()
  return (
    <button
      type="button"
      onClick={() => openChatWith(question)}
      className="group mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent"
    >
      <span className="relative flex h-2 w-2">
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      就这个问 AI:「{question}」
    </button>
  )
}

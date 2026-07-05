'use client'

export const SUGGESTED_QUESTIONS = [
  '他在阿里做过什么 Agent 相关的工作?',
  'UtaNote 的 TTS 成本是怎么控制的?',
  '这个简历站本身是怎么实现的?为什么不做 RAG?',
]

export function SuggestedChips({
  onPick,
  className = '',
}: {
  onPick: (question: string) => void
  className?: string
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {SUGGESTED_QUESTIONS.map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => onPick(q)}
          className="rounded-full border border-line bg-white px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-accent hover:text-accent"
        >
          {q}
        </button>
      ))}
    </div>
  )
}

'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useChat } from '@ai-sdk/react'
import { useChatWidget } from '../chat-context'
import { MessageBubble } from './MessageBubble'
import { SuggestedChips } from './SuggestedChips'

const RATE_LIMIT_HINT =
  '今天聊得有点多啦,想深入了解的话直接发邮件给他吧:nsiwsywaml@gmail.com'
const GENERIC_ERROR_HINT = '出了点小状况,请稍后再试;着急的话发邮件:nsiwsywaml@gmail.com'

export function ChatPanel() {
  const { pendingQuestion, consumePending } = useChatWidget()
  const { messages, sendMessage, status, error } = useChat()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const busy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    if (pendingQuestion && !busy) {
      sendMessage({ text: pendingQuestion })
      consumePending()
    }
  }, [pendingQuestion, busy, sendMessage, consumePending])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, status])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || busy) return
    sendMessage({ text })
    setInput('')
  }

  const errorHint = error
    ? error.message.includes('rate_limited')
      ? RATE_LIMIT_HINT
      : GENERIC_ERROR_HINT
    : null

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="space-y-4 pt-2">
            <p className="text-sm leading-relaxed text-ink-soft">
              你好!我是吴健的简历助手,他的经历、项目、技术决策都可以问我——比如:
            </p>
            <SuggestedChips onPick={(q) => sendMessage({ text: q })} />
          </div>
        )}
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {status === 'submitted' && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 text-sm text-ink-soft">
              <span className="animate-pulse">思考中…</span>
            </div>
          </div>
        )}
        {errorHint && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
            {errorHint}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-line p-3">
        <div className="flex items-end gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="问点什么…"
            maxLength={2000}
            className="min-w-0 flex-1 rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-ink-soft focus:border-accent"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="shrink-0 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink transition-opacity disabled:opacity-40"
          >
            发送
          </button>
        </div>
      </form>
    </div>
  )
}

'use client'

import ReactMarkdown from 'react-markdown'
import type { UIMessage } from 'ai'

function textOf(message: UIMessage): string {
  return message.parts
    .map((part) => (part.type === 'text' ? part.text : ''))
    .join('')
}

export function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user'
  const text = textOf(message)
  if (!text) return null

  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          isUser
            ? 'max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-sm leading-relaxed text-white'
            : 'max-w-[85%] rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 text-sm leading-relaxed text-ink'
        }
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{text}</p>
        ) : (
          <div className="chat-markdown">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

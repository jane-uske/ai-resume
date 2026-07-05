'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

// 聊天窗挂在根 layout 常驻不卸载(跨页面保留对话);
// 任何页面(如 case study 的「就这个问 AI」按钮)通过 openChatWith 预填问题并打开。
type ChatWidgetContextValue = {
  open: boolean
  pendingQuestion: string | null
  openChat: () => void
  closeChat: () => void
  openChatWith: (question: string) => void
  consumePending: () => void
}

const ChatWidgetContext = createContext<ChatWidgetContextValue | null>(null)

export function ChatWidgetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null)

  const openChat = useCallback(() => setOpen(true), [])
  const closeChat = useCallback(() => setOpen(false), [])
  const openChatWith = useCallback((question: string) => {
    setPendingQuestion(question)
    setOpen(true)
  }, [])
  const consumePending = useCallback(() => setPendingQuestion(null), [])

  return (
    <ChatWidgetContext.Provider
      value={{ open, pendingQuestion, openChat, closeChat, openChatWith, consumePending }}
    >
      {children}
    </ChatWidgetContext.Provider>
  )
}

export function useChatWidget(): ChatWidgetContextValue {
  const ctx = useContext(ChatWidgetContext)
  if (!ctx) throw new Error('useChatWidget must be used within ChatWidgetProvider')
  return ctx
}

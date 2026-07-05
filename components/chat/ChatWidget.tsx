'use client'

import { useChatWidget } from '../chat-context'
import { ChatPanel } from './ChatPanel'

// IM 式悬浮窗:桌面右下角面板,移动端全屏抽屉。
// 面板用 CSS 隐藏而不是条件卸载,跨页面浏览时对话状态不丢。
export function ChatWidget() {
  const { open, openChat, closeChat } = useChatWidget()

  return (
    <>
      <div
        className={
          open
            ? 'fixed inset-0 z-50 flex flex-col bg-white sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[calc(100dvh-3rem)] sm:w-[400px] sm:rounded-2xl sm:border sm:border-line sm:shadow-2xl'
            : 'hidden'
        }
        role="dialog"
        aria-label="AI 简历助手"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">AI 简历助手</p>
              <p className="text-xs text-ink-soft">基于吴健的简历与项目实录回答</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeChat}
            aria-label="关闭"
            className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-surface"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="min-h-0 flex-1">
          <ChatPanel />
        </div>
      </div>

      {!open && (
        <button
          type="button"
          onClick={openChat}
          aria-label="打开 AI 简历助手"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-accent p-3.5 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 sm:px-5"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="hidden sm:inline">问问我的简历</span>
        </button>
      )}
    </>
  )
}

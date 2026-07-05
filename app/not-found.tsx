import Link from 'next/link'
import { SiteHeader } from '@/components/home/sections'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-6xl flex-col items-start px-6 py-24">
        <p className="eyebrow">404</p>
        <h1 className="display mt-3 text-4xl text-ink">这一页不存在</h1>
        <p className="mt-4 text-sm text-ink-soft">
          页面没找到,不过右下角的 AI 助手还在——想找什么可以直接问它。
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
        >
          回首页
        </Link>
      </main>
    </>
  )
}

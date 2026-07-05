// 把 content/corpus/*.md 拼接生成 lib/corpus.generated.ts。
// 选构建时生成而非运行时 fs.readFile:serverless 打包的文件追踪配置错了要到线上才发现,
// 生成物提交进仓库则完全没有这个失败面。
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const corpusDir = join(root, 'content', 'corpus')
const outFile = join(root, 'lib', 'corpus.generated.ts')

// 发布红线:语料里绝不允许出现的内容。命中即构建失败,而不是靠人肉记得检查。
const REDLINE_PATTERNS = [
  { name: '手机号', re: /1[-.\s]*7[-.\s]*5[-.\s]*2[-.\s]*1[-.\s]*0[-.\s]*7[-.\s]*4[-.\s]*0[-.\s]*1[-.\s]*3/ },
  { name: '内部备忘口吻', re: /反杀|别编|练习安排|待补|追问预案|面试价值/ },
]

const entries = (await readdir(corpusDir)).filter((f) => f.endsWith('.md')).sort()
if (entries.length === 0) {
  console.warn('[build-corpus] content/corpus 为空,生成占位语料')
}

const sections = []
for (const file of entries) {
  const text = (await readFile(join(corpusDir, file), 'utf8')).trim()
  for (const { name, re } of REDLINE_PATTERNS) {
    const m = text.match(re)
    if (m) {
      console.error(`[build-corpus] 红线命中:${file} 含「${name}」(${m[0].slice(0, 20)})`)
      process.exit(1)
    }
  }
  // 01-resume.md → <resume>
  const tag = file.replace(/^\d+-/, '').replace(/\.md$/, '')
  sections.push(`<${tag}>\n${text}\n</${tag}>`)
}

const corpus = sections.join('\n\n') || '(语料尚未生成)'
const bytes = Buffer.byteLength(corpus, 'utf8')
if (bytes > 40 * 1024) {
  console.error(`[build-corpus] 语料 ${(bytes / 1024).toFixed(1)}KB 超出 40KB 预算,先精简再构建`)
  process.exit(1)
}

const banner = '// 由 scripts/build-corpus.mjs 生成,勿手改。源文件:content/corpus/*.md\n'
await writeFile(outFile, `${banner}export const CORPUS = ${JSON.stringify(corpus)};\n`)
console.log(`[build-corpus] ${entries.length} 个文件 → lib/corpus.generated.ts (${(bytes / 1024).toFixed(1)}KB)`)

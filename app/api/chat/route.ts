import { streamText, convertToModelMessages, type UIMessage } from 'ai'
import { createDeepSeek } from '@ai-sdk/deepseek'
import { buildSystemPrompt } from '@/lib/system-prompt'
import { checkRateLimit } from '@/lib/rate-limit'

// DeepSeek API 在国内,函数跑 hkg1 把跨境往返降到最小;
// baseURL/model 走环境变量,供应商不可用时零代码换轨(SiliconFlow/火山方舟同为 OpenAI 兼容)。
export const maxDuration = 60
export const preferredRegion = 'hkg1'

const MAX_MESSAGES = 12
const MAX_USER_CHARS = 2000

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
  ...(process.env.DEEPSEEK_BASE_URL ? { baseURL: process.env.DEEPSEEK_BASE_URL } : {}),
})

function textLength(message: UIMessage): number {
  return message.parts.reduce(
    (sum, part) => sum + (part.type === 'text' ? part.text.length : 0),
    0,
  )
}

export async function POST(req: Request) {
  // Origin 白名单只挡最低端的脚本;真正的成本护栏是限流 + 供应商侧余额封顶
  const allowed = process.env.ALLOWED_ORIGINS?.split(',').map((s) => s.trim()).filter(Boolean)
  const origin = req.headers.get('origin')
  if (allowed?.length && origin && !allowed.includes(origin)) {
    return Response.json({ error: 'forbidden' }, { status: 403 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const limit = await checkRateLimit(ip)
  if (!limit.ok) {
    return Response.json({ error: 'rate_limited', reason: limit.reason }, { status: 429 })
  }

  let messages: UIMessage[]
  try {
    ;({ messages } = (await req.json()) as { messages: UIMessage[] })
    if (!Array.isArray(messages) || messages.length === 0) throw new Error('empty')
  } catch {
    return Response.json({ error: 'bad_request' }, { status: 400 })
  }

  // 不信任客户端:丢 system role、截历史、限单条长度(同时是防注入面和防刷 token 面)
  const safe = messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .slice(-MAX_MESSAGES)
  const last = safe[safe.length - 1]
  if (!last || last.role !== 'user' || textLength(last) > MAX_USER_CHARS) {
    return Response.json({ error: 'bad_request' }, { status: 400 })
  }

  const result = streamText({
    model: deepseek(process.env.DEEPSEEK_MODEL ?? 'deepseek-chat'),
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(safe),
    maxOutputTokens: 1024,
    temperature: 0.5,
  })

  return result.toUIMessageStreamResponse()
}

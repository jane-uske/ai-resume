import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// 三层限额:IP 每分钟(挡连点)、IP 每日(挡单人刷)、全局每日(保 LLM 余额)。
// 全部 fail-open:限流基础设施故障或未配置时放行——限流挂了不该挡住正在看简历的面试官,
// 成本的最终兜底在 LLM 供应商侧的小额余额,不在这里。
const UPSTASH_TIMEOUT_MS = 1000

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null

const perMinute = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(6, '1 m'),
      prefix: 'rl:ip-min',
      timeout: UPSTASH_TIMEOUT_MS,
    })
  : null

const perDay = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(40, '1 d'),
      prefix: 'rl:ip-day',
      timeout: UPSTASH_TIMEOUT_MS,
    })
  : null

const GLOBAL_DAILY_LIMIT = Number(process.env.GLOBAL_DAILY_LIMIT ?? 300)

export type RateLimitResult = { ok: true } | { ok: false; reason: 'ip' | 'global' }

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  if (!redis) return { ok: true }
  try {
    const [minute, day] = await Promise.all([perMinute!.limit(ip), perDay!.limit(ip)])
    if (!minute.success || !day.success) return { ok: false, reason: 'ip' }

    // 全局计数:INCR + 25h TTL(比整日略长,跨时区不精确没关系,这是软限额)
    const dayKey = `rl:global:${new Date().toISOString().slice(0, 10)}`
    const count = await redis.incr(dayKey)
    if (count === 1) await redis.expire(dayKey, 25 * 3600)
    if (count > GLOBAL_DAILY_LIMIT) return { ok: false, reason: 'global' }

    return { ok: true }
  } catch {
    return { ok: true }
  }
}

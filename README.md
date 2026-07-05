# ai-resume — 会说话的简历

吴健的个人作品集站。核心卖点是自指性:**面向 AI 应用前端方向的简历,本身就是一个 AI 应用**——访客(面试官/HR/任何人)可以直接对简历提问,AI 基于简历与项目工程复盘作答,全程流式输出。

## 架构

- **Next.js App Router + TypeScript + Tailwind v4**,部署 Vercel(函数固定 `hkg1` 香港节点,贴近国内访客与 LLM 供应商)
- **聊天链路**:Vercel AI SDK(`streamText` + `useChat`),LLM 为 DeepSeek(OpenAI 兼容,baseURL/model/key 全走环境变量,可零代码换轨)
- **刻意不做 RAG**:全部语料脱敏后仅 30 多 KB,构建时由 `scripts/build-corpus.mjs` 拼接生成 TS 常量、全文注入 system prompt。128k context 之下,向量库/切块/召回每一环都是为海量文档而生的复杂度——语料塞得进上下文时,全文注入是零召回误差、零额外基础设施的更优解
- **构建时红线检查**:语料中出现敏感信息(联系电话等)或内部口吻词,构建直接失败——发布检查靠脚本,不靠人肉记性

## 防滥用(公开免登录的 LLM 接口必被刷)

1. **三层限流**(Upstash Redis + `@upstash/ratelimit`):单 IP 每分钟 / 单 IP 每日 / 全站每日
2. **fail-open**:限流基础设施故障时放行——限流挂了不该挡住正常访客,可用性优先
3. **请求约束**:丢弃客户端 system role、历史最多 12 条、单条 ≤2000 字符
4. **爆炸半径封顶**:LLM 侧使用专用 key + 小额余额,所有防线失效时损失也有硬上限

## 防注入

语料层脱敏是根本——模型不知道的秘密才是安全的秘密;system prompt 仅服务端构造;边界指令兜行为;接受残余风险(即使被攻破也无密可泄)。

## 本地开发

```bash
npm install
cp .env.example .env.local   # 填 DEEPSEEK_API_KEY
npm run dev                  # predev 自动跑 build-corpus
```

语料源在 `content/corpus/*.md`,页面内容在 `content/projects/*.ts`。

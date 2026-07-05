import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// 纯拉丁字母,避开中文字体嵌入——与站点 eyebrow 的英文调性一致
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fcfdfd',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            color: '#0d7d70',
            fontSize: 26,
            letterSpacing: 6,
            fontWeight: 600,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 12, background: '#0d7d70' }} />
          FRONTEND × AI ENGINEER
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 92, fontWeight: 800, color: '#1e2528', letterSpacing: -1 }}>
            WU JIAN
          </div>
          <div style={{ fontSize: 34, color: '#64748b', lineHeight: 1.4, maxWidth: 900 }}>
            A résumé that is itself an AI app — open it and ask.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 24, color: '#64748b' }}>
          <span style={{ background: '#f4f7f7', padding: '10px 22px', borderRadius: 999 }}>
            UtaNote
          </span>
          <span style={{ background: '#f4f7f7', padding: '10px 22px', borderRadius: 999 }}>
            Remi
          </span>
          <span style={{ background: '#f4f7f7', padding: '10px 22px', borderRadius: 999 }}>
            PageAgent
          </span>
          <span style={{ marginLeft: 'auto', color: '#0d7d70', fontWeight: 600 }}>
            cv.remi.run
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}

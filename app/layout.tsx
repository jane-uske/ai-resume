import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ChatWidgetProvider } from "@/components/chat-context";
import { ChatWidget } from "@/components/chat/ChatWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cv.remi.run"),
  title: "吴健 — 前端工程师 / AI 应用前端",
  description:
    "吴健的个人作品集:阿里国际客服域前端、UtaNote、Remi、PageAgent。内嵌 AI 助手,简历可以直接提问。",
  openGraph: {
    title: "吴健 — 前端工程师 / AI 应用前端",
    description:
      "5 年前端经验,阿里国际客服域 + 两个独立上线的 AI 产品。这份简历本身就是一个 AI 应用——打开就能问。",
    url: "https://cv.remi.run",
    siteName: "吴健的简历",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "吴健 — 前端工程师 / AI 应用前端",
    description:
      "5 年前端经验,阿里国际客服域 + 两个独立上线的 AI 产品。这份简历本身就是一个 AI 应用。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ChatWidgetProvider>
          {children}
          <ChatWidget />
        </ChatWidgetProvider>
      </body>
    </html>
  );
}

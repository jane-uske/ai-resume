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
  title: "吴健 — 前端工程师 / AI 应用前端",
  description:
    "吴健的个人作品集:阿里国际客服域前端、UtaNote、Remi、PageAgent。内嵌 AI 助手,简历可以直接提问。",
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

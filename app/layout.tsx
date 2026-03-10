import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI工具导航 - 发现最棒的AI工具',
  description: '收录最优质的AI工具，包括AI写作、AI图像生成、AI视频创作、AI智能对话等，让AI帮你提升工作效率',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

'use client'

import { useState, useEffect, useMemo } from 'react'
import { categories, tools } from '../data/tools'

// 为每个工具分配颜色
const toolColors = [
  'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
  'bg-indigo-500', 'bg-cyan-500', 'bg-rose-500', 'bg-amber-500',
  'bg-teal-500', 'bg-violet-500', 'bg-fuchsia-500', 'bg-sky-500'
]

function getToolColor(index: number) {
  return toolColors[index % toolColors.length]
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 按分类分组
  const toolsByCategory = useMemo(() => {
    const grouped: Record<string, typeof tools> = {}
    categories.forEach(cat => {
      grouped[cat.id] = tools.filter(t => t.category === cat.id)
    })
    return grouped
  }, [])

  // 搜索
  const searchResults = useMemo(() => {
    if (!searchQuery) return null
    return tools.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  // 平滑滚动到分类
  const scrollToCategory = (catId: string) => {
    const element = document.getElementById(`cat-${catId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setActiveCategory(catId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 - 仿aigc.cn */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AIGC
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg leading-tight">AI工具导航</h1>
              <p className="text-xs text-gray-500 hidden sm:block">AIGC公共服务平台</p>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索AI工具..."
                className="w-full h-10 pl-10 pr-4 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* 右侧链接 */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">首页</a>
            <a href="#" className="hover:text-blue-600 transition-colors">活动</a>
            <a href="#" className="hover:text-blue-600 transition-colors">关于</a>
          </nav>
        </div>
      </header>

      {/* 主体布局 */}
      <div className="max-w-7xl mx-auto pt-20 pb-12 px-4 flex gap-6">
        
        {/* 左侧导航 - 固定 */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">工具分类</h3>
            </div>
            <nav className="p-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${
                    activeCategory === cat.id 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="flex-1">AIGC{cat.name}</span>
                  <span className="text-xs text-gray-400">{toolsByCategory[cat.id]?.length}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* 右侧内容区 */}
        <main className="flex-1 min-w-0">
          
          {/* 搜索结果 */}
          {searchQuery && searchResults && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-gray-900">搜索结果</h2>
                <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                  {searchResults.length}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {searchResults.map((tool, idx) => (
                  <ToolCard key={tool.id} tool={tool} color={getToolColor(idx)} />
                ))}
              </div>
              {searchResults.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-2">🔍</div>
                  未找到相关工具
                </div>
              )}
            </div>
          )}

          {/* 分类内容 */}
          {!searchQuery && (
            <div className="space-y-8">
              {categories.map((cat, catIdx) => (
                <section 
                  key={cat.id} 
                  id={`cat-${cat.id}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-24"
                >
                  {/* 分类标题 */}
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">AIGC{cat.name}</h2>
                        <p className="text-xs text-gray-500">{toolsByCategory[cat.id]?.length} 个工具</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => scrollToCategory(cat.id)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      查看全部 →
                    </button>
                  </div>

                  {/* 工具网格 */}
                  <div className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {toolsByCategory[cat.id]?.slice(0, 10).map((tool, idx) => (
                        <ToolCard 
                          key={tool.id} 
                          tool={tool} 
                          color={getToolColor(idx)}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* 底部 */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <span className="font-bold text-gray-900">AI工具导航</span>
          </div>
          <p className="text-sm text-gray-500">© 2024 AIGC工具导航 · aitoolsyun.com</p>
          <p className="text-xs text-gray-400 mt-1">收录优质AI工具，让AI为你工作</p>
        </div>
      </footer>
    </div>
  )
}

// 工具卡片 - 仿aigc.cn风格
function ToolCard({ tool, color }: { tool: typeof tools[0], color: string }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-gray-50 rounded-lg p-3 hover:shadow-md hover:bg-white transition-all border border-transparent hover:border-gray-200"
    >
      <div className="flex flex-col items-center text-center">
        {/* 图标 */}
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white font-bold text-lg mb-2 shadow-sm group-hover:scale-110 transition-transform`}>
          {tool.name.charAt(0)}
        </div>
        
        {/* 名称 */}
        <div className="flex items-center gap-1 mb-1">
          <h3 className="font-medium text-gray-900 text-sm truncate max-w-[80px] group-hover:text-blue-600 transition-colors">
            {tool.name}
          </h3>
          {tool.hot && (
            <span className="flex-shrink-0 w-4 h-4 bg-red-500 rounded text-white text-[8px] flex items-center justify-center font-bold">
              H
            </span>
          )}
        </div>
        
        {/* 描述 */}
        <p className="text-xs text-gray-500 line-clamp-2 h-8">
          {tool.description}
        </p>
      </div>
    </a>
  )
}

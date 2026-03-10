'use client'

import { useState, useMemo } from 'react'
import { categories, tools } from '../data/tools'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // 按分类分组工具
  const toolsByCategory = useMemo(() => {
    const grouped: Record<string, typeof tools> = {}
    categories.forEach(cat => {
      grouped[cat.id] = tools.filter(t => t.category === cat.id)
    })
    return grouped
  }, [])

  const filteredTools = useMemo(() => {
    if (activeCategory === 'all') return tools
    return tools.filter(t => t.category === activeCategory)
  }, [activeCategory])

  const searchResults = useMemo(() => {
    if (!searchQuery) return null
    return tools.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [searchQuery])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <span className="font-bold text-gray-800 text-sm sm:text-base hidden sm:block">AI工具导航</span>
            </div>
            
            {/* 搜索框 */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索AI工具..."
                  className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* 分类标签 */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded text-sm whitespace-nowrap ${activeCategory === 'all' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                全部
              </button>
              {categories.slice(0, 6).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded text-sm whitespace-nowrap ${activeCategory === cat.id ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* 移动端分类 */}
          <div className="lg:hidden mt-3 flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded text-sm whitespace-nowrap ${activeCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              全部
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded text-sm whitespace-nowrap ${activeCategory === cat.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 搜索结果 */}
      {searchResults && (
        <section className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">搜索结果 ({searchResults.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {searchResults.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          {searchResults.length === 0 && (
            <p className="text-gray-500 text-center py-8">没有找到相关工具</p>
          )}
        </section>
      )}

      {/* 主要内容 */}
      {!searchResults && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          {activeCategory === 'all' ? (
            // 全部分类：按区块展示
            <div className="space-y-8">
              {categories.map(cat => (
                <section key={cat.id}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-xl">{cat.icon}</span>
                      {cat.name}
                      <span className="text-sm font-normal text-gray-400">({toolsByCategory[cat.id]?.length || 0})</span>
                    </h2>
                    <button
                      onClick={() => setActiveCategory(cat.id)}
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      查看更多 →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                    {toolsByCategory[cat.id]?.slice(0, 6).map(tool => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            // 单个分类：展示该分类所有工具
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-xl">{categories.find(c => c.id === activeCategory)?.icon}</span>
                  {categories.find(c => c.id === activeCategory)?.name}
                  <span className="text-sm font-normal text-gray-400">({filteredTools.length})</span>
                </h2>
                <button
                  onClick={() => setActiveCategory('all')}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← 返回全部
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {filteredTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* 底部 */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2024 AI工具导航 · aitoolsyun.com</p>
          <p className="mt-1 text-xs text-gray-400">收录优质AI工具，让AI为你工作</p>
        </div>
      </footer>
    </main>
  )
}

// 工具卡片组件
function ToolCard({ tool }: { tool: typeof tools[0] }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-2">
        {/* 图标 */}
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:scale-105 transition-transform">
          {tool.name.charAt(0)}
        </div>
        {/* 内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h3 className="font-medium text-gray-800 text-sm truncate group-hover:text-blue-600">
              {tool.name}
            </h3>
            {tool.hot && (
              <span className="px-1 py-0.5 bg-red-500 text-white text-[10px] rounded flex-shrink-0">HOT</span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{tool.description}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {tool.tags.slice(0, 2).map(tag => (
              <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { categories, tools } from '../data/tools'

// 图标渐变配色
const iconGradients = [
  'icon-gradient-1', 'icon-gradient-2', 'icon-gradient-3', 'icon-gradient-4',
  'icon-gradient-5', 'icon-gradient-6', 'icon-gradient-7', 'icon-gradient-8'
]

function getGradient(index: number) {
  return iconGradients[index % iconGradients.length]
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

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
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [searchQuery])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                AI
              </div>
              <div>
                <h1 className="font-bold text-xl gradient-text">AI工具导航</h1>
                <p className="text-xs text-gray-500 hidden sm:block">发现最棒的AI工具</p>
              </div>
            </div>
            
            {/* 搜索 */}
            <div className="search-box flex-1 w-full sm:max-w-md">
              <svg className="search-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索AI工具..."
                className="search-input"
              />
            </div>
          </div>

          {/* 分类导航 */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
            >
              全部
            </button>
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-btn flex items-center gap-2 ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 搜索结果 */}
      {searchQuery && searchResults && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-gray-900">搜索结果</h2>
            <span className="category-count">{searchResults.length}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {searchResults.map((tool, idx) => (
              <ToolCard key={tool.id} tool={tool} index={idx} />
            ))}
          </div>
          {searchResults.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <p className="empty-text">没有找到相关工具</p>
            </div>
          )}
        </section>
      )}

      {/* 主要内容 */}
      {!searchQuery && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeCategory === 'all' ? (
            // 全部分类
            <div className="space-y-12">
              {categories.map((cat, catIdx) => (
                <section key={cat.id} className="animate-fade-in" style={{ animationDelay: `${catIdx * 0.1}s` }}>
                  <div className="category-header">
                    <div className="category-icon">{cat.icon}</div>
                    <h2 className="category-title">{cat.name}</h2>
                    <span className="category-count">{toolsByCategory[cat.id]?.length || 0}</span>
                    <button
                      onClick={() => setActiveCategory(cat.id)}
                      className="ml-auto text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      查看全部 →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {toolsByCategory[cat.id]?.slice(0, 6).map((tool, idx) => (
                      <ToolCard key={tool.id} tool={tool} index={idx} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            // 单个分类
            <section>
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setActiveCategory('all')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="category-icon">{categories.find(c => c.id === activeCategory)?.icon}</div>
                <h2 className="category-title">{categories.find(c => c.id === activeCategory)?.name}</h2>
                <span className="category-count">
                  {tools.filter(t => t.category === activeCategory).length}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {tools.filter(t => t.category === activeCategory).map((tool, idx) => (
                  <ToolCard key={tool.id} tool={tool} index={idx} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="footer py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <span className="font-bold gradient-text">AI工具导航</span>
          </div>
          <p className="text-sm text-gray-500">© 2024 收录优质AI工具 · aitoolsyun.com</p>
          <p className="text-xs text-gray-400 mt-1">让AI为你工作</p>
        </div>
      </footer>
    </main>
  )
}

// 工具卡片
function ToolCard({ tool, index }: { tool: typeof tools[0], index: number }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="tool-card group block"
    >
      <div className="flex items-start gap-3">
        {/* 图标 */}
        <div className={`icon-box ${getGradient(index)} flex-shrink-0 shadow-md`}>
          {tool.name.charAt(0)}
        </div>
        
        {/* 内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-indigo-600 transition-colors">
              {tool.name}
            </h3>
            {tool.hot && <span className="hot-badge flex-shrink-0">HOT</span>}
          </div>
          <p className="text-xs text-gray-500 line-clamp-2 mb-2 min-h-[32px]">
            {tool.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {tool.tags.slice(0, 2).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}

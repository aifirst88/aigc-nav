'use client'

import { useState, useMemo } from 'react'
import { categories, tools } from '../data/tools'
import ToolCard from '../components/ToolCard'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = searchQuery === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory])

  const hotTools = useMemo(() => tools.filter(t => t.hot).slice(0, 6), [])

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* 扫描线效果 */}
      <div className="scan-line" />
      
      {/* 网格背景 */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white text-lg sm:text-xl font-bold pulse-glow">
                AI
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">
                  <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent neon-text">
                    AI工具导航
                  </span>
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">发现最棒的AI工具</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm text-gray-300 hover:text-cyan-400 transition-colors">首页</a>
              <a href="#" className="text-sm text-gray-300 hover:text-cyan-400 transition-colors">分类</a>
              <a href="#" className="text-sm text-gray-300 hover:text-cyan-400 transition-colors">关于</a>
            </nav>
            {/* 移动端菜单按钮 */}
            <button className="md:hidden p-2 text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-white">探索</span>{' '}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent neon-text">
              AI
            </span>{' '}
            <span className="text-white">的无限可能</span>
          </h2>
          <p className="text-sm sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            收录 100+ 优质AI工具，覆盖写作、绘画、视频、编程等领域
          </p>
          
          {/* Search Box */}
          <div className="relative max-w-xl sm:max-w-2xl mx-auto px-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索工具、功能或关键词..."
                className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-12 sm:pl-14 text-white cyber-input rounded-2xl text-sm sm:text-base"
              />
              <svg
                className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-violet-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 sm:py-8 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <button
              onClick={() => setActiveCategory('all')}
              className={`category-btn text-xs sm:text-sm ${activeCategory === 'all' ? 'active' : ''}`}
            >
              全部
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-btn text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-white">
              {activeCategory === 'all' ? '全部工具' : categories.find(c => c.id === activeCategory)?.name}
              <span className="ml-2 text-xs sm:text-sm font-normal text-gray-500">({filteredTools.length})</span>
            </h3>
          </div>

          {/* Grid - 响应式列数 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="text-4xl sm:text-6xl mb-4">🔍</div>
              <p className="text-gray-400 text-sm sm:text-base">没有找到匹配的工具</p>
            </div>
          )}
        </div>
      </section>

      {/* Hot Tools Section */}
      {searchQuery === '' && activeCategory === 'all' && (
        <section className="py-8 sm:py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <span className="text-red-500 animate-pulse">🔥</span>
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                热门推荐
              </span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
              {hotTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-6 sm:py-8 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2024 <span className="text-violet-400">AI工具导航</span> · 收录优质AI工具 · 让AI为你工作
          </p>
          <div className="mt-4 flex justify-center gap-4 text-xs text-gray-600">
            <span>香港服务器部署</span>
            <span>|</span>
            <span>aitoolsyun.com</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

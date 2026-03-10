'use client'

import { Tool } from '../data/tools'

interface ToolCardProps {
  tool: Tool
  compact?: boolean
}

export default function ToolCard({ tool, compact = false }: ToolCardProps) {
  if (compact) {
    return (
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block cyber-card rounded-xl p-3 sm:p-4"
      >
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-violet-600/30 to-cyan-500/30 flex items-center justify-center text-base sm:text-lg font-bold text-white border border-violet-500/30 group-hover:border-cyan-400/50 transition-colors mb-2 sm:mb-3">
            {tool.name.charAt(0)}
          </div>
          
          {/* Content */}
          <div className="w-full">
            <div className="flex items-center justify-center gap-1 mb-1">
              <h4 className="font-semibold text-white text-xs sm:text-sm truncate group-hover:text-cyan-400 transition-colors">
                {tool.name}
              </h4>
              {tool.hot && (
                <span className="hot-tag">HOT</span>
              )}
            </div>
            <p className="text-xs text-gray-400 line-clamp-1 hidden sm:block">
              {tool.description}
            </p>
          </div>
        </div>
      </a>
    )
  }

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block cyber-card rounded-xl p-3 sm:p-4"
    >
      <div className="flex items-start gap-2 sm:gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-violet-600/30 to-cyan-500/30 flex items-center justify-center text-base sm:text-lg font-bold text-white border border-violet-500/30 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all">
          {tool.name.charAt(0)}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
            <h4 className="font-semibold text-white text-sm sm:text-base truncate group-hover:text-cyan-400 transition-colors">
              {tool.name}
            </h4>
            {tool.hot && (
              <span className="hot-tag flex-shrink-0">HOT</span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 mb-1.5 sm:mb-2">
            {tool.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {tool.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="cyber-tag text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Arrow */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
          <svg
            className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
    </a>
  )
}

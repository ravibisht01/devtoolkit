'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import ToolCard from '@/components/common/ToolCard'
import { TOOLS, TOOL_CATEGORIES, getToolsByCategory, searchTools, type ToolCategory } from '@/constants/tools'

export default function AllToolsClient() {
  const [query, setQuery]               = useState('')
  const [activeCategory, setActiveCategory] = useState<'All' | ToolCategory>('All')

  const categories = ['All', ...Object.values(TOOL_CATEGORIES)] as const
  const filtered   = query.trim()
    ? searchTools(query)
    : activeCategory === 'All' ? TOOLS : getToolsByCategory(activeCategory as ToolCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold text-white mb-3">All Tools</h1>
        <p className="text-slate-500 text-sm">{TOOLS.length} free developer tools — no signup required</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="text" placeholder="Search tools…" value={query} onChange={e => setQuery(e.target.value)} className="input-base pl-9" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat as typeof activeCategory); setQuery('') }}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                activeCategory === cat && !query
                  ? 'bg-brand-500/10 border-brand-500/30 text-brand-400'
                  : 'border-surface-border text-slate-500 hover:text-white hover:border-slate-500'
              }`}
            >{cat}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((tool, i) => <ToolCard key={tool.id} tool={tool} index={i} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg">No tools found for "{query}"</p>
        </div>
      )}
    </div>
  )
}

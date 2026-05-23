'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { TOOL_CATEGORIES, getToolsByCategory, type ToolCategory } from '@/constants/tools'

function CategorySection({ category, currentSlug }: { category: ToolCategory; currentSlug: string }) {
  const tools = getToolsByCategory(category)
  const isActive = tools.some(t => t.slug === currentSlug)
  const [open, setOpen] = useState(isActive)

  if (tools.length === 0) return null

  return (
    <div>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
      >
        {category}
        {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>
      {open && (
        <ul>
          {tools.map(tool => (
            <li key={tool.id}>
              <Link
                href={tool.slug}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                  tool.slug === currentSlug
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                    : 'text-slate-500 hover:text-white hover:bg-surface-hover'
                }`}
              >
                <span className="text-xs font-mono w-6 opacity-60">{tool.icon}</span>
                {tool.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function ToolsSidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden lg:flex flex-col w-56 xl:w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-surface-border bg-surface-card/30 px-3 py-6 gap-2">
      {(Object.values(TOOL_CATEGORIES) as ToolCategory[]).map(cat => (
        <CategorySection key={cat} category={cat} currentSlug={pathname} />
      ))}
    </aside>
  )
}

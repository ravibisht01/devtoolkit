import Link from 'next/link'
import { ArrowRight, Flame, Sparkles } from 'lucide-react'
import type { Tool } from '@/constants/tools'

interface Props { tool: Tool; index?: number }

export default function ToolCard({ tool }: Props) {
  return (
    <Link href={tool.slug} className="tool-card group flex flex-col gap-4 h-full">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.iconBg} border border-white/5 flex items-center justify-center flex-shrink-0`}>
          <span className={`text-xs font-mono font-bold ${tool.iconColor}`}>{tool.icon}</span>
        </div>
        <div className="flex gap-1 flex-wrap justify-end">
          {tool.trending && (
            <span className="badge bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Flame className="w-3 h-3" /> Hot
            </span>
          )}
          {tool.isNew && (
            <span className="badge bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Sparkles className="w-3 h-3" /> New
            </span>
          )}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-brand-300 transition-colors">{tool.name}</h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{tool.shortDescription}</p>
      </div>
      <div className="flex items-center gap-1 text-xs text-slate-600 group-hover:text-brand-400 transition-colors">
        <span>Open tool</span>
        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  )
}

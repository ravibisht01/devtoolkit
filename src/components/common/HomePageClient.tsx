'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Zap, ArrowRight, Flame, Sparkles } from 'lucide-react'
import ToolCard from '@/components/common/ToolCard'
import {
  TOOLS, TOOL_CATEGORIES,
  getPopularTools, getTrendingTools, getToolsByCategory, searchTools,
  type ToolCategory,
} from '@/constants/tools'

export default function HomePageClient() {
  const [query, setQuery]               = useState('')
  const [activeCategory, setActiveCategory] = useState<'All' | ToolCategory>('All')

  const popularTools  = getPopularTools(8)
  const trendingTools = getTrendingTools(6)
  const categories    = ['All', ...Object.values(TOOL_CATEGORIES)] as const

  const filtered = query.trim()
    ? searchTools(query)
    : activeCategory === 'All'
      ? TOOLS
      : getToolsByCategory(activeCategory as ToolCategory)

  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative grid-bg py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-6"
          >
            <Zap className="w-3.5 h-3.5" />
            {TOOLS.length}+ free tools for developers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Developer{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-cyan-400">
              Toolkit
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg mb-10 max-w-xl mx-auto"
          >
            Free, fast, and privacy-first online tools. No login. Works offline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="relative max-w-lg mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text" placeholder="Search tools — JSON, Base64, UUID…"
              value={query} onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-surface-card border border-surface-border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20 shadow-card transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* ── POPULAR ──────────────────────────────────── */}
      {!query && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title flex items-center gap-2"><Flame className="w-5 h-5 text-orange-400" /> Popular Tools</h2>
            <Link href="/tools" className="btn-ghost text-xs">View all <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularTools.map((tool, i) => <ToolCard key={tool.id} tool={tool} index={i} />)}
          </div>
        </section>
      )}

      {/* ── TRENDING ─────────────────────────────────── */}
      {!query && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="section-title flex items-center gap-2 mb-6"><Sparkles className="w-5 h-5 text-brand-400" /> Trending</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingTools.map((tool, i) => <ToolCard key={tool.id} tool={tool} index={i} />)}
          </div>
        </section>
      )}

      {/* ── BROWSE / SEARCH RESULTS ──────────────────── */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="section-title">{query ? `Results for "${query}"` : 'All Tools'}</h2>
          {!query && (
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat as typeof activeCategory)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    activeCategory === cat
                      ? 'bg-brand-500/10 border-brand-500/30 text-brand-400'
                      : 'border-surface-border text-slate-500 hover:text-white hover:border-slate-500'
                  }`}
                >{cat}</button>
              ))}
            </div>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((tool, i) => <ToolCard key={tool.id} tool={tool} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-500">
            <p className="text-lg mb-2">No tools found</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        )}
      </section>

      {/* ── WHY DEVTOOLKIT ───────────────────────────── */}
      <section className="border-t border-surface-border bg-surface-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">Why Use DevToolkit?</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-2xl mx-auto">
            A comprehensive suite of developer utilities — all in one place, completely free, with no account required.
            Every tool runs in your browser for maximum speed and privacy.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            {[
              { icon: '⚡', title: 'Instant',    desc: 'Tools run client-side for zero latency' },
              { icon: '🔒', title: 'Private',    desc: 'Your data never leaves your browser' },
              { icon: '📱', title: 'Responsive', desc: 'Works perfectly on any device' },
              { icon: '🆓', title: 'Free',       desc: 'No sign-up, no paywall, ever' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card p-4">
                <div className="text-2xl mb-2">{icon}</div>
                <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

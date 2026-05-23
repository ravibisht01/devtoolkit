'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Zap, ChevronRight } from 'lucide-react'
import { searchTools, type Tool } from '@/constants/tools'

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [query, setQuery]             = useState('')
  const [results, setResults]         = useState<Tool[]>([])
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close everything on route change
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); setQuery('') }, [pathname])

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(v => !v) }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  useEffect(() => {
    setResults(query.trim().length > 1 ? searchTools(query).slice(0, 7) : [])
  }, [query])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/80 backdrop-blur-xl border-b border-surface-border shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center group-hover:bg-brand-500/30 transition-colors">
                <Zap className="w-4 h-4 text-brand-400" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                Dev<span className="text-brand-400">Toolkit</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              <Link href="/tools" className="btn-ghost">All Tools</Link>
              <a href="/#categories" className="btn-ghost">Categories</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-ghost">GitHub</a>
            </div>

            {/* Search + hamburger */}
            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)} className="btn-ghost" aria-label="Search tools">
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline text-sm text-slate-500">Search…</span>
                <kbd className="hidden sm:inline ml-1 px-1.5 py-0.5 rounded bg-surface-border text-slate-500 text-xs font-mono">⌘K</kbd>
              </button>
              <button className="md:hidden btn-ghost p-2" onClick={() => setMenuOpen(v => !v)}>
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-surface-border bg-surface/95 backdrop-blur-xl"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                <Link href="/tools" className="btn-ghost justify-start">All Tools</Link>
                <a href="/#categories" className="btn-ghost justify-start">Categories</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setSearchOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4"
            >
              <div className="card overflow-hidden">
                <div className="flex items-center gap-3 p-4 border-b border-surface-border">
                  <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input
                    autoFocus type="text" placeholder="Search tools…"
                    value={query} onChange={e => setQuery(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-slate-500 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {results.length > 0 && (
                  <ul className="py-2">
                    {results.map(tool => (
                      <li key={tool.id}>
                        <Link href={tool.slug} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-hover transition-colors">
                          <span className="text-xs font-mono text-brand-400 w-8">{tool.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white">{tool.name}</p>
                            <p className="text-xs text-slate-500 truncate">{tool.shortDescription}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {query.length > 1 && results.length === 0 && (
                   <p className="text-center text-slate-500 text-sm py-6">
                    No tools found for &quot;{query}&quot;
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

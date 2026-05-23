import Link from 'next/link'
import { Zap, Github, Twitter } from 'lucide-react'
import { TOOL_CATEGORIES, getToolsByCategory, type ToolCategory } from '@/constants/tools'

const FOOTER_CATS: ToolCategory[] = [
  TOOL_CATEGORIES.JSON,
  TOOL_CATEGORIES.ENCODING,
  TOOL_CATEGORIES.GENERATORS,
  TOOL_CATEGORIES.CODE,
]

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-card/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-brand-400" />
              </div>
              <span className="font-display font-bold text-white text-lg">Dev<span className="text-brand-400">Toolkit</span></span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Free, fast, and powerful online developer tools. No sign-up required.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {FOOTER_CATS.map(cat => {
            const tools = getToolsByCategory(cat).slice(0, 5)
            return (
              <div key={cat}>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{cat}</h3>
                <ul className="space-y-2.5">
                  {tools.map(tool => (
                    <li key={tool.id}>
                      <Link href={tool.slug} className="text-sm text-slate-500 hover:text-white transition-colors">{tool.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} DevToolkit. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-slate-600 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms"   className="text-xs text-slate-600 hover:text-white transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="text-xs text-slate-600 hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

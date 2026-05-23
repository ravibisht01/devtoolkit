import type { ReactNode } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import ToolCard from '@/components/common/ToolCard'
import { getRelatedTools, type Tool } from '@/constants/tools'

interface Faq   { q: string; a: string }
interface Props {
  tool:           Tool
  children:       ReactNode
  faqs?:          Faq[]
  exampleContent?:ReactNode
}

function FaqItem({ q, a }: Faq) {
  return (
    <div className="border border-surface-border rounded-xl p-5 bg-surface-card/50">
      <h3 className="font-semibold text-white text-sm mb-2">{q}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
    </div>
  )
}

export default function ToolPageShell({ tool, children, faqs = [], exampleContent }: Props) {
  const related = getRelatedTools(tool.id)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: tool.name }]} />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.iconBg} border border-white/10 flex items-center justify-center`}>
            <span className={`text-xs font-mono font-bold ${tool.iconColor}`}>{tool.icon}</span>
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">{tool.name}</h1>
            <p className="text-sm text-slate-500">{tool.shortDescription}</p>
          </div>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{tool.description}</p>
      </div>

      {/* Tool UI */}
      <div className="mb-12">{children}</div>

      {/* Examples */}
      {exampleContent && (
        <section className="mb-12">
          <h2 className="section-title mb-4">Example Usage</h2>
          {exampleContent}
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="mb-12">
          <h2 className="section-title mb-4">Frequently Asked Questions</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
          </div>
        </section>
      )}

      {/* Related tools */}
      {related.length > 0 && (
        <section>
          <h2 className="section-title mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((t, i) => <ToolCard key={t.id} tool={t} index={i} />)}
          </div>
        </section>
      )}
    </div>
  )
}

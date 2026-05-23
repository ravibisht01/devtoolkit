'use client'
import { useState, useMemo } from 'react'
import ToolToolbar from '@/components/common/ToolToolbar'

const SAMPLE = `# Hello Markdown

A **live preview** of your markdown.

## Features
- *Italic* and **bold** text
- \`inline code\`
- [Links](https://devtoolkit.app)

\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`
console.log(greet('DevToolkit'))
\`\`\`

> Blockquote text here.

---

| Tool | Category |
|------|----------|
| JSON Formatter | JSON |
| Regex Tester | Text |
`

function renderMarkdown(md: string): string {
  return md
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre class="bg-surface border border-surface-border rounded-xl p-4 overflow-auto my-4 text-sm font-mono text-slate-300 leading-relaxed">$1</pre>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm,  '<h2 class="text-xl font-bold text-white mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm,   '<h1 class="text-2xl font-bold text-white mt-4 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g,     '<em class="italic text-slate-300">$1</em>')
    .replace(/`([^`]+)`/g,     '<code class="bg-surface-border text-brand-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/^> (.+)$/gm,     '<blockquote class="border-l-4 border-brand-500/40 pl-4 text-slate-400 italic my-2">$1</blockquote>')
    .replace(/^- (.+)$/gm,     '<li class="text-slate-300 ml-5 list-disc leading-relaxed">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="text-slate-300 ml-5 list-decimal leading-relaxed">$1</li>')
    .replace(/^---$/gm,        '<hr class="border-surface-border my-4"/>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-brand-400 hover:underline" target="_blank" rel="noopener">$1</a>')
    .replace(/^\|(.+)\|$/gm, (row) => {
      const cells = row.split('|').filter(Boolean).map(c => c.trim())
      const isHeader = false
      return `<tr>${cells.map(c => `<td class="border border-surface-border px-3 py-1.5 text-sm text-slate-300">${c}</td>`).join('')}</tr>`
    })
    .replace(/(<tr>[\s\S]*?<\/tr>)/g, '<table class="w-full border-collapse my-4 text-sm">$1</table>')
    .replace(/\n\n/g, '<br/>')
}

export default function MarkdownPreviewerTool() {
  const [md, setMd]   = useState(SAMPLE)
  const html = useMemo(() => renderMarkdown(md), [md])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">Side-by-side live preview</span>
        <ToolToolbar copyValue={md} downloadContent={md} downloadFileName="document.md" downloadMime="text/markdown" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card overflow-hidden">
          <div className="px-4 py-2.5 border-b border-surface-border text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Markdown Editor
          </div>
          <textarea
            value={md}
            onChange={e => setMd(e.target.value)}
            className="w-full h-[500px] bg-transparent text-sm font-mono text-slate-300 p-4 focus:outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>
        <div className="card overflow-hidden">
          <div className="px-4 py-2.5 border-b border-surface-border text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Preview
          </div>
          <div
            className="p-4 h-[500px] overflow-y-auto text-slate-400 leading-relaxed prose-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  )
}

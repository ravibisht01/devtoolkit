'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ToolToolbar from '@/components/common/ToolToolbar'

const SAMPLE = `/* Main styles */
body {
  font-family: sans-serif;
  background-color: #0f1117;
  color: #e2e8f0;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}`

export default function CssMinifierTool() {
  const [input,  setInput]  = useState(SAMPLE)
  const [output, setOutput] = useState('')

  const minify = () => {
    const result = input
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{};:,>~+])\s*/g, '$1')
      .replace(/;}/g, '}')
      .trim()
    setOutput(result)
    const savings = Math.round((1 - result.length / input.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,' ').length) * 100)
    toast.success(`Minified! ~${savings}% smaller`)
  }

  const savings = output && input
    ? Math.round((1 - output.length / input.length) * 100)
    : 0

  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">CSS Input</label>
            <span className="text-xs text-slate-600">{input.length} chars</span>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={12}
            className="input-base font-mono text-xs resize-none" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Minified Output</label>
            {output && <span className="text-xs text-green-400">{savings}% smaller</span>}
          </div>
          <textarea value={output} readOnly rows={12}
            className="input-base font-mono text-xs resize-none bg-surface-card/50" placeholder="Output here…" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={minify} className="btn-primary">Minify CSS</button>
        {output && (
          <ToolToolbar
            copyValue={output}
            downloadContent={output}
            downloadFileName="styles.min.css"
            downloadMime="text/css"
          />
        )}
        <button onClick={() => { setInput(''); setOutput('') }} className="btn-ghost">Reset</button>
      </div>
    </div>
  )
}

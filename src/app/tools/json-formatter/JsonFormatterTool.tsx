'use client'

import { useState, useCallback, Suspense, lazy } from 'react'
import toast from 'react-hot-toast'
import ToolToolbar from '@/components/common/ToolToolbar'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

const MonacoEditor = lazy(() => import('@monaco-editor/react'))

const SAMPLE = `{
  "name": "DevToolkit",
  "version": "1.0.0",
  "tools": ["JSON Formatter", "Regex Tester", "Base64"],
  "features": { "darkMode": true, "free": true }
}`

export default function JsonFormatterTool() {
  const [input,  setInput]  = useState(SAMPLE)
  const [output, setOutput] = useState('')
  const [error,  setError]  = useState('')
  const [indent, setIndent] = useState(2)
  const [mode,   setMode]   = useState<'format' | 'minify'>('format')

  const process = useCallback(() => {
    try {
      const parsed = JSON.parse(input)
      const result = mode === 'format' ? JSON.stringify(parsed, null, indent) : JSON.stringify(parsed)
      setOutput(result); setError('')
      toast.success(mode === 'format' ? 'JSON formatted!' : 'JSON minified!')
    } catch (e: any) { setError(e.message); setOutput('') }
  }, [input, indent, mode])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setInput(ev.target?.result as string)
    reader.readAsText(file)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="card p-4 flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg overflow-hidden border border-surface-border">
          {(['format','minify'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`px-3 py-1.5 text-sm font-medium capitalize transition-all ${mode === m ? 'bg-brand-500 text-white' : 'bg-surface-card text-slate-400 hover:text-white'}`}>
              {m}
            </button>
          ))}
        </div>
        {mode === 'format' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Indent:</span>
            {[2, 4].map(n => (
              <button key={n} onClick={() => setIndent(n)}
                className={`px-2 py-1 text-xs rounded border transition-all ${indent === n ? 'bg-brand-500/20 border-brand-500/40 text-brand-400' : 'border-surface-border text-slate-500 hover:text-white'}`}>
                {n}
              </button>
            ))}
          </div>
        )}
        <label className="btn-secondary cursor-pointer text-xs">
          📂 Upload JSON
          <input type="file" accept=".json,application/json" onChange={handleUpload} className="sr-only" />
        </label>
        <button onClick={process} className="btn-primary ml-auto">
          {mode === 'format' ? '✨ Format' : '🗜 Minify'}
        </button>
      </div>

      {/* Editors */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Input</span>
            <button onClick={() => setInput('')} className="text-xs text-slate-600 hover:text-white">Clear</button>
          </div>
          <Suspense fallback={<div className="h-80 flex items-center justify-center text-slate-500 text-sm">Loading editor…</div>}>
            <MonacoEditor height="360px" language="json" theme="vs-dark" value={input} onChange={v => setInput(v ?? '')}
              options={{ fontSize: 13, minimap: { enabled: false }, wordWrap: 'on', scrollBeyondLastLine: false }} />
          </Suspense>
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Output</span>
            {output && <ToolToolbar copyValue={output} downloadContent={output} downloadFileName="formatted.json" downloadMime="application/json" />}
          </div>
          {error ? (
            <div className="p-4 flex items-start gap-3 text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Invalid JSON</p>
                <p className="text-xs font-mono text-red-500/80">{error}</p>
              </div>
            </div>
          ) : output ? (
            <>
              <div className="px-4 py-2 border-b border-surface-border flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span className="text-xs text-green-400">Valid JSON</span>
                <span className="text-xs text-slate-600 ml-auto">{output.length} chars</span>
              </div>
              <Suspense fallback={<div className="h-80" />}>
                <MonacoEditor height="320px" language="json" theme="vs-dark" value={output}
                  options={{ fontSize: 13, minimap: { enabled: false }, readOnly: true, wordWrap: 'on', scrollBeyondLastLine: false }} />
              </Suspense>
            </>
          ) : (
            <div className="h-80 flex items-center justify-center text-slate-600 text-sm">Output will appear here</div>
          )}
        </div>
      </div>
    </div>
  )
}

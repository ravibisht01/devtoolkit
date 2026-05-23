'use client'
import { useState, useRef, Suspense, lazy } from 'react'
const MonacoEditor = lazy(() => import('@monaco-editor/react'))

const SAMPLE = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f1117; color: #e2e8f0; padding: 2rem; }
    h1 { color: #38bdf8; } .card { background: #161b27; border: 1px solid #1e2535; border-radius: 12px; padding: 1.5rem; }
  </style>
</head>
<body>
  <div class="card"><h1>Hello DevToolkit!</h1><p>Edit this HTML to preview.</p></div>
</body>
</html>`

export default function HtmlPreviewerTool() {
  const [code, setCode] = useState(SAMPLE)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const updatePreview = () => { if (iframeRef.current) iframeRef.current.srcdoc = code }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">Edit HTML then click Run</span>
        <button onClick={updatePreview} className="btn-primary">▶ Run</button>
      </div>
      <div className="grid lg:grid-cols-2 gap-4" style={{minHeight:480}}>
        <div className="card overflow-hidden">
          <div className="px-4 py-2.5 border-b border-surface-border text-xs font-semibold text-slate-500 uppercase tracking-wider">Editor</div>
          <Suspense fallback={<div className="h-96 flex items-center justify-center text-slate-500 text-sm">Loading…</div>}>
            <MonacoEditor height="440px" language="html" theme="vs-dark" value={code} onChange={v => setCode(v ?? '')}
              options={{fontSize:13,minimap:{enabled:false},wordWrap:'on',scrollBeyondLastLine:false}}/>
          </Suspense>
        </div>
        <div className="card overflow-hidden">
          <div className="px-4 py-2.5 border-b border-surface-border text-xs font-semibold text-slate-500 uppercase tracking-wider">Preview</div>
          <iframe ref={iframeRef} srcDoc={code} title="HTML Preview" className="w-full" style={{height:440,border:'none'}} sandbox="allow-scripts"/>
        </div>
      </div>
    </div>
  )
}

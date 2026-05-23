'use client'
import { useState, Suspense, lazy } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
const MonacoEditor = lazy(() => import('@monaco-editor/react'))

export default function JsonValidatorTool() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{valid:boolean;message:string}|null>(null)

  const validate = () => {
    if (!input.trim()) return
    try { JSON.parse(input); setResult({valid:true,message:'Valid JSON — no errors found ✓'})
    } catch(e:any) { setResult({valid:false,message:e.message}) }
  }

  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-surface-border flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">JSON Input</span>
        <button onClick={validate} className="btn-primary">Validate</button>
      </div>
      <Suspense fallback={<div className="h-80 flex items-center justify-center text-slate-500 text-sm">Loading editor…</div>}>
        <MonacoEditor height="360px" language="json" theme="vs-dark" value={input} onChange={v=>setInput(v??'')}
          options={{fontSize:13,minimap:{enabled:false},wordWrap:'on',scrollBeyondLastLine:false}} />
      </Suspense>
      {result && (
        <div className={`p-4 border-t border-surface-border flex items-center gap-3 ${result.valid?'text-green-400':'text-red-400'}`}>
          {result.valid ? <CheckCircle2 className="w-4 h-4"/> : <AlertCircle className="w-4 h-4"/>}
          <span className="text-sm font-mono">{result.message}</span>
        </div>
      )}
    </div>
  )
}

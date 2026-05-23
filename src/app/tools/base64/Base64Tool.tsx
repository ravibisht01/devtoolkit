'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ToolToolbar from '@/components/common/ToolToolbar'

export default function Base64Tool() {
  const [input, setInput]   = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode]     = useState<'encode'|'decode'>('encode')

  const process = () => {
    try {
      setOutput(mode === 'encode' ? btoa(unescape(encodeURIComponent(input))) : decodeURIComponent(escape(atob(input.trim()))))
    } catch(e:any) { toast.error('Invalid input: '+e.message) }
  }

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex rounded-lg overflow-hidden border border-surface-border">
          {(['encode','decode'] as const).map(m => (
            <button key={m} onClick={()=>{setMode(m);setOutput('')}}
              className={`px-4 py-2 text-sm font-medium capitalize transition-all ${mode===m?'bg-brand-500 text-white':'bg-surface-card text-slate-400 hover:text-white'}`}>{m}</button>
          ))}
        </div>
        <p className="text-xs text-slate-500">{mode==='encode'?'Text → Base64':'Base64 → Text'}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">{mode==='encode'?'Plain Text':'Base64 String'}</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={6} className="input-base font-mono text-sm resize-none" placeholder={mode==='encode'?'Enter text to encode…':'Enter Base64 to decode…'} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{mode==='encode'?'Base64 Output':'Decoded Text'}</label>
            {output && <ToolToolbar copyValue={output} downloadContent={output} downloadFileName="output.txt"/>}
          </div>
          <textarea value={output} readOnly rows={6} className="input-base font-mono text-sm resize-none bg-surface-card/50" placeholder="Output appears here…"/>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button onClick={process} className="btn-primary">{mode==='encode'?'Encode':'Decode'}</button>
        <button onClick={()=>{setInput('');setOutput('')}} className="btn-ghost">Reset</button>
        {output && <span className="text-xs text-slate-500 ml-auto">{output.length} chars</span>}
      </div>
    </div>
  )
}

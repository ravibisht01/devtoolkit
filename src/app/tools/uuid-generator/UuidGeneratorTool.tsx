'use client'
import { useState } from 'react'
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid'
import toast from 'react-hot-toast'
import ToolToolbar from '@/components/common/ToolToolbar'
import { RefreshCw, Copy } from 'lucide-react'

export default function UuidGeneratorTool() {
  const [version,   setVersion]   = useState<'v4'|'v1'>('v4')
  const [count,     setCount]     = useState(5)
  const [uuids,     setUuids]     = useState<string[]>([])
  const [uppercase, setUppercase] = useState(false)

  const generate = () => {
    const gen = version === 'v4' ? uuidv4 : uuidv1
    const list = Array.from({length:count}, () => { const id = gen() as string; return uppercase ? id.toUpperCase() : id })
    setUuids(list)
    toast.success(`Generated ${count} UUID${count>1?'s':''}`)
  }

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex rounded-lg overflow-hidden border border-surface-border">
          {(['v4','v1'] as const).map(v => (
            <button key={v} onClick={()=>setVersion(v)}
              className={`px-3 py-1.5 text-sm font-mono font-medium transition-all ${version===v?'bg-brand-500 text-white':'bg-surface-card text-slate-400 hover:text-white'}`}>{v}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Count:</span>
          <input type="number" min={1} max={100} value={count} onChange={e=>setCount(Math.min(100,Math.max(1,+e.target.value)))} className="input-base w-20 text-center"/>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={uppercase} onChange={e=>setUppercase(e.target.checked)} className="rounded accent-brand-500"/>
          <span className="text-xs text-slate-400">Uppercase</span>
        </label>
        <button onClick={generate} className="btn-primary ml-auto"><RefreshCw className="w-3.5 h-3.5"/>Generate</button>
      </div>
      {uuids.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{uuids.length} UUIDs</span>
            <ToolToolbar copyValue={uuids.join('\n')} downloadContent={uuids.join('\n')} downloadFileName="uuids.txt"/>
          </div>
          <div className="space-y-1.5 max-h-96 overflow-y-auto">
            {uuids.map((id,i) => (
              <div key={i} className="flex items-center justify-between gap-3 px-3 py-2 bg-surface rounded-lg group">
                <code className="text-xs font-mono text-slate-300 select-all">{id}</code>
                <button onClick={()=>{navigator.clipboard.writeText(id);toast.success('Copied!')}}
                  className="text-slate-600 hover:text-brand-400 transition-colors opacity-0 group-hover:opacity-100">
                  <Copy className="w-3.5 h-3.5"/>
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-slate-600 text-sm">Click <strong className="text-slate-400">Generate</strong> to create UUIDs</div>
      )}
    </div>
  )
}

'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ToolToolbar from '@/components/common/ToolToolbar'

export default function UrlEncoderTool() {
  const [input,setInput]=useState(''); const [output,setOutput]=useState(''); const [mode,setMode]=useState<'encode'|'decode'>('encode')
  const process=()=>{try{setOutput(mode==='encode'?encodeURIComponent(input):decodeURIComponent(input))}catch(e:any){toast.error('Invalid: '+e.message)}}
  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex rounded-lg overflow-hidden border border-surface-border w-fit">
        {(['encode','decode'] as const).map(m=>(
          <button key={m} onClick={()=>{setMode(m);setOutput('')}} className={`px-4 py-2 text-sm font-medium capitalize transition-all ${mode===m?'bg-brand-500 text-white':'bg-surface-card text-slate-400 hover:text-white'}`}>{m}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">{mode==='encode'?'Plain URL':'Encoded URL'}</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={5} className="input-base font-mono text-sm resize-none" placeholder="Paste URL here…"/>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{mode==='encode'?'Encoded':'Decoded'}</label>
            {output && <ToolToolbar copyValue={output} downloadContent={output} downloadFileName="url.txt"/>}
          </div>
          <textarea value={output} readOnly rows={5} className="input-base font-mono text-sm resize-none bg-surface-card/50" placeholder="Output…"/>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={process} className="btn-primary">{mode==='encode'?'Encode':'Decode'}</button>
        <button onClick={()=>{setInput('');setOutput('')}} className="btn-ghost">Reset</button>
      </div>
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import ToolToolbar from '@/components/common/ToolToolbar'

export default function TimestampTool() {
  const [now,      setNow]      = useState(Math.floor(Date.now()/1000))
  const [tsInput,  setTsInput]  = useState(String(Math.floor(Date.now()/1000)))
  const [dateInput,setDateInput]= useState(new Date().toISOString().slice(0,16))
  const [tsResult, setTsResult] = useState('')
  const [dateResult,setDateResult]=useState('')

  useEffect(()=>{ const t=setInterval(()=>setNow(Math.floor(Date.now()/1000)),1000); return ()=>clearInterval(t) },[])

  const convertTs = () => {
    const n = parseInt(tsInput)
    if(isNaN(n)) return setDateResult('Invalid timestamp')
    const ms = n < 1e12 ? n*1000 : n
    setDateResult(new Date(ms).toLocaleString()+'\n'+new Date(ms).toISOString())
  }
  const convertDate = () => {
    const d = new Date(dateInput)
    if(isNaN(d.getTime())) return setTsResult('Invalid date')
    setTsResult(String(Math.floor(d.getTime()/1000)))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="card p-4 flex items-center gap-3">
        <span className="text-xs text-slate-500">Current Unix timestamp:</span>
        <code className="font-mono text-brand-400 text-sm">{now}</code>
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-5 flex flex-col gap-3">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Timestamp → Date</label>
          <input value={tsInput} onChange={e=>setTsInput(e.target.value)} placeholder="e.g. 1716384000" className="input-base font-mono"/>
          <button onClick={convertTs} className="btn-primary">Convert →</button>
          {dateResult && <><pre className="input-base text-xs font-mono text-green-400 whitespace-pre-wrap">{dateResult}</pre><ToolToolbar copyValue={dateResult}/></>}
        </div>
        <div className="card p-5 flex flex-col gap-3">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date → Timestamp</label>
          <input type="datetime-local" value={dateInput} onChange={e=>setDateInput(e.target.value)} className="input-base"/>
          <button onClick={convertDate} className="btn-primary">Convert →</button>
          {tsResult && <><code className="input-base text-sm font-mono text-green-400">{tsResult}</code><ToolToolbar copyValue={tsResult}/></>}
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { RefreshCw, Eye, EyeOff, Copy } from 'lucide-react'

const CHARSETS: Record<string,string> = {
  uppercase:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lowercase:'abcdefghijklmnopqrstuvwxyz',
  numbers:'0123456789', symbols:'!@#$%^&*()_+-=[]{}|;:,.<>?'
}

function getStrength(pw:string):{label:string;color:string;pct:number} {
  if (!pw) return {label:'',color:'',pct:0}
  let s=0
  if(pw.length>=8)s++; if(pw.length>=12)s++; if(pw.length>=16)s++
  if(/[A-Z]/.test(pw))s++; if(/[a-z]/.test(pw))s++; if(/[0-9]/.test(pw))s++; if(/[^A-Za-z0-9]/.test(pw))s++
  if(s<=2) return {label:'Weak',color:'bg-red-500',pct:25}
  if(s<=4) return {label:'Fair',color:'bg-orange-500',pct:50}
  if(s<=5) return {label:'Good',color:'bg-yellow-500',pct:75}
  return {label:'Strong',color:'bg-green-500',pct:100}
}

export default function PasswordGeneratorTool() {
  const [length,  setLength]  = useState(16)
  const [options, setOptions] = useState({uppercase:true,lowercase:true,numbers:true,symbols:true})
  const [count,   setCount]   = useState(5)
  const [passwords,setPasswords]=useState<string[]>([])
  const [show,    setShow]    = useState<Record<number,boolean>>({})

  const generate = useCallback(() => {
    const charset = Object.entries(options).filter(([,v])=>v).map(([k])=>CHARSETS[k]).join('')
    if (!charset) return toast.error('Select at least one character set')
    const arr = new Uint32Array(length*count)
    crypto.getRandomValues(arr)
    setPasswords(Array.from({length:count},(_,ci)=>Array.from({length:length},(_,i)=>charset[arr[ci*length+i]%charset.length]).join('')))
    setShow({})
  }, [length,options,count])

  return (
    <div className="card p-6">
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Length: <span className="text-brand-400">{length}</span></label>
          <input type="range" min={8} max={128} value={length} onChange={e=>setLength(+e.target.value)} className="w-full accent-brand-500"/>
          <div className="flex justify-between text-xs text-slate-600 mt-1"><span>8</span><span>128</span></div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Count: <span className="text-brand-400">{count}</span></label>
          <input type="range" min={1} max={20} value={count} onChange={e=>setCount(+e.target.value)} className="w-full accent-brand-500"/>
          <div className="flex justify-between text-xs text-slate-600 mt-1"><span>1</span><span>20</span></div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(CHARSETS).map(k => (
          <button key={k} onClick={()=>setOptions(p=>({...p,[k]:!p[k as keyof typeof p]}))}
            className={`px-3 py-1.5 rounded-lg text-sm border capitalize transition-all ${options[k as keyof typeof options]?'bg-brand-500/20 border-brand-500/40 text-brand-400':'border-surface-border text-slate-500 hover:text-white'}`}>{k}</button>
        ))}
      </div>
      <button onClick={generate} className="btn-primary mb-6"><RefreshCw className="w-3.5 h-3.5"/>Generate Passwords</button>
      {passwords.length > 0 && (
        <div className="space-y-2">
          {passwords.map((pw,i) => {
            const str = getStrength(pw)
            return (
              <div key={i} className="flex items-center gap-3 px-4 py-3 bg-surface rounded-xl group">
                <code className="flex-1 text-sm font-mono text-white tracking-widest">{show[i]?pw:'•'.repeat(pw.length)}</code>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-surface-border overflow-hidden">
                    <div className={`h-full rounded-full ${str.color}`} style={{width:str.pct+'%'}}/>
                  </div>
                  <span className="text-xs text-slate-600 w-12">{str.label}</span>
                </div>
                <button onClick={()=>setShow(p=>({...p,[i]:!p[i]}))} className="text-slate-600 hover:text-white transition-colors">
                  {show[i]?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
                </button>
                <button onClick={()=>{navigator.clipboard.writeText(pw);toast.success('Copied!')}} className="text-slate-600 hover:text-brand-400 transition-colors">
                  <Copy className="w-4 h-4"/>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
